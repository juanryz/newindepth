import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useRef } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, Head, router } from "@inertiajs/react";
import axios from "axios";
import { P as ProgressBar, A as AiBubble, U as UserBubble, C as CrisisBanner, I as IdentitasStep, R as RadioGroup, M as MASALAH_OPTIONS, O as ObesitasStep, S as SkalaStep, D as DURASI_OPTIONS, a as DiagnosisStep, b as PERAWATAN_OPTIONS, c as CheckboxGroup, d as USAHA_OPTIONS, e as detectCrisis } from "./shared-BWLPB1vs.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function Screening() {
  const { prefill = {}, screeningResult } = usePage().props;
  const [step, setStep] = useState(1);
  const [stepData, setStepData] = useState({
    nama: prefill.nama || "",
    email: prefill.email || "",
    wa: prefill.wa || "",
    gender: prefill.gender || "",
    usia: prefill.usia || "",
    tinggi_badan: "",
    berat_badan: "",
    obesitas_mode: "calculate",
    obesitas_kg: "",
    tingkat_gangguan: "",
    masalah_detail_lainnya: "",
    gejala_detail_lainnya: ""
  });
  useEffect(() => {
    if (Object.keys(prefill).length > 0) {
      setStepData((prev) => ({
        ...prev,
        nama: prev.nama || prefill.nama || "",
        email: prev.email || prefill.email || "",
        wa: prev.wa || prefill.wa || "",
        gender: prev.gender || prefill.gender || "",
        usia: prev.usia || prefill.usia || ""
      }));
    }
  }, [prefill]);
  const [chatHistory, setChatHistory] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState({});
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const autofilled = useMemo(() => ({
    nama: !!prefill.nama,
    email: !!prefill.email,
    wa: !!prefill.wa,
    gender: !!prefill.gender,
    usia: !!prefill.usia
  }), [prefill]);
  const chatEndRef = useRef(null);
  const aiOpeners = {
    1: "Halo 👋 Selamat datang di InDepth Mental Wellness. Saya akan menemani Anda melalui proses skrining singkat ini. Mari kita mulai dengan data diri Anda.",
    2: "Terima kasih. Sekarang, tolong ceritakan — apa masalah utama yang ingin Anda atasi?",
    3: "Mari kita ukur kondisi fisik Anda. Berapa tinggi dan berat badan Anda saat ini? Ini membantu kami menentukan program yang paling efektif untuk Anda.",
    4: "Baik. Seberapa besar kondisi ini mengganggu kehidupan sehari-hari Anda? Geser slider di bawah sesuai perasaan Anda (1 = sangat ringan, 10 = sangat parah).",
    5: "Sudah berapa lama Anda mengalami kondisi ini?",
    6: "Apakah Anda pernah mendapatkan diagnosis dari profesional kesehatan sebelumnya?",
    7: "Apakah saat ini Anda masih dalam perawatan atau pengobatan?",
    8: "Upaya apa yang sudah pernah Anda lakukan untuk mengatasi kondisi ini?",
    9: "Sekarang, ceritakan kepada saya — apa yang paling Anda rasakan atau alami saat ini? Tidak perlu terstruktur, tulis saja apa yang ada di hati Anda.",
    10: "Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi bersama kami? Apa harapan Anda?"
  };
  useEffect(() => {
    if (aiOpeners[step] && !aiMessages[step]) {
      setTimeout(() => {
        setAiMessages((prev) => ({
          ...prev,
          [step]: [{ role: "assistant", content: aiOpeners[step] }]
        }));
      }, 300);
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);
  const update = (key, value) => {
    setStepData((prev) => ({ ...prev, [key]: value }));
  };
  const toggleMulti = (key, option) => {
    setStepData((prev) => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];
      return {
        ...prev,
        [key]: arr.includes(option) ? arr.filter((x) => x !== option) : [...arr, option]
      };
    });
  };
  const sendAiMessage = async (userText, stepKey) => {
    if (!userText.trim()) return;
    if (detectCrisis(userText)) setIsHighRisk(true);
    const currentHistory = chatHistory;
    const newUserMsg = { role: "user", content: userText };
    const updatedHistory = [...currentHistory, newUserMsg];
    setAiMessages((prev) => ({
      ...prev,
      [step]: [...prev[step] || [], newUserMsg]
    }));
    setAiTyping(true);
    try {
      const res = await axios.post(route("screening.chat"), {
        message: userText,
        history: updatedHistory
      });
      const aiReply = { role: "assistant", content: res.data.reply };
      const fullHistory = [...updatedHistory, aiReply];
      setChatHistory(fullHistory);
      if (res.data.is_high_risk) setIsHighRisk(true);
      setAiMessages((prev) => ({
        ...prev,
        [step]: [...prev[step] || [], aiReply]
      }));
    } catch {
      const fallback = { role: "assistant", content: "Terima kasih telah berbagi. Kami mendengar Anda." };
      setAiMessages((prev) => ({
        ...prev,
        [step]: [...prev[step] || [], fallback]
      }));
    } finally {
      setAiTyping(false);
    }
  };
  const needsObesitasStep = () => stepData.masalah_utama === "Obesitas";
  const isPengembanganDiri = () => stepData.masalah_utama === "Pengembangan diri";
  const isStepValid = () => {
    if (isPengembanganDiri() && step >= 3 && step <= 8) return true;
    switch (step) {
      case 1:
        return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email && (!(parseInt(stepData.usia) < 17) || stepData.izin_wali);
      case 2:
        return !!stepData.masalah_utama;
      case 3:
        if (stepData.obesitas_mode === "manual") {
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
    if (current === 2 && isPengembanganDiri()) return 9;
    if (current === 2 && !needsObesitasStep()) return 4;
    return current + 1;
  };
  const getPrevStep = (current) => {
    if (current === 9 && isPengembanganDiri()) return 2;
    if (current === 4 && !needsObesitasStep()) return 2;
    return current - 1;
  };
  const handleSubmit = () => {
    setSubmitting(true);
    let finalChatHistory = [];
    const msg9 = aiMessages[9] || [{ role: "assistant", content: aiOpeners[9] }];
    finalChatHistory.push(...msg9);
    if (msg9.length === 1 && stepData.detail_masalah) {
      finalChatHistory.push({ role: "user", content: stepData.detail_masalah });
    }
    const msg10 = aiMessages[10] || [{ role: "assistant", content: aiOpeners[10] }];
    finalChatHistory.push(...msg10);
    if (msg10.length === 1 && stepData.outcome) {
      finalChatHistory.push({ role: "user", content: stepData.outcome });
    }
    router.post(route("screening.store"), {
      step_data: stepData,
      chat_history: finalChatHistory
    }, {
      onError: () => setSubmitting(false)
    });
  };
  const renderStep = () => {
    const msgList = aiMessages[step] || [];
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      msgList.map(
        (msg, i) => msg.role === "assistant" ? /* @__PURE__ */ jsx(AiBubble, { text: msg.content }, i) : /* @__PURE__ */ jsx(UserBubble, { text: msg.content }, i)
      ),
      aiTyping && /* @__PURE__ */ jsx(AiBubble, { typing: true }),
      isHighRisk && /* @__PURE__ */ jsx(CrisisBanner, {}),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        step === 1 && /* @__PURE__ */ jsx(IdentitasStep, { data: stepData, update, autofilled }),
        step === 2 && /* @__PURE__ */ jsx(RadioGroup, { options: MASALAH_OPTIONS, value: stepData.masalah_utama, onChange: (opt) => update("masalah_utama", opt) }),
        step === 3 && /* @__PURE__ */ jsx(ObesitasStep, { data: stepData, update }),
        step === 4 && /* @__PURE__ */ jsx(SkalaStep, { data: stepData, update }),
        step === 5 && /* @__PURE__ */ jsx(RadioGroup, { options: DURASI_OPTIONS, value: stepData.durasi, onChange: (v) => update("durasi", v) }),
        step === 6 && /* @__PURE__ */ jsx(DiagnosisStep, { data: stepData, update }),
        step === 7 && /* @__PURE__ */ jsx(RadioGroup, { options: PERAWATAN_OPTIONS, value: stepData.status_perawatan, onChange: (v) => update("status_perawatan", v) }),
        step === 8 && /* @__PURE__ */ jsx(CheckboxGroup, { options: USAHA_OPTIONS, values: stepData.usaha, toggle: (opt) => toggleMulti("usaha", opt) }),
        step === 9 && /* @__PURE__ */ jsx(Step9, { data: stepData, update, onSendAi: (t) => sendAiMessage(t) }),
        step === 10 && /* @__PURE__ */ jsx(Step10, { data: stepData, update, onSendAi: (t) => sendAiMessage(t) })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: chatEndRef })
    ] });
  };
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  if (screeningResult) {
    const packageLabel = screeningResult.recommended_package ? screeningResult.recommended_package === "vip" ? "VIP" : screeningResult.recommended_package.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : null;
    return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Hasil Skrining Klinis" }), children: [
      /* @__PURE__ */ jsx(Head, { title: "Hasil Skrining" }),
      /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-green-600 dark:text-green-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Skrining Selesai" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Ringkasan hasil analisis kesehatan mental Anda" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 mb-10", children: /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2", children: "Rekomendasi Paket" }),
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300", children: packageLabel || "Hipnoterapi" })
        ] }) })
      ] }) }) }) })
    ] });
  }
  const effectiveTotal = isPengembanganDiri() ? 3 : needsObesitasStep() ? 10 : 9;
  const displayStep = isPengembanganDiri() ? step === 1 ? 1 : step === 2 ? 2 : 3 : step > 2 && !needsObesitasStep() ? step - 1 : step;
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Skrining Klinis InDepth" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Skrining Klinis" }),
    /* @__PURE__ */ jsx("div", { className: "py-6 min-h-[calc(100dvh-64px)] bg-gray-50/50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx(ProgressBar, { current: displayStep, total: effectiveTotal }),
      /* @__PURE__ */ jsx("div", { className: "min-h-[300px]", children: renderStep() }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between items-center border-t border-gray-100 dark:border-gray-700/50 pt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep(getPrevStep(step)),
            disabled: step === 1,
            className: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-30 hover:text-gray-900 dark:hover:text-white transition-colors touch-manipulation",
            children: "← Sebelumnya"
          }
        ),
        step < 10 ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setStep(getNextStep(step)),
            disabled: !isStepValid(),
            className: "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow touch-manipulation",
            children: "Selanjutnya →"
          }
        ) : /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleSubmit,
            disabled: !isStepValid() || submitting,
            className: "px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow touch-manipulation",
            children: submitting ? "Menyimpan..." : "✅ Selesai & Lihat Rekomendasi"
          }
        )
      ] })
    ] }) }) })
  ] });
}
function Step9({ data, update, onSendAi }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const handleStart = () => {
    if (!data.detail_masalah?.trim()) return;
    onSendAi(data.detail_masalah);
    setChatStarted(true);
  };
  const handleSend = () => {
    if (!followUp.trim()) return;
    onSendAi(followUp);
    setFollowUp("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    !chatStarted && /* @__PURE__ */ jsx(
      "textarea",
      {
        rows: 5,
        value: data.detail_masalah || "",
        onChange: (e) => update("detail_masalah", e.target.value),
        placeholder: "Ceritakan apa yang Anda rasakan, kapan bermula, dan bagaimana kondisi ini memengaruhi hidup Anda...",
        className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
      }
    ),
    !chatStarted && data.detail_masalah?.trim() && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700/50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl leading-none", children: "💬" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-indigo-800 dark:text-indigo-300", children: "Yuk ngobrol dengan Agent kami" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-600 dark:text-indigo-400 mt-0.5", children: "untuk memahami dirimu lebih lanjut" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleStart,
          className: "flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
            "Mulai Ngobrol"
          ]
        }
      )
    ] }),
    chatStarted && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-end pt-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: followUp,
          onChange: (e) => setFollowUp(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          },
          placeholder: "Ketik pesan lanjutan...",
          className: "flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleSend,
          disabled: !followUp.trim(),
          className: "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
        }
      )
    ] })
  ] });
}
function Step10({ data, update, onSendAi }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const handleStart = () => {
    if (!data.outcome?.trim()) return;
    onSendAi(data.outcome);
    setChatStarted(true);
  };
  const handleSend = () => {
    if (!followUp.trim()) return;
    onSendAi(followUp);
    setFollowUp("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    !chatStarted && /* @__PURE__ */ jsx(
      "textarea",
      {
        rows: 4,
        value: data.outcome || "",
        onChange: (e) => update("outcome", e.target.value),
        placeholder: "Apa yang ingin Anda capai setelah program terapi? Seperti apa kondisi ideal yang Anda impikan?",
        className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
      }
    ),
    !chatStarted && data.outcome?.trim() && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700/50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl leading-none", children: "🌟" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-purple-800 dark:text-purple-300", children: "Yuk ngobrol dengan Agent kami" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-purple-600 dark:text-purple-400 mt-0.5", children: "untuk memahami harapanmu lebih lanjut" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleStart,
          className: "flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors shadow",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
            "Mulai Ngobrol"
          ]
        }
      )
    ] }),
    chatStarted && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-end pt-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: followUp,
          onChange: (e) => setFollowUp(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          },
          placeholder: "Ketik pesan lanjutan...",
          className: "flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleSend,
          disabled: !followUp.trim(),
          className: "flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition-colors shadow",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
        }
      )
    ] })
  ] });
}
export {
  Screening as default
};
