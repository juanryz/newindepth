import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { N as Navbar } from "./Navbar-Bwc0UBuH.js";
import { F as Footer } from "./Footer-CbNJmqB7.js";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function Privacy({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "Kebijakan Privasi | InDepth Mental Wellness" }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/60 dark:border-gray-700/50 rounded-[3rem] p-8 md:p-16 shadow-2xl relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-8 left-8 md:top-12 md:left-12", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/",
              className: "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold-500 transition-colors group",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                "Kembali"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("header", { className: "mb-12 text-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase", children: "Kebijakan Privasi" }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm", children: "InDepth Mental Wellness" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "1. Pengumpulan Data Pribadi" }),
              /* @__PURE__ */ jsx("p", { children: "Kami mengumpulkan data pribadi yang Anda berikan secara langsung saat Anda mendaftar, menggunakan layanan, atau berkomunikasi dengan kami. Data ini dapat mencakup nama, alamat email, nomor telepon, dan informasi relevan lainnya." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "2. Penggunaan Data" }),
              /* @__PURE__ */ jsx("p", { children: "Data pribadi Anda digunakan untuk:" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 mt-2 text-sm", children: [
                /* @__PURE__ */ jsx("li", { children: "Menyediakan, memelihara, dan meningkatkan layanan kami." }),
                /* @__PURE__ */ jsx("li", { children: "Memproses transaksi dan mengirimkan pemberitahuan terkait." }),
                /* @__PURE__ */ jsx("li", { children: "Berkomunikasi dengan Anda mengenai layanan, promosi, dan pembaruan." }),
                /* @__PURE__ */ jsx("li", { children: "Memastikan keamanan dan mencegah aktivitas penipuan." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "3. Keamanan Data" }),
              /* @__PURE__ */ jsx("p", { children: "Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "4. Berbagi Data dengan Pihak Ketiga" }),
              /* @__PURE__ */ jsx("p", { children: "Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Kami hanya membagikan data Anda dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan layanan kami, selalu dalam kepatuhan komitmen kerahasiaan." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "5. Hak Privasi Anda" }),
              /* @__PURE__ */ jsx("p", { children: "Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi yang kami miliki tentang Anda. Silakan hubungi kami untuk menggunakan hak-hak ini." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "6. Perubahan Kebijakan Privasi" }),
              /* @__PURE__ */ jsx("p", { children: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda mengenai perubahan apa pun dengan memposting Kebijakan Privasi yang baru di halaman ini." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-center pt-8 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami." }) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Privacy as default
};
