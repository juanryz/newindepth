import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DqAHi6I1.js";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Search, Clock } from "lucide-react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function ExpiredTransactions({ transactions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions.data;
    const q = searchQuery.toLowerCase();
    return transactions.data.filter(
      (tx) => tx.invoice_number?.toLowerCase().includes(q) || tx.user?.name?.toLowerCase().includes(q) || tx.user?.email?.toLowerCase().includes(q)
    );
  }, [transactions.data, searchQuery]);
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Transaksi Kadaluarsa" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Transaksi Kadaluarsa" }),
        /* @__PURE__ */ jsxs("div", { className: "relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0", children: /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-rose-400/20 to-slate-500/20 blur-[120px] rounded-full animate-pulse", style: { animationDuration: "12s" } }) }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start flex-wrap gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight", children: [
                  "Arsip ",
                  /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-rose-700", children: "Kadaluarsa" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-2 font-bold italic", children: "Daftar transaksi yang otomatis dibatalkan karena melebihi batas waktu pembayaran (2 Jam)." })
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.transactions.index"),
                  className: "px-6 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-500 text-slate-600 dark:text-slate-300 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                    "Kembali ke Validasi"
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-6 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-none transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition-colors" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Cari invoice, nama, atau email...",
                  className: "w-full pl-11 pr-4 py-3.5 bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3rem] shadow-xl overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-slate-50/80 dark:bg-slate-900/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700", children: [
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Invoice" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Pengguna" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Layanan" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Waktu Buat" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Waktu Expired" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Nominal" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-700/50", children: filteredTransactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-slate-900 dark:text-white", children: [
                    "#",
                    tx.invoice_number
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: tx.user?.name }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: tx.user?.email })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg uppercase tracking-widest", children: tx.transactionable_type?.split("\\").pop() }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-xs text-slate-500 font-bold", children: new Date(tx.created_at).toLocaleString("id-ID") }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-rose-500 font-black", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                    new Date(new Date(tx.created_at).getTime() + 2 * 60 * 60 * 1e3).toLocaleString("id-ID")
                  ] }) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 text-sm font-black text-slate-900 dark:text-white", children: [
                    "Rp ",
                    new Intl.NumberFormat("id-ID").format(tx.amount)
                  ] })
                ] }, tx.id)) })
              ] }) }),
              filteredTransactions.length === 0 && /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-inner", children: /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 text-slate-300" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-black italic uppercase tracking-widest text-xs", children: searchQuery ? "Tidak ada data yang cocok dengan pencarian." : "Tidak ada data kadaluarsa ditemukan." })
              ] })
            ] }),
            transactions.links && transactions.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1", children: transactions.links.map((link, i) => link.url ? /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url,
                className: `px-4 py-2 text-xs rounded-xl border transition-all ${link.active ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`,
                dangerouslySetInnerHTML: { __html: link.label }
              },
              i
            ) : /* @__PURE__ */ jsx(
              "span",
              {
                className: "px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600",
                dangerouslySetInnerHTML: { __html: link.label }
              },
              i
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  ExpiredTransactions as default
};
