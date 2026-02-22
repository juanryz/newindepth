import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSlotPicker from '@/Components/Clinic/TimeSlotPicker';
import ScreeningFormRenderer from '@/Components/Clinic/ScreeningFormRenderer';

export default function BookingCreate({ schedules, packageOptions, screeningResult }) {
    const { flash, errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
        package_type: packageOptions.recommended,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Buat Janji Temu Hipnoterapi</h2>}
        >
            <Head title="Booking Hipnoterapi" />

            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Screening Results Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {screeningResult && (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-gold-100 dark:border-gold-900/30">
                                <div className="p-6 bg-gradient-to-r from-gold-50/50 to-white/30 dark:from-gold-900/20 dark:to-transparent">
                                    <h3 className="text-lg font-bold text-gold-800 dark:text-gold-300 mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold-600 dark:text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Hasil Analisis Skrining
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-100/80 dark:bg-gold-900/40 text-gold-800 dark:text-gold-300 border border-gold-200 dark:border-gold-800/50">
                                            {screeningResult.severity_label}
                                        </div>
                                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-gold-400 dark:border-gold-600 pl-4 py-1 line-clamp-3">
                                            "{screeningResult.ai_summary}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-indigo-100 dark:border-indigo-900/30">
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    Dokumen Persetujuan Layanan
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    Anda telah menyetujui syarat dan ketentuan layanan InDepth Mental Wellness.
                                </p>
                                <Link
                                    href={route('agreement.show')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-xl transition-colors border border-indigo-100 dark:border-indigo-800"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    Buka Dokumen Perjanjian (PDF)
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

                    <form onSubmit={submit}>
                        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Pilih Waktu Konsultasi</h3>

                            <TimeSlotPicker
                                schedules={schedules}
                                selectedScheduleId={data.schedule_id}
                                onSelect={(id) => setData('schedule_id', id)}
                            />

                            {errors.schedule_id && <p className="text-sm text-red-600 mt-2">{errors.schedule_id}</p>}

                            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                                <p className="text-sm text-red-800 dark:text-red-400 font-medium">
                                    <span className="font-bold uppercase">Perhatian:</span> Maksimal keterlambatan adalah 1 jam. Bila terjadi, maka klien/pasien dianggap tidak hadir. Hipnoterapis dianggap sudah menjalankan tugas, sesi terapi selesai, dan uang klien/pasien hangus.
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <PrimaryButton type="submit" disabled={!data.schedule_id || processing} className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase">
                                    Konfirmasi Booking & Lanjut Pembayaran
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
