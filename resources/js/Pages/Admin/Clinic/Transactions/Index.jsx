import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function TransactionsIndex({ transactions, therapists = [] }) {
    const { flash } = usePage().props;
    const [selectedReject, setSelectedReject] = useState(null);
    const [selectedValidate, setSelectedValidate] = useState(null);

    const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject } = useForm({
        rejection_reason: '',
    });

    const { data: validateData, setData: setValidateData, post: validatePost, processing: validating, reset: resetValidate } = useForm({
        therapist_id: '',
    });

    const handleValidate = (tx) => {
        // Only booking types need therapist selection
        if (tx.transactionable_type.includes('Booking')) {
            setSelectedValidate(tx);
            setValidateData('therapist_id', tx.transactionable?.therapist_id ?? '');
        } else {
            if (confirm('Validasi transaksi ini?')) {
                validatePost(route('admin.transactions.validate', tx.id));
            }
        }
    };

    const submitValidate = (e) => {
        e.preventDefault();
        validatePost(route('admin.transactions.validate', selectedValidate.id), {
            onSuccess: () => {
                setSelectedValidate(null);
                resetValidate();
            }
        });
    };

    const submitReject = (e) => {
        e.preventDefault();
        rejectPost(route('admin.transactions.reject', selectedReject.id), {
            onSuccess: () => {
                setSelectedReject(null);
                resetReject();
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard Validasi Transaksi</h2>}
        >
            <Head title="Validasi Transaksi" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-sm animate-pulse">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2rem] border border-gray-100 dark:border-gray-800/50 transition-all duration-500">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Daftar Transaksi</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Kelola dan validasi pembayaran dari pasien dan siswa.</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto -mx-8">
                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                    <thead className="bg-gray-50/50 dark:bg-gray-800/30">
                                        <tr>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Invoice</th>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Pengguna</th>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Tipe Layanan</th>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Metode</th>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Bukti Transfer</th>
                                            <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50 bg-transparent">
                                        {transactions.data.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors duration-300">
                                                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                                        {tx.invoice_number}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{tx.user?.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-500">{tx.user?.email}</div>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <span className="text-xs font-bold px-2.5 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-md border border-gold-500/20">
                                                        {tx.transactionable_type.split('\\').pop()}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                    {tx.payment_bank}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-sm">
                                                    {tx.payment_proof ? (
                                                        <a
                                                            href={`/storage/${tx.payment_proof}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 font-bold decoration-2 hover:underline transition-all"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                            Lihat Bukti
                                                        </a>
                                                    ) : <span className="text-gray-400 dark:text-gray-600 italic">Belum Upload</span>}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <span className={`px-4 py-1.5 inline-flex text-[10px] leading-4 font-black uppercase tracking-widest rounded-full border
                                                        ${tx.status === 'paid' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' :
                                                            tx.status === 'rejected' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                                                                tx.status === 'refunded' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' :
                                                                    tx.status === 'cancelled' ? 'bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20' :
                                                                        'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                                                        }`}>
                                                        {tx.status === 'paid' ? 'Lunas' :
                                                            tx.status === 'rejected' ? 'Ditolak' :
                                                                tx.status === 'refunded' ? 'Dikembalikan' :
                                                                    tx.status === 'cancelled' ? 'Dibatalkan' :
                                                                        tx.status === 'pending' ? 'Menunggu' :
                                                                            tx.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                                    {tx.status === 'pending' && (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleValidate(tx)}
                                                                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95"
                                                            >
                                                                Validasi
                                                            </button>
                                                            <button
                                                                onClick={() => setSelectedReject(tx)}
                                                                className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-600/20 transition-all active:scale-95"
                                                            >
                                                                Tolak
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {transactions.data.length === 0 && (
                                <div className="py-20 text-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 006.586 13H4" /></svg>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium tracking-tight">Belum ada transaksi yang perlu divalidasi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Reject */}
            {selectedReject && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold dark:text-white mb-2">Tolak Pembayaran</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Invoice: <span className="font-bold text-gray-900 dark:text-white">{selectedReject.invoice_number}</span></p>
                        </div>
                        <form onSubmit={submitReject}>
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Alasan Penolakan</label>
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]"
                                    placeholder="Jelaskan alasan penolakan ini kepada pengguna..."
                                    value={rejectData.rejection_reason}
                                    onChange={e => setRejectData('rejection_reason', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <PrimaryButton type="submit" className="!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center">
                                    Konfirmasi Penolakan
                                </PrimaryButton>
                                <button type="button" onClick={() => setSelectedReject(null)} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2">
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Validate — Therapist Selection */}
            {selectedValidate && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold dark:text-white mb-2">Validasi Pembayaran</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Invoice: <span className="font-bold text-gray-900 dark:text-white">{selectedValidate.invoice_number}</span></p>
                        </div>
                        <form onSubmit={submitValidate}>
                            <div className="mb-8">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Pilih Terapis (Opsional)</label>
                                <div className="relative">
                                    <select
                                        value={validateData.therapist_id}
                                        onChange={e => setValidateData('therapist_id', e.target.value)}
                                        className="w-full appearance-none bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all cursor-pointer"
                                    >
                                        <option value="">— Tetap / Tanpa Perubahan —</option>
                                        {therapists.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-3 flex items-start gap-2 leading-relaxed">
                                    <svg className="w-3 h-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Jika tidak dipilih, terapis yang sudah ada sebelumnya (apabila ada) akan dipertahankan atau diacak berdasarkan ketersediaan.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <PrimaryButton
                                    type="submit"
                                    disabled={validating}
                                    className="!bg-gold-600 hover:!bg-gold-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-gold-600/20 !uppercase !w-full !justify-center disabled:opacity-50"
                                >
                                    {validating ? 'Memproses...' : 'Konfirmasi & Validasi'}
                                </PrimaryButton>
                                <button type="button" onClick={() => setSelectedValidate(null)} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2">
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
