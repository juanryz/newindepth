import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export default function AdminSchedulesIndex({ schedulesByDate, therapists, filters }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        therapist_id: '',
        date: '',
        time_slot: '',
    });

    const [isAdding, setIsAdding] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.schedules.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.schedules.store'), {
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
        });
    };

    const deleteSchedule = (scheduleId) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            router.delete(route('admin.schedules.destroy', scheduleId));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Jadwal Terapis</h2>}
        >
            <Head title="Manajemen Jadwal Terapis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Filters & Actions */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <select
                                name="therapist_id"
                                className="border-gray-300 rounded-md shadow-sm text-sm w-full sm:w-48"
                                value={filters.therapist_id || ''}
                                onChange={handleFilterChange}
                            >
                                <option value="">Semua Terapis</option>
                                {therapists.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                name="date"
                                className="border-gray-300 rounded-md shadow-sm text-sm w-full sm:w-48"
                                value={filters.date || ''}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            {isAdding ? 'Batal Tambah' : '+ Tambah Slot Manual'}
                        </button>
                    </div>

                    {/* Add Schedule Form */}
                    {isAdding && (
                        <div className="bg-indigo-50 p-6 shadow-sm sm:rounded-lg border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-4">Tambah Slot Jadwal Baru</h3>
                            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4 items-end">
                                <div className="w-full sm:w-1/3">
                                    <label className="block text-sm font-medium text-gray-700">Terapis</label>
                                    <select
                                        name="therapist_id"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.therapist_id}
                                        onChange={e => setData('therapist_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Terapis...</option>
                                        {therapists.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                    {errors.therapist_id && <div className="text-red-500 text-xs mt-1">{errors.therapist_id}</div>}
                                </div>
                                <div className="w-full sm:w-1/4">
                                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.date}
                                        onChange={e => setData('date', e.target.value)}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
                                </div>
                                <div className="w-full sm:w-1/4">
                                    <label className="block text-sm font-medium text-gray-700">Jam (HH:mm)</label>
                                    <input
                                        type="time"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.time_slot}
                                        onChange={e => setData('time_slot', e.target.value)}
                                        required
                                    />
                                    {errors.time_slot && <div className="text-red-500 text-xs mt-1">{errors.time_slot}</div>}
                                </div>
                                <div className="w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Schedules List */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-6">
                        {Object.keys(schedulesByDate).length > 0 ? (
                            <div className="space-y-8">
                                {Object.keys(schedulesByDate).sort().map(dateStr => (
                                    <div key={dateStr} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center mb-4 border-l-4 border-indigo-500 pl-3">
                                            {format(parseISO(dateStr), 'EEEE, d MMMM yyyy', { locale: id })}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {schedulesByDate[dateStr].map(schedule => {
                                                const isBooked = schedule.bookings && schedule.bookings.length > 0;
                                                return (
                                                    <div key={schedule.id} className={`p-4 rounded-lg border ${isBooked ? 'bg-gray-50 border-gray-200' : 'bg-green-50/50 border-green-200'} relative group`}>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="text-xl font-bold text-gray-900">{schedule.time_slot}</span>
                                                                <p className="text-sm font-medium text-gray-600 mt-1">{schedule.therapist.name}</p>
                                                            </div>
                                                            <div>
                                                                {isBooked ? (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                        Terisi
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Kosong
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {!isBooked && (
                                                            <button
                                                                onClick={() => deleteSchedule(schedule.id)}
                                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                                title="Hapus Slot"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                Tidak ada jadwal yang ditemukan untuk filter yang dipilih.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
