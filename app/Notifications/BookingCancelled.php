<?php

namespace App\Notifications;

use App\Models\Booking;
use App\Mail\BookingCancelled as BookingCancelledMail;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingCancelled extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable)
    {
        return (new BookingCancelledMail($this->booking))->to($notifiable->email);
    }

    public function toArray($notifiable)
    {
        return [
            'booking_id' => $this->booking->id,
            'title' => 'Reservasi Dibatalkan',
            'message' => "Reservasi Anda dengan kode #{$this->booking->booking_code} telah dibatalkan.",
            'url' => route('bookings.history'),
            'type' => 'error'
        ];
    }
}
