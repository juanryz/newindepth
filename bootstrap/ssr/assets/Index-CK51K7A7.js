import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function RolesIndex({ roles }) {
  const { flash } = usePage().props;
  const { delete: destroy } = useForm();
  const handleDelete = (id, name) => {
    if (name === "super_admin") {
      alert("Super Admin tidak bisa dihapus!");
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus role ${name}?`)) {
      destroy(route("admin.roles.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen Roles" }),
    /* @__PURE__ */ jsx(Link, { href: route("admin.roles.create"), className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150", children: "Tambah Role Baru" })
  ] }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Manajemen Roles" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
      flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/40 dark:text-green-400", children: flash.success }),
      flash.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/40 dark:text-red-400", children: flash.error }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4", children: "Nama Role" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Hak Akses (Permissions)" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/6", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: [
          roles.map((role) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsx("span", { className: "capitalize", children: role.name.replace("_", " ") }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
              role.permissions.map((perm) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 inline-flex text-xs font-medium rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300", children: perm.name }, perm.id)),
              role.permissions.length === 0 && /* @__PURE__ */ jsx("span", { className: "italic text-gray-400", children: "Tak ada permission khusus" })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3", children: [
              /* @__PURE__ */ jsx(Link, { href: route("admin.roles.edit", role.id), className: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300", children: "Edit" }),
              role.name !== "super_admin" && /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(role.id, role.name), className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300", children: "Hapus" })
            ] })
          ] }, role.id)),
          roles.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-6 py-4 text-center text-sm text-gray-500", children: "Belum ada role." }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  RolesIndex as default
};
