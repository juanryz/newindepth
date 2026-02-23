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
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // If patient and basic profile is complete but documents are not, redirect to documents
        if ($user->hasRole('patient')) {
            $basicFields = ['name', 'email', 'phone', 'age', 'gender'];
            $isBasicComplete = true;
            foreach ($basicFields as $field) {
                if (empty($user->$field)) {
                    $isBasicComplete = false;
                    break;
                }
            }

            if ($isBasicComplete) {
                $docFields = ['ktp_photo', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'];
                $isDocsComplete = true;
                foreach ($docFields as $field) {
                    if (empty($user->$field)) {
                        $isDocsComplete = false;
                        break;
                    }
                }

                if (!$isDocsComplete) {
                    return Redirect::route('profile.documents')->with('status', 'profile-updated-continue-docs');
                }
            }
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Display the user's documents form.
     */
    public function documents(Request $request): Response
    {
        return Inertia::render('Profile/Documents', [
            'profileProgress' => $request->user()->getProfileCompletionStats(),
        ]);
    }

    /**
     * Update patient documents: KTP and Emergency Contacts.
     */
    public function updateDocuments(Request $request): RedirectResponse
    {
        $request->validate([
            'ktp_photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:10240'], // Max 10MB
            'emergency_contact_name' => ['required', 'string', 'max:255'],
            'emergency_contact_phone' => ['required', 'string', 'max:50'],
            'emergency_contact_relation' => ['required', 'string', 'max:100'],
        ], [
            'ktp_photo.max' => 'Ukuran foto KTP maksimal 10MB.',
            'ktp_photo.image' => 'File harus berupa gambar.',
            'ktp_photo.mimes' => 'Format foto harus JPG, JPEG, atau PNG.',
            'emergency_contact_name.required' => 'Nama kontak darurat wajib diisi.',
            'emergency_contact_phone.required' => 'Nomor telepon kontak darurat wajib diisi.',
            'emergency_contact_phone.max' => 'Nomor telepon maksimal 50 karakter.',
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

        return Redirect::route('agreement.show')->with('status', 'documents-updated');
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
