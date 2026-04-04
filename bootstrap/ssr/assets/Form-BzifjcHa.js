import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { CheckCircle, AlertCircle, User, Mail, Phone, Camera, Contact, ClipboardList, Wifi, WifiOff, FileImage, Calendar, Users, Package, Save, Shield, Clock, Banknote, AlertTriangle, Eye, Lock, EyeOff, ChevronLeft, Trash2, Upload } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InvoiceModal } from "./InvoiceModal-CDa-xh4A.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
import "react-dom";
function Section({ icon: Icon, iconBg, iconColor, title, subtitle, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: `p-3 ${iconBg} ${iconColor} rounded-2xl`, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium mt-0.5", children: subtitle })
      ] })
    ] }),
    children
  ] });
}
function FileUploadField({ label, hint, onChange, preview, onClear, error, existingUrl }) {
  const inputRef = useRef(null);
  const hasImage = preview || existingUrl;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: label }),
    hasImage ? /* @__PURE__ */ jsxs("div", { className: "relative group rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800", children: [
      /* @__PURE__ */ jsx("img", { src: preview || existingUrl, alt: "preview", className: "w-full max-h-52 object-cover" }),
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
    /* @__PURE__ */ jsx("input", { ref: inputRef, type: "file", accept: "image/*", className: "hidden", onChange }),
    /* @__PURE__ */ jsx(InputError, { message: error, className: "mt-2" })
  ] });
}
function scheduleLabel(s) {
  const ymd = (s.date ?? "").slice(0, 10);
  const dateStr = ymd ? (/* @__PURE__ */ new Date(ymd + "T12:00:00")).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "—";
  const avail = (s.quota ?? 0) - (s.confirmed_count ?? 0);
  return `${dateStr} · ${s.start_time?.slice(0, 5) ?? ""}–${s.end_time?.slice(0, 5) ?? ""} · ${s.therapist?.name ?? "—"} (${avail} slot)`;
}
const getSteps = (isGroupMember) => {
  const steps = [
    { num: 1, label: "Identitas" },
    { num: 2, label: "KTP" },
    { num: 3, label: "Kontak Darurat" },
    { num: 4, label: "Skrining" },
    { num: 5, label: "Perjanjian" },
    { num: 6, label: "Jadwal" }
  ];
  if (isGroupMember) {
    steps.push({ num: 7, label: "Pembayaran" });
    steps.push({ num: 8, label: "Akun & Akses" });
  } else {
    steps.push({ num: 7, label: "Akun & Akses" });
  }
  return steps;
};
function UsersForm({
  userModel,
  roles,
  userRoles,
  severityOptions = [],
  packageOptions = [],
  genderOptions = [],
  schedules = [],
  bookingPackages = [],
  screeningResult = null,
  groupMemberInfo = null,
  activeBooking = null,
  bankAccounts = []
}) {
  const isEditing = !!userModel?.id;
  const isGroupMember = !!groupMemberInfo;
  const { flash } = usePage().props;
  const [showInvoice, setShowInvoice] = useState(false);
  const STEPS = getSteps(isGroupMember);
  const { data, setData, post, put, processing, errors } = useForm({
    // Identitas
    name: userModel?.name ?? "",
    email: userModel?.email ?? "",
    phone: userModel?.phone ?? "",
    age: userModel?.age ?? "",
    gender: userModel?.gender ?? "",
    // KTP
    ktp_photo: null,
    // Kontak darurat
    emergency_contact_name: userModel?.emergency_contact_name ?? "",
    emergency_contact_phone: userModel?.emergency_contact_phone ?? "",
    emergency_contact_relation: userModel?.emergency_contact_relation ?? "",
    // Skrining
    screening_type: screeningResult ? "manual" : "online",
    severity_label: screeningResult?.severity_label ?? "",
    recommended_package: screeningResult?.recommended_package ?? "",
    admin_notes: screeningResult?.admin_notes ?? "",
    is_high_risk: screeningResult?.is_high_risk ?? false,
    // Perjanjian
    agreement_signed_offline: userModel?.agreement_signed ?? false,
    // Jadwal - edit tidak assign jadwal baru lewat sini (lihat booking)
    // Jadwal
    schedule_id: groupMemberInfo?.group_booking?.schedule_id ?? "",
    package_type: groupMemberInfo?.package_type || groupMemberInfo?.group_booking?.package_type || "",
    booking_notes: "",
    // Pembayaran
    payment_method: "Transfer Bank",
    payment_status: activeBooking?.transaction?.status === "paid" ? "paid" : "pending",
    payment_bank: "",
    payment_account_number: "",
    payment_account_name: "",
    payment_proof: null,
    // Akun & Password
    password: "",
    password_confirmation: "",
    roles: userRoles ?? []
  });
  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);
  const [ktpPreview, setKtpPreview] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData("ktp_photo", file);
    setKtpPreview(URL.createObjectURL(file));
  };
  const [proofPreview, setProofPreview] = useState(null);
  const handleProof = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData("payment_proof", file);
    setProofPreview(URL.createObjectURL(file));
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      router.post(route("admin.users.update", userModel.id), {
        ...data,
        _method: "PUT"
      }, {
        forceFormData: true,
        onSuccess: () => {
        }
      });
    } else {
      post(route("admin.users.store"));
    }
  };
  const hasSchedule = !!data.schedule_id;
  const ktpUrl = userModel?.ktp_photo_url ?? null;
  const backHref = isEditing ? route("admin.users.show", userModel.id) : route("admin.users.index");
  const selectedPkg = bookingPackages.find((p) => p.slug === data.package_type);
  const packagePrice = selectedPkg?.price ?? 0;
  const getInvoiceData = () => {
    if (!activeBooking) return null;
    return {
      invoice_number: activeBooking.transaction?.invoice_number ?? "INV-",
      booking_code: activeBooking.booking_code,
      patient_name: userModel?.name,
      patient_email: userModel?.email,
      patient_phone: userModel?.phone,
      package_name: selectedPkg?.name ?? (activeBooking.package_type || "Custom"),
      session_type: activeBooking.session_type || "offline",
      amount: activeBooking.transaction?.amount ?? packagePrice,
      payment_status: activeBooking.transaction?.status ?? "pending",
      schedule: activeBooking.schedule ? {
        date: activeBooking.schedule.date,
        start_time: activeBooking.schedule.start_time,
        therapist: activeBooking.schedule.therapist?.name || activeBooking.therapist?.name || "-"
      } : null,
      group_name: groupMemberInfo?.group_booking?.group_name,
      created_at: activeBooking.created_at
    };
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: backHref,
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: isEditing ? "Lengkapi / Edit Profil Pasien" : "Tambah Pengguna Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: isEditing ? `Mengelola: ${userModel.name}` : "Daftarkan pengguna baru ke sistem" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? `Edit: ${userModel?.name}` : "Tambah User" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: [
          flash?.success && /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 flex-shrink-0" }),
            flash.success
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, encType: "multipart/form-data", className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 space-y-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 flex-shrink-0" }),
                "Pernyataan & Disclaimer Penting"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400 font-medium pb-2 border-b border-gray-100 dark:border-gray-800", children: "Fitur ini digunakan untuk mendaftarkan pasien yang datang secara langsung (walk-in/offline). Admin wajib memastikan:" }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-black", children: "1" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Data yang dimasukkan adalah ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white", children: "data asli pasien" }),
                    " — bukan data fiktif, palsu, atau percobaan."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-black", children: "2" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Nama, email, dan nomor telepon ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white", children: "sesuai identitas resmi" }),
                    " pasien (KTP/SIM)."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-black", children: "3" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Pasien telah memberikan ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white", children: "persetujuan" }),
                    " atas pendaftaran dan penggunaan datanya."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-black", children: "4" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Password yang dibuat harus diberitahukan kepada pasien dan ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white", children: "segera diubah" }),
                    " saat pertama login."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-xs text-gray-600 dark:text-gray-300 font-medium", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0 font-black", children: "5" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    "Admin bertanggung jawab penuh atas ",
                    /* @__PURE__ */ jsx("strong", { className: "text-gray-900 dark:text-white", children: "kebenaran data" }),
                    " yang diinput."
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-100 dark:border-rose-900/30", children: /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-4 cursor-pointer p-4 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30 hover:bg-rose-50 transition-colors", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", className: "mt-1 rounded border-gray-300 text-rose-600 shadow-sm focus:ring-rose-500" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-rose-700 dark:text-rose-400 leading-snug", children: "Saya menyatakan bahwa data yang akan dimasukkan adalah data pasien asli dan telah mendapat persetujuannya." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx(Section, { icon: User, iconBg: "bg-indigo-50 dark:bg-indigo-900/40", iconColor: "text-indigo-600 dark:text-indigo-400", title: "Identitas Pasien", subtitle: "Step 1 — Data diri utama", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              [
                { id: "name", label: "Nama Lengkap *", placeholder: "Sesuai KTP/SIM", icon: User, type: "text", required: true },
                { id: "email", label: "Alamat Email *", placeholder: "email@aktif.com", icon: Mail, type: "email", required: true },
                { id: "phone", label: "Nomor Telepon / WhatsApp", placeholder: "081234567890", icon: Phone, type: "text" }
              ].map(({ id, label, placeholder, icon: Icon, type, required }) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
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
            /* @__PURE__ */ jsxs(Section, { icon: Camera, iconBg: "bg-sky-50 dark:bg-sky-900/40", iconColor: "text-sky-600 dark:text-sky-400", title: "Foto KTP / Identitas", subtitle: "Step 2 — Dokumen resmi (opsional)", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4", children: [
                "Unggah foto KTP atau identitas resmi pasien. Format JPG/PNG, maks. 5 MB.",
                isEditing && ktpUrl && " (Foto KTP sudah ada — unggah ulang untuk mengganti)"
              ] }),
              /* @__PURE__ */ jsx(
                FileUploadField,
                {
                  hint: "JPG / PNG · Maks 5 MB",
                  preview: ktpPreview,
                  existingUrl: ktpUrl,
                  onChange: handleFile,
                  onClear: () => {
                    setData("ktp_photo", null);
                    setKtpPreview(null);
                  },
                  error: errors.ktp_photo
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Section, { icon: AlertCircle, iconBg: "bg-rose-50 dark:bg-rose-900/40", iconColor: "text-rose-600 dark:text-rose-400", title: "Kontak Darurat", subtitle: "Step 3 — Opsional", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Kontak" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_name, onChange: (e) => setData("emergency_contact_name", e.target.value), placeholder: "Nama orang terdekat" }),
                  /* @__PURE__ */ jsx(Contact, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_phone, onChange: (e) => setData("emergency_contact_phone", e.target.value), placeholder: "081234567890" }),
                  /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:col-span-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hubungan" }),
                /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.emergency_contact_relation, onChange: (e) => setData("emergency_contact_relation", e.target.value), placeholder: "Contoh: Orang Tua, Saudara, Pasangan" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs(Section, { icon: ClipboardList, iconBg: "bg-teal-50 dark:bg-teal-900/40", iconColor: "text-teal-600 dark:text-teal-400", title: "Skrining (Screening)", subtitle: "Step 4 — Hasil asesmen kesehatan mental", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: "Metode Skrining" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  { value: "online", Icon: Wifi, color: "teal", label: "Skrining Online", desc: "Pasien mengisi sendiri setelah login." },
                  { value: "manual", Icon: WifiOff, color: "violet", label: "Skrining Manual", desc: "Admin input hasil diagnosa langsung." }
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
                /* @__PURE__ */ jsx("p", { className: "text-xs text-teal-700 dark:text-teal-400 font-medium leading-relaxed", children: "Pasien perlu menyelesaikan skrining online melalui akunnya setelah login pertama kali." })
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
                  /* @__PURE__ */ jsx("textarea", { rows: 4, className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none", placeholder: "Tuliskan hasil skrining atau catatan diagnosa...", value: data.admin_notes, onChange: (e) => setData("admin_notes", e.target.value) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.admin_notes, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.is_high_risk ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.is_high_risk, onChange: (e) => setData("is_high_risk", e.target.checked) }),
                  /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.is_high_risk ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.is_high_risk && /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-sm bg-rose-600" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Pasien Berisiko Tinggi" }),
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.is_high_risk ? "text-white/80" : "text-gray-400"}`, children: "Tandai jika memerlukan penanganan prioritas" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Section, { icon: FileImage, iconBg: "bg-emerald-50 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", title: "Perjanjian & Persetujuan", subtitle: "Step 5 — Tandatangan S&K", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4", children: "Jika pasien telah menandatangani perjanjian layanan secara fisik/offline, centang di bawah ini." }),
              /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.agreement_signed_offline, onChange: (e) => setData("agreement_signed_offline", e.target.checked) }),
                /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.agreement_signed_offline && /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Perjanjian Sudah Ditandatangani Offline" }),
                  /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? "text-white/80" : "text-gray-400"}`, children: "Pasien telah membaca dan menyetujui S&K layanan secara fisik" })
                ] })
              ] })
            ] }),
            (!isEditing || isGroupMember) && /* @__PURE__ */ jsx(Section, { icon: Calendar, iconBg: "bg-blue-50 dark:bg-blue-900/40", iconColor: "text-blue-600 dark:text-blue-400", title: "Jadwal & Paket Sesi", subtitle: `Step 6 — ${isGroupMember ? "Sinkron dengan Grup" : "Opsional, bisa diatur nanti"}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              isGroupMember ? /* @__PURE__ */ jsxs("div", { className: "p-4 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs", children: [
                  /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
                  "Terdaftar sebagai anggota grup: ",
                  /* @__PURE__ */ jsx("span", { className: "text-indigo-600", children: groupMemberInfo.group_booking?.group_name })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-blue-600/70 font-medium leading-relaxed", children: "Jadwal dan sesi otomatis disinkronkan dengan pengaturan grup." })
              ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed", children: "Isi bagian ini jika pasien sudah memilih jadwal dan paket. Kosongkan jika belum." }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Jadwal" }),
                isGroupMember ? /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 dark:bg-gray-800 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 opacity-80", children: groupMemberInfo.group_booking?.schedule ? scheduleLabel(groupMemberInfo.group_booking.schedule) : "Grup belum memilih jadwal" }) : /* @__PURE__ */ jsx(Fragment, { children: schedules.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 font-medium", children: "Tidak ada jadwal tersedia saat ini" }) : /* @__PURE__ */ jsxs("select", { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.schedule_id, onChange: (e) => setData("schedule_id", e.target.value), children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Tidak Ada / Pilih Nanti --" }),
                  schedules.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: scheduleLabel(s) }, s.id))
                ] }) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.schedule_id, className: "mt-2" })
              ] }),
              (hasSchedule || isGroupMember) && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: [
                  "Pilih Paket ",
                  /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: bookingPackages.map((pkg) => {
                  const isSelected = data.package_type === pkg.slug;
                  const isDisabled = isGroupMember && !isSelected;
                  return /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${isSelected ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"} ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-blue-300"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "package_type", value: pkg.slug, checked: isSelected, disabled: isDisabled, onChange: () => !isGroupMember && setData("package_type", pkg.slug) }),
                    /* @__PURE__ */ jsx(Package, { className: `w-4 h-4 flex-shrink-0 ${isSelected ? "text-white" : "text-blue-400"}` }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: pkg.name }),
                      /* @__PURE__ */ jsxs("p", { className: `text-[10px] font-medium mt-0.5 ${isSelected ? "text-white/80" : "text-gray-400"}`, children: [
                        "Rp ",
                        pkg.price.toLocaleString("id-ID")
                      ] })
                    ] })
                  ] }, pkg.slug);
                }) }),
                /* @__PURE__ */ jsx(InputError, { message: errors.package_type, className: "mt-2" })
              ] })
            ] }) }),
            (isGroupMember || !isEditing && hasSchedule) && /* @__PURE__ */ jsx(Section, { icon: Save, iconBg: "bg-orange-50 dark:bg-orange-900/40", iconColor: "text-orange-600 dark:text-orange-400", title: "Informasi Pembayaran", subtitle: "Step 7 — Metode pembayaran anggota", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed", children: isGroupMember ? "Anggota grup melakukan pembayaran secara mandiri. Tentukan metode pembayaran yang akan digunakan." : "Pilih metode pembayaran pasien." }),
              data.package_type && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/10 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4", children: "Ringkasan Biaya" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-medium", children: "Paket Layanan" }),
                    /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900 dark:text-white", children: selectedPkg?.name ?? data.package_type })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-500 font-medium", children: "Sesi" }),
                    /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900 dark:text-white", children: isGroupMember ? "🏥 Offline (Grup)" : "🏥 Offline" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-indigo-200 dark:bg-indigo-800 my-1" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide text-xs", children: "Total" }),
                    /* @__PURE__ */ jsxs("span", { className: "font-black text-xl text-indigo-700 dark:text-indigo-300", children: [
                      "Rp ",
                      packagePrice.toLocaleString("id-ID")
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Metode Pembayaran" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  { value: "Transfer Bank", label: "Transfer Bank", desc: "Transfer ke rekening klinik." },
                  { value: "Cash", label: "Tunai (Cash)", desc: "Bayar langsung di tempat." }
                ].map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_method === opt.value ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-orange-300"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_method", value: opt.value, checked: data.payment_method === opt.value, onChange: () => setData("payment_method", opt.value) }),
                  /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg ${data.payment_method === opt.value ? "bg-white/20" : "bg-orange-100 dark:bg-orange-900/40"}`, children: opt.value === "Cash" ? /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: opt.label }),
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.payment_method === opt.value ? "text-white/80" : "text-gray-400"}`, children: opt.desc })
                  ] })
                ] }, opt.value)) })
              ] }),
              data.payment_method === "Transfer Bank" && data.payment_status === "pending" && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5 space-y-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400", children: "Rekening Tujuan" }),
                /* @__PURE__ */ jsx("div", { className: "space-y-3", children: bankAccounts.map((b) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-blue-900/30", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-[10px]", children: b.bank }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900 dark:text-white", children: b.holder }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-mono font-black text-indigo-600 tracking-wider", children: b.account })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => navigator.clipboard?.writeText(b.account), className: "text-[9px] font-black text-indigo-600 px-3 py-1.5 bg-indigo-50 rounded-lg", children: "Salin" })
                ] }, b.bank)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Status Pembayaran" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  { value: "pending", Icon: Clock, color: "orange", label: "Belum Dibayar", desc: "Menunggu konfirmasi atau akan dibayar nanti." },
                  { value: "paid", Icon: CheckCircle, color: "emerald", label: "Sudah Dibayar", desc: "Pembayaran sudah diterima secara langsung / transfer." }
                ].map((st) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_status === st.value ? `bg-${st.color}-600 border-${st.color}-600 text-white shadow-lg shadow-${st.color}-600/20` : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_status", value: st.value, checked: data.payment_status === st.value, onChange: () => setData("payment_status", st.value) }),
                  /* @__PURE__ */ jsx(st.Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.payment_status === st.value ? "text-white" : `text-${st.color}-500`}` }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: st.label }),
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.payment_status === st.value ? "text-white/80" : "text-gray-400"}`, children: st.desc })
                  ] })
                ] }, st.value)) })
              ] }),
              data.payment_status === "paid" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/40", children: [
                data.payment_method === "Transfer Bank" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Bank / Dompet Digital" }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border-transparent focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold transition-all", value: data.payment_bank, onChange: (e) => setData("payment_bank", e.target.value), placeholder: "Contoh: BCA / Mandiri / OVO" }),
                      /* @__PURE__ */ jsx(Banknote, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Pemilik Rekening" }),
                    /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-white dark:bg-gray-900 border-transparent focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 py-4 text-sm font-bold transition-all", value: data.payment_account_name, onChange: (e) => setData("payment_account_name", e.target.value), placeholder: "Sesuai buku tabungan" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Bukti Pembayaran (Opsional)" }),
                  /* @__PURE__ */ jsx(
                    FileUploadField,
                    {
                      hint: "Foto struk / screenshot · Maks 5 MB",
                      preview: proofPreview,
                      onChange: handleProof,
                      onClear: () => {
                        setData("payment_proof", null);
                        setProofPreview(null);
                      },
                      error: errors.payment_proof
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/40", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-amber-500 flex-shrink-0" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed", children: 'PENTING: Pastikan Anda menerima pembayaran sebelum mengubah status menjadi "Sudah Dibayar".' })
              ] }),
              activeBooking && /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowInvoice(true),
                  className: "flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm",
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                    "Lihat & Download Invoice"
                  ]
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx(Section, { icon: Shield, iconBg: "bg-emerald-50 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", title: "Akun & Akses", subtitle: `Step ${STEPS.length} — Keamanan dan role`, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [
                { id: "password", label: isEditing ? "Ubah Password (kosongkan jika tidak diubah)" : "Password *", show: showPw, setShow: setShowPw },
                { id: "password_confirmation", label: "Konfirmasi Password", show: showPwC, setShow: setShowPwC }
              ].map(({ id, label, show, setShow }) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
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
                      required: !isEditing && id === "password"
                    }
                  ),
                  /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShow((v) => !v), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors[id], className: "mt-2" })
              ] }, id)) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hak Akses (Roles)" }),
                /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 space-y-3", children: [
                  roles.filter((r) => r.name === "patient").map((role) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 p-3 rounded-xl border-2 bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20 cursor-default", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border-2 border-white bg-white flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-600" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "Pasien (Patient)" })
                  ] }, role.id)),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 font-medium italic mt-2 px-2", children: "Role otomatis diset sebagai Pasien. Untuk mengubah ke role staf (Admin/Terapis), silakan hubungi tim IT." })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.roles, className: "mt-2" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
              /* @__PURE__ */ jsx(Link, { href: backHref, className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6", children: "Batal & Kembali" }),
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
          ] })
        ] }) }),
        showInvoice && getInvoiceData() && /* @__PURE__ */ jsx(
          InvoiceModal,
          {
            invoice: getInvoiceData(),
            type: "individual",
            onClose: () => setShowInvoice(false),
            bankAccounts
          }
        )
      ]
    }
  );
}
export {
  UsersForm as default
};
