import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import AiChatPopup from '@/Components/AiChatPopup';

export default function Navbar({ auth, active = 'home', isAuthPage = false, title = '' }) {
    const user = auth?.user ?? null;
    const [isChatOpen, setIsChatOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/', key: 'home' },
        { name: 'Metode', href: route('methods.index'), key: 'methods' },
        { name: 'Artikel', href: route('blog.index'), key: 'blog' },
        { name: 'E-Learning', href: route('courses.index'), key: 'courses' }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-gray-800/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex-shrink-0 flex items-center cursor-pointer group relative z-50" onClick={() => window.scrollTo(0, 0)}>
                        <Link href="/">
                            <img
                                src="/images/logo-color.png"
                                alt="InDepth"
                                className="h-10 w-auto object-contain block dark:hidden relative z-10"
                            />
                            <img
                                src="/images/logo-white.png"
                                alt="InDepth"
                                className="h-10 w-auto object-contain hidden dark:block relative z-10"
                            />
                        </Link>
                    </div>

                    {!isAuthPage && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1 bg-white/10 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === item.key
                                        ? 'bg-white dark:bg-gray-800 text-gold-600 dark:text-gold-400 shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10`}
                            >
                                Contact Us
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-3 relative z-50">
                        <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
                            <ThemeToggle />
                        </div>
                        {!isAuthPage && (
                            user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2 rounded-2xl text-xs font-bold text-gray-900 bg-gradient-to-br from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 shadow-[0_4px_12px_rgba(208,170,33,0.3)] hover:shadow-[0_6px_18px_rgba(208,170,33,0.4)] hover:-translate-y-0.5 transition-all duration-300 border border-gold-300/40"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 text-xs font-bold px-4 py-2 transition-colors rounded-2xl hover:bg-gold-500/10"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-gray-900 text-xs font-bold px-5 py-2 transition-all duration-300 shadow-[0_4px_12px_rgba(208,170,33,0.3)] hover:shadow-[0_6px_18px_rgba(208,170,33,0.4)] hover:-translate-y-0.5 border border-gold-300/40"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <AiChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </nav>
    );
}
