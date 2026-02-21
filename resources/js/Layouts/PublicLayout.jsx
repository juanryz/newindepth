import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

/**
 * PublicLayout — layout untuk halaman publik (bisa diakses tamu & user login).
 * Jika user login: tampilkan nama + dropdown logout.
 * Jika tamu: tampilkan tombol Masuk & Daftar.
 */
export default function PublicLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? null;

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">

            {/* Ambient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/40 dark:border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center group relative p-1">
                            <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                            <img src="/images/logo-color.png" alt="InDepth Mental Wellness" className="h-10 w-auto object-contain block dark:hidden relative z-10" />
                            <img src="/images/logo-white.png" alt="InDepth Mental Wellness" className="h-10 w-auto object-contain hidden dark:block relative z-10" />
                        </Link>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route('dashboard')}
                                        className="px-5 py-2 rounded-full font-semibold text-sm text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all shadow-sm"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-4 py-2 transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-5 py-2 text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-md"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="relative z-10 pt-16">
                {children}
            </main>
        </div>
    );
}
