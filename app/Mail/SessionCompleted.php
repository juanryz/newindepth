<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SessionCompleted extends Mailable
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
            subject: 'Sesi Terapi Selesai - InDepth',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.session_completed',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
