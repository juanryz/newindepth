<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PettyCashTransaction extends Model
{
    protected $fillable = [
        'transaction_date',
        'amount',
        'type',
        'description',
        'category',
        'receipt',
        'recorded_by',
        'balance_after',
        'payment_method',
    ];

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
