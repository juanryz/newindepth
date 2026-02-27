<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PettyCashProposal extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'description',
        'amount',
        'status',
        'approved_by',
        'rejection_reason',
        'approved_at',
        'transfer_proof',
        'payment_method',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function proofs()
    {
        return $this->hasMany(PettyCashProof::class, 'proposal_id');
    }
}
