import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div id="auth-card-title" className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-500 uppercase tracking-widest">
                    Verifikasi Email
                </h2>
                <div className="h-1 w-12 bg-gold-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="mb-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                    Terima kasih telah bergabung! Sebelum memulai, silakan verifikasi alamat email kamu melalui tautan yang baru saja kami kirimkan.
                </p>
                <p className="mt-4 text-sm text-gray-500 italic">
                    Belum menerima email? Kami akan mengirimkan yang baru.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-600 dark:text-green-400 text-center animate-pulse">
                    Tautan verifikasi baru telah dikirimkan ke email kamu.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-8 flex flex-col items-center gap-6">
                    <PrimaryButton className="w-full py-3.5 text-base" disabled={processing}>
                        Kirim Ulang Email Verifikasi
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-gray-500 underline hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
                    >
                        Keluar
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
