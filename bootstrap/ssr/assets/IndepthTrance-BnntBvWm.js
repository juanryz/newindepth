import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-CWE111IA.js";
import Footer from "./Footer-LkZ7OU5t.js";
import { L as LiquidBackground } from "./LiquidBackground-DsMP_cZ6.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function IndepthTrance({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "InDepth Trance State - InDepth Mental Wellness" }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "methods" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-pulse" }),
              "Pilar Pertama Sistem Metodologis InDepth"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6",
            children: [
              "INDEPTH ",
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500", children: "TRANCE STATE" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold",
            children: "Fondasi Regulasi Neuro-Somatik Terstruktur"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.3 },
          className: "space-y-12",
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { y: 20, opacity: 0 },
                whileInView: { y: 0, opacity: 1 },
                viewport: { once: true },
                className: "bg-white/40 dark:bg-gray-900/60 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 relative z-10", children: [
                    /* @__PURE__ */ jsx("strong", { children: "InDepth Trance State" }),
                    " adalah fondasi utama seluruh sistem metodologi InDepth Mental Wellness."
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10", children: "Metode ini dirancang sebagai protokol regulasi neuro-somatik terstruktur yang mengaktifkan komunikasi langsung antara kesadaran sadar dan kecerdasan tubuh melalui stabilisasi sistem saraf otonom." }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg text-gold-600 dark:text-gold-400 leading-relaxed relative z-10 font-bold italic", children: "Semua metode lanjutan dalam sistem InDepth berangkat dari kondisi ini." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Posisi Dalam Hierarki Metode" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6 font-medium", children: "Sistem InDepth bekerja dalam tiga lapisan:" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-gold-500/20 border border-gold-500/30 p-5 rounded-3xl shadow-lg ring-1 ring-gold-500/20", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-black shrink-0 shadow-xl", children: "1" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "InDepth Trance State" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gold-700 dark:text-gold-400", children: "→ Regulasi & stabilisasi biologis" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0", children: "2" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "Supreme Trance State" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "→ Integrasi kesadaran tertinggi" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0", children: "3" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "InDepth Solution" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "→ Keputusan biologis & integrasi seluler" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gray-950 to-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl flex items-center border border-white/10", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full pointer-events-none" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold relative z-10 italic leading-snug text-gold-100", children: '"InDepth Trance State adalah pintu masuk utama sebelum masuk ke lapisan yang lebih tinggi."' })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter", children: "Landasan Neuroscience" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                {
                  num: "1⃣",
                  title: "Regulasi Sistem Saraf Otonom",
                  points: [
                    "Peningkatan tonus parasimpatik",
                    "Penurunan hiperaktivitas simpatis",
                    "Stabilitas variabilitas denyut jantung (HRV)"
                  ]
                },
                {
                  num: "2⃣",
                  title: "Modulasi Limbik",
                  points: [
                    "Penurunan reaktivitas amygdala",
                    "Peningkatan regulasi top-down dari prefrontal cortex"
                  ]
                },
                {
                  num: "3⃣",
                  title: "Rekontekstualisasi Memori Somatik",
                  points: [
                    "Integrasi ulang jalur hipokampus",
                    "Penurunan respons memori emosional maladaptif"
                  ]
                },
                {
                  num: "4⃣",
                  title: "Sinkronisasi Jaringan Neural",
                  points: [
                    "Peningkatan coherence kortikal",
                    "Reduksi noise kognitif"
                  ]
                }
              ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl mb-4", children: item.num }),
                /* @__PURE__ */ jsx("h4", { className: "font-black text-xl text-gray-900 dark:text-white mb-4 leading-tight", children: item.title }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: item.points.map((p, pi) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-700 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gold-500 text-lg", children: "•" }),
                  /* @__PURE__ */ jsx("span", { children: p })
                ] }, pi)) })
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-xl font-black text-gold-600 dark:text-gold-400 italic", children: "Kondisi ini menciptakan lingkungan neurofisiologis yang optimal untuk perubahan." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row gap-12 items-center relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase", children: "Apa yang Terjadi Dalam Kondisi Ini?" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gold-600 dark:text-gold-400 mb-6", children: "Individu mengalami:" }),
                /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  "Fokus internal tinggi",
                  "Penurunan distraksi eksternal",
                  "Peningkatan kesadaran tubuh",
                  "Sensitivitas terhadap sinyal somatik",
                  "Stabilitas respons emosional"
                ].map((text, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-lg font-bold text-gray-800 dark:text-gray-100", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-gold-500" }),
                  /* @__PURE__ */ jsx("span", { children: text })
                ] }, i)) }),
                /* @__PURE__ */ jsx("p", { className: "mt-10 text-xl font-black text-gray-900 dark:text-white bg-white/20 dark:bg-white/5 inline-block px-6 py-2 rounded-2xl border border-white/10", children: "Kesadaran tetap aktif dan terkendali." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-tighter underline decoration-gold-500 decoration-8 underline-offset-8", children: "Aplikasi Klinis" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
                {
                  title: "Regulasi Emosi",
                  items: ["kecemasan", "overthinking", "konflik emosional"]
                },
                {
                  title: "Trauma & Fobia",
                  items: ["respons takut berulang", "reaktivitas berlebihan"]
                },
                {
                  title: "Psikosomatis",
                  items: ["nyeri terkait stres", "gangguan regulasi tidur", "gangguan gastrointestinal berbasis stres"]
                }
              ].map((group, i) => /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white/40 dark:bg-gray-900/60 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl overflow-hidden group hover:bg-white transition-colors duration-500", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-gold-600 dark:text-gold-400 font-black mb-6 uppercase text-sm tracking-widest", children: group.title }),
                /* @__PURE__ */ jsx("ul", { className: "text-gray-900 dark:text-gray-100 text-lg font-bold space-y-3", children: group.items.map((item, ii) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gold-500 opacity-50", children: "•" }),
                  item
                ] }, ii)) })
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { y: -5 },
                transition: { type: "spring", stiffness: 400, damping: 25 },
                className: "relative overflow-hidden bg-white/40 dark:bg-gray-950/40 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 rounded-[3.5rem] p-8 md:p-16 shadow-2xl",
                children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row gap-16 items-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase", children: "Self-Hypnosis InDepth Trance State" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xl font-medium text-gray-700 dark:text-gray-300 mb-8 leading-relaxed", children: [
                      "Metode ini dapat diajarkan sebagai ",
                      /* @__PURE__ */ jsx("strong", { className: "text-gold-600 font-black", children: "self-activation protocol" }),
                      ". Klien dilatih untuk memiliki kendali penuh atas sistem biologi mereka sendiri:"
                    ] }),
                    /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8", children: [
                      "membuat jangkar neuro-somatik",
                      "mengaktifkan kondisi secara sadar",
                      "menonaktifkan kondisi secara instan",
                      "mempertahankan kontrol penuh"
                    ].map((text, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-base font-bold text-gray-900 dark:text-gray-200", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      text
                    ] }, i)) }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-600 dark:text-gray-400 italic font-medium leading-relaxed", children: [
                      "Jika dilatih dengan standar penuh, kondisi ini dapat diakses dalam waktu ",
                      /* @__PURE__ */ jsx("strong", { className: "text-gold-600 dark:text-gold-400 font-black tracking-widest uppercase", children: "kurang dari 3 detik." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-full lg:w-2/5 flex flex-col gap-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-10 text-center shadow-2xl border border-white/10 ring-4 ring-gold-500/20 group", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-4xl font-black mb-4 tracking-tighter text-gold-500 drop-shadow-[0_0_20px_rgba(208,170,33,0.3)]", children: "INKON KONTROL" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-4", children: [
                      /* @__PURE__ */ jsx("span", { className: "h-1 w-8 bg-gold-500/30 rounded-full" }),
                      /* @__PURE__ */ jsx("p", { className: "font-black text-white uppercase text-[10px] tracking-[0.3em] opacity-80", children: "Stabilitas Biologis" }),
                      /* @__PURE__ */ jsx("span", { className: "h-1 w-8 bg-gold-500/30 rounded-full" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 mt-8", children: ["Cepat", "Stabil", "Permanen", "Instan"].map((tag, idx) => /* @__PURE__ */ jsx("div", { className: "bg-white/5 border border-white/10 rounded-xl py-2 text-[10px] font-black text-gold-400/80 uppercase tracking-widest", children: tag }, idx)) })
                  ] }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "group relative p-10 bg-gray-950 rounded-[3rem] text-white overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity" }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black mb-4 text-gold-500 uppercase tracking-tighter", children: "Fisik & Psikosomatis" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-lg font-medium leading-relaxed", children: [
                  "InDepth Trance State menjadi fondasi sebelum masuk ke ",
                  /* @__PURE__ */ jsx(Link, { href: "/metode#indepth-solution", className: "text-gold-400 hover:text-gold-300 underline decoration-2 underline-offset-4 font-black", children: "InDepth Solution" }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "group relative p-10 bg-gray-950 rounded-[3rem] text-white overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity" }),
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black mb-4 text-gold-500 uppercase tracking-tighter", children: "Pengembangan Diri" }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-lg font-medium leading-relaxed", children: [
                  "InDepth Trance State menjadi tahap awal sebelum ditingkatkan ke ",
                  /* @__PURE__ */ jsx(Link, { href: "/metode#supreme-trance", className: "text-gold-400 hover:text-gold-300 underline decoration-2 underline-offset-4 font-black", children: "Supreme Trance State" }),
                  "."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center py-20 border-t border-gray-100 dark:border-gray-900 space-y-8", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex gap-4 md:gap-8 items-center justify-center flex-wrap", children: ["Regulasi.", "Koherensi.", "Kontrol."].map((word, i) => /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter", children: word }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed px-4", children: '"InDepth Trance State adalah stabilisasi biologis yang terstruktur. Ini adalah fondasi seluruh sistem InDepth."' })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-8", children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/metode",
                className: "group flex items-center gap-4 px-12 py-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full font-black text-gray-900 dark:text-white hover:bg-gold-500 hover:text-white transition-all shadow-2xl overflow-hidden relative active:scale-95",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" }),
                  /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 relative z-10 transform group-hover:-translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                  /* @__PURE__ */ jsx("span", { className: "relative z-10 uppercase tracking-widest text-sm", children: "Kembali ke Semua Metode" })
                ]
              }
            ) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  IndepthTrance as default
};
