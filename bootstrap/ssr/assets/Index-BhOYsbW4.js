import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function TransactionsIndex({ transactions, therapists = [] }) {
  const { flash } = usePage().props;
  const [selectedReject, setSelectedReject] = useState(null);
  const [selectedValidate, setSelectedValidate] = useState(null);
  const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject } = useForm({
    rejection_reason: ""
  });
  const { data: validateData, setData: setValidateData, post: validatePost, processing: validating, reset: resetValidate } = useForm({
    therapist_id: ""
  });
  const handleValidate = (tx) => {
    if (tx.transactionable_type.includes("Booking")) {
      setSelectedValidate(tx);
      setValidateData("therapist_id", tx.transactionable?.therapist_id ?? "");
    } else {
      if (confirm("Validasi transaksi ini?")) {
        validatePost(route("admin.transactions.validate", tx.id));
      }
    }
  };
  const submitValidate = (e) => {
    e.preventDefault();
    validatePost(route("admin.transactions.validate", selectedValidate.id), {
      onSuccess: () => {
        setSelectedValidate(null);
        resetValidate();
      }
    });
  };
  const submitReject = (e) => {
    e.preventDefault();
    rejectPost(route("admin.transactions.reject", selectedReject.id), {
      onSuccess: () => {
        setSelectedReject(null);
        resetReject();
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Dashboard Validasi Transaksi" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Validasi Transaksi" }),
        /* @__PURE__ */ jsxs("div", { className: "relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-gold-400/20 to-indigo-500/20 blur-[120px] rounded-full animate-pulse", style: { animationDuration: "12s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/10 to-gold-400/10 blur-[100px] rounded-full animate-pulse", style: { animationDuration: "18s", animationDelay: "3s" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10", children: [
            flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-xl animate-in slide-in-from-top-4 duration-500", children: flash.success }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight", children: [
                "Validasi ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-indigo-600", children: "Transaksi" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500 dark:text-slate-400 font-bold italic tracking-wide", children: "Kelola dan validasi pembayaran dari pasien dan siswa di InDepth." })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700", children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4 sm:p-0", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-slate-100/50 dark:bg-slate-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-slate-700/30", children: [
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Invoice" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Pengguna" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Layanan" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Validitas" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Status" }),
                  /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-right", children: "Aksi" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800/50", children: transactions.data.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 dark:text-white mb-1", children: tx.invoice_number }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: tx.payment_bank || "BANK" })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-900 dark:text-white", children: tx.user?.name }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: tx.user?.email })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-lg border border-gold-500/20 w-fit uppercase tracking-widest", children: tx.transactionable_type.split("\\").pop() }),
                    tx.payment_agreement_data && /* @__PURE__ */ jsxs("span", { className: "text-[9px] text-emerald-600 dark:text-emerald-500 font-black flex items-center gap-1 uppercase", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                      "Agreement Signed"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: tx.payment_proof ? /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: `/storage/${tx.payment_proof}`,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "inline-flex items-center gap-2 group/proof",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/proof:bg-gold-500 group-hover/proof:text-white transition-all duration-300", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-slate-500 dark:text-slate-400 group-hover/proof:text-gold-600 uppercase tracking-tighter", children: "Bukti Tuntas" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-500 uppercase tracking-widest italic", children: "Belum Upload" }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border
                                                    ${tx.status === "paid" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : tx.status === "rejected" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" : tx.status === "pending" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" : "bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/20"}`, children: tx.status === "paid" ? "Valid" : tx.status === "rejected" ? "Ditolak" : tx.status === "pending" ? "Menunggu" : tx.status }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: tx.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleValidate(tx),
                        className: "px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95",
                        children: "Validasi"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setSelectedReject(tx),
                        className: "px-5 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-rose-600/20 transition-all hover:scale-105 active:scale-95",
                        children: "Tolak"
                      }
                    )
                  ] }) })
                ] }, tx.id)) })
              ] }) }),
              transactions.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-32 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-slate-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-600 font-black uppercase tracking-[0.2em] italic", children: "Bersih. Tidak ada transaksi tertunda." })
              ] })
            ] })
          ] })
        ] }),
        selectedReject && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl animate-in zoom-in-95 duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold dark:text-white mb-2", children: "Tolak Pembayaran" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
              "Invoice: ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: selectedReject.invoice_number })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitReject, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Alasan Penolakan" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]",
                  placeholder: "Jelaskan alasan penolakan ini kepada pengguna...",
                  value: rejectData.rejection_reason,
                  onChange: (e) => setRejectData("rejection_reason", e.target.value),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", className: "!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center", children: "Konfirmasi Penolakan" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedReject(null), className: "text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2", children: "Batal" })
            ] })
          ] })
        ] }) }),
        selectedValidate && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl animate-in zoom-in-95 duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold dark:text-white mb-2", children: "Validasi Pembayaran" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
              "Invoice: ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: selectedValidate.invoice_number })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitValidate, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Pilih Terapis (Opsional)" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: validateData.therapist_id,
                    onChange: (e) => setValidateData("therapist_id", e.target.value),
                    className: "w-full appearance-none bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "— Pilih Otomatis (Random) —" }),
                      therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 mt-3 flex items-start gap-2 leading-relaxed", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 mt-0.5 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "Jika tidak dipilih, sistem akan secara otomatis menugaskan terapis yang tersedia untuk slot waktu ini."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(
                PrimaryButton,
                {
                  type: "submit",
                  disabled: validating,
                  className: "!bg-gold-600 hover:!bg-gold-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-gold-600/20 !uppercase !w-full !justify-center disabled:opacity-50",
                  children: validating ? "Memproses..." : "Konfirmasi & Validasi"
                }
              ),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedValidate(null), className: "text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-2", children: "Batal" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  TransactionsIndex as default
};
