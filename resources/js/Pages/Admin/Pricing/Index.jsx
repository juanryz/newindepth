import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

function formatRp(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

// --- VOUCHER COMPONENTS ---
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

// --- PACKAGE COMPONENTS ---
function PackageCard({ pkg, onEdit }) {
    const hasDiscount = pkg.discount_percentage > 0;
    const isDiscountActive = !pkg.discount_ends_at || new Date(pkg.discount_ends_at) > new Date();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 flex-1 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{pkg.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{pkg.description}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${pkg.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {pkg.is_active ? 'Aktif' : 'Draft'}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            {formatRp(pkg.current_price)}
                        </span>
                        {hasDiscount && isDiscountActive && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatRp(pkg.base_price)}
                            </span>
                        )}
                    </div>
                    {hasDiscount && isDiscountActive && (
                        <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold rounded">
                                DISKON {pkg.discount_percentage}%
                            </span>
                            {pkg.discount_ends_at && (
                                <span className="text-[10px] text-gray-500 italic">
                                    s/d {new Date(pkg.discount_ends_at).toLocaleDateString('id-ID')}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-1 mt-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fitur Utama</p>
                    <ul className="space-y-1">
                        {Array.isArray(pkg.features) && pkg.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                onClick={() => onEdit(pkg)}
                className="w-full py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase tracking-wider"
            >
                Edit Paket & Diskon
            </button>
        </div>
    );
}

// --- MAIN PAGE ---
export default function PricingIndex({ vouchers = [], packages = [] }) {
    const [activeTab, setActiveTab] = useState(window.location.pathname.endsWith('/vouchers') ? 'vouchers' : 'packages');
    const [showVoucherForm, setShowVoucherForm] = useState(false);
    const [editVoucher, setEditVoucher] = useState(null);
    const [editPackage, setEditPackage] = useState(null);

    const voucherForm = useForm({
        code: '',
        description: '',
        discount_amount: '',
        max_claims: '',
        valid_from: new Date().toISOString().split('T')[0],
        valid_until: '',
        is_active: true,
    });

    const packageForm = useForm({
        name: '',
        description: '',
        base_price: '',
        discount_percentage: 0,
        discount_ends_at: '',
        is_active: true,
        features: [],
    });

    const handleEditVoucher = (v) => {
        setEditVoucher(v);
        voucherForm.setData({
            code: v.code,
            description: v.description || '',
            discount_amount: v.discount_amount,
            max_claims: v.max_claims || '',
            valid_from: v.valid_from ? v.valid_from.split('T')[0] : '',
            valid_until: v.valid_until ? v.valid_until.split('T')[0] : '',
            is_active: !!v.is_active,
        });
        setShowVoucherForm(true);
    };

    const handleEditPackage = (p) => {
        setEditPackage(p);
        packageForm.setData({
            name: p.name,
            description: p.description || '',
            base_price: p.base_price,
            discount_percentage: p.discount_percentage,
            discount_ends_at: p.discount_ends_at ? p.discount_ends_at.split('T')[0] : '',
            is_active: !!p.is_active,
            features: p.features || [],
        });
    };

    const handleVoucherSubmit = (e) => {
        e.preventDefault();
        if (editVoucher) {
            voucherForm.patch(route('admin.pricing.vouchers.update', editVoucher.id), {
                onSuccess: () => { setShowVoucherForm(false); setEditVoucher(null); voucherForm.reset(); },
            });
        } else {
            voucherForm.post(route('admin.pricing.vouchers.store'), {
                onSuccess: () => { setShowVoucherForm(false); voucherForm.reset(); },
            });
        }
    };

    const handlePackageSubmit = (e) => {
        e.preventDefault();
        packageForm.patch(route('admin.pricing.packages.update', editPackage.id), {
            onSuccess: () => { setEditPackage(null); },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Manajemen Harga</h2>}>
            <Head title="Kelola Harga & Voucher" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Tabs Header */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('packages')}
                            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'packages' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Paket Layanan
                        </button>
                        <button
                            onClick={() => setActiveTab('vouchers')}
                            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'vouchers' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Voucher Promo
                        </button>
                    </div>

                    {/* --- PACKAGES TAB --- */}
                    {activeTab === 'packages' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {packages.map(p => (
                                    <PackageCard key={p.id} pkg={p} onEdit={handleEditPackage} />
                                ))}
                            </div>

                            {editPackage && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-indigo-200 dark:border-indigo-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
                                        <h3 className="text-white font-bold">Edit Paket: {editPackage.name}</h3>
                                        <button onClick={() => setEditPackage(null)} className="text-white hover:bg-white/10 rounded-full p-1">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <form onSubmit={handlePackageSubmit} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2 space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Paket</label>
                                                <input type="text" value={packageForm.data.name} onChange={e => packageForm.setData('name', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Deskripsi Pendek</label>
                                                <textarea rows="2" value={packageForm.data.description} onChange={e => packageForm.setData('description', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl text-sm" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Harga Dasar (Rp)</label>
                                                    <input type="number" value={packageForm.data.base_price} onChange={e => packageForm.setData('base_price', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl" />
                                                </div>
                                                <div className="flex items-end pb-3">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" checked={packageForm.data.is_active} onChange={e => packageForm.setData('is_active', e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
                                                        <span className="text-sm font-semibold dark:text-gray-300">Tampilkan di public</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl space-y-4 border border-gray-100 dark:border-gray-700">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pengaturan Diskon</h4>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Persen Diskon (0-100)</label>
                                                <div className="relative">
                                                    <input type="number" min="0" max="100" value={packageForm.data.discount_percentage} onChange={e => packageForm.setData('discount_percentage', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pr-10" />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Berlaku Sampai</label>
                                                <input type="date" value={packageForm.data.discount_ends_at} onChange={e => packageForm.setData('discount_ends_at', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl text-sm" />
                                                <p className="text-[10px] text-gray-400 mt-1 italic">Kosongkan jika tidak ada batas waktu diskon.</p>
                                            </div>

                                            <div className="pt-2">
                                                <button type="submit" disabled={packageForm.processing} className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50">
                                                    {packageForm.processing ? 'Menyimpan...' : 'Update Tarif'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- VOUCHERS TAB --- */}
                    {activeTab === 'vouchers' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Total: <span className="font-bold text-gray-900 dark:text-white">{vouchers.length}</span> voucher terdaftar.
                                </p>
                                <button
                                    onClick={() => { setShowVoucherForm(true); setEditVoucher(null); voucherForm.reset(); }}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                    Tambah Voucher
                                </button>
                            </div>

                            {showVoucherForm && (
                                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 overflow-hidden animate-in fade-in slide-in-from-top-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                            {editVoucher ? `Edit Voucher: ${editVoucher.code}` : 'Buat Voucher Baru'}
                                        </h3>
                                        <button onClick={() => setShowVoucherForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <form onSubmit={handleVoucherSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {!editVoucher && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Kode Voucher *</label>
                                                <input
                                                    type="text" value={voucherForm.data.code}
                                                    onChange={e => voucherForm.setData('code', e.target.value.toUpperCase())}
                                                    className="w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white uppercase font-mono font-bold"
                                                    placeholder="PROMO2024"
                                                />
                                                {voucherForm.errors.code && <p className="text-red-500 text-xs mt-1">{voucherForm.errors.code}</p>}
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Potongan Harga (Rp) *</label>
                                            <input
                                                type="number" value={voucherForm.data.discount_amount}
                                                onChange={e => voucherForm.setData('discount_amount', e.target.value)}
                                                className="w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white font-bold text-green-600"
                                                placeholder="50000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Keterangan</label>
                                            <input
                                                type="text" value={voucherForm.data.description}
                                                onChange={e => voucherForm.setData('description', e.target.value)}
                                                className="w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white"
                                                placeholder="Khusus pengguna baru..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Kapasitas (kosong = ∞)</label>
                                            <input
                                                type="number" value={voucherForm.data.max_claims}
                                                onChange={e => voucherForm.setData('max_claims', e.target.value)}
                                                className="w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white"
                                                placeholder="100"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Mulai</label>
                                                <input type="date" value={voucherForm.data.valid_from} onChange={e => voucherForm.setData('valid_from', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 rounded-xl text-xs dark:bg-gray-700 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Berakhir</label>
                                                <input type="date" value={voucherForm.data.valid_until} onChange={e => voucherForm.setData('valid_until', e.target.value)} className="w-full border-gray-300 dark:border-gray-600 rounded-xl text-xs dark:bg-gray-700 dark:text-white" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer mt-6">
                                                <input type="checkbox" checked={voucherForm.data.is_active} onChange={e => voucherForm.setData('is_active', e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
                                                <span className="text-sm font-bold dark:text-gray-300">Voucher Aktif</span>
                                            </label>
                                        </div>
                                        <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4">
                                            <button type="button" onClick={() => setShowVoucherForm(false)} className="px-6 py-2 border-gray-300 text-gray-500 font-bold hover:text-gray-700">Batal</button>
                                            <button type="submit" disabled={voucherForm.processing} className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50">
                                                {voucherForm.processing ? 'Menyimpan...' : editVoucher ? 'Update Voucher' : 'Simpan Voucher'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Kode</th>
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Deskripsi</th>
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Potongan</th>
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Penggunaan</th>
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Berlaku s/d</th>
                                                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</th>
                                                <th className="px-4 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vouchers.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500 italic">
                                                        Belum ada voucher yang tersedia.
                                                    </td>
                                                </tr>
                                            ) : (
                                                vouchers.map(v => (
                                                    <VoucherRow key={v.id} voucher={v} onEdit={handleEditVoucher} onDelete={(id) => {
                                                        if (confirm('Hapus voucher?')) router.delete(route('admin.pricing.vouchers.destroy', id));
                                                    }} />
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
