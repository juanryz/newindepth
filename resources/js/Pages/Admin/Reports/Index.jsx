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
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Laporan Keuangan Klinik</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="inline-flex items-center px-4 py-2 border border-gray-100 dark:border-gray-800 rounded-xl font-bold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 backdrop-blur-md transition-all duration-300 bg-white/50 dark:bg-gray-900/50"
                        >
                            <svg className="w-4 h-4 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Cetak Laporan
                        </button>
                        <a
                            href={route('admin.reports.export-csv', filters)}
                            className="inline-flex items-center px-6 py-2 border border-transparent rounded-xl font-black text-xs text-white uppercase tracking-widest bg-gold-600 hover:bg-gold-500 shadow-xl shadow-gold-600/20 transition-all duration-300 transform active:scale-95"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Export CSV
                        </a>
                    </div>
                </div>
            }
        >
            <Head title="Laporan Keuangan" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Filter Bar */}
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-5 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-3xl flex flex-wrap gap-6 items-center border border-white dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gold-500 rounded-full"></div>
                            <span className="font-black text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Filter Periode</span>
                        </div>
                        <div className="flex gap-3">
                            <select
                                name="month"
                                className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-gold-500/20 focus:border-gold-500 dark:text-white transition-all cursor-pointer font-bold"
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
                                className="bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-gold-500/20 focus:border-gold-500 dark:text-white transition-all cursor-pointer font-bold"
                                value={filters.year}
                                onChange={handleFilterChange}
                            >
                                {[2024, 2025, 2026, 2027].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-indigo-500/30 transition-all duration-500">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Total Pendapatan</p>
                            <h4 className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Rp {Number(stats.revenue).toLocaleString('id-ID')}</h4>
                            <div className="mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-full opacity-50"></div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-red-500/30 transition-all duration-500">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Pengeluaran</p>
                            <h4 className="text-2xl font-black text-red-600 dark:text-red-400">Rp {Number(stats.expenses).toLocaleString('id-ID')}</h4>
                            <div className="mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-full opacity-50"></div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-yellow-500/30 transition-all duration-500">
                            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">Komisi Afiliasi</p>
                            <h4 className="text-2xl font-black text-yellow-600 dark:text-yellow-400">Rp {Number(stats.commissions).toLocaleString('id-ID')}</h4>
                            <div className="mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-full opacity-50"></div>
                            </div>
                        </div>
                        <div className="bg-gold-600 p-8 rounded-[2.5rem] shadow-2xl shadow-gold-600/20 group transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                            <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-4 relative z-10">Laba Bersih</p>
                            <h4 className="text-3xl font-black text-white relative z-10">Rp {Number(stats.netIncome).toLocaleString('id-ID')}</h4>
                            <div className="mt-6 w-full h-1 bg-white/20 rounded-full relative z-10">
                                <div className="h-full bg-white w-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        {/* Revenue Trend - Line Chart */}
                        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Tren Pendapatan <span className="text-gold-500 font-light text-sm ml-2">(12 Bulan)</span></h3>
                            <div className="h-[350px]">
                                {charts?.revenueByMonth?.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={charts.revenueByMonth}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                                            <XAxis
                                                dataKey="month_year"
                                                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
                                                axisLine={false}
                                                tickLine={false}
                                                dy={10}
                                            />
                                            <YAxis
                                                tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}jt`}
                                                tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
                                                width={60}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                                    backdropFilter: 'blur(8px)',
                                                    borderRadius: '1.5rem',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    padding: '16px',
                                                    color: '#fff'
                                                }}
                                                itemStyle={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold' }}
                                                labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'black', marginBottom: '8px', textTransform: 'uppercase' }}
                                                formatter={(value) => [`Rp ${Number(value).toLocaleString('id-ID')}`, 'Pemasukan']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="total"
                                                stroke="#d4a321"
                                                strokeWidth={4}
                                                dot={{ r: 4, fill: '#d4a321', strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8, fill: '#fff', stroke: '#d4a321', strokeWidth: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        </div>
                                        <p className="font-bold text-sm">Belum ada data pendapatan.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Booking Status - Pie Chart */}
                            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50">
                                <h3 className="text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-center">Status Sesi</h3>
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
                                                    paddingAngle={8}
                                                    dataKey="count"
                                                    nameKey="status"
                                                    stroke="none"
                                                >
                                                    {charts.bookingsByStatus.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.status] || '#9ca3af'} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                                        backdropFilter: 'blur(8px)',
                                                        borderRadius: '1rem',
                                                        border: 'none',
                                                        fontSize: '10px'
                                                    }}
                                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                                />
                                                <Legend
                                                    iconType="circle"
                                                    wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '20px', color: '#9ca3af' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-[10px] font-bold border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">Belum ada sesi.</div>
                                    )}
                                </div>
                            </div>

                            {/* Top Therapists - Bar Chart */}
                            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50">
                                <h3 className="text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-center">Top Terapis</h3>
                                <div className="h-64">
                                    {charts?.topTherapists?.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={charts.topTherapists} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                                                <XAxis type="number" hide />
                                                <YAxis
                                                    dataKey="name"
                                                    type="category"
                                                    width={100}
                                                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                                                        backdropFilter: 'blur(8px)',
                                                        borderRadius: '1rem',
                                                        border: 'none',
                                                        fontSize: '10px'
                                                    }}
                                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                                />
                                                <Bar dataKey="bookings" fill="#d4a321" radius={[0, 10, 10, 0]} barSize={16} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400 text-[10px] font-bold border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">Belum ada data.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl overflow-hidden shadow-2xl sm:rounded-[2.5rem] mt-12 border border-white dark:border-gray-800 transition-all duration-500">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Transaksi Terakhir</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">5 pemasukan terbaru di periode ini.</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800/50">
                                <thead className="bg-gray-50/50 dark:bg-gray-800/10">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tanggal</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Customer</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Jenis</th>
                                        <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Invoice</th>
                                        <th className="px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Jumlah</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/30">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300">
                                            <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white">{tx.user?.name}</div>
                                                <div className="text-[10px] text-gray-500 font-medium">Verified Payment</div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className="px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gold-500/20">
                                                    {tx.transactionable_type.split('\\').pop() === 'Booking' ? 'Terapi' : 'Learning'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 font-mono font-bold">
                                                {tx.invoice_number}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-sm font-black text-green-600 dark:text-green-400 text-right">
                                                + Rp {Number(tx.amount).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {recentTransactions.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 dark:text-gray-600 text-sm font-bold italic">Tidak ada pemasukan di periode ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout >
    );
}
