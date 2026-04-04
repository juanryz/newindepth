import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { Users, Mail, Phone, MapPin, Lock, EyeOff, Eye, FileText, Save, ChevronLeft } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function GroupBookingsCreate({ group }) {
  const isEditing = !!group;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    group_name: group?.group_name || "",
    email: group?.email || "",
    phone: group?.phone || "",
    address: group?.address || "",
    password: "",
    password_confirmation: "",
    notes: group?.notes || ""
  });
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      router.post(route("admin.group-bookings.update", group.id), {
        ...data,
        _method: "PUT"
      });
    } else {
      post(route("admin.group-bookings.store"));
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.users.index", { tab: "groups" }),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: isEditing ? "Edit Data Grup" : "Buat Grup Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: isEditing ? "Perbarui informasi dasar grup" : "Isi data grup — jadwal diatur di halaman detail" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Grup" : "Buat Grup Baru" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 text-indigo-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-wide", children: "Panduan Grup Booking" }),
              /* @__PURE__ */ jsxs("ol", { className: "text-xs text-indigo-700 dark:text-indigo-400 font-medium mt-2 leading-relaxed list-decimal ml-4 space-y-1", children: [
                /* @__PURE__ */ jsx("li", { children: "Isi data grup (nama, email, nomor telepon, alamat) → Simpan" }),
                /* @__PURE__ */ jsx("li", { children: "Di halaman detail: tambah anggota satu per satu" }),
                /* @__PURE__ */ jsx("li", { children: "Pilih jadwal sesi grup" }),
                /* @__PURE__ */ jsx("li", { children: "Setiap anggota login & bayar secara mandiri (8 langkah seperti pengguna individual)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Informasi Grup" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium mt-0.5", children: "Data identitas dan kontak grup" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Grup *" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.group_name,
                      onChange: (e) => setData("group_name", e.target.value),
                      placeholder: "cth: Komunitas Sehat PKBI Jakarta",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(Users, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.group_name, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Email Grup * ",
                  /* @__PURE__ */ jsx("span", { className: "normal-case text-gray-400 font-normal", children: "(digunakan untuk login)" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "email",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      placeholder: "grup@email.com",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: "text",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value),
                      placeholder: "08xxx"
                    }
                  ),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Alamat Lengkap" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all resize-none",
                      value: data.address,
                      onChange: (e) => setData("address", e.target.value),
                      placeholder: "Alamat lengkap grup/institusi..."
                    }
                  ),
                  /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-4 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-2xl", children: /* @__PURE__ */ jsx(Lock, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: isEditing ? "Ubah Password (Opsional)" : "Password Login Grup *" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium mt-0.5", children: isEditing ? "Kosongkan jika tidak ingin mengubah password" : "Grup dapat login menggunakan email & password ini" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Password ",
                  !isEditing && "*"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: showPassword ? "text" : "password",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      placeholder: "Minimal 8 karakter",
                      required: !isEditing
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors",
                      children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Konfirmasi Password ",
                  !isEditing && "*"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: showConfirm ? "text" : "password",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.password_confirmation,
                      onChange: (e) => setData("password_confirmation", e.target.value),
                      placeholder: "Ulangi password",
                      required: !isEditing
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirm(!showConfirm),
                      className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors",
                      children: showConfirm ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Catatan (Opsional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none",
                placeholder: "Catatan khusus untuk grup ini...",
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.users.index", { tab: "groups" }), className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6", children: "Batal" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  isEditing ? "Simpan Perubahan" : "Buat Grup & Lanjutkan"
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
  GroupBookingsCreate as default
};
