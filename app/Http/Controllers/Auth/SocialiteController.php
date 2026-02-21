<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Find existing user by google_id or email
            $user = User::where('google_id', $googleUser->id)
                ->orWhere('email', $googleUser->email)
                ->first();

            if ($user) {
                // Update google_id if it was null
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleUser->id]);
                }
            } else {
                // Register a new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => null, // Password is null for social login
                    'email_verified_at' => now(), // Assume Google verifies emails
                    'avatar' => $googleUser->avatar
                ]);

                // Auto-assign the patient role
                $user->assignRole('patient');
            }

            Auth::login($user);

            // Redirect logic: if phone is missing or screening is incomplete, force them through screening/profile
            if ($user->hasRole('patient') && (!$user->phone || !$user->hasCompletedScreening())) {
                // You could redirect to a profile completion page for phone, 
                // but for now, redirect to screening, the screening might need it or they can update in dashboard.
                // Redirect to screening directly is part of the flow
                return redirect()->route('screening.show');
            }

            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors(['error' => 'Gagal login menggunakan Google. Silakan coba lagi.']);
        }
    }
}
