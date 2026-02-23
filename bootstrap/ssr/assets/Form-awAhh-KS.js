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
function UsersForm({ userModel, roles, userRoles }) {
  const isEditing = !!userModel.id;
  const { data, setData, post, put, processing, errors } = useForm({
    name: userModel.name || "",
    email: userModel.email || "",
    phone: userModel.phone || "",
    emergency_contact_name: userModel.emergency_contact_name || "",
    emergency_contact_phone: userModel.emergency_contact_phone || "",
    emergency_contact_relation: userModel.emergency_contact_relation || "",
    password: "",
    password_confirmation: "",
    roles: userRoles || []
  });
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData("roles", [...data.roles, value]);
    } else {
      setData("roles", data.roles.filter((role) => role !== value));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      put(route("admin.users.update", userModel.id));
    } else {
      post(route("admin.users.store"));
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: isEditing ? "Edit User" : "Tambah User Baru" }), children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit User" : "Tambah User" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Nama Lengkap" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "name",
              type: "text",
              name: "name",
              value: data.name,
              className: "mt-1 block w-full",
              autoComplete: "name",
              isFocused: true,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "email",
              type: "email",
              name: "email",
              value: data.email,
              className: "mt-1 block w-full",
              autoComplete: "username",
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Nomor Telepon/WA" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "phone",
            type: "text",
            name: "phone",
            value: data.phone,
            className: "mt-1 block w-full",
            placeholder: "08xxxxxxxx",
            onChange: (e) => setData("phone", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
          "Kontak Darurat (Optional)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_name", value: "Nama Kontak Darurat" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "emergency_contact_name",
                type: "text",
                value: data.emergency_contact_name,
                className: "mt-1 block w-full",
                onChange: (e) => setData("emergency_contact_name", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_phone", value: "Nomor Kontak Darurat" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "emergency_contact_phone",
                type: "text",
                value: data.emergency_contact_phone,
                className: "mt-1 block w-full",
                onChange: (e) => setData("emergency_contact_phone", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_relation", value: "Hubungan (Misal: Orang Tua, Pasangan)" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "emergency_contact_relation",
                type: "text",
                value: data.emergency_contact_relation,
                className: "mt-1 block w-full",
                onChange: (e) => setData("emergency_contact_relation", e.target.value)
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-4", children: "Keamanan" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: isEditing ? "Password Baru (Kosongkan jika tidak diubah)" : "Password" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password",
                type: "password",
                name: "password",
                value: data.password,
                className: "mt-1 block w-full",
                autoComplete: "new-password",
                onChange: (e) => setData("password", e.target.value),
                required: !isEditing
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Konfirmasi Password" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "password_confirmation",
                type: "password",
                name: "password_confirmation",
                value: data.password_confirmation,
                className: "mt-1 block w-full",
                autoComplete: "new-password",
                onChange: (e) => setData("password_confirmation", e.target.value),
                required: !isEditing && data.password !== ""
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(InputLabel, { value: "Akses & Roles (Role)" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600", children: roles.map((role) => /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "roles[]",
              value: role.name,
              checked: data.roles.includes(role.name),
              onChange: handleRoleChange,
              className: "rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300 capitalize", children: role.name.replace("_", " ") })
        ] }, role.id)) }),
        /* @__PURE__ */ jsx(InputError, { message: errors.roles, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4 space-x-3 gap-3", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.users.index"), className: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Batal" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: isEditing ? "Simpan Perubahan" : "Buat User" })
      ] })
    ] }) }) }) })
  ] });
}
export {
  UsersForm as default
};
