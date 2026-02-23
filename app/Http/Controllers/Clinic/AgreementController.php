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

        // If already signed and still valid, show the signed details instead of redirecting
        if ($user->hasValidAgreement()) {
            return Inertia::render('Clinic/AgreementDetail', [
                'userModel' => $user,
            ]);
        }

        // If completed in session but not persisted yet, we might still want to show the form or redirect.
        // But usually store() handles persistence.
        if (session()->has('initial_agreement_completed')) {
            return Inertia::render('Clinic/AgreementDetail', [
                'userModel' => $user,
            ]);
        }
        $answers = $user->screening_answers ?? [];
        $usia = ($answers['usia'] ?? null) ?: ($answers['age'] ?? null);

        return Inertia::render('Clinic/InitialAgreement', [
            'userAge' => $usia !== null ? (int) $usia : null,
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
            'agreement_signed' => true,
            'agreement_signed_at' => now(),
            'digital_signature' => $request->input('signature') ?? $validated['agreement_data']['signature'] ?? null,
            'agreement_data' => $validated['agreement_data'],
        ]);

        return redirect()->route('agreement.show')->with('success', 'Persyaratan awal disetujui. Berikut adalah salinan dokumen yang telah Anda tandatangani.');
    }

    public function patientAgreement(Request $request, \App\Models\User $user)
    {
        // Auth check: therapist must have booking or be admin
        $hasBooking = \App\Models\Booking::where('patient_id', $user->id)
            ->where('therapist_id', $request->user()->id)
            ->exists();

        if (!$hasBooking && !$request->user()->hasAnyRole(['admin', 'super_admin', 'cs'])) {
            abort(403);
        }

        return Inertia::render('Clinic/AgreementDetail', [
            'userModel' => $user,
        ]);
    }
}
