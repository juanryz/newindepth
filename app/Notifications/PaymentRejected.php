<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PaymentRejected extends Notification
{
    use Queueable;

    public $transaction;

    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $reason = $this->transaction->rejection_reason ?? 'Informasi tidak valid.';
        return [
            'transaction_id' => $this->transaction->id,
            'title' => 'Pembayaran Ditolak',
            'message' => "Bukti pembayaran Invoice #{$this->transaction->invoice_number} ditolak. Alasan: {$reason}",
            'url' => route('bookings.transactions'),
            'type' => 'error'
        ];
    }
}
