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
            $activeBooking = \App\Models\Booking::with(['schedule.therapist', 'transaction', 'therapist', 'groupBookingMember.groupBooking'])
                ->where('patient_id', $user->id)
                ->where(function ($q) {
                    $q->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed'])
                        ->whereHas('schedule', function ($sq) {
                            $sq->whereDate('date', '>=', now()->toDateString());
                        })
                        ->orWhere('status', 'in_progress');
                })
                ->latest()
                ->first();

            $latestCompletedBooking = \App\Models\Booking::with(['schedule.therapist', 'therapist', 'groupBookingMember.groupBooking'])
                ->where('patient_id', $user->id)
                ->where('status', 'completed')
                ->latest('updated_at')
                ->first();
        }

        $therapistUpcomingSessions = [];
        $therapistActiveSessions = [];
        $therapistPastSessions = [];
        $therapistStats = [];
        $recentPatients = [];

        if ($user->hasRole('therapist') || $user->hasAnyRole(['admin', 'super_admin'])) {
            // Fetch recent patients for Admin/Therapist
            $recentPatients = \App\Models\User::role('patient')
                ->whereNotNull('screening_completed_at')
                ->latest('screening_completed_at')
                ->take(5)
                ->get();
            $baseBookingQuery = \App\Models\Booking::query();


            // If not admin, filter by therapist_id
            if (!$user->hasAnyRole(['admin', 'super_admin'])) {
                $baseBookingQuery->where('bookings.therapist_id', $user->id);

            }

            // Upcoming + overdue confirmed sessions (include past sessions that still need action)
            $todayStr = now()->toDateString(); // Compatible with both SQLite and MySQL
            $therapistUpcomingSessions = (clone $baseBookingQuery)
                ->join('schedules', 'bookings.schedule_id', '=', 'schedules.id')
                ->select('bookings.*')
                ->with(['patient', 'schedule.therapist', 'therapist', 'groupBookingMember.groupBooking'])
                ->whereIn('bookings.status', ['confirmed'])
                ->where(function ($q) {
                    // Show upcoming sessions AND past sessions within 30 days back that still need action
                    $q->where('schedules.date', '>=', now()->subDays(30)->toDateString());
                })
                ->orderByRaw("CASE WHEN schedules.date < ? THEN 0 ELSE 1 END ASC", [$todayStr]) // overdue first
                ->orderBy('schedules.date', 'asc')
                ->orderBy('schedules.start_time', 'asc')
                ->take(10)
                ->get();

            // Ongoing sessions (in_progress)
            $therapistActiveSessions = (clone $baseBookingQuery)
                ->with(['patient', 'schedule.therapist', 'therapist', 'groupBookingMember.groupBooking'])
                ->where('status', 'in_progress')
                ->get();

            // Past sessions (completed)
            $therapistPastSessions = (clone $baseBookingQuery)
                ->join('schedules', 'bookings.schedule_id', '=', 'schedules.id')
                ->select('bookings.*')
                ->with(['patient', 'schedule.therapist', 'therapist', 'groupBookingMember.groupBooking'])
                ->where('bookings.status', 'completed')
                ->orderBy('schedules.date', 'desc')
                ->orderBy('schedules.start_time', 'desc')
                ->take(10)
                ->get();

            // Therapist Stats (Global if admin, otherwise specific)
            $therapistStats = [
                'total_sessions' => (clone $baseBookingQuery)->where('status', 'completed')->count(),
                'total_patients' => (clone $baseBookingQuery)
                    ->whereIn('status', ['confirmed', 'in_progress', 'completed'])
                    ->distinct()
                    ->count('patient_id'),

            ];

            if ($user->hasAnyRole(['admin', 'super_admin'])) {
                $therapistStats['stacked_status'] = [
                    'confirmed' => \App\Models\Booking::where('status', 'confirmed')->count(),
                    'pending' => \App\Models\Booking::whereIn('status', ['pending_payment', 'pending_validation'])->count(),
                    'completed' => \App\Models\Booking::where('status', 'completed')->count(),
                    'cancelled' => \App\Models\Booking::whereIn('status', ['cancelled', 'expired'])->count(),
                ];
            }
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
            'recentPatients' => $recentPatients,
        ]);
    }
}
