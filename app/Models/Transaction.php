<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $guarded = [];

    protected $casts = [
        'payment_proof_uploaded_at' => 'datetime',
        'validated_at' => 'datetime',
        'corrected_at' => 'datetime',
        'payment_agreement_data' => 'json',
    ];

    /**
     * Ambil nominal efektif (setelah koreksi jika ada).
     */
    public function getEffectiveAmountAttribute(): float
    {
        return $this->corrected_amount !== null ? (float) $this->corrected_amount : (float) $this->amount;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function validatedBy()
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    public function correctedBy()
    {
        return $this->belongsTo(User::class, 'corrected_by');
    }

    public function transactionable()
    {
        return $this->morphTo();
    }
}
