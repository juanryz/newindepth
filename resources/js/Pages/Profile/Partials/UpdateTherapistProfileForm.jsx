import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateTherapistProfileForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        specialization: user.specialization || '',
        bio: user.bio || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black tracking-tight text-gray-950 dark:text-white">
                    Pengaturan Terapi & Keahlian
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Informasi ini akan ditampilkan pada profil publik Anda agar calon pasien mengenal keahlian Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="specialization" value="Spesialisasi / Keahlian" />
                    <TextInput
                        id="specialization"
                        className="mt-1 block w-full"
                        value={data.specialization}
                        onChange={(e) => setData('specialization', e.target.value)}
                        placeholder="Contoh: Kecemasan, Depresi, Trauma, dll"
                        required
                    />
                    <InputError className="mt-2" message={errors.specialization} />
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="Bio Singkat / Deskripsi Diri" />
                    <textarea
                        id="bio"
                        className="mt-1 block w-full border border-gray-400 rounded-xl bg-white/50 shadow-sm backdrop-blur-md focus:border-gold-500 focus:ring-gold-500 dark:border-gray-500 dark:bg-gray-900/50 dark:text-gray-300 transition-all duration-300 min-h-[120px]"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        placeholder="Ceritakan sedikit tentang pengalaman dan pendekatan terapi Anda..."
                    ></textarea>
                    <InputError className="mt-2" message={errors.bio} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase">
                        SIMPAN PENGATURAN
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
