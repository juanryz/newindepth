import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function QuickCard({ href, title, description, iconPath, color }) {
    return (
        <Link href={href} className={`group flex gap-4 items-start p-6 bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
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

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const roles = user.roles?.map(r => r.name) ?? [];

    const isAdmin = roles.some(r => ['admin', 'super_admin', 'cs'].includes(r));
    const isSuperAdmin = roles.includes('super_admin');
    const isTherapist = roles.includes('therapist');
    const isPatient = roles.includes('patient');

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

                    {/* ============== ADMIN / CS SECTION ============== */}
                    {isAdmin && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Manajemen Admin
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                {/* SUPER ADMIN FEATURES */}
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

                    {/* ============== PATIENT SECTION ============== */}
                    {isPatient && (
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Menu Pasien
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <QuickCard
                                    href={route('bookings.create')}
                                    title="Buat Janji Baru"
                                    description="Pilih jadwal dan terapis yang tersedia"
                                    iconPath="M12 9v3m0 0v3m0-3h3m-3 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    color="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
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
