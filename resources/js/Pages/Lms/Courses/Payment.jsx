import React, { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import LiquidBackground from '@/Components/LiquidBackground';

const GlassPanel = ({ children, className = '', ...props }) => (
    <div className={`bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[2.5rem] transition-all duration-500 ${className}`} {...props}>{children}</div>
);

export default function CoursePayment({ course, transaction, auth }) {
    const { errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        payment_bank: '',
        payment_account_number: '',
        payment_account_name: '',
        payment_method: 'Transfer Bank',
        payment_proof: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/courses/${course.slug}/payment`);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased relative">
            <LiquidBackground />
            <Navbar auth={auth} active="courses" />
            <Head title={`Pembayaran - ${course.title}`} />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Konfirmasi Pembayaran</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Silakan unggah bukti transfer untuk mengakses materi kelas.</p>
                        </div>
                        <Link
                            href={`/courses/${course.slug}`}
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors group"
                        >
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Batal
                        </Link>
                    </div>

                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl p-4 border border-gold-100 dark:border-gold-900/30 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/50 rounded-xl flex items-center justify-center text-gold-600 dark:text-gold-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-black text-gold-800 dark:text-gold-300 uppercase tracking-widest leading-none">Status Persetujuan</p>
                            <p className="text-[10px] text-gold-600 dark:text-gold-500 font-bold mt-1">Anda telah menandatangani persetujuan peserta kelas.</p>
                        </div>
                    </div>

                    <GlassPanel className="p-8 md:p-10 shadow-2xl overflow-hidden relative">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="mb-10 p-8 bg-gradient-to-br from-gold-50/50 to-white dark:from-gold-950/20 dark:to-transparent rounded-[2rem] border border-gold-100 dark:border-gold-900/30 relative overflow-hidden group">
                            <h3 className="text-xs font-black text-gold-700 dark:text-gold-400 uppercase tracking-[0.2em] mb-6">Instruksi Pembayaran</h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Judul Kelas</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{course.title}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-8">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total yang harus dibayar</p>
                                        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400">
                                            Rp {new Intl.NumberFormat('id-ID').format(transaction.amount || 0)}
                                        </p>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-white dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-xs text-indigo-600 dark:text-indigo-400">BCA</div>
                                                <div className="min-w-0">
                                                    <p className="text-base font-black text-slate-800 dark:text-white tracking-tight">8720394817</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">InDepth Mental Wellness</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-white dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-gold-50 dark:bg-gold-900/30 flex items-center justify-center font-black text-xs text-gold-600 dark:text-gold-400">MDR</div>
                                                <div className="min-w-0">
                                                    <p className="text-base font-black text-slate-800 dark:text-white tracking-tight">1390028471530</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">InDepth Mental Wellness</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {pageErrors.error && (
                            <div className="p-4 mb-8 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 animate-pulse font-bold">
                                {pageErrors.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="payment_bank" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Bank Pengirim</label>
                                    <input
                                        id="payment_bank"
                                        type="text"
                                        placeholder="Contoh: BCA / Mandiri / BNI (Gunakan huruf)"
                                        className="w-full h-14 px-6 rounded-2xl bg-white/50 dark:bg-white/[0.02] border-white/60 dark:border-white/[0.06] focus:ring-2 focus:ring-gold-500 border-none shadow-inner font-bold text-sm"
                                        value={data.payment_bank}
                                        onChange={(e) => setData('payment_bank', e.target.value)}
                                        required
                                    />
                                    {errors.payment_bank && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_bank}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="payment_account_number" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nomor Rekening Pengirim</label>
                                    <input
                                        id="payment_account_number"
                                        type="text"
                                        placeholder="Masukkan nomor rekening"
                                        className="w-full h-14 px-6 rounded-2xl bg-white/50 dark:bg-white/[0.02] border-white/60 dark:border-white/[0.06] focus:ring-2 focus:ring-gold-500 border-none shadow-inner font-bold text-sm"
                                        value={data.payment_account_number}
                                        onChange={(e) => setData('payment_account_number', e.target.value)}
                                        required
                                    />
                                    {errors.payment_account_number && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_account_number}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="payment_account_name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Pemilik Rekening</label>
                                    <input
                                        id="payment_account_name"
                                        type="text"
                                        placeholder="Masukkan nama pemilik rekening"
                                        className="w-full h-14 px-6 rounded-2xl bg-white/50 dark:bg-white/[0.02] border-white/60 dark:border-white/[0.06] focus:ring-2 focus:ring-gold-500 border-none shadow-inner font-bold text-sm"
                                        value={data.payment_account_name}
                                        onChange={(e) => setData('payment_account_name', e.target.value)}
                                        required
                                    />
                                    {errors.payment_account_name && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_account_name}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Bukti Transfer (JPG/PNG)</label>
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
                                            className="flex items-center justify-center w-full h-14 px-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-500 bg-white/30 dark:bg-white/[0.01] cursor-pointer transition-all gap-3 group"
                                        >
                                            <svg className="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                                                {data.payment_proof ? data.payment_proof.name : 'Pilih File Gambar Bukti Transfer'}
                                            </span>
                                        </label>
                                    </div>
                                    {errors.payment_proof && <p className="text-xs text-red-600 mt-2 font-bold">{errors.payment_proof}</p>}
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/50 dark:bg-black/20 rounded-[1.5rem] border border-slate-100 dark:border-gray-800">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ringkasan Kebijakan</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-500 italic uppercase tracking-wider">
                                        <span className="text-gold-500 mt-0.5">•</span>
                                        Akses materi terbuka segera setelah validasi manual oleh admin (max 24 jam).
                                    </li>
                                    <li className="flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-500 italic uppercase tracking-wider">
                                        <span className="text-gold-500 mt-0.5">•</span>
                                        Harap simpan bukti transfer asli sebelum akses dikonfirmasi.
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-center justify-end pt-6 border-t border-white/40 dark:border-white/10">
                                <button
                                    type="submit"
                                    className="px-12 py-4 bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-500 hover:to-yellow-500 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-gold-500/30 transition-all hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Mega-Processing...' : 'Kirim Bukti Pembayaran'}
                                </button>
                            </div>
                        </form>
                    </GlassPanel>
                </div>
            </main>

            <Footer />
        </div>
    );
}
