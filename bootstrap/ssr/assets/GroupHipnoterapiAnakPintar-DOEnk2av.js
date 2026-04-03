import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
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
const WA_LINK = "https://wa.me/6282220800034?text=Halo%20InDepth%2C%20saya%20ingin%20mendaftar%20Group%20Hipnoterapi%20Anak%20Pintar.%0A%0AFormat%20Pendaftaran%3A%0AANAK_NAMA_USIA_SEKOLAH";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay }
});
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-green-500 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) });
const DotIcon = ({ color = "bg-blue-500" }) => /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${color} mt-1.5 shrink-0` });
function GroupHipnoterapiAnakPintar({ auth }) {
  const faqItems = [
    { q: "Apa itu group hipnoterapi anak?", a: "Program berbasis hipnoterapi untuk meningkatkan fokus dan kemampuan belajar siswa." },
    { q: "Apakah program ini cocok untuk semua siswa?", a: "Program ini terbuka untuk siswa SD (mulai kelas 4), SMP, dan SMA sesuai kriteria." },
    { q: "Apakah aman untuk anak?", a: "Program dilakukan dalam sistem terstruktur dan profesional." },
    { q: "Apakah membantu meningkatkan prestasi?", a: "Program membantu meningkatkan kemampuan belajar yang berdampak pada performa akademik." },
    { q: "Bagaimana cara mendaftar?", a: "Melalui WhatsApp dengan format pendaftaran yang telah ditentukan." }
  ];
  const processSteps = [
    "Akses Fokus Internal - Membantu siswa mencapai kondisi fokus yang stabil",
    "Pelepasan Hambatan Belajar - Mengurangi hambatan yang mengganggu konsentrasi",
    "Penguatan Sistem Belajar - Melatih daya ingat, pemahaman materi, kecepatan belajar",
    "Pengkondisian Performa Akademik - Mempersiapkan siswa menghadapi pembelajaran dan ujian"
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(PageLoader, {}),
    /* @__PURE__ */ jsxs(Head, { title: "Group Hipnoterapi Anak | Program Fokus & Belajar Siswa", children: [
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Group hipnoterapi anak untuk meningkatkan fokus, daya ingat, dan kemampuan belajar siswa SD, SMP, SMA melalui sesi intensif 2 jam di InDepth Clinic." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "group hipnoterapi anak, hipnoterapi anak pintar, meningkatkan fokus anak, konsentrasi belajar, InDepth Clinic" }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Group Hipnoterapi Anak | Program Fokus & Belajar Siswa" }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Group hipnoterapi anak untuk meningkatkan fokus, daya ingat, dan kemampuan belajar siswa SD, SMP, SMA melalui sesi intensif 2 jam di InDepth Clinic." }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "id_ID" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: "Group Hipnoterapi Anak | Program Fokus & Belajar Siswa" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: "Group hipnoterapi anak untuk meningkatkan fokus, daya ingat, dan kemampuan belajar siswa SD, SMP, SMA." }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: "/images/og-dark.jpg" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: typeof window !== "undefined" ? window.location.href : "" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Group Hipnoterapi Aku Anak Pintar",
        "description": "Program Peningkatan Fokus dan Kemampuan Belajar Anak melalui sesi intensif di InDepth Clinic.",
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
        "offers": {
          "@type": "Offer",
          "price": "1000000",
          "priceCurrency": "IDR"
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
          className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest",
          children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-ping" }),
            "Program Khusus"
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
            "Group Hipnoterapi Aku Anak Pintar ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-gold-500 text-3xl md:text-5xl mt-2 block", children: "Program Peningkatan Fokus dan Kemampuan Belajar Anak" })
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
                  "Daftarkan Anak Anda Sekarang"
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: "detail", className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight", children: "1. Program Peningkatan Fokus dan Kemampuan Belajar Anak" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium", children: [
        /* @__PURE__ */ jsx("p", { children: "Group Hipnoterapi Aku Anak Pintar merupakan program intensif untuk membantu siswa meningkatkan kemampuan belajar secara terarah." }),
        /* @__PURE__ */ jsx("p", { children: "Program ini membantu siswa:" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 mt-4 ml-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            " Meningkatkan fokus belajar"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            " Meningkatkan konsentrasi"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            " Menguatkan daya ingat"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            " Mempercepat pemahaman materi"
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(0),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6", children: "2. Tantangan yang Dialami Anak dalam Proses Belajar" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "Banyak anak mengalami hambatan seperti:" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-2.5", children: [
              "Fokus belajar yang tidak stabil",
              "Kesulitan memahami pelajaran",
              "Ketegangan saat belajar atau ujian",
              "Performa belajar yang tidak konsisten",
              "Tekanan akademik dan lingkungan"
            ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(DotIcon, { color: "bg-red-500" }),
              item
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-bold", children: "👉 Kondisi ini berdampak langsung pada hasil belajar siswa." }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          ...fadeUp(0.1),
          className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(208,170,33,0.08)] transition-all duration-500 relative overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6", children: "3. Untuk Siapa Program Ini?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4", children: "Program ini terbuka untuk:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 mb-6", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium", children: [
                /* @__PURE__ */ jsx(DotIcon, { color: "bg-blue-500" }),
                " Siswa SD (mulai kelas 4)"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium", children: [
                /* @__PURE__ */ jsx(DotIcon, { color: "bg-blue-500" }),
                " Siswa SMP (semua kelas)"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium", children: [
                /* @__PURE__ */ jsx(DotIcon, { color: "bg-blue-500" }),
                " Siswa SMA (semua kelas)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-4 font-bold", children: "👉 Peserta dikelompokkan berdasarkan jenjang:" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-500/20", children: "Group SD" }),
              /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold border border-purple-500/20", children: "Group SMP" }),
              /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-sm font-bold border border-orange-500/20", children: "Group SMA" })
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-center", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-8 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest mb-4", children: "4. Format" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white mb-2", children: "Durasi: ±2 jam intensif" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300", children: "Metode: Group hipnoterapi" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mt-2", children: "📍 Lokasi: InDepth Clinic" })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.1), className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-gold-500/30 rounded-[2rem] p-8 shadow-xl transform md:-translate-y-4 relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-16 h-16 bg-gold-400/20 rounded-bl-full pointer-events-none" }),
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-4", children: "7. Biaya Program" }),
        /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Rp 1.000.000" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mt-1", children: "/ peserta" })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.2), className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2rem] p-8 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest mb-4", children: "8. Jadwal" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm mb-4", children: "👉 Jadwal disusun berdasarkan kelompok usia dan ketersediaan sesi." }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: "Cek InDepth Official Website." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-16 items-start", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "5. Proses Selama Sesi" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6", children: "Peserta akan melalui proses terstruktur:" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: processSteps.map((item, i) => {
          const parts = item.split(" - ");
          return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[1.5rem] p-5 shadow-sm", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-black text-white text-sm shrink-0", children: i + 1 }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: parts[0] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm mt-1", children: parts[1] })
            ] })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0.1), children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-900 dark:text-white mb-8", children: "6. Indikator Hasil" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-300 mb-6", children: "Perubahan dapat diamati melalui:" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[2.5rem] p-8 shadow-xl", children: [
          /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: [
            "Fokus belajar lebih stabil",
            "Kemampuan memahami materi meningkat",
            "Daya ingat lebih kuat",
            "Konsentrasi meningkat",
            "Performa belajar lebih konsisten"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-700 dark:text-gray-200 font-medium", children: [
            /* @__PURE__ */ jsx(CheckIcon, {}),
            item
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white mb-4", children: "9. Syarat & Ketentuan" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx(DotIcon, {}),
                " Memiliki kemampuan komunikasi dua arah"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx(DotIcon, {}),
                " Mengikuti program dengan kemauan sendiri"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx(DotIcon, {}),
                " Mengikuti sesi tanpa pendamping"
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm", children: [
                /* @__PURE__ */ jsx(DotIcon, {}),
                " Untuk SD direkomendasikan mulai kelas 4"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "py-20 relative z-10 bg-white/30 dark:bg-gray-900/20 backdrop-blur-md border-y border-white/50 dark:border-gray-800/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4", children: "11. Mengapa Program Ini Efektif?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium", children: "Program ini menggunakan pendekatan terstruktur untuk membantu siswa meningkatkan kemampuan belajar secara lebih terarah dan stabil." })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "py-24 relative z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-500/5 blur-[120px] pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10", children: /* @__PURE__ */ jsx(motion.div, { ...fadeUp(0), children: /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-12 shadow-2xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest mb-4", children: "10. Cara Mendaftar" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4", children: "12. Penutup & Pendaftaran" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed", children: "Dalam waktu 2 jam, siswa mendapatkan proses intensif untuk meningkatkan fokus, daya ingat, dan kesiapan belajar." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 mb-8 text-left inline-block w-full border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-2", children: "🔹 Format Pendaftaran" }),
          /* @__PURE__ */ jsx("code", { className: "bg-gray-200 dark:bg-gray-900 px-3 py-2 rounded text-sm text-blue-600 dark:text-blue-400 block mb-4", children: "ANAK_NAMA_USIA_SEKOLAH" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Contoh:" }),
          /* @__PURE__ */ jsx("code", { className: "bg-gray-200 dark:bg-gray-900 px-3 py-2 rounded text-sm text-blue-600 dark:text-blue-400 block", children: "ANAK_BUDI_15_SMA" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-4 italic", children: "👉 Tim InDepth akan menindaklanjuti sesuai data yang masuk." })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: WA_LINK,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-base shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transition-all duration-300 border border-green-400/40",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
              "Daftarkan Anak Anda Sekarang"
            ]
          }
        )
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-24 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(motion.div, { ...fadeUp(0), className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-gold-600 dark:text-gold-400 tracking-wide uppercase mb-2", children: "FAQ" }),
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "Pertanyaan yang Sering Diajukan" })
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
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsx(DisclaimerSection, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  GroupHipnoterapiAnakPintar as default
};
