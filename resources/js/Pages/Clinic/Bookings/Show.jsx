import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BookingShow({ booking, userVouchers = [] }) {
    const isPendingPayment = booking.status === 'pending_payment';
    const isPendingScreening = booking.status === 'pending_screening';
    const isPendingValidation = booking.status === 'pending_validation';
    const isConfirmed = booking.status === 'confirmed';
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Reservasi #{booking.booking_code}</h2>}
        >
            <Head title={`Booking ${booking.booking_code}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Status Banner */}
                    <div className={`p-4 rounded-lg shadow-sm border-l-4 
                        ${isConfirmed ? 'bg-green-50 border-green-500 text-green-800' : ''}
                        ${isPendingPayment ? 'bg-yellow-50 border-yellow-500 text-yellow-800' : ''}
                        ${isPendingValidation ? 'bg-blue-50 border-blue-500 text-blue-800' : ''}
                        ${isPendingScreening ? 'bg-gray-50 border-gray-500 text-gray-800' : ''}
                        ${booking.status === 'cancelled' ? 'bg-red-50 border-red-500 text-red-800' : ''}
                    `}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {isConfirmed && 'Pendaftaran Dikonfirmasi!'}
                                    {isPendingPayment && 'Menunggu Pembayaran'}
                                    {isPendingValidation && 'Menunggu Validasi Admin'}
                                    {isPendingScreening && 'Menunggu Evaluasi Skrining'}
                                    {booking.status === 'cancelled' && 'Dibatalkan'}
                                </h3>
                                <p className="text-sm mt-1">
                                    {isConfirmed && 'Sesi Anda dengan terapis sudah dijadwalkan. Silakan datang tepat waktu.'}
                                    {isPendingPayment && 'Terapis telah menyetujui skrining Anda. Silakan lanjutkan ke pembayaran.'}
                                    {isPendingValidation && 'Bukti pembayaran Anda sedang diverifikasi oleh tim kami.'}
                                    {isPendingScreening && 'Admin/Terapis sedang meninjau form skrining Anda.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium border-b pb-4 mb-4">Informasi Jadwal</h3>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Terapis</dt>
                                    <dd className="mt-1 text-sm text-gray-900 font-semibold">{booking.schedule.therapist?.name || '-'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tanggal</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Waktu</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {booking.schedule.start_time.substring(0, 5)} - {booking.schedule.end_time.substring(0, 5)} WIB
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Lokasi</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        Klinik Utama (Offline)
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium border-b pb-4 mb-4">Ringkasan Pemesanan (Order Summary)</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Layanan InDepth Mental Wellness</span>
                                    <span className="font-medium truncate">
                                        {booking.package_type === 'vip' ? 'Paket VIP (Intensive Care)' : booking.package_type === 'upgrade' ? 'Paket Upgrade (Pengembangan Diri)' : 'Paket Hipnoterapi'}
                                    </span>
                                </div>
                                {hasAppliedVoucher && (
                                    <div className="flex justify-between items-center py-2 border-t border-green-100">
                                        <span className="text-sm text-green-700">✅ Voucher Diterapkan</span>
                                        <span className="text-sm font-semibold text-green-700">
                                            - {booking.user_voucher ? `Rp ${new Intl.NumberFormat('id-ID').format(booking.user_voucher.voucher?.discount_amount || 0)}` : 'Diskon aktif'}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                                    <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                                    <span className="text-xl font-bold text-indigo-700">
                                        Rp {new Intl.NumberFormat('id-ID').format(booking.transaction?.amount || 0)}
                                    </span>
                                </div>
                                {isPendingPayment && (
                                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
                                        <span className="font-bold flex items-center gap-2 mb-1">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Perhatian Kode Unik
                                        </span>
                                        Pastikan Anda mentransfer <strong>tepat sesuai nominal di atas hingga 3 digit terakhir</strong> untuk memastikan kelancaran verifikasi sistem kami.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Voucher Section */}
                    {isPendingPayment && !hasAppliedVoucher && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-medium border-b pb-4 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                    Gunakan Voucher
                                </h3>
                                {activeVouchers.length === 0 ? (
                                    <div className="text-sm text-gray-500">
                                        Anda tidak memiliki voucher aktif. <Link href={route('vouchers.index')} className="text-indigo-600 hover:underline">Klaim voucher sekarang →</Link>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyVoucher} className="flex gap-3 items-end">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Voucher</label>
                                            <select
                                                value={data.user_voucher_id}
                                                onChange={e => setData('user_voucher_id', e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                            >
                                                <option value="">— Pilih voucher —</option>
                                                {activeVouchers.map(v => (
                                                    <option key={v.id} value={v.id}>
                                                        {v.code} — Diskon Rp {new Intl.NumberFormat('id-ID').format(v.discount_amount)}
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
                        <div className="mt-6 flex justify-end">
                            <Link href={`/payments/upload/${booking.id}`}>
                                <PrimaryButton>Lanjutkan ke Pembayaran</PrimaryButton>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
