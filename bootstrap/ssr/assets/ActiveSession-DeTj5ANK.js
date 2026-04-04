import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { Users, ChevronRight, Video, RefreshCw, FileText, MessageCircle, CheckSquare, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
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
function ActiveSession({ booking, patient, groupMembers = [], isAdmin = false }) {
  const [currentBooking, setCurrentBooking] = useState(booking);
  const [currentPatient, setCurrentPatient] = useState(patient);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    recording_link: currentBooking.recording_link || "",
    therapist_notes: currentBooking.therapist_notes || "",
    patient_visible_notes: currentBooking.patient_visible_notes || "",
    completion_outcome: currentBooking.completion_outcome || "",
    session_checklist: currentBooking.session_checklist || {}
  });
  const switchMember = (member) => {
    localStorage.setItem(`session_draft_${currentBooking.id}`, JSON.stringify({
      recording_link: data.recording_link,
      therapist_notes: data.therapist_notes,
      patient_visible_notes: data.patient_visible_notes,
      session_checklist: data.session_checklist,
      completion_outcome: data.completion_outcome
    }));
    router.visit(route("schedules.active-session", member.booking_id));
  };
  useEffect(() => {
    if (!isLoaded) {
      const draft = localStorage.getItem(`session_draft_${currentBooking.id}`);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setData({
            ...data,
            ...parsed,
            recording_link: parsed.recording_link || data.recording_link,
            therapist_notes: parsed.therapist_notes || data.therapist_notes,
            patient_visible_notes: parsed.patient_visible_notes || data.patient_visible_notes,
            session_checklist: parsed.session_checklist || data.session_checklist,
            completion_outcome: parsed.completion_outcome || data.completion_outcome
          });
        } catch (e) {
          console.error("Failed to parse draft", e);
        }
      }
      setIsLoaded(true);
    } else {
      localStorage.setItem(`session_draft_${currentBooking.id}`, JSON.stringify({
        recording_link: data.recording_link,
        therapist_notes: data.therapist_notes,
        patient_visible_notes: data.patient_visible_notes,
        session_checklist: data.session_checklist,
        completion_outcome: data.completion_outcome
      }));
    }
  }, [data.recording_link, data.therapist_notes, data.patient_visible_notes, data.session_checklist, data.completion_outcome]);
  const [timer, setTimer] = useState("00:00:00");
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(null);
  const [alertDismissed30, setAlertDismissed30] = useState(false);
  const [alertDismissed60, setAlertDismissed60] = useState(false);
  const [alertDismissed80, setAlertDismissed80] = useState(false);
  const [forceCompleting, setForceCompleting] = useState(false);
  currentPatient.screening_results?.[0];
  useEffect(() => {
    const startTime = new Date(currentBooking.started_at);
    const interval = setInterval(() => {
      const now = /* @__PURE__ */ new Date();
      const diff = Math.floor((now - startTime) / 1e3);
      const mins = Math.floor(diff / 60);
      const h = Math.floor(diff / 3600).toString().padStart(2, "0");
      const m = Math.floor(diff % 3600 / 60).toString().padStart(2, "0");
      const s = (diff % 60).toString().padStart(2, "0");
      setTimer(`${h}:${m}:${s}`);
      setElapsedMinutes(mins);
      if (mins >= 30 && mins < 31 && !alertDismissed30) setSessionAlert("30");
      if (mins >= 60 && mins < 61 && !alertDismissed60) setSessionAlert("60");
      if (mins >= 80 && mins < 81 && !alertDismissed80) setSessionAlert("80");
      if (mins >= 95 && !forceCompleting) {
        if (isAdmin) {
          if (!alertDismissed80) setSessionAlert("force_admin");
        } else {
          setSessionAlert("force");
        }
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [currentBooking.started_at, alertDismissed30, alertDismissed60, alertDismissed80, forceCompleting]);
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
    post(route("schedules.complete", currentBooking.id), {
      onSuccess: () => {
        localStorage.removeItem(`session_draft_${currentBooking.id}`);
      },
      onError: (err) => {
        if (err.recording_link) alert("Error: " + err.recording_link);
        else alert("Gagal menyelesaikan sesi. Silakan periksa kembali data Anda.");
      }
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
              disabled: isFormDisabled,
              className: "w-full bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-5 py-3.5 text-sm font-bold dark:text-white transition-all disabled:opacity-50",
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
              disabled: isFormDisabled,
              className: `w-10 h-10 rounded-xl font-black text-sm transition-all border-2 ${cl[field.key] === n ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-400"}`,
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
                disabled: isFormDisabled,
                className: `flex-1 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${cl[field.key] === true ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500"}`,
                children: "Ya"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => updateChecklist(field.key, false),
                disabled: isFormDisabled,
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
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => toggleMulti(field.key, opt),
                disabled: isFormDisabled,
                className: `px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selected ? "bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400" : "bg-white/50 dark:bg-black/20 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400"}`,
                children: opt
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
  const isOvertime = elapsedMinutes >= 95;
  const isFormDisabled = isOvertime && !isAdmin;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-xl border border-white/20", children: currentPatient.name.charAt(0) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-2 w-2 rounded-full bg-red-500 animate-ping" }),
              "Sesi Klinis Langsung ",
              groupMembers.length > 0 && "— GRUP"
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-1", children: currentPatient.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest capitalize", children: [
              currentPatient.age,
              "th • ",
              currentPatient.gender
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-end mr-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Durasi Sesi" }),
            /* @__PURE__ */ jsx("span", { className: `text-2xl font-black tabular-nums ${elapsedMinutes >= 95 ? "text-red-600" : "text-indigo-600 dark:text-indigo-400"}`, children: timer })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("schedules.index"),
              onClick: () => confirm("Keluar dari sesi?"),
              className: "px-6 py-3 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-white/40 dark:border-white/[0.08] rounded-2xl text-xs font-black uppercase tracking-widest",
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 inline mr-2" }),
                " Keluar"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Sesi: ${currentPatient.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          groupMembers.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-10 p-6 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/[0.08] shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-5 h-5 text-indigo-500" }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white", children: "Anggota Grup — Isi Laporan 1 Per 1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4", children: groupMembers.map((m) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => switchMember(m),
                className: `flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all ${m.id === currentPatient.id ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105" : "bg-white/50 dark:bg-black/20 border-gray-100 dark:border-gray-800 text-gray-600 hover:border-indigo-400"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${m.id === currentPatient.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`, children: m.name.charAt(0) }),
                  /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-tight", children: m.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold opacity-70 uppercase tracking-widest", children: "Sedang Diisi" })
                  ] }),
                  m.id === currentPatient.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 ml-2" })
                ]
              },
              m.id
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-white/[0.03] backdrop-blur-[40px] rounded-[3rem] p-10 border border-white/40 dark:border-white/[0.08] shadow-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx(Video, { className: "w-6 h-6 text-red-500" }),
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white", children: "Rekaman Sesi" })
                  ] }),
                  groupMembers.length > 0 && /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
                    if (confirm("Gunakan link rekaman ini untuk SEMUA anggota grup?")) {
                      groupMembers.forEach((m) => {
                        const draft = JSON.parse(localStorage.getItem(`session_draft_${m.booking_id}`) || "{}");
                        localStorage.setItem(`session_draft_${m.booking_id}`, JSON.stringify({ ...draft, recording_link: data.recording_link }));
                      });
                      alert("Link rekaman disalin ke semua anggota.");
                    }
                  }, className: "text-[9px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-lg hover:bg-indigo-100", children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: "w-3 h-3" }),
                    " Samakan Link ke Semua Anggota"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "url",
                    value: data.recording_link,
                    onChange: (e) => setData("recording_link", e.target.value),
                    placeholder: "https://www.youtube.com/live/...",
                    disabled: isFormDisabled,
                    className: "w-full px-6 py-5 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl font-bold dark:text-white"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6 text-indigo-500" }),
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white", children: [
                    "Klinis: ",
                    currentPatient.name
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.therapist_notes,
                    onChange: (e) => setData("therapist_notes", e.target.value),
                    rows: "8",
                    placeholder: "Isi analisis individual anggota ini...",
                    disabled: isFormDisabled,
                    className: "w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-indigo-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6 text-emerald-500" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white", children: "Pesan Pasien" })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.patient_visible_notes,
                    onChange: (e) => setData("patient_visible_notes", e.target.value),
                    rows: "4",
                    placeholder: "Tugas atau semangat untuk anggota ini...",
                    disabled: isFormDisabled,
                    className: "w-full p-8 bg-white/50 dark:bg-black/20 border-2 border-transparent focus:border-emerald-500/30 rounded-[2rem] dark:text-white font-bold resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-12 border-t border-white/10 space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx(CheckSquare, { className: "w-6 h-6 text-indigo-500" }),
                    " Checklist ",
                    currentPatient.name
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-lg font-black text-indigo-600", children: [
                    progress.filled,
                    "/",
                    progress.total
                  ] })
                ] }),
                CHECKLIST_SECTIONS.map((section) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50/50 dark:bg-white/[0.02] rounded-[2rem] border border-gray-100/50 dark:border-gray-800/50 p-8", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl", children: section.icon }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white", children: section.title })
                  ] }),
                  section.fields.map((field) => renderField(field))
                ] }, section.key))
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-white/[0.03] backdrop-blur-[30px] rounded-[2.5rem] p-8 border border-white/40 shadow-xl", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-6", children: "HASIL KEMAJUAN MEMBER" }),
              /* @__PURE__ */ jsxs("div", { className: "grid-cols-1 space-y-4", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("completion_outcome", "Normal"),
                    disabled: isFormDisabled,
                    className: `w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === "Normal" ? "bg-emerald-500/10 border-emerald-500 text-emerald-600" : "bg-white dark:bg-black/20 border-transparent text-gray-400"}`,
                    children: [
                      /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase", children: "Normal" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setData("completion_outcome", "Abnormal/Emergency"),
                    disabled: isFormDisabled,
                    className: `w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${data.completion_outcome === "Abnormal/Emergency" ? "bg-red-500/10 border-red-500 text-red-600" : "bg-white dark:bg-black/20 border-transparent text-gray-400"}`,
                    children: [
                      /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase", children: "Abnormal" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleFinalSubmit,
                  disabled: isFormDisabled || processing || !data.recording_link || !data.therapist_notes || !data.patient_visible_notes || !data.completion_outcome || !isChecklistComplete(),
                  className: "w-full mt-10 py-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl font-black shadow-xl disabled:opacity-30 uppercase tracking-widest text-xs",
                  children: processing ? "Memproses..." : "Simpan Laporan Anggota"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gray-400 font-bold uppercase mt-6 leading-relaxed", children: "Simpan laporan individual anggota sebelum berpindah ke anggota lain." })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  ActiveSession as default
};
