<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->referral_code)) {
                $user->referral_code = self::generateUniqueReferralCode();
            }
        });
    }

    public static function generateUniqueReferralCode()
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (self::where('referral_code', $code)->exists());

        return $code;
    }

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
        'age',
        'gender',
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
        return $this->hasMany(Schedule::class, 'therapist_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'patient_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function earnedCommissions()
    {
        return $this->hasMany(Commission::class, 'affiliate_user_id');
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('transaction_id', 'enrolled_at');
    }

    public function hasVerifiedEmail(): bool
    {
        if ($this->isStaff()) {
            return true;
        }
        return !is_null($this->email_verified_at);
    }

    public function isStaff(): bool
    {
        return $this->hasAnyRole(['super_admin', 'admin', 'cs', 'therapist']);
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
