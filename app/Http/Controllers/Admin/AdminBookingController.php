<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
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

        $availableSchedules = \App\Models\Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Admin/Clinic/Bookings/Index', [
            'bookings' => $bookings,
            'therapists' => $therapists,
            'availableSchedules' => $availableSchedules,
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

    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'schedule_id' => 'required|exists:schedules,id',
            'package_type' => 'required|in:reguler,hipnoterapi,premium,vip',
        ]);

        $schedule = \App\Models\Schedule::findOrFail($request->schedule_id);

        if ($schedule->status === 'full' || $schedule->booked_count >= $schedule->quota) {
            return back()->withErrors(['error' => 'Slot jadwal yang dipilih sudah penuh.']);
        }

        Booking::create([
            'booking_code' => 'B-' . strtoupper(uniqid()),
            'patient_id' => $request->patient_id,
            'therapist_id' => $schedule->therapist_id,
            'schedule_id' => $schedule->id,
            'original_schedule_id' => $schedule->id,
            'package_type' => $request->package_type,
            'status' => 'confirmed', // Admin langsung masuk confirmed
            'amount' => 0, // Assume offline / manual pay
        ]);

        $schedule->increment('booked_count');
        if ($schedule->booked_count >= $schedule->quota) {
            $schedule->update(['status' => 'full']);
        }

        return back()->with('success', 'Pasien berhasil ditambahkan ke jadwal ini.');
    }
}
