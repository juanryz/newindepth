import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import RefundPolicyContent from '@/Components/Clinic/RefundPolicyContent';

const GlassPanel = ({ children, className = '', ...props }) => (
    <div className={`bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[2.5rem] transition-all duration-500 ${className}`} {...props}>{children}</div>
);

export default function PaymentUpload({ booking, transaction }) {
    const { errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        payment_bank: '',
        payment_account_name: '',
        payment_account_number: '',
        payment_method: 'Transfer Bank',
        payment_proof: null,
        agree_refund: true,
        agree_final: true,
        agree_access: true,
        agree_chargeback: true,
    });

    const [showPolicyModal, setShowPolicyModal] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const isVoucherApplied = !!booking.user_voucher_id || !!transaction.payment_agreement_data?.applied_voucher_id;

    const [voucherApplying, setVoucherApplying] = useState(false);

    const applyVoucher = () => {
        if (!voucherCode.trim()) return;
        setVoucherApplying(true);
        router.post(route('vouchers.apply-by-code'), {
            code: voucherCode,
            booking_id: booking.id,
        }, {
            preserveScroll: true,
            onSuccess: () => setVoucherCode(''),
            onFinish: () => setVoucherApplying(false),
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('payments.store', booking.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">Upload Bukti Pembayaran</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Selesaikan pembayaran untuk mengonfirmasi jadwal Anda.</p>
                    </div>
                    <Link
                        href={route('bookings.show', booking.id)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Jadwal
                    </Link>
                </div>
            }
        >
            <Head title="Upload Pembayaran" />

            <div className="relative py-12 min-h-screen">
                {/* Liquid Background Blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-400/[0.05] dark:bg-indigo-600/[0.03] blur-[100px]" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-emerald-400/[0.04] dark:bg-emerald-600/[0.02] blur-[100px]" />
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">

                    {/* Status Agreement Badge */}
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl p-4 border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest leading-none">Status Persetujuan</p>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold mt-1">
                                Kebijakan Non-Refund telah Anda setujui sebelumnya.
                                <button
                                    onClick={() => setShowPolicyModal(true)}
                                    className="underline ml-1 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                                >
                                    Lihat detail kebijakan disini
                                </button>
                            </p>
                        </div>
                    </div>

                    <GlassPanel className="p-8 md:p-10">
                        {/* Instructional Section */}
                        <div className="mb-10 p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-transparent rounded-3xl border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all duration-700" />
                            <h3 className="text-xs font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-[0.2em] mb-4">Instruksi Pembayaran</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                Silakan transfer ke salah satu rekening resmi InDepth Mental Wellness sejumlah tepat:
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Nominal</p>
                                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                        Rp {new Intl.NumberFormat('id-ID').format(transaction.amount || 0)}
                                    </p>
                                    {transaction.payment_agreement_data?.discount_amount > 0 && (
                                        <p className="text-[10px] text-emerald-600 font-bold mt-1">
                                            (Sudah termasuk diskon Rp {new Intl.NumberFormat('id-ID').format(transaction.payment_agreement_data.discount_amount)})
                                        </p>
                                    )}
                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">*Sudah termasuk PPN 11%</p>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-[10px]">BCA</div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">2520639058</p>
                                            <p className="text-[10px] text-slate-400">a.n. Julius Bambang</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Voucher Input */}
                            <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Punya Kode Voucher?</label>
                                <div className="flex gap-2">
                                    <TextInput
                                        className="flex-1 !rounded-xl !bg-white/50 dark:!bg-white/[0.02] !border-slate-200 dark:!border-white/[0.06] !text-sm !py-2"
                                        placeholder="Masukkan kode voucher disini"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        disabled={isVoucherApplied}
                                    />
                                    <button
                                        type="button"
                                        onClick={applyVoucher}
                                        className={`px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isVoucherApplied
                                            ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 cursor-default'
                                            : 'bg-slate-900 text-white hover:bg-black dark:bg-white/10 dark:hover:bg-white/20 disabled:opacity-50'
                                            }`}
                                        disabled={!voucherCode || isVoucherApplied || voucherApplying}
                                    >
                                        {isVoucherApplied ? '✓ Terpasang' : voucherApplying ? 'Memproses...' : 'Terapkan'}
                                    </button>
                                </div>
                                {pageErrors.voucher_code && <p className="text-[10px] text-red-500 font-bold mt-2">{pageErrors.voucher_code}</p>}
                                {transaction.payment_agreement_data?.applied_voucher_code && (
                                    <p className="text-[10px] text-emerald-600 font-bold mt-2">✓ Kode <strong>{transaction.payment_agreement_data.applied_voucher_code}</strong> berhasil diterapkan</p>
                                )}
                            </div>
                        </div>

                        {pageErrors.error && (
                            <div className="p-4 mb-8 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 animate-pulse">
                                {pageErrors.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="payment_bank" value="Nama Bank Pengirim" className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-200 mb-2 ml-1" />
                                    <TextInput
                                        id="payment_bank"
                                        type="text"
                                        placeholder="Contoh: BCA / Mandiri / BNI (Gunakan huruf)"
                                        className="w-full !rounded-2xl !bg-white/50 dark:!bg-white/[0.02] !border-white/60 dark:!border-white/[0.06] focus:!ring-indigo-500"
                                        value={data.payment_bank}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Optional: visual clue or filter for non-numbers if desired, but validation is better at backend
                                            setData('payment_bank', val);
                                        }}
                                        required
                                    />
                                    {errors.payment_bank && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_bank}</p>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="payment_account_number" value="Nomor Rekening Pengirim" className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                                    <TextInput
                                        id="payment_account_number"
                                        type="text"
                                        placeholder="Masukkan nomor rekening Anda"
                                        className="w-full !rounded-2xl !bg-white/50 dark:!bg-white/[0.02] !border-white/60 dark:!border-white/[0.06] focus:!ring-indigo-500"
                                        value={data.payment_account_number}
                                        onChange={(e) => setData('payment_account_number', e.target.value)}
                                        required
                                    />
                                    {errors.payment_account_number && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_account_number}</p>}
                                </div>

                                <div>
                                    <InputLabel htmlFor="payment_account_name" value="Nama Pemilik Rekening" className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                                    <TextInput
                                        id="payment_account_name"
                                        type="text"
                                        placeholder="Masukkan nama pemilik rekening"
                                        className="w-full !rounded-2xl !bg-white/50 dark:!bg-white/[0.02] !border-white/60 dark:!border-white/[0.06] focus:!ring-indigo-500"
                                        value={data.payment_account_name}
                                        onChange={(e) => setData('payment_account_name', e.target.value)}
                                        required
                                    />
                                    {errors.payment_account_name && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_account_name}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="payment_proof" value="Upload Bukti Transfer" className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                                    <div className="relative group">
                                        <input
                                            id="payment_proof"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setData('payment_proof', e.target.files[0])}
                                            required
                                        />
                                        <label
                                            htmlFor="payment_proof"
                                            className="flex items-center justify-center w-full p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white/30 dark:bg-white/[0.01] cursor-pointer transition-all gap-3 group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                                {data.payment_proof ? data.payment_proof.name : 'Pilih File Gambar Bukti Transfer'}
                                            </span>
                                        </label>
                                    </div>
                                    {errors.payment_proof && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_proof}</p>}
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                                <h3 className="text-[10px] font-black text-amber-900 dark:text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    Retensi Kebijakan Final
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        'Pembayaran bersifat FINAL dan TIDAK DAPAT DIREFUND.',
                                        'Admin akan memvalidasi bukti transfer dalam waktu maksimal 1x24 jam.',
                                        'Jadwal konsultasi akan aktif otomatis setelah divalidasi.'
                                    ].map((text, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <span className="text-amber-500 mt-0.5 font-bold">•</span>
                                            <p className="text-[10px] font-bold text-amber-800 dark:text-amber-600 leading-relaxed italic">{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end pt-6 border-t border-white/40 dark:border-white/10">
                                <PrimaryButton
                                    className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-2xl !px-10 !py-4 !text-xs !font-black !uppercase !tracking-widest !transition-all hover:!scale-[1.02] animate-pulse"
                                    disabled={processing}
                                >
                                    {processing ? 'Memproses...' : 'Upload & Selesaikan'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </GlassPanel>
                </div>

                {/* Policy Modal */}
                {showPolicyModal && (
                    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-8 pb-8 overflow-y-auto bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden flex flex-col max-h-none md:max-h-[90vh] animate-in zoom-in duration-300 my-auto">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white relative flex-shrink-0">
                                <h2 className="text-2xl font-black uppercase tracking-tighter">KEBIJAKAN NON-REFUND</h2>
                                <p className="text-indigo-100 text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Arsip Persetujuan Transaksi</p>
                                <button onClick={() => setShowPolicyModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-grow">
                                <div className="bg-gray-50 dark:bg-black/20 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-inner text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-serif">
                                    <RefundPolicyContent />
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-center flex-shrink-0">
                                <PrimaryButton
                                    onClick={() => setShowPolicyModal(false)}
                                    className="!bg-indigo-600 hover:!bg-indigo-700 !rounded-xl !px-10"
                                >
                                    Tutup
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

