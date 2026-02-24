import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { Head, Link } from "@inertiajs/react";
import ErrorBoundary from "./ErrorBoundary-veTPa1Ma.js";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Phone, Calendar, Fingerprint, Activity, ShieldCheck, Heart, Clock, CreditCard, ChevronRight, AlertTriangle, FileText, ExternalLink, Clipboard, User } from "lucide-react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function InnerUserShow({ userModel, bookings = [], transactions = [], schedules = [], screeningResults = [], profileCompletion, courseTransactions = [] }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedCourseAgreement, setSelectedCourseAgreement] = useState(null);
  const isPatient = userModel.roles.some((r) => r.name === "patient");
  const isTherapist = userModel.roles.some((r) => r.name === "therapist");
  const completionRate = profileCompletion?.percentage || 0;
  const ktpDocumentPath = userModel.ktp_photo;
  screeningResults[0];
  const isAgreementSigned = !!userModel.agreement_signed_at;
  const isAffiliateSigned = !!userModel.affiliate_agreement_signed_at;
  const tabs = [
    { id: "summary", label: "Ringkasan", icon: Activity },
    { id: "legal", label: "S&K", icon: ShieldCheck },
    { id: "screening", label: "Skrining", icon: Heart },
    { id: "sessions", label: "Sesi", icon: Clock },
    { id: "financial", label: "Transaksi", icon: CreditCard }
  ];
  if (isTherapist) {
    tabs.push({ id: "schedules", label: "Jadwal Praktek", icon: Calendar });
  }
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Detail User" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1", children: "Manajemen Pengguna" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `User: ${userModel.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: containerVariants,
              initial: "hidden",
              animate: "visible",
              className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-[2.5rem] overflow-hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "md:flex", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white relative", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 text-4xl font-black uppercase", children: userModel.name.charAt(0) }),
                    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-white" }) })
                  ] }),
                  /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-center leading-tight", children: userModel.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-indigo-100 text-sm font-medium mt-1", children: userModel.email }),
                  /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap justify-center gap-2", children: userModel.roles.map((role) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10", children: role.name }, role.id)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Kontak & Info" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300", children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-indigo-500 shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: userModel.phone || "-" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300 py-1", children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-indigo-500 shrink-0" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold", children: [
                        userModel.screening_answers?.usia || userModel.age || "-",
                        " Tahun"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-gray-700 dark:text-gray-300", children: [
                      /* @__PURE__ */ jsx(Fingerprint, { className: "w-4 h-4 text-indigo-500 shrink-0" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold capitalize", children: userModel.screening_answers?.gender || userModel.gender || "-" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Progrest Profil" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxs("span", { className: `text-3xl font-black ${completionRate === 100 ? "text-emerald-500" : "text-indigo-600 dark:text-indigo-400"}`, children: [
                        completionRate,
                        "%"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 mb-1.5 uppercase", children: "Kelengkapan" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${completionRate}%` },
                        className: `h-full ${completionRate === 100 ? "bg-emerald-500" : "bg-indigo-600"}`
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Referral & Afiliasi" }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-1", children: [
                      userModel.referral_code && /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300", children: [
                        "CODE: ",
                        /* @__PURE__ */ jsx("span", { className: "text-indigo-600 font-mono tracking-wider", children: userModel.referral_code })
                      ] }),
                      userModel.affiliate_ref && /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300 uppercase", children: [
                        "REF: ",
                        /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: userModel.affiliate_ref })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold text-gray-400", children: [
                        "JOIN: ",
                        new Date(userModel.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:w-72 flex-shrink-0 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
                  children: [
                    /* @__PURE__ */ jsx(tab.icon, { className: `w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-indigo-500"}` }),
                    tab.label,
                    activeTab === tab.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 ml-auto opacity-50" })
                  ]
                },
                tab.id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-rose-50/50 dark:bg-rose-950/10 rounded-[2rem] border border-rose-100 dark:border-rose-900/30 p-6", children: [
                /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-rose-600 dark:text-rose-500 uppercase mb-4", children: [
                  /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
                  " Kontak Darurat"
                ] }),
                userModel.emergency_contact_name ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Nama Lengkap" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: userModel.emergency_contact_name })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Hubungan" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: userModel.emergency_contact_relation || "-" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Nomor HP" }),
                    /* @__PURE__ */ jsx("a", { href: `tel:${userModel.emergency_contact_phone}`, className: "text-sm font-black text-rose-600 dark:text-rose-400 hover:underline", children: userModel.emergency_contact_phone })
                  ] })
                ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 italic", children: "Belum tersedia." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 pt-2", children: /* @__PURE__ */ jsxs(Link, { href: route("admin.users.edit", userModel.id), className: "w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all text-[10px] shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
                " Edit Profil"
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "summary" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-6",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                      "Ringkasan Profil & Bio"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: "Biodata Pribadi" }),
                        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: Object.entries(profileCompletion?.fields || {}).map(([key, data]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100/50 dark:border-gray-700/30", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-500 uppercase tracking-tight truncate mr-2", children: data.label }),
                          data.filled ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-500 flex-shrink-0" }) : /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 text-rose-400 flex-shrink-0" })
                        ] }, key)) })
                      ] }),
                      isTherapist && /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "Spesialisasi" }),
                        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: (userModel.specialization || "").split(",").map((spec, i) => spec && /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 shadow-sm", children: spec.trim() }, i)) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: "Dokumen Identitas (KTP)" }),
                        ktpDocumentPath ? /* @__PURE__ */ jsxs("div", { className: "relative group rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900", children: [
                          /* @__PURE__ */ jsx("img", { src: `/storage/${ktpDocumentPath}`, alt: "KTP", className: "w-full max-h-[420px] object-contain" }),
                          /* @__PURE__ */ jsx("a", { href: `/storage/${ktpDocumentPath}`, target: "_blank", rel: "noreferrer", className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm", children: /* @__PURE__ */ jsx("span", { className: "px-6 py-3 bg-white text-gray-900 rounded-full font-black text-xs uppercase tracking-widest shadow-xl", children: "Lihat Ukuran Penuh" }) })
                        ] }) : /* @__PURE__ */ jsxs("div", { className: "h-[180px] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-900/30 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]", children: [
                          /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-gray-200 mb-2" }),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: "Belum ada KTP" })
                        ] })
                      ] })
                    ] })
                  ] })
                },
                "summary"
              ),
              activeTab === "legal" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-6",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                      "Persetujuan Layanan & Dokumen Hukum"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 ml-4", children: "Seluruh dokumen yang telah disetujui/ttd oleh pasien" }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[2rem] border ${isAgreementSigned ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-800/50" : "bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1", children: "Perjanjian Klinis Utama" }),
                            /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white uppercase leading-tight", children: "Form Pernyataan Awal & Persetujuan Layanan" }),
                            /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 mt-1", children: "Termasuk: Surat Perjanjian Layanan Hipnoterapi & Kebijakan Non-Refund" })
                          ] }),
                          /* @__PURE__ */ jsx(ShieldCheck, { className: `w-8 h-8 ${isAgreementSigned ? "text-emerald-500" : "text-gray-200"}` })
                        ] }),
                        isAgreementSigned ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-500 rounded-lg text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }) }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400", children: "Dua Dokumen Disetujui" }),
                              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 font-mono italic", children: new Date(userModel.agreement_signed_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                            userModel.agreement_data?.signature_1 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-1", children: "Doc 1: Pernyataan" }),
                              /* @__PURE__ */ jsx("img", { src: userModel.agreement_data.signature_1, alt: "Signature 1", className: "h-10 w-full object-contain invert dark:invert-0" })
                            ] }),
                            userModel.digital_signature && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-1", children: "Doc 2: Perjanjian" }),
                              /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Signature 2", className: "h-10 w-full object-contain invert dark:invert-0" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("a", { href: route("admin.users.agreement", userModel.id), target: "_blank", rel: "noreferrer", className: "w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm", children: [
                            "Lihat Kedua Dokumen ",
                            /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                          ] })
                        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase", children: [
                          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
                          " Belum Disetujui"
                        ] })
                      ] }),
                      (isAffiliateSigned || userModel.affiliate_ref) && /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[2rem] border ${isAffiliateSigned ? "bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-800/50" : "bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700"}`, children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1", children: "Kemitraan" }),
                            /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white uppercase leading-tight", children: "PERJANJIAN MITRA AFFILIATE" })
                          ] }),
                          /* @__PURE__ */ jsx(Fingerprint, { className: `w-8 h-8 ${isAffiliateSigned ? "text-indigo-500" : "text-gray-200"}` })
                        ] }),
                        isAffiliateSigned ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsx("div", { className: "p-2 bg-indigo-500 rounded-lg text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }) }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400", children: "Telah Disetujui Secara Digital" }),
                              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 font-mono italic", children: new Date(userModel.affiliate_agreement_signed_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) })
                            ] })
                          ] }),
                          userModel.affiliate_signature && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-indigo-100/50 dark:border-indigo-800/50", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase mb-2", children: "Tanda Tangan Afiliasi" }),
                            /* @__PURE__ */ jsx("img", { src: userModel.affiliate_signature, alt: "Signature", className: "h-16 object-contain invert dark:invert-0" })
                          ] })
                        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase", children: [
                          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
                          " Belum Disetujui"
                        ] })
                      ] }),
                      courseTransactions && courseTransactions.length > 0 && courseTransactions.map((tx) => tx.payment_agreement_data && /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[2rem] border bg-gray-50/30 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1", children: "E-Learning / Kelas" }),
                            /* @__PURE__ */ jsxs("h4", { className: "font-black text-gray-900 dark:text-white uppercase leading-tight line-clamp-1", children: [
                              "Agreement & Ketentuan Peserta Kelas: ",
                              tx.transactionable?.title || "Course"
                            ] }),
                            /* @__PURE__ */ jsxs("p", { className: "text-[9px] font-bold text-gray-400 mt-1", children: [
                              "Invoice: ",
                              tx.invoice_number
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx(Clipboard, { className: "w-8 h-8 text-gray-200" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
                          /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-500 rounded-lg text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }) }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400", children: "Persetujuan Terdaftar" }),
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 font-mono italic", children: new Date(tx.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" }) })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("button", { onClick: () => setSelectedCourseAgreement({ tx, data: tx.payment_agreement_data }), className: "w-full py-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 rounded-xl hover:shadow-md transition-all", children: "Lihat Detail S&K" })
                      ] }, `course-legal-${tx.id}`))
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 rounded-[2rem] bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-800/30", children: [
                      /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2", children: "Informasi Tambahan" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white uppercase mb-1", children: "KEBIJAKAN NON-REFUND" }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium", children: "Seluruh transaksi di InDepth bersifat final dan tidak dapat dikembalikan sesuai kesepakatan pada Terms of Service yang disetujui pengguna saat akses pertama kali." })
                    ] })
                  ] })
                },
                "legal"
              ),
              activeTab === "screening" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-6",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-rose-500 rounded-full" }),
                      "Hasil Skrining Psikologis"
                    ] }),
                    screeningResults && screeningResults.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: screeningResults.map((screening, sIdx) => /* @__PURE__ */ jsxs("div", { className: "space-y-8 pb-12 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                        /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-widest", children: [
                          "Sesi #",
                          screeningResults.length - sIdx
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-400 uppercase tracking-tighter", children: new Date(screening.completed_at || screening.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[2rem] bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/50 relative overflow-hidden", children: [
                        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                          /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] mb-4", children: "Analisis Diagnosa AI" }),
                          /* @__PURE__ */ jsxs("p", { className: "text-xl font-black text-gray-900 dark:text-white leading-relaxed mb-6", children: [
                            '"',
                            screening.ai_summary || screening.severity_label || "Tidak ada ringkasan",
                            '"'
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                            /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest", children: screening.severity_label || "Analyzed" }),
                            screening.is_high_risk && /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2", children: [
                              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3" }),
                              " Resiko Tinggi"
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx(Activity, { className: "absolute -right-8 -bottom-8 w-40 h-40 text-rose-500/5" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 space-y-4", children: [
                          /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(Clipboard, { className: "w-3 h-3" }),
                            " Rekomendasi Paket & Treatment"
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-rose-500 uppercase", children: "Paket yang Direkomendasikan" }),
                              /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase mt-1", children: screening.recommended_package || "-" })
                            ] }),
                            screening.step_data?.analysis && /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase mb-2", children: "Analisis Mendalam" }),
                              /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700", children: screening.step_data.analysis })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: "Metadata Skrining" }),
                          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs font-bold border-b border-gray-100 dark:border-gray-800 pb-2", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-gray-500 uppercase", children: "Metode Analisis" }),
                              /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-white", children: "InDepth AI v2.1" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs font-bold", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-gray-500 uppercase", children: "Status Validitas" }),
                              /* @__PURE__ */ jsx("span", { className: `font-black uppercase text-emerald-500`, children: "TERVERIFIKASI" })
                            ] })
                          ] }),
                          screening.admin_notes && /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-6 border-t border-gray-100 dark:border-gray-800", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-rose-500 uppercase mb-2", children: "Catatan Admin" }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-600 dark:text-gray-400", children: screening.admin_notes })
                          ] })
                        ] })
                      ] }),
                      screening.chat_history && screening.chat_history.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-8 bg-gray-50/30 dark:bg-gray-900/40 rounded-[2rem] border border-gray-100 dark:border-gray-800", children: [
                        /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: [
                          "Log Percakapan dengan AI (Sesi #",
                          screeningResults.length - sIdx,
                          ")"
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-4", children: screening.chat_history.map((msg, i) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[80%] p-4 rounded-2xl text-xs font-medium ${msg.role === "user" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm"}`, children: msg.content }) }, i)) })
                      ] })
                    ] }, screening.id || sIdx)) }) : /* @__PURE__ */ jsxs("div", { className: "py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]", children: [
                      /* @__PURE__ */ jsx(Heart, { className: "w-12 h-12 text-gray-200 mb-4" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-400 uppercase tracking-widest", children: "Belum ada data skrining yang tersedia" })
                    ] })
                  ] })
                },
                "screening"
              ),
              activeTab === "sessions" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                        "Riwayat Sesi Klinis"
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                        bookings.length,
                        " Sesi"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "max-h-[600px] overflow-y-auto", children: [
                      /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-gray-50 dark:bg-gray-900 z-10", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800/50", children: [
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Waktu & Sesi" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Praktisi/Pasien" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Aksi" })
                        ] }) }),
                        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: bookings.map((booking) => {
                          const d = booking.schedule ? /* @__PURE__ */ new Date(`${booking.schedule.date.replace(/-/g, "/")} ${booking.schedule.start_time}`) : null;
                          return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors", children: [
                            /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-center", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white", children: d && !isNaN(d.getTime()) ? d.toLocaleDateString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "-" }),
                              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-indigo-600 font-black uppercase mt-0.5", children: [
                                "#",
                                booking.booking_code
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-center", children: [
                              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: isPatient ? booking.therapist?.name || "-" : booking.patient?.name || "-" }),
                              /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[9px] font-black uppercase ${booking.status === "completed" ? "text-emerald-600 bg-emerald-50" : "text-indigo-600 bg-indigo-50"}`, children: booking.status })
                            ] }),
                            /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setSelectedBooking(booking), className: "p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all group", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-gray-300 group-hover:text-indigo-600" }) }) })
                          ] }, booking.id);
                        }) })
                      ] }),
                      bookings.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic", children: "Belum ada riwayat sesi." })
                    ] })
                  ] })
                },
                "sessions"
              ),
              activeTab === "financial" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "space-y-8",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-emerald-50/30 dark:bg-emerald-950/20", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                        "Log Transaksi Keuangan"
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                        transactions.length,
                        " Transaksi"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "max-h-[600px] overflow-y-auto", children: [
                      /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-gray-50 dark:bg-gray-900 z-10", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800", children: [
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Invoice" }),
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Pengguna" }),
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Layanan & Jadwal" }),
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Nominal" }),
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Bukti" }),
                          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Status" })
                        ] }) }),
                        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: transactions.map((tx) => {
                          const isBooking = tx.transactionable_type?.includes("Booking");
                          tx.transactionable?.user_voucher?.voucher;
                          return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-emerald-50/20 dark:hover:bg-emerald-900/10 transition-colors", children: [
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 dark:text-white mb-1", children: tx.invoice_number }),
                              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: tx.payment_bank || "-" }),
                              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-medium text-slate-500 mt-1", children: new Date(tx.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) })
                            ] }) }),
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-900 dark:text-white", children: tx.user?.name || userModel.name }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: tx.user?.email || userModel.email })
                            ] }) }),
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-500/20 w-fit uppercase tracking-widest", children: isBooking ? "Booking" : tx.transactionable_type?.split("\\").pop() || "Course" }),
                              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-800 dark:text-gray-200 mt-1", children: isBooking ? `${tx.transactionable?.package_type || "Package"}` : `${tx.transactionable?.title || "Online Course"}` }),
                              tx.payment_agreement_data && /* @__PURE__ */ jsxs("span", { className: "text-[9px] text-emerald-600 dark:text-emerald-500 font-black flex items-center justify-center gap-1 uppercase mt-1", children: [
                                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                                "Agreement Signed"
                              ] })
                            ] }) }),
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-slate-900 dark:text-white", children: [
                              "Rp ",
                              new Intl.NumberFormat("id-ID").format(tx.amount || 0)
                            ] }) }) }),
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: tx.payment_proof ? /* @__PURE__ */ jsxs(
                              "a",
                              {
                                href: `/storage/${tx.payment_proof}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "inline-flex items-center justify-center gap-2 group/proof",
                                children: [
                                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/proof:bg-gold-500 group-hover/proof:text-white transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-500 dark:text-slate-400 group-hover/proof:text-gold-600 uppercase tracking-tighter", children: "Lihat" })
                                ]
                              }
                            ) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-500 uppercase tracking-widest italic", children: "Kosong" }) }),
                            /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                              /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border
                                                                            ${tx.status === "paid" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : tx.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" : tx.status === "pending" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" : "bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20"}`, children: tx.status === "paid" ? "Valid" : tx.status === "rejected" ? "Ditolak" : tx.status === "pending" ? "Menunggu" : tx.status }),
                              tx.status === "paid" && tx.validated_at && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1 mt-1", children: [
                                /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-indigo-500 uppercase flex items-center justify-center gap-1 w-full text-center", children: [
                                  /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                                  "By: ",
                                  tx.validated_by?.name || tx.validated_by_user?.name || "Admin"
                                ] }),
                                /* @__PURE__ */ jsx("span", { className: "text-[9px] text-slate-400 font-bold block w-full text-center", children: new Date(tx.validated_at).toLocaleDateString("id-ID") })
                              ] })
                            ] }) })
                          ] }, tx.id);
                        }) })
                      ] }),
                      transactions.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic", children: "Belum ada catatan transaksi." })
                    ] })
                  ] })
                },
                "financial"
              ),
              activeTab === "schedules" && isTherapist && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20", children: /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                      "Slot Jadwal Terbuka"
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "max-h-[600px] overflow-y-auto", children: [
                      /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                        /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-gray-50 dark:bg-gray-900 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Tanggal" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Waktu (WIB)" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Utilisasi" })
                        ] }) }),
                        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: schedules.map((sch) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-indigo-50/10 transition-colors", children: [
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-sm font-black text-gray-900 dark:text-white uppercase", children: new Date(sch.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short" }) }),
                          /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-sm font-bold text-gray-500", children: [
                            sch.start_time.substring(0, 5),
                            " - ",
                            sch.end_time.substring(0, 5)
                          ] }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 text-[10px] font-black uppercase rounded-lg border ${sch.booked_count >= sch.quota ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-indigo-50 text-indigo-700 border-indigo-100"}`, children: [
                            sch.booked_count,
                            " / ",
                            sch.quota
                          ] }) })
                        ] }, sch.id)) })
                      ] }),
                      schedules.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic", children: "Belum ada slot jadwal." })
                    ] })
                  ]
                },
                "schedules"
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Modal, { show: !!selectedBooking, onClose: () => setSelectedBooking(null), maxWidth: "2xl", children: selectedBooking && /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black text-gray-900 dark:text-white uppercase leading-tight", children: [
                  "Detail Sesi #",
                  selectedBooking.booking_code
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-indigo-600 mt-1 uppercase tracking-widest", children: "Informasi Sesi Klinis" })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setSelectedBooking(null), className: "p-2 bg-gray-50 dark:bg-gray-800 rounded-xl hover:text-rose-500 transition-colors", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 rotate-45" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-8 pb-8 border-b border-gray-100 dark:border-gray-700/50", children: [
              { label: isTherapist ? "Pasien" : "Praktisi", value: isTherapist ? selectedBooking.patient?.name : selectedBooking.therapist?.name },
              { label: "Paket Layanan", value: selectedBooking.package_type || "Hipnoterapi", capitalize: true },
              { label: "Status Sesi", value: selectedBooking.status, badge: true },
              { label: "Waktu Sesi", value: selectedBooking.schedule ? `${new Date(selectedBooking.schedule.date).toLocaleDateString("id-ID", { dateStyle: "medium" })} ${selectedBooking.schedule.start_time.substring(0, 5)} WIB` : "-" }
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: item.label }),
              item.badge ? /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-lg text-[10px] font-black uppercase inline-block ${item.value === "completed" ? "bg-emerald-500/10 text-emerald-600" : "bg-indigo-500/10 text-indigo-600"}`, children: item.value }) : /* @__PURE__ */ jsx("p", { className: `text-sm font-black text-gray-900 dark:text-white ${item.capitalize ? "capitalize" : ""}`, children: item.value || "-" })
            ] }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Clipboard, { className: "w-4 h-4" }),
                    " Catatan Internal"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 min-h-[120px]", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic", children: selectedBooking.therapist_notes ? `"${selectedBooking.therapist_notes}"` : "Belum ada catatan." }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
                    " Catatan Pasien"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-800/30 rounded-2xl p-5 min-h-[120px]", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic", children: selectedBooking.patient_visible_notes ? `"${selectedBooking.patient_visible_notes}"` : "Belum ada catatan terlihat." }) })
                ] })
              ] }),
              selectedBooking.recording_link && /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3", children: "Rekaman Dokumentasi" }),
                /* @__PURE__ */ jsxs("a", { href: selectedBooking.recording_link, target: "_blank", rel: "noreferrer", className: "flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[2rem] shadow-xl shadow-indigo-600/20 group", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Activity, { className: "w-6 h-6 animate-pulse" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-tighter opacity-80", children: "Video Rekaman Sesi" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-black whitespace-nowrap", children: "Play Session Documentation" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6 group-hover:translate-x-2 transition-transform" })
                ] })
              ] }),
              selectedBooking.session_checklist && Object.keys(selectedBooking.session_checklist).length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clipboard, { className: "w-4 h-4" }),
                  " Checklist Sesi Hipnoterapi"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  selectedBooking.session_checklist.problem_name && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Masalah" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.problem_name })
                  ] }),
                  selectedBooking.session_checklist.problem_score && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Angka Awal" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-indigo-600", children: [
                      selectedBooking.session_checklist.problem_score,
                      "/10"
                    ] })
                  ] }),
                  selectedBooking.session_checklist.final_problem_score && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Angka Akhir" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-emerald-600", children: [
                      selectedBooking.session_checklist.final_problem_score,
                      "/10"
                    ] })
                  ] }),
                  selectedBooking.session_checklist.induction_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Induksi" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.induction_type.join(", ") })
                  ] }),
                  selectedBooking.session_checklist.deepening_technique?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Deepening" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.deepening_technique.join(", ") })
                  ] }),
                  selectedBooking.session_checklist.core_method_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Metode Inti" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.core_method_type.join(", ") })
                  ] }),
                  selectedBooking.session_checklist.suggestion_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Sugesti" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.suggestion_type.join(", ") })
                  ] }),
                  selectedBooking.session_checklist.timeline_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Timeline" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.timeline_type.join(", ") })
                  ] }),
                  selectedBooking.session_checklist.emerging_type?.length > 0 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Emerging" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.emerging_type.join(", ") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Abreaksi" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.has_abreaction ? "Ya" : "Tidak" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Segel Hipnotis" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.has_seal ? "Ya" : "Tidak" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Pengujian Hasil" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.has_result_test ? "Ya" : "Tidak" })
                  ] }),
                  selectedBooking.session_checklist.desired_outcome && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 col-span-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Outcome Diinginkan" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.desired_outcome })
                  ] }),
                  selectedBooking.session_checklist.outcome_indicator && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 col-span-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Indikator Outcome" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.outcome_indicator })
                  ] }),
                  selectedBooking.session_checklist.has_exception && selectedBooking.session_checklist.exception_detail && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 col-span-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-0.5", children: "Pengecualian" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: selectedBooking.session_checklist.exception_detail })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedBooking(null), className: "!rounded-xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest", children: "Tutup" }) })
          ] }) }),
          /* @__PURE__ */ jsx(Modal, { show: selectedCourseAgreement !== null, onClose: () => setSelectedCourseAgreement(null), maxWidth: "lg", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2", children: "Persetujuan Course" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-600 font-black uppercase mb-8", children: selectedCourseAgreement?.tx?.transactionable?.title }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: selectedCourseAgreement?.data && Object.entries(selectedCourseAgreement.data).map(([key, value]) => {
              if (key === "signature") return null;
              return /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 flex items-start gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: key.replace(/_/g, " ") }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: value === true ? "Setuju" : value || "-" })
                ] })
              ] }, key);
            }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700/50", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedCourseAgreement(null), className: "!rounded-xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest", children: "Tutup" }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
function UserShow(props) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(InnerUserShow, { ...props }) });
}
export {
  UserShow as default
};
