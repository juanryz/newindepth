<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Voucher extends Model
{
    protected $fillable = [
        'code',
        'type',
        'description',
        'discount_amount',
        'is_active',
        'max_claims',
        'valid_from',
        'valid_until',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'discount_amount' => 'integer',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
    ];

    public function userVouchers(): HasMany
    {
        return $this->hasMany(UserVoucher::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_vouchers')
            ->withPivot(['claimed_at', 'expired_at', 'used_at', 'booking_id'])
            ->withTimestamps();
    }

    public function isValidNow(): bool
    {
        $now = now();
        if (!$this->is_active)
            return false;
        if ($this->valid_until && $this->valid_until->lt($now))
            return false;
        if ($this->valid_from->gt($now))
            return false;
        return true;
    }

    public function claimsCount(): int
    {
        return $this->userVouchers()->count();
    }

    public function hasReachedMaxClaims(): bool
    {
        if ($this->max_claims === null)
            return false;
        return $this->claimsCount() >= $this->max_claims;
    }
}
