import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DqAHi6I1.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Video, Zap, FileText, Shield, MessageCircle, CheckSquare, Info, Heart, ExternalLink, Activity, CheckCircle2, AlertCircle, Save, Clock, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const CHECKLIST_SECTIONS = [
  {
    key: "pre_talk",
    title: "Pre Talk",
    icon: "🗣️",
    fields: [
      { key: "problem_name", label: "Apa nama masalah klien", type: "text" },
      { key: "problem_score", label: "Angka gangguannya", type: "score" },
      { key: "has_exception", label: "Adakah pengecualian", type: "yesno" },
      { key: "exception_detail", label: "Jika ada, apa?", type: "text", condition: "has_exception" },
      { key: "desired_outcome", label: "Apa outcome yang diinginkan?", type: "text" },
      { key: "outcome_indicator", label: "Apa indikator tercapainya outcome?", type: "text" }
    ]
  },
  {
    key: "induction",
    title: "Induksi",
    icon: "🌀",
    fields: [
      { key: "induction_type", label: "Tipe Induksi", type: "multi", options: ["Rapid", "Direct", "Indirect", "Waking"] }
    ]
  },
  {
    key: "deepening",
    title: "Deepening",
    icon: "🔽",
    fields: [
      { key: "deepening_technique", label: "Teknik", type: "multi", options: ["Tekanan", "Napas", "Hitungan", "Fraksionasi", "Visualisasi", "Isolasi"] }
    ]
  },
  {
    key: "abreaction",
    title: "Abreaksi",
    icon: "💧",
    fields: [{ key: "has_abreaction", label: "Abreaksi", type: "yesno" }]
  },
  {
    key: "core_method",
    title: "Metode Inti",
    icon: "🧠",
    fields: [
      { key: "core_method_type", label: "Metode", type: "multi", options: ["InDepth Solution", "Lainnya"] },
      { key: "other_method", label: "Sebutkan metode lainnya", type: "text", condition: "core_method_type_Lainnya" }
    ]
  },
  {
    key: "suggestion",
    title: "Sugesti",
    icon: "💬",
    fields: [
      { key: "suggestion_type", label: "Tipe Sugesti", type: "multi", options: ["Direct Drive", "Story Telling", "Metaphor"] }
    ]
  },
  {
    key: "timeline",
    title: "Timeline",
    icon: "⏳",
    fields: [
      { key: "timeline_type", label: "Timeline", type: "multi", options: ["Regresi", "Future Pacing", "Mix"] }
    ]
  },
  {
    key: "hypnosis_seal",
    title: "Segel Hipnotis",
    icon: "🔒",
    fields: [{ key: "has_seal", label: "Segel Hipnotis", type: "yesno" }]
  },
  {
    key: "emerging",
    title: "Emerging",
    icon: "🔄",
    fields: [
      { key: "emerging_type", label: "Tipe Emerging", type: "multi", options: ["Hitungan Maju", "Hitungan Mundur"] }
    ]
  },
  {
    key: "result_test",
    title: "Pengujian Hasil",
    icon: "✅",
    fields: [{ key: "has_result_test", label: "Pengujian Hasil", type: "yesno" }]
  },
  {
    key: "final_score",
    title: "Angka Masalah Akhir",
    icon: "📊",
    fields: [{ key: "final_problem_score", label: "Angka Masalah Akhir", type: "score" }]
  }
];
function ActiveSession({ booking, patient }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    recording_link: booking.recording_link || "",
    therapist_notes: booking.therapist_notes || "",
    patient_visible_notes: booking.patient_visible_notes || "",
    completion_outcome: booking.completion_outcome || "",
    session_checklist: booking.session_checklist || {}
  });
  useEffect(() => {
    if (!isLoaded) {
      const draft = localStorage.getItem(`session_draft_${booking.id}`);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setData({
            ...data,
            ...parsed,
            recording_link: parsed.recording_link || data.recording_link,
            therapist_notes: parsed.therapist_notes || data.therapist_notes,
            patient_visible_notes: parsed.patient_visible_notes || data.patient_visible_notes,
            session_checklist: parsed.session_checklist || data.session_checklist
          });
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
      setIsLoaded(true);
    } else {
      localStorage.setItem(`session_draft_${booking.id}`, JSON.stringify({
        recording_link: data.recording_link,
        therapist_notes: data.therapist_notes,
        patient_visible_notes: data.patient_visible_notes,
        session_checklist: data.session_checklist
      }));
    }
  }, [data.recording_link, data.therapist_notes, data.patient_visible_notes, data.session_checklist]);
  const [timer, setTimer] = useState("00:00:00");
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(null);
  const [alertDismissed30, setAlertDismissed30] = useState(false);
  const [alertDismissed60, setAlertDismissed60] = useState(false);
  const [alertDismissed80, setAlertDismissed80] = useState(false);
  const [forceCompleting, setForceCompleting] = useState(false);
  const latestScreening = patient.screening_results?.[0];
  useEffect(() => {
    const startTime = new Date(booking.started_at);
    const interval = setInterval(() => {
      const now = /* @__PURE__ */ new Date();
      const diff = Math.floor((now - startTime) / 1e3);
      const mins = Math.floor(diff / 60);
      const h = Math.floor(diff / 3600).toString().padStart(2, "0");
      const m = Math.floor(diff % 3600 / 60).toString().padStart(2, "0");
      const s = (diff % 60).toString().padStart(2, "0");
      setTimer(`${h}:${m}:${s}`);
      setElapsedMinutes(mins);
      if (mins >= 30 && mins < 31 && !alertDismissed30) {
        setSessionAlert("30");
      }
      if (mins >= 60 && mins < 61 && !alertDismissed60) {
        setSessionAlert("60");
      }
      if (mins >= 80 && mins < 81 && !alertDismissed80) {
        setSessionAlert("80");
      }
      if (mins >= 95 && !forceCompleting) {
        setSessionAlert("force");
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [booking.started_at, alertDismissed30, alertDismissed60, alertDismissed80, forceCompleting]);
  const updateChecklist = (key, value) => {
    setData("session_checklist", { ...data.session_checklist, [key]: value });
  };
  const toggleMulti = (key, option) => {
    const current = data.session_checklist[key] || [];
    const updated = current.includes(option) ? current.filter((i) => i !== option) : [...current, option];
    updateChecklist(key, updated);
  };
  const isChecklistComplete = () => {
    const cl = data.session_checklist;
    return cl.problem_name && cl.problem_score && cl.has_exception !== void 0 && cl.desired_outcome && cl.outcome_indicator && cl.induction_type?.length > 0 && cl.deepening_technique?.length > 0 && cl.has_abreaction !== void 0 && cl.core_method_type?.length > 0 && cl.suggestion_type?.length > 0 && cl.timeline_type?.length > 0 && cl.has_seal !== void 0 && cl.emerging_type?.length > 0 && cl.has_result_test !== void 0 && cl.final_problem_score;
  };
  const getFilledCount = () => {
    const cl = data.session_checklist;
    let filled = 0;
    const total = 15;
    if (cl.problem_name) filled++;
    if (cl.problem_score) filled++;
    if (cl.has_exception !== void 0) filled++;
    if (cl.desired_outcome) filled++;
    if (cl.outcome_indicator) filled++;
    if (cl.induction_type?.length > 0) filled++;
    if (cl.deepening_technique?.length > 0) filled++;
    if (cl.has_abreaction !== void 0) filled++;
    if (cl.core_method_type?.length > 0) filled++;
    if (cl.suggestion_type?.length > 0) filled++;
    if (cl.timeline_type?.length > 0) filled++;
    if (cl.has_seal !== void 0) filled++;
    if (cl.emerging_type?.length > 0) filled++;
    if (cl.has_result_test !== void 0) filled++;
    if (cl.final_problem_score) filled++;
    return { filled, total };
  };
  const handleFinalSubmit = () => {
    if (!isChecklistComplete()) {
      alert("Mohon lengkapi semua checklist sesi terlebih dahulu.");
      return;
    }
    post(route("schedules.complete", booking.id), {
      onSuccess: () => {
        localStorage.removeItem(`session_draft_${booking.id}`);
      },
      onError: (err) => {
        setShowChecklist(false);
        if (err.recording_link) {
          alert("Error: " + err.recording_link);
        } else {
          alert("Gagal menyelesaikan sesi. Silakan periksa kembali data Anda.");
        }
      }
    });
  };
  const handleForceComplete = () => {
    setForceCompleting(true);
    setSessionAlert(null);
    const finalData = { ...data, is_auto: true };
    if (!finalData.completion_outcome) finalData.completion_outcome = "Normal";
    post(route("schedules.complete", booking.id), {
      data: finalData,
      onSuccess: () => localStorage.removeItem(`session_draft_${booking.id}`),
      onError: () => setForceCompleting(false)
    });
  };
  const renderField = (field) => {
    const cl = data.session_checklist;
    if (field.condition) {
      if (field.condition === "has_exception" && cl.has_exception !== true) return null;
      if (field.condition === "core_method_type_Lainnya" && !(cl.core_method_type || []).includes("Lainnya")) return null;
    }
    switch (field.type) {
      case "text":
        return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: field.label }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: cl[field.key] || "",
              onChange: (e) => updateChecklist(field.key, e.target.value),
              className: "w-full bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-3.5 text-sm font-bold dark:text-white transition-all",
              placeholder: `Isi ${field.label.toLowerCase()}...`
            }
          )
        ] }, field.key);
      case "score":
        return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block", children: field.label }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => updateChecklist(field.key, n),
              className: `w-10 h-10 rounded-xl font-black text-sm transition-all border-2 ${cl[field.key] === n ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-110" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400"}`,
              children: n
            },
            n
          )) })
        ] }, field.key);
      case "yesno":
        return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block", children: field.label }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => updateChecklist(field.key, true),
                className: `flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === true ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500"}`,
                children: "Ya"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => updateChecklist(field.key, false),
                className: `flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === false ? "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-400" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500"}`,
                children: "Tidak"
              }
            )
          ] })
        ] }, field.key);
      case "multi":
        return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block", children: field.label }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: field.options.map((opt) => {
            const selected = (cl[field.key] || []).includes(opt);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggleMulti(field.key, opt),
                className: `px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selected ? "bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400"}`,
                children: [
                  selected && /* @__PURE__ */ jsx("span", { className: "mr-1.5", children: "✓" }),
                  opt
                ]
              },
              opt
            );
          }) })
        ] }, field.key);
      default:
        return null;
    }
  };
  const progress = getFilledCount();
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-500/20 border border-white/20", children: patient.name.charAt(0) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-white rounded-full animate-pulse" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-2 w-2 rounded-full bg-red-500 animate-ping" }),
              "Sesi Klinis Langsung"
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1", children: patient.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(User, { className: "w-3 h-3" }),
              " ",
              patient.age,
              "th • ",
              patient.gender
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-end mr-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Durasi Aktif" }),
            /* @__PURE__ */ jsx("span", { className: `text-2xl font-black tracking-tighter tabular-nums ${elapsedMinutes >= 95 ? "text-red-600 animate-pulse" : elapsedMinutes >= 80 ? "text-amber-500" : "text-indigo-600 dark:text-indigo-400"}`, children: timer }),
            elapsedMinutes >= 80 && elapsedMinutes < 95 && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-amber-500 uppercase tracking-widest animate-pulse", children: "Segera selesai!" }),
            elapsedMinutes >= 95 && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-red-500 uppercase tracking-widest animate-pulse", children: "WAKTU HABIS" })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("schedules.index"),
              onClick: () => {
                if (!confirm("Anda yakin ingin keluar dari sesi? Data draft akan tetap tersimpan di browser ini.")) return false;
              },
              className: "flex items-center gap-2 px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl hover:bg-white/60 dark:hover:bg-white/[0.08] text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-black transition-all border border-white/40 dark:border-white/[0.08] shadow-sm uppercase tracking-widest",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Keluar"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Sesi: ${patient.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 relative overflow-hidden min-h-[calc(100vh-100px)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full" }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 space-y-8", children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                className: "bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-8 md:p-10 border border-white/40 dark:border-white/[0.08] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-500/20", children: /* @__PURE__ */ jsx(Video, { className: "w-6 h-6" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight", children: "Rekaman Sesi" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "URL live stream atau link video tersimpan." })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "url",
                          value: data.recording_link,
                          onChange: (e) => setData("recording_link", e.target.value),
                          placeholder: "https://www.youtube.com/live/...",
                          className: `w-full pl-14 pr-6 py-5 bg-white/50 dark:bg-black/20 border-2 rounded-[1.5rem] focus:ring-8 transition-all font-bold tracking-tight ${errors.recording_link ? "border-red-500/50 focus:ring-red-500/10" : "border-transparent focus:border-indigo-500/30 focus:ring-indigo-500/10"} dark:text-white placeholder:text-gray-400`
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute left-5 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg", children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-indigo-500" }) })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 mt-2 ml-4 uppercase tracking-widest", children: "Wajib diawali dengan https:// (Contoh: https://youtube.com/...)" }),
                    errors.recording_link && /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-red-500 mt-2 ml-4 uppercase tracking-widest", children: errors.recording_link })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-500/20", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6" }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight", children: "Observasi Klinis" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Rekam medis internal, hanya untuk Praktisi & Admin." })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-lg border border-amber-500/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(Shield, { className: "w-3 h-3" }),
                        " Rahasia"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: data.therapist_notes,
                        onChange: (e) => setData("therapist_notes", e.target.value),
                        rows: "8",
                        placeholder: "Tulis analisis sesi, terobosan, dan intervensi di sini...",
                        className: "w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-8 focus:ring-indigo-500/10 rounded-[2rem] transition-all dark:text-white leading-relaxed resize-none font-bold text-base shadow-inner"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                      /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20", children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight", children: "Pesan untuk Pasien" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500", children: "Dapat dilihat pada dashboard riwayat pasien." })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: data.patient_visible_notes,
                        onChange: (e) => setData("patient_visible_notes", e.target.value),
                        rows: "4",
                        placeholder: "Berikan semangat, tugas mandiri, atau tujuan sesi berikutnya...",
                        className: "w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 focus:ring-8 focus:ring-emerald-500/10 rounded-[2rem] transition-all dark:text-white leading-relaxed resize-none font-bold text-base"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-12 border-t border-white/20 dark:border-white/10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx(CheckSquare, { className: "w-6 h-6 text-indigo-500" }),
                          "Checklist Sesi"
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500 mt-1", children: "Lengkapi semua item untuk dapat menyelesaikan sesi ini." })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "text-right flex flex-col items-end", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "Progress" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-indigo-600 dark:text-indigo-400", children: [
                          progress.filled,
                          "/",
                          progress.total
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: CHECKLIST_SECTIONS.map((section) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100/50 dark:border-gray-800/50 p-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xl", children: section.icon }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white", children: section.title })
                      ] }),
                      section.fields.map((field) => renderField(field))
                    ] }, section.key)) })
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-8", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.1 },
                  className: "bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 dark:border-indigo-500/20 shadow-xl overflow-hidden group",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity", children: /* @__PURE__ */ jsx(Info, { className: "w-32 h-32" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6", children: [
                        /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3" }),
                        " Wawasan Cepat"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
                        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/10 transition-colors hover:bg-indigo-500/20", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest", children: "Paket Aktif" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter", children: [
                              booking.package_type || "REGULER",
                              booking.package_type === "vip" && /* @__PURE__ */ jsx("span", { className: "ml-2 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full", children: "VIP" })
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/40", children: /* @__PURE__ */ jsx(Zap, { className: "w-3 h-3 text-white" }) })
                          ] })
                        ] }),
                        latestScreening && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/10", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest", children: "Skrining Terbaru" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-emerald-700 dark:text-emerald-400", children: latestScreening.summary_title || "Kondisi Baik" }),
                            /* @__PURE__ */ jsx(Heart, { className: "w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs(
                          "a",
                          {
                            href: route("schedules.patient-detail", { user: patient.id, from_booking_id: booking.id }),
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-xl text-center",
                            children: [
                              "Buka Rekam Medis (Tab Baru) ",
                              /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 opacity-50" })
                            ]
                          }
                        )
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.2 },
                  className: "bg-white/40 dark:bg-white/[0.03] backdrop-blur-[20px] rounded-[2.5rem] p-8 border border-white/40 dark:border-white/[0.08]",
                  children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white mb-6 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-indigo-500" }),
                      " Hasil Sesi"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setData("completion_outcome", "Normal"),
                          className: `flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === "Normal" ? "bg-emerald-500/10 border-emerald-500 dark:bg-emerald-500/20" : "border-transparent bg-white/50 dark:bg-black/20"}`,
                          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                            /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl transition-colors ${data.completion_outcome === "Normal" ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400"}`, children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) }),
                            /* @__PURE__ */ jsx("span", { className: `font-black uppercase tracking-widest text-xs ${data.completion_outcome === "Normal" ? "text-emerald-700 dark:text-emerald-400" : "text-gray-500"}`, children: "Perkembangan Normal" })
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setData("completion_outcome", "Abnormal/Emergency"),
                          className: `flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === "Abnormal/Emergency" ? "bg-red-500/10 border-red-500 dark:bg-red-500/20" : "border-transparent bg-white/50 dark:bg-black/20"}`,
                          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                            /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl transition-colors ${data.completion_outcome === "Abnormal/Emergency" ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-400"}`, children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }) }),
                            /* @__PURE__ */ jsx("span", { className: `font-black uppercase tracking-widest text-xs ${data.completion_outcome === "Abnormal/Emergency" ? "text-red-700 dark:text-red-400" : "text-gray-500"}`, children: "Butuh Tindakan" })
                          ] })
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "pt-4", children: [
                (!data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome || !isChecklistComplete()) && /* @__PURE__ */ jsx("div", { className: "mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl", children: /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest text-center leading-relaxed", children: [
                  "⚠️ Lengkapi Rekaman Sesi, Observasi Klinis, Pesan Pasien, Hasil Sesi, dan semua ITEM CHECKLIST (",
                  progress.filled,
                  "/",
                  progress.total,
                  ")."
                ] }) }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleFinalSubmit,
                    disabled: processing || !data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome || !isChecklistComplete(),
                    className: "w-full py-8 bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:opacity-30 disabled:grayscale text-white rounded-[2.5rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] transition-all enabled:hover:scale-[1.02] enabled:active:scale-95 group flex items-center justify-center gap-4",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform", children: /* @__PURE__ */ jsx(Save, { className: "w-6 h-6" }) }),
                      processing ? "MEMPROSES..." : "SELESAIKAN SESI"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6 px-10 leading-loose", children: "Klik tombol di atas jika sudah mengisi seluruh data." })
              ] })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: sessionAlert && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-[999999] flex items-center justify-center p-4",
            children: [
              /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-slate-900/80 backdrop-blur-sm", onClick: () => {
                if (sessionAlert !== "force") {
                  if (sessionAlert === "30") setAlertDismissed30(true);
                  if (sessionAlert === "60") setAlertDismissed60(true);
                  if (sessionAlert === "80") setAlertDismissed80(true);
                  setSessionAlert(null);
                }
              } }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.9, y: 20 },
                  className: "relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 text-center border overflow-hidden",
                  children: [
                    sessionAlert === "30" && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-indigo-500 rounded-t-full" }),
                      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Clock, { className: "w-10 h-10 text-indigo-500" }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-800 dark:text-white mb-2", children: "30 Menit Berlalu" }),
                      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-8 font-medium", children: "Anda telah melakukan sesi setengah jam. Durasi ideal maksimal adalah 60 menit." }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setAlertDismissed30(true);
                            setSessionAlert(null);
                          },
                          className: "w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-widest text-xs uppercase transition-colors shadow-lg shadow-indigo-500/30",
                          children: "Lanjutkan Sesi"
                        }
                      )
                    ] }),
                    sessionAlert === "60" && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-indigo-500 rounded-t-full" }),
                      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Clock, { className: "w-10 h-10 text-indigo-500 animate-pulse" }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-800 dark:text-white mb-2", children: "60 Menit Berlalu" }),
                      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-8 font-medium", children: "Sesi ini telah berlangsung selama 1 jam. Anda sebaiknya mulai menyimpulkan dan menutup sesi." }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setAlertDismissed60(true);
                            setSessionAlert(null);
                          },
                          className: "w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-widest text-xs uppercase transition-colors shadow-lg shadow-indigo-500/30",
                          children: "Lanjutkan Penutupan"
                        }
                      )
                    ] }),
                    sessionAlert === "80" && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-amber-500 rounded-t-full" }),
                      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-10 h-10 text-amber-500 animate-pulse" }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-800 dark:text-white mb-2", children: "Peringatan: 80 Menit!" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-slate-500 dark:text-slate-400 mb-8 font-medium", children: [
                        "Sesi ini sudah berjalan terlalu lama. Sistem akan ",
                        /* @__PURE__ */ jsx("b", { children: "otomatis menyelesaikan sesi" }),
                        " dalam 15 menit lagi."
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setAlertDismissed80(true);
                            setSessionAlert(null);
                          },
                          className: "w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black tracking-widest text-xs uppercase transition-colors shadow-lg shadow-amber-500/30",
                          children: "Siapkan Penutupan"
                        }
                      )
                    ] }),
                    sessionAlert === "force" && /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-red-600 rounded-t-full" }),
                      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Clock, { className: "w-10 h-10 text-red-600 animate-spin-slow" }) }),
                      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-slate-800 dark:text-white mb-2", children: "Waktu Habis (95 Menit)" }),
                      /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-8 font-medium", children: "Sesi ini telah melewati batas toleransi maksimal sistem. Sesi akan ditutup sekarang." }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: handleForceComplete,
                          disabled: forceCompleting,
                          className: "w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black tracking-widest text-xs uppercase transition-colors shadow-lg shadow-red-500/30 flex justify-center items-center gap-2",
                          children: forceCompleting ? "Memproses..." : "Selesaikan Otomatis"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
export {
  ActiveSession as default
};
