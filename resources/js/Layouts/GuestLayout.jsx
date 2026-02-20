import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">

            {/* Global Background Ambient Light (Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Theme Toggle Positioned Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full sm:max-w-md mt-6">
                <div className="flex justify-center mb-6">
                    <Link href="/" className="inline-flex gap-2 items-center group">
                        <div className="relative w-12 h-12 bg-gradient-to-tr from-gold-600 to-yellow-400 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] border border-gold-300/30">
                            H
                            <div className="absolute inset-0 bg-gold-400 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300 rounded-xl z-[-1]"></div>
                        </div>
                        <span className="font-extrabold text-3xl tracking-tight text-gray-900 dark:text-white">Hypno<span className="text-gold-500 dark:text-gold-400">Care</span></span>
                    </Link>
                </div>

                {/* Glassmorphism Card */}
                <div className="w-full overflow-hidden bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 px-6 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] sm:rounded-[2rem] relative">
                    {/* Inner subtle glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-[4rem] pointer-events-none"></div>

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
