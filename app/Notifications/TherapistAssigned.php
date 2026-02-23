<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TherapistAssigned extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load('therapist', 'schedule');
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $dateStr = $this->booking->schedule ? $this->booking->schedule->date->format('d M Y') : 'Waktu belum ditentukan';
        return [
            'booking_id' => $this->booking->id,
            'title' => 'Terapis Anda Telah Ditugaskan',
            'message' => "Halo! Kami telah menugaskan {$this->booking->therapist->name} sebagai praktisi Anda untuk sesi pada tanggal {$dateStr}. Sampai jumpa di sesi terapi!",
            'url' => route('bookings.show', $this->booking->id),
            'type' => 'info'
        ];
    }
}
