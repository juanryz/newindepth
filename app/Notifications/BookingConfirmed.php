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
        $this->booking = $booking;
    }

    public function via($notifiable)
    {
        return ['database']; // Default to database only for in-app alert
    }

    public function toArray($notifiable)
    {
        return [
            'booking_id' => $this->booking->id,
            'title' => 'Sesi Terapi Dikonfirmasi',
            'message' => "Sesi Anda dengan {$this->booking->therapist->name} pada {$this->booking->schedule->date->format('d/m/Y')} pukul {$this->booking->schedule->time_slot} telah dikonfirmasi.",
            'url' => route('bookings.show', $this->booking->id),
            'type' => 'success'
        ];
    }
}
