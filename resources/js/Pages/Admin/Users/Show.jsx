import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ErrorBoundary from './ErrorBoundary';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

function InnerUserShow({ userModel, bookings = [], transactions = [], schedules = [], screeningResults = [], profileCompletion }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const isPatient = userModel.roles.some(r => r.name === 'patient');
    const isTherapist = userModel.roles.some(r => r.name === 'therapist');

    const completionRate = profileCompletion?.percentage || 0;
    const ktpDocumentPath = userModel.ktp_photo;
    const latestScreening = screeningResults[0];
    const isAgreementSigned = !!userModel.agreement_signed_at;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Detail User: {userModel.name}</h2>}
        >
            <Head title={`User: ${userModel.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* User Header Info */}
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                        <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                    {userModel.name.charAt(0)}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{userModel.name}</h1>
                                        <div className="flex flex-wrap gap-2">
                                            {userModel.roles.map(role => (
                                                <span key={role.id} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100 dark:border-indigo-800">
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.phone || '-'}</p>
                                        </div>
                                        {userModel.referral_code && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Referral Code</p>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium font-mono">{userModel.referral_code}</p>
                                            </div>
                                        )}
                                        {userModel.affiliate_ref && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Affiliate Koder</p>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.affiliate_ref}</p>
                                            </div>
                                        )}
                                        {userModel.screening_answers?.usia && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Usia</p>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium">{userModel.screening_answers.usia} tahun</p>
                                            </div>
                                        )}
                                        {userModel.screening_answers?.gender && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Jenis Kelamin</p>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium capitalize">{userModel.screening_answers.gender}</p>
                                            </div>
                                        )}
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined Since</p>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{new Date(userModel.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Patient Info if exists */}
                    {isPatient && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            {/* Profile Completion */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Kelengkapan Profil</p>
                                <div className="flex items-end justify-between mb-4">
                                    <p className={`text-4xl font-black ${completionRate === 100 ? 'text-green-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                        {completionRate}%
                                    </p>
                                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                        <div className={`h-full rounded-full ${completionRate === 100 ? 'bg-green-500' : 'bg-indigo-600'}`} style={{ width: `${completionRate}%` }}></div>
                                    </div>
                                </div>
                                {profileCompletion?.fields && (
                                    <div className="flex flex-col gap-1.5 mt-2 bg-gray-50/50 dark:bg-gray-900/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/50 max-h-40 overflow-y-auto">
                                        {Object.entries(profileCompletion.fields).map(([key, data]) => (
                                            <div key={key} className="flex items-center justify-between text-xs">
                                                <span className={`${data.filled ? 'text-gray-900 dark:text-gray-200 font-medium' : 'text-gray-400 italic'}`}>
                                                    {data.label}
                                                </span>
                                                {data.filled ? (
                                                    <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                ) : (
                                                    <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Screening Info */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status Skrining</p>
                                <p className={`font-bold pb-4 border-b border-gray-100 dark:border-gray-700 mb-4 ${userModel.screening_completed_at ? 'text-green-600' : 'text-amber-600'}`}>
                                    {userModel.screening_completed_at ? '✅ Selesai' : '⏳ Belum Skrining'}
                                </p>

                                {latestScreening ? (
                                    <div className="space-y-4 flex-1">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hasil Diagnosa AI</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-3">
                                                "{latestScreening.ai_summary || latestScreening.severity_label || 'Tidak ada ringkasan'}"
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm font-bold text-gray-400 italic flex-1">Data skrining belum tersedia.</p>
                                )}
                            </div>

                            {/* Documents & KTP */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between space-y-4 lg:col-span-2">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dokumen KTP</p>
                                    {ktpDocumentPath ? (
                                        <div className="mt-3">
                                            <a href={`/storage/${ktpDocumentPath}`} target="_blank" rel="noreferrer" className="block w-full aspect-[21/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden group relative border border-gray-200 dark:border-gray-700">
                                                <img src={`/storage/${ktpDocumentPath}`} alt="KTP Pasien" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                                                    <span className="text-white text-xs font-bold px-4 py-2 bg-white/20 rounded-xl backdrop-blur-md">Lihat Penuh</span>
                                                </div>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="mt-3 flex items-center justify-center w-full aspect-[21/9] bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                            <p className="text-xs font-bold text-gray-400">Belum diunggah</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Legal Agreement */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between lg:col-span-2">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Service Agreement</p>
                                    {isAgreementSigned ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="font-bold text-sm">Ditandatangani</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500">
                                                Pada: {new Date(userModel.agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                            </p>
                                            {userModel.digital_signature && (
                                                <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Digital Signature Data</p>
                                                        <a href={route('admin.users.agreement', userModel.id)} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors inline-flex items-center gap-1">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                            Lihat Form Legal
                                                        </a>
                                                    </div>
                                                    <img src={userModel.digital_signature} alt="Tanda Tangan" className="h-16 object-contain bg-white rounded border border-gray-200 p-1" />
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-sm font-bold text-amber-600 dark:text-amber-500">Belum disetujui</p>
                                            <p className="text-xs text-gray-500">Pasien belum menyetujui dokumen perjanjian layanan.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Session History & Financial Records or Schedules */}
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
                        {isPatient ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                                {/* Session History */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden h-full">
                                    <div className="p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-white/20">
                                        <div className="space-y-1">
                                            <h3 className="font-black text-xl text-gray-900 dark:text-white">Riwayat Sesi Konsultasi</h3>
                                            <p className="text-xs text-gray-500 font-medium">Log sesi klinis</p>
                                        </div>
                                        <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-800">
                                            {bookings.length} Sesi
                                        </span>
                                    </div>

                                    <div className="p-0">
                                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-20">
                                                    <tr>
                                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu & Kode</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Praktisi</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                                    {bookings.map((booking) => {
                                                        const d = booking.schedule ? new Date(`${booking.schedule.date.replace(/-/g, '/')} ${booking.schedule.start_time}`) : null;
                                                        const formattedDate = d && !isNaN(d.getTime())
                                                            ? d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                                            : '-';

                                                        return (
                                                            <tr key={booking.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-900/20 transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{formattedDate}</p>
                                                                    <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">#{booking.booking_code}</p>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1">
                                                                        {isTherapist ? (booking.patient?.name || '-') : (booking.therapist?.name || '-')}
                                                                    </p>
                                                                </td>
                                                                <td className="px-6 py-4 text-right">
                                                                    <button
                                                                        onClick={() => setSelectedBooking(booking)}
                                                                        className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-all uppercase tracking-widest"
                                                                    >
                                                                        Detail →
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                            {bookings.length === 0 && (
                                                <div className="p-12 text-center">
                                                    <p className="text-gray-500 italic font-medium">Belum ada riwayat sesi.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Records */}
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden h-full">
                                    <div className="p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-white/20">
                                        <div className="space-y-1">
                                            <h3 className="font-black text-xl text-gray-900 dark:text-white">Transaksi & Keuangan</h3>
                                            <p className="text-xs text-gray-500 font-medium">Log pembayaran pasien</p>
                                        </div>
                                        <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-800">
                                            {transactions.length} Data
                                        </span>
                                    </div>
                                    <div className="p-0 h-full">
                                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-10">
                                                    <tr>
                                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Inv / Nominal</th>
                                                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                                    {transactions.map(tx => (
                                                        <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-black text-gray-900 dark:text-gray-100">
                                                                    Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                                                </p>
                                                                <p className="text-[10px] text-gray-500 font-medium uppercase">{tx.invoice_number}</p>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${tx.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                                    tx.status === 'cancelled' ? 'bg-gray-100 text-gray-500' :
                                                                        tx.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                            tx.status === 'refunded' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                                                                    }`}>
                                                                    {tx.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {transactions.length === 0 && (
                                                <div className="p-12 text-center">
                                                    <p className="text-gray-500 italic text-sm">Belum ada data transaksi.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : isTherapist ? (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                                <div className="p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                    <div className="space-y-1">
                                        <h3 className="font-black text-xl text-gray-900 dark:text-white">Slot Jadwal Praktek</h3>
                                        <p className="text-xs text-gray-500 font-medium">Jadwal yang telah dibuka oleh terapis</p>
                                    </div>
                                    <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full">{schedules.length} Slot</span>
                                </div>
                                <div className="overflow-x-auto p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-10">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Kapasitas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {schedules.map(sch => (
                                                <tr key={sch.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">
                                                        {new Date(sch.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                                                        {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)} WIB
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${sch.booked_count >= sch.quota ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                                            {sch.booked_count} / {sch.quota} Terisi
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {schedules.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500 italic text-sm">Belum ada slot jadwal yang dibuka.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* Footer Section: Emergency Contact & Actions */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
                        {/* Emergency Contact Card (Moved to bottom) */}
                        <div className="flex-1 bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-gray-800/60 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Kontak Darurat (Emergency)</p>
                                    {userModel.emergency_contact_name ? (
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1">
                                            <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{userModel.emergency_contact_name}</p>
                                            <p className="text-sm font-bold text-red-700/70 dark:text-red-400/70">{userModel.emergency_contact_phone}</p>
                                            <span className="px-3 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-[10px] font-black uppercase rounded-full border border-red-200 dark:border-red-800">
                                                Hubungan: {userModel.emergency_contact_relation || '-'}
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="text-sm font-bold text-gray-400 italic">Data kontak darurat belum diisi oleh pasien.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons (Moved to bottom) */}
                        <div className="flex flex-row md:flex-col gap-3 justify-center">
                            <Link href={route('admin.users.index')} className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-[10px] flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Kembali
                            </Link>
                            <Link href={route('admin.users.edit', userModel.id)} className="px-8 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all text-[10px] shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5M17.121 17.121L19 19m-7-7l1 1m6-6l-1 1" /></svg>
                                Edit Profil
                            </Link>
                        </div>
                    </div>

                    {/* Booking Detail Modal */}
                    <Modal show={!!selectedBooking} onClose={() => setSelectedBooking(null)} maxWidth="2xl">
                        {selectedBooking && (
                            <div className="p-8 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Detail Sesi #{selectedBooking.booking_code}</h3>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {selectedBooking.schedule
                                                ? new Date(`${selectedBooking.schedule.date.replace(/-/g, '/')} ${selectedBooking.schedule.start_time}`).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                : '-'} WIB
                                        </p>
                                    </div>
                                    <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isTherapist ? 'Pasien' : 'Praktisi'}</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{isTherapist ? (selectedBooking.patient?.name || '-') : (selectedBooking.therapist?.name || '-')}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paket Layanan</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{selectedBooking.package_type || 'Hipnoterapi'}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Sesi</p>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            selectedBooking.status === 'completed' ? 'bg-indigo-100 text-indigo-700' :
                                                selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Outcome Sesi</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedBooking.completion_outcome || '-'}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                Catatan Internal (Diagnosa)
                                            </p>
                                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 min-h-[100px]">
                                                {selectedBooking.therapist_notes ? (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                        "{selectedBooking.therapist_notes}"
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">Belum ada catatan internal.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                Catatan Pasien (Tampil di Dashboard)
                                            </p>
                                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 min-h-[100px]">
                                                {selectedBooking.patient_visible_notes ? (
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                        "{selectedBooking.patient_visible_notes}"
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-gray-400 italic">Belum ada catatan untuk pasien.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {selectedBooking.recording_link && (
                                        <div className="space-y-2 pt-4">
                                            <p className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                Dokumentasi Rekaman
                                            </p>
                                            <a
                                                href={selectedBooking.recording_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-xs font-black uppercase tracking-tighter opacity-80">Video Rekaman Sesi</p>
                                                        <p className="text-sm font-bold">Watch Technical Session</p>
                                                    </div>
                                                </div>
                                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 flex justify-end">
                                    <SecondaryButton onClick={() => setSelectedBooking(null)}>
                                        Tutup Detail
                                    </SecondaryButton>
                                </div>
                            </div>
                        )}
                    </Modal>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default function UserShow(props) {
    return (
        <ErrorBoundary>
            <InnerUserShow {...props} />
        </ErrorBoundary>
    );
}
