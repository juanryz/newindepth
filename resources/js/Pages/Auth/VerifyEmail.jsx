import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const COOLDOWN_TIME = 60; // 1 minute cooldown

    const [timeLeft, setTimeLeft] = useState(() => {
        // Start with cooldown active since email is sent on registration
        const lastSent = localStorage.getItem('verify_email_last_sent');
        if (lastSent) {
            const elapsed = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
            if (elapsed < COOLDOWN_TIME) {
                return COOLDOWN_TIME - elapsed;
            }
            return 0;
        }
        // First time visiting the page — email just sent, start cooldown
        localStorage.setItem('verify_email_last_sent', Date.now().toString());
        return COOLDOWN_TIME;
    });

    useEffect(() => {
        let interval;
        if (timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timeLeft]);

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'), {
            onSuccess: () => {
                setTimeLeft(COOLDOWN_TIME);
                localStorage.setItem('verify_email_last_sent', Date.now().toString());
            }
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <GuestLayout title="Verifikasi Email">
            <Head title="Verifikasi Email" />

            <div className="mb-12 text-center relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h2 className="text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000">
                    Verify
                </h2>
                <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80">
                    Satu langkah terakhir
                </p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8"></div>
            </div>

            <div className="mb-10 text-center px-4 animate-in fade-in duration-1000">
                <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                    Terima kasih telah bergabung! Silakan verifikasi alamat email Anda melalui tautan yang baru saja kami kirimkan untuk mengaktifkan akun Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                {status === 'verification-link-sent' && (
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm font-bold text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-2 animate-pulse">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Tautan verifikasi baru telah dikirim!
                    </div>
                )}

                <div className="relative group transition-all duration-500 hover:-translate-y-1">
                    <PrimaryButton
                        className="w-full shadow-lg shadow-gold-500/10 py-4"
                        disabled={processing || timeLeft > 0}
                    >
                        {timeLeft > 0
                            ? `Kirim ulang dalam ${formatTime(timeLeft)}`
                            : 'Kirim Ulang Email Verifikasi'}
                    </PrimaryButton>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-[0.1em] underline underline-offset-8 decoration-gray-200 dark:decoration-gray-800"
                    >
                        Keluar dari Sesi
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
