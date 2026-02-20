import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function ScheduleIndex({ schedules }) {
    const { flash, errors } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        date: new Date().toISOString().split('T')[0],
        start_time: '09:00',
        end_time: '10:00',
        quota: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('schedules.store'), {
            onSuccess: () => reset('start_time', 'end_time', 'quota'),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus jadwal ini?')) {
            router.delete(route('schedules.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Jadual Praktik</h2>}
        >
            <Head title="Jadwal Praktik" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash.success && (
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                            {flash.success}
                        </div>
                    )}
                    {errors.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            {errors.error}
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Tambah Jadwal Baru</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Pilih tanggal, jam mulai, jam selesai, dan kuota pasien untuk sesi ini.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <InputLabel htmlFor="date" value="Tanggal" />
                                        <TextInput
                                            id="date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            required
                                        />
                                        {errors.date && <p className="text-sm text-red-600 mt-2">{errors.date}</p>}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="start_time" value="Jam Mulai" />
                                        <TextInput
                                            id="start_time"
                                            type="time"
                                            className="mt-1 block w-full"
                                            value={data.start_time}
                                            onChange={(e) => setData('start_time', e.target.value)}
                                            required
                                        />
                                        {errors.start_time && <p className="text-sm text-red-600 mt-2">{errors.start_time}</p>}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="end_time" value="Jam Selesai" />
                                        <TextInput
                                            id="end_time"
                                            type="time"
                                            className="mt-1 block w-full"
                                            value={data.end_time}
                                            onChange={(e) => setData('end_time', e.target.value)}
                                            required
                                        />
                                        {errors.end_time && <p className="text-sm text-red-600 mt-2">{errors.end_time}</p>}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="quota" value="Kuota Pasien" />
                                        <TextInput
                                            id="quota"
                                            type="number"
                                            min="1"
                                            className="mt-1 block w-full"
                                            value={data.quota}
                                            onChange={(e) => setData('quota', e.target.value)}
                                            required
                                        />
                                        {errors.quota && <p className="text-sm text-red-600 mt-2">{errors.quota}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Simpan Jadwal</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <header className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900">Jadwal Anda yang Akan Datang</h2>
                        </header>

                        {schedules.length === 0 ? (
                            <p className="text-gray-500">Belum ada jadwal yang didaftarkan.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuota</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terisi</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {schedules.map((schedule) => (
                                            <tr key={schedule.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(schedule.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {schedule.quota} pasien
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {schedule.booked_count}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${schedule.status === 'available' ? 'bg-green-100 text-green-800' :
                                                            schedule.status === 'full' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {schedule.status === 'available' ? 'Tersedia' : schedule.status === 'full' ? 'Penuh' : 'Dibatalkan'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => handleDelete(schedule.id)} className="text-red-600 hover:text-red-900" disabled={schedule.booked_count > 0}>
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
