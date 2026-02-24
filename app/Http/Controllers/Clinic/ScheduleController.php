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
            $bookingsQuery->where('therapist_id', $user->id);
        }

        $bookings = $bookingsQuery->whereIn('status', ['confirmed', 'in_progress', 'completed'])
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            })
            ->sortBy(function ($booking) {
                return $booking->schedule?->date . ' ' . $booking->schedule?->start_time;
            })
            ->values();

        // Available schedules for rescheduling
        $schedulesQuery = Schedule::query();
        // For rescheduling, allow therapists to see all available global slots
        if (!$isAdmin) {
            // Optional: you might want to limit this, but for now let's allow finding any available slot
        }

        $availableSchedules = $schedulesQuery->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        $allSchedulesQuery = Schedule::with(['therapist', 'bookings.patient']);

        // If not admin, show their own schedules + assigned bookings + all available
        if (!$isAdmin) {
            $allSchedulesQuery->where(function ($q) use ($user) {
                $q->where('therapist_id', $user->id)
                    ->orWhereHas('bookings', function ($sq) use ($user) {
                        $sq->where('therapist_id', $user->id);
                    })
                    ->orWhere('status', 'available');
            });
        }

        $allSchedules = $allSchedulesQuery->get();

        $calendarSchedules = $allSchedules->map(function ($schedule) use ($user, $isAdmin) {
            $date = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            $startTime = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
            $endTime = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');

            $myBooking = null;
            if (!$isAdmin) {
                $myBooking = $schedule->bookings->where('therapist_id', $user->id)->first();
            }

            $isMine = $isAdmin ? true : ($schedule->therapist_id === $user->id || $myBooking !== null);

            return [
                'id' => $schedule->id,
                'title' => ($myBooking && $myBooking->patient) ? $myBooking->patient->name : ($schedule->therapist ? $schedule->therapist->name : 'Tugas Sesi'),
                'start' => $date . 'T' . $startTime,
                'end' => $date . 'T' . $endTime,
                'backgroundColor' => null, // Use default or component colors
                'extendedProps' => [
                    'bookings' => $isAdmin ? $schedule->bookings->values() : $schedule->bookings->where('therapist_id', $user->id)->values(),
                    'therapist' => $schedule->therapist,
                    'schedule_type' => $schedule->schedule_type,
                    'status' => $schedule->status,
                    'is_mine' => $isMine,
                ]
            ];
        });

        $mySchedules = [];
        if (!$isAdmin) {
            $mySchedules = Schedule::with(['bookings.patient'])
                ->where('therapist_id', $user->id)
                ->where('date', '>=', now()->toDateString())
                ->orderBy('date')
                ->orderBy('start_time')
                ->get()
                ->map(function ($schedule) {
                    return [
                        'id' => $schedule->id,
                        'date' => $schedule->date,
                        'start_time' => substr($schedule->start_time, 0, 5),
                        'end_time' => substr($schedule->end_time, 0, 5),
                        'quota' => $schedule->quota,
                        'booked_count' => $schedule->booked_count,
                        'status' => $schedule->status,
                        'schedule_type' => $schedule->schedule_type,
                        'patient_name' => $schedule->bookings->first()?->patient?->name,
                    ];
                });
        }

        return Inertia::render('Clinic/Schedules/Index', [
            'bookings' => $bookings,
            'availableSchedules' => $availableSchedules,
            'calendarSchedules' => $calendarSchedules,
            'mySchedules' => $mySchedules,
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
        // Ensure the current therapist owns this booking's schedule-
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin'])) {
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
            'session_checklist' => 'nullable|array',
        ]);

        $booking->update([
            'status' => 'completed',
            'ended_at' => now(),
            'recording_link' => $request->recording_link,
            'therapist_notes' => $request->therapist_notes,
            'patient_visible_notes' => $request->patient_visible_notes,
            'completion_outcome' => $request->completion_outcome,
            'session_checklist' => $request->session_checklist,
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

    public function storeRecurring(Request $request)
    {
        $validated = $request->validate([
            'days_of_week' => 'required|array|min:1',
            'days_of_week.*' => 'integer|between:0,6', // 0=Sun,1=Mon,...,6=Sat
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'date_from' => 'required|date|after_or_equal:today',
            'date_to' => 'required|date|after_or_equal:date_from',
            'quota' => 'required|integer|min:1|max:20',
            'schedule_type' => 'nullable|string|in:consultation,class',
        ]);

        $therapistId = $request->user()->id;
        $start = \Carbon\Carbon::parse($validated['date_from']);
        $end = \Carbon\Carbon::parse($validated['date_to']);
        $days = array_map('intval', $validated['days_of_week']); // e.g. [1,2] = Mon,Tue

        $created = 0;
        $current = $start->copy();

        while ($current->lte($end)) {
            // dayOfWeek: 0=Sun,1=Mon,2=Tue,...,6=Sat (Carbon)
            if (in_array($current->dayOfWeek, $days)) {
                // Avoid duplicate slots for same therapist/date/time
                $exists = Schedule::where('therapist_id', $therapistId)
                    ->where('date', $current->toDateString())
                    ->where('start_time', $validated['start_time'])
                    ->exists();

                if (!$exists) {
                    Schedule::create([
                        'therapist_id' => $therapistId,
                        'date' => $current->toDateString(),
                        'start_time' => $validated['start_time'],
                        'end_time' => $validated['end_time'],
                        'quota' => $validated['quota'],
                        'booked_count' => 0,
                        'status' => 'available',
                        'schedule_type' => $validated['schedule_type'] ?? 'consultation',
                    ]);
                    $created++;
                }
            }
            $current->addDay();
        }

        return redirect()->back()->with('success', "Berhasil menambahkan {$created} slot jadwal.");
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
