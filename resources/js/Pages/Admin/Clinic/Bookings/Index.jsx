import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';

export default function AdminBookingsIndex({ bookings, therapists }) {
    const { data, setData, patch, processing } = useForm({
        therapist_id: '',
    });

    const [editingBooking, setEditingBooking] = useState(null);

    const handleAssign = (bookingId) => {
        patch(route('admin.bookings.assign-therapist', bookingId), {
            onSuccess: () => setEditingBooking(null)
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
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Booking Pasien</h2>}>
            <Head title="Booking Pasien" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pasien</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profil</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skrining</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jadwal Sesi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terapis</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="font-medium text-gray-900">{booking.booking_code}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="font-medium text-gray-900">{booking.patient?.name}</div>
                                                <div className="text-xs text-gray-500">{booking.patient?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex flex-col">
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 max-w-[100px]">
                                                        <div
                                                            className={`h-1.5 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? 'bg-green-600' : 'bg-yellow-500'}`}
                                                            style={{ width: `${booking.patient_profile_stats?.percentage || 0}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-semibold">{booking.patient_profile_stats?.percentage || 0}% Lengkap</span>
                                                    {booking.patient?.agreement_signed_at ? (
                                                        <span className="text-[10px] text-green-600 font-bold uppercase mt-1">✓ Perjanjian TTD</span>
                                                    ) : (
                                                        <span className="text-[10px] text-red-500 font-bold uppercase mt-1">✗ Belum TTD</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.patient?.screening_completed_at ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-green-700 font-medium">Selesai: {new Date(booking.patient.screening_completed_at).toLocaleDateString('id-ID')}</span>
                                                        <span className="text-xs italic text-gray-500 truncate max-w-[150px]">
                                                            Pesan: {booking.patient.recommended_package || '-'}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-red-400 italic">Belum skrining</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {booking.schedule ? (
                                                    <>
                                                        <div>{new Date(booking.schedule.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                        <div className="text-xs">{booking.schedule.start_time?.substring(0, 5) || '--:--'} - {booking.schedule.end_time?.substring(0, 5) || '--:--'}</div>
                                                    </>
                                                ) : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    {getStatusBadge(booking.status)}
                                                    {booking.status === 'completed' && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {booking.recording_link && (
                                                                <a href={booking.recording_link} target="_blank" title="Ada Rekaman" className="text-purple-600">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                                </a>
                                                            )}
                                                            {booking.therapist_notes && (
                                                                <span title="Ada Catatan Klinis" className="text-gray-400">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                                </span>
                                                            )}
                                                            {booking.patient_visible_notes && (
                                                                <span title="Ada Pesan untuk Pasien" className="text-blue-500">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {editingBooking === booking.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                                            value={data.therapist_id}
                                                            onChange={(e) => setData('therapist_id', e.target.value)}
                                                        >
                                                            <option value="">Pilih Terapis</option>
                                                            {therapists.map(t => (
                                                                <option key={t.id} value={t.id}>{t.name}</option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            onClick={() => handleAssign(booking.id)}
                                                            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                                            disabled={processing || !data.therapist_id}
                                                        >
                                                            Simpan
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingBooking(null)}
                                                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300"
                                                            disabled={processing}
                                                        >
                                                            Batal
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between group">
                                                        <span className={booking.therapist ? 'text-gray-900 font-medium' : 'text-gray-400 italic'}>
                                                            {booking.therapist?.name || 'Belum di-assign'}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                setEditingBooking(booking.id);
                                                                setData('therapist_id', booking.therapist_id || '');
                                                            }}
                                                            className="ml-2 text-indigo-600 hover:text-indigo-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            {booking.therapist ? 'Ubah' : 'Assign'}
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                                Belum ada booking pasien.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
