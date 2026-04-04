import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Info, Users, User, Mail, Lock, EyeOff, Eye, CheckCircle, ChevronLeft } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function AddMember({ group }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.group-bookings.members.store", group.id));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.group-bookings.show", group.id),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: "Tambah Anggota" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1", children: [
            "Grup: ",
            group.group_name
          ] })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tambah Anggota Grup" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-indigo-700 dark:text-indigo-400 font-medium leading-relaxed", children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wide mb-1", children: "Alur Pendaftaran Anggota" }),
              /* @__PURE__ */ jsxs("ol", { className: "list-decimal ml-4 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "Isi nama & email anggota → akun dibuat otomatis" }),
                /* @__PURE__ */ jsxs("li", { children: [
                  "Admin klik ",
                  /* @__PURE__ */ jsx("strong", { children: '"Lengkapi Profil"' }),
                  " untuk mengisi data kesehatan (8 step)"
                ] }),
                /* @__PURE__ */ jsx("li", { children: "Jadwal sesi diatur di level grup melalui halaman detail grup" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
                /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Data Dasar Anggota" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium mt-0.5", children: "Informasi utama untuk membuat akun" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Nama Lengkap ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      placeholder: "Sesuai KTP / Dokumen Resmi",
                      required: true,
                      autoFocus: true
                    }
                  ),
                  /* @__PURE__ */ jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Alamat Email ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "email",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      placeholder: "email@aktif.com",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Password Sementara ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: showPassword ? "text" : "password",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      autoComplete: "new-password",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600", children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Konfirmasi Password" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: showPasswordConfirm ? "text" : "password",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.password_confirmation,
                      onChange: (e) => setData("password_confirmation", e.target.value),
                      autoComplete: "new-password"
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPasswordConfirm((v) => !v), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600", children: showPasswordConfirm ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30 text-xs text-amber-700 dark:text-amber-400 font-medium flex items-start gap-3 mt-4", children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" }),
              "Setelah ditambahkan, lengkapi profil kesehatan anggota melalui tombol ",
              /* @__PURE__ */ jsx("strong", { children: '"Lengkapi Profil"' }),
              " di tabel anggota."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 mt-4", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("admin.group-bookings.show", group.id),
                  className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6",
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                  children: [
                    /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
                    "Tambahkan ke Grup"
                  ]
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AddMember as default
};
