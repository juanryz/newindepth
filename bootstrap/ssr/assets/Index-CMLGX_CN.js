import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { usePage, Head, Link, router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, ShieldCheck, CheckCircle, ShieldAlert, ChevronRight, Search, UserCircle, Eye, Edit, Trash2, Key, UserPlus } from "lucide-react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function UsersIndex({ users, roles, permissions, filters }) {
  const { flash } = usePage().props;
  const queryParams = new URLSearchParams(window.location.search);
  const initialTab = queryParams.get("tab") || "users";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const url = new URL(window.location);
    url.searchParams.set("tab", tabId);
    window.history.replaceState({}, "", url);
  };
  const tabs = [
    { id: "users", label: "Daftar Pengguna", icon: Users, count: users.total },
    { id: "roles", label: "Akses & Role", icon: ShieldCheck, count: roles.length }
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route("admin.users.index"), { search: searchQuery }, {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  const handleDeleteUser = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait akan ikut terhapus.")) {
      router.delete(route("admin.users.destroy", id));
    }
  };
  const handleDeleteRole = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus role ini?")) {
      router.delete(route("admin.roles.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase", children: "Manajemen Pengguna" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1", children: "Kelola Akun, Terapis, dan Hak Akses Sistem" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: activeTab === "users" ? /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.users.create"),
            className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
              "Tambah Pengguna"
            ]
          }
        ) : /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.roles.create"),
            className: "inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-600/20 active:scale-95",
            children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4 mr-2" }),
              "Tambah Role Baru"
            ]
          }
        ) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Manajemen Pengguna" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs(AnimatePresence, { children: [
            flash.success && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "mb-8 p-4 bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 rounded-3xl text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-3 shadow-sm",
                children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }),
                  flash.success
                ]
              }
            ),
            flash.error && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "mb-8 p-4 bg-rose-50 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 rounded-3xl text-rose-600 dark:text-rose-400 text-sm font-bold flex items-center gap-3 shadow-sm",
                children: [
                  /* @__PURE__ */ jsx(ShieldAlert, { className: "w-5 h-5" }),
                  flash.error
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full lg:w-80 flex-shrink-0 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500 sticky top-24", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => handleTabChange(tab.id),
                  className: `w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"}`,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl transition-colors ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700"}`, children: /* @__PURE__ */ jsx(tab.icon, { className: "w-5 h-5" }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest", children: tab.label })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black px-2 py-0.5 rounded-lg ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`, children: tab.count }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}` })
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
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0 pb-12", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "users" && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  className: "space-y-6",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex flex-col sm:flex-row gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
                        /* @__PURE__ */ jsx(Search, { className: "absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Cari user berdasarkan nama atau email...",
                            className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                            value: searchQuery,
                            onChange: (e) => setSearchQuery(e.target.value)
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("button", { type: "submit", className: "px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20", children: "Cari User" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
                      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Informasi Pengguna" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Hak Akses (Role)" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Verifikasi" }),
                          /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tindakan" })
                        ] }) }),
                        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group", children: [
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400", children: user.profile_photo_url ? /* @__PURE__ */ jsx("img", { src: user.profile_photo_url, alt: "", className: "w-full h-full rounded-2xl object-cover" }) : /* @__PURE__ */ jsx(UserCircle, { className: "w-6 h-6" }) }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight", children: user.name }),
                              /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 font-bold tracking-widest", children: user.email })
                            ] })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                            user.roles.map((role) => /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${role.name === "super_admin" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" : role.name === "therapist" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"}`, children: role.name }, role.id)),
                            user.roles.length === 0 && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 italic font-medium px-2 py-1", children: "Belum ada role" })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: user.email_verified_at ? /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800", children: [
                            /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
                            "Terverifikasi"
                          ] }) : /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800", children: "Menunggu" }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 transition-all", children: [
                            /* @__PURE__ */ jsx(
                              Link,
                              {
                                href: route("admin.users.show", user.id),
                                className: "p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all",
                                title: "Detail",
                                children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Link,
                              {
                                href: route("admin.users.edit", user.id),
                                className: "p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all",
                                title: "Edit",
                                children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "button",
                              {
                                onClick: () => handleDeleteUser(user.id),
                                className: "p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all",
                                title: "Hapus",
                                children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                              }
                            )
                          ] }) })
                        ] }, user.id)) })
                      ] }) }),
                      /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4", children: [
                        /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: [
                          "Menampilkan ",
                          users.from || 0,
                          " sampai ",
                          users.to || 0,
                          " dari ",
                          users.total,
                          " pengguna"
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: users.links.map((link, i) => /* @__PURE__ */ jsx(
                          Link,
                          {
                            href: link.url || "#",
                            className: `px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${link.active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`,
                            dangerouslySetInnerHTML: { __html: link.label }
                          },
                          i
                        )) })
                      ] })
                    ] })
                  ]
                },
                "users"
              ),
              activeTab === "roles" && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  className: "space-y-6",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
                    /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Manajemen Hak Akses" }),
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1", children: "Konfigurasi Role dan Izin Akses (Permissions)" })
                      ] }),
                      /* @__PURE__ */ jsx(ShieldCheck, { className: "w-10 h-10 text-indigo-500/20" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-1/4", children: "Nama Role" }),
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Izin Akses (Permissions)" }),
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-40", children: "Tindakan" })
                      ] }) }),
                      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: roles.map((role) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group", children: [
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                          /* @__PURE__ */ jsx("div", { className: "p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }) }),
                          /* @__PURE__ */ jsx("div", { className: "font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm", children: role.name })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                          (role.permissions || []).slice(0, 10).map((perm) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm", children: perm.name.replace(/[\._]/g, " ") }, perm.id)),
                          (role.permissions || []).length > 10 && /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-indigo-500 px-2 uppercase my-auto", children: [
                            "+",
                            (role.permissions || []).length - 10,
                            " lainnya"
                          ] }),
                          (!role.permissions || role.permissions.length === 0) && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 italic font-medium px-2 py-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg", children: "Belum ada izin akses yang diatur" })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
                          /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route("admin.roles.edit", role.id),
                              className: "p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all",
                              title: "Atur Hak Akses",
                              children: /* @__PURE__ */ jsx(Key, { className: "w-4 h-4" })
                            }
                          ),
                          role.name !== "super_admin" && /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => handleDeleteRole(role.id),
                              className: "p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all",
                              title: "Hapus Role",
                              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                            }
                          )
                        ] }) })
                      ] }, role.id)) })
                    ] }) })
                  ] })
                },
                "roles"
              )
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  UsersIndex as default
};
