import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Star, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';

const VisionMissionSection = () => {
    const missions = [
        {
            id: 1,
            icon: <Brain className="w-6 h-6" />,
            title: "Inovasi & Edukasi",
            text: "Merangkum, mengembangkan, menyempurnakan dan menciptakan ilmu hipnotis dan teknik-teknik hipnoterapi baru untuk meningkatkan kualitas hidup manusia secara akademis etis."
        },
        {
            id: 2,
            icon: <ShieldCheck className="w-6 h-6" />,
            title: "Standarisasi Profesi",
            text: "Mencetak pakar hipnotis dan hipnoterapi yang kompeten, profesional dan terstandarisasi tinggi dan menciptakan Standar Hipnoterapis Indonesia."
        },
        {
            id: 3,
            icon: <Lightbulb className="w-6 h-6" />,
            title: "Transformasi Mental",
            text: "Mengoptimalkan potensi mental client untuk menyelesaikan masalah kesehatan fisik maupun mental dan memicu transformasi positif menuju versi terbaik diri mereka."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="visi-misi" className="relative py-24 overflow-hidden bg-[#f8f9fa] dark:bg-gray-950">
            {/* Background elements consistent with Welcome page */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/10 dark:bg-gold-600/5 blur-[120px]"></div>
                <div className="absolute bottom-0 right-[-5%] w-[30%] h-[30%] rounded-full bg-yellow-300/10 dark:bg-yellow-600/5 blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2"
                    >
                        Tujuan & Dedikasi Kami
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6"
                    >
                        Visi & Misi Clinic
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Vision - Glass Card Style */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group lg:pr-12"
                    >
                        <div className="absolute -inset-4 bg-gold-500/5 rounded-[3rem] blur-2xl group-hover:bg-gold-500/10 transition-all duration-700"></div>
                        <div className="relative p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/30 rounded-[3rem] shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-[0.2em]">Visi</h4>
                            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed font-bold italic">
                                "Menjadi penyedia layanan kesehatan utama dan pusat pengembangan diri melalui optimalisasi potensi mental manusia dari Indonesia untuk dunia."
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission - List style matching features */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {missions.map((mission) => (
                            <motion.div
                                key={mission.id}
                                variants={itemVariants}
                                className="group flex items-start gap-6 p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/60 dark:border-gray-800/50 rounded-3xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-3 bg-gold-500/10 rounded-xl text-gold-600 dark:text-gold-400 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300">
                                    {mission.icon}
                                </div>
                                <div className="flex-1">
                                    <h5 className="font-bold text-gray-900 dark:text-white mb-2">{mission.title}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                                        {mission.text}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-gold-500/30 font-serif">0{mission.id}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Final CTA link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all"
                    >
                        Bergabunglah dalam perjalanan optimalisasi potensi mental <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default VisionMissionSection;
