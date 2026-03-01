import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DqAHi6I1.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function TherapistScheduleIndex({ bookings, availableSchedules = [], calendarSchedules = [], mySchedules = [] }) {
  const { auth, flash, errors: pageErrors } = usePage().props;
  const isAdmin = auth.user?.roles?.some((r) => ["admin", "super_admin"].includes(r)) ?? false;
  const [selectedHistoryPatient, setSelectedHistoryPatient] = useState(null);
  const [selectedCompletingBooking, setSelectedCompletingBooking] = useState(null);
  const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
  const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("calendar");
  const [historyFilter, setHistoryFilter] = useState("pending");
  const [historyDateFrom, setHistoryDateFrom] = useState("");
  const [historyDateTo, setHistoryDateTo] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [schedulePage, setSchedulePage] = useState(1);
  const scheduleItemsPerPage = 10;
  const currentSchedules = mySchedules.slice((schedulePage - 1) * scheduleItemsPerPage, schedulePage * scheduleItemsPerPage);
  const totalSchedulePages = Math.ceil(mySchedules.length / scheduleItemsPerPage);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { data: recurData, setData: setRecurData, post: postRecur, processing: savingRecur, reset: resetRecur, errors: recurErrors } = useForm({
    days_of_week: [],
    // array of ints: 1=Mon,2=Tue,...,0=Sun
    start_time: "09:00",
    end_time: "12:00",
    date_from: "",
    date_to: "",
    quota: 1,
    schedule_type: "consultation"
  });
  const DAYS = [
    { id: 1, short: "Sen", long: "Senin" },
    { id: 2, short: "Sel", long: "Selasa" },
    { id: 3, short: "Rab", long: "Rabu" },
    { id: 4, short: "Kam", long: "Kamis" },
    { id: 5, short: "Jum", long: "Jumat" }
  ];
  const toggleDay = (dayId) => {
    const curr = recurData.days_of_week;
    setRecurData("days_of_week", curr.includes(dayId) ? curr.filter((d) => d !== dayId) : [...curr, dayId]);
  };
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const { data: completeData, setData: setCompleteData, post: postComplete, processing: completing, reset: resetComplete, errors: completeErrors } = useForm({
    recording_link: "",
    therapist_notes: "",
    patient_visible_notes: "",
    completion_outcome: "Normal"
  });
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
    new_schedule_id: "",
    reschedule_reason: ""
  });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
    no_show_party: "patient",
    no_show_reason: ""
  });
  const closeHistoryModal = () => {
    setSelectedHistoryPatient(null);
  };
  const handleStartSession = (bookingId) => {
    if (confirm("Mulai sesi terapi sekarang? Status akan berubah menjadi Sedang Berlangsung.")) {
      router.post(route("schedules.start", bookingId));
    }
  };
  const openCompleteModal = (booking) => {
    setSelectedCompletingBooking(booking);
    setCompleteData({
      recording_link: booking.recording_link || "",
      therapist_notes: booking.therapist_notes || "",
      patient_visible_notes: booking.patient_visible_notes || "",
      completion_outcome: booking.completion_outcome || "Normal"
    });
  };
  const closeCompleteModal = () => {
    setSelectedCompletingBooking(null);
    resetComplete();
  };
  const handleCompleteSession = (e) => {
    e.preventDefault();
    postComplete(route("schedules.complete", selectedCompletingBooking.id), {
      onSuccess: () => closeCompleteModal()
    });
  };
  const openRescheduleModal = (booking) => {
    setSelectedRescheduleBooking(booking);
    setRescheduleData({ new_schedule_id: "", reschedule_reason: "" });
  };
  const closeRescheduleModal = () => {
    setSelectedRescheduleBooking(null);
    resetReschedule();
  };
  const handleReschedule = (e) => {
    e.preventDefault();
    postReschedule(route("schedules.reschedule", selectedRescheduleBooking.id), {
      onSuccess: () => closeRescheduleModal()
    });
  };
  const openNoShowModal = (booking) => {
    setSelectedNoShowBooking(booking);
    setNoShowData({ no_show_party: "patient", no_show_reason: "" });
  };
  const closeNoShowModal = () => {
    setSelectedNoShowBooking(null);
    resetNoShow();
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    postNoShow(route("schedules.no-show", selectedNoShowBooking.id), {
      onSuccess: () => closeNoShowModal()
    });
  };
  const handleAddSchedule = (e) => {
    e.preventDefault();
    postRecur(route("schedules.store-recurring"), {
      onSuccess: () => resetRecur()
    });
  };
  const handleEventClick = (info) => {
    const isMine = info.event.extendedProps.is_mine;
    const booking = info.event.extendedProps.bookings?.[0];
    if (booking) {
      setActiveTab("history");
      setTimeout(() => {
        const element = document.getElementById(`booking-${booking.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("ring-2", "ring-indigo-500", "animate-pulse");
          setTimeout(() => element.classList.remove("ring-2", "ring-indigo-500", "animate-pulse"), 3e3);
        }
      }, 100);
    } else {
      if (!isMine) {
        alert("Anda tidak dapat menghapus slot jadwal yang dibuat oleh praktisi lain.");
        return;
      }
      if (confirm("Slot ini masih kosong. Hapus slot ini?")) {
        router.delete(route("schedules.destroy", info.event.id));
      }
    }
  };
  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const isMine = event.extendedProps.is_mine;
    const isBooked = event.extendedProps.bookings && event.extendedProps.bookings.length > 0;
    const status = isBooked ? event.extendedProps.bookings[0].status : event.extendedProps.status || "available";
    const patientName = isBooked ? event.extendedProps.bookings[0].patient?.name : null;
    let contentClass = "h-full w-full p-1 sm:p-2 rounded-xl flex flex-col justify-center gap-0 sm:gap-1 overflow-hidden transition-all duration-300 ";
    let textClass = "font-black truncate leading-none uppercase tracking-tight pointer-events-none ";
    if (status === "off") {
      contentClass += "bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-60";
      textClass += "text-[9px] text-slate-500 italic";
      return /* @__PURE__ */ jsxs("div", { className: contentClass, children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pointer-events-none mb-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[9px] font-black uppercase tracking-widest opacity-60 leading-tight truncate", children: eventInfo.timeText }) }),
        /* @__PURE__ */ jsx("div", { className: textClass, children: "🏝️ LIBUR" }),
        /* @__PURE__ */ jsx("div", { className: "text-[7.5px] font-bold opacity-60 uppercase tracking-widest truncate", children: "DILIBURKAN ADMIN" })
      ] });
    }
    if (isMine) {
      if (status === "in_progress") {
        contentClass += "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20";
        textClass += "text-xs text-white";
      } else if (status === "completed") {
        contentClass += "bg-gradient-to-br from-slate-400 to-slate-500 text-white shadow-inner opacity-80";
        textClass += "text-[10px] text-white";
      } else {
        contentClass += "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20";
        textClass += "text-xs text-white";
      }
    } else {
      if (isBooked) {
        contentClass += "bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-60";
        textClass += "text-[9px] text-slate-400 dark:text-slate-500";
      } else {
        contentClass += "bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm hover:border-indigo-300";
        textClass += "text-[9px] text-slate-900 dark:text-white";
      }
    }
    return /* @__PURE__ */ jsxs("div", { className: contentClass, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pointer-events-none mb-0.5", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[9px] font-black uppercase tracking-widest opacity-60 leading-tight truncate", children: eventInfo.timeText }),
        isMine && status === "confirmed" && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: textClass, children: isMine ? status === "in_progress" ? "🔴 LIVE" : patientName || "TUGAS ANDA" : isBooked ? "TERISI" : "SLOT TERSEDIA" }),
      /* @__PURE__ */ jsxs("div", { className: "text-[7.5px] sm:text-[8px] font-bold opacity-60 uppercase tracking-widest pointer-events-none flex items-center gap-1 truncate", children: [
        event.extendedProps.schedule_type === "class" ? "🎓 Kelas" : "👥 Sesi",
        isMine && status === "completed" && " • SELESAI"
      ] })
    ] });
  };
  const calendarStyles = `
        .fc {
            --fc-border-color: rgba(255, 255, 255, 0.05);
            --fc-button-bg-color: transparent;
            --fc-button-border-color: rgba(255, 255, 255, 0.1);
            --fc-button-hover-bg-color: rgba(99, 102, 241, 0.1);
            --fc-button-active-bg-color: rgba(99, 102, 241, 0.2);
            --fc-today-bg-color: rgba(99, 102, 241, 0.05);
            font-family: 'Inter', sans-serif;
            border: none !important;
        }
        .dark .fc {
            --fc-border-color: rgba(255, 255, 255, 0.03);
        }
        .fc-theme-standard td, .fc-theme-standard th {
            border: 1px solid var(--fc-border-color) !important;
        }
        .fc-col-header-cell {
            padding: 20px 0 !important;
            background: rgba(255, 255, 255, 0.02);
        }
        .fc-col-header-cell-cushion {
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: #6366f1;
        }
        .fc-timegrid-slot {
            height: 4em !important;
            border-bottom: 1px solid var(--fc-border-color) !important;
        }
        .fc-timegrid-slot-label-cushion {
            font-size: 10px;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .fc-event {
            border: none !important;
            border-radius: 12px !important;
            padding: 4px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fc-event:hover {
            transform: scale(1.02) translateY(-2px);
            z-index: 50;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .fc-v-event {
            background: transparent !important;
        }
        .fc-event-main {
            padding: 4px !important;
        }
        .fc-timegrid-now-indicator-line {
            border-color: #6366f1 !important;
            border-width: 2px !important;
        }
        .fc-timegrid-now-indicator-arrow {
            border-color: #6366f1 !important;
            border-top-color: transparent !important;
            border-bottom-color: transparent !important;
        }
        .fc-toolbar-title {
            font-size: 1.25rem !important;
            font-weight: 900 !important;
            text-transform: uppercase;
            letter-spacing: -0.025em;
            color: #1e293b;
        }
        .dark .fc-toolbar-title {
            color: #f8fafc;
        }
        .fc-daygrid-day-number {
            font-weight: 400 !important;
            font-size: 14px !important;
            color: #475569;
        }
        .dark .fc-daygrid-day-number {
            color: #94a3b8;
        }
        .fc-daygrid-day-top {
            font-weight: 400 !important;
        }
        .fc-daygrid-event {
            font-weight: 500 !important;
        }
        .fc-button-primary {
            background-color: white !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
            color: #475569 !important;
            font-weight: 800 !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            border-radius: 12px !important;
            padding: 8px 16px !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .dark .fc-button-primary {
            background-color: #1e293b !important;
            border-color: rgba(255,255,255,0.05) !important;
            color: #cbd5e1 !important;
        }
        .fc-button-primary:hover {
            background-color: #f8fafc !important;
        }
        .dark .fc-button-primary:hover {
            background-color: #334155 !important;
        }
        .fc-button-active {
            background-color: #4f46e5 !important;
            border-color: #4f46e5 !important;
            color: white !important;
        }
        @media (max-width: 767px) {
            .fc-toolbar { flex-direction: column !important; gap: 8px !important; align-items: stretch !important; }
            .fc-toolbar-title { font-size: 0.9rem !important; text-align: center; }
            .fc-toolbar-chunk { display: flex !important; justify-content: center !important; flex-wrap: wrap !important; gap: 4px !important; }
            .fc-button-primary { font-size: 9px !important; padding: 6px 10px !important; }
            .fc .fc-col-header-cell-cushion { font-size: 9px !important; padding: 4px !important; }
            .fc .fc-timegrid-slot-label-cushion { font-size: 9px !important; }
            .fc-timegrid-slot { height: 3em !important; }
        }
    `;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none", children: "Kelola Jadwal" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-slate-400 dark:text-slate-300 mt-2 uppercase tracking-[0.2em]", children: "Pantau sesi terapi Anda" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Kelola Jadwal Praktik" }),
        /* @__PURE__ */ jsx("style", { children: calendarStyles }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          flash?.success && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 mb-4", children: flash.success }),
          (flash?.error || pageErrors?.error) && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 mb-4", children: flash?.error || pageErrors?.error }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:w-72 flex-shrink-0 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm", children: [
                { id: "calendar", label: "Kalender", icon: "📅" },
                { id: "history", label: "Daftar Sesi", icon: "📋", count: bookings?.filter((b) => ["confirmed", "in_progress"].includes(b.status)).length },
                ...!isAdmin ? [{ id: "mySchedules", label: "Jadwal Saya", icon: "✦", count: mySchedules.length }] : []
              ].map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg", children: tab.icon }),
                    /* @__PURE__ */ jsx("span", { className: "flex-1 text-left uppercase tracking-widest text-[11px]", children: tab.label }),
                    tab.count > 0 && /* @__PURE__ */ jsx("span", { className: `w-6 h-6 rounded-full text-[9px] font-black flex items-center justify-center ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-rose-500 text-white animate-pulse"}`, children: tab.count })
                  ]
                },
                tab.id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 p-6 space-y-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-500 uppercase", children: "Ringkasan" }),
                [
                  { label: "Total Sesi", value: bookings?.length ?? 0, color: "text-gray-900 dark:text-white" },
                  { label: "Akan Datang", value: bookings?.filter((b) => b.status === "confirmed").length ?? 0, color: "text-indigo-600" },
                  { label: "Slot Tersedia", value: mySchedules.length, color: "text-emerald-600" }
                ].map((s) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold text-gray-500 dark:text-gray-400", children: s.label }),
                  /* @__PURE__ */ jsx("span", { className: `text-lg font-black ${s.color}`, children: s.value })
                ] }, s.label))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              activeTab === "calendar" && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-700/50", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                    "Kalender Jadwal"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-200", children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-emerald-500" }),
                      "Slot Anda"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-rose-500" }),
                      "Sedang Berlangsung"
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-indigo-500" }),
                      "Tersedia"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "p-4 md:p-8", children: /* @__PURE__ */ jsx(
                  FullCalendar,
                  {
                    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialView: isMobile ? "timeGridDay" : "timeGridWeek",
                    initialDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"),
                    headerToolbar: isMobile ? { left: "prev,next", center: "title", right: "timeGridDay,dayGridMonth" } : { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" },
                    views: {
                      timeGridWeek: {
                        duration: { days: 7 },
                        buttonText: "7 Hari Rolling"
                      }
                    },
                    weekends: true,
                    events: calendarSchedules,
                    eventClick: handleEventClick,
                    eventContent: renderEventContent,
                    height: "auto",
                    slotMinTime: "08:00:00",
                    slotMaxTime: "22:00:00",
                    slotDuration: "01:00:00",
                    allDaySlot: false,
                    nowIndicator: true,
                    locale: "id",
                    expandRows: true,
                    stickyHeaderDates: true
                  },
                  isMobile ? "mobile" : "desktop"
                ) })
              ] }),
              activeTab === "history" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 pb-4", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3 mb-6", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                    "Daftar Sesi"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-2 p-1.5 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl w-fit border border-slate-200/50 dark:border-slate-800", children: [["pending", "Akan Datang"], ["completed", "Selesai"], ["all", "Semua"]].map(([val, label]) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setHistoryFilter(val),
                      className: `px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${historyFilter === val ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:bg-white dark:hover:bg-slate-700"}`,
                      children: label
                    },
                    val
                  )) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-end justify-between mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50", children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 flex-1 w-full sm:w-auto", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-[0.1em] px-1", children: "Dari Tanggal" }),
                        /* @__PURE__ */ jsx("input", { type: "date", value: historyDateFrom, onChange: (e) => setHistoryDateFrom(e.target.value), className: "w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-[0.1em] px-1", children: "Sampai Tanggal" }),
                        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ jsx("input", { type: "date", value: historyDateTo, onChange: (e) => setHistoryDateTo(e.target.value), className: "flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20" }),
                          (historyDateFrom || historyDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                            setHistoryDateFrom("");
                            setHistoryDateTo("");
                          }, className: "p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl hover:bg-rose-100 hover:text-rose-500 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [
                      {
                        label: "Minggu Ini",
                        range: () => {
                          const d = /* @__PURE__ */ new Date();
                          const day = d.getDay();
                          const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                          const mon = new Date(d.getFullYear(), d.getMonth(), diff);
                          const sun = new Date(d.getFullYear(), d.getMonth(), diff + 6);
                          setHistoryDateFrom(mon.toISOString().split("T")[0]);
                          setHistoryDateTo(sun.toISOString().split("T")[0]);
                        }
                      },
                      {
                        label: "Bulan Ini",
                        range: () => {
                          const d = /* @__PURE__ */ new Date();
                          setHistoryDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0]);
                          setHistoryDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0]);
                        }
                      },
                      {
                        label: "Tahun Ini",
                        range: () => {
                          const d = /* @__PURE__ */ new Date();
                          setHistoryDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split("T")[0]);
                          setHistoryDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split("T")[0]);
                        }
                      }
                    ].map((btn) => /* @__PURE__ */ jsx("button", { type: "button", onClick: btn.range, className: "px-4 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors border border-indigo-100/50 dark:border-indigo-900/50", children: btn.label }, btn.label)) })
                  ] })
                ] }),
                bookings.filter((b) => {
                  if (historyFilter === "pending" && !["confirmed", "in_progress"].includes(b.status)) return false;
                  if (historyFilter === "completed" && b.status !== "completed") return false;
                  if (historyDateFrom && b.schedule?.date && b.schedule.date < historyDateFrom) return false;
                  if (historyDateTo && b.schedule?.date && b.schedule.date > historyDateTo) return false;
                  return true;
                }).length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-white dark:bg-gray-800/40 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-widest text-sm", children: "Tidak ada sesi ditemukan" }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: bookings.filter((b) => {
                  if (historyFilter === "pending" && !["confirmed", "in_progress"].includes(b.status)) return false;
                  if (historyFilter === "completed" && b.status !== "completed") return false;
                  if (historyDateFrom && b.schedule?.date && b.schedule.date < historyDateFrom) return false;
                  if (historyDateTo && b.schedule?.date && b.schedule.date > historyDateTo) return false;
                  return true;
                }).map((booking) => {
                  const isNoShow = booking.completion_outcome?.startsWith("No-Show");
                  const wasRescheduled = !!booking.rescheduled_at;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: `booking-${booking.id}`,
                      className: `rounded-[2.5rem] border shadow-sm p-7 flex flex-col transition-all ${isNoShow ? "bg-orange-50/30 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800/30" : booking.status === "completed" ? "bg-gray-50/50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700" : booking.status === "in_progress" ? "bg-red-50/30 dark:bg-red-900/10 border-red-200 dark:border-red-800/30 ring-2 ring-red-500" : "bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/50"}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("h4", { className: "font-black text-lg text-gray-900 dark:text-white uppercase tracking-tight", children: booking.patient?.name || "Pasien Tidak Dikenal" }),
                            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-bold italic", children: booking.patient?.email || "-" })
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase ${isNoShow ? "bg-orange-100 text-orange-600" : booking.status === "completed" ? "bg-gray-100 text-gray-500" : booking.status === "in_progress" ? "bg-red-100 text-red-600" : "bg-indigo-100 text-indigo-600"}`, children: isNoShow ? "No-Show" : booking.status === "completed" ? "Selesai" : booking.status === "in_progress" ? "🔴 Live" : wasRescheduled ? "Dijadwal Ulang" : "Akan Datang" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50/50 dark:bg-slate-800 rounded-2xl p-4 mb-4 text-xs font-bold text-indigo-900 dark:text-indigo-300 space-y-1", children: [
                          /* @__PURE__ */ jsxs("p", { children: [
                            "📅 ",
                            booking.schedule ? (/* @__PURE__ */ new Date(booking.schedule.date + "T00:00:00")).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "No Date"
                          ] }),
                          /* @__PURE__ */ jsxs("p", { children: [
                            "🕐 ",
                            booking.schedule?.start_time?.substring(0, 5),
                            " – ",
                            booking.schedule?.end_time?.substring(0, 5),
                            " WIB"
                          ] }),
                          /* @__PURE__ */ jsxs("p", { className: "text-[10px] uppercase tracking-widest text-indigo-600/70 pt-1", children: [
                            "Paket: ",
                            booking.package_type || "REGULER"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mt-auto", children: [
                          /* @__PURE__ */ jsx(Link, { href: booking.patient ? route("schedules.patient-detail", booking.patient.id) : "#", className: `w-full text-center text-[10px] font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-3 rounded-2xl uppercase tracking-widest ${!booking.patient ? "opacity-50 cursor-not-allowed" : ""}`, children: "Rekam Medis & Detail" }),
                          booking.status === "confirmed" && /* @__PURE__ */ jsx("button", { onClick: () => handleStartSession(booking.id), className: "w-full text-center text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 py-3 rounded-2xl shadow-lg uppercase", children: "Mulai Sesi" }),
                          booking.status === "in_progress" && /* @__PURE__ */ jsx(Link, { href: route("schedules.active-session", booking.id), className: "w-full text-center text-xs font-black text-white bg-red-600 hover:bg-red-700 py-3 rounded-2xl uppercase", children: "Selesaikan Sesi" }),
                          booking.status === "completed" && /* @__PURE__ */ jsx("button", { onClick: () => openCompleteModal(booking), className: "w-full text-center text-xs font-black text-white bg-slate-900 py-3 rounded-2xl uppercase", children: "Update Data Sesi" }),
                          ["confirmed", "in_progress"].includes(booking.status) && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                            /* @__PURE__ */ jsx("button", { onClick: () => openRescheduleModal(booking), className: "flex-1 text-[10px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-2.5 rounded-2xl uppercase", children: "Jadwal Ulang" }),
                            /* @__PURE__ */ jsx("button", { onClick: () => openNoShowModal(booking), className: "flex-1 text-[10px] font-black text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 py-2.5 rounded-2xl uppercase", children: "Tidak Hadir" })
                          ] })
                        ] })
                      ]
                    },
                    booking.id
                  );
                }) })
              ] }),
              activeTab === "mySchedules" && !isAdmin && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 md:p-10", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                    "Atur Ketersediaan Mingguan"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8", children: "Pilih hari & jam — sistem otomatis membagi slot 2 jam & LIBUR SABTU MINGGU" }),
                  /* @__PURE__ */ jsxs("form", { onSubmit: handleAddSchedule, className: "space-y-7", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block", children: [
                        "Hari Aktif ",
                        /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" }),
                        recurErrors.days_of_week && /* @__PURE__ */ jsx("span", { className: "ml-2 text-rose-500 normal-case font-bold", children: recurErrors.days_of_week })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: DAYS.map((day) => {
                        const active = recurData.days_of_week.includes(day.id);
                        return /* @__PURE__ */ jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => toggleDay(day.id),
                            className: `w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-all border-2 ${active ? "bg-indigo-600 text-white border-indigo-600 scale-105 shadow-lg shadow-indigo-500/30" : "bg-gray-50 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-indigo-300"}`,
                            children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest", children: day.short }),
                              active && /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-white/70 mt-1" })
                            ]
                          },
                          day.id
                        );
                      }) }),
                      recurData.days_of_week.length > 0 && /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold text-indigo-600 mt-2", children: [
                        "✓ Aktif: ",
                        recurData.days_of_week.sort((a, b) => a - b).map((id) => DAYS.find((d) => d.id === id)?.long).join(", ")
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: [["Jam Mulai", "start_time", "06:00", "21:00"], ["Jam Selesai", "end_time", "07:00", "22:00"]].map(([lbl, field, min, max]) => /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: [
                        lbl,
                        " ",
                        /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "time",
                          min,
                          max,
                          value: recurData[field],
                          onChange: (e) => setRecurData(field, e.target.value),
                          required: true,
                          className: "w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-lg font-black text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                        }
                      ),
                      recurErrors[field] && /* @__PURE__ */ jsx("p", { className: "text-rose-500 text-xs mt-1", children: recurErrors[field] })
                    ] }, field)) }),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: [
                          "Berlaku Dari ",
                          /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "date",
                            min: todayStr,
                            value: recurData.date_from,
                            onChange: (e) => setRecurData("date_from", e.target.value),
                            required: true,
                            className: "w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: [
                          "Berlaku Sampai ",
                          /* @__PURE__ */ jsx("span", { className: "text-rose-400", children: "*" })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "date",
                            min: recurData.date_from || todayStr,
                            value: recurData.date_to,
                            onChange: (e) => setRecurData("date_to", e.target.value),
                            required: true,
                            className: "w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "md:col-span-1 hidden", children: [
                        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block", children: "Kuota / Sesi" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "number",
                            min: 1,
                            max: 20,
                            value: recurData.quota,
                            onChange: (e) => setRecurData("quota", Number(e.target.value)),
                            className: "w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: ["consultation", "class"].map((type) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setRecurData("schedule_type", type),
                        className: `px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${recurData.schedule_type === type ? "bg-emerald-600 text-white border-emerald-600 shadow-lg" : "bg-white dark:bg-gray-800 text-gray-600 border-gray-200 hover:border-emerald-300"}`,
                        children: type === "consultation" ? "👥 Konsultasi" : "🎓 Kelas"
                      },
                      type
                    )) }),
                    recurData.days_of_week.length > 0 && recurData.date_from && recurData.date_to && /* @__PURE__ */ jsxs("div", { className: "p-5 bg-indigo-50/60 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/30", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1", children: "Ringkasan" }),
                      /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-indigo-900 dark:text-indigo-200", children: [
                        "Setiap ",
                        recurData.days_of_week.sort((a, b) => a - b).map((id) => DAYS.find((d) => d.id === id)?.long).join(" & "),
                        ", ",
                        recurData.start_time,
                        "–",
                        recurData.end_time,
                        " WIB"
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "text-xs text-indigo-600 mt-0.5", children: [
                        "dari ",
                        (/* @__PURE__ */ new Date(recurData.date_from + "T00:00")).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
                        " s/d ",
                        (/* @__PURE__ */ new Date(recurData.date_to + "T00:00")).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        disabled: savingRecur || recurData.days_of_week.length === 0 || !recurData.date_from || !recurData.date_to,
                        className: "w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all disabled:opacity-40",
                        children: savingRecur ? "⏳ Menyimpan..." : "✦ Terapkan Jadwal Ketersediaan"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden", children: [
                  /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                        "Slot Mendatang"
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1", children: "Jadwal yang sudah Anda daftarkan" })
                    ] }),
                    mySchedules.length > 0 && /* @__PURE__ */ jsxs("span", { className: "px-4 py-2 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase", children: [
                      mySchedules.length,
                      " Slot"
                    ] })
                  ] }),
                  mySchedules.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black text-sm uppercase tracking-widest", children: "Belum ada slot terdaftar" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-xs mt-2", children: "Gunakan form di atas untuk menambah ketersediaan mingguan" })
                  ] }) : /* @__PURE__ */ jsxs("div", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
                    currentSchedules.length > 0 ? currentSchedules.map((sc, i) => {
                      const dateOnly = sc.date.includes("T") ? sc.date.split("T")[0] : sc.date;
                      const d = /* @__PURE__ */ new Date(dateOnly + "T00:00:00");
                      !isNaN(d.getTime());
                      return /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
                          /* @__PURE__ */ jsxs("div", { className: `w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-sm ${sc.booked_count >= 1 ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"}`, children: [
                            /* @__PURE__ */ jsx("span", { className: "text-xs", children: d.toLocaleDateString("id-ID", { month: "short" }) }),
                            /* @__PURE__ */ jsx("span", { className: "text-xl leading-none", children: d.getDate() })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsxs("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase", children: [
                              d.toLocaleDateString("id-ID", { weekday: "long" }),
                              ", ",
                              d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
                            ] }),
                            /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-gray-400 mt-0.5", children: [
                              "🕐 ",
                              sc.start_time?.substring(0, 5),
                              " – ",
                              sc.end_time?.substring(0, 5),
                              " WIB"
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase ${sc.booked_count >= 1 ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"}`, children: sc.booked_count >= 1 ? "✅ Terisi" : "🟢 Tersedia" }),
                          sc.booked_count === 0 && /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => {
                                if (confirm("Hapus slot ini?")) router.delete(route("schedules.destroy", sc.id));
                              },
                              className: "p-2 rounded-xl bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all",
                              children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                            }
                          )
                        ] })
                      ] }, sc.id);
                    }) : null,
                    mySchedules.length > 0 && /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20", children: [
                      /* @__PURE__ */ jsxs("span", { className: "text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: [
                        "Menampilkan ",
                        (schedulePage - 1) * scheduleItemsPerPage + 1,
                        " sampai ",
                        Math.min(schedulePage * scheduleItemsPerPage, mySchedules.length),
                        " dari ",
                        mySchedules.length,
                        " SLOT"
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setSchedulePage((p) => Math.max(1, p - 1)),
                            disabled: schedulePage === 1,
                            className: "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200/50 dark:border-slate-700",
                            children: "PREV"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setSchedulePage((p) => Math.min(totalSchedulePages, p + 1)),
                            disabled: schedulePage === totalSchedulePages,
                            className: "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200/50 dark:border-slate-700",
                            children: "NEXT"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedHistoryPatient !== null, onClose: closeHistoryModal, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Riwayat Pasien" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4", children: "Data & Skrining Pasien" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1", children: "Kelengkapan Profil" }),
                /* @__PURE__ */ jsxs("p", { className: "font-black text-gray-800 dark:text-gray-200", children: [
                  selectedHistoryPatient?.patient_profile_stats?.percentage || 0,
                  "% Lengkap"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1", children: "Hasil Skrining" }),
                /* @__PURE__ */ jsx("p", { className: "font-black text-indigo-600", children: selectedHistoryPatient?.recommended_package || "Belum ada data" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-2", children: "Partisipasi Kelas (Course)" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: selectedHistoryPatient?.courses?.length > 0 ? selectedHistoryPatient.courses.map((course) => /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-700 border border-purple-200", children: course.title }, course.id)) : /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic text-xs", children: "Belum terdaftar di kelas manapun." }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1", children: "Pesan Admin (Skrining)" }),
                /* @__PURE__ */ jsx("p", { className: "italic text-gray-600 dark:text-gray-400 text-xs bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-700", children: selectedHistoryPatient?.screening_results?.[0]?.admin_notes || "Tidak ada catatan." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white mb-4 px-2 uppercase tracking-widest", children: "Riwayat Sesi Sebelumnya" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar", children: selectedHistoryPatient?.bookings?.map((hist) => /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[2rem] border flex gap-5 transition-all ${hist.status === "completed" ? "bg-indigo-50/30 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/30" : "bg-white dark:bg-slate-900 border-gray-100 dark:border-gray-700"}`, children: [
            /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black ${hist.status === "completed" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-200"}`, children: hist.status === "completed" ? "✓" : "..." }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight", children: new Date(hist.schedule?.date || "").toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest", children: [
                "Terapis: ",
                /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: hist.schedule?.therapist?.name })
              ] }),
              hist.started_at && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-[10px] font-bold text-gray-500 uppercase flex flex-wrap gap-x-4 gap-y-1", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "Mulai: ",
                  /* @__PURE__ */ jsxs("span", { className: "text-emerald-600 font-black", children: [
                    new Date(hist.started_at).toLocaleTimeString("id-id", { hour: "2-digit", minute: "2-digit" }),
                    " WIB"
                  ] })
                ] }),
                hist.ended_at && /* @__PURE__ */ jsxs("span", { children: [
                  "Selesai: ",
                  /* @__PURE__ */ jsxs("span", { className: "text-rose-600 font-black", children: [
                    new Date(hist.ended_at).toLocaleTimeString("id-id", { hour: "2-digit", minute: "2-digit" }),
                    " WIB"
                  ] })
                ] }),
                hist.started_at && hist.ended_at && /* @__PURE__ */ jsxs("span", { className: "text-indigo-600 dark:text-indigo-400 font-black px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg", children: [
                  "Durasi: ",
                  Math.round((new Date(hist.ended_at) - new Date(hist.started_at)) / 6e4),
                  " Menit"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 italic", children: [
                /* @__PURE__ */ jsx("p", { className: "font-black text-gray-400 dark:text-gray-500 uppercase text-[9px] tracking-widest mb-1 not-italic", children: "Catatan Klinis" }),
                /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: hist.therapist_notes || "Tidak ada catatan." })
              ] }),
              hist.recording_link && /* @__PURE__ */ jsxs("a", { href: hist.recording_link, target: "_blank", rel: "noreferrer", className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 hover:underline mt-4 flex items-center gap-2 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                "Link Rekaman Sesi"
              ] })
            ] })
          ] }, hist.id)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeHistoryModal, className: "rounded-2xl px-8", children: "Tutup" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedCompletingBooking !== null, onClose: closeCompleteModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleCompleteSession, className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Akhiri Sesi" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-8", children: [
            "Sesi dengan ",
            /* @__PURE__ */ jsx("strong", { children: selectedCompletingBooking?.patient?.name }),
            " pada ",
            selectedCompletingBooking?.schedule?.date,
            "."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "recording_link", value: "Link Rekaman YouTube (Private/Unlisted)" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "recording_link",
                  type: "url",
                  className: "mt-1 block w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white",
                  placeholder: "https://youtu.be/...",
                  value: completeData.recording_link,
                  onChange: (e) => setCompleteData("recording_link", e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "completion_outcome", value: "Status Selesai Sesi" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "completion_outcome",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold",
                  value: completeData.completion_outcome,
                  onChange: (e) => setCompleteData("completion_outcome", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "Normal", children: "Normal (Selesai dengan Baik)" }),
                    /* @__PURE__ */ jsx("option", { value: "Abnormal/Emergency", children: "Upnormal / Emergency (Butuh Perhatian Khusus)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "patient_visible_notes", value: "Pesan untuk Pasien (Dashboard Pasien)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "patient_visible_notes",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm",
                  rows: "3",
                  placeholder: "Tuliskan homework atau ringkasan singkat untuk pasien...",
                  value: completeData.patient_visible_notes,
                  onChange: (e) => setCompleteData("patient_visible_notes", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "therapist_notes", value: "Catatan Klinis (Privat)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "therapist_notes",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                  rows: "4",
                  placeholder: "Tuliskan perkembangan klinis detail...",
                  value: completeData.therapist_notes,
                  onChange: (e) => setCompleteData("therapist_notes", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeCompleteModal, disabled: completing, className: "rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: completing,
                className: `inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 transition-all ${completing && "opacity-25"}`,
                children: "Akhiri Sesi & Simpan"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedRescheduleBooking !== null, onClose: closeRescheduleModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Jadwal Ulang" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-8", children: [
            "Pasien: ",
            /* @__PURE__ */ jsx("strong", { children: selectedRescheduleBooking?.patient?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "new_schedule_id", value: "Pilih Slot Baru" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "new_schedule_id",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold",
                  value: rescheduleData.new_schedule_id,
                  onChange: (e) => setRescheduleData("new_schedule_id", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Slot Tersedia --" }),
                    availableSchedules.filter((s) => s.id !== selectedRescheduleBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                      new Date(s.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" }),
                      " — ",
                      s.start_time?.substring(0, 5),
                      " WIB"
                    ] }, s.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reschedule_reason", value: "Alasan Perubahan" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "reschedule_reason",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                  rows: "3",
                  placeholder: "Tuliskan alasan rescheduling...",
                  value: rescheduleData.reschedule_reason,
                  onChange: (e) => setRescheduleData("reschedule_reason", e.target.value),
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeRescheduleModal, disabled: rescheduling, className: "rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: rescheduling || !rescheduleData.new_schedule_id,
                className: `inline-flex items-center px-6 py-3 bg-amber-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-amber-700 transition-all ${(rescheduling || !rescheduleData.new_schedule_id) && "opacity-25"}`,
                children: "Konfirmasi Jadwal Baru"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedNoShowBooking !== null, onClose: closeNoShowModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Tandai Tidak Hadir" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-8", children: [
            "Pasien: ",
            /* @__PURE__ */ jsx("strong", { children: selectedNoShowBooking?.patient?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_party", value: "Keterangan Ketidakhadiran" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  id: "no_show_party",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm font-bold",
                  value: noShowData.no_show_party,
                  onChange: (e) => setNoShowData("no_show_party", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien Berhalangan Hadir" }),
                    /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi Berhalangan Hadir" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_reason", value: "Keterangan Tambahan" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "no_show_reason",
                  className: "mt-1 block w-full border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm",
                  rows: "3",
                  placeholder: "Detail ketidakhadiran...",
                  value: noShowData.no_show_reason,
                  onChange: (e) => setNoShowData("no_show_reason", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeNoShowModal, disabled: markingNoShow, className: "rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: markingNoShow,
                className: `inline-flex items-center px-6 py-3 bg-red-600 border border-transparent rounded-2xl font-black text-xs text-white uppercase tracking-widest hover:bg-red-700 transition-all ${markingNoShow && "opacity-25"}`,
                children: "Konfirmasi No-Show"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  TherapistScheduleIndex as default
};
