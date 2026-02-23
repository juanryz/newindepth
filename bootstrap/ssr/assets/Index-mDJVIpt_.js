import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { usePage, useForm, router, Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Users, CreditCard, ChevronRight, FileText, Eye, CheckCircle2 } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createPortal } from "react-dom";
import Form from "./Form-CKKRVOvB.js";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-BIpzS1gx.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function renderEventContent(eventInfo) {
  const isBooked = eventInfo.event.extendedProps.bookings?.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full p-2 rounded-xl transition-all flex flex-col justify-center gap-1 overflow-hidden ${isBooked ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm"}`, children: [
    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest opacity-80 leading-none", children: eventInfo.timeText }),
    /* @__PURE__ */ jsx("div", { className: `text-xs font-black truncate leading-tight uppercase tracking-tight ${isBooked ? "text-white" : "text-slate-900 dark:text-white"}`, children: isBooked ? "✅ TERISI" : eventInfo.event.extendedProps.therapist?.name }),
    !isBooked && /* @__PURE__ */ jsx("div", { className: "text-[8px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest", children: eventInfo.event.extendedProps.schedule_type === "class" ? "🎓 Kelas" : "👥 Konsultasi" }),
    isBooked && /* @__PURE__ */ jsxs("div", { className: "text-[8px] font-black text-white/70 uppercase tracking-widest", children: [
      eventInfo.event.extendedProps.bookings.length,
      " Pasien"
    ] })
  ] });
}
const calendarStyles = `
    .fc { --fc-border-color: rgba(255,255,255,0.05); --fc-button-bg-color: transparent; --fc-button-border-color: rgba(255,255,255,0.1); --fc-button-hover-bg-color: rgba(99,102,241,0.1); --fc-button-active-bg-color: rgba(99,102,241,0.2); --fc-today-bg-color: rgba(99,102,241,0.05); font-family: 'Inter', sans-serif; border: none !important; }
    .dark .fc { --fc-border-color: rgba(255,255,255,0.03); }
    .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color) !important; }
    .fc-col-header-cell { padding: 20px 0 !important; background: rgba(255,255,255,0.02); }
    .fc-col-header-cell-cushion { text-transform: uppercase; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; color: #6366f1; }
    .fc-timegrid-slot { height: 4em !important; border-bottom: 1px solid var(--fc-border-color) !important; }
    .fc-timegrid-slot-label-cushion { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
    .fc-event { border: none !important; border-radius: 12px !important; padding: 4px !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
    .fc-event:hover { transform: scale(1.02) translateY(-2px); z-index: 50; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    .fc-v-event { background: transparent !important; }
    .fc-event-main { padding: 4px !important; }
    .fc-timegrid-now-indicator-line { border-color: #6366f1 !important; border-width: 2px !important; }
    .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: -0.025em; color: #1e293b; }
    .dark .fc-toolbar-title { color: #f8fafc; }
    .fc-button-primary { background-color: white !important; border: 1px solid rgba(0,0,0,0.05) !important; color: #475569 !important; font-weight: 800 !important; font-size: 11px !important; text-transform: uppercase !important; border-radius: 12px !important; padding: 8px 16px !important; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important; }
    .dark .fc-button-primary { background-color: #1e293b !important; border-color: rgba(255,255,255,0.05) !important; color: #cbd5e1 !important; }
    .fc-button-primary:hover { background-color: #f8fafc !important; }
    .dark .fc-button-primary:hover { background-color: #334155 !important; }
    .fc-button-active { background-color: #4f46e5 !important; border-color: #4f46e5 !important; color: white !important; }
`;
function OrderManagementIndex({ schedules, bookings, transactions, therapists, availableSchedules = [], filters }) {
  const [activeTab, setActiveTab] = useState("schedules");
  const { flash, errors: pageErrors } = usePage().props;
  const [isAdding, setIsAdding] = useState(false);
  const [therapistId, setTherapistId] = useState(filters.therapist_id || "");
  const [calendarView, setCalendarView] = useState("timeGridWeek");
  const calendarRef = useRef(null);
  const { data: assignData, setData: setAssignData, patch, processing: assigning } = useForm({ therapist_id: "" });
  const [editingBooking, setEditingBooking] = useState(null);
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [noShowBooking, setNoShowBooking] = useState(null);
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({ new_schedule_id: "", reschedule_reason: "" });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({ no_show_party: "therapist", no_show_reason: "" });
  const [selectedReject, setSelectedReject] = useState(null);
  const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject, processing: rejecting } = useForm({ rejection_reason: "" });
  const { post: validatePost, processing: validating } = useForm({});
  const tabs = [
    { id: "schedules", label: "Jadwal", icon: Calendar, count: schedules?.length || 0 },
    { id: "bookings", label: "Booking", icon: Users, count: bookings?.length || 0 },
    { id: "transactions", label: "Pembayaran", icon: CreditCard, count: transactions?.length || 0 }
  ];
  useEffect(() => {
    const handleResize = () => setCalendarView(window.innerWidth < 1024 ? "timeGridDay" : "timeGridWeek");
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (therapistId !== (filters.therapist_id || "")) {
      router.get(route("admin.orders.index"), { ...filters, therapist_id: therapistId }, { preserveState: true, replace: true });
    }
  }, [therapistId]);
  const handleEventClick = (info) => router.visit(route("admin.schedules.show", info.event.id));
  const handleAssign = (bookingId) => patch(route("admin.bookings.assign-therapist", bookingId), { onSuccess: () => setEditingBooking(null) });
  const handleReschedule = (e) => {
    e.preventDefault();
    postReschedule(route("admin.bookings.reschedule", reschedulingBooking.id), { onSuccess: () => {
      setReschedulingBooking(null);
      resetReschedule();
    } });
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    postNoShow(route("admin.bookings.no-show", noShowBooking.id), { onSuccess: () => {
      setNoShowBooking(null);
      resetNoShow();
    } });
  };
  const handleValidate = (tx) => {
    if (confirm("Validasi transaksi ini?\n\nTerapis akan otomatis ditugaskan secara acak.")) validatePost(route("admin.transactions.validate", tx.id));
  };
  const submitReject = (e) => {
    e.preventDefault();
    rejectPost(route("admin.transactions.reject", selectedReject.id), { onSuccess: () => {
      setSelectedReject(null);
      resetReject();
    } });
  };
  const getStatusBadge = (status) => {
    const s = { pending_screening: "bg-yellow-100 text-yellow-800", pending_payment: "bg-blue-100 text-blue-800", pending_validation: "bg-indigo-100 text-indigo-800", confirmed: "bg-green-100 text-green-800", completed: "bg-gray-100 text-gray-800", cancelled: "bg-red-100 text-red-800" };
    const l = { pending_screening: "Menunggu Skrining", pending_payment: "Menunggu Bayar", pending_validation: "Menunggu Validasi", confirmed: "Dikonfirmasi", completed: "Selesai", cancelled: "Dibatalkan" };
    return /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s[status] || s.pending_payment}`, children: l[status] || status });
  };
  const formatSchedule = (tx) => {
    const booking = tx.transactionable;
    if (!booking?.schedule) return null;
    const schedule = booking.schedule;
    try {
      return { dateStr: new Date(schedule.date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" }), startTime: schedule.start_time?.substring(0, 5) || "--:--", endTime: schedule.end_time?.substring(0, 5) || "--:--" };
    } catch {
      return null;
    }
  };
  const pendingTxCount = transactions?.filter((t) => t.status === "pending")?.length || 0;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Manajemen Order" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1", children: "Mengelola Jadwal, Pasien dan Pembayaran" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Manajemen Order" }),
        /* @__PURE__ */ jsx("style", { children: calendarStyles }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          flash?.success && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-xl", children: flash.success }),
          pageErrors?.error && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 backdrop-blur-xl", children: pageErrors.error }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:w-72 flex-shrink-0 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
                  children: [
                    /* @__PURE__ */ jsx(tab.icon, { className: `w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-indigo-500"}` }),
                    /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: tab.label }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      tab.id === "transactions" && pendingTxCount > 0 && /* @__PURE__ */ jsx("span", { className: `w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-amber-500 text-white animate-pulse"}`, children: pendingTxCount }),
                      activeTab === tab.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 opacity-50" })
                    ] })
                  ]
                },
                tab.id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 p-6", children: [
                /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-500 uppercase mb-4", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
                  " Ringkasan"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Total Slot Jadwal" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: schedules?.length || 0 })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Total Booking" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: bookings?.length || 0 })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Transaksi Pending" }),
                    /* @__PURE__ */ jsx("p", { className: `text-xl font-black ${pendingTxCount > 0 ? "text-amber-600" : "text-emerald-600"}`, children: pendingTxCount })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "schedules" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-teal-500 rounded-full" }),
                    "Kelola Jadwal Praktek"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("button", { onClick: () => window.print(), className: "px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-gray-100 transition-all", children: "Cetak" }),
                    /* @__PURE__ */ jsx("button", { onClick: () => setIsAdding(true), className: "px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20", children: "+ Tambah Slot" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-8 pb-6 border-b border-gray-100 dark:border-gray-700/50", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: "Filter Terapis" }),
                  /* @__PURE__ */ jsxs("select", { value: therapistId, onChange: (e) => setTherapistId(e.target.value), className: "w-full sm:w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all", children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Semua Terapis" }),
                    therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900/20 rounded-[2rem] transition-colors overflow-hidden", children: /* @__PURE__ */ jsx(
                  FullCalendar,
                  {
                    ref: calendarRef,
                    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialView: calendarView,
                    headerToolbar: { left: "prev,next", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" },
                    locale: "id",
                    slotMinTime: "08:00:00",
                    slotMaxTime: "22:00:00",
                    slotDuration: "01:00:00",
                    allDaySlot: false,
                    events: schedules,
                    eventClick: handleEventClick,
                    editable: false,
                    droppable: false,
                    eventContent: renderEventContent,
                    height: "auto",
                    expandRows: true,
                    stickyHeaderDates: true,
                    nowIndicator: true
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Terisi" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tersedia" })
                  ] })
                ] })
              ] }) }, "schedules"),
              activeTab === "bookings" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                    "Booking Pasien"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                    bookings.length,
                    " Total"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30", children: [
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Info Booking" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Pasien & Screening" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Jadwal" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Status" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Terapis & Aksi" })
                  ] }) }),
                  /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800/50", children: [
                    bookings.map((booking) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-900 dark:text-white mb-1", children: booking.booking_code }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit", children: booking.package_type?.toUpperCase() || "KONSULTASI" })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 dark:text-white", children: booking.patient?.name }),
                          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: booking.patient?.email })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1 my-1", children: /* @__PURE__ */ jsx("div", { className: `h-1 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? "bg-emerald-500" : "bg-amber-500"}`, style: { width: `${booking.patient_profile_stats?.percentage || 0}%` } }) }),
                            /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-gray-400 uppercase", children: [
                              booking.patient_profile_stats?.percentage || 0,
                              "%"
                            ] })
                          ] }),
                          booking.patient?.screening_completed_at ? /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-emerald-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3", children: "OK" }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3", children: "No" })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: booking.schedule ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: new Date(booking.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) }),
                        /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                          booking.schedule.start_time?.substring(0, 5),
                          " WIB"
                        ] })
                      ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 italic", children: "No Slot" }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: getStatusBadge(booking.status) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: editingBooking === booking.id ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-3 rounded-xl border border-white dark:border-gray-700 shadow-lg", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest", children: "Assign Terapis" }),
                        /* @__PURE__ */ jsxs("select", { className: "text-xs bg-gray-50 dark:bg-gray-900 border-none rounded-lg focus:ring-2 focus:ring-indigo-500/20", value: assignData.therapist_id, onChange: (e) => setAssignData("therapist_id", e.target.value), children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Terapis" }),
                          therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-1", children: [
                          /* @__PURE__ */ jsx("button", { onClick: () => handleAssign(booking.id), className: "flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg disabled:opacity-50", disabled: assigning || !assignData.therapist_id, children: "Simpan" }),
                          /* @__PURE__ */ jsx("button", { onClick: () => setEditingBooking(null), className: "flex-1 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase rounded-lg", children: "Batal" })
                        ] })
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between group/tp", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5", children: "PJ" }),
                            booking.therapist ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-900 dark:text-white", children: booking.therapist.name }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-amber-500", children: ["pending_payment", "pending_validation"].includes(booking.status) ? "⏳ Otomatis" : "BELUM" })
                          ] }),
                          /* @__PURE__ */ jsx("button", { onClick: () => {
                            setEditingBooking(booking.id);
                            setAssignData("therapist_id", booking.therapist_id || "");
                          }, className: "p-1.5 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg opacity-0 group-hover:opacity-100 group-hover/tp:opacity-100 transition-all", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800/50", children: [
                          booking.schedule_id && /* @__PURE__ */ jsx(Link, { href: route("admin.schedules.show", booking.schedule_id), className: "px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 hover:text-indigo-500 transition-all", children: "Detail" }),
                          ["confirmed", "in_progress"].includes(booking.status) && /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx("button", { onClick: () => setReschedulingBooking(booking), className: "px-2 py-1.5 bg-amber-500 text-white text-[9px] font-black uppercase rounded-lg", children: "Reschedule" }),
                            /* @__PURE__ */ jsx("button", { onClick: () => setNoShowBooking(booking), className: "px-2 py-1.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-lg", children: "No-Show" })
                          ] })
                        ] })
                      ] }) }) })
                    ] }, booking.id)),
                    bookings.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-8 py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic", children: "Belum ada booking pasien." }) }) })
                  ] })
                ] }) })
              ] }) }, "bookings"),
              activeTab === "transactions" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-emerald-50/30 dark:bg-emerald-950/20", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                    "Validasi Pembayaran"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "px-4 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                    transactions.length,
                    " Transaksi"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30", children: [
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Invoice" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Pengguna" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Layanan" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Nominal" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Bukti" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Status" }),
                    /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Aksi" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800/50", children: transactions.map((tx) => {
                    const scheduleInfo = formatSchedule(tx);
                    const isBooking = tx.transactionable_type?.includes("Booking");
                    const hasDiscount = tx.transactionable?.user_voucher?.voucher;
                    return /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-900 dark:text-white mb-1", children: tx.invoice_number }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: tx.payment_bank || "-" })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: tx.user?.name }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: tx.user?.email })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-500/20 w-fit uppercase tracking-widest", children: isBooking ? "Booking" : tx.transactionable_type?.split("\\").pop() }),
                        isBooking && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-indigo-500 uppercase", children: tx.transactionable?.package_type || "Package" }),
                        scheduleInfo && /* @__PURE__ */ jsxs("div", { className: "flex flex-col mt-1", children: [
                          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-gray-600 dark:text-gray-400", children: [
                            "📅 ",
                            scheduleInfo.dateStr
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-gray-600 dark:text-gray-400", children: [
                            "🕐 ",
                            scheduleInfo.startTime,
                            " – ",
                            scheduleInfo.endTime
                          ] })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-gray-900 dark:text-white", children: [
                          "Rp ",
                          new Intl.NumberFormat("id-ID").format(tx.amount || 0)
                        ] }),
                        hasDiscount ? /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-col", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-500 uppercase", children: "🏷️ DISKON" }),
                          /* @__PURE__ */ jsxs("span", { className: "px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 text-[10px] font-black rounded-md border border-rose-100 dark:border-rose-800 line-through w-fit", children: [
                            "Rp ",
                            new Intl.NumberFormat("id-ID").format((tx.amount || 0) + (tx.transactionable.user_voucher.voucher.discount_amount || 0))
                          ] })
                        ] }) : /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold text-gray-400 uppercase mt-1", children: "Normal" })
                      ] }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: tx.payment_proof ? /* @__PURE__ */ jsxs("a", { href: `/storage/${tx.payment_proof}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 group/proof", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/proof:bg-indigo-500 group-hover/proof:text-white transition-all", children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-500 group-hover/proof:text-indigo-600 uppercase", children: "Lihat" })
                      ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-500 uppercase italic", children: "Belum Upload" }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border ${tx.status === "paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : tx.status === "rejected" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : tx.status === "pending" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`, children: tx.status === "paid" ? "Valid" : tx.status === "rejected" ? "Ditolak" : tx.status === "pending" ? "Menunggu" : tx.status }) }),
                      /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-center", children: [
                        tx.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
                          /* @__PURE__ */ jsx("button", { disabled: validating, onClick: () => handleValidate(tx), className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50", children: validating ? "..." : "Validasi" }),
                          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedReject(tx), className: "px-4 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-rose-600/20 transition-all", children: "Tolak" })
                        ] }),
                        tx.status === "paid" && tx.validated_at && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                          /* @__PURE__ */ jsxs("span", { className: "text-[9px] text-gray-400 font-bold", children: [
                            "✓ ",
                            new Date(tx.validated_at).toLocaleDateString("id-ID")
                          ] }),
                          tx.validated_by && /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-indigo-500 uppercase flex items-center gap-1", children: [
                            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
                            tx.validated_by_user?.name || tx.validated_by?.name || "Admin"
                          ] })
                        ] })
                      ] })
                    ] }, tx.id);
                  }) })
                ] }) }),
                transactions.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-12 h-12 text-gray-200 mx-auto mb-4" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-black uppercase tracking-[0.2em] italic", children: "Tidak ada transaksi." })
                ] })
              ] }) }, "transactions")
            ] }) })
          ] })
        ] }) }),
        isAdding && typeof document !== "undefined" && createPortal(
          /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/60 backdrop-blur-md", onClick: () => setIsAdding(false) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative border border-white dark:border-gray-800", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-gray-900 dark:text-white tracking-tight", children: "Tambah Slot Jadwal" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setIsAdding(false), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
              ] }),
              /* @__PURE__ */ jsx(Form, { therapists, onSuccess: () => setIsAdding(false) })
            ] })
          ] }),
          document.body
        ),
        /* @__PURE__ */ jsx(Modal, { show: reschedulingBooking !== null, onClose: () => setReschedulingBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-1", children: "Reschedule Sesi" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-6", children: [
            "Pasien: ",
            /* @__PURE__ */ jsx("strong", { children: reschedulingBooking?.patient?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "new_schedule_id", value: "Pilih Jadwal Baru" }),
            /* @__PURE__ */ jsxs("select", { id: "new_schedule_id", className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm", value: rescheduleData.new_schedule_id, onChange: (e) => setRescheduleData("new_schedule_id", e.target.value), required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Slot Tersedia --" }),
              availableSchedules.filter((s) => s.id !== reschedulingBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                s.therapist?.name,
                " — ",
                new Date(s.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
                " — ",
                s.start_time?.substring(0, 5)
              ] }, s.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reschedule_reason", value: "Alasan Reschedule" }),
            /* @__PURE__ */ jsx("textarea", { id: "reschedule_reason", className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm", rows: "2", value: rescheduleData.reschedule_reason, onChange: (e) => setRescheduleData("reschedule_reason", e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setReschedulingBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: rescheduling || !rescheduleData.new_schedule_id, className: "inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 disabled:opacity-25 transition", children: "Update Jadwal" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: noShowBooking !== null, onClose: () => setNoShowBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-1", children: "Tandai Tidak Hadir" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-6", children: [
            "Booking Code: ",
            noShowBooking?.booking_code
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_party", value: "Pihak yang Tidak Hadir" }),
            /* @__PURE__ */ jsxs("select", { id: "no_show_party", className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm", value: noShowData.no_show_party, onChange: (e) => setNoShowData("no_show_party", e.target.value), required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi (Tidak Hadir)" }),
              /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien (Tidak Hadir)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_reason", value: "Keterangan Admin" }),
            /* @__PURE__ */ jsx("textarea", { id: "no_show_reason", className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm", rows: "2", value: noShowData.no_show_reason, onChange: (e) => setNoShowData("no_show_reason", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setNoShowBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: markingNoShow, className: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 disabled:opacity-25 transition", children: "Tandai No-Show" })
          ] })
        ] }) }),
        selectedReject && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold dark:text-white mb-2", children: "Tolak Pembayaran" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              "Invoice: ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: selectedReject.invoice_number })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitReject, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Alasan Penolakan" }),
              /* @__PURE__ */ jsx("textarea", { className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]", value: rejectData.rejection_reason, onChange: (e) => setRejectData("rejection_reason", e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: rejecting, className: "!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center", children: rejecting ? "Memproses..." : "Konfirmasi Penolakan" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedReject(null), className: "text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors py-2", children: "Batal" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  OrderManagementIndex as default
};
