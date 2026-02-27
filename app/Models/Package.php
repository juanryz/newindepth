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

    public function getCurrentPriceAttribute()
    {
        if ($this->discount_percentage > 0 && (!$this->discount_ends_at || $this->discount_ends_at->isFuture())) {
            return $this->base_price * (1 - ($this->discount_percentage / 100));
        }
        return $this->base_price;
    }

    protected $appends = ['current_price'];
}
