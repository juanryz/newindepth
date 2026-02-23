import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
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
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData("permissions", [...data.permissions, value]);
    } else {
      setData("permissions", data.permissions.filter((perm) => perm !== value));
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
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: isEditing ? "Edit Role" : "Tambah Role Baru" }), children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Role" : "Tambah Role" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Nama Role (Tanpa spasi, gunakan underscore jika perlu)" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            type: "text",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full bg-gray-50 focus:bg-white",
            autoComplete: "off",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value.toLowerCase().replace(/\s+/g, "_")),
            placeholder: "contoh: super_admin, kasir, manager",
            required: true,
            disabled: roleModel.name === "super_admin"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" }),
        roleModel.name === "super_admin" && /* @__PURE__ */ jsx("p", { className: "text-sm text-yellow-600 mt-1", children: "Nama role super_admin tidak bisa diubah karena merupakan role sistem krusial." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { value: "Hak Akses (Permissions)" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600", children: permissions.length > 0 ? permissions.map((perm) => /* @__PURE__ */ jsxs("label", { className: "flex items-start space-x-2 cursor-pointer p-2 rounded hover:bg-white dark:hover:bg-gray-600 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-500", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "permissions[]",
              value: perm.name,
              checked: data.permissions.includes(perm.name),
              onChange: handlePermissionChange,
              className: "mt-0.5 rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300 font-medium break-words leading-tight", children: perm.name })
        ] }, perm.id)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 col-span-full", children: "Belum ada permission yang terdaftar di database." }) }),
        /* @__PURE__ */ jsx(InputError, { message: errors.permissions, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4 space-x-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.roles.index"), className: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Batal" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: isEditing ? "Simpan Perubahan" : "Buat Role" })
      ] })
    ] }) }) }) })
  ] });
}
export {
  RolesForm as default
};
