import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function ClinicSettingsIndex({ settings }) {
    const [localSettings, setLocalSettings] = useState(settings || []);
    const [saving, setSaving] = useState(false);
    const [flash, setFlash] = useState(null);

    // Group settings by 'group'
    const grouped = localSettings.reduce((acc, s) => {
        const g = s.group || 'general';
        if (!acc[g]) acc[g] = [];
        acc[g].push(s);
        return acc;
    }, {});

    const groupLabels = {
        schedule: '📅 Pengaturan Jadwal',
        session: '⏱️ Pengaturan Sesi',
        general: '⚙️ Umum',
    };

    const handleChange = (key, value) => {
        setLocalSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    };

    // For JSON array fields (schedule_standard_slots)
    const handleSlotChange = (idx, field, value) => {
        const setting = localSettings.find(s => s.key === 'schedule_standard_slots');
        if (!setting) return;
        let slots = [];
        try { slots = JSON.parse(setting.value); } catch { slots = []; }
        slots = slots.map((slot, i) => i === idx ? { ...slot, [field]: value } : slot);
        handleChange('schedule_standard_slots', JSON.stringify(slots));
    };

    const addSlot = () => {
        const setting = localSettings.find(s => s.key === 'schedule_standard_slots');
        if (!setting) return;
        let slots = [];
        try { slots = JSON.parse(setting.value); } catch { slots = []; }
        slots.push({ start: '08:00:00', end: '10:00:00', label: `Sesi ${slots.length + 1}` });
        handleChange('schedule_standard_slots', JSON.stringify(slots));
    };

    const removeSlot = (idx) => {
        const setting = localSettings.find(s => s.key === 'schedule_standard_slots');
        if (!setting) return;
        let slots = [];
        try { slots = JSON.parse(setting.value); } catch { slots = []; }
        slots = slots.filter((_, i) => i !== idx);
        handleChange('schedule_standard_slots', JSON.stringify(slots));
    };

    const handleSave = () => {
        setSaving(true);
        router.post(route('admin.clinic-settings.update'), {
            settings: localSettings.map(s => ({ key: s.key, value: s.value })),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setFlash({ type: 'success', msg: 'Pengaturan berhasil disimpan.' });
                setTimeout(() => setFlash(null), 3000);
            },
            onError: () => {
                setFlash({ type: 'error', msg: 'Gagal menyimpan pengaturan.' });
            },
            onFinish: () => setSaving(false),
        });
    };

    const renderField = (setting) => {
        // Special: JSON array of schedule slots
        if (setting.key === 'schedule_standard_slots') {
            let slots = [];
            try { slots = JSON.parse(setting.value || '[]'); } catch { slots = []; }
            return (
                <div key={setting.key} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{setting.label}</label>
                    <div className="space-y-2">
                        {slots.map((slot, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                                <span className="text-[10px] font-black text-slate-400 uppercase w-12">#{idx + 1}</span>
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Label</label>
                                        <input type="text" value={slot.label || ''} onChange={e => handleSlotChange(idx, 'label', e.target.value)}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mulai</label>
                                        <input type="time" value={slot.start ? slot.start.substring(0, 5) : ''} onChange={e => handleSlotChange(idx, 'start', e.target.value + ':00')}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selesai</label>
                                        <input type="time" value={slot.end ? slot.end.substring(0, 5) : ''} onChange={e => handleSlotChange(idx, 'end', e.target.value + ':00')}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20" />
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeSlot(idx)}
                                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSlot}
                            className="w-full py-3 border-2 border-dashed border-indigo-300 dark:border-indigo-800 rounded-2xl text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all">
                            + Tambah Slot
                        </button>
                    </div>
                </div>
            );
        }

        if (setting.type === 'integer') {
            return (
                <div key={setting.key} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{setting.label}</label>
                    <input type="number" value={setting.value || ''} onChange={e => handleChange(setting.key, e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
            );
        }

        // time string (HH:MM)
        if (setting.key.includes('time')) {
            return (
                <div key={setting.key} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{setting.label}</label>
                    <input type="time" value={setting.value || ''} onChange={e => handleChange(setting.key, e.target.value)}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
            );
        }

        return (
            <div key={setting.key} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{setting.label}</label>
                <input type="text" value={setting.value || ''} onChange={e => handleChange(setting.key, e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
            </div>
        );
    };

    return (
        <AuthenticatedLayout header={
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Pengaturan Klinik</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Konfigurasi jadwal, slot, dan sesi terapi</p>
            </div>
        }>
            <Head title="Pengaturan Klinik" />

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    {flash && (
                        <div className={`p-4 rounded-2xl text-sm font-bold ${flash.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                            {flash.msg}
                        </div>
                    )}

                    {/* Info Banner */}
                    <div className="p-5 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-4">
                        <span className="text-2xl">💡</span>
                        <div>
                            <p className="text-sm font-black text-indigo-900 dark:text-indigo-300">Pengaturan ini bersifat dinamis</p>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Perubahan di sini langsung berlaku pada kalender jadwal, form tambah slot, dan durasi auto-close sesi — tanpa perlu ubah kode program.</p>
                        </div>
                    </div>

                    {Object.entries(grouped).map(([group, items]) => (
                        <div key={group} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 space-y-6">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                                <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                                {groupLabels[group] || group}
                            </h3>
                            <div className="space-y-6">
                                {items.map(setting => renderField(setting))}
                            </div>
                        </div>
                    ))}

                    <button onClick={handleSave} disabled={saving}
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.99] disabled:opacity-50 transition-all">
                        {saving ? 'Menyimpan...' : '💾 Simpan Semua Pengaturan'}
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
