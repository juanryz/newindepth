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
                    <div className="text-center mb-16">
                        <Link href="/metode" className="group inline-block">
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase group-hover:text-gold-500 transition-colors">Metodologi Kami</h2>
                            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                                Metode Eksklusif InDepth
                            </h3>
                            <div className="mt-2 w-24 h-1 bg-gold-500 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 w-full mb-16 items-stretch">
                        {/* Card 1 */}
                        <Link href="/metode#indepth-trance" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-left relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-gradient-to-br from-gold-500/10 to-gold-500/5 dark:from-gold-500/20 dark:to-gold-500/10 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500">
                                    <svg className="w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">InDepth Trance State</h4>
                                <p className="font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm">Akses penuh tubuh hingga level sel</p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto">Memfasilitasi komunikasi langsung dengan kecerdasan tubuh untuk perubahan cepat.</p>
                                <div className="mt-4 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Pelajari Detail <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </Link>

                        {/* Card 2 */}
                        <Link href="/metode#supreme-trance" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-left relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-gradient-to-br from-gold-500/10 to-gold-500/5 dark:from-gold-500/20 dark:to-gold-500/10 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500">
                                    <svg className="w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">Supreme Trance State</h4>
                                <p className="font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm">Aktivasi kesadaran tertinggi dan jiwa</p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto">Digunakan pada kondisi yang membutuhkan integrasi kesadaran tingkat lanjut.</p>
                                <div className="mt-4 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Pelajari Detail <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </Link>

                        {/* Card 3 */}
                        <Link href="/metode#indepth-solution" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] text-left relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-14 h-14 bg-gradient-to-br from-gold-500/10 to-gold-500/5 dark:from-gold-500/20 dark:to-gold-500/10 border border-gold-500/20 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500">
                                    <svg className="w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">InDepth Solution</h4>
                                <p className="font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm">Solusi tercepat versi tubuh Anda</p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto">Pendekatan yang membantu tubuh menemukan jalur penyelesaian internalnya secara alami.</p>
                                <div className="mt-4 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Pelajari Detail <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-24 w-full relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 relative z-10">Mengapa Klien Memilih InDepth?</h3>
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-light mb-12">
                                Banyak layanan hipnoterapi berfokus pada sugesti belaka. <strong className="text-gold-600 dark:text-gold-400 font-bold">InDepth berfokus pada sistem.</strong>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {[
                                { title: 'Metodologi', desc: 'Terstruktur' },
                                { title: 'Dokumentasi', desc: 'Transparan' },
                                { title: 'Standar Legal', desc: 'Sangat Jelas' },
                                { title: 'Pendekatan', desc: 'Komunikasi Bawah Sadar' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 hover:-translate-y-1 transition-transform shadow-lg text-center md:text-left">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">{item.title}</p>
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xl font-bold text-gray-900 dark:text-white">
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Pendekatan Presisi</span>
                            <span className="hidden md:block w-2 h-2 rounded-full bg-gold-500/50"></span>
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Proses Terstruktur</span>
                            <span className="hidden md:block w-2 h-2 rounded-full bg-gold-500/50"></span>
                            <span className="flex items-center gap-2"><svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Solusi Mendalam</span>
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

                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter">Struktur Layanan</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Pilih Program Transformasi Anda
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-3 animate-pulse">
                            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(208,170,33,0.15)]">
                                <span className="text-xl">🎉</span>
                                <span className="text-gold-700 dark:text-gold-300 font-bold tracking-wide">Promo 3 Bulan Pertama: <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">Diskon 50%</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                        {/* Reguler Package */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col h-full w-full">
                            {/* Promo ribbon top-right */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center">
                                <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                    <span className="text-white font-black text-[9px] text-center leading-none uppercase">50%<br />OFF</span>
                                </div>
                            </div>

                            <div className="mb-6 flex-grow-0 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">REGULER</h3>
                                <p className="text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm">Stabilisasi Mental & Emosi</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    <span className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2">Rp 4.000.000</span>
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Rp 2.000.000</span>
                                </div>
                                <p className="text-gray-500 text-sm">/ sesi</p>

                                {/* Promo labels */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d 21 Mei 2026
                                    </span>
                                </div>

                                <p className="text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-4 font-light text-sm italic">Dari kondisi terganggu menuju stabil.</p>
                            </div>

                            <div className="mb-6 flex-grow">
                                <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Fokus pada:</p>
                                <ul className="space-y-2 mb-6">
                                    {['fobia', 'kecemasan', 'konflik internal', 'kebiasaan merugikan', 'tekanan emosional'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Hasil yang dicari:</p>
                                <ul className="space-y-2">
                                    {['pikiran lebih jernih', 'respons emosional stabil', 'kontrol diri meningkat'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                                            <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/register?package=hipnoterapi" className="block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto">
                                Pilih Reguler
                            </Link>
                        </div>

                        {/* Premium Package */}
                        <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[3rem] p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 group flex flex-col h-full w-full">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-[10px] font-bold shadow-lg uppercase tracking-widest whitespace-nowrap z-10">
                                Direkomendasikan
                            </div>

                            {/* Promo ribbon top-right */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center">
                                <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                    <span className="text-white font-black text-[9px] text-center leading-none uppercase">50%<br />OFF</span>
                                </div>
                            </div>

                            <div className="mb-6 flex-grow-0 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2 relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">PREMIUM</h3>
                                <p className="text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm">Optimalisasi Diri</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    <span className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2">Rp 8.000.000</span>
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">Rp 4.000.000</span>
                                </div>
                                <p className="text-gray-500 text-sm">/ sesi</p>

                                {/* Promo labels */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d 21 Mei 2026
                                    </span>
                                </div>

                                <p className="text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                                <p className="text-gray-700 dark:text-gray-300 mt-4 font-light text-sm italic">Untuk individu yang ingin meningkat, bukan sekadar pulih.</p>
                            </div>

                            <div className="mb-6 flex-grow relative z-10">
                                <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Fokus pada:</p>
                                <ul className="space-y-2 mb-6">
                                    {['kepercayaan diri tingkat tinggi', 'performa profesional', 'fokus dan keputusan', 'penguatan mental internal'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <p className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Hasil yang dicari:</p>
                                <ul className="space-y-2">
                                    {['kapasitas diri meningkat', 'energi mental terarah', 'performa lebih konsisten'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                                            <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/register?package=premium" className="block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-bold shadow-[0_10px_20px_rgba(208,170,33,0.2)] hover:shadow-[0_15px_30px_rgba(208,170,33,0.3)] transition-all duration-300 hover:-translate-y-1 mt-auto relative z-10">
                                Pilih Premium
                            </Link>
                        </div>

                        {/* VIP Package */}
                        <div className="relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full w-full">
                            {/* Promo ribbon top-right */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10">
                                <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                    <span className="text-white font-black text-[9px] text-center leading-none uppercase">50%<br />OFF</span>
                                </div>
                            </div>

                            <div className="mb-6 flex-grow-0 border-b border-gray-700 pb-6 relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">VIP</h3>
                                <p className="text-gold-400 font-semibold mb-4 text-sm">Penanganan Kompleks & Berat</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    <span className="text-sm font-bold text-gray-500 line-through decoration-rose-500/50 decoration-2">Rp 16.000.000</span>
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">Rp 8.000.000</span>
                                </div>
                                <p className="text-gray-400 text-sm">/ sesi</p>

                                {/* Promo labels */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d 31 Januari
                                    </span>
                                </div>

                                <p className="text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                                <p className="text-gray-300 mt-4 font-light text-sm italic">Pendekatan lanjutan untuk kondisi dengan kompleksitas tinggi.</p>
                            </div>

                            <div className="mb-6 flex-grow relative z-10">
                                <p className="font-bold text-white mb-3 text-sm">Termasuk:</p>
                                <ul className="space-y-2 mb-4">
                                    {['gangguan mental berat', 'halusinasi', 'trauma berlapis', 'psikosomatis', 'kondisi fisik kronis'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gold-400 text-xs italic mb-6">Menggunakan metode eksklusif InDepth Solution.</p>

                                <p className="font-bold text-white mb-3 text-sm">Hasil yang dicari:</p>
                                <ul className="space-y-2">
                                    {['stabilitas internal meningkat', 'respons tubuh lebih adaptif', 'arah pemulihan lebih jelas'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-200 text-sm font-medium">
                                            <svg className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="/register?package=vip" className="block text-center py-4 px-6 rounded-full border-2 border-gold-500/50 text-white font-bold hover:bg-gold-500 transition-all duration-300 mt-auto relative z-10">
                                Pilih VIP
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Process & Target Section */}
            <div className="py-24 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                        {/* Proses Layanan */}
                        <div className="relative">
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Alur Profesional</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight">Proses Layanan Kami</h3>

                            <div className="space-y-8 relative">
                                {/* Vertical progress line */}
                                <div className="absolute left-6 md:left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30"></div>

                                {[
                                    {
                                        title: 'Screening Awal',
                                        desc: 'Sistem menganalisa kebutuhan Anda melalui pre-assessment komprehensif.',
                                        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    },
                                    {
                                        title: 'Penentuan Kategori',
                                        desc: 'Pemilihan program (Reguler, Premium, VIP) yang paling relevan dengan Anda.',
                                        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                                    },
                                    {
                                        title: 'Sesi Privat',
                                        desc: 'Proses transformasi mendalam maksimal 2 jam dengan ahli kami.',
                                        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    },
                                    {
                                        title: 'Evaluasi Hasil',
                                        desc: 'Setiap sesi diakhiri dengan pengukuran dampak yang terukur dan nyata.',
                                        icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative flex items-start gap-6 group">
                                        <div className="relative shrink-0 mt-1">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-xl shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                {idx + 1}
                                            </div>
                                            {/* Glow effect */}
                                            <div className="absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl"></div>
                                        </div>
                                        <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400">
                                                    {step.icon}
                                                </div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-xl">{step.title}</h4>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Siapa yang Cocok */}
                        <div className="bg-white/40 dark:bg-gray-800/20 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] border border-white/60 dark:border-gray-700/50 shadow-2xl relative overflow-hidden group hover:shadow-gold-500/10 transition-all duration-700 mt-8 md:mt-24">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700 pointer-events-none"></div>

                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Target Klien</h2>
                            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight">Siapa yang Cocok Datang?</h3>

                            <ul className="space-y-6 relative z-10">
                                {[
                                    { text: 'Profesional dengan tekanan tinggi', icon: '💼' },
                                    { text: 'Individu yang menginginkan perubahan cepat', icon: '⚡' },
                                    { text: 'Klien yang menghargai privasi & struktur', icon: '🔒' },
                                    { text: 'Individu yang siap menjalani proses serius', icon: '🤝' }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-5 p-5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-white/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-x-1 transition-all duration-300">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 flex items-center justify-center text-2xl shrink-0 border border-gold-500/10 group-hover:bg-gold-500/20 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="font-bold text-gray-800 dark:text-gray-200 text-lg leading-tight">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
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
                        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full pointer-events-none"></div>
                            <div className="flex text-gold-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <div className="relative">
                                <svg className="absolute -top-4 -left-4 w-10 h-10 text-gold-500/10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" /></svg>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10">"Setelah bertahun-tahun mengalami serangan panik, metode Supreme Trance InDepth benar-benar memberikan kendali penuh pada pikiran saya. Saya kembali produktif dalam 2 sesi."</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">A</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Andi S.</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Pengusaha</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-gold-500/20 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden md:-translate-y-6">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-bl-full pointer-events-none"></div>
                            <div className="flex text-gold-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <div className="relative">
                                <svg className="absolute -top-4 -left-4 w-10 h-10 text-gold-500/10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" /></svg>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10">"Paket Premium membantu saya merobohkan mental block dalam hal finansial. Pendekatan NLP-nya luar biasa praktis dan terstruktur. Terima kasih InDepth!"</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">M</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">Maya P.</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Eksekutif Muda</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full pointer-events-none"></div>
                            <div className="flex text-gold-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <div className="relative">
                                <svg className="absolute -top-4 -left-4 w-10 h-10 text-gold-500/10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" /></svg>
                                <p className="text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10">"Saya ambil Paket VIP untuk kasus trauma masa kecil yang kompleks. Pendampingannya sangat eksklusif. Saya menemukan hidup baru di sini."</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">D</div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">dr. Dimas</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Tenaga Medis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leadership Section (Komisaris & Direktur) */}
            <div className="py-24 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Komisaris Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
                        {/* Image Column */}
                        <div className="w-full lg:w-5/12 lg:-mt-12">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70"></div>
                                <div className="relative rounded-[2.5rem] overflow-hidden border border-gold-500/20 shadow-2xl aspect-[3/4] bg-gray-100 dark:bg-gray-800">
                                    <div className="absolute inset-0">
                                        <img
                                            src="/images/julius-bambang.png"
                                            alt="Julius Bambang"
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
                                        <h3 className="text-2xl font-bold text-white mb-1">Julius Bambang</h3>
                                        <p className="text-gold-400 font-medium tracking-widest uppercase text-xs">Komisaris / Owner</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className="w-full lg:w-7/12">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl leading-tight">Julius Bambang</h2>
                                    <p className="mt-2 text-lg font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase text-sm">
                                        Komisaris & Owner InDepth Mental Wellness
                                    </p>
                                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed italic border-l-4 border-gold-500/30 pl-6">
                                        Berdedikasi dalam mendukung pengembangan ekosistem kesehatan mental yang profesional, inklusif, dan revolusioner di Indonesia.
                                    </p>
                                </div>

                                <div className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-gold-500/10 shadow-sm relative overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl"></div>
                                    <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4 text-lg">
                                        <svg className="w-6 h-6 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                        Visi & Kepemimpinan
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                                        Sebagai pilar pendukung utama di balik InDepth Mental Wellness, Julius Bambang memastikan visi perusahaan untuk menjadi pusat pemulihan mental terdepan terwujud melalui manajemen yang transparan dan komitmen pada kualitas layanan yang tak tandingi.
                                    </p>
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
                        Jadwalkan Konsultasi
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </Link>
                </div>
            </div>


            {/* Articles Section */}
            {
                articles && articles.length > 0 && (
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
                )
            }

            <DisclaimerSection />

            <Footer />
        </div >
    );
}
