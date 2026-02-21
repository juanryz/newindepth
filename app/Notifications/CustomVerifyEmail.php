<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\HtmlString;

class CustomVerifyEmail extends VerifyEmail
{
    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verifikasi Email InDepth Kamu – Mulai Perjalanan Healing')
            ->greeting('Halo, ' . $notifiable->name)
            ->line('Selamat datang di InDepth Healing. Langkah pertama untuk memulai perjalanan healing kamu adalah dengan memverifikasi alamat email ini.')
            ->action('Verifikasi Email Saya', $verificationUrl)
            ->line('Jika kamu tidak melakukan pendaftaran ini, silakan abaikan email ini.')
            ->salutation(new HtmlString('Salam hangat,<br><strong>Tim InDepth Healing</strong>'));
    }
}
