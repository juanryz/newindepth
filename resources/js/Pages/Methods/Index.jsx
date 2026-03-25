import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LiquidBackground from '@/Components/LiquidBackground';

export default function MethodsIndex({ auth }) {

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Metodologi InDepth — Akses Unconscious, Kecerdasan Tubuh, dan Pemrograman Ulang Sistem Internal" />

            {/* Premium Liquid Background */}
            <LiquidBackground />

            {/* Navbar (Unified) */}
            <Navbar auth={auth} active="methods" />

            <main className="relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 font-semibold text-sm tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
                        Metode Eksklusif
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-8">
                        Metodologi <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">InDepth</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4">
                        Akses Unconscious, Kecerdasan Tubuh, dan Pemrograman Ulang Sistem Internal
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
                        InDepth Klinik menggunakan pendekatan hipnosis dan trance untuk mengakses unconscious, yaitu lapisan terdalam dari sistem bawah sadar manusia.
                    </p>
                </div>

                {/* Pendekatan InDepth */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gold-500/20 shadow-2xl p-10 md:p-16 mb-24"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Pendekatan InDepth Klinik Hipnoterapi Semarang</h2>
                        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>InDepth Klinik menggunakan pendekatan hipnosis dan trance untuk mengakses <strong className="text-gold-600 dark:text-gold-400">unconscious</strong>, yaitu lapisan terdalam dari sistem bawah sadar manusia.</p>
                            <p>Pada lapisan ini terdapat kecerdasan tubuh yang mengelola seluruh fungsi organ, respons fisik, dan pola internal yang berjalan secara otomatis.</p>
                            <p>Pendekatan InDepth difokuskan pada akses langsung ke sistem ini untuk memprogram ulang pola yang berjalan dan mengarahkan perubahan hingga ke level fisik.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Metode Eksklusif + Perbedaan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                            Eksklusif
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Metode Eksklusif InDepth</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Seluruh metode yang digunakan dalam InDepth Klinik dikembangkan secara khusus oleh tim InDepth Mental Wellness. Metode ini dirancang sebagai sistem terintegrasi dan digunakan secara konsisten dalam:
                        </p>
                        <ul className="space-y-3 mb-6">
                            {['InDepth Klinik', 'InDepth Academy'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="w-2 h-2 rounded-full bg-gold-500 shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gold-600 dark:text-gold-400 font-bold italic">Pendekatan ini digunakan secara eksklusif dalam sistem InDepth.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 shadow-xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white text-sm font-bold mb-6">
                            <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white animate-pulse"></span>
                            Perbedaan
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Perbedaan dengan Hipnosis Umum</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            Hipnosis umum bekerja pada level bawah sadar yang berkaitan dengan gelombang pikiran seperti alpha dan theta. Pendekatan InDepth bekerja lebih dalam, yaitu pada level <strong className="text-gold-600 dark:text-gold-400">unconscious</strong>.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest mb-3">Pada level ini:</p>
                        <ul className="space-y-3 mb-4">
                            {[
                                'Sistem tubuh dapat diakses secara langsung',
                                'Data internal tubuh dapat digali',
                                'Perubahan dapat diarahkan hingga ke fungsi fisik',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium">
                                    <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gold-600 dark:text-gold-400 italic">Pendekatan ini menghasilkan proses yang lebih spesifik dan terarah sesuai kondisi personal.</p>
                    </motion.div>
                </div>

                {/* Methods Stack */}
                <div className="space-y-24 mb-32">
                    {/* Method 1: InDepth TRANCE */}
                    <motion.div
                        id="indepth-trance"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col lg:flex-row items-center gap-12 group"
                    >
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                                Pilar Pertama
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth TRANCE</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Akses ke Unconscious dan Kecerdasan Tubuh</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                InDepth TRANCE adalah kondisi untuk berkomunikasi langsung dengan unconscious, termasuk kecerdasan tubuh (somatic mind).
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Karakter Kondisi</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Tubuh berada dalam kondisi seperti tidur normal',
                                            'Pernapasan stabil dan rileks',
                                            'Respon motorik tetap aktif',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
                                                <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Tingkat Kesadaran</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Kesadaran dinamis (sadar, tidak sadar, kembali sadar)',
                                            'Kondisi setengah sadar',
                                            'Klien tetap dapat memberikan respons',
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm font-medium">
                                                <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] dark:shadow-2xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                                    Fungsi Utama:
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Akses unconscious.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Kecerdasan tubuh.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Gali data internal.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Pemrograman ulang.</div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link
                                    href={route('methods.indepth-trance')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Baca selengkapnya tentang InDepth TRANCE <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.15)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-500/20 blur-[100px] rounded-full group-hover:bg-gold-500/30 transition-colors duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" alt="InDepth TRANCE" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Method 2: SUPREME TRANCE */}
                    <motion.div
                        id="supreme-trance"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col lg:flex-row items-center gap-12 group"
                    >
                        <div className="lg:w-1/2 w-full">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-white/20 dark:bg-gray-900/20 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 overflow-hidden flex items-center justify-center shadow-2xl group-hover:shadow-gold-500/10 transition-all duration-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-50"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gray-900/10 dark:bg-white/5 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" alt="SUPREME TRANCE" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform transition-transform duration-700 mix-blend-normal opacity-90 group-hover:opacity-100" />
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white animate-pulse"></span>
                                Pilar Kedua
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">SUPREME TRANCE</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-6">Akses Sadar ke Unconscious</p>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                SUPREME TRANCE merupakan kondisi lanjutan di mana klien tetap sadar penuh sambil mengakses unconscious.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Sadar Penuh</p>
                                    <p className="text-sm text-gray-500">Internal & Eksternal</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Pikiran Normal</p>
                                    <p className="text-sm text-gray-500">Dapat Berpikir</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kontrol Mandiri</p>
                                    <p className="text-sm text-gray-500">Arahkan Sendiri</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Fungsi Utama:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        {['Kontrol diri', 'Self-programming', 'Decision making', 'Aktivasi kondisi optimal'].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-base font-medium">
                                                <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Posisi Penggunaan:</h4>
                                    <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                                        Digunakan dalam layanan Premium untuk pengembangan performa dan kapasitas internal.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Link
                                    href={route('methods.supreme-trance')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Baca selengkapnya tentang SUPREME TRANCE <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Method 3: InDepth SOLUTION */}
                    <motion.div
                        id="indepth-solution"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col lg:flex-row items-center gap-12 group"
                    >
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                                Pilar Ketiga
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth SOLUTION</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Komunikasi dengan Kesadaran Tubuh</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                                InDepth SOLUTION adalah metode untuk menggali solusi langsung dari kecerdasan tubuh melalui unconscious.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Metode ini dilakukan dalam kondisi InDepth TRANCE.
                            </p>

                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] mb-8">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-widest">Mekanisme Utama — Pertanyaan Terarah:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Apakah kondisi dapat dituntaskan atau dicapai',
                                        'Dengan cara apa solusi dijalankan',
                                        'Apa syarat yang perlu dipenuhi',
                                        'Apa yang perlu dihindari',
                                        'Integrasi solusi ke seluruh sistem tubuh'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                            <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 mt-[-2px] text-xs font-bold">{i + 1}</div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest">Bentuk Respons:</h4>
                                    <ul className="space-y-2">
                                        {['Jawaban berupa kata', 'Jawaban berupa respons motorik'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
                                                <div className="w-2 h-2 rounded-full bg-gold-500"></div> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest">Proses Integrasi:</h4>
                                    <ul className="space-y-2">
                                        {['Data diintegrasikan ke organ terkait', 'Sistem tubuh memproses sebagai perintah internal', 'Perubahan berjalan sesuai respons tubuh'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></div> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6 italic">
                                Setiap tubuh memiliki pola dan solusi yang berbeda. Selama tubuh menunjukkan adanya arah solusi, proses dapat dijalankan secara terarah.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={route('methods.indepth-solution')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Baca selengkapnya tentang InDepth SOLUTION <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-tr from-gold-500/20 to-transparent border border-gold-500/30 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.2)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-15"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gold-400/20 dark:bg-gold-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" alt="InDepth SOLUTION" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Alur Proses */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gold-500/20 shadow-2xl p-10 md:p-16 mb-24"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">Alur Proses Metodologi InDepth</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {[
                                'Akses unconscious melalui InDepth TRANCE',
                                'Identifikasi pola internal',
                                'Penggalian solusi melalui InDepth SOLUTION',
                                'Pemrograman ulang sistem bawah sadar',
                                'Integrasi ke sistem tubuh',
                                'Evaluasi dalam sesi',
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gold-500/10 rounded-3xl p-6 text-left shadow-lg">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white flex items-center justify-center shrink-0 font-black text-lg shadow-[0_4px_15px_rgba(208,170,33,0.3)]">
                                        {i + 1}
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Sertifikasi */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Sertifikasi Praktisi InDepth Klinik</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Seluruh hipnoterapis di InDepth Klinik menjalani sertifikasi berjenjang melalui InDepth Academy.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                level: 'Praktisi',
                                items: ['Program intensif 6 hari', 'Minimal 20 sesi praktik'],
                                note: 'Menangani layanan Reguler dan Premium.',
                                color: 'border-blue-500/30 bg-blue-500/5',
                                dotColor: 'bg-blue-500',
                                textColor: 'text-blue-600 dark:text-blue-400',
                            },
                            {
                                level: 'Hipnoterapi Junior',
                                items: ['Program lanjutan 6 hari', 'Minimal 20 sesi praktik'],
                                note: 'Menangani layanan Reguler dan Premium dengan cakupan lebih luas.',
                                color: 'border-gold-500/30 bg-gold-500/5',
                                dotColor: 'bg-gold-500',
                                textColor: 'text-gold-600 dark:text-gold-400',
                            },
                            {
                                level: 'Hipnoterapi Senior',
                                items: ['Program lanjutan 6 hari', 'Minimal 20 sesi praktik'],
                                note: 'Menangani seluruh layanan termasuk VIP.',
                                color: 'border-purple-500/30 bg-purple-500/5',
                                dotColor: 'bg-purple-500',
                                textColor: 'text-purple-600 dark:text-purple-400',
                            },
                            {
                                level: 'Spesialis',
                                items: ['Level tertinggi dalam sertifikasi InDepth'],
                                note: 'Menangani seluruh jenis kasus dengan pendekatan mendalam.',
                                color: 'border-red-500/30 bg-red-500/5',
                                dotColor: 'bg-red-500',
                                textColor: 'text-red-600 dark:text-red-400',
                            },
                        ].map((cert, i) => (
                            <div key={i} className={`border rounded-[2.5rem] p-6 backdrop-blur-xl ${cert.color} shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${cert.color} border ${cert.textColor}`}>
                                    <span className={`w-2 h-2 rounded-full ${cert.dotColor}`}></span>
                                    {cert.level}
                                </div>
                                <ul className="space-y-2 mb-4">
                                    {cert.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                                            <div className={`w-1.5 h-1.5 rounded-full ${cert.dotColor} mt-1.5 shrink-0`}></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className={`text-xs font-medium italic ${cert.textColor}`}>{cert.note}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg max-w-2xl mx-auto">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Penegasan</p>
                        <ul className="space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></div>Reguler & Premium → Praktisi dan Hipnoterapi Junior</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></div>VIP → Hipnoterapi Senior dan Spesialis</li>
                            <li className="flex items-start gap-2 text-gold-600 dark:text-gold-400"><div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></div>Hipnoterapi Senior dan Spesialis memiliki cakupan penuh untuk seluruh layanan.</li>
                        </ul>
                    </div>
                </motion.div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-24 max-w-3xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">FAQ Metodologi InDepth</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: 'Apa itu trance?', a: 'Trance adalah kondisi fokus terarah untuk mengakses bawah sadar.' },
                            { q: 'Apakah tetap sadar selama proses?', a: 'Klien tetap dapat memberikan respons selama proses berlangsung.' },
                            { q: 'Apa itu unconscious?', a: 'Unconscious adalah lapisan terdalam dari sistem bawah sadar yang mengelola fungsi tubuh.' },
                            { q: 'Apa itu InDepth SOLUTION?', a: 'Metode untuk menggali solusi langsung dari kecerdasan tubuh melalui unconscious.' },
                            { q: 'Apakah metode ini sama dengan hipnosis biasa?', a: 'Pendekatan InDepth bekerja pada level yang lebih dalam dibanding hipnosis umum.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                <p className="font-black text-gray-900 dark:text-white mb-2 flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">Q</span>
                                    {item.q}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed pl-9">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Penutup / CTA */}
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent"></div>

                    <div className="relative p-12 md:p-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Metodologi InDepth
                        </h2>
                        <div className="space-y-3 text-lg text-gray-400 font-light mb-10 max-w-2xl mx-auto">
                            <p>Metodologi InDepth dirancang untuk mengakses sistem terdalam dalam diri manusia dan mengarahkan perubahan secara spesifik.</p>
                            <p>Seluruh metode dikembangkan oleh tim InDepth Mental Wellness dan digunakan secara terintegrasi dalam sistem InDepth.</p>
                            <p>Proses dilakukan melalui pemrograman ulang bawah sadar dan integrasi ke sistem tubuh dalam satu sesi.</p>
                        </div>
                        <a href="https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-bold text-gray-900 bg-gradient-to-r from-gold-400 to-yellow-400 hover:from-gold-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(208,170,33,0.3)] hover:shadow-[0_0_30px_rgba(208,170,33,0.5)] hover:-translate-y-1 transition-all duration-300 ring-2 ring-gold-500/50 ring-offset-2 ring-offset-black">
                            Konsultasi via WhatsApp
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
