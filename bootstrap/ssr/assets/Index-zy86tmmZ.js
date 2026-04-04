import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { Users, ShieldCheck, Building2, ChevronRight, CheckCircle, Search, Plus, Eye } from "lucide-react";
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
  const tabs = [
    { id: "users", label: "Daftar Pengguna Individu", icon: Users, href: route("admin.users.index", { tab: "users" }) },
    { id: "roles", label: "Akses & Role", icon: ShieldCheck, href: route("admin.users.index", { tab: "roles" }) },
    { id: "groups", label: "Daftar Grup", icon: Building2, count: groups.total, active: true }
  ];
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase", children: "Manajemen Pengguna" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1", children: "Kelola Akun, Terapis, dan Hak Akses Sistem" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.group-bookings.create"),
            className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Buat Grup Baru"
            ]
          }
        ) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Daftar Pengguna Grup" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-80 flex-shrink-0 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500 sticky top-24", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: tabs.map((tab) => tab.href ? /* @__PURE__ */ jsxs(
              Link,
              {
                href: tab.href,
                className: "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl transition-colors bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30", children: /* @__PURE__ */ jsx(tab.icon, { className: "w-5 h-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest", children: tab.label })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" })
                ]
              },
              tab.id
            ) : /* @__PURE__ */ jsxs(
              "div",
              {
                className: "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group bg-indigo-600 text-white shadow-lg shadow-indigo-600/30",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl transition-colors bg-white/20", children: /* @__PURE__ */ jsx(tab.icon, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest", children: tab.label })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-2 py-0.5 rounded-lg bg-white/20", children: tab.count }),
                    /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 translate-x-0 opacity-100 transition-transform duration-300" })
                  ] })
                ]
              },
              tab.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-900/30", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4", children: "Informasi Keamanan" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-indigo-900/70 dark:text-indigo-300/70 leading-relaxed font-medium", children: [
                "Pastikan untuk memberikan akses role sesuai dengan fungsinya. Gunakan role ",
                /* @__PURE__ */ jsx("span", { className: "text-indigo-600 font-bold", children: "Super Admin" }),
                " hanya untuk personil yang berwenang mengatur sistem."
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 pb-12 space-y-6", children: [
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
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  GroupBookingsIndex as default
};
