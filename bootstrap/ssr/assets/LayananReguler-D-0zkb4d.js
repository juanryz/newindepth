import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-DnQfU1E1.js";
import { L as LiquidBackground } from "./LiquidBackground-DsMP_cZ6.js";
import { P as PageLoader } from "./PageLoader-Fgf54pWN.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
const Footer = lazy(() => import("./Footer-CpVcuKD4.js"));
const DisclaimerSection = lazy(() => import("./DisclaimerSection-xOYLaWsi.js"));
const WA_LINK = "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi%20Layanan%20Reguler";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) });
const DotIcon = ({ color = "bg-blue-500" }) => /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${color} mt-1.5 shrink-0` });
function LayananReguler({ auth, packages = [] }) {
  const regulerPkg = packages.find((p) => p.slug === "reguler") || {
    base_price: 2e6,
    current_price: 1e6,
    discount_percentage: 50
  };
  const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price).replace("IDR", "Rp");
  const masalahGroups = [
    {
      title: "Pikiran",
      color: "bg-blue-500",
      badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      items: [
        "Overthinking yang terus berjalan sepanjang hari",
        "Pikiran sulit berhenti saat malam hari",
        "Pikiran negatif yang muncul terus-menerus",
        "Kekhawatiran berulang terhadap situasi tertentu",
        "Pikiran berulang terhadap kejadian masa lalu",
        "Pikiran penuh keraguan terhadap diri sendiri"
      ]
    },
    {
      title: "Emosi",
      color: "bg-purple-500",
      badgeClass: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      items: [
        "Kecemasan yang muncul berulang",
        "Emosi mudah meledak dalam situasi sederhana",
        "Rasa tegang dalam aktivitas sehari-hari",
        "Perasaan tertekan dalam pekerjaan atau hubungan",
        "Emosi berubah dengan cepat",
        "Rasa gelisah sepanjang hari"
      ]
    },
    {
      title: "Perilaku",
      color: "bg-orange-500",
      badgeClass: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400",
      items: [
        "Kebiasaan buruk yang berulang terus-menerus",
        "Menunda pekerjaan setiap hari",
        "Sulit konsisten dalam aktivitas",
        "Kebiasaan impulsif yang merugikan",
        "Pola tindakan yang mengganggu pekerjaan",
        "Pola sabotase diri dalam aktivitas"
      ]
    },
    {
      title: "Fungsi Harian",
      color: "bg-red-500",
      badgeClass: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
      items: [
        "Aktivitas terganggu karena pikiran dan emosi",
        "Pekerjaan tertunda karena pola berulang",
        "Interaksi terganggu karena emosi tidak stabil"
      ]
    }
  ];
  const problems30 = [
    {
      title: "Pikiran & Mental",
      color: "bg-blue-500",
      items: [
        "Overthinking sepanjang hari",
        "Pikiran sulit berhenti saat malam",
        "Pikiran negatif berulang",
        "Kekhawatiran berlebihan",
        "Pikiran pada kesalahan masa lalu",
        "Pikiran skenario buruk terus muncul",
        "Sulit mengambil keputusan",
        "Keraguan terhadap diri sendiri"
      ]
    },
    {
      title: "Emosi",
      color: "bg-purple-500",
      items: [
        "Kecemasan berulang",
        "Rasa tegang sepanjang aktivitas",
        "Emosi mudah meledak",
        "Perasaan tertekan",
        "Rasa takut berlebihan",
        "Perasaan tidak tenang",
        "Emosi berubah cepat",
        "Gelisah sepanjang hari"
      ]
    },
    {
      title: "Perilaku",
      color: "bg-orange-500",
      items: [
        "Kebiasaan buruk berulang",
        "Menunda pekerjaan",
        "Sulit konsisten",
        "Pola sabotase diri",
        "Kebiasaan impulsif",
        "Pola tindakan merugikan",
        "Menghindari tanggung jawab",
        "Pola perilaku yang berulang"
      ]
    },
    {
      title: "Kecanduan Ringan",
      color: "bg-red-500",
      items: [
        "Kecanduan gadget atau media sosial",
        "Kecanduan pornografi",
        "Kecanduan merokok",
        "Kebiasaan konsumsi berulang",
        "Dorongan melakukan kebiasaan tertentu",
        "Pola kebiasaan yang sulit dihentikan"
      ]
    }
  ];
  const testimoni = [
    "Saya mengalami overthinking setiap malam sampai sulit tidur. Pikiran terus berjalan dan sulit berhenti. Dalam satu sesi Reguler, kondisi tersebut dituntaskan dan tidur kembali normal.",
    "Saya memiliki kebiasaan menunda pekerjaan setiap hari. Setiap mulai kerja, pekerjaan tertunda terus. Setelah sesi Reguler, pola tersebut dituntaskan dan pekerjaan selesai dengan normal.",
    "Saya mengalami kecemasan setiap pagi sebelum bekerja. Kondisi ini mengganggu aktivitas harian. Dalam satu sesi, pola tersebut dituntaskan dan aktivitas berjalan normal."
  ];
  const processSteps = ["Konsultasi via WhatsApp", "Screening mental", "Login sistem", "Booking jadwal", "Pembayaran"];
  const faqItems = [
    { q: "Apakah layanan ini cocok untuk overthinking?", a: "Layanan Reguler digunakan untuk menuntaskan pola overthinking melalui pemrograman ulang bawah sadar." },
    { q: "Apakah bisa untuk kecemasan berulang?", a: "Pendekatan difokuskan pada pola kecemasan yang muncul berulang." },
    { q: "Apakah kebiasaan buruk bisa ditangani?", a: "Kebiasaan buruk yang berulang dapat dituntaskan melalui pemrograman ulang program bawah sadar." },
    { q: "Apakah layanan ini untuk peningkatan performa?", a: "Layanan Reguler difokuskan pada penanganan kondisi bermasalah hingga kembali netral." },
    { q: "Bagaimana cara mulai?", a: "Mulai melalui konsultasi WhatsApp untuk proses screening dan penjadwalan." }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsx(Head, { title: "Hipnoterapi Reguler Semarang — Mengatasi Overthinking, Kecemasan, dan Kebiasaan Buruk | InDepth" }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "layanan" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-ping" }),
            "Layanan Reguler"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight",
          children: [
            "Hipnoterapi Reguler Semarang —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-gold-500", children: "Mengatasi Overthinking, Kecemasan, dan Kebiasaan Buruk" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4, delay: 0.3 },
          className: "flex flex-col sm:flex-row justify-center gap-4 mt-8",
          children: [
            /* @__PURE__ */ jsxs("a", { href: "#detail", className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 transition-all duration-300 border border-gold-300/40", children: [
              "Lihat Detail",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-y-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: WA_LINK,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
                  "Konsultasi via WhatsApp"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "detail", className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Tentang Layanan" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight", children: "Layanan Reguler InDepth Klinik" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium", children: [
        /* @__PURE__ */ jsx("p", { children: "InDepth Klinik Hipnoterapi Semarang menyediakan layanan Reguler untuk membantu Anda menuntaskan masalah pikiran, emosi, dan perilaku." }),
        /* @__PURE__ */ jsx("p", { children: "Pendekatan menggunakan hipnosis dan trance untuk memprogram ulang bawah sadar secara terarah dalam satu sesi." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Kondisi" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white", children: "Masalah yang Anda Alami" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto", children: "Layanan Reguler digunakan untuk kondisi seperti:" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: masalahGroups.map((group, gi) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(gi * 0.1),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-6", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${group.badgeClass}`, children: [
              /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${group.color}` }),
              group.title
            ] }) }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: group.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(DotIcon, { color: group.color }),
              item
            ] }, i)) })
          ]
        },
        gi
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Cakupan Layanan" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white", children: "30 Masalah Spesifik yang Dapat Ditangani" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: problems30.map((group, gi) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(gi * 0.08),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-xl ${group.color} flex items-center justify-center mb-4`, children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4", children: group.title }),
            /* @__PURE__ */ jsx("ol", { className: "space-y-2", children: group.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium", children: [
              /* @__PURE__ */ jsx("span", { className: `w-4 h-4 rounded-full ${group.color} text-white flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5`, children: gi * 8 + i + 1 <= 30 ? gi * 8 + i + 1 : "" }),
              item
            ] }, i)) })
          ]
        },
        gi
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Metode" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "Pendekatan InDepth" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
          "Pendekatan InDepth mengakses bawah sadar Anda.",
          "Memprogram ulang program bawah sadar menjadi lebih tepat dan terarah.",
          "Mengintegrasikan perubahan ke seluruh sistem tubuh Anda.",
          "Menuntaskan hasil dan mengevaluasinya langsung dalam satu sesi."
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[1.5rem] p-5 shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-sm shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed", children: item })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.1), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Target" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "Hasil yang Dituju" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl", children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            "Pikiran lebih terkendali dan tidak berulang terus-menerus",
            "Emosi lebih stabil dalam aktivitas sehari-hari",
            "Kebiasaan buruk berhenti berulang",
            "Pola perilaku menjadi lebih terarah",
            "Aktivitas pekerjaan berjalan lebih efektif",
            "Aktivitas harian kembali berjalan normal"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700 dark:text-gray-200 font-medium", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gold-600 dark:text-gold-400 font-bold italic", children: "Fokus layanan ini adalah membawa kondisi dari bermasalah menjadi netral dan terkendali." }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Biaya" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "Durasi dan Investasi" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-10 shadow-xl inline-block w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Durasi" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "±2 jam" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 font-medium mt-1", children: "1 sesi" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Investasi" }),
            regulerPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2 mb-1", children: formatPrice(regulerPkg.base_price) }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 dark:text-white", children: formatPrice(regulerPkg.current_price || regulerPkg.base_price) }),
            /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1 mt-2 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-500/20", children: "Diskon 50% hingga 21 Mei 2026" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 font-medium", children: "*Harga belum termasuk PPN 11%" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Testimoni" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Apa Kata Klien Kami" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: testimoni.map((text, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(i * 0.1),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" }),
            /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gold-400/60 mb-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic relative z-10", children: text }),
            /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500" }),
              "Sesi Reguler"
            ] }) })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Alur" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Proses Layanan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-7 top-8 bottom-8 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30" }),
        processSteps.map((step, idx) => /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(idx * 0.08), className: "relative flex items-center gap-5 group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", children: idx + 1 }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/60 dark:border-gray-700/50 shadow-md hover:-translate-y-0.5 transition-all duration-300", children: /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: step }) })
        ] }, idx))
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "FAQ" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "FAQ Hipnoterapi Reguler" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqItems.map((item, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(i * 0.08),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "font-black text-gray-900 dark:text-white mb-2 flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5", children: "Q" }),
              item.q
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium leading-relaxed pl-9", children: item.a })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "py-24 relative z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-12 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest", children: "Layanan Reguler" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4", children: "Mulai Sekarang" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed", children: "Kondisi yang Anda alami dapat dituntaskan hingga kembali netral dan terkendali." }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: WA_LINK,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
              "Konsultasi via WhatsApp sekarang"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { href: "/layanan", className: "text-sm text-gray-500 dark:text-gray-400 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors", children: "← Kembali ke semua layanan" }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsx(DisclaimerSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  LayananReguler as default
};
