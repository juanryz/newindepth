import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Head, Link } from "@inertiajs/react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-S4MLfnZq.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import AffiliateAgreementContent from "./AffiliateAgreementContent-D0pYN57b.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function AgreementDetail({ userModel }) {
  const signedAt = userModel.affiliate_agreement_signed_at ? new Date(userModel.affiliate_agreement_signed_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : null;
  userModel.affiliate_agreement_signed_at ? new Date(userModel.affiliate_agreement_signed_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-";
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("affiliate.dashboard"),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm print:hidden",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-800 dark:text-white leading-tight", children: "Dokumen Kemitraan Affiliate" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5", children: "ARSIP RESMI KEMITRAAN DIGITAL" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Perjanjian Affiliate — ${userModel.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-indigo-700 text-white p-6 text-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] opacity-70", children: "Sertifikat Kemitraan" }),
              /* @__PURE__ */ jsx("h1", { className: "text-xl font-black tracking-tight mt-1", children: "PERJANJIAN MITRA AFFILIATE" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 text-sm pb-8 border-b border-gray-100 dark:border-gray-700", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Nama Mitra" }),
                  /* @__PURE__ */ jsx("p", { className: "font-black text-gray-950 dark:text-white uppercase text-base", children: userModel.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Status Akun" }),
                  /* @__PURE__ */ jsxs("p", { className: "font-black text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }),
                    "Aktif & Terverifikasi"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Tanggal Bergabung" }),
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-700 dark:text-gray-300", children: signedAt || "-" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "ml-auto print:hidden", children: /* @__PURE__ */ jsxs("span", { className: "inline-block py-1.5 px-4 text-[10px] font-black tracking-[0.2em] uppercase bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full", children: [
                  "ID: ",
                  userModel.id
                ] }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-slate-50 dark:bg-slate-900/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800", children: /* @__PURE__ */ jsx(AffiliateAgreementContent, {}) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-12 pt-16 mt-16 border-t border-slate-100 dark:border-slate-800", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mb-4 uppercase tracking-[0.2em] font-black", children: "Mitra Affiliate" }),
                  /* @__PURE__ */ jsxs("div", { className: "h-32 w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 mb-4 flex items-center justify-center relative overflow-hidden shadow-inner", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 transform rotate-12 flex flex-wrap gap-4 text-[6px] font-black", children: Array(100).fill("VERIFIED AUTH").map((t, i) => /* @__PURE__ */ jsx("span", { children: t }, i)) }) }),
                    userModel.affiliate_signature ? /* @__PURE__ */ jsx("img", { src: userModel.affiliate_signature, alt: "Mitra Signature", className: "h-full object-contain dark:invert relative z-10" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 italic", children: "Digitally Signed" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-950 dark:text-white underline uppercase tracking-widest", children: userModel.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter", children: "NIK Terverifikasi Sistem" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-500 mb-4 uppercase tracking-[0.2em] font-black", children: "InDepth Mental Wellness" }),
                  /* @__PURE__ */ jsx("div", { className: "h-32 w-full flex items-center justify-center p-4 mb-4", children: /* @__PURE__ */ jsx("img", { src: "/images/saiful-anam-signature.jpeg", alt: "Signature Saiful Anam", className: "h-full object-contain dark:invert opacity-90" }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-950 dark:text-white underline uppercase tracking-widest", children: "Saiful Anam" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter", children: "Direktur Utama" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-12 text-center opacity-30 text-[8px] uppercase font-black tracking-[0.4em] text-slate-500", children: "This document is digitally certified by InDepth Security Engine" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden", children: /* @__PURE__ */ jsxs(PrimaryButton, { onClick: () => window.print(), className: "w-full sm:w-auto px-10 h-14 rounded-2xl bg-slate-900 dark:bg-indigo-600 text-white font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" }) }),
            "Download Arsip PDF"
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  AgreementDetail as default
};
