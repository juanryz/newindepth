<?php

namespace App\Observers;

use App\Models\Booking;
use App\Models\UserVoucher;
use App\Models\Voucher;

class BookingObserver
{
    public function updated(Booking $booking): void
    {
        // Auto-issue VIP reward voucher when a VIP booking is confirmed
        if (
            $booking->isDirty('status') &&
            $booking->status === 'confirmed' &&
            $booking->package_type === 'vip'
        ) {
            $this->issueVipRewardVoucher($booking);
        }
    }

    private function issueVipRewardVoucher(Booking $booking): void
    {
        // Find or create the system VIP reward voucher template
        $voucher = Voucher::firstOrCreate(
            ['code' => 'VIP-REWARD-SYSTEM'],
            [
                'type' => 'vip_reward',
                'description' => 'Reward otomatis untuk pembelian Paket VIP — diskon Rp 2.000.000 untuk sesi berikutnya.',
                'discount_amount' => 2000000,
                'is_active' => true,
                'max_claims' => null,
                'valid_from' => now(),
            ]
        );

        // Check if user already has an active VIP reward (avoid duplicate issuance for same booking)
        $alreadyIssued = UserVoucher::where('user_id', $booking->patient_id)
            ->where('voucher_id', $voucher->id)
            ->where('created_at', '>=', $booking->confirmed_at ?? now()->subMinute())
            ->exists();

        if (!$alreadyIssued) {
            UserVoucher::create([
                'user_id' => $booking->patient_id,
                'voucher_id' => $voucher->id,
                'claimed_at' => now(),
                'expired_at' => now()->addDays(30),
            ]);
        }
    }
}
