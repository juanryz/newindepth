import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DSi5ya3j.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { AlertTriangle, CheckSquare, User, Mail, Phone, AlertCircle, Contact, ClipboardList, Wifi, WifiOff, Shield, Lock, EyeOff, Eye, Save, ChevronLeft } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function CreateOffline({ roles, severityOptions, packageOptions, genderOptions }) {
  const { data, setData, post, processing, errors } = useForm({
    disclaimer_confirmed: false,
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
    password: "",
    password_confirmation: "",
    roles: [],
    screening_type: "online",
    severity_label: "",
    recommended_package: "",
    admin_notes: "",
    is_high_risk: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData("roles", [...data.roles, value]);
    } else {
      setData("roles", data.roles.filter((r) => r !== value));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.users.store-offline"));
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
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: "Tambah User Offline" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: "Pendaftaran Pasien yang Datang Langsung (Walk-in)" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tambah User Offline" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 dark:bg-amber-950/30 rounded-[2.5rem] p-8 border-2 border-amber-200 dark:border-amber-800 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex-shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-amber-800 dark:text-amber-300 uppercase tracking-[0.2em] mb-2", children: "Pernyataan & Disclaimer Penting" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed", children: "Fitur ini digunakan untuk mendaftarkan pasien yang datang secara langsung (walk-in/offline)." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 rounded-[1.5rem] p-6 border border-amber-100 dark:border-amber-800/50 space-y-3 mb-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight mb-3", children: "Admin wajib memastikan:" }),
              [
                "Data yang dimasukkan adalah data asli pasien — bukan data fiktif, palsu, atau percobaan.",
                "Nama, email, dan nomor telepon sesuai identitas resmi pasien (KTP/SIM).",
                "Pasien telah memberikan persetujuan atas pendaftaran dan penggunaan datanya.",
                "Password yang dibuat harus diberitahukan kepada pasien dan segera diubah saat pertama login.",
                "Admin bertanggung jawab penuh atas kebenaran data yang diinput."
              ].map((point, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black", children: i + 1 }) }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed", children: point })
              ] }, i))
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.disclaimer_confirmed ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800 hover:border-amber-400"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "hidden",
                  checked: data.disclaimer_confirmed,
                  onChange: (e) => setData("disclaimer_confirmed", e.target.checked)
                }
              ),
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${data.disclaimer_confirmed ? "border-white bg-white" : "border-amber-300 dark:border-amber-600"}`, children: data.disclaimer_confirmed && /* @__PURE__ */ jsx(CheckSquare, { className: "w-3.5 h-3.5 text-amber-500" }) }),
              /* @__PURE__ */ jsx("span", { className: `text-xs font-black uppercase tracking-widest ${data.disclaimer_confirmed ? "text-white" : "text-amber-700 dark:text-amber-400"}`, children: "Saya menyatakan bahwa data yang akan dimasukkan adalah data pasien asli dan telah mendapat persetujuannya" })
            ] }),
            /* @__PURE__ */ jsx(InputError, { message: errors.disclaimer_confirmed, className: "mt-3" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Informasi Pribadi Pasien" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Nama Lengkap ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      placeholder: "Sesuai KTP/SIM",
                      required: true
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
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon / WhatsApp" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value),
                      placeholder: "Contoh: 081234567890"
                    }
                  ),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Usia" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "number",
                    min: "1",
                    max: "120",
                    className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                    value: data.age,
                    onChange: (e) => setData("age", e.target.value),
                    placeholder: "Tahun"
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.age, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Jenis Kelamin" }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: genderOptions.map((opt) => /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: `flex items-center gap-2 px-5 py-3 rounded-2xl border-2 cursor-pointer transition-all text-[10px] font-black uppercase tracking-widest ${data.gender === opt.value ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-300"}`,
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "radio",
                          className: "hidden",
                          name: "gender",
                          value: opt.value,
                          checked: data.gender === opt.value,
                          onChange: () => setData("gender", opt.value)
                        }
                      ),
                      opt.label
                    ]
                  },
                  opt.value
                )) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.gender, className: "mt-2" })
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
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Kontak" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.emergency_contact_name,
                      onChange: (e) => setData("emergency_contact_name", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(Contact, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.emergency_contact_phone,
                      onChange: (e) => setData("emergency_contact_phone", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hubungan" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
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
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl", children: /* @__PURE__ */ jsx(ClipboardList, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Skrining (Screening)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: "Metode Skrining" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === "online" ? "bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-teal-300"}`, children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      className: "hidden",
                      name: "screening_type",
                      value: "online",
                      checked: data.screening_type === "online",
                      onChange: () => setData("screening_type", "online")
                    }
                  ),
                  /* @__PURE__ */ jsx(Wifi, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === "online" ? "text-white" : "text-teal-500"}` }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: "Skrining Online" }),
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.screening_type === "online" ? "text-white/80" : "text-gray-400"}`, children: "Pasien akan mengisi skrining sendiri setelah login ke akunnya." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === "manual" ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-300"}`, children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      className: "hidden",
                      name: "screening_type",
                      value: "manual",
                      checked: data.screening_type === "manual",
                      onChange: () => setData("screening_type", "manual")
                    }
                  ),
                  /* @__PURE__ */ jsx(WifiOff, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === "manual" ? "text-white" : "text-violet-500"}` }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: "Skrining Manual" }),
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.screening_type === "manual" ? "text-white/80" : "text-gray-400"}`, children: "Skrining sudah dilakukan secara langsung. Admin menginput hasil diagnosa." })
                  ] })
                ] })
              ] })
            ] }),
            data.screening_type === "online" && /* @__PURE__ */ jsxs("div", { className: "p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-100 dark:border-teal-900/50 flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Wifi, { className: "w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-teal-700 dark:text-teal-400 font-medium leading-relaxed", children: "Pasien perlu menyelesaikan skrining online melalui akunnya setelah login pertama kali. Pastikan pasien mengetahui hal ini sebelum meninggalkan klinik." })
            ] }),
            data.screening_type === "manual" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                    "Tingkat Keparahan ",
                    /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.severity_label,
                      onChange: (e) => setData("severity_label", e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Tingkat --" }),
                        severityOptions.map((label) => /* @__PURE__ */ jsx("option", { value: label, children: label }, label))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.severity_label, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                    "Rekomendasi Paket ",
                    /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data.recommended_package,
                      onChange: (e) => setData("recommended_package", e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Paket --" }),
                        packageOptions.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.recommended_package, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Catatan Diagnosa / Komentar Admin" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    rows: 4,
                    className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none",
                    placeholder: "Tuliskan hasil skrining, temuan, atau catatan diagnosa yang diperoleh dari sesi tatap muka...",
                    value: data.admin_notes,
                    onChange: (e) => setData("admin_notes", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.admin_notes, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.is_high_risk ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300"}`, children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "hidden",
                    checked: data.is_high_risk,
                    onChange: (e) => setData("is_high_risk", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.is_high_risk ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.is_high_risk && /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-sm bg-rose-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Pasien Berisiko Tinggi" }),
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.is_high_risk ? "text-white/80" : "text-gray-400"}`, children: "Tandai jika pasien memerlukan penanganan prioritas atau pemantauan khusus" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl", children: /* @__PURE__ */ jsx(Shield, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Akun & Keamanan" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsx("div", { className: "p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed", children: "Buatkan password sementara dan informasikan kepada pasien. Pasien harus menggantinya saat pertama kali login." }),
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
                disabled: processing || !data.disclaimer_confirmed,
                className: "flex items-center gap-3 px-8 py-4 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  "Daftarkan Pasien Offline"
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
  CreateOffline as default
};
