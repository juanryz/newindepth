<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\CustomVerifyEmail);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'google_id',
        'password',
        'phone',
        'referral_code',
        'affiliate_ref',
        'avatar',
        'bio',
        'specialization',
        'status',
        'recommended_package',
        'screening_answers',
        'screening_completed_at',
        'ktp_photo',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'screening_answers' => 'json',
            'screening_completed_at' => 'datetime',
        ];
    }

    public function screeningResults()
    {
        return $this->hasMany(ScreeningResult::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class , 'therapist_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class , 'patient_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function earnedCommissions()
    {
        return $this->hasMany(Commission::class , 'affiliate_user_id');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('transaction_id', 'enrolled_at');
    }

    public function hasCompletedScreening(): bool
    {
        return !is_null($this->screening_completed_at);
    }

    public function isPackageLocked(): bool
    {
        return !is_null($this->recommended_package);
    }
}
