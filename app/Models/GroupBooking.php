<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GroupBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'user_id',
        'group_name',
        'email',
        'phone',
        'address',
        'session_type',
        'notes',
        'created_by',
        'schedule_id',
        'package_type',
        'payment_status',
        'video_link',
    ];

    // ── Relations ─────────────────────────────────────────────────────────────

    /** Akun login milik grup */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members()
    {
        return $this->hasMany(GroupBookingMember::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'group_booking_members')
            ->withPivot(['package_type', 'price', 'booking_id'])
            ->withTimestamps();
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    /** Semua booking anggota yang di-tag ke grup ini */
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'group_booking_id');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public static function generateInvoiceNumber(): string
    {
        $year  = now()->year;
        $month = now()->format('m');
        do {
            $rand   = strtoupper(Str::random(6));
            $number = "GRP-{$year}{$month}-{$rand}";
        } while (static::where('invoice_number', $number)->exists());

        return $number;
    }

    public function getMemberCountAttribute(): int
    {
        return $this->members()->count();
    }
}
