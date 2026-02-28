import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BhWsY9sM.js";
import { Head, Link } from "@inertiajs/react";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-BfaDD_kK.js";
import "framer-motion";
function SessionHistory({ bookings }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Riwayat Sesi Konsultasi" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Riwayat Sesi" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight", children: "📋 Riwayat Sesi Konsultasi" }),
            /* @__PURE__ */ jsx("p", { className: "text-indigo-100 mt-1 text-sm font-medium", children: "Catatan dan hasil sesi dari terapis Anda" })
          ] }),
          bookings.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-gray-100", children: "Belum ada riwayat sesi" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Anda belum memiliki sesi konsultasi yang telah selesai." }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
              Link,
              {
                href: route("bookings.create"),
                className: "inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20",
                children: "Buat Reservasi Baru →"
              }
            ) })
          ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: bookings.data.map((booking) => {
            const isCompleted = booking.status === "completed";
            const hasNotes = !!booking.patient_visible_notes;
            const hasRecording = !!booking.recording_link;
            const therapistName = booking.therapist?.name || booking.schedule?.therapist?.name || "-";
            const scheduleDate = booking.schedule ? new Date(booking.schedule.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "-";
            const scheduleTime = booking.schedule ? `${booking.schedule.start_time?.substring(0, 5) || "--:--"} - ${booking.schedule.end_time?.substring(0, 5) || "--:--"} WIB` : "-";
            return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"}`, children: isCompleted ? /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider", children: [
                      "#",
                      booking.booking_code
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: scheduleDate }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                      scheduleTime,
                      " • ",
                      therapistName
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${isCompleted ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800" : "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"}`, children: isCompleted ? "Selesai" : "Dikonfirmasi" }),
                  isCompleted && /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setSelectedBooking(booking),
                      className: "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm",
                      children: "Lihat Hasil →"
                    }
                  )
                ] })
              ] }),
              isCompleted && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/30", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Outcome" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: booking.completion_outcome || "Normal" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Paket Layanan" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white capitalize", children: booking.package_type || "Hipnoterapi" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Rekaman" }),
                    hasRecording ? /* @__PURE__ */ jsxs("a", { href: booking.recording_link, target: "_blank", rel: "noreferrer", className: "text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
                      "Tonton"
                    ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 italic", children: "Belum tersedia" })
                  ] })
                ] }),
                hasNotes && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
                    "Pesan dari Terapis"
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 italic", children: [
                    '"',
                    booking.patient_visible_notes,
                    '"'
                  ] })
                ] })
              ] })
            ] }, booking.id);
          }) }),
          bookings.links && bookings.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-1 mt-6", children: bookings.links.map((link, i) => /* @__PURE__ */ jsx("div", { children: link.url === null ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "px-4 py-2 text-sm text-gray-400 border rounded-lg",
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) : /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors ${link.active ? "bg-indigo-50 border-indigo-500 text-indigo-600 font-bold" : "bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) }, i)) })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: selectedBooking !== null, onClose: () => setSelectedBooking(null), maxWidth: "2xl", children: selectedBooking && /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black text-gray-900 dark:text-white", children: [
                "Detail Sesi #",
                selectedBooking.booking_code
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-medium mt-1", children: [
                selectedBooking.schedule ? new Date(selectedBooking.schedule.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "-",
                " • ",
                selectedBooking.schedule ? `${selectedBooking.schedule.start_time?.substring(0, 5)} - ${selectedBooking.schedule.end_time?.substring(0, 5)} WIB` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSelectedBooking(null), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 pb-6 border-b border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Praktisi" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: selectedBooking.therapist?.name || selectedBooking.schedule?.therapist?.name || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Paket Layanan" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white capitalize", children: selectedBooking.package_type || "Hipnoterapi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Status" }),
              /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", children: selectedBooking.status === "completed" ? "Selesai" : selectedBooking.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Outcome Sesi" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: selectedBooking.completion_outcome || "Normal" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
              "Pesan / Summary dari Terapis"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 min-h-[80px]", children: selectedBooking.patient_visible_notes ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap italic", children: [
              '"',
              selectedBooking.patient_visible_notes,
              '"'
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic", children: "Terapis tidak menyertakan catatan tambahan." }) })
          ] }),
          selectedBooking.recording_link && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
              "Dokumentasi Rekaman"
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: selectedBooking.recording_link,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 group",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-tighter opacity-80", children: "Video Rekaman Sesi" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "Tonton Rekaman Sesi" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-center pt-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedBooking(null),
              className: "px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all uppercase tracking-widest",
              children: "Tutup Detail"
            }
          ) })
        ] }) }) })
      ]
    }
  );
}
export {
  SessionHistory as default
};
