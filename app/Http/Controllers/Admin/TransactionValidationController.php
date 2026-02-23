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

        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($request, $transaction) {
                $transaction->update([
                    'status' => 'paid',
                    'validated_by' => auth()->id(),
                    'validated_at' => now(),
                ]);

                if ($transaction->transactionable_type === \App\Models\Booking::class) {
                    $booking = $transaction->transactionable;

                    // Determine therapist: use admin's choice, or auto-assign
                    $therapistId = $request->therapist_id;
                    if (!$therapistId) {
                        // Priority 1: Use therapist from the schedule if it exists
                        if ($booking->schedule && $booking->schedule->therapist_id) {
                            $therapistId = $booking->schedule->therapist_id;
                        }
                        else {
                            // Priority 2: Random assignment from available therapists for this slot
                            $bookedIds = \App\Models\Booking::where('schedule_id', $booking->schedule_id)
                                ->whereNotIn('status', ['failed', 'cancelled'])
                                ->whereNotNull('therapist_id')
                                ->pluck('therapist_id')
                                ->toArray();

                            $available = User::role('therapist')
                                ->whereNotIn('id', $bookedIds)
                                ->get();

                            $therapistId = $available->count() > 0 ? $available->random()->id : null;
                        }
                    }

                    $booking->update([
                        'status' => 'confirmed',
                        'therapist_id' => $therapistId,
                    ]);

                    // Reduction of quota happens here upon confirmation/payment
                    $schedule = $booking->schedule;
                    if ($schedule) {
                        $schedule->increment('booked_count');
                        if ($schedule->booked_count >= $schedule->quota) {
                            $schedule->update(['status' => 'full']);
                        }
                    }

                    // Attempt to send mail and notification, but don't crash if they fail
                    try {
                        \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\BookingConfirmed($booking));
                        $transaction->user->notify(new BookingConfirmed($booking));
                    }
                    catch (\Throwable $m) {
                        \Illuminate\Support\Facades\Log::error('Notification Failure during validation: ' . $m->getMessage());
                    }

                }
                else if ($transaction->transactionable_type === \App\Models\Course::class) {
                    // Enroll user to course
                    $transaction->transactionable->users()->attach($transaction->user_id, [
                        'transaction_id' => $transaction->id,
                        'enrolled_at' => now(),
                    ]);
                }

                event(new TransactionPaid($transaction));
            });

            return redirect()->back()->with('success', 'Transaksi berhasil divalidasi.');
        }
        catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Validation Error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal memvalidasi transaksi: ' . $e->getMessage()]);
        }
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
