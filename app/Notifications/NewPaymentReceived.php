<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewPaymentReceived extends Notification
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
        return [
            'transaction_id' => $this->transaction->id,
            'title' => 'Pembayaran Baru Masuk',
            'message' => "Ada bukti pembayaran baru untuk Invoice {$this->transaction->invoice_number} dari {$this->transaction->user->name}.",
            'url' => route('admin.transactions.index'),
            'type' => 'info'
        ];
    }
}
