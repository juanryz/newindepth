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

        $bookings = Booking::with(['schedule.therapist', 'transaction', 'userVoucher.voucher'])
            ->where('patient_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Clinic/Bookings/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();

        // Must complete screening first
        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show');
        }

        if (!session()->has('initial_agreement_completed')) {
            return redirect()->route('agreement.show')->with('error', 'Silakan setujui persyaratan awal sebelum memilih jadwal.');
        }

        $this->ensureGenericSchedulesExist();

        $rawSchedules = Schedule::where('schedule_type', 'consultation')
            ->where('date', '>=', now()->toDateString())
            ->where('date', '<=', now()->addDays(14)->toDateString())
            ->where('status', 'available')
            ->withCount([
                'bookings' => function ($query) {
                    $query->whereNotIn('status', ['failed', 'cancelled']);
                }
            ])
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        // Hapus duplikasi berdasarkan tanggal dan waktu mulai
        $schedules = $rawSchedules->unique(function ($item) {
            return $item->date . '_' . $item->start_time;
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
        ]);

        $user = $request->user();

        if (!$user->hasCompletedScreening()) {
            return redirect()->route('screening.show')->withErrors(['error' => 'Selesaikan skrining terlebih dahulu.']);
        }

        if (!session()->has('initial_agreement_completed')) {
            return redirect()->route('agreement.show')->withErrors(['error' => 'Selesaikan persetujuan awal terlebih dahulu.']);
        }

        // Validasi Anti-Bypass
        if ($user->recommended_package === 'vip' && $validated['package_type'] !== 'vip') {
            return redirect()->back()->withErrors(['error' => 'Kondisi Anda mewajibkan untuk mengambil program VIP.']);
        }

        try {
            $booking = $bookingService->createBooking($validated, $user->id);
            return redirect()->route('bookings.show', $booking->id)->with('success', 'Booking berhasil dibuat.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Booking $booking)
    {
        if ($booking->patient_id !== auth()->id()) {
            abort(403);
        }

        $booking->load(['schedule.therapist', 'transaction', 'userVoucher.voucher']);

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
        if ($booking->patient_id !== $request->user()->id) {
            abort(403);
        }

        // Only allow cancel before booking is confirmed
        if ($booking->status === 'confirmed') {
            return redirect()->route('bookings.show', $booking->id)
                ->withErrors(['error' => 'Pesanan yang sudah dikonfirmasi tidak dapat dibatalkan.']);
        }

        $booking->update(['status' => 'cancelled']);

        // Free the schedule slot back up if it was locked
        $schedule = $booking->schedule;
        if ($schedule) {
            $schedule->decrement('booked_count');
            if ($schedule->status === 'full') {
                $schedule->update(['status' => 'available']);
            }
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

        $startDate = now();
        $endDate = now()->addDays(14);

        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            foreach ($slotsArray as $slot) {
                $existing = Schedule::where('date', $date->format('Y-m-d'))
                    ->where('start_time', $slot['start'])
                    ->where('end_time', $slot['end'])
                    ->where('schedule_type', 'consultation')
                    ->whereNull('therapist_id')
                    ->first();

                if (!$existing) {
                    Schedule::create([
                        'date' => $date->format('Y-m-d'),
                        'start_time' => $slot['start'],
                        'end_time' => $slot['end'],
                        'schedule_type' => 'consultation',
                        'quota' => $quota,
                        'status' => 'available',
                    ]);
                } else if ($existing->quota !== $quota) {
                    $existing->update(['quota' => $quota]);
                }
            }
        }
    }
}
