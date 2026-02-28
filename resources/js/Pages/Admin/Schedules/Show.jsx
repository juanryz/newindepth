import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, User, Users, CheckCircle2, AlertTriangle,
    ChevronRight, Activity, ShieldCheck, Trash2, Plus,
    Video, ClipboardList, ExternalLink, ChevronLeft, Mail, Phone,
    MapPin, Star, Save, XCircle, Heart, CreditCard, Clipboard, Fingerprint, Eye
} from 'lucide-react';
import ErrorBoundary from '../Users/ErrorBoundary';

function InnerSchedulesShow({ schedule, availableSchedules, patients = [] }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
    const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
    const [isAddingPatient, setIsAddingPatient] = useState(false);
    const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);
    const [patientSubTab, setPatientSubTab] = useState('summary');
    const [selectedCourseAgreement, setSelectedCourseAgreement] = useState(null);
    const [showChecklist, setShowChecklist] = useState({});

    // Form states
    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        new_date: '',
        new_start_time: '',
        new_end_time: '',
        reschedule_reason: '',
    });

    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'cancel',
        no_show_reason: '',
    });

    const { data: addPatientData, setData: setAddPatientData, post: postAddPatient, processing: addingPatient, reset: resetAddPatient, errors: addPatientErrors } = useForm({
        patient_id: '',
        package_type: 'reguler',
        schedule_id: schedule.id,
    });

    const [editingDetails, setEditingDetails] = useState(() => {
        const initialEdits = {};
        schedule.bookings?.forEach(b => {
            initialEdits[b.id] = {
                recording_link: b.recording_link || '',
                therapist_notes: b.therapist_notes || '',
                patient_visible_notes: b.patient_visible_notes || '',
                status: b.status || 'confirmed',
                completion_outcome: b.completion_outcome || 'Normal',
                core_method: b.session_checklist?.core_method_type?.[0] || ''
            };
        });
        return initialEdits;
    });

    // Handlers
    const handleDetailChange = (bookingId, field, value) => {
        setEditingDetails(prev => ({
            ...prev,
            [bookingId]: { ...prev[bookingId], [field]: value }
        }));
    };

    const updateBookingDetails = (bookingId) => {
        const details = editingDetails[bookingId];
        router.patch(route('admin.bookings.update-details', bookingId), {
            recording_link: details.recording_link,
            therapist_notes: details.therapist_notes,
            patient_visible_notes: details.patient_visible_notes,
            status: details.status,
            completion_outcome: details.completion_outcome,
            session_checklist: {
                core_method_type: [details.core_method]
            }
        }, { preserveScroll: true });
    };

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('admin.bookings.reschedule', selectedRescheduleBooking.id), {
            onSuccess: () => { setSelectedRescheduleBooking(null); resetReschedule(); },
            preserveScroll: true,
        });
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        if (noShowData.no_show_party === 'cancel') {
            router.post(route('admin.bookings.cancel', selectedNoShowBooking.id), {}, {
                onSuccess: () => { setSelectedNoShowBooking(null); resetNoShow(); },
                preserveScroll: true,
            });
        } else {
            postNoShow(route('admin.bookings.no-show', selectedNoShowBooking.id), {
                onSuccess: () => { setSelectedNoShowBooking(null); resetNoShow(); },
                preserveScroll: true,
            });
        }
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        postAddPatient(route('admin.bookings.store'), {
            onSuccess: () => { setIsAddingPatient(false); resetAddPatient(); },
            preserveScroll: true,
        });
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    const tabs = [
        { id: 'summary', label: 'Ringkasan Sesi', icon: Activity },
        { id: 'patients', label: 'Daftar Pasien', icon: Users },
        { id: 'settings', label: 'Pengaturan Sesi', icon: ShieldCheck },
    ];

    const sessionDate = new Date(schedule.date);
    const dayName = sessionDate.toLocaleDateString('id-ID', { weekday: 'long' });
    const formattedDate = sessionDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.orders.index')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Detail Jadwal Sesi</h2>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Klinik & Jadwal Praktik</p>
                    </div>
                </div>
            }
        >
            <Head title={`Jadwal: ${schedule.therapist?.name} - ${formattedDate}`} />

            <div className="py-8 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Header Card */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="md:flex">
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white relative md:w-80">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center border-4 border-white/30 text-4xl font-black uppercase">
                                        {schedule.therapist?.name?.charAt(0) || '?'}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-black text-center leading-tight uppercase tracking-tight">{schedule.therapist?.name}</h1>
                                <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mt-2">{schedule.therapist?.email || 'Praktisi / Terapis'}</p>
                            </div>

                            <div className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Informasi Waktu</p>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">Hari & Tanggal</p>
                                            <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{dayName}, {formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">Jam Sesi (WIB)</p>
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Kapasitas & Ketersediaan</p>
                                    <div className="flex items-end gap-3 mb-1">
                                        <span className={`text-4xl font-black ${schedule.booked_count >= 1 ? 'text-rose-500' : (new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'text-gray-400' : 'text-emerald-500')}`}>
                                            {schedule.booked_count >= 1 ? 'PENUH' : (new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'TIDAK TERSEDIA' : 'TERBUKA')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className={`w-3 h-3 rounded-full ${schedule.booked_count >= 1 ? 'bg-rose-500' : (new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'bg-gray-400' : 'bg-emerald-500 animate-pulse')}`} />
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            {schedule.booked_count >= 1
                                                ? `${schedule.booked_count} Pasien Terdaftar`
                                                : (new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'Jadwal waktu sesi telah berlalu' : '1 Slot tersedia — menunggu 1 pasien')}
                                        </span>
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 italic mt-2 leading-relaxed">
                                        Setiap terapis menangani 1 pasien per slot.<br />
                                        Slot lain di jam sama = terapis lain yang tersedia.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Aksi Cepat</p>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => setIsAddingPatient(true)}
                                            disabled={new Date(`${schedule.date}T${schedule.start_time}`) < new Date()}
                                            className={`flex items-center justify-between px-5 py-3 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'}`}
                                        >
                                            {new Date(`${schedule.date}T${schedule.start_time}`) < new Date() ? 'Jadwal Kadaluarsa' : 'Tambah Pasien'} <Plus className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => router.get(route('admin.schedules.index'))} className="flex items-center justify-between px-5 py-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all font-black text-[10px] uppercase tracking-widest">
                                            Kembali ke Kalender <Calendar className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Layout */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Tabs */}
                        <div className="lg:w-72 flex-shrink-0">
                            <div className="sticky top-8 bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all duration-300 relative z-20 ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-2'
                                            : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-indigo-500'}`} />
                                        {tab.label}
                                        {activeTab === tab.id && <ChevronRight className="w-5 h-5 ml-auto opacity-50" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                {activeTab === 'summary' && (
                                    <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-10 shadow-sm">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                Ringkasan Sesi Klinis
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Deskripsi Sesi</p>
                                                        <div className="p-6 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 rounded-[2rem] text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed capitalize">
                                                            {schedule.schedule_type} Session - {schedule.therapist?.name} pada {formattedDate}. Sesi ini telah dikonfigurasi untuk menangani pendaftaran pasien dengan paket {schedule.schedule_type === 'class' ? 'group' : 'private'}.
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 rounded-2xl">
                                                            <p className="text-[9px] font-black text-emerald-600 uppercase mb-1">Status Jadwal</p>
                                                            <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">AKTIF / TERVERIFIKASI</p>
                                                        </div>
                                                        <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-800/30 rounded-2xl">
                                                            <p className="text-[9px] font-black text-indigo-600 uppercase mb-1">Sistem Booking</p>
                                                            <p className="text-xs font-black text-indigo-700 dark:text-indigo-400">INDEPTH CLOUD v3</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Data Terapis & Kehadiran</p>
                                                    <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                                                <User className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-black uppercase opacity-70">Praktisi Bertugas</p>
                                                                <p className="text-lg font-black uppercase">{schedule.therapist?.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2 border-t border-white/20 pt-4">
                                                            <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                                <CheckCircle2 className="w-3.5 h-3.5" /> Kehadiran Terverifikasi
                                                            </p>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                                <CheckCircle2 className="w-3.5 h-3.5" /> Slot Tersedia di Kalender
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'patients' && (
                                    <motion.div key="patients" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        {schedule.bookings?.length > 0 ? (
                                            schedule.bookings.map((booking) => (
                                                <div key={booking.id} className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                                    <div className="p-8 bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-6">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/20">
                                                                {booking.patient?.name?.charAt(0) || '?'}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                                                                    <Link href={route('admin.users.show', booking.patient?.id)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group flex items-center gap-2">
                                                                        {booking.patient?.name}
                                                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                                                                    </Link>
                                                                    {booking.package_type === 'vip' && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                                                                </h4>
                                                                <div className="text-xs font-bold text-gray-400 flex items-center gap-4 mt-1">
                                                                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {booking.patient?.email}</span>
                                                                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {booking.patient?.phone || '-'}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-center md:items-end gap-2">
                                                            <div className="flex gap-2">
                                                                <span className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-200/50">
                                                                    Paket {booking.package_type}
                                                                </span>
                                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200/50' : 'bg-blue-100 text-blue-700 border-blue-200/50'}`}>
                                                                    {booking.status}
                                                                </span>
                                                            </div>
                                                            {/* Verification Info as requested */}
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Pembayaran Terverifikasi</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-8 space-y-8">
                                                        {/* Patient Info Grid */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between px-1">
                                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Integrasi Sesi</p>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowChecklist(prev => ({ ...prev, [booking.id]: !prev[booking.id] }))}
                                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${showChecklist[booking.id]
                                                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                                                                            : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/40 hover:bg-indigo-100'
                                                                            }`}
                                                                    >
                                                                        <ClipboardList className="w-3.5 h-3.5" />
                                                                        {showChecklist[booking.id] ? 'Sembunyikan' : 'Lihat Checklist Sesi'}
                                                                    </button>
                                                                </div>

                                                                {/* READ-ONLY Checklist Panel — hanya dari input terapis */}
                                                                {showChecklist[booking.id] && (
                                                                    <div className="p-6 bg-indigo-50/40 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-[1.5rem] space-y-4 animate-in fade-in duration-300">
                                                                        <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                            <ClipboardList className="w-3 h-3" /> Checklist Hipnoterapi — Diisi oleh Terapis
                                                                        </p>

                                                                        {/* Status & Outcome — read only */}
                                                                        <div className="grid grid-cols-2 gap-3">
                                                                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl">
                                                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Sesi</p>
                                                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                                                                    booking.status === 'no_show' ? 'bg-rose-100 text-rose-700' :
                                                                                        'bg-blue-100 text-blue-700'
                                                                                    }`}>{booking.status}</span>
                                                                            </div>
                                                                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl">
                                                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Hasil Outcome</p>
                                                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.completion_outcome === 'Abnormal/Emergency' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                                                                                    }`}>{booking.completion_outcome || 'Normal'}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Core Method */}
                                                                        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl">
                                                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Metode yang Digunakan</p>
                                                                            <p className="text-sm font-black text-indigo-700 dark:text-indigo-300">
                                                                                {booking.session_checklist?.core_method_type?.[0] || <span className="text-gray-400 font-bold italic text-xs">Belum diisi terapis</span>}
                                                                            </p>
                                                                        </div>

                                                                        {/* Checklist items */}
                                                                        {booking.session_checklist && Object.keys(booking.session_checklist).length > 0 ? (
                                                                            <div className="space-y-2">
                                                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Item Checklist</p>
                                                                                {Object.entries(booking.session_checklist).filter(([k]) => k !== 'core_method_type').map(([key, val]) => (
                                                                                    <div key={key} className="flex items-center justify-between py-2 px-4 bg-white dark:bg-slate-800 rounded-xl">
                                                                                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 capitalize">{key.replace(/_/g, ' ')}</span>
                                                                                        {typeof val === 'boolean' ? (
                                                                                            val ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-gray-300" />
                                                                                        ) : (
                                                                                            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 max-w-[50%] text-right break-words">{Array.isArray(val) ? val.join(', ') : String(val)}</span>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="py-6 text-center text-[10px] font-bold text-gray-400 italic">
                                                                                Checklist belum diisi oleh terapis
                                                                            </div>
                                                                        )}

                                                                        {/* Therapist notes read-only */}
                                                                        {booking.therapist_notes && (
                                                                            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl">
                                                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Catatan Terapis</p>
                                                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-relaxed">{booking.therapist_notes}</p>
                                                                            </div>
                                                                        )}

                                                                        {booking.recording_link && (
                                                                            <a href={booking.recording_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl text-[10px] font-black text-indigo-600 hover:bg-indigo-50 transition-all">
                                                                                <Video className="w-4 h-4" /> Lihat Rekaman Sesi
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Admin-only: Pesan untuk pasien */}
                                                                <div className="relative">
                                                                    <label className="text-[9px] font-black text-emerald-500 uppercase tracking-wider ml-1 mb-1 block">Pesan untuk Pasien (Muncul di Dashboard)</label>
                                                                    <textarea
                                                                        value={editingDetails[booking.id]?.patient_visible_notes || ''}
                                                                        onChange={(e) => handleDetailChange(booking.id, 'patient_visible_notes', e.target.value)}
                                                                        className="w-full bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-inner resize-none"
                                                                        rows="2"
                                                                        placeholder="Berikan semangat atau instruksi tugas..."
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Informasi Praktisi</p>
                                                                <div className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-800/30 rounded-3xl space-y-4">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm">
                                                                            <User className="w-6 h-6 text-indigo-600" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[9px] font-black text-gray-400 uppercase">Terapis Bertanggung Jawab</p>
                                                                            <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{booking.therapist?.name || schedule.therapist?.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pt-4 border-t border-indigo-100/50 dark:border-indigo-800/30 flex justify-between">
                                                                        <button
                                                                            onClick={() => { setSelectedPatientDetail(booking.patient); setPatientSubTab('summary'); }}
                                                                            className="flex items-center gap-2 text-[10px] font-black text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 uppercase tracking-widest transition-colors"
                                                                        >
                                                                            <Eye className="w-4 h-4" /> Detail Lengkap Pasien
                                                                        </button>
                                                                        <button
                                                                            onClick={() => updateBookingDetails(booking.id)}
                                                                            className="flex items-center gap-2 text-[10px] font-black text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 uppercase tracking-widest transition-colors"
                                                                        >
                                                                            <Save className="w-4 h-4" /> Simpan Data
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button onClick={() => setSelectedRescheduleBooking(booking)} className="flex-1 py-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 text-[10px] font-black uppercase rounded-xl border border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 transition-all">Reschedule</button>
                                                                    <button onClick={() => setSelectedNoShowBooking(booking)} className="flex-1 py-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 text-[10px] font-black uppercase rounded-xl border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 transition-all">No-Show / Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 flex flex-col items-center">
                                                <Users className="w-12 h-12 text-gray-200 mb-4" />
                                                <h4 className="text-2xl font-black text-gray-300 uppercase tracking-tight">Belum Ada Pasien</h4>
                                                <button onClick={() => setIsAddingPatient(true)} className="mt-8 px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl">Tambah Pasien Manual</button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'settings' && (
                                    <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-10 shadow-sm">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                                Pengaturan Kontrol Slot
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="p-8 bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-800/30 rounded-[2.5rem] space-y-6">
                                                    <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2">
                                                        <AlertTriangle className="w-4 h-4" /> Hazard Zone
                                                    </h4>
                                                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase leading-relaxed p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-rose-100/50">
                                                        Hapus jadwal hanya jika belum ada pendaftaran. Jika pendaftaran sudah ada, sistem akan memblokir penghapusan otomatis.
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            if (schedule.booked_count > 0) return alert('Sudah ada pasien terdaftar periksa tab Daftar Pasien.');
                                                            if (confirm('Hapus slot?')) router.delete(route('admin.schedules.destroy', schedule.id));
                                                        }}
                                                        className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${schedule.booked_count > 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-rose-600 text-white shadow-xl shadow-rose-600/20 hover:bg-rose-700'}`}
                                                    >
                                                        Hapus Seluruh Jadwal
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ID JADWAL</p>
                                                        <p className="text-xl font-black text-gray-900 dark:text-white font-mono">#{schedule.id}</p>
                                                    </div>
                                                    <div className="p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TERAKHIR DIUPDATE</p>
                                                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{new Date(schedule.updated_at).toLocaleString('id-ID')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL: COMPREHENSIVE PATIENT DETAIL (MIRRORING USERS/SHOW.JSX) */}
            <Modal show={selectedPatientDetail !== null} onClose={() => setSelectedPatientDetail(null)} maxWidth="7xl">
                {selectedPatientDetail && (
                    <div className="max-h-[90vh] overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-950 p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                                    {selectedPatientDetail.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{selectedPatientDetail.name}</h2>
                                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]">{selectedPatientDetail.email}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPatientDetail(null)} className="p-3 bg-white dark:bg-gray-800 rounded-2xl hover:text-rose-500 transition-colors shadow-sm">
                                <XCircle className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Patient Sub Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8 bg-white/50 dark:bg-gray-800/40 p-2 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                            {[
                                { id: 'summary', label: 'Ringkasan', icon: Activity },
                                { id: 'legal', label: 'Pernyataan & S&K', icon: ShieldCheck },
                                { id: 'screening', label: 'Skrining AI', icon: Heart },
                                { id: 'financial', label: 'Histori Transaksi', icon: CreditCard },
                            ].map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setPatientSubTab(t.id)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${patientSubTab === t.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <t.icon className="w-4 h-4" /> {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Patient Detail Content */}
                        <AnimatePresence mode="wait">
                            {patientSubTab === 'summary' && (
                                <motion.div key="p-summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Telepon</p>
                                            <p className="text-lg font-black text-gray-900 dark:text-white">{selectedPatientDetail.phone || '-'}</p>
                                        </div>
                                        <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Usia</p>
                                            <p className="text-lg font-black text-gray-900 dark:text-white">{selectedPatientDetail.age || '-'} Tahun</p>
                                        </div>
                                        <div className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gender</p>
                                            <p className="text-lg font-black text-gray-900 dark:text-white capitalize">{selectedPatientDetail.gender || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-8">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-rose-500" /> Lokasi & Kontak Darurat
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Alamat Lengkap</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{selectedPatientDetail.address || 'Belum diisi.'}</p>
                                            </div>
                                            <div className="p-6 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl space-y-4">
                                                <p className="text-[10px] font-black text-rose-600 uppercase">Kontak Darurat</p>
                                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{selectedPatientDetail.emergency_contact_name || 'N/A'}</p>
                                                <p className="text-sm font-bold text-rose-600">{selectedPatientDetail.emergency_contact_phone || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {patientSubTab === 'legal' && (
                                <motion.div key="p-legal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <div className="p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-8 ml-2 flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                            Dokumen Persetujuan Digital
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Primary Clinical Agreement */}
                                            <div className={`p-8 rounded-[2rem] border min-h-[300px] flex flex-col justify-between ${selectedPatientDetail.agreement_signed_at ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-800/50' : 'bg-gray-50 border-gray-100'}`}>
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <ShieldCheck className={`w-10 h-10 ${selectedPatientDetail.agreement_signed_at ? 'text-emerald-500' : 'text-gray-200'}`} />
                                                        {selectedPatientDetail.agreement_signed_at && (
                                                            <div className="flex flex-col items-end">
                                                                <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase">Two Docs Signed</span>
                                                                <span className="text-[8px] font-bold text-emerald-600 mt-1 uppercase">VERIFIED DIGITAL</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase leading-tight">PERNYATAAN AWAL + PERJANJIAN LAYANAN</h4>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Signed at: {selectedPatientDetail.agreement_signed_at ? new Date(selectedPatientDetail.agreement_signed_at).toLocaleString('id-ID') : 'Not Signed'}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mt-6">
                                                    {selectedPatientDetail.agreement_data?.signature_1 && (
                                                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                                                            <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Doc 1: Pernyataan</p>
                                                            <img src={selectedPatientDetail.agreement_data.signature_1} alt="Signature 1" className="h-10 w-full object-contain invert dark:invert-0" />
                                                        </div>
                                                    )}
                                                    {selectedPatientDetail.digital_signature && (
                                                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                                                            <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Doc 2: Perjanjian</p>
                                                            <img src={selectedPatientDetail.digital_signature} alt="Signature 2" className="h-10 w-full object-contain invert dark:invert-0" />
                                                        </div>
                                                    )}
                                                </div>

                                                {selectedPatientDetail.agreement_signed_at && (
                                                    <a href={route('admin.users.agreement', selectedPatientDetail.id)} target="_blank" rel="noreferrer" className="mt-6 w-full py-4 bg-white dark:bg-gray-800 text-center text-[10px] font-black uppercase rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex items-center justify-center gap-2">
                                                        Lihat Kedua Dokumen <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>

                                            {/* Affiliate Agreement */}
                                            <div className={`p-8 rounded-[2rem] border min-h-[300px] flex flex-col justify-between ${selectedPatientDetail.affiliate_agreement_signed_at ? 'bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-800/50' : 'bg-gray-50 border-gray-100'}`}>
                                                <div>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <Fingerprint className={`w-10 h-10 ${selectedPatientDetail.affiliate_agreement_signed_at ? 'text-indigo-500' : 'text-gray-200'}`} />
                                                        {selectedPatientDetail.affiliate_agreement_signed_at && (
                                                            <span className="px-4 py-1.5 bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase">Affiliate Member</span>
                                                        )}
                                                    </div>
                                                    <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase leading-tight">PERJANJIAN MITRA AFFILIATE</h4>
                                                </div>
                                                {selectedPatientDetail.affiliate_signature ? (
                                                    <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100/50">
                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Affiliate Signature</p>
                                                        <img src={selectedPatientDetail.affiliate_signature} className="h-16 w-full object-contain invert dark:invert-0" alt="af-signature" />
                                                    </div>
                                                ) : <div className="mt-6 text-center text-[10px] font-bold text-gray-400 uppercase italic border border-dashed p-8 rounded-2xl">Belum Bergabung Afiliasi</div>}
                                            </div>

                                            {/* Course Agreements */}
                                            {selectedPatientDetail.transactions?.filter(tx => tx.transactionable_type?.includes('Course') && tx.payment_agreement_data).map((tx) => (
                                                <div key={`course-legal-${tx.id}`} className="p-8 rounded-[2rem] border bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 md:col-span-2">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div>
                                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">E-Learning / Kelas</p>
                                                            <h4 className="font-black text-gray-900 dark:text-white uppercase leading-tight">S&K Peserta Kelas: {tx.transactionable?.title || 'Course'}</h4>
                                                            <p className="text-[9px] font-bold text-gray-400 mt-1">Invoice: {tx.invoice_number}</p>
                                                        </div>
                                                        <Clipboard className="w-10 h-10 text-gray-200" />
                                                    </div>
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="p-2.5 bg-emerald-500 rounded-xl text-white">
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Persetujuan Terdaftar</p>
                                                            <p className="text-[10px] font-bold text-gray-400 font-mono italic">{new Date(tx.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setSelectedCourseAgreement({ tx, data: tx.payment_agreement_data })} className="w-full py-4 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 rounded-2xl hover:shadow-lg transition-all">
                                                        Lihat Detail S&K Lengkap
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {patientSubTab === 'screening' && (
                                <motion.div key="p-screening" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    {selectedPatientDetail.screening_results?.length > 0 ? (
                                        selectedPatientDetail.screening_results.map((res, ridx) => (
                                            <div key={res.id} className="p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-8">
                                                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                    <div>
                                                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Sesi Skrining #{selectedPatientDetail.screening_results.length - ridx}</p>
                                                        <p className="text-sm font-bold text-gray-500">{new Date(res.completed_at || res.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                                    </div>
                                                    <span className="px-5 py-2 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">{res.severity_label || 'Analyzed'}</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Summary Diagnosa AI</p>
                                                    <p className="text-2xl font-black text-gray-900 dark:text-white leading-tight italic">"{res.ai_summary || '-'}"</p>
                                                </div>
                                                {res.chat_history && (
                                                    <div className="p-8 bg-gray-50/30 dark:bg-gray-900/40 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Chat History Log</h5>
                                                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                                            {res.chat_history.map((chat, cidx) => (
                                                                <div key={cidx} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                                    <div className={`max-w-[85%] p-4 rounded-2xl text-xs font-bold ${chat.role === 'user' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'}`}>
                                                                        {chat.content}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-[3rem] border border-dashed border-gray-100 dark:border-gray-700">
                                            <Heart className="w-16 h-16 text-gray-100 mx-auto mb-4" />
                                            <p className="text-[10px] font-black text-gray-300 uppercase underline decoration-rose-500 decoration-4 underline-offset-8">Data Skrining Belum Tersedia</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {patientSubTab === 'financial' && (
                                <motion.div key="p-finance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                        <div className="p-8 bg-emerald-50/30 dark:bg-emerald-950/20 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div> Log Transaksi
                                            </h3>
                                        </div>
                                        <div className="max-h-[500px] overflow-y-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice / Tanggal</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Layanan</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nominal</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Bukti</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status & Verifikasi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                    {selectedPatientDetail.transactions?.length > 0 ? selectedPatientDetail.transactions.map(tx => (
                                                        <tr key={tx.id} className="hover:bg-emerald-50/10 transition-colors">
                                                            <td className="px-8 py-6">
                                                                <p className="text-sm font-black text-gray-900 dark:text-white">{tx.invoice_number}</p>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{new Date(tx.created_at).toLocaleDateString('id-ID')}</p>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <p className="text-xs font-black uppercase text-indigo-600">{tx.transactionable_type?.split('\\').pop()}</p>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{tx.transactionable?.package_type || tx.transactionable?.title || 'System Service'}</p>
                                                            </td>
                                                            <td className="px-8 py-6">
                                                                <p className="text-sm font-black text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}</p>
                                                            </td>
                                                            <td className="px-8 py-6 text-center">
                                                                {tx.payment_proof ? (
                                                                    <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 group/proof">
                                                                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/proof:bg-indigo-600 group-hover/proof:text-white transition-all">
                                                                            <Eye className="w-4 h-4" />
                                                                        </div>
                                                                    </a>
                                                                ) : <span className="text-[10px] font-bold text-gray-300 italic">N/A</span>}
                                                            </td>
                                                            <td className="px-8 py-6 text-center">
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${tx.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : tx.status === 'rejected' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                                                        {tx.status === 'paid' ? 'VALID / LUNAS' : tx.status}
                                                                    </span>
                                                                    {tx.status === 'paid' && tx.validated_at && (
                                                                        <div className="flex flex-col items-center">
                                                                            <span className="text-[8px] font-black text-indigo-500 uppercase flex items-center gap-1">
                                                                                <CheckCircle2 className="w-2.5 h-2.5" />
                                                                                By: {tx.validated_by?.name || 'Admin'}
                                                                            </span>
                                                                            <span className="text-[8px] text-gray-400 font-bold">{new Date(tx.validated_at).toLocaleDateString('id-ID')}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) : <tr><td colSpan="4" className="p-12 text-center text-[10px] font-bold text-gray-400 uppercase italic">Belum ada histori transaksi aktif.</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
                            <SecondaryButton onClick={() => setSelectedPatientDetail(null)} className="!rounded-2xl !px-12 !py-4 font-black uppercase tracking-widest text-[10px]">Tutup Detail Pasien</SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>

            {/* MODAL: COURSE AGREEMENT DETAIL (MATCHING USERS/SHOW.JSX) */}
            <Modal show={selectedCourseAgreement !== null} onClose={() => setSelectedCourseAgreement(null)} maxWidth="2xl">
                {selectedCourseAgreement && (
                    <div className="p-10 dark:bg-gray-900 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16"></div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Syarat & Ketentuan Peserta</h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8">Kelas: {selectedCourseAgreement.tx.transactionable?.title}</p>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 max-h-[400px] overflow-y-auto mb-8 custom-scrollbar">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {selectedCourseAgreement.data.agreement_text || "Peserta setuju untuk mengikuti seluruh rangkaian materi dan mematuhi kode etik bimbingan InDepth Mental Wellness."}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                                <p className="text-[8px] font-black text-gray-400 uppercase mb-2">Tanda Tangan Peserta</p>
                                <img src={selectedCourseAgreement.data.signature} className="h-16 mx-auto object-contain invert dark:invert-0" alt="course-signature" />
                            </div>
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 flex flex-col justify-center items-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" />
                                <p className="text-[8px] font-black text-emerald-600 uppercase">Tervalidasi Sistem</p>
                                <p className="text-[9px] font-bold text-gray-500 mt-1">{new Date(selectedCourseAgreement.tx.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                        </div>

                        <button onClick={() => setSelectedCourseAgreement(null)} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-[10px] uppercase rounded-2xl shadow-xl tracking-widest">Tutup Dokumen</button>
                    </div>
                )}
            </Modal>

            {/* Existing Modals: Reschedule, No-Show, Add Patient */}
            <Modal show={selectedRescheduleBooking !== null} onClose={() => setSelectedRescheduleBooking(null)}>
                <form onSubmit={handleReschedule} className="p-10 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Jadwal Ulang Pasien</h2>
                    <div className="space-y-6">
                        <select
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            value={rescheduleData.new_schedule_id}
                            onChange={(e) => setRescheduleData(prev => ({ ...prev, new_schedule_id: e.target.value, new_date: '', new_start_time: '', new_end_time: '' }))}
                        >
                            <option value="">-- Buat Jadwal Custom (Manual) --</option>
                            {availableSchedules?.filter(s => s.id !== selectedRescheduleBooking?.schedule_id).map(s => (
                                <option key={s.id} value={s.id}>{new Date(s.date).toLocaleDateString('id-ID')} | {s.start_time.substring(0, 5)} WIB | {s.therapist?.name}</option>
                            ))}
                        </select>
                        {!rescheduleData.new_schedule_id && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <TextInput type="date" className="sm:col-span-2" value={rescheduleData.new_date} onChange={e => setRescheduleData('new_date', e.target.value)} />
                                <TextInput type="time" value={rescheduleData.new_start_time} onChange={e => setRescheduleData('new_start_time', e.target.value)} />
                                <TextInput type="time" value={rescheduleData.new_end_time} onChange={e => setRescheduleData('new_end_time', e.target.value)} />
                            </div>
                        )}
                        <textarea
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            rows="3"
                            placeholder="Alasan reschedule..."
                            value={rescheduleData.reschedule_reason}
                            onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedRescheduleBooking(null)}>Batal</SecondaryButton>
                        <button type="submit" disabled={rescheduling} className="px-8 py-3 bg-amber-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl">Konfirmasi</button>
                    </div>
                </form>
            </Modal>

            <Modal show={selectedNoShowBooking !== null} onClose={() => setSelectedNoShowBooking(null)}>
                <form onSubmit={handleNoShow} className="p-10 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Batalkan / No-Show</h2>
                    <div className="space-y-6">
                        <select
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            value={noShowData.no_show_party}
                            onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                        >
                            <option value="cancel">Batalkan Total (Open Slot)</option>
                            <option value="patient">Pasien Tidak Hadir (Slot Hangus)</option>
                            <option value="therapist">Praktisi Berhalangan (Slot Hangus)</option>
                        </select>
                        <textarea
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            placeholder="Alasan pembatalan..."
                            rows="3"
                            value={noShowData.no_show_reason}
                            onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                            required={noShowData.no_show_party !== 'cancel'}
                        />
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedNoShowBooking(null)}>Batal</SecondaryButton>
                        <button type="submit" disabled={markingNoShow} className="px-8 py-3 bg-rose-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl">Konfirmasi</button>
                    </div>
                </form>
            </Modal>

            <Modal show={isAddingPatient} onClose={() => setIsAddingPatient(false)}>
                <form onSubmit={handleAddPatient} className="p-10 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Tambah Pasien Manual</h2>
                    <div className="space-y-6">
                        <select
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            value={addPatientData.patient_id}
                            onChange={(e) => setAddPatientData('patient_id', e.target.value)}
                            required
                        >
                            <option value="">-- Cari Nama Pasien --</option>
                            {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
                        </select>
                        <select
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner"
                            value={addPatientData.package_type}
                            onChange={(e) => setAddPatientData('package_type', e.target.value)}
                        >
                            <option value="reguler">Reguler / Umum</option>
                            <option value="hipnoterapi">Paket Hipnoterapi</option>
                            <option value="premium">Paket Premium</option>
                            <option value="vip">Paket VIP</option>
                        </select>
                    </div>
                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsAddingPatient(false)}>Batal</SecondaryButton>
                        <button type="submit" disabled={addingPatient} className="px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl">Proses Pendaftaran</button>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}

export default function SchedulesShow(props) {
    return (
        <ErrorBoundary>
            <InnerSchedulesShow {...props} />
        </ErrorBoundary>
    );
}
