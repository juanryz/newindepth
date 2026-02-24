import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function BookingShow({ booking, userVouchers = [] }) {
    const isPendingPayment = booking.status === 'pending_payment';
    const isPendingScreening = booking.status === 'pending_screening';
    const isPendingValidation = booking.status === 'pending_validation';
    const isConfirmed = booking.status === 'confirmed';
    const isCompleted = booking.status === 'completed';
    const isCancelled = booking.status === 'cancelled';
    const hasAppliedVoucher = !!booking.user_voucher_id;
    const activeVouchers = userVouchers.filter(v => v.is_active);

    const { data, setData, post, processing } = useForm({
        booking_id: booking.id,
        user_voucher_id: '',
    });

    const handleApplyVoucher = (e) => {
        e.preventDefault();
        post(route('vouchers.apply'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4 text-slate-800 dark:text-white">
                    <h2 className="font-semibold text-xl leading-tight">Detail Reservasi #{booking.booking_code}</h2>
                </div>
            }
        >
            <Head title={`Booking ${booking.booking_code}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Status Banner */}
                    <div className={`p-4 rounded-lg shadow-sm border-l-4 
                        ${isConfirmed ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300' : ''}
                        ${isCompleted ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-800 dark:text-purple-300 font-bold shadow-md' : ''}
                        ${isPendingPayment ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-300' : ''}
                        ${isPendingValidation ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-300' : ''}
                        ${isPendingScreening ? 'bg-gray-50 dark:bg-gray-900/20 border-gray-500 text-gray-800 dark:text-gray-300' : ''}
                        ${booking.status === 'cancelled' ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300' : ''}
                    `}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {isConfirmed && 'Pendaftaran Dikonfirmasi!'}
                                    {isCompleted && 'Sesi Telah Selesai'}
                                    {isPendingPayment && 'Menunggu Pembayaran'}
                                    {isPendingValidation && 'Menunggu Validasi Admin'}
                                    {isPendingScreening && 'Menunggu Evaluasi Skrining'}
                                    {booking.status === 'cancelled' && 'Dibatalkan'}
                                </h3>
                                <p className="text-sm mt-1 opacity-90">
                                    {isConfirmed && 'Sesi Anda dengan terapis sudah dijadwalkan. Silakan datang tepat waktu.'}
                                    {isCompleted && 'Rekaman dan catatan sesi Anda kini tersedia di bawah ini.'}
                                    {isPendingPayment && 'Terapis telah menyetujui skrining Anda. Silakan lanjutkan ke pembayaran.'}
                                    {isPendingValidation && 'Bukti pembayaran Anda sedang diverifikasi oleh tim kami.'}
                                    {isPendingScreening && 'Admin/Terapis sedang meninjau form skrining Anda.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isCompleted && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg border-2 border-purple-100 dark:border-purple-900/30">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h3 className="text-lg font-bold border-b dark:border-gray-700 pb-4 mb-4 flex items-center gap-2 text-purple-800 dark:text-purple-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    Dokumentasi Sesi
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Link Rekaman Sesi</p>
                                        <a
                                            href={booking.recording_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-200"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                            Tonton Rekaman Sesi
                                        </a>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                                        <p className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2 uppercase tracking-wider">Pesan / Summary dari Terapis</p>
                                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-medium">
                                            {booking.patient_visible_notes || 'Terapis tidak menyertakan catatan tambahan.'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium border-b dark:border-gray-700 pb-4 mb-4">Informasi Jadwal</h3>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Terapis</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white font-semibold">{booking.therapist?.name || booking.schedule.therapist?.name || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Waktu</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {booking.schedule.start_time.substring(0, 5)} - {booking.schedule.end_time.substring(0, 5)} WIB
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Lokasi</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        Klinik Utama (Offline)
                                    </dd>
                                </div>
                            </dl>

                            {booking.reschedule_reason && (
                                <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl">
                                    <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Pemberitahuan Perubahan Jadwal
                                    </h4>
                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200 leading-relaxed italic">
                                        "{booking.reschedule_reason}"
                                    </p>
                                    <p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold mt-2 uppercase">
                                        Diperbarui pada: {new Date(booking.rescheduled_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-medium border-b dark:border-gray-700 pb-4 mb-4">Ringkasan Pemesanan (Order Summary)</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600 dark:text-gray-400">Layanan InDepth Mental Wellness</span>
                                    <span className="font-medium truncate dark:text-white">
                                        {booking.package_type === 'vip' ? 'Paket VIP (Intensive Care)' : booking.package_type === 'upgrade' ? 'Paket Upgrade (Pengembangan Diri)' : 'Paket Hipnoterapi'}
                                    </span>
                                </div>
                                {hasAppliedVoucher && (
                                    <div className="flex justify-between items-center py-2 border-t border-green-100 dark:border-green-900/30">
                                        <span className="text-sm text-green-700 dark:text-green-400">✅ Voucher Diterapkan</span>
                                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                            - {booking.user_voucher ? `Rp ${new Intl.NumberFormat('id-ID').format(booking.user_voucher.voucher?.discount_amount || 0)}` : 'Diskon aktif'}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total Pembayaran</span>
                                    <span className="text-xl font-bold text-indigo-700 dark:text-indigo-400">
                                        Rp {new Intl.NumberFormat('id-ID').format(booking.transaction?.amount || 0)}
                                    </span>
                                </div>
                                {isPendingPayment && (
                                    <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800/30 rounded-lg text-sm text-orange-800 dark:text-orange-300">
                                        <span className="font-bold flex items-center gap-2 mb-1">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Perhatian Kode Unik
                                        </span>
                                        Pastikan Anda mentransfer <strong>tepat sesuai nominal di atas hingga 3 digit terakhir</strong> untuk memastikan kelancaran verifikasi sistem kami.
                                    </div>
                                )}

                                {/* REDAKSI UNTUK DASHBOARD / INVOICE */}
                                <div className="mt-6 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                        Kebijakan & Ketentuan Final
                                    </h4>
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            Pembayaran Anda telah diterima dan bersifat <strong>FINAL</strong> sesuai kebijakan InDepth Mental Wellness. Transaksi ini tidak dapat dibatalkan dan tidak dapat direfund.
                                        </p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {[
                                                'Menyetujui Kebijakan Non-Refund',
                                                'Menyetujui Persetujuan Elektronik (UU ITE)',
                                                'Mengunci slot waktu / akses sistem',
                                            ].map((text, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                    {text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Voucher Section */}
                    {isPendingPayment && !hasAppliedVoucher && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-6">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h3 className="text-lg font-medium border-b dark:border-gray-700 pb-4 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                    Gunakan Voucher
                                </h3>
                                {activeVouchers.length === 0 ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Anda tidak memiliki voucher aktif. <Link href={route('vouchers.index')} className="text-indigo-600 dark:text-indigo-400 hover:underline">Klaim voucher sekarang →</Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyVoucher} className="flex gap-3 items-end">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Voucher</label>
                                            <select
                                                value={data.user_voucher_id}
                                                onChange={e => setData('user_voucher_id', e.target.value)}
                                                className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                <option value="">— Pilih voucher —</option>
                                                {activeVouchers.map(v => (
                                                    <option key={v.id} value={v.id}>
                                                        {v.code} — Diskon Rp {new Intl.NumberFormat('id-ID').format(v.voucher?.discount_amount || 0)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing || !data.user_voucher_id}
                                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition-colors"
                                        >
                                            Terapkan
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {isPendingPayment && (
                        <div className="mt-6 flex justify-end items-center">
                            <Link href={route('payments.create', booking.id)}>
                                <PrimaryButton className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-2.5 !text-sm !font-bold">Lanjutkan ke Pembayaran</PrimaryButton>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
