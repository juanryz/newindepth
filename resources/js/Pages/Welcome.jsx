import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    // Smooth scroll for anchor links
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title="InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional" />

            {/* Global Background Ambient Light (Liquid Glass foundation) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-300/20 dark:bg-yellow-600/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms] delay-1000"></div>
            </div>

            {/* Navbar (Liquid Glass) */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/40 dark:border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                            {/* Logo — color for light mode, white for dark mode */}
                            <img
                                src="/images/logo-color.png"
                                alt="InDepth Mental Wellness"
                                className="h-12 w-auto object-contain block dark:hidden"
                            />
                            <img
                                src="/images/logo-white.png"
                                alt="InDepth Mental Wellness"
                                className="h-12 w-auto object-contain hidden dark:block"
                            />
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#layanan" className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Layanan</a>
                            <a href="#testimoni" className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Testimoni</a>
                            <Link href={route('blog.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Artikel</Link>
                            <Link href={route('courses.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">E-Learning</Link>
                        </div>
                        <div className="flex items-center space-x-4 relative z-[60]">
                            <ThemeToggle />
                            {auth.user ? (
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
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-4 py-2 transition-colors relative z-[60]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-gold-500 to-yellow-500 border border-gold-400/50 hover:from-gold-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 dark:focus:ring-offset-gray-950 transition-all shadow-[0_4px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_30px_rgba(208,170,33,0.5)] hover:-translate-y-0.5 relative z-[60]"
                                    >
                                        Daftar Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                            Klinik Kesehatan Mental Profesional
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
                        Temukan Kembali <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm">
                            Ketenangan Batin Anda
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto mb-10 leading-relaxed font-light">
                        Bebaskan diri dari stres, kecemasan, dan trauma masa lalu bersama tim profesional kesehatan mental kami yang berpengalaman dan terpercaya.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/login" className="px-8 py-4 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 shadow-[0_10px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all hover:-translate-y-1 border border-gold-400/50">
                            Jadwalkan Konsultasi Gratis
                        </Link>
                        <a href="#layanan" className="px-8 py-4 text-lg font-semibold rounded-full text-gray-800 dark:text-white bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/60 hover:bg-white/60 dark:hover:bg-gray-700/60 shadow-lg transition-all hover:-translate-y-1">
                            Pelajari Lebih Lanjut
                        </a>
                    </div>
                </div>
            </main>

            {/* Features Section (Liquid Glass Cards) */}
            <div id="layanan" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Layanan Kami</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Solusi Khusus untuk Setiap Individu
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto font-light">
                            Pendekatan terapeutik yang disesuaikan secara personal untuk mencapai hasil yang maksimal dan permanen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Penyembuhan Trauma & Phobia</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Atasi akar masalah emosional dan ketakutan tidak beralasan dengan pendekatan terapeutik yang aman dan terkendali.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Manajemen Stres & Kecemasan</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Program terstruktur untuk melatih pikiran Anda mengelola stres dan mendapatkan ketenangan jiwa yang berkelanjutan.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Pengembangan Diri & Potensi</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Hancurkan mental block dan limiting belief yang menahan laju kesuksesan karir dan hubungan Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section (Gold Glow Dark Variant) */}
            <div className="relative mt-20 z-10">
                <div className="absolute inset-0 bg-gray-900 dark:bg-black">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(208,170,33,0.15)_0,rgba(0,0,0,0)_50%)]"></div>
                </div>
                <div className="relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center rounded-[3rem] border border-white/5 dark:border-gray-800 bg-white/5 dark:bg-gray-900/30 backdrop-blur-2xl shadow-2xl overflow-hidden my-12">
                    {/* Glass reflections */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
                    <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-b from-white/5 to-transparent blur-2xl transform -rotate-6 pointer-events-none"></div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white relative z-10">
                        Siap Melangkah Maju?
                    </h2>
                    <p className="text-xl opacity-90 mb-10 text-gray-300 mx-auto max-w-2xl font-light relative z-10">
                        Bergabunglah dengan ratusan klien sukses lainnya. Proses perubahan dimulai dari satu keputusan kecil hari ini.
                    </p>
                    <Link href="/login" className="relative z-10 px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] border border-white/20 transition-all duration-300 inline-flex items-center gap-2 group">
                        Buat Akun Pasien
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0 opacity-80 hover:opacity-100 transition-opacity">
                            <img
                                src="/images/logo-color.png"
                                alt="InDepth Mental Wellness"
                                className="h-10 w-auto object-contain block dark:hidden"
                            />
                            <img
                                src="/images/logo-white.png"
                                alt="InDepth Mental Wellness"
                                className="h-10 w-auto object-contain hidden dark:block"
                            />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} InDepth Mental Wellness. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
