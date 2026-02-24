import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSlotPicker from '@/Components/Clinic/TimeSlotPicker';
import ScreeningFormRenderer from '@/Components/Clinic/ScreeningFormRenderer';
import RefundPolicyContent from '@/Components/Clinic/RefundPolicyContent';
import PrivacyPolicyContent from '@/Components/Clinic/PrivacyPolicyContent';

const POLICIES = {
    privacy: {
        title: "KEBIJAKAN PRIVASI",
    },
    refund: {
        title: "KEBIJAKAN NON-REFUND",
        content: `Semua pembayaran yang dilakukan melalui platform InDepth Mental Wellness bersifat final dan tidak dapat dikembalikan (non-refundable).`
    }
};

export default function BookingCreate({ schedules, packageOptions, screeningResult }) {
    const { errors: pageErrors } = usePage().props;

    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
        package_type: packageOptions.recommended,
        agree_privacy: false,
        agree_refund: false,
        agree_final: false,
        agree_access: false,
        agree_chargeback: false,
    });

    const goToStep2 = () => {
        if (!data.agree_privacy) {
            alert('Silakan setujui Kebijakan Privasi terlebih dahulu.');
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(2);
    };

    const goToStep3 = () => {
        if (!data.schedule_id) {
            alert('Silakan pilih jadwal terlebih dahulu.');
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(3);
    };

    const submit = (e) => {
        if (e) e.preventDefault();

        if (!(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback)) {
            alert('Silakan setujui seluruh poin Kebijakan Non-Refund untuk melanjutkan.');
            return;
        }

        post(route('bookings.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Buat Janji Temu Hipnoterapi</h2>}
        >
            <Head title="Booking Hipnoterapi" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Header Info Status Accordions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <details className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-emerald-100 dark:border-emerald-900/30 group mb-4 lg:mb-0 transition-all duration-300">
                            <summary className="p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden">
                                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    Keamanan Data
                                </h3>
                                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </summary>
                            <div className="px-6 pb-6 text-sm text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed border-t border-emerald-100 dark:border-emerald-900/30 pt-4 animate-fade-in-up">
                                Data Anda dilindungi dengan enkripsi end-to-end dan hanya dapat diakses oleh praktisi yang menangani Anda.
                            </div>
                        </details>

                        <details className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-indigo-100 dark:border-indigo-900/30 group transition-all duration-300">
                            <summary className="p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden">
                                <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    Standar Layanan
                                </h3>
                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </summary>
                            <div className="px-6 pb-6 border-t border-indigo-100 dark:border-indigo-900/30 pt-4 animate-fade-in-up">
                                <Link href={route('agreement.show')} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Lihat Standar Perjanjian Layanan (PDF)
                                </Link>
                            </div>
                        </details>
                    </div>

                    {step === 1 && (
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden animate-fade-in-up">
                            <div className="bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white">
                                <h3 className="text-lg font-black uppercase tracking-tighter">1. Kebijakan Privasi & Data</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-100 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative">
                                    <PrivacyPolicyContent />
                                </div>
                                <label className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data.agree_privacy ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800'}`}>
                                    <input type="checkbox" checked={data.agree_privacy} onChange={e => setData('agree_privacy', e.target.checked)} className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                    <span className={`text-xs font-bold ${data.agree_privacy ? 'text-indigo-900 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-400'}`}>
                                        Saya telah membaca dan menyetujui pengolahan data sesuai Kebijakan Privasi InDepth.
                                    </span>
                                </label>
                            </div>

                            <div className="p-6 bg-white dark:bg-gray-800 flex justify-end items-center border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={goToStep2}
                                    disabled={!data.agree_privacy}
                                    className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${data.agree_privacy
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                                        : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Centang & Simpan
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Step 2: Package Selection */}
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                                <div className="bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white">
                                    <h3 className="text-lg font-black uppercase tracking-tighter">2. Pilih Program Terapi</h3>
                                </div>
                                <div className="p-6">
                                    {packageOptions.is_vip_only ? (
                                        <p className="text-sm text-amber-600 dark:text-amber-400 font-bold mb-6">
                                            ⚠️ Berdasarkan hasil skrining, kondisi Anda memerlukan penanganan intensif (Paket VIP).
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                            Kami merekomendasikan {packageOptions.recommended === 'hipnoterapi' ? 'Paket Hipnoterapi' : 'Paket Upgrade'} berdasarkan hasil skrining Anda.
                                        </p>
                                    )}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        {Object.values(packageOptions.packages).map((pkg) => (
                                            <div key={pkg.id}
                                                className={`relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer flex flex-col ${data.package_type === pkg.id ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-900/30 shadow-lg' : (packageOptions.is_vip_only && pkg.id !== 'vip' ? 'opacity-40 grayscale cursor-not-allowed' : 'border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-gray-800/40 hover:border-gold-300')}`}
                                                onClick={() => (!packageOptions.is_vip_only || pkg.id === 'vip') && setData('package_type', pkg.id)}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-black text-sm uppercase tracking-widest">{pkg.name}</h4>
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.package_type === pkg.id ? 'border-gold-500 bg-gold-500' : 'border-gray-300'}`}>
                                                        {data.package_type === pkg.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    {pkg.original_price && <div className="text-[10px] text-gray-400 line-through">Rp {new Intl.NumberFormat('id-ID').format(pkg.original_price)}</div>}
                                                    <p className="text-xl font-black text-gold-600">Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">*Harga belum termasuk PPN 11%</p>
                                                </div>
                                                <p className="text-[11px] font-medium text-gray-500 leading-relaxed">{pkg.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.package_type && <p className="text-xs font-bold text-red-600 mt-4 uppercase tracking-widest">{errors.package_type}</p>}
                                </div>
                            </div>

                            {/* Step 3: Schedule Selection */}
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                                <div className="bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white">
                                    <h3 className="text-lg font-black uppercase tracking-tighter">3. Pilih Waktu Konsultasi</h3>
                                </div>
                                <div className="p-6">
                                    <TimeSlotPicker schedules={schedules} selectedScheduleId={data.schedule_id} onSelect={(id) => setData('schedule_id', id)} />
                                    {errors.schedule_id && <p className="text-xs font-bold text-red-600 mt-4 uppercase tracking-widest">{errors.schedule_id}</p>}
                                </div>

                                <div className="p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                                    <button
                                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(1); }}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Kembali
                                    </button>
                                    <button
                                        onClick={goToStep3}
                                        disabled={!data.schedule_id}
                                        className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${data.schedule_id
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                                            : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Simpan & Lanjut Pembayaran
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Step 4: Final Policies (Refund) */}
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-red-100 dark:border-red-900/30 overflow-hidden">
                                <div className="bg-gradient-to-r from-red-700 to-rose-900 p-6 text-white">
                                    <h3 className="text-lg font-black uppercase tracking-tighter">4. Kebijakan Final & Non-Refund</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative">
                                        <RefundPolicyContent />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            { id: 'agree_refund', label: 'Setuju Kebijakan Non-Refund.' },
                                            { id: 'agree_final', label: 'Pembayaran ini bersifat FINAL.' },
                                            { id: 'agree_access', label: 'Layanan dimulai saat jadwal dikonfirmasi.' },
                                            { id: 'agree_chargeback', label: 'Tidak akan mengajukan sengketa/chargeback.' },
                                        ].map((item) => (
                                            <label key={item.id} className={`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data[item.id] ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/40' : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800'}`}>
                                                <input type="checkbox" checked={data[item.id]} onChange={e => setData(item.id, e.target.checked)} className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                                                <span className={`text-[11px] font-black uppercase tracking-tight ${data[item.id] ? 'text-red-900 dark:text-red-200' : 'text-gray-600 dark:text-gray-400'}`}>{item.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                                    <button
                                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setStep(2); }}
                                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </div>

                            {/* Global Errors & Submit */}
                            <div className="p-8 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/[0.08] shadow-2xl flex flex-col items-center gap-6">
                                {(pageErrors.error || Object.keys(errors).length > 0) && (
                                    <div className="w-full p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
                                        <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] mb-2 text-center">Terjadi Kesalahan</p>
                                        <ul className="text-[10px] font-bold text-red-500/80 list-disc list-inside space-y-1 text-center">
                                            {pageErrors.error && <li>{pageErrors.error}</li>}
                                            {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <button
                                    onClick={submit}
                                    disabled={!data.schedule_id || !data.agree_privacy || !(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback) || processing}
                                    className={`w-full max-w-md py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-sm transition-all shadow-2xl ${(data.schedule_id && data.agree_privacy && data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback)
                                        ? 'bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white hover:scale-[1.02] active:scale-[0.98] shadow-red-500/20'
                                        : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed grayscale'
                                        }`}
                                >
                                    KONFIRMASI & LANJUT PEMBAYARAN
                                </button>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-10 leading-relaxed">
                                    Dengan menekan tombol di atas, Anda menyatakan persetujuan mutlak terhadap seluruh syarat dan ketentuan platform.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
