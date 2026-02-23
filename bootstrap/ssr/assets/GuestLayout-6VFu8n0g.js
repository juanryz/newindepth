import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import "react";
import { T as ThemeToggle } from "./ThemeToggle-SHr-61ed.js";
import "react-dom";
function GuestLayout({ children, title, backLink = "/", backText = "Kembali ke Beranda" }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-[#fdfdfd] dark:bg-[#050505] transition-colors duration-700 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gold-400/20 dark:bg-gold-600/10 blur-[150px] animate-blob mix-blend-soft-light" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-teal-400/20 dark:bg-teal-600/10 blur-[150px] animate-blob mix-blend-soft-light", style: { animationDelay: "3s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-rose-400/15 dark:bg-rose-600/10 blur-[150px] animate-blob mix-blend-soft-light", style: { animationDelay: "6s" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full sm:max-w-md mt-32 sm:mt-16 px-4 sm:px-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: backLink,
            className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 transition-all group",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              backText
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(ThemeToggle, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[1.8] border border-white/80 dark:border-white/10 px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:rounded-[2.5rem] relative z-20 group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-50" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-12 -right-12 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxs(Link, { href: "/", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/logo-color.png",
                alt: "InDepth Mental Wellness",
                className: "h-20 w-auto object-contain block dark:hidden"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/logo-white.png",
                alt: "InDepth Mental Wellness",
                className: "h-20 w-auto object-contain hidden dark:block"
              }
            )
          ] }) }),
          children
        ] })
      ] })
    ] })
  ] });
}
export {
  GuestLayout as G
};
