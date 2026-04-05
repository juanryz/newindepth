import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import {
    Video, FileText, AlertCircle, CheckCircle2,
    ArrowLeft, MessageCircle, CheckSquare,
    Users,
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

export default function ActiveSession({ booking, patient, isGroupSession = false, groupSessionData = null, isAdmin = false, sessionAutoCloseMin = 95 }) {
    // ── Individual mode: Inertia form ─────────────────────────────────────
    const { data, setData, post, processing } = useForm({
        recording_link:        booking.recording_link        || '',
        therapist_notes:       booking.therapist_notes       || '',
        patient_visible_notes: booking.patient_visible_notes || '',
        completion_outcome:    booking.completion_outcome    || '',
        session_checklist:     booking.session_checklist     || {},
    });

    const [isLoaded, setIsLoaded] = useState(false);

    // ── Group mode state ──────────────────────────────────────────────────
    const [memberForms, setMemberForms] = useState(() =>
        isGroupSession && groupSessionData
            ? groupSessionData.members.map(m => ({
                booking_id:            m.booking_id,
                therapist_notes:       m.therapist_notes       || '',
                patient_visible_notes: m.patient_visible_notes || '',
                completion_outcome:    m.completion_outcome    || '',
                session_checklist:     m.session_checklist     || {},
            }))
            : []
    );
    const [activeMemberIdx, setActiveMemberIdx] = useState(0);
    const [groupVideoLink, setGroupVideoLink]   = useState(groupSessionData?.video_link || '');
    const [savingVideoLink, setSavingVideoLink] = useState(false);
    const [savingMember, setSavingMember]       = useState(false);
    const [completingGroup, setCompletingGroup] = useState(false);

    // ── Common state ──────────────────────────────────────────────────────
    const [timer, setTimer]                   = useState('00:00:00');
    const [elapsedMinutes, setElapsedMinutes] = useState(0);
    const [sessionAlert, setSessionAlert]     = useState(null);
    const [alertDismissed30, setAlertDismissed30] = useState(false);
    const [alertDismissed60, setAlertDismissed60] = useState(false);
    const [alertDismissed80, setAlertDismissed80] = useState(false);
    const [forceCompleting, setForceCompleting]   = useState(false);

    // ── Individual localStorage draft ─────────────────────────────────────
    useEffect(() => {
        if (isGroupSession) return;
        if (!isLoaded) {
            const draft = localStorage.getItem(`session_draft_${booking.id}`);
            if (draft) {
                try {
                    const parsed = JSON.parse(draft);
                    setData({
                        ...data,
                        ...parsed,
                        recording_link:        parsed.recording_link        || data.recording_link,
                        therapist_notes:       parsed.therapist_notes       || data.therapist_notes,
                        patient_visible_notes: parsed.patient_visible_notes || data.patient_visible_notes,
                        session_checklist:     parsed.session_checklist     || data.session_checklist,
                        completion_outcome:    parsed.completion_outcome    || data.completion_outcome,
                    });
                } catch (e) {
                    console.error('Failed to parse draft', e);
                }
            }
            setIsLoaded(true);
        } else {
            localStorage.setItem(`session_draft_${booking.id}`, JSON.stringify({
                recording_link:        data.recording_link,
                therapist_notes:       data.therapist_notes,
                patient_visible_notes: data.patient_visible_notes,
                session_checklist:     data.session_checklist,
                completion_outcome:    data.completion_outcome,
            }));
        }
    }, [data.recording_link, data.therapist_notes, data.patient_visible_notes, data.session_checklist, data.completion_outcome]);

    // ── Timer ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const startTime = new Date(booking.started_at);
        const interval = setInterval(() => {
            const now  = new Date();
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
            if (!isGroupSession && mins >= sessionAutoCloseMin && !forceCompleting) {
                setSessionAlert(isAdmin ? 'force_admin' : 'force');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [booking.started_at, alertDismissed30, alertDismissed60, alertDismissed80, forceCompleting]);

    // ── Checklist helpers (unified for both modes) ────────────────────────
    const getChecklist = () =>
        isGroupSession
            ? (memberForms[activeMemberIdx]?.session_checklist || {})
            : data.session_checklist;

    const updateChecklist = (key, value) => {
        if (isGroupSession) {
            setMemberForms(prev => prev.map((f, i) =>
                i === activeMemberIdx
                    ? { ...f, session_checklist: { ...f.session_checklist, [key]: value } }
                    : f
            ));
        } else {
            setData('session_checklist', { ...data.session_checklist, [key]: value });
        }
    };

    const toggleMulti = (key, option) => {
        const current = getChecklist()[key] || [];
        const updated = current.includes(option)
            ? current.filter(i => i !== option)
            : [...current, option];
        updateChecklist(key, updated);
    };

    const isChecklistComplete = (cl = getChecklist()) =>
        cl.problem_name && cl.problem_score && cl.has_exception !== undefined
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

    const getFilledCount = (cl = getChecklist()) => {
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

    // ── Individual mode submit ────────────────────────────────────────────
    const handleFinalSubmit = () => {
        if (!isChecklistComplete()) {
            alert('Mohon lengkapi semua checklist sesi terlebih dahulu.');
            return;
        }
        post(route('schedules.complete', booking.id), {
            preserveState: true,
            onSuccess: () => {
                localStorage.removeItem(`session_draft_${booking.id}`);
                router.visit(route('schedules.patient-detail', patient.id));
            },
            onError: (err) => {
                alert(err.recording_link || 'Gagal menyelesaikan sesi. Silakan periksa kembali data Anda.');
            },
        });
    };

    const handleForceComplete = () => {
        setForceCompleting(true);
        setSessionAlert(null);
        const finalData = { ...data, is_auto: true };
        if (!finalData.completion_outcome) finalData.completion_outcome = 'Normal';
        post(route('schedules.complete', booking.id), {
            data: finalData,
            onSuccess: () => localStorage.removeItem(`session_draft_${booking.id}`),
            onError:   () => setForceCompleting(false),
        });
    };

    // ── Group mode actions ────────────────────────────────────────────────
    const saveGroupVideoLink = () => {
        setSavingVideoLink(true);
        router.post(route('schedules.group-video-link', groupSessionData.id),
            { video_link: groupVideoLink },
            { preserveState: true, onFinish: () => setSavingVideoLink(false) }
        );
    };

    const saveMemberSession = () => {
        const f = memberForms[activeMemberIdx];
        setSavingMember(true);
        router.post(route('schedules.save-member', f.booking_id), {
            therapist_notes:       f.therapist_notes,
            patient_visible_notes: f.patient_visible_notes,
            completion_outcome:    f.completion_outcome,
            session_checklist:     f.session_checklist,
        }, { preserveState: true, onFinish: () => setSavingMember(false) });
    };

    // Semua anggota harus punya therapist_notes + completion_outcome
    const allMembersFilled = memberForms.every(
        f => f.therapist_notes?.trim() && f.completion_outcome
    );

    const completeGroupSession = () => {
        if (!confirm('Selesaikan sesi untuk SEMUA anggota grup? Pastikan semua catatan sudah disimpan.')) return;
        setCompletingGroup(true);
        router.post(route('schedules.group-complete', groupSessionData.id), {
            video_link: groupVideoLink,
            members:    memberForms,
        }, {
            onSuccess: () => router.visit(route('schedules.index')),
            onError:   () => setCompletingGroup(false),
        });
    };

    // ── renderField ───────────────────────────────────────────────────────
    const renderField = (field) => {
        const cl = getChecklist();
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

    const progress      = getFilledCount();
    const isOvertime    = elapsedMinutes >= sessionAutoCloseMin;
    const isFormDisabled = isOvertime && !isAdmin && !isGroupSession;
    const displayName   = isGroupSession ? groupSessionData?.group_name : patient.name;

    // ── Active group member shorthand ─────────────────────────────────────
    const activeMember     = isGroupSession ? groupSessionData?.members[activeMemberIdx] : null;
    const activeForm       = isGroupSession ? memberForms[activeMemberIdx] : null;
    const updateMemberForm = (key, value) =>
        setMemberForms(prev => prev.map((f, i) => i === activeMemberIdx ? { ...f, [key]: value } : f));

    // ─────────────────────────────────────────────────────────────────────
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl border border-white/20 ${isGroupSession ? 'bg-gradient-to-br from-violet-500 to-indigo-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                                {isGroupSession ? <Users className="w-7 h-7" /> : patient.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">
                                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                                {isGroupSession ? 'Sesi Grup — Langsung' : 'Sesi Klinis Langsung'}
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1">
                                {displayName}
                            </h2>
                            {isGroupSession ? (
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    {groupSessionData?.members.length} Anggota
                                </p>
                            ) : (
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest capitalize">
                                    {patient.age}th • {patient.gender}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durasi Sesi</span>
                            <span className={`text-2xl font-black tabular-nums ${elapsedMinutes >= sessionAutoCloseMin ? 'text-red-600' : 'text-indigo-600 dark:text-indigo-400'}`}>{timer}</span>
                        </div>
                        <Link href={route('schedules.index')} onClick={() => confirm('Keluar dari sesi?')}
                            className="px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-white/40 dark:border-white/[0.08] rounded-2xl text-xs font-black uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4 inline mr-2" /> Keluar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Sesi: ${displayName}`} />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ══════════ GROUP MODE ══════════ */}
                {isGroupSession ? (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* ── Left Sidebar ── */}
                        <div className="lg:w-72 shrink-0 space-y-4">

                            {/* Shared video link */}
                            <div className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 dark:border-white/[0.08] shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Video className="w-4 h-4 text-red-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Link Video Grup</span>
                                </div>
                                <input type="url" value={groupVideoLink} onChange={e => setGroupVideoLink(e.target.value)}
                                    placeholder="https://zoom.us/j/..."
                                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-xl text-sm font-bold dark:text-white mb-3"
                                />
                                <button type="button" onClick={saveGroupVideoLink} disabled={savingVideoLink}
                                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors disabled:opacity-50">
                                    {savingVideoLink ? 'Menyimpan...' : 'Simpan Link Video'}
                                </button>
                            </div>

                            {/* Member list */}
                            <div className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 dark:border-white/[0.08] shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-4 h-4 text-indigo-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Anggota Grup</span>
                                </div>
                                <div className="space-y-2">
                                    {groupSessionData?.members.map((m, idx) => {
                                        const f        = memberForms[idx];
                                        const isActive = idx === activeMemberIdx;
                                        const isDone   = m.status === 'completed';
                                        const hasNotes = f?.therapist_notes?.trim();
                                        return (
                                            <button key={m.booking_id} type="button"
                                                onClick={() => setActiveMemberIdx(idx)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all text-left ${
                                                    isActive
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-[1.02]'
                                                        : isDone
                                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                                                            : 'bg-white/50 dark:bg-black/20 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-300'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                                                    isActive ? 'bg-white/20' : isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                                }`}>
                                                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : m.name?.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-black truncate">{m.name}</p>
                                                    <p className={`text-[9px] font-bold uppercase tracking-widest ${
                                                        isActive ? 'opacity-80' : isDone ? 'text-emerald-500' : hasNotes ? 'text-amber-500' : 'opacity-40'
                                                    }`}>
                                                        {isActive ? 'Sedang Diisi' : isDone ? 'Selesai' : hasNotes ? 'Ada Catatan' : 'Belum Diisi'}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Complete all — hanya muncul jika semua anggota sudah diisi */}
                                {allMembersFilled ? (
                                    <button type="button" onClick={completeGroupSession} disabled={completingGroup}
                                        className="w-full mt-5 py-3 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50 shadow-lg">
                                        {completingGroup ? 'Menyelesaikan...' : 'Selesaikan Semua'}
                                    </button>
                                ) : (
                                    <div className="mt-5 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                                            Isi catatan & hasil semua anggota terlebih dahulu
                                        </p>
                                        <p className="text-[9px] text-amber-500 mt-1">
                                            {memberForms.filter(f => f.therapist_notes?.trim() && f.completion_outcome).length}/{memberForms.length} selesai
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Main: active member form ── */}
                        <div className="flex-1 min-w-0 space-y-6">
                            {activeMember && (
                                <>
                                    {/* Active member badge */}
                                    <div className="flex items-center gap-4 px-2">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg">
                                            {activeMember.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-0.5">Anggota Aktif</p>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white">{activeMember.name}</h3>
                                        </div>
                                        <div className="ml-auto flex items-center gap-2">
                                            {activeMember.transaction_status && (
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                                    activeMember.transaction_status === 'paid'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {activeMember.transaction_status === 'paid' ? 'Lunas' : 'Belum Bayar'}
                                                </span>
                                            )}
                                            <Link
                                                href={route('schedules.patient-detail', activeMember.patient_id)}
                                                target="_blank"
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-colors"
                                            >
                                                <FileText className="w-3 h-3" /> Lihat Profil
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 border border-white/40 dark:border-white/[0.08] shadow-xl space-y-10">

                                        {/* Therapist notes */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <FileText className="w-6 h-6 text-indigo-500" />
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Catatan Klinis</h3>
                                            </div>
                                            <textarea value={activeForm?.therapist_notes || ''} onChange={e => updateMemberForm('therapist_notes', e.target.value)}
                                                rows="6" placeholder="Isi analisis klinis untuk anggota ini..."
                                                className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                            />
                                        </div>

                                        {/* Patient visible notes */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <MessageCircle className="w-6 h-6 text-emerald-500" />
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Pesan untuk Anggota</h3>
                                            </div>
                                            <textarea value={activeForm?.patient_visible_notes || ''} onChange={e => updateMemberForm('patient_visible_notes', e.target.value)}
                                                rows="4" placeholder="Tugas atau semangat untuk anggota ini..."
                                                className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                            />
                                        </div>

                                        {/* Outcome */}
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Hasil Kemajuan Anggota</p>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => updateMemberForm('completion_outcome', 'Normal')}
                                                    className={`flex-1 flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${activeForm?.completion_outcome === 'Normal' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' : 'bg-white dark:bg-black/20 border-transparent text-gray-400'}`}>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span className="text-xs font-black uppercase">Normal</span>
                                                </button>
                                                <button type="button" onClick={() => updateMemberForm('completion_outcome', 'Abnormal/Emergency')}
                                                    className={`flex-1 flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${activeForm?.completion_outcome === 'Abnormal/Emergency' ? 'bg-red-500/10 border-red-500 text-red-600' : 'bg-white dark:bg-black/20 border-transparent text-gray-400'}`}>
                                                    <AlertCircle className="w-5 h-5" />
                                                    <span className="text-xs font-black uppercase">Abnormal</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Checklist */}
                                        <div className="pt-8 border-t border-white/10 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                                    <CheckSquare className="w-6 h-6 text-indigo-500" /> Checklist {activeMember.name}
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

                                        {/* Save member button */}
                                        <div className="pt-6 border-t border-white/10">
                                            <button type="button" onClick={saveMemberSession} disabled={savingMember}
                                                className="w-full py-5 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl font-black shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs">
                                                {savingMember ? 'Menyimpan...' : `Simpan Catatan ${activeMember.name}`}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                ) : (
                    /* ══════════ INDIVIDUAL MODE ══════════ */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 border border-white/40 dark:border-white/[0.08] shadow-xl">

                                {/* Recording Link */}
                                <div className="mb-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Video className="w-6 h-6 text-red-500" />
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Rekaman Sesi</h3>
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
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Klinis: {patient.name}</h3>
                                    </div>
                                    <textarea value={data.therapist_notes} onChange={e => setData('therapist_notes', e.target.value)}
                                        rows="8" placeholder="Isi analisis klinis pasien..." disabled={isFormDisabled}
                                        className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                    />
                                </div>

                                {/* Public Message */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <MessageCircle className="w-6 h-6 text-emerald-500" />
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Pesan Pasien</h3>
                                    </div>
                                    <textarea value={data.patient_visible_notes} onChange={e => setData('patient_visible_notes', e.target.value)}
                                        rows="4" placeholder="Tugas atau semangat untuk pasien..." disabled={isFormDisabled}
                                        className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                                    />
                                </div>

                                {/* Checklist Sections */}
                                <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                            <CheckSquare className="w-6 h-6 text-indigo-500" /> Checklist {patient.name}
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
                            <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 shadow-xl">
                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6">HASIL KEMAJUAN</p>
                                <div className="space-y-4">
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
                                    {processing ? 'Memproses...' : 'Simpan & Selesaikan Sesi'}
                                </button>
                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase mt-6 leading-relaxed">
                                    Lengkapi semua checklist sebelum menyelesaikan sesi.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Session Alert Overlay ── */}
            <AnimatePresence>
                {sessionAlert && (
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full mx-4">
                        <div className={`p-8 rounded-[2.5rem] shadow-2xl border-2 ${
                            sessionAlert === 'force' || sessionAlert === 'force_admin'
                                ? 'bg-red-50 dark:bg-red-900/80 border-red-400'
                                : 'bg-white dark:bg-gray-900 border-amber-400'
                        }`}>
                            {sessionAlert === '30' && (<>
                                <p className="font-black text-lg text-amber-600 mb-2">⏰ 30 Menit Berlalu</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sesi sudah berjalan 30 menit.</p>
                                <button onClick={() => { setAlertDismissed30(true); setSessionAlert(null); }} className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-black text-xs uppercase">OK</button>
                            </>)}
                            {sessionAlert === '60' && (<>
                                <p className="font-black text-lg text-amber-600 mb-2">⏰ 60 Menit Berlalu</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sesi sudah berjalan 1 jam.</p>
                                <button onClick={() => { setAlertDismissed60(true); setSessionAlert(null); }} className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-black text-xs uppercase">OK</button>
                            </>)}
                            {sessionAlert === '80' && (<>
                                <p className="font-black text-lg text-orange-600 mb-2">⚠️ 80 Menit Berlalu</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sesi hampir mencapai batas waktu (95 menit).</p>
                                <button onClick={() => { setAlertDismissed80(true); setSessionAlert(null); }} className="px-6 py-2.5 bg-orange-500 text-white rounded-xl font-black text-xs uppercase">Mengerti</button>
                            </>)}
                            {sessionAlert === 'force' && (<>
                                <p className="font-black text-lg text-red-600 mb-2">🛑 Waktu Habis!</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sesi telah melebihi 95 menit. Form telah dikunci.</p>
                                <button onClick={handleForceComplete} disabled={forceCompleting} className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-black text-xs uppercase disabled:opacity-50">
                                    {forceCompleting ? 'Menyelesaikan...' : 'Selesaikan Otomatis'}
                                </button>
                            </>)}
                            {sessionAlert === 'force_admin' && (<>
                                <p className="font-black text-lg text-red-600 mb-2">⚠️ Sesi Overtime (Admin)</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Sesi telah melebihi 95 menit. Anda masih dapat mengisi form.</p>
                                <button onClick={() => setSessionAlert(null)} className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-black text-xs uppercase">Lanjutkan</button>
                            </>)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
