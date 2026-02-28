import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-CWE111IA.js";
import { F as Footer } from "./Footer-AOJEJnbF.js";
import { L as LiquidBackground } from "./LiquidBackground-DMzg2v4j.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function MethodsIndex({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "Metode Terapi - InDepth Mental Wellness" }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "methods" }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center max-w-4xl mx-auto mb-20 animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 font-semibold text-sm tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md", children: "Metode Eksklusif" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-8", children: [
          "Sistem Terapi ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500", children: "InDepth" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4", children: "Di InDepth Mental Wellness, kami tidak sekadar melakukan hipnoterapi." }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto", children: [
          "Kami menggunakan ",
          /* @__PURE__ */ jsx("strong", { children: "sistem metodologi terstruktur" }),
          " yang dirancang untuk mengakses akar masalah, bukan hanya meredakan gejala. Tiga metode utama kami dirancang untuk memberikan pendekatan yang presisi, terarah, dan sesuai kebutuhan individu."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-24 mb-32", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: "indepth-trance",
            initial: { opacity: 0, x: -50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "flex flex-col lg:flex-row items-center gap-12 group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 order-2 lg:order-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-pulse" }),
                  "Pilar Pertama"
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4", children: "InDepth Trance State" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl text-gold-600 dark:text-gold-400 font-medium mb-6", children: "Fondasi Regulasi Neuro-Somatik Terstruktur" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", children: "InDepth Trance State adalah fondasi utama seluruh sistem metodologi InDepth Mental Wellness. Dirancang sebagai protokol regulasi neuro-somatik terstruktur yang mengaktifkan komunikasi langsung antara kesadaran sadar dan kecerdasan tubuh." }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: [
                  "Regulasi & stabilisasi biologis",
                  "Penurunan reaktivitas emosional",
                  "Stabilisasi sistem saraf otonom",
                  "Pintu masuk utama metode lanjutan"
                ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700 dark:text-gray-300", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gold-500 shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
                  /* @__PURE__ */ jsx("span", { children: item })
                ] }, i)) }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] dark:shadow-2xl", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-widest", children: "Hasil Yang Dicapai:" }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400", children: "Regulasi." }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400", children: "Koherensi." }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400", children: "Kontrol." }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 font-medium bg-white/20 dark:bg-black/20 p-3 rounded-2xl border border-white/20 dark:border-white/5 text-gold-700 dark:text-gold-400", children: "Fokus." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("methods.indepth-trance"),
                    className: "inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all",
                    children: [
                      "Pelajari InDepth Trance State Lebih Lanjut ",
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 order-1 lg:order-2 w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.15)] transition-all duration-700", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-500/20 blur-[100px] rounded-full group-hover:bg-gold-500/30 transition-colors duration-700" }),
                /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", alt: "InDepth Trance State", className: "relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: "supreme-trance",
            initial: { opacity: 0, x: 50 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "flex flex-col lg:flex-row items-center gap-12 group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 w-full", children: /* @__PURE__ */ jsxs(
                motion.div,
                {
                  whileHover: { scale: 1.02 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                  className: "relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-white/20 dark:bg-gray-900/20 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/40 dark:border-white/10 overflow-hidden flex items-center justify-center shadow-2xl group-hover:shadow-gold-500/10 transition-all duration-700",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-50" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gray-900/10 dark:bg-white/5 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-700" }),
                    /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", alt: "Supreme Trance State", className: "relative z-10 w-full h-full object-cover rounded-[3rem] transform transition-transform duration-700 mix-blend-normal opacity-90 group-hover:opacity-100" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2", children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/5 dark:bg-white/10 border border-gray-900/10 dark:border-white/20 text-gray-900 dark:text-white text-sm font-bold mb-6", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gray-900 dark:bg-white animate-pulse" }),
                  "Pilar Kedua"
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4", children: "Supreme Trance State" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700 dark:text-gray-300 font-medium mb-6", children: "Aktivasi Kesadaran Tertinggi Berpadu Dengan Potensi Jiwa Terdalam" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed", children: "Supreme Trance State memfasilitasi proses penyelarasan kesadaran secara menyeluruh. Metode ini digunakan pada kondisi yang memerlukan integrasi kesadaran tingkat lanjut." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "Kedalaman" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Tetap Tercapai" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "Kesadaran" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Tetap Aktif" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white/40 dark:bg-black/20 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 text-center", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "Kendali" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Tetap Stabil" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider", children: "Digunakan Untuk:" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-gray-600 dark:text-gray-400", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-base font-medium", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500" }),
                      "penguatan struktur keyakinan"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-base font-medium", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500" }),
                      "integrasi konflik internal"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-base font-medium", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-gold-500" }),
                      "aktivasi kapasitas diri tingkat tinggi"
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6 italic", children: "Supreme Trance State memfasilitasi proses penyelarasan kesadaran secara menyeluruh." }),
                /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("methods.supreme-trance"),
                    className: "inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all",
                    children: [
                      "Pelajari Supreme Trance State Lebih Lanjut ",
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                    ]
                  }
                ) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            id: "indepth-solution",
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            className: "flex flex-col lg:flex-row items-center gap-12 group",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2 order-2 lg:order-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold mb-6", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-pulse" }),
                  "Pilar Ketiga"
                ] }),
                /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4", children: "InDepth Solution" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl text-gold-600 dark:text-gold-400 font-medium mb-6", children: "Solusi Tercepat dan Terbaik Versi Tubuh Anda Sendiri" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", children: "InDepth Solution tidak memaksakan arah. Metode ini memfasilitasi sistem tubuh menemukan arah terbaiknya sendiri. Dirancang untuk membantu tubuh menemukan jalur penyelesaian internalnya secara mandiri." }),
                /* @__PURE__ */ jsx("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-[32px] backdrop-saturate-[180%] rounded-[2.5rem] p-6 border border-white/40 dark:border-white/10 shadow-[inner_0_1px_1px_rgba(255,255,255,0.15)] mb-8", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  "Apakah kondisi ini dapat diselesaikan?",
                  "Berapa waktu tercepat yang realistis?",
                  "Syarat apa yang harus dipenuhi?",
                  "Pantangan apa yang dihindari?"
                ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700 dark:text-gray-300 font-medium text-sm", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 mt-[-2px] text-xs", children: "?" }),
                  /* @__PURE__ */ jsx("span", { children: item })
                ] }, i)) }) }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-gray-800 pt-8", children: /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white mb-3 uppercase text-xs tracking-widest", children: "Digunakan Untuk:" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " psikosomatis"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " kondisi berat dan kompleks"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 text-lg", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " aktivasi respons penyembuhan internal"
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6 italic", children: "InDepth Solution tidak memaksakan arah. Metode ini memfasilitasi sistem tubuh menemukan arah terbaiknya sendiri." }),
                /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("methods.indepth-solution"),
                    className: "inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold hover:gap-4 transition-all",
                    children: [
                      "Pelajari InDepth Solution Lebih Lanjut ",
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
                    ]
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 order-1 lg:order-2 w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-square lg:aspect-[4/3] rounded-[3rem] bg-gradient-to-tr from-gold-500/20 to-transparent border border-gold-500/30 overflow-hidden flex items-center justify-center group-hover:shadow-[0_20px_60px_rgba(208,170,33,0.2)] transition-all duration-700", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-15" }),
                /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-gold-400/20 dark:bg-gold-500/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-700" }),
                /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop", alt: "InDepth Solution - Somatic Mind & Trance State", className: "relative z-10 w-full h-full object-cover rounded-[3rem] transform group-hover:scale-105 transition-transform duration-700 shadow-2xl" })
              ] }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative rounded-[3rem] overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl border border-gold-500/20 shadow-2xl p-10 md:p-16 mb-24 text-center group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6", children: "Mengapa Metodologi Ini Berbeda" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto mb-12", children: [
            "Pendekatan ",
            /* @__PURE__ */ jsx("strong", { className: "text-gold-600 dark:text-gold-400 font-black", children: "InDepth" }),
            " melampaui sugesti tradisional dengan fokus pada aktivasi sistemik."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12", children: [
            "Berbasis aktivasi internal",
            "Terstruktur dan dapat diuji",
            "Digunakan sesuai kategori layanan",
            "Dikembangkan melalui sistem klinik"
          ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-gold-500/10 rounded-3xl p-6 text-left shadow-lg group-hover:scale-[1.02] transition-transform", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white text-lg", children: item })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-24",
          children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 font-medium italic", children: '"Metodologi ini menjadi fondasi seluruh layanan InDepth Mental Wellness."' })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "relative p-12 md:p-20 text-center max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-6", children: "Temukan Metode yang Tepat Untuk Anda" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 font-light mb-10", children: "Konsultasikan kebutuhan Anda dengan tim profesional kami untuk menentukan pendekatan terapi yang paling efektif." }),
          /* @__PURE__ */ jsxs("a", { href: "https://wa.me/6281234567890", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center px-8 py-4 rounded-full font-bold text-gray-900 bg-gradient-to-r from-gold-400 to-yellow-400 hover:from-gold-300 hover:to-yellow-300 shadow-[0_0_20px_rgba(208,170,33,0.3)] hover:shadow-[0_0_30px_rgba(208,170,33,0.5)] hover:-translate-y-1 transition-all duration-300 ring-2 ring-gold-500/50 ring-offset-2 ring-offset-black", children: [
            "Mulai Konsultasi",
            /* @__PURE__ */ jsx("svg", { className: "ml-3 w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  MethodsIndex as default
};
