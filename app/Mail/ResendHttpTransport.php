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
        $email = MessageConverter::toEmail($message->getOriginalMessage());

        $payload = [
            'from' => $this->from,
            'to' => collect($email->getTo())->map(fn($recipient) => $recipient->getAddress())->all(),
            'subject' => $email->getSubject(),
            'html' => $email->getHtmlBody(),
            'text' => $email->getTextBody(),
        ];

        $response = Http::withToken($this->key)
            ->post('https://api.resend.com/emails', $payload);

        if (!$response->successful()) {
            throw new \Exception('Resend API Error: ' . $response->body());
        }
    }

    public function __toString(): string
    {
        return 'resend-http';
    }
}
