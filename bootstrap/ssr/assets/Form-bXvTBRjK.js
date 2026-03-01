import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Cjm5hTBB.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { User, Mail, Phone, AlertCircle, Contact, Shield, Lock, EyeOff, Eye, Save, ChevronLeft } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
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
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: isEditing ? "Perbarui Profil Pengguna" : "Tambah Pengguna Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: isEditing ? `Mengelola Akun: ${userModel.name}` : "Mendaftarkan Anggota Tim Atau Pasien Baru" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit User" : "Tambah User" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Informasi Pribadi" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Lengkap" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "name",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Alamat Email" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "email",
                      type: "email",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon / WhatsApp" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "phone",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value),
                      placeholder: "Contoh: 081234567890"
                    }
                  ),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl", children: /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Kontak Darurat (Opsional)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_name", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Kontak" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "emergency_contact_name",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.emergency_contact_name,
                      onChange: (e) => setData("emergency_contact_name", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(Contact, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_phone", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "emergency_contact_phone",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.emergency_contact_phone,
                      onChange: (e) => setData("emergency_contact_phone", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_relation", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hubungan" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "emergency_contact_relation",
                    className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                    value: data.emergency_contact_relation,
                    onChange: (e) => setData("emergency_contact_relation", e.target.value),
                    placeholder: "Contoh: Orang Tua, Saudara Kandung, Teman"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Keamanan & Akses" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: isEditing ? "Ubah Kata Sandi (Opsional)" : "Kata Sandi" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "password",
                        type: showPassword ? "text" : "password",
                        className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all transition-all",
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                        autoComplete: "new-password"
                      }
                    ),
                    /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowPassword(!showPassword),
                        className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none",
                        children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Konfirmasi Kata Sandi" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      TextInput,
                      {
                        id: "password_confirmation",
                        type: showPasswordConfirm ? "text" : "password",
                        className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                        value: data.password_confirmation,
                        onChange: (e) => setData("password_confirmation", e.target.value),
                        autoComplete: "new-password"
                      }
                    ),
                    /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowPasswordConfirm(!showPasswordConfirm),
                        className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none",
                        children: showPasswordConfirm ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Hak Akses (Roles)" }),
                /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 space-y-3", children: roles.map((role) => /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: `flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.roles.includes(role.name) ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-200"}`,
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "checkbox",
                          className: "hidden",
                          value: role.name,
                          checked: data.roles.includes(role.name),
                          onChange: handleRoleChange
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.roles.includes(role.name) ? "border-white bg-white" : "border-gray-300"}`, children: data.roles.includes(role.name) && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-600" }) }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: role.name.replace(/_/g, " ") })
                    ]
                  },
                  role.id
                )) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.roles, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
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
                  isEditing ? "Simpan Perubahan" : "Daftarkan Pengguna"
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
  UsersForm as default
};
