import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LiquidBackground from '@/Components/LiquidBackground';

export default function IndepthTrance({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
            <Head title="INDEPTH TRANCE — Akses Unconscious dan Kecerdasan Tubuh" />

            <LiquidBackground />
            <Navbar auth={auth} active="methods" />

            <main className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6"
                        >
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                            Pilar Pertama Sistem Metodologis INDEPTH
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6"
                        >
                            INDEPTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">TRANCE</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold"
                        >
                            Akses Unconscious dan Kecerdasan Tubuh
                        </motion.p>
                    </div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        {/* Summary Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 relative z-10">
                                <strong>INDEPTH TRANCE</strong> adalah kondisi untuk berkomunikasi langsung dengan unconscious, termasuk kecerdasan tubuh yang mengelola fungsi organ, respons fisik, dan pola internal yang berjalan secara otomatis.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10">
                                Melalui kondisi ini, sistem tubuh dapat diakses dan diarahkan secara langsung — berbeda dengan hipnosis umum yang bekerja pada level gelombang pikiran seperti alpha dan theta. INDEPTH TRANCE bekerja pada level <strong className="text-gold-600 dark:text-gold-400">unconscious</strong>.
                            </p>
                            <p className="text-lg text-gold-600 dark:text-gold-400 leading-relaxed relative z-10 font-bold italic">
                                Pendekatan ini menjadi fondasi utama dalam metodologi INDEPTH.
                            </p>
                        </motion.div>

                        {/* Hierarchy Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Posisi Dalam Hierarki Metode</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">Sistem INDEPTH bekerja dalam tiga lapisan:</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-gold-500/20 border border-gold-500/30 p-5 rounded-3xl shadow-lg ring-1 ring-gold-500/20">
                                        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-black shrink-0 shadow-xl">1</div>
                                        <div>
                                            <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">INDEPTH TRANCE</h4>
                                            <p className="text-sm font-bold text-gold-700 dark:text-gold-400">→ Akses ke unconscious dan kecerdasan tubuh</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60">
                                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">SUPREME TRANCE</h4>
                                            <p className="text-sm text-gray-500">→ Akses sadar ke unconscious</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60">
                                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0">3</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">INDEPTH SOLUTION</h4>
                                            <p className="text-sm text-gray-500">→ Komunikasi dengan kecerdasan tubuh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-gray-950 to-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl flex items-center border border-white/10">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full pointer-events-none"></div>
                                <p className="text-xl md:text-2xl font-bold relative z-10 italic leading-snug text-gold-100">
                                    "INDEPTH TRANCE adalah pintu masuk utama ke sistem metodologi INDEPTH Klinik."
                                </p>
                            </div>
                        </div>

                        {/* Karakter & Tingkat Kesadaran Section */}
                        <div className="py-12">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter">Karakter &amp; Tingkat Kesadaran</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        num: "1⃣",
                                        title: "Kondisi Tubuh",
                                        points: [
                                            "Tubuh berada dalam kondisi seperti tidur normal",
                                            "Pernapasan stabil dan rileks",
                                            "Dapat muncul dengkuran",
                                            "Tubuh tidak aktif secara sadar",
                                            "Respon motorik tetap aktif"
                                        ]
                                    },
                                    {
                                        num: "2⃣",
                                        title: "Tingkat Kesadaran",
                                        points: [
                                            "Kesadaran bersifat dinamis",
                                            "Berada dalam kondisi setengah sadar",
                                            "Berpindah antara sadar dan tidak sadar",
                                            "Tetap dapat memberikan respons"
                                        ]
                                    },
                                    {
                                        num: "3⃣",
                                        title: "Bentuk Respons",
                                        points: [
                                            "Respons verbal (jawaban langsung)",
                                            "Respons motorik (gerakan sebagai penanda ya atau tidak)",
                                            "Digunakan untuk berkomunikasi dengan unconscious"
                                        ]
                                    },
                                    {
                                        num: "4⃣",
                                        title: "Perbedaan dengan Hipnosis Umum",
                                        points: [
                                            "Akses langsung ke kecerdasan tubuh",
                                            "Data internal tubuh dapat digali secara spesifik",
                                            "Perubahan dapat diarahkan ke sistem fisik",
                                            "Proses lebih terarah sesuai kondisi personal"
                                        ]
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform">
                                        <div className="text-2xl mb-4">{item.num}</div>
                                        <h4 className="font-black text-xl text-gray-900 dark:text-white mb-4 leading-tight">{item.title}</h4>
                                        <ul className="space-y-2">
                                            {item.points.map((p, pi) => (
                                                <li key={pi} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-medium">
                                                    <span className="text-gold-500 text-lg">•</span>
                                                    <span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-12 text-center text-xl font-black text-gold-600 dark:text-gold-400 italic">
                                Kondisi ini membuka akses ke sistem terdalam dari kecerdasan tubuh.
                            </p>
                        </div>

                        {/* Fungsi Utama Section */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase">Fungsi Utama INDEPTH TRANCE</h3>
                                    <p className="text-xl font-bold text-gold-600 dark:text-gold-400 mb-6">INDEPTH TRANCE digunakan untuk:</p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            "Mengakses unconscious secara langsung",
                                            "Menghubungkan dengan kecerdasan tubuh",
                                            "Menggali data internal yang spesifik",
                                            "Memprogram ulang sistem bawah sadar",
                                            "Mengarahkan perubahan hingga ke level fisik"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-lg font-bold text-gray-800 dark:text-gray-100">
                                                <div className="w-2.5 h-2.5 rounded-full bg-gold-500"></div>
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-10 text-xl font-black text-gray-900 dark:text-white bg-white/20 dark:bg-white/5 inline-block px-6 py-2 rounded-2xl border border-white/10">
                                        Perubahan berjalan melalui pemrograman ulang dan integrasi ke tubuh.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Akses ke Kecerdasan Tubuh */}
                        <div className="py-12">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-tighter underline decoration-gold-500 decoration-8 underline-offset-8">Akses ke Kecerdasan Tubuh</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        title: "Pola Internal",
                                        items: ["pola internal yang berulang dapat diakses", "sistem tubuh memberikan data spesifik", "arah solusi muncul dari sistem internal"]
                                    },
                                    {
                                        title: "Pemrograman Ulang",
                                        items: ["mengubah pola yang berjalan", "mengarahkan perubahan sistem fisik", "integrasi ke seluruh tubuh"]
                                    },
                                    {
                                        title: "Dasar Metode Lanjutan",
                                        items: ["fondasi sebelum INDEPTH SOLUTION", "fondasi sebelum SUPREME TRANCE", "digunakan di seluruh sesi Reguler"]
                                    }
                                ].map((group, i) => (
                                    <div key={i} className="p-8 bg-white/40 dark:bg-gray-900/60 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl overflow-hidden group hover:bg-white transition-colors duration-500">
                                        <h4 className="text-gold-600 dark:text-gold-400 font-black mb-6 uppercase text-sm tracking-widest">{group.title}</h4>
                                        <ul className="text-gray-900 dark:text-gray-100 text-lg font-bold space-y-3">
                                            {group.items.map((item, ii) => (
                                                <li key={ii} className="flex items-start gap-2">
                                                    <span className="text-gold-500 opacity-50">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Peran Dalam Metodologi */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="relative overflow-hidden bg-white/40 dark:bg-gray-950/40 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3.5rem] p-8 md:p-16 shadow-2xl"
                        >
                            <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase">Peran Dalam Metodologi INDEPTH</h3>
                                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                                        INDEPTH TRANCE digunakan sebagai <strong className="text-gold-600 font-black">fondasi dalam seluruh metode INDEPTH</strong>. Seluruh proses di INDEPTH Klinik dimulai dari kondisi ini:
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            "digunakan dalam layanan Reguler",
                                            "dasar untuk INDEPTH SOLUTION",
                                            "dasar untuk SUPREME TRANCE",
                                            "dapat digunakan pada kondisi psikosomatis"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-gray-200">
                                                <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-600 dark:text-gray-400 italic font-medium leading-relaxed">
                                        INDEPTH TRANCE menjadi <strong className="text-gold-600 dark:text-gold-400 font-black tracking-widest uppercase">pintu masuk</strong> ke proses INDEPTH SOLUTION dan kondisi lanjutan lainnya.
                                    </p>
                                </div>
                                <div className="w-full lg:w-2/5 flex flex-col gap-6">
                                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-10 text-center shadow-2xl border border-white/10 ring-4 ring-gold-500/20 group">
                                        <h4 className="text-4xl font-black mb-4 tracking-tighter text-gold-500 drop-shadow-[0_0_20px_rgba(208,170,33,0.3)]">FONDASI</h4>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="h-1 w-8 bg-gold-500/30 rounded-full"></span>
                                            <p className="font-black text-white uppercase text-[10px] tracking-[0.3em] opacity-80">Metodologi INDEPTH</p>
                                            <span className="h-1 w-8 bg-gold-500/30 rounded-full"></span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-8">
                                            {['Terarah', 'Spesifik', 'Terstruktur', 'Mendalam'].map((tag, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl py-2 text-[10px] font-black text-gold-400/80 uppercase tracking-widest">
                                                    {tag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Kapan Digunakan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative p-10 bg-gray-950 rounded-[3rem] text-white overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors">
                                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-2xl font-black mb-4 text-gold-500 uppercase tracking-tighter">Layanan Reguler</h3>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                    Digunakan pada seluruh sesi <Link href="/layanan/reguler" className="text-gold-400 hover:text-gold-300 underline decoration-2 underline-offset-4 font-black">Layanan Reguler</Link> sebagai metode utama untuk penanganan pikiran, emosi, dan perilaku.
                                </p>
                            </div>
                            <div className="group relative p-10 bg-gray-950 rounded-[3rem] text-white overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors">
                                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <h3 className="text-2xl font-black mb-4 text-gold-500 uppercase tracking-tighter">Layanan VIP</h3>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                    Digunakan sebagai fondasi sebelum <Link href="/metode/indepth-solution" className="text-gold-400 hover:text-gold-300 underline decoration-2 underline-offset-4 font-black">INDEPTH SOLUTION</Link> untuk mengakses sistem tubuh dan kondisi psikosomatis.
                                </p>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="py-12">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter">FAQ INDEPTH TRANCE</h3>
                            <div className="space-y-4">
                                {[
                                    { q: "Apa itu INDEPTH TRANCE?", a: "INDEPTH TRANCE adalah kondisi untuk mengakses unconscious dan berkomunikasi dengan kecerdasan tubuh." },
                                    { q: "Apakah INDEPTH TRANCE sama dengan hipnosis biasa?", a: "INDEPTH TRANCE bekerja pada level unconscious yang lebih dalam dibanding hipnosis umum." },
                                    { q: "Apakah klien tetap sadar selama proses?", a: "Kesadaran bersifat dinamis. Klien tetap dapat memberikan respons selama proses berlangsung." },
                                    { q: "Apakah klien bisa berbicara?", a: "Sebagian klien dapat memberikan respons verbal. Sebagian menggunakan respons motorik." },
                                    { q: "Apa yang diakses dalam kondisi ini?", a: "Yang diakses adalah sistem unconscious dan kecerdasan tubuh yang mengelola fungsi organ dan pola internal." },
                                    { q: "Bagaimana respons tubuh muncul?", a: "Respons muncul melalui jawaban verbal atau gerakan tubuh sebagai penanda." },
                                    { q: "Apakah kondisi ini aman dilakukan?", a: "Proses dilakukan secara terarah dalam sesi dengan pendampingan terapis bersertifikasi." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl">
                                        <h4 className="font-black text-lg text-gray-900 dark:text-white mb-3">{item.q}</h4>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Closing statement */}
                        <div className="text-center py-20 border-t border-gray-100 dark:border-gray-900 space-y-8">
                            <div className="inline-flex gap-4 md:gap-8 items-center justify-center flex-wrap">
                                {['Unconscious.', 'Kecerdasan.', 'Perubahan.'].map((word, i) => (
                                    <span key={i} className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">{word}</span>
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed px-4">
                                "INDEPTH TRANCE adalah akses langsung ke sistem terdalam manusia. Ini adalah fondasi seluruh metodologi INDEPTH."
                            </p>
                        </div>

                        {/* Back Button */}
                        <div className="flex justify-center pt-8">
                            <Link
                                href="/metode"
                                className="group flex items-center gap-4 px-12 py-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-black text-gray-900 dark:text-white hover:bg-gold-500 hover:text-white transition-all shadow-2xl overflow-hidden relative active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <svg className="w-6 h-6 relative z-10 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                <span className="relative z-10 uppercase tracking-widest text-sm">Kembali ke Semua Metode</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
