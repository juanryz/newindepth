import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import AiChatPopup from '@/Components/AiChatPopup';

export default function Navbar({ auth, active = 'home', isAuthPage = false, title = '' }) {
    const user = auth?.user ?? null;
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getNavLinks = () => {
        try {
            return [
                { name: 'Home', href: '/', key: 'home' },
                { name: 'Metode', href: '/metode', key: 'methods' },
                { name: 'Artikel', href: '/blog', key: 'blog' },
                { name: 'E-Learning', href: '/courses', key: 'courses' }
            ];
        } catch (e) {
            return [
                { name: 'Home', href: '/', key: 'home' },
                { name: 'Metode', href: '/metode', key: 'methods' },
                { name: 'Artikel', href: '/blog', key: 'blog' },
                { name: 'E-Learning', href: '/courses', key: 'courses' }
            ];
        }
    };
    const navLinks = getNavLinks();

    // Close mobile menu on route change / ESC key
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md md:backdrop-blur-xl border-b border-white/20 dark:border-gray-800/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24 relative">

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center cursor-pointer group relative z-50" onClick={() => window.scrollTo(0, 0)}>
                            <Link href="/">
                                <img src="/images/logo-color.png" alt="InDepth" width="160" height="80" className="h-20 w-auto object-contain block dark:hidden relative z-10" />
                                <img src="/images/logo-white.png" alt="InDepth" width="160" height="80" className="h-20 w-auto object-contain hidden dark:block relative z-10" />
                            </Link>
                        </div>

                        {/* Desktop nav links (centered) */}
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
                                    className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10"
                                >
                                    Contact Us
                                </button>
                            </div>
                        )}

                        {/* Right side: ThemeToggle + auth buttons + hamburger */}
                        <div className="flex items-center space-x-2 relative z-50">
                            <div className="scale-90 opacity-80 hover:opacity-100 transition-opacity">
                                <ThemeToggle />
                            </div>

                            {/* Desktop auth buttons */}
                            {!isAuthPage && (
                                <div className="hidden md:flex items-center gap-2">
                                    {user ? (
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-2xl text-white bg-gold-600 hover:bg-gold-500 shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.4)] transition-all"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-center flex-1"
                                            >
                                                Masuk
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="px-5 py-2.5 text-sm font-bold text-white bg-gold-600 hover:bg-gold-500 border border-transparent rounded-2xl shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.4)] transition-all text-center flex-1"
                                            >
                                                Daftar
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Hamburger button (mobile only) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all duration-300"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <div className="w-5 h-5 flex flex-col justify-center gap-1.5 overflow-hidden">
                                    <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                    <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
                                    <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <div
                    className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                >
                    <div className="bg-white/60 dark:bg-gray-900/80 backdrop-blur-2xl border-t border-white/20 dark:border-gray-700/30 px-4 pb-6 pt-4 space-y-1">

                        {/* Nav Links */}
                        {navLinks.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${active === item.key
                                    ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                    }`}
                            >
                                {active === item.key && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></span>
                                )}
                                {item.name}
                            </Link>
                        ))}

                        {/* Contact Us */}
                        <button
                            onClick={() => { setIsMobileMenuOpen(false); setIsChatOpen(true); }}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                        >
                            Contact Us
                        </button>

                        {/* Divider */}
                        <div className="my-3 border-t border-gray-200/60 dark:border-gray-700/40"></div>

                        {/* Auth Buttons */}
                        {user ? (
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gray-900 bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_4px_12px_rgba(208,170,33,0.3)] transition-all duration-300"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gold-600 dark:text-gold-400 border border-gold-400/40 hover:bg-gold-500/10 transition-all duration-200"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gray-900 bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_4px_12px_rgba(208,170,33,0.3)] transition-all duration-300"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <AiChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </nav>

            {/* Overlay backdrop for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}
