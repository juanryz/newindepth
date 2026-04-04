<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['patient.screeningResults', 'schedule', 'therapist'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient->append('profile_completion');
                    // Add a custom property for easier display in the list
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            });

        $therapists = User::role('therapist')
            ->select('id', 'name')
            ->get();

        $availableSchedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        // All schedules (past + future) for booking correction feature
        $allSchedules = Schedule::with('therapist:id,name')
            ->orderBy('date', 'desc')
            ->orderBy('start_time', 'desc')
            ->get(['id', 'date', 'start_time', 'end_time', 'therapist_id', 'quota', 'booked_count', 'status']);

        return Inertia::render('Admin/Clinic/Bookings/Index', [
            'bookings' => $bookings,
            'therapists' => $therapists,
            'availableSchedules' => $availableSchedules,
            'allSchedules' => $allSchedules,
            'bookingStatuses' => Booking::STATUSES,
        ]);
    }

    public function assignTherapist(Request $request, Booking $booking)
    {
        $request->validate([
            'therapist_id' => 'required|exists:users,id',
        ]);

        $oldTherapistId = $booking->therapist_id;
        $booking->update([
            'therapist_id' => $request->therapist_id,
        ]);

        // If booking was already confirmed, notify the patient of the change
        if (in_array($booking->status, ['confirmed', 'in_progress']) && $oldTherapistId != $request->therapist_id) {
            try {
                $booking->patient->notify(new \App\Notifications\TherapistAssigned($booking));
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Failed to notify patient of therapist change: ' . $e->getMessage());
            }
        }

        return back()->with('success', 'Terapis berhasil ditugaskan.');
    }

    public function updateDetails(Request $request, Booking $booking)
    {
        $request->validate([
            'recording_link' => 'nullable|url',
            'therapist_notes' => 'nullable|string',
            'patient_visible_notes' => 'nullable|string',
            'completion_outcome' => 'nullable|string',
            'session_checklist' => 'nullable|array',
            'status' => 'nullable|string|in:pending,confirmed,completed,cancelled,no_show',
        ]);

        $booking->update([
            'recording_link' => $request->recording_link,
            'therapist_notes' => $request->therapist_notes,
            'patient_visible_notes' => $request->patient_visible_notes,
            'completion_outcome' => $request->completion_outcome,
            'session_checklist' => array_merge($booking->session_checklist ?? [], $request->session_checklist ?? []),
            'status' => $request->status ?? $booking->status,
        ]);

        return back()->with('success', 'Detail booking berhasil diperbarui.');
    }

    public function cancel(Booking $booking, Request $request)
    {
        if ($booking->status === 'cancelled') {
            return back()->withErrors(['error' => 'Sesi sudah dibatalkan.']);
        }

        // Free the schedule slot if it was confirmed
        if (in_array($booking->status, ['confirmed', 'in_progress', 'pending_payment', 'pending_validation'])) {
            $schedule = $booking->schedule;
            if ($schedule) {
                $schedule->decrement('booked_count');
                if ($schedule->status === 'full') {
                    $schedule->update(['status' => 'available']);
                }
            }
        }

        // Completely delete unpaid bookings as requested by user ("hapus")
        if (in_array($booking->status, ['draft', 'pending_payment', 'pending_validation', 'pending_screening', 'pending'])) {
            try {
                if ($booking->userVoucher) {
                    $booking->userVoucher->update([
                        'is_active' => true,
                        'booking_id' => null
                    ]);
                }
                if ($booking->transaction) {
                    $booking->transaction->delete();
                }
                $booking->delete();
                return back()->with('success', 'Booking berhasil dihapus sepenuhnya dari sistem dan slot kembali tersedia.');
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Failed to delete booking in admin: ' . $e->getMessage());
                return back()->withErrors(['error' => 'Gagal menghapus booking: ' . $e->getMessage()]);
            }
        }

        $booking->update(['status' => 'cancelled']);

        if ($booking->patient) {
            try {
                $booking->patient->notify(new \App\Notifications\BookingCancelled($booking));
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Failed to notify patient of cancellation: ' . $e->getMessage());
            }
        }

        if ($booking->transaction && $booking->transaction->status === 'pending') {
            $booking->transaction->update(['status' => 'cancelled']);
        }

        return back()->with('success', 'Booking berhasil dibatalkan dan slot kembali tersedia.');
    }

    public function fixBooking(Request $request, Booking $booking)
    {
        $validStatuses = implode(',', Booking::STATUSES);
        $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'status'      => "required|in:{$validStatuses}",
        ]);

        $oldSchedule = $booking->schedule;
        $newSchedule = Schedule::findOrFail($request->schedule_id);

        $occupiesSlot = in_array($booking->status, Booking::SLOT_OCCUPYING_STATUSES);

        // Release slot from old schedule
        if ($oldSchedule && $occupiesSlot) {
            $oldSchedule->decrement('booked_count');
            if ($oldSchedule->status === 'full' && $oldSchedule->booked_count < $oldSchedule->quota) {
                $oldSchedule->update(['status' => 'available']);
            }
        }

        // Occupy slot on new schedule
        $newOccupiesSlot = in_array($request->status, Booking::SLOT_OCCUPYING_STATUSES);
        if ($newOccupiesSlot) {
            $newSchedule->increment('booked_count');
            if ($newSchedule->booked_count >= $newSchedule->quota) {
                $newSchedule->update(['status' => 'full']);
            }
        }

        $booking->update([
            'schedule_id'          => $newSchedule->id,
            'original_schedule_id' => $booking->original_schedule_id ?? $newSchedule->id,
            'therapist_id'         => $newSchedule->therapist_id ?? $booking->therapist_id,
            'status'               => $request->status,
        ]);

        return back()->with('success', 'Booking berhasil dikoreksi.');
    }

    public function store(Request $request)
    {
        $packageValues = Package::pluck('slug')->toArray();
        $request->validate([
            'patient_id'     => 'required|exists:users,id',
            'schedule_id'    => 'required|exists:schedules,id',
            'package_type'   => ['required', \Illuminate\Validation\Rule::in($packageValues)],
            'session_type'   => 'required|in:online,offline',
            'payment_status' => 'required|in:pending,paid',
            'notes'          => 'nullable|string|max:1000',
        ]);

        $schedule = Schedule::findOrFail($request->schedule_id);

        if ($schedule->status === 'full' || $schedule->booked_count >= $schedule->quota) {
            return back()->withErrors(['error' => 'Slot jadwal yang dipilih sudah penuh.']);
        }

        $bookingStatus = $request->payment_status === 'paid' ? 'confirmed' : 'pending_payment';

        // Get Package Price
        $package = Package::where('slug', $request->package_type)->first();
        $basePrice = $request->session_type === 'online' ? ($package->online_current_price ?? $package->current_price) : $package->current_price;
        $tax = $basePrice * 0.11;
        $totalAmount = round($basePrice + $tax);

        $booking = Booking::create([
            'booking_code'         => 'BK-' . strtoupper(Str::random(10)),
            'patient_id'           => $request->patient_id,
            'therapist_id'         => $schedule->therapist_id,
            'schedule_id'          => $schedule->id,
            'original_schedule_id' => $schedule->id,
            'package_type'         => $request->package_type,
            'session_type'         => $request->session_type,
            'status'               => $bookingStatus,
            'notes'                => $request->notes,
            'amount'               => $totalAmount,
        ]);

        $schedule->increment('booked_count');
        if ($schedule->booked_count >= $schedule->quota) {
            $schedule->update(['status' => 'full']);
        }

        // Create Transaction
        $invoiceNumber = 'INV-' . strtoupper(Str::random(10));
        $transaction = Transaction::create([
            'booking_id'      => $booking->id,
            'user_id'         => $request->patient_id,
            'invoice_number'  => $invoiceNumber,
            'amount'          => $totalAmount,
            'payment_method'  => $request->payment_status === 'paid' ? 'manual' : null,
            'status'          => $request->payment_status === 'paid' ? 'completed' : 'pending',
            'paid_at'         => $request->payment_status === 'paid' ? now() : null,
            'validation_note' => $request->payment_status === 'paid' ? 'Confirmed by Admin during registration' : null,
        ]);

        // Generate Invoice Data for immediate display
        $invoiceData = [
            'invoice_number' => $invoiceNumber,
            'created_at'     => $transaction->created_at->format('Y-m-d H:i:s'),
            'patient_name'   => $booking->patient->name,
            'patient_email'  => $booking->patient->email,
            'patient_phone'  => $booking->patient->phone,
            'booking_code'   => $booking->booking_code,
            'package_name'   => ucfirst($booking->package_type),
            'session_type'   => $booking->session_type,
            'amount'         => (int)$totalAmount,
            'payment_status' => $transaction->status === 'completed' ? 'paid' : 'pending',
            'payment_method' => $transaction->payment_method === 'manual' ? 'Tunai/Transfer' : 'Transfer Bank',
            'schedule'       => [
                'date'       => $schedule->date,
                'start_time' => $schedule->start_time,
                'therapist'  => $schedule->therapist?->name ?? 'Terapis',
            ]
        ];

        return back()->with('success', 'Booking berhasil dibuat.')
                     ->with('invoiceData', $invoiceData);
    }
}
