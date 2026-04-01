import { Head, Link } from '@inertiajs/react';
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import LiquidBackground from '@/Components/LiquidBackground';
import PageLoader from '@/Components/PageLoader';

const Footer = lazy(() => import('@/Components/Footer'));
const DisclaimerSection = lazy(() => import('@/Components/DisclaimerSection'));

const WA_LINK = 'https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi%20Layanan%20Reguler';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const CheckIcon = () => (
    <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
);

const DotIcon = ({ color = 'bg-blue-500' }) => (
    <span className={`w-1.5 h-1.5 rounded-full ${color} mt-1.5 shrink-0`}></span>
);

export default function LayananReguler({ auth, packages = [] }) {
    const regulerPkg = packages.find((p) => p.slug === 'reguler') || {
        base_price: 0,
        current_price: 0,
        discount_percentage: 0,
        discount_ends_at: null,
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
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

    const masalahGroups = [
        {
            title: 'Pikiran',
            color: 'bg-blue-500',
            badgeClass: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
            items: [
                'Overthinking yang terus berjalan sepanjang hari',
                'Pikiran sulit berhenti saat malam hari',
                'Pikiran negatif yang muncul terus-menerus',
                'Kekhawatiran berulang terhadap situasi tertentu',
                'Pikiran berulang terhadap kejadian masa lalu',
                'Pikiran penuh keraguan terhadap diri sendiri',
            ],
        },
        {
            title: 'Emosi',
            color: 'bg-purple-500',
            badgeClass: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
            items: [
                'Kecemasan yang muncul berulang',
                'Emosi mudah meledak dalam situasi sederhana',
                'Rasa tegang dalam aktivitas sehari-hari',
                'Perasaan tertekan dalam pekerjaan atau hubungan',
                'Emosi berubah dengan cepat',
                'Rasa gelisah sepanjang hari',
            ],
        },
        {
            title: 'Perilaku',
            color: 'bg-orange-500',
            badgeClass: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
            items: [
                'Kebiasaan buruk yang berulang terus-menerus',
                'Menunda pekerjaan setiap hari',
                'Sulit konsisten dalam aktivitas',
                'Kebiasaan impulsif yang merugikan',
                'Pola tindakan yang mengganggu pekerjaan',
                'Pola sabotase diri dalam aktivitas',
            ],
        },
        {
            title: 'Fungsi Harian',
            color: 'bg-red-500',
            badgeClass: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
            items: [
                'Aktivitas terganggu karena pikiran dan emosi',
                'Pekerjaan tertunda karena pola berulang',
                'Interaksi terganggu karena emosi tidak stabil',
            ],
        },
    ];

    const problems30 = [
        {
            title: 'Pikiran & Mental',
            color: 'bg-blue-500',
            items: [
                'Overthinking sepanjang hari',
                'Pikiran sulit berhenti saat malam',
                'Pikiran negatif berulang',
                'Kekhawatiran berlebihan',
                'Pikiran pada kesalahan masa lalu',
                'Pikiran skenario buruk terus muncul',
                'Sulit mengambil keputusan',
                'Keraguan terhadap diri sendiri',
            ],
        },
        {
            title: 'Emosi',
            color: 'bg-purple-500',
            items: [
                'Kecemasan berulang',
                'Rasa tegang sepanjang aktivitas',
                'Emosi mudah meledak',
                'Perasaan tertekan',
                'Rasa takut berlebihan',
                'Perasaan tidak tenang',
                'Emosi berubah cepat',
                'Gelisah sepanjang hari',
            ],
        },
        {
            title: 'Perilaku',
            color: 'bg-orange-500',
            items: [
                'Kebiasaan buruk berulang',
                'Menunda pekerjaan',
                'Sulit konsisten',
                'Pola sabotase diri',
                'Kebiasaan impulsif',
                'Pola tindakan merugikan',
                'Menghindari tanggung jawab',
                'Pola perilaku yang berulang',
            ],
        },
        {
            title: 'Kecanduan Ringan',
            color: 'bg-red-500',
            items: [
                'Kecanduan gadget atau media sosial',
                'Kecanduan pornografi',
                'Kecanduan merokok',
                'Kebiasaan konsumsi berulang',
                'Dorongan melakukan kebiasaan tertentu',
                'Pola kebiasaan yang sulit dihentikan',
            ],
        },
    ];

    const testimoni = [
        'Saya mengalami overthinking setiap malam sampai sulit tidur. Pikiran terus berjalan dan sulit berhenti. Dalam satu sesi Reguler, kondisi tersebut dituntaskan dan tidur kembali normal.',
        'Saya memiliki kebiasaan menunda pekerjaan setiap hari. Setiap mulai kerja, pekerjaan tertunda terus. Setelah sesi Reguler, pola tersebut dituntaskan dan pekerjaan selesai dengan normal.',
        'Saya mengalami kecemasan setiap pagi sebelum bekerja. Kondisi ini mengganggu aktivitas harian. Dalam satu sesi, pola tersebut dituntaskan dan aktivitas berjalan normal.',
    ];

    const processSteps = ['Konsultasi via WhatsApp', 'Screening mental', 'Login sistem', 'Booking jadwal', 'Pembayaran'];

    const faqItems = [
        { q: 'Apakah layanan ini cocok untuk overthinking?', a: 'Layanan Reguler digunakan untuk menuntaskan pola overthinking melalui pemrograman ulang bawah sadar.' },
        { q: 'Apakah bisa untuk kecemasan berulang?', a: 'Pendekatan difokuskan pada pola kecemasan yang muncul berulang.' },
        { q: 'Apakah kebiasaan buruk bisa ditangani?', a: 'Kebiasaan buruk yang berulang dapat dituntaskan melalui pemrograman ulang program bawah sadar.' },
        { q: 'Apakah layanan ini untuk peningkatan performa?', a: 'Layanan Reguler difokuskan pada penanganan kondisi bermasalah hingga kembali netral.' },
        { q: 'Bagaimana cara mulai?', a: 'Mulai melalui konsultasi WhatsApp untuk proses screening dan penjadwalan.' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <PageLoader />
            <Head title="Hipnoterapi Reguler Semarang — Mengatasi Overthinking, Kecemasan, dan Kebiasaan Buruk | InDepth">
                <meta name="description" content="Paket Hipnoterapi Reguler InDepth Semarang: solusi efektif untuk overthinking, kecemasan, fobia, insomnia, dan kebiasaan buruk. Sesi privat dengan terapis bersertifikat, proses terstruktur dan aman." />
                <meta name="keywords" content="hipnoterapi reguler Semarang, mengatasi overthinking, terapi kecemasan, hipnoterapi fobia, terapi insomnia, hipnoterapi kebiasaan buruk, InDepth Semarang" />
                <meta property="og:title" content="Hipnoterapi Reguler Semarang — Mengatasi Overthinking, Kecemasan & Kebiasaan Buruk | InDepth" />
                <meta property="og:description" content="Paket Reguler InDepth: hipnoterapi privat untuk overthinking, kecemasan, fobia, insomnia, dan kebiasaan buruk. Terapis bersertifikat di Semarang." />
                <meta property="og:image" content="/images/og-dark.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
                <meta property="og:locale" content="id_ID" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hipnoterapi Reguler Semarang | InDepth" />
                <meta name="twitter:description" content="Hipnoterapi privat untuk overthinking, kecemasan, fobia, insomnia. Terapis bersertifikat di Semarang." />
                <meta name="twitter:image" content="/images/og-dark.jpg" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Hipnoterapi Reguler InDepth",
                    "description": "Paket hipnoterapi untuk mengatasi overthinking, kecemasan, fobia, insomnia, dan kebiasaan buruk melalui sesi privat terstruktur.",
                    "provider": {
                        "@type": "MedicalBusiness",
                        "name": "InDepth Mental Wellness",
                        "url": typeof window !== 'undefined' ? window.location.origin : '',
                        "telephone": "+6282220800034",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Jalan Kelud Raya 34B",
                            "addressLocality": "Semarang",
                            "addressRegion": "Jawa Tengah",
                            "addressCountry": "ID"
                        }
                    },
                    "areaServed": { "@type": "City", "name": "Semarang" },
                    "url": typeof window !== 'undefined' ? window.location.href : ''
                }) }} />
            </Head>
            <LiquidBackground />
            <Navbar auth={auth} active="layanan" />

            {/* ── HERO ── */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                            Layanan Reguler
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                        Hipnoterapi Reguler Semarang —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-gold-500">
                            Mengatasi Overthinking, Kecemasan, dan Kebiasaan Buruk
                        </span>
                    </motion.h1>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a href="#detail" className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 transition-all duration-300 border border-gold-300/40">
                            Lihat Detail
                            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </a>
                        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Konsultasi via WhatsApp
                        </a>
                    </motion.div>
                </div>
            </main>

            {/* ── INTRO ── */}
            <div id="detail" className="py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)}>
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Tentang Layanan</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">Layanan Reguler InDepth Klinik</h3>
                        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            <p>InDepth Klinik Hipnoterapi Semarang menyediakan layanan Reguler untuk membantu Anda menuntaskan masalah pikiran, emosi, dan perilaku.</p>
                            <p>Pendekatan menggunakan hipnosis dan trance untuk memprogram ulang bawah sadar secara terarah dalam satu sesi.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── MASALAH YANG DIALAMI ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Kondisi</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Masalah yang Anda Alami</h3>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Layanan Reguler digunakan untuk kondisi seperti:</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {masalahGroups.map((group, gi) => (
                            <motion.div key={gi} {...fadeUp(gi * 0.1)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${group.badgeClass}`}>
                                        <span className={`w-2 h-2 rounded-full ${group.color}`}></span>
                                        {group.title}
                                    </span>
                                </div>
                                <ul className="space-y-2.5">
                                    {group.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                                            <DotIcon color={group.color} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 30 MASALAH ── */}
            <div className="py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Cakupan Layanan</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">30 Masalah Spesifik yang Dapat Ditangani</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {problems30.map((group, gi) => (
                            <motion.div key={gi} {...fadeUp(gi * 0.08)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-8 h-8 rounded-xl ${group.color} flex items-center justify-center mb-4`}>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">{group.title}</h4>
                                <ol className="space-y-2">
                                    {group.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium">
                                            <span className={`w-4 h-4 rounded-full ${group.color} text-white flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5`}>
                                                {gi * 8 + i + 1 <= 30 ? gi * 8 + i + 1 : ''}
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ol>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PENDEKATAN & HASIL ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <motion.div {...fadeUp(0)}>
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Metode</h2>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Pendekatan InDepth</h3>
                            <div className="space-y-4">
                                {[
                                    'Pendekatan InDepth mengakses bawah sadar Anda.',
                                    'Memprogram ulang program bawah sadar menjadi lebih tepat dan terarah.',
                                    'Mengintegrasikan perubahan ke seluruh sistem tubuh Anda.',
                                    'Menuntaskan hasil dan mengevaluasinya langsung dalam satu sesi.',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[1.5rem] p-5 shadow-sm">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-sm shrink-0">{i + 1}</div>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp(0.1)}>
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Target</h2>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Hasil yang Dituju</h3>
                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl">
                                <ul className="space-y-4">
                                    {[
                                        'Pikiran lebih terkendali dan tidak berulang terus-menerus',
                                        'Emosi lebih stabil dalam aktivitas sehari-hari',
                                        'Kebiasaan buruk berhenti berulang',
                                        'Pola perilaku menjadi lebih terarah',
                                        'Aktivitas pekerjaan berjalan lebih efektif',
                                        'Aktivitas harian kembali berjalan normal',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                            <CheckIcon />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-sm text-gold-600 dark:text-gold-400 font-bold italic">
                                        Fokus layanan ini adalah membawa kondisi dari bermasalah menjadi netral dan terkendali.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── INVESTASI ── */}
            <div className="py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeUp(0)}>
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Biaya</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Durasi dan Investasi</h3>
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-10 shadow-xl inline-block w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Durasi</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">±2 jam</p>
                                    <p className="text-gray-500 font-medium mt-1">1 sesi</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Investasi</p>
                                    {regulerPkg.discount_percentage > 0 && (
                                        <p className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2 mb-1">
                                            {formatPrice(regulerPkg.base_price)}
                                        </p>
                                    )}
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">
                                        {formatPrice(regulerPkg.current_price || regulerPkg.base_price)}
                                    </p>
                                    {regulerPkg.discount_percentage > 0 && regulerPkg.discount_ends_at && (
                                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-500/20">
                                            Diskon {regulerPkg.discount_percentage}% hingga {formatDate(regulerPkg.discount_ends_at)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 font-medium">
                                *Harga belum termasuk PPN 11%
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── TESTIMONI ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Testimoni</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">Apa Kata Klien Kami</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimoni.map((text, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.1)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                <svg className="w-8 h-8 text-gold-400/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic relative z-10">{text}</p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Sesi Reguler
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROSES ── */}
            <div className="py-20 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Alur</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">Proses Layanan</h3>
                    </motion.div>
                    <div className="space-y-6 relative">
                        <div className="absolute left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30"></div>
                        {processSteps.map((step, idx) => (
                            <motion.div key={idx} {...fadeUp(idx * 0.08)} className="relative flex items-center gap-5 group">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                        {idx + 1}
                                    </div>
                                    <div className="absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl"></div>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 dark:border-gray-700/50 shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                    <p className="font-bold text-gray-900 dark:text-white">{step}</p>
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
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">FAQ</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">FAQ Hipnoterapi Reguler</h3>
                    </motion.div>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.08)}
                                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500">
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

            {/* ── CTA ── */}
            <div className="py-24 relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>
                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div {...fadeUp(0)}>
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-12 shadow-2xl">
                            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest">
                                Layanan Reguler
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4">Mulai Sekarang</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                Kondisi yang Anda alami dapat dituntaskan hingga kembali netral dan terkendali.
                            </p>
                            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Konsultasi via WhatsApp sekarang
                            </a>
                            <div className="mt-6">
                                <Link href="/layanan" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors">
                                    ← Kembali ke semua layanan
                                </Link>
                            </div>
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
