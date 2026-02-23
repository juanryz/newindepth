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
function Terms({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "Syarat dan Ketentuan | InDepth Mental Wellness" }),
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
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase", children: "Syarat dan Ketentuan" }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm", children: "InDepth Mental Wellness" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "1. Pendahuluan" }),
              /* @__PURE__ */ jsx("p", { children: "Selamat datang di InDepth Mental Wellness. Syarat dan Ketentuan ini mengatur penggunaan Anda terhadap website dan layanan kami. Dengan mengakses atau menggunakan website kami, Anda menyetujui untuk terikat dengan ketentuan-ketentuan ini." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "2. Penggunaan Layanan" }),
              /* @__PURE__ */ jsx("p", { children: "Layanan kami, termasuk sesi hipnoterapi dan konseling, diperuntukkan bagi mereka yang ingin melakukan perubahan positif secara mandiri. Kami tidak menyediakan layanan medis gawat darurat atau penanganan kejiwaan akut secara online atau tanpa pendampingan pihak terkait bila diperlukan." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 mt-2 text-sm", children: [
                /* @__PURE__ */ jsx("li", { children: "Anda bertanggung jawab atas keakuratan informasi yang diberikan selama pendaftaran dan sesi terapi." }),
                /* @__PURE__ */ jsx("li", { children: "Layanan yang kami berikan bersifat bantuan, pengembangan diri, dan terapeutik non-medis, dan pasien diharapkan aktif berpartisipasi dalam proses tersebut." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { id: "non-refund", className: "scroll-mt-32", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "3. Pembayaran dan Kebijakan Non-Refund" }),
              /* @__PURE__ */ jsx("p", { children: "Pembayaran untuk setiap layanan harus diselesaikan sebelum sesi dilakukan. Kami menerapkan kebijakan non-refund dan pembatalan untuk memastikan kualitas pelayanan bagi seluruh klien." }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-2 mt-2 text-sm", children: [
                /* @__PURE__ */ jsx("li", { children: "Pembatalan atau perubahan jadwal harus dilakukan sekurang-kurangnya 24 jam sebelum sesi yang telah dijadwalkan." }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "Pembayaran bersifat ",
                  /* @__PURE__ */ jsx("strong", { children: "FINAL dan TIDAK DAPAT DIKEMBALIKAN (Non-Refundable)" }),
                  ". Pembatalan kurang dari batas waktu tersebut atau ketidakhadiran (No-Show) pada sesi tanpa pemberitahuan sebelumnya, tidak akan mendapatkan pengembalian biaya yang telah dibayarkan / hangus."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "4. Hak Kekayaan Intelektual" }),
              /* @__PURE__ */ jsx("p", { children: "Segala konten dalam website ini, termasuk namun tidak terbatas pada teks, gambar, grafik, logo, dan perangkat lunak, adalah properti milik InDepth Mental Wellness atau dilisensikan kepada kami, dan dilindungi oleh undang-undang hak cipta." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4", children: "5. Perubahan Ketentuan" }),
              /* @__PURE__ */ jsx("p", { children: "Kami berhak untuk memperbarui, mengubah, atau mengganti setiap bagian dari Syarat dan Ketentuan ini dengan memposting pembaruan di website kami. Tanggung jawab Anda untuk memeriksa halaman ini secara berkala untuk melihat perubahan." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-center pt-8 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: "Dengan terus menggunakan layanan ini setelah perubahan diposting, maka Anda menyetujui perubahan tersebut." }) })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Terms as default
};
