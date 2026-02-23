import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-BIpzS1gx.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function TherapistScheduleIndex({ bookings, availableSchedules = [], calendarSchedules = [] }) {
  const { auth, flash, errors } = usePage().props;
  const isAdmin = auth.user.roles.some((r) => ["admin", "super_admin"].includes(r.name));
  const [selectedHistoryPatient, setSelectedHistoryPatient] = useState(null);
  const [selectedCompletingBooking, setSelectedCompletingBooking] = useState(null);
  const [selectedRescheduleBooking, setSelectedRescheduleBooking] = useState(null);
  const [selectedNoShowBooking, setSelectedNoShowBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("calendar");
  const [historyFilter, setHistoryFilter] = useState("pending");
  const [isAdding, setIsAdding] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { data: scheduleData, setData: setScheduleData, post: postSchedule, processing: addingSchedule, reset: resetSchedule, errors: scheduleErrors } = useForm({
    date: "",
    start_time: "",
    end_time: "",
    quota: 1,
    schedule_type: "consultation"
  });
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
  const handleEventClick = (info) => {
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
      if (confirm("Slot ini masih kosong. Hapus slot ini?")) {
        router.delete(route("schedules.destroy", info.event.id));
      }
    }
  };
  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const isMine = event.extendedProps.is_mine;
    const isBooked = event.extendedProps.bookings && event.extendedProps.bookings.length > 0;
    const status = isBooked ? event.extendedProps.bookings[0].status : "available";
    const patientName = isBooked ? event.extendedProps.bookings[0].patient?.name : null;
    let contentClass = "h-full w-full p-2 rounded-xl flex flex-col justify-center gap-1 overflow-hidden transition-all duration-300 ";
    let textClass = "font-black truncate leading-tight uppercase tracking-tight pointer-events-none ";
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
        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase tracking-widest opacity-60 leading-none", children: eventInfo.timeText }),
        isMine && status === "confirmed" && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: textClass, children: isMine ? status === "in_progress" ? "🔴 LIVE" : patientName || "TUGAS ANDA" : isBooked ? "TERISI" : "SLOT TERSEDIA" }),
      /* @__PURE__ */ jsxs("div", { className: "text-[8px] font-bold opacity-60 uppercase tracking-widest pointer-events-none flex items-center gap-1", children: [
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
            .fc-toolbar-chunk { display: flex !important; justify-content: center !important; }
            .fc-button-primary { font-size: 9px !important; padding: 4px 8px !important; }
            .fc .fc-col-header-cell-cushion { font-size: 10px !important; }
            .fc .fc-timegrid-slot-label-cushion { font-size: 10px !important; }
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
        /* @__PURE__ */ jsxs("div", { className: "relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse", style: { animationDuration: "8s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] rounded-full animate-pulse", style: { animationDuration: "12s", animationDelay: "2s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-gradient-to-r from-rose-400/10 to-orange-400/10 blur-[80px] rounded-full animate-pulse", style: { animationDuration: "10s", animationDelay: "1s" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-6 md:mb-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-1 md:p-1.5 rounded-xl md:rounded-[1.5rem] w-full md:w-fit border border-white/40 dark:border-slate-700 shadow-lg shadow-black/5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("calendar"),
                  className: `flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "calendar" ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-900/50"}`,
                  children: "Kalender"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab("history"),
                  className: `flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "history" ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-900/50"}`,
                  children: "Daftar Sesi"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700 p-2", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900/20 rounded-[3rem] p-3 sm:p-5 md:p-10 transition-colors", children: activeTab === "calendar" ? /* @__PURE__ */ jsx("div", { className: "animate-in fade-in duration-500", children: /* @__PURE__ */ jsx(
              FullCalendar,
              {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: isMobile ? "timeGridDay" : "timeGridWeek",
                headerToolbar: isMobile ? {
                  left: "prev,next",
                  center: "title",
                  right: "timeGridDay,dayGridMonth"
                } : {
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
                },
                titleFormat: { year: "numeric", month: "long", day: "numeric" },
                events: calendarSchedules,
                eventClick: handleEventClick,
                eventContent: renderEventContent,
                height: "auto",
                slotMinTime: "07:00:00",
                slotMaxTime: "22:00:00",
                slotDuration: "01:00:00",
                allDaySlot: false,
                nowIndicator: true,
                locale: "id",
                expandRows: true,
                stickyHeaderDates: true
              }
            ) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6 animate-in fade-in duration-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-8 p-1.5 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl w-fit border border-slate-200/50 dark:border-slate-800", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setHistoryFilter("pending"),
                    className: `px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${historyFilter === "pending" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-white dark:hover:bg-slate-800"}`,
                    children: "Belum Selesai"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setHistoryFilter("completed"),
                    className: `px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${historyFilter === "completed" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-white dark:hover:bg-slate-800"}`,
                    children: "Selesai"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setHistoryFilter("all"),
                    className: `px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${historyFilter === "all" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-500 hover:bg-white dark:hover:bg-slate-800"}`,
                    children: "Semua"
                  }
                )
              ] }),
              bookings.filter((b) => {
                if (historyFilter === "all") return true;
                if (historyFilter === "pending") return ["confirmed", "in_progress"].includes(b.status);
                return b.status === "completed";
              }).length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-medium italic", children: historyFilter === "pending" ? "Hore! Tidak ada sesi yang perlu diselesaikan." : "Belum ada sesi yang selesai." }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", children: bookings.filter((b2) => {
                if (historyFilter === "all") return true;
                if (historyFilter === "pending") return ["confirmed", "in_progress"].includes(b2.status);
                return b2.status === "completed";
              }).map((booking) => {
                const isNoShow = booking.completion_outcome?.startsWith("No-Show");
                const wasRescheduled = !!booking.rescheduled_at;
                return /* @__PURE__ */ jsxs("div", { id: `booking-${booking.id}`, className: `rounded-[2.5rem] border shadow-sm p-7 relative overflow-hidden flex flex-col transition-all duration-300 ${isNoShow ? "bg-orange-50/30 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50" : booking.status === "completed" ? "bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700" : booking.status === "in_progress" ? "bg-red-50/30 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 ring-2 ring-red-500 shadow-xl" : "bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/50 ring-1 ring-indigo-50 dark:ring-indigo-900/30 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-700"}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "absolute top-6 right-6 flex flex-col items-end gap-2", children: [
                    booking.status === "confirmed" && /* @__PURE__ */ new Date() - new Date(booking.updated_at) < 24 * 60 * 60 * 1e3 && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black px-2 py-0.5 rounded bg-amber-400 text-amber-900 animate-bounce shadow-lg shadow-amber-400/20", children: "PASIEN BARU" }),
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-gray-700", children: isNoShow ? /* @__PURE__ */ jsx("span", { className: "text-orange-600 dark:text-orange-400", children: "Tidak Hadir" }) : booking.status === "completed" ? /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Selesai" }) : booking.status === "in_progress" ? /* @__PURE__ */ jsx("span", { className: "text-red-600 dark:text-red-400 animate-pulse", children: "Sedang Berlangsung" }) : /* @__PURE__ */ jsx("span", { className: "text-indigo-600 dark:text-indigo-400", children: wasRescheduled ? "Dijadwal Ulang" : "Akan Datang" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-6 pr-24", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-black text-xl text-gray-900 dark:text-white uppercase tracking-tight leading-none mb-1", children: booking.patient.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-bold italic", children: booking.patient.email }),
                    isAdmin && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-white bg-indigo-500 px-2 py-0.5 rounded uppercase tracking-tighter", children: "Terapis" }),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-indigo-700 dark:text-indigo-400", children: booking.schedule?.therapist?.name })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50/50 dark:bg-slate-800 rounded-3xl p-5 mb-6 border border-indigo-100/50 dark:border-slate-700", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-indigo-900 dark:text-indigo-300 font-black mb-2 uppercase tracking-widest", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                      new Date(booking.schedule.date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-indigo-800 dark:text-indigo-400 font-bold", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-indigo-400 dark:text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                      booking.schedule.start_time?.substring(0, 5),
                      " - ",
                      booking.schedule.end_time?.substring(0, 5),
                      " WIB"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-[10px] font-black text-indigo-600 dark:text-indigo-500 mt-3 pt-3 border-t border-indigo-100/50 dark:border-slate-700 uppercase tracking-[0.2em]", children: [
                      "Paket: ",
                      booking.package_type || "REGULER"
                    ] })
                  ] }),
                  booking.status === "completed" && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1", children: "Hasil / Outcome" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-emerald-700", children: booking.completion_outcome || "Normal" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 mt-auto", children: [
                    /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: route("schedules.patient-detail", booking.patient.id),
                        className: "w-full text-center text-[10px] font-black text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 border border-emerald-200 py-3 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                          "Rekam Medis & Detail"
                        ]
                      }
                    ),
                    booking.status === "confirmed" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleStartSession(booking.id),
                        className: "w-full text-center text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 py-3 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest active:scale-95",
                        children: "Mulai Sesi"
                      }
                    ),
                    booking.status === "in_progress" ? /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("schedules.active-session", booking.id),
                        className: "w-full text-center text-xs font-black text-white bg-red-600 hover:bg-red-700 py-3 rounded-2xl transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest",
                        children: "Selesaikan Sesi"
                      }
                    ) : booking.status === "completed" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => openCompleteModal(booking),
                        className: "w-full text-center text-xs font-black text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-2xl transition-all uppercase tracking-widest",
                        children: "Update Data Sesi"
                      }
                    ),
                    ["confirmed", "in_progress"].includes(booking.status) && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => openRescheduleModal(booking),
                          className: "flex-1 text-center text-[9px] font-black text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 py-2.5 rounded-2xl transition-all uppercase tracking-[0.1em]",
                          children: "Jadwal Ulang"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => openNoShowModal(booking),
                          className: "flex-1 text-center text-[9px] font-black text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 py-2.5 rounded-2xl transition-all uppercase tracking-[0.1em]",
                          children: "Tidak Hadir"
                        }
                      )
                    ] }),
                    booking.status === "completed" && booking.recording_link && /* @__PURE__ */ jsxs(
                      "a",
                      {
                        href: booking.recording_link,
                        target: "_blank",
                        rel: "noreferrer",
                        className: "text-center text-[10px] font-black text-indigo-600 hover:underline mt-2 uppercase tracking-widest flex items-center justify-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                          "Lihat Rekaman"
                        ]
                      }
                    )
                  ] })
                ] }, booking.id);
              }) })
            ] }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Terisi" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Berlangsung" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-gray-400" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Selesai" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Tersedia" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Modal, { show: selectedHistoryPatient !== null, onClose: closeHistoryModal, maxWidth: "2xl", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight", children: "Riwayat Pasien" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4", children: "Data & Skrining Pasien" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1", children: "Kelengkapan Profil" }),
                /* @__PURE__ */ jsxs("p", { className: "font-black text-gray-800", children: [
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
                /* @__PURE__ */ jsx("p", { className: "italic text-gray-600 text-xs bg-white p-4 rounded-2xl border border-gray-100", children: selectedHistoryPatient?.screening_results?.[0]?.admin_notes || "Tidak ada catatan admin." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 mb-4 px-2 uppercase tracking-widest", children: "Riwayat Sesi Sebelumnya" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar", children: selectedHistoryPatient?.bookings?.map((hist) => /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-[2rem] border flex gap-5 transition-all ${hist.status === "completed" ? "bg-indigo-50/30 border-indigo-100" : "bg-white border-gray-100"}`, children: [
            /* @__PURE__ */ jsx("div", { className: `flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black ${hist.status === "completed" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400"}`, children: hist.status === "completed" ? "✓" : "..." }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 text-sm uppercase tracking-tight", children: new Date(hist.schedule?.date || "").toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest", children: [
                "Terapis: ",
                /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: hist.schedule?.therapist?.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs bg-white/50 p-4 rounded-2xl border border-gray-100 text-gray-600 italic", children: [
                /* @__PURE__ */ jsx("p", { className: "font-black text-gray-400 uppercase text-[9px] tracking-widest mb-1 not-italic", children: "Catatan Klinis" }),
                /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: hist.therapist_notes || "Tidak ada catatan." })
              ] }),
              hist.recording_link && /* @__PURE__ */ jsxs("a", { href: hist.recording_link, target: "_blank", rel: "noreferrer", className: "text-[10px] font-black text-indigo-600 hover:underline mt-4 flex items-center gap-2 uppercase tracking-widest", children: [
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
                  className: "mt-1 block w-full rounded-2xl border-gray-200",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm font-bold",
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
                  className: "mt-1 block w-full border-gray-200 rounded-2xl shadow-sm focus:border-red-500 focus:ring-red-500 text-sm",
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
