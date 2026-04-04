<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupBookingMember extends Model
{
    protected $fillable = [
        'group_booking_id',
        'user_id',
        'booking_id',
        'package_type',
        'price',
    ];

    protected $casts = [
        'price' => 'float',
    ];

    public function groupBooking()
    {
        return $this->belongsTo(GroupBooking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function transaction()
    {
        return $this->hasOneThrough(Transaction::class, Booking::class, 'id', 'booking_id', 'booking_id', 'id');
    }
}
