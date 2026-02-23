import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AffiliateAgreementContent from './Partials/AffiliateAgreementContent';



export default function AffiliateDashboard({ commissions, totalEarned, pendingAmount, referralLink, hasSignedAgreement }) {
    const user = usePage().props.auth.user;
    const [copied, setCopied] = useState(false);

    // Agreement Form state
    const { data, setData, post, processing, errors } = useForm({
        agree1: false,
        agree2: false,
        agree3: false,
        agree4: false,
        signature: '',
        name: user.name || '',
        age: user.age || '',
        gender: user.gender || '',
        phone: user.phone || '',
    });

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
        setHasDrawn(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas && hasDrawn) {
            setData('signature', canvas.toDataURL('image/png'));
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
        setData('signature', '');
    };

    const submitAgreement = (e) => {
        e.preventDefault();
        if (!hasDrawn || !data.agree1 || !data.agree2 || !data.agree3 || !data.agree4 || !data.name || !data.age || !data.gender || !data.phone) return;
        post(route('affiliate.agreement.store'));
    };

    const allChecked = data.agree1 && data.agree2 && data.agree3 && data.agree4 && hasDrawn && data.name && data.age && data.gender && data.phone;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!hasSignedAgreement) {
        return (
            <AuthenticatedLayout
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Persetujuan Kemitraan Affiliate</h2>}
            >
                <Head title="Persetujuan Affiliate" />

                <div className="py-12 px-4 sm:px-0">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-3xl shadow-2xl p-6 sm:p-12 transition-all duration-700">
                            <div className="text-center mb-10">
                                <span className="inline-block py-1.5 px-4 text-[10px] font-black tracking-[0.2em] uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full mb-4">LEGAL DOCUMENT</span>
                                <h1 className="text-3xl font-black text-gray-950 dark:text-white leading-tight">PERJANJIAN MITRA AFFILIATE</h1>
                                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">InDepth Mental Wellness</p>
                                <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl text-sm text-slate-700 dark:text-slate-300 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-10 shadow-inner custom-scrollbar relative">
                                <AffiliateAgreementContent />
                            </div>

                            <form onSubmit={submitAgreement} className="space-y-10">
                                <section className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]">01</span>
                                        Data Identitas Mitra
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nama Lengkap (Sesuai KTP)</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white"
                                                placeholder="Contoh: Budi Santoso"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Nomor WhatsApp Aktif</label>
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white"
                                                placeholder="Contoh: 081234567890"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Usia Saat Ini</label>
                                            <input
                                                type="number"
                                                value={data.age}
                                                onChange={e => setData('age', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white"
                                                placeholder="Contoh: 25"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Jenis Kelamin</label>
                                            <select
                                                value={data.gender}
                                                onChange={e => setData('gender', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white"
                                                required
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-[10px] text-slate-400 italic">* Data ini akan digunakan untuk keperluan administrasi dan pencairan komisi.</p>
                                </section>

                                <section>
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]">02</span>
                                        Konfirmasi Persetujuan
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree1 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                            <input type="checkbox" checked={data.agree1} onChange={e => setData('agree1', e.target.checked)} className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Saya memahami seluruh ketentuan yang berlaku.</span>
                                        </label>
                                        <label className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree2 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                            <input type="checkbox" checked={data.agree2} onChange={e => setData('agree2', e.target.checked)} className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Saya tidak akan menyalahgunakan sistem affiliate.</span>
                                        </label>
                                        <label className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree3 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                            <input type="checkbox" checked={data.agree3} onChange={e => setData('agree3', e.target.checked)} className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Saya menyetujui sistem sanksi bertingkat yang ditetapkan.</span>
                                        </label>
                                        <label className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree4 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-800'}`}>
                                            <input type="checkbox" checked={data.agree4} onChange={e => setData('agree4', e.target.checked)} className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Saya bertanggung jawab penuh atas seluruh promosi yang dilakukan.</span>
                                        </label>
                                    </div>
                                </section>

                                <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                                        <div className="w-full max-w-sm text-center">
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Tanda Tangan Digital Kemitraan</p>
                                            <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-1 relative shadow-inner overflow-hidden" style={{ height: 160 }}>
                                                <canvas
                                                    ref={canvasRef}
                                                    width={400}
                                                    height={150}
                                                    onMouseDown={startDrawing}
                                                    onMouseMove={draw}
                                                    onMouseUp={stopDrawing}
                                                    onMouseOut={stopDrawing}
                                                    onTouchStart={startDrawing}
                                                    onTouchMove={draw}
                                                    onTouchEnd={stopDrawing}
                                                    className="cursor-crosshair w-full h-full touch-none dark:invert"
                                                />
                                                {!hasDrawn && (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 pointer-events-none text-[10px] font-black uppercase tracking-[0.2em]">
                                                        Gambarlah tanda tangan di sini
                                                    </div>
                                                )}
                                            </div>
                                            <button type="button" onClick={clearCanvas} className="mt-3 text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors">Hapus & Ulangi</button>
                                        </div>

                                        <div className="flex-1 flex flex-col items-center md:items-end gap-6">
                                            <div className="text-center md:text-right">
                                                <p className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider underline">{user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Bermitra sebagai Affiliate InDepth</p>
                                            </div>
                                            <PrimaryButton
                                                type="submit"
                                                disabled={!allChecked || processing}
                                                className={`h-14 px-10 rounded-2xl justify-center text-xs font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95 ${allChecked ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-slate-300 dark:bg-slate-700 grayscale cursor-not-allowed text-slate-500 opacity-50'}`}
                                            >
                                                {processing ? 'Memproses...' : 'Aktifkan Akun Affiliate Saya'}
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="font-black text-xl text-slate-900 dark:text-white tracking-tight">Dashboard Affiliate</h2>
                    <Link
                        href={route('affiliate.agreement.show')}
                        className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm active:scale-95 flex items-center gap-2"
                    >
                        <span>Lihat Dokumen Perjanjian Saya</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>


                </div>
            }
        >
            <Head title="Affiliate Program" />

            <div className="py-12 relative z-10 px-4 sm:px-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Link Card */}
                    <div className="bg-gradient-to-br from-indigo-500/90 to-purple-600/90 dark:from-indigo-600/80 dark:to-purple-700/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl border border-white/20">
                        <div className="p-8 flex flex-col md:flex-row items-center justify-between text-white">
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-2">Program Afiliasi InDepth Mental Wellness</h3>
                                <p className="opacity-90 max-w-xl text-indigo-50">Bagikan link referral Anda kepada teman atau kerabat. Dapatkan komisi sebesar <span className="font-bold underline decoration-indigo-200">5%</span> dari setiap pendaftaran kelas atau sesi terapi yang berhasil.</p>

                                <div className="mt-8 flex items-center bg-white/10 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/20 max-w-lg">
                                    <input
                                        type="text"
                                        readOnly
                                        value={referralLink}
                                        className="bg-transparent border-none text-white w-full focus:ring-0 placeholder-white/50 text-sm font-mono"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-2 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap shadow-lg active:scale-95 transition-all"
                                    >
                                        {copied ? 'Disalin ✓' : 'Salin Link'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Total Komisi Dibayarkan</p>
                            <h4 className="text-3xl font-black text-green-600 dark:text-green-400">Rp {Number(totalEarned).toLocaleString('id-ID')}</h4>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Komisi Menunggu Pencairan</p>
                            <h4 className="text-3xl font-black text-amber-500 dark:text-amber-400">Rp {Number(pendingAmount).toLocaleString('id-ID')}</h4>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">* Komisi akan dicairkan ke rekening Anda setiap tanggal 1 bulan berikutnya.</p>
                        </div>
                    </div>

                    {/* History */}
                    <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl overflow-hidden shadow-xl sm:rounded-2xl border border-white/80 dark:border-gray-700/50">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Riwayat Komisi</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/50">
                                <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Referred User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item / Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Harga Transaksi</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Komisi Anda</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status Pembayaran</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                    {commissions.data.map((comm) => (
                                        <tr key={comm.id} className="hover:bg-white/40 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                                                {comm.referred_user?.name || 'User Tersembunyi'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                        {comm.transaction?.transactionable_type?.includes('Booking') ? 'Sesi Terapi' : 'Kelas Online'}
                                                    </span>
                                                    <span className={`text-[10px] uppercase font-bold mt-1 ${comm.transaction?.transactionable?.status === 'completed' || comm.transaction?.transactionable?.status === 'confirmed'
                                                        ? 'text-green-600' : 'text-amber-500'
                                                        }`}>
                                                        • {comm.transaction?.transactionable?.status || 'Active'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                Rp {Number(comm.transaction_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-600 dark:text-green-400">
                                                Rp {Number(comm.commission_amount).toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                                    ${comm.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' :
                                                        comm.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800'}`}>
                                                    {comm.status === 'paid' ? 'Telah Dibayar' : comm.status === 'rejected' ? 'Dibatalkan' : 'Menunggu'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {commissions.data.length === 0 && (
                                <div className="text-center p-12 text-gray-500 dark:text-gray-400">
                                    <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Belum ada history komisi. Mulai bagikan link Anda sekarang!
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
