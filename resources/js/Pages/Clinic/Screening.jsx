import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Screening({ questions }) {
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleAnswer = (questionId, option, isCheckbox) => {
        if (isCheckbox) {
            const currentArr = Array.isArray(data.answers[questionId]) ? data.answers[questionId] : [];
            const newArr = currentArr.includes(option)
                ? currentArr.filter(x => x !== option)
                : [...currentArr, option];

            setData('answers', {
                ...data.answers,
                [questionId]: newArr
            });
        } else {
            setData('answers', {
                ...data.answers,
                [questionId]: option
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('screening.store'));
    };

    const q = questions[currentStep];
    const isCheckbox = q.id === 'q4'; // based on knowledge of questions
    const options = Object.keys(q.options);
    const hasAnsweredCurrent = isCheckbox
        ? (Array.isArray(data.answers[q.id]) && data.answers[q.id].length > 0)
        : !!data.answers[q.id];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pre-Consultation Screening</h2>}
        >
            <Head title="Skrining Konsultasi" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Bantu kami memahami kondisi Anda</h3>
                            <p className="text-gray-600">
                                Jawaban Anda akan membantu kami merekomendasikan program hipnoterapi yang paling tepat dan aman untuk mencapai kesembuhan optimal.
                            </p>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6 mb-2">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                                {currentStep + 1} dari {questions.length}
                            </div>
                        </div>

                        <form onSubmit={submit}>
                            <div className="min-h-[250px]">
                                <h4 className="text-xl font-medium text-gray-900 mb-6">{q.text}</h4>

                                <div className="space-y-3">
                                    {options.map((opt) => {
                                        const isSelected = isCheckbox
                                            ? (Array.isArray(data.answers[q.id]) && data.answers[q.id].includes(opt))
                                            : data.answers[q.id] === opt;

                                        return (
                                            <label
                                                key={opt}
                                                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200 ${isSelected
                                                        ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                                                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type={isCheckbox ? "checkbox" : "radio"}
                                                        name={q.id}
                                                        value={opt}
                                                        checked={isSelected}
                                                        onChange={() => handleAnswer(q.id, opt, isCheckbox)}
                                                        className={`w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${isCheckbox ? 'rounded' : 'rounded-full'}`}
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <span className={`font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>
                                                        {opt}
                                                    </span>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between border-t pt-6">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${currentStep === 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    Sebaumnya
                                </button>

                                {currentStep < questions.length - 1 ? (
                                    <PrimaryButton
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!hasAnsweredCurrent}
                                    >
                                        Selanjutnya
                                    </PrimaryButton>
                                ) : (
                                    <PrimaryButton
                                        type="submit"
                                        disabled={!hasAnsweredCurrent || processing}
                                    >
                                        Selesai & Lihat Hasil
                                    </PrimaryButton>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
