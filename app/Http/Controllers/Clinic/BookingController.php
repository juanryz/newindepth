<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Schedule;
use App\Models\ScreeningForm;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class BookingController extends Controller
{
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

        $schedules = Schedule::where('schedule_type', 'consultation')
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

        $booking->load(['schedule.therapist', 'transaction']);

        return Inertia::render('Clinic/Bookings/Show', [
            'booking' => $booking,
        ]);
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
                $schedule = Schedule::firstOrCreate([
                    'date' => $date->format('Y-m-d'),
                    'start_time' => $slot['start'],
                    'end_time' => $slot['end'],
                    'schedule_type' => 'consultation',
                ], [
                    'quota' => $quota,
                    'status' => 'available',
                ]);

                if ($schedule->quota !== $quota) {
                    $schedule->update(['quota' => $quota]);
                }
            }
        }
    }
}
