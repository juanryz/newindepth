import { Head, Link } from '@inertiajs/react';
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import LiquidBackground from '@/Components/LiquidBackground';
import PageLoader from '@/Components/PageLoader';

const Footer = lazy(() => import('@/Components/Footer'));
const DisclaimerSection = lazy(() => import('@/Components/DisclaimerSection'));

const WA_LINK = 'https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi%20Layanan%20VIP';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const CheckIcon = ({ gold = false }) => (
    <svg className={`w-4 h-4 ${gold ? 'text-gold-400' : 'text-green-400'} shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
);

export default function LayananVip({ auth, packages = [] }) {
    const vipPkg = packages.find((p) => p.slug === 'vip') || {
        base_price: 8000000,
        current_price: 4000000,
        discount_percentage: 50,
        discount_ends_at: null,
    };

    const formatPrice = (price) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })
            .format(price)
            .replace('IDR', 'Rp');

    const levelKondisi = [
        {
            title: 'Kondisi Ringan (Level Dasar)',
            color: 'border-green-500/30 bg-green-500/5',
            titleColor: 'text-green-600 dark:text-green-400',
            dotColor: 'bg-green-500',
            ciri: ['Gejala muncul sesekali', 'Durasi singkat (beberapa jam hingga 1–2 hari)', 'Intensitas ringan', 'Tubuh kembali stabil dengan penanganan sederhana'],
            contoh: ['Asam lambung naik saat panik satu kali', 'Sulit tidur satu malam', 'Nyeri ringan saat stres sesaat'],
        },
        {
            title: 'Kondisi Berat',
            color: 'border-orange-500/30 bg-orange-500/5',
            titleColor: 'text-orange-600 dark:text-orange-400',
            dotColor: 'bg-orange-500',
            ciri: ['Gejala muncul berulang', 'Intensitas mengganggu aktivitas harian', 'Tubuh memberikan respons yang kuat'],
            contoh: ['Nyeri dada muncul setiap stres', 'Lambung bereaksi setiap tekanan meningkat', 'Jantung berdebar kuat dalam situasi tertentu'],
        },
        {
            title: 'Kondisi Akut',
            color: 'border-red-500/30 bg-red-500/5',
            titleColor: 'text-red-600 dark:text-red-400',
            dotColor: 'bg-red-500',
            ciri: ['Respons tubuh sangat kuat', 'Aktivitas langsung terganggu saat kondisi muncul'],
            contoh: ['Sesak napas mendadak saat panik', 'Tubuh gemetar hebat dalam kondisi tertentu'],
        },
        {
            title: 'Kondisi Kronis',
            color: 'border-purple-500/30 bg-purple-500/5',
            titleColor: 'text-purple-600 dark:text-purple-400',
            dotColor: 'bg-purple-500',
            ciri: ['Berlangsung dalam jangka panjang (minggu, bulan, atau lebih)', 'Pola berulang dengan intensitas yang sama atau meningkat', 'Menjadi bagian dari aktivitas harian'],
            contoh: ['Gangguan lambung berulang selama berbulan-bulan', 'Gangguan tidur jangka panjang', 'Halusinasi yang muncul secara konsisten'],
        },
    ];

    const kondisiGroups = [
        {
            title: 'Psikosomatis',
            color: 'bg-red-500',
            items: [
                'Nyeri dada berulang saat stres',
                'Sesak napas tanpa gangguan medis',
                'Sakit kepala berulang tanpa sebab medis',
                'Nyeri lambung akibat tekanan mental',
                'Gangguan tidur berkepanjangan',
                'Jantung berdebar dalam kondisi tertentu',
                'Tubuh gemetar dalam situasi tertentu',
            ],
        },
        {
            title: 'Gangguan Fungsi Tubuh',
            color: 'bg-orange-500',
            items: [
                'Gangguan pencernaan terkait stres',
                'Gangguan pernapasan tanpa pola medis jelas',
                'Ketegangan otot kronis',
                'Gangguan saraf terkait tekanan mental',
                'Respons tubuh berlebihan terhadap situasi tertentu',
            ],
        },
        {
            title: 'Halusinasi & Persepsi',
            color: 'bg-purple-500',
            items: [
                'Mendengar suara tanpa sumber nyata',
                'Melihat objek yang tidak ada secara fisik',
                'Sensasi kehadiran yang mengganggu',
                'Persepsi realitas berubah dalam kondisi tertentu',
            ],
        },
        {
            title: 'Kondisi Fisik Berat',
            color: 'bg-gray-600',
            items: [
                'Obesitas lebih dari 20 kg dari berat ideal',
                'Pola makan berlebihan yang berdampak pada tubuh',
                'Perubahan berat badan ekstrem berulang',
            ],
        },
        {
            title: 'Ketergantungan Fisik',
            color: 'bg-rose-600',
            items: [
                'Ketergantungan obat dengan gejala sakau',
                'Respons fisik saat zat dihentikan',
                'Dorongan konsumsi zat disertai reaksi tubuh',
                'Ketergantungan zat dengan dampak fisik langsung',
            ],
        },
    ];

    const testimoni = [
        'Saya mengalami nyeri dada saat stres yang muncul berulang. Pemeriksaan medis sudah dilakukan dan kondisi ini terus muncul. Dalam satu sesi VIP, pola tersebut dituntaskan dan aktivitas kembali berjalan normal.',
        'Saya mengalami halusinasi suara yang muncul berulang dan mengganggu aktivitas. Setelah sesi VIP, kondisi tersebut dituntaskan dan aktivitas kembali stabil.',
        'Saya mengalami gangguan lambung yang muncul setiap tekanan meningkat. Setelah sesi VIP, pola tersebut dituntaskan dan tubuh kembali stabil.',
    ];

    const processSteps = ['Konsultasi via WhatsApp', 'Screening mental', 'Login sistem', 'Booking jadwal', 'Pembayaran'];

    const faqItems = [
        { q: 'Siapa yang cocok menggunakan layanan VIP?', a: 'Layanan ini digunakan untuk kondisi yang melibatkan tubuh secara langsung dan berlangsung berulang dalam intensitas tinggi.' },
        { q: 'Apa itu InDepth SOLUTION?', a: 'Metode untuk mengakses kesadaran tubuh dan menemukan solusi yang sesuai dengan kondisi personal.' },
        { q: 'Apakah kondisi yang sudah lama bisa ditangani?', a: 'Pendekatan difokuskan pada kondisi yang berlangsung dalam jangka panjang dan berulang.' },
        { q: 'Bagaimana cara mulai?', a: 'Mulai melalui konsultasi WhatsApp untuk proses screening dan penjadwalan.' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <PageLoader />
            <Head title="Hipnoterapi VIP Semarang — Psikosomatis, Medis Kronis, Halusinasi | InDepth" />
            <LiquidBackground />
            <Navbar auth={auth} active="layanan" />

            {/* ── HERO ── */}
            <main className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                            Layanan VIP — Kondisi Lanjut
                        </span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                        Hipnoterapi VIP Semarang —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-300 to-gold-500">
                            Psikosomatis, Medis Kronis, Halusinasi, dan Kondisi Berat
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
            <div id="detail" className="py-20 relative z-10 bg-gray-900/80 backdrop-blur-md border-y border-gray-700/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)}>
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Tentang Layanan</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">Layanan VIP InDepth Klinik</h3>
                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed font-medium">
                            <p>InDepth Klinik Hipnoterapi Semarang menyediakan layanan VIP untuk kondisi yang berkaitan dengan tubuh, sistem internal, dan pengalaman persepsi yang mengganggu aktivitas harian.</p>
                            <p>Layanan ini digunakan saat kondisi sudah berada pada tingkat berat, berulang, dan berlangsung dalam durasi panjang.</p>
                            <p>Pendekatan menggunakan hipnosis dan trance untuk mengakses serta memprogram ulang sistem bawah sadar secara terarah dalam satu sesi.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── POSISI LAYANAN VIP ── */}
            <div className="py-24 relative z-10 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Posisi</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-white">Posisi Layanan VIP</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <motion.div {...fadeUp(0)} className="bg-black/40 border border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-xl">
                            <p className="text-gray-300 font-medium mb-6">Layanan VIP digunakan untuk kondisi yang berada pada level lanjut. Banyak klien datang setelah menjalani berbagai pendekatan sebelumnya dan masih mengalami pola yang sama.</p>
                            <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">Layanan ini digunakan untuk kondisi yang:</p>
                            <ul className="space-y-3">
                                {['Sudah berlangsung lama', 'Muncul berulang dengan intensitas tinggi', 'Berdampak langsung pada tubuh atau persepsi', 'Mengganggu fungsi aktivitas harian'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckIcon gold />
                                        <span className="text-gray-200 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t border-gray-700">
                                <p className="text-sm text-gold-400 italic font-medium">Pendekatan dilakukan melalui sistem bawah sadar dan kesadaran tubuh.</p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeUp(0.1)} className="bg-gradient-to-br from-red-900/20 to-black/40 border border-red-500/20 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-xl">
                            <h4 className="font-black text-white text-xl mb-6">Metode Utama — InDepth SOLUTION</h4>
                            <p className="text-gray-300 font-medium mb-6">InDepth menggunakan metode InDepth SOLUTION. Metode ini membawa Anda masuk ke komunikasi dengan kesadaran tubuh hingga level seluler.</p>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Mekanisme</p>
                                    {['Mengakses kesadaran tubuh secara langsung', 'Menggali respons internal dari tubuh', 'Mengidentifikasi pola dan sumber kondisi', 'Mengarahkan solusi yang spesifik sesuai kondisi personal'].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 mb-2">
                                            <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">{i + 1}</span>
                                            <p className="text-gray-300 text-sm font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">Nilai Utama</p>
                                    <p className="text-gray-300 text-sm italic">Setiap tubuh memiliki pola dan solusi yang berbeda. Kesadaran tubuh memberikan arah yang paling sesuai dengan kondisi Anda.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Level kondisi */}
                    <motion.div {...fadeUp(0.1)} className="text-center mb-10">
                        <h3 className="text-2xl font-black text-white mb-2">Kriteria Kondisi VIP</h3>
                        <p className="text-gray-400">Berat, Akut, Kronis</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {levelKondisi.map((level, li) => (
                            <motion.div key={li} {...fadeUp(li * 0.08)}
                                className={`border rounded-[2rem] p-6 backdrop-blur-xl ${level.color}`}>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-2.5 h-2.5 rounded-full ${level.dotColor}`}></span>
                                    <h4 className={`font-black text-sm uppercase tracking-wide ${level.titleColor}`}>{level.title}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ciri</p>
                                        <ul className="space-y-1.5">
                                            {level.ciri.map((c, ci) => (
                                                <li key={ci} className="flex items-start gap-2 text-gray-300 text-xs font-medium">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${level.dotColor} mt-1.5 shrink-0`}></span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contoh</p>
                                        <ul className="space-y-1.5">
                                            {level.contoh.map((c, ci) => (
                                                <li key={ci} className="text-gray-400 text-xs italic">{c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeUp(0.2)} className="bg-red-900/20 border border-red-500/20 rounded-[2rem] p-6 backdrop-blur-xl">
                        <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Penegasan</p>
                        <p className="text-gray-300 font-medium mb-3">Layanan VIP digunakan saat kondisi:</p>
                        <div className="flex flex-wrap gap-3">
                            {['Berulang', 'Berdurasi panjang', 'Memiliki intensitas tinggi', 'Berdampak langsung pada tubuh'].map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── KONDISI YANG DITANGANI ── */}
            <div className="py-24 relative z-10 bg-gray-900/80 backdrop-blur-md border-y border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Cakupan</h2>
                        <h3 className="text-3xl font-black text-white">Kondisi yang Ditangani</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {kondisiGroups.map((group, gi) => (
                            <motion.div key={gi} {...fadeUp(gi * 0.08)}
                                className="bg-black/40 border border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl">
                                <div className={`w-8 h-8 rounded-xl ${group.color} flex items-center justify-center mb-4`}>
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h4 className="font-black text-white text-sm uppercase tracking-wide mb-4">{group.title}</h4>
                                <ul className="space-y-2">
                                    {group.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300 text-xs font-medium">
                                            <span className={`w-1.5 h-1.5 rounded-full ${group.color} mt-1.5 shrink-0`}></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── HASIL ── */}
            <div className="py-20 relative z-10 bg-gray-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Target</h2>
                        <h3 className="text-3xl font-black text-white">Hasil yang Dituju</h3>
                    </motion.div>
                    <div className="bg-black/40 border border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl backdrop-blur-xl">
                        <ul className="space-y-4">
                            {[
                                'Pola psikosomatis dituntaskan secara terarah',
                                'Sistem tubuh kembali lebih stabil',
                                'Respons fisik menjadi lebih terkendali',
                                'Persepsi menjadi lebih stabil',
                                'Aktivitas harian berjalan normal',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-200 font-medium">
                                    <CheckIcon gold />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── INVESTASI ── */}
            <div className="py-20 relative z-10 bg-gray-900/80 backdrop-blur-md border-y border-gray-700/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div {...fadeUp(0)}>
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Biaya</h2>
                        <h3 className="text-3xl font-black text-white mb-8">Durasi dan Investasi</h3>
                        <div className="bg-black/60 border border-gray-700/50 rounded-[2.5rem] p-10 shadow-2xl backdrop-blur-xl w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Durasi</p>
                                    <p className="text-3xl font-black text-white">±2 jam</p>
                                    <p className="text-gray-400 font-medium mt-1">1 sesi</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Investasi</p>
                                    {vipPkg.discount_percentage > 0 && (
                                        <p className="text-sm font-bold text-gray-500 line-through decoration-rose-500/50 decoration-2 mb-1">
                                            {formatPrice(vipPkg.base_price)}
                                        </p>
                                    )}
                                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">
                                        {formatPrice(vipPkg.current_price || vipPkg.base_price)}
                                    </p>
                                    <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-500/20">
                                        Diskon 50% hingga 21 Mei 2026
                                    </span>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-700 text-xs text-gray-500 font-medium">
                                *Harga belum termasuk PPN 11%
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── TESTIMONI ── */}
            <div className="py-24 relative z-10 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Testimoni</h2>
                        <h3 className="text-3xl font-black text-white">Apa Kata Klien Kami</h3>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimoni.map((text, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.1)}
                                className="bg-black/40 border border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-xl group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                <svg className="w-8 h-8 text-gold-400/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-300 font-medium leading-relaxed italic relative z-10">{text}</p>
                                <div className="mt-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Sesi VIP
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── PROSES ── */}
            <div className="py-20 relative z-10 bg-gray-900/80 backdrop-blur-md overflow-hidden border-y border-gray-700/50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-12">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">Alur</h2>
                        <h3 className="text-3xl font-black text-white">Proses Layanan</h3>
                    </motion.div>
                    <div className="space-y-6 relative">
                        <div className="absolute left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30"></div>
                        {processSteps.map((step, idx) => (
                            <motion.div key={idx} {...fadeUp(idx * 0.08)} className="relative flex items-center gap-5 group">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">{idx + 1}</div>
                                    <div className="absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl"></div>
                                </div>
                                <div className="flex-1 bg-black/40 backdrop-blur-xl p-5 rounded-[1.5rem] border border-gray-700/50 shadow-md hover:-translate-y-0.5 transition-all duration-300">
                                    <p className="font-bold text-white">{step}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FAQ ── */}
            <div className="py-24 relative z-10 bg-gray-950">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <h2 className="text-base font-semibold text-gold-400 tracking-wide uppercase mb-2">FAQ</h2>
                        <h3 className="text-3xl font-black text-white">FAQ Hipnoterapi VIP</h3>
                    </motion.div>
                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.08)}
                                className="bg-black/40 border border-gray-700/50 rounded-[2rem] p-6 shadow-xl backdrop-blur-xl hover:border-gold-500/30 transition-all duration-300">
                                <p className="font-black text-white mb-2 flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">Q</span>
                                    {item.q}
                                </p>
                                <p className="text-gray-400 font-medium leading-relaxed pl-9">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className="py-24 relative z-10 overflow-hidden bg-gray-900/80 border-t border-gray-700/50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>
                <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div {...fadeUp(0)}>
                        <div className="bg-black/60 border border-gold-500/20 rounded-[3rem] p-12 shadow-2xl backdrop-blur-xl">
                            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-widest">
                                Layanan VIP
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-white mb-2 leading-relaxed">
                                Setiap tubuh memiliki pola dan arah solusi yang spesifik.
                            </p>
                            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                                InDepth membantu Anda mengakses dan menjalankannya melalui pemrograman bawah sadar secara terarah.
                            </p>
                            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                Konsultasi via WhatsApp sekarang
                            </a>
                            <div className="mt-6">
                                <Link href="/layanan" className="text-sm text-gray-500 hover:text-gold-400 font-medium transition-colors">
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
