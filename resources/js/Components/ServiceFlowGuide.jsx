import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function ServiceFlowGuide({ user, profileProgress, activeBooking }) {
    if (!user) return null;

    // Helper to determine step status
    const getStepStatus = (index) => {
        const isStep1Done = profileProgress?.is_complete;
        const isStep2Done = isStep1Done && !!user.agreement_signed_at; // Logic: Needs step 1 done first
        const isStep3Done = isStep2Done && !!user.screening_completed_at;
        const isStep4Done = isStep3Done && !!activeBooking;
        const isStep5Done = isStep4Done && (activeBooking?.status === 'confirmed' || activeBooking?.status === 'in_progress' || activeBooking?.status === 'completed');

        const stepStates = [
            isStep1Done, // Step 1
            isStep2Done, // Step 2
            isStep3Done, // Step 3
            isStep4Done, // Step 4
            isStep5Done, // Step 5
            false        // Step 6 (Hadir Sesi is final goal)
        ];

        if (stepStates[index - 1] === true) return 'done';

        // It's active if it's the first one not done, AND all previous are done
        const allPreviousDone = index === 1 || stepStates.slice(0, index - 1).every(s => s === true);
        if (allPreviousDone) return 'active';

        return 'locked';
    };

    // Determine which page to go to for Step 1
    const getStep1Route = () => {
        if (!profileProgress?.fields) return "profile.documents";

        // Fields on profile.edit page
        const basicFields = ['name', 'email', 'age', 'gender', 'phone'];
        const isBasicMissing = basicFields.some(f => !profileProgress.fields?.[f]?.filled);

        if (isBasicMissing) return "profile.edit";

        // Check if documents are missing
        const docFields = ['ktp_photo', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'];
        const isDocsMissing = docFields.some(f => !profileProgress.fields?.[f]?.filled);

        return isDocsMissing ? "profile.documents" : "profile.edit";
    };

    const steps = [
        {
            number: "01",
            title: "Lengkapi Identitas",
            description: "Profil dasar & Verifikasi KTP.",
            route: getStep1Route(),
            status: getStepStatus(1),
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
            description: "Persetujuan layanan formal.",
            route: "agreement.show",
            status: getStepStatus(2),
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
            description: "Analisis kondisi mental awal.",
            route: "screening.show",
            status: getStepStatus(3),
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
            description: "Tentukan waktu janji temu.",
            route: "bookings.create",
            status: getStepStatus(4),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-teal-500",
        },
        {
            number: "05",
            title: activeBooking?.status === 'pending_validation' ? "Validasi Pembayaran" : "Lakukan Pembayaran",
            description: activeBooking?.status === 'pending_validation'
                ? "Validasi sedang diproses."
                : "Selesaikan administrasi.",
            route: activeBooking ? "bookings.show" : "bookings.history",
            params: activeBooking ? { booking: activeBooking.id } : {},
            status: getStepStatus(5),
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
            description: "Konsultasi tatap muka.",
            route: "dashboard",
            status: getStepStatus(6),
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
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        },
    };

    return (
        <section className="mt-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 mb-2">Service Journey</h3>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Petunjuk Memulai Layanan</h2>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
                    Ikuti langkah bertanda "Lanjutkan"
                </div>
            </div>

            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {steps.map((step, idx) => {
                    const isLocked = step.status === 'locked';
                    const isActive = step.status === 'active';
                    const isDone = step.status === 'done';

                    const CardContent = (
                        <div className={`h-full group relative flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800/40 rounded-[2.5rem] border transition-all duration-500 ${isDone
                            ? 'border-green-100 dark:border-green-900/30 opacity-70'
                            : isActive
                                ? 'border-indigo-500 dark:border-indigo-500/50 shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/5 dark:ring-indigo-500/10'
                                : 'border-gray-100 dark:border-gray-700/50 grayscale-0 opacity-40 hover:opacity-100 hover:grayscale-0'
                            }`}>

                            {/* Number Indicator */}
                            <div className={`absolute -top-3 left-6 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white dark:border-gray-900 transition-colors duration-500 shadow-sm ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                }`}>
                                {isDone ? '✓' : step.number}
                            </div>

                            {/* Status Label */}
                            {isActive && (
                                <div className="absolute -top-2.5 right-6 px-2 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-sm animate-bounce">
                                    Next
                                </div>
                            )}

                            {/* Icon Box */}
                            <div className={`w-16 h-16 mb-4 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-6 ${isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : (isDone ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400')
                                }`}>
                                {isDone ? (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : step.icon}
                            </div>

                            <h4 className={`font-black text-[13px] leading-tight mb-2 transition-colors duration-300 ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white group-hover:text-indigo-600'
                                }`}>
                                {step.title}
                            </h4>

                            <p className="text-[9px] leading-relaxed text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight opacity-70">
                                {step.description}
                            </p>

                            {/* Progress Connectors for Desktop */}
                            {idx < steps.length - 1 && (
                                <div className="hidden xl:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className={`h-0.5 w-4 rounded-full ${isDone ? 'bg-green-300 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
                                </div>
                            )}
                        </div>
                    );

                    return (
                        <motion.div key={idx} variants={itemVariants} className="h-full">
                            {!isLocked ? (
                                <Link href={route(step.route, step.params || {})} className="block h-full transform transition-transform duration-300 hover:-translate-y-2">
                                    {CardContent}
                                </Link>
                            ) : (
                                <div className="h-full cursor-not-allowed">
                                    {CardContent}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Premium Protection Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 p-8 bg-gradient-to-tr from-[#1E293B] to-[#0F172A] rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/5"
            >
                {/* Decorative Elements */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-indigo-500/20"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-blue-500/20"></div>

                <div className="relative flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 rotate-3 transition-transform duration-500 group-hover:rotate-12">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h5 className="text-xl font-black tracking-tight">Verified InDepth Protection</h5>
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded border border-blue-500/30">Free Benefit</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl font-medium">
                            Setiap layanan yang dibeli akan diproteksi secara otomatis oleh <span className="text-white font-bold">Layanan Kematian Santa Maria</span> sebesar <span className="text-indigo-400 font-black">Rp 5.000.000,-</span> (Lima Juta Rupiah). Kami hadir untuk ketenangan Anda sepenuhnya mulai dari awal proses hingga hasil akhir.
                        </p>
                    </div>

                    <div className="flex-shrink-0 ml-auto hidden xl:flex flex-col items-end gap-2">
                        <div className="text-right text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Authenticated by</div>
                        <img src="/images/logo_santa_maria.png" alt="Santa Maria" className="h-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500" onError={(e) => e.target.style.display = 'none'} />
                        <div className="px-5 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-xl backdrop-blur-sm">TRUSTED SECURE</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

