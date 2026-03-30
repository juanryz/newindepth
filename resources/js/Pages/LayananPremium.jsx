import { Head, Link } from '@inertiajs/react';
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import LiquidBackground from '@/Components/LiquidBackground';
import PageLoader from '@/Components/PageLoader';

const Footer = lazy(() => import('@/Components/Footer'));
const DisclaimerSection = lazy(() => import('@/Components/DisclaimerSection'));

const WA_LINK = 'https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi%20Layanan%20Premium';

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

export default function LayananPremium({ auth, packages = [] }) {
    const premiumPkg = packages.find((p) => p.slug === 'premium') || {
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

    const areaPengembangan = [
        {
            title: 'Fokus & Produktivitas',
            color: 'bg-gold-500',
            items: [
                'Meningkatkan fokus saat bekerja',
                'Meningkatkan konsentrasi dalam aktivitas',
                'Mengatasi mudah terdistraksi',
                'Meningkatkan produktivitas harian',
                'Konsistensi dalam menyelesaikan pekerjaan',
            ],
        },
        {
            title: 'Mental & Keputusan',
            color: 'bg-blue-500',
            items: [
                'Kepercayaan diri saat berbicara',
                'Kejelasan dalam mengambil keputusan',
                'Ketegasan dalam bertindak',
                'Kontrol diri dalam situasi sulit',
                'Stabilitas mental dalam tekanan',
            ],
        },
        {
            title: 'Performa & Karier',
            color: 'bg-purple-500',
            items: [
                'Performa kerja yang stabil',
                'Kemampuan bekerja di bawah tekanan',
                'Pengembangan kapasitas mental',
                'Peningkatan kualitas kerja',
                'Konsistensi performa harian',
            ],
        },
        {
            title: 'Emosi & Kontrol Diri',
            color: 'bg-orange-500',
            items: [
                'Pengelolaan emosi dalam situasi penting',
                'Stabilitas emosi saat bekerja',
                'Ketenangan saat menghadapi tekanan',
                'Pengendalian reaksi emosional',
                'Respons yang lebih terarah dalam situasi sulit',
            ],
        },
        {
            title: 'Diri & Kebiasaan',
            color: 'bg-teal-500',
            items: [
                'Disiplin dalam aktivitas harian',
                'Konsistensi dalam kebiasaan positif',
                'Penguatan pola pikir terarah',
                'Penguatan identitas diri',
                'Penguatan kebiasaan produktif',
            ],
        },
        {
            title: 'Performa Sosial',
            color: 'bg-pink-500',
            items: [
                'Percaya diri saat berbicara di depan umum',
                'Interaksi yang lebih terarah',
                'Komunikasi yang lebih jelas',
                'Kehadiran diri yang lebih kuat',
                'Pengaruh personal dalam lingkungan kerja',
            ],
        },
    ];

    const testimoni = [
        'Saya ingin meningkatkan fokus saat bekerja. Dalam satu sesi Premium, kondisi fokus menjadi lebih stabil dan bisa digunakan kapan pun dibutuhkan.',
        'Saya menggunakan layanan Premium untuk kepercayaan diri saat presentasi. Setelah sesi, kondisi tersebut bisa saya aktifkan langsung saat dibutuhkan.',
        'Saya sering kehilangan arah saat bekerja. Setelah sesi Premium, saya memiliki kondisi mental yang lebih terarah dan bisa digunakan secara konsisten.',
    ];

    const processSteps = ['Konsultasi via WhatsApp', 'Screening mental', 'Login sistem', 'Booking jadwal', 'Pembayaran'];

    const faqItems = [
        { q: 'Apa perbedaan Premium dengan Reguler?', a: 'Reguler difokuskan pada penanganan kondisi bermasalah. Premium difokuskan pada pengembangan potensi dan performa.' },
        { q: 'Apakah layanan ini untuk peningkatan fokus?', a: 'Layanan Premium digunakan untuk mengembangkan fokus hingga kondisi optimal.' },
        { q: 'Apa itu trigger potensi?', a: 'Trigger potensi adalah kombinasi gerakan dan kata internal untuk mengaktifkan kondisi optimal secara langsung.' },
        { q: 'Apakah kondisi optimal bisa digunakan kapan saja?', a: 'Trigger digunakan untuk mengakses kondisi tersebut dalam aktivitas sehari-hari.' },
        { q: 'Bagaimana cara mulai?', a: 'Mulai melalui konsultasi WhatsApp untuk proses screening dan penjadwalan.' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <PageLoader />
            <Head title="Hipnoterapi Premium Semarang — Optimalisasi Performa dan Pengembangan Diri | InDepth">
                <meta name="description" content="Paket Hipnoterapi Premium InDepth Semarang: program intensif untuk optimalisasi performa, kepercayaan diri, pengembangan diri, dan trauma mendalam. Sesi privat eksklusif dengan terapis senior bersertifikat." />
                <meta name="keywords" content="hipnoterapi premium Semarang, optimalisasi performa, pengembangan diri hipnoterapi, terapi trauma, kepercayaan diri, hipnoterapi intensif, InDepth premium" />
                <meta property="og:title" content="Hipnoterapi Premium Semarang — Optimalisasi Performa & Pengembangan Diri | InDepth" />
                <meta property="og:description" content="Paket Premium InDepth: hipnoterapi intensif untuk performa optimal, kepercayaan diri, dan pemrosesan trauma mendalam. Eksklusif, privat, dan terstruktur." />
                <meta property="og:image" content="/images/og-dark.jpg" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
                <meta property="og:locale" content="id_ID" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hipnoterapi Premium Semarang | InDepth" />
                <meta name="twitter:description" content="Hipnoterapi intensif untuk performa optimal, kepercayaan diri, dan trauma mendalam. InDepth Semarang." />
                <meta name="twitter:image" content="/images/og-dark.jpg" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "Hipnoterapi Premium InDepth",
                    "description": "Paket hipnoterapi intensif untuk optimalisasi performa, pengembangan diri, dan pemrosesan trauma mendalam melalui sesi privat eksklusif.",
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
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                            Layanan Premium — Direkomendasikan
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                        Hipnoterapi Premium Semarang —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600">
                            Optimalisasi Performa dan Pengembangan Diri
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
                        <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">Layanan Premium InDepth Klinik</h3>
                        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                            <p>InDepth Klinik Hipnoterapi Semarang menyediakan layanan Premium untuk membantu Anda mengembangkan potensi diri melalui hipnosis dan trance.</p>
                            <p>Pendekatan difokuskan pada pemrograman ulang bawah sadar untuk mendukung performa dan kapasitas maksimal internal dalam satu sesi.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── POSISI LAYANAN ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <motion.div {...fadeUp(0)}>
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Posisi</h2>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Posisi Layanan Premium</h3>
                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl">
                                <p className="text-gray-600 dark:text-gray-300 font-medium mb-6">Layanan Premium digunakan saat kondisi Anda sudah stabil dan siap dikembangkan.</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Pendekatan difokuskan pada:</p>
                                <ul className="space-y-4">
                                    {[
                                        'Mengukur potensi internal dalam skala 1–10',
                                        'Mengarahkan potensi hingga mencapai titik maksimal (10)',
                                        'Menetapkan kondisi optimal sebagai standar baru dalam diri Anda',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckIcon />
                                            <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp(0.1)}>
                            <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Mekanisme</h2>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Trigger Potensi</h3>
                            <div className="space-y-4">
                                <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Mekanisme Peningkatan Potensi</p>
                                    {[
                                        'Pendekatan InDepth mengakses bawah sadar Anda.',
                                        'Memprogram ulang sistem internal untuk mencapai performa maksimal.',
                                        'Mengintegrasikan kondisi optimal ke seluruh sistem tubuh Anda.',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                                            <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs font-black shrink-0">{i + 1}</div>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-gradient-to-br from-gold-500/10 to-yellow-500/5 dark:from-gold-500/20 dark:to-yellow-500/10 border border-gold-500/30 rounded-[2rem] p-6">
                                    <p className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-4">Setelah kondisi optimal tercapai</p>
                                    <ul className="space-y-3">
                                        {[
                                            { label: 'Trigger Potensi', desc: 'Gerakan sederhana sebagai pemicu' },
                                            { label: 'Kata Internal', desc: 'Kata internal sebagai penguat' },
                                            { label: 'Aktivasi', desc: 'Aktivasi kondisi optimal secara langsung' },
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs font-black shrink-0">✦</span>
                                                <div>
                                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</span>
                                                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">{item.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-xs text-gold-700 dark:text-gold-300 italic font-medium">
                                        Trigger ini memungkinkan Anda mengakses kondisi performa maksimal kapan pun dibutuhkan dalam aktivitas sehari-hari.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── HASIL ── */}
            <div className="py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Target</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">Hasil yang Dituju</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { icon: '🎯', text: 'Fokus berada pada kondisi optimal saat dibutuhkan' },
                            { icon: '⚡', text: 'Keputusan diambil dengan lebih jelas dan tegas' },
                            { icon: '🛡️', text: 'Kontrol diri berjalan stabil dalam berbagai situasi' },
                            { icon: '📈', text: 'Performa kerja berjalan sesuai kapasitas maksimal' },
                            { icon: '🔑', text: 'Akses kondisi optimal dapat digunakan secara mandiri' },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.07)}
                                className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[1.5rem] p-5 flex items-start gap-4 shadow-sm hover:-translate-y-1 transition-all duration-300">
                                <span className="text-2xl">{item.icon}</span>
                                <p className="text-gray-700 dark:text-gray-200 font-medium text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CONTOH KONDISI ── */}
            <div className="py-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Contoh Kondisi</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">Contoh Kondisi yang Dikembangkan</h3>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Layanan Premium digunakan untuk:</p>
                    </motion.div>
                    <motion.div {...fadeUp(0.1)} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                'Fokus kerja',
                                'Kepercayaan diri saat presentasi',
                                'Ketenangan dalam tekanan',
                                'Kejelasan berpikir dalam keputusan',
                                'Konsistensi dalam aktivitas',
                                'Stabilitas performa dalam pekerjaan',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/40 rounded-2xl border border-white/50 dark:border-gray-700/40">
                                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white flex items-center justify-center text-xs font-black shrink-0">✦</span>
                                    <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── 30 AREA PENGEMBANGAN ── */}
            <div className="py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Cakupan</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">30 Area Pengembangan Diri</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areaPengembangan.map((group, gi) => {
                            const startNum = gi * 5 + 1;
                            return (
                                <motion.div key={gi} {...fadeUp(gi * 0.08)}
                                    className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className={`w-8 h-8 rounded-xl ${group.color} flex items-center justify-center mb-4`}>
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4">{group.title}</h4>
                                    <ol className="space-y-2">
                                        {group.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium">
                                                <span className={`w-4 h-4 rounded-full ${group.color} text-white flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5`}>
                                                    {startNum + i}
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ol>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── INVESTASI ── */}
            <div className="py-20 relative z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeUp(0)}>
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">Biaya</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Durasi dan Investasi</h3>
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[2.5rem] p-10 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Durasi</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">±2 jam</p>
                                    <p className="text-gray-500 font-medium mt-1">1 sesi</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Investasi</p>
                                    {premiumPkg.discount_percentage > 0 && (
                                        <p className="text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2 mb-1">
                                            {formatPrice(premiumPkg.base_price)}
                                        </p>
                                    )}
                                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">
                                        {formatPrice(premiumPkg.current_price || premiumPkg.base_price)}
                                    </p>
                                    {premiumPkg.discount_percentage > 0 && premiumPkg.discount_ends_at && (
                                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-500/20">
                                            Diskon {premiumPkg.discount_percentage}% hingga {formatDate(premiumPkg.discount_ends_at)}
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
            <div className="py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
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
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>Sesi Premium
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROSES ── */}
            <div className="py-20 relative z-10 overflow-hidden">
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
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">{idx + 1}</div>
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
            <div className="py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2">FAQ</h2>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white">FAQ Hipnoterapi Premium</h3>
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
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/30 rounded-[3rem] p-12 shadow-2xl">
                            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest">
                                Layanan Premium
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 leading-relaxed">
                                Potensi dalam diri Anda dapat diarahkan hingga mencapai kondisi optimal.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                InDepth membantu Anda memprogramnya secara terarah dalam satu sesi.
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
