import React, { useState, useRef, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import axios from 'axios';

const severityColors = {
    'Ringan': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Sedang': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Berat Akut': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    'Berat Kronis': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    'High Risk': 'bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-200',
};

// ── Crisis Keywords (client-side) ─────────────────────────────────────────────
const CRISIS_KEYWORDS = [
    'bunuh diri', 'mau mati', 'ingin mati', 'tidak mau hidup',
    'mengakhiri hidup', 'bisikan', 'suara yang menyuruh', 'putus asa',
    'tidak ada harapan', 'self harm', 'menyakiti diri',
];

const detectCrisis = (text) => {
    const lower = text.toLowerCase();
    return CRISIS_KEYWORDS.some(kw => lower.includes(kw));
};

// ── Reusable Components ───────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>Langkah {current} dari {total}</span>
                <span>{Math.round((current / total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(current / total) * 100}%` }}
                />
            </div>
        </div>
    );
}

function AiBubble({ text, typing = false }) {
    return (
        <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                AI
            </div>
            <div className="max-w-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
                {typing ? (
                    <span className="flex gap-1 items-center h-4">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                ) : text}
            </div>
        </div>
    );
}

function UserBubble({ text }) {
    return (
        <div className="flex justify-end mb-4">
            <div className="max-w-xl bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm text-sm leading-relaxed">
                {text}
            </div>
        </div>
    );
}

function CrisisBanner() {
    return (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex gap-3 items-start">
            <span className="text-2xl">🆘</span>
            <div>
                <p className="font-bold text-red-700 dark:text-red-400 text-sm">Kami peduli dengan keselamatan Anda</p>
                <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                    Tim kami akan segera menghubungi Anda secara prioritas. Jika Anda membutuhkan bantuan segera, hubungi <strong>ke WhatsApp 0822-2080-0034</strong>.
                </p>
            </div>
        </div>
    );
}

// ── Step Configurations ───────────────────────────────────────────────────────
const TOTAL_STEPS = 10;

const MASALAH_OPTIONS = [
    'Pikiran (cemas, overthinking)',
    'Perasaan (sedih, marah, takut)',
    'Mental (depresi, mood disorder)',
    'Psikosomatis',
    'Halusinasi / gangguan persepsi',
    'Obesitas',
    'Pengembangan diri',
];

const USAHA_OPTIONS = [
    'Konsultasi psikolog',
    'Konsultasi psikiater',
    'Obat medis',
    'Terapi alternatif',
    'Konseling agama',
    'Diet / olahraga',
    'Self healing / motivasi',
    'Belum pernah melakukan apa pun',
];

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
        2: 'Terima kasih. Sekarang, tolong ceritakan — apa masalah utama yang ingin Anda atasi? Anda bisa memilih lebih dari satu.',
        3: 'Baik. Seberapa besar kondisi ini mengganggu kehidupan sehari-hari Anda? Geser slider di bawah sesuai perasaan Anda (1 = sangat ringan, 10 = sangat parah).',
        4: 'Sudah berapa lama Anda mengalami kondisi ini?',
        5: 'Untuk membantu kami lebih memahami, berapakah estimasi kelebihan berat badan Anda?',
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

    // ── Validation per step ───────────────────────────────────────────────────
    const isStepValid = () => {
        switch (step) {
            case 1:
                return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email
                    && (!(parseInt(stepData.usia) < 17) || stepData.izin_wali);
            case 2:
                return !!stepData.masalah_utama;
            case 3:
                return stepData.skala != null;
            case 4:
                return !!stepData.durasi;
            case 5:
                return !!stepData.obesitas_kg;
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

    const needsObesitasStep = () =>
        stepData.masalah_utama === 'Obesitas';

    const getNextStep = (current) => {
        if (current === 4 && !needsObesitasStep()) return 6;
        return current + 1;
    };

    const getPrevStep = (current) => {
        if (current === 6 && !needsObesitasStep()) return 4;
        return current - 1;
    };

    // ── Submit ────────────────────────────────────────────────────────────────
    const handleSubmit = () => {
        setSubmitting(true);
        router.post(route('screening.store'), {
            step_data: stepData,
            chat_history: chatHistory,
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
                    {step === 1 && <Step1 data={stepData} update={update} autofilled={autofilled} />}
                    {step === 2 && <Step2 data={stepData} update={update} />}
                    {step === 3 && <Step3 data={stepData} update={update} />}
                    {step === 4 && <Step4 data={stepData} update={update} />}
                    {step === 5 && <Step5 data={stepData} update={update} />}
                    {step === 6 && <Step6 data={stepData} update={update} />}
                    {step === 7 && <Step7 data={stepData} update={update} />}
                    {step === 8 && <Step8 data={stepData} toggleMulti={toggleMulti} />}
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

    const effectiveTotal = needsObesitasStep() ? 10 : 9;
    const displayStep = step > 5 && !needsObesitasStep() ? step - 1 : step;

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Skrining Klinis InDepth</h2>}>
            <Head title="Skrining Klinis" />

            <div className="py-10">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
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
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-30 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                ← Sebelumnya
                            </button>

                            {step < 10 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep(getNextStep(step))}
                                    disabled={!isStepValid()}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow"
                                >
                                    Selanjutnya →
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={!isStepValid() || submitting}
                                    className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow"
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
// STEP COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function InputField({ label, type = 'text', value, onChange, required }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}{required && ' *'}</label>
            <input
                type={type}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
        </div>
    );
}

function AutofillInputField({ label, type = 'text', value, onChange, required, autoFilled = false }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}{required && ' *'}</label>
                {autoFilled && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        otomatis
                    </span>
                )}
            </div>
            <input
                type={type}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${autoFilled
                    ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10'
                    : 'border-gray-200 dark:border-gray-600'
                    }`}
            />
        </div>
    );
}

function RadioGroup({ options, value, onChange }) {
    return (
        <div className="space-y-2">
            {options.map(opt => (
                <label
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-sm ${value === opt
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    <input type="radio" checked={value === opt} onChange={() => onChange(opt)} className="text-indigo-600 accent-indigo-600" />
                    {opt}
                </label>
            ))}
        </div>
    );
}

function CheckboxGroup({ options, values, toggle }) {
    const arr = Array.isArray(values) ? values : [];
    return (
        <div className="space-y-2">
            {options.map(opt => (
                <label
                    key={opt}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-sm ${arr.includes(opt)
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    <input type="checkbox" checked={arr.includes(opt)} onChange={() => toggle(opt)} className="accent-indigo-600 rounded" />
                    {opt}
                </label>
            ))}
        </div>
    );
}

// STEP 1 — Identitas
function Step1({ data, update, autofilled = {} }) {
    const under17 = data.usia && parseInt(data.usia) < 17;
    return (
        <div className="space-y-4">
            {/* Auto-fill notice */}
            {(autofilled.nama || autofilled.email || autofilled.wa || autofilled.gender || autofilled.usia) && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-xs text-green-700 dark:text-green-400">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Beberapa data telah diisi otomatis dari akun Anda. Silakan periksa dan ubah jika diperlukan.
                </div>
            )}

            <AutofillInputField
                label="Nama Lengkap"
                value={data.nama}
                onChange={v => update('nama', v)}
                autoFilled={autofilled.nama}
                required
            />
            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kelamin *</label>
                    {autofilled.gender && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            otomatis
                        </span>
                    )}
                </div>
                <div className="flex gap-3">
                    {['Laki-laki', 'Perempuan'].map(g => (
                        <button
                            key={g} type="button"
                            onClick={() => update('gender', g)}
                            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${data.gender === g
                                ? 'border-indigo-500 bg-indigo-500 text-white'
                                : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300'
                                }`}
                        >{g}</button>
                    ))}
                </div>
            </div>
            <AutofillInputField
                label="Usia"
                type="number"
                value={data.usia}
                onChange={v => update('usia', v)}
                autoFilled={autofilled.usia}
                required
            />
            {under17 && (
                <label className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 rounded-xl text-sm text-yellow-800 dark:text-yellow-400 cursor-pointer">
                    <input type="checkbox" checked={!!data.izin_wali} onChange={e => update('izin_wali', e.target.checked)} className="mt-0.5 accent-yellow-600" />
                    Saya mendapat izin dari orang tua / wali untuk mengikuti skrining ini *
                </label>
            )}
            <AutofillInputField
                label="Nomor WhatsApp"
                type="tel"
                value={data.wa}
                onChange={v => update('wa', v)}
                autoFilled={autofilled.wa}
                required
            />
            <AutofillInputField
                label="Email"
                type="email"
                value={data.email}
                onChange={v => update('email', v)}
                autoFilled={autofilled.email}
                required
            />
        </div>
    );
}

// STEP 2 — Masalah Utama
function Step2({ data, update }) {
    return <RadioGroup options={MASALAH_OPTIONS} value={data.masalah_utama} onChange={(opt) => update('masalah_utama', opt)} />;
}

// STEP 3 — Skala Gangguan
function Step3({ data, update }) {
    const skala = data.skala ?? 5;
    const getLabel = (s) => {
        if (s <= 3) return { text: 'Ringan', color: 'text-green-600' };
        if (s <= 6) return { text: 'Sedang', color: 'text-yellow-600' };
        if (s <= 8) return { text: 'Berat', color: 'text-orange-600' };
        return { text: 'Sangat Berat', color: 'text-red-600' };
    };
    const lbl = getLabel(skala);
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-sm text-gray-500 dark:text-gray-400">1 = Sangat Ringan</span>
                <span className={`text-2xl font-bold ${lbl.color}`}>{skala} <span className="text-base">— {lbl.text}</span></span>
                <span className="text-sm text-gray-500 dark:text-gray-400">10 = Sangat Parah</span>
            </div>
            <input
                type="range" min={1} max={10} value={skala}
                onChange={e => update('skala', parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <span key={n}>{n}</span>)}
            </div>
        </div>
    );
}

// STEP 4 — Durasi
function Step4({ data, update }) {
    return (
        <RadioGroup
            options={['< 1 bulan', '1–6 bulan', '6–12 bulan', '1–3 tahun', '> 3 tahun']}
            value={data.durasi}
            onChange={v => update('durasi', v)}
        />
    );
}

// STEP 5 — Obesitas (conditional)
function Step5({ data, update }) {
    return (
        <RadioGroup
            options={['0–10 kg', '10–20 kg', '> 20 kg']}
            value={data.obesitas_kg}
            onChange={v => update('obesitas_kg', v)}
        />
    );
}

// STEP 6 — Diagnosis
function Step6({ data, update }) {
    const hasDiagnosis = data.diagnosis && data.diagnosis !== 'Tidak pernah' && data.diagnosis !== 'Tidak pernah didiagnosis';
    return (
        <div className="space-y-4">
            <RadioGroup
                options={['Tidak pernah didiagnosis', 'Pernah — oleh Dokter Umum', 'Pernah — oleh Psikolog', 'Pernah — oleh Psikiater', 'Pernah — oleh Spesialis Lain']}
                value={data.diagnosis}
                onChange={v => update('diagnosis', v)}
            />
            {hasDiagnosis && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tuliskan hasil diagnosisnya (opsional)</label>
                    <textarea
                        rows={3}
                        value={data.hasil_diagnosis || ''}
                        onChange={e => update('hasil_diagnosis', e.target.value)}
                        placeholder="Contoh: Gangguan kecemasan umum (GAD)..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
                    />
                </div>
            )}
        </div>
    );
}

// STEP 7 — Status Perawatan
function Step7({ data, update }) {
    return (
        <RadioGroup
            options={['Ya, masih dalam perawatan', 'Tidak, sudah tidak dalam perawatan']}
            value={data.status_perawatan}
            onChange={v => update('status_perawatan', v)}
        />
    );
}

// STEP 8 — Upaya Sebelumnya
function Step8({ data, toggleMulti }) {
    return <CheckboxGroup options={USAHA_OPTIONS} values={data.usaha} toggle={(opt) => toggleMulti('usaha', opt)} />;
}

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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
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
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
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
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
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
