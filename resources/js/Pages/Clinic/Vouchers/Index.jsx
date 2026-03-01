import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';

function formatRp(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

function PackageCard({ pkg }) {
    const hasDiscount = pkg.discount_percentage > 0;
    const isDiscountActive = !pkg.discount_ends_at || new Date(pkg.discount_ends_at) > new Date();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-gray-900 dark:text-white text-lg group-hover:text-indigo-600 transition-colors">{pkg.name}</h4>
                        {hasDiscount && isDiscountActive && (
                            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                HEMAT {pkg.discount_percentage}%
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10 overflow-hidden line-clamp-2 italic leading-relaxed">
                        "{pkg.description}"
                    </p>

                    <div className="space-y-2 mt-4">
                        {pkg.features?.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <span className="text-indigo-500 font-bold">•</span>
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-700/50">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            {formatRp(pkg.current_price)}
                        </span>
                        {hasDiscount && isDiscountActive && (
                            <span className="text-xs text-gray-400 line-through">
                                {formatRp(pkg.base_price)}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Estimasi per sesi</p>
                </div>
            </div>
            {pkg.disabled_booking ? (
                <button className="w-full py-4 text-center bg-gray-400 text-white font-bold text-xs uppercase tracking-widest cursor-not-allowed transition-all" disabled>
                    Selesaikan Sesi Aktif
                </button>
            ) : (
                <Link
                    href={route('bookings.create')}
                    className="w-full py-4 text-center bg-gray-900 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-bold text-xs uppercase tracking-widest transition-all block"
                >
                    Pilih Jadwal
                </Link>
            )}
        </div>
    );
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

export default function VouchersPatientIndex({ userVouchers, packages }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({ code: '' });

    const handleClaim = (e) => {
        e.preventDefault();
        post(route('vouchers.claim'), { onSuccess: () => reset() });
    };

    const activeVouchers = userVouchers.filter(v => v.is_active);
    const inactiveVouchers = userVouchers.filter(v => !v.is_active);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Paket & Voucher</h2>}>
            <Head title="Pilihan Paket & Voucher Saya" />

            <div className="py-12 bg-gray-50/50 dark:bg-gray-950/20 min-h-[calc(100vh-64px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* --- PACKAGES SECTION --- */}
                    <section className="space-y-6">
                        <div className="flex flex-col items-center text-center space-y-2 mb-8">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Pilihan Paket Terapi</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-lg">Pilih paket yang paling sesuai dengan kebutuhan wellness Anda. Dapatkan diskon otomatis pada paket yang sedang promo.</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6">
                            {packages.map(p => <div key={p.id} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)]"><PackageCard pkg={p} /></div>)}
                        </div>
                    </section>

                    <hr className="border-gray-200 dark:border-gray-800" />

                    {/* --- VOUCHERS SECTION --- */}
                    <div className="max-w-4xl mx-auto space-y-10">
                        {/* Flash message */}
                        {flash?.success && (
                            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-sm text-green-800 dark:text-green-300 font-medium animate-bounce">
                                ✅ {flash.success}
                            </div>
                        )}

                        {/* Claim code section */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-indigo-500/5 p-8">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Klaim Voucher Promo</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Punya kode promo dari admin atau event? Masukkan kodenya di sini untuk mendapatkan keuntungan ekstra.</p>
                            <form onSubmit={handleClaim} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={e => setData('code', e.target.value.toUpperCase())}
                                    placeholder="MASUKKAN KODE DISINI"
                                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-3 font-mono font-black uppercase text-base dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={processing || !data.code}
                                    className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all active:scale-95"
                                >
                                    Tukarkan
                                </button>
                            </form>
                            {errors.code && <p className="text-red-500 text-sm mt-3 font-medium">{errors.code}</p>}
                        </div>

                        {/* Active vouchers */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Voucher Saya ({activeVouchers.length})</h3>
                                <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                            </div>

                            {activeVouchers.length === 0 ? (
                                <div className="text-center py-10 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                                    <p className="text-sm text-gray-400 dark:text-gray-500">Belum ada voucher aktif yang siap digunakan.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activeVouchers.map(uv => <VoucherCard key={uv.id} uv={uv} />)}
                                </div>
                            )}
                        </div>

                        {/* Inactive/used vouchers */}
                        {inactiveVouchers.length > 0 && (
                            <div className="pt-8 space-y-4">
                                <div className="flex items-center gap-3 opacity-50">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">Riwayat Penggunaan</h3>
                                    <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                                    {inactiveVouchers.map(uv => <VoucherCard key={uv.id} uv={uv} />)}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
