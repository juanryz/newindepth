import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BhWsY9sM.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-BfaDD_kK.js";
import "framer-motion";
function Agreement({ userModel }) {
  let agreementData = null;
  if (typeof userModel.agreement_data === "string") {
    try {
      agreementData = JSON.parse(userModel.agreement_data);
    } catch (e) {
    }
  } else if (userModel.agreement_data) {
    agreementData = userModel.agreement_data;
  }
  if (!agreementData && userModel.agreement_signed_at) {
    agreementData = {
      cond_data_benar: true,
      cond_bukan_pengganti_medis: true,
      cond_sadar_penuh: true,
      cond_riwayat_penyakit: true,
      status_medis: "Tidak (Data Legacy)",
      risk_hubungi_medis: true,
      risk_henti_sesi: true,
      doc_direkam: true,
      doc_hukum: true,
      konfirmasi_akhir: true
    };
  }
  const signedAt = userModel.agreement_signed_at ? new Date(userModel.agreement_signed_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : null;
  const CheckRow = ({ label, checked }) => /* @__PURE__ */ jsxs("div", { className: `flex items-start gap-3 p-3 rounded-xl border text-sm ${checked ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800" : "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}`, children: [
    /* @__PURE__ */ jsx("span", { className: `mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${checked ? "bg-green-500 text-white" : "bg-gray-300 text-white"}`, children: checked ? "✓" : "×" }),
    /* @__PURE__ */ jsx("span", { className: checked ? "text-gray-800 dark:text-gray-200" : "text-gray-400 line-through", children: label })
  ] });
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Detail Dokumen Persetujuan" }), children: [
    /* @__PURE__ */ jsx(Head, { title: `Dokumen Persetujuan — ${userModel.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-indigo-700 text-white p-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2", children: "DOKUMEN 1 DARI 3" }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight", children: "Form Pernyataan Awal & Persetujuan Layanan" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pb-6 border-b border-gray-100 dark:border-gray-700", children: [["Nama", userModel.name], ["Email", userModel.email], ["Telepon", userModel.phone || "-"], ["Tgl TTD", signedAt || "-"]].map(([l, v]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: l }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 dark:text-white", children: v })
          ] }, l)) }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "1" }),
              "Pernyataan Kondisi"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(CheckRow, { label: "Data yang diisi pada tahap screening adalah benar dan sesuai kondisi saat ini.", checked: agreementData?.cond_data_benar }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Layanan hipnoterapi bukan pengganti pengobatan medis/psikiatri darurat.", checked: agreementData?.cond_bukan_pengganti_medis }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Dalam kondisi sadar penuh dan tidak di bawah pengaruh alkohol/zat terlarang.", checked: agreementData?.cond_sadar_penuh }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Riwayat penyakit jantung/saraf berat telah dipertimbangkan.", checked: agreementData?.cond_riwayat_penyakit })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "2" }),
              "Risiko & Dokumentasi"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(CheckRow, { label: "Izin menghubungi layanan medis darurat jika diperlukan.", checked: agreementData?.risk_hubungi_medis }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Persetujuan penghentian sesi demi keselamatan.", checked: agreementData?.risk_henti_sesi }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Persetujuan sistem dokumentasi rekaman audio-visual InDepth.", checked: agreementData?.doc_direkam }),
              /* @__PURE__ */ jsx(CheckRow, { label: "Persetujuan pembukaan rekaman hanya untuk keperluan hukum.", checked: agreementData?.doc_hukum })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 dark:border-gray-700 pt-8 flex flex-col items-end", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3", children: "Tanda Tangan Pernyataan Awal" }),
            agreementData?.signature_1 ? /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3", children: /* @__PURE__ */ jsx("img", { src: agreementData.signature_1, alt: "Signature 1", className: "h-20 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" }) }) : userModel.digital_signature ? /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3", children: /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Legacy Signature", className: "h-20 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" }) }) : /* @__PURE__ */ jsx("div", { className: "h-20 w-48 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-[10px] text-gray-400 uppercase italic", children: "Belum TTD" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900", children: userModel.name })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-emerald-700 text-white p-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2", children: "DOKUMEN 2 DARI 3" }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight", children: "Surat Perjanjian Layanan Hipnoterapi" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8 font-serif text-sm leading-relaxed text-gray-700 dark:text-gray-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 not-serif", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white underline", children: "SURAT PERJANJIAN LAYANAN" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
              "Nomor: ID/",
              userModel.id,
              "/",
              userModel.agreement_signed_at ? new Date(userModel.agreement_signed_at).getTime() : "N/A"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mb-4 font-bold", children: "PASAL 1 - IDENTITAS KLIEN" }),
          /* @__PURE__ */ jsx("table", { className: "w-full mb-6 text-xs", children: /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "w-1/3 py-1 font-bold", children: "Nama Lengkap" }),
              /* @__PURE__ */ jsxs("td", { className: "w-2/3 py-1", children: [
                ": ",
                userModel.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1 font-bold", children: "Usia" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                userModel.age || "-",
                " Tahun"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1 font-bold", children: "Jenis Kelamin" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                userModel.gender || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1 font-bold", children: "Nomor Handphone" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                userModel.phone || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1 font-bold", children: "Email" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                userModel.email
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di InDepth Mental Wellness." }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 2 - BATAS USIA DAN WALI" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Usia dewasa hukum untuk menandatangani perjanjian ini adalah 21 (dua puluh satu) tahun." }),
                /* @__PURE__ */ jsx("li", { children: "Klien di bawah 21 tahun wajib didampingi dan memperoleh persetujuan tertulis dari orang tua atau wali sah." }),
                /* @__PURE__ */ jsx("li", { children: "Jika klien menyatakan telah mendapat izin wali namun datang sendiri, maka seluruh konsekuensi hukum atas pernyataan tersebut menjadi tanggung jawab klien dan walinya." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 3 - PERNYATAAN KESEHATAN DAN KEJUJURAN DATA" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Klien menyatakan seluruh data yang diberikan adalah benar." }),
                /* @__PURE__ */ jsx("li", { children: "Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan." }),
                /* @__PURE__ */ jsx("li", { children: "Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 4 - SISTEM DOKUMENTASI DAN TRANSPARANSI" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Seluruh sesi direkam audio dan video secara penuh." }),
                /* @__PURE__ */ jsx("li", { children: "Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi." }),
                /* @__PURE__ */ jsx("li", { children: "Rekaman hanya dibuka atas permintaan resmi aparat penegak hukum atau pengadilan." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 5 - KEADAAN DARURAT MEDIS" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Jika terjadi kondisi darurat medis pada klien, sesi dihentikan dan bantuan medis dipanggil." }),
                /* @__PURE__ */ jsx("li", { children: "Rekaman tidak boleh dihentikan sampai klien meninggalkan ruangan bersama fasilitas kesehatan." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 7 - NO-SHOW DAN PEMBATALAN" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Setiap sesi berdurasi 2 jam, termasuk buffer 30 menit." }),
                /* @__PURE__ */ jsx("li", { children: "Jika klien tidak hadir dalam 30 menit sejak jadwal dimulai, sesi dianggap sudah selesai dilaksanakan." }),
                /* @__PURE__ */ jsx("li", { children: "Tidak ada refund atas keterlambatan atau No-Show." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 8 - NON-REFUND DAN HASIL TERAPI" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Hasil hipnoterapi bersifat individual dan tidak dapat dijamin secara absolut." }),
                /* @__PURE__ */ jsx("li", { children: "Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: "PASAL 11 - KERAHASIAAN DAN LARANGAN PENCEMARAN NAMA BAIK" }),
              /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 space-y-1 text-xs", children: [
                /* @__PURE__ */ jsx("li", { children: "Seluruh informasi sesi bersifat rahasia." }),
                /* @__PURE__ */ jsx("li", { children: "Klien dilarang menyebarkan informasi atau tuduhan tanpa putusan hukum tetap." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold mb-1 uppercase", children: "PASAL 14 - PERSETUJUAN AKHIR" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 not-serif", children: [
                /* @__PURE__ */ jsx(CheckRow, { label: "Klien menyatakan seluruh data benar dan lengkap.", checked: agreementData?.agree_1 }),
                /* @__PURE__ */ jsx(CheckRow, { label: "Klien telah membaca dan memahami seluruh isi perjanjian (Pasal 1-13).", checked: agreementData?.agree_2 }),
                /* @__PURE__ */ jsx(CheckRow, { label: "Klien menyetujui seluruh ketentuan tanpa keberatan.", checked: agreementData?.agree_3 })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "italic text-[10px] opacity-70 mt-4", children: "*Isi lengkap dokumen ini mencakup 13 Pasal lainnya termasuk Force Majeure, Pembatasan Tanggung Jawab, dan Penyelesaian Sengketa yang telah disetujui secara elektronik." }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-start", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: "Pihak Pertama (Klien)" }),
              userModel.digital_signature ? /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3", children: /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Main Signature", className: "h-24 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" }) }) : /* @__PURE__ */ jsx("div", { className: "h-24 w-48 border border-dashed border-gray-300 rounded-xl mb-3" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900", children: userModel.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:items-end", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4", children: "Pihak Kedua (InDepth)" }),
              /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsx("img", { src: "/images/saiful-anam-signature.jpeg", alt: "Saiful Anam", className: "h-24 object-contain mix-blend-multiply dark:invert" }) }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900", children: "Saiful Anam" }),
              /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 uppercase mt-1", children: "Direktur Utama InDepth" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-amber-600 text-white p-8 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-amber-200 text-[10px] font-black uppercase tracking-[0.2em] mb-2", children: "DOKUMEN 3 DARI 3" }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight", children: "Kebijakan & Perjanjian Tambahan" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-6", children: [
          /* @__PURE__ */ jsx(CheckRow, { label: "Kebijakan Privasi (Persetujuan pengelolaan data pribadi)", checked: agreementData?.privacy_policy || !!agreementData && !agreementData.hasOwnProperty("privacy_policy") }),
          /* @__PURE__ */ jsx(CheckRow, { label: "Kebijakan Non-Refund (Seluruh pembayaran bersifat final)", checked: agreementData?.refund_policy || !!agreementData && !agreementData.hasOwnProperty("refund_policy") }),
          /* @__PURE__ */ jsx(CheckRow, { label: "Perjanjian Afiliasi (Syarat komisi dan rujukan)", checked: agreementData?.affiliate_agreement || !!agreementData && !agreementData.hasOwnProperty("affiliate_agreement") }),
          /* @__PURE__ */ jsx(CheckRow, { label: "Perjanjian Produk Digital & Kelas (Hak akses e-learning)", checked: agreementData?.course_agreement || !!agreementData && !agreementData.hasOwnProperty("course_agreement") }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex flex-col sm:flex-row justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
              "Status: Disetujui secara elektronik"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Waktu Persetujuan: ",
              signedAt || "Belum Disetujui"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center pt-4 print:hidden", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.print(), className: "inline-flex items-center gap-3 px-10 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 dark:hover:bg-gold-500 transition-all shadow-xl active:scale-95", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" }) }),
        "Cetak Semua Dokumen"
      ] }) })
    ] }) })
  ] });
}
export {
  Agreement as default
};
