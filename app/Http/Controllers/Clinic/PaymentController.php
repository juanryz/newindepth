<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\NewPaymentReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function create(Booking $booking)
    {
        if ((int) $booking->patient_id !== (int) auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        if ($booking->status !== 'pending_payment' && $booking->status !== 'pending_validation') {
            return redirect()->route('bookings.show', $booking->id)->withErrors(['error' => 'Booking tidak dalam status menunggu pembayaran.']);
        }

        $transaction = $booking->transaction;

        // HOTFIX: Auto-correct old transactions that don't have the 11% PPN tax included yet
        if ($transaction && $transaction->status === 'pending') {
            $uniqueCode = $transaction->amount % 1000;
            $baseAmount = $transaction->amount - $uniqueCode;

            // Check if base amount is exactly the old price without tax
            if (in_array($baseAmount, [1000000, 1500000, 8000000])) {
                $newBase = $baseAmount * 1.11;
                $transaction->amount = $newBase + $uniqueCode;
                $transaction->save();
            }
        }

        return Inertia::render('Clinic/Payments/Upload', [
            'booking' => $booking->load(['schedule.therapist', 'userVoucher.voucher']),
            'transaction' => $transaction,
        ]);
    }

    public function store(Request $request, Booking $booking)
    {
        if ((int) $booking->patient_id !== (int) auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        $request->validate([
            'payment_proof' => 'required|image|max:2048',
            'payment_bank' => ['required', 'string', 'max:50', 'regex:/^[a-zA-Z\s\.\-]+$/'], // Ensure bank name is text
            'payment_account_number' => 'required|string|max:50',
            'payment_account_name' => 'required|string|max:100',
            'payment_method' => 'required|string|max:50',
            'agree_refund' => 'required|accepted',
            'agree_final' => 'required|accepted',
            'agree_access' => 'required|accepted',
            'agree_chargeback' => 'required|accepted',
        ], [
            'payment_bank.regex' => 'Nama bank pengirim harus berupa tulisan (huruf), bukan angka.',
        ]);

        $path = $request->file('payment_proof')->store('payments', 'public');

        $transaction = $booking->transaction;

        if ($transaction) {
            $transaction->update([
                'payment_method' => $request->payment_method,
                'payment_bank' => $request->payment_bank,
                'payment_proof' => $path,
                'payment_proof_uploaded_at' => now(),
                'status' => 'pending',
                'ip_address' => request()->ip(),
                'payment_agreement_data' => array_merge($transaction->payment_agreement_data ?? [], [
                    'payment_account_number' => $request->payment_account_number,
                    'payment_account_name' => $request->payment_account_name,
                    'agreed_to_refund_policy_at_upload' => (bool) $request->agree_refund,
                    'agreed_to_final_payment_at_upload' => (bool) $request->agree_final,
                    'agreed_to_access_terms_at_upload' => (bool) $request->agree_access,
                    'agreed_to_no_chargeback_at_upload' => (bool) $request->agree_chargeback,
                    'upload_timestamp' => now()->toDateTimeString(),
                    'upload_ip' => request()->ip(),
                    'upload_user_agent' => request()->userAgent(),
                ]),
            ]);
        } else {
            // Fallback just in case
            $amount = match ($booking->package_type) {
                'vip' => 8000000,
                'upgrade' => 1500000,
                default => 1000000,
            };
            $transaction = $booking->transaction()->create([
                'user_id' => auth()->id(),
                'invoice_number' => 'INV-' . strtoupper(Str::random(10)),
                'amount' => $amount,
                'payment_method' => $request->payment_method,
                'payment_bank' => $request->payment_bank,
                'payment_proof' => $path,
                'payment_proof_uploaded_at' => now(),
                'status' => 'pending',
                'ip_address' => request()->ip(),
                'payment_agreement_data' => [
                    'payment_account_number' => $request->payment_account_number,
                    'payment_account_name' => $request->payment_account_name,
                    'agreed_to_refund_policy' => (bool) $request->agree_refund,
                    'agreed_to_final_payment' => (bool) $request->agree_final,
                    'agreed_to_access_terms' => (bool) $request->agree_access,
                    'agreed_to_no_chargeback' => (bool) $request->agree_chargeback,
                    'timestamp' => now()->toDateTimeString(),
                    'user_agent' => request()->userAgent(),
                ],
            ]);
        }

        $booking->update(['status' => 'pending_validation']);

        // Notify Admins & CS
        try {
            $admins = User::role(['cs', 'admin', 'super_admin'])->get();
            Notification::send($admins, new NewPaymentReceived($transaction));
        } catch (\Throwable $n) {
            \Illuminate\Support\Facades\Log::error('Admin Notification Failure: ' . $n->getMessage());
        }

        return redirect()->route('bookings.show', $booking->id)->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu validasi admin.');
    }
}
