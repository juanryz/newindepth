<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingConfirmed extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load(['therapist', 'schedule']);
    }

    public function via($notifiable)
    {
        return ['database']; // Default to database only for in-app alert
    }

    public function toArray($notifiable)
    {
        $therapistName = $this->booking->therapist ? $this->booking->therapist->name : 'Terapis';
        $dateStr = $this->booking->schedule ? \Illuminate\Support\Carbon::parse($this->booking->schedule->date)->format('d/m/Y') : '-';
        $timeStr = $this->booking->schedule ? substr($this->booking->schedule->start_time, 0, 5) . ' WIB' : '-';

        return [
            'booking_id' => $this->booking->id,
            'title' => 'Sesi Terapi Dikonfirmasi',
            'message' => "Sesi Anda dengan {$therapistName} pada {$dateStr} pukul {$timeStr} telah dikonfirmasi.",
            'url' => route('bookings.show', $this->booking->id),
            'type' => 'success'
        ];
    }
}
