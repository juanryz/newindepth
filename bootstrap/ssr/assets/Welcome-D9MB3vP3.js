import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-Bwc0UBuH.js";
import { F as Footer } from "./Footer-CbNJmqB7.js";
import { Eye, Brain, ShieldCheck, Lightbulb } from "lucide-react";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
const VisionMissionSection = () => {
  const missions = [
    {
      id: 1,
      icon: /* @__PURE__ */ jsx(Brain, { className: "w-6 h-6" }),
      title: "Inovasi & Edukasi",
      text: "Merangkum, mengembangkan, menyempurnakan dan menciptakan ilmu hipnotis dan teknik-teknik hipnoterapi baru untuk meningkatkan kualitas hidup manusia secara akademis etis."
    },
    {
      id: 2,
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6" }),
      title: "Standarisasi Profesi",
      text: "Mencetak pakar hipnotis dan hipnoterapi yang kompeten, profesional dan terstandarisasi tinggi dan menciptakan Standar Hipnoterapis Indonesia."
    },
    {
      id: 3,
      icon: /* @__PURE__ */ jsx(Lightbulb, { className: "w-6 h-6" }),
      title: "Transformasi Mental",
      text: "Mengoptimalkan potensi mental client untuk menyelesaikan masalah kesehatan fisik maupun mental dan memicu transformasi positif menuju versi terbaik diri mereka."
    }
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  return /* @__PURE__ */ jsxs("section", { id: "visi-misi", className: "relative py-24 overflow-hidden bg-[#f8f9fa] dark:bg-gray-950", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-400/10 dark:bg-gold-600/5 blur-[120px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-[-5%] w-[30%] h-[30%] rounded-full bg-yellow-300/10 dark:bg-yellow-600/5 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: -20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2",
            children: "Tujuan & Dedikasi Kami"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h3,
          {
            initial: { opacity: 0, y: -20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            className: "text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6",
            children: "Visi & Misi Clinic"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            className: "relative group lg:pr-12",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gold-500/5 rounded-[3rem] blur-2xl group-hover:bg-gold-500/10 transition-all duration-700" }),
              /* @__PURE__ */ jsxs("div", { className: "relative p-12 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/30 rounded-[3rem] shadow-xl", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-gold-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg", children: /* @__PURE__ */ jsx(Eye, { className: "w-8 h-8" }) }),
                /* @__PURE__ */ jsx("h4", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-[0.2em]", children: "Visi" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed font-bold italic", children: '"Menjadi penyedia layanan kesehatan utama dan pusat pengembangan diri melalui optimalisasi potensi mental manusia dari Indonesia untuk dunia."' })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            className: "space-y-6",
            children: missions.map((mission) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: itemVariants,
                className: "group flex items-start gap-6 p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/60 dark:border-gray-800/50 rounded-3xl hover:shadow-lg transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "p-3 bg-gold-500/10 rounded-xl text-gold-600 dark:text-gold-400 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-300", children: mission.icon }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h5", { className: "font-bold text-gray-900 dark:text-white mb-2", children: mission.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light", children: mission.text })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-gold-500/30 font-serif", children: [
                    "0",
                    mission.id
                  ] })
                ]
              },
              mission.id
            ))
          }
        )
      ] })
    ] })
  ] });
};
function DisclaimerSection() {
  return /* @__PURE__ */ jsx("section", { className: "py-20 relative z-10 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/20 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-bl-full pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-3/4 text-center md:text-left", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight flex flex-col md:flex-row items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "p-2 bg-gold-500 rounded-lg text-white", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 17c-.77 1.333.192 3 1.732 3z" }) }) }),
              "DISCLAIMER RESMI & STATUS LAYANAN"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed mb-6 font-medium", children: [
              "InDepth Mental Wellness adalah penyedia layanan hipnoterapi profesional berbasis pendekatan psikologis. Kami menegaskan bahwa layanan kami ",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white underline decoration-gold-500", children: "bukan merupakan layanan medis" }),
              ", bukan pengganti diagnosis dokter, psikiatri, maupun pengobatan medis lainnya. Kami berkomitmen pada transparansi dan keselamatan klien melalui standar dokumentasi audio-visual yang ketat."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                "Non-Medical Service"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                "Professional Documentation"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-3 py-1.5 rounded-full border border-gold-500/20", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414l-3 3-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }),
                "T&C Accepted on Use"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-1/4 flex justify-center md:justify-end", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/disclaimer",
              className: "group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-black text-white font-bold rounded-2xl hover:bg-gold-600 transition-all duration-300 shadow-xl",
              children: [
                "Baca Selengkapnya",
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
              ]
            }
          ) })
        ] })
      ]
    }
  ) }) });
}
function Welcome({ auth, articles, courses }) {
  useEffect(() => {
    const handleSmoothScroll = function(e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        try {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        } catch (err) {
          console.error("Invalid selector:", href);
        }
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional" }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "home" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-ping" }),
            "InDepth Mental Wellness Center"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.2 },
          className: "text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight",
          children: [
            "Temukan Kembali ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm", children: "Ketenangan Batin Anda" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.4 },
          className: "mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto mb-10 leading-relaxed font-light",
          children: "Bebaskan diri dari stres, kecemasan, dan trauma masa lalu bersama tim profesional kesehatan mental kami yang berpengalaman dan terpercaya."
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay: 0.6 },
          className: "flex flex-col sm:flex-row justify-center gap-4",
          children: /* @__PURE__ */ jsxs("a", { href: "#layanan", className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 border border-gold-300/40", children: [
            "Layanan Kami",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-y-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "layanan", className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Layanan Kami" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Solusi Khusus untuk Setiap Individu" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto font-light", children: "Pendekatan terapeutik yang disesuaikan secara personal untuk mencapai hasil yang maksimal dan permanen." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            whileHover: { y: -10 },
            className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight", children: "Penyembuhan Trauma & Phobia" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 leading-relaxed", children: "Atasi akar masalah emosional dan ketakutan tidak beralasan dengan pendekatan terapeutik yang aman dan terkendali." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.1 },
            whileHover: { y: -10 },
            className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight", children: "Manajemen Stres & Kecemasan" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 leading-relaxed", children: "Program terstruktur untuk melatih pikiran Anda mengelola stres dan mendapatkan ketenangan jiwa yang berkelanjutan." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.2 },
            whileHover: { y: -10 },
            className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.1)] transition-all duration-500 group relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out pointer-events-none" }),
              /* @__PURE__ */ jsx("div", { className: "relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center mb-8 text-gold-500 shadow-inner border border-white/80 dark:border-gray-700/80", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight", children: "Pengembangan Diri & Potensi" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 leading-relaxed", children: "Hancurkan mental block dan limiting belief yang menahan laju kesuksesan karir dan hubungan Anda." })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 overflow-hidden bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-4", children: "Metodologi Kami" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8", children: "Metode InDepth Terintegrasi" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-gold-500/30 shadow-2xl text-gray-800 dark:text-gray-200 relative overflow-hidden group hover:shadow-gold-500/10 transition-all duration-500", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-bl-full -mr-32 -mt-32 transition-transform group-hover:scale-125 duration-1000 ease-out pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/5 rounded-tr-full -ml-24 -mb-24 transition-transform group-hover:scale-125 duration-1000 ease-out pointer-events-none" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-2xl leading-relaxed font-light text-center relative z-10", children: [
          "Kami menggunakan sistem terstruktur mulai dari pelepasan akar masalah dengan ",
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4", children: "InDepth Trance State" }),
          ", pengendalian masalah kronis dengan ",
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4", children: "Supreme Trance State" }),
          ", hingga pencarian solusi spesifik versi terbaik Anda melalui ",
          /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white font-bold decoration-gold-500/30 decoration-4 underline-offset-4", children: "InDepth Solution" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400 opacity-60", children: [
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-gold-500/10 rounded-full", children: "Explore" }),
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-gold-500/10 rounded-full", children: "Heal" }),
          /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-gold-500/10 rounded-full", children: "Transform" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { id: "paket", className: "py-24 relative z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 dark:bg-gold-500/5 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter", children: "Paket Layanan" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Pilih Program Transformasi Anda" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-400 mx-auto font-light", children: "Investasi terbaik adalah untuk kesehatan mental dan ketenangan batin Anda." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center gap-3 animate-pulse", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(208,170,33,0.15)]", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🎉" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gold-700 dark:text-gold-300 font-bold tracking-wide", children: [
                "Promo 3 Bulan Pertama: ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400", children: "Diskon 50%" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm font-medium", children: "*Pada tanggal 21 Mei 2026 harganya kembali normal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "Hipnoterapi" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through decoration-red-500/50 decoration-2", children: "Rp 2.000.000" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: "Rp 1.000.000" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-2 font-medium", children: "Per Sesi / Treatment" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 mb-8 flex-grow", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Terapi Hipnotis Klinis"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Konsultasi Awal"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Relaksasi Pikiran Bawah Sadar"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/register?package=hipnoterapi", className: "block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto", children: "Pilih Hipnoterapi" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: [
                "Upgrade ",
                /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gray-500", children: "(Pengembangan Diri)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through decoration-red-500/50 decoration-2", children: "Rp 3.000.000" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: "Rp 1.500.000" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-2 font-medium", children: "Per Paket Program" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 mb-8 flex-grow", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Pemrograman Ulang Mindset"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Peningkatan Percaya Diri"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-600 dark:text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Teknik NLP Praktis"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/register?package=upgrade", className: "block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto", children: "Pilih Upgrade" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-2xl border-2 border-gold-500/50 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(208,170,33,0.15)] hover:shadow-[0_30px_60px_rgba(208,170,33,0.25)] transition-all duration-500 group flex flex-col md:-translate-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-20 h-20 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[11px] text-center leading-none uppercase", children: [
              "50%",
              /* @__PURE__ */ jsx("br", {}),
              "OFF"
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-xs font-bold shadow-lg uppercase tracking-widest whitespace-nowrap", children: "Intensive Care" }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0 pt-2", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white mb-2 flex items-center gap-2", children: [
                "Paket VIP",
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-base font-bold text-gray-500 line-through decoration-rose-500", children: "Rp 8.000.000" }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200", children: "Rp 4.000.000" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-3", children: [
                /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md shadow-rose-500/30", children: "🔥 DISKON 50%" }),
                /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: "⏳ s/d 31 Maret 2026" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gold-500/80 mt-3 font-medium", children: "Prioritas & Kasus Kompleks" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gold-500/60 mt-1 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-4 mb-8 flex-grow", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Prioritas Jadwal Utama"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Terapi Kasus Kompleks"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-gray-300", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                "Pendampingan Eksklusif"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/register?package=vip", className: "block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-extrabold shadow-[0_10px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 hover:-translate-y-1 mt-auto", children: "Ambil Paket VIP — Hemat 50%" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-lg border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter", children: "Kisah Nyata" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Apa Kata Klien Kami" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-6", children: '"Setelah bertahun-tahun mengalami serangan panik, metode Supreme Trance InDepth benar-benar memberikan kendali penuh pada pikiran saya. Saya kembali produktif dalam 2 sesi."' }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg", children: "A" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "Andi S." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Pengusaha" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300 transform md:-translate-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-6", children: '"Paket Upgrade membantu saya merobohkan mental block dalam hal finansial. Pendekatan NLP-nya luar biasa praktis dan terstruktur. Terima kasih InDepth!"' }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg", children: "M" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "Maya P." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Karyawan Swasta" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-transform duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-6", children: '"Saya ambil Paket VIP untuk kasus trauma masa kecil yang kompleks. Pendampingannya sangat eksklusif. Saya menemukan hidup baru di sini."' }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg", children: "D" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "dr. Dimas" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Tenaga Medis" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12 mb-24", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-5/12 lg:-mt-12", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" }),
            /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2.5rem] overflow-hidden border border-gold-500/20 shadow-2xl aspect-[3/4] bg-gray-100 dark:bg-gray-800", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/julius-bambang.png",
                  alt: "Julius Bambang",
                  className: "w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-1", children: "Julius Bambang" }),
                /* @__PURE__ */ jsx("p", { className: "text-gold-400 font-medium tracking-widest uppercase text-xs", children: "Komisaris / Owner" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-7/12", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl leading-tight", children: "Julius Bambang" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase text-sm", children: "Komisaris & Owner InDepth Mental Wellness" }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed italic border-l-4 border-gold-500/30 pl-6", children: "Berdedikasi dalam mendukung pengembangan ekosistem kesehatan mental yang profesional, inklusif, dan revolusioner di Indonesia." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-[2.5rem] border border-gold-500/10 shadow-sm relative overflow-hidden group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -right-10 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" }),
              /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4 text-lg", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }) }),
                "Visi & Kepemimpinan"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed font-light", children: "Sebagai pilar pendukung utama di balik InDepth Mental Wellness, Julius Bambang memastikan visi perusahaan untuk menjadi pusat pemulihan mental terdepan terwujud melalui manajemen yang transparan dan komitmen pada kualitas layanan yang tak tandingi." })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-5/12", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" }),
            /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2.5rem] overflow-hidden border border-gold-500/20 shadow-2xl aspect-[4/5] bg-gray-100 dark:bg-gray-800", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx("img", { src: "/images/saiful-anam.png", alt: "Saiful Anam", className: "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" }) }),
              /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-1", children: "Saiful Anam" }),
                /* @__PURE__ */ jsx("p", { className: "text-gold-400 font-medium tracking-widest uppercase text-xs", children: "Direktur / Pakar Hipnoterapi" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-7/12", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl leading-tight", children: "Saiful Anam" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase text-sm", children: "Direktur Utama InDepth / Pakar Hipnoterapi" }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed italic border-l-4 border-gold-500/30 pl-6", children: "Mengajar hipnotis dan hipnoterapi secara konsisten sejak tahun 2004." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 text-left", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gold-500/10 shadow-sm relative overflow-hidden group", children: [
                /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.754 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }),
                  "Penulis Buku"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-gray-600 dark:text-gray-400 font-medium", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " 4 Jam Pintar Hipnosis"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " Mudahnya Berpikir Positif"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " Metode Jessica V.3"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-gold-500/10 shadow-sm relative overflow-hidden group", children: [
                /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }),
                  "Penemu Metode"
                ] }),
                /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-gray-600 dark:text-gray-400 font-medium", children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " Super Sadar & Metode Jessica"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " InDepth & Supreme State"
                  ] }),
                  /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                    " InDepth Solution"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gradient-to-br from-gold-500/10 to-transparent rounded-3xl border border-gold-500/20 group hover:border-gold-500/40 transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-gold-600 dark:text-gold-400 mb-1", children: "17.000+" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest text-left", children: "Klien Personal" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gradient-to-br from-gold-500/10 to-transparent rounded-3xl border border-gold-500/20 group hover:border-gold-500/40 transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "text-4xl font-extrabold text-gold-600 dark:text-gold-400 mb-1", children: "1150+" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest text-left", children: "Klien Korporasi" })
              ] })
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(VisionMissionSection, {}),
    /* @__PURE__ */ jsx("div", { className: "relative mt-20 z-10", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center rounded-[3rem] border border-gold-500/20 dark:border-gray-800 bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl shadow-xl overflow-hidden my-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-b from-gold-500/5 to-transparent blur-2xl transform -rotate-6 pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white relative z-10", children: "Siap Melangkah Maju?" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl opacity-90 mb-10 text-gray-600 dark:text-gray-300 mx-auto max-w-2xl font-light relative z-10", children: "Bergabunglah dengan ratusan klien sukses lainnya. Proses perubahan dimulai dari satu keputusan kecil hari ini." }),
      /* @__PURE__ */ jsxs(Link, { href: "/register", className: "relative z-10 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 inline-flex items-center gap-2 group", children: [
        "Jadwalkan Konsultasi Gratis",
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
      ] })
    ] }) }),
    articles && articles.length > 0 && /* @__PURE__ */ jsx("div", { id: "blog", className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Wawasan & Edukasi" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl", children: "Blog & Artikel Terbaru" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400 mx-auto font-light", children: "Pelajari lebih dalam tentang kesehatan mental, teknik relaksasi, dan pengembangan diri melalui konten pilihan kami." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: articles.map((article, idx) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: idx * 0.1 },
          className: "group bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-900 relative", children: [
              article.featured_image ? /* @__PURE__ */ jsx("img", { src: `/storage/${article.featured_image}`, alt: article.title, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center bg-gold-50 dark:bg-gold-950/20", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-gold-200 dark:text-gold-900", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-gold-600 dark:text-gold-400 border border-white/50 dark:border-gray-700 shadow-sm", children: article.author?.name || "InDepth Team" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3", children: article.published_at ? new Date(article.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gold-600 transition-colors line-clamp-2 leading-tight", children: article.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 font-medium leading-relaxed", children: article.excerpt || (article.body ? String(article.body).replace(/<[^>]*>?/gm, "").substring(0, 120) : "") + "..." }),
              /* @__PURE__ */ jsxs(Link, { href: `/blog/${article.slug}`, className: "inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold-600 dark:text-gold-400 group/link", children: [
                "Baca Selengkapnya",
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover/link:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
              ] })
            ] })
          ]
        },
        article.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxs(Link, { href: "/blog", className: "px-8 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-all text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 mx-auto w-fit", children: [
        "Lihat Semua Artikel",
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(DisclaimerSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Welcome as default
};
