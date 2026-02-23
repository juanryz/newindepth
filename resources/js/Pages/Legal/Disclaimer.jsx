import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LiquidBackground from '@/Components/LiquidBackground';

export default function Disclaimer({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative">
            <Head title="Disclaimer Resmi | InDepth Mental Wellness" />

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
                                Disclaimer Resmi
                            </h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6"></div>
                            <p className="text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm">InDepth Mental Wellness</p>
                        </header>

                        <div className="space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">

                            {/* Section 1 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">1</span>
                                    STATUS LAYANAN
                                </h2>
                                <p className="mb-4">InDepth Mental Wellness adalah penyedia layanan hipnoterapi profesional berbasis pendekatan psikologis dan pengembangan diri.</p>
                                <div className="p-5 bg-gold-500/5 rounded-2xl border border-gold-500/10">
                                    <p className="font-bold text-gray-900 dark:text-white mb-3">Layanan yang diberikan:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        {['Bukan layanan medis', 'Bukan pengganti diagnosis dokter', 'Bukan pengganti pengobatan medis', 'Bukan layanan psikiatri'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="mt-4 text-sm italic font-medium">Segala tindakan medis darurat harus dilakukan oleh fasilitas kesehatan resmi.</p>
                            </section>

                            {/* Section 2 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">2</span>
                                    BATASAN TANGGUNG JAWAB
                                </h2>
                                <p className="mb-4">InDepth Mental Wellness tidak bertanggung jawab atas:</p>
                                <ul className="space-y-2 mb-6 ml-4">
                                    {['Kondisi medis murni yang terjadi tanpa unsur kelalaian', 'Serangan jantung mendadak', 'Gangguan saraf spontan', 'Reaksi tubuh yang tidak diungkapkan sebelumnya oleh klien', 'Risiko akibat penyembunyian informasi kesehatan'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <span className="text-gold-500">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm border-l-4 border-gold-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-xl">
                                    Jika terdapat kelalaian yang terbukti secara hukum dari pihak InDepth, maka tanggung jawab maksimal terbatas pada nilai biaya layanan sesi tersebut.
                                </p>
                            </section>

                            {/* Section 3 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">3</span>
                                    HASIL TERAPI
                                </h2>
                                <p className="mb-4">Setiap individu memiliki kondisi psikologis, biologis, dan keyakinan yang berbeda. Oleh karena itu:</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {['Tidak ada jaminan hasil instan', 'Tidak ada jaminan kesembuhan absolut', 'Hasil terapi bersifat individual'].map((item, i) => (
                                        <div key={i} className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl text-center text-sm font-bold border border-white/20">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-sm font-bold text-red-600 dark:text-red-400 underline decoration-2 underline-offset-4 uppercase tracking-wider">Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana.</p>
                            </section>

                            {/* Section 4 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">4</span>
                                    SISTEM DOKUMENTASI DAN TRANSPARANSI
                                </h2>
                                <div className="space-y-3 mb-4">
                                    <p>Seluruh sesi hipnoterapi:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {['Direkam audio dan video', 'Disimpan untuk perlindungan hukum', 'Visual dapat ditampilkan di ruang tunggu tanpa audio'].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
                                                <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-sm">Rekaman hanya dibuka atas permintaan resmi pihak berwenang. Setelah masa simpan tertentu, rekaman dapat dianonimkan untuk kepentingan akademik. <strong>Dengan mengikuti layanan, klien dianggap telah memahami dan menyetujui sistem dokumentasi ini.</strong></p>
                            </section>

                            {/* Section 5 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">5</span>
                                    KEADAAN DARURAT MEDIS
                                </h2>
                                <p>Apabila terjadi kondisi darurat medis: Sesi dihentikan, bantuan medis segera dipanggil, dan rekaman tidak dihentikan sampai klien meninggalkan ruangan.</p>
                                <p className="mt-3 text-sm font-bold bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300">
                                    Jika terjadi kematian akibat kondisi medis murni tanpa unsur kelalaian atau kekerasan, maka kedua pihak sepakat untuk tidak saling menuntut.
                                </p>
                            </section>

                            {/* Section 6 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">6</span>
                                    NO-SHOW DAN PEMBATALAN
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <p>• Sesi berdurasi 2 jam (termasuk buffer 30 menit).</p>
                                    <p>• Jika klien tidak hadir dalam 1 jam sejak jadwal dimulai, sesi dianggap berjalan.</p>
                                    <p className="font-bold text-red-600">• Tidak ada refund untuk No-Show.</p>
                                    <p>• Pembatalan maksimal 24 jam sebelum jadwal.</p>
                                    <p>• Pembatalan di luar ketentuan tidak dapat direfund.</p>
                                </div>
                            </section>

                            {/* Section 7 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">7</span>
                                    KEWAJIBAN KLIEN
                                </h2>
                                <p className="mb-2">Klien wajib:</p>
                                <ul className="list-disc ml-6 space-y-1 text-sm">
                                    <li>Memberikan data yang benar</li>
                                    <li>Mengungkap kondisi kesehatan yang relevan</li>
                                    <li>Tidak berada di bawah pengaruh alkohol atau narkotika</li>
                                    <li>Mengikuti instruksi profesional hipnoterapis</li>
                                </ul>
                                <p className="mt-3 text-sm italic font-bold">Pelanggaran dapat menyebabkan sesi dihentikan tanpa pengembalian dana.</p>
                            </section>

                            {/* Section 8 */}
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black">8</span>
                                    BATAS USIA
                                </h2>
                                <p>Usia dewasa hukum untuk mengikuti layanan secara mandiri adalah 21 tahun. Klien di bawah usia tersebut wajib didampingi dan mendapat persetujuan orang tua atau wali sah.</p>
                            </section>

                            {/* Section 9-10 (Combined for brevity in visual) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">9. FORCE MAJEURE</h2>
                                    <p className="text-sm">InDepth tidak bertanggung jawab atas gangguan akibat bencana alam, gangguan listrik/jaringan, kebijakan pemerintah, kerusuhan, atau kondisi darurat di luar kendali manusia. Sesi dapat dijadwalkan ulang tanpa penalti.</p>
                                </section>
                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">10. KERAHASIAAN</h2>
                                    <p className="text-sm">Seluruh informasi klien dijaga kerahasiaannya. Klien dilarang menyebarkan tuduhan tanpa dasar hukum tetap atau menyebarkan potongan rekaman tanpa izin tertulis.</p>
                                </section>
                            </div>

                            {/* Section 11-12 */}
                            <section className="bg-gray-900 dark:bg-black text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-bl-full pointer-events-none"></div>
                                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">Persetujuan Akhir</h2>
                                <div className="space-y-6 text-sm md:text-base opacity-90">
                                    <div>
                                        <h3 className="font-bold text-gold-400 mb-2">11. PERSETUJUAN ELEKTRONIK</h3>
                                        <p>Dengan menggunakan website, melakukan booking, atau mengikuti sesi, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh isi disclaimer ini tanpa keberatan. Persetujuan elektronik tunduk pada UU ITE dan memiliki kekuatan hukum yang sah.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gold-400 mb-2">12. DOMISILI HUKUM</h3>
                                        <p>Segala sengketa diselesaikan melalui musyawarah. Apabila tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri Semarang.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Professional Statement */}
                            <div className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 italic">Pernyataan Profesional</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Kami berkomitmen memberikan layanan terbaik dalam batas kewenangan profesional hipnoterapi dengan standar dokumentasi transparan dan prosedur keselamatan yang ketat.</p>
                                <div className="mt-8">
                                    <Link
                                        href={auth.user ? route('dashboard') : route('register')}
                                        className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-black rounded-full transition-all shadow-lg shadow-gold-600/20 active:scale-95 uppercase tracking-widest text-xs"
                                    >
                                        Mulai Perjalanan Anda
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
