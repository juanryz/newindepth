import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import Navbar from '@/Components/Navbar';
import {
    detectCrisis,
    MASALAH_OPTIONS_REGULER, MASALAH_OPTIONS_VIP, USAHA_OPTIONS, DURASI_OPTIONS,
    TINGKAT_GANGGUAN_OPTIONS, PERAWATAN_OPTIONS,
    StepIndicator, AiBubble, UserBubble, CrisisBanner, VipRecommendationBanner,
    RadioGroup, CheckboxGroup,
    SkalaStep, DiagnosisStep, EssayStep, IdentitasStep,
} from '@/Components/Screening/shared';

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PublicScreening() {
    const { packageType: initialPackage } = usePage().props;
    const [packageType] = useState(initialPackage || 'reguler');
    const isVip = packageType === 'vip';

    const [step, setStep] = useState(1);
    const [isHighRisk, setIsHighRisk] = useState(false);
    const [showVipModal, setShowVipModal] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [recommendedVip, setRecommendedVip] = useState(false);

    // AI chat state
    const [chatHistory, setChatHistory] = useState([]);
    const [aiTyping, setAiTyping] = useState(false);
    const [aiMessages, setAiMessages] = useState({}); // { step: [{ role, content }] }

    const [stepData, setStepData] = useState({
        nama: '', email: '', wa: '', gender: '', usia: '',
        masalah_utama: '', masalah_detail_lainnya: '',
        skala: 5, durasi: '', tingkat_gangguan: '',
        diagnosis: '', status_perawatan: '', usaha: [],
        detail_masalah: '', outcome: '',
        gejala_psikosomatis: '', gejala_detail_lainnya: '',
        tinggi_badan: '', berat_badan: '', obesitas_mode: 'calculate', obesitas_kg: '',
    });

    // ── Load carried-over data from reguler → vip switch ──────────────────────
    useEffect(() => {
        try {
            const carried = localStorage.getItem('indepth_screening_carryover');
            if (carried) {
                const parsed = JSON.parse(carried);
                localStorage.removeItem('indepth_screening_carryover');
                setStepData(prev => ({
                    ...prev,
                    nama: parsed.nama || prev.nama,
                    email: parsed.email || prev.email,
                    wa: parsed.wa || prev.wa,
                    gender: parsed.gender || prev.gender,
                    usia: parsed.usia || prev.usia,
                }));
            }
        } catch { }
    }, []);

    const chatEndRef = useRef(null);
    const totalSteps = 9;

    const update = (key, value) => setStepData(prev => ({ ...prev, [key]: value }));
    const toggleMulti = (key, option) => {
        setStepData(prev => {
            const arr = Array.isArray(prev[key]) ? prev[key] : [];
            return { ...prev, [key]: arr.includes(option) ? arr.filter(x => x !== option) : [...arr, option] };
        });
    };

    // AI openers per package
    const getOpener = () => {
        if (isVip) {
            const vipOpeners = {
                1: 'Halo 👋 Selamat datang di InDepth Mental Wellness. Kami akan membantu Anda melalui proses skrining VIP. Mari mulai dengan data diri Anda.',
                2: 'Ceritakan gejala fisik (psikosomatis) yang Anda alami — seperti sakit kepala, nyeri lambung, sesak napas, jantung berdebar, atau gejala lain yang muncul berkaitan dengan kondisi emosional Anda.',
                3: 'Sudah berapa lama Anda mengalami gejala-gejala psikosomatis ini?',
                4: 'Seberapa besar gejala psikosomatis ini mengganggu aktivitas sehari-hari Anda?',
                5: 'Apakah Anda pernah mendapatkan diagnosa dari profesional kesehatan terkait gejala ini?',
                6: 'Apakah saat ini Anda masih dalam perawatan atau pengobatan?',
                7: 'Upaya apa yang sudah pernah Anda lakukan untuk mengatasi gejala psikosomatis ini?',
                8: 'Ceritakan lebih lanjut — kapan gejala fisik ini biasanya muncul? Apakah ada hubungannya dengan emosi atau situasi tertentu?',
                9: 'Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi? Bagaimana kondisi ideal yang Anda harapkan?',
            };
            return vipOpeners[step] || '';
        }
        const regulerOpeners = {
            1: 'Halo 👋 Selamat datang di InDepth Mental Wellness. Saya akan menemani Anda melalui proses skrining singkat ini. Mari mulai dengan data diri Anda.',
            2: 'Terima kasih. Sekarang, tolong ceritakan — apakah Anda mengalami masalah pada:',
            3: 'Sudah berapa lama Anda mengalami kondisi ini?',
            4: 'Seberapa besar kondisi ini mengganggu aktivitas sehari-hari Anda?',
            5: 'Apakah Anda pernah mendapatkan diagnosis dari profesional kesehatan sebelumnya?',
            6: 'Apakah saat ini Anda masih dalam perawatan atau pengobatan?',
            7: 'Upaya apa yang sudah pernah Anda lakukan untuk mengatasi kondisi ini?',
            8: 'Ceritakan kepada saya — apa yang paling Anda rasakan atau pikirkan saat ini? Tidak perlu terstruktur, tulis saja apa yang ada di pikiran Anda.',
            9: 'Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi bersama kami?',
        };
        return regulerOpeners[step] || '';
    };

    // ── AI Chat (steps 8 & 9) ─────────────────────────────────────────────────
    const sendAiMessage = async (userText) => {
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
            const res = await axios.post('/screening/public/chat', {
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

    const isChatInitStep = step === 8 || step === 9 || (isVip && step === 8);

    // Show AI opener for chat steps
    useEffect(() => {
        if (isChatInitStep && !aiMessages[step]) {
            setTimeout(() => {
                setAiMessages(prev => ({
                    ...prev,
                    [step]: [{ role: 'assistant', content: getOpener() }],
                }));
            }, 300);
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [step]);

    // ── Validation ────────────────────────────────────────────────────────────
    const isStepValid = () => {
        if (isVip) {
            switch (step) {
                case 1: return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email;
                case 2: {
                    if (!stepData.gejala_psikosomatis) return false;
                    if (stepData.gejala_psikosomatis === 'Lainnya' && !stepData.gejala_detail_lainnya?.trim()) return false;
                    return true;
                }
                case 3: return !!stepData.durasi;
                case 4: return !!stepData.tingkat_gangguan;
                case 5: return !!stepData.diagnosis;
                case 6: return !!stepData.status_perawatan;
                case 7: return Array.isArray(stepData.usaha) && stepData.usaha.length > 0;
                case 8: return !!stepData.detail_masalah?.trim() || (aiMessages[8]?.length > 1);
                case 9: return !!stepData.outcome?.trim() || (aiMessages[9]?.length > 1);
                default: return true;
            }
        }
        // Reguler
        switch (step) {
            case 1: return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email;
            case 2: return !!stepData.masalah_utama;
            case 3: return !!stepData.durasi;
            case 4: return !!stepData.tingkat_gangguan;
            case 5: return !!stepData.diagnosis;
            case 6: return !!stepData.status_perawatan;
            case 7: return Array.isArray(stepData.usaha) && stepData.usaha.length > 0;
            case 8: return !!stepData.detail_masalah?.trim() || (aiMessages[8]?.length > 1);
            case 9: return !!stepData.outcome?.trim() || (aiMessages[9]?.length > 1);
            default: return true;
        }
    };

    // Check if user selected Keluhan Fisik option (needs VIP)
    const needsVipRedirect = !isVip && stepData.masalah_utama.startsWith('Keluhan Fisik');

    const handleNextStep = () => {
        if (!isVip && step === 2 && needsVipRedirect) {
            setShowVipModal(true);
            return;
        }
        setStep(s => s + 1);
    };

    // ── Determine if VIP is recommended for reguler user ──────────────────────
    const checkVipRecommendation = () => {
        if (isVip) return false; // already VIP

        const tingkat = stepData.tingkat_gangguan || '';
        const durasi = stepData.durasi || '';
        const skala = stepData.skala ?? 5;

        // Recommend VIP if severity is high
        if (tingkat.startsWith('Berat') || tingkat.startsWith('Sangat Berat')) return true;
        if (skala >= 8 && ['1–3 tahun', '> 3 tahun'].includes(durasi)) return true;

        return false;
    };

    // ── Save to localStorage & redirect ───────────────────────────────────────
    const handleClickFinish = () => {
        saveAndRedirect();
    };

    const saveAndRedirect = () => {
        const allText = (stepData.detail_masalah || '') + ' ' + (stepData.outcome || '') + ' ' + (stepData.gejala_psikosomatis || '');
        const highRisk = detectCrisis(allText);
        const shouldRecommendVip = checkVipRecommendation();

        const screeningData = {
            package_type: packageType, // tetap paket awal, TIDAK berubah
            recommended_vip: shouldRecommendVip,
            step_data: stepData,
            chat_history: chatHistory,
            is_high_risk: highRisk || isHighRisk,
            completed_at: new Date().toISOString(),
        };

        localStorage.setItem('indepth_public_screening', JSON.stringify(screeningData));
        setRecommendedVip(shouldRecommendVip);
        setIsCompleted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Helper: get severity info text ────────────────────────────────────────
    const getSeverityInfoText = () => {
        const parts = [];
        if (stepData.tingkat_gangguan) parts.push(stepData.tingkat_gangguan.split(' — ')[0]);
        if (stepData.durasi) parts.push(`sudah berlangsung ${stepData.durasi}`);
        return parts.join(', ') || null;
    };

    // ── Step Rendering ────────────────────────────────────────────────────────
    const renderStepContent = () => {
        // STEP 1: Identitas (both packages)
        if (step === 1) return <IdentitasStep data={stepData} update={update} />;

        // ── REGULER STEPS ──────────────────────────────────────────────────────
        if (!isVip) {
            if (step === 2) return <RadioGroup options={MASALAH_OPTIONS_REGULER} value={stepData.masalah_utama} onChange={opt => update('masalah_utama', opt)} />;
            if (step === 3) return <RadioGroup options={DURASI_OPTIONS} value={stepData.durasi} onChange={v => update('durasi', v)} />;
            if (step === 4) return <RadioGroup options={TINGKAT_GANGGUAN_OPTIONS} value={stepData.tingkat_gangguan} onChange={v => update('tingkat_gangguan', v)} />;
            if (step === 5) return <DiagnosisStep data={stepData} update={update} />;
            if (step === 6) return <RadioGroup options={PERAWATAN_OPTIONS} value={stepData.status_perawatan} onChange={v => update('status_perawatan', v)} />;
            if (step === 7) return <CheckboxGroup options={USAHA_OPTIONS} values={stepData.usaha} toggle={opt => toggleMulti('usaha', opt)} />;
            if (step === 8) return <ChatEssayStep data={stepData} dataKey="detail_masalah" update={update} onSendAi={sendAiMessage} placeholder="Ceritakan lebih detail tentang apa yang Anda alami — kapan mulai muncul, dan bagaimana dampaknya di kehidupan sehari-hari..." color="indigo" icon="💬" subtitle="untuk memahami kondisi Anda lebih lanjut" />;
            if (step === 9) return <ChatEssayStep data={stepData} dataKey="outcome" update={update} onSendAi={sendAiMessage} placeholder="Apa yang ingin Anda capai setelah program terapi? Seperti apa kondisi ideal yang Anda impikan?" color="purple" icon="🌟" subtitle="untuk memahami harapanmu lebih lanjut" />;
        }

        // ── VIP STEPS (fokus: psikosomatis) ───────────────────────────────────
        if (isVip) {
            if (step === 2) return (
                <div className="space-y-3">
                    <RadioGroup options={MASALAH_OPTIONS_VIP} value={stepData.gejala_psikosomatis} onChange={opt => update('gejala_psikosomatis', opt)} />
                    {stepData.gejala_psikosomatis === 'Lainnya' && (
                        <textarea
                            rows={3}
                            value={stepData.gejala_detail_lainnya || ''}
                            onChange={e => update('gejala_detail_lainnya', e.target.value)}
                            placeholder="Jelaskan gejala fisik (psikosomatis) yang Anda alami..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
                        />
                    )}
                </div>
            );
            if (step === 3) return <RadioGroup options={DURASI_OPTIONS} value={stepData.durasi} onChange={v => update('durasi', v)} />;
            if (step === 4) return <RadioGroup options={TINGKAT_GANGGUAN_OPTIONS} value={stepData.tingkat_gangguan} onChange={v => update('tingkat_gangguan', v)} />;
            if (step === 5) return <DiagnosisStep data={stepData} update={update} />;
            if (step === 6) return <RadioGroup options={PERAWATAN_OPTIONS} value={stepData.status_perawatan} onChange={v => update('status_perawatan', v)} />;
            if (step === 7) return <CheckboxGroup options={USAHA_OPTIONS} values={stepData.usaha} toggle={opt => toggleMulti('usaha', opt)} />;
            if (step === 8) return <ChatEssayStep data={stepData} dataKey="detail_masalah" update={update} onSendAi={sendAiMessage} placeholder="Ceritakan lebih detail — kapan gejala fisik ini biasanya muncul? Apakah ada hubungannya dengan emosi atau situasi tertentu?" color="indigo" icon="💬" subtitle="untuk memahami kondisi psikosomatis Anda lebih lanjut" />;
            if (step === 9) return <ChatEssayStep data={stepData} dataKey="outcome" update={update} onSendAi={sendAiMessage} placeholder="Apa yang ingin Anda capai setelah program terapi? Bagaimana kondisi ideal yang Anda harapkan?" color="purple" icon="🌟" subtitle="untuk memahami harapanmu lebih lanjut" />;
        }

        return null;
    };

    const isLastStep = step === totalSteps;
    const isChatStep = step === 8 || step === 9;

    return (
        <>
            <Head title={`Skrining ${isVip ? 'VIP' : 'Reguler'} — InDepth`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
                <Navbar auth={{}} active="" isAuthPage={true} />

                <div className="max-w-xl mx-auto px-4 pt-32 pb-10">
                    {/* Package badge */}
                    <div className="mb-4 flex justify-center">
                        <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${isVip ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'}`}>
                            Skrining {isVip ? 'VIP' : 'Reguler'}
                        </span>
                    </div>

                    {isCompleted ? (
                        /* ── Completion Card ── */
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Skrining Selesai! 🎉</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                Terima kasih sudah mengisi skrining dengan jujur. Jawaban Anda sudah tersimpan.
                            </p>

                            {/* VIP Recommendation Banner — only shown if reguler user needs VIP */}
                            {recommendedVip && !isVip && (
                                <VipRecommendationBanner
                                    masalahUtama={stepData.masalah_utama}
                                    severityInfo={getSeverityInfoText()}
                                />
                            )}

                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-xl mb-6 text-left">
                                <div className="flex items-start gap-3">
                                    <span className="text-xl mt-0.5">📋</span>
                                    <div>
                                        <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">
                                            Ingin melihat hasil skrining Anda?
                                        </p>
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 leading-relaxed">
                                            Hasil analisis skrining akan tersedia di dashboard setelah Anda login atau membuat akun baru. Data skrining Anda sudah disimpan dan akan otomatis terhubung setelah masuk.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={`/register?package=${packageType}&from_screening=1`}
                                    className="flex-1 flex items-center justify-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg">
                                    Daftar Akun Baru
                                </Link>
                                <Link
                                    href={`/login?from_screening=1&package=${packageType}`}
                                    className="flex-1 flex items-center justify-center py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Sudah punya akun? Masuk
                                </Link>
                            </div>

                            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                                Data skrining disimpan sementara di browser ini selama 24 jam.
                            </p>
                        </div>
                    ) : (
                        /* ── Screening Form ── */
                        <>
                            <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-8">
                                <StepIndicator current={step} total={totalSteps} />

                                {isChatStep ? (
                                    <div className="space-y-4">
                                        {(aiMessages[step] || []).map((msg, i) =>
                                            msg.role === 'assistant'
                                                ? <AiBubble key={i} text={msg.content} />
                                                : <UserBubble key={i} text={msg.content} />
                                        )}
                                        {aiTyping && <AiBubble typing />}
                                    </div>
                                ) : (
                                    <AiBubble text={getOpener()} />
                                )}
                                {isHighRisk && <CrisisBanner />}

                                <div className="mt-4">
                                    {renderStepContent()}
                                </div>

                                <div ref={chatEndRef} />

                                <div className="mt-8 flex justify-between items-center border-t border-gray-100 dark:border-gray-700/50 pt-6">
                                    <button type="button" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-30 hover:text-gray-900 dark:hover:text-white transition-colors">
                                        ← Sebelumnya
                                    </button>

                                    {!isLastStep ? (
                                        <button type="button" onClick={handleNextStep} disabled={!isStepValid()}
                                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow">
                                            Selanjutnya →
                                        </button>
                                    ) : (
                                        <button type="button" onClick={handleClickFinish} disabled={!isStepValid()}
                                            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow">
                                            ✅ Selesai
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    <strong>ℹ️ Informasi:</strong> Jawaban Anda akan disimpan sementara di browser ini. Setelah selesai, Anda akan diminta untuk membuat akun agar data dapat tersimpan secara permanen.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── VIP Recommendation Popup (Psikosomatis) ── */}
            {showVipModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <span className="text-3xl">💡</span>
                        </div>
                        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">Rekomendasi untuk Anda</h3>
                        <p className="text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            Psikosomatis, bukan ranah layanan Reguler dan membutuhkan penanganan VIP.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                // Simpan data identitas ke localStorage agar terbawa ke VIP
                                const carryover = {
                                    nama: stepData.nama,
                                    email: stepData.email,
                                    wa: stepData.wa,
                                    gender: stepData.gender,
                                    usia: stepData.usia,
                                };
                                localStorage.setItem('indepth_screening_carryover', JSON.stringify(carryover));
                                window.location.href = '/screening/public?package=vip';
                            }}
                            className="flex items-center justify-center w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Silakan Pindah ke Paket VIP →
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowVipModal(false)}
                            className="w-full mt-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChatEssayStep — Essay with "Mulai Ngobrol" AI chat (like Clinic Step9/Step10)
// ─────────────────────────────────────────────────────────────────────────────
function ChatEssayStep({ data, dataKey, update, onSendAi, placeholder, color = 'indigo', icon = '💬', subtitle = '' }) {
    const [chatStarted, setChatStarted] = useState(false);
    const [followUp, setFollowUp] = useState('');

    const value = data[dataKey] || '';

    const handleStart = () => {
        if (!value.trim()) return;
        onSendAi(value);
        setChatStarted(true);
    };

    const handleSend = () => {
        if (!followUp.trim()) return;
        onSendAi(followUp);
        setFollowUp('');
    };

    const btnBg = color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700';
    const cardBg = color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700/50';
    const titleColor = color === 'purple' ? 'text-purple-800 dark:text-purple-300' : 'text-indigo-800 dark:text-indigo-300';
    const subColor = color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-indigo-600 dark:text-indigo-400';
    const inputRing = color === 'purple' ? 'focus:ring-purple-400' : 'focus:ring-indigo-400';
    const sendBtnBg = color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700';

    return (
        <div className="space-y-3">
            {!chatStarted && (
                <textarea
                    rows={5}
                    value={value}
                    onChange={e => update(dataKey, e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 ${inputRing} resize-none transition`}
                />
            )}

            {/* Invitation card — shown before chat starts */}
            {!chatStarted && value.trim() && (
                <div className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border ${cardBg}`}>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">{icon}</span>
                        <div>
                            <p className={`text-sm font-semibold ${titleColor}`}>Yuk ngobrol dengan Agent kami</p>
                            <p className={`text-xs ${subColor} mt-0.5`}>{subtitle}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleStart}
                        className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 ${btnBg} text-white text-sm font-semibold rounded-xl transition-colors shadow`}
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
                        className={`flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 ${inputRing} transition`}
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!followUp.trim()}
                        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${sendBtnBg} disabled:opacity-40 text-white rounded-xl transition-colors shadow`}
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
