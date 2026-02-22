import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function UserShow({ userModel, bookings = [], transactions = [], schedules = [] }) {
    const isPatient = userModel.roles.some(r => r.name === 'patient');
    const isTherapist = userModel.roles.some(r => r.name === 'therapist');

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Detail User: {userModel.name}</h2>}
        >
            <Head title={`User: ${userModel.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* User Header Info */}
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                    {userModel.name.charAt(0)}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{userModel.name}</h1>
                                        <div className="flex flex-wrap gap-2">
                                            {userModel.roles.map(role => (
                                                <span key={role.id} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100 dark:border-indigo-800">
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.phone || '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined Since</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{new Date(userModel.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link href={route('admin.users.index')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm">
                                        Kembali
                                    </Link>
                                    <Link href={route('admin.users.edit', userModel.id)} className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm">
                                        Edit Profil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Patient Info if exists */}
                    {isPatient && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Usia & Gender</p>
                                <p className="text-gray-900 dark:text-white font-bold">{userModel.age ? `${userModel.age} Tahun` : '-'} / {userModel.gender || '-'}</p>
                            </div>
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status Skrining</p>
                                <p className={`font-bold ${userModel.screening_completed_at ? 'text-green-600' : 'text-amber-600'}`}>
                                    {userModel.screening_completed_at ? '✅ Selesai' : '⏳ Belum Skrining'}
                                </p>
                            </div>
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Rekomendasi Paket</p>
                                <p className="text-gray-900 dark:text-white font-black uppercase">{userModel.recommended_package || 'N/A'}</p>
                            </div>
                        </div>
                    )}

                    {/* Log / Activity Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Bookings Table */}
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Riwayat Booking {isTherapist ? '(Terapis)' : '(Pasien)'}</h3>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{bookings.length} Aktivitas</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Detail</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Waktu</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                        {bookings.map(booking => (
                                            <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{booking.booking_code}</p>
                                                    <p className="text-xs text-gray-500 capitalize">{booking.package_type || 'Hipnoterapi'}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                    {booking.schedule ? `${booking.schedule.date} ${booking.schedule.start_time}` : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {bookings.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada riwayat booking</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Transactions or Schedules Section */}
                        {isPatient ? (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Riwayat Transaksi</h3>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{transactions.length} Transaksi</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Invoice / Rekening</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Nominal</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bukti</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {transactions.map(tx => (
                                                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{tx.invoice_number}</p>
                                                        <p className="text-xs text-gray-500">{tx.payment_method || '-'}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {tx.payment_proof ? (
                                                            <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Lihat Bukti</a>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${tx.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                            tx.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {transactions.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada riwayat transaksi</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : isTherapist ? (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Jadwal Terapis</h3>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{schedules.length} Slot</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Waktu</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Isian</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {schedules.map(sch => (
                                                <tr key={sch.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        {new Date(sch.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${sch.booked_count >= sch.quota ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                                            }`}>
                                                            {sch.booked_count} / {sch.quota}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {schedules.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada data jadwal</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
