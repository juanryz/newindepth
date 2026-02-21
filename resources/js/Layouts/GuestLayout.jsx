import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function GuestLayout({ children, title, backLink = '/', backText = 'Kembali ke Beranda' }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#f9fafb] dark:bg-[#020202] transition-colors duration-1000 overflow-hidden relative">

            {/* Global Background Ambient Light (Apple Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-gold-200/20 dark:bg-gold-800/5 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '4s' }}></div>
                <div className="absolute bottom-[-25%] left-[5%] w-[80vw] h-[80vw] rounded-full bg-rose-100/20 dark:bg-rose-900/10 blur-[180px] animate-blob mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '8s' }}></div>
            </div>

            {/* Navbar for Guest */}
            <Navbar auth={{ user: null }} active="" isAuthPage={true} title={title} />

            <div className="relative z-10 w-full sm:max-w-md mt-28 px-4 sm:px-0">

                {/* Back Button Positioned Above Form */}
                <div className="mb-8 flex justify-start">
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:text-gray-950 dark:hover:text-white transition-all group"
                    >
                        <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {backText}
                    </Link>
                </div>

                {/* Apple-Style Glassmorphism Card */}
                <div className="w-full overflow-hidden bg-white/20 dark:bg-white/[0.03] backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:border-white/[0.08] px-10 py-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-[0_48px_96px_-24px_rgba(0,0,0,1)] sm:rounded-[3rem] relative z-20 group transition-all duration-700">
                    {/* Inner subtle edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"></div>

                    {/* Floating Surface Glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
