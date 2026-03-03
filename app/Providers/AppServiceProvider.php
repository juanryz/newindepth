<?php

namespace App\Providers;

use App\Models\Booking;
use App\Observers\BookingObserver;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Implicitly grant "Super Admin" role all permissions
        Gate::before(function ($user, $ability) {
            if ($user->hasRole('super_admin')) {
                return true;
            }

            // Dynamic Santa Maria Role based on role name
            if ($user->hasRole('santa_maria')) {
                $santaMariaPermissions = [
                    'view finance',
                    'view reports',
                    'view petty_cash',
                    'approve petty_cash',
                    'reject petty_cash',
                    'manage petty cash',
                    'export reports',
                ];

                if (in_array($ability, $santaMariaPermissions)) {
                    return true;
                }
            }

            return null;
        });

        if (config('app.env') === 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
        Booking::observe(BookingObserver::class);

        // Register Custom Resend HTTP Driver
        \Illuminate\Support\Facades\Mail::extend('resendapi', function (array $config) {
            return new \App\Mail\ResendHttpTransport(
                config('services.resend.key') ?? '',
                config('mail.from.address') ?? 'hello@example.com'
            );
        });
    }
}
