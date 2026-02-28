import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { motion } from "framer-motion";
const LiquidBackground = () => {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-slate-50 dark:bg-gray-950 transition-colors duration-1000", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1]
        },
        transition: {
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        },
        className: "absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-blue-400/20 dark:bg-blue-900/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-30"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          x: [0, -120, 80, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.8, 1.1, 1]
        },
        transition: {
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        },
        className: "absolute top-[10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gold-400/20 dark:bg-gold-800/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-40 dark:opacity-30"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        animate: {
          x: [0, 60, -80, 0],
          y: [0, -120, 100, 0],
          rotate: [0, 180, 360]
        },
        transition: {
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        },
        className: "absolute bottom-[-20%] left-[15%] w-[65vw] h-[65vw] rounded-full bg-rose-400/15 dark:bg-purple-900/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-30 dark:opacity-20"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-transparent backdrop-blur-[2px]" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none mix-blend-overlay",
        style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }
      }
    )
  ] });
};
export {
  LiquidBackground as L
};
