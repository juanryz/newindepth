<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Booking;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->hasAnyRole(['admin', 'super_admin']);

        $bookingsQuery = Booking::with([
            'schedule.therapist',
            'patient.screeningResults',
            'patient.courses',
            'patient.bookings' => function ($query) {
                $query->with('schedule.therapist')->whereIn('status', ['confirmed', 'completed'])->orderBy('created_at', 'desc');
            }
        ]);

        if (!$isAdmin) {
            $bookingsQuery->whereHas('schedule', function ($query) use ($user) {
                $query->where('therapist_id', $user->id);
            });
        }

        $bookings = $bookingsQuery->whereIn('status', ['confirmed', 'completed'])
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            })
            ->sortBy('schedule.date')
            ->values();

        // Available schedules for rescheduling
        $schedulesQuery = Schedule::query();
        if (!$isAdmin) {
            $schedulesQuery->where('therapist_id', $user->id);
        }

        $availableSchedules = $schedulesQuery->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        $allSchedulesQuery = Schedule::with(['therapist', 'bookings.patient']);
        if (!$isAdmin) {
            $allSchedulesQuery->where('therapist_id', $user->id);
        }

        $allSchedules = $allSchedulesQuery->get()
            ->map(function ($schedule) {
                $date = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
                $startTime = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
                $endTime = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');

                return [
                    'id' => $schedule->id,
                    'title' => $schedule->bookings->count() > 0 ? $schedule->bookings->first()->patient->name : 'Tersedia',
                    'start' => $date . 'T' . $startTime,
                    'end' => $date . 'T' . $endTime,
                    'extendedProps' => [
                        'bookings' => $schedule->bookings,
                        'therapist' => $schedule->therapist,
                        'schedule_type' => $schedule->schedule_type,
                        'status' => $schedule->status,
                    ]
                ];
            });

        return Inertia::render('Clinic/Schedules/Index', [
            'bookings' => $bookings,
            'availableSchedules' => $availableSchedules,
            'calendarSchedules' => $allSchedules,
        ]);
    }

    public function patientDetail(Request $request, \App\Models\User $user)
    {
        // Security check: Only allow if therapist has a booking with this patient
        $hasBooking = Booking::where('patient_id', $user->id)
            ->where('therapist_id', $request->user()->id)
            ->exists();

        if (!$hasBooking && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        $user->load([
            'screeningResults' => fn($q) => $q->latest(),
            'bookings' => fn($q) => $q->with(['schedule.therapist', 'therapist'])->latest(),
            'courses',
        ]);

        $availableSchedules = Schedule::where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Clinic/Schedules/PatientDetail', [
            'patient' => $user,
            'profileProgress' => $user->getProfileCompletionStats(),
            'availableSchedules' => $availableSchedules,
            'fromBookingId' => $request->query('from_booking_id'),
        ]);
    }

    public function startSession(Request $request, Booking $booking)
    {
        // Ensure the current therapist owns this booking's schedule
        if ($booking->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        if ($booking->status !== 'confirmed') {
            return redirect()->back()->withErrors(['error' => 'Hanya sesi yang sudah dikonfirmasi yang dapat dimulai.']);
        }

        $booking->update([
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        return redirect()->route('schedules.active-session', $booking->id)->with('success', 'Sesi terapi dimulai.');
    }

    public function activeSession(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin
        if ($booking->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        if ($booking->status !== 'in_progress') {
            // If already completed or not started, redirect to patients detail or index
            if ($booking->status === 'completed') {
                return redirect()->route('schedules.patient-detail', $booking->patient_id)->with('info', 'Sesi ini sudah selesai.');
            }
            return redirect()->route('schedules.index')->with('error', 'Sesi belum dimulai atau tidak aktif.');
        }

        $booking->load(['patient', 'schedule.therapist']);

        return Inertia::render('Clinic/Schedules/ActiveSession', [
            'booking' => $booking,
            'patient' => $booking->patient->load('screeningResults'),
        ]);
    }

    public function completeSession(Request $request, Booking $booking)
    {
        // Ensure the current therapist owns this booking's schedule
        if ($booking->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $request->validate([
            'recording_link' => 'required|url',
            'therapist_notes' => 'nullable|string',
            'patient_visible_notes' => 'nullable|string',
            'completion_outcome' => 'required|string|in:Normal,Abnormal/Emergency',
        ]);

        $booking->update([
            'status' => 'completed',
            'recording_link' => $request->recording_link,
            'therapist_notes' => $request->therapist_notes,
            'patient_visible_notes' => $request->patient_visible_notes,
            'completion_outcome' => $request->completion_outcome,
        ]);

        return redirect()->route('schedules.patient-detail', $booking->patient_id)->with('success', 'Sesi berhasil diselesaikan dan link rekaman serta catatan telah disimpan.');
    }

    public function rescheduleSession(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin
        if ($booking->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        if (!in_array($booking->status, ['confirmed', 'in_progress'])) {
            return redirect()->back()->withErrors(['error' => 'Hanya sesi yang dikonfirmasi atau berlangsung yang bisa dijadwal ulang.']);
        }

        $request->validate([
            'new_schedule_id' => 'nullable|exists:schedules,id',
            'new_date' => 'required_without:new_schedule_id|nullable|date',
            'new_start_time' => 'required_with:new_date|nullable|date_format:H:i',
            'new_end_time' => 'required_with:new_date|nullable|date_format:H:i|after:new_start_time',
            'reschedule_reason' => 'required|string|max:500',
        ]);

        if ($request->new_schedule_id) {
            $newSchedule = Schedule::findOrFail($request->new_schedule_id);
            if ($newSchedule->status !== 'available' || $newSchedule->booked_count >= $newSchedule->quota) {
                return redirect()->back()->withErrors(['error' => 'Slot jadwal yang dipilih sudah penuh.']);
            }
        } else {
            // Create a new schedule slot dynamically
            $newSchedule = Schedule::create([
                'therapist_id' => $booking->therapist_id,
                'date' => $request->new_date,
                'start_time' => $request->new_start_time,
                'end_time' => $request->new_end_time,
                'quota' => 1,
                'booked_count' => 0,
                'status' => 'available',
                'schedule_type' => $booking->schedule->schedule_type ?? 'consultation',
            ]);
        }

        // Save old schedule reference
        $oldScheduleId = $booking->schedule_id;

        // Decrement old schedule booked_count
        if ($booking->schedule) {
            $booking->schedule->decrement('booked_count');
        }

        // Increment new schedule booked_count
        $newSchedule->increment('booked_count');

        $booking->update([
            'schedule_id' => $newSchedule->id,
            'original_schedule_id' => $booking->original_schedule_id ?? $oldScheduleId,
            'reschedule_reason' => $request->reschedule_reason,
            'rescheduled_by' => $request->user()->id,
            'rescheduled_at' => now(),
            'status' => 'confirmed', // Reset to confirmed if was in_progress
            'started_at' => null,
        ]);

        // Notify patient
        if ($booking->patient) {
            $booking->patient->notify(new \App\Notifications\BookingRescheduled($booking, $request->reschedule_reason));
        }

        return redirect()->back()->with('success', 'Sesi berhasil dijadwal ulang.');
    }

    public function markNoShow(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin
        if ($booking->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        if (!in_array($booking->status, ['confirmed', 'in_progress'])) {
            return redirect()->back()->withErrors(['error' => 'Hanya sesi aktif yang bisa ditandai tidak hadir.']);
        }

        $request->validate([
            'no_show_party' => 'required|in:patient,therapist',
            'no_show_reason' => 'nullable|string|max:500',
        ]);

        $booking->update([
            'status' => 'completed',
            'completion_outcome' => $request->no_show_party === 'patient' ? 'No-Show (Pasien)' : 'No-Show (Praktisi)',
            'therapist_notes' => $request->no_show_reason ?? ($request->no_show_party === 'patient'
                ? 'Pasien tidak hadir pada sesi yang dijadwalkan.'
                : 'Praktisi tidak dapat hadir pada sesi yang dijadwalkan.'),
            'patient_visible_notes' => $request->no_show_party === 'patient'
                ? 'Anda tidak hadir pada sesi yang dijadwalkan. Silakan hubungi admin untuk menjadwalkan ulang.'
                : 'Mohon maaf, praktisi tidak dapat hadir. Admin akan segera menghubungi Anda untuk menjadwal ulang sesi.',
        ]);

        // Notify patient
        if ($booking->patient) {
            $booking->patient->notify(new \App\Notifications\BookingNoShow($booking, $request->no_show_party));
        }

        return redirect()->back()->with('success', 'Sesi telah ditandai sebagai tidak hadir.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'quota' => 'required|integer|min:1',
            'schedule_type' => 'nullable|string|max:255',
        ]);

        $validated['therapist_id'] = $request->user()->id;

        Schedule::create($validated);

        return redirect()->back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function destroy(Schedule $schedule)
    {
        if ($schedule->therapist_id != auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        if ($schedule->booked_count > 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak bisa menghapus jadwal yang sudah dipesan.']);
        }

        $schedule->delete();

        return redirect()->back()->with('success', 'Jadwal berhasil dihapus.');
    }
}
