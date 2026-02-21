import React from 'react';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Navbar({ auth, active = 'home', isAuthPage = false, title = '' }) {
    const user = auth?.user ?? null;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/40 dark:border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex-shrink-0 flex items-center cursor-pointer group relative p-2" onClick={() => window.scrollTo(0, 0)}>
                        {/* Logo Background/Glow for visibility */}
                        <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-2xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                        {/* Logo — color for light mode, white for dark mode */}
                        <Link href="/">
                            <img
                                src="/images/logo-color.png"
                                alt="InDepth Mental Wellness"
                                className="h-12 w-auto object-contain block dark:hidden relative z-10"
                            />
                            <img
                                src="/images/logo-white.png"
                                alt="InDepth Mental Wellness"
                                className="h-12 w-auto object-contain hidden dark:block relative z-10"
                            />
                        </Link>
                    </div>

                    {!isAuthPage && (
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link
                                href="/"
                                className={`${active === 'home' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium'} transition-colors`}
                            >
                                Home
                            </Link>
                            <Link
                                href={route('methods.index')}
                                className={`${active === 'methods' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium'} transition-colors`}
                            >
                                Metode
                            </Link>
                            <Link
                                href={route('blog.index')}
                                className={`${active === 'blog' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium'} transition-colors`}
                            >
                                Artikel
                            </Link>
                            <Link
                                href={route('courses.index')}
                                className={`${active === 'courses' ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium'} transition-colors`}
                            >
                                E-Learning
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center space-x-4 relative z-[60]">
                        <ThemeToggle />
                        {!isAuthPage && (
                            user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 rounded-full font-semibold text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-offset-gray-950 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-black dark:text-white hover:text-gold-600 dark:hover:text-gold-400 font-bold px-4 py-2 transition-colors relative z-[60]"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-black hover:bg-gray-800 text-white font-bold px-6 py-2 transition-colors shadow-md relative z-[60]"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
