import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TransactionsIndex({ transactions, therapists = [] }) {
    const { flash, errors: pageErrors } = usePage().props;
    const [selectedReject, setSelectedReject] = useState(null);
    const [selectedValidate, setSelectedValidate] = useState(null);

    const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject, processing: rejecting } = useForm({
        rejection_reason: '',
    });

    const { data: validateData, setData: setValidateData, post: validatePost, reset: resetValidate, processing: validating } = useForm({
        new_schedule_id: '',
    });

    const handleValidate = (tx) => {
        setSelectedValidate(tx);
        setValidateData('new_schedule_id', tx.transactionable?.schedule_id || '');
    };

    const submitValidate = (e) => {
        e.preventDefault();
        validatePost(route('admin.transactions.validate', selectedValidate.id), {
            onSuccess: () => {
                setSelectedValidate(null);
                resetValidate();
            }
        });
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

    const formatSchedule = (tx) => {
        const booking = tx.transactionable;
        if (!booking?.schedule) return null;
        const schedule = booking.schedule;
        try {
            const dateStr = new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            const startTime = schedule.start_time?.substring(0, 5) || '--:--';
            const endTime = schedule.end_time?.substring(0, 5) || '--:--';
            return { dateStr, startTime, endTime };
        } catch {
            return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard Validasi Transaksi</h2>}
        >
            <Head title="Validasi Transaksi" />

            <div className="relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700">
                {/* Dynamic Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-gold-400/20 to-indigo-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/10 to-gold-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '18s', animationDelay: '3s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10">
                    {flash?.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-xl">
                            {flash.success}
                        </div>
                    )}

                    {pageErrors?.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 backdrop-blur-xl">
                            {pageErrors.error}
                        </div>
                    )}

                    {/* Header Panel */}
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                Validasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Transaksi</span>
                            </h1>
                            <div className="flex justify-between items-center flex-wrap gap-4 mt-2">
                                <p className="text-slate-500 dark:text-slate-400 font-bold italic tracking-wide">Kelola dan validasi pembayaran dari pasien dan siswa di InDepth.</p>
                                <Link
                                    href={route('admin.transactions.expired')}
                                    className="px-6 py-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest border border-rose-500/20 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Cek Riwayat Kadaluarsa
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700">
                        <div className="overflow-x-auto p-4 sm:p-0">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100/50 dark:bg-slate-800/50">
                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-slate-700/30">
                                        <th className="px-6 py-5 text-center">Invoice</th>
                                        <th className="px-6 py-5">Pengguna</th>
                                        <th className="px-6 py-5">Layanan & Jadwal</th>
                                        <th className="px-6 py-5">Nominal</th>
                                        <th className="px-6 py-5">Bukti</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {transactions.data.map((tx) => {
                                        const scheduleInfo = formatSchedule(tx);
                                        const isBooking = tx.transactionable_type?.includes('Booking');
                                        const hasDiscount = tx.transactionable?.user_voucher?.voucher;

                                        return (
                                            <tr key={tx.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                                <td className="px-6 py-5 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white mb-1">{tx.invoice_number}</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.payment_bank || '-'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{tx.user?.name}</span>
                                                        <span className="text-xs text-slate-500">{tx.user?.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-500/20 w-fit uppercase tracking-widest">
                                                            {isBooking ? 'Booking' : tx.transactionable_type?.split('\\').pop()}
                                                        </span>
                                                        {isBooking && (
                                                            <span className="text-[9px] font-black text-indigo-500 uppercase">
                                                                {tx.transactionable?.package_type || 'Package'}
                                                            </span>
                                                        )}
                                                        {scheduleInfo && (
                                                            <div className="flex flex-col mt-1">
                                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                                                    📅 {scheduleInfo.dateStr}
                                                                </span>
                                                                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                                                    🕐 {scheduleInfo.startTime} – {scheduleInfo.endTime} WIB
                                                                </span>
                                                            </div>
                                                        )}
                                                        {tx.payment_agreement_data && (
                                                            <span className="text-[9px] text-emerald-600 dark:text-emerald-500 font-black flex items-center gap-1 uppercase mt-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                                Agreement Signed
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                                            Rp {new Intl.NumberFormat('id-ID').format(tx.amount || 0)}
                                                        </span>
                                                        {hasDiscount ? (
                                                            <div className="mt-1 flex flex-col">
                                                                <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter mb-0.5">
                                                                    🏷️ POTONGAN DISKON
                                                                </span>
                                                                <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[10px] font-black rounded-lg border border-rose-100 dark:border-rose-800 uppercase tracking-tighter decoration-rose-500/30 line-through w-fit">
                                                                    Rp {new Intl.NumberFormat('id-ID').format((tx.amount || 0) + (tx.transactionable.user_voucher.voucher.discount_amount || 0))}
                                                                </span>
                                                                <p className="text-[9px] font-bold text-gray-400 mt-0.5" title={tx.transactionable.user_voucher.voucher.description}>
                                                                    Voucher: {tx.transactionable.user_voucher.voucher.code}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Harga Normal</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {tx.payment_proof ? (
                                                        <a
                                                            href={`/storage/${tx.payment_proof}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 group/proof"
                                                        >
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/proof:bg-gold-500 group-hover/proof:text-white transition-all duration-300">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                            </div>
                                                            <span className="text-xs font-black text-slate-500 dark:text-slate-400 group-hover/proof:text-gold-600 uppercase tracking-tighter">Lihat</span>
                                                        </a>
                                                    ) : <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">Belum Upload</span>}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-4 py-1.5 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border
                                                        ${tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' :
                                                            tx.status === 'rejected' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' :
                                                                tx.status === 'pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' :
                                                                    tx.status === 'expired' ? 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20 italic' :
                                                                        'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20'
                                                        }`}>
                                                        {tx.status === 'paid' ? 'Valid' :
                                                            tx.status === 'rejected' ? 'Ditolak' :
                                                                tx.status === 'pending' ? 'Menunggu' :
                                                                    tx.status === 'expired' ? 'Kadaluarsa' :
                                                                        tx.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    {tx.status === 'pending' && (
                                                        <div className="flex justify-center gap-2">
                                                            {tx.payment_proof ? (
                                                                     <button
                                                                         disabled={validating}
                                                                         onClick={() => handleValidate(tx)}
                                                                         className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 text-center"
                                                                     >
                                                                         {validating ? '...' : 'Validasi'}
                                                                     </button>
                                                            ) : (
                                                                <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px] font-black uppercase rounded-xl border border-slate-200 dark:border-slate-700 cursor-not-allowed">Bukti Belum Ada</span>
                                                            )}
                                                            <button
                                                                onClick={() => setSelectedReject(tx)}
                                                                className="px-5 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-rose-600/20 transition-all"
                                                            >
                                                                Tolak
                                                            </button>
                                                        </div>
                                                    )}
                                                    {tx.status === 'paid' && tx.validated_at && (
                                                        <div className="flex flex-col items-center gap-1">
                                                            <span className="text-[9px] text-slate-400 font-bold">
                                                                ✓ {new Date(tx.validated_at).toLocaleDateString('id-ID')}
                                                            </span>
                                                            {tx.validated_by && (
                                                                <div className="flex flex-col items-center gap-1 mt-1">
                                                                    <span className="text-[9px] font-black text-indigo-500 uppercase flex items-center gap-1">
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                        By: {tx.validated_by_user?.name || tx.validated_by?.name || 'Admin'}
                                                                    </span>
                                                                    {tx.transactionable?.therapist && (
                                                                        <span className="text-[9px] font-black text-emerald-600 uppercase flex items-center gap-1 border-t border-slate-100 dark:border-slate-800 pt-1 mt-1 w-full justify-center">
                                                                            👤 {tx.transactionable.therapist.name}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {transactions.data.length === 0 && (
                            <div className="py-32 text-center">
                                <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <p className="text-slate-500 dark:text-slate-600 font-black uppercase tracking-[0.2em] italic">Bersih. Tidak ada transaksi tertunda.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {transactions.links && transactions.data.length > 0 && (
                            <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap justify-center gap-1">
                                {transactions.links.map((link, i) => (
                                    <div key={i}>
                                        {link.url === null ? (
                                            <div
                                                className="px-4 py-2 text-sm text-gray-400 border rounded-lg"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <a
                                                href={link.url}
                                                className={`px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${link.active ? 'bg-indigo-50 border-indigo-500 text-indigo-600 font-bold' : 'bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Validate + Reschedule */}
            {selectedValidate && (
                <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] w-full max-w-lg border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold dark:text-white mb-2">Validasi Pembayaran</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Invoice: <span className="font-black text-slate-900 dark:text-white">#{selectedValidate.invoice_number}</span></p>
                        </div>

                        <form onSubmit={submitValidate} className="space-y-6">
                            {selectedValidate.transactionable_type?.includes('Booking') && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Jadwal Terpilih Pasien</label>
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                📅 {formatSchedule(selectedValidate)?.dateStr}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                🕐 {formatSchedule(selectedValidate)?.startTime} – {formatSchedule(selectedValidate)?.endTime} WIB
                                            </p>
                                            {selectedValidate.transactionable?.schedule?.booked_count >= selectedValidate.transactionable?.schedule?.quota && (
                                                <p className="mt-2 text-[10px] font-black text-rose-500 uppercase flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Jadwal ini sudah PENUH! Wajib Reschedule.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Pindah ke Jadwal Lain (Opsional)</label>
                                        <select
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            value={validateData.new_schedule_id}
                                            onChange={e => setValidateData('new_schedule_id', e.target.value)}
                                        >
                                            <option value={selectedValidate.transactionable?.schedule_id}>Tetap di Jadwal Pilihan Pasien</option>
                                            {usePage().props.availableSchedules?.map(sched => (
                                                <option key={sched.id} value={sched.id}>
                                                    {new Date(sched.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} | {sched.start_time.substring(0, 5)} - {sched.end_time.substring(0, 5)} WIB ({sched.booked_count}/{sched.quota})
                                                </option>
                                            ))}
                                        </select>
                                        <p className="mt-2 text-[10px] text-slate-400 font-bold italic">*Jika dipindahkan, pasien akan menerima notifikasi reschedule otomatis.</p>
                                    </div>
                                </div>
                            )}

                            {!selectedValidate.transactionable_type?.includes('Booking') && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 italic">Validasi akses konten digital untuk user ini.</p>
                            )}

                            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    type="submit"
                                    disabled={validating}
                                    className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {validating ? 'Memproses...' : 'Konfirmasi & Berikan Akses'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedValidate(null)}
                                    className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors py-2"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Reject */}
            {selectedReject && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold dark:text-white mb-2">Tolak Pembayaran</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Invoice: <span className="font-bold text-gray-900 dark:text-white">{selectedReject.invoice_number}</span></p>
                        </div>
                        <form onSubmit={submitReject}>
                            <div className="mb-6">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Alasan Penolakan</label>
                                <textarea
                                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]"
                                    placeholder="Jelaskan alasan penolakan ini kepada pengguna..."
                                    value={rejectData.rejection_reason}
                                    onChange={e => setRejectData('rejection_reason', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <PrimaryButton type="submit" disabled={rejecting} className="!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center">
                                    {rejecting ? 'Memproses...' : 'Konfirmasi Penolakan'}
                                </PrimaryButton>
                                <button type="button" onClick={() => setSelectedReject(null)} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2">
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AuthenticatedLayout>
    );
}
