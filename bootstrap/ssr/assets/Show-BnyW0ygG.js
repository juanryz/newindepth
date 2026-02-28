import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BhWsY9sM.js";
import { useForm, Head, router, Link } from "@inertiajs/react";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Calendar, Clock, Plus, Users, ShieldCheck, ChevronRight, User, CheckCircle2, ExternalLink, Star, Mail, Phone, ClipboardList, XCircle, Video, Eye, Save, AlertTriangle, Heart, CreditCard, MapPin, Fingerprint, Clipboard, ChevronLeft } from "lucide-react";
import ErrorBoundary from "./ErrorBoundary-veTPa1Ma.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-BfaDD_kK.js";
function InnerSchedulesShow({ schedule, availableSchedules, patients = [] }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
  const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [selectedPatientDetail, setSelectedPatientDetail] = useState(null);
  const [patientSubTab, setPatientSubTab] = useState("summary");
  const [selectedCourseAgreement, setSelectedCourseAgreement] = useState(null);
  const [showChecklist, setShowChecklist] = useState({});
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
    new_schedule_id: "",
    new_date: "",
    new_start_time: "",
    new_end_time: "",
    reschedule_reason: ""
  });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
    no_show_party: "cancel",
    no_show_reason: ""
  });
  const { data: addPatientData, setData: setAddPatientData, post: postAddPatient, processing: addingPatient, reset: resetAddPatient, errors: addPatientErrors } = useForm({
    patient_id: "",
    package_type: "reguler",
    schedule_id: schedule.id
  });
  const [editingDetails, setEditingDetails] = useState(() => {
    const initialEdits = {};
    schedule.bookings?.forEach((b) => {
      initialEdits[b.id] = {
        recording_link: b.recording_link || "",
        therapist_notes: b.therapist_notes || "",
        patient_visible_notes: b.patient_visible_notes || "",
        status: b.status || "confirmed",
        completion_outcome: b.completion_outcome || "Normal",
        core_method: b.session_checklist?.core_method_type?.[0] || ""
      };
    });
    return initialEdits;
  });
  const handleDetailChange = (bookingId, field, value) => {
    setEditingDetails((prev) => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: value }
    }));
  };
  const updateBookingDetails = (bookingId) => {
    const details = editingDetails[bookingId];
    router.patch(route("admin.bookings.update-details", bookingId), {
      recording_link: details.recording_link,
      therapist_notes: details.therapist_notes,
      patient_visible_notes: details.patient_visible_notes,
      status: details.status,
      completion_outcome: details.completion_outcome,
      session_checklist: {
        core_method_type: [details.core_method]
      }
    }, { preserveScroll: true });
  };
  const handleReschedule = (e) => {
    e.preventDefault();
    postReschedule(route("admin.bookings.reschedule", selectedRescheduleBooking.id), {
      onSuccess: () => {
        setSelectedRescheduleBooking(null);
        resetReschedule();
      },
      preserveScroll: true
    });
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    if (noShowData.no_show_party === "cancel") {
      router.post(route("admin.bookings.cancel", selectedNoShowBooking.id), {}, {
        onSuccess: () => {
          setSelectedNoShowBooking(null);
          resetNoShow();
        },
        preserveScroll: true
      });
    } else {
      postNoShow(route("admin.bookings.no-show", selectedNoShowBooking.id), {
        onSuccess: () => {
          setSelectedNoShowBooking(null);
          resetNoShow();
        },
        preserveScroll: true
      });
    }
  };
  const handleAddPatient = (e) => {
    e.preventDefault();
    postAddPatient(route("admin.bookings.store"), {
      onSuccess: () => {
        setIsAddingPatient(false);
        resetAddPatient();
      },
      preserveScroll: true
    });
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };
  const tabs = [
    { id: "summary", label: "Ringkasan Sesi", icon: Activity },
    { id: "patients", label: "Daftar Pasien", icon: Users },
    { id: "settings", label: "Pengaturan Sesi", icon: ShieldCheck }
  ];
  const sessionDate = new Date(schedule.date);
  const dayName = sessionDate.toLocaleDateString("id-ID", { weekday: "long" });
  const formattedDate = sessionDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.orders.index"), className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-gray-500" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Detail Jadwal Sesi" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1", children: "Klinik & Jadwal Praktik" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Jadwal: ${schedule.therapist?.name} - ${formattedDate}` }),
        /* @__PURE__ */ jsx("div", { className: "py-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: containerVariants,
              initial: "hidden",
              animate: "visible",
              className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-[2.5rem] overflow-hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "md:flex", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white relative md:w-80", children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white/20 backdrop-blur-md rounded-[2rem] flex items-center justify-center border-4 border-white/30 text-4xl font-black uppercase", children: schedule.therapist?.name?.charAt(0) || "?" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-white" }) })
                  ] }),
                  /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-center leading-tight uppercase tracking-tight", children: schedule.therapist?.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-indigo-100 text-[10px] font-black uppercase tracking-widest mt-2", children: schedule.therapist?.email || "Praktisi / Terapis" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Informasi Waktu" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 group", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase", children: "Hari & Tanggal" }),
                        /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: [
                          dayName,
                          ", ",
                          formattedDate
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 group", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase", children: "Jam Sesi (WIB)" }),
                        /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-gray-900 dark:text-white", children: [
                          schedule.start_time.substring(0, 5),
                          " - ",
                          schedule.end_time.substring(0, 5)
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Kapasitas & Ketersediaan" }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-end gap-3 mb-1", children: /* @__PURE__ */ jsx("span", { className: `text-4xl font-black ${schedule.booked_count >= 1 ? "text-rose-500" : /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "text-gray-400" : "text-emerald-500"}`, children: schedule.booked_count >= 1 ? "PENUH" : /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "TIDAK TERSEDIA" : "TERBUKA" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                      /* @__PURE__ */ jsx("div", { className: `w-3 h-3 rounded-full ${schedule.booked_count >= 1 ? "bg-rose-500" : /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "bg-gray-400" : "bg-emerald-500 animate-pulse"}` }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-500 uppercase tracking-widest", children: schedule.booked_count >= 1 ? `${schedule.booked_count} Pasien Terdaftar` : /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "Jadwal waktu sesi telah berlalu" : "1 Slot tersedia — menunggu 1 pasien" })
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[9px] font-bold text-gray-400 italic mt-2 leading-relaxed", children: [
                      "Setiap terapis menangani 1 pasien per slot.",
                      /* @__PURE__ */ jsx("br", {}),
                      "Slot lain di jam sama = terapis lain yang tersedia."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2", children: "Aksi Cepat" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setIsAddingPatient(true),
                          disabled: /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date(),
                          className: `flex items-center justify-between px-5 py-3 border rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${/* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700" : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100"}`,
                          children: [
                            /* @__PURE__ */ new Date(`${schedule.date}T${schedule.start_time}`) < /* @__PURE__ */ new Date() ? "Jadwal Kadaluarsa" : "Tambah Pasien",
                            " ",
                            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("button", { onClick: () => router.get(route("admin.schedules.index")), className: "flex items-center justify-between px-5 py-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all font-black text-[10px] uppercase tracking-widest", children: [
                        "Kembali ke Kalender ",
                        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" })
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsx("div", { className: "lg:w-72 flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "sticky top-8 bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm space-y-1", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab(tab.id),
                className: `w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all duration-300 relative z-20 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-2" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
                children: [
                  /* @__PURE__ */ jsx(tab.icon, { className: `w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-indigo-500"}` }),
                  tab.label,
                  activeTab === tab.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 ml-auto opacity-50" })
                ]
              },
              tab.id
            )) }) }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "summary" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-10 shadow-sm", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                  "Ringkasan Sesi Klinis"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3", children: "Deskripsi Sesi" }),
                      /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 rounded-[2rem] text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed capitalize", children: [
                        schedule.schedule_type,
                        " Session - ",
                        schedule.therapist?.name,
                        " pada ",
                        formattedDate,
                        ". Sesi ini telah dikonfigurasi untuk menangani pendaftaran pasien dengan paket ",
                        schedule.schedule_type === "class" ? "group" : "private",
                        "."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-800/30 rounded-2xl", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-emerald-600 uppercase mb-1", children: "Status Jadwal" }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-emerald-700 dark:text-emerald-400", children: "AKTIF / TERVERIFIKASI" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-800/30 rounded-2xl", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-indigo-600 uppercase mb-1", children: "Sistem Booking" }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-indigo-700 dark:text-indigo-400", children: "INDEPTH CLOUD v3" })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1", children: "Data Terapis & Kehadiran" }),
                    /* @__PURE__ */ jsxs("div", { className: "p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-6 h-6" }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase opacity-70", children: "Praktisi Bertugas" }),
                          /* @__PURE__ */ jsx("p", { className: "text-lg font-black uppercase", children: schedule.therapist?.name })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-t border-white/20 pt-4", children: [
                        /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                          " Kehadiran Terverifikasi"
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold uppercase tracking-widest flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                          " Slot Tersedia di Kalender"
                        ] })
                      ] })
                    ] })
                  ] })
                ] })
              ] }) }, "summary"),
              activeTab === "patients" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: schedule.bookings?.length > 0 ? schedule.bookings.map((booking) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 bg-gray-50/50 dark:bg-gray-900/30 border-b border-gray-100 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/20", children: booking.patient?.name?.charAt(0) || "?" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("h4", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxs(Link, { href: route("admin.users.show", booking.patient?.id), className: "hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group flex items-center gap-2", children: [
                          booking.patient?.name,
                          /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" })
                        ] }),
                        booking.package_type === "vip" && /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-amber-500 fill-amber-500" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-gray-400 flex items-center gap-4 mt-1", children: [
                        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3" }),
                          " ",
                          booking.patient?.email
                        ] }),
                        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                          " ",
                          booking.patient?.phone || "-"
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-200/50", children: [
                        "Paket ",
                        booking.package_type
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${booking.status === "completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200/50" : "bg-blue-100 text-blue-700 border-blue-200/50"}`, children: booking.status })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest", children: "Pembayaran Terverifikasi" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-8 space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-1", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Integrasi Sesi" }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowChecklist((prev) => ({ ...prev, [booking.id]: !prev[booking.id] })),
                          className: `flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${showChecklist[booking.id] ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20" : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/40 hover:bg-indigo-100"}`,
                          children: [
                            /* @__PURE__ */ jsx(ClipboardList, { className: "w-3.5 h-3.5" }),
                            showChecklist[booking.id] ? "Sembunyikan" : "Lihat Checklist Sesi"
                          ]
                        }
                      )
                    ] }),
                    showChecklist[booking.id] && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-indigo-50/40 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-[1.5rem] space-y-4 animate-in fade-in duration-300", children: [
                      /* @__PURE__ */ jsxs("p", { className: "text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(ClipboardList, { className: "w-3 h-3" }),
                        " Checklist Hipnoterapi — Diisi oleh Terapis"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white dark:bg-slate-800 rounded-2xl", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Status Sesi" }),
                          /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.status === "completed" ? "bg-emerald-100 text-emerald-700" : booking.status === "no_show" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}`, children: booking.status })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white dark:bg-slate-800 rounded-2xl", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Hasil Outcome" }),
                          /* @__PURE__ */ jsx("span", { className: `inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.completion_outcome === "Abnormal/Emergency" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`, children: booking.completion_outcome || "Normal" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white dark:bg-slate-800 rounded-2xl", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Metode yang Digunakan" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-indigo-700 dark:text-indigo-300", children: booking.session_checklist?.core_method_type?.[0] || /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-bold italic text-xs", children: "Belum diisi terapis" }) })
                      ] }),
                      booking.session_checklist && Object.keys(booking.session_checklist).length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest", children: "Item Checklist" }),
                        Object.entries(booking.session_checklist).filter(([k]) => k !== "core_method_type").map(([key, val]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 px-4 bg-white dark:bg-slate-800 rounded-xl", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-600 dark:text-gray-300 capitalize", children: key.replace(/_/g, " ") }),
                          typeof val === "boolean" ? val ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4 text-gray-300" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 max-w-[50%] text-right break-words", children: Array.isArray(val) ? val.join(", ") : String(val) })
                        ] }, key))
                      ] }) : /* @__PURE__ */ jsx("div", { className: "py-6 text-center text-[10px] font-bold text-gray-400 italic", children: "Checklist belum diisi oleh terapis" }),
                      booking.therapist_notes && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white dark:bg-slate-800 rounded-2xl", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Catatan Terapis" }),
                        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300 leading-relaxed", children: booking.therapist_notes })
                      ] }),
                      booking.recording_link && /* @__PURE__ */ jsxs("a", { href: booking.recording_link, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl text-[10px] font-black text-indigo-600 hover:bg-indigo-50 transition-all", children: [
                        /* @__PURE__ */ jsx(Video, { className: "w-4 h-4" }),
                        " Lihat Rekaman Sesi"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-emerald-500 uppercase tracking-wider ml-1 mb-1 block", children: "Pesan untuk Pasien (Muncul di Dashboard)" }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          value: editingDetails[booking.id]?.patient_visible_notes || "",
                          onChange: (e) => handleDetailChange(booking.id, "patient_visible_notes", e.target.value),
                          className: "w-full bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30 rounded-2xl px-5 py-3.5 text-sm font-bold shadow-inner resize-none",
                          rows: "2",
                          placeholder: "Berikan semangat atau instruksi tugas..."
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest px-1", children: "Informasi Praktisi" }),
                    /* @__PURE__ */ jsxs("div", { className: "p-6 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-800/30 rounded-3xl space-y-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsx(User, { className: "w-6 h-6 text-indigo-600" }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black text-gray-400 uppercase", children: "Terapis Bertanggung Jawab" }),
                          /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: booking.therapist?.name || schedule.therapist?.name })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-indigo-100/50 dark:border-indigo-800/30 flex justify-between", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => {
                              setSelectedPatientDetail(booking.patient);
                              setPatientSubTab("summary");
                            },
                            className: "flex items-center gap-2 text-[10px] font-black text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 uppercase tracking-widest transition-colors",
                            children: [
                              /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                              " Detail Lengkap Pasien"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => updateBookingDetails(booking.id),
                            className: "flex items-center gap-2 text-[10px] font-black text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 uppercase tracking-widest transition-colors",
                            children: [
                              /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                              " Simpan Data"
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => setSelectedRescheduleBooking(booking), className: "flex-1 py-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 text-[10px] font-black uppercase rounded-xl border border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 transition-all", children: "Reschedule" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setSelectedNoShowBooking(booking), className: "flex-1 py-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 text-[10px] font-black uppercase rounded-xl border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 transition-all", children: "No-Show / Cancel" })
                    ] })
                  ] })
                ] }) })
              ] }, booking.id)) : /* @__PURE__ */ jsxs("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[3rem] p-24 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 flex flex-col items-center", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-gray-200 mb-4" }),
                /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black text-gray-300 uppercase tracking-tight", children: "Belum Ada Pasien" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setIsAddingPatient(true), className: "mt-8 px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl", children: "Tambah Pasien Manual" })
              ] }) }, "patients"),
              activeTab === "settings" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-10 shadow-sm", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-rose-500 rounded-full" }),
                  "Pengaturan Kontrol Slot"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-8 bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-800/30 rounded-[2.5rem] space-y-6", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
                      " Hazard Zone"
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-600 dark:text-gray-400 uppercase leading-relaxed p-4 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-rose-100/50", children: "Hapus jadwal hanya jika belum ada pendaftaran. Jika pendaftaran sudah ada, sistem akan memblokir penghapusan otomatis." }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => {
                          if (schedule.booked_count > 0) return alert("Sudah ada pasien terdaftar periksa tab Daftar Pasien.");
                          if (confirm("Hapus slot?")) router.delete(route("admin.schedules.destroy", schedule.id));
                        },
                        className: `w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${schedule.booked_count > 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-rose-600 text-white shadow-xl shadow-rose-600/20 hover:bg-rose-700"}`,
                        children: "Hapus Seluruh Jadwal"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "ID JADWAL" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-xl font-black text-gray-900 dark:text-white font-mono", children: [
                        "#",
                        schedule.id
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700/50 rounded-3xl", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "TERAKHIR DIUPDATE" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: new Date(schedule.updated_at).toLocaleString("id-ID") })
                    ] })
                  ] })
                ] })
              ] }) }, "settings")
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedPatientDetail !== null, onClose: () => setSelectedPatientDetail(null), maxWidth: "7xl", children: selectedPatientDetail && /* @__PURE__ */ jsxs("div", { className: "max-h-[90vh] overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-950 p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl", children: selectedPatientDetail.name.charAt(0) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: selectedPatientDetail.name }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-indigo-600 uppercase tracking-[0.2em]", children: selectedPatientDetail.email })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSelectedPatientDetail(null), className: "p-3 bg-white dark:bg-gray-800 rounded-2xl hover:text-rose-500 transition-colors shadow-sm", children: /* @__PURE__ */ jsx(XCircle, { className: "w-8 h-8" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-8 bg-white/50 dark:bg-gray-800/40 p-2 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
            { id: "summary", label: "Ringkasan", icon: Activity },
            { id: "legal", label: "Pernyataan & S&K", icon: ShieldCheck },
            { id: "screening", label: "Skrining AI", icon: Heart },
            { id: "financial", label: "Histori Transaksi", icon: CreditCard }
          ].map((t) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setPatientSubTab(t.id),
              className: `flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${patientSubTab === t.id ? "bg-indigo-600 text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`,
              children: [
                /* @__PURE__ */ jsx(t.icon, { className: "w-4 h-4" }),
                " ",
                t.label
              ]
            },
            t.id
          )) }),
          /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            patientSubTab === "summary" && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "Telepon" }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white", children: selectedPatientDetail.phone || "-" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "Usia" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg font-black text-gray-900 dark:text-white", children: [
                    selectedPatientDetail.age || "-",
                    " Tahun"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: "Gender" }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white capitalize", children: selectedPatientDetail.gender || "-" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-8", children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-rose-500" }),
                  " Lokasi & Kontak Darurat"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider", children: "Alamat Lengkap" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: selectedPatientDetail.address || "Belum diisi." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-6 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl space-y-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-rose-600 uppercase", children: "Kontak Darurat" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: selectedPatientDetail.emergency_contact_name || "N/A" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-rose-600", children: selectedPatientDetail.emergency_contact_phone || "-" })
                  ] })
                ] })
              ] })
            ] }, "p-summary"),
            patientSubTab === "legal" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase mb-8 ml-2 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                "Dokumen Persetujuan Digital"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { className: `p-8 rounded-[2rem] border min-h-[300px] flex flex-col justify-between ${selectedPatientDetail.agreement_signed_at ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-800/50" : "bg-gray-50 border-gray-100"}`, children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                      /* @__PURE__ */ jsx(ShieldCheck, { className: `w-10 h-10 ${selectedPatientDetail.agreement_signed_at ? "text-emerald-500" : "text-gray-200"}` }),
                      selectedPatientDetail.agreement_signed_at && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
                        /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase", children: "Two Docs Signed" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold text-emerald-600 mt-1 uppercase", children: "VERIFIED DIGITAL" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-black text-gray-900 dark:text-white uppercase leading-tight", children: "PERNYATAAN AWAL + PERJANJIAN LAYANAN" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest", children: [
                      "Signed at: ",
                      selectedPatientDetail.agreement_signed_at ? new Date(selectedPatientDetail.agreement_signed_at).toLocaleString("id-ID") : "Not Signed"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mt-6", children: [
                    selectedPatientDetail.agreement_data?.signature_1 && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-1", children: "Doc 1: Pernyataan" }),
                      /* @__PURE__ */ jsx("img", { src: selectedPatientDetail.agreement_data.signature_1, alt: "Signature 1", className: "h-10 w-full object-contain invert dark:invert-0" })
                    ] }),
                    selectedPatientDetail.digital_signature && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-1", children: "Doc 2: Perjanjian" }),
                      /* @__PURE__ */ jsx("img", { src: selectedPatientDetail.digital_signature, alt: "Signature 2", className: "h-10 w-full object-contain invert dark:invert-0" })
                    ] })
                  ] }),
                  selectedPatientDetail.agreement_signed_at && /* @__PURE__ */ jsxs("a", { href: route("admin.users.agreement", selectedPatientDetail.id), target: "_blank", rel: "noreferrer", className: "mt-6 w-full py-4 bg-white dark:bg-gray-800 text-center text-[10px] font-black uppercase rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex items-center justify-center gap-2", children: [
                    "Lihat Kedua Dokumen ",
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: `p-8 rounded-[2rem] border min-h-[300px] flex flex-col justify-between ${selectedPatientDetail.affiliate_agreement_signed_at ? "bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-800/50" : "bg-gray-50 border-gray-100"}`, children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                      /* @__PURE__ */ jsx(Fingerprint, { className: `w-10 h-10 ${selectedPatientDetail.affiliate_agreement_signed_at ? "text-indigo-500" : "text-gray-200"}` }),
                      selectedPatientDetail.affiliate_agreement_signed_at && /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase", children: "Affiliate Member" })
                    ] }),
                    /* @__PURE__ */ jsx("h4", { className: "text-lg font-black text-gray-900 dark:text-white uppercase leading-tight", children: "PERJANJIAN MITRA AFFILIATE" })
                  ] }),
                  selectedPatientDetail.affiliate_signature ? /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-indigo-100/50", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-1", children: "Affiliate Signature" }),
                    /* @__PURE__ */ jsx("img", { src: selectedPatientDetail.affiliate_signature, className: "h-16 w-full object-contain invert dark:invert-0", alt: "af-signature" })
                  ] }) : /* @__PURE__ */ jsx("div", { className: "mt-6 text-center text-[10px] font-bold text-gray-400 uppercase italic border border-dashed p-8 rounded-2xl", children: "Belum Bergabung Afiliasi" })
                ] }),
                selectedPatientDetail.transactions?.filter((tx) => tx.transactionable_type?.includes("Course") && tx.payment_agreement_data).map((tx) => /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-[2rem] border bg-gray-50/50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700 md:col-span-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-6", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1", children: "E-Learning / Kelas" }),
                      /* @__PURE__ */ jsxs("h4", { className: "font-black text-gray-900 dark:text-white uppercase leading-tight", children: [
                        "S&K Peserta Kelas: ",
                        tx.transactionable?.title || "Course"
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[9px] font-bold text-gray-400 mt-1", children: [
                        "Invoice: ",
                        tx.invoice_number
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(Clipboard, { className: "w-10 h-10 text-gray-200" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-emerald-500 rounded-xl text-white", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400", children: "Persetujuan Terdaftar" }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 font-mono italic", children: new Date(tx.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("button", { onClick: () => setSelectedCourseAgreement({ tx, data: tx.payment_agreement_data }), className: "w-full py-4 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 rounded-2xl hover:shadow-lg transition-all", children: "Lihat Detail S&K Lengkap" })
                ] }, `course-legal-${tx.id}`))
              ] })
            ] }) }, "p-legal"),
            patientSubTab === "screening" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "space-y-6", children: selectedPatientDetail.screening_results?.length > 0 ? selectedPatientDetail.screening_results.map((res, ridx) => /* @__PURE__ */ jsxs("div", { className: "p-10 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-indigo-500 uppercase tracking-widest", children: [
                    "Sesi Skrining #",
                    selectedPatientDetail.screening_results.length - ridx
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-500", children: new Date(res.completed_at || res.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "px-5 py-2 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20", children: res.severity_label || "Analyzed" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Summary Diagnosa AI" }),
                /* @__PURE__ */ jsxs("p", { className: "text-2xl font-black text-gray-900 dark:text-white leading-tight italic", children: [
                  '"',
                  res.ai_summary || "-",
                  '"'
                ] })
              ] }),
              res.chat_history && /* @__PURE__ */ jsxs("div", { className: "p-8 bg-gray-50/30 dark:bg-gray-900/40 rounded-[2rem] border border-gray-100 dark:border-gray-800", children: [
                /* @__PURE__ */ jsx("h5", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6", children: "Chat History Log" }),
                /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar", children: res.chat_history.map((chat, cidx) => /* @__PURE__ */ jsx("div", { className: `flex ${chat.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[85%] p-4 rounded-2xl text-xs font-bold ${chat.role === "user" ? "bg-indigo-600 text-white shadow-md" : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"}`, children: chat.content }) }, cidx)) })
              ] })
            ] }, res.id)) : /* @__PURE__ */ jsxs("div", { className: "py-24 text-center bg-white dark:bg-gray-800 rounded-[3rem] border border-dashed border-gray-100 dark:border-gray-700", children: [
              /* @__PURE__ */ jsx(Heart, { className: "w-16 h-16 text-gray-100 mx-auto mb-4" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-300 uppercase underline decoration-rose-500 decoration-4 underline-offset-8", children: "Data Skrining Belum Tersedia" })
            ] }) }, "p-screening"),
            patientSubTab === "financial" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "p-8 bg-emerald-50/30 dark:bg-emerald-950/20 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center", children: /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                " Log Transaksi"
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "max-h-[500px] overflow-y-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-900 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-800", children: [
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Invoice / Tanggal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Layanan" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Nominal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Bukti" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Status & Verifikasi" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: selectedPatientDetail.transactions?.length > 0 ? selectedPatientDetail.transactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-emerald-50/10 transition-colors", children: [
                  /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white", children: tx.invoice_number }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: new Date(tx.created_at).toLocaleDateString("id-ID") })
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase text-indigo-600", children: tx.transactionable_type?.split("\\").pop() }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: tx.transactionable?.package_type || tx.transactionable?.title || "System Service" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-gray-900 dark:text-white", children: [
                    "Rp ",
                    new Intl.NumberFormat("id-ID").format(tx.amount)
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: tx.payment_proof ? /* @__PURE__ */ jsx("a", { href: `/storage/${tx.payment_proof}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 group/proof", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/proof:bg-indigo-600 group-hover/proof:text-white transition-all", children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) }) }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-300 italic", children: "N/A" }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${tx.status === "paid" ? "bg-emerald-100 text-emerald-600" : tx.status === "rejected" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"}`, children: tx.status === "paid" ? "VALID / LUNAS" : tx.status }),
                    tx.status === "paid" && tx.validated_at && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-[8px] font-black text-indigo-500 uppercase flex items-center gap-1", children: [
                        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-2.5 h-2.5" }),
                        "By: ",
                        tx.validated_by?.name || "Admin"
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[8px] text-gray-400 font-bold", children: new Date(tx.validated_at).toLocaleDateString("id-ID") })
                    ] })
                  ] }) })
                ] }, tx.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "p-12 text-center text-[10px] font-bold text-gray-400 uppercase italic", children: "Belum ada histori transaksi aktif." }) }) })
              ] }) })
            ] }) }, "p-finance")
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedPatientDetail(null), className: "!rounded-2xl !px-12 !py-4 font-black uppercase tracking-widest text-[10px]", children: "Tutup Detail Pasien" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedCourseAgreement !== null, onClose: () => setSelectedCourseAgreement(null), maxWidth: "2xl", children: selectedCourseAgreement && /* @__PURE__ */ jsxs("div", { className: "p-10 dark:bg-gray-900 rounded-[2.5rem] relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2", children: "Syarat & Ketentuan Peserta" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8", children: [
            "Kelas: ",
            selectedCourseAgreement.tx.transactionable?.title
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 max-h-[400px] overflow-y-auto mb-8 custom-scrollbar", children: /* @__PURE__ */ jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap", children: selectedCourseAgreement.data.agreement_text || "Peserta setuju untuk mengikuti seluruh rangkaian materi dan mematuhi kode etik bimbingan InDepth Mental Wellness." }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-gray-400 uppercase mb-2", children: "Tanda Tangan Peserta" }),
              /* @__PURE__ */ jsx("img", { src: selectedCourseAgreement.data.signature, className: "h-16 mx-auto object-contain invert dark:invert-0", alt: "course-signature" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 flex flex-col justify-center items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-emerald-500 mb-1" }),
              /* @__PURE__ */ jsx("p", { className: "text-[8px] font-black text-emerald-600 uppercase", children: "Tervalidasi Sistem" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-500 mt-1", children: new Date(selectedCourseAgreement.tx.created_at).toLocaleDateString("id-ID") })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedCourseAgreement(null), className: "w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black text-[10px] uppercase rounded-2xl shadow-xl tracking-widest", children: "Tutup Dokumen" })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedRescheduleBooking !== null, onClose: () => setSelectedRescheduleBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "p-10 dark:bg-gray-900 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Jadwal Ulang Pasien" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                value: rescheduleData.new_schedule_id,
                onChange: (e) => setRescheduleData((prev) => ({ ...prev, new_schedule_id: e.target.value, new_date: "", new_start_time: "", new_end_time: "" })),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Buat Jadwal Custom (Manual) --" }),
                  availableSchedules?.filter((s) => s.id !== selectedRescheduleBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                    new Date(s.date).toLocaleDateString("id-ID"),
                    " | ",
                    s.start_time.substring(0, 5),
                    " WIB | ",
                    s.therapist?.name
                  ] }, s.id))
                ]
              }
            ),
            !rescheduleData.new_schedule_id && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(TextInput, { type: "date", className: "sm:col-span-2", value: rescheduleData.new_date, onChange: (e) => setRescheduleData("new_date", e.target.value) }),
              /* @__PURE__ */ jsx(TextInput, { type: "time", value: rescheduleData.new_start_time, onChange: (e) => setRescheduleData("new_start_time", e.target.value) }),
              /* @__PURE__ */ jsx(TextInput, { type: "time", value: rescheduleData.new_end_time, onChange: (e) => setRescheduleData("new_end_time", e.target.value) })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                rows: "3",
                placeholder: "Alasan reschedule...",
                value: rescheduleData.reschedule_reason,
                onChange: (e) => setRescheduleData("reschedule_reason", e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedRescheduleBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: rescheduling, className: "px-8 py-3 bg-amber-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl", children: "Konfirmasi" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedNoShowBooking !== null, onClose: () => setSelectedNoShowBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "p-10 dark:bg-gray-900 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Batalkan / No-Show" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                value: noShowData.no_show_party,
                onChange: (e) => setNoShowData("no_show_party", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "cancel", children: "Batalkan Total (Open Slot)" }),
                  /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien Tidak Hadir (Slot Hangus)" }),
                  /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi Berhalangan (Slot Hangus)" })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                placeholder: "Alasan pembatalan...",
                rows: "3",
                value: noShowData.no_show_reason,
                onChange: (e) => setNoShowData("no_show_reason", e.target.value),
                required: noShowData.no_show_party !== "cancel"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedNoShowBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: markingNoShow, className: "px-8 py-3 bg-rose-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl", children: "Konfirmasi" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isAddingPatient, onClose: () => setIsAddingPatient(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleAddPatient, className: "p-10 dark:bg-gray-900 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Tambah Pasien Manual" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                value: addPatientData.patient_id,
                onChange: (e) => setAddPatientData("patient_id", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Cari Nama Pasien --" }),
                  patients.map((p) => /* @__PURE__ */ jsxs("option", { value: p.id, children: [
                    p.name,
                    " (",
                    p.email,
                    ")"
                  ] }, p.id))
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold shadow-inner",
                value: addPatientData.package_type,
                onChange: (e) => setAddPatientData("package_type", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "reguler", children: "Reguler / Umum" }),
                  /* @__PURE__ */ jsx("option", { value: "hipnoterapi", children: "Paket Hipnoterapi" }),
                  /* @__PURE__ */ jsx("option", { value: "premium", children: "Paket Premium" }),
                  /* @__PURE__ */ jsx("option", { value: "vip", children: "Paket VIP" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsAddingPatient(false), children: "Batal" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: addingPatient, className: "px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase rounded-2xl shadow-xl", children: "Proses Pendaftaran" })
          ] })
        ] }) })
      ]
    }
  );
}
function SchedulesShow(props) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(InnerSchedulesShow, { ...props }) });
}
export {
  SchedulesShow as default
};
