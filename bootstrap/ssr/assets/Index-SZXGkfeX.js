import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { F as Footer } from "./Footer-CbNJmqB7.js";
import { L as LiquidBackground } from "./LiquidBackground-BfaDD_kK.js";
import { Link } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-Bwc0UBuH.js";
import { E as ErrorBoundary } from "./ErrorBoundary-DBZzD0st.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function LmsIndex({ courses = [], auth, isMyCourses = false }) {
  const safeCourses = Array.isArray(courses) ? courses : [];
  useEffect(() => {
    document.title = (isMyCourses ? "Koleksi Saya" : "E-Learning") + " - InDepth Mental Wellness";
  }, [isMyCourses]);
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function(e) {
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }, []);
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "courses" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500" }),
          "InDepth Self-Therapy"
        ] }) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6", children: [
          isMyCourses ? "Koleksi" : "E-Learning",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600", children: isMyCourses ? "Kelas Saya" : "Video & Materi" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-light", children: isMyCourses ? "Akses semua materi kelas self-therapy yang telah Anda miliki untuk dibaca atau ditonton kembali." : "Pelajari kelas dan metode self-therapy yang bisa Anda praktikkan secara mandiri di mana saja, kapan saja." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: safeCourses.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "col-span-full py-20 text-center rounded-[3rem] border border-dashed border-gold-500/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gold-500/30 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 dark:text-gray-400 font-light", children: isMyCourses ? "Anda belum memiliki kelas aktif. Silakan pilih kelas di katalog E-Learning." : "Belum ada kelas yang dipublikasikan saat ini, nantikan update selanjutnya." })
      ] }) : safeCourses.map((course) => {
        if (!course || !course.id || !course.slug) return null;
        const title = course.title || "Untitled Course";
        const description = (course.description || "").replace(/(<([^>]+)>)/gi, "").substring(0, 120);
        const price = isNaN(Number(course.price)) ? 0 : Number(course.price);
        return /* @__PURE__ */ jsxs(
          motion.article,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            whileHover: { y: -8 },
            className: "group flex flex-col bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(208,170,33,0.1)] transition-all duration-500",
            children: [
              /* @__PURE__ */ jsxs(Link, { href: `/courses/${course.slug}`, className: "block relative aspect-[16/10] overflow-hidden", children: [
                course.thumbnail ? /* @__PURE__ */ jsx("img", { src: `/storage/${course.thumbnail}`, alt: title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-gold-500/20 to-yellow-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxs("svg", { className: "w-16 h-16 text-gold-500/30", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-xs font-bold text-gold-600 dark:text-gold-400 shadow-sm border border-white/40 dark:border-gray-700/40", children: "Self-Therapy" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-8 flex-1 flex flex-col", children: [
                /* @__PURE__ */ jsxs(Link, { href: `/courses/${course.slug}`, className: "flex-1", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug", children: title }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-600 dark:text-gray-400 line-clamp-3 font-light leading-relaxed mb-6", children: [
                    description,
                    description.length >= 120 ? "..." : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
                  isMyCourses ? /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full", children: "Sudah Dimiliki" }) : /* @__PURE__ */ jsxs("span", { className: "text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400", children: [
                    "Rp ",
                    price.toLocaleString("id-ID")
                  ] }),
                  /* @__PURE__ */ jsx(Link, { href: `/courses/${course.slug}`, className: "w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-400 hover:bg-gold-500 hover:text-white transition-all transform group-hover:translate-x-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) }) })
                ] })
              ] })
            ]
          },
          course.id
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
export {
  LmsIndex as default
};
