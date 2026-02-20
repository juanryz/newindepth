<?php

namespace App\Listeners;

use App\Events\Clinic\TransactionPaid;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RewardAffiliateCommission
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(TransactionPaid $event): void
    {
        $transaction = $event->transaction;

        // Cek kalau booking punya affiliate
        if ($transaction->transactionable_type === \App\Models\Booking::class) {
            $booking = $transaction->transactionable;

            if ($booking->affiliate_ref_code) {
                // Find affiliate user
                $affiliate = \App\Models\User::where('referral_code', $booking->affiliate_ref_code)->first();

                if ($affiliate) {
                    \App\Models\Commission::create([
                        'affiliate_user_id' => $affiliate->id,
                        'transaction_id' => $transaction->id,
                        'referred_user_id' => $booking->patient_id,
                        'transaction_amount' => $transaction->amount,
                        'commission_rate' => 10.00, // 10%
                        'commission_amount' => $transaction->amount * 0.10,
                        'status' => 'pending',
                    ]);
                }
            }
        }
    }
}
