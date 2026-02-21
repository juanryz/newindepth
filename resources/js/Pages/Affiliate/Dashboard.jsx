import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AffiliateDashboard({ commissions, totalEarned, pendingAmount, referralLink }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard Affiliate</h2>}
        >
            <Head title="Affiliate Program" />

            <div className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Link Card */}
                    <div className="bg-gradient-to-br from-indigo-500/90 to-purple-600/90 dark:from-indigo-600/80 dark:to-purple-700/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl border border-white/20">
                        <div className="p-8 flex flex-col md:flex-row items-center justify-between text-white">
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2">Program Afiliasi InDepth Mental Wellness</h3>
                                <p className="opacity-90 max-w-xl text-indigo-50">Bagikan link referral Anda kepada teman atau kerabat. Dapatkan komisi sebesar 10% dari setiap pendaftaran kelas atau sesi terapi yang berhasil.</p>

                                <div className="mt-8 flex items-center bg-white/10 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/20 max-w-lg">
                                    <input
                                        type="text"
                                        readOnly
                                        value={referralLink}
                                        className="bg-transparent border-none text-white w-full focus:ring-0 placeholder-white/50 text-sm font-mono"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-2 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap shadow-lg active:scale-95 transition-all"
                                    >
                                        {copied ? 'Disalin ✓' : 'Salin Link'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Total Komisi Dibayarkan</p>
                            <h4 className="text-3xl font-black text-green-600 dark:text-green-400">Rp {Number(totalEarned).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Komisi Menunggu Pencairan</p>
                            <h4 className="text-3xl font-black text-amber-500 dark:text-amber-400">Rp {Number(pendingAmount).toLocaleString('id-ID')}</h4>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">* Komisi akan dicairkan ke rekening Anda setiap tanggal 1 bulan berikutnya.</p>
                        </div>
                    </div>

                    {/* History */}
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl overflow-hidden shadow-xl sm:rounded-2xl border border-white/80 dark:border-gray-700/50">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Komisi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/50">
                                <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Referred User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item / Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Harga Transaksi</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Komisi Anda</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status Pembayaran</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                    {commissions.data.map((comm) => (
                                        <tr key={comm.id} className="hover:bg-white/40 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                {comm.referred_user?.name || 'User Tersembunyi'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                        {comm.transaction?.transactionable_type?.includes('Booking') ? 'Sesi Terapi' : 'Kelas Online'}
                                                    </span>
                                                    <span className={`text-[10px] uppercase font-bold mt-1 ${comm.transaction?.transactionable?.status === 'completed' || comm.transaction?.transactionable?.status === 'confirmed'
                                                            ? 'text-green-600' : 'text-amber-500'
                                                        }`}>
                                                        • {comm.transaction?.transactionable?.status || 'Active'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                Rp {Number(comm.transaction_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-600 dark:text-green-400">
                                                Rp {Number(comm.commission_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                                    ${comm.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' :
                                                        comm.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'}`}>
                                                    {comm.status === 'paid' ? 'Telah Dibayar' : comm.status === 'rejected' ? 'Dibatalkan' : 'Menunggu'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {commissions.data.length === 0 && (
                                <div className="text-center p-12 text-gray-500 dark:text-gray-400">
                                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Belum ada history komisi. Mulai bagikan link Anda sekarang!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
