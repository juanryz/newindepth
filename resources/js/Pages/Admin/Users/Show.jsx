import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ErrorBoundary from './ErrorBoundary';

function InnerUserShow({ userModel, bookings = [], transactions = [], schedules = [], screeningResults = [], profileCompletion }) {
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
                                <div className="flex gap-3">
                                    <Link href={route('admin.users.index')} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm">
                                        Kembali
                                    </Link>
                                    <Link href={route('admin.users.edit', userModel.id)} className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm">
                                        Edit Profil
                                    </Link>
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
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dokumen KTP</p>
                                    {ktpDocumentPath ? (
                                        <div className="mt-3">
                                            <a href={`/storage/${ktpDocumentPath}`} target="_blank" rel="noreferrer" className="block w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden group relative border border-gray-200 dark:border-gray-700">
                                                <img src={`/storage/${ktpDocumentPath}`} alt="KTP Pasien" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                                                    <span className="text-white text-xs font-bold px-4 py-2 bg-white/20 rounded-xl backdrop-blur-md">Lihat Penuh</span>
                                                </div>
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="mt-3 flex items-center justify-center w-full aspect-[16/9] bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                            <p className="text-xs font-bold text-gray-400">Belum diunggah</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Legal Agreement */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between">
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

                            {/* Emergency Contact */}
                            <div className="bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Kontak Darurat</p>
                                {userModel.emergency_contact_name ? (
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{userModel.emergency_contact_name}</p>
                                        <p className="text-xs font-medium text-gray-500">{userModel.emergency_contact_phone}</p>
                                        <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-2">Hubungan: {userModel.emergency_contact_relation || '-'}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm font-bold text-gray-400 italic mt-2">Belum diisi.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Log / Activity Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">

                        {/* Bookings Table */}
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Riwayat Booking {isTherapist ? '(Terapis)' : '(Pasien)'}</h3>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{bookings.length} Aktivitas</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Detail</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Waktu</th>
                                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                        {bookings.map(booking => (
                                            <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 cursor-help" title={booking.therapist_notes || 'Belum ada catatan terapis'}>
                                                        {booking.booking_code}
                                                    </p>
                                                    <p className="text-xs text-gray-500 capitalize">{booking.package_type || 'Hipnoterapi'}</p>
                                                    {booking.recording_link && (
                                                        <a href={booking.recording_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                            Link Video
                                                        </a>
                                                    )}
                                                    {booking.therapist_notes && (
                                                        <div className="mt-2 p-3 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl text-xs text-gray-700 dark:text-gray-300 border border-indigo-100 dark:border-indigo-800/30">
                                                            <span className="font-bold block mb-1.5 text-indigo-700 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-800 pb-1">Hasil Diagnosa & Catatan Terapis:</span>
                                                            <div className="whitespace-pre-wrap">{booking.therapist_notes}</div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                                    {booking.schedule ? `${booking.schedule.date} ${booking.schedule.start_time}` : '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {bookings.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada riwayat booking</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Transactions or Schedules Section */}
                        {isPatient ? (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Riwayat Transaksi</h3>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{transactions.length} Transaksi</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Invoice / Rekening</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Nominal</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Bukti</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {transactions.map(tx => (
                                                <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{tx.invoice_number}</p>
                                                        <p className="text-xs text-gray-500">{tx.payment_method || '-'}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {tx.payment_proof ? (
                                                            <a href={`/storage/${tx.payment_proof}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-800 underline font-bold transition-colors">Lihat Bukti</a>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${tx.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                                tx.status === 'cancelled' ? 'bg-gray-100 text-gray-500' :
                                                                    tx.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                        tx.status === 'refunded' ? 'bg-orange-100 text-orange-700' :
                                                                            'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {tx.status === 'cancelled' ? 'Dibatalkan' :
                                                                tx.status === 'paid' ? 'Lunas' :
                                                                    tx.status === 'rejected' ? 'Ditolak' :
                                                                        tx.status === 'refunded' ? 'Dikembalikan' :
                                                                            tx.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {transactions.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada riwayat transaksi</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : isTherapist ? (
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Jadwal Terapis</h3>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-full">{schedules.length} Slot</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50/50 dark:bg-gray-900/30">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tanggal</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Waktu</th>
                                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Isian</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {schedules.map(sch => (
                                                <tr key={sch.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        {new Date(sch.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                        {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md ${sch.booked_count >= sch.quota ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                                            }`}>
                                                            {sch.booked_count} / {sch.quota}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {schedules.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic text-sm">Belum ada data jadwal</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null}
                    </div>

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
