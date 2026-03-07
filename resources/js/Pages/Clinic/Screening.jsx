import React, { useState, useRef, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import axios from 'axios';
import {
    severityColors, CRISIS_KEYWORDS, detectCrisis,
    MASALAH_OPTIONS, USAHA_OPTIONS, DURASI_OPTIONS, DIAGNOSIS_OPTIONS, PERAWATAN_OPTIONS,
    ProgressBar, AiBubble, UserBubble, CrisisBanner,
    RadioGroup, CheckboxGroup, InputField, AutofillInputField,
    SkalaStep as Step4Skala, DiagnosisStep as Step6, ObesitasStep as Step3Obesitas,
    EssayStep, IdentitasStep,
} from '@/Components/Screening/shared';

// ── Step Configurations ───────────────────────────────────────────────────────
const TOTAL_STEPS = 10;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Screening() {
    const { prefill = {}, screeningResult } = usePage().props;

    const [step, setStep] = useState(1);
    const [stepData, setStepData] = useState({
        nama: prefill.nama || '',
        email: prefill.email || '',
        wa: prefill.wa || '',
        gender: prefill.gender || '',
        usia: prefill.usia || '',
        tinggi_badan: '',
        berat_badan: '',
        obesitas_mode: 'calculate',
        obesitas_kg: '',
    });

    useEffect(() => {
        if (Object.keys(prefill).length > 0) {
            setStepData(prev => ({
                ...prev,
                nama: prev.nama || prefill.nama || '',
                email: prev.email || prefill.email || '',
                wa: prev.wa || prefill.wa || '',
                gender: prev.gender || prefill.gender || '',
                usia: prev.usia || prefill.usia || '',
            }));
        }
    }, [prefill]);
    const [chatHistory, setChatHistory] = useState([]);
    const [aiTyping, setAiTyping] = useState(false);
    const [aiMessages, setAiMessages] = useState({});   // { step: [{ role, content }] }
    const [isHighRisk, setIsHighRisk] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Track which fields were auto-filled
    const autofilled = useMemo(() => ({
        nama: !!prefill.nama,
        email: !!prefill.email,
        wa: !!prefill.wa,
        gender: !!prefill.gender,
        usia: !!prefill.usia,
    }), [prefill]);

    const chatEndRef = useRef(null);

    // AI Opening messages per step
    const aiOpeners = {
        1: 'Halo 👋 Selamat datang di InDepth Mental Wellness. Saya akan menemani Anda melalui proses skrining singkat ini. Mari kita mulai dengan data diri Anda.',
        2: 'Terima kasih. Sekarang, tolong ceritakan — apa masalah utama yang ingin Anda atasi?',
        3: 'Mari kita ukur kondisi fisik Anda. Berapa tinggi dan berat badan Anda saat ini? Ini membantu kami menentukan program yang paling efektif untuk Anda.',
        4: 'Baik. Seberapa besar kondisi ini mengganggu kehidupan sehari-hari Anda? Geser slider di bawah sesuai perasaan Anda (1 = sangat ringan, 10 = sangat parah).',
        5: 'Sudah berapa lama Anda mengalami kondisi ini?',
        6: 'Apakah Anda pernah mendapatkan diagnosis dari profesional kesehatan sebelumnya?',
        7: 'Apakah saat ini Anda masih dalam perawatan atau pengobatan?',
        8: 'Upaya apa yang sudah pernah Anda lakukan untuk mengatasi kondisi ini?',
        9: 'Sekarang, ceritakan kepada saya — apa yang paling Anda rasakan atau alami saat ini? Tidak perlu terstruktur, tulis saja apa yang ada di hati Anda.',
        10: 'Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi bersama kami? Apa harapan Anda?',
    };

    // Show AI opener when step changes
    useEffect(() => {
        if (aiOpeners[step] && !aiMessages[step]) {
            setTimeout(() => {
                setAiMessages(prev => ({
                    ...prev,
                    [step]: [{ role: 'assistant', content: aiOpeners[step] }],
                }));
            }, 300);
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [step]);

    // ── Helper: update step data ──────────────────────────────────────────────
    const update = (key, value) => {
        setStepData(prev => ({ ...prev, [key]: value }));
    };

    const toggleMulti = (key, option) => {
        setStepData(prev => {
            const arr = Array.isArray(prev[key]) ? prev[key] : [];
            return {
                ...prev,
                [key]: arr.includes(option) ? arr.filter(x => x !== option) : [...arr, option],
            };
        });
    };

    // ── AI Chat (steps 9 & 10) ────────────────────────────────────────────────
    const sendAiMessage = async (userText, stepKey) => {
        if (!userText.trim()) return;

        // Crisis detection
        if (detectCrisis(userText)) setIsHighRisk(true);

        const currentHistory = chatHistory;
        const newUserMsg = { role: 'user', content: userText };
        const updatedHistory = [...currentHistory, newUserMsg];

        // Update local chat display
        setAiMessages(prev => ({
            ...prev,
            [step]: [...(prev[step] || []), newUserMsg],
        }));

        setAiTyping(true);

        try {
            const res = await axios.post(route('screening.chat'), {
                message: userText,
                history: updatedHistory,
            });

            const aiReply = { role: 'assistant', content: res.data.reply };
            const fullHistory = [...updatedHistory, aiReply];

            setChatHistory(fullHistory);
            if (res.data.is_high_risk) setIsHighRisk(true);

            setAiMessages(prev => ({
                ...prev,
                [step]: [...(prev[step] || []), aiReply],
            }));
        } catch {
            const fallback = { role: 'assistant', content: 'Terima kasih telah berbagi. Kami mendengar Anda.' };
            setAiMessages(prev => ({
                ...prev,
                [step]: [...(prev[step] || []), fallback],
            }));
        } finally {
            setAiTyping(false);
        }
    };

    // ── Masalah Utama helpers ─────────────────────────────────────────────────
    const needsObesitasStep = () =>
        stepData.masalah_utama === 'Obesitas';

    const isPengembanganDiri = () =>
        stepData.masalah_utama === 'Pengembangan diri';

    // ── Validation per step ───────────────────────────────────────────────────
    const isStepValid = () => {
        // Pengembangan Diri: steps 3–8 tidak relevan, selalu lolos
        if (isPengembanganDiri() && step >= 3 && step <= 8) return true;
        switch (step) {
            case 1:
                return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email
                    && (!(parseInt(stepData.usia) < 17) || stepData.izin_wali);
            case 2:
                return !!stepData.masalah_utama;
            case 3:
                if (stepData.obesitas_mode === 'manual') {
                    return !!stepData.obesitas_kg;
                }
                return stepData.berat_badan && stepData.tinggi_badan;
            case 4:
                return stepData.skala != null;
            case 5:
                return !!stepData.durasi;
            case 6:
                return !!stepData.diagnosis;
            case 7:
                return !!stepData.status_perawatan;
            case 8:
                return Array.isArray(stepData.usaha) && stepData.usaha.length > 0;
            case 9:
                return !!stepData.detail_masalah;
            case 10:
                return !!stepData.outcome;
            default:
                return true;
        }
    };

    const getNextStep = (current) => {
        if (current === 2 && isPengembanganDiri()) return 9;  // skip langsung ke essay
        if (current === 2 && !needsObesitasStep()) return 4;
        return current + 1;
    };

    const getPrevStep = (current) => {
        if (current === 9 && isPengembanganDiri()) return 2;  // balik ke pilihan masalah
        if (current === 4 && !needsObesitasStep()) return 2;
        return current - 1;
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = () => {
        setSubmitting(true);

        let finalChatHistory = [];

        // Step 9
        const msg9 = aiMessages[9] || [{ role: 'assistant', content: aiOpeners[9] }];
        finalChatHistory.push(...msg9);
        if (msg9.length === 1 && stepData.detail_masalah) {
            finalChatHistory.push({ role: 'user', content: stepData.detail_masalah });
        }

        // Step 10
        const msg10 = aiMessages[10] || [{ role: 'assistant', content: aiOpeners[10] }];
        finalChatHistory.push(...msg10);
        if (msg10.length === 1 && stepData.outcome) {
            finalChatHistory.push({ role: 'user', content: stepData.outcome });
        }

        router.post(route('screening.store'), {
            step_data: stepData,
            chat_history: finalChatHistory,
        }, {
            onError: () => setSubmitting(false),
        });
    };

    // ── Render per-step content ───────────────────────────────────────────────
    const renderStep = () => {
        const msgList = aiMessages[step] || [];

        return (
            <div className="space-y-4">
                {/* Chat bubbles for this step */}
                {msgList.map((msg, i) =>
                    msg.role === 'assistant'
                        ? <AiBubble key={i} text={msg.content} />
                        : <UserBubble key={i} text={msg.content} />
                )}
                {aiTyping && <AiBubble typing />}

                {isHighRisk && <CrisisBanner />}

                {/* Step-specific input */}
                <div className="mt-4">
                    {step === 1 && <IdentitasStep data={stepData} update={update} autofilled={autofilled} />}
                    {step === 2 && <RadioGroup options={MASALAH_OPTIONS} value={stepData.masalah_utama} onChange={(opt) => update('masalah_utama', opt)} />}
                    {step === 3 && <Step3Obesitas data={stepData} update={update} />}
                    {step === 4 && <Step4Skala data={stepData} update={update} />}
                    {step === 5 && <RadioGroup options={DURASI_OPTIONS} value={stepData.durasi} onChange={v => update('durasi', v)} />}
                    {step === 6 && <Step6 data={stepData} update={update} />}
                    {step === 7 && <RadioGroup options={PERAWATAN_OPTIONS} value={stepData.status_perawatan} onChange={v => update('status_perawatan', v)} />}
                    {step === 8 && <CheckboxGroup options={USAHA_OPTIONS} values={stepData.usaha} toggle={(opt) => toggleMulti('usaha', opt)} />}
                    {step === 9 && <Step9 data={stepData} update={update} onSendAi={(t) => sendAiMessage(t, 'detail_masalah')} />}
                    {step === 10 && <Step10 data={stepData} update={update} onSendAi={(t) => sendAiMessage(t, 'outcome')} />}
                </div>

                <div ref={chatEndRef} />
            </div>
        );
    };

    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);


    if (screeningResult) {

        const packageLabel = screeningResult.recommended_package
            ? (screeningResult.recommended_package === 'vip' ? 'VIP' : screeningResult.recommended_package.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
            : null;

        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Hasil Skrining Klinis</h2>}>
                <Head title="Hasil Skrining" />
                <div className="py-12">
                    <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-8 sm:p-12">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Skrining Selesai</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Ringkasan hasil analisis kesehatan mental Anda</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 mb-10">
                                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Rekomendasi Paket</span>
                                        <div className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                                            {packageLabel || 'Hipnoterapi'}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const effectiveTotal = isPengembanganDiri() ? 3 : (needsObesitasStep() ? 10 : 9);
    const displayStep = isPengembanganDiri()
        ? (step === 1 ? 1 : step === 2 ? 2 : 3)  // step 9→3, step 10→... (10 tidak ada di Pengembangan Diri path)
        : (step > 2 && !needsObesitasStep() ? step - 1 : step);

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Skrining Klinis InDepth</h2>}>
            <Head title="Skrining Klinis" />

            <div className="py-6 min-h-[calc(100dvh-64px)] bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-8">

                        <ProgressBar current={displayStep} total={effectiveTotal} />

                        <div className="min-h-[300px]">
                            {renderStep()}
                        </div>

                        {/* Navigation */}
                        <div className="mt-8 flex justify-between items-center border-t border-gray-100 dark:border-gray-700/50 pt-6">
                            <button
                                type="button"
                                onClick={() => setStep(getPrevStep(step))}
                                disabled={step === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-30 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation"
                            >
                                ← Sebelumnya
                            </button>

                            {step < 10 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(getNextStep(step))}
                                    disabled={!isStepValid()}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow touch-manipulation"
                                >
                                    Selanjutnya →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!isStepValid() || submitting}
                                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow touch-manipulation"
                                >
                                    {submitting ? 'Menyimpan...' : '✅ Selesai & Lihat Rekomendasi'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP COMPONENTS (only AI-chat steps remain local — unique to authenticated screening)
// ─────────────────────────────────────────────────────────────────────────────



// STEP 9 — Detail Masalah (+ AI Chat)
function Step9({ data, update, onSendAi }) {
    const [chatStarted, setChatStarted] = useState(false);
    const [followUp, setFollowUp] = useState('');

    const handleStart = () => {
        if (!data.detail_masalah?.trim()) return;
        onSendAi(data.detail_masalah);
        setChatStarted(true);
    };

    const handleSend = () => {
        if (!followUp.trim()) return;
        onSendAi(followUp);
        setFollowUp('');
    };

    return (
        <div className="space-y-3">
            {!chatStarted && (
                <textarea
                    rows={5}
                    value={data.detail_masalah || ''}
                    onChange={e => update('detail_masalah', e.target.value)}
                    placeholder="Ceritakan apa yang Anda rasakan, kapan bermula, dan bagaimana kondisi ini memengaruhi hidup Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
                />
            )}

            {/* Invitation card — shown before chat starts */}
            {!chatStarted && data.detail_masalah?.trim() && (
                <div className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700/50">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">💬</span>
                        <div>
                            <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Yuk ngobrol dengan Agent kami</p>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">untuk memahami dirimu lebih lanjut</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleStart}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Mulai Ngobrol
                    </button>
                </div>
            )}

            {/* Follow-up chat input — shown after chat started */}
            {chatStarted && (
                <div className="flex gap-2 items-end pt-1">
                    <input
                        type="text"
                        value={followUp}
                        onChange={e => setFollowUp(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Ketik pesan lanjutan..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!followUp.trim()}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

// STEP 10 — Outcome (+ AI Chat)
function Step10({ data, update, onSendAi }) {
    const [chatStarted, setChatStarted] = useState(false);
    const [followUp, setFollowUp] = useState('');

    const handleStart = () => {
        if (!data.outcome?.trim()) return;
        onSendAi(data.outcome);
        setChatStarted(true);
    };

    const handleSend = () => {
        if (!followUp.trim()) return;
        onSendAi(followUp);
        setFollowUp('');
    };

    return (
        <div className="space-y-3">
            {!chatStarted && (
                <textarea
                    rows={4}
                    value={data.outcome || ''}
                    onChange={e => update('outcome', e.target.value)}
                    placeholder="Apa yang ingin Anda capai setelah program terapi? Seperti apa kondisi ideal yang Anda impikan?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
                />
            )}

            {/* Invitation card — shown before chat starts */}
            {!chatStarted && data.outcome?.trim() && (
                <div className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">🌟</span>
                        <div>
                            <p className="text-sm font-semibold text-purple-800 dark:text-purple-300">Yuk ngobrol dengan Agent kami</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-0.5">untuk memahami harapanmu lebih lanjut</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleStart}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors shadow"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Mulai Ngobrol
                    </button>
                </div>
            )}

            {/* Follow-up chat input — shown after chat started */}
            {chatStarted && (
                <div className="flex gap-2 items-end pt-1">
                    <input
                        type="text"
                        value={followUp}
                        onChange={e => setFollowUp(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Ketik pesan lanjutan..."
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!followUp.trim()}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
