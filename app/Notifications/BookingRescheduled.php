<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingRescheduled extends Notification
{
    use Queueable;

    public $booking;
    public $reason;

    public function __construct(Booking $booking, $reason)
    {
        $this->booking = $booking;
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $date = \Carbon\Carbon::parse($this->booking->schedule->date)->format('d/m/Y');
        $time = substr($this->booking->schedule->start_time, 0, 5);

        return [
            'booking_id' => $this->booking->id,
            'title' => 'Jadwal Sesi Berubah (Rescheduled)',
            'message' => "Jadwal sesi Anda telah diubah ke tanggal {$date} pukul {$time} WIB. Alasan: {$this->reason}",
            'url' => route('dashboard'), // Or specific booking view if exists
            'type' => 'warning'
        ];
    }
}
