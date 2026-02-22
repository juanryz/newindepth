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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Validasi Transaksi</h2>}
        >
            <Head title="Validasi Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inv</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipe</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bukti</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.data.map((tx) => (
                                        <tr key={tx.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {tx.invoice_number}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {tx.user?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {tx.transactionable_type.split('\\').pop()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {tx.payment_bank}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {tx.payment_proof ? (
                                                    <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 font-bold underline transition-colors">Lihat Bukti</a>
                                                ) : <span className="text-gray-400 italic">—</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${tx.status === 'paid' ? 'bg-green-100 text-green-800' :
                                                        tx.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                {tx.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleValidate(tx)}
                                                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-md transition-all shadow-sm"
                                                        >
                                                            Validasi
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedReject(tx)}
                                                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-md transition-all shadow-sm"
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
                            {transactions.data.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">Belum ada transaksi.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Reject */}
            {selectedReject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Tolak Pembayaran {selectedReject.invoice_number}</h3>
                        <form onSubmit={submitReject}>
                            <TextInput
                                type="text"
                                className="w-full mb-4"
                                placeholder="Alasan penolakan..."
                                value={rejectData.rejection_reason}
                                onChange={e => setRejectData('rejection_reason', e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setSelectedReject(null)} className="text-gray-600">Batal</button>
                                <PrimaryButton type="submit" className="!bg-red-600 hover:!bg-red-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase">Konfirmasi Penolakan</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Validate — Therapist Selection */}
            {selectedValidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-1">Validasi Pembayaran</h3>
                        <p className="text-sm text-gray-500 mb-4">Invoice: {selectedValidate.invoice_number}</p>
                        <form onSubmit={submitValidate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Terapis (opsional)</label>
                                <select
                                    value={validateData.therapist_id}
                                    onChange={e => setValidateData('therapist_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="">— Tetap / Tanpa Perubahan —</option>
                                    {therapists.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-400 mt-1">Jika tidak dipilih, terapis yang sudah ada sebelumnya akan dipertahankan.</p>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setSelectedValidate(null)} className="text-gray-600">Batal</button>
                                <PrimaryButton type="submit" disabled={validating} className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase">
                                    {validating ? 'Memvalidasi...' : 'Konfirmasi & Validasi'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
