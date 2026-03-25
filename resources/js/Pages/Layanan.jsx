import { Head, Link } from '@inertiajs/react';
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import LiquidBackground from '@/Components/LiquidBackground';
import PageLoader from '@/Components/PageLoader';

const Footer = lazy(() => import('@/Components/Footer'));
const DisclaimerSection = lazy(() => import('@/Components/DisclaimerSection'));

const WA_LINK = 'https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export default function Layanan({ auth, packages = [] }) {
    const getPackage = (slug) =>
        packages.find((p) => p.slug === slug) || {
            name: slug.toUpperCase(),
            base_price: 0,
            current_price: 0,
            discount_percentage: 0,
            discount_ends_at: null,
        };

    const formatPrice = (price) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
            .format(price)
            .replace('IDR', 'Rp');

    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const regulerPkg = getPackage('reguler');
    const premiumPkg = getPackage('premium');
    const vipPkg = getPackage('vip');

    const testimonials = [
        {
            quote:
                'Saya mengalami overthinking setiap malam sampai sulit tidur. Pikiran terus berjalan dan sulit berhenti. Dalam satu sesi Reguler, kondisi tersebut dituntaskan dan tidur kembali normal.',
            tag: 'Reguler',
        },
        {
            quote:
                'Saya memiliki kebiasaan menunda pekerjaan setiap hari. Setiap mulai kerja, fokus langsung hilang. Setelah sesi Reguler, pola tersebut dituntaskan dan pekerjaan selesai tepat waktu.',
            tag: 'Reguler',
        },
        {
            quote:
                'Saya mengalami nyeri dada saat stres yang muncul berulang. Pemeriksaan medis sudah dilakukan dan kondisi ini terus muncul. Setelah sesi VIP, pola tersebut dituntaskan dan aktivitas kembali berjalan normal.',
            tag: 'VIP',
        },
        {
            quote:
                'Saya mengalami halusinasi pada situasi tertentu yang mengganggu aktivitas. Setelah sesi VIP, pola tersebut dituntaskan dan kondisi menjadi stabil.',
            tag: 'VIP',
        },
    ];

    const processSteps = [
        {
            title: 'Konsultasi via WhatsApp',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
        },
        {
            title: 'Screening Mental',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
        },
        {
            title: 'Login Sistem',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            ),
        },
        {
            title: 'Booking Jadwal',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'Pembayaran',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
    ];

    const faqItems = [
        {
            q: 'Apa itu hipnoterapi di INDEPTH?',
            a: 'Hipnoterapi di INDEPTH menggunakan hipnosis dan trance untuk mengakses serta memprogram ulang program bawah sadar secara terarah.',
        },
        {
            q: 'Apa perbedaan Reguler, Premium, dan VIP?',
            a: 'Reguler untuk stabilisasi mental dan perilaku. Premium untuk performa dan kapasitas internal. VIP untuk psikosomatis, medis kronis, dan halusinasi.',
        },
        {
            q: 'Apakah cukup satu sesi?',
            a: 'Pendekatan difokuskan pada hasil yang dituntaskan dalam satu sesi.',
        },
        {
            q: 'Bagaimana memilih layanan yang tepat?',
            a: 'Pemilihan layanan dilakukan melalui proses screening awal.',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <PageLoader />
            <Head title="Layanan Hipnoterapi Semarang | INDEPTH Klinik" />
            <LiquidBackground />
            <Navbar auth={auth} active="layanan" />

            {/* ── HERO ── */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400"
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                            INDEPTH Klinik Hipnoterapi Semarang
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[0.9]"
                    >
                        Layanan Hipnoterapi{' '}
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm">
                            Semarang INDEPTH Klinik
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mx-auto mb-4 leading-relaxed font-medium"
                    >
                        INDEPTH Klinik Hipnoterapi Semarang menyediakan layanan berbasis hipnosis dan trance untuk memprogram ulang program bawah sadar secara terarah.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400 mx-auto mb-10 leading-relaxed"
                    >
                        Setiap layanan dirancang sesuai dengan kondisi yang Anda alami, mulai dari stabilisasi mental hingga penanganan psikosomatis dan kondisi khusus.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <a
                            href="#layanan-cards"
                            className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 transition-all duration-300 border border-gold-300/40"
                        >
                            Lihat Layanan
                            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Konsultasi via WhatsApp
                        </a>
                    </motion.div>
                </div>
            </main>

            {/* ── SERVICE CARDS ── */}
            <div id="layanan-cards" className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Struktur Layanan</h2>
                        <p className="mt-2 text-3xl leading-8 font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            Pilih Layanan Anda
                        </p>
                        {(regulerPkg.discount_percentage > 0 || premiumPkg.discount_percentage > 0 || vipPkg.discount_percentage > 0) && (
                            <div className="mt-8 flex flex-col items-center">
                                <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 dark:from-gold-500/20 dark:to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(208,170,33,0.1)]">
                                    <span className="text-xl">🎉</span>
                                    <span className="text-gold-700 dark:text-gold-300 font-bold tracking-wide">
                                        Program Khusus:{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">
                                            Diskon s/d {Math.max(regulerPkg.discount_percentage, premiumPkg.discount_percentage, vipPkg.discount_percentage)}% hingga 21 Mei 2026
                                        </span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* ── REGULER ── */}
                        <motion.div {...fadeUp(0)} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full">
                            {regulerPkg.discount_percentage > 0 && (
                                <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10">
                                    <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                        <span className="text-white font-black text-[9px] text-center leading-none uppercase">{regulerPkg.discount_percentage}%<br />OFF</span>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">Reguler</span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">Hipnoterapi Reguler</h2>
                                <p className="text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm">Stabilisasi Mental dan Emosi</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    {regulerPkg.discount_percentage > 0 && (
                                        <span className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2">
                                            {formatPrice(regulerPkg.base_price || 2000000)}
                                        </span>
                                    )}
                                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                        {regulerPkg.current_price ? formatPrice(regulerPkg.current_price) : 'Rp 2.000.000'}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">/ sesi · ±2 jam</p>
                                {regulerPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d {formatDate(regulerPkg.discount_ends_at)}
                                    </span>
                                )}
                                {!regulerPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ Diskon 50% hingga 21 Mei 2026
                                    </span>
                                )}
                            </div>

                            <div className="flex-grow space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Kondisi yang Anda alami</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Pikiran terus berjalan dan sulit berhenti seperti overthinking dan kecemasan berulang',
                                            'Emosi mudah meledak, tegang, atau tertekan',
                                            'Kebiasaan buruk yang berulang terus-menerus',
                                            'Sulit fokus dan ragu saat mengambil keputusan',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Fokus Penanganan</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Mengakses dan memprogram ulang program bawah sadar yang memicu pola pikiran, emosi, dan perilaku.</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Hasil yang Dituju</p>
                                    <ul className="space-y-2">
                                        {['Pikiran lebih terarah', 'Emosi lebih stabil', 'Pola buruk berhenti berulang', 'Aktivitas kembali berjalan normal'].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                                                <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Link
                                href="/layanan/reguler"
                                className="mt-8 block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300"
                            >
                                Lihat Detail Layanan Reguler
                            </Link>
                        </motion.div>

                        {/* ── PREMIUM ── */}
                        <motion.div {...fadeUp(0.1)} className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[3rem] p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 flex flex-col h-full">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-[10px] font-bold shadow-lg uppercase tracking-widest whitespace-nowrap z-10">
                                Direkomendasikan
                            </div>

                            {premiumPkg.discount_percentage > 0 && (
                                <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10">
                                    <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                        <span className="text-white font-black text-[9px] text-center leading-none uppercase">{premiumPkg.discount_percentage}%<br />OFF</span>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                                    <span className="text-gold-600 dark:text-gold-400 text-xs font-bold uppercase tracking-widest">Premium</span>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">Hipnoterapi Premium</h2>
                                <p className="text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm">Optimalisasi Performa dan Kapasitas Internal</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    {premiumPkg.discount_percentage > 0 && (
                                        <span className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2">
                                            {formatPrice(premiumPkg.base_price || 3000000)}
                                        </span>
                                    )}
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">
                                        {premiumPkg.current_price ? formatPrice(premiumPkg.current_price) : 'Rp 3.000.000'}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">/ sesi · ±2 jam</p>
                                {premiumPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d {formatDate(premiumPkg.discount_ends_at)}
                                    </span>
                                )}
                                {!premiumPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ Diskon 50% hingga 21 Mei 2026
                                    </span>
                                )}
                            </div>

                            <div className="flex-grow space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Kondisi yang Anda alami</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Fokus mudah terpecah saat bekerja',
                                            'Performa mental belum maksimal',
                                            'Kontrol diri perlu diperkuat',
                                            'Kapasitas internal ingin ditingkatkan',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Fokus Penanganan</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Mengakses dan memprogram ulang program bawah sadar untuk mendukung performa dan kapasitas maksimal internal.</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Hasil yang Dituju</p>
                                    <ul className="space-y-2">
                                        {['Fokus meningkat', 'Keputusan lebih tegas', 'Kontrol diri lebih kuat', 'Performa mencapai kapasitas maksimal'].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium">
                                                <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Link
                                href="/layanan/premium"
                                className="mt-8 block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-bold shadow-[0_10px_20px_rgba(208,170,33,0.2)] hover:shadow-[0_15px_30px_rgba(208,170,33,0.3)] transition-all duration-300 hover:-translate-y-1"
                            >
                                Lihat Detail Layanan Premium
                            </Link>
                        </motion.div>

                        {/* ── VIP ── */}
                        <motion.div {...fadeUp(0.2)} className="relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                            {vipPkg.discount_percentage > 0 && (
                                <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10">
                                    <div className="w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse">
                                        <span className="text-white font-black text-[9px] text-center leading-none uppercase">{vipPkg.discount_percentage}%<br />OFF</span>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6 border-b border-gray-700 pb-6 mt-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <span className="text-red-400 text-xs font-bold uppercase tracking-widest">VIP</span>
                                </div>
                                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">Hipnoterapi VIP</h2>
                                <p className="text-gold-400 font-semibold mb-4 text-sm">Psikosomatis, Medis Kronis, dan Halusinasi</p>
                                <div className="flex flex-col gap-0.5 mb-1">
                                    {vipPkg.discount_percentage > 0 && (
                                        <span className="text-sm font-bold text-gray-500 line-through decoration-rose-500/50 decoration-2">
                                            {formatPrice(vipPkg.base_price || 8000000)}
                                        </span>
                                    )}
                                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">
                                        {vipPkg.current_price ? formatPrice(vipPkg.current_price) : 'Rp 8.000.000'}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm">/ sesi · ±2 jam</p>
                                {vipPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ s/d {formatDate(vipPkg.discount_ends_at)}
                                    </span>
                                )}
                                {!vipPkg.discount_ends_at && (
                                    <span className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30">
                                        ⏳ Diskon 50% hingga 21 Mei 2026
                                    </span>
                                )}
                            </div>

                            <div className="flex-grow space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Kondisi yang Anda alami</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Keluhan psikosomatis yang muncul berulang pada tubuh',
                                            'Kondisi medis kronis yang berkaitan dengan faktor psikologis',
                                            'Halusinasi atau pengalaman internal yang mengganggu',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Fokus Penanganan</p>
                                    <p className="text-sm text-gray-300">Mengakses dan memprogram ulang sistem bawah sadar yang berkaitan dengan kondisi fisik dan pengalaman internal secara terarah.</p>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Hasil yang Dituju</p>
                                    <ul className="space-y-2">
                                        {['Pola psikosomatis dituntaskan', 'Respons tubuh lebih stabil', 'Pengalaman internal terkendali', 'Aktivitas kembali berjalan normal'].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-200 text-sm font-medium">
                                                <svg className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Link
                                href="/layanan/vip"
                                className="mt-8 block text-center py-4 px-6 rounded-full border-2 border-gold-500/50 text-white font-bold hover:bg-gold-500 transition-all duration-300"
                            >
                                Lihat Detail Layanan VIP
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── COMPARISON TABLE ── */}
            <div className="py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Perbandingan</h2>
                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white">Perbandingan Singkat</p>
                    </motion.div>

                    <motion.div {...fadeUp(0.1)} className="overflow-hidden rounded-[2rem] border border-white/60 dark:border-gray-700/50 shadow-xl">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-gold-500/10 to-yellow-500/10 dark:from-gold-500/20 dark:to-yellow-500/20">
                                    <th className="text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Layanan</th>
                                    <th className="text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Fokus</th>
                                    <th className="text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Target</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { layanan: 'Reguler', fokus: 'Pikiran, emosi, perilaku', target: 'Stabil', color: 'bg-blue-500' },
                                    { layanan: 'Premium', fokus: 'Performa & kapasitas internal', target: 'Maksimal', color: 'bg-gold-500' },
                                    { layanan: 'VIP', fokus: 'Psikosomatis & kondisi khusus', target: 'Tuntas', color: 'bg-red-500' },
                                ].map((row, i) => (
                                    <tr key={i} className={`${i % 2 === 0 ? 'bg-white/60 dark:bg-gray-800/40' : 'bg-white/30 dark:bg-gray-800/20'} backdrop-blur-sm transition-colors hover:bg-gold-500/5`}>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                            <span className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${row.color}`}></span>
                                                {row.layanan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{row.fokus}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 font-bold text-xs border border-green-500/20">
                                                {row.target}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </div>

            {/* ── TESTIMONIALS ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Testimoni</h2>
                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">Apa Kata Klien Kami</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.1)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <svg className="w-8 h-8 text-gold-400/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-base italic mb-6">
                                        {item.quote}
                                    </p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${item.tag === 'VIP' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.tag === 'VIP' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                        Sesi {item.tag}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROCESS ── */}
            <div className="py-24 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">Alur</h2>
                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white">Proses Layanan</p>
                    </motion.div>

                    <div className="space-y-8 relative">
                        <div className="absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30"></div>

                        {processSteps.map((step, idx) => (
                            <motion.div key={idx} {...fadeUp(idx * 0.08)} className="relative flex items-start gap-6 group">
                                <div className="relative shrink-0 mt-1">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-xl shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                        {idx + 1}
                                    </div>
                                    <div className="absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl"></div>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400">
                                            {step.icon}
                                        </div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{step.title}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase">FAQ</h2>
                        <p className="mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white">FAQ Hipnoterapi Semarang</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.08)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500"
                            >
                                <p className="font-black text-gray-900 dark:text-white mb-2 flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">Q</span>
                                    {item.q}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed pl-9">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CTA FOOTER ── */}
            <div className="py-24 relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 dark:bg-gold-500/5 blur-[120px] pointer-events-none"></div>

                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div {...fadeUp(0)}>
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-12 shadow-2xl">
                            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest">
                                INDEPTH Klinik
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                                INDEPTH membantu Anda menuntaskan kondisi melalui pemrograman ulang bawah sadar secara terarah dalam satu sesi.
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
                                Mulai dengan konsultasi gratis via WhatsApp sekarang.
                            </p>
                            <a
                                href={WA_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Konsultasi via WhatsApp sekarang
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Suspense fallback={null}>
                <DisclaimerSection />
                <Footer />
            </Suspense>
        </div>
    );
}
