import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function TherapistScheduleIndex({ bookings, availableSchedules = [] }) {
    const { auth, flash, errors } = usePage().props;
    const isAdmin = auth.user.roles.some(r => ['admin', 'super_admin'].includes(r.name));

    const [selectedHistoryPatient, setSelectedHistoryPatient] = useState(null);
    const [selectedCompletingBooking, setSelectedCompletingBooking] = useState(null);
    const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
    const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);

    const { data: completeData, setData: setCompleteData, post: postComplete, processing: completing, reset: resetComplete, errors: completeErrors } = useForm({
        recording_link: '',
        therapist_notes: '',
        patient_visible_notes: '',
        completion_outcome: 'Normal',
    });

    const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
        new_schedule_id: '',
        reschedule_reason: '',
    });

    const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
        no_show_party: 'patient',
        no_show_reason: '',
    });

    const openHistoryModal = (patient) => {
        setSelectedHistoryPatient(patient);
    };

    const closeHistoryModal = () => {
        setSelectedHistoryPatient(null);
    };

    const handleStartSession = (bookingId) => {
        if (confirm('Mulai sesi terapi sekarang? Status akan berubah menjadi Sedang Berlangsung.')) {
            router.post(route('schedules.start', bookingId));
        }
    };

    const openCompleteModal = (booking) => {
        setSelectedCompletingBooking(booking);
        setCompleteData({
            recording_link: booking.recording_link || '',
            therapist_notes: booking.therapist_notes || '',
            patient_visible_notes: booking.patient_visible_notes || '',
            completion_outcome: booking.completion_outcome || 'Normal',
        });
    };

    const closeCompleteModal = () => {
        setSelectedCompletingBooking(null);
        resetComplete();
    };

    const handleCompleteSession = (e) => {
        e.preventDefault();
        postComplete(route('schedules.complete', selectedCompletingBooking.id), {
            onSuccess: () => closeCompleteModal(),
        });
    };

    // Reschedule handlers
    const openRescheduleModal = (booking) => {
        setSelectedRescheduleBooking(booking);
        setRescheduleData({ new_schedule_id: '', reschedule_reason: '' });
    };

    const closeRescheduleModal = () => {
        setSelectedRescheduleBooking(null);
        resetReschedule();
    };

    const handleReschedule = (e) => {
        e.preventDefault();
        postReschedule(route('schedules.reschedule', selectedRescheduleBooking.id), {
            onSuccess: () => closeRescheduleModal(),
        });
    };

    // No-Show handlers
    const openNoShowModal = (booking) => {
        setSelectedNoShowBooking(booking);
        setNoShowData({ no_show_party: 'patient', no_show_reason: '' });
    };

    const closeNoShowModal = () => {
        setSelectedNoShowBooking(null);
        resetNoShow();
    };

    const handleNoShow = (e) => {
        e.preventDefault();
        postNoShow(route('schedules.no-show', selectedNoShowBooking.id), {
            onSuccess: () => closeNoShowModal(),
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{isAdmin ? 'Manajemen Sesi Terapi (Admin View)' : 'Jadwal Praktik Saya'}</h2>}
        >
            <Head title="Jadwal Praktik Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-200">
                            {flash.success}
                        </div>
                    )}
                    {errors.recording_link && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                            Gagal menyimpan: {errors.recording_link}
                        </div>
                    )}

                    <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden border border-gray-100">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{isAdmin ? 'Seluruh Sesi Terapi Pasien' : 'Sesi Mendatang & Selesai'}</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                {isAdmin
                                    ? 'Sebagai Admin, Anda dapat memantau seluruh sesi yang sedang berlangsung, terjadwal, maupun yang sudah selesai dari seluruh praktisi.'
                                    : 'Di sini Anda hanya dapat melihat sesi yang sudah dipesan oleh pasien. Anda diwajibkan menyertakan link rekaman (YouTube Private/Unlisted) untuk setiap sesi yang diselesaikan.'
                                }
                            </p>

                            {bookings.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">Belum ada jadwal pasien yang aktif atau selesai saat ini.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bookings.map((booking) => {
                                        const isNoShow = booking.completion_outcome?.startsWith('No-Show');
                                        const wasRescheduled = !!booking.rescheduled_at;
                                        return (
                                            <div key={booking.id} className={`rounded-xl border shadow-sm p-5 relative overflow-hidden flex flex-col ${isNoShow ? 'bg-orange-50/30 border-orange-200' : booking.status === 'completed' ? 'bg-gray-50 border-gray-200' : booking.status === 'in_progress' ? 'bg-red-50/30 border-red-200 ring-2 ring-red-500 animate-pulse-slow' : 'bg-white border-indigo-100 ring-1 ring-indigo-50'}`}>
                                                {/* Status Badge */}
                                                <div className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white shadow-sm border">
                                                    {isNoShow ? (
                                                        <span className="text-orange-600">Tidak Hadir</span>
                                                    ) : booking.status === 'completed' ? (
                                                        <span className="text-gray-500">Selesai</span>
                                                    ) : booking.status === 'in_progress' ? (
                                                        <span className="text-red-600">Berlangsung</span>
                                                    ) : (
                                                        <span className="text-indigo-600">{wasRescheduled ? 'Dijadwal Ulang' : 'Akan Datang'}</span>
                                                    )}
                                                </div>

                                                <div className="mb-4 pr-24">
                                                    <h4 className="font-bold text-lg text-gray-900 uppercase">{booking.patient.name}</h4>
                                                    <p className="text-xs text-gray-500">{booking.patient.email}</p>
                                                    {isAdmin && (
                                                        <div className="mt-2 flex items-center gap-1.5">
                                                            <span className="text-[10px] font-black text-white bg-indigo-500 px-2 py-0.5 rounded uppercase tracking-tighter">Terapis</span>
                                                            <span className="text-xs font-bold text-indigo-700">{booking.schedule?.therapist?.name}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="bg-indigo-50/30 rounded-lg p-3 mb-4 border border-indigo-100/30">
                                                    <div className="flex items-center text-xs text-indigo-900 font-bold mb-1">
                                                        <svg className="w-3.5 h-3.5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        {new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </div>
                                                    <div className="flex items-center text-xs text-indigo-800">
                                                        <svg className="w-3.5 h-3.5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        {booking.schedule.start_time?.substring(0, 5)} - {booking.schedule.end_time?.substring(0, 5)} WIB
                                                    </div>
                                                    <div className="flex items-center text-[10px] font-black text-indigo-600 dark:text-indigo-400 mt-2 pt-2 border-t border-indigo-100/50 uppercase tracking-widest">
                                                        Paket: {booking.package_type || 'REGULER'}
                                                    </div>
                                                </div>

                                                {booking.status === 'completed' && (
                                                    <div className="mb-4 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-100">
                                                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Hasil/Outcome</p>
                                                        <p className="text-sm font-medium text-emerald-700">{booking.completion_outcome || 'Normal'}</p>
                                                    </div>
                                                )}

                                                <div className="flex flex-col gap-2 mt-auto pt-4">
                                                    <Link
                                                        href={route('schedules.patient-detail', booking.patient.id)}
                                                        className="w-full text-center text-xs font-bold text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 border border-emerald-200 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        Detail & Rekam Medis
                                                    </Link>

                                                    {booking.status === 'confirmed' && (
                                                        <button
                                                            onClick={() => handleStartSession(booking.id)}
                                                            className="w-full text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition-all shadow-md active:scale-95"
                                                        >
                                                            Mulai Sesi
                                                        </button>
                                                    )}

                                                    {booking.status === 'in_progress' ? (
                                                        <Link
                                                            href={route('schedules.active-session', booking.id)}
                                                            className="w-full text-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-colors shadow-sm"
                                                        >
                                                            Selesaikan Sesi (Input Data)
                                                        </Link>
                                                    ) : booking.status === 'completed' && (
                                                        <button
                                                            onClick={() => openCompleteModal(booking)}
                                                            className="w-full text-center text-sm font-bold text-white bg-gray-700 hover:bg-gray-800 py-2 rounded-lg transition-colors shadow-sm"
                                                        >
                                                            Update Data Sesi
                                                        </button>
                                                    )}

                                                    {/* Reschedule & No-Show: only for confirmed or in_progress */}
                                                    {['confirmed', 'in_progress'].includes(booking.status) && (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => openRescheduleModal(booking)}
                                                                className="flex-1 text-center text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                                Ganti Jadwal
                                                            </button>
                                                            <button
                                                                onClick={() => openNoShowModal(booking)}
                                                                className="flex-1 text-center text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                                                                Tidak Hadir
                                                            </button>
                                                        </div>
                                                    )}

                                                    {booking.status === 'completed' && booking.recording_link && (
                                                        <a
                                                            href={booking.recording_link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="w-full text-center text-xs font-medium text-indigo-600 hover:underline mt-1 flex items-center justify-center gap-1"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                            Lihat Rekaman
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Patient History */}
            <Modal show={selectedHistoryPatient !== null} onClose={closeHistoryModal} maxWidth="2xl">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Riwayat Pasien</h2>
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">Data & Skrining Pasien</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="text-gray-500">Kelengkapan Profil:</p>
                                <p className="font-semibold text-gray-800">{selectedHistoryPatient?.patient_profile_stats?.percentage || 0}% Lengkap</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Hasil Skrining:</p>
                                <p className="font-semibold text-indigo-700">{selectedHistoryPatient?.recommended_package || 'Belum ada data'}</p>
                            </div>
                            <div className="sm:col-span-2 mt-2 pt-2 border-t border-gray-100">
                                <p className="text-gray-500 font-medium">Partisipasi Kelas (Course):</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedHistoryPatient?.courses?.length > 0 ? (
                                        selectedHistoryPatient.courses.map(course => (
                                            <span key={course.id} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                                {course.title}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic">Belum terdaftar di kelas manapun.</span>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-2 mt-2">
                                <p className="text-gray-500">Pesan Admin (Skrining):</p>
                                <p className="italic text-gray-600">{selectedHistoryPatient?.screening_results?.[0]?.admin_notes || 'Tidak ada catatan admin.'}</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-gray-700 mb-2 px-1">Riwayat Sesi</h3>
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        {selectedHistoryPatient?.bookings?.map(hist => (
                            <div key={hist.id} className={`p-4 rounded-lg border flex gap-4 ${hist.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100'}`}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                    {hist.status === 'completed' ? '✓' : '...'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">
                                        Tanggal: {new Date(hist.schedule?.date || '').toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Terapis: <span className="font-medium text-emerald-700">{hist.schedule?.therapist?.name}</span>
                                    </p>
                                    <div className="mt-2 text-xs bg-white p-2 rounded border border-gray-100 text-gray-700">
                                        <strong>Catatan Terapis:</strong>
                                        <p className="mt-1 whitespace-pre-wrap">{hist.therapist_notes || 'Tidak ada catatan.'}</p>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2">
                                        Status: {hist.status === 'completed' ? 'Selesai' : 'Akan Datang'}
                                    </p>
                                    {hist.recording_link && (
                                        <a href={hist.recording_link} target="_blank" rel="noreferrer" className="text-xs font-bold text-indigo-600 hover:underline mt-2 inline-block flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                            Link Rekaman Sesi
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                        {selectedHistoryPatient?.bookings?.length === 0 && (
                            <p className="text-gray-500 italic text-center py-4">Belum ada riwayat sesi yang tercatat.</p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeHistoryModal}>Tutup</SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Modal: Complete Session */}
            <Modal show={selectedCompletingBooking !== null} onClose={closeCompleteModal}>
                <form onSubmit={handleCompleteSession} className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Akhiri Sesi & Simpan Dokumentasi</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Sesi dengan <strong>{selectedCompletingBooking?.patient?.name}</strong> pada {selectedCompletingBooking?.schedule?.date}. <br />
                        Sebagai dokumentasi perusahaan, harap masukkan link Live Streaming YouTube (Private/Unlisted) untuk sesi ini.
                    </p>

                    <div className="mb-4">
                        <InputLabel htmlFor="recording_link" value="Link Rekaman YouTube" />
                        <TextInput
                            id="recording_link"
                            type="url"
                            className="mt-1 block w-full border-gray-300"
                            placeholder="https://youtu.be/..."
                            value={completeData.recording_link}
                            onChange={(e) => setCompleteData('recording_link', e.target.value)}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">* URL harus valid (YouTube Private/Unlisted)</p>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="completion_outcome" value="Status Selesai Sesi" />
                        <select
                            id="completion_outcome"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            value={completeData.completion_outcome}
                            onChange={(e) => setCompleteData('completion_outcome', e.target.value)}
                            required
                        >
                            <option value="Normal">Normal (Selesai dengan Baik)</option>
                            <option value="Abnormal/Emergency">Upnormal / Emergency (Butuh Perhatian Khusus)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="patient_visible_notes" value="Pesan/Summary untuk Pasien (Muncul di Dashboard Pasien)" />
                        <textarea
                            id="patient_visible_notes"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                            rows="2"
                            placeholder="Tuliskan homework, ringkasan sesi, atau motivasi singkat untuk pasien..."
                            value={completeData.patient_visible_notes}
                            onChange={(e) => setCompleteData('patient_visible_notes', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="therapist_notes" value="Catatan Klinis (Hanya untuk Terapis/Admin)" />
                        <textarea
                            id="therapist_notes"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            rows="4"
                            placeholder="Tuliskan perkembangan klinis, metode, dan rencana tindak lanjut..."
                            value={completeData.therapist_notes}
                            onChange={(e) => setCompleteData('therapist_notes', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeCompleteModal} disabled={completing}>
                            Batal
                        </SecondaryButton>
                        <button
                            type="submit"
                            disabled={completing}
                            className={`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${completing && 'opacity-25'}`}
                        >
                            Akhiri Sesi
                        </button>
                    </div>
                </form>
            </Modal>
            {/* Modal: Reschedule Session */}
            <Modal show={selectedRescheduleBooking !== null} onClose={closeRescheduleModal}>
                <form onSubmit={handleReschedule} className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Jadwal Ulang Sesi</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Pasien: <strong>{selectedRescheduleBooking?.patient?.name}</strong><br />
                        Jadwal saat ini: {selectedRescheduleBooking?.schedule?.date} pukul {selectedRescheduleBooking?.schedule?.start_time?.substring(0, 5)} WIB
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
                                .filter(s => s.id !== selectedRescheduleBooking?.schedule_id)
                                .map(s => (
                                    <option key={s.id} value={s.id}>
                                        {new Date(s.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} — {s.start_time?.substring(0, 5)} s/d {s.end_time?.substring(0, 5)} WIB
                                    </option>
                                ))}
                        </select>
                        {availableSchedules.filter(s => s.id !== selectedRescheduleBooking?.schedule_id).length === 0 && (
                            <p className="text-xs text-red-500 mt-1">Tidak ada slot tersedia. Buat jadwal baru terlebih dahulu.</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="reschedule_reason" value="Alasan Jadwal Ulang" />
                        <textarea
                            id="reschedule_reason"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            rows="3"
                            placeholder="Tuliskan alasan perubahan jadwal..."
                            value={rescheduleData.reschedule_reason}
                            onChange={(e) => setRescheduleData('reschedule_reason', e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeRescheduleModal} disabled={rescheduling}>
                            Batal
                        </SecondaryButton>
                        <button
                            type="submit"
                            disabled={rescheduling || !rescheduleData.new_schedule_id}
                            className={`inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 active:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150 ${(rescheduling || !rescheduleData.new_schedule_id) && 'opacity-25'}`}
                        >
                            Jadwal Ulang
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Modal: Mark No-Show */}
            <Modal show={selectedNoShowBooking !== null} onClose={closeNoShowModal}>
                <form onSubmit={handleNoShow} className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Tandai Tidak Hadir</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Sesi dengan <strong>{selectedNoShowBooking?.patient?.name}</strong> pada {selectedNoShowBooking?.schedule?.date} pukul {selectedNoShowBooking?.schedule?.start_time?.substring(0, 5)} WIB
                    </p>

                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_party" value="Siapa yang Tidak Hadir?" />
                        <select
                            id="no_show_party"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                            value={noShowData.no_show_party}
                            onChange={(e) => setNoShowData('no_show_party', e.target.value)}
                            required
                        >
                            <option value="patient">Pasien Tidak Hadir</option>
                            <option value="therapist">Praktisi Tidak Dapat Hadir</option>
                        </select>
                        {noShowData.no_show_party === 'therapist' && (
                            <p className="text-xs text-amber-600 mt-1 font-medium">⚠️ Admin akan diberitahu dan akan menghubungi pasien untuk jadwal ulang.</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="no_show_reason" value="Keterangan (Opsional)" />
                        <textarea
                            id="no_show_reason"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                            rows="3"
                            placeholder="Alasan ketidakhadiran..."
                            value={noShowData.no_show_reason}
                            onChange={(e) => setNoShowData('no_show_reason', e.target.value)}
                        ></textarea>
                    </div>

                    <div className="p-3 bg-red-50 rounded-lg border border-red-100 mb-4">
                        <p className="text-xs text-red-700">
                            <strong>Perhatian:</strong> Menandai sesi sebagai tidak hadir akan menutup sesi ini. Pasien akan melihat notifikasi terkait di dashboard mereka.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeNoShowModal} disabled={markingNoShow}>
                            Batal
                        </SecondaryButton>
                        <button
                            type="submit"
                            disabled={markingNoShow}
                            className={`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${markingNoShow && 'opacity-25'}`}
                        >
                            Tandai Tidak Hadir
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
