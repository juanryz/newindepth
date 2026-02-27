<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingCreated extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load('schedule');
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $dateStr = $this->booking->schedule ? \Illuminate\Support\Carbon::parse($this->booking->schedule->date)->format('d/m/Y') : '-';
        $timeStr = $this->booking->schedule ? substr($this->booking->schedule->start_time, 0, 5) . ' WIB' : '-';

        return [
            'booking_id' => $this->booking->id,
            'title' => 'Reservasi Baru Dibuat',
            'message' => "Reservasi Anda untuk sesi pada {$dateStr} pukul {$timeStr} telah berhasil dibuat. Silakan selesaikan pembayaran agar jadwal tidak dibatalkan otomatis.",
            'url' => route('payments.create', $this->booking->id),
            'type' => 'info'
        ];
    }
}
