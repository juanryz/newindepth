import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ProfileProgressCard from '@/Components/ProfileProgressCard';
import ServiceFlowGuide from '@/Components/ServiceFlowGuide';

const GlassPanel = ({ children, className = '', ...props }) => (
    <div className={`bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-3xl transition-all duration-500 ${className}`} {...props}>{children}</div>
);

const SectionLabel = ({ children, className = '' }) => (
    <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-500 dark:to-slate-600 mb-5 ml-1 ${className}`}>{children}</h3>
);

function QuickCard({ href, title, description, iconPath, color, disabled = false, disabledText = 'Lengkapi profil & screening', onClick }) {
    const base = `group flex gap-4 items-start p-5 rounded-2xl h-full transition-all duration-300 bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border border-white/70 dark:border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.15)]`;
    const cls = disabled
        ? `${base} opacity-40 cursor-not-allowed pointer-events-none select-none`
        : `${base} hover:shadow-[0_12px_40px_rgba(99,102,241,0.08)] hover:border-indigo-200/50 dark:hover:border-indigo-500/20 hover:-translate-y-1`;

    if (disabled) {
        return (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={cls} title="Lengkapi profil dan screening terlebih dahulu">
                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center ${color} shadow-sm`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} /></svg>
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{description}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        {disabledText}
                    </span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="h-full">
            <Link href={href} onClick={onClick} className={cls}>
                <div className={`flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} /></svg>
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{description}</p>
                </div>
            </Link>
        </motion.div>
    );
}

const PaymentCountdown = ({ scheduleDate, startTime, className = '' }) => {
    const [timeLeft, setTimeLeft] = React.useState('');

    React.useEffect(() => {
        if (!scheduleDate || !startTime) return;

        const interval = setInterval(() => {
            if (!scheduleDate || !startTime) {
                setTimeLeft('--j --m --d');
                return;
            }

            const now = new Date();

            // Handle Laravel/Carbon ISO strings (YYYY-MM-DDTHH:MM:SS...)
            const datePart = scheduleDate.includes('T') ? scheduleDate.split('T')[0] : scheduleDate.split(' ')[0];
            // Start time usually HH:MM:SS
            const timePart = startTime;

            const sched = new Date(`${datePart}T${timePart}`);

            if (isNaN(sched.getTime())) {
                setTimeLeft('--j --m --d');
                return;
            }

            // Batas waktu adalah 2 jam sebelum jadwal dimulai
            const deadline = new Date(sched.getTime() - (2 * 60 * 60 * 1000));
            const diff = deadline - now;

            if (diff <= 0) {
                setTimeLeft('Waktu Konfirmasi Habis');
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}j ${mins}m ${secs}d lagi`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [scheduleDate, startTime]);

    return (
        <div className={`mt-2 flex items-center gap-2 ${className}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            <span className="text-sm md:text-base font-black text-red-600 dark:text-red-400 tabular-nums tracking-widest uppercase">{timeLeft}</span>
        </div>
    );
};

/* Severity label → colour mapping */
const severityColors = {
    'Ringan': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Sedang': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Berat Akut': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    'Berat Kronis': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    'High Risk': 'bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-200',
};

function ScreeningBanner({ screeningResult, canTakeScreening, daysUntilNextScreening, isProfileComplete }) {
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

    if (!screeningResult) {
        if (isProfileComplete) return null; // Hide if profile is 100% complete
        /* Belum screening */
        return (
            <GlassPanel className="!border-amber-200/60 dark:!border-amber-700/30 p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 to-orange-100/20 dark:from-amber-900/10 dark:to-transparent pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-100/80 dark:bg-amber-800/30 backdrop-blur flex items-center justify-center shadow-sm">
                        <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-amber-900 dark:text-amber-200">Anda Belum Melengkapi Profil</p>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">Lengkapi profil Anda terlebih dahulu agar Anda bisa membeli paket dan membuat janji konsultasi.</p>
                    </div>
                </div>
            </GlassPanel>
        );
    }

    /* Sudah screening */

    const packageLabel = screeningResult.recommended_package
        ? (screeningResult.recommended_package === 'vip' ? 'VIP' : screeningResult.recommended_package.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()))
        : null;

    return (
        <GlassPanel className="!border-green-200/60 dark:!border-green-700/30 p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 to-emerald-100/10 dark:from-green-900/10 dark:to-transparent pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-800/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-green-900 dark:text-green-200">Screening Selesai</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {packageLabel && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                                Rekomendasi: {packageLabel}
                            </span>
                        )}
                    </div>

                </div>

                <div className="flex-shrink-0 mt-4 sm:mt-0 flex flex-col items-end justify-center">
                    {canTakeScreening ? (
                        <Link
                            href={route('screening.show')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:border-amber-700/50 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 dark:text-amber-400 text-sm font-semibold transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Mulai Screening Ulang
                        </Link>
                    ) : (
                        <div className="text-right" />
                    )}
                </div>
            </div>
        </GlassPanel>
    );
}


function LastSessionCard({ booking }) {
    if (!booking) return null;

    const { schedule, therapist, recording_link, patient_visible_notes } = booking;

    return (
        <GlassPanel className="!border-emerald-200/50 dark:!border-emerald-800/30 overflow-hidden mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 to-transparent dark:from-emerald-900/5 dark:to-transparent pointer-events-none" />
            <div className="relative bg-emerald-500/5 px-6 py-3 border-b border-emerald-100/50 dark:border-emerald-800/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <h3 className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.15em]">Sesi Terakhir Anda</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-100/60 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full backdrop-blur">
                    {(() => {
                        const d = schedule.date.includes(' ') ? schedule.date.split(' ')[0] : (schedule.date.includes('T') ? schedule.date.split('T')[0] : schedule.date);
                        return new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                    })()}
                </span>
            </div>
            <div className="relative p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">Catatan & Homework</p>
                        <div className="bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/20">
                            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed italic">
                                "{patient_visible_notes || 'Terapis tidak meninggalkan catatan khusus. Tetap semangat!'}"
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">Rekaman Sesi</p>
                            {recording_link ? (
                                <a href={recording_link} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-3 bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-indigo-100/50 dark:border-indigo-800/20 hover:bg-indigo-50/50 transition-all">
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Tonton Ulang Sesi</p>
                                        <p className="text-[10px] text-indigo-500 truncate">Klik untuk membuka video</p>
                                    </div>
                                </a>
                            ) : (
                                <div className="p-4 bg-white/30 dark:bg-white/[0.01] backdrop-blur rounded-2xl border border-slate-100/50 dark:border-slate-700/30 text-center">
                                    <p className="text-xs text-slate-400 italic">Rekaman tidak tersedia untuk sesi ini.</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><span className="font-bold">Terapis:</span> {therapist?.name || schedule.therapist?.name}</div>
                    </div>
                </div>
            </div>
        </GlassPanel>
    );
}

function ActiveBookingCard({ booking }) {
    if (!booking) return null;

    const { schedule, therapist, status, booking_code } = booking;

    const statusLabels = {
        'pending_payment': 'Menunggu Pembayaran',
        'pending_validation': 'Menunggu Validasi Admin',
        'confirmed': 'Jadwal Dikonfirmasi',
        'in_progress': 'Sesi Sedang Berlangsung',
    };

    const statusColors = {
        'pending_payment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        'pending_validation': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'in_progress': 'bg-red-500 text-white animate-pulse',
    };

    const formatGoogleCalDate = (date, time) => {
        return date.replace(/-/g, '') + 'T' + time.replace(/:/g, '');
    };

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sesi+Hipnoterapi+-+InDepth&dates=${formatGoogleCalDate(schedule.date, schedule.start_time)}/${formatGoogleCalDate(schedule.date, schedule.end_time)}&details=Sesi+Hipnoterapi+bersama+Terapis:+${therapist?.name || 'Akan diinfokan'}`;

    const isInProgress = status === 'in_progress';

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        // Handle format YYYY-MM-DD or YYYY-MM-DD HH:MM:SS
        const cleanDate = dateStr.includes(' ') ? dateStr.split(' ')[0] : (dateStr.includes('T') ? dateStr.split('T')[0] : dateStr);
        const d = new Date(cleanDate + 'T00:00:00');
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <GlassPanel className={`p-6 mb-8 relative overflow-hidden transition-all duration-500 ${isInProgress ? '!border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.15)]' : '!border-indigo-200/50 dark:!border-indigo-800/20'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-transparent pointer-events-none ${isInProgress ? 'from-red-500/10' : 'from-indigo-50/50 dark:from-indigo-900/10'}`} />
            {isInProgress && (
                <div className="absolute top-0 right-0 p-4">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
            )}

            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-bold text-lg ${isInProgress ? 'text-red-600 dark:text-red-400' : 'text-indigo-900 dark:text-indigo-300'}`}>
                            {isInProgress ? '🔴 Sesi Sedang Berlangsung' : 'Jadwal Aktif Anda'}
                        </h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur ${statusColors[status] || 'bg-slate-100 text-slate-800'}`}>
                            {statusLabels[status] || status}
                        </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p><strong className="text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-wider">Kode Booking:</strong> #{booking_code}</p>
                        <p><strong className="text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-wider">Jadwal:</strong> {formatDate(schedule.date)} ({schedule.start_time?.substring(0, 5) || '--:--'} WIB)</p>
                        <p><strong className="text-slate-900 dark:text-slate-200 uppercase text-[10px] tracking-wider">Terapis:</strong> {therapist?.name || schedule.therapist?.name || <span className="italic text-slate-400">Akan diinfokan...</span>}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                        href={route('bookings.show', booking.id)}
                        className={`inline-flex justify-center items-center px-6 py-3 text-sm font-black rounded-2xl transition-all shadow-sm border ${isInProgress
                            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700 shadow-red-600/20'
                            : 'bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border-indigo-200/50 dark:border-indigo-700/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/60'
                            }`}
                    >
                        {isInProgress ? 'MASUK KE RUANG SESI' : 'LIHAT DETAIL'}
                    </Link>
                    {!isInProgress && (
                        <a href={gcalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-wide">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Simpan Kalender
                        </a>
                    )}
                </div>
            </div>
        </GlassPanel>
    );
}

export default function Dashboard() {
    const { auth, screeningResult, profileProgress, canTakeScreening, daysUntilNextScreening, activeBooking, latestCompletedBooking, therapistUpcomingSessions, therapistActiveSessions, therapistPastSessions, therapistStats } = usePage().props;
    const user = auth.user;
    const roles = user.roles?.map(r => r.name) ?? [];

    const isAdmin = roles.some(r => ['admin', 'super_admin', 'cs'].includes(r));
    const isSuperAdmin = roles.includes('super_admin');
    const isTherapist = roles.includes('therapist');
    const isPatient = roles.includes('patient');
    const isSantaMaria = roles.includes('santa_maria');
    const isProfileComplete = profileProgress ? profileProgress.percentage === 100 : true;

    const hasScreening = !!screeningResult;
    const hasActiveBooking = !!activeBooking;

    const [showBookingBlocked, setShowBookingBlocked] = useState(false);

    const handleBookingClick = (e) => {
        if (hasActiveBooking) {
            e.preventDefault();
            setShowBookingBlocked(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">
                            Selamat datang, {user.name} 👋
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                            {isAdmin ? 'Panel Admin & CS' : isTherapist ? 'Panel Terapis' : 'Panel Pasien'}
                        </p>
                    </div>
                    {!!user.agreement_signed_at && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100/60 dark:bg-emerald-900/30 backdrop-blur text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-emerald-200/50 dark:border-emerald-800/20 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Verified Client
                        </span>
                    )}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="relative py-10 min-h-screen">
                {/* Liquid Glass Background Blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-400/[0.07] dark:bg-indigo-600/[0.04] blur-[100px] animate-blob" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-400/[0.05] dark:bg-emerald-600/[0.03] blur-[100px] animate-blob animation-delay-2000" />
                    <div className="absolute top-[30%] left-[40%] w-[25vw] h-[25vw] rounded-full bg-rose-400/[0.04] dark:bg-rose-600/[0.02] blur-[80px] animate-blob animation-delay-4000" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

                    {/* ============== ACTIVE BOOKING BLOCK ALERT ============== */}
                    {showBookingBlocked && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500/50 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl shadow-amber-500/10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-black text-amber-900 dark:text-amber-200 uppercase tracking-tight">Selesaikan Sesi Aktif</h3>
                                <p className="text-sm text-amber-800/80 dark:text-amber-400 font-medium mt-1">
                                    Anda belum bisa membuat jadwal baru karena masih memiliki sesi yang sedang berlangsung atau menunggu validasi. Selesaikan sesi Anda terlebih dahulu untuk melanjutkan.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowBookingBlocked(false)}
                                className="px-6 py-2 bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 dark:text-amber-300 rounded-xl font-bold text-xs uppercase transition-all"
                            >
                                Tutup
                            </button>
                        </motion.div>
                    )}

                    {/* ============== PAYMENT REMINDER ALERT ============== */}
                    {isPatient && activeBooking?.status === 'pending_payment' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="bg-[#1a0f14] border border-red-500/20 rounded-[2.5rem] p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 shadow-2xl shadow-red-900/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                {/* Icon */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl sm:rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-600/30 relative z-10">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center md:text-left z-10 w-full space-y-5">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight sm:leading-none tracking-tight mb-2">Konfirmasi Pembayaran Diperlukan!</h3>
                                        <p className="text-sm font-bold text-red-200/80 leading-relaxed">
                                            Segera selesaikan pembayaran untuk mengamankan slot Anda.
                                        </p>
                                    </div>

                                    {/* Schedule Details */}
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 text-left w-full shadow-inner">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-300/60 mb-1">Jadwal Sesi</p>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">
                                                {(() => {
                                                    if (!activeBooking.schedule?.date) return '-';
                                                    const rawDate = activeBooking.schedule.date;
                                                    // Strictly extract YYYY-MM-DD
                                                    const datePart = rawDate.match(/\d{4}-\d{2}-\d{2}/)?.[0];
                                                    if (!datePart) return rawDate;

                                                    const date = new Date(datePart + 'T00:00:00');
                                                    if (isNaN(date.getTime())) return rawDate;

                                                    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                                                })()}
                                            </p>
                                            <p className="text-xs font-bold text-red-300 mt-1 uppercase tracking-widest">
                                                {activeBooking.schedule?.start_time?.substring(0, 5)} - {activeBooking.schedule?.end_time?.substring(0, 5)} WIB
                                            </p>
                                        </div>
                                        {activeBooking.therapist && (
                                            <div className="flex-1 border-t sm:border-t-0 sm:border-l border-red-500/20 pt-3 sm:pt-0 sm:pl-6">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-300/60 mb-1">Terapis Praktisi</p>
                                                <p className="text-sm font-bold text-white uppercase tracking-tight truncate">{activeBooking.therapist.name}</p>
                                                <p className="text-xs font-bold text-red-300 mt-1 uppercase tracking-widest">
                                                    {activeBooking.package_type || 'REGULER'}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pt-3">
                                        <div className="text-center md:text-left">
                                            <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-1">
                                                Batas Waktu Pembayaran
                                            </p>
                                            <PaymentCountdown className="justify-center md:justify-start mt-0" scheduleDate={activeBooking.schedule?.date} startTime={activeBooking.schedule?.start_time} />
                                        </div>

                                        {/* Action */}
                                        <Link
                                            href={route('payments.create', activeBooking.id)}
                                            className="w-full md:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 active:scale-95 group-hover:scale-105"
                                        >
                                            Bayar Sekarang
                                            <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ============== PATIENT ONLY: Screening Banner ============== */}
                    {isPatient && (
                        <div className="space-y-6">
                            <ScreeningBanner
                                screeningResult={screeningResult}
                                canTakeScreening={canTakeScreening}
                                daysUntilNextScreening={daysUntilNextScreening}
                                isProfileComplete={isProfileComplete}
                            />

                            <ServiceFlowGuide
                                user={auth.user}
                                profileProgress={profileProgress}
                                activeBooking={activeBooking}
                            />

                            {hasScreening && (
                                <GlassPanel className="!border-blue-200/50 dark:!border-blue-800/30 p-5 mt-4 relative overflow-hidden flex items-start sm:items-center gap-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 to-indigo-50/10 dark:from-blue-900/10 dark:to-transparent pointer-events-none" />
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm relative z-10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div className="relative z-10 flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-blue-900 dark:text-blue-200 uppercase tracking-wide">Proteksi Extra Pasien</h4>
                                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mt-1 leading-relaxed">
                                            Anda mendapatkan proteksi layanan kematian selama terapi berlangsung sebesar potongan harga <strong>Rp 5.000.000</strong>.
                                        </p>
                                    </div>
                                </GlassPanel>
                            )}
                        </div>
                    )}

                    {/* ============== ADMIN / CS SECTION ============== */}
                    {isAdmin && (
                        <div className="space-y-10">


                            {/* Main Management Menus */}
                            <section>
                                <SectionLabel>Manajemen Sistem & Layanan</SectionLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <QuickCard
                                        href={route('admin.orders.index')}
                                        title="Manajemen Order"
                                        description="Mengelola Jadwal, Pasien dan Pembayaran"
                                        iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                        color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                    />
                                    <QuickCard
                                        href={route('admin.courses.index')}
                                        title="Manajemen Kelas"
                                        description="Kelola kelas online dan kurikulum"
                                        iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                                    />
                                    <QuickCard
                                        href={route('admin.finance.index')}
                                        title="Keuangan"
                                        description="Laporan, Pengeluaran & Kas Kecil"
                                        iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.62 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.62-1M12 17v1m2-9.5V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h2m4-3.5v3.5a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2h2"
                                        color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                    />
                                    <QuickCard
                                        href={route('admin.blog.index')}
                                        title="Blog & Artikel"
                                        description="Kelola publikasi konten edukasi"
                                        iconPath="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        color="bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
                                    />
                                    {isSuperAdmin && (
                                        <QuickCard
                                            href={route('admin.users.index')}
                                            title="Manajemen User"
                                            description="Atur hak akses terapis & pasien"
                                            iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"
                                            color="bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                                        />
                                    )}
                                    <QuickCard
                                        href={route('admin.pricing.vouchers.index')}
                                        title="Harga & Voucher"
                                        description="Kelola tarif layanan dan kode promo"
                                        iconPath="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                        color="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400"
                                    />
                                    <QuickCard
                                        href={route('admin.petty-cash.index')}
                                        title="Workflow Kas Kecil"
                                        description="Sistem Approval Dana & Belanja"
                                        iconPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                    />
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ============== SANTA MARIA SECTION ============== */}
                    {isSantaMaria && !isAdmin && (
                        <section>
                            <SectionLabel>Manajemen Otoritas Kas</SectionLabel>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <QuickCard
                                    href={route('admin.petty-cash.index')}
                                    title="Workflow Kas Kecil"
                                    description="Approval permohonan dana dan belanja"
                                    iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.62 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.407-2.62-1M12 17v1m2-9.5V7a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2h2m4-3.5v3.5a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2h2"
                                    color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                />
                                <QuickCard
                                    href={route('admin.finance.index')}
                                    title="Laporan Keuangan"
                                    description="Monitoring pemasukan dan pengeluaran"
                                    iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                />
                            </div>
                        </section>
                    )}

                    {/* ============== THERAPIST SECTION ============== */}
                    {isTherapist && (
                        <div className="space-y-8">
                            <section>
                                <SectionLabel>{isAdmin ? 'Statistik Perusahaan (Konsultasi & LMS)' : 'Statistik Saya'}</SectionLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <Link href={isAdmin ? route('admin.orders.index') : route('schedules.index')} className="block group">
                                        <GlassPanel className="p-6 hover:shadow-[0_12px_40px_rgba(99,102,241,0.06)] hover:border-indigo-200/50 dark:hover:border-indigo-500/20 transition-all">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{isAdmin ? 'Total Sesi Berhasil' : 'Total Sesi Selesai'}</p>
                                            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">{therapistStats?.total_sessions || 0}</p>
                                        </GlassPanel>
                                    </Link>
                                    <Link href={isAdmin ? route('admin.users.index') : route('schedules.index')} className="block group">
                                        <GlassPanel className="p-6 hover:shadow-[0_12px_40px_rgba(16,185,129,0.06)] hover:border-emerald-200/50 dark:hover:border-emerald-500/20 transition-all">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{isAdmin ? 'Total Pasien Terdaftar' : 'Total Pasien Unik'}</p>
                                            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">{therapistStats?.total_patients || 0}</p>
                                        </GlassPanel>
                                    </Link>
                                    <Link href={isAdmin ? route('admin.courses.index') : route('therapist.courses.index')} className="block group">
                                        <GlassPanel className="p-6 hover:shadow-[0_12px_40px_rgba(245,158,11,0.06)] hover:border-amber-200/50 dark:hover:border-amber-500/20 transition-all">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">{isAdmin ? 'Total Kelas Online' : 'Kelas Online Saya'}</p>
                                            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">{therapistStats?.active_courses || 0}</p>
                                        </GlassPanel>
                                    </Link>
                                </div>
                            </section>

                            {/* Stacked Status Bar (Admin Only) */}
                            {isAdmin && therapistStats?.stacked_status && (
                                <section>
                                    <SectionLabel>Komposisi Status Reservasi</SectionLabel>
                                    <GlassPanel className="p-8">
                                        <div className="flex h-10 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800/50">
                                            {(() => {
                                                const total = Object.values(therapistStats.stacked_status).reduce((a, b) => a + b, 0) || 1;
                                                const segments = [
                                                    { key: 'completed', color: 'bg-emerald-500', label: 'Selesai' },
                                                    { key: 'confirmed', color: 'bg-indigo-500', label: 'Dikonfirmasi' },
                                                    { key: 'pending', color: 'bg-amber-500', label: 'Menunggu' },
                                                    { key: 'cancelled', color: 'bg-rose-500', label: 'Batal/Exp' },
                                                ];
                                                return segments.map(seg => {
                                                    const val = therapistStats.stacked_status[seg.key] || 0;
                                                    const pct = (val / total) * 100;
                                                    if (pct === 0) return null;
                                                    return (
                                                        <div
                                                            key={seg.key}
                                                            style={{ width: `${pct}%` }}
                                                            className={`${seg.color} transition-all duration-1000 flex items-center justify-center text-[8px] font-black text-white uppercase tracking-tighter truncate px-1`}
                                                            title={`${seg.label}: ${val}`}
                                                        >
                                                            {pct > 10 ? seg.label : ''}
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                        <div className="flex flex-wrap gap-6 mt-6">
                                            {[
                                                { label: 'Selesai', color: 'bg-emerald-500', val: therapistStats.stacked_status.completed },
                                                { label: 'Dikonfirmasi', color: 'bg-indigo-500', val: therapistStats.stacked_status.confirmed },
                                                { label: 'Menunggu', color: 'bg-amber-500', val: therapistStats.stacked_status.pending },
                                                { label: 'Dibatalkan', color: 'bg-rose-500', val: therapistStats.stacked_status.cancelled },
                                            ].map(item => (
                                                <div key={item.label} className="flex items-center gap-2.5">
                                                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                                                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.label}: <span className="text-slate-900 dark:text-white">{item.val}</span></span>
                                                </div>
                                            ))}
                                        </div>
                                    </GlassPanel>
                                </section>
                            )}

                            {/* Ongoing Sessions */}
                            {therapistActiveSessions?.length > 0 && (
                                <section>
                                    <SectionLabel className="!text-red-400 dark:!text-red-500 flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                                        {isAdmin ? 'Sesi Terapi Berlangsung (Monitoring)' : 'Sesi Sedang Berlangsung'}
                                    </SectionLabel>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {therapistActiveSessions.map((booking) => (
                                            <GlassPanel key={booking.id} className="!border-red-200/50 dark:!border-red-800/20 p-6 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent dark:from-red-900/5 pointer-events-none" />
                                                <div className="relative flex justify-between items-start mb-4">
                                                    <div>
                                                        <p className="text-xs font-medium text-slate-500">Pasien</p>
                                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase">{booking.patient?.name}</h4>
                                                    </div>
                                                    <span className="px-3 py-1 bg-red-100/60 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full text-[10px] font-black animate-pulse backdrop-blur shadow-[0_0_12px_rgba(239,68,68,0.2)]">
                                                        ● LIVE
                                                    </span>
                                                </div>
                                                <div className="relative space-y-2 mb-6 text-sm text-slate-600 dark:text-slate-400">
                                                    <p><strong>Paket:</strong> {booking.package_type?.toUpperCase()}</p>
                                                    <p><strong>Terapis:</strong> {booking.therapist?.name || booking.schedule?.therapist?.name}</p>
                                                    <p><strong>Waktu Mulai:</strong> {new Date(booking.started_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                                                </div>
                                                <Link href={route('schedules.active-session', booking.id)} className={`relative w-full flex justify-center items-center py-3 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 ${isAdmin ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'}`}>
                                                    {isAdmin ? 'Masuk ke Detail Sesi' : 'Selesaikan Sesi & Input Data'}
                                                </Link>
                                            </GlassPanel>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">

                                    {/* ─── Upcoming Sessions — Premium Cards ─── */}
                                    <section>
                                        <SectionLabel>{isAdmin ? 'Seluruh Agenda Sesi Terdekat' : 'Agenda Sesi Terdekat'}</SectionLabel>
                                        {therapistUpcomingSessions?.length > 0 ? (
                                            <div className="space-y-3">
                                                {therapistUpcomingSessions.map((booking) => {
                                                    const sched = booking.schedule;
                                                    const dateObj = sched?.date ? new Date(sched.date) : null;
                                                    const dayName = dateObj?.toLocaleDateString('id-ID', { weekday: 'short' });
                                                    const dateStr = dateObj?.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                                                    const timeStr = sched?.start_time?.substring(0, 5);
                                                    const endStr = sched?.end_time?.substring(0, 5);
                                                    const packageColor = booking.package_type === 'vip'
                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/40'
                                                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40';

                                                    return (
                                                        <motion.div
                                                            key={booking.id}
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/70 dark:border-white/[0.06] rounded-2xl p-5 flex items-center gap-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                                        >
                                                            {/* Date Block */}
                                                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                                                <span className="text-[9px] font-black uppercase tracking-widest opacity-80">{dayName}</span>
                                                                <span className="text-2xl font-black leading-none">{dateObj?.getDate()}</span>
                                                                <span className="text-[9px] font-black opacity-70">{dateObj?.toLocaleDateString('id-ID', { month: 'short' })}</span>
                                                            </div>

                                                            {/* Info */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${packageColor}`}>
                                                                        {booking.package_type?.toUpperCase() || 'SESI'}
                                                                    </span>
                                                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
                                                                        🕐 {timeStr} – {endStr} WIB
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-xs font-black flex-shrink-0">
                                                                        {booking.patient?.name?.charAt(0).toUpperCase()}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{booking.patient?.name}</p>
                                                                        {isAdmin && <p className="text-[10px] text-gray-400 font-bold">Terapis: {booking.therapist?.name || sched?.therapist?.name}</p>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* CTA */}
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Mulai sesi terapi sekarang? Status akan berubah menjadi Sedang Berlangsung.')) {
                                                                        router.post(route('schedules.start', booking.id));
                                                                    }
                                                                }}
                                                                className="flex-shrink-0 px-5 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-800 active:scale-95 transition-all"
                                                            >
                                                                Mulai
                                                            </button>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <GlassPanel className="py-14 flex flex-col items-center justify-center text-center">
                                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Tidak ada sesi terjadwal</p>
                                                <p className="text-xs text-gray-400 mt-1">Tambah slot jadwal lewat menu Kelola Jadwal</p>
                                            </GlassPanel>
                                        )}
                                    </section>

                                    {/* ─── Past Sessions (Admin) ─── */}
                                    {isAdmin && (
                                        <section>
                                            <SectionLabel>Seluruh Riwayat Sesi Terakhir</SectionLabel>
                                            <div className="space-y-2">
                                                {therapistPastSessions?.length > 0 ? therapistPastSessions.map((booking) => (
                                                    <div key={booking.id} className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/70 dark:border-white/[0.06] rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xs font-black flex-shrink-0">
                                                            {booking.patient?.name?.charAt(0)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-black text-gray-900 dark:text-white truncate">{booking.patient?.name}</p>
                                                            <p className="text-[10px] font-bold text-gray-400">{booking.therapist?.name || booking.schedule?.therapist?.name} · {new Date(booking.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        </div>
                                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 rounded-full text-[9px] font-black uppercase tracking-widest flex-shrink-0">
                                                            {booking.completion_outcome || 'Selesai'}
                                                        </span>
                                                    </div>
                                                )) : (
                                                    <GlassPanel className="py-10 text-center">
                                                        <p className="text-sm text-gray-400 italic">Belum ada riwayat sesi.</p>
                                                    </GlassPanel>
                                                )}
                                            </div>
                                        </section>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <SectionLabel>{isAdmin ? 'Layanan Terapi & LMS' : 'Menu Terapis'}</SectionLabel>
                                        <div className="flex flex-col gap-4">
                                            <QuickCard
                                                href={route('schedules.index')}
                                                title="Kelola Jadwal"
                                                description="Atur slot waktu konsultasi"
                                                iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                color="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
                                            />
                                            <QuickCard
                                                href={route('profile.edit')}
                                                title="Update Bio"
                                                description="Edit profil publik Anda"
                                                iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                            />
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ============== PATIENT SECTION (menu + progress) ============== */}
                    {isPatient && (
                        <>
                            {activeBooking && <ActiveBookingCard booking={activeBooking} />}
                            {latestCompletedBooking && <LastSessionCard booking={latestCompletedBooking} />}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Menu cards */}
                                <section className="lg:col-span-2">
                                    <SectionLabel>Menu Pasien</SectionLabel>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <QuickCard
                                            href={route('bookings.create')}
                                            title="Buat Janji Baru"
                                            description="Pilih jadwal dan terapis yang tersedia"
                                            iconPath="M12 9v3m0 0v3m0-3h3m-3 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                                            disabled={!isProfileComplete}
                                            disabledText="Anda harus melengkapi profil hingga 100% sebelum membuat janji temu"
                                            onClick={handleBookingClick}
                                        />

                                        <QuickCard
                                            href={route('profile.documents')}
                                            title="Identitas Diri"
                                            description="Upload KTP dan isi kontak darurat"
                                            iconPath="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                            color="bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400"
                                        />
                                        <QuickCard
                                            href={route('screening.show')}
                                            title="Skrining Mandiri"
                                            description="Lakukan asesmen kesehatan mental Anda"
                                            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                            color="bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                                            disabled={!!activeBooking}
                                            disabledText="Selesaikan/batalkan sesi aktif untuk skrining ulang"
                                        />
                                        <QuickCard
                                            href={route('agreement.show')}
                                            title="Dokumen Persetujuan"
                                            description="Tanda tangan surat perjanjian layanan"
                                            iconPath="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            color="bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
                                        />
                                        <QuickCard
                                            href={route('vouchers.index')}
                                            title="Voucher Saya"
                                            description="Lihat & klaim voucher diskon yang tersedia"
                                            iconPath="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                                        />
                                        <QuickCard
                                            href={route('bookings.history')}
                                            title="Riwayat Sesi"
                                            description="Lihat jadwal lampau, catatan terapis, dan rekaman"
                                            iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                        />
                                        <QuickCard
                                            href={route('bookings.transactions')}
                                            title="Riwayat Transaksi"
                                            description="Pantau pembayaran dan upload bukti transfer"
                                            iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            color="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
                                        />
                                        <QuickCard
                                            href={route('affiliate.dashboard')}
                                            title="Afiliasi Saya"
                                            description="Lihat referral link dan komisi yang terkumpul"
                                            iconPath="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                            color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
                                        />
                                        <QuickCard
                                            href="/my-courses"
                                            title="Pelatihan Praktisi Saya"
                                            description="Menampilkan pelatihan yang dibeli"
                                            iconPath="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                        />
                                    </div>
                                </section>

                                {/* Profile Progress */}
                                <section className="lg:col-span-1">
                                    <SectionLabel>Profil Saya</SectionLabel>
                                    {profileProgress && <ProfileProgressCard profileProgress={profileProgress} />}
                                </section>
                            </div>
                        </>
                    )}

                    {/* ============== SHARED QUICK LINKS ============== */}
                    <section>
                        <SectionLabel>Akses Cepat</SectionLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <QuickCard
                                href="/blog"
                                title="Blog Artikel"
                                description="Baca artikel kesehatan mental terbaru"
                                iconPath="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                color="bg-gray-100 text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
                            />
                            <QuickCard
                                href={route('profile.edit')}
                                title="Edit Profil"
                                description="Update nama, email, dan kata sandi"
                                iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                color="bg-gray-100 text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
                            />
                        </div>
                    </section>

                </div>
            </div>
        </AuthenticatedLayout >
    );
}
