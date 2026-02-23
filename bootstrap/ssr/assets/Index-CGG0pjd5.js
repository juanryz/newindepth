import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function UsersIndex({ users, filters }) {
  const { flash } = usePage().props;
  const { delete: destroy } = useForm();
  const { data, setData, get } = useForm({
    search: filters.search || ""
  });
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      destroy(route("admin.users.destroy", id), {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    get(route("admin.users.index"), {
      preserveState: true,
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen User" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Manajemen User" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
      flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/40 dark:text-green-400", children: flash.success }),
      flash.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/40 dark:text-red-400", children: flash.error }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow sm:rounded-lg", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSearch, className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
              placeholder: "Cari nama/email...",
              value: data.search,
              onChange: (e) => setData("search", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 transition-colors", children: "Cari" })
        ] }),
        /* @__PURE__ */ jsx(Link, { href: route("admin.users.create"), className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150", children: "Tambah User Baru" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100 overflow-x-auto", children: [
        /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Nama" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Email" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Roles" }),
            /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: user.name }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: user.email }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
              user.roles.map((role) => /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: role.name }, role.id)),
              user.roles.length === 0 && /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "No Roles" })
            ] }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3", children: [
              /* @__PURE__ */ jsx(Link, { href: route("admin.users.show", user.id), className: "text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300", children: "Lihat" }),
              /* @__PURE__ */ jsx(Link, { href: route("admin.users.edit", user.id), className: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300", children: "Edit" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleDelete(user.id), className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300", children: "Hapus" })
            ] })
          ] }, user.id)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-1 flex-wrap", children: users.links.map((link, index) => link.url ? /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url,
            className: `px-3 py-1 border rounded text-sm ${link.active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"}`,
            dangerouslySetInnerHTML: { __html: link.label }
          },
          index
        ) : /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-3 py-1 border rounded text-sm opacity-50 cursor-not-allowed bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
            dangerouslySetInnerHTML: { __html: link.label }
          },
          index
        )) })
      ] }) })
    ] }) })
  ] });
}
export {
  UsersIndex as default
};
