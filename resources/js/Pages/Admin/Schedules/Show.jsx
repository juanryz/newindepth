import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ schedule }) {
    // State for local edits
    const [editingDetails, setEditingDetails] = useState(() => {
        const initialEdits = {};
        schedule.bookings?.forEach(b => {
            initialEdits[b.id] = {
                recording_link: b.recording_link || '',
                therapist_notes: b.therapist_notes || ''
            };
        });
        return initialEdits;
    });

    const handleDetailChange = (bookingId, field, value) => {
        setEditingDetails(prev => ({
            ...prev,
            [bookingId]: {
                ...prev[bookingId],
                [field]: value
            }
        }));
    };

    const updateBookingDetails = (bookingId) => {
        const details = editingDetails[bookingId];
        router.patch(route('admin.bookings.update-details', bookingId), {
            recording_link: details.recording_link,
            therapist_notes: details.therapist_notes,
        }, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Detail Sesi</h2>}
        >
            <Head title={`Detail Sesi - ${schedule.therapist?.name}`} />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="flex justify-between items-center px-4 sm:px-0">
                        <Link
                            href={route('admin.schedules.index')}
                            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Kembali ke Kalender
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Session Overview Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center">
                                        {schedule.bookings?.length > 0 && (
                                            <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 shadow-inner">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                        )}
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white text-center tracking-tight leading-tight">{schedule.therapist?.name}</h3>
                                        <span className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-[10px] font-black tracking-widest uppercase ${schedule.schedule_type === 'class'
                                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                                            }`}>
                                            {schedule.schedule_type === 'class' ? '🎓 Kelas' : '👤 Konsultasi'}
                                        </span>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4 text-center sm:text-left">
                                        <div className="group">
                                            <div className="text-[10px] font-black text-gray-400 group-hover:text-gold-500 uppercase tracking-widest mb-1 transition-colors">Tanggal Sesi</div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                                {new Date(schedule.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className="group">
                                            <div className="text-[10px] font-black text-gray-400 group-hover:text-gold-500 uppercase tracking-widest mb-1 transition-colors">Waktu Sesi</div>
                                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                                {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                                            </div>
                                        </div>
                                    </div>

                                    {(!schedule.bookings || schedule.bookings.length === 0) && (
                                        <div className="pt-6">
                                            <button
                                                onClick={() => {
                                                    if (confirm('Hapus jadwal ini?')) {
                                                        router.delete(route('admin.schedules.destroy', schedule.id));
                                                    }
                                                }}
                                                className="w-full py-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-all border border-red-100 dark:border-red-900/30"
                                            >
                                                Hapus Jadwal Kosong
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Patient List & Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {schedule.bookings && schedule.bookings.length > 0 ? (
                                schedule.bookings.map((booking, idx) => {
                                    const patient = booking.patient;
                                    const screening = patient?.screening_results?.[0];

                                    return (
                                        <div key={idx} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden transition-all duration-500">
                                            {/* Patient Header */}
                                            <div className="p-8 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/20">
                                                        {patient?.name?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{patient?.name || 'Anonim'}</div>
                                                        <div className="text-sm font-bold text-gray-400">{patient?.email}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center sm:items-end">
                                                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.package_type === 'vip'
                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                                        }`}>
                                                        Paket {booking.package_type || 'reguler'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8 space-y-8">
                                                {/* Stats Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                                                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Telepon</div>
                                                        <div className="text-lg font-black text-gray-900 dark:text-white">{patient?.phone || '-'}</div>
                                                    </div>
                                                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Usia</div>
                                                        <div className="text-lg font-black text-gray-900 dark:text-white">{patient?.age || '-'} Thn</div>
                                                    </div>
                                                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gender</div>
                                                        <div className="text-lg font-black text-gray-900 dark:text-white capitalize">{patient?.gender || '-'}</div>
                                                    </div>
                                                </div>

                                                {/* Screening Summary */}
                                                {screening && (
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hasil Screening AI</h4>
                                                            {screening.severity_label && (
                                                                <span className="px-4 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                                    {screening.severity_label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed shadow-inner">
                                                            "{screening.ai_summary || 'Tidak ada ringkasan skrining.'}"
                                                        </div>
                                                    </div>
                                                )}

                                                <hr className="border-gray-50 dark:border-gray-800" />

                                                {/* Inputs Section */}
                                                <div className="space-y-8">
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Link Meeting / Video</label>
                                                        <div className="flex gap-4">
                                                            <input
                                                                type="text"
                                                                value={editingDetails[booking.id]?.recording_link || ''}
                                                                placeholder="https://zoom.us/j/..."
                                                                className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                                                onChange={(e) => handleDetailChange(booking.id, 'recording_link', e.target.value)}
                                                            />
                                                            {booking.recording_link && (
                                                                <a
                                                                    href={booking.recording_link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="px-6 flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors shadow-sm"
                                                                >
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block ml-1">Hasil Sesi / Catatan Terapis</label>
                                                        <textarea
                                                            value={editingDetails[booking.id]?.therapist_notes || ''}
                                                            placeholder="Tuliskan diagnosis, ringkasan sesi, atau instruksi selanjutnya di sini..."
                                                            rows="8"
                                                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-[2rem] px-8 py-6 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none shadow-inner"
                                                            onChange={(e) => handleDetailChange(booking.id, 'therapist_notes', e.target.value)}
                                                        ></textarea>
                                                    </div>

                                                    <div className="flex justify-end pt-4">
                                                        <button
                                                            onClick={() => updateBookingDetails(booking.id)}
                                                            disabled={
                                                                editingDetails[booking.id]?.recording_link === (booking.recording_link || '') &&
                                                                editingDetails[booking.id]?.therapist_notes === (booking.therapist_notes || '')
                                                            }
                                                            className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white disabled:text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-3xl transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 flex items-center gap-3"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                            Simpan Perubahan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-24 shadow-xl border-4 border-dashed border-gray-50 dark:border-gray-800 flex flex-col items-center justify-center text-center transition-all duration-500">
                                    <h4 className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Belum Ada Pasien</h4>
                                    <p className="text-gray-400 dark:text-gray-500 mt-3 font-bold italic">Sesi ini masih tersedia untuk dibooking.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
