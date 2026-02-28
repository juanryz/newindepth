<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminScheduleController extends Controller
{
    public function index(Request $request)
    {
        $therapistId = $request->get('therapist_id');
        $startDate = $request->get('start'); // FullCalendar passes 'start'
        $endDate = $request->get('end'); // FullCalendar passes 'end'

        $query = Schedule::with(['therapist:id,name', 'bookings.patient.screeningResults', 'bookings.therapist'])
            ->orderBy('date')
            ->orderBy('start_time');

        if ($therapistId) {
            $query->where('therapist_id', $therapistId);
        }

        if ($startDate) {
            $query->where('date', '>=', \Carbon\Carbon::parse($startDate)->format('Y-m-d'));
        }
        if ($endDate) {
            $query->where('date', '<=', \Carbon\Carbon::parse($endDate)->format('Y-m-d'));
        }

        $schedules = $query->get()->map(function (Schedule $schedule) {
            $data = $schedule->toArray();

            // Format start and end for FullCalendar
            $date = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            $startTime = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
            $endTime = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');

            $data['start'] = $date . 'T' . $startTime;
            $data['end'] = $date . 'T' . $endTime;

            $data['formatted_date'] = $date;
            $data['formatted_start'] = $startTime;
            $data['formatted_end'] = $endTime;
            $data['therapist'] = $schedule->therapist ? $schedule->therapist->toArray() : null;
            $data['bookings'] = $schedule->bookings ? $schedule->bookings->toArray() : [];
            return $data;
        });

        // Get all therapists for the filter dropdown
        $therapists = User::role('therapist')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Schedules/Index', [
            'schedules' => $schedules,
            'therapists' => $therapists,
            'filters' => [
                'therapist_id' => $therapistId,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'therapist_id' => 'required|exists:users,id',
            'schedule_type' => 'required|in:consultation,class',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $date = \Carbon\Carbon::parse($request->date)->format('Y-m-d');
        $quota = $request->schedule_type === 'class' ? 10 : 1;

        $created = $this->generateSegments(
            $date,
            $request->start_time,
            $request->end_time,
            $request->therapist_id,
            $quota,
            $request->schedule_type
        );

        if ($created === 0) {
            return back()->withErrors(['error' => 'Tidak ada slot 2 jam yang valid ditemukan dalam rentang waktu tersebut sesuai jam operasional klinik.']);
        }

        return back()->with('success', "Berhasil menambahkan {$created} slot jadwal.");
    }

    private function generateSegments($date, $startTime, $endTime, $therapistId, $quota, $type)
    {
        $standardSlots = [
            ['start' => '08:00:00', 'end' => '10:00:00'],
            ['start' => '10:00:00', 'end' => '12:00:00'],
            ['start' => '13:00:00', 'end' => '15:00:00'],
            ['start' => '15:00:00', 'end' => '17:00:00'],
            ['start' => '18:00:00', 'end' => '20:00:00'],
        ];

        $userStart = \Carbon\Carbon::parse($startTime)->format('H:i:s');
        $userEnd = \Carbon\Carbon::parse($endTime)->format('H:i:s');
        $count = 0;

        foreach ($standardSlots as $slot) {
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

    public function show(Schedule $schedule)
    {
        $schedule->load([
            'therapist',
            'bookings.therapist',
            'bookings.patient.roles',
            'bookings.patient.screeningResults',
            'bookings.patient.transactions.transactionable',
            'bookings.patient.transactions.validatedBy',
        ]);

        $isSqlite = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite';
        $weekendSql = $isSqlite ? "strftime('%w', date) IN ('0', '6')" : "DAYOFWEEK(date) IN (1, 7)";

        $availableSchedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereRaw("NOT ({$weekendSql})")
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        $patients = User::role('patient')
            ->select('id', 'name', 'email')
            ->whereHas('transactions', function ($q) {
                $q->where('status', 'paid');
            })
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Schedules/Show', [
            'schedule' => $schedule,
            'availableSchedules' => $availableSchedules,
            'patients' => $patients
        ]);
    }

    public function destroy(Schedule $schedule)
    {
        if ($schedule->bookings()->count() > 0) {
            return back()->withErrors(['error' => 'Tidak dapat menghapus jadwal yang sudah dibooking.']);
        }

        $schedule->delete();

        return back()->with('success', 'Jadwal berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        if (!auth()->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $request->validate([
            'date_from' => 'required|date',
            'date_to' => 'required|date|after_or_equal:date_from',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'therapist_id' => 'nullable|exists:users,id',
        ]);

        $query = Schedule::query()
            ->where('date', '>=', $request->date_from)
            ->where('date', '<=', $request->date_to)
            ->where('booked_count', 0); // Only delete empty schedules

        if ($request->therapist_id) {
            $query->where('therapist_id', $request->therapist_id);
        }

        if ($request->start_time && $request->end_time) {
            $query->where(function ($q) use ($request) {
                // If the slot is completely within the disabled time OR overlaps it
                $q->where('start_time', '>=', $request->start_time)
                    ->where('end_time', '<=', $request->end_time);
            });
        }

        $deleted = $query->delete();

        return back()->with('success', "Berhasil meliburkan/menghapus {$deleted} slot jadwal yang belum terpesan.");
    }
}
