import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSlotPicker from '@/Components/Clinic/TimeSlotPicker';
import ScreeningFormRenderer from '@/Components/Clinic/ScreeningFormRenderer';
import RefundPolicyContent from '@/Components/Clinic/RefundPolicyContent';

const POLICIES = {
    privacy: {
        title: "KEBIJAKAN PRIVASI",
        content: `InDepth Mental Wellness berkomitmen melindungi privasi data pribadi Anda sesuai standar perlindungan data yang berlaku di Indonesia.`
    }
};

export default function BookingCreate({ schedules, packageOptions, screeningResult }) {
    const { errors: pageErrors } = usePage().props;
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [privacyAgreements, setPrivacyAgreements] = useState({
        read: false,
        consent: false
    });

    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
        package_type: packageOptions.recommended,
        agree_refund: false,
        agree_final: false,
        agree_access: false,
        agree_chargeback: false,
    });

    const submit = (e) => {
        if (e) e.preventDefault();
        post(route('bookings.store'));
    };

    const handlePrivacyAccept = () => {
        if (privacyAgreements.read && privacyAgreements.consent) {
            setPrivacyAccepted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!privacyAccepted) {
        return (
            <AuthenticatedLayout
                header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Kebijakan Privasi</h2>}
            >
                <Head title="Persetujuan Privasi - InDepth" />
                <div className="py-12">
                    <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] border border-white/20 dark:border-gray-700/30 overflow-hidden animate-in fade-in zoom-in duration-500">
                            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                                </div>
                                <div className="relative z-10 space-y-3">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center border border-white/30 shadow-xl">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0014 2.054V1c0 .552.448 1 1 1s1-.448 1-1V.054a10.003 10.003 0 00-6.712 18.477l.054.09A10.003 10.003 0 0112 11z" /></svg>
                                    </div>
                                    <h1 className="text-xl font-black text-white uppercase tracking-tighter">{POLICIES.privacy.title}</h1>
                                    <p className="text-indigo-100 text-xs font-medium">Langkah 1: Persetujuan Pengolahan Data</p>
                                </div>
                            </div>

                            <div className="p-8 md:p-10 space-y-8">
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-[400px] overflow-y-auto custom-scrollbar text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                                    <p className="font-bold text-gray-900 dark:text-white mb-4 italic">Terakhir diperbarui: {POLICIES.privacy.updated}</p>
                                    <div className="whitespace-pre-wrap">{POLICIES.privacy.content}</div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { id: 'read', label: 'Saya telah membaca dan memahami kebijakan privasi ini.' },
                                        { id: 'consent', label: 'Saya setuju data saya diolah sesuai dengan ketentuan di atas.' }
                                    ].map((item) => (
                                        <label key={item.id} className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${privacyAgreements[item.id] ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 hover:border-indigo-100'}`}>
                                            <input
                                                type="checkbox"
                                                checked={privacyAgreements[item.id]}
                                                onChange={e => setPrivacyAgreements({ ...privacyAgreements, [item.id]: e.target.checked })}
                                                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500"
                                            />
                                            <span className={`text-sm font-bold ${privacyAgreements[item.id] ? 'text-indigo-900 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {item.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                <button
                                    onClick={handlePrivacyAccept}
                                    disabled={!(privacyAgreements.read && privacyAgreements.consent)}
                                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${(privacyAgreements.read && privacyAgreements.consent)
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]'
                                        : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                                        }`}
                                >
                                    Lanjut Pilih Jadwal & Paket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Buat Janji Temu Hipnoterapi</h2>}
        >
            <Head title="Booking Hipnoterapi" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => setPrivacyAccepted(false)}
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Kembali ke Kebijakan Privasi
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            onClick={() => setPrivacyAccepted(false)}
                            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-900/30 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    Status Persetujuan Privasi
                                </h3>
                                <p className="text-sm text-emerald-700 dark:text-emerald-400 font-bold">
                                    ✓ Kebijakan Privasi telah disetujui. Klik untuk baca ulang.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-indigo-100 dark:border-indigo-900/30">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    Dokumen Perjanjian
                                </h3>
                                <Link
                                    href={route('agreement.show')}
                                    className="text-xs font-bold text-indigo-600 hover:underline"
                                >
                                    Lihat Standar Perjanjian Layanan (PDF)
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Package Selection */}
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pilih Program Terapi</h3>
                            {packageOptions.is_vip_only ? (
                                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                                    ⚠️ Berdasarkan hasil skrining, kondisi Anda memerlukan penanganan intensif dan prioritas penjadwalan. Anda hanya dapat memilih Paket VIP.
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Silakan pilih paket terapi yang sesuai dengan kebutuhan Anda. Kami merekomendasikan Paket Reguler berdasarkan hasil skrining Anda.
                                </p>
                            )}
                        </div>
                        <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 leading-relaxed">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {Object.values(packageOptions.packages).map((pkg) => {
                                    const isRecommended = packageOptions.recommended === pkg.id;
                                    const isDisabled = packageOptions.is_vip_only && pkg.id !== 'vip';
                                    const isSelected = data.package_type === pkg.id;

                                    return (
                                        <div
                                            key={pkg.id}
                                            className={`relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer flex flex-col ${isSelected
                                                ? 'border-gold-500 bg-gold-50/50 dark:bg-gold-900/30 shadow-lg transform -translate-y-1'
                                                : isDisabled
                                                    ? 'border-gray-200 dark:border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/30 opacity-60 cursor-not-allowed'
                                                    : 'border-gray-200 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 hover:border-gold-300 dark:hover:border-gold-600 hover:shadow-md hover:-translate-y-0.5'
                                                }`}
                                            onClick={() => !isDisabled && setData('package_type', pkg.id)}
                                        >
                                            {/* Wajib Dipilih Badge */}
                                            {packageOptions.is_vip_only && pkg.id === 'vip' && (
                                                <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
                                                    Wajib Dipilih
                                                </div>
                                            )}

                                            {/* Rekomendasi Awal Badge */}
                                            {!packageOptions.is_vip_only && isRecommended && (
                                                <div className="absolute -top-3 right-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                    Rekomendasi Utama
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className={`font-bold text-lg leading-tight ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                                    {pkg.name}
                                                </h4>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-gold-500 bg-white dark:bg-gray-800' : 'border-gray-300 dark:border-gray-600'}`}>
                                                    {isSelected && <div className="w-3 h-3 rounded-full bg-gold-500" />}
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                {pkg.original_price && (
                                                    <div className="text-sm text-gray-400 line-through decoration-red-500/50 decoration-2 mb-1">
                                                        Rp {new Intl.NumberFormat('id-ID').format(pkg.original_price)}
                                                    </div>
                                                )}
                                                <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 select-none">
                                                    Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                                </p>
                                            </div>

                                            <p className={`text-sm flex-grow font-medium ${isSelected ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {pkg.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.package_type && <p className="text-sm font-medium text-red-600 mt-4 px-2">{errors.package_type}</p>}
                        </div>
                    </div>

                    {pageErrors.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            {pageErrors.error}
                        </div>
                    )}

                    <form onSubmit={(e) => { e.preventDefault(); setShowRefundModal(true); }}>
                        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Pilih Waktu Konsultasi</h3>

                            <TimeSlotPicker
                                schedules={schedules}
                                selectedScheduleId={data.schedule_id}
                                onSelect={(id) => setData('schedule_id', id)}
                            />

                            {errors.schedule_id && <p className="text-sm text-red-600 mt-2">{errors.schedule_id}</p>}

                            <div className="mt-8 flex justify-end">
                                <PrimaryButton
                                    type="submit"
                                    disabled={!data.schedule_id || processing}
                                    className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-3 !text-xs !tracking-widest !font-black !h-auto !shadow-none !uppercase"
                                >
                                    Konfirmasi Booking & Lanjut Pembayaran
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* FINAL GATE: NON-REFUND POLICY MODAL */}
            {showRefundModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
                        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-8 text-white relative flex-shrink-0">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">{POLICIES.refund.title}</h2>
                            <p className="text-red-100 text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Langkah Terakhir: Konfirmasi Transaksi Final</p>
                            <button onClick={() => setShowRefundModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar space-y-8 flex-grow">
                            <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 text-xs leading-relaxed text-gray-600 dark:text-gray-400 shadow-inner">
                                <p className="font-bold text-gray-900 dark:text-white mb-4">PENTING: Mohon baca kebijakan non-refund kami secara seksama sebelum membayar.</p>
                                <RefundPolicyContent />
                            </div>

                            <div className="space-y-3">
                                {[
                                    { id: 'agree_refund', label: 'Saya menyatakan telah membaca dan menyetujui Kebijakan Non-Refund.' },
                                    { id: 'agree_final', label: 'Saya memahami bahwa pembayaran ini bersifat FINAL dan TIDAK DAPAT DIREFUND.' },
                                    { id: 'agree_access', label: 'Saya menyetujui bahwa layanan dianggap telah diberikan sejak jadwal dikonfirmasi.' },
                                    { id: 'agree_chargeback', label: 'Saya tidak akan mengajukan chargeback/sengketa tanpa dasar hukum (UU ITE).' },
                                ].map((item) => (
                                    <label key={item.id} className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data[item.id] ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/40' : 'bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800'}`}>
                                        <input
                                            type="checkbox"
                                            checked={data[item.id]}
                                            onChange={e => setData(item.id, e.target.checked)}
                                            className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                        />
                                        <span className={`text-xs font-bold leading-tight ${data[item.id] ? 'text-red-900 dark:text-red-200' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {item.label}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl">
                                <p className="text-[10px] text-amber-800 dark:text-amber-400 font-bold leading-relaxed">
                                    DENGAN MENEKAN TOMBOL DI BAWAH, ANDA MENYATAKAN TRANSAKSI INI SAH SECARA HUKUM DAN BERSETUJU UNTUK TIDAK MELAKUKAN PEMBATALAN SEPIHAK.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4 flex-shrink-0">
                            {Object.keys(errors).length > 0 && (
                                <div className="w-full p-4 mb-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl font-bold">
                                    <p className="mb-1 uppercase tracking-widest">Maaf, terjadi kesalahan:</p>
                                    <ul className="list-disc list-inside">
                                        {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                                    </ul>
                                </div>
                            )}
                            <button
                                onClick={submit}
                                disabled={!(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback) || processing}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl ${(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback)
                                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white hover:scale-[1.02] active:scale-[0.98] shadow-red-500/20'
                                    : 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                SAYA SETUJU & LANJUT PEMBAYARAN
                            </button>
                            <button
                                onClick={() => setShowRefundModal(false)}
                                className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                            >
                                Kembali ke form booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
