<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingExpired extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'booking_id' => $this->booking->id,
            'title' => 'Reservasi Kadaluarsa',
            'message' => "Batas waktu pembayaran untuk reservasi {$this->booking->booking_code} telah habis. Jadual telah dibatalkan otomatis.",
            'url' => route('bookings.index'),
            'type' => 'warning'
        ];
    }
}
