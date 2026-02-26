<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PettyCashProof extends Model
{
    protected $fillable = [
        'proposal_id',
        'amount_spent',
        'description',
        'receipt_path',
        'status',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'amount_spent' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    public function proposal()
    {
        return $this->belongsTo(PettyCashProposal::class , 'proposal_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class , 'approved_by');
    }
}
