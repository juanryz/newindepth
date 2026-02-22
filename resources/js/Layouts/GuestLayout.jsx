import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children, title, backLink = '/', backText = 'Kembali ke Beranda' }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#fdfdfd] dark:bg-[#050505] transition-colors duration-700 overflow-hidden relative">

            {/* Global Background Ambient Light (Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[150px] animate-blob mix-blend-soft-light"></div>
                <div className="absolute top-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-teal-400/20 dark:bg-teal-600/10 blur-[150px] animate-blob mix-blend-soft-light" style={{ animationDelay: '3s' }}></div>
                <div className="absolute bottom-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-rose-400/15 dark:bg-rose-600/10 blur-[150px] animate-blob mix-blend-soft-light" style={{ animationDelay: '6s' }}></div>
            </div>

            {/* Navbar for Guest - HIDDEN as requested */}
            {/* <Navbar auth={{ user: null }} active="" isAuthPage={true} title={title} /> */}

            <div className="relative z-10 w-full sm:max-w-md mt-32 sm:mt-16 px-4 sm:px-0">

                {/* Back Button Positioned Above Form */}
                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-all group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {backText}
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Liquid Glassmorphism Card */}
                <div className="w-full overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/80 dark:border-white/10 px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:rounded-[2.5rem] relative z-20 group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                    {/* Inner Glass Shine */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50"></div>

                    {/* Corner Accent Glow */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10">
                        {/* Center Logo */}
                        <div className="flex justify-center mb-8">
                            <Link href="/">
                                <img
                                    src="/images/logo-color.png"
                                    alt="InDepth Mental Wellness"
                                    className="h-20 w-auto object-contain block dark:hidden"
                                />
                                <img
                                    src="/images/logo-white.png"
                                    alt="InDepth Mental Wellness"
                                    className="h-20 w-auto object-contain hidden dark:block"
                                />
                            </Link>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
