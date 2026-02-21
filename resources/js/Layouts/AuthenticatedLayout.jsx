import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ThemeToggle from '@/Components/ThemeToggle';
import NotificationBell from '@/Components/NotificationBell';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const roles = user?.roles?.map(r => r.name) ?? [];
    const isAdmin = roles.some(r => ['admin', 'super_admin', 'cs'].includes(r));
    const isSuperAdmin = roles.includes('super_admin');
    const isTherapist = roles.includes('therapist');
    const isPatient = roles.includes('patient');

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-500 overflow-x-hidden relative">

            {/* Global Background Ambient Light (Apple Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-gold-200/20 dark:bg-gold-800/5 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '4s' }}></div>
                <div className="absolute bottom-[-25%] left-[5%] w-[80vw] h-[80vw] rounded-full bg-rose-100/20 dark:bg-rose-900/10 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '8s' }}></div>
            </div>

            <nav className="relative z-50 border-b border-white/40 dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.03] backdrop-blur-[60px] backdrop-saturate-[1.8] transition-all duration-500">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="inline-flex items-center group relative p-1">
                                    <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                                    <img
                                        src="/images/logo-color.png"
                                        alt="InDepth Mental Wellness"
                                        className="h-10 w-auto object-contain block dark:hidden relative z-10"
                                    />
                                    <img
                                        src="/images/logo-white.png"
                                        alt="InDepth Mental Wellness"
                                        className="h-10 w-auto object-contain hidden dark:block relative z-10"
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
                                                {user.name}

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
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {user.email}
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
                        {!route().current('dashboard') && !route().current('admin.blog.create') && !route().current('admin.blog.edit') && !route().current('courses.index') && !route().current('courses.show') && !route().current('lessons.show') && (
                            <Link href={route('dashboard')} className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors mb-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                Kembali ke Dashboard
                            </Link>
                        )}
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-30">{children}</main>
        </div>
    );
}
