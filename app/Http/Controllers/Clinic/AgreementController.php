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

        // Ensure user has completed screening but hasn't booked or fully agreed yet if we want to restrict
        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show')->with('error', 'Silakan selesaikan skrining terlebih dahulu.');
        }

        // We can pass user info to prefill age checking or just rely on form
        return Inertia::render('Clinic/InitialAgreement', [
            'userAge' => $user->age ?? null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'agreement_data' => 'required|array',
        ]);

        // You may want to store this in an `agreements` table, a JSON column on `users`, 
        // or just consider it as a pre-requisite step for session flow.
        // For now, we will mark it in the session to allow proceeding to booking.
        session()->put('initial_agreement_completed', true);

        // Optionally store the agreement data in the user profile if needed
        // $user = $request->user();
        // $user->update(['initial_agreement' => $validated['agreement_data']]);

        return redirect()->route('bookings.create')->with('success', 'Persyaratan awal disetujui, silakan pilih jadwal.');
    }
}
