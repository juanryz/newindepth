import React, { useState, useEffect } from 'react';

export default function ScreeningFormRenderer({ form, value = {}, onChange }) {
    if (!form || !form.questions) return null;

    const [answers, setAnswers] = useState(value);
    const questions = form.questions;

    // Evaluate which questions should be visible based on branching logic
    const getVisibleQuestions = () => {
        let visible = [];
        let disqualified = false;

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            visible.push(q);

            const ans = answers[q.id];

            // Handle branching if answer exists and branching logic is defined
            if (ans && q.branching) {
                let branchTarget = null;

                if (q.type === 'radio' && q.branching[ans]) {
                    branchTarget = q.branching[ans];
                } else if (q.type === 'checkbox' && Array.isArray(ans)) {
                    // find first matching branch rule for selected checkboxes
                    for (const checkedOption of ans) {
                        if (q.branching[checkedOption]) {
                            branchTarget = q.branching[checkedOption];
                            break;
                        }
                    }
                }

                if (branchTarget === 'disqualify') {
                    disqualified = true;
                    break;
                } else if (branchTarget) {
                    // Skip to specific question index
                    const targetIndex = questions.findIndex(x => x.id === branchTarget);
                    if (targetIndex > i) {
                        i = targetIndex - 1; // -1 because loop will ++
                    }
                }
            }
        }

        return { visible, disqualified };
    };

    const handleAnswer = (questionId, ans) => {
        const newAnswers = { ...answers, [questionId]: ans };
        setAnswers(newAnswers);

        // Pass both answers and eligibility up
        const targetVisible = getVisibleQuestions();
        onChange(newAnswers, !targetVisible.disqualified);
    };

    const { visible, disqualified } = getVisibleQuestions();

    return (
        <div className="space-y-6">
            {visible.map((q) => (
                <div key={q.id} className="p-4 bg-white border border-gray-100 shadow-sm rounded-lg">
                    <label className="block text-gray-800 font-medium mb-3">{q.text}</label>

                    {q.type === 'radio' && (
                        <div className="space-y-2">
                            {q.options.map((opt) => (
                                <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`q_${q.id}`}
                                        value={opt}
                                        checked={answers[q.id] === opt}
                                        onChange={() => handleAnswer(q.id, opt)}
                                        className="form-radio text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {q.type === 'checkbox' && (
                        <div className="space-y-2">
                            {q.options.map((opt) => {
                                const isChecked = Array.isArray(answers[q.id]) && answers[q.id].includes(opt);
                                return (
                                    <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={`q_${q.id}[]`}
                                            value={opt}
                                            checked={isChecked}
                                            onChange={(e) => {
                                                const currentArr = Array.isArray(answers[q.id]) ? answers[q.id] : [];
                                                const newArr = e.target.checked
                                                    ? [...currentArr, opt]
                                                    : currentArr.filter(x => x !== opt);
                                                handleAnswer(q.id, newArr);
                                            }}
                                            className="form-checkbox text-indigo-600 focus:ring-indigo-500 rounded"
                                        />
                                        <span className="text-gray-700">{opt}</span>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}

            {disqualified && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    Berdasarkan jawaban Anda, Anda tidak memenuhi syarat untuk program hipnoterapi ini.
                    Silakan hubungi customer service kami untuk informasi lebih lanjut.
                </div>
            )}
        </div>
    );
}
