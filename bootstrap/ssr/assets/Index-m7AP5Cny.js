import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DLGa0CGh.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { CheckCircle, Search, Users, Plus, Eye, ChevronLeft } from "lucide-react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const statusConfig = {
  paid: { label: "Lunas", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  pending: { label: "Menunggu", cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" }
};
function GroupBookingsIndex({ groups, filters }) {
  const { flash } = usePage().props;
  const [search, setSearch] = useState(filters?.search || "");
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.group-bookings.index"), { search }, { preserveState: true, replace: true });
  };
  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };
  const formatCurrency = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.users.index"),
              className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Daftar Pengguna Grup" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: "Manajemen Booking Grup & Institusi" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.group-bookings.create"),
            className: "inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Buat Grup Baru"
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Daftar Pengguna Grup" }),
        /* @__PURE__ */ jsx("div", { className: "py-8 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6", children: [
          flash?.success && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 flex-shrink-0" }),
            flash.success
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "Cari nama grup, institusi, atau PIC...",
                  className: "w-full pl-12 pr-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", className: "px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all", children: "Cari" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden", children: [
            groups.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-widest text-sm", children: "Belum ada grup" }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.group-bookings.create"),
                  className: "inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                    " Buat Grup Pertama"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-100 dark:border-gray-800", children: ["Grup / Institusi", "PIC", "Anggota", "Total", "Metode Bayar", "Status", "Dibuat", "Aksi"].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4", children: h }, h)) }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: groups.data.map((g) => {
                const st = statusConfig[g.payment_status] ?? statusConfig.pending;
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors", children: [
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: g.group_name }),
                    g.institution_name && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: g.institution_name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-indigo-500 mt-1", children: g.invoice_number })
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: g.pic_name }),
                    g.pic_phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: g.pic_phone })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-full", children: [
                    /* @__PURE__ */ jsx(Users, { className: "w-3 h-3" }),
                    g.members_count ?? 0,
                    " orang"
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white", children: formatCurrency(g.total_amount) }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-600 dark:text-gray-400", children: g.payment_method }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-black uppercase ${st.cls}`, children: st.label }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: formatDate(g.created_at) }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("admin.group-bookings.show", g.id),
                      className: "inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
                        " Detail"
                      ]
                    }
                  ) })
                ] }, g.id);
              }) })
            ] }) }),
            groups.last_page > 1 && /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 p-6 border-t border-gray-100 dark:border-gray-800", children: groups.links.map((link, i) => /* @__PURE__ */ jsx(
              Link,
              {
                href: link.url || "#",
                dangerouslySetInnerHTML: { __html: link.label },
                className: `px-4 py-2 rounded-xl text-xs font-black transition-all ${link.active ? "bg-indigo-600 text-white" : link.url ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50" : "opacity-30 cursor-not-allowed"}`
              },
              i
            )) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  GroupBookingsIndex as default
};
