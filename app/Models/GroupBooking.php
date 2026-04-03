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
        'group_name',
        'institution_name',
        'address',
        'pic_name',
        'pic_phone',
        'pic_email',
        'session_type',
        'payment_method',
        'payment_status',
        'total_amount',
        'notes',
        'created_by',
        'paid_at',
    ];

    protected $casts = [
        'total_amount' => 'float',
        'paid_at' => 'datetime',
    ];

    // ── Relations ─────────────────────────────────────────────────────────────

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

    // ── Helpers ───────────────────────────────────────────────────────────────

    public static function generateInvoiceNumber(): string
    {
        $year  = now()->year;
        $month = now()->format('m');
        do {
            $rand = strtoupper(Str::random(6));
            $number = "GRP-{$year}{$month}-{$rand}";
        } while (static::where('invoice_number', $number)->exists());

        return $number;
    }

    public function recalculateTotal(): void
    {
        $this->update([
            'total_amount' => $this->members()->sum('price'),
        ]);
    }

    public function getMemberCountAttribute(): int
    {
        return $this->members()->count();
    }
}
