import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Shield, Save, ChevronLeft, Settings, BarChart, BookOpen, Users, CreditCard, Calendar } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function RolesForm({ roleModel, permissions, rolePermissions }) {
  const isEditing = !!roleModel.id;
  const { data, setData, post, put, processing, errors } = useForm({
    name: roleModel.name || "",
    permissions: rolePermissions || []
  });
  const groupedPermissions = useMemo(() => {
    const categories = {
      "Booking & Konsultasi": ["booking", "schedule"],
      "Transaksi & Pembayaran": ["transaction", "pricing", "voucher"],
      "Manajemen Pengguna": ["user", "role", "permission"],
      "Konten & Blog": ["blog", "course", "lesson"],
      "Laporan & Statistik": ["report", "finance", "expense"],
      "Lainnya": []
    };
    const result = {};
    Object.keys(categories).forEach((cat) => result[cat] = []);
    permissions.forEach((perm) => {
      let found = false;
      for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some((k) => perm.name.toLowerCase().includes(k))) {
          result[cat].push(perm);
          found = true;
          break;
        }
      }
      if (!found) result["Lainnya"].push(perm);
    });
    return Object.fromEntries(Object.entries(result).filter(([_, perms]) => perms.length > 0));
  }, [permissions]);
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData("permissions", [...data.permissions, value]);
    } else {
      setData("permissions", data.permissions.filter((perm) => perm !== value));
    }
  };
  const toggleGroup = (groupPerms) => {
    const allNames = groupPerms.map((p) => p.name);
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
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.users.index"),
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
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
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
              /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2 ml-1" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-[10px] text-gray-400 font-medium px-1", children: "Gunakan huruf kecil dan garis bawah (underscore) untuk nama role teknis." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Daftar Izin Akses" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Object.entries(groupedPermissions).map(([category, perms]) => {
              const allSelected = perms.map((p) => p.name).every((name) => data.permissions.includes(name));
              return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-lg border border-white dark:border-gray-800 transition-all hover:shadow-indigo-500/5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 pb-4 border-b border-gray-50 dark:border-gray-800", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400", children: getIconForCategory(category) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white", children: category })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleGroup(perms),
                      className: `text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${allSelected ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`,
                      children: allSelected ? "Lepas Semua" : "Pilih Semua"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: perms.map((perm) => /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: `flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name) ? "bg-indigo-500/5 border-indigo-200 dark:border-indigo-900/50 ring-1 ring-indigo-100 dark:ring-indigo-900/20" : "bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name) ? "bg-indigo-600 border-indigo-600" : "border-gray-300 dark:border-gray-600 group-hover:border-indigo-400"}`, children: data.permissions.includes(perm.name) && /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4", d: "M5 13l4 4L19 7" }) }) }),
                        /* @__PURE__ */ jsx("span", { className: `text-[11px] font-bold uppercase tracking-tight transition-colors ${data.permissions.includes(perm.name) ? "text-indigo-700 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`, children: perm.name.replace(/_/g, " ") })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "checkbox",
                          className: "hidden",
                          value: perm.name,
                          checked: data.permissions.includes(perm.name),
                          onChange: handlePermissionChange
                        }
                      )
                    ]
                  },
                  perm.id
                )) })
              ] }, category);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8 transition-all duration-500", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("admin.users.index"),
                className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6",
                children: "Batal & Kembali"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  isEditing ? "Simpan Hak Akses" : "Buat Role Sistem"
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
