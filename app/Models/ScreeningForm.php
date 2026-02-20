<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScreeningForm extends Model
{
    protected $guarded = [];

    protected $casts = [
        'questions' => 'json',
        'is_active' => 'boolean',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
