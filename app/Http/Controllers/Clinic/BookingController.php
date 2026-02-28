<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\ScreeningForm;
use App\Models\UserVoucher;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $bookings = Booking::with(['therapist', 'schedule.therapist', 'transaction', 'userVoucher.voucher'])
            ->where('patient_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Hide internal notes from patient view
        $bookings->getCollection()->each(function ($booking) {
            $booking->makeHidden(['therapist_notes', 'session_checklist']);
        });

        $profileProgress = null;
        if ($user->hasRole('patient')) {
            $profileProgress = $user->getProfileCompletionStats();
        }

        return Inertia::render('Clinic/Bookings/Index', [
            'bookings' => $bookings,
            'profileProgress' => $profileProgress,
        ]);
    }

    /**
     * Session History - Shows completed sessions with therapist notes, recordings, outcomes
     */
    public function sessionHistory(Request $request)
    {
        $user = $request->user();

        $bookings = Booking::with(['therapist', 'schedule.therapist'])
            ->join('schedules', 'bookings.schedule_id', '=', 'schedules.id')
            ->select('bookings.*')
            ->where('patient_id', $user->id)
            ->whereIn('bookings.status', ['completed', 'confirmed'])
            ->orderBy('schedules.date', 'desc')
            ->orderBy('schedules.start_time', 'desc')
            ->paginate(10);

        // Hide internal therapist notes from patient view
        $bookings->getCollection()->each(function ($booking) {
            $booking->makeHidden(['therapist_notes', 'session_checklist']);
        });

        return Inertia::render('Clinic/Bookings/SessionHistory', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Transaction History - Shows payment/invoice records
     */
    public function transactionHistory(Request $request)
    {
        $user = $request->user();

        $transactions = \App\Models\Transaction::with(['transactionable'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // eager load nested relations based on the type
        $transactions->getCollection()->transform(function ($tx) {
            if ($tx->transactionable_type === 'App\Models\Booking' && $tx->transactionable) {
                $tx->transactionable->load(['therapist', 'schedule.therapist']);
                $tx->transactionable->makeHidden(['therapist_notes']);
            }
            return $tx;
        });

        $profileProgress = null;
        if ($user->hasRole('patient')) {
            $profileProgress = $user->getProfileCompletionStats();
        }

        return Inertia::render('Clinic/Bookings/TransactionHistory', [
            'transactions' => $transactions,
            'profileProgress' => $profileProgress,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();

        // Must complete screening first
        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show');
        }

        // Must complete agreement (check session or DB)
        if (!$user->hasValidAgreement()) {
            return redirect()->route('agreement.show')->with('error', 'Silakan setujui persyaratan awal sebelum memilih jadwal. (Berlaku 1 tahun sejak penandatanganan)');
        }

        $this->ensureGenericSchedulesExist();

        // Buffer: 1 hour (Wait, we move this logic to the frontend to allow 'disabled' state)
        // Ensure we fetch from today (Asia/Jakarta)
        $now = \Illuminate\Support\Carbon::now('Asia/Jakarta');
        $toDate = $now->copy()->addDays(14);

        $isSqlite = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite';
        $weekendSql = $isSqlite ? "strftime('%w', date) IN ('0', '6')" : "DAYOFWEEK(date) IN (1, 7)";

        $rawSchedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', $now->toDateString())
            ->where('date', '<=', $toDate->toDateString())
            ->where('status', 'available')
            ->whereRaw("NOT ({$weekendSql})") // Sab/Min Libur
            ->withCount([
            'bookings' => function ($query) {
            $query->where('status', 'confirmed'); // Kuota hanya berkurang jika sudah divalidasi (confirmed)
        }
        ])
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        // Hapus duplikasi berdasarkan tanggal dan waktu mulai
        $schedules = $rawSchedules->filter(function ($item) {
            // Safety: hide if already full with confirmed bookings
            if ($item->bookings_count >= $item->quota) {
                return false;
            }
            return true;
        })->unique(function ($item) {
            $date = $item->date instanceof \Illuminate\Support\Carbon ? $item->date : \Illuminate\Support\Carbon::parse($item->date);
            return $date->format('Y-m-d') . '_' . $item->start_time;
        })->values();

        // Tentukan aturan pilihan paket
        $recommended = $user->recommended_package ?? 'hipnoterapi';
        $isVipOnly = in_array($recommended, ['vip']);

        $screeningResult = \App\Models\ScreeningResult::where('user_id', $user->id)
            ->latest('completed_at')
            ->first();

        $packages = \App\Models\Package::where('is_active', true)->get();
        $mappedPackages = [];
        foreach ($packages as $pkg) {
            $mappedPackages[$pkg->slug] = [
                'id' => $pkg->slug,
                'name' => $pkg->name,
                'price' => $pkg->current_price,
                'original_price' => $pkg->discount_percentage > 0 ? $pkg->base_price : null,
                'description' => $pkg->description,
            ];
        }

        $packageOptions = [
            'recommended' => $recommended,
            'is_vip_only' => $isVipOnly,
            'packages' => $mappedPackages
        ];

        $activeBooking = Booking::where('patient_id', $user->id)
            ->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed', 'rescheduled'])
            ->with(['schedule', 'transaction'])
            ->latest()
            ->first();

        return Inertia::render('Clinic/Bookings/Create', [
            'schedules' => $schedules,
            'packageOptions' => $packageOptions,
            'screeningResult' => $screeningResult,
            'activeBooking' => $activeBooking,
        ]);
    }

    public function store(Request $request, BookingService $bookingService)
    {
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'package_type' => 'required|in:hipnoterapi,upgrade,vip',
            'agree_refund' => 'required|accepted',
            'agree_final' => 'required|accepted',
            'agree_access' => 'required|accepted',
            'agree_chargeback' => 'required|accepted',
        ]);

        $user = $request->user();

        // Prevent new booking if an active one exists
        $activeBooking = Booking::where('patient_id', $user->id)
            ->whereIn('status', ['pending_payment', 'pending_validation', 'confirmed', 'in_progress'])
            ->exists();

        if ($activeBooking) {
            return redirect()->back()->withErrors(['error' => 'Anda masih memiliki jadwal booking yang belum selesai. Selesaikan sesi saat ini sebelum membuat janji baru.']);
        }

        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show')->withErrors(['error' => 'Selesaikan skrining terlebih dahulu.']);
        }

        if (!session()->has('initial_agreement_completed') && !$user->agreement_signed_at) {
            return redirect()->route('agreement.show')->withErrors(['error' => 'Selesaikan persetujuan awal terlebih dahulu.']);
        }

        // Validasi Anti-Bypass
        if ($user->recommended_package === 'vip' && $validated['package_type'] !== 'vip') {
            return redirect()->back()->withErrors(['error' => 'Kondisi Anda mewajibkan untuk mengambil program VIP.']);
        }

        try {
            $booking = $bookingService->createBooking($validated, $user->id);
            return redirect()->route('payments.create', $booking->id)->with('success', 'Booking berhasil dibuat. Silakan lanjut ke pembayaran.');
        }
        catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Booking $booking)
    {
        if ((int)$booking->patient_id !== (int)auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        $booking->load(['therapist', 'schedule.therapist', 'transaction', 'userVoucher.voucher']);

        // Hide internal therapist notes from patient view (only show patient_visible_notes)
        if (!auth()->user()->isStaff()) {
            $booking->makeHidden(['therapist_notes', 'session_checklist']);
        }

        // Pass user's active vouchers so the frontend can offer applying one
        $userVouchers = UserVoucher::with('voucher')
            ->where('user_id', auth()->id())
            ->active()
            ->get()
            ->map(fn($uv) => [
        'id' => $uv->id,
        'code' => $uv->voucher->code,
        'description' => $uv->voucher->description,
        'discount_amount' => $uv->voucher->discount_amount,
        'is_active' => true,
        ]);

        return Inertia::render('Clinic/Bookings/Show', [
            'booking' => $booking,
            'userVouchers' => $userVouchers,
        ]);
    }

    public function cancel(Booking $booking, Request $request)
    {
        if ((int)$booking->patient_id !== (int)$request->user()->id && !$request->user()->isStaff()) {
            abort(403);
        }

        // Only allow cancel before booking is confirmed
        if ($booking->status === 'confirmed') {
            return redirect()->route('bookings.show', $booking->id)
                ->withErrors(['error' => 'Pesanan yang sudah dikonfirmasi tidak dapat dibatalkan.']);
        }

        // Free the schedule slot back up if it was previously confirmed
        if ($booking->status === 'confirmed') {
            $schedule = $booking->schedule;
            if ($schedule) {
                $schedule->decrement('booked_count');
                if ($schedule->status === 'full') {
                    $schedule->update(['status' => 'available']);
                }
            }
        }

        $booking->update(['status' => 'cancelled']);

        // Also cancel any linked transaction that is still pending
        if ($booking->transaction && $booking->transaction->status === 'pending') {
            $booking->transaction->update([
                'status' => 'rejected',
                'rejection_reason' => 'Booking dibatalkan'
            ]);
        }

        return redirect()->route('bookings.create')
            ->with('success', 'Pesanan lama dibatalkan. Silakan pilih jadwal baru Anda.');
    }

    private function ensureGenericSchedulesExist()
    {
        $therapistCount = \App\Models\User::role('therapist')->count();
        $quota = $therapistCount > 0 ? $therapistCount : 1;

        $slotsArray = [
            ['start' => '08:00:00', 'end' => '10:00:00'],
            ['start' => '10:00:00', 'end' => '12:00:00'],
            ['start' => '13:00:00', 'end' => '15:00:00'],
            ['start' => '15:00:00', 'end' => '17:00:00'],
            ['start' => '18:00:00', 'end' => '20:00:00'],
        ];

        // Always work with Jakarta time
        $startDate = \Illuminate\Support\Carbon::now('Asia/Jakarta')->startOfDay();
        $endDate = $startDate->copy()->addDays(14);

        // Hapus paksa jika ada jadwal sabtu/minggu yang terselip
        $isSqlite = \Illuminate\Support\Facades\DB::getDriverName() === 'sqlite';
        $weekendSql = $isSqlite ? "strftime('%w', date) IN ('0', '6')" : "DAYOFWEEK(date) IN (1, 7)";

        \App\Models\Schedule::where('date', '>=', $startDate->toDateString())
            ->whereRaw($weekendSql)
            ->whereDoesntHave('bookings')
            ->delete();

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            if ($date->isWeekend())
                continue;

            foreach ($slotsArray as $slot) {
                \Illuminate\Support\Facades\DB::table('schedules')->updateOrInsert(
                [
                    'date' => $date->toDateString(),
                    'start_time' => $slot['start'],
                    'schedule_type' => 'consultation',
                ],
                [
                    'end_time' => $slot['end'],
                    'quota' => $quota,
                    'status' => 'available',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
                );
            }
        }
    }
}
