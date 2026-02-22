import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    Clock,
    User,
    Video,
    FileText,
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    Save,
    MessageCircle,
    Activity,
    Shield,
    Heart,
    Zap,
    ExternalLink,
    Info,
    CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActiveSession({ booking, patient }) {
    const { data, setData, post, processing, errors } = useForm({
        recording_link: booking.recording_link || '',
        therapist_notes: booking.therapist_notes || '',
        patient_visible_notes: booking.patient_visible_notes || '',
        completion_outcome: booking.completion_outcome || 'Normal',
    });

    const [timer, setTimer] = useState('00:00:00');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('schedules.complete', booking.id));
    };

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
                        <Link
                            href={route('schedules.index')}
                            className="flex items-center gap-2 px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-black transition-all border border-white/40 dark:border-white/[0.08] shadow-sm uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" /> Keluar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Sesi: ${patient.name}`} />

            <div className="py-12 relative overflow-hidden min-h-[calc(100vh-100px)]">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT COLUMN: Main Inputs */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Glass Content Area */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-8 md:p-10 border border-white/40 dark:border-white/[0.08] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
                            >
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
                                        <input
                                            type="url"
                                            value={data.recording_link}
                                            onChange={e => setData('recording_link', e.target.value)}
                                            placeholder="Tempel link YouTube Live, Drive, atau Cloudflare..."
                                            className={`w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-black/20 border-2 rounded-[1.5rem] focus:ring-8 transition-all font-bold tracking-tight ${errors.recording_link
                                                    ? 'border-red-500/50 focus:ring-red-500/10'
                                                    : 'border-transparent focus:border-indigo-500/30 focus:ring-indigo-500/10'
                                                } dark:text-white placeholder:text-gray-400`}
                                        />
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                            <Zap className="w-4 h-4 text-indigo-500" />
                                        </div>
                                    </div>
                                    {errors.recording_link && (
                                        <p className="text-xs font-black text-red-500 mt-2 ml-4 uppercase tracking-widest">{errors.recording_link}</p>
                                    )}
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
                                    <textarea
                                        value={data.therapist_notes}
                                        onChange={e => setData('therapist_notes', e.target.value)}
                                        rows="8"
                                        placeholder="Tulis analisis sesi, terobosan, dan intervensi di sini..."
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
                                    <textarea
                                        value={data.patient_visible_notes}
                                        onChange={e => setData('patient_visible_notes', e.target.value)}
                                        rows="4"
                                        placeholder="Berikan semangat, tugas mandiri, atau tujuan sesi berikutnya..."
                                        className="w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/10 rounded-[2rem] transition-all dark:text-white leading-relaxed resize-none font-bold text-base"
                                    ></textarea>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: Sidebar Tools */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Essential Patient Info Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 dark:border-indigo-500/20 shadow-xl overflow-hidden group"
                            >
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
                                                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                                        {latestScreening.summary_title || 'Kondisi Baik'}
                                                    </span>
                                                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                                                </div>
                                            </div>
                                        )}

                                        <Link
                                            href={route('schedules.patient-detail', { user: patient.id, from_booking_id: booking.id })}
                                            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl text-center"
                                        >
                                            Buka Rekam Medis Lengkap <ExternalLink className="w-3 h-3 opacity-50" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Outcome Controls */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-[20px] rounded-[2.5rem] p-8 border border-white/40 dark:border-white/[0.08]"
                            >
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-indigo-500" /> Hasil Sesi
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('completion_outcome', 'Normal')}
                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Normal'
                                                ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-500/20'
                                                : 'border-transparent bg-white/50 dark:bg-black/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${data.completion_outcome === 'Normal' ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <span className={`font-black uppercase tracking-widest text-xs ${data.completion_outcome === 'Normal' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500'}`}>Perkembangan Normal</span>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('completion_outcome', 'Abnormal/Emergency')}
                                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === 'Abnormal/Emergency'
                                                ? 'bg-red-500/10 border-red-500 dark:bg-red-500/20'
                                                : 'border-transparent bg-white/50 dark:bg-black/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${data.completion_outcome === 'Abnormal/Emergency' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                                <AlertCircle className="w-5 h-5" />
                                            </div>
                                            <span className={`font-black uppercase tracking-widest text-xs ${data.completion_outcome === 'Abnormal/Emergency' ? 'text-red-700 dark:text-red-400' : 'text-gray-500'}`}>Butuh Tindakan</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Final Save Action */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-4"
                            >
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="w-full py-8 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:opacity-50 text-white rounded-[2.5rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] active:scale-95 group flex items-center justify-center gap-4"
                                >
                                    <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
                                        <Save className="w-6 h-6" />
                                    </div>
                                    {processing ? 'Memproses...' : 'SELESAIKAN SESI'}
                                </button>
                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6 px-10 leading-loose">
                                    Menyelesaikan sesi akan mensinkronisasi data ke riwayat pasien dan dashboard klinis.
                                </p>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
