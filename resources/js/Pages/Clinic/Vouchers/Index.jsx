import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

function formatRp(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

function VoucherCard({ uv }) {
    const statusColor = uv.is_used
        ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30'
        : uv.is_expired
            ? 'border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-900/10'
            : 'border-green-200 bg-green-50 dark:border-green-700/50 dark:bg-green-900/15';

    const badgeColor = uv.is_used
        ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
        : uv.is_expired
            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
            : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400';

    const badgeLabel = uv.is_used ? 'Sudah Dipakai' : uv.is_expired ? 'Kadaluarsa' : 'Aktif';

    return (
        <div className={`rounded-2xl border p-5 ${statusColor}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-mono font-extrabold text-xl tracking-widest text-indigo-700 dark:text-indigo-400">{uv.code}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{uv.description || '—'}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badgeLabel}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">{formatRp(uv.discount_amount)}</span>
                <div className="text-right text-xs text-gray-400 dark:text-gray-500">
                    {uv.expired_at && <p>Berlaku s/d {new Date(uv.expired_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                    <p className="capitalize">{uv.type === 'vip_reward' ? '🎁 Reward VIP' : '🏷️ Kode Promo'}</p>
                </div>
            </div>
        </div>
    );
}

export default function VouchersPatientIndex({ userVouchers }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({ code: '' });

    const handleClaim = (e) => {
        e.preventDefault();
        post(route('vouchers.claim'), { onSuccess: () => reset() });
    };

    const activeVouchers = userVouchers.filter(v => v.is_active);
    const inactiveVouchers = userVouchers.filter(v => !v.is_active);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Voucher Saya</h2>}>
            <Head title="Voucher Saya" />

            <div className="py-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Flash message */}
                    {flash?.success && (
                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-sm text-green-800 dark:text-green-300 font-medium">
                            ✅ {flash.success}
                        </div>
                    )}

                    {/* Claim code section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Punya Kode Voucher?</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Masukkan kode promo untuk mendapatkan diskon. Setiap kode hanya bisa diklaim 1x.</p>
                        <form onSubmit={handleClaim} className="flex gap-3">
                            <input
                                type="text"
                                value={data.code}
                                onChange={e => setData('code', e.target.value.toUpperCase())}
                                placeholder="Contoh: PROMO50"
                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 font-mono uppercase text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={processing || !data.code}
                                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                            >
                                Klaim
                            </button>
                        </form>
                        {errors.code && <p className="text-red-500 text-xs mt-2">{errors.code}</p>}
                    </div>

                    {/* Active vouchers */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Voucher Aktif ({activeVouchers.length})</h3>
                        {activeVouchers.length === 0 ? (
                            <p className="text-sm text-gray-400 dark:text-gray-500 italic">Anda belum memiliki voucher aktif.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {activeVouchers.map(uv => <VoucherCard key={uv.id} uv={uv} />)}
                            </div>
                        )}
                    </div>

                    {/* Inactive/used vouchers */}
                    {inactiveVouchers.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Riwayat Voucher</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {inactiveVouchers.map(uv => <VoucherCard key={uv.id} uv={uv} />)}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
