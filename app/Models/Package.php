<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'base_price',
        'online_base_price',
        'discount_percentage',
        'discount_ends_at',
        'is_active',
        'features',
    ];

    protected $casts = [
        'features' => 'array',
        'discount_ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Offline current price (with discount applied if active).
     */
    public function getCurrentPriceAttribute()
    {
        if ($this->discount_percentage > 0 && (!$this->discount_ends_at || $this->discount_ends_at->isFuture())) {
            return $this->base_price * (1 - ($this->discount_percentage / 100));
        }
        return $this->base_price;
    }

    /**
     * Online base price. Falls back to offline base_price if not set.
     */
    public function getOnlineCurrentPriceAttribute()
    {
        return $this->online_base_price ?? $this->base_price;
    }

    protected $appends = ['current_price', 'online_current_price'];
}
