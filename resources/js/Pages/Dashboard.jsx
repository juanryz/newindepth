import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import ProfileProgressCard from '@/Components/ProfileProgressCard';
import ServiceFlowGuide from '@/Components/ServiceFlowGuide';

function QuickCard({ href, title, description, iconPath, color, disabled = false, disabledText = 'Lengkapi profil & screening' }) {
    const cls = `group flex gap-4 items-start p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all duration-200 h-full ${disabled
        ? 'opacity-50 cursor-not-allowed pointer-events-none select-none'
        : 'hover:shadow-lg hover:-translate-y-0.5'
        }`;

    if (disabled) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cls}
                title="Lengkapi profil dan screening terlebih dahulu"
            >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {disabledText}
                    </span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full"
        >
            <Link href={href} className={cls}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
                </div>
            </Link>
        </motion.div>
    );
}

/* Severity label → colour mapping */
const severityColors = {
    'Ringan': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Sedang': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Berat Akut': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    'Berat Kronis': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    'High Risk': 'bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-200',
};

function ScreeningBanner({ screeningResult, canTakeScreening, daysUntilNextScreening }) {
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

    if (!screeningResult) {
        /* Belum screening */
        return (
            <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700/50 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-800/40 flex items-center justify-center">
                        <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-amber-900 dark:text-amber-200">Anda Belum Melengkapi Profil</p>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
                            Selesaikan screening kesehatan mental terlebih dahulu agar Anda bisa membeli paket dan membuat janji konsultasi.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    /* Sudah screening */
    const severityClass = severityColors[screeningResult.severity_label] ?? 'bg-indigo-100 text-indigo-800';
    const packageLabel = screeningResult.recommended_package
        ? (screeningResult.recommended_package === 'vip' ? 'VIP' : screeningResult.recommended_package.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()))
        : null;

    return (
        <div className="rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700/50 p-5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-800/40 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-green-900 dark:text-green-200">Screening Selesai</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {screeningResult.severity_label && (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${severityClass}`}>
                                Tingkat: {screeningResult.severity_label}
                            </span>
                        )}
                        {packageLabel && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                                Rekomendasi: {packageLabel}
                            </span>
                        )}
                        {screeningResult.is_high_risk && screeningResult.severity_label !== 'High Risk' && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                                ⚠️ High Risk
                            </span>
                        )}
                    </div>
                    {screeningResult.ai_summary && (
                        <div className="mt-3 border-l-2 border-green-300 dark:border-green-700 pl-3">
                            <p className={`text-sm text-green-800 dark:text-green-300 leading-relaxed ${!isSummaryExpanded ? 'line-clamp-3' : ''}`}>
                                {screeningResult.ai_summary}
                            </p>
                            {screeningResult.ai_summary.length > 200 && (
                                <button
                                    onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                                    className="text-xs font-bold text-green-700 dark:text-green-400 mt-1 hover:text-green-900 dark:hover:text-green-200 transition-colors focus:outline-none"
                                >
                                    {isSummaryExpanded ? 'Sembunyikan' : 'Baca selengkapnya...'}
                                </button>
                            )}
                        </div>
                    )}
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
                        <div className="text-right">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Screening ulang dalam {daysUntilNextScreening} hari
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


function LastSessionCard({ booking }) {
    if (!booking) return null;

    const { schedule, therapist, recording_link, patient_visible_notes } = booking;

    return (
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 shadow-sm overflow-hidden mb-8">
            <div className="bg-emerald-500/10 px-6 py-3 border-b border-emerald-100 dark:border-emerald-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">Sesi Terakhir Anda</h3>
                </div>
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                    {new Date(schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Catatan & Homework</p>
                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed italic">
                                "{patient_visible_notes || 'Terapis Anda tidak meninggalkan catatan khusus untuk sesi ini. Tetap semangat melakukan yang terbaik!'}"
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Rekaman Sesi</p>
                            {recording_link ? (
                                <a
                                    href={recording_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30 hover:bg-indigo-100 transition-all"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Tonton Ulang Sesi</p>
                                        <p className="text-[10px] text-indigo-600 truncate">Klik untuk membuka link YouTube</p>
                                    </div>
                                </a>
                            ) : (
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-gray-200 dark:border-gray-700/50 text-center">
                                    <p className="text-xs text-gray-500 italic">Rekaman tidak tersedia untuk sesi ini.</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                            <span className="font-bold">Terapis:</span> {therapist?.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActiveBookingCard({ booking }) {
    if (!booking) return null;

    const { schedule, therapist, status, booking_code } = booking;

    const statusLabels = {
        'pending_payment': 'Menunggu Pembayaran',
        'pending_validation': 'Menunggu Validasi Admin',
        'confirmed': 'Jadwal Dikonfirmasi',
    };

    const statusColors = {
        'pending_payment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        'pending_validation': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };

    const formatGoogleCalDate = (date, time) => {
        return date.replace(/-/g, '') + 'T' + time.replace(/:/g, '');
    };

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sesi+Hipnoterapi+-+InDepth&dates=${formatGoogleCalDate(schedule.date, schedule.start_time)}/${formatGoogleCalDate(schedule.date, schedule.end_time)}&details=Sesi+Hipnoterapi+bersama+Terapis:+${therapist?.name || 'Akan diinfokan'}`;

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-800 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 shadow-sm p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-300">Jadwal Aktif Anda</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
                            {statusLabels[status] || status}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p><strong className="text-gray-900 dark:text-gray-200">Kode Booking:</strong> #{booking_code}</p>
                        <p><strong className="text-gray-900 dark:text-gray-200">Jadwal:</strong> {new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} ({schedule.start_time?.substring(0, 5) || '--:--'} - {schedule.end_time?.substring(0, 5) || '--:--'} WIB)</p>
                        <p><strong className="text-gray-900 dark:text-gray-200">Terapis:</strong> {therapist?.name || <span className="italic text-gray-500">Akan diinfokan...</span>}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                        href={route('bookings.show', booking.id)}
                        className="inline-flex justify-center items-center px-4 py-2 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors shadow-sm"
                    >
                        Lihat Detail
                    </Link>
                    <a
                        href={gcalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Tambahkan ke Kalender
                    </a>
                </div>
            </div>
        </div>
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
    const isProfileComplete = profileProgress ? profileProgress.percentage === 100 : true;

    const hasScreening = !!screeningResult;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Selamat datang, {user.name} 👋
                        {!!user.agreement_signed_at && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200 dark:border-emerald-800/30 shadow-sm">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verified Client
                            </span>
                        )}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isAdmin ? 'Panel Admin & CS' : isTherapist ? 'Panel Terapis' : 'Panel Pasien'}
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* ============== PATIENT ONLY: Screening Banner ============== */}
                    {isPatient && (
                        <div className="space-y-6">
                            <ScreeningBanner
                                screeningResult={screeningResult}
                                canTakeScreening={canTakeScreening}
                                daysUntilNextScreening={daysUntilNextScreening}
                            />

                            <ServiceFlowGuide
                                user={auth.user}
                                profileProgress={profileProgress}
                                activeBooking={activeBooking}
                            />
                        </div>
                    )}

                    {/* ============== ADMIN / CS SECTION ============== */}
                    {isAdmin && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Manajemen Admin
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <QuickCard
                                    href={route('admin.bookings.index')}
                                    title="Booking Pasien"
                                    description="Assign terapis dan kelola appointment"
                                    iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                />
                                <QuickCard
                                    href={route('admin.transactions.index')}
                                    title="Validasi Pembayaran"
                                    description="Approve atau tolak bukti transfer pasien"
                                    iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    color="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                                />
                                <QuickCard
                                    href={route('admin.reports.index')}
                                    title="Laporan Keuangan"
                                    description="Ringkasan pemasukan, pengeluaran & laba bersih"
                                    iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                />
                                <QuickCard
                                    href={route('admin.expenses.index')}
                                    title="Kelola Pengeluaran"
                                    description="Catat biaya operasional, gaji, dan sewa"
                                    iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    color="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                                />
                                <QuickCard
                                    href={route('admin.blog.index')}
                                    title="Blog & Artikel"
                                    description="Tulis dan kelola konten artikel klinik"
                                    iconPath="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    color="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
                                />
                                <QuickCard
                                    href={route('admin.schedules.index')}
                                    title="Manajemen Jadwal"
                                    description="Atur slot waktu dan sesi terapis secara global"
                                    iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    color="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
                                />
                                {isSuperAdmin && (
                                    <>
                                        <QuickCard
                                            href={route('admin.users.index')}
                                            title="Manajemen User"
                                            description="Kelola akun, akses, dan data pengguna"
                                            iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                            color="bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
                                        />
                                        <QuickCard
                                            href={route('admin.roles.index')}
                                            title="Manajemen Roles"
                                            description="Atur peran dan hak akses sistem"
                                            iconPath="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            color="bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400"
                                        />
                                    </>
                                )}
                                <QuickCard
                                    href={route('admin.courses.index')}
                                    title="E-Learning (Admin)"
                                    description="Buat dan kelola materi kelas online"
                                    iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                />
                                <QuickCard
                                    href={route('admin.pricing.vouchers.index')}
                                    title="Manajemen Harga"
                                    description="Kelola voucher diskon dan promo untuk pasien"
                                    iconPath="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                                />
                                {!isSuperAdmin && (
                                    <QuickCard
                                        href={route('affiliate.dashboard')}
                                        title="Komisi Afiliasi"
                                        description="Pantau komisi dan referral yang berjalan"
                                        iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                        color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
                                    />
                                )}
                            </div>
                        </section>
                    )}

                    {/* ============== THERAPIST SECTION (Also visible to Admin) ============== */}
                    {(isTherapist || isAdmin) && (
                        <div className="space-y-8">
                            {/* Therapist Stats */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                    {isAdmin ? 'Statistik Perusahaan (Konsultasi & LMS)' : 'Statistik Saya'}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isAdmin ? 'Total Sesi Berhasil' : 'Total Sesi Selesai'}</p>
                                        <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{therapistStats?.total_sessions || 0}</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isAdmin ? 'Total Pasien Terdaftar' : 'Total Pasien Unik'}</p>
                                        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{therapistStats?.total_patients || 0}</p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isAdmin ? 'Total Kelas Online' : 'Kelas Online Saya'}</p>
                                        <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{therapistStats?.active_courses || 0}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Ongoing Sessions */}
                            {therapistActiveSessions?.length > 0 && (
                                <section>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 mb-4 flex items-center gap-2">
                                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                                        {isAdmin ? 'Sesi Terapi Sedang Berlangsung (Monitoring)' : 'Sesi Sedang Berlangsung'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {therapistActiveSessions.map((booking) => (
                                            <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-red-100 dark:border-red-900/30 p-6 shadow-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-500">Pasien</p>
                                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase">{booking.patient?.name}</h4>
                                                    </div>
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 rounded-full text-xs font-bold animate-pulse">
                                                        LIVE
                                                    </span>
                                                </div>
                                                <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                                                    <p><strong>Paket:</strong> {booking.package_type?.toUpperCase()}</p>
                                                    <p><strong>Terapis:</strong> {booking.schedule?.therapist?.name}</p>
                                                    <p><strong>Waktu Mulai:</strong> {new Date(booking.started_at).toLocaleTimeString('id-id', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                                                </div>
                                                <Link
                                                    href={route('schedules.active-session', booking.id)}
                                                    className={`w-full flex justify-center items-center py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-lg ${isAdmin ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                                >
                                                    {isAdmin ? 'Masuk ke Detail Sesi' : 'Selesaikan Sesi & Input Data'}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Upcoming Sessions */}
                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                            {isAdmin ? 'Seluruh Agenda Sesi Terdekat' : 'Agenda Sesi Terdekat'}
                                        </h3>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2 overflow-hidden shadow-sm">
                                            <div className="overflow-x-auto max-h-[320px] overflow-y-auto custom-scrollbar">
                                                <table className="w-full text-left">
                                                    <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm">
                                                        <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-50 dark:border-gray-700">
                                                            <th className="px-4 py-3">Waktu</th>
                                                            <th className="px-4 py-3">Pasien</th>
                                                            {isAdmin && <th className="px-4 py-3">Terapis</th>}
                                                            <th className="px-4 py-3 text-right">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                                        {therapistUpcomingSessions?.length > 0 ? (
                                                            therapistUpcomingSessions.map((booking) => (
                                                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                                    <td className="px-4 py-4">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                                                {new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                                            </span>
                                                                            <span className="text-xs text-gray-500">
                                                                                {booking.schedule.start_time.substring(0, 5)} WIB
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                                                                                {booking.patient?.name?.charAt(0)}
                                                                            </div>
                                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{booking.patient?.name}</span>
                                                                        </div>
                                                                    </td>
                                                                    {isAdmin && (
                                                                        <td className="px-4 py-4">
                                                                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{booking.schedule?.therapist?.name}</span>
                                                                        </td>
                                                                    )}
                                                                    <td className="px-4 py-4 text-right">
                                                                        <Link
                                                                            href={route('schedules.active-session', booking.id)}
                                                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                                        >
                                                                            Mulai Sesi
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500 italic">
                                                                    Belum ada agenda sesi.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Past Sessions - Patient History */}
                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                            {isAdmin ? 'Seluruh Riwayat Sesi Terakhir' : 'Riwayat Pasien Terakhir'}
                                        </h3>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2 overflow-hidden shadow-sm">
                                            <div className="overflow-x-auto max-h-[320px] overflow-y-auto custom-scrollbar">
                                                <table className="w-full text-left">
                                                    <thead className="sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-sm">
                                                        <tr className="text-xs font-bold text-gray-400 uppercase border-b border-gray-50 dark:border-gray-700">
                                                            <th className="px-4 py-3">Tanggal</th>
                                                            <th className="px-4 py-3">Pasien</th>
                                                            {isAdmin && <th className="px-4 py-3">Terapis</th>}
                                                            <th className="px-4 py-3">Hasil</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                                        {therapistPastSessions?.length > 0 ? (
                                                            therapistPastSessions.map((booking) => (
                                                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                                                    <td className="px-4 py-4">
                                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                            {new Date(booking.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{booking.patient?.name}</span>
                                                                        </div>
                                                                    </td>
                                                                    {isAdmin && (
                                                                        <td className="px-4 py-4">
                                                                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{booking.schedule?.therapist?.name}</span>
                                                                        </td>
                                                                    )}
                                                                    <td className="px-4 py-4">
                                                                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 rounded-lg text-[10px] font-bold">
                                                                            {booking.completion_outcome || 'Selesai'}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="px-4 py-8 text-center text-sm text-gray-500 italic">
                                                                    Belum ada riwayat sesi.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                            {isAdmin ? 'Layanan Terapi & LMS' : 'Menu Terapis'}
                                        </h3>
                                        <div className="flex flex-col gap-4">
                                            <QuickCard
                                                href={route('schedules.index')}
                                                title="Kelola Jadwal"
                                                description="Atur slot waktu konsultasi"
                                                iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                color="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
                                            />
                                            <QuickCard
                                                href={route('therapist.courses.index')}
                                                title="Buat Kelas Baru"
                                                description="Buat dan kelola materi e-learning"
                                                iconPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                color="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
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
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                        Menu Pasien
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <QuickCard
                                            href={route('bookings.create')}
                                            title="Buat Janji Baru"
                                            description="Pilih jadwal dan terapis yang tersedia"
                                            iconPath="M12 9v3m0 0v3m0-3h3m-3 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                                            disabled={!isProfileComplete}
                                            disabledText="Anda harus melengkapi profil hingga 100% sebelum membuat janji temu"
                                        />
                                        <QuickCard
                                            href={route('screening.show')}
                                            title="Skrining Kesehatan"
                                            description="Isi form analisa kesehatan awal"
                                            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                                        />
                                        <QuickCard
                                            href={route('profile.documents')}
                                            title="Identitas Diri"
                                            description="Upload KTP dan isi kontak darurat"
                                            iconPath="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                            color="bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400"
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
                                            href={route('courses.my')}
                                            title="Pelatihan Praktisi Saya"
                                            description="Menampilkan pelatihan yang dibeli"
                                            iconPath="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                        />
                                    </div>
                                </section>

                                {/* Profile Progress */}
                                <section className="lg:col-span-1">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                        Profil Saya
                                    </h3>
                                    {profileProgress && <ProfileProgressCard profileProgress={profileProgress} />}
                                </section>
                            </div>
                        </>
                    )}

                    {/* ============== SHARED QUICK LINKS ============== */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                            Akses Cepat
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <QuickCard
                                href={route('blog.index')}
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
        </AuthenticatedLayout>
    );
}
