<?php

namespace App\Providers;

use App\Models\Booking;
use App\Observers\BookingObserver;
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
        Vite::prefetch(concurrency: 3);
        Booking::observe(BookingObserver::class);

        // Register Custom Resend HTTP Driver
        \Illuminate\Support\Facades\Mail::extend('resend-http', function (array $config) {
            return new \App\Mail\ResendHttpTransport(
                config('services.resend.key'),
                config('mail.from.address')
            );
        });
    }
}
