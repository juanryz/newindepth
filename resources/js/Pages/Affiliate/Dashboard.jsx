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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Affiliate</h2>}
        >
            <Head title="Affiliate Program" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Link Card */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-8 flex flex-col md:flex-row items-center justify-between text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Program Afiliasi InDepth Mental Wellness</h3>
                                <p className="opacity-90 max-w-xl">Bagikan link referral Anda kepada teman atau kerabat. Dapatkan komisi sebesar 10% dari setiap pendaftaran kelas atau sesi terapi yang berhasil.</p>

                                <div className="mt-6 flex items-center bg-white/20 p-2 rounded-lg backdrop-blur-sm max-w-lg">
                                    <input
                                        type="text"
                                        readOnly
                                        value={referralLink}
                                        className="bg-transparent border-none text-white w-full focus:ring-0 placeholder-white/70"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-2 bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition whitespace-nowrap"
                                    >
                                        {copied ? 'Disalin ✓' : 'Salin Link'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Komisi Dibayarkan</p>
                            <h4 className="text-3xl font-extrabold text-green-600">Rp {Number(totalEarned).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Komisi Menunggu Pencairan</p>
                            <h4 className="text-3xl font-extrabold text-yellow-600">Rp {Number(pendingAmount).toLocaleString('id-ID')}</h4>
                            <p className="text-xs text-gray-400 mt-2">* Komisi akan dicairkan ke rekening Anda setiap tanggal 1 bulan berikutnya.</p>
                        </div>
                    </div>

                    {/* History */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Riwayat Komisi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referred User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga Transaksi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Komisi Anda</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {commissions.data.map((comm) => (
                                        <tr key={comm.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {comm.referred_user?.name || 'User Tersembunyi'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Rp {Number(comm.transaction_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                                                Rp {Number(comm.commission_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${comm.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        comm.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {comm.status === 'paid' ? 'Telah Dibayar' : comm.status === 'rejected' ? 'Dibatalkan' : 'Menunggu'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {commissions.data.length === 0 && (
                                <div className="text-center p-8 text-gray-500">
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
