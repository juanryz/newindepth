<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    // Statuses that occupy a schedule slot (count toward booked_count)
    const SLOT_OCCUPYING_STATUSES = ['confirmed', 'completed', 'no_show', 'in_progress'];

    // All valid statuses
    const STATUSES = ['draft', 'pending_screening', 'pending_payment', 'pending_validation', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'rescheduled'];

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
        'completion_outcome',
        'session_checklist',
        'started_at',
        'recording_link',
        'reschedule_reason',
        'rescheduled_by',
        'rescheduled_at',
        'original_schedule_id',
        'package_type',
        'session_type',
        'ended_at',
        'last_reminder_sent_at',
        'last_reminder_label',
        'last_payment_reminder_sent_at',
    ];

    protected $casts = [
        'screening_answers' => 'json',
        'session_checklist' => 'json',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'rescheduled_at' => 'datetime',
        'last_reminder_sent_at' => 'datetime',
        'last_payment_reminder_sent_at' => 'datetime',
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

    public function originalSchedule()
    {
        return $this->belongsTo(Schedule::class, 'original_schedule_id');
    }

    public function rescheduledByUser()
    {
        return $this->belongsTo(User::class, 'rescheduled_by');
    }

    public function groupMember()
    {
        return $this->hasOne(GroupBookingMember::class, 'booking_id');
    }
}
