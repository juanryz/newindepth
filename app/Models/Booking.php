<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'booking_code',
        'patient_id',
        'schedule_id',
        'screening_form_id',
        'screening_answers',
        'status',
        'affiliate_ref_code',
        'notes',
        'recording_link',
        'package_type',
    ];

    protected $casts = [
        'screening_answers' => 'json',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function screeningForm()
    {
        return $this->belongsTo(ScreeningForm::class);
    }

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transactionable');
    }
}
