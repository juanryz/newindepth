import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ThemeToggle from '@/Components/ThemeToggle';
import NotificationBell from '@/Components/NotificationBell';
import LiquidBackground from '@/Components/LiquidBackground';

export default function AuthenticatedLayout({ header, children }) {
    const page = usePage();
    const user = page.props.auth?.user;
    const flash = page.props.flash ?? {};
    const roles = user?.roles ?? [];
    const isAdmin = roles.some(r => typeof r === 'string' && ['admin', 'super_admin', 'cs', 'santa_maria'].includes(r.toLowerCase()));
    const isSuperAdmin = roles.some(r => typeof r === 'string' && r.toLowerCase() === 'super_admin');
    const isTherapist = roles.some(r => typeof r === 'string' && r.toLowerCase() === 'therapist');
    const isPatient = roles.some(r => typeof r === 'string' && r.toLowerCase() === 'patient');

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Flash toast state
    const [flashMsg, setFlashMsg] = useState(null);
    const [flashType, setFlashType] = useState('success');

    useEffect(() => {
        if (flash.success) { setFlashMsg(flash.success); setFlashType('success'); }
        else if (flash.error) { setFlashMsg(flash.error); setFlashType('error'); }
        else { setFlashMsg(null); return; }
        const t = setTimeout(() => setFlashMsg(null), 5500);
        return () => clearTimeout(t);
    }, [flash.success, flash.error]);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-500 overflow-x-hidden relative">

            {/* Premium Liquid Background */}
            <LiquidBackground />

            <nav className="relative z-50 border-b border-white/40 dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.03] backdrop-blur-[60px] backdrop-saturate-[1.8] transition-all duration-500">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-24 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="inline-flex items-center group relative p-1">
                                    <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                                    <img
                                        src="/images/Logo-Indepth-Lingkaran-hitam.png"
                                        alt="InDepth Mental Wellness"
                                        className="h-20 w-auto object-contain relative z-10"
                                    />
                                </Link>
                            </div>

                            {/* No menu links — Dashboard hub handles navigation */}
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">

                            <div className="mr-2 flex items-center gap-2">
                                <NotificationBell />
                                <ThemeToggle />
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white/50 px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:text-gold-600 focus:outline-none dark:bg-gray-800/50 dark:text-gray-300 dark:hover:text-gold-400 backdrop-blur-md"
                                            >
                                                {user?.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden gap-2">
                            <NotificationBell />
                            <ThemeToggle />
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition duration-150 ease-in-out hover:bg-gray-200/50 hover:text-gray-700 focus:bg-gray-200/50 focus:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 dark:focus:bg-gray-800/50 dark:focus:text-gray-300 backdrop-blur-md"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden border-t border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/40 pb-1 pt-4 dark:border-gray-700/50">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user?.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {user?.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="relative z-40 border-b border-white/20 dark:border-gray-800/30 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {![
                            'dashboard', 'admin.blog.create', 'admin.blog.edit', 'admin.schedules.show',
                            'agreement.patient', 'agreement.show', 'schedules.patient-detail', 'affiliate.agreement.show',
                            'admin.roles.create', 'admin.roles.edit', 'admin.users.create', 'admin.users.edit',
                            'admin.group-bookings.index', 'admin.group-bookings.show', 'admin.group-bookings.create',
                            'admin.users.create-offline', 'admin.group-bookings.members.add', 'admin.group-bookings.edit'
                        ].some(r => route().current(r)) && (
                            <Link
                                href={
                                    route().current('bookings.show') ? route('dashboard') :
                                        route().current('admin.users.show') ? route('admin.users.index') :
                                            route('dashboard')
                                }
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors mb-4"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                {route().current('bookings.show') ? 'Kembali ke Dashboard' :
                                    route().current('admin.users.show') ? 'Kembali ke Manajemen User' :
                                        'Kembali ke Dashboard'}
                            </Link>
                        )}
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-30">{children}</main>

            {/* ====== FLASH TOAST ====== */}
            {flashMsg && (
                <div
                    className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold backdrop-blur-xl border animate-in slide-in-from-bottom-4 duration-300 max-w-[90vw] ${flashType === 'success'
                        ? 'bg-emerald-50/95 dark:bg-emerald-900/90 border-emerald-200 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-50/95 dark:bg-red-900/90 border-red-200 dark:border-red-700/60 text-red-800 dark:text-red-200'
                        }`}
                    role="alert"
                >
                    {flashType === 'success'
                        ? <svg className="w-5 h-5 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        : <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    }
                    <span>{flashMsg}</span>
                    <button onClick={() => setFlashMsg(null)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
