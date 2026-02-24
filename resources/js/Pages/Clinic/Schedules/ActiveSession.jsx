import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Clock, User, Video, FileText, AlertCircle, CheckCircle2,
    ArrowLeft, Save, MessageCircle, Activity, Shield, Heart,
    Zap, ExternalLink, Info, CheckSquare, ChevronDown, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHECKLIST_SECTIONS = [
    {
        key: 'pre_talk', title: 'Pre Talk', icon: '🗣️',
        fields: [
            { key: 'problem_name', label: 'Apa nama masalah klien', type: 'text' },
            { key: 'problem_score', label: 'Angka gangguannya', type: 'score' },
            { key: 'has_exception', label: 'Adakah pengecualian', type: 'yesno' },
            { key: 'exception_detail', label: 'Jika ada, apa?', type: 'text', condition: 'has_exception' },
            { key: 'desired_outcome', label: 'Apa outcome yang diinginkan?', type: 'text' },
            { key: 'outcome_indicator', label: 'Apa indikator tercapainya outcome?', type: 'text' },
        ]
    },
    {
        key: 'induction', title: 'Induksi', icon: '🌀',
        fields: [
            { key: 'induction_type', label: 'Tipe Induksi', type: 'multi', options: ['Rapid', 'Direct', 'Indirect', 'Waking'] },
        ]
    },
    {
        key: 'deepening', title: 'Deepening', icon: '🔽',
        fields: [
            { key: 'deepening_technique', label: 'Teknik', type: 'multi', options: ['Tekanan', 'Napas', 'Hitungan', 'Fraksionasi', 'Visualisasi', 'Isolasi'] },
        ]
    },
    {
        key: 'abreaction', title: 'Abreaksi', icon: '💧',
        fields: [{ key: 'has_abreaction', label: 'Abreaksi', type: 'yesno' }]
    },
    {
        key: 'core_method', title: 'Metode Inti', icon: '🧠',
        fields: [
            { key: 'core_method_type', label: 'Metode', type: 'multi', options: ['InDepth Solution', 'Lainnya'] },
            { key: 'other_method', label: 'Sebutkan metode lainnya', type: 'text', condition: 'core_method_type_Lainnya' },
        ]
    },
    {
        key: 'suggestion', title: 'Sugesti', icon: '💬',
        fields: [
            { key: 'suggestion_type', label: 'Tipe Sugesti', type: 'multi', options: ['Direct Drive', 'Story Telling', 'Metaphor'] },
        ]
    },
    {
        key: 'timeline', title: 'Timeline', icon: '⏳',
        fields: [
            { key: 'timeline_type', label: 'Timeline', type: 'multi', options: ['Regresi', 'Future Pacing', 'Mix'] },
        ]
    },
    {
        key: 'hypnosis_seal', title: 'Segel Hipnotis', icon: '🔒',
        fields: [{ key: 'has_seal', label: 'Segel Hipnotis', type: 'yesno' }]
    },
    {
        key: 'emerging', title: 'Emerging', icon: '🔄',
        fields: [
            { key: 'emerging_type', label: 'Tipe Emerging', type: 'multi', options: ['Hitungan Maju', 'Hitungan Mundur'] },
        ]
    },
    {
        key: 'result_test', title: 'Pengujian Hasil', icon: '✅',
        fields: [{ key: 'has_result_test', label: 'Pengujian Hasil', type: 'yesno' }]
    },
    {
        key: 'final_score', title: 'Angka Masalah Akhir', icon: '📊',
        fields: [{ key: 'final_problem_score', label: 'Angka Masalah Akhir', type: 'score' }]
    },
];

export default function ActiveSession({ booking, patient }) {
    // Load draft from localStorage on mount
    const [isLoaded, setIsLoaded] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        recording_link: booking.recording_link || '',
        therapist_notes: booking.therapist_notes || '',
        patient_visible_notes: booking.patient_visible_notes || '',
        completion_outcome: booking.completion_outcome || '',
        session_checklist: booking.session_checklist || {},
    });

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (!isLoaded) {
            const draft = localStorage.getItem(`session_draft_${booking.id}`);
            if (draft) {
                try {
                    const parsed = JSON.parse(draft);
                    setData({
                        ...data,
                        ...parsed,
                        recording_link: parsed.recording_link || data.recording_link,
                        therapist_notes: parsed.therapist_notes || data.therapist_notes,
                        patient_visible_notes: parsed.patient_visible_notes || data.patient_visible_notes,
                        session_checklist: parsed.session_checklist || data.session_checklist,
                    });
                } catch (e) {
                    console.error("Failed to parse draft", e);
                }
            }
            setIsLoaded(true);
        } else {
            localStorage.setItem(`session_draft_${booking.id}`, JSON.stringify({
                recording_link: data.recording_link,
                therapist_notes: data.therapist_notes,
                patient_visible_notes: data.patient_visible_notes,
                session_checklist: data.session_checklist,
            }));
        }
    }, [data.recording_link, data.therapist_notes, data.patient_visible_notes, data.session_checklist]);

    const [timer, setTimer] = useState('00:00:00');
    const [showChecklist, setShowChecklist] = useState(false);
    const latestScreening = patient.screening_results?.[0];

    useEffect(() => {
        const startTime = new Date(booking.started_at);
        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000);
            const h = Math.floor(diff / 3600).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            setTimer(`${h}:${m}:${s}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [booking.started_at]);

    const updateChecklist = (key, value) => {
        setData('session_checklist', { ...data.session_checklist, [key]: value });
    };

    const toggleMulti = (key, option) => {
        const current = data.session_checklist[key] || [];
        const updated = current.includes(option)
            ? current.filter(i => i !== option)
            : [...current, option];
        updateChecklist(key, updated);
    };

    const isChecklistComplete = () => {
        const cl = data.session_checklist;
        return cl.problem_name && cl.problem_score && cl.has_exception !== undefined
            && cl.desired_outcome && cl.outcome_indicator
            && cl.induction_type?.length > 0
            && cl.deepening_technique?.length > 0
            && cl.has_abreaction !== undefined
            && cl.core_method_type?.length > 0
            && cl.suggestion_type?.length > 0
            && cl.timeline_type?.length > 0
            && cl.has_seal !== undefined
            && cl.emerging_type?.length > 0
            && cl.has_result_test !== undefined
            && cl.final_problem_score;
    };

    const getFilledCount = () => {
        const cl = data.session_checklist;
        let filled = 0;
        const total = 15;
        if (cl.problem_name) filled++;
        if (cl.problem_score) filled++;
        if (cl.has_exception !== undefined) filled++;
        if (cl.desired_outcome) filled++;
        if (cl.outcome_indicator) filled++;
        if (cl.induction_type?.length > 0) filled++;
        if (cl.deepening_technique?.length > 0) filled++;
        if (cl.has_abreaction !== undefined) filled++;
        if (cl.core_method_type?.length > 0) filled++;
        if (cl.suggestion_type?.length > 0) filled++;
        if (cl.timeline_type?.length > 0) filled++;
        if (cl.has_seal !== undefined) filled++;
        if (cl.emerging_type?.length > 0) filled++;
        if (cl.has_result_test !== undefined) filled++;
        if (cl.final_problem_score) filled++;
        return { filled, total };
    };

    // Step 1: Click "Selesaikan Sesi" → open checklist modal
    const handleOpenChecklist = (e) => {
        e.preventDefault();
        setShowChecklist(true);
    };

    // Step 2: All checklist filled → submit everything
    const handleFinalSubmit = () => {
        if (!isChecklistComplete()) {
            alert('Mohon lengkapi semua checklist sesi terlebih dahulu.');
            return;
        }
        post(route('schedules.complete', booking.id), {
            onSuccess: () => {
                localStorage.removeItem(`session_draft_${booking.id}`);
            },
            onError: (err) => {
                setShowChecklist(false);
                if (err.recording_link) {
                    alert('Error: ' + err.recording_link);
                } else {
                    alert('Gagal menyelesaikan sesi. Silakan periksa kembali data Anda.');
                }
            }
        });
    };

    const renderField = (field) => {
        const cl = data.session_checklist;
        if (field.condition) {
            if (field.condition === 'has_exception' && cl.has_exception !== true) return null;
            if (field.condition === 'core_method_type_Lainnya' && !(cl.core_method_type || []).includes('Lainnya')) return null;
        }

        switch (field.type) {
            case 'text':
                return (
                    <div key={field.key} className="mb-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">{field.label}</label>
                        <input
                            type="text"
                            value={cl[field.key] || ''}
                            onChange={e => updateChecklist(field.key, e.target.value)}
                            className="w-full bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-3.5 text-sm font-bold dark:text-white transition-all"
                            placeholder={`Isi ${field.label.toLowerCase()}...`}
                        />
                    </div>
                );
            case 'score':
                return (
                    <div key={field.key} className="mb-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{field.label}</label>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <button key={n} type="button" onClick={() => updateChecklist(field.key, n)}
                                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all border-2 ${cl[field.key] === n
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-110'
                                        : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400'
                                        }`}
                                >{n}</button>
                            ))}
                        </div>
                    </div>
                );
            case 'yesno':
                return (
                    <div key={field.key} className="mb-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{field.label}</label>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => updateChecklist(field.key, true)}
                                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === true
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                                    : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500'
                                    }`}>Ya</button>
                            <button type="button" onClick={() => updateChecklist(field.key, false)}
                                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === false
                                    ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400'
                                    : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500'
                                    }`}>Tidak</button>
                        </div>
                    </div>
                );
            case 'multi':
                return (
                    <div key={field.key} className="mb-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">{field.label}</label>
                        <div className="flex flex-wrap gap-2">
                            {field.options.map(opt => {
                                const selected = (cl[field.key] || []).includes(opt);
                                return (
                                    <button key={opt} type="button" onClick={() => toggleMulti(field.key, opt)}
                                        className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selected
                                            ? 'bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400'
                                            : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400'
                                            }`}>
                                        {selected && <span className="mr-1.5">✓</span>}{opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    const progress = getFilledCount();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-500/20 border border-white/20">
                                {patient.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                                Sesi Klinis Langsung
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1">
                                {patient.name}
                            </h2>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <User className="w-3 h-3" /> {patient.age}th • {patient.gender}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durasi Aktif</span>
                            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter tabular-nums">{timer}</span>
                        </div>
                        <Link href={route('schedules.index')}
                            onClick={() => { if (!confirm('Anda yakin ingin keluar dari sesi? Data draft akan tetap tersimpan di browser ini.')) return false; }}
                            className="flex items-center gap-2 px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-black transition-all border border-white/40 dark:border-white/[0.08] shadow-sm uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4" /> Keluar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Sesi: ${patient.name}`} />

            <div className="py-12 relative overflow-hidden min-h-[calc(100vh-100px)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT COLUMN: Main Inputs */}
                        <div className="lg:col-span-8 space-y-8">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-8 md:p-10 border border-white/40 dark:border-white/[0.08] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">

                                {/* Recording Link */}
                                <div className="mb-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-500/20">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Rekaman Sesi</h3>
                                                <p className="text-sm font-medium text-gray-500">URL live stream atau link video tersimpan.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <input type="url" value={data.recording_link} onChange={e => setData('recording_link', e.target.value)}
                                            placeholder="https://www.youtube.com/live/..."
                                            className={`w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-black/20 border-2 rounded-[1.5rem] focus:ring-8 transition-all font-bold tracking-tight ${errors.recording_link ? 'border-red-500/50 focus:ring-red-500/10' : 'border-transparent focus:border-indigo-500/30 focus:ring-indigo-500/10'} dark:text-white placeholder:text-gray-400`}
                                        />
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <Zap className="w-4 h-4 text-indigo-500" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 mt-2 ml-4 uppercase tracking-widest">Wajib diawali dengan https:// (Contoh: https://youtube.com/...)</p>
                                    {errors.recording_link && <p className="text-xs font-black text-red-500 mt-2 ml-4 uppercase tracking-widest">{errors.recording_link}</p>}
                                </div>

                                {/* Clinical Notes */}
                                <div className="mb-12">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-500/20">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Observasi Klinis</h3>
                                                <p className="text-sm font-medium text-gray-500">Rekam medis internal, hanya untuk Praktisi & Admin.</p>
                                            </div>
                                        </div>
                                        <div className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-lg border border-amber-500/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <Shield className="w-3 h-3" /> Rahasia
                                        </div>
                                    </div>
                                    <textarea value={data.therapist_notes} onChange={e => setData('therapist_notes', e.target.value)}
                                        rows="8" placeholder="Tulis analisis sesi, terobosan, dan intervensi di sini..."
                                        className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-8 focus:ring-indigo-500/10 rounded-[2rem] transition-all dark:text-white leading-relaxed resize-none font-bold text-base shadow-inner"
                                    ></textarea>
                                </div>

                                {/* Public Message */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Pesan untuk Pasien</h3>
                                            <p className="text-sm font-medium text-gray-500">Dapat dilihat pada dashboard riwayat pasien.</p>
                                        </div>
                                    </div>
                                    <textarea value={data.patient_visible_notes} onChange={e => setData('patient_visible_notes', e.target.value)}
                                        rows="4" placeholder="Berikan semangat, tugas mandiri, atau tujuan sesi berikutnya..."
                                        className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/10 rounded-[2rem] transition-all dark:text-white leading-relaxed resize-none font-bold text-base"
                                    ></textarea>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Patient Info Card */}
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                                className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 dark:border-indigo-500/20 shadow-xl overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Info className="w-32 h-32" />
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6">
                                        <Zap className="w-3 h-3" /> Wawasan Cepat
                                    </div>
                                    <div className="space-y-5">
                                        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/10 transition-colors hover:bg-indigo-500/20">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Paket Aktif</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">
                                                    {booking.package_type || 'REGULER'}
                                                    {booking.package_type === 'vip' && <span className="ml-2 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full">VIP</span>}
                                                </span>
                                                <div className="p-1.5 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/40">
                                                    <Zap className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        {latestScreening && (
                                            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/10">
                                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Skrining Terbaru</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{latestScreening.summary_title || 'Kondisi Baik'}</span>
                                                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                                                </div>
                                            </div>
                                        )}
                                        <a href={route('schedules.patient-detail', { user: patient.id, from_booking_id: booking.id })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl text-center">
                                            Buka Rekam Medis (Tab Baru) <ExternalLink className="w-3 h-3 opacity-50" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Outcome Controls */}
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                                className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[20px] rounded-[2.5rem] p-8 border border-white/40 dark:border-white/[0.08]">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-500" /> Hasil Sesi
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <button type="button" onClick={() => setData('completion_outcome', 'Normal')}
                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Normal' ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-500/20' : 'border-transparent bg-white/50 dark:bg-black/20'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${data.completion_outcome === 'Normal' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className={`font-black uppercase tracking-widest text-xs ${data.completion_outcome === 'Normal' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500'}`}>Perkembangan Normal</span>
                                        </div>
                                    </button>
                                    <button type="button" onClick={() => setData('completion_outcome', 'Abnormal/Emergency')}
                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Abnormal/Emergency' ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20' : 'border-transparent bg-white/50 dark:bg-black/20'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${data.completion_outcome === 'Abnormal/Emergency' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                                <AlertCircle className="w-5 h-5" />
                                            </div>
                                            <span className={`font-black uppercase tracking-widest text-xs ${data.completion_outcome === 'Abnormal/Emergency' ? 'text-red-700 dark:text-red-400' : 'text-gray-500'}`}>Butuh Tindakan</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Complete Session Button → opens checklist modal */}
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-4">
                                {(!data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome) && (
                                    <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                        <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest text-center leading-relaxed">
                                            ⚠️ Lengkapi Rekaman Sesi, Observasi Klinis, Pesan Pasien, dan Hasil Sesi untuk mengaktifkan tombol penyelesaian.
                                        </p>
                                    </div>
                                )}
                                <button onClick={handleOpenChecklist}
                                    disabled={processing || !data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome}
                                    className="w-full py-8 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:opacity-30 disabled:grayscale text-white rounded-[2.5rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] transition-all enabled:hover:scale-[1.02] enabled:active:scale-95 group flex items-center justify-center gap-4">
                                    <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
                                        <Save className="w-6 h-6" />
                                    </div>
                                    SELESAIKAN SESI
                                </button>
                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6 px-10 leading-loose">
                                    Klik untuk mengisi checklist sesi dan menyelesaikan sesi.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== CHECKLIST MODAL ========== */}
            <AnimatePresence>
                {showChecklist && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto py-12 px-4">
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setShowChecklist(false)} />

                        {/* Modal content */}
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-white/20 dark:border-slate-800 z-10">

                            {/* Header */}
                            <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-t-[3rem] border-b border-gray-100 dark:border-gray-800 px-8 py-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                        <CheckSquare className="w-6 h-6 text-indigo-500" />
                                        Checklist Sesi
                                    </h2>
                                    <p className="text-xs font-bold text-gray-500 mt-1">Lengkapi semua item sebelum menyelesaikan sesi.</p>
                                </div>
                                <button onClick={() => setShowChecklist(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Progress */}
                            <div className="px-8 pt-6 pb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Progress</span>
                                    <span className="text-sm font-black text-indigo-600">{progress.filled}/{progress.total}</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200/50 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${(progress.filled / progress.total) * 100}%` }} />
                                </div>
                            </div>

                            {/* Checklist Sections */}
                            <div className="px-8 py-6 space-y-4 max-h-[60vh] overflow-y-auto">
                                {CHECKLIST_SECTIONS.map((section) => (
                                    <div key={section.key} className="bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100/50 dark:border-gray-800/50 p-6">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="text-xl">{section.icon}</span>
                                            <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">{section.title}</span>
                                        </div>
                                        {section.fields.map(field => renderField(field))}
                                    </div>
                                ))}
                            </div>

                            {/* Footer with submit */}
                            <div className="sticky bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-b-[3rem] border-t border-gray-100 dark:border-gray-800 px-8 py-6 flex flex-col gap-3">
                                <button onClick={handleFinalSubmit} disabled={processing || !isChecklistComplete()}
                                    className="w-full py-5 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3">
                                    <Save className="w-5 h-5" />
                                    {processing ? 'Memproses...' : !isChecklistComplete() ? `LENGKAPI ${progress.total - progress.filled} ITEM LAGI` : 'SIMPAN & SELESAIKAN SESI'}
                                </button>
                                <button onClick={() => setShowChecklist(false)} className="w-full py-3 text-gray-400 hover:text-gray-600 font-black text-[10px] uppercase tracking-widest transition-colors">
                                    Kembali ke Sesi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
