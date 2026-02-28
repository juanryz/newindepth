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
function SupremeTrance({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "Supreme Trance State - InDepth Mental Wellness" }),
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
              "Pilar Kedua Sistem Metodologis InDepth"
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
              "SUPREME ",
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
            children: "Aktivasi Kesadaran Tertinggi dan Integrasi Identitas"
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
                  /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -ml-32 -mt-32" }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-6 relative z-10 font-bold", children: "Supreme Trance State adalah pengembangan lanjutan dari InDepth Trance State." }),
                  /* @__PURE__ */ jsxs("p", { className: "text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 relative z-10", children: [
                    "Jika InDepth Trance berfokus pada regulasi neuro-somatik, maka ",
                    /* @__PURE__ */ jsx("strong", { children: "Supreme Trance State" }),
                    " berfokus pada integrasi kesadaran tertinggi dengan kecerdasan tubuh secara simultan."
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg text-gold-600 dark:text-gold-400 leading-relaxed relative z-10 font-medium italic", children: "Metode ini mengaktifkan kondisi di mana kesadaran tetap sangat jernih, sementara akses terdalam terhadap struktur identitas, keyakinan, dan potensi diri terbuka sepenuhnya." })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Posisi Dalam Hierarki Metode" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6 font-medium", children: "Sistem InDepth bekerja secara berlapis:" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0", children: "1" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "InDepth Trance State" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "→ Stabilisasi biologis" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-gold-500/20 border border-gold-500/30 p-5 rounded-3xl shadow-lg ring-1 ring-gold-500/20", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-black shrink-0 shadow-xl", children: "2" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Supreme Trance State" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gold-700 dark:text-gold-400", children: "→ Integrasi kesadaran tertinggi" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-white/20 dark:bg-black/20 border border-white/10 dark:border-white/5 p-4 rounded-2xl opacity-60", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shrink-0", children: "3" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "InDepth Solution" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "→ Integrasi keputusan biologis" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl flex items-center border border-white/10", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full pointer-events-none" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold relative z-10 italic leading-snug text-gold-100", children: '"Supreme Trance State hanya dibangun di atas fondasi InDepth Trance State yang stabil."' })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white text-center mb-12 uppercase tracking-tighter", children: "Landasan Neuroscience Lanjutan" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                {
                  num: "1⃣",
                  title: "Integrasi Prefrontal–Limbik",
                  points: ["Peningkatan kontrol eksekutif", "Reduksi impuls reaktif", "Peningkatan fleksibilitas kognitif"]
                },
                {
                  num: "2⃣",
                  title: "Koherensi Jaringan Default Mode (DMN)",
                  points: ["Restrukturisasi narasi diri", "Penguatan identitas baru", "Pengurangan konflik internal"]
                },
                {
                  num: "3⃣",
                  title: "Peningkatan Neural Synchronization",
                  points: ["Koherensi gelombang otak lintas area", "Peningkatan integrasi kortikal"]
                },
                {
                  num: "4⃣",
                  title: "Modulasi Neuroplastisitas",
                  points: ["Aktivasi jalur pembelajaran baru", "Penguatan pola adaptif"]
                }
              ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl mb-4", children: item.num }),
                /* @__PURE__ */ jsx("h4", { className: "font-black text-xl text-gray-900 dark:text-white mb-4 leading-tight", children: item.title }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: item.points.map((p, pi) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-700 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gold-500 text-lg", children: "•" }),
                  /* @__PURE__ */ jsx("span", { children: p })
                ] }, pi)) })
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-xl font-black text-gold-600 dark:text-gold-400 italic px-4", children: "Kondisi ini memungkinkan perubahan identitas dan kapasitas diri secara lebih permanen." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 border border-white/40 dark:border-white/10 shadow-2xl relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-32 -mt-32" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row gap-12 items-center relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase", children: "Apa yang Terjadi Dalam Kondisi Ini?" }),
                /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gold-600 dark:text-gold-400 mb-6", children: "Individu mengalami:" }),
                /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  "Kesadaran sangat jernih",
                  "Kontrol penuh terhadap proses internal",
                  "Kemampuan mengamati struktur keyakinan",
                  "Kemampuan memilih ulang identitas",
                  "Integrasi konflik internal"
                ].map((text, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-lg font-bold text-gray-800 dark:text-gray-100", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-gold-500" }),
                  /* @__PURE__ */ jsx("span", { children: text })
                ] }, i)) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-500 dark:text-gray-400 italic", children: "Kondisi ini bukan relaksasi pasif." }),
                  /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white bg-gold-500/10 dark:bg-white/5 inline-block px-6 py-2 rounded-2xl border border-gold-500/20", children: "Ini adalah kesadaran aktif tingkat tinggi." })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-tighter underline decoration-gold-500 decoration-8 underline-offset-8", children: "Aplikasi Klinis" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
                {
                  title: "Restrukturisasi Identitas",
                  items: ["konflik peran", "keraguan diri", "ketidaksinkronan nilai"]
                },
                {
                  title: "Penguatan Potensi",
                  items: ["leadership", "pengambilan keputusan strategis", "peningkatan kapasitas mental"]
                },
                {
                  title: "Trauma Kompleks",
                  items: ["konflik internal berlapis", "integrasi bagian diri"]
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
                    /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter uppercase", children: "Self-Hypnosis Supreme Trance State" }),
                    /* @__PURE__ */ jsxs("p", { className: "text-xl font-medium text-gray-700 dark:text-gray-300 mb-8 leading-relaxed", children: [
                      "Supreme Trance State dapat dilatih sebagai ",
                      /* @__PURE__ */ jsx("strong", { className: "text-gold-600 font-black", children: "self-mastery protocol" }),
                      " tingkat lanjut. Klien memiliki otoitas penuh dalam mengeksplorasi diri:"
                    ] }),
                    /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8", children: [
                      "mengakses kondisi dengan kontrol penuh",
                      "mempertahankan kesadaran tinggi",
                      "keluar secara instan",
                      "menjelajah struktur internal mandiri"
                    ].map((text, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-base font-bold text-gray-900 dark:text-gray-200", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      text
                    ] }, i)) }),
                    /* @__PURE__ */ jsxs("p", { className: "text-gray-600 dark:text-gray-400 italic font-medium leading-relaxed", children: [
                      "Jika terlatih sempurna, kondisi ini dapat diakses dalam waktu ",
                      /* @__PURE__ */ jsx("strong", { className: "text-gold-600 dark:text-gold-400 font-black tracking-widest uppercase", children: "kurang dari 3 detik." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "w-full lg:w-2/5 flex flex-col gap-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gold-500 to-gold-700 rounded-[3rem] p-10 text-center shadow-2xl border border-white/20 group relative overflow-hidden", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" }),
                    /* @__PURE__ */ jsx("h4", { className: "text-4xl font-black mb-4 tracking-tighter text-white", children: "SELF MASTERY" }),
                    /* @__PURE__ */ jsx("p", { className: "font-black text-gold-100 uppercase text-xs tracking-[0.3em] mb-6", children: "Mastery Protocol" }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ["Stabil", "Permanen", "Otonom"].map((tag, idx) => /* @__PURE__ */ jsx("div", { className: "bg-white/20 rounded-xl py-2 text-[10px] font-black text-white uppercase tracking-widest", children: tag }, idx)) })
                  ] }) })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-tighter", children: "Integrasi Dengan InDepth Trance" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl", children: [
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 relative", children: [
                  { title: "Stabilisasi", desc: "Masuk ke InDepth Trance State" },
                  { title: "Aktivasi", desc: "Transisi ke Supreme Trance State" },
                  { title: "Restrukturisasi", desc: "Penataan ulang kapasitas & identitas" },
                  { title: "Integrasi", desc: "Kembali ke kecerdasan tubuh" }
                ].map((step, i) => /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-6 bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-black mb-4", children: i + 1 }),
                  /* @__PURE__ */ jsx("h4", { className: "text-gold-400 font-black uppercase text-xs mb-2", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: step.desc })
                ] }, i)) }),
                /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-gray-400 text-lg italic max-w-2xl mx-auto", children: '"Manfaat regulasi biologis tetap aktif, namun ditingkatkan oleh kesadaran penuh."' })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "py-12", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-12 text-center uppercase tracking-tighter", children: "Perbedaan Dengan InDepth Trance" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white/60 dark:bg-gray-900/40 rounded-[2.5rem] border border-gray-200 dark:border-white/10", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black mb-6 text-gray-900 dark:text-white uppercase", children: "InDepth Trance" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-600 dark:text-gray-400 font-bold", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
                      " Fokus regulasi sistem saraf"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gray-400" }),
                      " Stabilitas somatik"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-8 bg-gold-500/10 dark:bg-gold-500/5 rounded-[2.5rem] border border-gold-500/20", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black mb-6 text-gold-600 dark:text-gold-400 uppercase", children: "Supreme Trance" }),
                  /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-900 dark:text-gray-100 font-bold", children: [
                    /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " Fokus integrasi kesadaran tertinggi"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " Restrukturisasi identitas"
                    ] }),
                    /* @__PURE__ */ jsxs("li", { className: "flex gap-3 items-center", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-gold-500" }),
                      " Aktivasi kapasitas mental tinggi"
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-950 rounded-[3rem] p-10 md:p-16 text-center border border-white/5 relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30" }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gold-500 uppercase mb-8 tracking-widest", children: "Fungsi Strategis" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto italic", children: '"Untuk pengembangan diri kompleks: InDepth Trance → Supreme Trance → Integrasi seluler melalui InDepth Solution."' }),
              /* @__PURE__ */ jsx("p", { className: "mt-6 text-gray-500 font-bold", children: "Perubahan mental dan kapasitas diri langsung diintegrasikan hingga level seluler." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center py-20 border-t border-gray-100 dark:border-gray-900 space-y-8", children: [
              /* @__PURE__ */ jsx("div", { className: "inline-flex gap-4 md:gap-8 items-center justify-center flex-wrap", children: ["Integrasi.", "Identitas.", "Kapasitas."].map((word, i) => /* @__PURE__ */ jsx("span", { className: "text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter", children: word }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed px-4", children: '"Supreme Trance State adalah kesadaran tertinggi dalam kendali penuh. Ini adalah lapisan kedua dalam sistem InDepth."' })
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
  SupremeTrance as default
};
