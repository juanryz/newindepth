import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Lengkapi Identitas",
        description: "Lengkapi Identitas Diri & Kontak Darurat di profil Anda.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        color: "bg-blue-500",
    },
    {
        number: "02",
        title: "Tandatangan S&K",
        description: "Setuju & Menandatangani Syarat dan Ketentuan layanan.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        color: "bg-indigo-500",
    },
    {
        number: "03",
        title: "Skrining Kesehatan",
        description: "Lakukan skrining awal untuk deteksi kondisi mental Anda.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        color: "bg-rose-500",
    },
    {
        number: "04",
        title: "Pilih Paket & Jadwal",
        description: "Pilih paket yang direkomendasikan dan tentukan waktu.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: "bg-teal-500",
    },
    {
        number: "05",
        title: "Lakukan Pembayaran",
        description: "Lakukan pembayaran dan tunggu validasi admin.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
        color: "bg-green-500",
    },
    {
        number: "06",
        title: "Hadir Sesi",
        description: "Datang 1 Jam Sebelum Janji Temu di lokasi klinik.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "bg-amber-500",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function ServiceFlowGuide() {
    return (
        <section className="mt-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 mb-2">Service Journey</h3>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Petunjuk Memulai Layanan</h2>
                </div>
                <div className="hidden md:block h-1 flex-1 mx-8 bg-gray-100 dark:bg-gray-800 rounded-full mb-4"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Langkah mudah menuju kesejahteraan mental</p>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="group relative flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900/40 transition-all duration-300"
                    >
                        {/* Number Badge */}
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-gray-900 border-4 border-gray-50 dark:border-gray-800 rounded-2xl flex items-center justify-center text-[10px] font-black text-gray-400 dark:text-gray-500 shadow-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {step.number}
                        </div>

                        {/* Icon Circle */}
                        <div className={`w-16 h-16 mb-4 rounded-2xl ${step.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-white transition-transform group-hover:scale-110 duration-500`}>
                            <div className={`${step.color} p-3 rounded-xl shadow-lg shadow-current/20`}>
                                {step.icon}
                            </div>
                        </div>

                        <h4 className="font-black text-gray-900 dark:text-white text-sm leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {step.title}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 font-medium">
                            {step.description}
                        </p>

                        {/* Connector logic (desktop only) */}
                        {idx < steps.length - 1 && (
                            <div className="hidden xl:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                                <svg className="w-6 h-6 text-gray-200 dark:text-gray-700 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Extra Protection Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000"></div>

                <div className="relative flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h5 className="text-lg font-black tracking-tight mb-1">Perlindungan Ekstra Secara Gratis</h5>
                        <p className="text-blue-100 text-sm opacity-90 leading-relaxed max-w-2xl">
                            Setiap layanan yang dibeli akan di proteksi secara otomatis oleh <strong>Layanan Kematian Santa Maria</strong> sebesar <strong>Rp 5.000.000,-</strong> (Lima Juta Rupiah). Kami hadir untuk ketenangan Anda sepenuhnya.
                        </p>
                    </div>
                    <div className="flex-shrink-0 ml-auto hidden lg:block">
                        <div className="px-5 py-2 bg-white text-blue-700 text-xs font-black rounded-full uppercase tracking-widest shadow-lg">Verified Protection</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
