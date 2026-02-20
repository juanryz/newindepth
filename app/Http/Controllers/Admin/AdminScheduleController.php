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
        $date = $request->get('date', now()->format('Y-m-d'));

        $query = Schedule::with(['therapist:id,name', 'bookings'])
            ->orderBy('date')
            ->orderBy('time_slot');

        if ($therapistId) {
            $query->where('therapist_id', $therapistId);
        }

        if ($date) {
            // Show schedules from the selected date onwards (up to 30 days)
            $query->where('date', '>=', $date)
                ->where('date', '<=', \Carbon\Carbon::parse($date)->addDays(30)->format('Y-m-d'));
        }

        $schedules = $query->get()->groupBy(function ($schedule) {
            return $schedule->date->format('Y-m-d');
        });

        // Get all therapists for the filter dropdown
        $therapists = User::role('therapist')
            ->where('status', 'active')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Schedules/Index', [
            'schedulesByDate' => $schedules,
            'therapists' => $therapists,
            'filters' => [
                'therapist_id' => $therapistId,
                'date' => $date,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'therapist_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required|date_format:H:i',
        ]);

        // Check if therapist already has this slot
        $exists = Schedule::where('therapist_id', $request->therapist_id)
            ->where('date', $request->date)
            ->where('time_slot', $request->time_slot)
            ->exists();

        if ($exists) {
            return back()->withErrors(['time_slot' => 'Jadwal ini sudah ada untuk terapis tersebut.']);
        }

        Schedule::create([
            'therapist_id' => $request->therapist_id,
            'date' => $request->date,
            'time_slot' => $request->time_slot,
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
