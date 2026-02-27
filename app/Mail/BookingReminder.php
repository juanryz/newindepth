<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;

    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pengingat: Sesi Terapi Dimulai 2 Jam Lagi - InDepth',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.booking_reminder',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
