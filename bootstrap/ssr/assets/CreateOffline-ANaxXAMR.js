import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DLGa0CGh.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { AlertTriangle, CheckSquare, User, Mail, Phone, Camera, AlertCircle, Contact, ClipboardList, Wifi, WifiOff, FileImage, CheckCircle, Calendar, Package, CreditCard, Clock, Banknote, Shield, Lock, EyeOff, Eye, Save, ChevronLeft, Trash2, Upload } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function Section({ icon: Icon, iconBg, iconColor, title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: `p-3 ${iconBg} ${iconColor} rounded-2xl`, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: title })
    ] }),
    children
  ] });
}
function FileUploadField({ label, hint, onChange, preview, onClear, error, accept = "image/*" }) {
  const inputRef = useRef(null);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: label }),
    preview ? /* @__PURE__ */ jsxs("div", { className: "relative group rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800", children: [
      /* @__PURE__ */ jsx("img", { src: preview, alt: "preview", className: "w-full max-h-52 object-cover" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClear,
          className: "absolute top-2 right-2 p-2 bg-rose-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg",
          children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] }) : /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => inputRef.current?.click(),
        className: "w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all",
        children: [
          /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-gray-300 dark:text-gray-600" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "Klik untuk Unggah" }),
          hint && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300 dark:text-gray-600 font-medium", children: hint })
        ]
      }
    ),
    /* @__PURE__ */ jsx("input", { ref: inputRef, type: "file", accept, className: "hidden", onChange }),
    /* @__PURE__ */ jsx(InputError, { message: error, className: "mt-2" })
  ] });
}
function scheduleLabel(s) {
  const ymd = (s.date ?? "").slice(0, 10);
  const dateStr = ymd ? (/* @__PURE__ */ new Date(ymd + "T12:00:00")).toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  }) : "—";
  const avail = s.quota - (s.confirmed_count ?? 0);
  return `${dateStr} · ${s.start_time?.slice(0, 5)}–${s.end_time?.slice(0, 5)} · ${s.therapist?.name ?? "—"} (${avail} slot)`;
}
function CreateOffline({
  roles,
  severityOptions,
  packageOptions,
  genderOptions,
  schedules,
  bookingPackages
}) {
  const { data, setData, post, processing, errors } = useForm({
    disclaimer_confirmed: false,
    // Identitas
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    // KTP
    ktp_photo: null,
    // Kontak darurat
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
    // Skrining
    screening_type: "online",
    severity_label: "",
    recommended_package: "",
    admin_notes: "",
    is_high_risk: false,
    // Perjanjian
    agreement_signed_offline: false,
    // Booking
    schedule_id: "",
    package_type: "",
    booking_notes: "",
    // Pembayaran
    payment_status: "",
    payment_proof: null,
    payment_method: "Transfer Bank",
    payment_bank: "",
    payment_account_number: "",
    payment_account_name: "",
    // Akun
    password: "",
    password_confirmation: "",
    roles: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const handleFile = (field, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData(field, file);
    previewSetter(URL.createObjectURL(file));
  };
  const clearFile = (field, previewSetter) => {
    setData(field, null);
    previewSetter(null);
  };
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setData("roles", checked ? [...data.roles, value] : data.roles.filter((r) => r !== value));
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.users.store-offline"));
  };
  const hasSchedule = !!data.schedule_id;
  const isPaid = data.payment_status === "paid";
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
              /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.disclaimer_confirmed, onChange: (e) => setData("disclaimer_confirmed", e.target.checked) }),
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${data.disclaimer_confirmed ? "border-white bg-white" : "border-amber-300 dark:border-amber-600"}`, children: data.disclaimer_confirmed && /* @__PURE__ */ jsx(CheckSquare, { className: "w-3.5 h-3.5 text-amber-500" }) }),
              /* @__PURE__ */ jsx("span", { className: `text-xs font-black uppercase tracking-widest ${data.disclaimer_confirmed ? "text-white" : "text-amber-700 dark:text-amber-400"}`, children: "Saya menyatakan bahwa data yang akan dimasukkan adalah data pasien asli dan telah mendapat persetujuannya" })
            ] }),
            /* @__PURE__ */ jsx(InputError, { message: errors.disclaimer_confirmed, className: "mt-3" })
          ] }),
          /* @__PURE__ */ jsx(Section, { icon: User, iconBg: "bg-indigo-50 dark:bg-indigo-900/40", iconColor: "text-indigo-600 dark:text-indigo-400", title: "Informasi Pribadi Pasien", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            [
              { id: "name", label: "Nama Lengkap *", placeholder: "Sesuai KTP/SIM", icon: User, required: true },
              { id: "email", label: "Alamat Email *", placeholder: "email@aktif.com", icon: Mail, type: "email", required: true },
              { id: "phone", label: "Nomor Telepon / WhatsApp", placeholder: "081234567890", icon: Phone }
            ].map(({ id, label, placeholder, icon: Icon, type = "text", required }) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: label }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type,
                    className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                    value: data[id],
                    onChange: (e) => setData(id, e.target.value),
                    placeholder,
                    required
                  }
                ),
                /* @__PURE__ */ jsx(Icon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: errors[id], className: "mt-2" })
            ] }, id)),
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
              /* @__PURE__ */ jsx("div", { className: "flex gap-3 flex-wrap", children: genderOptions.map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 px-5 py-3 rounded-2xl border-2 cursor-pointer transition-all text-[10px] font-black uppercase tracking-widest ${data.gender === opt.value ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "gender", value: opt.value, checked: data.gender === opt.value, onChange: () => setData("gender", opt.value) }),
                opt.label
              ] }, opt.value)) }),
              /* @__PURE__ */ jsx(InputError, { message: errors.gender, className: "mt-2" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Section, { icon: Camera, iconBg: "bg-sky-50 dark:bg-sky-900/40", iconColor: "text-sky-600 dark:text-sky-400", title: "Foto KTP / Identitas", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed", children: "Unggah foto KTP atau identitas resmi pasien (opsional). Format JPG/PNG, maksimal 5 MB." }),
            /* @__PURE__ */ jsx(
              FileUploadField,
              {
                hint: "JPG / PNG · Maks 5 MB",
                preview: ktpPreview,
                onChange: handleFile("ktp_photo", setKtpPreview),
                onClear: () => clearFile("ktp_photo", setKtpPreview),
                error: errors.ktp_photo
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Section, { icon: AlertCircle, iconBg: "bg-rose-50 dark:bg-rose-900/40", iconColor: "text-rose-600 dark:text-rose-400", title: "Kontak Darurat (Opsional)", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Kontak" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_name, onChange: (e) => setData("emergency_contact_name", e.target.value) }),
                /* @__PURE__ */ jsx(Contact, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_phone, onChange: (e) => setData("emergency_contact_phone", e.target.value) }),
                /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hubungan" }),
              /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_relation, onChange: (e) => setData("emergency_contact_relation", e.target.value), placeholder: "Contoh: Orang Tua, Saudara Kandung" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(Section, { icon: ClipboardList, iconBg: "bg-teal-50 dark:bg-teal-900/40", iconColor: "text-teal-600 dark:text-teal-400", title: "Skrining (Screening)", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: "Metode Skrining" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                { value: "online", Icon: Wifi, color: "teal", label: "Skrining Online", desc: "Pasien akan mengisi skrining sendiri setelah login ke akunnya." },
                { value: "manual", Icon: WifiOff, color: "violet", label: "Skrining Manual", desc: "Skrining sudah dilakukan secara langsung. Admin menginput hasil diagnosa." }
              ].map(({ value, Icon, color, label, desc }) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20` : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "screening_type", value, checked: data.screening_type === value, onChange: () => setData("screening_type", value) }),
                /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === value ? "text-white" : `text-${color}-500`}` }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: label }),
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.screening_type === value ? "text-white/80" : "text-gray-400"}`, children: desc })
                ] })
              ] }, value)) })
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
                  /* @__PURE__ */ jsxs("select", { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.severity_label, onChange: (e) => setData("severity_label", e.target.value), children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Tingkat --" }),
                    severityOptions.map((label) => /* @__PURE__ */ jsx("option", { value: label, children: label }, label))
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.severity_label, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                    "Rekomendasi Paket ",
                    /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxs("select", { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.recommended_package, onChange: (e) => setData("recommended_package", e.target.value), children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Paket --" }),
                    packageOptions.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.recommended_package, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Catatan Diagnosa / Komentar Admin" }),
                /* @__PURE__ */ jsx("textarea", { rows: 4, className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none", placeholder: "Tuliskan hasil skrining, temuan, atau catatan diagnosa yang diperoleh dari sesi tatap muka...", value: data.admin_notes, onChange: (e) => setData("admin_notes", e.target.value) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.admin_notes, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.is_high_risk ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.is_high_risk, onChange: (e) => setData("is_high_risk", e.target.checked) }),
                /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.is_high_risk ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.is_high_risk && /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-sm bg-rose-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Pasien Berisiko Tinggi" }),
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.is_high_risk ? "text-white/80" : "text-gray-400"}`, children: "Tandai jika pasien memerlukan penanganan prioritas atau pemantauan khusus" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Section, { icon: FileImage, iconBg: "bg-emerald-50 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", title: "Perjanjian & Persetujuan", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed", children: "Jika pasien telah menandatangani perjanjian layanan secara fisik/offline, centang di bawah ini. Data ini akan dicatat beserta nama admin yang menginput." }),
            /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.agreement_signed_offline, onChange: (e) => setData("agreement_signed_offline", e.target.checked) }),
              /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.agreement_signed_offline && /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Perjanjian Sudah Ditandatangani Offline" }),
                /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? "text-white/80" : "text-gray-400"}`, children: "Pasien telah membaca dan menyetujui S&K layanan secara fisik" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Section, { icon: Calendar, iconBg: "bg-blue-50 dark:bg-blue-900/40", iconColor: "text-blue-600 dark:text-blue-400", title: "Jadwal & Paket Sesi (Opsional)", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed", children: "Isi bagian ini jika pasien sudah memilih jadwal dan paket saat pendaftaran. Kosongkan jika belum." }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Jadwal" }),
              schedules.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 font-medium", children: "Tidak ada jadwal tersedia saat ini" }) : /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                  value: data.schedule_id,
                  onChange: (e) => {
                    setData("schedule_id", e.target.value);
                    if (!e.target.value) {
                      setData("payment_status", "");
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "-- Tidak Ada / Pilih Nanti --" }),
                    schedules.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: scheduleLabel(s) }, s.id))
                  ]
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.schedule_id, className: "mt-2" })
            ] }),
            hasSchedule && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                "Pilih Paket ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: bookingPackages.map((pkg) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.package_type === pkg.slug ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "package_type", value: pkg.slug, checked: data.package_type === pkg.slug, onChange: () => setData("package_type", pkg.slug) }),
                /* @__PURE__ */ jsx(Package, { className: `w-4 h-4 flex-shrink-0 ${data.package_type === pkg.slug ? "text-white" : "text-blue-400"}` }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest truncate ${data.package_type === pkg.slug ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: pkg.name }),
                  /* @__PURE__ */ jsxs("p", { className: `text-[10px] font-medium mt-0.5 ${data.package_type === pkg.slug ? "text-white/80" : "text-gray-400"}`, children: [
                    "Rp ",
                    pkg.price.toLocaleString("id-ID")
                  ] })
                ] })
              ] }, pkg.slug)) }),
              /* @__PURE__ */ jsx(InputError, { message: errors.package_type, className: "mt-2" })
            ] }),
            hasSchedule && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Catatan Booking (Opsional)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none",
                  placeholder: "Catatan khusus untuk terapis atau tim...",
                  value: data.booking_notes,
                  onChange: (e) => setData("booking_notes", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.booking_notes, className: "mt-2" })
            ] })
          ] }) }),
          hasSchedule && /* @__PURE__ */ jsx(Section, { icon: CreditCard, iconBg: "bg-orange-50 dark:bg-orange-900/40", iconColor: "text-orange-600 dark:text-orange-400", title: "Status & Bukti Pembayaran", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: [
                "Status Pembayaran ",
                /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                { value: "pending", Icon: Clock, color: "amber", label: "Belum Dibayar", desc: "Pasien akan melakukan pembayaran nanti. Booking menunggu konfirmasi bayar." },
                { value: "paid", Icon: CheckCircle, color: "emerald", label: "Sudah Dibayar", desc: "Pembayaran sudah diterima secara offline. Booking langsung dikonfirmasi." }
              ].map(({ value, Icon, color, label, desc }) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_status === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20` : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_status", value, checked: data.payment_status === value, onChange: () => setData("payment_status", value) }),
                /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.payment_status === value ? "text-white" : `text-${color}-500`}` }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: label }),
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.payment_status === value ? "text-white/80" : "text-gray-400"}`, children: desc })
                ] })
              ] }, value)) }),
              /* @__PURE__ */ jsx(InputError, { message: errors.payment_status, className: "mt-3" })
            ] }),
            isPaid && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Metode Pembayaran" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.payment_method, onChange: (e) => setData("payment_method", e.target.value), placeholder: "Transfer Bank / Tunai / QRIS" }),
                    /* @__PURE__ */ jsx(CreditCard, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.payment_method, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Bank / Dompet Digital" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.payment_bank, onChange: (e) => setData("payment_bank", e.target.value), placeholder: "BCA / BRI / OVO / dll" }),
                    /* @__PURE__ */ jsx(Banknote, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.payment_bank, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Rekening Pengirim" }),
                  /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.payment_account_number, onChange: (e) => setData("payment_account_number", e.target.value), placeholder: "123456789" }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.payment_account_number, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Pemilik Rekening" }),
                  /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.payment_account_name, onChange: (e) => setData("payment_account_name", e.target.value), placeholder: "Nama sesuai rekening" }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.payment_account_name, className: "mt-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Bukti Transfer (Opsional)" }),
                /* @__PURE__ */ jsx(
                  FileUploadField,
                  {
                    hint: "Foto struk transfer · JPG/PNG · Maks 5 MB",
                    preview: proofPreview,
                    onChange: handleFile("payment_proof", setProofPreview),
                    onClear: () => clearFile("payment_proof", setProofPreview),
                    error: errors.payment_proof
                  }
                )
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Section, { icon: Shield, iconBg: "bg-emerald-50 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", title: "Akun & Keamanan", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed", children: "Buatkan password sementara dan informasikan kepada pasien. Pasien harus menggantinya saat pertama kali login." }),
              [
                { id: "password", label: "Password Sementara *", show: showPassword, toggle: () => setShowPassword((v) => !v) },
                { id: "password_confirmation", label: "Konfirmasi Password", show: showPasswordConfirm, toggle: () => setShowPasswordConfirm((v) => !v) }
              ].map(({ id, label, show, toggle }) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: label }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type: show ? "text" : "password",
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data[id],
                      onChange: (e) => setData(id, e.target.value),
                      autoComplete: "new-password",
                      required: id === "password"
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: toggle, className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] }),
                id === "password" && /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
              ] }, id))
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Hak Akses (Roles)" }),
              /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 space-y-3", children: roles.map((role) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.roles.includes(role.name) ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-200"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", value: role.name, checked: data.roles.includes(role.name), onChange: handleRoleChange }),
                /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.roles.includes(role.name) ? "border-white bg-white" : "border-gray-300"}`, children: data.roles.includes(role.name) && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-600" }) }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: role.name.replace(/_/g, " ") })
              ] }, role.id)) }),
              /* @__PURE__ */ jsx(InputError, { message: errors.roles, className: "mt-2" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.users.index"), className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6", children: "Batal & Kembali" }),
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
