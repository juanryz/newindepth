import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, Calendar, UserCheck, ShieldCheck,
    FileText, Heart, Activity, Clock, ChevronLeft,
    MapPin, Fingerprint, AlertCircle, CheckCircle2, ChevronRight,
    ExternalLink, BookOpen, MessageSquare, Clipboard, Video, ChevronDown
} from 'lucide-react';

export default function PatientDetail({ patient, profileProgress, availableSchedules, fromBookingId }) {
    const [activeTab, setActiveTab] = useState('summary');
    const { auth, flash, errors } = usePage().props;

    // Modal states
    const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
    const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
    const [expandedChecklist, setExpandedChecklist] = useState(null);

    // Form for Rescheduling
    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        reschedule_reason: '',
    });

    // Form for No-Show
    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'patient',
        no_show_reason: '',
    });

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('schedules.reschedule', selectedRescheduleBooking.id), {
            onSuccess: () => {
                setSelectedRescheduleBooking(null);
                resetReschedule();
            },
            preserveScroll: true,
        });
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        postNoShow(route('schedules.no-show', selectedNoShowBooking.id), {
            onSuccess: () => {
                setSelectedNoShowBooking(null);
                resetNoShow();
            },
            preserveScroll: true,
        });
    };

    const handleStartSession = (bookingId) => {
        if (confirm('Mulai sesi terapi sekarang? Status akan berubah menjadi Sedang Berlangsung.')) {
            router.post(route('schedules.start', bookingId));
        }
    };

    const tabs = [
        { id: 'summary', label: 'Ringkasan', icon: Activity },
        { id: 'identity', label: 'Identitas & S&K', icon: ShieldCheck },
        { id: 'screening', label: 'Hasil Skrining', icon: Heart },
        { id: 'history', label: 'Riwayat Sesi', icon: Clock },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'confirmed': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400';
            case 'in_progress': return 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 animate-pulse';
            default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={fromBookingId ? route('schedules.active-session', fromBookingId) : route('schedules.index')}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-800 dark:text-white leading-tight">Detail Pasien</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-bold">MANAJEMEN REKAM MEDIS</p>
                    </div>
                </div>
            }
        >
            <Head title={`Pasien: ${patient.name}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Error Handling */}
                    {flash?.success && (
                        <div className="p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50">
                            {flash.success}
                        </div>
                    )}
                    {(flash?.error || errors?.error) && (
                        <div className="p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">
                            {flash?.error || errors?.error}
                        </div>
                    )}

                    {/* Upper Section: Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800/60 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden"
                    >
                        <div className="md:flex">
                            <div className="bg-indigo-600 p-8 flex flex-col items-center justify-center text-white relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
                                <div className="relative">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 mb-4 overflow-hidden">
                                        {patient.avatar ? (
                                            <img src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12 text-white" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-bold uppercase tracking-tight text-center">{patient.name}</h1>
                                <p className="text-indigo-100 text-sm font-medium mt-1">{patient.email}</p>
                                <div className="mt-4 flex gap-2">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10">
                                        Pasien Terverifikasi
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Informasi Dasar</p>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Calendar className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-semibold">{patient.age || '-'} Tahun</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-1">
                                        <Fingerprint className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-semibold">{patient.gender || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Phone className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-semibold">{patient.phone || '-'}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Status Kelengkapan</p>
                                    <div className="flex items-end gap-2 mb-1">
                                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{profileProgress.percentage}%</span>
                                        <span className="text-[10px] font-bold text-gray-400 mb-1">DATA PROFIL</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${profileProgress.percentage}%` }}
                                            className="h-full bg-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aksi Cepat</p>
                                    <div className="flex flex-col gap-2 pt-1">
                                        <a href={`mailto:${patient.email}`} className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                            <Mail className="w-3 h-3" /> KIRIM EMAIL
                                        </a>
                                        <a href={`tel:${patient.phone}`} className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                            <Phone className="w-3 h-3" /> TELEPON PASIEN
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content Sections with Tabs */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Sidebar: Navigation Tabs */}
                        <div className="lg:w-72 flex-shrink-0 space-y-4">
                            <div className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/30 p-2 shadow-sm">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none translate-x-1'
                                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-indigo-500'}`} />
                                        {tab.label}
                                        {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-5">
                                <h4 className="text-[10px] font-black tracking-widest text-emerald-700 dark:text-emerald-500 uppercase mb-3 px-1">Kontak Darurat</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Nama</p>
                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase">{patient.emergency_contact_name || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Hubungan</p>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{patient.emergency_contact_relation || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Telepon</p>
                                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">{patient.emergency_contact_phone || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                {activeTab === 'summary' && (
                                    <motion.div
                                        key="summary"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
                                                    <BookOpen className="w-5 h-5 text-indigo-500" /> Partisipasi Program
                                                </h3>
                                                {patient.courses?.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {patient.courses.map(course => (
                                                            <div key={course.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                                                    <BookOpen className="w-5 h-5" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate pr-2">{course.title}</p>
                                                                    <p className="text-[10px] text-gray-500 font-medium">Terdaftar pada: {new Date(course.pivot.enrolled_at).toLocaleDateString('id-ID')}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                                        <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
                                                        <p className="text-sm italic">Belum terdaftar di kelas manapun.</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
                                                    <ShieldCheck className="w-5 h-5 text-emerald-500" /> Legal & Persetujuan
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-500">Service Agreement</span>
                                                            {patient.agreement_signed_at ? (
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                            ) : (
                                                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                            {patient.agreement_signed_at ? 'Ditandatangani secara digital' : 'Belum Ditandatangani'}
                                                        </p>
                                                        <p className="text-[10px] text-gray-500 mt-1 font-medium">
                                                            {patient.agreement_signed_at ? `Tgl: ${new Date(patient.agreement_signed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : 'Tgl: -'}
                                                        </p>
                                                        {patient.agreement_signed_at && (
                                                            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                                                <ShieldCheck className="w-3 h-3" /> Dokumen Disetujui
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={`p-4 rounded-2xl border ${patient.recommended_package ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                                                        <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-500">Rekomendasi Paket</span>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase mt-1">
                                                            {patient.recommended_package || 'BELUM DITETAPKAN'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
                                                <Clock className="w-5 h-5 text-indigo-500" /> Sesi Selesai Paling Terakhir
                                            </h3>
                                            {(() => {
                                                const latestBooking = patient.bookings?.filter(b => b.status === 'completed').sort((a, b) => new Date(b.started_at || b.created_at) - new Date(a.started_at || a.created_at))[0];
                                                if (!latestBooking) {
                                                    return <p className="text-sm text-gray-400 italic">Belum ada riwayat sesi yang terselesaikan.</p>;
                                                }
                                                const duration = latestBooking.started_at && latestBooking.ended_at ? Math.round((new Date(latestBooking.ended_at) - new Date(latestBooking.started_at)) / 60000) : null;
                                                return (
                                                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-6 transition-all hover:shadow-md hover:bg-white dark:hover:bg-gray-800">
                                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 dark:text-white uppercase">Kode Booking: {latestBooking.booking_code}</h4>
                                                                <p className="text-xs text-gray-500 font-bold mt-0.5">
                                                                    {new Date(latestBooking.schedule?.date || '').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(latestBooking.status)}`}>
                                                                    TERLESAIKAN
                                                                </span>
                                                                {latestBooking.completion_outcome && (
                                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${latestBooking.completion_outcome === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                                        OUTCOME: {latestBooking.completion_outcome}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic">Data Sesi</p>
                                                                    <div className="bg-white/50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-3 text-xs">
                                                                        <p className="flex justify-between">
                                                                            <span className="text-gray-500">Terapis:</span>
                                                                            <span className="font-bold text-gray-800 dark:text-gray-200">{latestBooking.therapist?.name || latestBooking.schedule?.therapist?.name || '-'}</span>
                                                                        </p>
                                                                        <p className="flex justify-between">
                                                                            <span className="text-gray-500">Paket:</span>
                                                                            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">{latestBooking.package_type || 'REGULER'}</span>
                                                                        </p>
                                                                        {latestBooking.started_at && (
                                                                            <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 space-y-2">
                                                                                <p className="flex justify-between">
                                                                                    <span className="text-gray-500">Mulai:</span>
                                                                                    <span className="font-bold text-emerald-600">{new Date(latestBooking.started_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                                                                </p>
                                                                                {latestBooking.ended_at && (
                                                                                    <p className="flex justify-between">
                                                                                        <span className="text-gray-500">Selesai:</span>
                                                                                        <span className="font-bold text-red-600">{new Date(latestBooking.ended_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                                                                    </p>
                                                                                )}
                                                                                {duration !== null && (
                                                                                    <p className="flex justify-between items-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mt-2">
                                                                                        <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[9px]">Durasi Sesi:</span>
                                                                                        <span className="font-black text-indigo-700 dark:text-indigo-300">{duration} Menit</span>
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {latestBooking.recording_link && (
                                                                    <div className="space-y-2">
                                                                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 italic">Hasil Rekaman</p>
                                                                        <a
                                                                            href={latestBooking.recording_link}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="flex items-center justify-between gap-2 w-full p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all group"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
                                                                                    <Video className="w-4 h-4" />
                                                                                </div>
                                                                                <span>BUKA REKAMAN SESI (YT/DRIVE)</span>
                                                                            </div>
                                                                            <ExternalLink className="w-4 h-4 opacity-50" />
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div>
                                                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic">Catatan Klinis (Internal)</p>
                                                                    <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100/30 text-xs text-gray-700 dark:text-gray-300 min-h-[100px] leading-relaxed shadow-sm">
                                                                        {latestBooking.therapist_notes || "Tidak ada catatan sesi yang dicatat."}
                                                                    </div>
                                                                </div>
                                                                {latestBooking.patient_visible_notes && (
                                                                    <div>
                                                                        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest px-1 mb-2 italic">Pesan Untuk Pasien (Publik)</p>
                                                                        <div className="bg-emerald-50/30 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100/30 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed shadow-sm">
                                                                            {latestBooking.patient_visible_notes}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {latestBooking.session_checklist && Object.keys(latestBooking.session_checklist).length > 0 && (
                                                                    <div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setExpandedChecklist(prev => prev === latestBooking.id ? null : latestBooking.id)}
                                                                            className="w-full flex items-center justify-between p-3 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 transition-all group"
                                                                        >
                                                                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-widest flex items-center gap-1.5">
                                                                                <Clipboard className="w-3 h-3" /> Checklist Sesi Hipnoterapi
                                                                            </span>
                                                                            <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform duration-200 ${expandedChecklist === latestBooking.id ? 'rotate-180' : ''}`} />
                                                                        </button>
                                                                        {expandedChecklist === latestBooking.id && (
                                                                            <div className="grid grid-cols-2 gap-2 mt-3 animate-in fade-in duration-200">
                                                                                {latestBooking.session_checklist.problem_name && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Masalah</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.problem_name}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.problem_score && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Angka Awal</p>
                                                                                        <p className="text-sm font-black text-indigo-600">{latestBooking.session_checklist.problem_score}/10</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.final_problem_score && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Angka Akhir</p>
                                                                                        <p className="text-sm font-black text-emerald-600">{latestBooking.session_checklist.final_problem_score}/10</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.induction_type?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Induksi</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.induction_type.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.deepening_technique?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Deepening</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.deepening_technique.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.core_method_type?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Metode Inti</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.core_method_type.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.suggestion_type?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Sugesti</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.suggestion_type.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.timeline_type?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Timeline</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.timeline_type.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.emerging_type?.length > 0 && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Emerging</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.emerging_type.join(', ')}</p>
                                                                                    </div>
                                                                                )}
                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Abreaksi</p>
                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.has_abreaction ? 'Ya' : 'Tidak'}</p>
                                                                                </div>
                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Segel Hipnotis</p>
                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.has_seal ? 'Ya' : 'Tidak'}</p>
                                                                                </div>
                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Pengujian Hasil</p>
                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.has_result_test ? 'Ya' : 'Tidak'}</p>
                                                                                </div>
                                                                                {latestBooking.session_checklist.desired_outcome && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Outcome Diinginkan</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.desired_outcome}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.outcome_indicator && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Indikator Outcome</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.outcome_indicator}</p>
                                                                                    </div>
                                                                                )}
                                                                                {latestBooking.session_checklist.has_exception && latestBooking.session_checklist.exception_detail && (
                                                                                    <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Pengecualian</p>
                                                                                        <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{latestBooking.session_checklist.exception_detail}</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'identity' && (
                                    <motion.div
                                        key="identity"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8">
                                                <Fingerprint className="w-5 h-5 text-indigo-500" /> Verifikasi Identitas (KTP)
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Usia</p>
                                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{patient.age || '-'} Tahun</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Jenis Kelamin</p>
                                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase">{patient.gender || '-'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Status Perjanjian</p>
                                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                            <ShieldCheck className="w-4 h-4" />
                                                            <span className="text-sm font-bold uppercase">AKTIF & DISETUJUI</span>
                                                        </div>
                                                        <p className="text-[10px] text-gray-500 mt-1">Berlaku selama 1 tahun sejak tanggal penandatanganan.</p>
                                                    </div>
                                                    <div className="pt-4">
                                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl transition-colors">
                                                            <Clipboard className="w-4 h-4" /> LIHAT LOG PERUBAHAN
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Foto KTP / Identitas Resmi</p>
                                                    {patient.ktp_photo_url ? (
                                                        <div className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-900">
                                                            <img
                                                                src={patient.ktp_photo_url}
                                                                alt="KTP"
                                                                className="w-full h-auto aspect-[1.6/1] object-contain transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <a
                                                                    href={patient.ktp_photo_url}
                                                                    target="_blank"
                                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30"
                                                                >
                                                                    <ExternalLink className="w-6 h-6" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-full aspect-[1.6/1] bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400">
                                                            <FileText className="w-12 h-12 mb-2 opacity-10" />
                                                            <p className="text-xs italic font-medium">Foto identitas belum diunggah.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
                                                <ShieldCheck className="w-5 h-5 text-indigo-500" /> Syarat & Ketentuan (Service Agreement)
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Informasi Penandatanganan</p>
                                                        {patient.agreement_signed_at && (
                                                            <Link
                                                                href={route('agreement.patient', patient.id)}
                                                                className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase flex items-center gap-1"
                                                            >
                                                                <ExternalLink className="w-3 h-3" /> Buka Dokumen Formal
                                                            </Link>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase">Tanggal</p>
                                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                                                                {patient.agreement_signed_at ? new Date(patient.agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' }) : '-'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-gray-500 uppercase">Tanda Tangan Digital</p>
                                                            {patient.digital_signature ? (
                                                                <div className="mt-1 h-16 w-32 bg-white rounded-lg p-2 border border-gray-200">
                                                                    <img src={patient.digital_signature} alt="Signature" className="w-full h-full object-contain" />
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm font-bold text-red-500 italic uppercase">BELUM TANDA TANGAN</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {patient.agreement_data && (
                                                    <div className="space-y-4">
                                                        <p className="text-[10px] font-black tracking-widest text-indigo-500 uppercase px-1">Poin-poin Penting yang Disetujui</p>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {['understand_process', 'honest_answers', 'follow_protocol', 'responsibility'].map((key) => (
                                                                <div key={key} className="flex items-start gap-3 p-3 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-xl border border-indigo-100/30">
                                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize">
                                                                        {key.replace(/_/g, ' ')}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'screening' && (
                                    <motion.div
                                        key="screening"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8">
                                                <Heart className="w-5 h-5 text-red-500" /> Hasil Analisa Skrining Mental
                                            </h3>
                                            {patient.screening_results?.length > 0 ? (
                                                <div className="space-y-10">
                                                    {patient.screening_results.map((result, idx) => (
                                                        <div key={result.id} className={`${idx !== 0 ? 'pt-10 border-t border-gray-100 dark:border-gray-700' : ''}`}>
                                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400">
                                                                        <Calendar className="w-5 h-5" />
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Skrining Kesehatan Mental</p>
                                                                        <p className="text-xs text-gray-500 font-medium">Tgl: {new Date(result.completed_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${result.severity_label === 'High Risk' ? 'bg-red-500 text-white' :
                                                                        result.severity_label === 'Berat Kronis' ? 'bg-red-100 text-red-700' :
                                                                            'bg-indigo-100 text-indigo-700'
                                                                        }`}>
                                                                        Tingkat: {result.severity_label || 'NORMAL'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                                                <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rekomendasi Paket</p>
                                                                    <p className="text-base font-black text-indigo-600 dark:text-indigo-400 uppercase">{result.recommended_package || '-'}</p>
                                                                </div>
                                                                <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Resiko</p>
                                                                    <p className={`text-base font-black uppercase ${result.is_high_risk ? 'text-red-500' : 'text-emerald-500'}`}>
                                                                        {result.is_high_risk ? 'HIGH RISK' : 'LOW RISK'}
                                                                    </p>
                                                                </div>
                                                                <div className="bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Skor Analisa (AI)</p>
                                                                    <div className="flex items-center gap-2">
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                        <p className="text-base font-black text-gray-800 dark:text-gray-200">OPTIMAL</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest px-1">Ringkasan Analisa (AI Summary)</p>
                                                                <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-6 rounded-3xl border border-indigo-100/30 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                                    {result.ai_summary || "Analisa AI tidak tersedia untuk skrining ini."}
                                                                </div>
                                                            </div>

                                                            {result.admin_notes && (
                                                                <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800/30 rounded-3xl">
                                                                    <p className="text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase flex items-center gap-2 mb-2">
                                                                        <AlertCircle className="w-4 h-4" /> Catatan Admin/CS
                                                                    </p>
                                                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300 italic">{result.admin_notes}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                                    <Activity className="w-16 h-16 mb-4 opacity-10" />
                                                    <p className="text-sm italic font-medium">Pasien belum menyelesaikan skrining sama sekali.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'history' && (
                                    <motion.div
                                        key="history"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8">
                                                <Clock className="w-5 h-5 text-indigo-500" /> Riwayat Konsultasi & Terapi
                                            </h3>

                                            <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700/50">
                                                {patient.bookings?.length > 0 ? (
                                                    patient.bookings.map((booking) => {
                                                        const duration = booking.started_at && booking.ended_at ? Math.round((new Date(booking.ended_at) - new Date(booking.started_at)) / 60000) : null;
                                                        return (
                                                            <div key={booking.id} className="relative pl-14">
                                                                <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-sm z-10 ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                                                                    booking.status === 'in_progress' ? 'bg-red-100 text-red-600' :
                                                                        'bg-blue-100 text-blue-600'
                                                                    }`}>
                                                                    {booking.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                                                </div>

                                                                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-6 transition-all hover:shadow-md hover:bg-white dark:hover:bg-gray-800">
                                                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                                        <div>
                                                                            <h4 className="font-bold text-gray-900 dark:text-white uppercase">Kode Booking: {booking.booking_code}</h4>
                                                                            <p className="text-xs text-gray-500 font-bold mt-0.5">
                                                                                {new Date(booking.schedule?.date || '').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex gap-2">
                                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(booking.status)}`}>
                                                                                {booking.status === 'completed' ? 'TERLESAIKAN' : booking.status === 'in_progress' ? 'SEDANG BERJALAN' : 'AKAN DATANG'}
                                                                            </span>
                                                                            {booking.status === 'confirmed' && (booking.therapist_id === auth.user.id || auth.user.roles.some(r => ['admin', 'super_admin'].includes(r))) && (
                                                                                <div className="flex gap-2">
                                                                                    <button
                                                                                        onClick={() => handleStartSession(booking.id)}
                                                                                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-700 transition-all hover:bg-indigo-700 shadow-md shadow-indigo-200"
                                                                                    >
                                                                                        Mulai Sesi
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setSelectedRescheduleBooking(booking)}
                                                                                        className="px-3 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/30 transition-all hover:bg-amber-100"
                                                                                    >
                                                                                        Reschedule
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setSelectedNoShowBooking(booking)}
                                                                                        className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 transition-all hover:bg-red-100"
                                                                                    >
                                                                                        No-Show / Batal
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                            {booking.completion_outcome && (
                                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${booking.completion_outcome === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                                                    }`}>
                                                                                    OUTCOME: {booking.completion_outcome}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                                                        <div className="space-y-6">
                                                                            <div>
                                                                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic">Data Sesi</p>
                                                                                <div className="bg-white/50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-3 text-xs">
                                                                                    <p className="flex justify-between">
                                                                                        <span className="text-gray-500">Terapis:</span>
                                                                                        <span className="font-bold text-gray-800 dark:text-gray-200">{booking.therapist?.name || booking.schedule?.therapist?.name || '-'}</span>
                                                                                    </p>
                                                                                    <p className="flex justify-between">
                                                                                        <span className="text-gray-500">Paket:</span>
                                                                                        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">{booking.package_type || 'REGULER'}</span>
                                                                                    </p>
                                                                                    {booking.started_at && (
                                                                                        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 space-y-2">
                                                                                            <p className="flex justify-between">
                                                                                                <span className="text-gray-500">Mulai:</span>
                                                                                                <span className="font-bold text-emerald-600">{new Date(booking.started_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                                                                            </p>
                                                                                            {booking.ended_at && (
                                                                                                <p className="flex justify-between">
                                                                                                    <span className="text-gray-500">Selesai:</span>
                                                                                                    <span className="font-bold text-red-600">{new Date(booking.ended_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</span>
                                                                                                </p>
                                                                                            )}
                                                                                            {duration !== null && (
                                                                                                <p className="flex justify-between items-center p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl mt-2">
                                                                                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-[9px]">Durasi Sesi:</span>
                                                                                                    <span className="font-black text-indigo-700 dark:text-indigo-300">{duration} Menit</span>
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            {booking.recording_link && (
                                                                                <div className="space-y-2">
                                                                                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 italic">Hasil Rekaman</p>
                                                                                    <a
                                                                                        href={booking.recording_link}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                        className="flex items-center justify-between gap-2 w-full p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all group"
                                                                                    >
                                                                                        <div className="flex items-center gap-3">
                                                                                            <div className="p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform">
                                                                                                <Video className="w-4 h-4" />
                                                                                            </div>
                                                                                            <span>BUKA REKAMAN SESI (YT/DRIVE)</span>
                                                                                        </div>
                                                                                        <ExternalLink className="w-4 h-4 opacity-50" />
                                                                                    </a>
                                                                                </div>
                                                                            )}
                                                                        </div>

                                                                        <div className="space-y-6">
                                                                            <div>
                                                                                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic">Catatan Klinis (Internal)</p>
                                                                                <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100/30 text-xs text-gray-700 dark:text-gray-300 min-h-[100px] leading-relaxed shadow-sm">
                                                                                    {booking.therapist_notes || "Tidak ada catatan sesi yang dicatat."}
                                                                                </div>
                                                                            </div>
                                                                            {booking.patient_visible_notes && (
                                                                                <div>
                                                                                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest px-1 mb-2 italic">Pesan Untuk Pasien (Publik)</p>
                                                                                    <div className="bg-emerald-50/30 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100/30 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed shadow-sm">
                                                                                        {booking.patient_visible_notes}
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            {booking.session_checklist && Object.keys(booking.session_checklist).length > 0 && (
                                                                                <div>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => setExpandedChecklist(prev => prev === booking.id ? null : booking.id)}
                                                                                        className="w-full flex items-center justify-between p-3 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 transition-all group"
                                                                                    >
                                                                                        <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-widest flex items-center gap-1.5">
                                                                                            <Clipboard className="w-3 h-3" /> Checklist Sesi Hipnoterapi
                                                                                        </span>
                                                                                        <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform duration-200 ${expandedChecklist === booking.id ? 'rotate-180' : ''}`} />
                                                                                    </button>
                                                                                    {expandedChecklist === booking.id && (
                                                                                        <div className="grid grid-cols-2 gap-2 mt-3 animate-in fade-in duration-200">
                                                                                            {booking.session_checklist.problem_name && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Masalah</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.problem_name}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.problem_score && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Angka Awal</p>
                                                                                                    <p className="text-sm font-black text-indigo-600">{booking.session_checklist.problem_score}/10</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.final_problem_score && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Angka Akhir</p>
                                                                                                    <p className="text-sm font-black text-emerald-600">{booking.session_checklist.final_problem_score}/10</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.induction_type?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Induksi</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.induction_type.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.deepening_technique?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Deepening</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.deepening_technique.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.core_method_type?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Metode Inti</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.core_method_type.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.suggestion_type?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Sugesti</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.suggestion_type.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.timeline_type?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Timeline</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.timeline_type.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.emerging_type?.length > 0 && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Emerging</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.emerging_type.join(', ')}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Abreaksi</p>
                                                                                                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_abreaction ? 'Ya' : 'Tidak'}</p>
                                                                                            </div>
                                                                                            <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Segel Hipnotis</p>
                                                                                                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_seal ? 'Ya' : 'Tidak'}</p>
                                                                                            </div>
                                                                                            <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                                <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Pengujian Hasil</p>
                                                                                                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_result_test ? 'Ya' : 'Tidak'}</p>
                                                                                            </div>
                                                                                            {booking.session_checklist.desired_outcome && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Outcome Diinginkan</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.desired_outcome}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.outcome_indicator && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Indikator Outcome</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.outcome_indicator}</p>
                                                                                                </div>
                                                                                            )}
                                                                                            {booking.session_checklist.has_exception && booking.session_checklist.exception_detail && (
                                                                                                <div className="p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2">
                                                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Pengecualian</p>
                                                                                                    <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.exception_detail}</p>
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {booking.reschedule_reason && (
                                                                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800/30 rounded-2xl">
                                                                        <p className="text-[9px] font-black text-amber-700 dark:text-amber-500 uppercase flex items-center gap-1.5 mb-1.5">
                                                                            <Activity className="w-3 h-3" /> Info Reschedule
                                                                        </p>
                                                                        <p className="text-xs font-medium text-amber-800 dark:text-amber-300 italic">
                                                                            "{booking.reschedule_reason}"
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 pl-8">
                                                        <Clock className="w-16 h-16 mb-4 opacity-10" />
                                                        <p className="text-sm italic font-medium">Belum ada riwayat sesi konsultasi.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Reschedule Session */}
            <Modal show={selectedRescheduleBooking !== null} onClose={() => setSelectedRescheduleBooking(null)}>
                <form onSubmit={handleReschedule} className="p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Jadwal Ulang</h2>
                    <p className="text-sm text-gray-500 mb-8 font-bold text-indigo-500">Anda sedang menjadwal ulang sesi <strong>{selectedRescheduleBooking?.booking_code}</strong></p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="new_schedule_id" value="Pilih Slot Baru" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="new_schedule_id"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={rescheduleData.new_schedule_id}
                                onChange={(e) => setRescheduleData('new_schedule_id', e.target.value)}
                                required
                            >
                                <option value="">-- Pilih Slot Tersedia --</option>
                                {availableSchedules
                                    ?.filter(s => s.id !== selectedRescheduleBooking?.schedule_id)
                                    .map(s => (
                                        <option key={s.id} value={s.id}>
                                            {new Date(s.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })} | {s.start_time?.substring(0, 5)} WIB | {s.therapist?.name || 'Praktisi'}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="reschedule_reason" value="Alasan Perubahan (Akan Muncul di Dashboard Pasien)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <textarea
                                id="reschedule_reason"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200"
                                rows="3"
                                placeholder="Detail alasan reschedule..."
                                value={rescheduleData.reschedule_reason}
                                onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedRescheduleBooking(null)} disabled={rescheduling} className="rounded-2xl px-6">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={rescheduling || !rescheduleData.new_schedule_id}
                            className={`inline-flex items-center px-8 py-3 bg-indigo-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95 ${(rescheduling || !rescheduleData.new_schedule_id) && 'opacity-25'}`}
                        >
                            Simpan Jadwal Baru
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Mark No-Show / Cancel */}
            <Modal show={selectedNoShowBooking !== null} onClose={() => setSelectedNoShowBooking(null)}>
                <form onSubmit={handleNoShow} className="p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Batalkan / No-Show</h2>
                    <p className="text-sm text-gray-500 mb-8 font-bold text-red-500">Menandai booking <strong>{selectedNoShowBooking?.booking_code}</strong> tidak hadir.</p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="no_show_party" value="Keterangan Pihak Berhalangan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="no_show_party"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={noShowData.no_show_party}
                                onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                                required
                            >
                                <option value="patient">Pasien Tidak Hadir</option>
                                <option value="therapist">Praktisi Berhalangan / Batalkan</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="no_show_reason" value="Alasan Pembatalan / No-Show" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <textarea
                                id="no_show_reason"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200"
                                rows="3"
                                placeholder="Detail pembatalan..."
                                value={noShowData.no_show_reason}
                                onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedNoShowBooking(null)} disabled={markingNoShow} className="rounded-2xl px-6">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={markingNoShow}
                            className={`inline-flex items-center px-8 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg active:scale-95 ${markingNoShow && 'opacity-25'}`}
                        >
                            Konfirmasi No-Show
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout >
    );
}

// Helper for "Partisipasi Program" icon
function Manual(props) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    )
}
