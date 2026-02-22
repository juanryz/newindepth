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
            // Fetch active booking: only confirmed, and schedule date has not passed
            $activeBooking = \App\Models\Booking::with(['schedule.therapist', 'transaction', 'therapist'])
                ->where('patient_id', $user->id)
                ->where('status', 'confirmed')
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

        return Inertia::render('Dashboard', [
            'screeningResult' => $screeningResult,
            'profileProgress' => $profileProgress,
            'canTakeScreening' => $canTakeScreening,
            'daysUntilNextScreening' => $daysUntilNextScreening,
            'activeBooking' => $activeBooking,
            'latestCompletedBooking' => $latestCompletedBooking ?? null,
        ]);
    }
}
