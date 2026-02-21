import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title="Reset Password">
            <Head title="Reset Password" />

            <div className="mb-12 text-center relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>
                <h2 className="text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000">
                    Reset Password
                </h2>
                <p className="mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80">
                    Perbarui keamanan akun Anda
                </p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8"></div>
            </div>

            <form onSubmit={submit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="group relative transition-all duration-500 hover:-translate-y-1">
                    <InputLabel htmlFor="email" value="Email" className="ml-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full px-5 py-3.5 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/40 dark:border-gray-800/40 focus:ring-gold-500/20 focus:border-gold-500/40 transition-all duration-500 opacity-60"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        readOnly
                    />
                    <InputError message={errors.email} className="mt-2 ml-2" />
                </div>

                <div className="group relative transition-all duration-500 hover:-translate-y-1">
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="ml-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full px-5 py-3.5 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/40 dark:border-gray-800/40 focus:ring-gold-500/20 focus:border-gold-500/40 transition-all duration-500"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 ml-2" />
                </div>

                <div className="group relative transition-all duration-500 hover:-translate-y-1">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="ml-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-focus-within:text-gold-500 transition-colors"
                    />
                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full px-5 py-3.5 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/40 dark:border-gray-800/40 focus:ring-gold-500/20 focus:border-gold-500/40 transition-all duration-500"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 ml-2"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full shadow-lg shadow-gold-500/10" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
