import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

function formatRp(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

// --- VOUCHER COMPONENTS ---
function VoucherRow({ voucher, onEdit, onDelete }) {
    const isExpired = voucher.valid_until && new Date(voucher.valid_until) < new Date();
    return (
        <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
            <td className="px-4 py-4 font-mono font-bold text-sm text-indigo-700 dark:text-indigo-400 uppercase">{voucher.code}</td>
            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">{voucher.description || '—'}</td>
            <td className="px-4 py-4 text-sm font-black text-green-700 dark:text-green-400">{formatRp(voucher.discount_amount)}</td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-700 dark:text-gray-300">{voucher.user_vouchers_count}</span>
                <span className="mx-1 text-gray-300">/</span>
                {voucher.max_claims ? voucher.max_claims : '∞'}
            </td>
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                {voucher.valid_until ? new Date(voucher.valid_until).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Selamanya'}
            </td>
            <td className="px-4 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${!voucher.is_active || isExpired
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                    {!voucher.is_active ? 'Nonaktif' : isExpired ? 'Kadaluarsa' : 'Aktif'}
                </span>
            </td>
            <td className="px-4 py-4 text-right space-x-3">
                <button onClick={() => onEdit(voucher)} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 uppercase tracking-tighter">Edit</button>
                <button onClick={() => onDelete(voucher.id)} className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-800 uppercase tracking-tighter">Hapus</button>
            </td>
        </tr>
    );
}

// --- PACKAGE COMPONENTS ---
function PackageCard({ pkg, onEdit, onDelete }) {
    const hasDiscount = pkg.discount_percentage > 0;
    const isDiscountActive = !pkg.discount_ends_at || new Date(pkg.discount_ends_at) > new Date();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-lg">{pkg.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{pkg.description}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest ${pkg.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-400'}`}>
                        {pkg.is_active ? 'Aktif' : 'Draft'}
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            {formatRp(pkg.current_price)}
                        </span>
                        {hasDiscount && isDiscountActive && (
                            <span className="text-sm text-gray-400 line-through font-bold">
                                {formatRp(pkg.base_price)}
                            </span>
                        )}
                    </div>
                    {hasDiscount && isDiscountActive && (
                        <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 text-[10px] font-black rounded-lg">
                                SAVE {pkg.discount_percentage}%
                            </span>
                            {pkg.discount_ends_at && (
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                                    UNTIL {new Date(pkg.discount_ends_at).toLocaleDateString('id-ID')}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-2 mt-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Fitur Utama</p>
                    <ul className="space-y-1.5">
                        {Array.isArray(pkg.features) && pkg.features.length > 0 ? pkg.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                                {f}
                            </li>
                        )) : (
                            <li className="text-xs text-gray-400 italic font-medium">Belum ada fitur ditambahkan</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="flex border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={() => onEdit(pkg)}
                    className="flex-1 py-4 bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all uppercase tracking-[0.15em] border-r border-gray-100 dark:border-gray-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(pkg.id)}
                    className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 text-[10px] font-black text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all uppercase tracking-[0.15em]"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
}

// --- MAIN PAGE ---
export default function PricingIndex({ vouchers = [], packages = [] }) {

    // Voucher State
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [editVoucher, setEditVoucher] = useState(null);
    const voucherForm = useForm({
        code: '',
        description: '',
        discount_amount: '',
        max_claims: '',
        valid_from: new Date().toISOString().split('T')[0],
        valid_until: '',
        is_active: true,
    });

    // Package State
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [editPackage, setEditPackage] = useState(null);
    const packageForm = useForm({
        name: '',
        description: '',
        base_price: '',
        discount_percentage: 0,
        discount_ends_at: '',
        is_active: true,
        features: [],
    });

    // --- VOUCHER HANDLERS ---
    const openCreateVoucher = () => {
        setEditVoucher(null);
        voucherForm.reset();
        voucherForm.setData({
            code: '',
            description: '',
            discount_amount: '',
            max_claims: '',
            valid_from: new Date().toISOString().split('T')[0],
            valid_until: '',
            is_active: true,
        });
        setShowVoucherModal(true);
    };

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
        setShowVoucherModal(true);
    };

    const handleVoucherSubmit = (e) => {
        e.preventDefault();
        if (editVoucher) {
            voucherForm.patch(route('admin.pricing.vouchers.update', editVoucher.id), {
                onSuccess: () => { setShowVoucherModal(false); setEditVoucher(null); },
            });
        } else {
            voucherForm.post(route('admin.pricing.vouchers.store'), {
                onSuccess: () => { setShowVoucherModal(false); voucherForm.reset(); },
            });
        }
    };

    const handleDeleteVoucher = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus voucher ini?')) {
            router.delete(route('admin.pricing.vouchers.destroy', id));
        }
    };

    // --- PACKAGE HANDLERS ---
    const openCreatePackage = () => {
        setEditPackage(null);
        packageForm.reset();
        packageForm.setData({
            name: '',
            description: '',
            base_price: '',
            discount_percentage: 0,
            discount_ends_at: '',
            is_active: true,
            features: [],
        });
        setShowPackageModal(true);
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
        setShowPackageModal(true);
    };

    const handlePackageSubmit = (e) => {
        e.preventDefault();
        if (editPackage) {
            packageForm.patch(route('admin.pricing.packages.update', editPackage.id), {
                onSuccess: () => { setShowPackageModal(false); setEditPackage(null); },
            });
        } else {
            packageForm.post(route('admin.pricing.packages.store'), {
                onSuccess: () => { setShowPackageModal(false); packageForm.reset(); },
            });
        }
    };

    const handleDeletePackage = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket layanan ini? Data ini mungkin berpengaruh pada tampilan homepage.')) {
            router.delete(route('admin.pricing.packages.destroy', id));
        }
    };

    const handleFeatureChange = (idx, value) => {
        const newFeatures = [...packageForm.data.features];
        newFeatures[idx] = value;
        packageForm.setData('features', newFeatures);
    };

    const addFeatureField = () => {
        packageForm.setData('features', [...packageForm.data.features, '']);
    };

    const removeFeatureField = (idx) => {
        const newFeatures = [...packageForm.data.features];
        newFeatures.splice(idx, 1);
        packageForm.setData('features', newFeatures);
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                    <h2 className="font-black text-2xl text-gray-800 dark:text-white uppercase tracking-tight">Manajemen Harga & Voucher</h2>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={openCreateVoucher}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-gray-50 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v12m-4-4h8m4-8c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                        Tambah Voucher
                    </button>
                    <button
                        onClick={openCreatePackage}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                        Tambah Paket
                    </button>
                </div>
            </div>
        }>
            <Head title="Kelola Harga & Voucher" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* --- PACKAGES SECTION --- */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">1. Paket Layanan (Homepage & Pasien)</h3>
                                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-lg uppercase">{packages.length} Paket Terdaftar</span>
                            </div>
                            {packages.length === 0 && (
                                <button
                                    onClick={() => {
                                        const defaults = [
                                            { name: 'Hipnoterapi Reguler', slug: 'hipnoterapi', price: 750000, desc: 'Masalah fobia, kecemasan, dan konflik emosional standar.' },
                                            { name: 'Premium', slug: 'premium', price: 1500000, desc: 'Optimalisasi diri untuk performa tinggi dan kepercayaan diri.' },
                                            { name: 'VIP', slug: 'vip', price: 2500000, desc: 'Kondisi kompleks dengan metode InDepth Solution.' }
                                        ];
                                        if (confirm('Ingin otomatis membuat 3 paket utama (Reguler, Premium, VIP)?')) {
                                            defaults.forEach(d => {
                                                router.post(route('admin.pricing.packages.store'), {
                                                    name: d.name,
                                                    description: d.desc,
                                                    base_price: d.price,
                                                    discount_percentage: 0,
                                                    is_active: true,
                                                    features: ['Konsultasi 1-on-1', 'Analisis Diagnostik', 'Full Session Recording'],
                                                }, { preserveScroll: true });
                                            });
                                        }
                                    }}
                                    className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Cepat Buat 3 Paket Utama
                                </button>
                            )}
                        </div>

                        {packages.length === 0 ? (
                            <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700 p-20 text-center">
                                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Data Paket Masih Kosong!</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 font-medium">Anda belum mendaftarkan paket layanan. Tambahkan minimal 1 paket agar tampil di halaman utama.</p>
                                <button onClick={openCreatePackage} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all">
                                    Tambah Paket Sekarang
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages.map(p => (
                                    <PackageCard key={p.id} pkg={p} onEdit={handleEditPackage} onDelete={handleDeletePackage} />
                                ))}
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-100 dark:border-gray-800/50" />

                    {/* --- VOUCHERS SECTION --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">2. Promo & Kode Voucher</h3>
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-lg uppercase">{vouchers.length} Terdaftar</span>
                        </div>

                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kode</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Potongan</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Klaim</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Berlaku s/d</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/30">
                                        {vouchers.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="py-20 text-center">
                                                    <div className="space-y-4">
                                                        <p className="text-gray-400 dark:text-gray-600 text-sm font-bold italic">Belum ada promo aktif...</p>
                                                        <button onClick={openCreateVoucher} className="text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:underline">Tambah Kode Voucher Pertama</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            vouchers.map(v => (
                                                <VoucherRow key={v.id} voucher={v} onEdit={handleEditVoucher} onDelete={handleDeleteVoucher} />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL PACKAGE --- */}
            <Modal show={showPackageModal} onClose={() => setShowPackageModal(false)} maxWidth="2xl">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            {editPackage ? 'Edit Paket Layanan' : 'Tambah Paket Baru'}
                        </h3>
                        <button onClick={() => setShowPackageModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form onSubmit={handlePackageSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Paket</label>
                                <input
                                    type="text"
                                    value={packageForm.data.name}
                                    onChange={e => packageForm.setData('name', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="Contoh: Paket Reguler"
                                    required
                                />
                                {packageForm.errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{packageForm.errors.name}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Deskripsi Singkat</label>
                                <textarea
                                    rows="2"
                                    value={packageForm.data.description}
                                    onChange={e => packageForm.setData('description', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="Jelaskan secara singkat target dari paket ini..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Harga Dasar (Rp)</label>
                                <input
                                    type="number"
                                    value={packageForm.data.base_price}
                                    onChange={e => packageForm.setData('base_price', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-sm font-black focus:ring-2 focus:ring-indigo-500/20"
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={packageForm.data.is_active}
                                        onChange={e => packageForm.setData('is_active', e.target.checked)}
                                        className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-500/20 transition-all"
                                    />
                                    <span className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-tighter">Tampilkan di Web</span>
                                </label>
                            </div>

                            <div className="md:col-span-2 p-5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
                                <SectionLabel className="!mb-4">Pengaturan Diskon Campaign</SectionLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1.5">Persen Diskon (0-100)</label>
                                        <div className="relative">
                                            <input type="number" min="0" max="100" value={packageForm.data.discount_percentage} onChange={e => packageForm.setData('discount_percentage', e.target.value)} className="w-full bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-900/50 rounded-xl pr-10 text-sm font-black" />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 font-black">%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1.5">Batas Waktu</label>
                                        <input type="date" value={packageForm.data.discount_ends_at} onChange={e => packageForm.setData('discount_ends_at', e.target.value)} className="w-full bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-900/50 rounded-xl text-sm font-bold" />
                                    </div>
                                </div>
                                <p className="text-[9px] text-indigo-400 mt-3 font-bold uppercase tracking-tight italic">Sistem akan otomatis kembali ke harga normal setelah tanggal berakhir.</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Fitur Paket (Checklist Tampilan)</label>
                                <div className="space-y-3">
                                    {packageForm.data.features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                                className="flex-1 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm font-medium"
                                                placeholder={`Fitur ${idx + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFeatureField(idx)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addFeatureField}
                                        className="w-full py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-xs font-black text-gray-400 hover:text-indigo-600 hover:border-indigo-400 transition-all uppercase tracking-widest"
                                    >
                                        + Tambah Baris Fitur
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowPackageModal(false)}
                                className="flex-1 py-4 text-gray-400 font-black uppercase tracking-widest text-xs"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={packageForm.processing}
                                className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all uppercase tracking-widest disabled:opacity-50"
                            >
                                {packageForm.processing ? 'Menyimpan...' : editPackage ? 'Simpan Perubahan' : 'Buat Paket Sekarang'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* --- MODAL VOUCHER --- */}
            <Modal show={showVoucherModal} onClose={() => setShowVoucherModal(false)} maxWidth="2xl">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            {editVoucher ? `Edit Voucher: ${editVoucher.code}` : 'Buat Voucher Promo Baru'}
                        </h3>
                        <button onClick={() => setShowVoucherModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form onSubmit={handleVoucherSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {!editVoucher ? (
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Kode Voucher *</label>
                                    <input
                                        type="text"
                                        value={voucherForm.data.code}
                                        onChange={e => voucherForm.setData('code', e.target.value.toUpperCase())}
                                        className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-lg font-black text-indigo-600 dark:text-indigo-400 uppercase font-mono tracking-widest focus:ring-2 focus:ring-indigo-500/20"
                                        placeholder="PROMO2024"
                                        required
                                    />
                                    {voucherForm.errors.code && <p className="text-red-500 text-[10px] mt-1 font-bold">{voucherForm.errors.code}</p>}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status Voucher</label>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <input
                                            type="checkbox"
                                            checked={voucherForm.data.is_active}
                                            onChange={e => voucherForm.setData('is_active', e.target.checked)}
                                            className="w-6 h-6 rounded-lg text-indigo-600"
                                        />
                                        <span className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-tighter">Voucher Masih Aktif</span>
                                    </label>
                                </div>
                            )}

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Potongan Harga (Rp) *</label>
                                <input
                                    type="number"
                                    value={voucherForm.data.discount_amount}
                                    onChange={e => voucherForm.setData('discount_amount', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-lg font-black text-green-600 focus:ring-2 focus:ring-green-500/20"
                                    placeholder="50000"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Keterangan / Deskripsi</label>
                                <input
                                    type="text"
                                    value={voucherForm.data.description}
                                    onChange={e => voucherForm.setData('description', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-sm font-bold"
                                    placeholder="Khusus pengguna baru, momen hari pahlawan, dll..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Limit Klaim (kosong = ∞)</label>
                                <input
                                    type="number"
                                    value={voucherForm.data.max_claims}
                                    onChange={e => voucherForm.setData('max_claims', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-3 text-sm font-black"
                                    placeholder="100"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mulai</label>
                                    <input type="date" value={voucherForm.data.valid_from} onChange={e => voucherForm.setData('valid_from', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-3 py-3 text-xs font-bold" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Selesai</label>
                                    <input type="date" value={voucherForm.data.valid_until} onChange={e => voucherForm.setData('valid_until', e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-2xl px-3 py-3 text-xs font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-3">
                            {!editVoucher && (
                                <div className="flex-1 flex items-center px-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={voucherForm.data.is_active}
                                            onChange={e => voucherForm.setData('is_active', e.target.checked)}
                                            className="w-6 h-6 rounded-lg text-indigo-600"
                                        />
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Aktifkan Langsung</span>
                                    </label>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowVoucherModal(false)}
                                className="flex-1 py-4 text-gray-400 font-black uppercase tracking-widest text-xs"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={voucherForm.processing}
                                className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all uppercase tracking-widest disabled:opacity-50"
                            >
                                {voucherForm.processing ? 'Menyimpan...' : editVoucher ? 'Update Voucher' : 'Buat Voucher Sekarang'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

        </AuthenticatedLayout>
    );
}

const SectionLabel = ({ children, className = '' }) => (
    <h3 className={`text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ${className}`}>{children}</h3>
);
