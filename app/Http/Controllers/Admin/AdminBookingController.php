<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminBookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['patient.screeningResults', 'schedule', 'therapist'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                if ($booking->patient) {
                    $booking->patient->append('profile_completion');
                    // Add a custom property for easier display in the list
                    $booking->patient_profile_stats = $booking->patient->getProfileCompletionStats();
                }
                return $booking;
            });

        $therapists = User::role('therapist')
            ->select('id', 'name')
            ->get();

        return Inertia::render('Admin/Clinic/Bookings/Index', [
            'bookings' => $bookings,
            'therapists' => $therapists,
        ]);
    }

    public function assignTherapist(Request $request, Booking $booking)
    {
        $request->validate([
            'therapist_id' => 'required|exists:users,id',
        ]);

        $booking->update([
            'therapist_id' => $request->therapist_id,
        ]);

        return back()->with('success', 'Terapis berhasil diassign ke booking.');
    }
}
