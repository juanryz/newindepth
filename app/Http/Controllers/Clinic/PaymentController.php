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

            // Updated: check against dynamic package base prices if needed, 
            // but for hotfix simplicity we can just check if it's missing the 11% tax
            if ($baseAmount >= 1000000 && ($baseAmount % 100000 == 0) && ($baseAmount % 1.11 != 0)) {
                $newBase = $baseAmount * 1.11;
                $transaction->amount = $newBase + $uniqueCode;
                $transaction->save();
            }
        }

        return Inertia::render('Clinic/Payments/Upload', [
            'booking'        => $booking->load(['schedule.therapist', 'userVoucher.voucher']),
            'transaction'    => $transaction,
            'paymentMethods' => config('clinic.payment_methods'),
            'bankAccounts'   => config('clinic.bank_accounts', []),
        ]);
    }

    public function store(Request $request, Booking $booking)
    {
        if ((int) $booking->patient_id !== (int) auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        $isCash = $request->payment_method === 'Tunai';

        $request->validate([
            'payment_proof'          => $isCash ? 'nullable' : 'required|image|max:2048',
            'payment_bank'           => $isCash ? 'nullable|string|max:50' : ['required', 'string', 'max:50', 'regex:/^[a-zA-Z\s\.\-]+$/'],
            'payment_account_number' => $isCash ? 'nullable|string|max:50' : 'required|string|max:50',
            'payment_account_name'   => $isCash ? 'nullable|string|max:100' : 'required|string|max:100',
            'payment_method'         => 'required|string|max:50',
            'agree_refund'           => 'required|accepted',
            'agree_final'            => 'required|accepted',
            'agree_access'           => 'required|accepted',
            'agree_chargeback'       => 'required|accepted',
        ], [
            'payment_bank.regex' => 'Nama bank pengirim harus berupa tulisan (huruf), bukan angka.',
        ]);

        $path = (!$isCash && $request->hasFile('payment_proof'))
            ? $request->file('payment_proof')->store('payments', 'public')
            : null;

        $transaction = $booking->transaction;

        $agreementData = [
            'agreed_to_refund_policy_at_upload' => (bool) $request->agree_refund,
            'agreed_to_final_payment_at_upload'  => (bool) $request->agree_final,
            'agreed_to_access_terms_at_upload'   => (bool) $request->agree_access,
            'agreed_to_no_chargeback_at_upload'  => (bool) $request->agree_chargeback,
            'upload_timestamp'                   => now()->toDateTimeString(),
            'upload_ip'                          => request()->ip(),
            'upload_user_agent'                  => request()->userAgent(),
        ];

        if (!$isCash) {
            $agreementData['payment_account_number'] = $request->payment_account_number;
            $agreementData['payment_account_name']   = $request->payment_account_name;
        }

        if ($transaction) {
            $updateData = [
                'payment_method'          => $request->payment_method,
                'status'                  => 'pending',
                'ip_address'              => request()->ip(),
                'payment_agreement_data'  => array_merge($transaction->payment_agreement_data ?? [], $agreementData),
            ];

            if ($isCash) {
                // Hapus kode unik 3 digit dari nominal untuk pembayaran tunai
                $uniqueCode = $transaction->amount % 1000;
                $updateData['amount'] = $transaction->amount - $uniqueCode;
            } else {
                $updateData['payment_bank']               = $request->payment_bank;
                $updateData['payment_account_number']     = $request->payment_account_number;
                $updateData['payment_account_name']       = $request->payment_account_name;
                $updateData['payment_proof']              = $path;
                $updateData['payment_proof_uploaded_at']  = now();
            }

            $transaction->update($updateData);
        } else {
            // Fallback just in case
            $package   = \App\Models\Package::where('slug', $booking->package_type)->first();
            $basePrice = $package ? $package->current_price : 1000000;
            $amount    = $isCash
                ? round($basePrice * 1.11)
                : (($basePrice * 1.11) + rand(101, 999));

            $transactionData = [
                'user_id'                => auth()->id(),
                'invoice_number'         => 'INV-' . strtoupper(Str::random(10)),
                'amount'                 => $amount,
                'payment_method'         => $request->payment_method,
                'status'                 => 'pending',
                'ip_address'             => request()->ip(),
                'payment_account_number' => $request->payment_account_number,
                'payment_account_name'   => $request->payment_account_name,
                'payment_agreement_data' => array_merge([
                    'agreed_to_refund_policy' => (bool) $request->agree_refund,
                    'agreed_to_final_payment' => (bool) $request->agree_final,
                    'agreed_to_access_terms'  => (bool) $request->agree_access,
                    'agreed_to_no_chargeback' => (bool) $request->agree_chargeback,
                    'timestamp'               => now()->toDateTimeString(),
                    'user_agent'              => request()->userAgent(),
                ], $isCash ? [] : [
                    'payment_account_number' => $request->payment_account_number,
                    'payment_account_name'   => $request->payment_account_name,
                ]),
            ];

            if (!$isCash) {
                $transactionData['payment_bank']              = $request->payment_bank;
                $transactionData['payment_proof']             = $path;
                $transactionData['payment_proof_uploaded_at'] = now();
            }

            $transaction = $booking->transaction()->create($transactionData);
        }

        $booking->update(['status' => 'pending_validation']);

        // Notify Admins & CS
        try {
            $admins = User::role(['cs', 'admin', 'super_admin'])->get();
            Notification::send($admins, new NewPaymentReceived($transaction));
        } catch (\Throwable $n) {
            \Illuminate\Support\Facades\Log::error('Admin Notification Failure: ' . $n->getMessage());
        }

        $successMessage = $isCash
            ? 'Pembayaran tunai terdaftar. Silakan lakukan pembayaran di klinik. Tim kami akan memvalidasi setelah Anda membayar.'
            : 'Bukti pembayaran berhasil diunggah. Tim kami akan segera memvalidasi pembayaranmu.';

        return redirect()->route('dashboard')->with('success', $successMessage);
    }
}
