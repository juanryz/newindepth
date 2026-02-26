import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function AgreementDetail({ userModel }) {
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
      konfirmasi_akhir: true,
      agree_1: true,
      agree_2: true,
      agree_3: true
    };
  }
  const signedAt = userModel.agreement_signed_at ? new Date(userModel.agreement_signed_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : null;
  const signDateOnly = userModel.agreement_signed_at ? new Date(userModel.agreement_signed_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-";
  const CheckRow = ({ label, checked }) => /* @__PURE__ */ jsxs("div", { className: `flex items-start gap-3 p-3 rounded-xl border text-sm ${checked ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800" : "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}`, children: [
    /* @__PURE__ */ jsx("span", { className: `mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${checked ? "bg-green-500 text-white" : "bg-gray-300 text-white"}`, children: checked ? "✓" : "×" }),
    /* @__PURE__ */ jsx("span", { className: checked ? "text-gray-800 dark:text-gray-200 font-medium" : "text-gray-400 line-through", children: label })
  ] });
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.history.back(),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm print:hidden",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-800 dark:text-white leading-tight", children: "Detail Dokumen Persetujuan" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5", children: "HASIL VERIFIKASI DIGITAL" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Dokumen Persetujuan — ${userModel.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-indigo-700 text-white p-6 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] opacity-70", children: "Dokumen 1 dari 2" }),
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-black tracking-tight mt-1", children: "Form Pernyataan Awal & Persetujuan Layanan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 text-sm pb-6 border-b border-gray-100 dark:border-gray-700", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Nama Klien" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white uppercase", children: userModel.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Waktu Penandatanganan" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: signedAt || "-" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("section", { children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "1" }),
                      "Kondisi Pribadi"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(CheckRow, { label: "Data screening benar", checked: agreementData?.cond_data_benar }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Bukan pengganti medis darurat", checked: agreementData?.cond_bukan_pengganti_medis }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Sadar penuh & bebas zat", checked: agreementData?.cond_sadar_penuh }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Kesadaran risiko riwayat penyakit", checked: agreementData?.cond_riwayat_penyakit })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("section", { children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "2" }),
                      "Status Perawatan Medis"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border text-sm font-bold ${agreementData?.status_medis === "Ya" ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300" : "border-green-200 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"}`, children: [
                      "Sedang dalam perawatan: ",
                      agreementData?.status_medis || "-"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxs("section", { children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "3" }),
                      "Risiko & Dokumentasi"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(CheckRow, { label: "Izin hubungi medis darurat", checked: agreementData?.risk_hubungi_medis }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Sesi dapat dihentikan demi keselamatan", checked: agreementData?.risk_henti_sesi }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Sesi direkam (Dokumentasi Hukum)", checked: agreementData?.doc_direkam }),
                      /* @__PURE__ */ jsx(CheckRow, { label: "Kerahasiaan rekaman terjamin", checked: agreementData?.doc_hukum })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("section", { children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]", children: "4" }),
                      "Konfirmasi Akhir"
                    ] }),
                    /* @__PURE__ */ jsx(CheckRow, { label: "Telah memahami seluruh pernyataan", checked: agreementData?.konfirmasi_akhir })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Tanda Tangan Digital Klien (1)" }),
                /* @__PURE__ */ jsx("div", { className: "h-24 w-48 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 mb-2 flex items-center justify-center", children: agreementData?.signature_1 ? /* @__PURE__ */ jsx("img", { src: agreementData.signature_1, alt: "Signature 1", className: "h-full object-contain dark:invert" }) : userModel.digital_signature ? /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Signature", className: "h-full object-contain dark:invert" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 tracking-tighter italic", children: "Digitally Signed via InDepth Auth" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest", children: userModel.name })
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "print:page-break-after-always" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 text-white p-6 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] opacity-70", children: "Dokumen 2 dari 2" }),
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-black tracking-tight mt-1 uppercase", children: "Surat Perjanjian Layanan Hipnoterapi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 font-serif text-sm leading-relaxed text-gray-800 dark:text-gray-300 space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 not-serif", children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white underline", children: "SURAT PERJANJIAN LAYANAN" }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  "Nomor: ID/",
                  userModel.id,
                  "/",
                  new Date(userModel.agreement_signed_at).getTime()
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { children: "Saya yang bertanda tangan di bawah ini:" }),
              /* @__PURE__ */ jsx("table", { className: "w-full max-w-md ml-4 text-xs", children: /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-1 w-32 font-bold uppercase", children: "Nama Lengkap" }),
                  /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                    ": ",
                    userModel.name
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-1 font-bold uppercase", children: "Email" }),
                  /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                    ": ",
                    userModel.email
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { className: "py-1 font-bold uppercase", children: "Telepon" }),
                  /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                    ": ",
                    userModel.phone || "-"
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("p", { children: [
                "Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di ",
                /* @__PURE__ */ jsx("strong", { children: "InDepth Mental Wellness" }),
                " dengan ketentuan sebagai berikut:"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2", children: "PASAL 1 - PERNYATAAN KESEHATAN" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Klien menyatakan seluruh data yang diberikan adalah benar. Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan. Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2", children: "PASAL 2 - DOKUMENTASI & TRANSPARANSI" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Seluruh sesi direkam audio dan video secara penuh untuk perlindungan hukum kedua pihak. Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2", children: "PASAL 3 - PEMBATALAN & NO-SHOW" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Setiap sesi berdurasi 2 jam. Keterlambatan maksimal 60 menit; Jika melewati batas tersebut, sesi dianggap hangus (No-Show) tanpa pengembalian dana." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2", children: "PASAL 4 - KERAHASIAAN" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Seluruh informasi sesi bersifat rahasia tingkat tinggi. Klien dilarang menyebarkan informasi atau tuduhan publik tanpa putusan hukum tetap." })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2", children: "PASAL 5 - PENYELESAIAN SENGKETA" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs", children: "Sengketa diselesaikan melalui musyawarah. Jika tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri setempat." })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-6 not-serif", children: /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4", children: "Pernyataan Akhir Klien:" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(CheckRow, { label: "Seluruh data benar dan lengkap", checked: agreementData?.agree_1 }),
                  /* @__PURE__ */ jsx(CheckRow, { label: "Telah membaca dan memahami seluruh pasal", checked: agreementData?.agree_2 }),
                  /* @__PURE__ */ jsx(CheckRow, { label: "Menyetujui seluruh ketentuan tanpa keberatan", checked: agreementData?.agree_3 })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8 pt-12 not-serif", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500 mb-2", children: [
                    "Semarang, ",
                    signDateOnly
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Tanda Tangan Klien (2)" }),
                  /* @__PURE__ */ jsx("div", { className: "h-32 w-full bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 mb-2 flex items-center justify-center", children: userModel.digital_signature ? /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Signature Main", className: "h-full object-contain dark:invert" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 italic", children: "Digitally Signed" }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest", children: userModel.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 mb-2", children: "InDepth Mental Wellness" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2", children: "Perwakilan Resmi" }),
                  /* @__PURE__ */ jsx("div", { className: "h-32 w-full flex items-center justify-center p-2 mb-2", children: /* @__PURE__ */ jsx("img", { src: "/images/saiful-anam-signature.jpeg", alt: "Signature Saiful Anam", className: "h-full object-contain dark:invert opacity-80" }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest", children: "Saiful Anam" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-tighter", children: "Direktur Utama" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-8 text-center opacity-30 text-[9px] uppercase font-black tracking-[0.3em]", children: "Validated via InDepth Mental Wellness Digital Authentication System" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-4 print:hidden", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.print(), className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-xl shadow-gray-200/20 dark:shadow-none uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" }) }),
            "Cetak PDF"
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  AgreementDetail as default
};
