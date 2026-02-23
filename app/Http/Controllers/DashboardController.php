<?php

namespace App\Http\Controllers;

use App\Models\ScreeningResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load('roles');
        $screeningResult = null;
        $profileProgress = null;
        $canTakeScreening = true;
        $daysUntilNextScreening = 0;

        if ($user->hasRole('patient')) {
            // Ambil hasil screening terbaru yang sudah selesai
            $screeningResult = ScreeningResult::where('user_id', $user->id)
                ->whereNotNull('completed_at')
                ->latest('completed_at')
                ->first();

            if ($screeningResult && $screeningResult->completed_at) {
                $daysSinceLastScreening = $screeningResult->completed_at->diffInDays(now());
                if ($daysSinceLastScreening < 15) {
                    $canTakeScreening = false;
                    $daysUntilNextScreening = (int) (15 - $daysSinceLastScreening);
                }
            }

            // Hitung kelengkapan profil (11 kriteria wajib)
            $profileProgress = $user->getProfileCompletionStats();
        }

        $activeBooking = null;

        if ($user->hasRole('patient')) {
            // Fetch active booking: including pending ones requiring action
            $activeBooking = \App\Models\Booking::with(['schedule.therapist', 'transaction', 'therapist'])
                ->where('patient_id', $user->id)
                ->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed'])
                ->whereHas('schedule', function ($q) {
                    $q->whereDate('date', '>=', now()->toDateString());
                })
                ->latest()
                ->first();

            $latestCompletedBooking = \App\Models\Booking::with(['schedule.therapist', 'therapist'])
                ->where('patient_id', $user->id)
                ->where('status', 'completed')
                ->latest('updated_at')
                ->first();
        }

        $therapistUpcomingSessions = [];
        $therapistActiveSessions = [];
        $therapistPastSessions = [];
        $therapistStats = [];

        if ($user->hasRole('therapist') || $user->hasAnyRole(['admin', 'super_admin'])) {
            $baseBookingQuery = \App\Models\Booking::query();
            $baseCourseQuery = \App\Models\Course::query();

            // If not admin, filter by therapist_id
            if (!$user->hasAnyRole(['admin', 'super_admin'])) {
                $baseBookingQuery->where('bookings.therapist_id', $user->id);
                $baseCourseQuery->where('instructor_id', $user->id);
            }

            // Upcoming sessions
            $therapistUpcomingSessions = (clone $baseBookingQuery)
                ->join('schedules', 'bookings.schedule_id', '=', 'schedules.id')
                ->select('bookings.*')
                ->with(['patient', 'schedule.therapist', 'therapist'])
                ->whereIn('bookings.status', ['confirmed'])
                ->where('schedules.date', '>=', now()->toDateString())
                ->orderBy('schedules.date', 'asc')
                ->orderBy('schedules.start_time', 'asc')
                ->take(5)
                ->get();

            // Ongoing sessions (in_progress)
            $therapistActiveSessions = (clone $baseBookingQuery)
                ->with(['patient', 'schedule.therapist', 'therapist'])
                ->where('status', 'in_progress')
                ->get();

            // Past sessions (completed)
            $therapistPastSessions = (clone $baseBookingQuery)
                ->with(['patient', 'schedule.therapist', 'therapist'])
                ->where('status', 'completed')
                ->latest('updated_at')
                ->take(10)
                ->get();

            // Therapist Stats (Global if admin, otherwise specific)
            $therapistStats = [
                'total_sessions' => (clone $baseBookingQuery)->where('status', 'completed')->count(),
                'total_patients' => (clone $baseBookingQuery)->distinct()->count('patient_id'),
                'active_courses' => (clone $baseCourseQuery)->count(),
            ];
        }

        return Inertia::render('Dashboard', [
            'screeningResult' => $screeningResult,
            'profileProgress' => $profileProgress,
            'canTakeScreening' => $canTakeScreening,
            'daysUntilNextScreening' => $daysUntilNextScreening,
            'activeBooking' => $activeBooking,
            'latestCompletedBooking' => $latestCompletedBooking ?? null,
            'therapistUpcomingSessions' => $therapistUpcomingSessions,
            'therapistActiveSessions' => $therapistActiveSessions,
            'therapistPastSessions' => $therapistPastSessions,
            'therapistStats' => $therapistStats,
        ]);
    }
}
