<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use App\Events\Clinic\TransactionPaid;
use App\Notifications\BookingConfirmed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionValidationController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['user', 'transactionable.therapist'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $therapists = User::role('therapist')->select('id', 'name')->get();

        return Inertia::render('Admin/Clinic/Transactions/Index', [
            'transactions' => $transactions,
            'therapists' => $therapists,
        ]);
    }

    public function validatePayment(Request $request, Transaction $transaction)
    {
        $request->validate([
            'therapist_id' => 'nullable|exists:users,id',
        ]);

        $transaction->update([
            'status' => 'paid',
            'validated_by' => auth()->id(),
            'validated_at' => now(),
        ]);

        if ($transaction->transactionable_type === \App\Models\Booking::class) {
            $transaction->transactionable->update([
                'status' => 'confirmed',
                'therapist_id' => $request->therapist_id ?? $transaction->transactionable->therapist_id,
            ]);
            \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\BookingConfirmed($transaction->transactionable));

            // Send In-App Notification to Patient
            $transaction->user->notify(new BookingConfirmed($transaction->transactionable));

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
