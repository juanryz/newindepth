import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
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
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Detail Surat Perjanjian" }), children: [
    /* @__PURE__ */ jsx(Head, { title: `Surat Perjanjian — ${userModel.name}` }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-indigo-700 text-white p-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1", children: "InDepth Mental Wellness" }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black tracking-tight", children: "Surat Perjanjian Layanan Hipnoterapi" }),
        /* @__PURE__ */ jsx("p", { className: "text-indigo-200 text-sm mt-1", children: "Pernyataan Awal & Persetujuan Layanan" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm pb-6 border-b border-gray-100 dark:border-gray-700", children: [
          ["Nama Klien", userModel.name],
          ["Email", userModel.email],
          ["Telepon", userModel.phone || "-"],
          ["Tanggal Tanda Tangan", signedAt || "Belum ditandatangani"]
        ].map(([label, val]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: label }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-900 dark:text-white text-xs", children: val })
        ] }, label)) }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-xs", children: "1" }),
            "Pernyataan Kondisi Pribadi"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(CheckRow, { label: "Data yang diisi pada tahap screening adalah benar dan sesuai kondisi saat ini.", checked: agreementData?.cond_data_benar }),
            /* @__PURE__ */ jsx(CheckRow, { label: "Layanan hipnoterapi bukan pengganti pengobatan medis darurat.", checked: agreementData?.cond_bukan_pengganti_medis }),
            /* @__PURE__ */ jsx(CheckRow, { label: "Dalam kondisi sadar penuh dan tidak berada di bawah pengaruh alkohol atau zat terlarang.", checked: agreementData?.cond_sadar_penuh }),
            /* @__PURE__ */ jsx(CheckRow, { label: "Memiliki riwayat penyakit jantung, gangguan saraf berat, epilepsi, atau kondisi serius lainnya telah dipertimbangkan.", checked: agreementData?.cond_riwayat_penyakit })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-xs", children: "2" }),
            "Status Perawatan Medis"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-3 rounded-xl border text-sm font-medium ${agreementData?.status_medis === "Ya" ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300" : "border-green-200 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"}`, children: [
            "Masih menjalani perawatan medis: ",
            /* @__PURE__ */ jsx("strong", { children: agreementData?.status_medis || "-" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-xs", children: "3" }),
            "Pernyataan Risiko & Darurat"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(CheckRow, { label: "Jika terjadi kondisi darurat medis selama sesi, tim InDepth akan menghubungi layanan medis terdekat.", checked: agreementData?.risk_hubungi_medis }),
            /* @__PURE__ */ jsx(CheckRow, { label: "Sesi dapat dihentikan sewaktu-waktu jika kondisi medis darurat terjadi.", checked: agreementData?.risk_henti_sesi })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-xs", children: "4" }),
            "Persetujuan Sistem Dokumentasi"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(CheckRow, { label: "Sesi akan direkam untuk tujuan dokumentasi dan perlindungan hukum, serta ditampilkan visualnya di ruang tunggu tanpa audio.", checked: agreementData?.doc_direkam }),
            /* @__PURE__ */ jsx(CheckRow, { label: "Rekaman hanya dibuka jika diperlukan secara hukum.", checked: agreementData?.doc_hukum })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-xs", children: "5" }),
            "Konfirmasi Akhir"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(CheckRow, { label: "Telah membaca dan memahami seluruh pernyataan di atas dan setuju untuk melanjutkan ke proses booking.", checked: agreementData?.konfirmasi_akhir }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 dark:border-gray-700 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-600 dark:text-gray-400 mb-3", children: "Tanda Tangan Digital Klien," }),
          userModel.digital_signature ? /* @__PURE__ */ jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-gray-800 mb-3", children: /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Tanda Tangan Digital", className: "h-24 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" }) }) : /* @__PURE__ */ jsx("div", { className: "h-24 w-56 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center mb-3", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: "Tidak ada tanda tangan" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white border-b border-gray-800 dark:border-gray-300 pb-1 tracking-widest text-xs uppercase", children: userModel.name }),
          signedAt && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1", children: signedAt }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-mono mt-1", children: [
            "Validated via InDepth Digital Auth · ID #",
            userModel.id
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "text-center pt-4 print:hidden", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.print(), className: "inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" }) }),
          "Cetak / Simpan PDF"
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  Agreement as default
};
