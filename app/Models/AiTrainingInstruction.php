<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class AiTrainingInstruction extends Model
{
    protected $fillable = ['type', 'instruction', 'category', 'is_active', 'sort_order'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get all active DO instructions.
     */
    public static function getDos(): array
    {
        return static::getByType('do');
    }

    /**
     * Get all active DON'T instructions.
     */
    public static function getDonts(): array
    {
        return static::getByType('dont');
    }

    /**
     * Get instructions by type (cached).
     */
    public static function getByType(string $type): array
    {
        return Cache::remember("ai_training_{$type}", 3600, function () use ($type) {
            return static::where('type', $type)
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->pluck('instruction')
                ->toArray();
        });
    }

    /**
     * Get all instructions grouped by type (for admin page).
     */
    public static function getAllGrouped(): array
    {
        $all = static::orderBy('type')->orderBy('sort_order')->get();
        return [
            'dos' => $all->where('type', 'do')->values()->toArray(),
            'donts' => $all->where('type', 'dont')->values()->toArray(),
        ];
    }

    /**
     * Build a formatted prompt string from all active instructions.
     */
    public static function buildPrompt(): string
    {
        $dos = static::getDos();
        $donts = static::getDonts();
        $prompt = '';

        if (!empty($dos)) {
            $prompt .= "\n\nATURAN TAMBAHAN DARI USER (WAJIB DIIKUTI):\n";
            foreach ($dos as $i => $do) {
                $prompt .= ($i + 1) . ". " . $do . "\n";
            }
        }

        if (!empty($donts)) {
            $prompt .= "\nLARANGAN TAMBAHAN DARI USER (JANGAN DILANGGAR):\n";
            foreach ($donts as $i => $dont) {
                $prompt .= "- JANGAN: " . $dont . "\n";
            }
        }

        return $prompt;
    }

    /**
     * Clear cached instructions.
     */
    public static function clearCache(): void
    {
        Cache::forget('ai_training_do');
        Cache::forget('ai_training_dont');
    }
}
