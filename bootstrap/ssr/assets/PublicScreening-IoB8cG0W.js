import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import axios from "axios";
import { T as ThemeToggle } from "./ThemeToggle-SHr-61ed.js";
import { f as StepIndicator, A as AiBubble, U as UserBubble, C as CrisisBanner, e as detectCrisis, I as IdentitasStep, R as RadioGroup, g as MASALAH_OPTIONS_REGULER, S as SkalaStep, D as DURASI_OPTIONS, a as DiagnosisStep, b as PERAWATAN_OPTIONS, c as CheckboxGroup, d as USAHA_OPTIONS } from "./shared-DNq1YJS6.js";
function PublicScreening() {
  const { packageType: initialPackage } = usePage().props;
  const [packageType] = useState(initialPackage || "reguler");
  const isVip = packageType === "vip";
  const [step, setStep] = useState(1);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState({});
  const [stepData, setStepData] = useState({
    nama: "",
    email: "",
    wa: "",
    gender: "",
    usia: "",
    masalah_utama: "",
    skala: 5,
    durasi: "",
    diagnosis: "",
    status_perawatan: "",
    usaha: [],
    detail_masalah: "",
    outcome: "",
    gejala_psikosomatis: "",
    tinggi_badan: "",
    berat_badan: "",
    obesitas_mode: "calculate",
    obesitas_kg: ""
  });
  const chatEndRef = useRef(null);
  const totalSteps = 9;
  const update = (key, value) => setStepData((prev) => ({ ...prev, [key]: value }));
  const toggleMulti = (key, option) => {
    setStepData((prev) => {
      const arr = Array.isArray(prev[key]) ? prev[key] : [];
      return { ...prev, [key]: arr.includes(option) ? arr.filter((x) => x !== option) : [...arr, option] };
    });
  };
  const getOpener = () => {
    if (isVip) {
      const vipOpeners = {
        1: "Halo 👋 Selamat datang di InDepth Mental Wellness. Kami akan membantu Anda melalui proses skrining VIP. Mari mulai dengan data diri Anda.",
        2: "Ceritakan gejala fisik yang Anda rasakan — seperti sakit kepala, nyeri lambung, sesak napas, atau gejala lain yang muncul berkaitan dengan kondisi emosional Anda.",
        3: "Seberapa besar gejala ini mengganggu kehidupan sehari-hari Anda?",
        4: "Sudah berapa lama Anda mengalami gejala ini?",
        5: "Apakah Anda pernah mendapatkan diagnosis dari profesional kesehatan?",
        6: "Apakah saat ini Anda masih dalam perawatan atau pengobatan?",
        7: "Upaya apa yang sudah pernah Anda lakukan untuk mengatasi kondisi ini?",
        8: "Ceritakan lebih lanjut — apa yang paling Anda rasakan saat ini? Tulis saja apa yang ada di hati Anda.",
        9: "Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi bersama kami?"
      };
      return vipOpeners[step] || "";
    }
    const regulerOpeners = {
      1: "Halo 👋 Selamat datang di InDepth Mental Wellness. Saya akan menemani Anda melalui proses skrining singkat ini. Mari mulai dengan data diri Anda.",
      2: "Terima kasih. Sekarang, tolong ceritakan — apa masalah utama yang ingin Anda atasi?",
      3: "Seberapa besar kondisi ini mengganggu kehidupan sehari-hari Anda? Geser slider sesuai perasaan Anda (1 = sangat ringan, 10 = sangat parah).",
      4: "Sudah berapa lama Anda mengalami kondisi ini?",
      5: "Apakah Anda pernah mendapatkan diagnosis dari profesional kesehatan sebelumnya?",
      6: "Apakah saat ini Anda masih dalam perawatan atau pengobatan?",
      7: "Upaya apa yang sudah pernah Anda lakukan untuk mengatasi kondisi ini?",
      8: "Ceritakan kepada saya — apa yang paling Anda rasakan atau alami saat ini? Tidak perlu terstruktur, tulis saja apa yang ada di hati Anda.",
      9: "Hampir selesai 🌟 Apa yang ingin Anda capai setelah menjalani program terapi bersama kami?"
    };
    return regulerOpeners[step] || "";
  };
  const sendAiMessage = async (userText) => {
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
      const res = await axios.post("/screening/public/chat", {
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
  const isChatInitStep = step === 8 || step === 9 || isVip && step === 2;
  useEffect(() => {
    if (isChatInitStep && !aiMessages[step]) {
      setTimeout(() => {
        setAiMessages((prev) => ({
          ...prev,
          [step]: [{ role: "assistant", content: getOpener() }]
        }));
      }, 300);
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);
  const isStepValid = () => {
    if (isVip) {
      switch (step) {
        case 1:
          return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email;
        case 2:
          return !!stepData.gejala_psikosomatis?.trim();
        case 3:
          return stepData.skala != null;
        case 4:
          return !!stepData.durasi;
        case 5:
          return !!stepData.diagnosis;
        case 6:
          return !!stepData.status_perawatan;
        case 7:
          return Array.isArray(stepData.usaha) && stepData.usaha.length > 0;
        case 8:
          return !!stepData.detail_masalah?.trim();
        case 9:
          return !!stepData.outcome?.trim();
        default:
          return true;
      }
    }
    switch (step) {
      case 1:
        return stepData.nama && stepData.gender && stepData.usia && stepData.wa && stepData.email;
      case 2:
        return !!stepData.masalah_utama;
      case 3:
        return stepData.skala != null;
      case 4:
        return !!stepData.durasi;
      case 5:
        return !!stepData.diagnosis;
      case 6:
        return !!stepData.status_perawatan;
      case 7:
        return Array.isArray(stepData.usaha) && stepData.usaha.length > 0;
      case 8:
        return !!stepData.detail_masalah?.trim();
      case 9:
        return !!stepData.outcome?.trim();
      default:
        return true;
    }
  };
  const needsVipRedirect = !isVip && stepData.masalah_utama.startsWith("Keluhan Fisik");
  const handleClickFinish = () => {
    if (needsVipRedirect) {
      setShowVipModal(true);
      return;
    }
    saveAndRedirect();
  };
  const saveAndRedirect = () => {
    const allText = (stepData.detail_masalah || "") + " " + (stepData.outcome || "") + " " + (stepData.gejala_psikosomatis || "");
    const highRisk = detectCrisis(allText);
    const screeningData = {
      package_type: packageType,
      step_data: stepData,
      chat_history: chatHistory,
      is_high_risk: highRisk || isHighRisk,
      completed_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem("indepth_public_screening", JSON.stringify(screeningData));
    window.location.href = `/register?package=${packageType}&from_screening=1`;
  };
  const renderStepContent = () => {
    if (step === 1) return /* @__PURE__ */ jsx(IdentitasStep, { data: stepData, update });
    if (!isVip) {
      if (step === 2) return /* @__PURE__ */ jsx(RadioGroup, { options: MASALAH_OPTIONS_REGULER, value: stepData.masalah_utama, onChange: (opt) => update("masalah_utama", opt) });
      if (step === 3) return /* @__PURE__ */ jsx(SkalaStep, { data: stepData, update });
      if (step === 4) return /* @__PURE__ */ jsx(RadioGroup, { options: DURASI_OPTIONS, value: stepData.durasi, onChange: (v) => update("durasi", v) });
      if (step === 5) return /* @__PURE__ */ jsx(DiagnosisStep, { data: stepData, update });
      if (step === 6) return /* @__PURE__ */ jsx(RadioGroup, { options: PERAWATAN_OPTIONS, value: stepData.status_perawatan, onChange: (v) => update("status_perawatan", v) });
      if (step === 7) return /* @__PURE__ */ jsx(CheckboxGroup, { options: USAHA_OPTIONS, values: stepData.usaha, toggle: (opt) => toggleMulti("usaha", opt) });
      if (step === 8) return /* @__PURE__ */ jsx(ChatEssayStep, { data: stepData, dataKey: "detail_masalah", update, onSendAi: sendAiMessage, placeholder: "Ceritakan apa yang Anda rasakan, kapan bermula, dan bagaimana kondisi ini memengaruhi hidup Anda...", color: "indigo", icon: "💬", subtitle: "untuk memahami dirimu lebih lanjut" });
      if (step === 9) return /* @__PURE__ */ jsx(ChatEssayStep, { data: stepData, dataKey: "outcome", update, onSendAi: sendAiMessage, placeholder: "Apa yang ingin Anda capai setelah program terapi? Seperti apa kondisi ideal yang Anda impikan?", color: "purple", icon: "🌟", subtitle: "untuk memahami harapanmu lebih lanjut" });
    }
    if (isVip) {
      if (step === 2) return /* @__PURE__ */ jsx(ChatEssayStep, { data: stepData, dataKey: "gejala_psikosomatis", update, onSendAi: sendAiMessage, placeholder: "Ceritakan gejala fisik yang Anda alami — seperti sakit kepala, nyeri lambung, sesak napas, dll...", color: "indigo", icon: "💬", subtitle: "untuk memahami kondisi fisik Anda lebih lanjut" });
      if (step === 3) return /* @__PURE__ */ jsx(SkalaStep, { data: stepData, update });
      if (step === 4) return /* @__PURE__ */ jsx(RadioGroup, { options: DURASI_OPTIONS, value: stepData.durasi, onChange: (v) => update("durasi", v) });
      if (step === 5) return /* @__PURE__ */ jsx(DiagnosisStep, { data: stepData, update });
      if (step === 6) return /* @__PURE__ */ jsx(RadioGroup, { options: PERAWATAN_OPTIONS, value: stepData.status_perawatan, onChange: (v) => update("status_perawatan", v) });
      if (step === 7) return /* @__PURE__ */ jsx(CheckboxGroup, { options: USAHA_OPTIONS, values: stepData.usaha, toggle: (opt) => toggleMulti("usaha", opt) });
      if (step === 8) return /* @__PURE__ */ jsx(ChatEssayStep, { data: stepData, dataKey: "detail_masalah", update, onSendAi: sendAiMessage, placeholder: "Ceritakan apa yang Anda rasakan saat ini...", color: "indigo", icon: "💬", subtitle: "untuk memahami dirimu lebih lanjut" });
      if (step === 9) return /* @__PURE__ */ jsx(ChatEssayStep, { data: stepData, dataKey: "outcome", update, onSendAi: sendAiMessage, placeholder: "Apa yang ingin Anda capai setelah program terapi?", color: "purple", icon: "🌟", subtitle: "untuk memahami harapanmu lebih lanjut" });
    }
    return null;
  };
  const isLastStep = step === totalSteps;
  const isChatStep = step === 8 || step === 9 || isVip && step === 2;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Skrining ${isVip ? "VIP" : "Reguler"} — InDepth` }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto px-4 py-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: "/images/logo-color.png", alt: "InDepth", className: "h-8 w-auto" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: `text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isVip ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"}`, children: isVip ? "VIP" : "Reguler" }),
          /* @__PURE__ */ jsx(ThemeToggle, {})
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto px-4 py-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx(StepIndicator, { current: step, total: totalSteps }),
          isChatStep ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            (aiMessages[step] || []).map(
              (msg, i) => msg.role === "assistant" ? /* @__PURE__ */ jsx(AiBubble, { text: msg.content }, i) : /* @__PURE__ */ jsx(UserBubble, { text: msg.content }, i)
            ),
            aiTyping && /* @__PURE__ */ jsx(AiBubble, { typing: true })
          ] }) : /* @__PURE__ */ jsx(AiBubble, { text: getOpener() }),
          isHighRisk && /* @__PURE__ */ jsx(CrisisBanner, {}),
          /* @__PURE__ */ jsx("div", { className: "mt-4 min-h-[250px]", children: renderStepContent() }),
          /* @__PURE__ */ jsx("div", { ref: chatEndRef }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-between items-center border-t border-gray-100 dark:border-gray-700/50 pt-6", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep((s) => Math.max(1, s - 1)),
                disabled: step === 1,
                className: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 disabled:opacity-30 hover:text-gray-900 dark:hover:text-white transition-colors",
                children: "← Sebelumnya"
              }
            ),
            !isLastStep ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep((s) => s + 1),
                disabled: !isStepValid(),
                className: "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow",
                children: "Selanjutnya →"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleClickFinish,
                disabled: !isStepValid(),
                className: "px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-xl text-sm transition-colors shadow",
                children: "✅ Selesai & Daftar Akun"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-blue-700 dark:text-blue-300", children: [
          /* @__PURE__ */ jsx("strong", { children: "ℹ️ Informasi:" }),
          " Jawaban Anda akan disimpan sementara di browser ini. Setelah selesai, Anda akan diminta untuk membuat akun agar data dapat tersimpan secara permanen."
        ] }) })
      ] })
    ] }),
    showVipModal && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm", onClick: () => setShowVipModal(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-[fadeIn_0.2s_ease-out]", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowVipModal(false),
            className: "absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-3xl", children: "💡" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-center text-gray-900 dark:text-white mb-2", children: "Rekomendasi untuk Anda" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed mb-6", children: [
          "Berdasarkan jawaban Anda, keluhan fisik yang berkaitan dengan stres memerlukan pendekatan yang lebih mendalam. Kami merekomendasikan ",
          /* @__PURE__ */ jsx("strong", { className: "text-amber-700 dark:text-amber-400", children: "Paket VIP" }),
          " agar hasilnya lebih optimal."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/screening/public?package=vip",
              className: "flex items-center justify-center gap-2 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity shadow-lg",
              children: "Pindah ke Paket VIP →"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setShowVipModal(false);
                saveAndRedirect();
              },
              className: "flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
              children: "Tetap lanjut dengan Reguler"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ChatEssayStep({ data, dataKey, update, onSendAi, placeholder, color = "indigo", icon = "💬", subtitle = "" }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const value = data[dataKey] || "";
  const handleStart = () => {
    if (!value.trim()) return;
    onSendAi(value);
    setChatStarted(true);
  };
  const handleSend = () => {
    if (!followUp.trim()) return;
    onSendAi(followUp);
    setFollowUp("");
  };
  const btnBg = color === "purple" ? "bg-purple-600 hover:bg-purple-700" : "bg-indigo-600 hover:bg-indigo-700";
  const cardBg = color === "purple" ? "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50" : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700/50";
  const titleColor = color === "purple" ? "text-purple-800 dark:text-purple-300" : "text-indigo-800 dark:text-indigo-300";
  const subColor = color === "purple" ? "text-purple-600 dark:text-purple-400" : "text-indigo-600 dark:text-indigo-400";
  const inputRing = color === "purple" ? "focus:ring-purple-400" : "focus:ring-indigo-400";
  const sendBtnBg = color === "purple" ? "bg-purple-600 hover:bg-purple-700" : "bg-indigo-600 hover:bg-indigo-700";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    !chatStarted && /* @__PURE__ */ jsx(
      "textarea",
      {
        rows: 5,
        value,
        onChange: (e) => update(dataKey, e.target.value),
        placeholder,
        className: `w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 ${inputRing} resize-none transition`
      }
    ),
    !chatStarted && value.trim() && /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border ${cardBg}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl leading-none", children: icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: `text-sm font-semibold ${titleColor}`, children: "Yuk ngobrol dengan Agent kami" }),
          /* @__PURE__ */ jsx("p", { className: `text-xs ${subColor} mt-0.5`, children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleStart,
          className: `flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 ${btnBg} text-white text-sm font-semibold rounded-xl transition-colors shadow`,
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
          className: `flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 ${inputRing} transition`
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleSend,
          disabled: !followUp.trim(),
          className: `flex-shrink-0 w-10 h-10 flex items-center justify-center ${sendBtnBg} disabled:opacity-40 text-white rounded-xl transition-colors shadow`,
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
        }
      )
    ] })
  ] });
}
export {
  PublicScreening as default
};
