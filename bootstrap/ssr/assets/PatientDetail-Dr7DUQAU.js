import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-BIpzS1gx.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import "./TextInput-DcEnl-Ka.js";
import { motion, AnimatePresence } from "framer-motion";
import { User, CheckCircle2, Calendar, Fingerprint, Phone, Mail, Activity, ShieldCheck, Heart, Clock, ChevronRight, BookOpen, AlertCircle, MessageSquare, Clipboard, ExternalLink, FileText, Video, ChevronDown, ChevronLeft } from "lucide-react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function PatientDetail({ patient, profileProgress, availableSchedules, fromBookingId }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
  const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
  const [expandedChecklist, setExpandedChecklist] = useState(null);
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
    new_schedule_id: "",
    reschedule_reason: ""
  });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
    no_show_party: "patient",
    no_show_reason: ""
  });
  const handleReschedule = (e) => {
    e.preventDefault();
    postReschedule(route("schedules.reschedule", selectedRescheduleBooking.id), {
      onSuccess: () => {
        setSelectedRescheduleBooking(null);
        resetReschedule();
      },
      preserveScroll: true
    });
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    postNoShow(route("schedules.no-show", selectedNoShowBooking.id), {
      onSuccess: () => {
        setSelectedNoShowBooking(null);
        resetNoShow();
      },
      preserveScroll: true
    });
  };
  const tabs = [
    { id: "summary", label: "Ringkasan", icon: Activity },
    { id: "identity", label: "Identitas & S&K", icon: ShieldCheck },
    { id: "screening", label: "Hasil Skrining", icon: Heart },
    { id: "history", label: "Riwayat Sesi", icon: Clock }
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "confirmed":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400";
      case "in_progress":
        return "text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 animate-pulse";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: fromBookingId ? route("schedules.active-session", fromBookingId) : route("schedules.index"),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-800 dark:text-white leading-tight", children: "Detail Pasien" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-bold", children: "MANAJEMEN REKAM MEDIS" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Pasien: ${patient.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white dark:bg-gray-800/60 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "md:flex", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-indigo-600 p-8 flex flex-col items-center justify-center text-white relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 mb-4 overflow-hidden", children: patient.avatar ? /* @__PURE__ */ jsx("img", { src: patient.avatar, alt: patient.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx(User, { className: "w-12 h-12 text-white" }) }),
                    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-white" }) })
                  ] }),
                  /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold uppercase tracking-tight text-center", children: patient.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-indigo-100 text-sm font-medium mt-1", children: patient.email }),
                  /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-2", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10", children: "Pasien Terverifikasi" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Informasi Dasar" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-indigo-500" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm font-semibold", children: [
                        patient.age || "-",
                        " Tahun"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300 py-1", children: [
                      /* @__PURE__ */ jsx(Fingerprint, { className: "w-4 h-4 text-indigo-500" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: patient.gender || "-" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-indigo-500" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: patient.phone || "-" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Status Kelengkapan" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-2xl font-black text-indigo-600 dark:text-indigo-400", children: [
                        profileProgress.percentage,
                        "%"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 mb-1", children: "DATA PROFIL" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${profileProgress.percentage}%` },
                        className: "h-full bg-indigo-500"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Aksi Cepat" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-1", children: [
                      /* @__PURE__ */ jsxs("a", { href: `mailto:${patient.email}`, className: "flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors", children: [
                        /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3" }),
                        " KIRIM EMAIL"
                      ] }),
                      /* @__PURE__ */ jsxs("a", { href: `tel:${patient.phone}`, className: "flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors", children: [
                        /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                        " TELEPON PASIEN"
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:w-72 flex-shrink-0 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/30 p-2 shadow-sm", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none translate-x-1" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50"}`,
                  children: [
                    /* @__PURE__ */ jsx(tab.icon, { className: `w-4 h-4 ${activeTab === tab.id ? "text-white" : "text-indigo-500"}` }),
                    tab.label,
                    activeTab === tab.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 ml-auto" })
                  ]
                },
                tab.id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-5", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black tracking-widest text-emerald-700 dark:text-emerald-500 uppercase mb-3 px-1", children: "Kontak Darurat" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Nama" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 uppercase", children: patient.emergency_contact_name || "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Hubungan" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: patient.emergency_contact_relation || "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Telepon" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-indigo-600 dark:text-indigo-400", children: patient.emergency_contact_phone || "-" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "summary" && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6", children: [
                          /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 text-indigo-500" }),
                          " Partisipasi Program"
                        ] }),
                        patient.courses?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: patient.courses.map((course) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0", children: /* @__PURE__ */ jsx(Manual, { className: "w-5 h-5" }) }),
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 truncate pr-2", children: course.title }),
                            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500 font-medium", children: [
                              "Terdaftar pada: ",
                              new Date(course.pivot.enrolled_at).toLocaleDateString("id-ID")
                            ] })
                          ] })
                        ] }, course.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-gray-400", children: [
                          /* @__PURE__ */ jsx(AlertCircle, { className: "w-10 h-10 mb-2 opacity-20" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm italic", children: "Belum terdaftar di kelas manapun." })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                        /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6", children: [
                          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-500" }),
                          " Legal & Persetujuan"
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-500", children: "Service Agreement" }),
                              patient.agreement_signed_at ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-amber-500" })
                            ] }),
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: patient.agreement_signed_at ? "Ditandatangani secara digital" : "Belum Ditandatangani" }),
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 mt-1 font-medium", children: patient.agreement_signed_at ? `Tgl: ${new Date(patient.agreement_signed_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}` : "Tgl: -" }),
                            patient.agreement_signed_at && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider", children: [
                              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3" }),
                              " Dokumen Disetujui"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-2xl border ${patient.recommended_package ? "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"}`, children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-amber-700 dark:text-amber-500", children: "Rekomendasi Paket" }),
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 uppercase mt-1", children: patient.recommended_package || "BELUM DITETAPKAN" })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6", children: [
                        /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-indigo-500" }),
                        " Catatan Terakhir"
                      ] }),
                      patient.bookings?.find((b) => b.status === "completed" && b.therapist_notes) ? /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 italic text-gray-700 dark:text-gray-300 text-sm leading-relaxed relative", children: [
                        /* @__PURE__ */ jsx("span", { className: "absolute -top-3 left-6 text-4xl text-indigo-200 dark:text-gray-700 font-serif", children: '"' }),
                        patient.bookings.find((b) => b.status === "completed" && b.therapist_notes).therapist_notes
                      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "Belum ada catatan terapi yang tersimpan." })
                    ] })
                  ]
                },
                "summary"
              ),
              activeTab === "identity" && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8", children: [
                        /* @__PURE__ */ jsx(Fingerprint, { className: "w-5 h-5 text-indigo-500" }),
                        " Verifikasi Identitas (KTP)"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Usia" }),
                              /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: [
                                patient.age || "-",
                                " Tahun"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Jenis Kelamin" }),
                              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 uppercase", children: patient.gender || "-" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Status Perjanjian" }),
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-600 dark:text-emerald-400", children: [
                              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
                              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold uppercase", children: "AKTIF & DISETUJUI" })
                            ] }),
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 mt-1", children: "Berlaku selama 1 tahun sejak tanggal penandatanganan." })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl transition-colors", children: [
                            /* @__PURE__ */ jsx(Clipboard, { className: "w-4 h-4" }),
                            " LIHAT LOG PERUBAHAN"
                          ] }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase mb-3", children: "Foto KTP / Identitas Resmi" }),
                          patient.ktp_photo_url ? /* @__PURE__ */ jsxs("div", { className: "relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg bg-gray-100 dark:bg-gray-900", children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: patient.ktp_photo_url,
                                alt: "KTP",
                                className: "w-full h-auto aspect-[1.6/1] object-contain transition-transform duration-500 group-hover:scale-110"
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: patient.ktp_photo_url,
                                target: "_blank",
                                className: "p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30",
                                children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-6 h-6" })
                              }
                            ) })
                          ] }) : /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[1.6/1] bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400", children: [
                            /* @__PURE__ */ jsx(FileText, { className: "w-12 h-12 mb-2 opacity-10" }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs italic font-medium", children: "Foto identitas belum diunggah." })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6", children: [
                        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5 text-indigo-500" }),
                        " Syarat & Ketentuan (Service Agreement)"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-700/50", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black tracking-widest text-gray-400 uppercase", children: "Informasi Penandatanganan" }),
                            patient.agreement_signed_at && /* @__PURE__ */ jsxs(
                              Link,
                              {
                                href: route("agreement.patient", patient.id),
                                className: "text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase flex items-center gap-1",
                                children: [
                                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" }),
                                  " Buka Dokumen Formal"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-8", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-500 uppercase", children: "Tanggal" }),
                              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 truncate", children: patient.agreement_signed_at ? new Date(patient.agreement_signed_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : "-" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-500 uppercase", children: "Tanda Tangan Digital" }),
                              patient.digital_signature ? /* @__PURE__ */ jsx("div", { className: "mt-1 h-16 w-32 bg-white rounded-lg p-2 border border-gray-200", children: /* @__PURE__ */ jsx("img", { src: patient.digital_signature, alt: "Signature", className: "w-full h-full object-contain" }) }) : /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-red-500 italic uppercase", children: "BELUM TANDA TANGAN" })
                            ] })
                          ] })
                        ] }),
                        patient.agreement_data && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black tracking-widest text-indigo-500 uppercase px-1", children: "Poin-poin Penting yang Disetujui" }),
                          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: ["understand_process", "honest_answers", "follow_protocol", "responsibility"].map((key) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-xl border border-indigo-100/30", children: [
                            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500 mt-0.5 shrink-0" }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300 capitalize", children: key.replace(/_/g, " ") })
                          ] }, key)) })
                        ] })
                      ] })
                    ] })
                  ]
                },
                "identity"
              ),
              activeTab === "screening" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8", children: [
                      /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5 text-red-500" }),
                      " Hasil Analisa Skrining Mental"
                    ] }),
                    patient.screening_results?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-10", children: patient.screening_results.map((result, idx) => /* @__PURE__ */ jsxs("div", { className: `${idx !== 0 ? "pt-10 border-t border-gray-100 dark:border-gray-700" : ""}`, children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }) }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Skrining Kesehatan Mental" }),
                            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-medium", children: [
                              "Tgl: ",
                              new Date(result.completed_at).toLocaleDateString("id-ID", { dateStyle: "full" })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs("span", { className: `px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${result.severity_label === "High Risk" ? "bg-red-500 text-white" : result.severity_label === "Berat Kronis" ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigo-700"}`, children: [
                          "Tingkat: ",
                          result.severity_label || "NORMAL"
                        ] }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: [
                        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Rekomendasi Paket" }),
                          /* @__PURE__ */ jsx("p", { className: "text-base font-black text-indigo-600 dark:text-indigo-400 uppercase", children: result.recommended_package || "-" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Status Resiko" }),
                          /* @__PURE__ */ jsx("p", { className: `text-base font-black uppercase ${result.is_high_risk ? "text-red-500" : "text-emerald-500"}`, children: result.is_high_risk ? "HIGH RISK" : "LOW RISK" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Skor Analisa (AI)" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }),
                            /* @__PURE__ */ jsx("p", { className: "text-base font-black text-gray-800 dark:text-gray-200", children: "OPTIMAL" })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest px-1", children: "Ringkasan Analisa (AI Summary)" }),
                        /* @__PURE__ */ jsx("div", { className: "bg-indigo-50/30 dark:bg-indigo-900/10 p-6 rounded-3xl border border-indigo-100/30 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap", children: result.ai_summary || "Analisa AI tidak tersedia untuk skrining ini." })
                      ] }),
                      result.admin_notes && /* @__PURE__ */ jsxs("div", { className: "mt-6 p-6 bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800/30 rounded-3xl", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-amber-700 dark:text-amber-500 uppercase flex items-center gap-2 mb-2", children: [
                          /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
                          " Catatan Admin/CS"
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-amber-800 dark:text-amber-300 italic", children: result.admin_notes })
                      ] })
                    ] }, result.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-gray-400", children: [
                      /* @__PURE__ */ jsx(Activity, { className: "w-16 h-16 mb-4 opacity-10" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm italic font-medium", children: "Pasien belum menyelesaikan skrining sama sekali." })
                    ] })
                  ] })
                },
                "screening"
              ),
              activeTab === "history" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 text-indigo-500" }),
                      " Riwayat Konsultasi & Terapi"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-700/50", children: patient.bookings?.length > 0 ? patient.bookings.map((booking) => /* @__PURE__ */ jsxs("div", { className: "relative pl-14", children: [
                      /* @__PURE__ */ jsx("div", { className: `absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-sm z-10 ${booking.status === "completed" ? "bg-emerald-100 text-emerald-600" : booking.status === "in_progress" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`, children: booking.status === "completed" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl p-6 transition-all hover:shadow-md hover:bg-white dark:hover:bg-gray-800", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-900 dark:text-white uppercase", children: [
                              "Kode Booking: ",
                              booking.booking_code
                            ] }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-bold mt-0.5", children: new Date(booking.schedule?.date || "").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                            /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(booking.status)}`, children: booking.status === "completed" ? "TERLESAIKAN" : booking.status === "in_progress" ? "SEDANG BERJALAN" : "AKAN DATANG" }),
                            booking.status === "confirmed" && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => setSelectedRescheduleBooking(booking),
                                  className: "px-3 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/30 transition-all hover:bg-amber-100",
                                  children: "Reschedule"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => setSelectedNoShowBooking(booking),
                                  className: "px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 transition-all hover:bg-red-100",
                                  children: "No-Show / Batal"
                                }
                              )
                            ] }),
                            booking.completion_outcome && /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${booking.completion_outcome === "Normal" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`, children: [
                              "OUTCOME: ",
                              booking.completion_outcome
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mt-6", children: [
                          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic", children: "Data Sesi" }),
                              /* @__PURE__ */ jsxs("div", { className: "bg-white/50 dark:bg-gray-800/80 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-3 text-xs", children: [
                                /* @__PURE__ */ jsxs("p", { className: "flex justify-between", children: [
                                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Terapis:" }),
                                  /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800 dark:text-gray-200", children: booking.therapist?.name || booking.schedule?.therapist?.name || "-" })
                                ] }),
                                /* @__PURE__ */ jsxs("p", { className: "flex justify-between", children: [
                                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Paket:" }),
                                  /* @__PURE__ */ jsx("span", { className: "font-bold text-indigo-600 dark:text-indigo-400 uppercase", children: booking.package_type || "REGULER" })
                                ] }),
                                booking.started_at && /* @__PURE__ */ jsxs("p", { className: "flex justify-between", children: [
                                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Waktu Mulai:" }),
                                  /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-800 dark:text-gray-200", children: [
                                    new Date(booking.started_at).toLocaleTimeString("id-id", { hour: "2-digit", minute: "2-digit" }),
                                    " WIB"
                                  ] })
                                ] }),
                                /* @__PURE__ */ jsxs("p", { className: "flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Status Akhir:" }),
                                  /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[9px] font-black uppercase ${booking.completion_outcome === "Normal" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`, children: booking.completion_outcome || "NORMAL" })
                                ] })
                              ] })
                            ] }),
                            booking.recording_link && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 italic", children: "Hasil Rekaman" }),
                              /* @__PURE__ */ jsxs(
                                "a",
                                {
                                  href: booking.recording_link,
                                  target: "_blank",
                                  rel: "noreferrer",
                                  className: "flex items-center justify-between gap-2 w-full p-4 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all group",
                                  children: [
                                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                                      /* @__PURE__ */ jsx("div", { className: "p-2 bg-white/20 rounded-xl group-hover:rotate-12 transition-transform", children: /* @__PURE__ */ jsx(Video, { className: "w-4 h-4" }) }),
                                      /* @__PURE__ */ jsx("span", { children: "BUKA REKAMAN SESI (YT/DRIVE)" })
                                    ] }),
                                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 opacity-50" })
                                  ]
                                }
                              )
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 mb-2 italic", children: "Catatan Klinis (Internal)" }),
                              /* @__PURE__ */ jsx("div", { className: "bg-indigo-50/30 dark:bg-indigo-900/10 p-5 rounded-2xl border border-indigo-100/30 text-xs text-gray-700 dark:text-gray-300 min-h-[100px] leading-relaxed shadow-sm", children: booking.therapist_notes || "Tidak ada catatan sesi yang dicatat." })
                            ] }),
                            booking.patient_visible_notes && /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest px-1 mb-2 italic", children: "Pesan Untuk Pasien (Publik)" }),
                              /* @__PURE__ */ jsx("div", { className: "bg-emerald-50/30 dark:bg-emerald-900/10 p-5 rounded-2xl border border-emerald-100/30 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed shadow-sm", children: booking.patient_visible_notes })
                            ] }),
                            booking.session_checklist && Object.keys(booking.session_checklist).length > 0 && /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => setExpandedChecklist((prev) => prev === booking.id ? null : booking.id),
                                  className: "w-full flex items-center justify-between p-3 bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 transition-all group",
                                  children: [
                                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-widest flex items-center gap-1.5", children: [
                                      /* @__PURE__ */ jsx(Clipboard, { className: "w-3 h-3" }),
                                      " Checklist Sesi Hipnoterapi"
                                    ] }),
                                    /* @__PURE__ */ jsx(ChevronDown, { className: `w-4 h-4 text-indigo-400 transition-transform duration-200 ${expandedChecklist === booking.id ? "rotate-180" : ""}` })
                                  ]
                                }
                              ),
                              expandedChecklist === booking.id && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 mt-3 animate-in fade-in duration-200", children: [
                                booking.session_checklist.problem_name && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Masalah" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.problem_name })
                                ] }),
                                booking.session_checklist.problem_score && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Angka Awal" }),
                                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-indigo-600", children: [
                                    booking.session_checklist.problem_score,
                                    "/10"
                                  ] })
                                ] }),
                                booking.session_checklist.final_problem_score && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Angka Akhir" }),
                                  /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-emerald-600", children: [
                                    booking.session_checklist.final_problem_score,
                                    "/10"
                                  ] })
                                ] }),
                                booking.session_checklist.induction_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Induksi" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.induction_type.join(", ") })
                                ] }),
                                booking.session_checklist.deepening_technique?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Deepening" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.deepening_technique.join(", ") })
                                ] }),
                                booking.session_checklist.core_method_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Metode Inti" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.core_method_type.join(", ") })
                                ] }),
                                booking.session_checklist.suggestion_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Sugesti" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.suggestion_type.join(", ") })
                                ] }),
                                booking.session_checklist.timeline_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Timeline" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.timeline_type.join(", ") })
                                ] }),
                                booking.session_checklist.emerging_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Emerging" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.emerging_type.join(", ") })
                                ] }),
                                /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Abreaksi" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.has_abreaction ? "Ya" : "Tidak" })
                                ] }),
                                /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Segel Hipnotis" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.has_seal ? "Ya" : "Tidak" })
                                ] }),
                                /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Pengujian Hasil" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.has_result_test ? "Ya" : "Tidak" })
                                ] }),
                                booking.session_checklist.desired_outcome && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Outcome Diinginkan" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.desired_outcome })
                                ] }),
                                booking.session_checklist.outcome_indicator && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Indikator Outcome" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.outcome_indicator })
                                ] }),
                                booking.session_checklist.has_exception && booking.session_checklist.exception_detail && /* @__PURE__ */ jsxs("div", { className: "p-2.5 bg-white/50 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700 col-span-2", children: [
                                  /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Pengecualian" }),
                                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold text-gray-800 dark:text-gray-200", children: booking.session_checklist.exception_detail })
                                ] })
                              ] })
                            ] })
                          ] })
                        ] })
                      ] }),
                      booking.reschedule_reason && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border-2 border-dashed border-amber-200 dark:border-amber-800/30 rounded-2xl", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-[9px] font-black text-amber-700 dark:text-amber-500 uppercase flex items-center gap-1.5 mb-1.5", children: [
                          /* @__PURE__ */ jsx(Activity, { className: "w-3 h-3" }),
                          " Info Reschedule"
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium text-amber-800 dark:text-amber-300 italic", children: [
                          '"',
                          booking.reschedule_reason,
                          '"'
                        ] })
                      ] })
                    ] }, booking.id)) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-gray-400 pl-8", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-16 h-16 mb-4 opacity-10" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm italic font-medium", children: "Belum ada riwayat sesi konsultasi." })
                    ] }) })
                  ] })
                },
                "history"
              )
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedRescheduleBooking !== null, onClose: () => setSelectedRescheduleBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Jadwal Ulang" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-8 font-bold text-indigo-500", children: [
            "Anda sedang menjadwal ulang sesi ",
            /* @__PURE__ */ jsx("strong", { children: selectedRescheduleBooking?.booking_code })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "new_schedule_id", value: "Pilih Slot Baru", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "new_schedule_id",
                  className: "mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200",
                  value: rescheduleData.new_schedule_id,
                  onChange: (e) => setRescheduleData("new_schedule_id", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Slot Tersedia --" }),
                    availableSchedules?.filter((s) => s.id !== selectedRescheduleBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                      new Date(s.date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }),
                      " | ",
                      s.start_time?.substring(0, 5),
                      " WIB | ",
                      s.therapist?.name || "Praktisi"
                    ] }, s.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reschedule_reason", value: "Alasan Perubahan (Akan Muncul di Dashboard Pasien)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "reschedule_reason",
                  className: "mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200",
                  rows: "3",
                  placeholder: "Detail alasan reschedule...",
                  value: rescheduleData.reschedule_reason,
                  onChange: (e) => setRescheduleData("reschedule_reason", e.target.value),
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedRescheduleBooking(null), disabled: rescheduling, className: "rounded-2xl px-6", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: rescheduling || !rescheduleData.new_schedule_id,
                className: `inline-flex items-center px-8 py-3 bg-indigo-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95 ${(rescheduling || !rescheduleData.new_schedule_id) && "opacity-25"}`,
                children: "Simpan Jadwal Baru"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedNoShowBooking !== null, onClose: () => setSelectedNoShowBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "p-8 dark:bg-gray-900 border border-transparent dark:border-gray-800 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Batalkan / No-Show" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-8 font-bold text-red-500", children: [
            "Menandai booking ",
            /* @__PURE__ */ jsx("strong", { children: selectedNoShowBooking?.booking_code }),
            " tidak hadir."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_party", value: "Keterangan Pihak Berhalangan", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "no_show_party",
                  className: "mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all dark:text-gray-200",
                  value: noShowData.no_show_party,
                  onChange: (e) => setNoShowData("no_show_party", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien Tidak Hadir" }),
                    /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi Berhalangan / Batalkan" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_reason", value: "Alasan Pembatalan / No-Show", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "no_show_reason",
                  className: "mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none dark:text-gray-200",
                  rows: "3",
                  placeholder: "Detail pembatalan...",
                  value: noShowData.no_show_reason,
                  onChange: (e) => setNoShowData("no_show_reason", e.target.value),
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedNoShowBooking(null), disabled: markingNoShow, className: "rounded-2xl px-6", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: markingNoShow,
                className: `inline-flex items-center px-8 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg active:scale-95 ${markingNoShow && "opacity-25"}`,
                children: "Konfirmasi No-Show"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function Manual(props) {
  return /* @__PURE__ */ jsx("svg", { ...props, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) });
}
export {
  PatientDetail as default
};
