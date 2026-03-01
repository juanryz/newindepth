import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DqAHi6I1.js";
import { usePage, router, Head } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createPortal } from "react-dom";
import Form from "./Form-ZldotCyj.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function AdminSchedulesIndex({ schedules, therapists, filters }) {
  const { auth } = usePage().props;
  const { user } = auth;
  const hasPermission = (permissionName) => {
    return auth.user.roles?.includes("super_admin") || auth.user.permissions?.includes(permissionName);
  };
  const [isAdding, setIsAdding] = useState(false);
  const [therapistId, setTherapistId] = useState(filters.therapist_id || "");
  const [view, setView] = useState("timeGridWeek");
  const calendarRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setView("timeGridDay");
        if (calendarRef.current) {
          const api = calendarRef.current.getApi();
          if (api.view.type.includes("Grid") && api.view.type !== "timeGridDay") {
            api.changeView("timeGridDay");
          }
        }
      } else {
        setView("timeGridWeek");
        if (calendarRef.current) {
          const api = calendarRef.current.getApi();
          if (api.view.type.includes("Grid") && api.view.type !== "dayGridMonth" && api.view.type !== "timeGridWeek") {
            api.changeView("timeGridWeek");
          }
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (therapistId !== (filters.therapist_id || "")) {
      router.get(route("admin.orders.index"), {
        ...filters,
        therapist_id: therapistId
      }, { preserveState: true, replace: true });
    }
  }, [therapistId]);
  const handleEventClick = (info) => {
    router.visit(route("admin.schedules.show", info.event.id));
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
            .fc .fc-col-header-cell-cushion { font-size: 9px !important; padding: 4px !important; border: none !important; }
            .fc .fc-timegrid-slot-label-cushion { font-size: 9px !important; }
            .fc-timegrid-slot { height: 3em !important; }
        }
    `;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen Jadwal" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Manajemen Jadwal Terapis" }),
        /* @__PURE__ */ jsx("style", { children: calendarStyles }),
        /* @__PURE__ */ jsxs("div", { className: "relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse", style: { animationDuration: "8s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] rounded-full animate-pulse", style: { animationDuration: "12s", animationDelay: "2s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-gradient-to-r from-rose-400/10 to-orange-400/10 blur-[80px] rounded-full animate-pulse", style: { animationDuration: "10s", animationDelay: "1s" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight", children: [
                    "Manajemen ",
                    /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400", children: "Jadwal" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500 dark:text-slate-400 font-bold italic tracking-wide", children: "Atur waktu dan sesi konsultasi tim psikolog Anda." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => window.print(),
                      className: "px-6 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-white dark:border-slate-700 rounded-2xl flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/5 active:scale-95",
                      children: [
                        /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 012 2v1H5v-1a2 2 0 012-2z" }),
                          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" })
                        ] }),
                        "Cetak Jadwal"
                      ]
                    }
                  ),
                  hasPermission("create schedules") && /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => setIsAdding(true),
                      className: "group relative px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest overflow-hidden shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" }),
                        /* @__PURE__ */ jsxs("span", { className: "relative flex items-center gap-3", children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M12 4v16m8-8H4" }) }),
                          "Tambah Slot Manual"
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-10 pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row items-center gap-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full md:w-auto flex-1", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1", children: "Pilih Terapis" }),
                /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: therapistId,
                    onChange: (e) => setTherapistId(e.target.value),
                    className: "w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-6 py-4 pr-12 text-sm font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Semua Terapis" }),
                      therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                    ]
                  }
                ) })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700 p-2 group", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900/20 rounded-[3rem] p-6 sm:p-10 transition-colors", children: /* @__PURE__ */ jsx(
              FullCalendar,
              {
                ref: calendarRef,
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                view,
                weekends: false,
                headerToolbar: {
                  left: "prev,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
                },
                titleFormat: { year: "numeric", month: "long", day: "numeric" },
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
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-12 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Terisi" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Tersedia" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-widest uppercase text-center sm:text-right", children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " InDepth Mental Wellness. Developed for Excellence."
              ] })
            ] })
          ] }),
          isAdding && typeof document !== "undefined" && createPortal(
            /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/60 backdrop-blur-md", onClick: () => setIsAdding(false) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative border border-white dark:border-slate-800 animate-in fade-in zoom-in duration-300", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight", children: "Tambah Slot Jadwal" }),
                  /* @__PURE__ */ jsx("button", { onClick: () => setIsAdding(false), className: "text-slate-400 hover:text-slate-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
                ] }),
                /* @__PURE__ */ jsx(Form, { therapists, onSuccess: () => setIsAdding(false) })
              ] })
            ] }),
            document.body
          )
        ] })
      ]
    }
  );
}
function renderEventContent(eventInfo) {
  const isBooked = eventInfo.event.extendedProps.bookings?.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 group overflow-hidden ${isBooked ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 shadow-inner" : "bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pointer-events-none mb-0.5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[8px] sm:text-[9px] font-black uppercase tracking-widest opacity-80 leading-tight truncate", children: eventInfo.timeText }),
      isBooked && /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight pointer-events-none ${isBooked ? "text-white" : "text-slate-900 dark:text-white"}`, children: isBooked ? "✅ TERISI" : eventInfo.event.extendedProps.therapist?.name }),
    !isBooked && /* @__PURE__ */ jsx("div", { className: "text-[7.5px] sm:text-[8px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest pointer-events-none truncate", children: eventInfo.event.extendedProps.schedule_type === "class" ? "🎓 Kelas" : "👥 Konsultasi" }),
    isBooked && /* @__PURE__ */ jsxs("div", { className: "text-[7.5px] sm:text-[8px] font-black text-white/70 uppercase tracking-widest pointer-events-none truncate", children: [
      eventInfo.event.extendedProps.bookings.length,
      " Pasien"
    ] })
  ] });
}
export {
  AdminSchedulesIndex as default
};
