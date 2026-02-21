<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScreeningResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'step_data',
        'chat_history',
        'severity_label',
        'recommended_package',
        'ai_summary',
        'is_high_risk',
        'completed_at',
    ];

    protected $casts = [
        'step_data' => 'array',
        'chat_history' => 'array',
        'is_high_risk' => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
