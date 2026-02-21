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
                // Gunakan floatDiffInDays dan ceil untuk membulatkan ke atas menjadi integer
                $daysSinceLastScreening = now()->floatDiffInDays($screeningResult->completed_at);
                if ($daysSinceLastScreening < 15) {
                    $canTakeScreening = false;
                    $daysUntilNextScreening = (int) ceil(15 - $daysSinceLastScreening);
                }
            }

            // Hitung kelengkapan profil (5 field wajib)
            $fields = [
                'name' => ['label' => 'Nama Lengkap', 'filled' => filled($user->name)],
                'ktp_photo' => ['label' => 'Foto KTP', 'filled' => filled($user->ktp_photo)],
                'emergency_contact_name' => ['label' => 'Nama Kontak Darurat', 'filled' => filled($user->emergency_contact_name)],
                'emergency_contact_phone' => ['label' => 'Nomor Kontak Darurat', 'filled' => filled($user->emergency_contact_phone)],
                'emergency_contact_relation' => ['label' => 'Hubungan Kontak Darurat', 'filled' => filled($user->emergency_contact_relation)],
            ];

            $completedCount = count(array_filter(array_column($fields, 'filled')));
            $totalCount = count($fields);

            $profileProgress = [
                'percentage' => (int) round(($completedCount / $totalCount) * 100),
                'fields' => $fields,
                'completed' => $completedCount,
                'total' => $totalCount,
            ];
        }

        $activeBooking = null;

        if ($user->hasRole('patient')) {
            // Fetch active booking (not failed or cancelled)
            $activeBooking = \App\Models\Booking::with(['schedule.therapist', 'transaction', 'therapist'])
                ->where('patient_id', $user->id)
                ->whereNotIn('status', ['failed', 'cancelled'])
                ->latest()
                ->first();
        }

        return Inertia::render('Dashboard', [
            'screeningResult' => $screeningResult,
            'profileProgress' => $profileProgress,
            'canTakeScreening' => $canTakeScreening,
            'daysUntilNextScreening' => $daysUntilNextScreening,
            'activeBooking' => $activeBooking,
        ]);
    }
}
