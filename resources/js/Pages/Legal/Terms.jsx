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
                                Syarat dan Ketentuan
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6"></div>
                            <p className="text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm">InDepth Mental Wellness</p>
                        </header>

                        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Pendahuluan</h2>
                                <p>Selamat datang di InDepth Mental Wellness. Syarat dan Ketentuan ini mengatur penggunaan Anda terhadap website dan layanan kami. Dengan mengakses atau menggunakan website kami, Anda menyetujui untuk terikat dengan ketentuan-ketentuan ini.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Penggunaan Layanan</h2>
                                <p>Layanan kami, termasuk sesi hipnoterapi dan konseling, diperuntukkan bagi mereka yang ingin melakukan perubahan positif secara mandiri. Kami tidak menyediakan layanan medis gawat darurat atau penanganan kejiwaan akut secara online atau tanpa pendampingan pihak terkait bila diperlukan.</p>
                                <ul className="list-disc ml-6 space-y-2 mt-2 text-sm">
                                    <li>Anda bertanggung jawab atas keakuratan informasi yang diberikan selama pendaftaran dan sesi terapi.</li>
                                    <li>Layanan yang kami berikan bersifat bantuan, pengembangan diri, dan terapeutik non-medis, dan pasien diharapkan aktif berpartisipasi dalam proses tersebut.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Pembayaran dan Kebijakan Pembatalan</h2>
                                <p>Pembayaran untuk setiap layanan harus diselesaikan sebelum sesi dilakukan. Kami menerapkan kebijakan pembatalan untuk memastikan kualitas pelayanan bagi seluruh klien.</p>
                                <ul className="list-disc ml-6 space-y-2 mt-2 text-sm">
                                    <li>Pembatalan atau perubahan jadwal harus dilakukan sekurang-kurangnya 24 jam sebelum sesi yang telah dijadwalkan.</li>
                                    <li>Pembatalan kurang dari batas waktu tersebut atau ketidakhadiran (No-Show) pada sesi tanpa pemberitahuan sebelumnya, tidak akan mendapatkan pengembalian biaya yang telah dibayarkan.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Hak Kekayaan Intelektual</h2>
                                <p>Segala konten dalam website ini, termasuk namun tidak terbatas pada teks, gambar, grafik, logo, dan perangkat lunak, adalah properti milik InDepth Mental Wellness atau dilisensikan kepada kami, dan dilindungi oleh undang-undang hak cipta.</p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">5. Perubahan Ketentuan</h2>
                                <p>Kami berhak untuk memperbarui, mengubah, atau mengganti setiap bagian dari Syarat dan Ketentuan ini dengan memposting pembaruan di website kami. Tanggung jawab Anda untuk memeriksa halaman ini secara berkala untuk melihat perubahan.</p>
                            </section>

                            <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Dengan terus menggunakan layanan ini setelah perubahan diposting, maka Anda menyetujui perubahan tersebut.</p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
