<?php

namespace App\Mail;

use Illuminate\Support\Facades\Http;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\MessageConverter;

class ResendHttpTransport extends AbstractTransport
{
    protected string $key;
    protected string $from;

    public function __construct(string $key, string $from)
    {
        parent::__construct();
        $this->key = $key;
        $this->from = $from;
    }

    protected function doSend(SentMessage $message): void
    {
        try {
            $email = MessageConverter::toEmail($message->getOriginalMessage());

            $payload = [
                'from' => $this->from,
                'to' => collect($email->getTo())->map(fn($recipient) => $recipient->getAddress())->all(),
                'subject' => $email->getSubject(),
                'html' => $email->getHtmlBody(),
                'text' => $email->getTextBody(),
            ];

            $response = Http::withToken($this->key)
                ->timeout(10)
                ->post('https://api.resend.com/emails', $payload);

            if (!$response->successful()) {
                \Illuminate\Support\Facades\Log::error('Resend API Error: ' . $response->body());
            }
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Resend Transport Exception: ' . $e->getMessage());
        }
    }

    public function __toString(): string
    {
        return 'resend-http';
    }
}
