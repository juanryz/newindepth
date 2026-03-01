import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-CWE111IA.js";
import Footer from "./Footer-LkZ7OU5t.js";
import "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function TherapistsIndex({ therapists }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-950", children: [
    /* @__PURE__ */ jsx(Navbar, { auth: null }),
    /* @__PURE__ */ jsx(Head, { title: "Tim Terapis Kami" }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-white dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl", children: [
          "Temui Tim ",
          /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "Pakar" }),
          " Kami"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400", children: "Psikolog dan hipnoterapis bersertifikat yang siap membantu Anda mencapai kesejahteraan mental yang optimal." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: therapists.map((therapist) => /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full relative group hover:-translate-y-2 transition-transform duration-300", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-gold-400 blur-2xl opacity-20 rounded-full" }),
        /* @__PURE__ */ jsxs("div", { className: "-mt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-gray-700 p-1 border-2 border-gold-200 shadow-md", children: therapist.avatar ? /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${therapist.avatar}`,
              alt: therapist.name,
              className: "rounded-full object-cover w-full h-full"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-gold-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl", children: therapist.name?.charAt(0) || "?" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 text-xl font-bold text-gray-900 dark:text-white tracking-tight text-center", children: therapist.name }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-gold-600 dark:text-gold-400 text-center font-medium mt-1", children: therapist.specialization || "Clinical Hypnotherapist" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3 min-h-[60px]", children: therapist.bio || "Membantu klien mengatasi berbagai masalah psikologis melalui pendekatan klinis." }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("therapists.show", therapist.id),
              className: "inline-flex items-center px-4 py-2 border border-gold-500 text-sm font-medium rounded-full text-gold-600 bg-white hover:bg-gold-50 dark:bg-gray-800 dark:text-gold-400 dark:border-gold-400 dark:hover:bg-gray-700 transition",
              children: [
                "Lihat Profil & Jadwal",
                /* @__PURE__ */ jsx("svg", { className: "ml-2 -mr-1 h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
              ]
            }
          ) })
        ] })
      ] }) }, therapist.id)) }),
      therapists.length === 0 && /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Belum ada profil terapis aktif yang tersedia saat ini." }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  TherapistsIndex as default
};
