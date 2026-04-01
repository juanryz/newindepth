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
const WA_LINK = "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});
function Layanan({ auth, packages = [] }) {
  const getPackage = (slug) => packages.find((p) => p.slug === slug) || {
    name: slug.toUpperCase(),
    base_price: 0,
    current_price: 0,
    discount_percentage: 0,
    discount_ends_at: null
  };
  const formatPrice = (price) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace("IDR", "Rp");
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  const regulerPkg = getPackage("reguler");
  const premiumPkg = getPackage("premium");
  const vipPkg = getPackage("vip");
  const testimonials = [
    {
      quote: "Saya mengalami overthinking setiap malam sampai sulit tidur. Pikiran terus berjalan dan sulit berhenti. Dalam satu sesi Reguler, kondisi tersebut dituntaskan dan tidur kembali normal.",
      tag: "Reguler"
    },
    {
      quote: "Saya memiliki kebiasaan menunda pekerjaan setiap hari. Setiap mulai kerja, fokus langsung hilang. Setelah sesi Reguler, pola tersebut dituntaskan dan pekerjaan selesai tepat waktu.",
      tag: "Reguler"
    },
    {
      quote: "Saya mengalami nyeri dada saat stres yang muncul berulang. Pemeriksaan medis sudah dilakukan dan kondisi ini terus muncul. Setelah sesi VIP, pola tersebut dituntaskan dan aktivitas kembali berjalan normal.",
      tag: "VIP"
    },
    {
      quote: "Saya mengalami halusinasi pada situasi tertentu yang mengganggu aktivitas. Setelah sesi VIP, pola tersebut dituntaskan dan kondisi menjadi stabil.",
      tag: "VIP"
    }
  ];
  const processSteps = [
    {
      title: "Konsultasi via WhatsApp",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) })
    },
    {
      title: "Screening Mental",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) })
    },
    {
      title: "Login Sistem",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" }) })
    },
    {
      title: "Booking Jadwal",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) })
    },
    {
      title: "Pembayaran",
      icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }) })
    }
  ];
  const faqItems = [
    {
      q: "Apa itu hipnoterapi di InDepth?",
      a: "Hipnoterapi di InDepth menggunakan hipnosis dan trance untuk mengakses serta memprogram ulang program bawah sadar secara terarah."
    },
    {
      q: "Apa perbedaan Reguler, Premium, dan VIP?",
      a: "Reguler untuk stabilisasi mental dan perilaku. Premium untuk performa dan kapasitas internal. VIP untuk psikosomatis, medis kronis, dan halusinasi."
    },
    {
      q: "Apakah cukup satu sesi?",
      a: "Pendekatan difokuskan pada hasil yang dituntaskan dalam satu sesi."
    },
    {
      q: "Bagaimana memilih layanan yang tepat?",
      a: "Pemilihan layanan dilakukan melalui proses screening awal."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsxs(Head, { title: "Layanan Hipnoterapi Semarang | InDepth Klinik", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Pilih paket hipnoterapi sesuai kebutuhan Anda: Reguler untuk kecemasan & overthinking, Premium untuk pengembangan diri, VIP untuk kasus psikosomatis & medis kronis. InDepth Clinic Semarang." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "layanan hipnoterapi Semarang, paket hipnoterapi, hipnoterapi reguler, hipnoterapi premium, hipnoterapi VIP, klinik hipnoterapi, terapi mental Semarang" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Layanan Hipnoterapi Semarang | InDepth Klinik" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Pilih paket hipnoterapi sesuai kebutuhan: Reguler, Premium, atau VIP. Sesi privat bersama terapis bersertifikat di InDepth Clinic Semarang." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "id_ID" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Layanan Hipnoterapi Semarang | InDepth Klinik" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Paket hipnoterapi Reguler, Premium, dan VIP di InDepth Clinic Semarang." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Layanan Hipnoterapi InDepth",
        "description": "Hipnoterapi profesional di Semarang dengan tiga tingkat paket: Reguler, Premium, dan VIP, disesuaikan dengan kebutuhan klien.",
        "provider": {
          "@type": "MedicalBusiness",
          "name": "InDepth Mental Wellness",
          "url": typeof window !== "undefined" ? window.location.origin : "",
          "telephone": "+6282220800034",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jalan Kelud Raya 34B",
            "addressLocality": "Semarang",
            "addressRegion": "Jawa Tengah",
            "addressCountry": "ID"
          }
        },
        "areaServed": { "@type": "City", "name": "Semarang" },
        "url": typeof window !== "undefined" ? window.location.href : ""
      }) } })
    ] }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "layanan" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-ping" }),
            "InDepth Klinik Hipnoterapi Semarang"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-4xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[0.9]",
          children: [
            "Layanan Hipnoterapi",
            " ",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm", children: "Semarang InDepth Klinik" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          className: "max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mx-auto mb-4 leading-relaxed font-medium",
          children: "InDepth Klinik Hipnoterapi Semarang menyediakan layanan berbasis hipnosis dan trance untuk memprogram ulang program bawah sadar secara terarah."
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.25 },
          className: "max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400 mx-auto mb-10 leading-relaxed",
          children: "Setiap layanan dirancang sesuai dengan kondisi yang Anda alami, mulai dari stabilisasi mental hingga penanganan psikosomatis dan kondisi khusus."
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4, delay: 0.3 },
          className: "flex flex-col sm:flex-row justify-center gap-4",
          children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#layanan-cards",
                className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 transition-all duration-300 border border-gold-300/40",
                children: [
                  "Lihat Layanan",
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-y-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
                ]
              }
            ),
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
    /* @__PURE__ */ jsx("div", { id: "layanan-cards", className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Struktur Layanan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl", children: "Pilih Layanan Anda" }),
        (regulerPkg.discount_percentage > 0 || premiumPkg.discount_percentage > 0 || vipPkg.discount_percentage > 0) && /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-col items-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 dark:from-gold-500/20 dark:to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-3 shadow-[0_4px_20px_rgba(208,170,33,0.1)]", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🎉" }),
          /* @__PURE__ */ jsxs("span", { className: "text-gold-700 dark:text-gold-300 font-bold tracking-wide", children: [
            "Program Khusus:",
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400", children: [
              "Diskon s/d ",
              Math.max(regulerPkg.discount_percentage, premiumPkg.discount_percentage, vipPkg.discount_percentage),
              "%",
              (() => {
                const dates = [regulerPkg.discount_ends_at, premiumPkg.discount_ends_at, vipPkg.discount_ends_at].filter(Boolean);
                const latest = dates.length > 0 ? dates.sort().pop() : null;
                return latest ? ` hingga ${formatDate(latest)}` : "";
              })()
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch", children: [
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full", children: [
          regulerPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
            regulerPkg.discount_percentage,
            "%",
            /* @__PURE__ */ jsx("br", {}),
            "OFF"
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest", children: "Reguler" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight", children: "Hipnoterapi Reguler" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm", children: "Stabilisasi Mental dan Emosi" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
              regulerPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2", children: formatPrice(regulerPkg.base_price) }),
              /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: formatPrice(regulerPkg.current_price) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "/ sesi · ±2 jam" }),
            regulerPkg.discount_percentage > 0 && regulerPkg.discount_ends_at && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
              "⏳ Diskon ",
              regulerPkg.discount_percentage,
              "% s/d ",
              formatDate(regulerPkg.discount_ends_at)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3", children: "Kondisi yang Anda alami" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [
                "Pikiran terus berjalan dan sulit berhenti seperti overthinking dan kecemasan berulang",
                "Emosi mudah meledak, tegang, atau tertekan",
                "Kebiasaan buruk yang berulang terus-menerus",
                "Sulit fokus dan ragu saat mengambil keputusan"
              ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2", children: "Fokus Penanganan" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Mengakses dan memprogram ulang program bawah sadar yang memicu pola pikiran, emosi, dan perilaku." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3", children: "Hasil yang Dituju" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["Pikiran lebih terarah", "Emosi lebih stabil", "Pola buruk berhenti berulang", "Aktivitas kembali berjalan normal"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/layanan/reguler",
              className: "mt-8 block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300",
              children: "Lihat Detail Layanan Reguler"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.1), className: "relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[3rem] p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 flex flex-col h-full", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-[10px] font-bold shadow-lg uppercase tracking-widest whitespace-nowrap z-10", children: "Direkomendasikan" }),
          premiumPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
            premiumPkg.discount_percentage,
            "%",
            /* @__PURE__ */ jsx("br", {}),
            "OFF"
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-gold-600 dark:text-gold-400 text-xs font-bold uppercase tracking-widest", children: "Premium" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight", children: "Hipnoterapi Premium" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm", children: "Optimalisasi Performa dan Kapasitas Internal" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
              premiumPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2", children: formatPrice(premiumPkg.base_price) }),
              /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500", children: formatPrice(premiumPkg.current_price) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "/ sesi · ±2 jam" }),
            premiumPkg.discount_percentage > 0 && premiumPkg.discount_ends_at && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
              "⏳ Diskon ",
              premiumPkg.discount_percentage,
              "% s/d ",
              formatDate(premiumPkg.discount_ends_at)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3", children: "Kondisi yang Anda alami" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [
                "Fokus mudah terpecah saat bekerja",
                "Performa mental belum maksimal",
                "Kontrol diri perlu diperkuat",
                "Kapasitas internal ingin ditingkatkan"
              ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2", children: "Fokus Penanganan" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Mengakses dan memprogram ulang program bawah sadar untuk mendukung performa dan kapasitas maksimal internal." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3", children: "Hasil yang Dituju" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["Fokus meningkat", "Keputusan lebih tegas", "Kontrol diri lebih kuat", "Performa mencapai kapasitas maksimal"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/layanan/premium",
              className: "mt-8 block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-bold shadow-[0_10px_20px_rgba(208,170,33,0.2)] hover:shadow-[0_15px_30px_rgba(208,170,33,0.3)] transition-all duration-300 hover:-translate-y-1",
              children: "Lihat Detail Layanan Premium"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.2), className: "relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full", children: [
          vipPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
            vipPkg.discount_percentage,
            "%",
            /* @__PURE__ */ jsx("br", {}),
            "OFF"
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-gray-700 pb-6 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-red-500" }),
              /* @__PURE__ */ jsx("span", { className: "text-red-400 text-xs font-bold uppercase tracking-widest", children: "VIP" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-white mb-1 uppercase tracking-tight", children: "Hipnoterapi VIP" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-400 font-semibold mb-4 text-sm", children: "Psikosomatis, Medis Kronis, dan Halusinasi" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
              vipPkg.discount_percentage > 0 && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-500 line-through decoration-rose-500/50 decoration-2", children: formatPrice(vipPkg.base_price) }),
              /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200", children: formatPrice(vipPkg.current_price) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "/ sesi · ±2 jam" }),
            vipPkg.discount_percentage > 0 && vipPkg.discount_ends_at && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
              "⏳ Diskon ",
              vipPkg.discount_percentage,
              "% s/d ",
              formatDate(vipPkg.discount_ends_at)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Kondisi yang Anda alami" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [
                "Keluhan psikosomatis yang muncul berulang pada tubuh",
                "Kondisi medis kronis yang berkaitan dengan faktor psikologis",
                "Halusinasi atau pengalaman internal yang mengganggu"
              ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Fokus Penanganan" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300", children: "Mengakses dan memprogram ulang sistem bawah sadar yang berkaitan dengan kondisi fisik dan pengalaman internal secara terarah." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Hasil yang Dituju" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["Pola psikosomatis dituntaskan", "Respons tubuh lebih stabil", "Pengalaman internal terkendali", "Aktivitas kembali berjalan normal"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gold-400 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/layanan/vip",
              className: "mt-8 block text-center py-4 px-6 rounded-full border-2 border-gold-500/50 text-white font-bold hover:bg-gold-500 transition-all duration-300",
              children: "Lihat Detail Layanan VIP"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Perbandingan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white", children: "Perbandingan Singkat" })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0.1), className: "overflow-hidden rounded-[2rem] border border-white/60 dark:border-gray-700/50 shadow-xl", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gradient-to-r from-gold-500/10 to-yellow-500/10 dark:from-gold-500/20 dark:to-yellow-500/20", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs", children: "Layanan" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs", children: "Fokus" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-6 py-4 font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs", children: "Target" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: [
          { layanan: "Reguler", fokus: "Pikiran, emosi, perilaku", target: "Stabil", color: "bg-blue-500" },
          { layanan: "Premium", fokus: "Performa & kapasitas internal", target: "Maksimal", color: "bg-gold-500" },
          { layanan: "VIP", fokus: "Psikosomatis & kondisi khusus", target: "Tuntas", color: "bg-red-500" }
        ].map((row, i) => /* @__PURE__ */ jsxs("tr", { className: `${i % 2 === 0 ? "bg-white/60 dark:bg-gray-800/40" : "bg-white/30 dark:bg-gray-800/20"} backdrop-blur-sm transition-colors hover:bg-gold-500/5`, children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-gray-900 dark:text-white", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full ${row.color}` }),
            row.layanan
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-gray-600 dark:text-gray-300", children: row.fokus }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 font-bold text-xs border border-green-500/20", children: row.target }) })
        ] }, i)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Testimoni" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Apa Kata Klien Kami" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: testimonials.map((item, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(i * 0.1),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 group relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-gold-400/60 mb-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-base italic mb-6", children: item.quote }),
              /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${item.tag === "VIP" ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"}`, children: [
                /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${item.tag === "VIP" ? "bg-red-500" : "bg-blue-500"}` }),
                "Sesi ",
                item.tag
              ] })
            ] })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Alur" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white", children: "Proses Layanan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30" }),
        processSteps.map((step, idx) => /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(idx * 0.08), className: "relative flex items-start gap-6 group", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative shrink-0 mt-1", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-xl shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", children: idx + 1 }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400", children: step.icon }),
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-lg", children: step.title })
          ] }) })
        ] }, idx))
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "FAQ" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-black tracking-tight text-gray-900 dark:text-white", children: "FAQ Hipnoterapi Semarang" })
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
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 dark:bg-gold-500/5 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-12 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest", children: "InDepth Klinik" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 leading-relaxed", children: "InDepth membantu Anda menuntaskan kondisi melalui pemrograman ulang bawah sadar secara terarah dalam satu sesi." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-10 leading-relaxed", children: "Mulai dengan konsultasi gratis via WhatsApp sekarang." }),
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
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsx(DisclaimerSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  Layanan as default
};
