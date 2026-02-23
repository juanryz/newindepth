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

        $profileProgress = null;
        if ($user->hasRole('patient')) {
            $profileProgress = $user->getProfileCompletionStats();
        }

        return Inertia::render('Clinic/Bookings/Index', [
            'bookings' => $bookings,
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

        $rawSchedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', $now->toDateString())
            ->where('date', '<=', $toDate->toDateString())
            ->where('status', 'available')
            ->withCount([
                'bookings' => function ($query) {
                    $query->whereIn('status', ['confirmed', 'pending_payment', 'pending_validation']);
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

        $packageOptions = [
            'recommended' => $recommended,
            'is_vip_only' => $isVipOnly,
            'packages' => [
                'hipnoterapi' => [
                    'id' => 'hipnoterapi',
                    'name' => 'Paket Hipnoterapi',
                    'price' => 1000000,
                    'original_price' => 2000000,
                    'description' => 'Terapi Hipnotis Klinis, Konsultasi Awal & Relaksasi Pikiran Bawah Sadar.',
                ],
                'upgrade' => [
                    'id' => 'upgrade',
                    'name' => 'Paket Upgrade (Pengembangan Diri)',
                    'price' => 1500000,
                    'original_price' => 3000000,
                    'description' => 'Pemrograman Ulang Mindset, Peningkatan Percaya Diri & Teknik NLP Praktis.',
                ],
                'vip' => [
                    'id' => 'vip',
                    'name' => 'Paket VIP (Intensive Care)',
                    'price' => 8000000,
                    'description' => 'Prioritas Jadwal Utama, Terapi Kasus Kompleks & Pendampingan Eksklusif.',
                ]
            ]
        ];

        return Inertia::render('Clinic/Bookings/Create', [
            'schedules' => $schedules,
            'packageOptions' => $packageOptions,
            'screeningResult' => $screeningResult,
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
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Booking $booking)
    {
        if ((int) $booking->patient_id !== (int) auth()->id() && !auth()->user()->isStaff()) {
            abort(403);
        }

        $booking->load(['therapist', 'schedule.therapist', 'transaction', 'userVoucher.voucher']);

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
        if ((int) $booking->patient_id !== (int) $request->user()->id && !$request->user()->isStaff()) {
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
            $booking->transaction->update(['status' => 'cancelled']);
        }

        return redirect()->route('dashboard')
            ->with('success', 'Pesanan berhasil dibatalkan.');
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

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
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
