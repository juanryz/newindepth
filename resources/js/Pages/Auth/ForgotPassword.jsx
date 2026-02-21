import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout backLink="/login" backText="Kembali ke Login">
            <Head title="Forgot Password" />

            <div className="mb-12 text-center relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h2 className="text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000">
                    Recover
                </h2>
                <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80">
                    Satu langkah untuk kembali
                </p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8"></div>
            </div>

            <div className="mb-10 text-center px-4">
                <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    Lupa kata sandi? Masukkan email Anda dan kami akan mengirimkan tautan untuk memulai kembali perjalanan Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {status && (
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm font-bold text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-2 animate-pulse">
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {status}
                    </div>
                )}

                <div className="group relative transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute -inset-2 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 blur-xl"></div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="relative block w-full px-6 py-4 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/40 dark:border-gray-800/40 focus:ring-gold-500/20 focus:border-gold-500/40 placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-all duration-500"
                        autoComplete="username"
                        placeholder="Alamat Email Anda"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-3 ml-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full shadow-lg shadow-gold-500/10" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
