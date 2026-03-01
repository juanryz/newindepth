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

        // Explicitly convert to array for consistent serialization
        $transactions->getCollection()->transform(function ($tx) {
            $data = $tx->toArray();
            $data['validated_by_user'] = $tx->validatedBy ? $tx->validatedBy->toArray() : null;
            return $data;
        });

        $therapists = User::role('therapist')->select('id', 'name')->get();
        $isSqlite = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite';
        $weekendSql = $isSqlite ? "strftime('%w', date) IN ('0', '6')" : "DAYOFWEEK(date) IN (1, 7)";

        $availableSchedules = \App\Models\Schedule::where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereRaw("NOT ({$weekendSql})")
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Admin/Clinic/Transactions/Index', [
            'transactions' => $transactions,
            'therapists' => $therapists,
            'availableSchedules' => $availableSchedules,
        ]);
    }

    public function expired()
    {
        $transactions = Transaction::with(['user'])
            ->where('status', 'expired')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        $transactions->getCollection()->transform(function ($tx) {
            return $tx->toArray();
        });

        return Inertia::render('Admin/Clinic/Transactions/Expired', [
            'transactions' => $transactions,
        ]);
    }

    public function validatePayment(Request $request, Transaction $transaction)
    {
        if (!$transaction->payment_proof) {
            return back()->with('error', 'Tidak dapat memvalidasi: Bukti pembayaran belum diunggah oleh pasien.');
        }

        try {
            \Illuminate\Support\Facades\DB::transaction(function () use ($request, $transaction) {
                $transaction->update([
                    'status' => 'paid',
                    'validated_by' => auth()->id(),
                    'validated_at' => now(),
                ]);

                if ($transaction->transactionable_type === \App\Models\Booking::class) {
                    $booking = $transaction->transactionable;
                    $schedule = $booking->schedule;

                    // Handle Reschedule during Validation
                    if ($request->new_schedule_id && $request->new_schedule_id != $booking->schedule_id) {
                        $newSchedule = \App\Models\Schedule::findOrFail($request->new_schedule_id);
                        if ($newSchedule->booked_count >= $newSchedule->quota) {
                            throw new \Exception('Jadwal baru yang dipilih sudah penuh.');
                        }

                        // Reference to old schedule for cleanup if any
                        $oldSchedule = $booking->schedule;

                        $booking->update([
                            'schedule_id' => $newSchedule->id,
                            'reschedule_reason' => 'Dipindahkan oleh admin saat validasi pembayaran.',
                            'rescheduled_by' => auth()->id(),
                            'rescheduled_at' => now(),
                        ]);

                        $schedule = $newSchedule; // Use the new one for the rest of logic
                    } else {
                        // Check if current schedule is already full
                        if ($schedule && $schedule->booked_count >= $schedule->quota) {
                            throw new \Exception('Jadwal asli sudah penuh. Silakan pilih jadwal lain (Reschedule) lewat pop-up validasi.');
                        }
                    }

                    $therapistId = $booking->therapist_id ?? $schedule->therapist_id;

                    if (!$therapistId) {
                        $bookedIds = \App\Models\Booking::where('schedule_id', $schedule->id)
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

                    if ($schedule) {
                        $schedule->increment('booked_count');
                        if ($schedule->booked_count >= $schedule->quota) {
                            $schedule->update(['status' => 'full']);
                        }
                    }

                    try {
                        // 1. Notify Database (Reliable)
                        $transaction->user->notify(new \App\Notifications\BookingConfirmed($booking));

                        // 2. If Rescheduled, send explicit notification for that too
                        if ($request->new_schedule_id && $request->new_schedule_id != $booking->schedule_id) {
                            $transaction->user->notify(new \App\Notifications\BookingRescheduled($booking, 'Dipindahkan oleh admin saat validasi pembayaran.'));
                        }

                        // 3. Notify Mail (External)
                        \Illuminate\Support\Facades\Mail::to($transaction->user->email)->send(new \App\Mail\BookingConfirmed($booking));

                        // 4. Notify the assigned therapist
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
        $transaction->user->notify(new \App\Notifications\PaymentRejected($transaction));

        return redirect()->back()->with('success', 'Transaksi ditolak.');
    }
}
