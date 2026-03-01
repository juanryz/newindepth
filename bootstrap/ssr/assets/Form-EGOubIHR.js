import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Cjm5hTBB.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Shield, Save, ChevronLeft, Settings, BarChart, BookOpen, Users, CreditCard, Calendar } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function RolesForm({ roleModel, permissions, rolePermissions }) {
  const isEditing = !!roleModel.id;
  const { data, setData, post, put, processing, errors } = useForm({
    name: roleModel.name || "",
    permissions: rolePermissions || []
  });
  const categoryMapping = {
    "Booking & Konsultasi": ["bookings", "schedules"],
    "Transaksi & Pembayaran": ["transactions", "packages", "vouchers"],
    "Manajemen Pengguna": ["users", "roles", "permissions"],
    "Konten & Blog": ["blog_posts", "courses", "lessons"],
    "Laporan & Statistik": ["reports", "finance", "expenses", "petty_cash"]
  };
  const parsePermission = (name) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      const action = parts[0];
      const resource = parts.slice(1).join("_");
      return { action, resource };
    }
    return { action: name, resource: "general" };
  };
  const permissionStructure = useMemo(() => {
    const structure = {};
    Object.keys(categoryMapping).forEach((cat) => structure[cat] = {});
    permissions.forEach((perm) => {
      const { action, resource } = parsePermission(perm.name);
      let category = "Lainnya";
      for (const [cat, resources] of Object.entries(categoryMapping)) {
        if (resources.includes(resource)) {
          category = cat;
          break;
        }
      }
      if (!structure[category]) structure[category] = {};
      if (!structure[category][resource]) structure[category][resource] = [];
      structure[category][resource].push({
        id: perm.id,
        name: perm.name,
        action,
        resource
      });
    });
    return Object.fromEntries(Object.entries(structure).filter(([_, resources]) => Object.keys(resources).length > 0));
  }, [permissions]);
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData("permissions", [...data.permissions, value]);
    } else {
      setData("permissions", data.permissions.filter((perm) => perm !== value));
    }
  };
  const toggleResource = (resourcePerms) => {
    const allNames = resourcePerms.map((p) => p.name);
    const allSelected = allNames.every((name) => data.permissions.includes(name));
    if (allSelected) {
      setData("permissions", data.permissions.filter((p) => !allNames.includes(p)));
    } else {
      const newPerms = [.../* @__PURE__ */ new Set([...data.permissions, ...allNames])];
      setData("permissions", newPerms);
    }
  };
  const toggleCategory = (resources) => {
    const allNames = Object.values(resources).flat().map((p) => p.name);
    const allSelected = allNames.every((name) => data.permissions.includes(name));
    if (allSelected) {
      setData("permissions", data.permissions.filter((p) => !allNames.includes(p)));
    } else {
      const newPerms = [.../* @__PURE__ */ new Set([...data.permissions, ...allNames])];
      setData("permissions", newPerms);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      put(route("admin.roles.update", roleModel.id));
    } else {
      post(route("admin.roles.store"));
    }
  };
  const getIconForCategory = (cat) => {
    switch (cat) {
      case "Booking & Konsultasi":
        return /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" });
      case "Transaksi & Pembayaran":
        return /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" });
      case "Manajemen Pengguna":
        return /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" });
      case "Konten & Blog":
        return /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4" });
      case "Laporan & Statistik":
        return /* @__PURE__ */ jsx(BarChart, { className: "w-4 h-4" });
      default:
        return /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" });
    }
  };
  const formatResourceName = (name) => {
    return name.replace(/_/g, " ").toUpperCase();
  };
  const formatActionName = (name) => {
    const mapping = {
      "view": "VIEW",
      "create": "CREATE",
      "edit": "EDIT",
      "delete": "DELETE",
      "cancel": "CANCEL",
      "validate": "VALIDATE",
      "reject": "REJECT",
      "publish": "PUBLISH",
      "approve": "APPROVE",
      "export": "EXPORT",
      "analyze": "ANALYZE",
      "bulk_delete": "BULK DEL",
      "assign": "ASSIGN",
      "view_agreement": "AGREEMENT"
    };
    return mapping[name] || name.toUpperCase();
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.users.index", { tab: "roles" }),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: isEditing ? "Konfigurasi Hak Akses" : "Tambah Role Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: isEditing ? `Mengatur Izin Untuk Role: ${roleModel.name}` : "Mendefinisikan Peran Baru Dalam Sistem" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Atur Hak Akses" : "Tambah Role" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 overflow-hidden relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-8 opacity-5", children: /* @__PURE__ */ jsx(Shield, { className: "w-32 h-32" }) }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3 ml-1", children: "Nama Role" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "name",
                    type: "text",
                    value: data.name,
                    className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-6 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                    onChange: (e) => setData("name", e.target.value.toLowerCase().replace(/\s+/g, "_")),
                    placeholder: "Contoh: manager_klinik, asisten_admin",
                    required: true,
                    disabled: roleModel.name === "super_admin"
                  }
                ),
                roleModel.name === "super_admin" && /* @__PURE__ */ jsxs("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-100", children: [
                  /* @__PURE__ */ jsx(Shield, { className: "w-3 h-3" }),
                  "System Role"
                ] })
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 ml-1" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Daftar Izin Akses" })
            ] }),
            Object.entries(permissionStructure).map(([category, resources]) => {
              const allInCat = Object.values(resources).flat().map((p) => p.name);
              const allSelected = allInCat.every((name) => data.permissions.includes(name));
              return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden", children: [
                /* @__PURE__ */ jsxs("div", { className: "px-8 py-5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-sm text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-gray-800", children: getIconForCategory(category) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white", children: category })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleCategory(resources),
                      className: `text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl transition-all border ${allSelected ? "bg-rose-50 border-rose-100 text-rose-600" : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"}`,
                      children: allSelected ? "Lepas Semua Kategori" : "Pilih Semua Kategori"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: Object.entries(resources).map(([resource, perms]) => {
                  const allResSelected = perms.map((p) => p.name).every((name) => data.permissions.includes(name));
                  const commonActions = ["view", "create", "edit", "delete"];
                  const commonPerms = perms.filter((p) => commonActions.includes(p.action));
                  const specialPerms = perms.filter((p) => !commonActions.includes(p.action));
                  return /* @__PURE__ */ jsx("div", { className: "p-8 hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col xl:flex-row xl:items-start gap-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "xl:w-1/4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-500" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-black tracking-widest text-gray-900 dark:text-white", children: formatResourceName(resource) })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleResource(perms),
                          className: "text-[9px] font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-tighter transition-colors",
                          children: allResSelected ? "Deselect All" : "Select All"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "xl:w-3/4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3", children: [
                      commonActions.map((action) => {
                        const perm = commonPerms.find((p) => p.action === action);
                        if (!perm) return /* @__PURE__ */ jsx("div", { className: "hidden sm:block" }, action);
                        return /* @__PURE__ */ jsxs(
                          "label",
                          {
                            className: `flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name) ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-600/20" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800"}`,
                            children: [
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  type: "checkbox",
                                  className: "hidden",
                                  value: perm.name,
                                  checked: data.permissions.includes(perm.name),
                                  onChange: handlePermissionChange
                                }
                              ),
                              /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name) ? "bg-white border-white" : "border-gray-200 dark:border-gray-700 group-hover:border-indigo-400"}`, children: data.permissions.includes(perm.name) && /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4", d: "M5 13l4 4L19 7" }) }) }),
                              /* @__PURE__ */ jsx("span", { className: `text-[9px] font-black uppercase tracking-widest transition-colors ${data.permissions.includes(perm.name) ? "text-white" : "text-gray-500 dark:text-gray-400"}`, children: formatActionName(action) })
                            ]
                          },
                          perm.id
                        );
                      }),
                      specialPerms.map((perm) => /* @__PURE__ */ jsxs(
                        "label",
                        {
                          className: `flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name) ? "bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-600/20" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800"}`,
                          children: [
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                type: "checkbox",
                                className: "hidden",
                                value: perm.name,
                                checked: data.permissions.includes(perm.name),
                                onChange: handlePermissionChange
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name) ? "bg-white border-white" : "border-gray-200 dark:border-gray-700 group-hover:border-emerald-400"}`, children: data.permissions.includes(perm.name) && /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4", d: "M5 13l4 4L19 7" }) }) }),
                            /* @__PURE__ */ jsx("span", { className: `text-[9px] font-black uppercase tracking-widest transition-colors ${data.permissions.includes(perm.name) ? "text-white" : "text-emerald-500/80 dark:text-emerald-400/80"}`, children: formatActionName(perm.action) })
                          ]
                        },
                        perm.id
                      ))
                    ] }) })
                  ] }) }, resource);
                }) })
              ] }, category);
            })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-white dark:border-gray-800 sticky bottom-8 transition-all duration-500 backdrop-blur-md bg-white/90 dark:bg-gray-900/90", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.users.index", { tab: "roles" }),
                className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-rose-500 transition-colors px-6",
                children: "Batal & Kembali"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-5 h-5" }),
                  isEditing ? "Simpan Perubahan" : "Buat Role Baru"
                ]
              }
            )
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  RolesForm as default
};
