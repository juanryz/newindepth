<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use App\Models\UserVoucher;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    /**
     * Show all vouchers owned by the authenticated patient.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $userVouchers = UserVoucher::with('voucher')
            ->where('user_id', $user->id)
            ->orderByDesc('claimed_at')
            ->get()
            ->map(fn($uv) => [
                'id' => $uv->id,
                'code' => $uv->voucher->code,
                'description' => $uv->voucher->description,
                'discount_amount' => $uv->voucher->discount_amount,
                'type' => $uv->voucher->type,
                'claimed_at' => $uv->claimed_at,
                'expired_at' => $uv->expired_at,
                'used_at' => $uv->used_at,
                'is_active' => $uv->isActive(),
                'is_expired' => $uv->isExpired(),
                'is_used' => $uv->isUsed(),
            ]);

        return Inertia::render('Clinic/Vouchers/Index', [
            'userVouchers' => $userVouchers,
        ]);
    }

    /**
     * Claim a promo code voucher.
     */
    public function claim(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = $request->user();
        $code = strtoupper(trim($request->code));

        $voucher = Voucher::where('code', $code)->where('type', 'promo_code')->first();

        if (!$voucher) {
            return back()->withErrors(['code' => 'Kode voucher tidak ditemukan.']);
        }

        if (!$voucher->isValidNow()) {
            return back()->withErrors(['code' => 'Voucher ini sudah tidak aktif atau telah kadaluarsa.']);
        }

        if ($voucher->hasReachedMaxClaims()) {
            return back()->withErrors(['code' => 'Voucher ini sudah habis diklaim.']);
        }

        // Check if user already claimed this voucher
        $alreadyClaimed = UserVoucher::where('user_id', $user->id)
            ->where('voucher_id', $voucher->id)
            ->exists();

        if ($alreadyClaimed) {
            return back()->withErrors(['code' => 'Anda sudah pernah mengklaim voucher ini.']);
        }

        UserVoucher::create([
            'user_id' => $user->id,
            'voucher_id' => $voucher->id,
            'claimed_at' => now(),
            'expired_at' => $voucher->valid_until,
        ]);

        return back()->with('success', "Voucher {$voucher->code} berhasil diklaim! Diskon Rp " . number_format($voucher->discount_amount, 0, ',', '.') . " siap digunakan.");
    }

    /**
     * Apply a user voucher to a pending_payment booking.
     */
    public function apply(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|integer|exists:bookings,id',
            'user_voucher_id' => 'required|integer|exists:user_vouchers,id',
        ]);

        $user = $request->user();

        $booking = Booking::where('id', $request->booking_id)
            ->where('patient_id', $user->id)
            ->where('status', 'pending_payment')
            ->firstOrFail();

        $userVoucher = UserVoucher::where('id', $request->user_voucher_id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if (!$userVoucher->isActive()) {
            return back()->withErrors(['user_voucher_id' => 'Voucher ini sudah digunakan atau kadaluarsa.']);
        }

        $discount = $userVoucher->voucher->discount_amount;

        // Update the booking to track the voucher used
        $booking->update(['user_voucher_id' => $userVoucher->id]);

        // Reduce transaction amount by discount (minimum Rp 1)
        $transaction = $booking->transaction;
        if ($transaction) {
            $newAmount = max(1, $transaction->amount - $discount);
            $transaction->update(['amount' => $newAmount]);
        }

        // Mark voucher as used
        $userVoucher->update([
            'used_at' => now(),
            'booking_id' => $booking->id,
        ]);

        return back()->with('success', "Voucher berhasil diterapkan! Diskon Rp " . number_format($discount, 0, ',', '.') . " sudah dikurangi dari total pembayaran.");
    }
}
