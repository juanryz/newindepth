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
                        <div className="flex-shrink-0 flex items-center cursor-pointer group relative p-2" onClick={() => window.scrollTo(0, 0)}>
                            {/* Logo Background/Glow for visibility */}
                            <div className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-2xl blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                            {/* Logo — color for light mode, white for dark mode */}
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
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a href="#layanan" className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Layanan</a>
                            <Link href={route('testimonials.index')} className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Testimoni</Link>
                            <a href="#paket" className="text-gray-600 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">Paket</a>
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
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-6 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-md relative z-[60]"
                                    >
                                        Mulai Sekarang
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
                            InDepth Mental Wellness Center
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
                        <Link
                            href={route('therapists.index')}
                            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-full text-gray-900 bg-gold-400 hover:bg-gold-500 shadow-lg shadow-gold-400/30 transition-all hover:scale-105"
                        >
                            Lihat Jadwal Terapis
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
            {/* Packages Section (Premium Pricing) */}
            <div id="paket" className="py-24 relative z-10 overflow-hidden">
                {/* Background ambient glow for this section */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 dark:bg-gold-500/5 blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter">Paket Layanan</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Pilih Program Transformasi Anda
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto font-light">
                            Investasi terbaik adalah untuk kesehatan mental dan ketenangan batin Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Reguler Package */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paket Reguler</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">Rp 2.000.000</span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Per Sesi / Treatment</p>
                            </div>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Sesi Terapi Standar
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Konsultasi Awal
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Teknik Relaksasi Dasar
                                </li>
                            </ul>

                            <Link href="/register?package=reguler" className="block text-center py-4 px-8 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300">
                                Pilih Paket Reguler
                            </Link>
                        </div>

                        {/* VIP Package */}
                        <div className="relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-2xl border-2 border-gold-500/50 rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(208,170,33,0.15)] hover:shadow-[0_30px_60px_rgba(208,170,33,0.25)] transition-all duration-500 group scale-105">
                            {/* VIP Badge */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-sm font-bold shadow-lg uppercase tracking-widest">
                                Khusus Kasus Kronis
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    Paket VIP
                                    <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">Rp 8.000.000</span>
                                </div>
                                <p className="text-gold-500/80 mt-2 font-medium">Intensive Care / Chronic Cases</p>
                            </div>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Prioritas Jadwal Utama
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Terapi Kasus Kompleks/Kronis
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Pendampingan Eksklusif
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Metode Jessica V.3 Advanced
                                </li>
                            </ul>

                            <Link href="/register?package=vip" className="block text-center py-5 px-8 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-extrabold text-lg shadow-[0_10px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 hover:-translate-y-1">
                                Ambil Paket VIP
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Director Profile Section (Saiful Anam) */}
            <div className="py-24 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Image Column */}
                        <div className="w-full lg:w-5/12">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70"></div>
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-gold-500/20 shadow-2xl aspect-[4/5] bg-gray-100 dark:bg-gray-800">
                                    <div className="absolute inset-0">
                                        <img src="/images/saiful-anam.png" alt="Saiful Anam" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                        <h3 className="text-2xl font-bold text-white mb-1">Saiful Anam</h3>
                                        <p className="text-gold-400 font-medium">Direktur InDepth / Pakar Hipnoterapi</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="w-full lg:w-7/12">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl leading-tight">Saiful Anam</h2>
                                    <p className="mt-2 text-lg font-semibold text-gold-600 dark:text-gold-400 tracking-wide">
                                        Direktur InDepth / Pakar Hipnoterapi
                                    </p>
                                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed italic">
                                        Mengajar hipnotis dan hipnoterapi secara konsisten sejak tahun 2004.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    {/* Books */}
                                    <div className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gold-500/10 shadow-sm">
                                        <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4">
                                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                            Penulis Buku
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> 4 Jam Pintar Hipnosis
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> Mudahnya Berpikir Positif
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> Metode Jessica V.3
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Methods */}
                                    <div className="p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gold-500/10 shadow-sm">
                                        <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4">
                                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                            Penemu Metode
                                        </h4>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> Super Sadar & Metode Jessica
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> InDepth & Supreme State
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-gold-500">•</span> InDepth Solution
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Stats Counter */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-6 bg-gradient-to-br from-gold-500/10 to-transparent rounded-3xl border border-gold-500/20">
                                        <div className="text-4xl font-extrabold text-gold-600 dark:text-gold-400 mb-1">17.000+</div>
                                        <div className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase underline decoration-gold-500/30 decoration-4 text-left">Klien Personal</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-gold-500/10 to-transparent rounded-3xl border border-gold-500/20">
                                        <div className="text-4xl font-extrabold text-gold-600 dark:text-gold-400 mb-1">1150+</div>
                                        <div className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase underline decoration-gold-500/30 decoration-4 text-left">Klien Korporasi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section (Refined Glass Variant) */}
            <div className="relative mt-20 z-10">
                <div className="relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center rounded-[3rem] border border-gold-500/20 dark:border-gray-800 bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl shadow-xl overflow-hidden my-12">
                    {/* Glass reflections */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
                    <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-b from-gold-500/5 to-transparent blur-2xl transform -rotate-6 pointer-events-none"></div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white relative z-10">
                        Siap Melangkah Maju?
                    </h2>
                    <p className="text-xl opacity-90 mb-10 text-gray-600 dark:text-gray-300 mx-auto max-w-2xl font-light relative z-10">
                        Bergabunglah dengan ratusan klien sukses lainnya. Proses perubahan dimulai dari satu keputusan kecil hari ini.
                    </p>
                    <Link href="/register" className="relative z-10 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 inline-flex items-center gap-2 group">
                        Jadwalkan Konsultasi Gratis
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>

            {/* Hubungi Kami Section (Simplified to Logo Only) */}
            <div id="kontak" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-12">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter">Hubungi Kami</h2>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Konsultasi Langsung Melalui WhatsApp</p>
                    </div>

                    <div className="flex justify-center">
                        <a href="https://wa.me/6282220800034" target="_blank" className="group relative w-32 h-32 flex items-center justify-center bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-full shadow-xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 rounded-full transition-all duration-500"></div>
                            <svg className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span className="absolute top-2 right-2 flex h-5 w-5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 shadow-lg border-2 border-white dark:border-gray-800"></span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer ("Header Bawah") */}
            <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">InDepth</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                Kesehatan Mental Terpadu & Profesional. Membantu Anda menemukan kembali ketenangan batin.
                            </p>
                            <div className="mt-6 flex space-x-4">
                                <a href="https://www.instagram.com/indepth.co.id?igsh=MTg5NXZpdnV0NzFucg==" target="_blank" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Updated Semarang Location Column */}
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Lokasi & Kontak</h4>
                            <a href="https://share.google/NtOQpAGwlAfChYbxP" target="_blank" className="group block">
                                <p className="text-gray-900 dark:text-white font-bold mb-1 group-hover:text-gold-600 transition-colors">
                                    InDepth Mental Wellness Semarang
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    Gajah Mungkur, Jl. Kelud Raya No.34b, Petompon, Kota Semarang, Jawa Tengah 50237
                                </p>
                                <p className="text-gray-900 dark:text-white font-bold text-sm mb-4">
                                    Telepon: 0822-2080-0034
                                </p>
                                <span className="text-gold-600 dark:text-gold-400 font-bold text-sm flex items-center gap-1 group-hover:underline">
                                    Buka di Google Maps
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                                </span>
                            </a>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Navigasi</h4>
                            <ul className="space-y-4 text-sm">
                                <li><a href="#layanan" className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Layanan</a></li>
                                <li><Link href={route('testimonials.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Testimoni</Link></li>
                                <li><a href="#paket" className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Paket</a></li>
                                <li><Link href={route('blog.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">Artikel</Link></li>
                                <li><Link href={route('courses.index')} className="text-gray-600 dark:text-gray-400 hover:text-gold-600 transition-colors">E-Learning</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} InDepth Mental Wellness. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
