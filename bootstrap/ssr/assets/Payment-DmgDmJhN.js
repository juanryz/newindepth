import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { N as Navbar } from "./Navbar-Bwc0UBuH.js";
import { F as Footer } from "./Footer-CbNJmqB7.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
const GlassPanel = ({ children, className = "", ...props }) => /* @__PURE__ */ jsx("div", { className: `bg-white/40 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/60 dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[2.5rem] transition-all duration-500 ${className}`, ...props, children });
function CoursePayment({ course, transaction, auth }) {
  const { errors: pageErrors } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    payment_bank: "",
    payment_method: "Transfer Bank",
    payment_proof: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(`/courses/${course.slug}/payment`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased relative", children: [
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "courses" }),
    /* @__PURE__ */ jsx(Head, { title: `Pembayaran - ${course.title}` }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter", children: "Konfirmasi Pembayaran" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium italic", children: "Silakan unggah bukti transfer untuk mengakses materi kelas." })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: `/courses/${course.slug}`,
            className: "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-gold-600 transition-colors group",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
              "Batal"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl p-4 border border-gold-100 dark:border-gold-900/30 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gold-100 dark:bg-gold-900/50 rounded-xl flex items-center justify-center text-gold-600 dark:text-gold-400", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gold-800 dark:text-gold-300 uppercase tracking-widest leading-none", children: "Status Persetujuan" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gold-600 dark:text-gold-500 font-bold mt-1", children: "Anda telah menandatangani persetujuan peserta kelas." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassPanel, { className: "p-8 md:p-10 shadow-2xl overflow-hidden relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-10 p-8 bg-gradient-to-br from-gold-50/50 to-white dark:from-gold-950/20 dark:to-transparent rounded-[2rem] border border-gold-100 dark:border-gold-900/30 relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gold-700 dark:text-gold-400 uppercase tracking-[0.2em] mb-6", children: "Instruksi Pembayaran" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Judul Kelas" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-slate-900 dark:text-white leading-tight", children: course.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1", children: "Total yang harus dibayar" }),
                /* @__PURE__ */ jsxs("p", { className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 dark:from-gold-400 dark:to-yellow-400", children: [
                  "Rp ",
                  new Intl.NumberFormat("id-ID").format(transaction.amount || 0)
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
                /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-white dark:border-gray-800 shadow-sm transition-all hover:shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center font-black text-xs text-indigo-600 dark:text-indigo-400", children: "BCA" }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-base font-black text-slate-800 dark:text-white tracking-tight", children: "2520639058" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "JULIUS BAMBANG" })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "p-4 bg-white/50 dark:bg-black/20 rounded-2xl border border-white dark:border-gray-800 shadow-sm transition-all hover:shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center font-black text-xs text-orange-600 dark:text-orange-400", children: "BNI" }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-base font-black text-slate-800 dark:text-white tracking-tight", children: "1883920627" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-slate-400 font-bold uppercase tracking-widest", children: "SAIFUL ANAM" })
                  ] })
                ] }) })
              ] })
            ] })
          ] })
        ] }),
        pageErrors.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-8 text-sm text-red-800 rounded-2xl bg-red-50 border border-red-100 animate-pulse font-bold", children: pageErrors.error }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "payment_bank", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1", children: "Nama Bank Pengirim" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "payment_bank",
                  type: "text",
                  placeholder: "Contoh: BCA / Mandiri / BNI",
                  className: "w-full h-14 px-6 rounded-2xl bg-white/50 dark:bg-white/[0.02] border-white/60 dark:border-white/[0.06] focus:ring-2 focus:ring-gold-500 border-none shadow-inner font-bold text-sm",
                  value: data.payment_bank,
                  onChange: (e) => setData("payment_bank", e.target.value),
                  required: true
                }
              ),
              errors.payment_bank && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.payment_bank })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1", children: "Bukti Transfer (JPG/PNG)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "payment_proof",
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e) => setData("payment_proof", e.target.files[0]),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    htmlFor: "payment_proof",
                    className: "flex items-center justify-center w-full h-14 px-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gold-400 dark:hover:border-gold-500 bg-white/30 dark:bg-white/[0.01] cursor-pointer transition-all gap-3 group",
                    children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-600 dark:text-slate-400 truncate max-w-[150px]", children: data.payment_proof ? data.payment_proof.name : "Pilih File" })
                    ]
                  }
                )
              ] }),
              errors.payment_proof && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.payment_proof })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-slate-50/50 dark:bg-black/20 rounded-[1.5rem] border border-slate-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4", children: "Ringkasan Kebijakan" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-500 italic uppercase tracking-wider", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gold-500 mt-0.5", children: "•" }),
                "Akses materi terbuka segera setelah validasi manual oleh admin (max 24 jam)."
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-500 italic uppercase tracking-wider", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gold-500 mt-0.5", children: "•" }),
                "Harap simpan bukti transfer asli sebelum akses dikonfirmasi."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end pt-6 border-t border-white/40 dark:border-white/10", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "px-12 py-4 bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-500 hover:to-yellow-500 text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-gold-500/30 transition-all hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50",
              disabled: processing,
              children: processing ? "Mega-Processing..." : "Kirim Bukti Pembayaran"
            }
          ) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  CoursePayment as default
};
