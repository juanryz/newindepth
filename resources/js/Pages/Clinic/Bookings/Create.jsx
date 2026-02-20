import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TimeSlotPicker from '@/Components/Clinic/TimeSlotPicker';
import ScreeningFormRenderer from '@/Components/Clinic/ScreeningFormRenderer';

export default function BookingCreate({ schedules, screeningForm }) {
    const { flash, errors: pageErrors } = usePage().props;
    const [step, setStep] = useState(1);
    const [isEligible, setIsEligible] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        schedule_id: '',
        screening_form_id: screeningForm ? screeningForm.id : '',
        screening_answers: {},
    });

    const submit = (e) => {
        e.preventDefault();
        if (step === 1 && data.schedule_id) {
            setStep(2); // Go to screening form
        } else if (step === 2 && isEligible) {
            // Final submission
            post(route('bookings.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Janji Temu Hipnoterapi</h2>}
        >
            <Head title="Booking Hipnoterapi" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                        </div>
                        <div className="flex justify-between mt-2 text-sm font-medium text-gray-600">
                            <span>Pilih Jadwal</span>
                            <span>Isi Form Skrining</span>
                        </div>
                    </div>

                    {pageErrors.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                            {pageErrors.error}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {step === 1 && (
                            <div className="p-6 bg-white shadow sm:rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Langkah 1: Pilih Waktu Konsultasi</h3>

                                <TimeSlotPicker
                                    schedules={schedules}
                                    selectedScheduleId={data.schedule_id}
                                    onSelect={(id) => setData('schedule_id', id)}
                                />

                                {errors.schedule_id && <p className="text-sm text-red-600 mt-2">{errors.schedule_id}</p>}

                                <div className="mt-8 flex justify-end">
                                    <PrimaryButton type="submit" disabled={!data.schedule_id}>Lanjut ke Skrining</PrimaryButton>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="p-6 bg-transparent">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Langkah 2: Formulir Skrining Awal</h3>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-sm text-indigo-600 hover:text-indigo-900"
                                    >
                                        &larr; Kembali Ubah Jadwal
                                    </button>
                                </div>

                                {screeningForm ? (
                                    <>
                                        <ScreeningFormRenderer
                                            form={screeningForm}
                                            value={data.screening_answers}
                                            onChange={(answers, eligible) => {
                                                setData('screening_answers', answers);
                                                setIsEligible(eligible);
                                            }}
                                        />
                                        <div className="mt-8 flex justify-end">
                                            <PrimaryButton type="submit" disabled={!isEligible || processing}>Konfirmasi Booking</PrimaryButton>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50">
                                        Saat ini tidak ada formulir skrining aktif. Silakan hubungi admin.
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
