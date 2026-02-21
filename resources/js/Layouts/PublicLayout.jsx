import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import Navbar from '@/Components/Navbar';

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

            {/* Navbar (Unified) */}
            <Navbar auth={auth} />

            {/* Content */}
            <main className="relative z-10 pt-16">
                {children}
            </main>
        </div>
    );
}
