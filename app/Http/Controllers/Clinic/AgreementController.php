<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgreementController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        // Redirect if already signed or completed in session
        if ($user->agreement_signed_at || session()->has('initial_agreement_completed')) {
            return redirect()->route('bookings.create');
        }

        // Ensure user has completed screening but hasn't booked or fully agreed yet if we want to restrict
        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show')->with('error', 'Silakan selesaikan skrining terlebih dahulu.');
        }

        $usia = ($user->screening_answers['usia'] ?? null) ?: ($user->screening_answers['age'] ?? null);

        $screeningResult = \App\Models\ScreeningResult::where('user_id', $user->id)
            ->whereNotNull('completed_at')
            ->latest('completed_at')
            ->first();

        return Inertia::render('Clinic/InitialAgreement', [
            'userAge' => $usia !== null ? (int)$usia : null,
            'screeningResult' => $screeningResult,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'agreement_data' => 'required|array',
            'signature' => 'nullable|string', // Capture the base64 signature if available
        ]);

        $user = $request->user();

        // Mark it as completed in session for immediate feedback
        session()->put('initial_agreement_completed', true);

        // Persist to database to update profile completion stats
        $user->update([
            'agreement_signed_at' => now(),
            'digital_signature' => $request->input('signature') ?? $validated['agreement_data']['signature'] ?? null,
        ]);

        return redirect()->route('bookings.create')->with('success', 'Persyaratan awal disetujui, silakan pilih jadwal.');
    }
}
