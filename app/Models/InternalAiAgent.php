<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Cache;

class InternalAiAgent extends Model
{
    protected $fillable = [
        'name', 'description', 'system_prompt', 'avatar_color',
        'is_active', 'sort_order', 'created_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function instructions(): HasMany
    {
        return $this->hasMany(InternalAiInstruction::class, 'agent_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getInstructions(): array
    {
        return Cache::remember("internal_ai_agent_{$this->id}_instructions", 3600, function () {
            return [
                'dos' => $this->instructions()->where('type', 'do')->where('is_active', true)->orderBy('sort_order')->get()->toArray(),
                'donts' => $this->instructions()->where('type', 'dont')->where('is_active', true)->orderBy('sort_order')->get()->toArray(),
            ];
        });
    }

    public function buildPrompt(): string
    {
        $instructions = $this->getInstructions();
        $prompt = '';

        if (!empty($instructions['dos'])) {
            $prompt .= "\n\nATURAN TAMBAHAN (WAJIB DIIKUTI):\n";
            foreach ($instructions['dos'] as $i => $do) {
                $prompt .= ($i + 1) . ". " . $do['instruction'] . "\n";
            }
        }

        if (!empty($instructions['donts'])) {
            $prompt .= "\nLARANGAN (JANGAN DILANGGAR):\n";
            foreach ($instructions['donts'] as $dont) {
                $prompt .= "- JANGAN: " . $dont['instruction'] . "\n";
            }
        }

        return $prompt;
    }

    public function clearCache(): void
    {
        Cache::forget("internal_ai_agent_{$this->id}_instructions");
    }
}
