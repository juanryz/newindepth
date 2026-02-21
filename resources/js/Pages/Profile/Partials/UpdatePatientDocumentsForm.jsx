import React, { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdatePatientDocumentsForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        ktp_photo: null,
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_phone: user.emergency_contact_phone || '',
        emergency_contact_relation: user.emergency_contact_relation || '',
    });

    const [previewKtp, setPreviewKtp] = useState(user.ktp_photo ? `/storage/${user.ktp_photo}` : null);
    const fileInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('ktp_photo', file);
        if (file) {
            setPreviewKtp(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.documents.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Dokumen & Kontak Darurat
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Lengkapi identitas KTP dan data kontak darurat Anda yang bisa dihubungi dalam kondisi mendesak.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="ktp_photo" value="Foto KTP" />

                    {previewKtp && (
                        <div className="mt-2 mb-4">
                            <img src={previewKtp} alt="KTP Preview" className="max-w-xs rounded-lg border border-gray-300 shadow-sm" />
                        </div>
                    )}

                    <input
                        type="file"
                        id="ktp_photo"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                    />
                    <InputError className="mt-2" message={errors.ktp_photo} />
                </div>

                <div>
                    <InputLabel htmlFor="emergency_contact_name" value="Nama Kontak Darurat" />
                    <TextInput
                        id="emergency_contact_name"
                        className="mt-1 block w-full"
                        value={data.emergency_contact_name}
                        onChange={(e) => setData('emergency_contact_name', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.emergency_contact_name} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="emergency_contact_phone" value="No. Telepon Kontak Darurat" />
                        <TextInput
                            id="emergency_contact_phone"
                            className="mt-1 block w-full"
                            value={data.emergency_contact_phone}
                            onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                            required
                        />
                        <InputError className="mt-2" message={errors.emergency_contact_phone} />
                    </div>

                    <div>
                        <InputLabel htmlFor="emergency_contact_relation" value="Hubungan Keluarga" />
                        <TextInput
                            id="emergency_contact_relation"
                            className="mt-1 block w-full"
                            value={data.emergency_contact_relation}
                            onChange={(e) => setData('emergency_contact_relation', e.target.value)}
                            required
                            placeholder="Contoh: Suami/Istri, Orang Tua, Saudara"
                        />
                        <InputError className="mt-2" message={errors.emergency_contact_relation} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan Dokumen</PrimaryButton>

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
