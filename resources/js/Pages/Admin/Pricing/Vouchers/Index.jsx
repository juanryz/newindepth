import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

function formatRp(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

function VoucherRow({ voucher, onEdit, onDelete }) {
    const isExpired = voucher.valid_until && new Date(voucher.valid_until) < new Date();
    return (
        <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
            <td className="px-4 py-3 font-mono font-bold text-sm text-indigo-700 dark:text-indigo-400">{voucher.code}</td>
            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{voucher.description || '—'}</td>
            <td className="px-4 py-3 text-sm font-semibold text-green-700 dark:text-green-400">{formatRp(voucher.discount_amount)}</td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {voucher.user_vouchers_count} {voucher.max_claims ? `/ ${voucher.max_claims}` : '∞'}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {voucher.valid_until ? new Date(voucher.valid_until).toLocaleDateString('id-ID') : '—'}
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${!voucher.is_active || isExpired
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {!voucher.is_active ? 'Nonaktif' : isExpired ? 'Kadaluarsa' : 'Aktif'}
                </span>
            </td>
            <td className="px-4 py-3 text-right space-x-2">
                <button onClick={() => onEdit(voucher)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Edit</button>
                <button onClick={() => onDelete(voucher.id)} className="text-xs text-red-600 dark:text-red-400 hover:underline">Hapus</button>
            </td>
        </tr>
    );
}

export default function VouchersIndex({ vouchers }) {
    const [showForm, setShowForm] = useState(false);
    const [editVoucher, setEditVoucher] = useState(null);

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        code: '',
        description: '',
        discount_amount: '',
        max_claims: '',
        valid_from: new Date().toISOString().split('T')[0],
        valid_until: '',
        is_active: true,
    });

    const handleEdit = (v) => {
        setEditVoucher(v);
        setData({
            code: v.code,
            description: v.description || '',
            discount_amount: v.discount_amount,
            max_claims: v.max_claims || '',
            valid_from: v.valid_from ? v.valid_from.split('T')[0] : '',
            valid_until: v.valid_until ? v.valid_until.split('T')[0] : '',
            is_active: v.is_active,
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus voucher ini? Klaim yang sudah ada tidak terpengaruh.')) {
            router.delete(route('admin.pricing.vouchers.destroy', id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editVoucher) {
            patch(route('admin.pricing.vouchers.update', editVoucher.id), {
                onSuccess: () => { setShowForm(false); setEditVoucher(null); reset(); },
            });
        } else {
            post(route('admin.pricing.vouchers.store'), {
                onSuccess: () => { setShowForm(false); reset(); },
            });
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Manajemen Harga — Kelola Voucher</h2>}>
            <Head title="Kelola Voucher" />

            <div className="py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* Header button */}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Kelola kode voucher promosi. Voucher VIP diterbitkan otomatis oleh sistem.
                        </p>
                        <button
                            onClick={() => { setShowForm(true); setEditVoucher(null); reset(); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Buat Voucher
                        </button>
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                                {editVoucher ? `Edit Voucher: ${editVoucher.code}` : 'Buat Voucher Baru'}
                            </h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {!editVoucher && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kode Voucher *</label>
                                        <input
                                            type="text" value={data.code}
                                            onChange={e => setData('code', e.target.value.toUpperCase())}
                                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white uppercase font-mono"
                                            placeholder="PROMO50"
                                        />
                                        {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nilai Diskon (IDR) *</label>
                                    <input
                                        type="number" value={data.discount_amount}
                                        onChange={e => setData('discount_amount', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                        placeholder="500000"
                                    />
                                    {errors.discount_amount && <p className="text-red-500 text-xs mt-1">{errors.discount_amount}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                                    <input
                                        type="text" value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                        placeholder="Diskon spesial..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maks. Klaim (kosong = bebas)</label>
                                    <input
                                        type="number" value={data.max_claims}
                                        onChange={e => setData('max_claims', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                        placeholder="100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Berlaku Mulai *</label>
                                    <input
                                        type="date" value={data.valid_from}
                                        onChange={e => setData('valid_from', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Berlaku Sampai (kosong = selamanya)</label>
                                    <input
                                        type="date" value={data.valid_until}
                                        onChange={e => setData('valid_until', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                {editVoucher && (
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="is_active" checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="w-4 h-4 rounded"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">Aktifkan voucher</label>
                                    </div>
                                )}
                                <div className="sm:col-span-2 flex gap-3 justify-end">
                                    <button type="button" onClick={() => { setShowForm(false); reset(); }}
                                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        Batal
                                    </button>
                                    <button type="submit" disabled={processing}
                                        className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors">
                                        {processing ? 'Menyimpan...' : editVoucher ? 'Update' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Voucher Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Kode</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Deskripsi</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Nilai Diskon</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Diklaim</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Berlaku s/d</th>
                                        <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-4 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vouchers.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500 italic">
                                                Belum ada voucher. Buat voucher pertama Anda!
                                            </td>
                                        </tr>
                                    ) : (
                                        vouchers.map(v => (
                                            <VoucherRow key={v.id} voucher={v} onEdit={handleEdit} onDelete={handleDelete} />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
