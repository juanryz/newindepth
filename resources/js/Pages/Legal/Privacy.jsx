import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/Components/LiquidBackground';

export default function Privacy({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Kebijakan Privasi | InDepth Mental Wellness" />

            <LiquidBackground />
            <Navbar auth={auth} />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-8 md:p-16 shadow-2xl relative"
                    >
                        <div className="absolute top-8 left-8 md:top-12 md:left-12">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold-500 transition-colors group"
                            >
                                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali
                            </Link>
                        </div>

                        <header className="mb-12 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase">
                                Kebijakan Privasi
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6"></div>
                            <p className="text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm">InDepth Mental Wellness</p>
                        </header>

                        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Pengumpulan Data Pribadi</h2>
                                <p>Kami mengumpulkan data pribadi yang Anda berikan secara langsung saat Anda mendaftar, menggunakan layanan, atau berkomunikasi dengan kami. Data ini dapat mencakup nama, alamat email, nomor telepon, dan informasi relevan lainnya.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Penggunaan Data</h2>
                                <p>Data pribadi Anda digunakan untuk:</p>
                                <ul className="list-disc ml-6 space-y-2 mt-2 text-sm">
                                    <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
                                    <li>Memproses transaksi dan mengirimkan pemberitahuan terkait.</li>
                                    <li>Berkomunikasi dengan Anda mengenai layanan, promosi, dan pembaruan.</li>
                                    <li>Memastikan keamanan dan mencegah aktivitas penipuan.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Keamanan Data</h2>
                                <p>Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Berbagi Data dengan Pihak Ketiga</h2>
                                <p>Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Kami hanya membagikan data Anda dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan layanan kami, selalu dalam kepatuhan komitmen kerahasiaan.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Hak Privasi Anda</h2>
                                <p>Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi yang kami miliki tentang Anda. Silakan hubungi kami untuk menggunakan hak-hak ini.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Perubahan Kebijakan Privasi</h2>
                                <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda mengenai perubahan apa pun dengan memposting Kebijakan Privasi yang baru di halaman ini.</p>
                            </section>

                           <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
                                 <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami.</p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
