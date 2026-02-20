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
        if (!$user->hasCompletedScreening() || !$user->isPackageLocked()) {
            return redirect()->route('screening.show');
        }

        $schedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        // Define package info to show to user
        $packageInfo = [
            'type' => $user->recommended_package,
            'name' => $user->recommended_package === 'vip' ? 'Paket VIP (Khusus Kasus Kronis)' : 'Paket Reguler',
            'price' => $user->recommended_package === 'vip' ? 8000000 : 2000000,
            'description' => $user->recommended_package === 'vip'
                ? 'Terapi intensiv untuk kasus kompleks/kronis dengan prioritas jadwal dan metode advanced.'
                : 'Sesi terapi standar dengan teknik relaksasi dasar.',
        ];

        return Inertia::render('Clinic/Bookings/Create', [
            'schedules' => $schedules,
            'packageInfo' => $packageInfo,
        ]);
    }

    public function store(Request $request, BookingService $bookingService)
    {
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
        ]);

        $user = $request->user();

        if (!$user->hasCompletedScreening() || !$user->isPackageLocked()) {
            return redirect()->route('screening.show')->withErrors(['error' => 'Selesaikan skrining terlebih dahulu.']);
        }

        // Auto-assign the locked package
        $validated['package_type'] = $user->recommended_package;

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
}
