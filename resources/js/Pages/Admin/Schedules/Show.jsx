import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Show({ schedule, availableSchedules, patients = [] }) {
    // Modal states
    const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
    const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
    const [isAddingPatient, setIsAddingPatient] = useState(false);

    // Form for Rescheduling
    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        new_date: '',
        new_start_time: '',
        new_end_time: '',
        reschedule_reason: '',
    });

    // Form for No-Show
    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'cancel',
        no_show_reason: '',
    });

    // Form for Add Patient
    const { data: addPatientData, setData: setAddPatientData, post: postAddPatient, processing: addingPatient, reset: resetAddPatient, errors: addPatientErrors } = useForm({
        patient_id: '',
        package_type: 'reguler',
        schedule_id: schedule.id,
    });
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

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('admin.bookings.reschedule', selectedRescheduleBooking.id), {
            onSuccess: () => {
                setSelectedRescheduleBooking(null);
                resetReschedule();
            },
            preserveScroll: true,
        });
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        if (noShowData.no_show_party === 'cancel') {
            router.post(route('admin.bookings.cancel', selectedNoShowBooking.id), {}, {
                onSuccess: () => {
                    setSelectedNoShowBooking(null);
                    resetNoShow();
                },
                preserveScroll: true,
            });
        } else {
            postNoShow(route('admin.bookings.no-show', selectedNoShowBooking.id), {
                onSuccess: () => {
                    setSelectedNoShowBooking(null);
                    resetNoShow();
                },
                preserveScroll: true,
            });
        }
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        postAddPatient(route('admin.bookings.store'), {
            onSuccess: () => {
                setIsAddingPatient(false);
                resetAddPatient();
            },
            preserveScroll: true,
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
                                                className="w-full py-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-all border border-red-100 dark:border-red-900/30 mb-3"
                                            >
                                                Hapus Jadwal Kosong
                                            </button>
                                        </div>
                                    )}

                                    {schedule.booked_count < schedule.quota && schedule.status !== 'full' && (
                                        <div className={(!schedule.bookings || schedule.bookings.length === 0) ? '' : 'pt-6'}>
                                            <button
                                                onClick={() => setIsAddingPatient(true)}
                                                className="w-full py-4 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all border border-indigo-100 dark:border-indigo-900/30"
                                            >
                                                + Tambah Pasien Manual
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
                                                <div className="flex flex-col items-center sm:items-end gap-2">
                                                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.package_type === 'vip'
                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                                                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                                                        }`}>
                                                        Paket {booking.package_type || 'reguler'}
                                                    </span>
                                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                                                        booking.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                                                            booking.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                                'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {booking.status === 'confirmed' ? 'Dikonfirmasi' :
                                                            booking.status === 'completed' ? 'Selesai' :
                                                                booking.status === 'in_progress' ? 'Sedang Berlangsung' :
                                                                    booking.status}
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

                                                    <div className="flex flex-wrap justify-between items-center pt-8 border-t border-gray-50 dark:border-gray-800 gap-4">
                                                        <div className="flex gap-3">
                                                            <button
                                                                onClick={() => setSelectedRescheduleBooking(booking)}
                                                                disabled={booking.status === 'completed'}
                                                                className="px-6 py-4 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all border border-amber-100 dark:border-amber-900/30 disabled:opacity-50"
                                                            >
                                                                Reschedule
                                                            </button>
                                                            <button
                                                                onClick={() => setSelectedNoShowBooking(booking)}
                                                                disabled={booking.status === 'completed'}
                                                                className="px-6 py-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-all border border-red-100 dark:border-red-900/30 disabled:opacity-50"
                                                            >
                                                                No-Show / Batal
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => updateBookingDetails(booking.id)}
                                                            disabled={
                                                                editingDetails[booking.id]?.recording_link === (booking.recording_link || '') &&
                                                                editingDetails[booking.id]?.therapist_notes === (booking.therapist_notes || '')
                                                            }
                                                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white disabled:text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                            Simpan Detail
                                                        </button>
                                                    </div>

                                                    {booking.status === 'completed' && (
                                                        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border-2 border-emerald-100 dark:border-emerald-800/30 rounded-3xl space-y-4 shadow-sm">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-[10px] font-black text-emerald-700 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                    Hasil Sesi Terakhir
                                                                </h4>
                                                                <span className="text-[8px] font-black text-emerald-600/50 uppercase">Finalized</span>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Catatan Diagnosa / Sesi:</p>
                                                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-relaxed italic">
                                                                        "{booking.therapist_notes || 'Tidak ada catatan.'}"
                                                                    </p>
                                                                </div>
                                                                {booking.recording_link && (
                                                                    <div className="pt-2">
                                                                        <a
                                                                            href={booking.recording_link}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                                            Buka Rekaman Sesi
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {booking.status === 'completed' && booking.session_checklist && Object.keys(booking.session_checklist).length > 0 && (
                                                        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-100 dark:border-indigo-800/30 rounded-3xl space-y-4 shadow-sm">
                                                            <h4 className="text-[10px] font-black text-indigo-700 dark:text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                                                Checklist Sesi Hipnoterapi
                                                            </h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                {booking.session_checklist.problem_name && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Masalah Klien</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.problem_name}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.problem_score && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Angka Gangguan Awal</p>
                                                                        <p className="text-lg font-black text-indigo-600">{booking.session_checklist.problem_score}/10</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.desired_outcome && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Outcome Diinginkan</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.desired_outcome}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.outcome_indicator && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Indikator Outcome</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.outcome_indicator}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.induction_type?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Induksi</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.induction_type.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.deepening_technique?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Deepening</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.deepening_technique.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.core_method_type?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Metode Inti</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.core_method_type.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.suggestion_type?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Sugesti</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.suggestion_type.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.timeline_type?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Timeline</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.timeline_type.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.emerging_type?.length > 0 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Emerging</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.emerging_type.join(', ')}</p>
                                                                    </div>
                                                                )}
                                                                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Abreaksi</p>
                                                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_abreaction ? 'Ya' : 'Tidak'}</p>
                                                                </div>
                                                                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Segel Hipnotis</p>
                                                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_seal ? 'Ya' : 'Tidak'}</p>
                                                                </div>
                                                                <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Pengujian Hasil</p>
                                                                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.has_result_test ? 'Ya' : 'Tidak'}</p>
                                                                </div>
                                                                {booking.session_checklist.final_problem_score && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Angka Masalah Akhir</p>
                                                                        <p className="text-lg font-black text-emerald-600">{booking.session_checklist.final_problem_score}/10</p>
                                                                    </div>
                                                                )}
                                                                {booking.session_checklist.has_exception && booking.session_checklist.exception_detail && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl sm:col-span-2">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Pengecualian</p>
                                                                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{booking.session_checklist.exception_detail}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {booking.reschedule_reason && (
                                                        <div className="mt-6 p-6 bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800/30 rounded-3xl">
                                                            <p className="text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase flex items-center gap-2 mb-2">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                Keterangan Reschedule / Perubahan
                                                            </p>
                                                            <p className="text-sm font-medium text-amber-800 dark:text-amber-300 italic">
                                                                "{booking.reschedule_reason}"
                                                                <span className="block mt-2 text-[9px] font-black opacity-60 not-italic uppercase tracking-wider">
                                                                    Rescheduled At: {new Date(booking.rescheduled_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    )}
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

            {/* Modal: Reschedule Session */}
            <Modal show={selectedRescheduleBooking !== null} onClose={() => setSelectedRescheduleBooking(null)}>
                <form onSubmit={handleReschedule} className="p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Jadwal Ulang (Admin)</h2>
                    <p className="text-sm text-gray-500 mb-8 font-bold">Pasien: <span className="text-indigo-600">{selectedRescheduleBooking?.patient?.name}</span></p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="new_schedule_id" value="Pilih Slot Baru" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="new_schedule_id"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={rescheduleData.new_schedule_id}
                                onChange={(e) => {
                                    setRescheduleData(prev => ({
                                        ...prev,
                                        new_schedule_id: e.target.value,
                                        new_date: '',
                                        new_start_time: '',
                                        new_end_time: ''
                                    }));
                                }}
                            >
                                <option value="">-- Buat Jadwal Custom (Manual) --</option>
                                {availableSchedules
                                    ?.filter(s => s.id !== selectedRescheduleBooking?.schedule_id)
                                    .map(s => (
                                        <option key={s.id} value={s.id}>
                                            {new Date(s.date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })} | {s.start_time?.substring(0, 5)} WIB | {s.therapist?.name || 'Belum diatur'}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {!rescheduleData.new_schedule_id && (
                            <div className="p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-3xl border border-indigo-100 dark:border-indigo-800/30 space-y-4">
                                <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center">Input Jadwal Secara Manual</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <InputLabel value="Tanggal Baru" className="text-[10px] font-black uppercase text-gray-400 mb-1" />
                                        <TextInput
                                            type="date"
                                            className="w-full"
                                            value={rescheduleData.new_date}
                                            onChange={e => setRescheduleData('new_date', e.target.value)}
                                            required={!rescheduleData.new_schedule_id}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Jam Mulai" className="text-[10px] font-black uppercase text-gray-400 mb-1" />
                                        <TextInput
                                            type="time"
                                            className="w-full"
                                            value={rescheduleData.new_start_time}
                                            onChange={e => setRescheduleData('new_start_time', e.target.value)}
                                            required={!rescheduleData.new_schedule_id}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Jam Selesai" className="text-[10px] font-black uppercase text-gray-400 mb-1" />
                                        <TextInput
                                            type="time"
                                            className="w-full"
                                            value={rescheduleData.new_end_time}
                                            onChange={e => setRescheduleData('new_end_time', e.target.value)}
                                            required={!rescheduleData.new_schedule_id}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="reschedule_reason" value="Alasan Perubahan (Akan Muncul di Dashboard Pasien)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <textarea
                                id="reschedule_reason"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200"
                                rows="3"
                                placeholder="Misal: Praktisi sedang berhalangan, atau permintaan pasien..."
                                value={rescheduleData.reschedule_reason}
                                onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedRescheduleBooking(null)} disabled={rescheduling} className="rounded-2xl px-6">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={rescheduling || (!rescheduleData.new_schedule_id && !rescheduleData.new_date)}
                            className={`inline-flex items-center px-8 py-3 bg-amber-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 active:scale-95 ${(rescheduling || (!rescheduleData.new_schedule_id && !rescheduleData.new_date)) && 'opacity-25'}`}
                        >
                            Konfirmasi Jadwal Ulang
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Mark No-Show / Cancel */}
            <Modal show={selectedNoShowBooking !== null} onClose={() => setSelectedNoShowBooking(null)}>
                <form onSubmit={handleNoShow} className="p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Batalkan / No-Show</h2>
                    <p className="text-sm text-gray-500 mb-8 font-bold">Pasien: <span className="text-red-600">{selectedNoShowBooking?.patient?.name}</span></p>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="no_show_party" value="Keterangan Pihak Berhalangan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="no_show_party"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={noShowData.no_show_party}
                                onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                                required
                            >
                                <option value="cancel">Batalkan Total (Slot Kembali Tersedia)</option>
                                <option value="patient">Pasien Tidak Hadir (Slot Hangus)</option>
                                <option value="therapist">Praktisi Berhalangan (Slot Hangus)</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel htmlFor="no_show_reason" value="Alasan Pembatalan / No-Show" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <textarea
                                id="no_show_reason"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200"
                                rows="3"
                                placeholder={noShowData.no_show_party === 'cancel' ? "Opsional. Tidak perlu diisi jika membatalkan karena alasan umum." : "Berikan detail singkat alasan..."}
                                value={noShowData.no_show_reason}
                                onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                                required={noShowData.no_show_party !== 'cancel'}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setSelectedNoShowBooking(null)} disabled={markingNoShow} className="rounded-2xl px-6">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={markingNoShow}
                            className={`inline-flex items-center px-8 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-95 ${markingNoShow && 'opacity-25'}`}
                        >
                            Konfirmasi Pembatalan
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Add Patient */}
            <Modal show={isAddingPatient} onClose={() => setIsAddingPatient(false)}>
                <form onSubmit={handleAddPatient} className="p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Manual Tambah Pasien</h2>

                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="patient_id" value="Pilih Pasien" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="patient_id"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={addPatientData.patient_id}
                                onChange={(e) => setAddPatientData('patient_id', e.target.value)}
                                required
                            >
                                <option value="">-- Pilih Pasien --</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} ({p.email})
                                    </option>
                                ))}
                            </select>
                            {addPatientErrors.patient_id && <p className="text-red-500 text-xs mt-1 font-bold">{addPatientErrors.patient_id}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="package_type" value="Pilih Tipe Paket" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" />
                            <select
                                id="package_type"
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200"
                                value={addPatientData.package_type}
                                onChange={(e) => setAddPatientData('package_type', e.target.value)}
                                required
                            >
                                <option value="reguler">Reguler / Umum</option>
                                <option value="hipnoterapi">Paket Hipnoterapi</option>
                                <option value="upgrade">Paket Upgrade (Pengembangan Diri)</option>
                                <option value="vip">Paket VIP</option>
                            </select>
                            {addPatientErrors.package_type && <p className="text-red-500 text-xs mt-1 font-bold">{addPatientErrors.package_type}</p>}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsAddingPatient(false)} disabled={addingPatient} className="rounded-2xl px-6">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={addingPatient}
                            className={`inline-flex items-center px-8 py-3 bg-indigo-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 ${addingPatient && 'opacity-25'}`}
                        >
                            Konfirmasi Tambah
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
