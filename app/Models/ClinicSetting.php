<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'label', 'group'];

    /**
     * Get a setting value by key, with optional default.
     */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (!$setting)
            return $default;

        return match ($setting->type) {
            'integer' => (int) $setting->value,
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($setting->value, true),
            default => $setting->value,
        };
    }

    /**
     * Set (upsert) a setting value by key.
     */
    public static function setValue(string $key, mixed $value): void
    {
        $val = is_array($value) ? json_encode($value) : (string) $value;
        static::updateOrCreate(['key' => $key], ['value' => $val]);
    }

    /**
     * Get all standard schedule slots from settings.
     * Returns array of ['start' => 'HH:MM:SS', 'end' => 'HH:MM:SS', 'label' => 'Sesi N']
     */
    public static function getStandardSlots(): array
    {
        $slots = static::getValue('schedule_standard_slots');
        if ($slots && is_array($slots)) {
            // Ensure each slot has HH:MM:SS format
            return array_map(function ($slot) {
                return [
                    'start' => strlen($slot['start']) === 5 ? $slot['start'] . ':00' : $slot['start'],
                    'end' => strlen($slot['end']) === 5 ? $slot['end'] . ':00' : $slot['end'],
                    'label' => $slot['label'] ?? '',
                ];
            }, $slots);
        }

        // Fallback defaults — only used if settings table is empty/not migrated
        return [
            ['start' => '08:00:00', 'end' => '10:00:00', 'label' => 'Sesi 1'],
            ['start' => '10:00:00', 'end' => '12:00:00', 'label' => 'Sesi 2'],
            ['start' => '13:00:00', 'end' => '15:00:00', 'label' => 'Sesi 3'],
            ['start' => '15:00:00', 'end' => '17:00:00', 'label' => 'Sesi 4'],
            ['start' => '18:00:00', 'end' => '20:00:00', 'label' => 'Sesi 5'],
        ];
    }

    /**
     * Get clinic operational hours.
     */
    public static function getOperationalHours(): array
    {
        return [
            'open' => static::getValue('clinic_open_time', '08:00'),
            'close' => static::getValue('clinic_close_time', '22:00'),
        ];
    }

    /**
     * Get session auto-close duration in minutes.
     */
    public static function getSessionAutoCloseMins(): int
    {
        return (int) static::getValue('session_auto_close_minutes', 95);
    }
}
