<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TherapistController extends Controller
{
    public function index()
    {
        // Get users with 'therapist' role
        $therapists = User::role('therapist')
            ->where('status', 'active')
            ->select('id', 'name', 'avatar', 'specialization', 'bio')
            ->get();

        return Inertia::render('Therapists/Index', [
            'therapists' => $therapists
        ]);
    }

    public function show(User $user)
    {
        if (!$user->hasRole('therapist') || $user->status !== 'active') {
            abort(404);
        }

        // Get therapist's available schedules for the next 14 days
        $schedules = $user->schedules()
            ->where('date', '>=', now()->toDateString())
            ->where('date', '<=', now()->addDays(14)->toDateString())
            ->whereDoesntHave('bookings', function ($query) {
                $query->whereIn('status', ['confirmed', 'done']);
            })
            ->orderBy('date')
            ->orderBy('time_slot')
            ->get()
            ->groupBy(function ($schedule) {
                return \Carbon\Carbon::parse($schedule->date)->format('Y-m-d');
            });

        return Inertia::render('Therapists/Show', [
            'therapist' => $user->only(['id', 'name', 'avatar', 'specialization', 'bio']),
            'schedules' => $schedules
        ]);
    }
}
