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
            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            if ($user) {
                // Update google_id and mark email as verified (Google has verified it)
                $updates = [];
                if (!$user->google_id) {
                    $updates['google_id'] = $googleUser->getId();
                }
                if (!$user->email_verified_at) {
                    $updates['email_verified_at'] = now();
                }
                if (!empty($updates)) {
                    $user->update($updates);
                }
            } else {
                // Register a new user
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => null, // Password is null for social login
                    'email_verified_at' => now(), // Assume Google verifies emails
                    'avatar' => $googleUser->getAvatar()
                ]);

                // Auto-assign the patient role
                \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'patient', 'guard_name' => 'web']);
                $user->assignRole('patient');
            }

            Auth::login($user);
            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors(['error' => 'Gagal login menggunakan Google. Silakan coba lagi.']);
        }
    }
}
