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
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\CustomResetPassword($token));
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
        'digital_signature',
        'agreement_signed',
        'agreement_signed_at',
        'agreement_data',
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
            'agreement_data' => 'json',
            'screening_completed_at' => 'datetime',
            'agreement_signed_at' => 'datetime',
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
        return $this->hasMany(Transaction::class , 'user_id');
    }

    public function earnedCommissions()
    {
        return $this->hasMany(Commission::class , 'affiliate_user_id');
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

    public function hasValidAgreement(): bool
    {
        if (is_null($this->agreement_signed_at)) {
            return false;
        }

        // Agreement expires after 1 year (365 days)
        return $this->agreement_signed_at->diffInDays(now()) < 365;
    }

    public function getProfileCompletionStats(): array
    {
        $isTherapist = $this->hasRole('therapist');

        $fields = [
            'name' => ['label' => 'Nama Lengkap', 'filled' => filled($this->name)],
            'email' => ['label' => 'Email', 'filled' => filled($this->email)],
            'age' => ['label' => 'Usia', 'filled' => filled($this->age)],
            'gender' => ['label' => 'Jenis Kelamin', 'filled' => filled($this->gender)],
            'phone' => ['label' => 'Nomor HP', 'filled' => filled($this->phone)],
        ];

        if ($isTherapist) {
            $fields['specialization'] = ['label' => 'Keahlian/Spesialisasi', 'filled' => filled($this->specialization)];
            $fields['bio'] = ['label' => 'Biografi Singkat', 'filled' => filled($this->bio)];
        }
        else {
            $fields['ktp_photo'] = ['label' => 'Foto KTP', 'filled' => filled($this->ktp_photo)];
            $fields['emergency_contact_name'] = ['label' => 'Nama Kontak Darurat', 'filled' => filled($this->emergency_contact_name)];
            $fields['emergency_contact_phone'] = ['label' => 'No. HP Kontak Darurat', 'filled' => filled($this->emergency_contact_phone)];
            $fields['emergency_contact_relation'] = ['label' => 'Hubungan Kontak Darurat', 'filled' => filled($this->emergency_contact_relation)];
            $fields['agreement'] = ['label' => 'Tanda Tangan Perjanjian', 'filled' => $this->hasValidAgreement()];
            $fields['screening'] = ['label' => 'Penyelesaian Skrining', 'filled' => !is_null($this->screening_completed_at)];
        }

        $completedCount = count(array_filter(array_column($fields, 'filled')));
        $totalCount = count($fields);

        // Define mandatory fields for basic "Profile Completion" badge, excluding dynamic steps
        $mandatoryFields = array_diff_key($fields, array_flip(['agreement', 'screening']));
        $isComplete = count(array_filter(array_column($mandatoryFields, 'filled'))) === count($mandatoryFields);

        return [
            'percentage' => (int)round(($completedCount / $totalCount) * 100),
            'fields' => $fields,
            'completed_count' => $completedCount,
            'total_count' => $totalCount,
            'is_complete' => $isComplete,
        ];
    }

    public function isProfileComplete(): bool
    {
        return $this->getProfileCompletionStats()['is_complete'];
    }

    public function isPackageLocked(): bool
    {
        return !is_null($this->recommended_package);
    }

    public function getProfileCompletionAttribute()
    {
        return $this->getProfileCompletionStats();
    }

    public function getKtpPhotoUrlAttribute()
    {
        return $this->ktp_photo ? asset('storage/' . $this->ktp_photo) : null;
    }

    protected $appends = ['profile_completion', 'ktp_photo_url'];
}
