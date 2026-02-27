import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ExpiredTransactions({ transactions }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Transaksi Kadaluarsa</h2>}
        >
            <Head title="Transaksi Kadaluarsa" />

            <div className="py-12 bg-slate-50 dark:bg-slate-900 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Arsip <span className="text-rose-500">Kadaluarsa</span></h1>
                            <p className="text-sm text-slate-500 mt-1">Daftar transaksi yang otomatis dibatalkan karena melebihi batas waktu pembayaran (2 Jam).</p>
                        </div>
                        <Link href={route('admin.transactions.index')} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                            Kembali ke Validasi
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900/50">
                                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                                    <th className="px-6 py-4">Invoice</th>
                                    <th className="px-6 py-4">Pengguna</th>
                                    <th className="px-6 py-4">Layanan</th>
                                    <th className="px-6 py-4">Waktu Buat</th>
                                    <th className="px-6 py-4">Waktu Expired</th>
                                    <th className="px-6 py-4">Nominal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                                {transactions.data.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-slate-900 dark:text-white">#{tx.invoice_number}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{tx.user?.name}</span>
                                                <span className="text-[10px] text-slate-400">{tx.user?.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg uppercase">
                                                {tx.transactionable_type?.split('\\').pop()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            {new Date(tx.created_at).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-rose-500 font-bold">
                                            {new Date(new Date(tx.created_at).getTime() + 2 * 60 * 60 * 1000).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                                            Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {transactions.data.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-slate-400 font-bold italic">Tidak ada data kadaluarsa ditemukan.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {transactions.links && (
                        <div className="flex justify-center gap-1">
                            {transactions.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-4 py-2 text-xs rounded-xl border ${link.active ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
