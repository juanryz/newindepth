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

        $query = Schedule::with(['therapist:id,name', 'bookings'])
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

        $schedules = $query->get()->map(function ($schedule) {
            $data = $schedule->toArray();
            $data['formatted_date'] = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            $data['formatted_start'] = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
            $data['formatted_end'] = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');
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
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // Check if therapist already has this slot
        $exists = Schedule::where('therapist_id', $request->therapist_id)
            ->where('date', $request->date)
            ->where('start_time', $request->start_time)
            ->exists();

        if ($exists) {
            return back()->withErrors(['start_time' => 'Jadwal ini sudah ada untuk terapis tersebut.']);
        }

        Schedule::create([
            'therapist_id' => $request->therapist_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
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
