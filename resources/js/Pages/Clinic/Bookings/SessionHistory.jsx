import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function SessionHistory({ bookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Riwayat Sesi Konsultasi</h2>}
        >
            <Head title="Riwayat Sesi" />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
                        <h1 className="text-2xl font-black tracking-tight">📋 Riwayat Sesi Konsultasi</h1>
                        <p className="text-indigo-100 mt-1 text-sm font-medium">Catatan dan hasil sesi dari terapis Anda</p>
                    </div>

                    {bookings.data.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Belum ada riwayat sesi</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki sesi konsultasi yang telah selesai.</p>
                            <div className="mt-6">
                                <Link
                                    href={route('bookings.create')}
                                    className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    Buat Reservasi Baru →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.data.map(booking => {
                                const isCompleted = booking.status === 'completed';
                                const hasNotes = !!booking.patient_visible_notes;
                                const hasRecording = !!booking.recording_link;
                                const therapistName = booking.therapist?.name || booking.schedule?.therapist?.name || '-';
                                const scheduleDate = booking.schedule
                                    ? new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                                    : '-';
                                const scheduleTime = booking.schedule
                                    ? `${booking.schedule.start_time?.substring(0, 5) || '--:--'} - ${booking.schedule.end_time?.substring(0, 5) || '--:--'} WIB`
                                    : '-';

                                return (
                                    <div key={booking.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all">
                                        {/* Session Header */}
                                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                                    {isCompleted ? (
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">#{booking.booking_code}</p>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{scheduleDate}</p>
                                                    <p className="text-xs text-gray-500">{scheduleTime} • {therapistName}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${isCompleted ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800' : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'}`}>
                                                    {isCompleted ? 'Selesai' : 'Dikonfirmasi'}
                                                </span>
                                                {isCompleted && (
                                                    <button
                                                        onClick={() => setSelectedBooking(booking)}
                                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                                                    >
                                                        Lihat Hasil →
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Session Content Preview */}
                                        {isCompleted && (
                                            <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {/* Outcome */}
                                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Outcome</p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{booking.completion_outcome || 'Normal'}</p>
                                                    </div>
                                                    {/* Paket */}
                                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Paket Layanan</p>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{booking.package_type || 'Hipnoterapi'}</p>
                                                    </div>
                                                    {/* Recording */}
                                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Rekaman</p>
                                                        {hasRecording ? (
                                                            <a href={booking.recording_link} target="_blank" rel="noreferrer" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                                Tonton
                                                            </a>
                                                        ) : (
                                                            <p className="text-sm text-gray-400 italic">Belum tersedia</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Patient Notes Preview */}
                                                {hasNotes && (
                                                    <div className="mt-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4">
                                                        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                            Pesan dari Terapis
                                                        </p>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 italic">
                                                            "{booking.patient_visible_notes}"
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {bookings.links && bookings.data.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mt-6">
                            {bookings.links.map((link, i) => (
                                <div key={i}>
                                    {link.url === null ? (
                                        <div
                                            className="px-4 py-2 text-sm text-gray-400 border rounded-lg"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <Link
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

            {/* Detail Modal */}
            <Modal show={selectedBooking !== null} onClose={() => setSelectedBooking(null)} maxWidth="2xl">
                {selectedBooking && (
                    <div className="bg-white dark:bg-gray-800 w-full">
                        <div className="p-8 space-y-6">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Detail Sesi #{selectedBooking.booking_code}</h3>
                                    <p className="text-sm text-gray-500 font-medium mt-1">
                                        {selectedBooking.schedule
                                            ? new Date(selectedBooking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                                            : '-'}
                                        {' • '}
                                        {selectedBooking.schedule ? `${selectedBooking.schedule.start_time?.substring(0, 5)} - ${selectedBooking.schedule.end_time?.substring(0, 5)} WIB` : ''}
                                    </p>
                                </div>
                                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Praktisi</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedBooking.therapist?.name || selectedBooking.schedule?.therapist?.name || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Paket Layanan</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{selectedBooking.package_type || 'Hipnoterapi'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                        {selectedBooking.status === 'completed' ? 'Selesai' : selectedBooking.status}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Outcome Sesi</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedBooking.completion_outcome || 'Normal'}</p>
                                </div>
                            </div>

                            {/* Patient Visible Notes */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Pesan / Summary dari Terapis
                                </p>
                                <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 min-h-[80px]">
                                    {selectedBooking.patient_visible_notes ? (
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap italic">
                                            "{selectedBooking.patient_visible_notes}"
                                        </p>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Terapis tidak menyertakan catatan tambahan.</p>
                                    )}
                                </div>
                            </div>

                            {/* Recording Link */}
                            {selectedBooking.recording_link && (
                                <div className="space-y-2">
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
                                                <p className="text-sm font-bold">Tonton Rekaman Sesi</p>
                                            </div>
                                        </div>
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                    </a>
                                </div>
                            )}

                            {/* Close Button */}
                            <div className="text-center pt-4">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all uppercase tracking-widest"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
