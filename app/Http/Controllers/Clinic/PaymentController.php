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

        return Inertia::render('Clinic/Payments/Upload', [
            'booking' => $booking->load('schedule.therapist'),
            'transaction' => $booking->transaction,
        ]);
    }

    public function store(Request $request, Booking $booking)
    {
        if ((int) $booking->patient_id !== (int) auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        $request->validate([
            'payment_proof' => 'required|image|max:2048',
            'payment_bank' => 'required|string|max:50',
            'payment_method' => 'required|string|max:50',
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
