import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { G as GuestLayout } from "./GuestLayout-6VFu8n0g.js";
import { router, Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
function VerifySuccess() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.get(route("dashboard"));
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(timer);
  }, []);
  return /* @__PURE__ */ jsxs(GuestLayout, { title: "Verifikasi Berhasil", children: [
    /* @__PURE__ */ jsx(Head, { title: "Verifikasi Berhasil" }),
    /* @__PURE__ */ jsxs("div", { className: "text-center space-y-8 py-10", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0, rotate: -180 },
          animate: { scale: 1, rotate: 0 },
          transition: { type: "spring", stiffness: 260, damping: 20 },
          className: "w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_30px_rgba(208,170,33,0.5)]",
          children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-gray-950", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
            motion.path,
            {
              initial: { pathLength: 0 },
              animate: { pathLength: 1 },
              transition: { duration: 0.5, delay: 0.5 },
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "3",
              d: "M5 13l4 4L19 7"
            }
          ) })
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.2 },
            className: "mb-8 text-center relative",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" }),
              /* @__PURE__ */ jsx("h2", { className: "text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000", children: "Success" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80", children: "Email Anda telah diverifikasi" }),
              /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5 },
            className: "text-gray-600 dark:text-gray-400 font-medium",
            children: [
              "Email kamu telah berhasil diverifikasi.",
              /* @__PURE__ */ jsx("br", {}),
              "Siap memulai perjalanan transformasi?"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative h-20 flex items-center justify-center", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 2, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.5, y: -10 },
          className: "text-4xl font-black text-gray-900 dark:text-white",
          children: count > 0 ? count : ""
        },
        count
      ) }) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.8 },
          className: "pt-4",
          children: /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] font-bold text-gold-600/60 dark:text-gold-400/40 animate-pulse", children: "Mengarahkan ke Login..." })
        }
      )
    ] })
  ] });
}
export {
  VerifySuccess as default
};
