<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ClinicSetting;
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
        // Only load bookings that are confirmed/in-progress/completed to correctly reflect slot occupancy
        $schedulesQuery = Schedule::with([
            'therapist:id,name',
            'bookings' => function ($query) {
                $query->whereIn('status', ['confirmed', 'in_progress', 'completed'])
                    ->with(['patient.screeningResults', 'therapist']);
            }
        ])
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
            // Ensure relation data is correctly nested
            $data['therapist'] = $schedule->therapist ? $schedule->therapist->toArray() : null;
            $data['bookings'] = $schedule->bookings ? $schedule->bookings->toArray() : [];
            return $data;
        })->toArray(); // Ensure the final result is an array

        // Bookings
        $bookings = Booking::with(['patient.screeningResults', 'patient.roles', 'schedule', 'therapist'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                // Convert to array first to allow adding custom properties that survive serialization
                $data = $booking->toArray();
                if ($booking->patient) {
                    $booking->patient->append('profile_completion');
                    // Add both object and array style for maximum compatibility
                    $data['patient_profile_stats'] = $booking->patient->getProfileCompletionStats();
                }
                return $data;
            })->toArray();

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
            ->get()
            ->map(function ($tx) {
                $data = $tx->toArray();
                // Rename relation key to avoid conflict with the validated_by integer column
                $data['validated_by_user'] = $tx->validatedBy ? $tx->validatedBy->toArray() : null;
                return $data;
            })->toArray();

        // Therapists
        $therapists = User::role('therapist')
            ->select('id', 'name')
            ->get()
            ->toArray();

        // Available Schedules (for reschedule)
        $availableSchedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->whereColumn('booked_count', '<', 'quota')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get()
            ->toArray();

        try {
            $clinicSettings = [
                'open_time' => ClinicSetting::getValue('clinic_open_time', '08:00'),
                'close_time' => ClinicSetting::getValue('clinic_close_time', '22:00'),
            ];
        } catch (\Throwable $e) {
            $clinicSettings = ['open_time' => '08:00', 'close_time' => '22:00'];
        }

        return Inertia::render('Admin/OrderManagement/Index', [
            'schedules' => $schedules,
            'bookings' => $bookings,
            'transactions' => $transactions,
            'therapists' => $therapists,
            'availableSchedules' => $availableSchedules,
            'clinicSettings' => $clinicSettings,
            'filters' => ['therapist_id' => $therapistId],
        ]);
    }
}
