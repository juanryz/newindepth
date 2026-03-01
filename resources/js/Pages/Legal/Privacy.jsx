import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/Components/LiquidBackground';

export default function Privacy({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head>
                <title>Kebijakan Privasi | InDepth Mental Wellness</title>
                <meta property="og:image" content="/images/og-dark.jpg" />
                <meta property="twitter:image" content="/images/og-dark.jpg" />
            </Head>

            <LiquidBackground />

            {/* Added subtle dynamic blobs for depth */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <Navbar auth={auth} />

            <main className="relative z-10 pt-40 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3.5rem] p-8 md:p-20 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glass reflect effect at top */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                        <header className="mb-20 text-center relative">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block mb-4 px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-xs font-black tracking-[0.2em] uppercase"
                            >
                                Official Protocol
                            </motion.div>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase leading-none">
                                Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Privasi</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                                Komitmen transparansi data dan perlindungan privasi dalam sistem InDepth Mental Wellness.
                            </p>
                        </header>

                        <div className="space-y-16 relative text-gray-700 dark:text-gray-300">
                            {[
                                {
                                    title: "Pengumpulan Data Pribadi",
                                    content: "Kami hanya mengumpulkan data yang krusial untuk efektivitas layanan. Informasi ini mencakup identitas dasar, kontak aktif, dan riwayat persiapan sesi yang Anda berikan secara sukarela untuk memastikan protokol neuro-somatik berjalan optimal."
                                },
                                {
                                    title: "Fungsi & Pemanfaatan Data",
                                    content: "Data Anda adalah instrumen operasional untuk personalisasi layanan. Kami menggunakannya untuk sinkronisasi jadwal, verifikasi transaksi, dan pembaruan protokol sistem guna meningkatkan kualitas interaksi terapeutik Anda."
                                },
                                {
                                    title: "Integritas Keamanan Sistem",
                                    content: "InDepth mengimplementasikan standar enkripsi berlapis. Kami menjaga rahasia digital Anda melalui kombinasi pengamanan teknis sistemik dan komitmen etika profesional yang tidak kompromi."
                                },
                                {
                                    title: "Kedaulatan Data Pengguna",
                                    content: "Anda memegang kendali penuh atas informasi pribadi Anda. Anda berhak melakukan audit, pembaruan, atau permintaan penghapusan data sesuai dengan kerangka hukum privasi digital yang berlaku."
                                }
                            ].map((section, idx) => (
                                <motion.section
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-8 md:pl-12 border-l border-gray-100 dark:border-gray-800"
                                >
                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight italic">
                                        {idx + 1}. {section.title}
                                    </h2>
                                    <p className="leading-relaxed text-base md:text-lg font-medium opacity-80">
                                        {section.content}
                                    </p>
                                </motion.section>
                            ))}

                            {/* Refined Final Branding Block */}
                            <div className="pt-24 mt-20 border-t border-gray-100 dark:border-gray-800">
                                <div className="text-center space-y-12">
                                    <div className="space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            className="inline-flex items-center gap-4 text-xs font-black tracking-[0.4em] text-gold-600 dark:text-gold-400 uppercase"
                                        >
                                            <span className="w-8 h-px bg-gold-500/30"></span>
                                            InDepth Philosophy
                                            <span className="w-8 h-px bg-gold-500/30"></span>
                                        </motion.div>
                                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold italic">
                                            "Tubuh memiliki memori. Kesadaran memiliki arah."
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16">
                                        {['Regulasi', 'Integrasi', 'Transformasi'].map((word, i) => (
                                            <div key={i} className="flex items-center gap-6">
                                                <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                                                    {word}
                                                </span>
                                                {i < 2 && <span className="hidden md:block w-2 h-2 rounded-full bg-gold-500/40"></span>}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="max-w-xl mx-auto p-8 rounded-[2rem] bg-gold-500/5 border border-gold-500/10 backdrop-blur-sm">
                                        <p className="text-sm md:text-base font-black text-gray-900 dark:text-white uppercase tracking-widest leading-loose">
                                            Sistem memiliki kapasitas adaptif.<br />
                                            <span className="text-gold-600 dark:text-gold-400">InDepth Solution menyatukan ketiganya dalam satu protokol terstruktur.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-12">
                                <Link
                                    href="/"
                                    className="group relative inline-flex items-center gap-4 px-12 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-black rounded-full transition-all overflow-hidden active:scale-95 shadow-2xl hover:shadow-gold-500/20"
                                >
                                    <div className="absolute inset-0 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <span className="relative z-10 uppercase tracking-[0.2em] text-xs">Kembali ke Beranda</span>
                                    <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

