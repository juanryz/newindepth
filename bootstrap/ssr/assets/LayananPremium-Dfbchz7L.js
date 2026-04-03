import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { N as Navbar } from "./Navbar-DnQfU1E1.js";
import { L as LiquidBackground } from "./LiquidBackground-DsMP_cZ6.js";
import { P as PageLoader } from "./PageLoader-Fgf54pWN.js";
import { S as SessionModeToggle } from "./SessionModeToggle-E_wJHQ72.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
const Footer = lazy(() => import("./Footer-CpVcuKD4.js"));
const DisclaimerSection = lazy(() => import("./DisclaimerSection-xOYLaWsi.js"));
const WA_LINK = "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20konsultasi%20Layanan%20Premium";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) });
function LayananPremium({ auth, packages = [] }) {
  const premiumPkg = packages.find((p) => p.slug === "premium") || {
    base_price: 0,
    current_price: 0,
    online_current_price: 0,
    discount_percentage: 0,
    discount_ends_at: null
  };
  const [sessionMode, setSessionMode] = useState("offline");
  const isOnline = sessionMode === "online";
  const displayPrice = isOnline ? premiumPkg.online_current_price : premiumPkg.current_price;
  const hasDiscount = !isOnline && premiumPkg.discount_percentage > 0;
  const formatPrice = (price) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price).replace("IDR", "Rp");
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };
  const areaPengembangan = [
    {
      title: "Fokus & Produktivitas",
      color: "bg-gold-500",
      items: [
        "Meningkatkan fokus saat bekerja",
        "Meningkatkan konsentrasi dalam aktivitas",
        "Mengatasi mudah terdistraksi",
        "Meningkatkan produktivitas harian",
        "Konsistensi dalam menyelesaikan pekerjaan"
      ]
    },
    {
      title: "Mental & Keputusan",
      color: "bg-blue-500",
      items: [
        "Kepercayaan diri saat berbicara",
        "Kejelasan dalam mengambil keputusan",
        "Ketegasan dalam bertindak",
        "Kontrol diri dalam situasi sulit",
        "Stabilitas mental dalam tekanan"
      ]
    },
    {
      title: "Performa & Karier",
      color: "bg-purple-500",
      items: [
        "Performa kerja yang stabil",
        "Kemampuan bekerja di bawah tekanan",
        "Pengembangan kapasitas mental",
        "Peningkatan kualitas kerja",
        "Konsistensi performa harian"
      ]
    },
    {
      title: "Emosi & Kontrol Diri",
      color: "bg-orange-500",
      items: [
        "Pengelolaan emosi dalam situasi penting",
        "Stabilitas emosi saat bekerja",
        "Ketenangan saat menghadapi tekanan",
        "Pengendalian reaksi emosional",
        "Respons yang lebih terarah dalam situasi sulit"
      ]
    },
    {
      title: "Diri & Kebiasaan",
      color: "bg-teal-500",
      items: [
        "Disiplin dalam aktivitas harian",
        "Konsistensi dalam kebiasaan positif",
        "Penguatan pola pikir terarah",
        "Penguatan identitas diri",
        "Penguatan kebiasaan produktif"
      ]
    },
    {
      title: "Performa Sosial",
      color: "bg-pink-500",
      items: [
        "Percaya diri saat berbicara di depan umum",
        "Interaksi yang lebih terarah",
        "Komunikasi yang lebih jelas",
        "Kehadiran diri yang lebih kuat",
        "Pengaruh personal dalam lingkungan kerja"
      ]
    }
  ];
  const testimoni = [
    "Saya ingin meningkatkan fokus saat bekerja. Dalam satu sesi Premium, kondisi fokus menjadi lebih stabil dan bisa digunakan kapan pun dibutuhkan.",
    "Saya menggunakan layanan Premium untuk kepercayaan diri saat presentasi. Setelah sesi, kondisi tersebut bisa saya aktifkan langsung saat dibutuhkan.",
    "Saya sering kehilangan arah saat bekerja. Setelah sesi Premium, saya memiliki kondisi mental yang lebih terarah dan bisa digunakan secara konsisten."
  ];
  const processSteps = ["Konsultasi via WhatsApp", "Screening mental", "Login sistem", "Booking jadwal", "Pembayaran"];
  const faqItems = [
    { q: "Apa perbedaan Premium dengan Reguler?", a: "Reguler difokuskan pada penanganan kondisi bermasalah. Premium difokuskan pada pengembangan potensi dan performa." },
    { q: "Apakah layanan ini untuk peningkatan fokus?", a: "Layanan Premium digunakan untuk mengembangkan fokus hingga kondisi optimal." },
    { q: "Apa itu trigger potensi?", a: "Trigger potensi adalah kombinasi gerakan dan kata internal untuk mengaktifkan kondisi optimal secara langsung." },
    { q: "Apakah kondisi optimal bisa digunakan kapan saja?", a: "Trigger digunakan untuk mengakses kondisi tersebut dalam aktivitas sehari-hari." },
    { q: "Bagaimana cara mulai?", a: "Mulai melalui konsultasi WhatsApp untuk proses screening dan penjadwalan." }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsxs(Head, { title: "Hipnoterapi Premium Semarang — Optimalisasi Performa dan Pengembangan Diri | InDepth", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Paket Hipnoterapi Premium InDepth Semarang: program intensif untuk optimalisasi performa, kepercayaan diri, pengembangan diri, dan trauma mendalam. Sesi privat eksklusif dengan terapis senior bersertifikat." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "hipnoterapi premium Semarang, optimalisasi performa, pengembangan diri hipnoterapi, terapi trauma, kepercayaan diri, hipnoterapi intensif, InDepth premium" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Hipnoterapi Premium Semarang — Optimalisasi Performa & Pengembangan Diri | InDepth" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Paket Premium InDepth: hipnoterapi intensif untuk performa optimal, kepercayaan diri, dan pemrosesan trauma mendalam. Eksklusif, privat, dan terstruktur." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "id_ID" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Hipnoterapi Premium Semarang | InDepth" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Hipnoterapi intensif untuk performa optimal, kepercayaan diri, dan trauma mendalam. InDepth Semarang." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Hipnoterapi Premium InDepth",
        "description": "Paket hipnoterapi intensif untuk optimalisasi performa, pengembangan diri, dan pemrosesan trauma mendalam melalui sesi privat eksklusif.",
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
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500 animate-ping" }),
            "Layanan Premium — Direkomendasikan"
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
            "Hipnoterapi Premium Semarang —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600", children: "Optimalisasi Performa dan Pengembangan Diri" })
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
      /* @__PURE__ */ jsx("h3", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight", children: "Layanan Premium InDepth Klinik" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium", children: [
        /* @__PURE__ */ jsx("p", { children: "InDepth Klinik Hipnoterapi Semarang menyediakan layanan Premium untuk membantu Anda mengembangkan potensi diri melalui hipnosis dan trance." }),
        /* @__PURE__ */ jsx("p", { children: "Pendekatan difokuskan pada pemrograman ulang bawah sadar untuk mendukung performa dan kapasitas maksimal internal dalam satu sesi." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Posisi" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "Posisi Layanan Premium" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 font-medium mb-6", children: "Layanan Premium digunakan saat kondisi Anda sudah stabil dan siap dikembangkan." }),
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-4", children: "Pendekatan difokuskan pada:" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            "Mengukur potensi internal dalam skala 1–10",
            "Mengarahkan potensi hingga mencapai titik maksimal (10)",
            "Menetapkan kondisi optimal sebagai standar baru dalam diri Anda"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-200 font-medium", children: item })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.1), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Mekanisme" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "Trigger Potensi" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-4", children: "Mekanisme Peningkatan Potensi" }),
            [
              "Pendekatan InDepth mengakses bawah sadar Anda.",
              "Memprogram ulang sistem internal untuk mencapai performa maksimal.",
              "Mengintegrasikan kondisi optimal ke seluruh sistem tubuh Anda."
            ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3 last:mb-0", children: [
              /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center text-xs font-black shrink-0", children: i + 1 }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm font-medium", children: item })
            ] }, i))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-gold-500/10 to-yellow-500/5 dark:from-gold-500/20 dark:to-yellow-500/10 border border-gold-500/30 rounded-[2rem] p-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-4", children: "Setelah kondisi optimal tercapai" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
              { label: "Trigger Potensi", desc: "Gerakan sederhana sebagai pemicu" },
              { label: "Kata Internal", desc: "Kata internal sebagai penguat" },
              { label: "Aktivasi", desc: "Aktivasi kondisi optimal secara langsung" }
            ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs font-black shrink-0", children: "✦" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white text-sm", children: item.label }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-xs mt-0.5", children: item.desc })
              ] })
            ] }, i)) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-gold-700 dark:text-gold-300 italic font-medium", children: "Trigger ini memungkinkan Anda mengakses kondisi performa maksimal kapan pun dibutuhkan dalam aktivitas sehari-hari." })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Target" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Hasil yang Dituju" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: [
        { icon: "🎯", text: "Fokus berada pada kondisi optimal saat dibutuhkan" },
        { icon: "⚡", text: "Keputusan diambil dengan lebih jelas dan tegas" },
        { icon: "🛡️", text: "Kontrol diri berjalan stabil dalam berbagai situasi" },
        { icon: "📈", text: "Performa kerja berjalan sesuai kapasitas maksimal" },
        { icon: "🔑", text: "Akses kondisi optimal dapat digunakan secara mandiri" }
      ].map((item, i) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(i * 0.07),
          className: "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[1.5rem] p-5 flex items-start gap-4 shadow-sm hover:-translate-y-1 transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: item.icon }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-200 font-medium text-sm leading-relaxed", children: item.text })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Contoh Kondisi" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Contoh Kondisi yang Dikembangkan" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-500 dark:text-gray-400", children: "Layanan Premium digunakan untuk:" })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0.1), className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
        "Fokus kerja",
        "Kepercayaan diri saat presentasi",
        "Ketenangan dalam tekanan",
        "Kejelasan berpikir dalam keputusan",
        "Konsistensi dalam aktivitas",
        "Stabilitas performa dalam pekerjaan"
      ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3 bg-white/60 dark:bg-gray-800/40 rounded-2xl border border-white/50 dark:border-gray-700/40", children: [
        /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white flex items-center justify-center text-xs font-black shrink-0", children: "✦" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-200 text-sm font-medium", children: item })
      ] }, i)) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Cakupan" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "30 Area Pengembangan Diri" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: areaPengembangan.map((group, gi) => {
        const startNum = gi * 5 + 1;
        return /* @__PURE__ */ jsxs(
          motion.div,
          {
            ...fadeUp(gi * 0.08),
            className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
            children: [
              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-xl ${group.color} flex items-center justify-center mb-4`, children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
              /* @__PURE__ */ jsx("h4", { className: "font-black text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-4", children: group.title }),
              /* @__PURE__ */ jsx("ol", { className: "space-y-2", children: group.items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-xs font-medium", children: [
                /* @__PURE__ */ jsx("span", { className: `w-4 h-4 rounded-full ${group.color} text-white flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5`, children: startNum + i }),
                item
              ] }, i)) })
            ]
          },
          gi
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "Biaya" }),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white mb-6", children: "Durasi dan Investasi" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx(SessionModeToggle, { mode: sessionMode, onChange: setSessionMode }) }),
      isOnline && /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-600 dark:text-blue-400 font-medium text-center mb-6", children: "Sesi online via video call — harga tanpa diskon" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/50 rounded-[2.5rem] p-10 shadow-2xl hover:shadow-[0_20px_40px_rgba(208,170,33,0.15)] transition-all duration-500 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Durasi" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "±2 jam" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-500 font-medium mt-1", children: [
              "1 sesi ",
              isOnline ? "(online)" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Investasi" }),
            hasDiscount && /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-400 line-through decoration-rose-500/50 decoration-2 mb-1", children: formatPrice(premiumPkg.base_price) }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-500", children: formatPrice(displayPrice || premiumPkg.base_price) }),
            hasDiscount && premiumPkg.discount_ends_at && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 mt-2 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-500/20", children: [
              "Diskon ",
              premiumPkg.discount_percentage,
              "% hingga ",
              formatDate(premiumPkg.discount_ends_at)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 font-medium", children: "*Harga belum termasuk PPN 11%" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
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
            /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500" }),
              "Sesi Premium"
            ] }) })
          ]
        },
        i
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
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
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "FAQ" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "FAQ Hipnoterapi Premium" })
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
      /* @__PURE__ */ jsx("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/30 rounded-[3rem] p-12 shadow-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block mb-6 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest", children: "Layanan Premium" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 leading-relaxed", children: "Potensi dalam diri Anda dapat diarahkan hingga mencapai kondisi optimal." }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed", children: "InDepth membantu Anda memprogramnya secara terarah dalam satu sesi." }),
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
  LayananPremium as default
};
