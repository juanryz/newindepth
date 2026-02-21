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
        $bookings = Booking::with([
            'schedule',
            'patient.screeningResults',
            'patient.courses',
            'patient.bookings' => function ($query) {
                $query->with('schedule.therapist')->whereIn('status', ['confirmed', 'completed'])->orderBy('created_at', 'desc');
            }
        ])
            ->whereHas('schedule', function ($query) use ($request) {
                $query->where('therapist_id', (int) $request->user()->id);
            })
            ->whereIn('status', ['confirmed', 'completed']) // Show active and past sessions
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            })
            ->sortBy('schedule.date')
            ->values();

        return Inertia::render('Clinic/Schedules/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function completeSession(Request $request, Booking $booking)
    {
        // Ensure the current therapist owns this booking's schedule
        if ($booking->schedule->therapist_id != $request->user()->id && !$request->user()->hasAnyRole(['admin', 'super_admin'])) {
            abort(403);
        }

        $request->validate([
            'recording_link' => 'required|url',
            'therapist_notes' => 'nullable|string',
            'patient_visible_notes' => 'nullable|string',
        ]);

        $booking->update([
            'status' => 'completed',
            'recording_link' => $request->recording_link,
            'therapist_notes' => $request->therapist_notes,
            'patient_visible_notes' => $request->patient_visible_notes,
        ]);

        return redirect()->back()->with('success', 'Sesi berhasil diselesaikan dan link rekaman serta catatan telah disimpan.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'quota' => 'required|integer|min:1',
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
