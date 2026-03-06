<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClinicSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClinicSettingController extends Controller
{
    public function index()
    {
        $settings = ClinicSetting::orderBy('group')->orderBy('key')->get();
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable',
        ]);

        foreach ($request->settings as $item) {
            $setting = ClinicSetting::where('key', $item['key'])->first();
            if (!$setting)
                continue;

            $value = $item['value'];
            if ($setting->type === 'json' && is_array($value)) {
                $value = json_encode($value);
            }
            $setting->update(['value' => $value]);
        }

        return redirect()->back()->with('success', 'Pengaturan klinik berhasil disimpan.');
    }

    /**
     * Expose settings as shared data for frontend via Inertia.
     */
    public static function sharedSettings(): array
    {
        return [
            'clinic_open_time' => ClinicSetting::getValue('clinic_open_time', '08:00'),
            'clinic_close_time' => ClinicSetting::getValue('clinic_close_time', '22:00'),
            'schedule_standard_slots' => ClinicSetting::getStandardSlots(),
            'session_auto_close_minutes' => ClinicSetting::getSessionAutoCloseMins(),
        ];
    }
}
