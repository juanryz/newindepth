import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function DisclaimerSection() {
    return (
        <section className="py-20 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/20 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden"
                >
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-bl-full pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-full md:w-3/4 text-center md:text-left">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight flex flex-col md:flex-row items-center gap-3">
                                <span className="p-2 bg-gold-500 rounded-lg text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 17c-.77 1.333.192 3 1.732 3z" /></svg>
                                </span>
                                DISCLAIMER RESMI & STATUS LAYANAN
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium">
                                InDepth Mental Wellness adalah penyedia layanan hipnoterapi profesional berbasis pendekatan psikologis. Kami menegaskan bahwa layanan kami <strong className="text-gray-900 dark:text-white underline decoration-gold-500">bukan merupakan layanan medis</strong>, bukan pengganti diagnosis dokter, psikiatri, maupun pengobatan medis lainnya. Kami berkomitmen pada transparansi dan keselamatan klien melalui standar dokumentasi audio-visual yang ketat.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Non-Medical Service
                                </div>
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Professional Documentation
                                </div>
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    T&C Accepted on Use
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 flex justify-center md:justify-end">
                            <Link
                                href="/disclaimer"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-black text-white font-bold rounded-2xl hover:bg-gold-600 transition-all duration-300 shadow-xl"
                            >
                                Baca Selengkapnya
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
