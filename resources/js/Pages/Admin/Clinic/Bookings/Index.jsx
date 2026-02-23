import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';

export default function AdminBookingsIndex({ bookings, therapists, availableSchedules = [] }) {
    const { data, setData, patch, processing } = useForm({
        therapist_id: '',
    });

    const [editingBooking, setEditingBooking] = useState(null);
    const [reschedulingBooking, setReschedulingBooking] = useState(null);
    const [noShowBooking, setNoShowBooking] = useState(null);

    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        reschedule_reason: '',
    });

    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'therapist', // Default to therapist for admin since they are often fixing therapist absences
        no_show_reason: '',
    });

    const handleAssign = (bookingId) => {
        patch(route('admin.bookings.assign-therapist', bookingId), {
            onSuccess: () => setEditingBooking(null)
        });
    };

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('admin.bookings.reschedule', reschedulingBooking.id), {
            onSuccess: () => {
                setReschedulingBooking(null);
                resetReschedule();
            }
        });
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        postNoShow(route('admin.bookings.no-show', noShowBooking.id), {
            onSuccess: () => {
                setNoShowBooking(null);
                resetNoShow();
            }
        });
    };

    const getStatusBadge = (status) => {
        const statuses = {
            pending_screening: "bg-yellow-100 text-yellow-800",
            pending_payment: "bg-blue-100 text-blue-800",
            pending_validation: "bg-indigo-100 text-indigo-800",
            confirmed: "bg-green-100 text-green-800",
            completed: "bg-gray-100 text-gray-800",
            cancelled: "bg-red-100 text-red-800",
        };
        const labels = {
            pending_screening: "Menunggu Skrining",
            pending_payment: "Menunggu Pembayaran",
            pending_validation: "Menunggu Validasi",
            confirmed: "Dikonfirmasi",
            completed: "Selesai",
            cancelled: "Dibatalkan",
        };
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statuses[status] || statuses.pending_payment}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Manajemen Booking Pasien</h2>}
        >
            <Head title="Booking Pasien" />

            <div className="relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700">
                {/* Dynamic Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '10s' }}></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10">
                    {/* Header Panel */}
                    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Booking <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Pasien</span>
                                </h1>
                                <p className="mt-2 text-slate-500 dark:text-slate-400 font-bold italic tracking-wide">Pantau skrining, pembayaran, dan penugasan terapis.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Table Panel */}
                    <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-100/50 dark:bg-slate-800/50">
                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-slate-700/30">
                                        <th className="px-8 py-5">Info Booking</th>
                                        <th className="px-8 py-5">Pasien & Screening</th>
                                        <th className="px-8 py-5">Jadwal Sesi</th>
                                        <th className="px-8 py-5 text-center">Status</th>
                                        <th className="px-8 py-5">Terapis & Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900 dark:text-white mb-1">{booking.booking_code}</span>
                                                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit">
                                                        {booking.package_type?.toUpperCase() || 'KONSULTASI'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-3">
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900 dark:text-white">{booking.patient?.name}</div>
                                                        <div className="text-xs text-slate-500">{booking.patient?.email}</div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex flex-col">
                                                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1 my-1">
                                                                <div
                                                                    className={`h-1 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                                    style={{ width: `${booking.patient_profile_stats?.percentage || 0}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{booking.patient_profile_stats?.percentage || 0}% Profil</span>
                                                        </div>
                                                        {booking.patient?.screening_completed_at ? (
                                                            <div className="flex flex-col border-l border-slate-200 dark:border-slate-700 pl-4">
                                                                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Skrining OK</span>
                                                                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{booking.patient.recommended_package || 'No Rec'}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[9px] font-black text-rose-500 uppercase border-l border-slate-200 dark:border-slate-700 pl-4">Belum Skrining</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {booking.schedule ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                            {new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {booking.schedule.start_time?.substring(0, 5)} WIB
                                                        </span>
                                                    </div>
                                                ) : <span className="text-xs text-slate-400 italic">No Slot</span>}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    {getStatusBadge(booking.status)}
                                                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                                        {booking.recording_link && (
                                                            <div className="w-5 h-5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-500" title="Ada Rekaman">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                            </div>
                                                        )}
                                                        {booking.therapist_notes && (
                                                            <div className="w-5 h-5 rounded-lg bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-slate-500" title="Ada Catatan Klinis">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-4">
                                                    {editingBooking === booking.id ? (
                                                        <div className="flex flex-col gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-white dark:border-slate-700 shadow-xl">
                                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assign Terapis</label>
                                                            <select
                                                                className="text-xs bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                                                                value={data.therapist_id}
                                                                onChange={(e) => setData('therapist_id', e.target.value)}
                                                            >
                                                                <option value="">Pilih Terapis</option>
                                                                {therapists.map(t => (
                                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                                ))}
                                                            </select>
                                                            <div className="flex gap-2 mt-2">
                                                                <button
                                                                    onClick={() => handleAssign(booking.id)}
                                                                    className="flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-700 transition-all"
                                                                    disabled={processing || !data.therapist_id}
                                                                >
                                                                    Simpan
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditingBooking(null)}
                                                                    className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase rounded-lg"
                                                                >
                                                                    Batal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center justify-between group/tp">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Penanggung Jawab</span>
                                                                    {booking.therapist ? (
                                                                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                                                                            {booking.therapist.name}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs font-bold text-amber-500 dark:text-amber-400">
                                                                            {['pending_payment', 'pending_validation'].includes(booking.status)
                                                                                ? '⏳ Otomatis setelah bayar'
                                                                                : 'BELUM DITUNJUK'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingBooking(booking.id);
                                                                        setData('therapist_id', booking.therapist_id || '');
                                                                    }}
                                                                    className="p-2 text-indigo-500 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl opacity-0 group-hover:opacity-100 group-hover/tp:opacity-100 transition-all"
                                                                    title="Ganti Terapis"
                                                                >
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                </button>
                                                            </div>

                                                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                                                                {booking.schedule_id && (
                                                                    <Link
                                                                        href={route('admin.schedules.show', booking.schedule_id)}
                                                                        className="flex-1 text-center py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:text-indigo-500 transition-all"
                                                                    >
                                                                        Detail Sesi
                                                                    </Link>
                                                                )}

                                                                {['confirmed', 'in_progress'].includes(booking.status) && (
                                                                    <>
                                                                        <button
                                                                            onClick={() => setReschedulingBooking(booking)}
                                                                            className="px-2 py-2 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                                                        >
                                                                            Reschedule
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setNoShowBooking(booking)}
                                                                            className="px-2 py-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20"
                                                                        >
                                                                            No-Show
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <p className="text-slate-500 dark:text-slate-600 font-bold italic">Belum ada booking pasien yang terdaftar.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Reschedule */}
            <Modal show={reschedulingBooking !== null} onClose={() => setReschedulingBooking(null)}>
                <form onSubmit={handleReschedule} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Reschedule Sesi</h2>
                    <p className="text-xs text-gray-500 mb-6">
                        Pasien: <strong>{reschedulingBooking?.patient?.name}</strong><br />
                        Jadwal saat ini: {reschedulingBooking?.schedule?.date} pukul {reschedulingBooking?.schedule?.start_time?.substring(0, 5)}
                    </p>

                    <div className="mb-4">
                        <InputLabel htmlFor="new_schedule_id" value="Pilih Jadwal Baru" />
                        <select
                            id="new_schedule_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={rescheduleData.new_schedule_id}
                            onChange={(e) => setRescheduleData('new_schedule_id', e.target.value)}
                            required
                        >
                            <option value="">-- Pilih Slot Tersedia --</option>
                            {availableSchedules
                                .filter(s => s.id !== reschedulingBooking?.schedule_id)
                                .map(s => (
                                    <option key={s.id} value={s.id}>
                                        {s.therapist?.name} — {new Date(s.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} — {s.start_time?.substring(0, 5)}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="reschedule_reason" value="Alasan Reschedule" />
                        <textarea
                            id="reschedule_reason"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            rows="2"
                            placeholder="Tuliskan alasan perubahan jadwal..."
                            value={rescheduleData.reschedule_reason}
                            onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                            required
                        ></textarea>
                        <p className="text-[10px] text-gray-400 mt-1">* Pesan ini akan diinformasikan ke pelanggan.</p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setReschedulingBooking(null)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={rescheduling || !rescheduleData.new_schedule_id}
                            className="inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 disabled:opacity-25 transition"
                        >
                            Update Jadwal
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal No-Show */}
            <Modal show={noShowBooking !== null} onClose={() => setNoShowBooking(null)}>
                <form onSubmit={handleNoShow} className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Tandai Tidak Hadir</h2>
                    <p className="text-xs text-gray-500 mb-6"> Booking Code: {noShowBooking?.booking_code} </p>

                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_party" value="Pihak yang Tidak Hadir" />
                        <select
                            id="no_show_party"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                            value={noShowData.no_show_party}
                            onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                            required
                        >
                            <option value="therapist">Praktisi (Tidak Hadir)</option>
                            <option value="patient">Pasien (Tidak Hadir)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_reason" value="Keterangan Admin" />
                        <textarea
                            id="no_show_reason"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                            rows="2"
                            placeholder="Alasan ketidakhadiran..."
                            value={noShowData.no_show_reason}
                            onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setNoShowBooking(null)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={markingNoShow}
                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 disabled:opacity-25 transition"
                        >
                            Tandai No-Show
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
