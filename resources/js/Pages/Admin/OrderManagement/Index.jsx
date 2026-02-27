import React, { useState, useRef, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, CreditCard, ChevronRight, AlertTriangle, CheckCircle2, Clock, FileText, Eye, Activity } from 'lucide-react';
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
    const therapistName = eventInfo.event.extendedProps.therapist?.name || 'Terapis';
    const isPast = eventInfo.event.start < new Date();

    if (isPast && !isBooked) {
        return (
            <div className="h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-500 shadow-sm cursor-not-allowed">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-tight truncate">{eventInfo.timeText}</span>
                <div className="text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight text-slate-600 dark:text-slate-400">
                    ⚫ KADALUARSA
                </div>
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate">
                    Ditutup • {therapistName}
                </div>
            </div>
        );
    }

    return (
        <div className={`h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 overflow-hidden ${isBooked
            ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20'
            : 'bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 shadow-sm'
            }`}>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight truncate">{eventInfo.timeText}</span>
            <div className={`text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight ${isBooked ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {isBooked ? '🔴 PENUH' : `🟢 ${therapistName}`}
            </div>
            <div className="text-[8px] font-bold opacity-70 uppercase tracking-widest truncate">
                {isBooked
                    ? `${eventInfo.event.extendedProps.bookings.length} Pasien • Slot Terisi`
                    : 'Tersedia • 1 Pasien'}
            </div>
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
    @media (max-width: 767px) {
        .fc-toolbar { flex-direction: column !important; gap: 8px !important; align-items: stretch !important; }
        .fc-toolbar-title { font-size: 0.9rem !important; text-align: center; }
        .fc-toolbar-chunk { display: flex !important; justify-content: center !important; flex-wrap: wrap !important; gap: 4px !important; }
        .fc-button-primary { font-size: 9px !important; padding: 6px 10px !important; }
        .fc .fc-col-header-cell-cushion { font-size: 9px !important; padding: 4px !important; }
        .fc .fc-timegrid-slot-label-cushion { font-size: 9px !important; }
        .fc-timegrid-slot { height: 3em !important; }
    }
`;

export default function OrderManagementIndex({ schedules = [], bookings = [], transactions = [], therapists = [], availableSchedules = [], filters = {} }) {
    const [activeTab, setActiveTab] = useState('schedules');
    const { flash, errors: pageErrors, auth } = usePage().props;



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
    const [validatingTx, setValidatingTx] = useState(null);

    // ─── Admin Voucher state ───
    const [voucherTxId, setVoucherTxId] = useState(null);
    const [adminVoucherCode, setAdminVoucherCode] = useState('');
    const [applyingVoucher, setApplyingVoucher] = useState(false);
    const { post: postVoucher, errors: voucherErrors } = useForm();

    const handleAdminApplyVoucher = (tx) => {
        if (!adminVoucherCode.trim()) return;
        setApplyingVoucher(true);
        router.post(route('vouchers.apply-by-code'), {
            code: adminVoucherCode,
            transaction_id: tx.id,
        }, {
            preserveScroll: true,
            onSuccess: () => { setVoucherTxId(null); setAdminVoucherCode(''); },
            onFinish: () => setApplyingVoucher(false),
        });
    };

    // ─── Transaction filters ───
    const [txFilterStatus, setTxFilterStatus] = useState('');
    const [txFilterSearch, setTxFilterSearch] = useState('');
    const [txFilterDateFrom, setTxFilterDateFrom] = useState('');
    const [txFilterDateTo, setTxFilterDateTo] = useState('');

    const filteredTransactions = (transactions || []).filter(tx => {
        if (txFilterStatus && tx.status !== txFilterStatus) return false;
        if (txFilterSearch) {
            const q = txFilterSearch.toLowerCase();
            if (!tx.invoice_number?.toLowerCase().includes(q) &&
                !tx.user?.name?.toLowerCase().includes(q) &&
                !tx.user?.email?.toLowerCase().includes(q)) return false;
        }
        if (txFilterDateFrom && new Date(tx.created_at) < new Date(txFilterDateFrom)) return false;
        if (txFilterDateTo && new Date(tx.created_at) > new Date(txFilterDateTo + 'T23:59:59')) return false;
        return true;
    });

    // ─── Booking filters ───
    const [bkFilterStatus, setBkFilterStatus] = useState('');
    const [bkFilterSearch, setBkFilterSearch] = useState('');
    const [bkFilterDateFrom, setBkFilterDateFrom] = useState('');
    const [bkFilterDateTo, setBkFilterDateTo] = useState('');

    const filteredBookings = (bookings || []).filter(bk => {
        if (bkFilterStatus && bk.status !== bkFilterStatus) return false;
        if (bkFilterSearch) {
            const q = bkFilterSearch.toLowerCase();
            if (!bk.booking_code?.toLowerCase().includes(q) &&
                !bk.patient?.name?.toLowerCase().includes(q) &&
                !bk.patient?.email?.toLowerCase().includes(q) &&
                !bk.therapist?.name?.toLowerCase().includes(q)) return false;
        }
        if (bkFilterDateFrom && bk.schedule?.date && new Date(bk.schedule.date) < new Date(bkFilterDateFrom)) return false;
        if (bkFilterDateTo && bk.schedule?.date && new Date(bk.schedule.date) > new Date(bkFilterDateTo + 'T23:59:59')) return false;
        return true;
    });

    // ─── Jadwal filters ───
    const [scFilterSearch, setScFilterSearch] = useState('');
    const [scFilterDateFrom, setScFilterDateFrom] = useState('');
    const [scFilterDateTo, setScFilterDateTo] = useState('');
    const [scFilterTherapist, setScFilterTherapist] = useState('');

    const filteredSchedules = (schedules || []).filter(sc => {
        if (scFilterTherapist && String(sc.therapist?.id) !== String(scFilterTherapist) && String(sc.extendedProps?.therapist?.id) !== String(scFilterTherapist)) return false;
        if (scFilterSearch) {
            const q = scFilterSearch.toLowerCase();
            const th = (sc.extendedProps?.therapist?.name || sc.title || '').toLowerCase();
            if (!th.includes(q)) return false;
        }
        const dateVal = sc.start || sc.date;
        if (scFilterDateFrom && dateVal && new Date(dateVal) < new Date(scFilterDateFrom)) return false;
        if (scFilterDateTo && dateVal && new Date(dateVal) > new Date(scFilterDateTo + 'T23:59:59')) return false;
        return true;
    });

    // ─── Activity Log (derived from transactions + bookings) ───
    const activityLog = useMemo(() => {
        const logs = [];

        // From transactions
        (transactions || []).forEach(tx => {
            logs.push({
                id: `tx-submit-${tx.id}`,
                type: 'payment_submitted',
                icon: '💸',
                color: 'amber',
                actor: tx.user?.name || 'Pasien',
                actorRole: 'Pasien',
                action: 'mengajukan pembayaran',
                subject: tx.invoice_number,
                detail: `Rp ${new Intl.NumberFormat('id-ID').format(tx.amount || 0)} · ${tx.payment_bank || '-'}`,
                date: tx.created_at,
            });
            if (tx.status === 'paid' && tx.validated_at) {
                const validator = tx.validated_by_user?.name || tx.validated_by?.name || 'Admin';
                logs.push({ id: `tx-valid-${tx.id}`, type: 'payment_validated', icon: '✅', color: 'emerald', actor: validator, actorRole: 'Admin', action: 'memvalidasi pembayaran', subject: tx.invoice_number, detail: `Pasien: ${tx.user?.name || '-'} · Rp ${new Intl.NumberFormat('id-ID').format(tx.amount || 0)}`, date: tx.validated_at });
            }
            if (tx.status === 'rejected') {
                const validator = tx.validated_by_user?.name || tx.validated_by?.name || 'Admin';
                logs.push({ id: `tx-reject-${tx.id}`, type: 'payment_rejected', icon: '❌', color: 'rose', actor: validator, actorRole: 'Admin', action: 'menolak pembayaran', subject: tx.invoice_number, detail: `Pasien: ${tx.user?.name || '-'} · Alasan: ${tx.rejection_reason || '-'}`, date: tx.updated_at || tx.created_at });
            }
        });

        // From bookings
        (bookings || []).forEach(booking => {
            logs.push({ id: `booking-created-${booking.id}`, type: 'booking_created', icon: '📋', color: 'indigo', actor: booking.patient?.name || 'Pasien', actorRole: 'Pasien', action: 'membuat booking', subject: booking.booking_code, detail: `Paket ${booking.package_type || '-'} · ${booking.schedule?.date ? new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}`, date: booking.created_at });
            if (booking.status === 'no_show') {
                logs.push({ id: `booking-noshow-${booking.id}`, type: 'no_show', icon: '⚠️', color: 'rose', actor: 'Admin', actorRole: 'Admin', action: 'menandai no-show', subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || '-'} · Pihak: ${booking.no_show_party || 'pasien'}`, date: booking.updated_at || booking.created_at });
            }
            if (booking.status === 'completed') {
                logs.push({ id: `booking-done-${booking.id}`, type: 'session_completed', icon: '🎯', color: 'emerald', actor: booking.therapist?.name || 'Terapis', actorRole: 'Terapis', action: 'menyelesaikan sesi', subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || '-'} · Outcome: ${booking.completion_outcome || 'Normal'}`, date: booking.updated_at || booking.created_at });
            }
            if (booking.status === 'cancelled') {
                logs.push({ id: `booking-cancel-${booking.id}`, type: 'booking_cancelled', icon: '🚫', color: 'gray', actor: 'Admin', actorRole: 'Admin', action: 'membatalkan booking', subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || '-'}`, date: booking.updated_at || booking.created_at });
            }
        });

        return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [transactions, bookings]);

    // ─── Log filters ───
    const [logFilterType, setLogFilterType] = useState('');
    const [logFilterSearch, setLogFilterSearch] = useState('');
    const [logFilterDateFrom, setLogFilterDateFrom] = useState('');
    const [logFilterDateTo, setLogFilterDateTo] = useState('');

    const filteredLog = useMemo(() => {
        return activityLog.filter(log => {
            if (logFilterType && log.type !== logFilterType) return false;
            if (logFilterSearch) {
                const q = logFilterSearch.toLowerCase();
                if (!log.actor?.toLowerCase().includes(q) &&
                    !log.subject?.toLowerCase().includes(q) &&
                    !log.detail?.toLowerCase().includes(q) &&
                    !log.action?.toLowerCase().includes(q)) return false;
            }
            if (logFilterDateFrom && new Date(log.date) < new Date(logFilterDateFrom)) return false;
            if (logFilterDateTo && new Date(log.date) > new Date(logFilterDateTo + 'T23:59:59')) return false;
            return true;
        });
    }, [activityLog, logFilterType, logFilterSearch, logFilterDateFrom, logFilterDateTo]);


    const downloadCSVBookings = () => {
        const headers = ['Kode Booking', 'Paket', 'Pasien', 'Email Pasien', 'Terapis', 'Tanggal Sesi', 'Jam', 'Status', 'Tanggal Dibuat'];
        const rows = filteredBookings.map(bk => [
            bk.booking_code || '',
            bk.package_type?.toUpperCase() || '',
            bk.patient?.name || '',
            bk.patient?.email || '',
            bk.therapist?.name || bk.schedule?.therapist?.name || '-',
            bk.schedule?.date ? new Date(bk.schedule.date).toLocaleDateString('id-ID') : '-',
            bk.schedule?.start_time?.substring(0, 5) || '-',
            bk.status || '',
            bk.created_at ? new Date(bk.created_at).toLocaleDateString('id-ID') : '',
        ]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `booking_indepth_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSVSchedules = () => {
        const headers = ['Terapis', 'Tanggal', 'Jam Mulai', 'Jam Selesai', 'Status'];
        const rows = filteredSchedules.map(sc => [
            sc.extendedProps?.therapist?.name || sc.title || '-',
            sc.start ? new Date(sc.start).toLocaleDateString('id-ID') : (sc.date ? new Date(sc.date).toLocaleDateString('id-ID') : '-'),
            sc.extendedProps?.start_time || sc.start_time || '-',
            sc.extendedProps?.end_time || sc.end_time || '-',
            sc.extendedProps?.bookings?.length > 0 ? 'Terisi' : 'Tersedia',
        ]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `jadwal_indepth_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSVLog = () => {
        const headers = ['Tanggal', 'Jam', 'Pelaku', 'Role', 'Aksi', 'Subjek', 'Detail'];
        const rows = filteredLog.map(log => {
            const d = new Date(log.date);
            return [
                d.toLocaleDateString('id-ID'),
                d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                log.actor,
                log.actorRole,
                log.action,
                log.subject,
                log.detail,
            ];
        });
        const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `log_kegiatan_${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSV = () => {
        const headers = ['Invoice', 'Bank', 'Nama', 'Email', 'Layanan', 'Nominal (Rp)', 'Status', 'Tanggal', 'Divalidasi Oleh', 'Tanggal Validasi'];
        const rows = filteredTransactions.map(tx => [
            tx.invoice_number || '',
            tx.payment_bank || '-',
            tx.user?.name || '',
            tx.user?.email || '',
            tx.transactionable_type?.includes('Booking') ? `Booking - ${tx.transactionable?.package_type || ''}` : (tx.transactionable_type?.split('\\').pop() || ''),
            tx.amount || 0,
            tx.status === 'paid' ? 'Valid' : tx.status === 'rejected' ? 'Ditolak' : tx.status === 'pending' ? 'Menunggu' : tx.status,
            tx.created_at ? new Date(tx.created_at).toLocaleDateString('id-ID') : '',
            tx.validated_by_user?.name || tx.validated_by?.name || '',
            tx.validated_at ? new Date(tx.validated_at).toLocaleDateString('id-ID') : '',
        ]);
        const csvContent = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transaksi_indepth_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ─── Tabs ───
    const tabs = [
        { id: 'schedules', label: 'Jadwal', icon: Calendar, count: filteredSchedules.length, total: schedules?.length || 0 },
        { id: 'bookings', label: 'Booking', icon: Users, count: filteredBookings.length, total: bookings?.length || 0 },
        { id: 'transactions', label: 'Pembayaran', icon: CreditCard, count: filteredTransactions.length, total: transactions?.length || 0 },
        { id: 'activity', label: 'Log Kegiatan', icon: Activity, count: filteredLog.length, total: activityLog.length },
    ];

    // ─── Calendar responsive ───
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCalendarView('timeGridDay');
                if (calendarRef.current) {
                    const api = calendarRef.current.getApi();
                    if (api.view.type.includes('Grid') && api.view.type !== 'timeGridDay') {
                        api.changeView('timeGridDay');
                    }
                }
            } else {
                setCalendarView('timeGridWeek');
                if (calendarRef.current) {
                    const api = calendarRef.current.getApi();
                    if (api.view.type.includes('Grid') && api.view.type !== 'dayGridMonth' && api.view.type !== 'timeGridWeek') {
                        api.changeView('timeGridWeek');
                    }
                }
            }
        };
        handleResize(); // call initially
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
    const handleValidate = (tx) => {
        if (confirm('Validasi transaksi ini?')) {
            setValidatingTx(tx.id);
            router.post(route('admin.transactions.validate', tx.id), {}, {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setValidatingTx(null)
            });
        }
    };
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
                    {/* Error Handling */}
                    {usePage().props.flash?.success && (
                        <div className="p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50">
                            {usePage().props.flash.success}
                        </div>
                    )}
                    {(usePage().props.flash?.error || usePage().props.errors?.error) && (
                        <div className="p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">
                            {usePage().props.flash?.error || usePage().props.errors?.error}
                        </div>
                    )}

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 mb-4">{flash.success}</div>
                    )}
                    {(flash?.error || pageErrors?.error) && (
                        <div className="p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 mb-4">
                            {flash?.error || pageErrors?.error}
                        </div>
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

                                            {/* Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                                                    Kelola Jadwal Praktek
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="px-4 py-1.5 bg-teal-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        {filteredSchedules.length} / {schedules?.length || 0} Jadwal
                                                    </span>
                                                    <button
                                                        onClick={downloadCSVSchedules}
                                                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800/50 text-teal-700 dark:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all shadow-sm"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                        Unduh CSV
                                                    </button>
                                                    <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                                        + Tambah Slot
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Filter Bar */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700/50 items-end">
                                                {/* Filter Terapis */}
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Terapis</label>
                                                    <select value={therapistId} onChange={(e) => setTherapistId(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all">
                                                        <option value="">Semua Terapis</option>
                                                        {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                                    </select>
                                                </div>
                                                {/* Dari tanggal */}
                                                <div className="flex flex-col gap-1.5">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Dari Tanggal</label>
                                                    <input type="date" value={scFilterDateFrom} onChange={e => setScFilterDateFrom(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all" title="Dari tanggal" />
                                                </div>
                                                {/* Sampai tanggal + reset + presets */}
                                                <div className="flex flex-col gap-1.5 lg:col-span-2">
                                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Sampai Tanggal</label>
                                                    <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
                                                        <input type="date" value={scFilterDateTo} onChange={e => setScFilterDateTo(e.target.value)} className="w-[140px] px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all shrink-0" title="Sampai tanggal" />

                                                        {/* Preset Buttons */}
                                                        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0 h-[42px]">
                                                            <button onClick={() => {
                                                                const d = new Date();
                                                                const day = d.getDay();
                                                                const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                                                                setScFilterDateFrom(new Date(d.setDate(diff)).toISOString().split('T')[0]);
                                                                setScFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split('T')[0]);
                                                            }} className={`px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split('T')[0] })() && scFilterDateTo === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split('T')[0] })() ? 'bg-teal-500 text-white shadow-md' : 'hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400'}`}>Minggu</button>
                                                            <button onClick={() => {
                                                                const d = new Date();
                                                                setScFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0]);
                                                                setScFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0]);
                                                            }} className={`px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] && scFilterDateTo === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0] ? 'bg-teal-500 text-white shadow-md' : 'hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400'}`}>Bulan</button>
                                                            <button onClick={() => {
                                                                const d = new Date();
                                                                setScFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split('T')[0]);
                                                                setScFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split('T')[0]);
                                                            }} className={`px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0] && scFilterDateTo === new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] ? 'bg-teal-500 text-white shadow-md' : 'hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400'}`}>Tahun</button>
                                                        </div>

                                                        {(therapistId || scFilterSearch || scFilterDateFrom || scFilterDateTo) && (
                                                            <button onClick={() => { setTherapistId(''); setScFilterSearch(''); setScFilterDateFrom(''); setScFilterDateTo(''); }} className="shrink-0 px-3 h-[42px] bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all flex items-center justify-center" title="Reset filter">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Calendar */}
                                            <div className="bg-white dark:bg-gray-900/20 rounded-[2rem] transition-colors overflow-hidden">
                                                <FullCalendar
                                                    ref={calendarRef}
                                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                                    initialView={calendarView}
                                                    initialDate={new Date().toISOString().split('T')[0]}
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
                                                    dateClick={(info) => {
                                                        // Prevent adding slots in the past
                                                        const clicked = new Date(info.dateStr);
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                                                        if (clicked < today) return;
                                                        setIsAdding(true);
                                                    }}
                                                />
                                            </div>

                                            {/* Legend */}
                                            <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50 flex-wrap">
                                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Penuh (Terisi)</span></div>
                                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tersedia (1 Slot / Terapis)</span></div>
                                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-400"></div><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tertutup (Kadaluarsa)</span></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ═══════════ TAB: BOOKING ═══════════ */}
                                {activeTab === 'bookings' && (
                                    <motion.div key="bookings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">

                                            {/* Header */}
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 bg-indigo-50/30 dark:bg-indigo-950/20">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                        Booking Pasien
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            const day = d.getDay();
                                                            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                                                            setBkFilterDateFrom(new Date(d.setDate(diff)).toISOString().split('T')[0]);
                                                            setBkFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split('T')[0] })() && bkFilterDateTo === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split('T')[0] })() ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Minggu Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setBkFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0]);
                                                            setBkFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] && bkFilterDateTo === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Bulan Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setBkFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split('T')[0]);
                                                            setBkFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0] && bkFilterDateTo === new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Tahun Ini</button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                            {filteredBookings.length} / {bookings?.length || 0} Booking
                                                        </span>
                                                        <button
                                                            onClick={downloadCSVBookings}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                            Unduh CSV
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Filter Bar Booking */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                                                    {/* Search */}
                                                    <div className="flex flex-col gap-1.5 text-left">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Cari Booking</label>
                                                        <div className="relative">
                                                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                            <input
                                                                type="text" placeholder="Kode/pasien/terapis..."
                                                                value={bkFilterSearch} onChange={e => setBkFilterSearch(e.target.value)}
                                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Status */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Internal Status</label>
                                                        <select value={bkFilterStatus} onChange={e => setBkFilterStatus(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                                                            <option value="">Semua Status</option>
                                                            <option value="pending_payment">Menunggu Bayar</option>
                                                            <option value="pending_validation">Menunggu Validasi</option>
                                                            <option value="confirmed">Dikonfirmasi</option>
                                                            <option value="in_progress">Berlangsung</option>
                                                            <option value="completed">Selesai</option>
                                                            <option value="cancelled">Dibatalkan</option>
                                                            <option value="no_show">No-Show</option>
                                                        </select>
                                                    </div>
                                                    {/* Dari tanggal */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Dari Tanggal</label>
                                                        <input type="date" value={bkFilterDateFrom} onChange={e => setBkFilterDateFrom(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" title="Dari tanggal sesi" />
                                                    </div>
                                                    {/* Sampai + reset */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Sampai Tanggal</label>
                                                        <div className="flex gap-2">
                                                            <input type="date" value={bkFilterDateTo} onChange={e => setBkFilterDateTo(e.target.value)} className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" title="Sampai tanggal sesi" />
                                                            {(bkFilterStatus || bkFilterSearch || bkFilterDateFrom || bkFilterDateTo) && (
                                                                <button onClick={() => { setBkFilterStatus(''); setBkFilterSearch(''); setBkFilterDateFrom(''); setBkFilterDateTo(''); }} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all" title="Reset filter">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30">
                                                            <th className="px-6 py-5">Info Booking</th>
                                                            <th className="px-6 py-5">Pasien &amp; Screening</th>
                                                            <th className="px-6 py-5">Jadwal</th>
                                                            <th className="px-6 py-5 text-center">Status</th>
                                                            <th className="px-6 py-5">Terapis &amp; Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                                                        {filteredBookings.map((booking) => (
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
                                                                            <span className="text-xs text-gray-500">{booking.schedule.start_time?.substring(0, 5)} - {booking.schedule.end_time?.substring(0, 5)} WIB</span>
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
                                                        {filteredBookings.length === 0 && (
                                                            <tr><td colSpan="5" className="px-8 py-20 text-center">
                                                                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Tidak ada booking yang cocok.</p>
                                                                {(bkFilterStatus || bkFilterSearch || bkFilterDateFrom || bkFilterDateTo) && (
                                                                    <button onClick={() => { setBkFilterStatus(''); setBkFilterSearch(''); setBkFilterDateFrom(''); setBkFilterDateTo(''); }} className="mt-4 text-[10px] font-black text-indigo-600 uppercase underline">Reset Filter</button>
                                                                )}
                                                            </td></tr>
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

                                            {/* Header + Download */}
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 bg-emerald-50/30 dark:bg-emerald-950/20">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                                        Validasi Pembayaran
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            const day = d.getDay();
                                                            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                                                            setTxFilterDateFrom(new Date(d.setDate(diff)).toISOString().split('T')[0]);
                                                            setTxFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split('T')[0] })() && txFilterDateTo === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split('T')[0] })() ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400'}`}>Minggu Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setTxFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0]);
                                                            setTxFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] && txFilterDateTo === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0] ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400'}`}>Bulan Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setTxFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split('T')[0]);
                                                            setTxFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0] && txFilterDateTo === new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400'}`}>Tahun Ini</button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-4 py-1.5 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                            {filteredTransactions.length} / {transactions?.length || 0} Transaksi
                                                        </span>
                                                        <button
                                                            onClick={downloadCSV}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                            Unduh CSV
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* ─── Filter Bar ─── */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                                                    {/* Search */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Cari Transaksi</label>
                                                        <div className="relative">
                                                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                            <input
                                                                type="text"
                                                                placeholder="Invoice / nama..."
                                                                value={txFilterSearch}
                                                                onChange={e => setTxFilterSearch(e.target.value)}
                                                                className="w-full pl-9 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Status Filter */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Status Bayar</label>
                                                        <div className="relative">
                                                            <select
                                                                value={txFilterStatus}
                                                                onChange={e => setTxFilterStatus(e.target.value)}
                                                                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white appearance-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                                                            >
                                                                <option value="">Semua Status</option>
                                                                <option value="pending">⏳ Menunggu</option>
                                                                <option value="paid">✅ Valid / Lunas</option>
                                                                <option value="rejected">❌ Ditolak</option>
                                                            </select>
                                                            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Date From */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Dari Tanggal</label>
                                                        <input
                                                            type="date"
                                                            value={txFilterDateFrom}
                                                            onChange={e => setTxFilterDateFrom(e.target.value)}
                                                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                                                            title="Dari tanggal"
                                                        />
                                                    </div>

                                                    {/* Date To */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Sampai Tanggal</label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="date"
                                                                value={txFilterDateTo}
                                                                onChange={e => setTxFilterDateTo(e.target.value)}
                                                                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                                                                title="Sampai tanggal"
                                                            />
                                                            {(txFilterStatus || txFilterSearch || txFilterDateFrom || txFilterDateTo) && (
                                                                <button
                                                                    onClick={() => { setTxFilterStatus(''); setTxFilterSearch(''); setTxFilterDateFrom(''); setTxFilterDateTo(''); }}
                                                                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all"
                                                                    title="Reset filter"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        {filteredTransactions.map((tx) => {
                                                            const scheduleInfo = formatSchedule(tx);
                                                            const isBooking = tx.transactionable_type?.includes('Booking');
                                                            const hasDiscount = tx.transactionable?.user_voucher?.voucher;
                                                            const booking = tx.transactionable; // Assuming tx.transactionable is the booking object if isBooking is true
                                                            const user = usePage().props.auth.user;
                                                            const isAdminOrSuperAdmin = user.roles.some(r => ['admin', 'super_admin'].includes(r.name));
                                                            const isAssignedTherapist = booking?.therapist_id === user.id;

                                                            return (
                                                                <tr key={tx.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                                                    <td className="px-6 py-5 text-center">
                                                                        <div className="flex flex-col items-center">
                                                                            <span className="text-sm font-black text-gray-900 dark:text-white mb-1">{tx.invoice_number}</span>
                                                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tx.payment_bank || '-'}</span>
                                                                            <span className="text-[9px] text-gray-400 mt-0.5">{tx.created_at ? new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
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
                                                                            {isBooking && booking && booking.status === 'confirmed' && (isAssignedTherapist || isAdminOrSuperAdmin) && (
                                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                                    <button
                                                                                        onClick={() => handleStartSession(booking.id)}
                                                                                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-700 transition-all hover:bg-indigo-700 shadow-md shadow-indigo-200"
                                                                                    >
                                                                                        Mulai Sesi
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setReschedulingBooking(booking)}
                                                                                        className="px-3 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/30 transition-all hover:bg-amber-100"
                                                                                    >
                                                                                        Reschedule
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => setNoShowBooking(booking)}
                                                                                        className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 transition-all hover:bg-red-100"
                                                                                    >
                                                                                        No-Show / Batal
                                                                                    </button>
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
                                                                        <div className="flex flex-col items-center gap-2">
                                                                            {tx.status === 'pending' && (
                                                                                <div className="flex justify-center gap-2">
                                                                                    <button disabled={validatingTx === tx.id} onClick={() => handleValidate(tx)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50">{validatingTx === tx.id ? '...' : 'Validasi'}</button>
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
                                                                            {/* Admin Voucher Button */}
                                                                            {tx.status === 'pending' && !tx.payment_agreement_data?.applied_voucher_id && (
                                                                                <>
                                                                                    {voucherTxId === tx.id ? (
                                                                                        <div className="flex flex-col gap-1.5 w-full mt-1">
                                                                                            <input
                                                                                                autoFocus
                                                                                                className="w-full px-3 py-1.5 text-[10px] font-bold bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none uppercase tracking-wider"
                                                                                                placeholder="Kode voucher..."
                                                                                                value={adminVoucherCode}
                                                                                                onChange={e => setAdminVoucherCode(e.target.value.toUpperCase())}
                                                                                                onKeyDown={e => e.key === 'Escape' && setVoucherTxId(null)}
                                                                                            />
                                                                                            <div className="flex gap-1">
                                                                                                <button
                                                                                                    disabled={!adminVoucherCode || applyingVoucher}
                                                                                                    onClick={() => handleAdminApplyVoucher(tx)}
                                                                                                    className="flex-1 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-lg disabled:opacity-50"
                                                                                                >{applyingVoucher ? '...' : 'Terapkan'}</button>
                                                                                                <button onClick={() => { setVoucherTxId(null); setAdminVoucherCode(''); }} className="flex-1 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-[9px] font-black uppercase rounded-lg">Batal</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <button
                                                                                            onClick={() => { setVoucherTxId(tx.id); setAdminVoucherCode(''); }}
                                                                                            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 transition-all"
                                                                                        >🏷️ Diskon</button>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                            {tx.payment_agreement_data?.applied_voucher_code && (
                                                                                <span className="text-[9px] font-black text-emerald-500 uppercase mt-1">✓ {tx.payment_agreement_data.applied_voucher_code}</span>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {filteredTransactions.length === 0 && (
                                                            <tr><td colSpan="7" className="px-8 py-20 text-center">
                                                                <CheckCircle2 className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                                                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Tidak ada transaksi yang cocok.</p>
                                                                {(txFilterStatus || txFilterSearch || txFilterDateFrom || txFilterDateTo) && (
                                                                    <button onClick={() => { setTxFilterStatus(''); setTxFilterSearch(''); setTxFilterDateFrom(''); setTxFilterDateTo(''); }} className="mt-4 text-[10px] font-black text-emerald-600 uppercase underline">Reset Filter</button>
                                                                )}
                                                            </td></tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ═══════════ TAB: LOG KEGIATAN ═══════════ */}
                                {activeTab === 'activity' && (
                                    <motion.div key="activity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">

                                            {/* Header */}
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 bg-indigo-50/30 dark:bg-indigo-950/20">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                                    <div>
                                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                                                            Log Kegiatan
                                                        </h3>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Riwayat aktivitas sistem · terbaru di atas</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            const day = d.getDay();
                                                            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                                                            setLogFilterDateFrom(new Date(d.setDate(diff)).toISOString().split('T')[0]);
                                                            setLogFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split('T')[0] })() && logFilterDateTo === (function () { const d = new Date(); const day = d.getDay(); return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split('T')[0] })() ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Minggu Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setLogFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0]);
                                                            setLogFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] && logFilterDateTo === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Bulan Ini</button>
                                                        <button onClick={() => {
                                                            const d = new Date();
                                                            setLogFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split('T')[0]);
                                                            setLogFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split('T')[0]);
                                                        }} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0] && logFilterDateTo === new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400'}`}>Tahun Ini</button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                                            {filteredLog.length} / {activityLog.length} Aktivitas
                                                        </span>
                                                        <button
                                                            onClick={downloadCSVLog}
                                                            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                            Unduh CSV
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Filter Bar Log */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                                                    {/* Search */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Cari Log</label>
                                                        <div className="relative">
                                                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                                            <input
                                                                type="text" placeholder="Nama / kode / aksi..."
                                                                value={logFilterSearch} onChange={e => setLogFilterSearch(e.target.value)}
                                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* Tipe aktivitas */}
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left">Tipe Log</label>
                                                        <select value={logFilterType} onChange={e => setLogFilterType(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all">
                                                            <option value="">Semua Tipe</option>
                                                            <option value="payment_submitted">💸 Pembayaran Diajukan</option>
                                                            <option value="payment_validated">✅ Pembayaran Divalidasi</option>
                                                            <option value="payment_rejected">❌ Pembayaran Ditolak</option>
                                                            <option value="booking_created">📋 Booking Dibuat</option>
                                                            <option value="no_show">⚠️ No-Show</option>
                                                            <option value="session_completed">🎯 Sesi Selesai</option>
                                                            <option value="booking_cancelled">🚫 Booking Dibatalkan</option>
                                                        </select>
                                                    </div>
                                                    {/* Dari tanggal */}
                                                    <div className="flex flex-col gap-1.5 text-left">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Dari Tanggal</label>
                                                        <input type="date" value={logFilterDateFrom} onChange={e => setLogFilterDateFrom(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" title="Dari tanggal" />
                                                    </div>
                                                    {/* Sampai + reset */}
                                                    <div className="flex flex-col gap-1.5 text-left">
                                                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Sampai Tanggal</label>
                                                        <div className="flex gap-2">
                                                            <input type="date" value={logFilterDateTo} onChange={e => setLogFilterDateTo(e.target.value)} className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all" title="Sampai tanggal" />
                                                            {(logFilterType || logFilterSearch || logFilterDateFrom || logFilterDateTo) && (
                                                                <button onClick={() => { setLogFilterType(''); setLogFilterSearch(''); setLogFilterDateFrom(''); setLogFilterDateTo(''); }} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all" title="Reset filter">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Timeline */}
                                            <div className="px-8 py-6">
                                                {filteredLog.length === 0 ? (
                                                    <div className="py-20 text-center">
                                                        <Activity className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Tidak ada aktivitas yang cocok.</p>
                                                        {(logFilterType || logFilterSearch || logFilterDateFrom || logFilterDateTo) && (
                                                            <button onClick={() => { setLogFilterType(''); setLogFilterSearch(''); setLogFilterDateFrom(''); setLogFilterDateTo(''); }} className="mt-4 text-[10px] font-black text-indigo-600 uppercase underline">Reset Filter</button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="relative">
                                                        <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
                                                        <div className="space-y-1">
                                                            {filteredLog.map((log) => {
                                                                const colorMap = {
                                                                    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50',
                                                                    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50',
                                                                    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50',
                                                                    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50',
                                                                    gray: 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
                                                                };
                                                                const dotColorMap = {
                                                                    emerald: 'bg-emerald-500',
                                                                    amber: 'bg-amber-500',
                                                                    rose: 'bg-rose-500',
                                                                    indigo: 'bg-indigo-500',
                                                                    gray: 'bg-gray-400',
                                                                };
                                                                const isAdmin = log.actorRole === 'Admin';
                                                                const d = new Date(log.date);
                                                                const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                                                                const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

                                                                return (
                                                                    <div key={log.id} className="flex gap-5 items-start py-4 group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 rounded-2xl px-2 transition-all">
                                                                        <div className="relative flex-shrink-0" style={{ width: 56 }}>
                                                                            <div className={`w-10 h-10 rounded-2xl border-2 border-white dark:border-gray-900 shadow-md flex items-center justify-center text-base z-10 relative ${dotColorMap[log.color]}`}>
                                                                                <span>{log.icon}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${colorMap[log.color]}`}>
                                                                                    {isAdmin ? '👤' : '🧑'} {log.actor} · {log.actorRole}
                                                                                </span>
                                                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{log.action}</span>
                                                                                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg">{log.subject}</span>
                                                                            </div>
                                                                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-0.5 truncate">{log.detail}</p>
                                                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                                                <Clock className="w-3 h-3 text-gray-300" />
                                                                                <span className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                                                                                    {dateStr} &middot; {timeStr} WIB
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
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

            {/* ─── Reschedule Modal ─── */}
            {reschedulingBooking !== null && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" onClick={() => setReschedulingBooking(null)} />
                    <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-white/50 dark:border-gray-800 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-10 pt-10 pb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Reschedule Sesi</h2>
                                        <p className="text-amber-100 text-[10px] font-black uppercase tracking-widest">Pindah Jadwal Pasien</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 mt-1">
                                    <div className="w-6 h-6 bg-white/30 rounded-lg flex items-center justify-center text-xs font-black text-white">{reschedulingBooking?.patient?.name?.charAt(0)}</div>
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{reschedulingBooking?.patient?.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleReschedule} className="px-10 py-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Pilih Jadwal Baru</label>
                                <div className="relative">
                                    <select
                                        id="new_schedule_id"
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 transition-all appearance-none"
                                        value={rescheduleData.new_schedule_id}
                                        onChange={(e) => setRescheduleData('new_schedule_id', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Pilih Slot Tersedia --</option>
                                        {availableSchedules.filter(s => s.id !== reschedulingBooking?.schedule_id).map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.therapist?.name} — {new Date(s.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })} — {s.start_time?.substring(0, 5)} WIB
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Alasan Reschedule</label>
                                <textarea
                                    id="reschedule_reason"
                                    rows="3"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 transition-all resize-none"
                                    placeholder="Tuliskan alasan perubahan jadwal..."
                                    value={rescheduleData.reschedule_reason}
                                    onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setReschedulingBooking(null)}
                                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={rescheduling || !rescheduleData.new_schedule_id}
                                    className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    {rescheduling ? 'Memproses...' : '✓ Update Jadwal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* ─── No-Show Modal ─── */}
            {noShowBooking !== null && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" onClick={() => setNoShowBooking(null)} />
                    <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-white/50 dark:border-gray-800 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-rose-500 to-rose-700 px-10 pt-10 pb-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Tandai Tidak Hadir</h2>
                                        <p className="text-rose-100 text-[10px] font-black uppercase tracking-widest">No-Show / Pembatalan</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 mt-1">
                                    <Clock className="w-3 h-3 text-white opacity-70" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest font-mono">{noShowBooking?.booking_code}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleNoShow} className="px-10 py-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Pihak yang Tidak Hadir</label>
                                <div className="relative">
                                    <select
                                        id="no_show_party"
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all appearance-none"
                                        value={noShowData.no_show_party}
                                        onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                                        required
                                    >
                                        <option value="therapist">Praktisi / Terapis (Tidak Hadir)</option>
                                        <option value="patient">Pasien (Tidak Hadir)</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Keterangan Admin <span className="text-gray-300 normal-case font-bold">(opsional)</span></label>
                                <textarea
                                    id="no_show_reason"
                                    rows="3"
                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all resize-none"
                                    placeholder="Catatan tambahan untuk admin..."
                                    value={noShowData.no_show_reason}
                                    onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setNoShowBooking(null)}
                                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={markingNoShow}
                                    className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:from-rose-600 hover:to-rose-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    {markingNoShow ? 'Memproses...' : '⚠ Tandai No-Show'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

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
