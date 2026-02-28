import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TransactionHistory({ transactions, profileProgress }) {
    const isProfileComplete = profileProgress ? profileProgress.percentage === 100 : true;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Riwayat Transaksi</h2>}
        >
            <Head title="Riwayat Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            {!transactions || transactions.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Belum ada riwayat transaksi</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Anda belum pernah melakukan reservasi atau transaksi sebelumnya.</p>
                                    <div className="mt-6">
                                        {isProfileComplete ? (
                                            <Link
                                                href={route('bookings.create')}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
                                            >
                                                Buat Reservasi Baru
                                            </Link>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="inline-flex items-center px-4 py-2 bg-gray-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest cursor-not-allowed opacity-75"
                                                >
                                                    Buat Reservasi Baru
                                                </button>
                                                <span className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-md mt-1 text-center">
                                                    Anda harus melengkapi profil hingga 100% sebelum membuat janji temu
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                <th className="py-3 px-4">Invoice / Kode Transaksi</th>
                                                <th className="py-3 px-4">Paket / Layanan</th>
                                                <th className="py-3 px-4">Terapis & Jadwal</th>
                                                <th className="py-3 px-4">Total Transaksi</th>
                                                <th className="py-3 px-4">Status</th>
                                                <th className="py-3 px-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            {transactions.data.map(tx => {
                                                const isCourse = tx.transactionable_type?.includes('Course');
                                                const isBooking = tx.transactionable_type?.includes('Booking');
                                                const amount = tx.amount ? new Intl.NumberFormat('id-ID').format(tx.amount) : '-';

                                                const status = tx.status || '';
                                                let isPending = status === 'pending';
                                                let isCompleted = status === 'completed' || status === 'paid';
                                                let isDeclined = status === 'declined' || status === 'rejected';
                                                let isCancelled = status === 'cancelled';
                                                let isExpired = status === 'expired';

                                                if (isBooking && tx.transactionable?.status === 'cancelled') {
                                                    isCancelled = true;
                                                    isPending = false;
                                                }

                                                return (
                                                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                        <td className="py-4 px-4 align-top">
                                                            <div className="font-semibold text-indigo-600 dark:text-indigo-400">#{tx.invoice_number || '-'}</div>
                                                            {isBooking && <div className="text-xs text-gray-500 mt-1">Booking: {tx.transactionable?.booking_code || '-'}</div>}
                                                            <div className="text-xs text-gray-400 mt-1">{new Date(tx.created_at).toLocaleDateString('id-ID')}</div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            <div className="font-medium whitespace-nowrap">
                                                                {isCourse ? (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase text-indigo-500">Kelas E-Learning</span>
                                                                        <span>{tx.transactionable?.title || '-'}</span>
                                                                    </div>
                                                                ) : isBooking ? (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[10px] font-black uppercase text-emerald-500">Sesi Terapi</span>
                                                                        <span>
                                                                            {tx.transactionable?.package_type === 'vip' ? 'Paket VIP' : tx.transactionable?.package_type === 'premium' ? 'Paket Premium' : 'Paket Hipnoterapi'}
                                                                        </span>
                                                                    </div>
                                                                ) : '-'}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top min-w-[200px]">
                                                            {isBooking && tx.transactionable ? (
                                                                <>
                                                                    <div className="font-medium">{tx.transactionable?.therapist?.name || tx.transactionable?.schedule?.therapist?.name || '-'}</div>
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                                        {tx.transactionable?.schedule ? new Date(tx.transactionable.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                                                                        {tx.transactionable?.schedule ? `${tx.transactionable.schedule.start_time?.substring(0, 5) || '--:--'} - ${tx.transactionable.schedule.end_time?.substring(0, 5) || '--:--'} WIB` : '-'}
                                                                    </div>
                                                                </>
                                                            ) : isCourse ? (
                                                                <div className="text-sm text-gray-500 italic mt-2">Akses Selamanya</div>
                                                            ) : '-'}
                                                        </td>
                                                        <td className="py-4 px-4 align-top font-semibold text-gray-700 dark:text-gray-300">
                                                            Rp {amount}
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            {isCompleted && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Pembayaran Lunas</span>}
                                                            {isPending && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Menunggu Pembayaran</span>}
                                                            {isDeclined && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Ditolak</span>}
                                                            {isCancelled && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Dibatalkan</span>}
                                                            {isExpired && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">Kadaluarsa</span>}
                                                        </td>
                                                        <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                                                            {isBooking ? (
                                                                <Link
                                                                    href={route('bookings.show', tx.transactionable_id)}
                                                                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                                                >
                                                                    Lihat Detail Booking →
                                                                </Link>
                                                            ) : isCourse && isCompleted ? (
                                                                <Link
                                                                    href={route('courses.show', tx.transactionable_id)}
                                                                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                                                                >
                                                                    Mulai Belajar →
                                                                </Link>
                                                            ) : null}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination Links */}
                            {transactions?.links && transactions.data.length > 0 && (
                                <div className="mt-6 flex flex-wrap justify-center gap-1">
                                    {transactions.links.map((link, i) => (
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
