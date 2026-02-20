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
    public function create()
    {
        $schedules = Schedule::with('therapist')
            ->where('date', '>=', now()->toDateString())
            ->where('status', 'available')
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();

        $form = ScreeningForm::where('is_active', true)->latest()->first();

        return Inertia::render('Clinic/Bookings/Create', [
            'schedules' => $schedules,
            'screeningForm' => $form,
        ]);
    }

    public function store(Request $request, BookingService $bookingService)
    {
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'screening_form_id' => 'required|exists:screening_forms,id',
            'screening_answers' => 'required|array',
        ]);

        try {
            $booking = $bookingService->createBooking($validated, $request->user()->id);
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
