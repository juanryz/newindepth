import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Search, ArrowLeft, Clock } from 'lucide-react';

export default function ExpiredTransactions({ transactions }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return transactions.data;
        const q = searchQuery.toLowerCase();
        return transactions.data.filter(tx =>
            tx.invoice_number?.toLowerCase().includes(q) ||
            tx.user?.name?.toLowerCase().includes(q) ||
            tx.user?.email?.toLowerCase().includes(q)
        );
    }, [transactions.data, searchQuery]);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transaksi Kadaluarsa</h2>}
        >
            <Head title="Transaksi Kadaluarsa" />

            <div className="relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700">
                {/* Dynamic Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-rose-400/20 to-slate-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 relative z-10">
                    {/* Header */}
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500">
                        <div className="flex justify-between items-start flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Arsip <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700">Kadaluarsa</span>
                                </h1>
                                <p className="text-sm text-slate-500 mt-2 font-bold italic">Daftar transaksi yang otomatis dibatalkan karena melebihi batas waktu pembayaran (2 Jam).</p>
                            </div>
                            <Link
                                href={route('admin.transactions.index')}
                                className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-500 text-slate-600 dark:text-slate-300 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Validasi
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-6 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-500">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Cari invoice, nama, atau email..."
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3rem] shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 dark:bg-slate-900/50">
                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                                        <th className="px-6 py-5">Invoice</th>
                                        <th className="px-6 py-5">Pengguna</th>
                                        <th className="px-6 py-5">Layanan</th>
                                        <th className="px-6 py-5">Waktu Buat</th>
                                        <th className="px-6 py-5">Waktu Expired</th>
                                        <th className="px-6 py-5">Nominal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                                    {filteredTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all">
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-black text-slate-900 dark:text-white">#{tx.invoice_number}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{tx.user?.name}</span>
                                                    <span className="text-[10px] text-slate-400">{tx.user?.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] font-black px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg uppercase tracking-widest">
                                                    {tx.transactionable_type?.split('\\').pop()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-xs text-slate-500 font-bold">
                                                {new Date(tx.created_at).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-1.5 text-xs text-rose-500 font-black">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {new Date(new Date(tx.created_at).getTime() + 2 * 60 * 60 * 1000).toLocaleString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-black text-slate-900 dark:text-white">
                                                Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredTransactions.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-inner">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <p className="text-slate-400 font-black italic uppercase tracking-widest text-xs">
                                    {searchQuery ? 'Tidak ada data yang cocok dengan pencarian.' : 'Tidak ada data kadaluarsa ditemukan.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {transactions.links && transactions.data.length > 0 && (
                        <div className="flex justify-center gap-1">
                            {transactions.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 text-xs rounded-xl border transition-all ${link.active ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
