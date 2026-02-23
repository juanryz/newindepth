import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function ServiceFlowGuide({ user, profileProgress, activeBooking }) {
    if (!user) return null;

    // Determine step completion
    const isBasicProfileDone = (() => {
        if (!profileProgress?.fields) return false;
        const basicFields = ['name', 'email', 'age', 'gender', 'phone'];
        return basicFields.every(f => profileProgress.fields?.[f]?.filled);
    })();

    const isDocsDone = (() => {
        if (!profileProgress?.fields) return false;
        const docFields = ['ktp_photo', 'emergency_contact_name', 'emergency_contact_phone', 'emergency_contact_relation'];
        return docFields.every(f => profileProgress.fields?.[f]?.filled);
    })();

    const isAgreementDone = !!user.agreement_signed_at;
    const isScreeningDone = !!user.screening_completed_at;

    // If ALL steps done, hide the entire component
    if (isBasicProfileDone && isDocsDone && isAgreementDone && isScreeningDone) {
        return null;
    }

    const steps = [
        {
            title: "Lengkapi Profil",
            description: "Isi data nama, usia, dan kontak.",
            route: "profile.edit",
            done: isBasicProfileDone,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            title: "Identitas Diri",
            description: "Upload KTP & data kontak darurat.",
            route: "profile.documents",
            done: isDocsDone,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
            ),
        },
        {
            title: "Tandatangan S&K",
            description: "Persetujuan layanan formal.",
            route: "agreement.show",
            done: isAgreementDone,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            title: "Skrining Kesehatan",
            description: "Analisis kondisi mental awal.",
            route: "screening.show",
            done: isScreeningDone,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
    ];

    // Find first incomplete step
    const firstIncompleteIdx = steps.findIndex(s => !s.done);

    const completedCount = steps.filter(s => s.done).length;

    return (
        <section className="mt-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 mb-1">Persiapan Akun</h3>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Langkah Awal Layanan</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i < completedCount ? 'w-6 bg-emerald-500' : i === firstIncompleteIdx ? 'w-6 bg-indigo-500 animate-pulse' : 'w-3 bg-slate-200 dark:bg-slate-700'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{completedCount}/{steps.length}</span>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                initial="hidden"
                animate="visible"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            >
                {steps.map((step, idx) => {
                    const isDone = step.done;
                    const isActive = idx === firstIncompleteIdx;
                    const isLocked = !isDone && idx > firstIncompleteIdx;

                    const cardContent = (
                        <div className={`relative h-full flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-500 ${isDone
                                ? 'bg-emerald-50/40 dark:bg-emerald-900/10 border-emerald-200/40 dark:border-emerald-700/20'
                                : isActive
                                    ? 'bg-white/60 dark:bg-white/[0.04] backdrop-blur-2xl border-indigo-400/50 dark:border-indigo-500/30 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-400/10'
                                    : 'bg-white/30 dark:bg-white/[0.02] backdrop-blur border-slate-200/40 dark:border-slate-700/20 opacity-40'
                            }`}>
                            {/* Step number */}
                            <div className={`absolute -top-2.5 left-5 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white dark:border-slate-900 shadow-sm ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                                }`}>
                                {isDone ? '✓' : `0${idx + 1}`}
                            </div>

                            {/* Active badge */}
                            {isActive && (
                                <div className="absolute -top-2 right-5 px-2 py-0.5 bg-indigo-600 text-white text-[7px] font-black uppercase tracking-widest rounded-md shadow-md animate-bounce">
                                    Lanjutkan
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-14 h-14 mb-3 rounded-2xl flex items-center justify-center transition-all duration-500 ${isDone
                                    ? 'bg-emerald-500 text-white'
                                    : isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}>
                                {isDone ? (
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : step.icon}
                            </div>

                            <h4 className={`font-black text-sm mb-1 transition-colors ${isDone ? 'text-emerald-700 dark:text-emerald-400' : isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                                }`}>
                                {step.title}
                            </h4>

                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {step.description}
                            </p>

                            {isDone && (
                                <span className="mt-2 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Selesai</span>
                            )}
                        </div>
                    );

                    return (
                        <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="h-full">
                            {isActive ? (
                                <Link href={route(step.route)} className="block h-full transform transition-transform duration-300 hover:-translate-y-1">
                                    {cardContent}
                                </Link>
                            ) : (
                                <div className={`h-full ${isLocked ? 'cursor-not-allowed' : ''}`}>
                                    {cardContent}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
