import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function QuickCard({ href, title, description, iconPath, color, disabled = false }) {
    const cls = `group flex gap-4 items-start p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm transition-all duration-200 ${disabled
        ? 'opacity-50 cursor-not-allowed pointer-events-none select-none'
        : 'hover:shadow-lg hover:-translate-y-0.5'
        }`;

    if (disabled) {
        return (
            <div className={cls} title="Selesaikan screening terlebih dahulu">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                        </svg>
                        Perlu screening dulu
                    </span>
                </div>
            </div>
        );
    }

    return (
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
                        <p className="font-bold text-amber-900 dark:text-amber-200">Anda Belum Melakukan Screening</p>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
                            Selesaikan screening kesehatan mental terlebih dahulu agar Anda bisa membeli paket dan membuat janji konsultasi.
                        </p>
                    </div>
                    <Link
                        href={route('screening.show')}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Mulai Screening
                    </Link>
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
                        {screeningResult.is_high_risk && (
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
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed" title="Screening ulang dapat dilakukan setiap 15 hari">
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

function ProfileProgressCard({ profileProgress }) {
    const { percentage, fields, completed, total } = profileProgress;

    const barColor = percentage < 40
        ? 'bg-red-500'
        : percentage < 80
            ? 'bg-amber-500'
            : 'bg-green-500';

    return (
        <div className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900 dark:text-white">Kelengkapan Profil</h3>
                <span className={`text-lg font-extrabold ${percentage === 100 ? 'text-green-500' : 'text-gray-700 dark:text-gray-300'}`}>
                    {percentage}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Field list */}
            <ul className="space-y-2">
                {Object.entries(fields).map(([key, { label, filled }]) => (
                    <li key={key} className="flex items-center gap-2 text-sm">
                        {filled ? (
                            <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        ) : (
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        )}
                        <span className={filled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                            {label}
                        </span>
                    </li>
                ))}
            </ul>

            {percentage < 100 && (
                <Link
                    href={route('profile.edit')}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-indigo-200 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Lengkapi Profil
                </Link>
            )}
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
                        <p><strong className="text-gray-900 dark:text-gray-200">Jadwal:</strong> {new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} ({schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)} WIB)</p>
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
    const { auth, screeningResult, profileProgress, canTakeScreening, daysUntilNextScreening, activeBooking } = usePage().props;
    const user = auth.user;
    const roles = user.roles?.map(r => r.name) ?? [];

    const isAdmin = roles.some(r => ['admin', 'super_admin', 'cs'].includes(r));
    const isSuperAdmin = roles.includes('super_admin');
    const isTherapist = roles.includes('therapist');
    const isPatient = roles.includes('patient');

    const hasScreening = !!screeningResult;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Selamat datang, {user.name} 👋
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
                        <ScreeningBanner
                            screeningResult={screeningResult}
                            canTakeScreening={canTakeScreening}
                            daysUntilNextScreening={daysUntilNextScreening}
                        />
                    )}

                    {/* ============== ADMIN / CS SECTION ============== */}
                    {isAdmin && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Manajemen Admin
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <QuickCard
                                    href={route('bookings.index')}
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

                    {/* ============== THERAPIST SECTION ============== */}
                    {isTherapist && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Panel Terapis
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <QuickCard
                                    href={route('schedules.index')}
                                    title="Jadwal Saya"
                                    description="Atur slot waktu dan sesi yang tersedia"
                                    iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    color="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
                                />
                            </div>
                        </section>
                    )}

                    {/* ============== PATIENT SECTION (menu + progress) ============== */}
                    {isPatient && (
                        <>
                            {activeBooking && <ActiveBookingCard booking={activeBooking} />}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Menu cards */}
                                <section className="lg:col-span-2">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                        Menu Pasien
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <QuickCard
                                            href={route('agreement.show')}
                                            title="Buat Janji Baru"
                                            description="Pilih jadwal dan terapis yang tersedia"
                                            iconPath="M12 9v3m0 0v3m0-3h3m-3 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            color="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                                            disabled={!hasScreening}
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
                                            href={route('courses.index')}
                                            title="E-Learning"
                                            description="Akses kelas online dan video pembelajaran"
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
