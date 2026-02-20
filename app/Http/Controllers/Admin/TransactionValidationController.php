<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Events\Clinic\TransactionPaid;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionValidationController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['user', 'transactionable'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Clinic/Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function validatePayment(Request $request, Transaction $transaction)
    {
        $transaction->update([
            'status' => 'paid',
            'validated_by' => auth()->id(),
            'validated_at' => now(),
        ]);

        if ($transaction->transactionable_type === \App\Models\Booking::class) {
            $transaction->transactionable->update(['status' => 'confirmed']);
            \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\BookingConfirmed($transaction->transactionable));
        } else if ($transaction->transactionable_type === \App\Models\Course::class) {
            // Enroll user to course
            $transaction->transactionable->users()->attach($transaction->user_id, [
                'transaction_id' => $transaction->id,
                'enrolled_at' => now(),
            ]);
        }

        event(new TransactionPaid($transaction));

        return redirect()->back()->with('success', 'Transaksi berhasil divalidasi.');
    }

    public function rejectPayment(Request $request, Transaction $transaction)
    {
        $request->validate(['rejection_reason' => 'required|string|max:255']);

        $transaction->update([
            'status' => 'rejected',
            'validated_by' => auth()->id(),
            'validated_at' => now(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        if ($transaction->transactionable_type === \App\Models\Booking::class) {
            $transaction->transactionable->update(['status' => 'pending_payment']);
        }

        \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\PaymentRejected($transaction));

        return redirect()->back()->with('success', 'Transaksi ditolak.');
    }
}
