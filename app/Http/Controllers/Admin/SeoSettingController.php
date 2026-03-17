<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Blog/SeoSettings', [
            'settings' => SeoSetting::getAllGrouped(),
            'rules' => SeoSetting::getRules(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:seo_settings,id',
            'settings.*.value' => 'required|string',
        ]);

        foreach ($validated['settings'] as $item) {
            SeoSetting::where('id', $item['id'])->update(['value' => $item['value']]);
        }

        // Clear cache
        SeoSetting::clearCache();

        return redirect()->route('admin.seo-settings.index')
            ->with('success', 'Pengaturan SEO berhasil disimpan.');
    }

    /**
     * Reset all settings to their defaults.
     */
    public function reset()
    {
        $settings = SeoSetting::all();

        foreach ($settings as $setting) {
            if ($setting->default_value !== null) {
                $setting->update(['value' => $setting->default_value]);
            }
        }

        SeoSetting::clearCache();

        return redirect()->route('admin.seo-settings.index')
            ->with('success', 'Semua pengaturan SEO direset ke default.');
    }

    /**
     * Export all SEO rules as JSON (for AI training / integration).
     */
    public function exportRules()
    {
        $rules = SeoSetting::getRules();
        return response()->json([
            'seo_rules' => $rules,
            'exported_at' => now()->toIso8601String(),
            'version' => '1.0',
        ]);
    }
}
