import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LiquidBackground from '@/Components/LiquidBackground';

export default function MethodsIndex({ auth }) {
    const methods = [
        {
            id: 1,
            title: "Hypno-Psikoterapi",
            description: "Pendekatan komprehensif yang menargetkan alam bawah sadar untuk mengatasi akar masalah psikologis, mempercepat pemulihan dari trauma, kecemasan, dan fobia.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            )
        },
        {
            id: 2,
            title: "Neuro Linguistic Programming (NLP)",
            description: "Teknik restrukturisasi pola pikir dan bahasa untuk menghilangkan mental block, membangun kepercayaan diri, dan mengoptimalkan potensi diri secara cepat.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            )
        },
        {
            id: 3,
            title: "Cognitive Behavioral Therapy (CBT)",
            description: "Metode terstruktur untuk mengidentifikasi dan mengubah pola pikir negatif serta perilaku destruktif yang menghambat kesejahteraan mental Anda.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Metode Terapi - InDepth Mental Wellness" />

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
                        Sistem Terapi <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">InDepth</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4">
                        Di InDepth Mental Wellness, kami tidak sekadar melakukan hipnoterapi.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
                        Kami menggunakan <strong>sistem metodologi terstruktur</strong> yang dirancang untuk mengakses akar masalah, bukan hanya meredakan gejala. Tiga metode utama kami dirancang untuk memberikan pendekatan yang presisi, terarah, dan sesuai kebutuhan individu.
                    </p>
                </div>

                {/* Methods Stack */}
                <div className="space-y-24 mb-32">
                    {/* All 3 methods are inside this div */}
                    {/* Method 1: InDepth Trance State */}
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
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth Trance State</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Fondasi Regulasi Neuro-Somatik Terstruktur</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                InDepth Trance State adalah fondasi utama seluruh sistem metodologi InDepth Mental Wellness. Dirancang sebagai protokol regulasi neuro-somatik terstruktur yang mengaktifkan komunikasi langsung antara kesadaran sadar dan kecerdasan tubuh.
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    'Regulasi & stabilisasi biologis',
                                    'Penurunan reaktivitas emosional',
                                    'Stabilisasi sistem saraf otonom',
                                    'Pintu masuk utama metode lanjutan'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                        <svg className="w-6 h-6 text-gold-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] dark:shadow-2xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                                    Hasil Yang Dicapai:
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Regulasi.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Koherensi.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Kontrol.</div>
                                    <div className="flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400">Fokus.</div>
                                </div>
                            </div>
                            <div className="mt-8">
                                <Link
                                    href={route('methods.indepth-trance')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Pelajari InDepth Trance State Lebih Lanjut <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.15)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-500/20 blur-[100px] rounded-full group-hover:bg-gold-500/30 transition-colors duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop" alt="InDepth Trance State" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </motion.div>
                    {/* Method 2: Supreme Trance State */}
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
                                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" alt="Supreme Trance State" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform transition-transform duration-700 mix-blend-normal opacity-90 group-hover:opacity-100" />
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white text-sm font-bold mb-6">
                                <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white animate-pulse"></span>
                                Pilar Kedua
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Supreme Trance State</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-6">Aktivasi Kesadaran Tertinggi Berpadu Dengan Potensi Jiwa Terdalam</p>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Supreme Trance State memfasilitasi proses penyelarasan kesadaran secara menyeluruh. Metode ini digunakan pada kondisi yang memerlukan integrasi kesadaran tingkat lanjut.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kedalaman</p>
                                    <p className="text-sm text-gray-500">Tetap Tercapai</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kesadaran</p>
                                    <p className="text-sm text-gray-500">Tetap Aktif</p>
                                </div>
                                <div className="flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                    <p className="font-bold text-gray-900 dark:text-white text-lg">Kendali</p>
                                    <p className="text-sm text-gray-500">Tetap Stabil</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Digunakan Untuk:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-start gap-2 text-base font-medium">
                                            <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500"></div>
                                            penguatan struktur keyakinan
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-medium">
                                            <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500"></div>
                                            integrasi konflik internal
                                        </li>
                                        <li className="flex items-start gap-2 text-base font-medium">
                                            <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500"></div>
                                            aktivasi kapasitas diri tingkat tinggi
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6 italic">
                                Supreme Trance State memfasilitasi proses penyelarasan kesadaran secara menyeluruh.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={route('methods.supreme-trance')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Pelajari Supreme Trance State Lebih Lanjut <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                    {/* Method 3: InDepth Solution */}
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
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">InDepth Solution</h2>
                            <p className="text-xl text-gold-600 dark:text-gold-400 font-medium mb-6">Solusi Tercepat dan Terbaik Versi Tubuh Anda Sendiri</p>

                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                InDepth Solution tidak memaksakan arah. Metode ini memfasilitasi sistem tubuh menemukan arah terbaiknya sendiri. Dirancang untuk membantu tubuh menemukan jalur penyelesaian internalnya secara mandiri.
                            </p>

                            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] mb-8">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Apakah kondisi ini dapat diselesaikan?',
                                        'Berapa waktu tercepat yang realistis?',
                                        'Syarat apa yang harus dipenuhi?',
                                        'Pantangan apa yang dihindari?'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium text-sm">
                                            <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 mt-[-2px] text-xs">?</div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-800 pt-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest">Digunakan Untuk:</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg">
                                            <div className="w-2 h-2 rounded-full bg-gold-500"></div> psikosomatis
                                        </li>
                                        <li className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg">
                                            <div className="w-2 h-2 rounded-full bg-gold-500"></div> kondisi berat dan kompleks
                                        </li>
                                        <li className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg">
                                            <div className="w-2 h-2 rounded-full bg-gold-500"></div> aktivasi respons penyembuhan internal
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6 italic">
                                InDepth Solution tidak memaksakan arah. Metode ini memfasilitasi sistem tubuh menemukan arah terbaiknya sendiri.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={route('methods.indepth-solution')}
                                    className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                                >
                                    Pelajari InDepth Solution Lebih Lanjut <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2 w-full">
                            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-tr from-gold-500/20 to-transparent border border-gold-500/30 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.2)] transition-all duration-700">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-15"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gold-400/20 dark:bg-gold-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                                <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" alt="InDepth Solution - Somatic Mind & Trance State" className="relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Why InDepth Selection */}
                < div className="relative rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gold-500/20 shadow-2xl p-10 md:p-16 mb-24 text-center group" >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Mengapa Metodologi Ini Berbeda</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto mb-12">
                            Pendekatan <strong className="text-gold-600 dark:text-gold-400 font-black">InDepth</strong> melampaui sugesti tradisional dengan fokus pada aktivasi sistemik.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                            {[
                                'Berbasis aktivasi internal',
                                'Terstruktur dan dapat diuji',
                                'Digunakan sesuai kategori layanan',
                                'Dikembangkan melalui sistem klinik'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gold-500/10 rounded-3xl p-6 text-left shadow-lg group-hover:scale-[1.02] transition-transform">
                                    <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <p className="text-gray-500 dark:text-gray-400 font-medium italic">
                        "Metodologi ini menjadi fondasi seluruh layanan InDepth Mental Wellness."
                    </p>
                </motion.div>

                {/* CTA Section */}
                < div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl" >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent"></div>

                    <div className="relative p-12 md:p-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Temukan Metode yang Tepat Untuk Anda
                        </h2>
                        <p className="text-xl text-gray-400 font-light mb-10">
                            Konsultasikan kebutuhan Anda dengan tim profesional kami untuk menentukan pendekatan terapi yang paling efektif.
                        </p>
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full font-bold text-gray-900 bg-gradient-to-r from-gold-400 to-yellow-400 hover:from-gold-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(208,170,33,0.3)] hover:shadow-[0_0_30px_rgba(208,170,33,0.5)] hover:-translate-y-1 transition-all duration-300 ring-2 ring-gold-500/50 ring-offset-2 ring-offset-black">
                            Mulai Konsultasi
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    );
}
