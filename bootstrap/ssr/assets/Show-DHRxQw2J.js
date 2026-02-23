import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-DSCflqRh.js";
import { F as Footer } from "./Footer-DTMNLY3p.js";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function TherapistShow({ therapist, schedules }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const availableDates = Object.keys(schedules).sort();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-950", children: [
    /* @__PURE__ */ jsx(Navbar, { auth: null }),
    /* @__PURE__ */ jsx(Head, { title: `Profil Terapis - ${therapist.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-900 min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("nav", { className: "flex mb-8", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "inline-flex items-center space-x-1 md:space-x-3", children: [
        /* @__PURE__ */ jsx("li", { className: "inline-flex items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", className: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gold-600 dark:text-gray-400 dark:hover:text-gold-400", children: "Beranda" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-gray-400 mx-1", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 6 10", children: /* @__PURE__ */ jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m1 9 4-4-4-4" }) }),
          /* @__PURE__ */ jsx(Link, { href: route("therapists.index"), className: "ml-1 text-sm font-medium text-gray-700 hover:text-gold-600 md:ml-2 dark:text-gray-400 dark:hover:text-gold-400", children: "Tim Terapis" })
        ] }) }),
        /* @__PURE__ */ jsx("li", { "aria-current": "page", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-gray-400 mx-1", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 6 10", children: /* @__PURE__ */ jsx("path", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "m1 9 4-4-4-4" }) }),
          /* @__PURE__ */ jsx("span", { className: "ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-500", children: therapist.name })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8", children: /* @__PURE__ */ jsxs("div", { className: "md:flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:w-1/3 bg-gray-50 dark:bg-gray-800/50 p-8 border-r border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "h-32 w-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-400/20 blur-xl" }),
              therapist.avatar ? /* @__PURE__ */ jsx("img", { src: `/storage/${therapist.avatar}`, alt: therapist.name, className: "h-full w-full object-cover z-10" }) : /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold bg-gradient-to-br from-gold-400 to-yellow-600 bg-clip-text text-transparent z-10", children: therapist.name?.charAt(0) || "?" })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold text-gray-900 dark:text-white text-center", children: therapist.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-50 text-gold-700 border border-gold-200 dark:bg-gold-900/30 dark:text-gold-400 dark:border-gold-800", children: therapist.specialization || "Clinical Hypnotherapist" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 border-t border-gray-200 dark:border-gray-700 pt-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-gray-300 uppercase tracking-wide", children: "Tentang" }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 prose prose-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsx("p", { children: therapist.bio || "Terapis profesional bersertifikat yang siap membantu kesejahteraan mental Anda." }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Jadwal Tersedia" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full", children: "14 Hari Kedepan" })
          ] }),
          availableDates.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2 px-1", children: availableDates.map((dateStr) => {
              const dateObj = parseISO(dateStr);
              const isSelected = selectedDate === dateStr;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setSelectedDate(dateStr),
                  className: `flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl w-20 transition-all ${isSelected ? "bg-gradient-to-br from-gold-500 to-yellow-500 text-white shadow-lg shadow-gold-500/30 scale-105" : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-gold-400 dark:hover:border-gold-500 hover:shadow-md"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: `text-xs font-medium uppercase ${isSelected ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`, children: format(dateObj, "EEE", { locale: id }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xl font-bold mt-1", children: format(dateObj, "d") }),
                    /* @__PURE__ */ jsx("span", { className: `text-xs mt-1 ${isSelected ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`, children: format(dateObj, "MMM", { locale: id }) })
                  ]
                },
                dateStr
              );
            }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-8", children: selectedDate ? /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-up", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 mr-2 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "Sesi Tersedia on ",
                format(parseISO(selectedDate), "EEEE, d MMMM yyyy", { locale: id })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: schedules[selectedDate].map((schedule) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center hover:bg-gold-50 dark:hover:bg-gray-700 transition-colors group",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900 dark:text-white", children: schedule.time_slot }),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("bookings.create", { schedule: schedule.id }),
                        className: "mt-3 text-xs w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 left-1/2 -translate-x-1/2 w-[80%] hover:bg-indigo-700 shadow-md",
                        children: "Pilih  Beli"
                      }
                    )
                  ]
                },
                schedule.id
              )) })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/30", children: [
              /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Pilih tanggal di atas untuk melihat jam tersedia." })
            ] }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-16 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("svg", { className: "mx-auto h-16 w-16 text-gray-400 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: "Jadwal Penuh / Belum Tersedia" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto", children: [
              "Sayang sekali, ",
              therapist.name,
              " saat ini tidak memiliki slot jadwal kosong dalam 14 hari ke depan. Silakan cek kembali nanti atau pilih terapis lain."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { href: route("therapists.index"), className: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700", children: "Lihat Terapis Lain" }) })
          ] })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            ` }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  TherapistShow as default
};
