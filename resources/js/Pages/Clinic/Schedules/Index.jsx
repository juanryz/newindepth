import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function TherapistScheduleIndex({ bookings }) {
    const { flash, errors } = usePage().props;

    const [selectedHistoryPatient, setSelectedHistoryPatient] = useState(null);
    const [selectedCompletingBooking, setSelectedCompletingBooking] = useState(null);

    const { data: completeData, setData: setCompleteData, post: postComplete, processing: completing, reset: resetComplete, errors: completeErrors } = useForm({
        recording_link: '',
        therapist_notes: '',
        patient_visible_notes: '',
    });

    const openHistoryModal = (patient) => {
        setSelectedHistoryPatient(patient);
    };

    const closeHistoryModal = () => {
        setSelectedHistoryPatient(null);
    };

    const openCompleteModal = (booking) => {
        setSelectedCompletingBooking(booking);
        setCompleteData({
            recording_link: booking.recording_link || '',
            therapist_notes: booking.therapist_notes || '',
            patient_visible_notes: booking.patient_visible_notes || '',
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

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Jadwal Praktik Saya</h2>}
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
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Sesi Mendatang & Selesai</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Di sini Anda hanya dapat melihat sesi yang sudah dipesan oleh pasien. Anda diwajibkan menyertakan link rekaman (YouTube Private/Unlisted) untuk setiap sesi yang diselesaikan.
                            </p>

                            {bookings.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500">Belum ada jadwal pasien yang aktif atau selesai saat ini.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className={`rounded-xl border shadow-sm p-5 relative overflow-hidden ${booking.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-indigo-100 ring-1 ring-indigo-50'}`}>
                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white shadow-sm border">
                                                {booking.status === 'completed' ? (
                                                    <span className="text-gray-500">Selesai</span>
                                                ) : (
                                                    <span className="text-indigo-600">Akan Datang</span>
                                                )}
                                            </div>

                                            <div className="mb-4 pr-24">
                                                <h4 className="font-bold text-lg text-gray-900">{booking.patient.name}</h4>
                                                <p className="text-sm text-gray-500">{booking.patient.email}</p>
                                            </div>

                                            <div className="bg-indigo-50/50 rounded-lg p-3 mb-4 border border-indigo-100/50">
                                                <div className="flex items-center text-sm text-indigo-900 font-medium mb-1">
                                                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    {new Date(booking.schedule.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                </div>
                                                <div className="flex items-center text-sm text-indigo-800">
                                                    <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    {booking.schedule.start_time.substring(0, 5)} - {booking.schedule.end_time.substring(0, 5)} WIB
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 mt-auto">
                                                <button
                                                    onClick={() => openHistoryModal(booking.patient)}
                                                    className="w-full text-center text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-2 rounded-lg transition-colors"
                                                >
                                                    Tampilkan Riwayat Pasien
                                                </button>

                                                {booking.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => openCompleteModal(booking)}
                                                        className="w-full text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition-colors shadow-sm"
                                                    >
                                                        Akhiri Sesi
                                                    </button>
                                                )}

                                                {booking.status === 'completed' && booking.recording_link && (
                                                    <a
                                                        href={booking.recording_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-full text-center text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                                        Buka Link Rekaman
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
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
                            onChange={(e) => setData('recording_link', e.target.value)}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">* URL harus valid (YouTube Private/Unlisted)</p>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="patient_visible_notes" value="Pesan/Summary untuk Pasien (Muncul di Dashboard Pasien)" />
                        <textarea
                            id="patient_visible_notes"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                            rows="2"
                            placeholder="Tuliskan homework, ringkasan sesi, atau motivasi singkat untuk pasien..."
                            value={completeData.patient_visible_notes}
                            onChange={(e) => setData('patient_visible_notes', e.target.value)}
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
                            onChange={(e) => setData('therapist_notes', e.target.value)}
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
        </AuthenticatedLayout>
    );
}
