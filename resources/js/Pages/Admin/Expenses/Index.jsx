import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function ExpensesIndex({ expenses }) {
    const { auth, flash } = usePage().props;
    const { user } = auth;
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Permission checks
    const hasPermission = (permissionName) => {
        return user.roles?.includes('super_admin') || user.permissions?.includes(permissionName);
    };

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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Pengeluaran</h2>
                    {hasPermission('create expenses') && (
                        <PrimaryButton
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className={`!rounded-2xl !px-6 !py-3 !text-[10px] !tracking-widest !font-black !h-auto !shadow-xl !uppercase transition-all duration-300 transform active:scale-95 ${isFormOpen ? '!bg-gray-200 !text-gray-800 hover:!bg-gray-300' : '!bg-gold-600 hover:!bg-gold-500 !shadow-gold-600/20'
                                }`}
                        >
                            {isFormOpen ? 'Tutup Form' : 'Catat Pengeluaran Baru'}
                        </PrimaryButton>
                    )}
                </div>
            }
        >
            <Head title="Manajemen Pengeluaran" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-sm animate-pulse">
                            {flash.success}
                        </div>
                    )}

                    {/* Form Input */}
                    {isFormOpen && (
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2.5rem] p-8 border border-white dark:border-gray-800 animate-in slide-in-from-top duration-500">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-gold-500 rounded-full"></div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Catat Pengeluaran</h3>
                            </div>
                            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Deskripsi / Keperluan</label>
                                    <TextInput
                                        id="description"
                                        type="text"
                                        className="mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Contoh: Pembelian tisu toilet..."
                                        required
                                    />
                                    {errors.description && <p className="text-[10px] text-red-600 font-bold ml-1">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Jumlah (Rp)</label>
                                    <TextInput
                                        id="amount"
                                        type="number"
                                        className="mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        placeholder="Contoh: 50000"
                                        required
                                    />
                                    {errors.amount && <p className="text-[10px] text-red-600 font-bold ml-1">{errors.amount}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Kategori</label>
                                    <select
                                        id="category"
                                        className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-bold appearance-none cursor-pointer"
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
                                    {errors.category && <p className="text-[10px] text-red-600 font-bold ml-1">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Tanggal</label>
                                    <TextInput
                                        id="expense_date"
                                        type="date"
                                        className="mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5"
                                        value={data.expense_date}
                                        onChange={(e) => setData('expense_date', e.target.value)}
                                        required
                                    />
                                    {errors.expense_date && <p className="text-[10px] text-red-600 font-bold ml-1">{errors.expense_date}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Foto Nota / Struk (Opsional)</label>
                                    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-800/20 hover:border-gold-500/50 transition-all duration-300">
                                        <div className="space-y-1 text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                                <label htmlFor="receipt" className="relative cursor-pointer bg-transparent rounded-md font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 focus-within:outline-none">
                                                    <span>Upload file</span>
                                                    <input id="receipt" type="file" className="sr-only" onChange={(e) => setData('receipt', e.target.files[0])} />
                                                </label>
                                                <p className="pl-1">atau drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500 uppercase font-black tracking-widest">PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {data.receipt && <p className="text-xs text-gold-600 dark:text-gold-400 font-bold mt-2">File dipilih: {data.receipt.name}</p>}
                                    {errors.receipt && <p className="text-[10px] text-red-600 font-bold ml-1">{errors.receipt}</p>}
                                </div>

                                <div className="md:col-span-2 flex justify-end">
                                    <PrimaryButton disabled={processing} className="!bg-gold-600 hover:!bg-gold-500 !rounded-2xl !px-10 !py-4 !text-xs !tracking-widest !font-black !shadow-xl !shadow-gold-600/20 !uppercase !w-full sm:!w-auto">
                                        {processing ? 'Menyimpan...' : 'Simpan Data'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Tabel Data */}
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2.5rem] border border-white dark:border-gray-800 transition-all duration-500">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-gold-500 rounded-full"></div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Riwayat Pengeluaran</h3>
                            </div>

                            <div className="overflow-x-auto -mx-8">
                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800/50">
                                    <thead className="bg-gray-50/50 dark:bg-gray-800/10">
                                        <tr>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Tanggal</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Kategori</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Deskripsi</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Jumlah</th>
                                            <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Nota</th>
                                            <th className="px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/30">
                                        {expenses.data.map((expense) => (
                                            <tr key={expense.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300">
                                                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                    {new Date(expense.expense_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                                                        {expense.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-medium text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                    {expense.description}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-sm font-black text-red-600 dark:text-red-400">
                                                    Rp {Number(expense.amount).toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-sm">
                                                    {expense.receipt ? (
                                                        <a href={`/storage/${expense.receipt}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 font-bold decoration-2 hover:underline transition-all">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                            Lihat
                                                        </a>
                                                    ) : <span className="text-gray-300 dark:text-gray-700 italic text-xs">—</span>}
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                                    {hasPermission('delete expenses') && (
                                                        <Link
                                                            href={route('admin.expenses.destroy', expense.id)}
                                                            method="delete"
                                                            as="button"
                                                            onBefore={() => confirm('Hapus detail pengeluaran ini?')}
                                                            className="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-600/20 transition-all active:scale-95"
                                                        >
                                                            Hapus
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {expenses.data.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 dark:text-gray-600 text-sm font-bold italic tracking-tight">Belum ada data pengeluaran.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
