import React, { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import imageCompression from 'browser-image-compression';

export default function UpdatePatientDocumentsForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        ktp_photo: null,
        emergency_contact_name: user.emergency_contact_name || '',
        emergency_contact_phone: user.emergency_contact_phone || '',
        emergency_contact_relation: user.emergency_contact_relation || '',
    });

    const [previewKtp, setPreviewKtp] = useState(user.ktp_photo ? `/storage/${user.ktp_photo}` : null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [fileWarning, setFileWarning] = useState('');
    const fileInputRef = useRef(null);

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        setFileWarning('');

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setFileWarning('Ukuran file KTP terlalu besar. Sistem sedang mengompres otomatis agar kualitas tetap terjaga...');
                setIsCompressing(true);

                try {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };

                    const compressedFile = await imageCompression(file, options);

                    const newFile = new File([compressedFile], file.name, {
                        type: compressedFile.type || 'image/jpeg',
                        lastModified: Date.now(),
                    });

                    setData('ktp_photo', newFile);
                    setPreviewKtp(URL.createObjectURL(newFile));
                    setFileWarning('Kompresi berhasil. Ukuran foto sekarang optimal.');

                    setTimeout(() => {
                        setFileWarning('');
                    }, 5000);
                } catch (error) {
                    console.error('Error compressing image:', error);
                    setFileWarning('Gagal mengompres gambar. Silakan unggah file dengan ukuran lebih kecil (maks. 2MB).');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    setData('ktp_photo', null);
                    setPreviewKtp(null);
                } finally {
                    setIsCompressing(false);
                }
            } else {
                setData('ktp_photo', file);
                setPreviewKtp(URL.createObjectURL(file));
            }
        } else {
            setData('ktp_photo', null);
            setPreviewKtp(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isCompressing) return;
        post(route('profile.documents.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black tracking-tight text-gray-950 dark:text-white">
                    Dokumen & Kontak Darurat
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Lengkapi identitas KTP dan data kontak darurat Anda yang bisa dihubungi dalam kondisi mendesak.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="ktp_photo" value="Foto KTP" />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Format didukung: JPG, PNG. Rekomendasi maksimal 10MB (akan dikompres otomatis jika lebih dari 2MB).
                    </p>

                    {previewKtp && (
                        <div className="mt-2 mb-4">
                            <img src={previewKtp} alt="KTP Preview" className={`max-w-xs rounded-lg border border-gray-300 shadow-sm transition-opacity duration-300 ${isCompressing ? 'opacity-50' : 'opacity-100'}`} />
                        </div>
                    )}

                    {fileWarning && (
                        <div className={`mt-2 mb-4 text-sm px-4 py-3 rounded-xl flex items-start gap-3 border shadow-sm ${fileWarning.includes('Gagal')
                            ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
                            : fileWarning.includes('berhasil')
                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                                : 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30'
                            }`}>
                            {isCompressing ? (
                                <svg className="animate-spin h-5 w-5 text-current shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : fileWarning.includes('berhasil') ? (
                                <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            <span className="font-medium leading-relaxed">{fileWarning}</span>
                        </div>
                    )}

                    <input
                        type="file"
                        id="ktp_photo"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        accept="image/*"
                        capture="environment"
                        disabled={isCompressing}
                        className={`mt-1 block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-500 rounded-xl bg-white/50 dark:bg-gray-900/50 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300 transition-all duration-300 ${isCompressing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <PrimaryButton disabled={processing || isCompressing}>
                        {isCompressing ? 'Menyimpan...' : 'Simpan Dokumen'}
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
