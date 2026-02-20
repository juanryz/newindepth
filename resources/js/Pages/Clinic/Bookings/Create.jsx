import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSlotPicker from '@/Components/Clinic/TimeSlotPicker';
import ScreeningFormRenderer from '@/Components/Clinic/ScreeningFormRenderer';

export default function BookingCreate({ schedules, packageInfo }) {
    const { flash, errors: pageErrors } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Janji Temu Hipnoterapi</h2>}
        >
            <Head title="Booking Hipnoterapi" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Package Info */}
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold text-indigo-900">Rekomendasi Program Terkunci: {packageInfo?.name}</h3>
                                <p className="mt-1 text-sm text-indigo-700">{packageInfo?.description}</p>
                                <p className="mt-2 font-semibold text-indigo-900">
                                    Total Biaya: Rp {new Intl.NumberFormat('id-ID').format(packageInfo?.price)}
                                </p>
                                <p className="mt-1 text-xs text-indigo-600 italic">
                                    *Berdasarkan hasil skrining, ini adalah paket yang paling sesuai dan aman untuk kondisi Anda. Paket ini tidak dapat diubah.
                                </p>
                            </div>
                        </div>
                    </div>

                    {pageErrors.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            {pageErrors.error}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="p-6 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Pilih Waktu Konsultasi</h3>

                            <TimeSlotPicker
                                schedules={schedules}
                                selectedScheduleId={data.schedule_id}
                                onSelect={(id) => setData('schedule_id', id)}
                            />

                            {errors.schedule_id && <p className="text-sm text-red-600 mt-2">{errors.schedule_id}</p>}

                            <div className="mt-8 flex justify-end">
                                <PrimaryButton type="submit" disabled={!data.schedule_id || processing}>
                                    Konfirmasi Booking & Lanjut Pembayaran
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
