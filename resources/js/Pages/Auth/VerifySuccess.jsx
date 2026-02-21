import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VerifySuccess() {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Standard logout flow to ensure clean state
                    router.post(route('logout'), {}, {
                        onFinish: () => {
                            window.location.href = route('login') + '?verified=1';
                        }
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <GuestLayout title="Verifikasi Berhasil">
            <Head title="Verifikasi Berhasil" />

            <div className="text-center space-y-8 py-10">
                {/* Animated Icon */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_30px_rgba(208,170,33,0.5)]"
                    >
                        <svg className="w-12 h-12 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 text-center relative"
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>
                        <h2 className="text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000">
                            Success
                        </h2>
                        <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80">
                            Email Anda telah diverifikasi
                        </p>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8"></div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 dark:text-gray-400 font-medium"
                    >
                        Email kamu telah berhasil diverifikasi.
                        <br />
                        Siap memulai perjalanan transformasi?
                    </motion.p>
                </div>

                {/* Countdown Animation */}
                <div className="relative h-20 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={count}
                            initial={{ opacity: 0, scale: 2, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                            className="text-4xl font-black text-gray-900 dark:text-white"
                        >
                            {count > 0 ? count : ''}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4"
                >
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold-600/60 dark:text-gold-400/40 animate-pulse">
                        Mengarahkan ke Login...
                    </p>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
