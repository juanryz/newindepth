<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\ClinicSetting;
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

            'patient.bookings' => function ($query) {
                $query->with('schedule.therapist')->whereIn('status', ['confirmed', 'completed'])->orderBy('created_at', 'desc');
            }
        ]);

        if (!$isAdmin) {
            $bookingsQuery->where('therapist_id', $user->id);
        }

        $rawBookings = $bookingsQuery->whereIn('status', ['confirmed', 'in_progress', 'completed'])
            ->get();

        // Map schedules that belong to a GroupBooking
        $scheduleGroupMap = \App\Models\GroupBooking::whereIn('schedule_id', $rawBookings->pluck('schedule_id')->filter())
            ->withCount('members')
            ->get()
            ->keyBy('schedule_id');

        $groupedBookings = collect();
        $processedScheduleIds = [];

        foreach ($rawBookings as $b) {
            if ($b->schedule_id && $scheduleGroupMap->has($b->schedule_id)) {
                if (in_array($b->schedule_id, $processedScheduleIds)) {
                    continue; // Map only 1 booking to represent the whole group
                }
                $processedScheduleIds[] = $b->schedule_id;
                $gb = $scheduleGroupMap->get($b->schedule_id);

                $b->is_group = true;
                $b->group_booking = $gb;
                // Hijack the patient object for display purposes
                $b->patient = (object)[
                    'id' => null, // Prevents linking to arbitrary individual patient detail
                    'name' => '🏢 GRUP: ' . $gb->group_name . ' (' . $gb->members_count . ' p.ax)',
                    'email' => 'Instansi: ' . ($gb->institution_name ?? $gb->group_name),
                ];
                $groupedBookings->push($b);
            } else {
                if ($b->patient) {
                    $b->patient_profile_stats = $b->patient->getProfileCompletionStats();
                }
                $groupedBookings->push($b);
            }
        }

        $bookings = $groupedBookings
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

        if (!$isAdmin) {
            $schedulesQuery->where('date', '>=', now()->toDateString());
        }

        $availableSchedules = $schedulesQuery
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

        $calendarSchedules = collect();
        $calendarProcessedSchedules = [];

        foreach ($allSchedules as $schedule) {
            $date = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            $startTime = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
            $endTime = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');

            $myBooking = null;
            if (!$isAdmin) {
                $myBooking = $schedule->bookings->firstWhere('therapist_id', $user->id);
            }

            $isMine = $isAdmin ? true : ($schedule->therapist_id === $user->id || $myBooking !== null);

            // Group Booking Hijack for Calendar
            $gBooking = \App\Models\GroupBooking::where('schedule_id', $schedule->id)->withCount('members')->first();
            
            $title = 'Tugas Sesi';
            if ($gBooking) {
                $title = '🏢 GRUP: ' . $gBooking->group_name . ' (' . $gBooking->members_count . ' org)';
            } elseif ($myBooking && $myBooking->patient) {
                $title = $myBooking->patient->name;
            } elseif ($schedule->therapist) {
                $title = $schedule->therapist->name;
            }

            // Only pass 1 booking to calendar if it's a group, so we don't duplicate events for N members
            $calBookings = $schedule->bookings->values();
            if ($gBooking) {
                $calBookings = collect([$schedule->bookings->first()]);
            }
            if (!$isAdmin) {
                $calBookings = clone $calBookings->where('therapist_id', $user->id)->values();
            }

            $calendarSchedules->push([
                'id' => $schedule->id,
                'title' => $title,
                'start' => $date . 'T' . $startTime,
                'end' => $date . 'T' . $endTime,
                'backgroundColor' => null, // Use default or component colors
                'extendedProps' => [
                    'bookings' => $calBookings,
                    'therapist' => $schedule->therapist,
                    'schedule_type' => $schedule->schedule_type,
                    'status' => $schedule->status,
                    'is_mine' => $isMine,
                ]
            ]);
        }

        $mySchedules = [];
        if (!$isAdmin) {
            $mySchedules = Schedule::with(['bookings.patient'])
                ->where('therapist_id', $user->id)
                ->where('date', '>=', now()->toDateString())
                ->orderBy('date')
                ->orderBy('start_time')
                ->get()
                ->map(function ($schedule) {
                    // Ensure date is always Y-m-d string (not Carbon object which serializes to ISO with timezone shifts)
                    $dateStr = $schedule->date instanceof \Carbon\Carbon
                        ? $schedule->date->format('Y-m-d')
                        : (is_string($schedule->date) ? substr($schedule->date, 0, 10) : $schedule->date);

                    // Ensure time strings are properly formatted (handle both string and Carbon)
                    $startTime = $schedule->start_time instanceof \Carbon\Carbon
                        ? $schedule->start_time->format('H:i')
                        : substr((string) $schedule->start_time, 0, 5);
                    $endTime = $schedule->end_time instanceof \Carbon\Carbon
                        ? $schedule->end_time->format('H:i')
                        : substr((string) $schedule->end_time, 0, 5);

                    return [
                        'id' => $schedule->id,
                        'date' => $dateStr,
                        'start_time' => $startTime,
                        'end_time' => $endTime,
                        'quota' => $schedule->quota,
                        'booked_count' => $schedule->booked_count,
                        'status' => $schedule->status,
                        'schedule_type' => $schedule->schedule_type,
                        'patient_name' => $schedule->bookings->first()?->patient?->name,
                    ];
                });
        }

        // --- GROUP BOOKINGS ---
        $groupBookingsQuery = \App\Models\GroupBooking::with(['schedule.therapist', 'createdBy'])
            ->withCount('members')
            ->orderBy('created_at', 'desc');

        if (!$isAdmin) {
            $groupBookingsQuery->whereHas('schedule', function ($q) use ($user) {
                $q->where('therapist_id', $user->id);
            });
        }

        $groupBookings = $groupBookingsQuery->get()->map(function ($group) {
            return [
                'id'               => $group->id,
                'invoice_number'   => $group->invoice_number,
                'group_name'       => $group->group_name,
                'institution_name' => $group->institution_name ?? $group->group_name,
                'pic_name'         => $group->pic_name,
                'pic_phone'        => $group->pic_phone,
                'payment_method'   => $group->payment_method,
                'payment_status'   => $group->payment_status,
                'total_amount'     => $group->total_amount,
                'members_count'    => $group->members_count,
                'package_type'     => $group->package_type,
                'session_type'     => $group->session_type,
                'created_at'       => $group->created_at,
                'paid_at'          => $group->paid_at,
                'schedule'         => $group->schedule ? [
                    'id'         => $group->schedule->id,
                    'date'       => $group->schedule->date,
                    'start_time' => $group->schedule->start_time,
                    'end_time'   => $group->schedule->end_time,
                    'therapist'  => $group->schedule->therapist ? ['id' => $group->schedule->therapist->id, 'name' => $group->schedule->therapist->name] : null,
                ] : null,
                'created_by_name' => $group->createdBy?->name,
            ];
        })->toArray();
        // --- END GROUP BOOKINGS ---

        // Load clinic settings with graceful fallback if table doesn't exist yet
        try {
            $clinicSettings = [
                'open_time' => ClinicSetting::getValue('clinic_open_time', '08:00'),
                'close_time' => ClinicSetting::getValue('clinic_close_time', '22:00'),
                'standard_slots' => ClinicSetting::getStandardSlots(),
                'session_auto_close_min' => ClinicSetting::getSessionAutoCloseMins(),
            ];
        } catch (\Throwable $e) {
            $clinicSettings = [
                'open_time' => '08:00',
                'close_time' => '22:00',
                'standard_slots' => [],
                'session_auto_close_min' => 95,
            ];
        }

        return Inertia::render('Clinic/Schedules/Index', [
            'bookings' => $bookings,
            'groupBookings' => $groupBookings,
            'availableSchedules' => $availableSchedules,
            'calendarSchedules' => $calendarSchedules,
            'mySchedules' => $mySchedules,
            'serverNow' => now()->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s'),
            'clinicSettings' => $clinicSettings,
            'isAdmin' => $isAdmin,
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

        ]);

        $isAdmin = $request->user()->hasAnyRole(['admin', 'super_admin']);

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
            'isAdmin' => $isAdmin,
        ]);
    }

    public function startSession(Request $request, Booking $booking)
    {
        // Ensure the current therapist owns this booking's schedule-
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        if ($booking->status !== 'confirmed') {
            return redirect()->back()->withErrors(['error' => 'Hanya sesi yang sudah dikonfirmasi yang dapat dimulai.']);
        }

        // Prevent starting a session too early or if it has already passed
        if ($booking->schedule) {
            $datePart = \Carbon\Carbon::parse($booking->schedule->date)->format('Y-m-d');
            $scheduleStart = \Carbon\Carbon::parse($datePart . ' ' . $booking->schedule->start_time, 'Asia/Jakarta');
            $scheduleEnd = \Carbon\Carbon::parse($datePart . ' ' . $booking->schedule->end_time, 'Asia/Jakarta');

            // Allow starting up to 30 mins before
            $allowableStart = $scheduleStart->copy()->subMinutes(30);

            if (now('Asia/Jakarta')->lt($allowableStart)) {
                return redirect()->back()->withErrors(['error' => 'Belum waktunya. Sesi hanya dapat dimulai maksimal 30 menit sebelum jadwal.']);
            }

            if (now('Asia/Jakarta')->gt($scheduleEnd)) {
                return redirect()->back()->withErrors(['error' => 'Tidak dapat memulai sesi yang sudah berlalu.']);
            }
        }

        Booking::where('schedule_id', $booking->schedule_id)->update([
            'status' => 'in_progress',
            'started_at' => now(),
        ]);

        try {
            \Illuminate\Support\Facades\Mail::to($booking->patient->email)->send(new \App\Mail\SessionStarted($booking));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Failed to send session started email: ' . $e->getMessage());
        }

        return redirect()->route('schedules.active-session', $booking->id)->with('success', 'Sesi terapi dimulai.');
    }

    public function activeSession(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin/cs
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
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

        $isAdmin = $request->user()->hasAnyRole(['admin', 'super_admin']);

        return Inertia::render('Clinic/Schedules/ActiveSession', [
            'booking' => $booking,
            'patient' => $booking->patient->load('screeningResults'),
            'isAdmin' => $isAdmin,
        ]);
    }

    public function completeSession(Request $request, Booking $booking)
    {
        // Ensure the current therapist owns this booking's schedule
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        $isAuto = $request->boolean('is_auto');

        if (!$isAuto) {
            $request->validate([
                'recording_link' => 'required|url',
                'therapist_notes' => 'nullable|string',
                'patient_visible_notes' => 'nullable|string',
                'completion_outcome' => 'required|string|in:Normal,Abnormal/Emergency',
                'session_checklist' => 'nullable|array',
            ]);
        }

        $therapistNotes = $request->therapist_notes;
        $patientNotes = $request->patient_visible_notes;

        if ($isAuto) {
            $therapistNotes = ($therapistNotes ? $therapistNotes . "\n\n" : "") . "[Sesi ditutup otomatis oleh sistem karena melebihi durasi " . ClinicSetting::getSessionAutoCloseMins() . " menit]";
            $patientNotes = ($patientNotes ? $patientNotes . "\n\n" : "") . "Sesi telah berakhir otomatis sesuai durasi standar.";
        }

        Booking::where('schedule_id', $booking->schedule_id)->update([
            'status' => 'completed',
            'ended_at' => now(),
            'recording_link' => $request->recording_link,
            'therapist_notes' => $therapistNotes,
            'patient_visible_notes' => $patientNotes,
            'completion_outcome' => $request->completion_outcome ?? 'Normal',
            'session_checklist' => $request->session_checklist,
        ]);

        try {
            \Illuminate\Support\Facades\Mail::to($booking->patient->email)->send(new \App\Mail\SessionCompleted($booking));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Failed to send session completed email: ' . $e->getMessage());
        }

        return redirect()->route('schedules.patient-detail', $booking->patient_id)->with('success', $isAuto ? 'Sesi ditutup otomatis oleh sistem.' : 'Sesi berhasil diselesaikan dan link rekaman serta catatan telah disimpan.');
    }

    public function rescheduleSession(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        $isAdmin = $request->user()->hasAnyRole(['admin', 'super_admin']);

        // Admin can also reschedule completed no-show bookings (for data correction)
        $allowedStatuses = ['confirmed', 'in_progress', 'pending_validation', 'pending_payment'];
        if ($isAdmin) {
            $allowedStatuses[] = 'completed';
        }
        if (!in_array($booking->status, $allowedStatuses)) {
            return redirect()->back()->withErrors(['error' => 'Status sesi ini tidak dapat dijadwal ulang (hanya bisa dikonfirmasi atau menunggu).']);
        }

        $request->validate([
            'new_schedule_id' => 'nullable|exists:schedules,id',
            'new_date' => 'required_without:new_schedule_id|nullable|date',
            'new_start_time' => 'required_with:new_date|nullable|date_format:H:i',
            'new_end_time' => 'required_with:new_date|nullable|date_format:H:i|after:new_start_time',
            'reschedule_reason' => 'required|string|max:500',
            'completion_outcome' => 'nullable|string|in:Normal,No-Show (Pasien),No-Show (Praktisi)',
        ]);

        if ($request->new_schedule_id) {
            $newSchedule = Schedule::findOrFail($request->new_schedule_id);
            if (!$isAdmin && ($newSchedule->status !== 'available' || $newSchedule->booked_count >= $newSchedule->quota)) {
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

        $newStatus = (function () use ($booking, $newSchedule, $isAdmin) {
            if (in_array($booking->status, ['in_progress', 'confirmed', 'no_show', 'completed'])) {
                if ($isAdmin && $newSchedule->date < now('Asia/Jakarta')->toDateString()) {
                    return 'completed';
                }
                return 'confirmed';
            }
            return $booking->status;
        })();

        $updateData = [
            'schedule_id' => $newSchedule->id,
            'original_schedule_id' => $booking->original_schedule_id ?? $oldScheduleId,
            'reschedule_reason' => $request->reschedule_reason,
            'rescheduled_by' => $request->user()->id,
            'rescheduled_at' => now(),
            'status' => $newStatus,
            'started_at' => null,
        ];

        if ($isAdmin && $request->filled('completion_outcome')) {
            $updateData['completion_outcome'] = $request->completion_outcome;
        }

        Booking::where('schedule_id', $oldScheduleId)->update($updateData);

        // Notify patient
        if ($booking->patient) {
            $booking->patient->notify(new \App\Notifications\BookingRescheduled($booking, $request->reschedule_reason));
        }

        return redirect()->back()->with('success', 'Sesi berhasil dijadwal ulang.');
    }

    public function markNoShow(Request $request, Booking $booking)
    {
        // Auth: therapist yang punya booking, atau admin
        $actualTherapistId = $booking->therapist_id ?? $booking->schedule?->therapist_id;
        if ($actualTherapistId != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        if (!in_array($booking->status, ['confirmed', 'in_progress'])) {
            return redirect()->back()->withErrors(['error' => 'Hanya sesi aktif yang bisa ditandai tidak hadir.']);
        }

        $request->validate([
            'no_show_party' => 'required|in:patient,therapist',
            'no_show_reason' => 'nullable|string|max:500',
        ]);

        Booking::where('schedule_id', $booking->schedule_id)->update([
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
        // NOTE: days_of_week can contain 0 (Sunday). Laravel's 'required' on arrays
        // may strip falsy values in some serialization scenarios.
        // We manually extract and cast to int BEFORE validation.
        $rawDays = $request->input('days_of_week', []);
        $days = array_values(array_unique(array_map('intval', (array) $rawDays)));

        // Reinject the cleaned days back so validation sees them
        $request->merge(['days_of_week' => $days]);

        $validated = $request->validate([
            'days_of_week' => 'required|array|min:1',
            'days_of_week.*' => 'integer|between:0,6', // 0=Sun, 1=Mon, ..., 6=Sat
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'date_from' => 'required|date|after_or_equal:today',
            'date_to' => 'required|date|after_or_equal:date_from',
            'quota' => 'required|integer|min:1|max:20',
            'schedule_type' => 'nullable|string|in:consultation,class',
        ]);

        $therapistId = $request->user()->id;
        // Use startOfDay with explicit timezone to avoid drift
        $start = \Carbon\Carbon::createFromFormat('Y-m-d', $validated['date_from'], 'Asia/Jakarta')->startOfDay();
        $end = \Carbon\Carbon::createFromFormat('Y-m-d', $validated['date_to'], 'Asia/Jakarta')->startOfDay();

        // Final cast — ensure all values are int so strict in_array works
        $days = array_values(array_unique(array_map('intval', $validated['days_of_week'])));

        $created = 0;
        $current = $start->copy();

        while ($current->lte($end)) {
            // Carbon dayOfWeek: 0=Sunday, 1=Monday, ..., 6=Saturday
            // Use strict comparison to avoid type-coercion bugs (0 == false, etc.)
            if (in_array((int) $current->dayOfWeek, $days, true)) {
                $created += $this->generateSegments(
                    $current->format('Y-m-d'),
                    $validated['start_time'],
                    $validated['end_time'],
                    $therapistId,
                    $validated['quota'],
                    $validated['schedule_type'] ?? 'consultation'
                );
            }
            $current->addDay()->startOfDay();
        }

        return redirect()->back()->with('success', "$created slot jadwal berhasil dibuat.");
    }

    public function bulkDelete(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'nullable|array',
            'ids.*' => 'integer|exists:schedules,id',
            'delete_all' => 'nullable|boolean',
            'filter_status' => 'nullable|string|in:available,full',
        ]);

        $therapistId = $request->user()->id;
        $isAdmin = $request->user()->hasAnyRole(['admin', 'super_admin']);

        // Instead of strict booked_count = 0, we check if there are no active bookings.
        // This allows safely deleting "bugged" slots left behind by deleted users.
        $query = Schedule::whereDoesntHave('bookings', function ($q) {
            $q->whereIn('status', ['confirmed', 'in_progress']);
        })
            ->where('date', '>=', now()->toDateString());

        if (!$isAdmin) {
            $query->where('therapist_id', $therapistId);
        }

        $schedulesToDelete = collect();
        if (!empty($validated['delete_all'])) {
            if (!empty($validated['filter_status'])) {
                $query->where('status', $validated['filter_status']);
            }
            $schedulesToDelete = $query->get();
        } elseif (!empty($validated['ids'])) {
            // Re-apply the same query (which now filters out active bookings) but just for the specific IDs. 
            // This prevents deleting active bookings if a user manipulated the IDs.
            $schedulesToDelete = $query->whereIn('id', $validated['ids'])->get();
        } else {
            return redirect()->back()->withErrors(['error' => 'Tidak ada jadwal yang dipilih untuk dihapus.']);
        }

        $count = 0;
        $failed = 0;

        foreach ($schedulesToDelete as $sc) {
            try {
                $sc->delete();
                $count++;
            } catch (\Illuminate\Database\QueryException $e) {
                // It has a historical/cancelled booking attached. Detach it so we can delete.
                \App\Models\Booking::where('schedule_id', $sc->id)->update([
                    'schedule_id' => null,
                    'notes' => 'Jadwal dihapus (Belum Ditentukan)'
                ]);
                \App\Models\Booking::where('original_schedule_id', $sc->id)->update([
                    'original_schedule_id' => null
                ]);

                // Try deleting again after detaching
                try {
                    $sc->delete();
                    $count++;
                } catch (\Exception $e2) {
                    $failed++;
                }
            }
        }

        $msg = "$count slot jadwal berhasil dihapus.";
        if ($failed > 0) {
            $msg .= " ($failed slot tidak dihapus karena error tidak terduga).";
        }

        return redirect()->back()->with('success', $msg);
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

        $therapistId = $request->user()->id;

        $created = $this->generateSegments(
            $validated['date'],
            $validated['start_time'],
            $validated['end_time'],
            $therapistId,
            $validated['quota'],
            $validated['schedule_type'] ?? 'consultation'
        );

        if ($created === 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak ada slot 2 jam yang valid ditemukan dalam rentang waktu tersebut sesuai jam operasional klinik.']);
        }

        return redirect()->back()->with('success', "Berhasil menambahkan {$created} slot jadwal.");
    }

    private function generateSegments($date, $startTime, $endTime, $therapistId, $quota, $type)
    {
        // Load standard slots dynamically from clinic settings
        // Wrapped in try-catch in case migration hasn't run yet on production
        try {
            $standardSlots = ClinicSetting::getStandardSlots();
        } catch (\Throwable $e) {
            // Fallback if clinic_settings table doesn't exist yet
            $standardSlots = [
                ['start' => '08:00:00', 'end' => '10:00:00', 'label' => 'Sesi 1'],
                ['start' => '10:00:00', 'end' => '12:00:00', 'label' => 'Sesi 2'],
                ['start' => '13:00:00', 'end' => '15:00:00', 'label' => 'Sesi 3'],
                ['start' => '15:00:00', 'end' => '17:00:00', 'label' => 'Sesi 4'],
                ['start' => '18:00:00', 'end' => '20:00:00', 'label' => 'Sesi 5'],
            ];
        }

        // Format user times to HH:mm:ss for comparison
        $userStart = \Carbon\Carbon::parse($startTime)->format('H:i:s');
        $userEnd = \Carbon\Carbon::parse($endTime)->format('H:i:s');
        $count = 0;

        foreach ($standardSlots as $slot) {
            // Check if user's availability range encloses this standard slot
            if ($userStart <= $slot['start'] && $userEnd >= $slot['end']) {
                $exists = Schedule::where('therapist_id', $therapistId)
                    ->where('date', $date)
                    ->where('start_time', $slot['start'])
                    ->exists();

                if (!$exists) {
                    Schedule::create([
                        'therapist_id' => $therapistId,
                        'date' => $date,
                        'start_time' => $slot['start'],
                        'end_time' => $slot['end'],
                        'quota' => $quota,
                        'booked_count' => 0,
                        'status' => 'available',
                        'schedule_type' => $type,
                    ]);
                    $count++;
                }
            }
        }

        return $count;
    }

    public function destroy(Schedule $schedule)
    {
        if ($schedule->therapist_id != auth()->id() && !auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        if ($schedule->bookings()->whereIn('status', ['confirmed', 'in_progress'])->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak bisa menghapus jadwal yang sedang ada pesanan aktif.']);
        }

        try {
            $schedule->delete();
            return redirect()->back()->with('success', 'Jadwal berhasil dihapus.');
        } catch (\Illuminate\Database\QueryException $e) {
            // Detach and delete
            \App\Models\Booking::where('schedule_id', $schedule->id)->update([
                'schedule_id' => null,
                'notes' => 'Jadwal dihapus (Belum Ditentukan)'
            ]);
            \App\Models\Booking::where('original_schedule_id', $schedule->id)->update([
                'original_schedule_id' => null
            ]);

            $schedule->delete();
            return redirect()->back()->with('success', 'Jadwal berhasil dihapus. (Pesanan riwayat diubah menjadi Belum Ditentukan).');
        }
    }
}
