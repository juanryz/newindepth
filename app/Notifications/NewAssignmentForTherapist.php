<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewAssignmentForTherapist extends Notification
{
    use Queueable;

    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking->load(['patient', 'schedule']);
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
            'title' => 'Tugas Sesi Baru',
            'message' => "Halo! Anda telah ditugaskan untuk menangani pasien {$this->booking->patient->name} pada tanggal {$dateStr}. Silakan cek jadwal Anda.",
            'url' => route('schedules.index'),
            'type' => 'success'
        ];
    }
}
