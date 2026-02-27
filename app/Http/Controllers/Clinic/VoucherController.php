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
     * Apply a voucher by its code directly (claims it if not yet claimed).
     */
    public function applyByCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'booking_id' => 'nullable|integer|exists:bookings,id',
            'transaction_id' => 'nullable|integer|exists:transactions,id',
        ]);

        $user = $request->user();
        $code = strtoupper(trim($request->code));

        // 1. Find Voucher
        $voucher = Voucher::where('code', $code)->first();

        if (!$voucher) {
            return back()->withErrors(['voucher_code' => 'Kode voucher tidak ditemukan.']);
        }

        if (!$voucher->isValidNow()) {
            return back()->withErrors(['voucher_code' => 'Voucher ini sudah tidak aktif atau telah kadaluarsa.']);
        }

        // 2. Ensure user has a UserVoucher record (claim it if not existing)
        $userVoucher = UserVoucher::where('user_id', $user->id)
            ->where('voucher_id', $voucher->id)
            ->first();

        if (!$userVoucher) {
            if ($voucher->hasReachedMaxClaims()) {
                return back()->withErrors(['voucher_code' => 'Kapasitas penggunaan voucher ini sudah habis.']);
            }

            $userVoucher = UserVoucher::create([
                'user_id' => $user->id,
                'voucher_id' => $voucher->id,
                'claimed_at' => now(),
                'expired_at' => $voucher->valid_until,
            ]);
        }

        if (!$userVoucher->isActive()) {
            return back()->withErrors(['voucher_code' => 'Voucher ini sudah pernah digunakan atau sudah kadaluarsa.']);
        }

        // 3. Apply to Booking or Transaction
        $discount = $voucher->discount_amount;
        $applied = false;

        if ($request->booking_id) {
            $booking = Booking::where('id', $request->booking_id)
                ->where('patient_id', $user->id)
                ->firstOrFail();

            if ($booking->user_voucher_id) {
                return back()->withErrors(['voucher_code' => 'Booking ini sudah menggunakan voucher lain.']);
            }

            $booking->update(['user_voucher_id' => $userVoucher->id]);
            $transaction = $booking->transaction;
            if ($transaction) {
                $transaction->update(['amount' => max(1, $transaction->amount - $discount)]);
                $applied = true;
            }
        }
        elseif ($request->transaction_id) {
            $transaction = Transaction::where('id', $request->transaction_id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            // Check if already has discount applied (in metadata)
            $metadata = $transaction->payment_agreement_data ?? [];
            if (isset($metadata['applied_voucher_id'])) {
                return back()->withErrors(['voucher_code' => 'Transaksi ini sudah menggunakan voucher lain.']);
            }

            $transaction->update([
                'amount' => max(1, $transaction->amount - $discount),
                'payment_agreement_data' => array_merge($metadata, [
                    'applied_voucher_id' => $userVoucher->id,
                    'applied_voucher_code' => $voucher->code,
                    'discount_amount' => $discount,
                    'original_amount' => $transaction->getOriginal('amount') ?? $transaction->amount + $discount
                ])
            ]);
            $applied = true;
        }

        if ($applied) {
            $userVoucher->update([
                'used_at' => now(),
                'booking_id' => $request->booking_id, // can be null
            ]);

            return back()->with('success', "Diskon Rp " . number_format($discount, 0, ',', '.') . " berhasil diterapkan menggunakan kode {$voucher->code}.");
        }

        return back()->withErrors(['voucher_code' => 'Terjadi kesalahan saat menerapkan voucher.']);
    }
}
