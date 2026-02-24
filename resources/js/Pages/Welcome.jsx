import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import VisionMissionSection from '@/Components/VisionMissionSection';
import LiquidBackground from '@/Components/LiquidBackground';
import DisclaimerSection from '@/Components/DisclaimerSection';

export default function Welcome({ auth, articles, courses }) {

    // Smooth scroll for anchor links
    useEffect(() => {
        const handleSmoothScroll = function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch (err) {
                    console.error('Invalid selector:', href);
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        return () => {
            anchors.forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title="InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional" />

            {/* Premium Liquid Background */}
            <LiquidBackground />

            {/* Navbar (Unified) */}
            <Navbar auth={auth} active="home" />

            {/* Hero Section */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                            InDepth Mental Wellness Center
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight"
                    >
                        Temukan Kembali <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm">
                            Ketenangan Batin Anda
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto mb-10 leading-relaxed font-light"
                    >
                        Bebaskan diri dari stres, kecemasan, dan trauma masa lalu bersama tim profesional kesehatan mental kami yang berpengalaman dan terpercaya.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <a href="#layanan" className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 border border-gold-300/40">
                            Layanan Kami
                            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                    </motion.div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Penyembuhan Trauma & Phobia</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Atasi akar masalah emosional dan ketakutan tidak beralasan dengan pendekatan terapeutik yang aman dan terkendali.
                            </p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Manajemen Stres & Kecemasan</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Program terstruktur untuk melatih pikiran Anda mengelola stres dan mendapatkan ketenangan jiwa yang berkelanjutan.
                            </p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Pengembangan Diri & Potensi</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Hancurkan mental block dan limiting belief yang menahan laju kesuksesan karir dan hubungan Anda.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Extended Method Section */}
            <div className="py-24 relative z-10 overflow-hidden bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-4">Metodologi Kami</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">Metode InDepth Terintegrasi</h3>

                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-gold-500/30 shadow-2xl text-gray-800 dark:text-gray-200 relative overflow-hidden group hover:shadow-gold-500/10 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-bl-full -mr-32 -mt-32 transition-transform group-hover:scale-125 duration-1000 ease-out pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-tr-full -ml-24 -mb-24 transition-transform group-hover:scale-125 duration-1000 ease-out pointer-events-none"></div>

                            <p className="text-lg md:text-2xl leading-relaxed font-light text-center relative z-10">
                                Kami menggunakan sistem terstruktur mulai dari pelepasan akar masalah dengan <strong className="text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4">InDepth Trance State</strong>, pengendalian masalah kronis dengan <strong className="text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4">Supreme Trance State</strong>, hingga pencarian solusi spesifik versi terbaik Anda melalui <strong className="text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4">InDepth Solution</strong>.
                            </p>

                            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 opacity-60">
                                <span className="px-4 py-2 bg-gold-500/10 rounded-full">Explore</span>
                                <span className="px-4 py-2 bg-gold-500/10 rounded-full">Heal</span>
                                <span className="px-4 py-2 bg-gold-500/10 rounded-full">Transform</span>
                            </div>
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


                        <div className="mt-8 flex flex-col items-center gap-3 animate-pulse">
                            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(208,170,33,0.15)]">
                                <span className="text-xl">🎉</span>
                                <span className="text-gold-700 dark:text-gold-300 font-bold tracking-wide">Promo 3 Bulan Pertama: <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">Diskon 50%</span></span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                *Pada tanggal 21 Mei 2026 harganya kembali normal
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Hipnoterapi Package */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col">
                            <div className="mb-6 flex-grow-0">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hipnoterapi</h3>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-400 line-through decoration-red-500/50 decoration-2">Rp 2.000.000</span>
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Rp 1.000.000</span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Per Sesi / Treatment</p>
                                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Terapi Hipnotis Klinis
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Konsultasi Awal
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Relaksasi Pikiran Bawah Sadar
                                </li>
                            </ul>

                            <Link href="/register?package=hipnoterapi" className="block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto">
                                Pilih Hipnoterapi
                            </Link>
                        </div>

                        {/* Upgrade Package */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col">
                            <div className="mb-6 flex-grow-0">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upgrade <span className="text-sm font-normal text-gray-500">(Pengembangan Diri)</span></h3>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-400 line-through decoration-red-500/50 decoration-2">Rp 3.000.000</span>
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Rp 1.500.000</span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Per Paket Program</p>
                                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Pemrograman Ulang Mindset
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Peningkatan Percaya Diri
                                </li>
                                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Teknik NLP Praktis
                                </li>
                            </ul>

                            <Link href="/register?package=upgrade" className="block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto">
                                Pilih Upgrade
                            </Link>
                        </div>

                        {/* VIP Package */}
                        <div className="relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-2xl border-2 border-gold-500/50 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(208,170,33,0.15)] hover:shadow-[0_30px_60px_rgba(208,170,33,0.25)] transition-all duration-500 group flex flex-col md:-translate-y-4">
                            {/* VIP Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-xs font-bold shadow-lg uppercase tracking-widest whitespace-nowrap">
                                Intensive Care
                            </div>

                            <div className="mb-6 flex-grow-0 pt-2">
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                    Paket VIP
                                    <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </h3>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-transparent select-none" aria-hidden="true">-</span>
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">Rp 8.000.000</span>
                                </div>
                                <p className="text-gold-500/80 mt-2 font-medium">Prioritas & Kasus Kompleks</p>
                                <p className="text-[9px] font-bold text-gold-500/60 mt-1 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Prioritas Jadwal Utama
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Terapi Kasus Kompleks
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Pendampingan Eksklusif
                                </li>
                            </ul>

                            <Link href="/register?package=vip" className="block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-extrabold shadow-[0_10px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 hover:-translate-y-1 mt-auto">
                                Ambil Paket VIP
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section (Below Packages) */}
            <div className="py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-lg border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter">Kisah Nyata</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Apa Kata Klien Kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex text-gold-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"Setelah bertahun-tahun mengalami serangan panik, metode Supreme Trance InDepth benar-benar memberikan kendali penuh pada pikiran saya. Saya kembali produktif dalam 2 sesi."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg">A</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Andi S.</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Pengusaha</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 transform md:-translate-y-4">
                            <div className="flex text-gold-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"Paket Upgrade membantu saya merobohkan mental block dalam hal finansial. Pendekatan NLP-nya luar biasa praktis dan terstruktur. Terima kasih InDepth!"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg">M</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Maya P.</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Karyawan Swasta</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex text-gold-500 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 italic mb-6">"Saya ambil Paket VIP untuk kasus trauma masa kecil yang kompleks. Pendampingannya sangat eksklusif. Saya menemukan hidup baru di sini."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg">D</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">dr. Dimas</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tenaga Medis</p>
                                </div>
                            </div>
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
                                        <img src="/images/saiful-anam.png" alt="Saiful Anam" className="w-full h-full object-cover object-top" />
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
            <VisionMissionSection />

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


            {/* Articles Section */}
            {articles && articles.length > 0 && (
                <div id="blog" className="py-24 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Wawasan & Edukasi</h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                Blog & Artikel Terbaru
                            </p>
                            <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 mx-auto font-light">
                                Pelajari lebih dalam tentang kesehatan mental, teknik relaksasi, dan pengembangan diri melalui konten pilihan kami.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {articles.map((article, idx) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                                        {article.featured_image ? (
                                            <img src={`/storage/${article.featured_image}`} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gold-50 dark:bg-gold-950/20">
                                                <svg className="w-12 h-12 text-gold-200 dark:text-gold-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gold-600 dark:text-gold-400 border border-white/50 dark:border-gray-700 shadow-sm">
                                                {article.author?.name || 'InDepth Team'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                                            {article.published_at
                                                ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                                : new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                            }
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gold-600 transition-colors line-clamp-2 leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 font-medium leading-relaxed">
                                            {article.excerpt || (article.body ? String(article.body).replace(/<[^>]*>?/gm, '').substring(0, 120) : '') + '...'}
                                        </p>
                                        <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400 group/link">
                                            Baca Selengkapnya
                                            <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/blog" className="px-8 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-all text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 mx-auto w-fit">
                                Lihat Semua Artikel
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <DisclaimerSection />

            <Footer />
        </div>
    );
}
