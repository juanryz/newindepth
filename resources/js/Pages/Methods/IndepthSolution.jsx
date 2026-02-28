import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import LiquidBackground from '@/Components/LiquidBackground';

export default function IndepthSolution({ auth }) {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative">
            <Head title="InDepth Solution - InDepth Mental Wellness" />

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
                            Pilar Ketiga Sistem Metodologis InDepth
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6"
                        >
                            INDEPTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500">SOLUTION</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold"
                        >
                            Integrasi Keputusan Biologis dan Kesadaran Tertinggi
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
                            className="bg-white/40 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="relative z-10">
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 font-medium">
                                    InDepth Solution adalah tahap integrasi final dalam sistem InDepth Mental Wellness. Metode ini menggabungkan:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    {[
                                        { title: "Regulasi Neuro-Somatik", source: "(InDepth Trance State)" },
                                        { title: "Aktivasi Kesadaran Tertinggi", source: "(Supreme Trance State)" },
                                        { title: "Pengambilan Keputusan Adaptif", source: "oleh kecerdasan tubuh" }
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex flex-col p-4 bg-white/20 dark:bg-black/20 rounded-2xl border border-white/10">
                                            <span className="font-black text-gray-900 dark:text-white">{item.title}</span>
                                            <span className="text-sm text-gold-600 dark:text-gold-400 font-bold italic">{item.source}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-6 bg-gold-500/10 border border-gold-500/20 rounded-3xl text-center">
                                    <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                                        InDepth Solution bukan sekadar teknik.<br />
                                        <span className="text-gold-600 dark:text-gold-400">Ini adalah protokol integratif tingkat lanjut.</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Hierarchical Position */}
                        <div className="py-12 border-t border-gray-200 dark:border-gray-800">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-10 text-center tracking-tighter uppercase">Posisi Dalam Hierarki</h3>
                            <div className="space-y-6">
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 items-center"
                                >
                                    <div className="text-sm font-black text-white bg-gray-500 px-4 py-2 rounded-full uppercase tracking-widest shrink-0">Fisik</div>
                                    <p className="text-lg font-bold text-gray-700 dark:text-gray-200 text-center md:text-left">
                                        InDepth Trance State <span className="text-gold-500 mx-2">→</span> InDepth Solution
                                    </p>
                                </motion.div>
                                <motion.div
                                    whileHover={{ x: 10 }}
                                    className="p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/20 dark:border-white/10 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 items-center"
                                >
                                    <div className="text-sm font-black text-white bg-gold-600 px-4 py-2 rounded-full uppercase tracking-widest shrink-0">Kompleks</div>
                                    <p className="text-lg font-bold text-gray-700 dark:text-gray-200 text-center md:text-left">
                                        InDepth Trance State <span className="text-gold-500 mx-2">→</span> Supreme Trance State <span className="text-gold-500 mx-2">→</span> InDepth Solution
                                    </p>
                                </motion.div>
                                <p className="text-center text-gray-500 dark:text-gray-400 italic font-medium pt-4">
                                    "Stabilitas biologis dan kesadaran tertinggi dipadukan sebelum integrasi seluler dilakukan."
                                </p>
                            </div>
                        </div>

                        {/* Neurobiological Foundations */}
                        <div className="py-12">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter">Landasan Neurobiologis Lanjutan</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { num: "1⃣", title: "Regulasi HPA Axis", desc: "Penurunan respons stres kronis melalui stabilisasi hipotalamus–pituitari–adrenal." },
                                    { num: "2⃣", title: "Recalibrasi Amygdala", desc: "Reduksi hiper-reaktivitas terhadap pemicu internal dan eksternal." },
                                    { num: "3⃣", title: "Neuroplastic Repatterning", desc: "Pembentukan jalur neural adaptif baru melalui integrasi sadar–somatik." },
                                    { num: "4⃣", title: "Integrasi Kortiko-Limbik", desc: "Sinkronisasi antara fungsi eksekutif (prefrontal cortex) dan respons emosional (limbik)." },
                                    { num: "5⃣", title: "Koherensi Sistem Saraf", desc: "Keseimbangan antara sistem saraf simpatis dan parasimpatis secara simultan." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] shadow-lg flex flex-col items-center text-center">
                                        <span className="text-3xl mb-4 opacity-50">{item.num}</span>
                                        <h4 className="font-black text-lg text-gray-900 dark:text-white mb-3 uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-12 text-center text-xl font-bold text-gold-600 dark:text-gold-400 italic underline decoration-gold-500/30 underline-offset-8">
                                Tubuh mengubah pola adaptasi lama menjadi pola baru yang lebih efektif.
                            </p>
                        </div>

                        {/* Core Protocol Stages */}
                        <div className="bg-gray-900 rounded-[4rem] p-10 md:p-20 text-white shadow-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                            <h3 className="text-3xl md:text-4xl font-black mb-12 tracking-tighter uppercase relative z-10">Protokol Inti InDepth Solution</h3>
                            <div className="space-y-4 relative z-10">
                                {[
                                    "Konfirmasi kapasitas adaptif tubuh",
                                    "Identifikasi mekanisme biologis yang dipilih",
                                    "Estimasi waktu adaptasi maksimal",
                                    "Identifikasi syarat atau penyesuaian perilaku",
                                    "Integrasi keputusan hingga level seluler"
                                ].map((step, i) => (
                                    <motion.div
                                        key={i}
                                        whileInView={{ x: [0, 10, 0] }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`flex items-center gap-6 p-6 rounded-3xl border ${i === 4 ? 'bg-gold-500/20 border-gold-500 shadow-xl scale-[1.05]' : 'bg-white/5 border-white/10'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shrink-0 ${i === 4 ? 'bg-gold-500 text-white shadow-lg' : 'bg-white/10 text-gray-400'}`}>
                                            {i + 1}
                                        </div>
                                        <span className={`text-lg font-bold ${i === 4 ? 'text-white' : 'text-gray-300'}`}>{step}</span>
                                        {i === 4 && <div className="ml-auto text-xs font-black bg-gold-600 px-3 py-1 rounded-full uppercase tracking-widest">Inti</div>}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                                <p className="text-lg font-medium text-gray-400">
                                    "Pada fase ini dilakukan integrasi sistemik di mana seluruh tubuh menyepakati keputusan internal tersebut. Perubahan biologis mulai berproses sejak integrasi selesai."
                                </p>
                            </div>
                        </div>

                        {/* Cellular Integration Section */}
                        <div className="py-12">
                            <div className="flex flex-col md:flex-row gap-12 items-stretch">
                                <div className="flex-1 bg-white/40 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/40 dark:border-white/10 shadow-xl">
                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter uppercase">Integrasi Seluler</h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic">"Integrasi seluler bukan metafora."</p>
                                    <ul className="space-y-4">
                                        {[
                                            "Aktivasi respons imun adaptif",
                                            "Perubahan regulasi inflamasi berbasis stres",
                                            "Pergeseran respons hormonal",
                                            "Stabilisasi sinyal saraf perifer"
                                        ].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3 text-lg font-bold text-gray-800 dark:text-gray-100">
                                                <div className="w-2.5 h-2.5 rounded-full bg-gold-500"></div>
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full md:w-1/3 bg-gold-500 rounded-[3rem] p-10 text-white flex flex-col justify-center text-center shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5"></div>
                                    <h4 className="text-3xl font-black mb-4 relative z-10">Otonom & Sistemik</h4>
                                    <p className="font-bold text-gold-100 text-sm uppercase tracking-widest relative z-10">
                                        Integrasi bekerja melalui regulasi sistemik, bukan manipulasi eksternal.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Fundamental Differences */}
                        <div className="py-12 border-t border-gray-100 dark:border-gray-900">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter">Perbedaan Fundamental</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-10 bg-white/40 dark:bg-black/20 rounded-[3rem] border border-gray-100 dark:border-white/5">
                                    <h4 className="text-xl font-black mb-8 text-gray-400 uppercase tracking-widest">Pendekatan Konvensional</h4>
                                    <ul className="space-y-6 text-gray-500 dark:text-gray-400 font-bold text-lg">
                                        <li className="flex gap-4"><span>✕</span> Fokus narasi</li>
                                        <li className="flex gap-4"><span>✕</span> Diskusi panjang</li>
                                        <li className="flex gap-4"><span>✕</span> Analisis kognitif</li>
                                    </ul>
                                </div>
                                <div className="p-10 bg-white/80 dark:bg-gray-900/40 rounded-[3rem] border border-gold-500/30 shadow-2xl ring-1 ring-gold-500/20">
                                    <h4 className="text-xl font-black mb-8 text-gold-600 uppercase tracking-widest">Sistem InDepth</h4>
                                    <ul className="space-y-6 text-gray-900 dark:text-white font-black text-lg">
                                        <li className="flex gap-4"><span className="text-gold-500">✓</span> Regulasi biologis (Trance)</li>
                                        <li className="flex gap-4"><span className="text-gold-500">✓</span> Integrasi kesadaran (Supreme)</li>
                                        <li className="flex gap-4"><span className="text-gold-500">✓</span> Keputusan biologis (Solution)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Digunakan Untuk & Standar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
                            <div className="space-y-8">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter underline decoration-gold-500 decoration-4 underline-offset-8">Digunakan Untuk</h3>
                                <ul className="space-y-4">
                                    {["Psikosomatis berat", "Gangguan fisik terkait stres kronis", "Trauma kompleks", "Gangguan mental berat", "Restrukturisasi kapasitas diri"].map((text, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-gray-700 dark:text-gray-300 font-bold text-lg">
                                            <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-gray-400 dark:text-gray-500 italic leading-relaxed">
                                    * Pendekatan ini tidak menggantikan diagnosis atau terapi medis. Metode ini bekerja pada regulasi internal tubuh dalam kerangka hipnoterapi profesional.
                                </p>
                            </div>
                            <div className="p-10 bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[3rem] shadow-xl">
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8">Standar Pelaksanaan</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Sesi privat maksimal dua jam",
                                        "Protokol sangat terstruktur",
                                        "Dokumentasi transparan",
                                        "Perjanjian resmi sebelum sesi",
                                        "Evaluasi hasil langsung"
                                    ].map((text, idx) => (
                                        <li key={idx} className="flex items-center gap-4 text-gray-800 dark:text-gray-100 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[10px] font-black">{idx + 1}</div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Full System Summary */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[4rem] p-12 md:p-20 text-center text-white border border-white/10 shadow-3xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                            <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">Sistem Integratif InDepth</h3>
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
                                <div className="text-xl font-bold">Stabilisasi</div>
                                <div className="text-gold-500 text-3xl">→</div>
                                <div className="text-xl font-bold">Integrasi</div>
                                <div className="text-gold-500 text-3xl">→</div>
                                <div className="text-xl font-bold">Keputusan Biologis</div>
                            </div>
                            <div className="max-w-3xl mx-auto space-y-6 text-gray-400 font-medium text-lg leading-relaxed">
                                <p>InDepth Trance State memastikan tubuh stabil.</p>
                                <p>Supreme Trance State memastikan kesadaran tertinggi aktif.</p>
                                <p className="text-white font-black text-2xl tracking-tight">InDepth Solution memastikan seluruh sistem menyepakati perubahan.</p>
                                <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                                    <span className="bg-white/10 px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.2em]">Pikiran</span>
                                    <span className="bg-white px-6 py-2 rounded-full text-sm font-black text-black uppercase tracking-[0.2em]">Sistem</span>
                                </div>
                            </div>
                        </div>

                        {/* Final closing */}
                        <div className="text-center py-20 space-y-10">
                            <div className="space-y-2">
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Tubuh memiliki memori. Kesadaran memiliki arah.</p>
                                <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Sistem memiliki kapasitas adaptif.</p>
                            </div>
                            <div className="inline-flex gap-4 md:gap-12 items-center justify-center flex-wrap">
                                {['Regulasi.', 'Integrasi.', 'Transformasi.'].map((word, i) => (
                                    <span key={i} className={`text-4xl md:text-6xl font-black tracking-tighter ${i === 2 ? 'text-gold-500' : 'text-gray-900 dark:text-white'}`}>{word}</span>
                                ))}
                            </div>
                            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed italic border-t border-gray-100 dark:border-gray-900 pt-10">
                                "InDepth Solution menyatukan ketiganya dalam satu protokol terstruktur."
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

