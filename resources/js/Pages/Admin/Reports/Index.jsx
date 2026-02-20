import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function ReportsIndex({ stats, recentTransactions, filters }) {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.reports.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Keuangan Klinik</h2>}
        >
            <Head title="Laporan Keuangan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Filter Bar */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg flex gap-4 items-center">
                        <span className="font-bold text-gray-700">Filter Periode:</span>
                        <select
                            name="month"
                            className="border-gray-300 rounded-md text-sm"
                            value={filters.month}
                            onChange={handleFilterChange}
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                <option key={m} value={m.toString().padStart(2, '0')}>
                                    Bulan {m}
                                </option>
                            ))}
                        </select>
                        <select
                            name="year"
                            className="border-gray-300 rounded-md text-sm"
                            value={filters.year}
                            onChange={handleFilterChange}
                        >
                            {[2024, 2025, 2026, 2027].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Pendapatan</p>
                            <h4 className="text-2xl font-extrabold text-indigo-700">Rp {Number(stats.revenue).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Pengeluaran Operasional</p>
                            <h4 className="text-2xl font-extrabold text-red-600">Rp {Number(stats.expenses).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Komisi Afiliasi (Keluar)</p>
                            <h4 className="text-2xl font-extrabold text-yellow-600">Rp {Number(stats.commissions).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500 bg-green-50">
                            <p className="text-sm font-medium text-green-800 uppercase tracking-wider mb-1">Laba Bersih (Net Income)</p>
                            <h4 className="text-3xl font-extrabold text-green-700">Rp {Number(stats.netIncome).toLocaleString('id-ID')}</h4>
                        </div>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8 border border-gray-100">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">5 Transaksi Pemasukan Terakhir (Bulan Ini)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis Transaksi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(tx.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {tx.user?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                                                    {tx.transactionable_type.split('\\').pop() === 'Booking' ? 'Sesi Terapi' : 'Kelas M-Learning'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                {tx.invoice_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                                                + Rp {Number(tx.amount).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {recentTransactions.length === 0 && (
                                <p className="text-center text-gray-500 mt-6 mb-4">Tidak ada pemasukan di periode ini.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
