import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { N as Navbar } from "./Navbar-C7jbj_uy.js";
import { F as Footer } from "./Footer-DPk9gTe0.js";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function Disclaimer({ auth }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(Head, { title: "Disclaimer Resmi | InDepth Mental Wellness" }),
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
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase", children: "Disclaimer Resmi" }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 w-24 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6" }),
            /* @__PURE__ */ jsx("p", { className: "text-gold-600 dark:text-gold-400 font-bold tracking-widest uppercase text-sm", children: "InDepth Mental Wellness" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg", children: [
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "1" }),
                "STATUS LAYANAN"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-4", children: "InDepth Mental Wellness adalah penyedia layanan hipnoterapi profesional berbasis pendekatan psikologis dan pengembangan diri." }),
              /* @__PURE__ */ jsxs("div", { className: "p-5 bg-gold-500/5 rounded-2xl border border-gold-500/10", children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-3", children: "Layanan yang diberikan:" }),
                /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm", children: ["Bukan layanan medis", "Bukan pengganti diagnosis dokter", "Bukan pengganti pengobatan medis", "Bukan layanan psikiatri"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }),
                  item
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm italic font-medium", children: "Segala tindakan medis darurat harus dilakukan oleh fasilitas kesehatan resmi." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "2" }),
                "BATASAN TANGGUNG JAWAB"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-4", children: "InDepth Mental Wellness tidak bertanggung jawab atas:" }),
              /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-6 ml-4", children: ["Kondisi medis murni yang terjadi tanpa unsur kelalaian", "Serangan jantung mendadak", "Gangguan saraf spontan", "Reaksi tubuh yang tidak diungkapkan sebelumnya oleh klien", "Risiko akibat penyembunyian informasi kesehatan"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gold-500", children: "•" }),
                item
              ] }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "text-sm border-l-4 border-gold-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-xl", children: "Jika terdapat kelalaian yang terbukti secara hukum dari pihak InDepth, maka tanggung jawab maksimal terbatas pada nilai biaya layanan sesi tersebut." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "3" }),
                "HASIL TERAPI"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Setiap individu memiliki kondisi psikologis, biologis, dan keyakinan yang berbeda. Oleh karena itu:" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["Tidak ada jaminan hasil instan", "Tidak ada jaminan kesembuhan absolut", "Hasil terapi bersifat individual"].map((item, i) => /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl text-center text-sm font-bold border border-white/20", children: item }, i)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-bold text-red-600 dark:text-red-400 underline decoration-2 underline-offset-4 uppercase tracking-wider", children: "Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "4" }),
                "SISTEM DOKUMENTASI DAN TRANSPARANSI"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-4", children: [
                /* @__PURE__ */ jsx("p", { children: "Seluruh sesi hipnoterapi:" }),
                /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: ["Direkam audio dan video", "Disimpan untuk perlindungan hukum", "Visual dapat ditampilkan di ruang tunggu tanpa audio"].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gold-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" }) }),
                  item
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
                "Rekaman hanya dibuka atas permintaan resmi pihak berwenang. Setelah masa simpan tertentu, rekaman dapat dianonimkan untuk kepentingan akademik. ",
                /* @__PURE__ */ jsx("strong", { children: "Dengan mengikuti layanan, klien dianggap telah memahami dan menyetujui sistem dokumentasi ini." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "5" }),
                "KEADAAN DARURAT MEDIS"
              ] }),
              /* @__PURE__ */ jsx("p", { children: "Apabila terjadi kondisi darurat medis: Sesi dihentikan, bantuan medis segera dipanggil, dan rekaman tidak dihentikan sampai klien meninggalkan ruangan." }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-bold bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300", children: "Jika terjadi kematian akibat kondisi medis murni tanpa unsur kelalaian atau kekerasan, maka kedua pihak sepakat untuk tidak saling menuntut." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "6" }),
                "NO-SHOW DAN PEMBATALAN"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsx("p", { children: "• Sesi berdurasi 2 jam (termasuk buffer 30 menit)." }),
                /* @__PURE__ */ jsx("p", { children: "• Jika klien tidak hadir dalam 1 jam sejak jadwal dimulai, sesi dianggap berjalan." }),
                /* @__PURE__ */ jsx("p", { className: "font-bold text-red-600", children: "• Tidak ada refund untuk No-Show." }),
                /* @__PURE__ */ jsx("p", { children: "• Pembatalan maksimal 24 jam sebelum jadwal." }),
                /* @__PURE__ */ jsx("p", { children: "• Pembatalan di luar ketentuan tidak dapat direfund." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "7" }),
                "KEWAJIBAN KLIEN"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Klien wajib:" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-6 space-y-1 text-sm", children: [
                /* @__PURE__ */ jsx("li", { children: "Memberikan data yang benar" }),
                /* @__PURE__ */ jsx("li", { children: "Mengungkap kondisi kesehatan yang relevan" }),
                /* @__PURE__ */ jsx("li", { children: "Tidak berada di bawah pengaruh alkohol atau narkotika" }),
                /* @__PURE__ */ jsx("li", { children: "Mengikuti instruksi profesional hipnoterapis" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm italic font-bold", children: "Pelanggaran dapat menyebabkan sesi dihentikan tanpa pengembalian dana." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 flex items-center justify-center font-black", children: "8" }),
                "BATAS USIA"
              ] }),
              /* @__PURE__ */ jsx("p", { children: "Usia dewasa hukum untuk mengikuti layanan secara mandiri adalah 21 tahun. Klien di bawah usia tersebut wajib didampingi dan mendapat persetujuan orang tua atau wali sah." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-3", children: "9. FORCE MAJEURE" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "InDepth tidak bertanggung jawab atas gangguan akibat bencana alam, gangguan listrik/jaringan, kebijakan pemerintah, kerusuhan, atau kondisi darurat di luar kendali manusia. Sesi dapat dijadwalkan ulang tanpa penalti." })
              ] }),
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white mb-3", children: "10. KERAHASIAAN" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Seluruh informasi klien dijaga kerahasiaannya. Klien dilarang menyebarkan tuduhan tanpa dasar hukum tetap atau menyebarkan potongan rekaman tanpa izin tertulis." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "bg-gray-900 dark:bg-black text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-bl-full pointer-events-none" }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black mb-6 uppercase tracking-tighter", children: "Persetujuan Akhir" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-sm md:text-base opacity-90", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-gold-400 mb-2", children: "11. PERSETUJUAN ELEKTRONIK" }),
                  /* @__PURE__ */ jsx("p", { children: "Dengan menggunakan website, melakukan booking, atau mengikuti sesi, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh isi disclaimer ini tanpa keberatan. Persetujuan elektronik tunduk pada UU ITE dan memiliki kekuatan hukum yang sah." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-gold-400 mb-2", children: "12. DOMISILI HUKUM" }),
                  /* @__PURE__ */ jsx("p", { children: "Segala sengketa diselesaikan melalui musyawarah. Apabila tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri Semarang." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center pt-8 border-t border-gray-100 dark:border-gray-800", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white mb-4 italic", children: "Pernyataan Profesional" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto", children: "Kami berkomitmen memberikan layanan terbaik dalam batas kewenangan profesional hipnoterapi dengan standar dokumentasi transparan dan prosedur keselamatan yang ketat." }),
              /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxs(
                Link,
                {
                  href: auth.user ? route("dashboard") : route("register"),
                  className: "inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-black rounded-full transition-all shadow-lg shadow-gold-600/20 active:scale-95 uppercase tracking-widest text-xs",
                  children: [
                    "Mulai Perjalanan Anda",
                    /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
                  ]
                }
              ) })
            ] })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Disclaimer as default
};
