import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import {
    Clock, User, Video, FileText, AlertCircle, CheckCircle2,
    ArrowLeft, Save, MessageCircle, Activity, Shield, Heart,
    Zap, ExternalLink, Info, CheckSquare, ChevronDown, X,
    Users, ChevronRight, RefreshCw
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

export default function ActiveSession({ booking, patient, groupMembers = [], isAdmin = false }) {
    // Current Active Patient within the session (defaults to the one provided)
    const [currentBooking, setCurrentBooking] = useState(booking);
    const [currentPatient, setCurrentPatient] = useState(patient);

    const [isLoaded, setIsLoaded] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        recording_link: currentBooking.recording_link || '',
        therapist_notes: currentBooking.therapist_notes || '',
        patient_visible_notes: currentBooking.patient_visible_notes || '',
        completion_outcome: currentBooking.completion_outcome || '',
        session_checklist: currentBooking.session_checklist || {},
    });

    // Handle switching between group members
    const switchMember = (member) => {
        // Save current draft first (useEffect does this automatically, but let's be safe)
        localStorage.setItem(`session_draft_${currentBooking.id}`, JSON.stringify({
            recording_link: data.recording_link,
            therapist_notes: data.therapist_notes,
            patient_visible_notes: data.patient_visible_notes,
            session_checklist: data.session_checklist,
            completion_outcome: data.completion_outcome
        }));

        // Fetch member data (this will refresh the page with the target member's booking, essentially)
        // For a more seamless experience, we redirect to the current route with the new booking ID
        router.visit(route('schedules.active-session', member.booking_id));
    };

    // Save to localStorage whenever data changes
    useEffect(() => {
        if (!isLoaded) {
            const draft = localStorage.getItem(`session_draft_${currentBooking.id}`);
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
                        completion_outcome: parsed.completion_outcome || data.completion_outcome,
                    });
                } catch (e) {
                    console.error("Failed to parse draft", e);
                }
            }
            setIsLoaded(true);
        } else {
            localStorage.setItem(`session_draft_${currentBooking.id}`, JSON.stringify({
                recording_link: data.recording_link,
                therapist_notes: data.therapist_notes,
                patient_visible_notes: data.patient_visible_notes,
                session_checklist: data.session_checklist,
                completion_outcome: data.completion_outcome
            }));
        }
    }, [data.recording_link, data.therapist_notes, data.patient_visible_notes, data.session_checklist, data.completion_outcome]);

    const [timer, setTimer] = useState('00:00:00');
    const [elapsedMinutes, setElapsedMinutes] = useState(0);
    const [showChecklist, setShowChecklist] = useState(false);
    const [sessionAlert, setSessionAlert] = useState(null); 
    const [alertDismissed30, setAlertDismissed30] = useState(false);
    const [alertDismissed60, setAlertDismissed60] = useState(false);
    const [alertDismissed80, setAlertDismissed80] = useState(false);
    const [forceCompleting, setForceCompleting] = useState(false);
    const latestScreening = currentPatient.screening_results?.[0];

    useEffect(() => {
        const startTime = new Date(currentBooking.started_at);
        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000);
            const mins = Math.floor(diff / 60);
            const h = Math.floor(diff / 3600).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            setTimer(`${h}:${m}:${s}`);
            setElapsedMinutes(mins);

            if (mins >= 30 && mins < 31 && !alertDismissed30) setSessionAlert('30');
            if (mins >= 60 && mins < 61 && !alertDismissed60) setSessionAlert('60');
            if (mins >= 80 && mins < 81 && !alertDismissed80) setSessionAlert('80');
            if (mins >= 95 && !forceCompleting) {
                if (isAdmin) {
                    if (!alertDismissed80) setSessionAlert('force_admin');
                } else {
                    setSessionAlert('force');
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [currentBooking.started_at, alertDismissed30, alertDismissed60, alertDismissed80, forceCompleting]);

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

    const handleFinalSubmit = () => {
        if (!isChecklistComplete()) {
            alert('Mohon lengkapi semua checklist sesi terlebih dahulu.');
            return;
        }
        post(route('schedules.complete', currentBooking.id), {
            onSuccess: () => {
                localStorage.removeItem(`session_draft_${currentBooking.id}`);
            },
            onError: (err) => {
                if (err.recording_link) alert('Error: ' + err.recording_link);
                else alert('Gagal menyelesaikan sesi. Silakan periksa kembali data Anda.');
            }
        });
    };

    const handleForceComplete = () => {
        setForceCompleting(true);
        setSessionAlert(null);
        const finalData = { ...data, is_auto: true };
        if (!finalData.completion_outcome) finalData.completion_outcome = 'Normal';
        post(route('schedules.complete', currentBooking.id), {
            data: finalData,
            onSuccess: () => localStorage.removeItem(`session_draft_${currentBooking.id}`),
            onError: () => setForceCompleting(false),
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
                        <input type="text" value={cl[field.key] || ''} onChange={e => updateChecklist(field.key, e.target.value)} disabled={isFormDisabled}
                            className="w-full bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-3.5 text-sm font-bold dark:text-white transition-all disabled:opacity-50"
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
                                <button key={n} type="button" onClick={() => updateChecklist(field.key, n)} disabled={isFormDisabled}
                                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all border-2 ${cl[field.key] === n ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}
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
                            <button type="button" onClick={() => updateChecklist(field.key, true)} disabled={isFormDisabled}
                                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === true ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500'}`}>Ya</button>
                            <button type="button" onClick={() => updateChecklist(field.key, false)} disabled={isFormDisabled}
                                className={`flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === false ? 'bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400' : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500'}`}>Tidak</button>
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
                                    <button key={opt} type="button" onClick={() => toggleMulti(field.key, opt)} disabled={isFormDisabled}
                                        className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selected ? 'bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400' : 'bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400'}`}>
                                        {opt}
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
    const isOvertime = elapsedMinutes >= 95;
    const isFormDisabled = isOvertime && !isAdmin;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-xl border border-white/20">
                                {currentPatient.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                                Sesi Klinis Langsung {groupMembers.length > 0 && "— GRUP"}
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1">
                                {currentPatient.name}
                            </h2>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest capitalize">
                                {currentPatient.age}th • {currentPatient.gender}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durasi Sesi</span>
                            <span className={`text-2xl font-black tabular-nums ${elapsedMinutes >= 95 ? 'text-red-600' : 'text-indigo-600 dark:text-indigo-400'}`}>{timer}</span>
                        </div>
                        <Link href={route('schedules.index')} onClick={() => confirm('Keluar dari sesi?')}
                            className="px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-white/40 dark:border-white/[0.08] rounded-2xl text-xs font-black uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4 inline mr-2" /> Keluar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Sesi: ${currentPatient.name}`} />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Group Member Switcher */}
                {groupMembers.length > 0 && (
                    <div className="mb-10 p-6 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/[0.08] shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-5 h-5 text-indigo-500" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Anggota Grup — Isi Laporan 1 Per 1</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {groupMembers.map(m => (
                                <button key={m.id} onClick={() => switchMember(m)}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all ${m.id === currentPatient.id 
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105' 
                                        : 'bg-white/50 dark:bg-black/20 border-gray-100 dark:border-gray-800 text-gray-600 hover:border-indigo-400'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${m.id === currentPatient.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                        {m.name.charAt(0)}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black uppercase tracking-tight">{m.name}</p>
                                        <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Sedang Diisi</p>
                                    </div>
                                    {m.id === currentPatient.id && <ChevronRight className="w-4 h-4 ml-2" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 border border-white/40 dark:border-white/[0.08] shadow-xl">
                            
                            {/* Recording Link Sync Button for Group */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <Video className="w-6 h-6 text-red-500" />
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Rekaman Sesi</h3>
                                    </div>
                                    {groupMembers.length > 0 && (
                                        <button type="button" onClick={() => {
                                            if (confirm('Gunakan link rekaman ini untuk SEMUA anggota grup?')) {
                                                groupMembers.forEach(m => {
                                                    const draft = JSON.parse(localStorage.getItem(`session_draft_${m.booking_id}`) || '{}');
                                                    localStorage.setItem(`session_draft_${m.booking_id}`, JSON.stringify({ ...draft, recording_link: data.recording_link }));
                                                });
                                                alert('Link rekaman disalin ke semua anggota.');
                                            }
                                        }} className="text-[9px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                                            <RefreshCw className="w-3 h-3" /> Samakan Link ke Semua Anggota
                                        </button>
                                    )}
                                </div>
                                <input type="url" value={data.recording_link} onChange={e => setData('recording_link', e.target.value)}
                                    placeholder="https://www.youtube.com/live/..." disabled={isFormDisabled}
                                    className="w-full px-6 py-5 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl font-bold dark:text-white"
                                />
                            </div>

                            {/* Clinical Notes */}
                            <div className="mb-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <FileText className="w-6 h-6 text-indigo-500" />
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Klinis: {currentPatient.name}</h3>
                                </div>
                                <textarea value={data.therapist_notes} onChange={e => setData('therapist_notes', e.target.value)}
                                    rows="8" placeholder="Isi analisis individual anggota ini..." disabled={isFormDisabled}
                                    className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                ></textarea>
                            </div>

                            {/* Public Message */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <MessageCircle className="w-6 h-6 text-emerald-500" />
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Pesan Pasien</h3>
                                </div>
                                <textarea value={data.patient_visible_notes} onChange={e => setData('patient_visible_notes', e.target.value)}
                                    rows="4" placeholder="Tugas atau semangat untuk anggota ini..." disabled={isFormDisabled}
                                    className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                ></textarea>
                            </div>

                            {/* Checklist Sections */}
                            <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                        <CheckSquare className="w-6 h-6 text-indigo-500" /> Checklist {currentPatient.name}
                                    </h3>
                                    <span className="text-lg font-black text-indigo-600">{progress.filled}/{progress.total}</span>
                                </div>
                                {CHECKLIST_SECTIONS.map((section) => (
                                    <div key={section.key} className="bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100/50 dark:border-gray-800/50 p-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-xl">{section.icon}</span>
                                            <span className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">{section.title}</span>
                                        </div>
                                        {section.fields.map(field => renderField(field))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Summary Widget */}
                        <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 shadow-xl">
                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">HASIL KEMAJUAN MEMBER</p>
                            <div className="grid-cols-1 space-y-4">
                                <button type="button" onClick={() => setData('completion_outcome', 'Normal')} disabled={isFormDisabled}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Normal' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-white dark:bg-black/20 border-transparent text-gray-400'}`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase">Normal</span>
                                </button>
                                <button type="button" onClick={() => setData('completion_outcome', 'Abnormal/Emergency')} disabled={isFormDisabled}
                                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Abnormal/Emergency' ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-white dark:bg-black/20 border-transparent text-gray-400'}`}>
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase">Abnormal</span>
                                </button>
                            </div>
                            
                            <button onClick={handleFinalSubmit}
                                disabled={isFormDisabled || processing || !data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome || !isChecklistComplete()}
                                className="w-full mt-10 py-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl font-black shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs">
                                {processing ? 'Memproses...' : 'Simpan Laporan Anggota'}
                            </button>
                            <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-6 leading-relaxed">
                                Simpan laporan individual anggota sebelum berpindah ke anggota lain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
