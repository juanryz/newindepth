<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'booking_code',
        'patient_id',
        'schedule_id',
        'therapist_id',
        'screening_form_id',
        'screening_answers',
        'status',
        'affiliate_ref_code',
        'notes',
        'user_voucher_id',
        'therapist_notes',
        'patient_visible_notes',
    ];

    protected $casts = [
        'screening_answers' => 'json',
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function therapist()
    {
        return $this->belongsTo(User::class, 'therapist_id');
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

    public function userVoucher()
    {
        return $this->belongsTo(UserVoucher::class);
    }
}
