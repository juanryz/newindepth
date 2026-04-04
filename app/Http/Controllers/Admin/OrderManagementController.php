<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ClinicSetting;
use App\Models\GroupBooking;
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

        // Individual Transactions — exclude bookings that belong to a group
        $transactions = Transaction::with([
            'user',
            'validatedBy',
            'transactionable' => function (\Illuminate\Database\Eloquent\Relations\MorphTo $morphTo) {
                $morphTo->morphWith([
                    \App\Models\Booking::class => ['therapist', 'schedule', 'userVoucher.voucher', 'groupBookingMember.groupBooking.schedule'],
                ]);
            }
        ])
            ->whereDoesntHaveMorph('transactionable', [\App\Models\Booking::class], function($q) {
                $q->has('groupBookingMember'); // Only show true individual bookings
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($tx) {
                $data = $tx->toArray();
                // Rename relation key to avoid conflict with the validated_by integer column
                $data['validated_by_user'] = $tx->validatedBy ? $tx->validatedBy->toArray() : null;
                return $data;
            })->toArray();

        // Group Bookings — shown as 1 row per group (institution name + member count)
        $groupBookings = GroupBooking::with(['schedule.therapist', 'createdBy', 'members.user', 'members.booking.schedule.therapist', 'members.booking.transaction.validatedBy'])
            ->withCount('members')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($group) {
                return [
                    'id'               => $group->id,
                    'invoice_number'   => $group->invoice_number,
                    'group_name'       => $group->group_name,
                    'institution_name' => $group->institution_name ?? $group->group_name,
                    'pic_name'         => $group->user?->name ?? 'PIC Grup',
                    'pic_phone'        => $group->phone,
                    'pic_email'        => $group->email,
                    'payment_method'   => $group->payment_method ?? 'N/A',

                    'total_amount'     => $group->total_amount,
                    'members_count'    => $group->members_count,
                    'package_type'     => $group->package_type,
                    'session_type'     => $group->session_type,
                    'created_at'       => $group->created_at,
                    'paid_at'          => $group->paid_at,
                    'schedule'         => $group->schedule ? [
                        'id'         => $group->schedule->id,
                        'date'       => $group->schedule->date,
                        'start_time' => $group->schedule->start_time,
                        'end_time'   => $group->schedule->end_time,
                        'therapist'  => $group->schedule->therapist ? ['id' => $group->schedule->therapist->id, 'name' => $group->schedule->therapist->name] : null,
                    ] : null,
                    'created_by_name' => $group->createdBy?->name,
                    'members' => $group->members->map(fn($m) => [
                        'name' => $m->user?->name ?? 'Anggota',
                        'package_type' => $m->package_type,
                        'price' => $m->price,
                        'transaction' => $m->booking?->transaction ? [
                            'id' => $m->booking->transaction->id,
                            'status' => $m->booking->transaction->status,
                            'invoice_number' => $m->booking->transaction->invoice_number,
                            'amount' => $m->booking->transaction->amount,
                            'paid_at' => $m->booking->transaction->paid_at,
                        ] : null,
                        'schedule' => ($m->booking && $m->booking->schedule) ? [
                            'date' => $m->booking->schedule->date,
                            'start_time' => $m->booking->schedule->start_time,
                            'therapist' => ($m->booking->schedule->therapist) ? $m->booking->schedule->therapist->name : 'InDepth',
                        ] : null,
                    ])->toArray(),
                ];
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
            'schedules'        => $schedules,
            'bookings'         => $bookings,
            'transactions'     => $transactions,
            'groupBookings'    => $groupBookings,
            'therapists'       => $therapists,
            'availableSchedules' => $availableSchedules,
            'clinicSettings'   => $clinicSettings,
            'filters'          => ['therapist_id' => $therapistId],
        ]);
    }
}
