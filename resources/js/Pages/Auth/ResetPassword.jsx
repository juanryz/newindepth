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

            <form onSubmit={submit} className="space-y-6">
                <div className="group">
                    <InputLabel htmlFor="email" value="Email" className="ml-1 mb-1 transition-colors group-focus-within:text-gold-600 dark:group-focus-within:text-gold-400" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full px-4 py-3.5"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        readOnly
                    />

                    <InputError message={errors.email} className="mt-2 ml-1" />
                </div>

                <div className="group">
                    <InputLabel htmlFor="password" value="Kata Sandi Baru" className="ml-1 mb-1 transition-colors group-focus-within:text-gold-600 dark:group-focus-within:text-gold-400" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full px-4 py-3.5"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 ml-1" />
                </div>

                <div className="group">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="ml-1 mb-1 transition-colors group-focus-within:text-gold-600 dark:group-focus-within:text-gold-400"
                    />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full px-4 py-3.5"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 ml-1"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
