<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BookingNoShow extends Notification
{
    use Queueable;

    public $booking;
    public $party;

    public function __construct(Booking $booking, $party)
    {
        $this->booking = $booking;
        $this->party = $party;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $title = $this->party === 'patient' ? 'Sesi Terlewat (No-Show)' : 'Sesi Dibatalkan Praktisi';
        $message = $this->party === 'patient'
            ? "Anda tercatat tidak hadir pada sesi yang dijadwalkan. Silakan hubungi admin untuk informasi lebih lanjut."
            : "Mohon maaf, praktisi tidak dapat hadir pada sesi ini. Admin akan segera menghubungi Anda untuk penjadwalan ulang.";

        return [
            'booking_id' => $this->booking->id,
            'title' => $title,
            'message' => $message,
            'url' => route('dashboard'),
            'type' => 'danger'
        ];
    }
}
