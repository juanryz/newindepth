<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    public function index(Request $request)
    {
        $therapistId = $request->get('therapist_id');

        // Schedules — show all history so calendar doesn't look empty for past dates
        $schedulesQuery = Schedule::with(['therapist:id,name', 'bookings.patient.screeningResults', 'bookings.therapist'])
            ->orderBy('date')
            ->orderBy('start_time');

        if ($therapistId) {
            $schedulesQuery->where('therapist_id', $therapistId);
        }

        $schedules = $schedulesQuery->get()->map(function (Schedule $schedule) {
            $data = $schedule->toArray();
            $date = \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            $startTime = \Carbon\Carbon::parse($schedule->start_time)->format('H:i:s');
            $endTime = \Carbon\Carbon::parse($schedule->end_time)->format('H:i:s');
            $data['start'] = $date . 'T' . $startTime;
            $data['end'] = $date . 'T' . $endTime;
            $data['formatted_date'] = $date;
            $data['formatted_start'] = $startTime;
            $data['formatted_end'] = $endTime;
            $data['therapist'] = $schedule->therapist ? $schedule->therapist->toArray() : null;
            $data['bookings'] = $schedule->bookings ? $schedule->bookings->toArray() : [];
            return $data;
        });

        // Bookings
        $bookings = Booking::with(['patient.screeningResults', 'patient.roles', 'schedule', 'therapist'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient->append('profile_completion');
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            });

        // Transactions
        $transactions = Transaction::with([
            'user',
            'validatedBy',
            'transactionable' => function (\Illuminate\Database\Eloquent\Relations\MorphTo $morphTo) {
                $morphTo->morphWith([
                    \App\Models\Booking::class => ['therapist', 'schedule', 'userVoucher.voucher'],
                ]);
            }
        ])
            ->orderBy('created_at', 'desc')
            ->get();

        // Therapists
        $therapists = User::role('therapist')
            ->select('id', 'name')
            ->get();

        // Available Schedules (for reschedule)
        $availableSchedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Admin/OrderManagement/Index', [
            'schedules' => $schedules,
            'bookings' => $bookings,
            'transactions' => $transactions,
            'therapists' => $therapists,
            'availableSchedules' => $availableSchedules,
            'filters' => [
                'therapist_id' => $therapistId,
            ],
        ]);
    }
}
