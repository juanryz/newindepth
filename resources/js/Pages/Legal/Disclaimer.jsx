import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/Components/LiquidBackground';

export default function Disclaimer({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head>
                <title>Disclaimer Resmi | InDepth Mental Wellness</title>
                <meta property="og:image" content="/images/og-dark.jpg" />
                <meta property="twitter:image" content="/images/og-dark.jpg" />
            </Head>

            <LiquidBackground />

            {/* Depth Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-gold-500/5 rounded-full blur-[160px] animate-pulse"></div>
                <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>

            <Navbar auth={auth} />

            <main className="relative z-10 pt-40 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-white/40 dark:bg-gray-900/70 backdrop-blur-[50px] backdrop-saturate-[200%] border border-white/50 dark:border-white/10 rounded-[4rem] p-8 md:p-24 shadow-2xl relative overflow-hidden"
                    >
                        {/* Reflective Top Edge */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                        <header className="mb-24 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-[0.4em] uppercase shadow-xl"
                            >
                                <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping"></span>
                                Legal Framework 1.0
                            </motion.div>
                            <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-10 tracking-[ -0.05em] uppercase leading-none">
                                Disclaimer <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold-400 via-gold-600 to-yellow-700">Resmi</span>
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm max-w-3xl mx-auto leading-loose opacity-70">
                                Batasan tanggung jawab hukum, klasifikasi layanan profesional, dan persetujuan sistemik dalam ekosistem InDepth Mental Wellness.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative text-gray-700 dark:text-gray-300">
                            {[
                                {
                                    title: "Status Layanan",
                                    icon: "⚖️",
                                    content: "InDepth Mental Wellness adalah penyedia layanan hipnoterapi profesional berbasis pendekatan psikologis. Layanan kami bukan pengganti diagnosis medis, psikiatri, atau intervensi gawat darurat klinis."
                                },
                                {
                                    title: "Batas Tanggung Jawab",
                                    icon: "🛡️",
                                    content: "Kami tidak bertanggung jawab atas kondisi medis murni yang tidak diungkapkan sebelumnya. Tanggung jawab maksimal kami terbatas pada nilai biaya layanan sesi yang telah dilakukan sesuai kesepakatan."
                                },
                                {
                                    title: "Integritas Hasil",
                                    icon: "✨",
                                    content: "Setiap individu memiliki respons biologis dan psikologis yang unik. Hasil terapi bersifat subjektif dan dipengaruhi oleh tingkat partisipasi serta kapasitas adaptif sistem tubuh Anda sendiri."
                                },
                                {
                                    title: "Protokol Dokumentasi",
                                    icon: "📽️",
                                    content: "Seluruh sesi didokumentasikan melalui audio dan video untuk perlindungan hukum dan transparansi. Rekaman dijaga kerahasiaannya dan hanya dapat diakses melalui otoritas resmi."
                                }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-10 rounded-[3rem] bg-white/30 dark:bg-black/20 border border-white/40 dark:border-white/5 backdrop-blur-md shadow-lg"
                                >
                                    <div className="text-4xl mb-6">{card.icon}</div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight italic">{card.title}</h3>
                                    <p className="text-lg font-medium leading-relaxed opacity-80">{card.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Force Majeure & Age grid */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl">
                                <span className="text-gold-500 block mb-2">01. Batasan Usia</span>
                                Minimal 21 tahun untuk akses mandiri. Di bawah 21 wajib pendampingan wali sah.
                            </div>
                            <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl">
                                <span className="text-gold-500 block mb-2">02. Force Majeure</span>
                                Sesi dapat dijadwalkan ulang akibat bencana, gangguan infrastruktur, atau kondisi darurat makro.
                            </div>
                            <div className="p-8 border border-gray-100 dark:border-gray-800 rounded-3xl">
                                <span className="text-gold-500 block mb-2">03. Domisili Hukum</span>
                                Segala penyelesaian sengketa dilakukan melalui musyawarah di wilayah hukum Kota Semarang.
                            </div>
                        </div>

                        {/* Specialized Final Branding Section */}
                        <div className="pt-40 mt-32 border-t border-gray-100 dark:border-gray-800">
                            <div className="text-center space-y-16">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-8">
                                        <div className="h-px w-12 bg-gold-500/30"></div>
                                        <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-bold italic tracking-wide">
                                            "Tubuh memiliki memori. Kesadaran memiliki arah."
                                        </p>
                                        <div className="h-px w-12 bg-gold-500/30"></div>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20">
                                    {['Regulasi', 'Integrasi', 'Transformasi'].map((word, i) => (
                                        <div key={i} className="flex items-center gap-8">
                                            <span className="text-5xl md:text-8xl font-black tracking-[-0.08em] text-gray-900 dark:text-white uppercase leading-none">
                                                {word}
                                            </span>
                                            {i < 2 && <span className="hidden md:block text-gold-500 text-6xl font-thin opacity-30">/</span>}
                                        </div>
                                    ))}
                                </div>

                                <div className="max-w-3xl mx-auto p-12 rounded-[4rem] bg-gold-500/10 border border-gold-500/20 backdrop-blur-xl">
                                    <p className="text-sm md:text-xl font-black text-gray-900 dark:text-white uppercase tracking-[0.3em] leading-relaxed">
                                        Sistem memiliki kapasitas adaptif.<br />
                                        <span className="text-gold-600 dark:text-gold-400 mt-2 block">InDepth Solution menyatukan ketiganya dalam satu protokol terstruktur.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-24">
                            <Link
                                href="/"
                                className="group relative inline-flex items-center gap-5 px-20 py-7 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-black rounded-full transition-all active:scale-95 shadow-3xl hover:border-gold-500"
                            >
                                <span className="relative z-10 uppercase tracking-[0.4em] text-xs">Persetujuan Sistemik</span>
                                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


