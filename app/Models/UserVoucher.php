<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserVoucher extends Model
{
    protected $fillable = [
        'user_id',
        'voucher_id',
        'claimed_at',
        'expired_at',
        'used_at',
        'booking_id',
    ];

    protected $casts = [
        'claimed_at' => 'datetime',
        'expired_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    protected $with = ['voucher'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function isUsed(): bool
    {
        return $this->used_at !== null;
    }

    public function isExpired(): bool
    {
        return $this->expired_at !== null && $this->expired_at->isPast();
    }

    public function isActive(): bool
    {
        return !$this->isUsed() && !$this->isExpired();
    }

    public function scopeActive($query)
    {
        return $query->whereNull('used_at')
            ->where(function ($q) {
                $q->whereNull('expired_at')->orWhere('expired_at', '>', now());
            });
    }
}
