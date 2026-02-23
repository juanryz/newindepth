import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, CreditCard, ChevronRight, AlertTriangle, CheckCircle2, Clock, FileText, Eye } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createPortal } from 'react-dom';
import ScheduleForm from '../Schedules/Form';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

/* ─── Calendar Event Renderer ─── */
function renderEventContent(eventInfo) {
    const isBooked = eventInfo.event.extendedProps.bookings?.length > 0;
    return (
        <div className={`h-full w-full p-2 rounded-xl transition-all flex flex-col justify-center gap-1 overflow-hidden ${isBooked
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20'
            : 'bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
            }`}>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">{eventInfo.timeText}</span>
            <div className={`text-xs font-black truncate leading-tight uppercase tracking-tight ${isBooked ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {isBooked ? '✅ TERISI' : eventInfo.event.extendedProps.therapist?.name}
            </div>
            {!isBooked && (
                <div className="text-[8px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest">
                    {eventInfo.event.extendedProps.schedule_type === 'class' ? '🎓 Kelas' : '👥 Konsultasi'}
                </div>
            )}
            {isBooked && (
                <div className="text-[8px] font-black text-white/70 uppercase tracking-widest">{eventInfo.event.extendedProps.bookings.length} Pasien</div>
            )}
        </div>
    );
}

/* ─── Calendar custom styles ─── */
const calendarStyles = `
    .fc { --fc-border-color: rgba(255,255,255,0.05); --fc-button-bg-color: transparent; --fc-button-border-color: rgba(255,255,255,0.1); --fc-button-hover-bg-color: rgba(99,102,241,0.1); --fc-button-active-bg-color: rgba(99,102,241,0.2); --fc-today-bg-color: rgba(99,102,241,0.05); font-family: 'Inter', sans-serif; border: none !important; }
    .dark .fc { --fc-border-color: rgba(255,255,255,0.03); }
    .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color) !important; }
    .fc-col-header-cell { padding: 20px 0 !important; background: rgba(255,255,255,0.02); }
    .fc-col-header-cell-cushion { text-transform: uppercase; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; color: #6366f1; }
    .fc-timegrid-slot { height: 4em !important; border-bottom: 1px solid var(--fc-border-color) !important; }
    .fc-timegrid-slot-label-cushion { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
    .fc-event { border: none !important; border-radius: 12px !important; padding: 4px !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
    .fc-event:hover { transform: scale(1.02) translateY(-2px); z-index: 50; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    .fc-v-event { background: transparent !important; }
    .fc-event-main { padding: 4px !important; }
    .fc-timegrid-now-indicator-line { border-color: #6366f1 !important; border-width: 2px !important; }
    .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: -0.025em; color: #1e293b; }
    .dark .fc-toolbar-title { color: #f8fafc; }
    .fc-button-primary { background-color: white !important; border: 1px solid rgba(0,0,0,0.05) !important; color: #475569 !important; font-weight: 800 !important; font-size: 11px !important; text-transform: uppercase !important; border-radius: 12px !important; padding: 8px 16px !important; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important; }
    .dark .fc-button-primary { background-color: #1e293b !important; border-color: rgba(255,255,255,0.05) !important; color: #cbd5e1 !important; }
    .fc-button-primary:hover { background-color: #f8fafc !important; }
    .dark .fc-button-primary:hover { background-color: #334155 !important; }
    .fc-button-active { background-color: #4f46e5 !important; border-color: #4f46e5 !important; color: white !important; }
`;

export default function OrderManagementIndex({ schedules, bookings, transactions, therapists, availableSchedules = [], filters }) {
    const [activeTab, setActiveTab] = useState('schedules');
    const { flash, errors: pageErrors } = usePage().props;

    // ─── Schedule state ───
    const [isAdding, setIsAdding] = useState(false);
    const [therapistId, setTherapistId] = useState(filters.therapist_id || '');
    const [calendarView, setCalendarView] = useState('timeGridWeek');
    const calendarRef = useRef(null);

    // ─── Booking state ───
    const { data: assignData, setData: setAssignData, patch, processing: assigning } = useForm({ therapist_id: '' });
    const [editingBooking, setEditingBooking] = useState(null);
    const [reschedulingBooking, setReschedulingBooking] = useState(null);
    const [noShowBooking, setNoShowBooking] = useState(null);
    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({ new_schedule_id: '', reschedule_reason: '' });
    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({ no_show_party: 'therapist', no_show_reason: '' });

    // ─── Transaction state ───
    const [selectedReject, setSelectedReject] = useState(null);
    const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject, processing: rejecting } = useForm({ rejection_reason: '' });
    const { post: validatePost, processing: validating } = useForm({});

    // ─── Tabs ───
    const tabs = [
        { id: 'schedules', label: 'Jadwal', icon: Calendar, count: schedules?.length || 0 },
        { id: 'bookings', label: 'Booking', icon: Users, count: bookings?.length || 0 },
        { id: 'transactions', label: 'Pembayaran', icon: CreditCard, count: transactions?.length || 0 },
    ];

    // ─── Calendar responsive ───
    useEffect(() => {
        const handleResize = () => setCalendarView(window.innerWidth < 1024 ? 'timeGridDay' : 'timeGridWeek');
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (therapistId !== (filters.therapist_id || '')) {
            router.get(route('admin.orders.index'), { ...filters, therapist_id: therapistId }, { preserveState: true, replace: true });
        }
    }, [therapistId]);

    // ─── Handlers ───
    const handleEventClick = (info) => router.visit(route('admin.schedules.show', info.event.id));
    const handleAssign = (bookingId) => patch(route('admin.bookings.assign-therapist', bookingId), { onSuccess: () => setEditingBooking(null) });
    const handleReschedule = (e) => { e.preventDefault(); postReschedule(route('admin.bookings.reschedule', reschedulingBooking.id), { onSuccess: () => { setReschedulingBooking(null); resetReschedule(); } }); };
    const handleNoShow = (e) => { e.preventDefault(); postNoShow(route('admin.bookings.no-show', noShowBooking.id), { onSuccess: () => { setNoShowBooking(null); resetNoShow(); } }); };
    const handleValidate = (tx) => { if (confirm('Validasi transaksi ini?\n\nTerapis akan otomatis ditugaskan secara acak.')) validatePost(route('admin.transactions.validate', tx.id)); };
    const submitReject = (e) => { e.preventDefault(); rejectPost(route('admin.transactions.reject', selectedReject.id), { onSuccess: () => { setSelectedReject(null); resetReject(); } }); };

    const getStatusBadge = (status) => {
        const s = { pending_screening: 'bg-yellow-100 text-yellow-800', pending_payment: 'bg-blue-100 text-blue-800', pending_validation: 'bg-indigo-100 text-indigo-800', confirmed: 'bg-green-100 text-green-800', completed: 'bg-gray-100 text-gray-800', cancelled: 'bg-red-100 text-red-800' };
        const l = { pending_screening: 'Menunggu Skrining', pending_payment: 'Menunggu Bayar', pending_validation: 'Menunggu Validasi', confirmed: 'Dikonfirmasi', completed: 'Selesai', cancelled: 'Dibatalkan' };
        return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s[status] || s.pending_payment}`}>{l[status] || status}</span>;
    };

    const formatSchedule = (tx) => {
        const booking = tx.transactionable;
        if (!booking?.schedule) return null;
        const schedule = booking.schedule;
        try {
            return { dateStr: new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }), startTime: schedule.start_time?.substring(0, 5) || '--:--', endTime: schedule.end_time?.substring(0, 5) || '--:--' };
        } catch { return null; }
    };

    // Count pending transactions
    const pendingTxCount = transactions?.filter(t => t.status === 'pending')?.length || 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Manajemen Order</h2>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Mengelola Jadwal, Pasien dan Pembayaran</p>
                    </div>
                </div>
            }
        >
            <Head title="Manajemen Order" />
            <style>{calendarStyles}</style>

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-xl">{flash.success}</div>
                    )}
                    {pageErrors?.error && (
                        <div className="p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 backdrop-blur-xl">{pageErrors.error}</div>
                    )}

                    {/* Main Content with Tabs — Admin User Show style */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Sidebar Tab Navigation */}
                        <div className="lg:w-72 flex-shrink-0 space-y-4">
                            <div className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1'
                                            : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-indigo-500'}`} />
                                        <span className="flex-1 text-left">{tab.label}</span>
                                        <div className="flex items-center gap-2">
                                            {tab.id === 'transactions' && pendingTxCount > 0 && (
                                                <span className={`w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-amber-500 text-white animate-pulse'}`}>
                                                    {pendingTxCount}
                                                </span>
                                            )}
                                            {activeTab === tab.id && <ChevronRight className="w-5 h-5 opacity-50" />}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Quick Stats Sidebar */}
                            <div className="bg-indigo-50/50 dark:bg-indigo-950/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 p-6">
                                <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-500 uppercase mb-4">
                                    <FileText className="w-4 h-4" /> Ringkasan
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Total Slot Jadwal</p>
                                        <p className="text-xl font-black text-gray-900 dark:text-white">{schedules?.length || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Total Booking</p>
                                        <p className="text-xl font-black text-gray-900 dark:text-white">{bookings?.length || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Transaksi Pending</p>
                                        <p className={`text-xl font-black ${pendingTxCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{pendingTxCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">

                                {/* ═══════════ TAB: JADWAL ═══════════ */}
                                {activeTab === 'schedules' && (
                                    <motion.div key="schedules" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                                                    Kelola Jadwal Praktek
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => window.print()} className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-gray-100 transition-all">
                                                        Cetak
                                                    </button>
                                                    <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                                        + Tambah Slot
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Therapist filter */}
                                            <div className="mb-8 pb-6 border-b border-gray-100 dark:border-gray-700/50">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Filter Terapis</label>
                                                <select value={therapistId} onChange={(e) => setTherapistId(e.target.value)} className="w-full sm:w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all">
                                                    <option value="">Semua Terapis</option>
                                                    {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                                </select>
                                            </div>

                                            {/* Calendar */}
                                            <div className="bg-white dark:bg-gray-900/20 rounded-[2rem] transition-colors overflow-hidden">
                                                <FullCalendar
                                                    ref={calendarRef}
                                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                                    initialView={calendarView}
                                                    headerToolbar={{ left: 'prev,next', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                                                    locale="id"
                                                    slotMinTime="08:00:00"
                                                    slotMaxTime="22:00:00"
                                                    slotDuration="01:00:00"
                                                    allDaySlot={false}
                                                    events={schedules}
                                                    eventClick={handleEventClick}
                                                    editable={false}
                                                    droppable={false}
                                                    eventContent={renderEventContent}
                                                    height="auto"
                                                    expandRows={true}
                                                    stickyHeaderDates={true}
                                                    nowIndicator={true}
                                                />
                                            </div>

                                            {/* Legend */}
                                            <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Terisi</span></div>
                                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tersedia</span></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ═══════════ TAB: BOOKING ═══════════ */}
                                {activeTab === 'bookings' && (
                                    <motion.div key="bookings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                    Booking Pasien
                                                </h3>
                                                <span className="px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{bookings.length} Total</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30">
                                                            <th className="px-6 py-5">Info Booking</th>
                                                            <th className="px-6 py-5">Pasien & Screening</th>
                                                            <th className="px-6 py-5">Jadwal</th>
                                                            <th className="px-6 py-5 text-center">Status</th>
                                                            <th className="px-6 py-5">Terapis & Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                                        {bookings.map((booking) => (
                                                            <tr key={booking.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                                                <td className="px-6 py-5">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-black text-gray-900 dark:text-white mb-1">{booking.booking_code}</span>
                                                                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit">{booking.package_type?.toUpperCase() || 'KONSULTASI'}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-5">
                                                                    <div className="flex flex-col gap-2">
                                                                        <div>
                                                                            <div className="text-sm font-bold text-gray-900 dark:text-white">{booking.patient?.name}</div>
                                                                            <div className="text-xs text-gray-500">{booking.patient?.email}</div>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="flex flex-col">
                                                                                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1 my-1">
                                                                                    <div className={`h-1 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${booking.patient_profile_stats?.percentage || 0}%` }}></div>
                                                                                </div>
                                                                                <span className="text-[9px] font-black text-gray-400 uppercase">{booking.patient_profile_stats?.percentage || 0}%</span>
                                                                            </div>
                                                                            {booking.patient?.screening_completed_at ? (
                                                                                <span className="text-[9px] font-black text-emerald-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3">OK</span>
                                                                            ) : (
                                                                                <span className="text-[9px] font-black text-rose-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3">No</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-5">
                                                                    {booking.schedule ? (
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                                                                            <span className="text-xs text-gray-500">{booking.schedule.start_time?.substring(0, 5)} WIB</span>
                                                                        </div>
                                                                    ) : <span className="text-xs text-gray-400 italic">No Slot</span>}
                                                                </td>
                                                                <td className="px-6 py-5 text-center">{getStatusBadge(booking.status)}</td>
                                                                <td className="px-6 py-5">
                                                                    <div className="flex flex-col gap-3">
                                                                        {editingBooking === booking.id ? (
                                                                            <div className="flex flex-col gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-3 rounded-xl border border-white dark:border-gray-700 shadow-lg">
                                                                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Assign Terapis</label>
                                                                                <select className="text-xs bg-gray-50 dark:bg-gray-900 border-none rounded-lg focus:ring-2 focus:ring-indigo-500/20" value={assignData.therapist_id} onChange={(e) => setAssignData('therapist_id', e.target.value)}>
                                                                                    <option value="">Pilih Terapis</option>
                                                                                    {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                                                                </select>
                                                                                <div className="flex gap-2 mt-1">
                                                                                    <button onClick={() => handleAssign(booking.id)} className="flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg disabled:opacity-50" disabled={assigning || !assignData.therapist_id}>Simpan</button>
                                                                                    <button onClick={() => setEditingBooking(null)} className="flex-1 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase rounded-lg">Batal</button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex flex-col gap-2">
                                                                                <div className="flex items-center justify-between group/tp">
                                                                                    <div className="flex flex-col">
                                                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">PJ</span>
                                                                                        {booking.therapist ? (
                                                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">{booking.therapist.name}</span>
                                                                                        ) : (
                                                                                            <span className="text-xs font-bold text-amber-500">
                                                                                                {['pending_payment', 'pending_validation'].includes(booking.status) ? '⏳ Otomatis' : 'BELUM'}
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                    <button onClick={() => { setEditingBooking(booking.id); setAssignData('therapist_id', booking.therapist_id || ''); }} className="p-1.5 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg opacity-0 group-hover:opacity-100 group-hover/tp:opacity-100 transition-all">
                                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                                    </button>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800/50">
                                                                                    {booking.schedule_id && (
                                                                                        <Link href={route('admin.schedules.show', booking.schedule_id)} className="px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 hover:text-indigo-500 transition-all">Detail</Link>
                                                                                    )}
                                                                                    {['confirmed', 'in_progress'].includes(booking.status) && (
                                                                                        <>
                                                                                            <button onClick={() => setReschedulingBooking(booking)} className="px-2 py-1.5 bg-amber-500 text-white text-[9px] font-black uppercase rounded-lg">Reschedule</button>
                                                                                            <button onClick={() => setNoShowBooking(booking)} className="px-2 py-1.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-lg">No-Show</button>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {bookings.length === 0 && (
                                                            <tr><td colSpan="5" className="px-8 py-20 text-center"><p className="text-gray-500 italic">Belum ada booking pasien.</p></td></tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ═══════════ TAB: PEMBAYARAN ═══════════ */}
                                {activeTab === 'transactions' && (
                                    <motion.div key="transactions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-emerald-50/30 dark:bg-emerald-950/20">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                                    Validasi Pembayaran
                                                </h3>
                                                <span className="px-4 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{transactions.length} Transaksi</span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30">
                                                            <th className="px-6 py-5 text-center">Invoice</th>
                                                            <th className="px-6 py-5">Pengguna</th>
                                                            <th className="px-6 py-5">Layanan</th>
                                                            <th className="px-6 py-5">Nominal</th>
                                                            <th className="px-6 py-5">Bukti</th>
                                                            <th className="px-6 py-5">Status</th>
                                                            <th className="px-6 py-5 text-center">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                                        {transactions.map((tx) => {
                                                            const scheduleInfo = formatSchedule(tx);
                                                            const isBooking = tx.transactionable_type?.includes('Booking');
                                                            const hasDiscount = tx.transactionable?.user_voucher?.voucher;
                                                            return (
                                                                <tr key={tx.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                                                    <td className="px-6 py-5 text-center">
                                                                        <div className="flex flex-col items-center">
                                                                            <span className="text-sm font-black text-gray-900 dark:text-white mb-1">{tx.invoice_number}</span>
                                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tx.payment_bank || '-'}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-5">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{tx.user?.name}</span>
                                                                            <span className="text-xs text-gray-500">{tx.user?.email}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-5">
                                                                        <div className="flex flex-col gap-1">
                                                                            <span className="text-[10px] font-black px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-500/20 w-fit uppercase tracking-widest">{isBooking ? 'Booking' : tx.transactionable_type?.split('\\').pop()}</span>
                                                                            {isBooking && <span className="text-[9px] font-black text-indigo-500 uppercase">{tx.transactionable?.package_type || 'Package'}</span>}
                                                                            {scheduleInfo && (
                                                                                <div className="flex flex-col mt-1">
                                                                                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">📅 {scheduleInfo.dateStr}</span>
                                                                                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">🕐 {scheduleInfo.startTime} – {scheduleInfo.endTime}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-5">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-black text-gray-900 dark:text-white">Rp {new Intl.NumberFormat('id-ID').format(tx.amount || 0)}</span>
                                                                            {hasDiscount ? (
                                                                                <div className="mt-1 flex flex-col">
                                                                                    <span className="text-[9px] font-black text-rose-500 uppercase">🏷️ DISKON</span>
                                                                                    <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 text-[10px] font-black rounded-md border border-rose-100 dark:border-rose-800 line-through w-fit">
                                                                                        Rp {new Intl.NumberFormat('id-ID').format((tx.amount || 0) + (tx.transactionable.user_voucher.voucher.discount_amount || 0))}
                                                                                    </span>
                                                                                </div>
                                                                            ) : <span className="text-[8px] font-bold text-gray-400 uppercase mt-1">Normal</span>}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-5">
                                                                        {tx.payment_proof ? (
                                                                            <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 group/proof">
                                                                                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/proof:bg-indigo-500 group-hover/proof:text-white transition-all">
                                                                                    <Eye className="w-4 h-4" />
                                                                                </div>
                                                                                <span className="text-[10px] font-black text-gray-500 group-hover/proof:text-indigo-600 uppercase">Lihat</span>
                                                                            </a>
                                                                        ) : <span className="text-[10px] font-black text-rose-500 uppercase italic">Belum Upload</span>}
                                                                    </td>
                                                                    <td className="px-6 py-5">
                                                                        <span className={`px-3 py-1 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border ${tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                                                                tx.status === 'rejected' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                                                                                    tx.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                                                                                        'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                                            }`}>
                                                                            {tx.status === 'paid' ? 'Valid' : tx.status === 'rejected' ? 'Ditolak' : tx.status === 'pending' ? 'Menunggu' : tx.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-5 text-center">
                                                                        {tx.status === 'pending' && (
                                                                            <div className="flex justify-center gap-2">
                                                                                <button disabled={validating} onClick={() => handleValidate(tx)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50">{validating ? '...' : 'Validasi'}</button>
                                                                                <button onClick={() => setSelectedReject(tx)} className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-rose-600/20 transition-all">Tolak</button>
                                                                            </div>
                                                                        )}
                                                                        {tx.status === 'paid' && tx.validated_at && (
                                                                            <div className="flex flex-col items-center gap-1">
                                                                                <span className="text-[9px] text-gray-400 font-bold">✓ {new Date(tx.validated_at).toLocaleDateString('id-ID')}</span>
                                                                                {tx.validated_by && (
                                                                                    <span className="text-[9px] font-black text-indigo-500 uppercase flex items-center gap-1">
                                                                                        <CheckCircle2 className="w-3 h-3" />
                                                                                        {tx.validated_by_user?.name || tx.validated_by?.name || 'Admin'}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {transactions.length === 0 && (
                                                <div className="py-20 text-center">
                                                    <CheckCircle2 className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                                    <p className="text-gray-500 font-black uppercase tracking-[0.2em] italic">Tidak ada transaksi.</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════ MODALS ═══════════ */}

            {/* Add Schedule Modal */}
            {isAdding && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setIsAdding(false)}></div>
                    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative border border-white dark:border-gray-800">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Tambah Slot Jadwal</h1>
                            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <ScheduleForm therapists={therapists} onSuccess={() => setIsAdding(false)} />
                    </div>
                </div>,
                document.body
            )}

            {/* Reschedule Modal */}
            <Modal show={reschedulingBooking !== null} onClose={() => setReschedulingBooking(null)}>
                <form onSubmit={handleReschedule} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Reschedule Sesi</h2>
                    <p className="text-xs text-gray-500 mb-6">Pasien: <strong>{reschedulingBooking?.patient?.name}</strong></p>
                    <div className="mb-4">
                        <InputLabel htmlFor="new_schedule_id" value="Pilih Jadwal Baru" />
                        <select id="new_schedule_id" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" value={rescheduleData.new_schedule_id} onChange={(e) => setRescheduleData('new_schedule_id', e.target.value)} required>
                            <option value="">-- Pilih Slot Tersedia --</option>
                            {availableSchedules.filter(s => s.id !== reschedulingBooking?.schedule_id).map(s => (
                                <option key={s.id} value={s.id}>{s.therapist?.name} — {new Date(s.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} — {s.start_time?.substring(0, 5)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="reschedule_reason" value="Alasan Reschedule" />
                        <textarea id="reschedule_reason" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" rows="2" value={rescheduleData.reschedule_reason} onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)} required></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setReschedulingBooking(null)}>Batal</SecondaryButton>
                        <button type="submit" disabled={rescheduling || !rescheduleData.new_schedule_id} className="inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 disabled:opacity-25 transition">Update Jadwal</button>
                    </div>
                </form>
            </Modal>

            {/* No-Show Modal */}
            <Modal show={noShowBooking !== null} onClose={() => setNoShowBooking(null)}>
                <form onSubmit={handleNoShow} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Tandai Tidak Hadir</h2>
                    <p className="text-xs text-gray-500 mb-6">Booking Code: {noShowBooking?.booking_code}</p>
                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_party" value="Pihak yang Tidak Hadir" />
                        <select id="no_show_party" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm" value={noShowData.no_show_party} onChange={(e) => setNoShowData('no_show_party', e.target.value)} required>
                            <option value="therapist">Praktisi (Tidak Hadir)</option>
                            <option value="patient">Pasien (Tidak Hadir)</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_reason" value="Keterangan Admin" />
                        <textarea id="no_show_reason" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm" rows="2" value={noShowData.no_show_reason} onChange={(e) => setNoShowData('no_show_reason', e.target.value)}></textarea>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setNoShowBooking(null)}>Batal</SecondaryButton>
                        <button type="submit" disabled={markingNoShow} className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 disabled:opacity-25 transition">Tandai No-Show</button>
                    </div>
                </form>
            </Modal>

            {/* Reject Transaction Modal */}
            {selectedReject && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold dark:text-white mb-2">Tolak Pembayaran</h3>
                            <p className="text-sm text-gray-500">Invoice: <span className="font-bold text-gray-900 dark:text-white">{selectedReject.invoice_number}</span></p>
                        </div>
                        <form onSubmit={submitReject}>
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Alasan Penolakan</label>
                                <textarea className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]" value={rejectData.rejection_reason} onChange={e => setRejectData('rejection_reason', e.target.value)} required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <PrimaryButton type="submit" disabled={rejecting} className="!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center">
                                    {rejecting ? 'Memproses...' : 'Konfirmasi Penolakan'}
                                </PrimaryButton>
                                <button type="button" onClick={() => setSelectedReject(null)} className="text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors py-2">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
