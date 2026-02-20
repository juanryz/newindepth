import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function TransactionsIndex({ transactions }) {
    const { flash } = usePage().props;
    const [selectedReject, setSelectedReject] = useState(null);

    const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject } = useForm({
        rejection_reason: '',
    });

    const handleValidate = (id) => {
        if (confirm('Validasi pembayaran ini dan konfirmasi admin/booking?')) {
            useForm().post(route('admin.transactions.validate', id));
        }
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                {tx.payment_proof && (
                                                    <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="underline">Lihat Bukti</a>
                                                )}
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
                                                    <>
                                                        <button onClick={() => handleValidate(tx.id)} className="text-green-600 hover:text-green-900">Validasi</button>
                                                        <button onClick={() => setSelectedReject(tx)} className="text-red-600 hover:text-red-900">Tolak</button>
                                                    </>
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
                                <PrimaryButton type="submit" className="bg-red-600">Konfirmasi Penolakan</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
