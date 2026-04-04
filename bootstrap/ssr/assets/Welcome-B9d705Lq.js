import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-DnQfU1E1.js";
import { L as LiquidBackground } from "./LiquidBackground-DsMP_cZ6.js";
import { P as PageLoader } from "./PageLoader-Fgf54pWN.js";
import { S as SessionModeToggle } from "./SessionModeToggle-E_wJHQ72.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
const VisionMissionSection = lazy(() => import("./VisionMissionSection-vKKXp_Lr.js"));
const Footer = lazy(() => import("./Footer-D_6ZljtQ.js"));
const DisclaimerSection = lazy(() => import("./DisclaimerSection-xOYLaWsi.js"));
function Welcome({ auth, articles = [], packages = [] }) {
  const getPackage = (slug) => {
    return packages.find((p) => p.slug === slug) || {
      name: slug.toUpperCase(),
      base_price: 0,
      current_price: 0,
      discount_percentage: 0,
      discount_ends_at: null
    };
  };
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace("IDR", "Rp");
  };
  const [sessionMode, setSessionMode] = useState("offline");
  const isOnline = sessionMode === "online";
  const regulerPkg = getPackage("reguler");
  const premiumPkg = getPackage("premium");
  const vipPkg = getPackage("vip");
  const getDisplayPrice = (pkg) => isOnline ? pkg.online_current_price : pkg.current_price;
  const hasActiveDiscount = (pkg) => !isOnline && pkg.discount_percentage > 0;
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
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsxs(Head, { title: "Klinik Hipnoterapi Semarang | InDepth Mental Wellness — Sesi Privat & Profesional", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "InDepth Mental Wellness — klinik hipnoterapi profesional di Semarang. Atasi kecemasan, trauma, overthinking, dan masalah psikosomatis dengan sesi hipnoterapi privat bersama terapis bersertifikat." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "klinik hipnoterapi Semarang, hipnoterapi profesional, mengatasi kecemasan, terapi trauma, hipnoterapi privat, kesehatan mental Semarang, InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Klinik Hipnoterapi Semarang | InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Klinik hipnoterapi profesional di Semarang. Sesi privat untuk kecemasan, trauma, overthinking, dan psikosomatis. Terapis bersertifikat, hasil nyata." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "id_ID" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Klinik Hipnoterapi Semarang | InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Klinik hipnoterapi profesional di Semarang. Sesi privat untuk kecemasan, trauma, overthinking, dan psikosomatis." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "InDepth Mental Wellness",
        "alternateName": "InDepth Clinic",
        "description": "Klinik hipnoterapi profesional di Semarang menyediakan sesi privat untuk mengatasi kecemasan, trauma, overthinking, dan masalah psikosomatis.",
        "url": typeof window !== "undefined" ? window.location.origin : "",
        "logo": typeof window !== "undefined" ? `${window.location.origin}/images/logo-color.png` : "",
        "image": typeof window !== "undefined" ? `${window.location.origin}/images/og-dark.jpg` : "",
        "telephone": "+6282220800034",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jalan Kelud Raya 34B",
          "addressLocality": "Semarang",
          "addressRegion": "Jawa Tengah",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-7.0051",
          "longitude": "110.4189"
        },
        "openingHours": "Mo-Sa 09:00-20:00",
        "priceRange": "Rp1.500.000 – Rp5.000.000",
        "medicalSpecialty": "Hypnotherapy",
        "sameAs": []
      }) } })
    ] }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "home" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm md:backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-ping" }),
            "InDepth Mental Wellness Center"
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "text-5xl md:text-8xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-[0.9]",
          children: [
            "Klinik Hipnoterapi ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 filter drop-shadow-sm", children: "Semarang" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "mb-8",
          children: /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 tracking-tight", children: "Anda terganggu dengan pikiran, emosi, atau perilaku yang terus berulang dan semakin berat?" })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 15 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          className: "max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-300 mx-auto mb-10 leading-relaxed font-medium",
          children: "InDepth Klinik Hipnoterapi Semarang membantu Anda menanganinya. Kami menggunakan hipnosis dan trance untuk mengakses dan menata ulang program bawah sadar secara terarah dalam satu sesi."
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
            /* @__PURE__ */ jsxs("a", { href: "#layanan", className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(208,170,33,0.3)] hover:shadow-[0_8px_25px_rgba(208,170,33,0.4)] hover:-translate-y-1 hover:from-gold-300 hover:to-gold-500 transition-all duration-300 border border-gold-300/40", children: [
              "Layanan Kami",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-y-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi", target: "_blank", rel: "noopener noreferrer", className: "group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 hover:from-green-400 hover:to-green-500 transition-all duration-300 border border-green-400/40", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
              "Konsultasi via WhatsApp"
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "layanan", className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "InDepth Mental Wellness" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl uppercase italic", children: "Masalah yang Anda Alami" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-xl text-gray-600 dark:text-gray-400 mx-auto font-medium leading-relaxed", children: "Banyak klien datang saat mengalami kondisi seperti:" })
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
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight uppercase", children: "Pikiran & Emosi" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-gray-600 dark:text-gray-400 space-y-2 font-medium", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Pikiran terus berjalan dan sulit berhenti seperti overthinking dan kecemasan berulang"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Emosi mudah meledak, tegang, atau tertekan dalam aktivitas sehari-hari"
                ] })
              ] })
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
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight uppercase", children: "Kebiasaan & Fokus" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-gray-600 dark:text-gray-400 space-y-2 font-medium", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Kebiasaan buruk yang berulang terus-menerus dan mengganggu aktivitas"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Sulit fokus, mudah terdistraksi, dan ragu saat mengambil keputusan"
                ] })
              ] })
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
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight uppercase", children: "Keluhan Fisik & Psikologis" }),
              /* @__PURE__ */ jsxs("ul", { className: "text-gray-600 dark:text-gray-400 space-y-2 font-medium", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Keluhan fisik yang berakar dari faktor psikologis"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
                  " Pola pikiran dan perilaku buruk yang semakin mengganggu aktivitas"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs font-black text-gold-600 uppercase tracking-widest italic", children: "Kondisi seperti ini memerlukan penanganan yang terarah." })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 overflow-hidden bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxs(Link, { href: "/metode", className: "group inline-block", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase group-hover:text-gold-500 transition-colors", children: "Metodologi Kami" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors", children: "Metodologi InDepth" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 w-24 h-1 bg-gold-500 mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 w-full mb-16 items-stretch", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/metode#indepth-trance", className: "bg-white/40 dark:bg-gray-800/20 backdrop-blur-[32px] backdrop-saturate-[180%] p-8 rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl text-left relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }) }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors", children: "InDepth TRANCE" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm tracking-wide uppercase", children: "Akses Bawah Sadar" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto", children: "Mengakses program bawah sadar melalui kondisi trance yang terarah." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300", children: [
              "Pelajari Detail ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/metode#supreme-trance", className: "bg-white/40 dark:bg-gray-800/20 backdrop-blur-[32px] backdrop-saturate-[180%] p-8 rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl text-left relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors", children: "SUPREME TRANCE" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm tracking-wide uppercase", children: "Kondisi Sadar Penuh" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto", children: "Mengakses dan mengarahkan sistem bawah sadar dalam kondisi sadar penuh." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300", children: [
              "Pelajari Detail ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/metode#indepth-solution", className: "bg-white/40 dark:bg-gray-800/20 backdrop-blur-[32px] backdrop-saturate-[180%] p-8 rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl text-left relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 h-full flex flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-700" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-2xl flex items-center justify-center mb-6 shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-colors duration-500", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-gold-600 dark:text-gold-400 group-hover:text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }) }),
            /* @__PURE__ */ jsx("h4", { className: "text-xl font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors", children: "InDepth SOLUTION" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gold-600 dark:text-gold-400 mb-3 text-sm tracking-wide uppercase", children: "Kecerdasan Tubuh" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium text-sm leading-relaxed mt-auto", children: "Mengeksplorasi kecerdasan tubuh untuk memahami sistem internal dan menyusun solusi yang spesifik." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 text-gold-600 dark:text-gold-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300", children: [
              "Pelajari Detail ",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-24 w-full relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 relative z-10", children: "Keunggulan InDepth" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 dark:text-gray-300 font-light mb-12", children: "Setiap sesi dirancang terarah untuk menuntaskan hasil yang dapat dievaluasi." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16", children: [
          { title: "Privasi", desc: "Setiap sesi terjaga kerahasiaannya" },
          { title: "Dokumentasi", desc: "Tersedia untuk evaluasi hasil" },
          { title: "Fokus", desc: "Langsung pada inti kondisi" },
          { title: "Metode Original", desc: "Berbasis sistem terstruktur" }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 hover:-translate-y-1 transition-transform shadow-lg text-center md:text-left", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white text-lg", children: item.desc })
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xl font-bold text-gray-900 dark:text-white", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
            " Privasi Terjaga"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden md:block w-2 h-2 rounded-full bg-gold-500/50" }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
            " Satu Sesi Tuntas"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden md:block w-2 h-2 rounded-full bg-gold-500/50" }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
            " Hasil Dievaluasi"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pt-24 pb-12 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/30 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative z-10 text-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/20", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-300 animate-pulse" }),
          "Program Spesial Baru"
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "text-3xl md:text-5xl font-black mb-5 leading-[1.1] tracking-tight", children: [
          "Group Hipnoterapi ",
          /* @__PURE__ */ jsx("br", {}),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-blue-200", children: "Aku Anak Pintar" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-blue-100/90 text-lg md:text-xl mb-8 leading-relaxed font-medium bg-blue-900/20 inline-block p-4 rounded-2xl border border-blue-400/10", children: "Program khusus untuk mengatasi memori kelam dan membentuk mental anak berprestasi pada pelajar SD hingga SMA." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-400/30 flex items-center justify-center shrink-0 mt-0.5 border border-blue-300/30", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-lg", children: "Meningkatkan fokus dan kemampuan belajar signifikan" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-400/30 flex items-center justify-center shrink-0 mt-0.5 border border-blue-300/30", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-lg", children: "Mengatasi kemalasan, kecanduan gadget, & perilaku negatif" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-400/30 flex items-center justify-center shrink-0 mt-0.5 border border-blue-300/30", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white font-semibold text-lg", children: "Terapis profesional bersertifikat khusus hipnoterapi klinis" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "/group-hipnoterapi-anak-pintar", className: "group inline-flex items-center gap-3 bg-white text-blue-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)] transition-all duration-300 border-[3px] border-white/50", children: [
          "Lihat Detail Program",
          /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full md:w-5/12 relative shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full aspect-[4/3] md:aspect-square bg-gradient-to-br from-blue-300/20 to-white/10 backdrop-blur-sm border border-white/20 rounded-[3rem] shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden group", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" }),
        /* @__PURE__ */ jsx("img", { src: "/images/students_group.png", alt: "Anak Sekolah Indonesia SD SMP SMA", className: "absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 left-0 right-0 flex justify-center z-20 pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white font-black text-xs md:text-sm tracking-widest border border-white/40 uppercase shadow-[0_8px_30px_rgba(0,0,0,0.5)]", children: "Investasi Masa Depan" }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { id: "paket", className: "py-12 md:py-24 relative z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 dark:bg-gold-500/5 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter", children: "Struktur Layanan" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Layanan InDepth" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center gap-5", children: [
            /* @__PURE__ */ jsx(SessionModeToggle, { mode: sessionMode, onChange: setSessionMode }),
            isOnline && /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 dark:text-blue-400 font-medium animate-fade-in", children: "Sesi online via video call — harga tanpa diskon" }),
            !isOnline && (regulerPkg.discount_percentage > 0 || premiumPkg.discount_percentage > 0 || vipPkg.discount_percentage > 0) && /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center justify-center gap-3 bg-gradient-to-r from-gold-500/10 to-yellow-500/10 dark:from-gold-500/20 dark:to-yellow-500/20 border border-gold-500/30 rounded-full px-6 py-4 shadow-[0_4px_20px_rgba(208,170,33,0.1)]", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl animate-pulse", children: "🎉" }),
              /* @__PURE__ */ jsxs("span", { className: "text-gold-700 dark:text-gold-300 font-bold text-lg tracking-wide uppercase", children: [
                "Promo Layanan Terbatas: ",
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
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-800/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col h-full w-full", children: [
            hasActiveDiscount(regulerPkg) && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
              regulerPkg.discount_percentage,
              "%",
              /* @__PURE__ */ jsx("br", {}),
              "OFF"
            ] }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2 relative z-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "REGULER" }),
              /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm", children: "Stabilisasi Mental dan Emosi" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
                hasActiveDiscount(regulerPkg) && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2", children: formatPrice(regulerPkg.base_price) }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-gray-900 dark:text-white", children: formatPrice(getDisplayPrice(regulerPkg)) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
                "/ sesi ",
                isOnline ? "(online)" : ""
              ] }),
              !isOnline && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1.5 mt-3", children: regulerPkg.discount_ends_at && regulerPkg.discount_percentage > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
                "⏳ s/d ",
                formatDate(regulerPkg.discount_ends_at)
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 mt-4 font-light text-sm italic", children: "Untuk kondisi yang Anda alami sehari-hari." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-3 text-sm", children: "Fokus pada:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6", children: ["kecemasan berulang", "overthinking", "emosi sulit stabil", "kebiasaan buruk yang mengganggu"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-3 text-sm", children: "Hasil yang dicari:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["pikiran lebih tenang", "emosi lebih stabil", "kebiasaan terganti"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/screening/public?package=reguler", className: "block text-center py-4 px-6 rounded-full border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-bold hover:bg-gold-500 hover:text-white transition-all duration-300 mt-auto", children: "Pilih Reguler" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[3rem] p-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 group flex flex-col h-full w-full", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-500 to-yellow-500 rounded-full text-white text-[10px] font-bold shadow-lg uppercase tracking-widest whitespace-nowrap z-10", children: "Direkomendasikan" }),
            hasActiveDiscount(premiumPkg) && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
              premiumPkg.discount_percentage,
              "%",
              /* @__PURE__ */ jsx("br", {}),
              "OFF"
            ] }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0 border-b border-gray-200 dark:border-gray-700 pb-6 mt-2 relative z-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "PREMIUM" }),
              /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-semibold mb-4 text-sm", children: "Optimalisasi Potensi dan Performa" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
                hasActiveDiscount(premiumPkg) && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2", children: formatPrice(premiumPkg.base_price) }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500", children: formatPrice(getDisplayPrice(premiumPkg)) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
                "/ sesi ",
                isOnline ? "(online)" : ""
              ] }),
              !isOnline && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1.5 mt-3", children: premiumPkg.discount_ends_at && premiumPkg.discount_percentage > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-gray-800/50 text-gold-600 dark:text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
                "⏳ s/d ",
                formatDate(premiumPkg.discount_ends_at)
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 mt-4 font-light text-sm italic", children: "Untuk Anda yang ingin meningkat, bukan sekadar pulih." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow relative z-10", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-3 text-sm", children: "Fokus pada:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6", children: ["meningkatkan fokus", "memperkuat kontrol diri", "mengembangkan kapasitas mental", "performa profesional"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-3 text-sm", children: "Hasil yang dicari:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["fokus lebih terarah", "kontrol diri lebih kuat", "kapasitas mental berkembang"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-800 dark:text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/register?package=premium", className: "block text-center py-4 px-6 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 text-white font-bold shadow-[0_10px_20px_rgba(208,170,33,0.2)] hover:shadow-[0_15px_30px_rgba(208,170,33,0.3)] transition-all duration-300 hover:-translate-y-1 mt-auto relative z-10", children: "Pilih Premium" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative bg-gray-900/90 dark:bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-[3rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full w-full", children: [
            hasActiveDiscount(vipPkg) && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse", children: /* @__PURE__ */ jsxs("span", { className: "text-white font-black text-[9px] text-center leading-none uppercase", children: [
              vipPkg.discount_percentage,
              "%",
              /* @__PURE__ */ jsx("br", {}),
              "OFF"
            ] }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow-0 border-b border-gray-700 pb-6 relative z-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "VIP" }),
              /* @__PURE__ */ jsx("p", { className: "text-gold-400 font-semibold mb-4 text-sm", children: "Psikosomatis, Medis Kronis, dan Halusinasi" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 mb-1", children: [
                hasActiveDiscount(vipPkg) && /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-500 line-through decoration-rose-500/50 decoration-2", children: formatPrice(vipPkg.base_price) }),
                /* @__PURE__ */ jsx("span", { className: "text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200", children: formatPrice(getDisplayPrice(vipPkg)) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
                "/ sesi ",
                isOnline ? "(online)" : ""
              ] }),
              !isOnline && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1.5 mt-3", children: vipPkg.discount_ends_at && vipPkg.discount_percentage > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gold-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-gold-500/30", children: [
                "⏳ s/d ",
                formatDate(vipPkg.discount_ends_at)
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-500 mt-3 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 mt-4 font-light text-sm italic", children: "Untuk kondisi yang memerlukan pendekatan terfokus." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6 flex-grow relative z-10", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-white mb-3 text-sm", children: "Termasuk:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: ["keluhan psikosomatis yang muncul berulang", "kondisi medis kronis yang berkaitan dengan faktor psikologis", "halusinasi atau pengalaman internal yang mengganggu"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-300 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "text-gold-400 text-xs italic mb-6", children: "Pendekatan menggunakan hipnosis dan trance untuk menata ulang sistem bawah sadar secara terarah dalam satu sesi." }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-white mb-3 text-sm", children: "Hasil yang dicari:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: ["kondisi lebih stabil", "aktivitas kembali berjalan normal", "pola yang mengganggu dituntaskan"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-200 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gold-400 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                item
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: "/screening/public?package=vip", className: "block text-center py-4 px-6 rounded-full border-2 border-gold-500/50 text-white font-bold hover:bg-gold-500 transition-all duration-300 mt-auto relative z-10", children: "Pilih VIP" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/40 dark:bg-gray-900/20 backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Alur Penanganan" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight", children: "Alur Penanganan" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-6 md:left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-gold-500 via-gold-400/50 to-transparent rounded-full opacity-30" }),
          [
            {
              title: "Konsultasi via WhatsApp",
              desc: "Hubungi kami melalui WhatsApp untuk memulai proses penanganan.",
              icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) })
            },
            {
              title: "Screening Mental",
              desc: "Sistem menganalisa kebutuhan Anda melalui pre-assessment komprehensif.",
              icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" }) })
            },
            {
              title: "Login Sistem",
              desc: "Daftarkan diri Anda ke dalam sistem klinik InDepth.",
              icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16M4 18h7" }) })
            },
            {
              title: "Booking Jadwal",
              desc: "Pilih program (Reguler, Premium, VIP) dan tentukan jadwal sesi.",
              icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }) })
            },
            {
              title: "Pembayaran",
              desc: "Setiap sesi diakhiri dengan pengukuran dampak yang terukur dan nyata.",
              icon: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) })
            }
          ].map((step, idx) => /* @__PURE__ */ jsxs("div", { className: "relative flex items-start gap-6 group", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative shrink-0 mt-1", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-xl shadow-[0_8px_30px_rgba(208,170,33,0.3)] relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", children: idx + 1 }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gold-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400", children: step.icon }),
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-xl", children: step.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium", children: step.desc })
            ] })
          ] }, idx))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/20 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] border border-white/60 dark:border-gray-700/50 shadow-2xl relative overflow-hidden group hover:shadow-gold-500/10 transition-all duration-700 mt-8 md:mt-24", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-125 duration-700 pointer-events-none" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Siapa yang Cocok" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-extrabold text-gray-900 dark:text-white mb-10 tracking-tight", children: "Siapa yang Cocok Datang?" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-6 relative z-10", children: [
          { text: "Individu dengan pikiran yang terus-menerus mengganggu", icon: "🧠" },
          { text: "Mereka yang ingin menyelesaikan kondisi dalam satu sesi terarah", icon: "🎯" },
          { text: "Klien yang menghargai privasi dan proses yang terstruktur", icon: "🔒" },
          { text: "Individu dengan keluhan fisik yang berakar dari faktor psikologis", icon: "💆" }
        ].map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-5 p-5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-white/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-x-1 transition-all duration-300", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 flex items-center justify-center text-2xl shrink-0 border border-gold-500/10 group-hover:bg-gold-500/20 transition-colors", children: item.icon }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800 dark:text-gray-200 text-lg leading-tight", children: item.text })
        ] }, idx)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-lg border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase font-inter", children: "Testimoni" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "Testimoni" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("svg", { className: "absolute -top-4 -left-4 w-10 h-10 text-gold-500/10", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10", children: '"Saya mengalami overthinking setiap malam sampai sulit tidur. Pikiran terus berjalan dan sulit berhenti. Dalam satu sesi Reguler, kondisi tersebut dituntaskan dan tidur kembali normal."' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg", children: "A" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "A.S." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase", children: "Klien Reguler" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-gold-500/20 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden md:-translate-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold-400/10 rounded-bl-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("svg", { className: "absolute -top-4 -left-4 w-10 h-10 text-gold-500/10", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10", children: '"Saya memiliki kebiasaan menunda pekerjaan setiap hari. Setiap mulai kerja, fokus langsung hilang. Setelah sesi Reguler, pola tersebut dituntaskan dan pekerjaan selesai tepat waktu."' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg", children: "M" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "M.P." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase", children: "Klien Reguler" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("svg", { className: "absolute -top-4 -left-4 w-10 h-10 text-gold-500/10", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10", children: '"Saya mengalami nyeri dada saat stres yang muncul berulang. Pemeriksaan medis sudah dilakukan dan kondisi ini terus muncul. Setelah sesi VIP, pola tersebut dituntaskan dan aktivitas kembali berjalan normal."' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg", children: "D" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "D.R." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase", children: "Klien VIP" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-bl-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "flex text-gold-500 mb-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("svg", { className: "absolute -top-4 -left-4 w-10 h-10 text-gold-500/10", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V15M14.017 21H7.01701V15L7.01701 14C7.01701 11.2386 9.25559 9 12.017 9V11C10.3599 11 9.01701 12.3431 9.01701 14V15H12.017C13.1216 15 14.017 15.8954 14.017 17V21H14.017Z" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed relative z-10", children: '"Saya mengalami halusinasi yang muncul pada situasi tertentu dan mengganggu aktivitas. Setelah sesi VIP, pola tersebut dituntaskan dan kondisi menjadi stabil."' })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl shadow-lg", children: "H" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white text-lg", children: "H.W." }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase", children: "Klien VIP" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 -left-20 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12 mb-24", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full lg:w-5/12 lg:-mt-12", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-yellow-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" }),
          /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2.5rem] overflow-hidden border border-gold-500/20 shadow-2xl aspect-[3/4] bg-gray-100 dark:bg-gray-800", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/julius-bambang.png",
                alt: "Julius Bambang",
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
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
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-32 flex items-center justify-center", children: "Loading..." }), children: /* @__PURE__ */ jsx(VisionMissionSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase", children: "Pertanyaan Umum" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl leading-8 font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl", children: "FAQ Hipnoterapi Semarang" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
        {
          q: "Apa itu hipnoterapi di InDepth?",
          a: "Hipnoterapi di InDepth menggunakan hipnosis dan trance untuk mengakses serta menata ulang program bawah sadar secara terarah."
        },
        {
          q: "Apakah cukup satu sesi?",
          a: "Pendekatan difokuskan pada hasil yang dituntaskan dalam satu sesi."
        },
        {
          q: "Bagaimana prosesnya?",
          a: "Proses berlangsung dalam kondisi sadar dengan hipnosis dan trance secara terarah."
        },
        {
          q: "Apakah cocok untuk kondisi berat seperti psikosomatis atau halusinasi?",
          a: "Tersedia layanan VIP untuk kondisi tersebut dengan pendekatan terfokus."
        },
        {
          q: "Bagaimana cara mulai?",
          a: "Mulai melalui konsultasi WhatsApp untuk screening dan penjadwalan."
        }
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-lg mb-2", children: item.q }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 font-medium leading-relaxed", children: item.a })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-20 z-10", children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl mx-auto py-24 px-4 sm:px-6 lg:px-8 text-center rounded-[3rem] border border-gold-500/20 dark:border-gray-800 bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl shadow-xl overflow-hidden my-12", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -top-[50%] -left-[10%] w-[120%] h-[100%] bg-gradient-to-b from-gold-500/5 to-transparent blur-2xl transform -rotate-6 pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white relative z-10", children: "Tuntaskan dalam Satu Sesi" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl opacity-90 mb-10 text-gray-600 dark:text-gray-300 mx-auto max-w-2xl font-light relative z-10", children: "Kami menawarkan solusi untuk menuntaskannya melalui pemrograman bawah sadar secara terarah dalam satu sesi." }),
      /* @__PURE__ */ jsxs("a", { href: "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi", target: "_blank", rel: "noopener noreferrer", className: "relative z-10 px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full text-lg shadow-[0_8px_30px_rgba(208,170,33,0.3)] hover:shadow-[0_15px_40px_rgba(208,170,33,0.5)] transition-all duration-300 inline-flex items-center gap-2 group", children: [
        "Konsultasi via WhatsApp sekarang",
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
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] overflow-hidden shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-0", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "p-12 lg:p-16 flex flex-col justify-center",
          children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block mb-4 text-xs font-black uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400", children: "Tentang Kami" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight", children: [
              "PT InDepth",
              /* @__PURE__ */ jsx("br", {}),
              "Mental Wellness"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6", children: "Badan usaha yang bergerak dalam layanan hipnoterapi dan pengembangan sistem mental manusia — berbasis pendekatan unconscious dan kecerdasan tubuh untuk menangani kondisi pikiran, perilaku, serta sistem internal secara terarah." }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-3 mb-8", children: [
              "InDepth Clinic",
              "InDepth Academy",
              "Satu Sesi Terarah"
            ].map((item) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-50 dark:bg-gold-950/30 border border-gold-200 dark:border-gold-800/50 text-xs font-bold text-gold-700 dark:text-gold-400", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
              item
            ] }, item)) }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/tentangkami",
                className: "inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full text-sm shadow-[0_8px_30px_rgba(208,170,33,0.25)] hover:shadow-[0_12px_40px_rgba(208,170,33,0.4)] transition-all duration-300 group w-fit",
                children: [
                  "Pelajari Lebih Lanjut",
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.15 },
          className: "bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-900/20 dark:to-gray-900/20 p-12 lg:p-16 flex flex-col justify-center gap-8 border-t lg:border-t-0 lg:border-l border-white/60 dark:border-gray-700/50",
          children: [
            [
              { label: "Pengalaman Praktik", value: "20+", sub: "Tahun" },
              { label: "Metodologi", value: "3", sub: "Sistem Terintegrasi" },
              { label: "Unit Layanan", value: "2", sub: "Clinic & Academy" }
            ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-black text-gold-600 dark:text-gold-400 leading-none tabular-nums", children: stat.value }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 dark:text-white", children: stat.label }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium", children: stat.sub })
              ] })
            ] }, i)),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-8 border-t border-white/50 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3", children: "Metodologi" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["InDepth TRANCE", "SUPREME TRANCE", "InDepth SOLUTION"].map((m) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl text-[10px] font-black tracking-widest text-gray-700 dark:text-gray-300 border border-white/80 dark:border-gray-700/50", children: m }, m)) })
            ] })
          ]
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-32 flex items-center justify-center", children: "Loading..." }), children: [
      /* @__PURE__ */ jsx(DisclaimerSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  Welcome as default
};
