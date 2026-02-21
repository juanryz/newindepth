<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profileProgress' => $request->user()->getProfileCompletionStats(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update patient documents: KTP and Emergency Contacts.
     */
    public function updateDocuments(Request $request): RedirectResponse
    {
        $request->validate([
            'ktp_photo' => ['nullable', 'image', 'max:5120'], // Max 5MB
            'emergency_contact_name' => ['required', 'string', 'max:255'],
            'emergency_contact_phone' => ['required', 'string', 'max:20'],
            'emergency_contact_relation' => ['required', 'string', 'max:100'],
        ]);

        $user = $request->user();

        if ($request->hasFile('ktp_photo')) {
            // Delete old KTP if exists
            if ($user->ktp_photo && Storage::disk('public')->exists($user->ktp_photo)) {
                Storage::disk('public')->delete($user->ktp_photo);
            }
            $path = $request->file('ktp_photo')->store('ktp', 'public');
            $user->ktp_photo = $path;
        }

        $user->emergency_contact_name = $request->emergency_contact_name;
        $user->emergency_contact_phone = $request->emergency_contact_phone;
        $user->emergency_contact_relation = $request->emergency_contact_relation;
        $user->save();

        return Redirect::back()->with('status', 'documents-updated');
    }

    /**
     * Update digital signature and mark agreement as signed.
     */
    public function updateAgreement(Request $request): RedirectResponse
    {
        $request->validate([
            'digital_signature' => ['required', 'string'],
        ]);

        $user = $request->user();
        $user->digital_signature = $request->digital_signature;
        $user->agreement_signed_at = now();
        $user->save();

        return Redirect::back()->with('status', 'agreement-signed');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
