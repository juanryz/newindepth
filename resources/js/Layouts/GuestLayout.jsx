import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function GuestLayout({ children, title, backLink = '/', backText = 'Kembali ke Beranda' }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#f4f7f6] dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">

            {/* Global Background Ambient Light (Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gold-400/30 dark:bg-gold-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-300/30 dark:bg-teal-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-rose-300/30 dark:bg-rose-600/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Navbar for Guest */}
            <Navbar auth={{ user: null }} active="" isAuthPage={true} title={title} />

            <div className="relative z-10 w-full sm:max-w-md mt-32">

                {/* Back Button Positioned Above Form */}
                <div className="mb-6 flex justify-start">
                    <Link
                        href={backLink}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {backText}
                    </Link>
                </div>

                {/* Liquid Glassmorphism Card */}
                <div className="w-full overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 dark:border-gray-700/50 px-6 py-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] sm:rounded-[2rem] relative z-20 transition-all duration-300">
                    {/* Inner subtle edge highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/20 to-transparent"></div>
                    {/* Inner subtle glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-[4rem] pointer-events-none blur-2xl"></div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
