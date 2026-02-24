import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Form({ therapists, onSuccess }) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        schedule_type: 'consultation',
        date: '',
        session: '',
        start_time: '',
        end_time: '',
        therapist_id: '',
    });

    const SESSIONS = [
        { id: '1', name: 'Sesi 1 (08:00 - 10:00)', start: '08:00', end: '10:00' },
        { id: '2', name: 'Sesi 2 (10:00 - 12:00)', start: '10:00', end: '12:00' },
        { id: '3', name: 'Sesi 3 (13:00 - 15:00)', start: '13:00', end: '15:00' },
        { id: '4', name: 'Sesi 4 (17:00 - 19:00)', start: '17:00', end: '19:00' },
        { id: '5', name: 'Sesi 5 (19:00 - 21:00)', start: '19:00', end: '21:00' },
        { id: 'custom', name: 'Waktu Custom', start: '', end: '' },
    ];

    // Returns today's date string YYYY-MM-DD in local time
    const todayStr = () => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Current time as HH:MM
    const nowTimeStr = () => {
        const now = new Date();
        return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    };

    const isToday = data.date === todayStr();

    // Filter sessions: if selected date is today, hide sessions whose start time <= now
    const availableSessions = SESSIONS.filter(s => {
        if (s.id === 'custom') return true;
        if (!isToday) return true;
        // Keep only sessions that start strictly in the future
        return s.start > nowTimeStr();
    });

    // When date changes, reset session if currently selected one is no longer available
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setData('date', newDate);
        // Reset session if it's today and the session is already past
        if (newDate === todayStr() && data.session && data.session !== 'custom') {
            const currentSession = SESSIONS.find(s => s.id === data.session);
            if (currentSession && currentSession.start <= nowTimeStr()) {
                setData('session', '');
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const selectedSession = SESSIONS.find(s => s.id === data.session);
        if (!selectedSession) return;

        let finalStart = selectedSession.start;
        let finalEnd = selectedSession.end;

        if (data.session === 'custom') {
            finalStart = data.start_time;
            finalEnd = data.end_time;
        }

        transform((data) => ({
            ...data,
            start_time: finalStart,
            end_time: finalEnd,
        }));

        post(route('admin.schedules.store'), {
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Jenis Jadwal</label>
                <select
                    value={data.schedule_type}
                    onChange={e => setData('schedule_type', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none"
                    required
                >
                    <option value="consultation" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">👤 Konsultasi Pasien</option>
                    <option value="class" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">🎓 Kelas / Kelompok</option>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Pilih Terapis</label>
                <select
                    value={data.therapist_id}
                    onChange={e => setData('therapist_id', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none"
                    required
                >
                    <option value="" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">Pilih Terapis...</option>
                    {therapists.map(t => (
                        <option
                            key={t.id}
                            value={t.id}
                            className="text-slate-900 dark:text-white bg-white dark:bg-slate-800"
                        >
                            {t.name}
                        </option>
                    ))}
                </select>
                {errors.therapist_id && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.therapist_id}</div>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Tanggal</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={handleDateChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        required
                        min={todayStr()}
                    />
                    {errors.date && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.date}</div>}
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Sesi Waktu</label>
                    <select
                        value={data.session}
                        onChange={e => setData('session', e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none"
                        required
                    >
                        <option value="" className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">Pilih Sesi...</option>
                        {availableSessions.map(s => (
                            <option key={s.id} value={s.id} className="text-slate-900 dark:text-white bg-white dark:bg-slate-800">{s.name}</option>
                        ))}
                    </select>
                    {errors.session && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.session}</div>}
                    {isToday && availableSessions.filter(s => s.id !== 'custom').length === 0 && (
                        <div className="text-amber-500 text-[10px] font-black mt-1 ml-1 uppercase">
                            ⚠️ Semua sesi hari ini sudah lewat. Pilih tanggal besok atau gunakan Waktu Custom.
                        </div>
                    )}
                </div>
            </div>

            {data.session === 'custom' && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Waktu Mulai</label>
                        <input
                            type="time"
                            value={data.start_time}
                            onChange={e => setData('start_time', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            required={data.session === 'custom'}
                            min={isToday ? nowTimeStr() : undefined}
                        />
                        {errors.start_time && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.start_time}</div>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Waktu Selesai</label>
                        <input
                            type="time"
                            value={data.end_time}
                            onChange={e => setData('end_time', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            required={data.session === 'custom'}
                            min={data.start_time || (isToday ? nowTimeStr() : undefined)}
                        />
                        {errors.end_time && <div className="text-rose-500 text-[10px] font-black mt-1 ml-1 uppercase">{errors.end_time}</div>}
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={processing}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 transition-all mt-4"
            >
                {processing ? 'Memproses...' : 'Simpan Slot Jadwal'}
            </button>
        </form>
    );
}
