import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function InitialAgreement({ userAge }) {
    const isUnder17 = userAge !== null && userAge < 17;

    const { data, setData, post, processing } = useForm({
        // Bagian 1
        cond_data_benar: false,
        cond_bukan_pengganti_medis: false,
        cond_sadar_penuh: false,
        cond_riwayat_penyakit: false,

        // Bagian 2
        status_medis: '',

        // Bagian 3
        izin_wali: !isUnder17, // Always true if over 17 so validation passes easily
        nama_wali: '',
        telepon_wali: '',

        // Bagian 4
        risk_hubungi_medis: false,
        risk_henti_sesi: false,

        // Bagian 5
        doc_direkam: false,
        doc_hukum: false,

        // Bagian 6
        konfirmasi_akhir: false,
    });

    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        const isMedisSelected = data.status_medis !== '';

        let isWaliValid = true;
        if (isUnder17) {
            isWaliValid = data.izin_wali && data.nama_wali.trim() !== '' && data.telepon_wali.trim() !== '';
        }

        const requiredCheckboxes = [
            data.cond_data_benar,
            data.cond_bukan_pengganti_medis,
            data.cond_sadar_penuh,
            data.cond_riwayat_penyakit,
            data.risk_hubungi_medis,
            data.risk_henti_sesi,
            data.doc_direkam,
            data.doc_hukum,
            data.konfirmasi_akhir,
        ].every(Boolean);

        setAllChecked(requiredCheckboxes && isMedisSelected && isWaliValid);
    }, [data, isUnder17]);

    const submit = (e) => {
        e.preventDefault();
        post(route('agreement.store'), {
            agreement_data: data
        });
    };

    const CheckboxItem = ({ id, label, checked, onChange }) => (
        <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${checked ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300'}`}>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-1 accent-indigo-600 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm leading-relaxed">{label}</span>
        </label>
    );

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Persetujuan Awal Layanan InDepth</h2>}>
            <Head title="Persetujuan Awal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10">

                        <div className="mb-8 border-b pb-6 dark:border-gray-700 text-center">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Form Pernyataan Awal</h3>
                            <p className="text-sm text-gray-500 mt-2">Harap baca dengan teliti dan centang seluruh pernyataan di bawah ini untuk melanjutkan ke proses booking.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-10">

                            {/* Bagian 1 */}
                            <section>
                                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">1</span>
                                    Pernyataan Kondisi Pribadi
                                </h4>
                                <div className="space-y-3 pl-8">
                                    <CheckboxItem
                                        label="Saya menyatakan bahwa data yang saya isi pada tahap screening adalah benar dan sesuai kondisi saya saat ini."
                                        checked={data.cond_data_benar}
                                        onChange={(val) => setData('cond_data_benar', val)}
                                    />
                                    <CheckboxItem
                                        label="Saya memahami bahwa layanan hipnoterapi bukan pengganti pengobatan medis darurat."
                                        checked={data.cond_bukan_pengganti_medis}
                                        onChange={(val) => setData('cond_bukan_pengganti_medis', val)}
                                    />
                                    <CheckboxItem
                                        label="Saya dalam kondisi sadar penuh dan tidak berada di bawah pengaruh alkohol atau zat terlarang saat melakukan pendaftaran."
                                        checked={data.cond_sadar_penuh}
                                        onChange={(val) => setData('cond_sadar_penuh', val)}
                                    />
                                    <CheckboxItem
                                        label="Jika saya memiliki riwayat penyakit jantung, gangguan saraf berat, epilepsi, atau kondisi medis serius lainnya, saya telah mempertimbangkan kondisi tersebut sebelum melanjutkan."
                                        checked={data.cond_riwayat_penyakit}
                                        onChange={(val) => setData('cond_riwayat_penyakit', val)}
                                    />
                                </div>
                            </section>

                            {/* Bagian 2 */}
                            <section>
                                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">2</span>
                                    Status Perawatan Medis
                                </h4>
                                <div className="pl-8 space-y-4">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Apakah Anda saat ini masih menjalani perawatan medis atau psikologis?</p>
                                    <div className="space-y-3">
                                        <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.status_medis === 'Tidak' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                                            <input type="radio" name="status_medis" className="text-indigo-600 accent-indigo-600" value="Tidak" checked={data.status_medis === 'Tidak'} onChange={() => setData('status_medis', 'Tidak')} />
                                            <span className="text-sm">Tidak</span>
                                        </label>
                                        <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${data.status_medis === 'Ya' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                                            <input type="radio" name="status_medis" className="text-indigo-600 accent-indigo-600" value="Ya" checked={data.status_medis === 'Ya'} onChange={() => setData('status_medis', 'Ya')} />
                                            <span className="text-sm">Ya, dan saya memahami bahwa layanan InDepth bersifat terapi komplementer.</span>
                                        </label>
                                    </div>

                                    {data.status_medis === 'Ya' && (
                                        <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 text-sm font-medium rounded-r-xl">
                                            "Saya memahami bahwa hipnoterapi di InDepth bukan pengganti pengobatan medis yang sedang saya jalani."
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Bagian 3 — Pernyataan Usia */}
                            {isUnder17 && (
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">3</span>
                                        Pernyataan Usia (Di bawah 17 Tahun)
                                    </h4>
                                    <div className="space-y-4 pl-8">
                                        <CheckboxItem
                                            label="Saya menyatakan telah mendapatkan izin dari orang tua atau wali sah."
                                            checked={data.izin_wali}
                                            onChange={(val) => setData('izin_wali', val)}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Wali *</label>
                                                <TextInput
                                                    className="w-full"
                                                    value={data.nama_wali}
                                                    onChange={(e) => setData('nama_wali', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Telepon Wali *</label>
                                                <TextInput
                                                    className="w-full"
                                                    type="tel"
                                                    value={data.telepon_wali}
                                                    onChange={(e) => setData('telepon_wali', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {!isUnder17 && (
                                <section className="hidden">
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">3</span>
                                        Pernyataan Usia
                                    </h4>
                                    {/* Pasien dewasa tidak perlu ini, tetapi ini menjaga nomor tetap urut di mata pengguna */}
                                </section>
                            )}

                            {/* Bagian 4 */}
                            <section>
                                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '4' : '3'}</span>
                                    Pernyataan Risiko & Darurat
                                </h4>
                                <div className="space-y-3 pl-8">
                                    <CheckboxItem
                                        label="Saya memahami bahwa jika terjadi kondisi darurat medis selama sesi berlangsung, tim InDepth akan menghubungi layanan medis terdekat."
                                        checked={data.risk_hubungi_medis}
                                        onChange={(val) => setData('risk_hubungi_medis', val)}
                                    />
                                    <CheckboxItem
                                        label="Saya memahami bahwa sesi dapat dihentikan sewaktu-waktu jika kondisi medis darurat terjadi."
                                        checked={data.risk_henti_sesi}
                                        onChange={(val) => setData('risk_henti_sesi', val)}
                                    />
                                </div>
                            </section>

                            {/* Bagian 5 */}
                            <section>
                                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '5' : '4'}</span>
                                    Persetujuan Sistem Dokumentasi
                                </h4>
                                <div className="space-y-3 pl-8">
                                    <CheckboxItem
                                        label="Saya memahami bahwa sesi akan direkam untuk tujuan dokumentasi dan perlindungan hukum, serta ditampilkan visualnya di ruang tunggu tanpa audio."
                                        checked={data.doc_direkam}
                                        onChange={(val) => setData('doc_direkam', val)}
                                    />
                                    <CheckboxItem
                                        label="Saya memahami bahwa rekaman hanya dibuka jika diperlukan secara hukum."
                                        checked={data.doc_hukum}
                                        onChange={(val) => setData('doc_hukum', val)}
                                    />
                                </div>
                            </section>

                            {/* Bagian 6 */}
                            <section>
                                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '6' : '5'}</span>
                                    Konfirmasi Akhir
                                </h4>
                                <div className="space-y-3 pl-8">
                                    <CheckboxItem
                                        label="Saya telah membaca dan memahami seluruh pernyataan di atas dan setuju untuk melanjutkan ke proses booking."
                                        checked={data.konfirmasi_akhir}
                                        onChange={(val) => setData('konfirmasi_akhir', val)}
                                    />
                                </div>
                            </section>

                            {/* Tombol Lanjut */}
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 mt-10">
                                {!allChecked && (
                                    <div className="mb-4 text-center text-sm text-red-500 bg-red-50 dark:bg-red-900/20 py-3 rounded-lg">
                                        Harap isi dan centang seluruh pernyataan di atas (termasuk status medis) untuk dapat melanjutkan.
                                    </div>
                                )}
                                <PrimaryButton
                                    className="w-full h-14 text-lg justify-center shadow-lg"
                                    disabled={!allChecked || processing}
                                >
                                    Lanjutkan ke Booking
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
