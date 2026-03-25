<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProfileCompletionReminder extends Mailable
{
    use Queueable, SerializesModels;

    public User $user;
    public array $profileCompletion;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->profileCompletion = $user->getProfileCompletionStats();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Lengkapi Profil Akun Anda - ' . config('app.name'),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.profile_completion_reminder',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
