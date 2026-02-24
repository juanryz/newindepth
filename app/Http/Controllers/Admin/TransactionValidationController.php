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
        $transactions = Transaction::with(['user', 'validatedBy', 'transactionable.therapist', 'transactionable.schedule', 'transactionable.userVoucher.voucher'])
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
        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($request, $transaction) {
                $transaction->update([
                    'status' => 'paid',
                    'validated_by' => auth()->id(),
                    'validated_at' => now(),
                ]);

                if ($transaction->transactionable_type === \App\Models\Booking::class) {
                    $booking = $transaction->transactionable;

                    $therapistId = $booking->schedule->therapist_id;

                    if (!$therapistId) {
                        $bookedIds = \App\Models\Booking::where('schedule_id', $booking->schedule_id)
                            ->whereIn('status', ['confirmed', 'completed'])
                            ->whereNotNull('therapist_id')
                            ->pluck('therapist_id')
                            ->toArray();

                        $available = User::role('therapist')
                            ->whereNotIn('id', $bookedIds)
                            ->get();

                        if ($available->count() === 0) {
                            throw new \Exception('Gagal assign otomatis: Semua terapis sudah penuh di slot ini atau tidak ada terapis di sistem.');
                        }

                        $therapistId = $available->random()->id;
                    }

                    $booking->update([
                        'status' => 'confirmed',
                        'therapist_id' => $therapistId,
                    ]);

                    $schedule = $booking->schedule;
                    if ($schedule) {
                        $schedule->increment('booked_count');
                        if ($schedule->booked_count >= $schedule->quota) {
                            $schedule->update(['status' => 'full']);
                        }
                    }

                    try {
                        \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\BookingConfirmed($booking));
                        $transaction->user->notify(new \App\Notifications\BookingConfirmed($booking));

                        // Notify the assigned therapist
                        if ($booking->therapist) {
                            $booking->therapist->notify(new \App\Notifications\NewAssignmentForTherapist($booking));
                        }
                    } catch (\Throwable $m) {
                        \Illuminate\Support\Facades\Log::error('Notification Failure during validation: ' . $m->getMessage());
                    }
                } else if ($transaction->transactionable_type === \App\Models\Course::class) {
                    $transaction->transactionable->users()->attach($transaction->user_id, [
                        'transaction_id' => $transaction->id,
                        'enrolled_at' => now(),
                    ]);
                }

                event(new TransactionPaid($transaction));
            });

            // Get the assigned therapist name for the success message
            $transaction->refresh();
            $booking = $transaction->transactionable;
            $assignedTherapist = $booking?->therapist?->name ?? 'Terapis';

            return redirect()->back()->with('success', "Transaksi berhasil divalidasi. Terapis ditugaskan: {$assignedTherapist}.");
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Validation Error for TX #' . $transaction->id . ': ' . $e->getMessage());
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
