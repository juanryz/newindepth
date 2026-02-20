import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = {
    'pending': '#f59e0b', // amber-500
    'confirmed': '#3b82f6', // blue-500
    'done': '#10b981', // emerald-500
    'cancelled': '#ef4444' // red-500
};

export default function ReportsIndex({ stats, recentTransactions, filters, charts }) {

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.reports.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Keuangan Klinik</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 bg-white dark:bg-gray-800"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Cetak Laporan
                        </button>
                        <a
                            href={route('admin.reports.export-csv', filters)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Export CSV
                        </a>
                    </div>
                </div>
            }
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

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        {/* Revenue Trend - Line Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Tren Pendapatan (12 Bulan)</h3>
                            <div className="h-72">
                                {charts?.revenueByMonth?.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={charts.revenueByMonth}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                            <XAxis dataKey="month_year" tick={{ fontSize: 12, fill: '#6b7280' }} />
                                            <YAxis
                                                tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}M`}
                                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                                width={80}
                                            />
                                            <Tooltip
                                                formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Pendapatan']}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-gray-400">Belum ada data pendapatan.</div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Booking Status - Pie Chart */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Status Sesi ({filters.month}/{filters.year})</h3>
                                <div className="h-64">
                                    {charts?.bookingsByStatus?.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={charts.bookingsByStatus}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="count"
                                                    nameKey="status"
                                                >
                                                    {charts.bookingsByStatus.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.status] || '#9ca3af'} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value, name) => [value, name.toUpperCase()]} />
                                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded">Belum ada sesi di periode ini.</div>
                                    )}
                                </div>
                            </div>

                            {/* Top Therapists - Bar Chart */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-2">Top Terapis ({filters.month}/{filters.year})</h3>
                                <div className="h-64">
                                    {charts?.topTherapists?.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={charts.topTherapists} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                                <XAxis type="number" tick={{ fontSize: 10 }} />
                                                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 10 }} />
                                                <Tooltip formatter={(value) => [value, 'Sesi Selesai']} />
                                                <Bar dataKey="bookings" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded">Belum ada sesi selesai.</div>
                                    )}
                                </div>
                            </div>
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
