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
const Footer = lazy(() => import("./Footer-D_6ZljtQ.js"));
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});
const SectionLabel = ({ children }) => /* @__PURE__ */ jsx("span", { className: "inline-block mb-3 text-xs font-black uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400", children });
const Card = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] shadow-xl ${className}`, children });
function TentangKami({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsxs(Head, { title: "Tentang Kami | PT InDepth Mental Wellness", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "PT InDepth Mental Wellness — klinik hipnoterapi profesional di Semarang. Didirikan dengan misi menghadirkan solusi kesehatan mental berbasis ilmu pengetahuan, dengan pendekatan holistik dan privat." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "tentang InDepth Mental Wellness, klinik hipnoterapi Semarang, PT InDepth, kesehatan mental Semarang, profil klinik hipnoterapi, terapi mental profesional" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Tentang Kami | PT InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Mengenal InDepth Mental Wellness — klinik hipnoterapi profesional di Semarang dengan pendekatan holistik, privat, dan berbasis bukti ilmiah." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "id_ID" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Tentang Kami | PT InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Klinik hipnoterapi profesional di Semarang. Pendekatan holistik, privat, dan berbasis bukti ilmiah." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "PT InDepth Mental Wellness",
        "alternateName": "InDepth Clinic",
        "description": "Klinik hipnoterapi profesional di Semarang menyediakan layanan kesehatan mental berbasis ilmu pengetahuan dengan pendekatan holistik dan privat.",
        "url": typeof window !== "undefined" ? window.location.origin : "",
        "logo": typeof window !== "undefined" ? `${window.location.origin}/images/logo-color.png` : "",
        "telephone": "+6282220800034",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jalan Kelud Raya 34B",
          "addressLocality": "Semarang",
          "addressRegion": "Jawa Tengah",
          "addressCountry": "ID"
        },
        "foundingDate": "2020",
        "areaServed": { "@type": "City", "name": "Semarang" }
      }) } })
    ] }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "tentangkami" }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 pt-40 pb-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "Tentang Kami" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]", children: [
        "PT InDepth",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "Mental Wellness" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-4", children: "Sistem layanan hipnoterapi dan pengembangan potensi mental berbasis pemrograman bawah sadar dan kecerdasan tubuh." }),
      /* @__PURE__ */ jsx("p", { className: "text-base text-gray-500 dark:text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto", children: "Dikembangkan sebagai pendekatan terarah untuk membantu penanganan kondisi serta optimalisasi kapasitas manusia secara spesifik." })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs(Card, { className: "p-10 lg:p-14", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "Tentang Perusahaan" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6", children: "PT InDepth Mental Wellness" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-base sm:text-lg max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { children: "PT InDepth Mental Wellness merupakan badan usaha yang bergerak dalam layanan hipnoterapi dan pengembangan sistem mental manusia." }),
        /* @__PURE__ */ jsx("p", { children: "Perusahaan ini mengembangkan pendekatan berbasis unconscious dan kecerdasan tubuh untuk menangani kondisi pikiran, perilaku, serta sistem internal secara terarah." }),
        /* @__PURE__ */ jsx("p", { children: "Seluruh sistem dikembangkan dan dijalankan secara terintegrasi dalam lingkungan InDepth." })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Struktur Usaha" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white", children: "PT InDepth Mental Wellness mengelola dua unit utama" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        {
          title: "InDepth Clinic",
          desc: "Layanan hipnoterapi untuk penanganan kondisi pikiran, perilaku, psikosomatis, dan sistem tubuh melalui pendekatan satu sesi terarah.",
          icon: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) })
        },
        {
          title: "InDepth Academy",
          desc: "Pusat pengembangan dan sertifikasi hipnoterapis berbasis metodologi InDepth. Menghasilkan praktisi dengan standar kompetensi yang terstruktur dan terukur.",
          icon: /* @__PURE__ */ jsxs("svg", { className: "w-7 h-7", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 14l9-5-9-5-9 5 9 5z" }),
            /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" })
          ] })
        }
      ].map((unit, i) => /* @__PURE__ */ jsx(motion.div, { ...fadeUp(i * 0.1), children: /* @__PURE__ */ jsxs(Card, { className: "p-8 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-gold-50 dark:bg-gold-950/30 border border-gold-200 dark:border-gold-800/50 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6", children: unit.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-3", children: unit.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 font-medium leading-relaxed", children: unit.desc })
      ] }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Pendekatan dan Metodologi" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4", children: "Metodologi Berbasis Unconscious" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", children: [
        /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), className: "space-y-4", children: ["InDepth TRANCE", "SUPREME TRANCE", "InDepth SOLUTION"].map((m, i) => /* @__PURE__ */ jsxs(Card, { className: "p-6 flex items-center gap-5", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-gold-500 flex items-center justify-center text-white font-black text-sm shrink-0", children: i + 1 }),
          /* @__PURE__ */ jsx("span", { className: "font-black tracking-widest text-gray-900 dark:text-white text-sm uppercase", children: m })
        ] }, i)) }),
        /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0.1), children: /* @__PURE__ */ jsxs(Card, { className: "p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-5", children: "Pendekatan Difokuskan Pada" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            "Akses ke unconscious",
            "Komunikasi dengan kecerdasan tubuh",
            "Pemrograman ulang sistem internal",
            "Integrasi perubahan ke level fisik"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-1 w-2 h-2 rounded-full bg-gold-500 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed", children: item })
          ] }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-gray-500 dark:text-gray-500 font-medium leading-relaxed", children: "Metode ini dikembangkan secara khusus dan digunakan secara terintegrasi dalam sistem InDepth." })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Sistem Layanan" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white", children: "Pendekatan Satu Sesi Terarah" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: [
        { step: "01", label: "Akses ke sistem bawah sadar" },
        { step: "02", label: "Identifikasi pola internal" },
        { step: "03", label: "Pemrograman ulang sistem" },
        { step: "04", label: "Integrasi ke tubuh" },
        { step: "05", label: "Evaluasi dalam sesi" }
      ].map((item, i) => /* @__PURE__ */ jsx(motion.div, { ...fadeUp(i * 0.08), children: /* @__PURE__ */ jsxs(Card, { className: "p-6 text-center h-full flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-black text-gold-500 dark:text-gold-400", children: item.step }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug", children: item.label })
      ] }) }, i)) }),
      /* @__PURE__ */ jsx(motion.p, { ...fadeUp(0.3), className: "mt-8 text-center text-sm text-gray-500 dark:text-gray-500 font-medium max-w-2xl mx-auto", children: "Pendekatan ini dirancang untuk memberikan proses yang spesifik sesuai kondisi personal." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "Keunggulan Sistem InDepth" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white", children: "Mengapa InDepth?" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        "Metodologi dikembangkan secara internal",
        "Pendekatan berbasis unconscious dan kecerdasan tubuh",
        "Sistem terintegrasi antara layanan dan teknologi AI",
        "Sertifikasi praktisi berjenjang",
        "Privasi dan dokumentasi sesi terjaga",
        "Proses terarah dalam satu sesi"
      ].map((item, i) => /* @__PURE__ */ jsx(motion.div, { ...fadeUp(i * 0.07), children: /* @__PURE__ */ jsxs(Card, { className: "p-6 flex items-start gap-4 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-gold-500/10 dark:bg-gold-900/30 border border-gold-300/40 dark:border-gold-700/40 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M5 13l4 4L19 7" }) }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm", children: item })
      ] }) }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs(Card, { className: "p-10 lg:p-14 text-center", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: "Kredibilitas" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto", children: "PT InDepth Mental Wellness merupakan badan hukum resmi yang telah memiliki izin operasional. Seluruh layanan dijalankan oleh tim profesional InDepth Mental Wellness yang didukung oleh standar kompetensi tinggi dengan pengalaman praktik selama lebih dari dua dekade." })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs(Card, { className: "p-10 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-white mb-6", children: /* @__PURE__ */ jsxs("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
        ] }) }),
        /* @__PURE__ */ jsx(SectionLabel, { children: "Visi" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-gray-900 dark:text-white leading-relaxed", children: "Menjadi penyedia layanan kesehatan utama dan pusat pengembangan diri melalui optimalisasi potensi mental manusia dari Indonesia untuk dunia." })
      ] }) }),
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0.1), children: /* @__PURE__ */ jsxs(Card, { className: "p-10 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-white mb-6", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" }) }) }),
        /* @__PURE__ */ jsx(SectionLabel, { children: "Misi" }),
        /* @__PURE__ */ jsx("ol", { className: "space-y-4", children: [
          "Merangkum, mengembangkan, menyempurnakan, dan menciptakan ilmu hipnotis dan teknik-teknik hipnoterapi baru untuk meningkatkan kualitas hidup manusia secara akademis etis.",
          "Mencetak pakar hipnotis dan hipnoterapi yang kompeten, profesional, dan terstandarisasi tinggi dan menciptakan Standar Hipnoterapis Indonesia.",
          "Mengoptimalkan potensi mental client untuk menyelesaikan masalah kesehatan fisik maupun mental dan memicu pengembangan diri."
        ].map((misi, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-gold-100 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium leading-relaxed text-sm", children: misi })
        ] }, i)) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative z-10 py-20 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-[3rem] border border-gold-500/20 dark:border-gray-800 bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl shadow-xl overflow-hidden py-20 px-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-b from-gold-500/5 to-transparent blur-2xl transform -rotate-6 pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-6 relative z-10", children: "Mulai Perjalanan Anda Bersama InDepth" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-10 relative z-10", children: "PT InDepth Mental Wellness menghadirkan sistem layanan dan pengembangan mental berbasis metodologi yang terstruktur, terarah, dan spesifik — difokuskan pada akses ke sistem terdalam dalam diri manusia." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center relative z-10", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full text-sm shadow-[0_8px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 inline-flex items-center gap-2 group",
            children: [
              "Konsultasi via WhatsApp",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/layanan",
            className: "px-8 py-4 bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-full text-sm border border-white/80 dark:border-gray-700 transition-all duration-300 inline-flex items-center gap-2",
            children: "Lihat Layanan Kami"
          }
        )
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-32 flex items-center justify-center", children: "Loading..." }), children: /* @__PURE__ */ jsx(Footer, {}) })
  ] });
}
export {
  TentangKami as default
};
