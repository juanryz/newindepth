<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Models\Transaction;
use Illuminate\Console\Command;
use Carbon\Carbon;

class CleanupPendingBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:cleanup-pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup bookings that are pending payment for more than 2 hours';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiryTime = Carbon::now()->subHours(2);

        $expiredBookings = Booking::where('status', 'pending_payment')
            ->where('created_at', '<', $expiryTime)
            ->get();

        $count = 0;
        foreach ($expiredBookings as $booking) {
            $booking->update(['status' => 'expired']);

            // Also update the related transaction if it exists
            $tx = $booking->transaction;
            if ($tx && $tx->status === 'pending') {
                \App\Models\Transaction::where('id', $tx->id)->update(['status' => 'expired']);

                // Notify the patient about the expired booking
                // The original $booking object is still valid and has the patient relationship
                if ($booking->patient) {
                    $booking->patient->notify(new \App\Notifications\BookingExpired($booking));
                }
            }

            $count++;
        }

        $this->info("Successfully expired {$count} bookings.");
    }
}
