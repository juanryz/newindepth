import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/Components/LiquidBackground';

export default function Terms({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Syarat dan Ketentuan | InDepth Mental Wellness" />

            <LiquidBackground />

            {/* Sublte background depth blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/3 -right-20 w-[30rem] h-[30rem] bg-gold-500/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-1/3 -left-20 w-[20rem] h-[20rem] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
            </div>

            <Navbar auth={auth} />

            <main className="relative z-10 pt-40 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[4rem] p-8 md:p-24 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.1)] dark:shadow-none relative overflow-hidden"
                    >
                        {/* Refined Glass Edge */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                        <header className="mb-24 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block mb-6 px-5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-[10px] font-black tracking-[0.3em] uppercase"
                            >
                                Operational Guidelines
                            </motion.div>
                            <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase leading-tight">
                                Syarat & <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500">Ketentuan</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm max-w-2xl mx-auto leading-relaxed opacity-80">
                                Kerangka kerja operasional dan komitmen profesional untuk memastikan efektivitas sistem intervensi InDepth.
                            </p>
                        </header>

                        <div className="space-y-24 relative text-gray-700 dark:text-gray-300">
                            {[
                                {
                                    title: "Kemitraan Profesional",
                                    content: "Layanan InDepth Mental Wellness adalah kolaborasi aktif antara profesional dan klien. Dengan mengakses layanan, Anda menyetujui partisipasi penuh dalam protokol intervensi yang dirancang untuk perubahan mandiri yang berkelanjutan."
                                },
                                {
                                    title: "Klasifikasi Layanan",
                                    content: "Protokol kami berbasis hipnoterapi profesional dan pengembangan diri somatik. Kami bukan layanan medis darurat. Klien dengan kondisi kejiwaan akut wajib mengungkapkan informasi tersebut untuk penyesuaian protokol atau rujukan yang tepat."
                                },
                                {
                                    title: "Kebijakan Reservasi & Integritas",
                                    content: "Setiap sesi dialokasikan secara eksklusif. Pembatalan atau penjadwalan ulang wajib dilakukan minimal 24 jam sebelumnya. Ketidakhadiran tanpa konfirmasi akan dianggap sebagai sesi berjalan (Non-Refundable) untuk menjaga integritas operasional sistem."
                                },
                                {
                                    title: "Otoritas Intelektual",
                                    content: "Seluruh metodologi, terminologi, dan konten digital dalam platform ini adalah properti intelektual InDepth. Penggunaan tanpa izin atau manipulasi konten merupakan pelanggaran hak cipta yang akan diproses secara hukum."
                                },
                                {
                                    title: "Adaptasi Ketentuan",
                                    content: "Kami berhak melakukan sinkronisasi syarat dan ketentuan sesuai dengan evolusi sistem. Penggunaan berkelanjutan setelah pembaruan dianggap sebagai persetujuan terhadap adaptasi protokol terbaru."
                                }
                            ].map((section, idx) => (
                                <motion.section
                                    key={idx}
                                    className="group relative pl-10 md:pl-16 border-l-2 border-gray-100 dark:border-gray-800 hover:border-gold-500 transition-colors duration-500"
                                >
                                    <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 group-hover:border-gold-500 transition-colors">
                                        <div className="w-full h-full rounded-full bg-gold-500/0 group-hover:bg-gold-500/20 scale-50 group-hover:scale-100 transition-transform"></div>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight italic">
                                        {idx + 1}. {section.title}
                                    </h2>
                                    <p className="leading-relaxed text-lg md:text-xl font-medium opacity-80 max-w-4xl">
                                        {section.content}
                                    </p>
                                </motion.section>
                            ))}

                            {/* Philosophy Branding Section */}
                            <div className="pt-32 mt-32 border-t-2 border-gray-100 dark:border-gray-800 relative">
                                <div className="absolute -top-1 w-20 h-2 bg-gold-500 left-0"></div>
                                <div className="text-center space-y-16">
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-6 text-[10px] font-black tracking-[0.5em] text-gold-600 dark:text-gold-400 uppercase">
                                            The Core Directive
                                        </div>
                                        <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 font-bold italic opacity-90">
                                            "Tubuh memiliki memori. Kesadaran memiliki arah."
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
                                        {['Regulasi', 'Integrasi', 'Transformasi'].map((word, i) => (
                                            <div key={i} className="flex items-center gap-10">
                                                <span className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-none">
                                                    {word}
                                                </span>
                                                {i < 2 && <div className="hidden md:block w-3 h-3 bg-gold-500 transform rotate-45"></div>}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="max-w-2xl mx-auto p-12 rounded-[3rem] bg-gray-900 dark:bg-white text-white dark:text-black shadow-3xl">
                                        <p className="text-sm md:text-lg font-black uppercase tracking-[0.2em] leading-relaxed">
                                            Sistem memiliki kapasitas adaptif.<br />
                                            <span className="text-gold-500 dark:text-gold-600">InDepth Solution menyatukan ketiganya dalam satu protokol terstruktur.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-16">
                                <Link
                                    href="/"
                                    className="group relative inline-flex items-center gap-6 px-16 py-6 bg-gold-500 text-white font-black rounded-full transition-all active:scale-95 shadow-[0_20px_50px_-10px_rgba(208,170,33,0.3)]"
                                >
                                    <div className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                                    <span className="relative z-10 uppercase tracking-[0.3em] text-xs">Authorize & Return</span>
                                    <svg className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

