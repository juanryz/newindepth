<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'therapist_id',
        'schedule_type',
        'date',
        'start_time',
        'end_time',
        'quota',
        'booked_count',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
