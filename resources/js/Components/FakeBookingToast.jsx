import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

const names = [
    "Ibu Siti", "Bapak Andi", "Ibu Rina", "Sdr. Joko", "Sdri. Ayu", 
    "Ibu Dewi", "Bapak Reza", "Sdri. Putri", "Sdr. Dimas", "Bapak Budi", 
    "Ibu Indah", "Sdr. Wawan", "Sdri. Sarah", "Bapak Yoga", "Ibu Maya"
];

const symptoms = [
    "insomnia", "kecemasan berlebih", "trauma", "fobia", 
    "stres kerja", "psikosomatis", "kurang percaya diri", 
    "serangan panik", "kecanduan merokok", "depresi ringan", 
    "sulit tidur", "gemetar tiba-tiba", "overthinking"
];

const packages = ["Paket Reguler", "Paket Premium", "Paket VIP"];

export default function FakeBookingToast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const generateToast = () => {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomSymptom = symptoms[Math.floor(Math.random() * symptoms.length)];
            const randomPackage = packages[Math.floor(Math.random() * packages.length)];
            const randomDays = Math.floor(Math.random() * 13) + 2;

            setToast({
                id: Date.now(),
                message: `${randomName} dengan gejala ${randomSymptom} telah booking ${randomPackage} ${randomDays} hari yang lalu`,
            });
            
            // Auto hide after 8 seconds
            setTimeout(() => {
                setToast(null);
            }, 8000);
        };

        // Trigger every 75 seconds
        const intervalId = setInterval(generateToast, 75000);

        // Initial trigger after 3 seconds for demonstration
        const initialDelay = setTimeout(generateToast, 3000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(initialDelay);
        };
    }, []);

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    key={toast.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                    className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 max-w-[320px] sm:max-w-sm"
                >
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gold-200/50 dark:border-gold-800/50 rounded-2xl p-4 pr-10 flex gap-4 items-start relative overflow-hidden">
                        
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0 shadow-inner">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                Booking Baru
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                {toast.message}
                            </p>
                        </div>
                        
                        <button 
                            onClick={() => setToast(null)}
                            className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
