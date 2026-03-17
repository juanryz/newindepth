<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SeoSetting extends Model
{
    protected $fillable = ['key', 'label', 'description', 'group', 'type', 'value', 'default_value', 'unit', 'sort_order'];

    /**
     * Get a setting value by key with an optional default.
     */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        $settings = static::getAllCached();
        $setting = $settings->firstWhere('key', $key);

        if (!$setting)
            return $default;

        return match ($setting->type) {
            'integer' => (int) $setting->value,
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($setting->value, true),
            'float' => (float) $setting->value,
            default => $setting->value,
        };
    }

    /**
     * Get all settings as a cached collection.
     */
    public static function getAllCached()
    {
        return Cache::remember('seo_settings', 3600, function () {
            return static::orderBy('sort_order')->get();
        });
    }

    /**
     * Get all settings grouped by their group field.
     */
    public static function getAllGrouped()
    {
        return static::orderBy('sort_order')->get()->groupBy('group');
    }

    /**
     * Clear the cached settings.
     */
    public static function clearCache(): void
    {
        Cache::forget('seo_settings');
    }

    /**
     * Get all SEO rules as a structured array for the AI / frontend.
     */
    public static function getRules(): array
    {
        $settings = static::getAllCached();
        $rules = [];

        foreach ($settings as $setting) {
            $rules[$setting->key] = [
                'label' => $setting->label,
                'value' => match ($setting->type) {
                    'integer' => (int) $setting->value,
                    'float' => (float) $setting->value,
                    'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
                    'json' => json_decode($setting->value, true),
                    default => $setting->value,
                },
                'unit' => $setting->unit,
                'group' => $setting->group,
            ];
        }

        return $rules;
    }
}
