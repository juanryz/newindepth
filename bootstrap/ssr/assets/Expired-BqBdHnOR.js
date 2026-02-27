import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function ExpiredTransactions({ transactions }) {
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Transaksi Kadaluarsa" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Transaksi Kadaluarsa" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-slate-50 dark:bg-slate-900 min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-black text-slate-900 dark:text-white", children: [
                "Arsip ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "Kadaluarsa" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Daftar transaksi yang otomatis dibatalkan karena melebihi batas waktu pembayaran (2 Jam)." })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: route("admin.transactions.index"), className: "px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all", children: "Kembali ke Validasi" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700", children: [
            /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 dark:bg-slate-900/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700", children: [
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Invoice" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Pengguna" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Layanan" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Waktu Buat" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Waktu Expired" }),
                /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Nominal" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-50 dark:divide-slate-700/50", children: transactions.data.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-all", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-slate-900 dark:text-white", children: [
                  "#",
                  tx.invoice_number
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: tx.user?.name }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400", children: tx.user?.email })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg uppercase", children: tx.transactionable_type?.split("\\").pop() }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs text-slate-500", children: new Date(tx.created_at).toLocaleString("id-ID") }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs text-rose-500 font-bold", children: new Date(new Date(tx.created_at).getTime() + 2 * 60 * 60 * 1e3).toLocaleString("id-ID") }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm font-black text-slate-900 dark:text-white", children: [
                  "Rp ",
                  new Intl.NumberFormat("id-ID").format(tx.amount)
                ] })
              ] }, tx.id)) })
            ] }),
            transactions.data.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-bold italic", children: "Tidak ada data kadaluarsa ditemukan." }) })
          ] }),
          transactions.links && /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1", children: transactions.links.map((link, i) => /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `px-4 py-2 text-xs rounded-xl border ${link.active ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            },
            i
          )) })
        ] }) })
      ]
    }
  );
}
export {
  ExpiredTransactions as default
};
