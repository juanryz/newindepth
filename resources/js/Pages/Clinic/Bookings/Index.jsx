import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function BookingIndex({ bookings }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Riwayat Transaksi & Reservasi</h2>}
        >
            <Head title="Riwayat Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {bookings.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Belum ada riwayat</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Anda belum pernah melakukan reservasi atau transaksi sebelumnya.</p>
                                    <div className="mt-6">
                                        <Link
                                            href={route('bookings.create')}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Buat Reservasi Baru
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                <th className="py-3 px-4">Invoice / Booking Code</th>
                                                <th className="py-3 px-4">Paket Layanan</th>
                                                <th className="py-3 px-4">Terapis & Jadwal</th>
                                                <th className="py-3 px-4">Total Transaksi</th>
                                                <th className="py-3 px-4">Status</th>
                                                <th className="py-3 px-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {bookings.data.map(booking => {
                                                const isPendingPayment = booking.status === 'pending_payment';
                                                const isPendingValidation = booking.status === 'pending_validation';
                                                const isPendingScreening = booking.status === 'pending_screening';
                                                const isConfirmed = booking.status === 'confirmed';
                                                const isCancelled = booking.status === 'cancelled';
                                                const amount = booking.transaction?.amount ? new Intl.NumberFormat('id-ID').format(booking.transaction.amount) : '-';

                                                return (
                                                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="py-4 px-4 align-top">
                                                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">#{booking.booking_code}</div>
                                                            <div className="text-xs text-gray-500 mt-1">{booking.transaction?.invoice_number || '-'}</div>
                                                            <div className="text-xs text-gray-400 mt-1">{new Date(booking.created_at).toLocaleDateString('id-ID')}</div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            <div className="font-medium whitespace-nowrap">
                                                                {booking.package_type === 'vip' ? 'Paket VIP' : booking.package_type === 'upgrade' ? 'Paket Upgrade' : 'Paket Hipnoterapi'}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top min-w-[200px]">
                                                            <div className="font-medium">{booking.schedule?.therapist?.name || '-'}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                                {booking.schedule ? new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                                                                {booking.schedule ? `${booking.schedule.start_time?.substring(0, 5) || '--:--'} - ${booking.schedule.end_time?.substring(0, 5) || '--:--'} WIB` : '-'}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top font-semibold text-gray-700 dark:text-gray-300">
                                                            Rp {amount}
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            {isConfirmed && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Dikonfirmasi</span>}
                                                            {isPendingPayment && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Menunggu Pembayaran</span>}
                                                            {isPendingValidation && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Validasi Admin</span>}
                                                            {isPendingScreening && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Skrining</span>}
                                                            {isCancelled && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Dibatalkan</span>}
                                                        </td>
                                                        <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                                                            <Link
                                                                href={route('bookings.show', booking.id)}
                                                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                                            >
                                                                Lihat Detail →
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination Links (Basic Support) */}
                            {bookings.links && bookings.data.length > 0 && (
                                <div className="mt-6 flex flex-wrap justify-center gap-1">
                                    {bookings.links.map((link, i) => (
                                        <div key={i}>
                                            {link.url === null ? (
                                                <div
                                                    className="mb-1 mr-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <Link
                                                    href={link.url}
                                                    className={`mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-gray-50 focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
