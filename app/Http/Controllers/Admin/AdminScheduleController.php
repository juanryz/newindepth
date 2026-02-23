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
            'schedule_type' => 'required|in:consultation,class',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // Normalize new times to HH:mm:ss for consistent comparison
        $newStart = \Carbon\Carbon::createFromFormat('H:i', $request->start_time)->format('H:i:s');
        $newEnd = \Carbon\Carbon::createFromFormat('H:i', $request->end_time)->format('H:i:s');

        // Normalize the date too (strip the time portion SQLite may have stored)
        $date = \Carbon\Carbon::parse($request->date)->format('Y-m-d');

        // Check if exact same schedule slot exists to avoid duplicates
        $overlap = Schedule::whereRaw("SUBSTR(date, 1, 10) = ?", [$date])
            ->whereRaw("SUBSTR(start_time, 1, 8) = ?", [$newStart])
            ->whereRaw("SUBSTR(end_time,   1, 8) = ?", [$newEnd])
            ->exists();

        if ($overlap) {
            return back()->withErrors([
                'start_time' => 'Slot jadwal ini sudah tersedia di tanggal tersebut.',
            ]);
        }

        Schedule::create([
            'schedule_type' => $request->schedule_type,
            'date' => $date,
            'start_time' => $newStart,
            'end_time' => $newEnd,
        ]);

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function show(Schedule $schedule)
    {
        $schedule->load(['therapist', 'bookings.patient.screeningResults', 'bookings.therapist']);

        $availableSchedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Admin/Schedules/Show', [
            'schedule' => $schedule,
            'availableSchedules' => $availableSchedules
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
}
