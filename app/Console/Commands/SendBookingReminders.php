<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Mail\BookingReminder;
use App\Mail\PaymentReminder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendBookingReminders extends Command
{
    protected $signature = 'bookings:send-reminders';
    protected $description = 'Send 2h session reminders and hourly payment reminders';

    public function handle()
    {
        $this->sendSessionReminders();
        $this->sendPaymentReminders();
    }

    protected function sendSessionReminders()
    {
        // 2 Hours Before Start
        // Find confirmed bookings starting in exactly 120-130 minutes (to avoid missing/double in hourly run)
        // If this runs hourly, we should check for sessions starting in 1-2 hours.
        // Better: Find sessions starting in 2 hours and not yet reminded.

        $now = now();
        $twoHoursLater = $now->copy()->addHours(2);
        $oneHourLater = $now->copy()->addHour();

        // 2 Hours Before
        $this->processSessionReminders($twoHoursLater, '2h');

        // 1 Hour Before
        $this->processSessionReminders($oneHourLater, '1h');
    }

    protected function processSessionReminders($targetTime, $label)
    {
        $bookings = Booking::with(['patient', 'schedule'])
            ->where('status', 'confirmed')
            ->whereHas('schedule', function ($q) use ($targetTime) {
                $q->where('date', $targetTime->toDateString())
                    ->where('start_time', '>=', $targetTime->copy()->subMinutes(5)->toTimeString())
                    ->where('start_time', '<=', $targetTime->copy()->addMinutes(10)->toTimeString());
            })
            ->where(function ($q) use ($label) {
                $q->whereNull('last_reminder_sent_at')
                    ->orWhere('last_reminder_label', '!=', $label);
            })
            ->get();

        /** @var \App\Models\Booking $booking */
        foreach ($bookings as $booking) {
            try {
                Mail::to($booking->patient->email)->send(new BookingReminder($booking));
                $booking->update([
                    'last_reminder_sent_at' => now(),
                    'last_reminder_label' => $label,
                ]);
                $this->info("Sent {$label} session reminder to: " . $booking->patient->email);
            } catch (\Exception $e) {
                $this->error("Failed to send {$label} session reminder: " . $e->getMessage());
            }
        }
    }

    protected function sendPaymentReminders()
    {
        // Hourly for pending_payment
        // Only if created more than 1 hour ago
        $bookings = Booking::with(['patient', 'schedule'])
            ->where('status', 'pending_payment')
            ->where('created_at', '<', now()->subHour())
            ->where(function ($q) {
                // Remind every 1 hour
                $q->whereNull('last_payment_reminder_sent_at')
                    ->orWhere('last_payment_reminder_sent_at', '<', now()->subMinutes(55));
            })
            ->get();

        /** @var \App\Models\Booking $booking */
        foreach ($bookings as $booking) {
            try {
                Mail::to($booking->patient->email)->send(new PaymentReminder($booking));
                $booking->update(['last_payment_reminder_sent_at' => now()]);
                $this->info("Sent payment reminder to: " . $booking->patient->email);
            } catch (\Exception $e) {
                $this->error("Failed to send payment reminder: " . $e->getMessage());
            }
        }
    }
}
