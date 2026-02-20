import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BookingShow({ booking }) {
    const isPendingPayment = booking.status === 'pending_payment';
    const isPendingScreening = booking.status === 'pending_screening';
    const isPendingValidation = booking.status === 'pending_validation';
    const isConfirmed = booking.status === 'confirmed';

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
