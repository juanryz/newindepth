import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { User, Mail, Phone, Shield, Lock, EyeOff, Eye, ArrowRight, Camera, AlertCircle, Contact, ClipboardList, Wifi, WifiOff, FileImage, CheckCircle, Calendar, Package, CreditCard, Clock, Download, Users, ChevronLeft, Trash2, Upload, X, MapPin } from "lucide-react";
import { createPortal } from "react-dom";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { AnimatePresence, motion } from "framer-motion";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function InvoicePreviewModal({ data, pkg, price, bankAccounts: bankAccountsProp = [], onClose }) {
  const printRef = useRef();
  const { clinicInfo } = usePage().props;
  clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccountsProp;
  const isOnline = data.session_type === "online";
  ["Cash", "Tunai"].includes(data.payment_method);
  const fmt = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadPDF = () => {
    setIsDownloading(true);
    const element = printRef.current;
    const doDownload = () => {
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Draft_Invoice_${data.name || "Anggota"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, windowWidth: document.documentElement.offsetWidth },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      };
      window.html2pdf().set(opt).from(element).save().then(() => {
        setIsDownloading(false);
      }).catch((err) => {
        console.error("PDF generation failed:", err);
        setIsDownloading(false);
      });
    };
    if (window.html2pdf) {
      doDownload();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      document.body.appendChild(script);
      script.onload = doDownload;
    }
  };
  return createPortal(
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-600", children: "Preview Invoice" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white", children: "Draft — Belum Final" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: downloadPDF,
              disabled: isDownloading,
              className: `flex items-center gap-2 px-5 py-2.5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 ${isDownloading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`,
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                " ",
                isDownloading ? "Memproses PDF..." : "Download PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsx("button", { onClick: onClose, className: "p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 hover:text-rose-600 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: printRef, className: "p-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between pb-6 border-b-2 border-indigo-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("img", { src: "/images/logo-color.png", alt: "Logo", className: "h-12 w-auto mb-2" }),
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-indigo-900 uppercase tracking-tight", children: clinicInfo?.name || "InDepth Mental Wellness" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-600/70 font-semibold mt-0.5", children: "Hipnoterapi & Kesehatan Mental Profesional" }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-0.5", children: clinicInfo?.address && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3 flex-shrink-0" }),
              clinicInfo.address
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right flex-shrink-0 ml-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "Invoice (Draft)" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { dateStyle: "long" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "Data Anggota" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            { label: "Nama", value: data.name || "—" },
            { label: "Email", value: data.email || "—" },
            { label: "Telepon", value: data.phone || "—" },
            { label: "Tipe Sesi", value: isOnline ? "💻 Online" : "🏥 Offline" }
          ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1", children: label }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: value })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border border-gray-100 dark:border-gray-700 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "Detail Layanan" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between py-2 border-b border-gray-50 dark:border-gray-800 text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: pkg?.name ?? data.package_type ?? "—" }),
            /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900 dark:text-white", children: fmt(price) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-3 pt-3 border-t-2 border-indigo-600", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-wide text-indigo-600", children: "Total" }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-indigo-600", children: fmt(price) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3", children: "Informasi Pembayaran" }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Metode" }),
            /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900 dark:text-white", children: data.payment_method || "—" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors", children: "Tutup" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: downloadPDF,
            className: "flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
              " Download / Print Invoice"
            ]
          }
        )
      ] })
    ] }) }),
    document.body
  );
}
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
  const dateStr = ymd ? (/* @__PURE__ */ new Date(ymd + "T12:00:00")).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "—";
  const avail = s.quota - (s.confirmed_count ?? 0);
  return `${dateStr} · ${s.start_time?.slice(0, 5)}–${s.end_time?.slice(0, 5)} · ${s.therapist?.name ?? "—"} (${avail} slot)`;
}
function AddMember({
  group,
  roles,
  genderOptions,
  severityOptions,
  packageOptions,
  schedules = [],
  bookingPackages = [],
  paymentMethodsBySession = { online: ["Transfer Bank"], offline: ["Transfer Bank", "Cash"] },
  bankAccounts = [],
  sessionTypeOptions = []
}) {
  const { clinicInfo } = usePage().props;
  const effectiveBankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccounts;
  const [step, setStep] = useState(1);
  const { data, setData, post, processing, errors } = useForm({
    disclaimer_confirmed: false,
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    ktp_photo: null,
    emergency_contact_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
    screening_type: "online",
    severity_label: "",
    recommended_package: "",
    admin_notes: "",
    is_high_risk: false,
    agreement_signed_offline: false,
    session_type: "offline",
    // Hardcoded as per request
    // Booking (Synchronized with group defaults)
    schedule_id: group.schedule_id || "",
    package_type: group.package_type || "",
    booking_notes: "",
    payment_status: "pending",
    payment_proof: null,
    payment_method: "Transfer Bank",
    payment_bank: "",
    payment_account_number: "",
    payment_account_name: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
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
  const availablePaymentMethods = paymentMethodsBySession[data.session_type] ?? ["Transfer Bank", "Cash"];
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.group-bookings.members.store", group.id));
  };
  const hasSchedule = !!data.schedule_id;
  data.payment_status === "paid";
  const selectedPkg = bookingPackages.find((p) => p.slug === data.package_type);
  const packagePrice = selectedPkg?.price ?? 0;
  const goToStep2 = () => {
    if (!data.name || !data.email || !data.password) {
      alert("Harap isi Nama Lengkap, Email, dan Password.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: route("admin.group-bookings.show", group.id), className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight", children: "Tambah Anggota Grup" }),
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1", children: [
            "Grup: ",
            group.group_name,
            " (Mode: Offline)"
          ] })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Tambah Anggota Grup" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mb-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: `p-1.5 rounded-full transition-all duration-500 ${step >= 1 ? "bg-indigo-600 shadow-lg shadow-indigo-600/20" : "bg-gray-300 dark:bg-gray-800"}`, children: /* @__PURE__ */ jsxs("div", { className: `w-10 h-10 rounded-full flex flex-col items-center justify-center text-[10px] font-black ${step >= 1 ? "bg-white text-indigo-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"}`, children: [
              /* @__PURE__ */ jsx("span", { children: "STEP" }),
              /* @__PURE__ */ jsx("span", { children: "01" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: `w-12 h-1 rounded-full transition-all duration-500 ${step >= 2 ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-800"}` }),
            /* @__PURE__ */ jsx("div", { className: `p-1.5 rounded-full transition-all duration-500 ${step >= 2 ? "bg-indigo-600 shadow-lg shadow-indigo-600/20" : "bg-gray-300 dark:bg-gray-800"}`, children: /* @__PURE__ */ jsxs("div", { className: `w-10 h-10 rounded-full flex flex-col items-center justify-center text-[10px] font-black ${step >= 2 ? "bg-white text-indigo-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"}`, children: [
              /* @__PURE__ */ jsx("span", { children: "STEP" }),
              /* @__PURE__ */ jsx("span", { children: "02" })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "space-y-8", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            step === 1 && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                transition: { duration: 0.3 },
                className: "space-y-8",
                children: [
                  /* @__PURE__ */ jsx(Section, { icon: User, iconBg: "bg-blue-50 dark:bg-blue-900/40", iconColor: "text-blue-600 dark:text-blue-400", title: "Informasi Pribadi", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nama Lengkap *" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.name, onChange: (e) => setData("name", e.target.value), placeholder: "Sesuai KTP/SIM", required: true }),
                        /* @__PURE__ */ jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                      ] }),
                      /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Alamat Email *" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(TextInput, { type: "email", className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.email, onChange: (e) => setData("email", e.target.value), placeholder: "email@aktif.com", required: true }),
                        /* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                      ] }),
                      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "No. HP / WhatsApp" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.phone, onChange: (e) => setData("phone", e.target.value), placeholder: "0812..." }),
                        /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                      ] }),
                      /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx(Section, { icon: Shield, iconBg: "bg-indigo-50 dark:bg-indigo-900/40", iconColor: "text-indigo-600 dark:text-indigo-400", title: "Keamanan & Akses", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Password Sementara *" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(TextInput, { type: showPassword ? "text" : "password", className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.password, onChange: (e) => setData("password", e.target.value), autoComplete: "new-password", required: true }),
                        /* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
                        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400", children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) })
                      ] }),
                      /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Hak Akses (Roles)" }),
                      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex flex-wrap gap-2", children: roles.map((r) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all ${data.roles.includes(r.name) ? "bg-indigo-600 border-indigo-600 text-white shadow-md" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500"}`, children: [
                        /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", value: r.name, checked: data.roles.includes(r.name), onChange: (e) => {
                          const { value, checked } = e.target;
                          setData("roles", checked ? [...data.roles, value] : data.roles.filter((role) => role !== value));
                        } }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: r.name.replace(/_/g, " ") })
                      ] }, r.id)) })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-end p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: goToStep2,
                      className: "flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95",
                      children: [
                        "Simpan & Lanjut ke Detail Lengkap ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  ) })
                ]
              },
              "step1"
            ),
            step === 2 && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                transition: { duration: 0.3 },
                className: "space-y-8",
                children: [
                  /* @__PURE__ */ jsx(Section, { icon: User, iconBg: "bg-indigo-50 dark:bg-indigo-900/40", iconColor: "text-indigo-600 dark:text-indigo-400", title: "Informasi Pribadi & Sosiodemografi", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Nomor Telepon / WhatsApp" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(TextInput, { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.phone, onChange: (e) => setData("phone", e.target.value), placeholder: "081234567890" }),
                        /* @__PURE__ */ jsx(Phone, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                      ] }),
                      /* @__PURE__ */ jsx(InputError, { message: errors.phone, className: "mt-2" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Usia" }),
                      /* @__PURE__ */ jsx(TextInput, { type: "number", min: "1", max: "120", className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.age, onChange: (e) => setData("age", e.target.value), placeholder: "Tahun" }),
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
                  /* @__PURE__ */ jsx(Section, { icon: Camera, iconBg: "bg-sky-50 dark:bg-sky-900/40", iconColor: "text-sky-600 dark:text-sky-400", title: "Foto KTP / Identitas", children: /* @__PURE__ */ jsx(FileUploadField, { hint: "JPG / PNG · Maks 5 MB", preview: ktpPreview, onChange: handleFile("ktp_photo", setKtpPreview), onClear: () => clearFile("ktp_photo", setKtpPreview), error: errors.ktp_photo }) }),
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
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
                      { value: "online", Icon: Wifi, color: "teal", label: "Skrining Online", desc: "Anggota mengisi skrining sendiri setelah login." },
                      { value: "manual", Icon: WifiOff, color: "violet", label: "Skrining Manual", desc: "Admin menginput hasil diagnosa secara langsung." }
                    ].map(({ value, Icon, color, label, desc }) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20` : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300"}`, children: [
                      /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "screening_type", value, checked: data.screening_type === value, onChange: () => setData("screening_type", value) }),
                      /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === value ? "text-white" : `text-${color}-500`}` }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest mb-1", children: label }),
                        /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium leading-relaxed ${data.screening_type === value ? "text-white/80" : "text-gray-400"}`, children: desc })
                      ] })
                    ] }, value)) }),
                    data.screening_type === "manual" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40", children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Tingkat Keparahan *" }),
                          /* @__PURE__ */ jsxs("select", { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.severity_label, onChange: (e) => setData("severity_label", e.target.value), children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Tingkat --" }),
                            severityOptions.map((l) => /* @__PURE__ */ jsx("option", { value: l, children: l }, l))
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Rekomendasi Paket *" }),
                          /* @__PURE__ */ jsxs("select", { className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.recommended_package, onChange: (e) => setData("recommended_package", e.target.value), children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Paket --" }),
                            packageOptions.map((o) => /* @__PURE__ */ jsx("option", { value: o.value, children: o.label }, o.value))
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Catatan Diagnosa" }),
                        /* @__PURE__ */ jsx("textarea", { rows: 4, className: "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none", placeholder: "Tuliskan hasil skrining...", value: data.admin_notes, onChange: (e) => setData("admin_notes", e.target.value) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(Section, { icon: FileImage, iconBg: "bg-emerald-50 dark:bg-emerald-900/40", iconColor: "text-emerald-600 dark:text-emerald-400", title: "Perjanjian & Persetujuan", children: /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked: data.agreement_signed_offline, onChange: (e) => setData("agreement_signed_offline", e.target.checked) }),
                    /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? "border-white bg-white" : "border-gray-300 dark:border-gray-600"}`, children: data.agreement_signed_offline && /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-600" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: "Perjanjian Sudah Ditandatangani Offline" }),
                      /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? "text-white/80" : "text-gray-400"}`, children: "Anggota telah membaca dan menyetujui S&K layanan" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxs(Section, { icon: Calendar, iconBg: "bg-blue-50 dark:bg-blue-900/40", iconColor: "text-blue-600 dark:text-blue-400", title: "Jadwal & Paket Sesi", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-blue-600 dark:text-blue-400 font-bold mb-4", children: "ℹ️ Default mengikuti jadwal grup. Anda dapat melakukan override jika diperlukan." }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Jadwal" }),
                        /* @__PURE__ */ jsxs("select", { className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all", value: data.schedule_id, onChange: (e) => setData("schedule_id", e.target.value), children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Jadwal --" }),
                          schedules.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: scheduleLabel(s) }, s.id))
                        ] }),
                        /* @__PURE__ */ jsx(InputError, { message: errors.schedule_id, className: "mt-2" })
                      ] }),
                      hasSchedule && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Paket" }),
                        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: bookingPackages.map((pkg) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.package_type === pkg.slug ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300"}`, children: [
                          /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "package_type", value: pkg.slug, checked: data.package_type === pkg.slug, onChange: () => setData("package_type", pkg.slug) }),
                          /* @__PURE__ */ jsx(Package, { className: `w-4 h-4 ${data.package_type === pkg.slug ? "text-white" : "text-blue-400"}` }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest", children: pkg.name }),
                            /* @__PURE__ */ jsxs("p", { className: `text-[10px] font-medium ${data.package_type === pkg.slug ? "text-white" : "text-gray-400"}`, children: [
                              "Rp ",
                              pkg.price.toLocaleString("id-ID")
                            ] })
                          ] })
                        ] }, pkg.slug)) })
                      ] })
                    ] })
                  ] }),
                  hasSchedule && /* @__PURE__ */ jsx(Section, { icon: CreditCard, iconBg: "bg-orange-50 dark:bg-orange-900/40", iconColor: "text-orange-600 dark:text-orange-400", title: "Invoice & Pembayaran", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4", children: "Ringkasan Biaya" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide text-xs", children: "Total" }),
                        /* @__PURE__ */ jsxs("span", { className: "font-black text-xl text-indigo-700 dark:text-indigo-300", children: [
                          "Rp ",
                          packagePrice.toLocaleString("id-ID")
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: "Metode Pembayaran *" }),
                      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: availablePaymentMethods.map((method) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_method === method ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300"}`, children: [
                        /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_method", value: method, checked: data.payment_method === method, onChange: () => setData("payment_method", method) }),
                        /* @__PURE__ */ jsx(CreditCard, { className: `w-5 h-5 ${data.payment_method === method ? "text-white" : "text-indigo-500"}` }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-widest", children: method })
                      ] }, method)) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: "Status Pembayaran *" }),
                      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                        { value: "pending", Icon: Clock, color: "amber", label: "Belum Dibayar" },
                        { value: "paid", Icon: CheckCircle, color: "emerald", label: "Sudah Dibayar" }
                      ].map(({ value, Icon, color, label }) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_status === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20` : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700"}`, children: [
                        /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_status", value, checked: data.payment_status === value, onChange: () => setData("payment_status", value) }),
                        /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 flex-shrink-0" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: label })
                      ] }, value)) })
                    ] }),
                    data.package_type && /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setShowPreview(true), className: "w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20", children: [
                      /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                      " Preview & Download Invoice"
                    ] })
                  ] }) }),
                  showPreview && /* @__PURE__ */ jsx(
                    InvoicePreviewModal,
                    {
                      data,
                      pkg: bookingPackages.find((p) => p.slug === data.package_type),
                      price: packagePrice,
                      bankAccounts: effectiveBankAccounts,
                      onClose: () => setShowPreview(false)
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setStep(1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        },
                        className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6",
                        children: "Kembali"
                      }
                    ),
                    /* @__PURE__ */ jsxs("button", { type: "submit", disabled: processing || !data.disclaimer_confirmed, className: "flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40", children: [
                      /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
                      " Simpan & Selesaikan"
                    ] })
                  ] })
                ]
              },
              "step2"
            )
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  AddMember as default
};
