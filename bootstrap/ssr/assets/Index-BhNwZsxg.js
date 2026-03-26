import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DSi5ya3j.js";
import { Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const COLOR_MAP = {
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200/60 dark:border-indigo-800/40", glow: "hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200/60 dark:border-emerald-800/40", glow: "hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20" },
  rose: { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-600 dark:text-rose-400", border: "border-rose-200/60 dark:border-rose-800/40", glow: "hover:shadow-rose-100 dark:hover:shadow-rose-900/20" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200/60 dark:border-amber-800/40", glow: "hover:shadow-amber-100 dark:hover:shadow-amber-900/20" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-600 dark:text-violet-400", border: "border-violet-200/60 dark:border-violet-800/40", glow: "hover:shadow-violet-100 dark:hover:shadow-violet-900/20" },
  sky: { bg: "bg-sky-100 dark:bg-sky-900/40", text: "text-sky-600 dark:text-sky-400", border: "border-sky-200/60 dark:border-sky-800/40", glow: "hover:shadow-sky-100 dark:hover:shadow-sky-900/20" }
};
function getColor(value) {
  return COLOR_MAP[value] || COLOR_MAP.indigo;
}
function InternalAiIndexPage({ agents, isAdmin }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white", children: "🤖 AI Internal Indepth" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "AI Internal" }),
        /* @__PURE__ */ jsxs("div", { className: "py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 font-medium", children: "Pilih asisten AI yang ingin kamu ajak bicara. Setiap agent terlatih untuk area tertentu." }),
            isAdmin && /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("admin.internal-ai.index"),
                className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 whitespace-nowrap ml-4",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 4v16m8-8H4" }) }),
                  "Kelola Agent"
                ]
              }
            )
          ] }),
          agents.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-24 bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] rounded-3xl", children: [
            /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "🤖" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-600 dark:text-gray-300 mb-2", children: "Belum Ada Agent Tersedia" }),
            isAdmin ? /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 mb-5", children: "Buat agent AI pertama Anda dan training sesuai kebutuhan." }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.internal-ai.index"),
                  className: "inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20",
                  children: "+ Buat Agent Pertama"
                }
              )
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Hubungi admin untuk mengaktifkan agent AI internal." })
          ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: agents.map((agent) => {
            const c = getColor(agent.avatar_color);
            return /* @__PURE__ */ jsxs(
              Link,
              {
                href: route("internal-ai.show", agent.id),
                className: `group flex flex-col gap-4 p-6 rounded-3xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-xl border ${c.border} shadow-sm hover:shadow-xl ${c.glow} transition-all duration-300 hover:-translate-y-1`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${c.bg} ${c.text} group-hover:scale-110 transition-transform duration-300`, children: "🤖" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: `font-black text-gray-900 dark:text-white text-base mb-1 group-hover:${c.text} transition-colors`, children: agent.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3", children: agent.description || "Asisten AI siap membantu pertanyaan Anda." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${c.text}`, children: [
                    "Mulai Chat",
                    /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 5l7 7-7 7" }) })
                  ] })
                ]
              },
              agent.id
            );
          }) })
        ] })
      ]
    }
  );
}
export {
  InternalAiIndexPage as default
};
