import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function ExpensesIndex({ expenses }) {
    const { flash } = usePage().props;
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
        category: 'Operasional',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0],
        receipt: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.expenses.store'), {
            onSuccess: () => {
                setIsFormOpen(false);
                reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pengeluaran</h2>
                    <PrimaryButton onClick={() => setIsFormOpen(!isFormOpen)}>
                        {isFormOpen ? 'Tutup Form' : 'Catat Pengeluaran Baru'}
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Manajemen Pengeluaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                            {flash.success}
                        </div>
                    )}

                    {/* Form Input */}
                    {isFormOpen && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold mb-4">Catat Pengeluaran</h3>
                            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel htmlFor="description" value="Deskripsi / Keperluan" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                    />
                                    {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="amount" value="Jumlah (Rp)" />
                                    <TextInput
                                        id="amount"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        required
                                    />
                                    {errors.amount && <p className="text-sm text-red-600 mt-1">{errors.amount}</p>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="category" value="Kategori" />
                                    <select
                                        id="category"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    >
                                        <option value="Operasional">Operasional Harian</option>
                                        <option value="Sewa Tempat">Sewa Tempat</option>
                                        <option value="Gaji Pegawai">Gaji Pegawai / Terapis</option>
                                        <option value="Marketing">Marketing & Ads</option>
                                        <option value="Peralatan">Peralatan Klinik</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                    {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="expense_date" value="Tanggal Pengeluaran" />
                                    <TextInput
                                        id="expense_date"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.expense_date}
                                        onChange={(e) => setData('expense_date', e.target.value)}
                                        required
                                    />
                                    {errors.expense_date && <p className="text-sm text-red-600 mt-1">{errors.expense_date}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="receipt" value="Foto Nota / Struk (Opsional)" />
                                    <input
                                        id="receipt"
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700"
                                        onChange={(e) => setData('receipt', e.target.files[0])}
                                    />
                                    {errors.receipt && <p className="text-sm text-red-600 mt-1">{errors.receipt}</p>}
                                </div>

                                <div className="md:col-span-2 flex justify-end">
                                    <PrimaryButton disabled={processing}>Simpan Data</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Tabel Data */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {expenses.data.map((expense) => (
                                        <tr key={expense.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(expense.expense_date).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{expense.category}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {expense.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                                                Rp {Number(expense.amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                {expense.receipt ? (
                                                    <a href={`/storage/${expense.receipt}`} target="_blank" rel="noreferrer" className="underline">Lihat Nota</a>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('admin.expenses.destroy', expense.id)}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() => confirm('Hapus detail pengeluaran ini?')}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {expenses.data.length === 0 && (
                                <p className="text-center text-gray-500 mt-6 mb-2">Belum ada data pengeluaran.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
