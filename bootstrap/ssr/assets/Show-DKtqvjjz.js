import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { Clock, CheckCircle, AlertTriangle, Edit2, Building2, MapPin, User, Phone, Mail, FileText, Printer, CreditCard, Banknote, Users, Plus, Eye, Trash2, ChevronLeft, AlertCircle } from "lucide-react";
import { I as InvoiceModal } from "./InvoiceModal-60o8FMEx.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
import "react-dom";
import "./TextInput-DcEnl-Ka.js";
const statusConfig = {
  paid: { label: "Lunas", icon: CheckCircle, cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", dot: "bg-emerald-500" },
  pending: { label: "Belum Lunas", icon: Clock, cls: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", dot: "bg-amber-500" }
};
function ProfileCompletionBadge({ completion }) {
  if (!completion) return /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "—" });
  const { percentage, is_complete, fields } = completion;
  const missingFields = Object.values(fields || {}).filter((f) => !f.filled).map((f) => f.label);
  const colorClass = is_complete ? "text-emerald-600 dark:text-emerald-400" : percentage >= 60 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";
  const barColor = is_complete ? "bg-emerald-500" : percentage >= 60 ? "bg-amber-500" : "bg-rose-500";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1.5 group relative min-w-[60px]", children: [
    /* @__PURE__ */ jsxs("span", { className: `text-sm font-black tabular-nums ${colorClass}`, children: [
      percentage,
      "%"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-14 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `h-full rounded-full transition-all ${barColor}`,
        style: { width: `${percentage}%` }
      }
    ) }),
    !is_complete && missingFields.length > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full mb-2 hidden group-hover:block z-10 w-48 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-xl p-3 shadow-xl pointer-events-none left-1/2 -translate-x-1/2", children: [
      /* @__PURE__ */ jsx("p", { className: "font-black uppercase tracking-widest mb-2 text-gray-300", children: "Belum diisi:" }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-0.5", children: missingFields.map((label, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 text-rose-400 flex-shrink-0" }),
        label
      ] }, i)) })
    ] })
  ] });
}
function GroupBookingsShow({ group, invoiceData, schedules = [], bookingPackages = [], paymentMethods = ["Transfer Bank", "Cash"], bankAccounts = [] }) {
  const { flash } = usePage().props;
  const [showInvoice, setShowInvoice] = useState(false);
  const formatDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "-";
  const formatTime = (t) => t ? String(t).substring(0, 5) : "-";
  const formatCurrency = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
  const st = statusConfig[group.payment_status] ?? statusConfig.pending;
  const StatusIcon = st.icon;
  const memberCount = group.members?.length ?? 0;
  const handleMarkPaid = () => {
    if (!group.payment_method) {
      alert("Pilih metode pembayaran terlebih dahulu sebelum menandai lunas.");
      return;
    }
    if (!confirm("Tandai grup ini sebagai LUNAS? Semua booking anggota yang pending akan dikonfirmasi.")) return;
    router.post(route("admin.group-bookings.payment.update", group.id), {
      payment_status: "paid",
      payment_method: group.payment_method
    });
  };
  const { data: pmData, setData: setPmData, post: postPm, processing: pmProcessing, errors: pmErrors } = useForm({
    payment_method: group.payment_method ?? "",
    package_type: group.package_type ?? ""
  });
  const handleSavePaymentMethod = (e) => {
    e.preventDefault();
    postPm(route("admin.group-bookings.payment-method.update", group.id));
  };
  const handleRemoveMember = (memberId) => {
    if (!confirm("Hapus anggota ini dari grup? Booking terkait juga akan dibatalkan.")) return;
    router.delete(route("admin.group-bookings.members.remove", {
      groupBooking: group.id,
      group_booking_member: memberId
    }));
  };
  const { data: schedForm, setData: setSchedForm, post: postSched, processing: schedProcessing, errors: schedErrors } = useForm({
    schedule_id: group.schedule_id ?? "",
    package_type: group.package_type ?? ""
  });
  const scheduleLabel = (s) => {
    const ymd = (s.date ?? "").slice(0, 10);
    const dateStr = ymd ? (/* @__PURE__ */ new Date(ymd + "T12:00:00")).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "—";
    const avail = (s.quota ?? 0) - (s.confirmed_count ?? 0);
    return `${dateStr} · ${s.start_time?.slice(0, 5) ?? ""}–${s.end_time?.slice(0, 5) ?? ""} · ${s.therapist?.name ?? "—"} (${avail} slot)`;
  };
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    postSched(route("admin.group-bookings.schedule.update", group.id));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.users.index", { tab: "groups" }),
              className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: group.group_name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1", children: group.invoice_number })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("admin.group-bookings.members.add", group.id),
            className: "inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              "Tambah Anggota"
            ]
          }
        ) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Grup: ${group.group_name}` }),
        showInvoice && /* @__PURE__ */ jsx(
          InvoiceModal,
          {
            invoice: { ...invoiceData, members: invoiceData?.members || [] },
            type: "group",
            onClose: () => setShowInvoice(false),
            bankAccounts
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "py-8 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6", children: [
          flash?.success && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 flex-shrink-0" }),
            flash.success
          ] }),
          flash?.error && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 flex-shrink-0" }),
            flash.error
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
            { label: "Total Anggota", value: `${memberCount} orang`, color: "indigo" },
            { label: "Total Tagihan", value: formatCurrency(group.total_amount), color: "blue" },
            { label: "Metode Bayar", value: group.payment_method ?? "—", color: "violet" },
            { label: "Status", value: st.label, color: group.payment_status === "paid" ? "emerald" : "amber" }
          ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[1.75rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1", children: s.label }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white", children: s.value })
          ] }, s.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "Informasi Grup" }),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.group-bookings.edit", group.id),
                    className: "p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors",
                    title: "Edit grup",
                    children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                  }
                )
              ] }),
              [
                { icon: Building2, label: "Institusi", value: group.institution_name },
                { icon: MapPin, label: "Alamat", value: group.address },
                { icon: User, label: "PIC", value: group.pic_name },
                { icon: Phone, label: "Telepon", value: group.pic_phone },
                { icon: Mail, label: "Email", value: group.pic_email },
                { icon: FileText, label: "Catatan", value: group.notes }
              ].filter((r) => r.value).map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black uppercase tracking-widest text-gray-400", children: label }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: value })
                ] })
              ] }, label))
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3 mb-6", children: "Status Pembayaran" }),
              /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 p-5 rounded-2xl mb-6 ${st.cls}`, children: [
                /* @__PURE__ */ jsx(StatusIcon, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase", children: st.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium", children: formatCurrency(group.total_amount) })
                ] })
              ] }),
              group.payment_status === "pending" && memberCount > 0 && group.payment_method === "Transfer Bank" && bankAccounts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400", children: "Rekening Tujuan Transfer" }),
                bankAccounts.map((b) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-blue-900/30", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-white font-black text-[10px]", children: b.bank }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900 dark:text-white", children: b.holder }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-mono font-black text-indigo-600 dark:text-indigo-400 tracking-wider", children: b.account })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => navigator.clipboard?.writeText(b.account),
                      className: "text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg transition-colors flex-shrink-0",
                      children: "Salin"
                    }
                  )
                ] }, b.bank))
              ] }),
              group.payment_status === "pending" && memberCount > 0 && group.payment_method && group.schedule_id && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleMarkPaid,
                  className: "w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 mb-3",
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }),
                    "Tandai Lunas & Konfirmasi Semua Booking"
                  ]
                }
              ),
              invoiceData && group.payment_method && group.package_type && group.schedule_id && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowInvoice(true),
                  className: "w-full flex items-center justify-center gap-2 py-4 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4" }),
                    "Lihat / Cetak Invoice"
                  ]
                }
              ),
              group.payment_status === "pending" && memberCount > 0 && (!group.payment_method || !group.schedule_id) && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 flex-shrink-0" }),
                "Pilih jadwal dan metode pembayaran di bawah sebelum menandai lunas."
              ] }),
              group.payment_status === "paid" && group.paid_at && /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-600 font-bold text-center", children: [
                "✅ Dibayar pada ",
                formatDate(group.paid_at)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide", children: "Konfigurasi Layanan & Pembayaran" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-medium", children: group.payment_status === "paid" ? `${group.package_type ?? "—"} · ${group.payment_method ?? "—"} · Sudah dikonfirmasi` : "Atur jadwal, paket, dan metode pembayaran di sini" })
              ] })
            ] }),
            group.payment_status === "paid" ? (
              /* ── READ ONLY setelah lunas ── */
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-4", children: [
                { label: "Jadwal", value: group.schedule ? `${formatDate(group.schedule.date)} ${formatTime(group.schedule.start_time)}` : "—" },
                { label: "Paket", value: group.package_type ?? "—" },
                { label: "Metode Bayar", value: group.payment_method ?? "—" },
                { label: "Total Invoice", value: formatCurrency(group.total_amount) }
              ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1", children: label }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-emerald-900 dark:text-emerald-200", children: value })
              ] }, label)) })
            ) : (
              /* ── FORM pilih jadwal + paket + metode ── */
              /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsx("form", { onSubmit: handleSaveSchedule, children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Pilih Jadwal" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    schedules.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs text-gray-400 font-medium text-center", children: "Tidak ada jadwal tersedia saat ini" }) : /* @__PURE__ */ jsxs(
                      "select",
                      {
                        className: "flex-1 bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                        value: schedForm.schedule_id,
                        onChange: (e) => setSchedForm("schedule_id", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "-- Belum Dipilih --" }),
                          schedules.map((s) => /* @__PURE__ */ jsx("option", { value: s.id, children: scheduleLabel(s) }, s.id))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        disabled: schedProcessing || !schedForm.schedule_id,
                        className: "px-6 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed",
                        children: "Simpan Jadwal"
                      }
                    )
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("form", { onSubmit: handleSavePaymentMethod, className: "space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: [
                      "Pilih Paket ",
                      /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: bookingPackages.map((pkg) => {
                      const sel = pmData.package_type === pkg.slug;
                      return /* @__PURE__ */ jsxs("label", { className: `flex flex-col gap-1.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${sel ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-300"}`, children: [
                        /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "package_type", value: pkg.slug, checked: sel, onChange: () => setPmData("package_type", pkg.slug) }),
                        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black uppercase tracking-wider ${sel ? "text-white" : "text-gray-700 dark:text-gray-300"}`, children: pkg.name }),
                        /* @__PURE__ */ jsxs("span", { className: `text-sm font-black ${sel ? "text-white" : "text-violet-600 dark:text-violet-400"}`, children: [
                          "Rp ",
                          pkg.price.toLocaleString("id-ID")
                        ] }),
                        sel && memberCount > 0 && /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-medium text-white/80", children: [
                          "× ",
                          memberCount,
                          " orang"
                        ] })
                      ] }, pkg.slug);
                    }) }),
                    pmErrors.package_type && /* @__PURE__ */ jsx("p", { className: "text-xs text-rose-500 font-bold mt-2", children: pmErrors.package_type })
                  ] }),
                  pmData.package_type && memberCount > 0 && (() => {
                    const pkg = bookingPackages.find((p) => p.slug === pmData.package_type);
                    const pricePerMember = pkg?.price ?? 0;
                    const total = pricePerMember * memberCount;
                    return /* @__PURE__ */ jsxs("div", { className: "bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40 p-5", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-violet-500 mb-3", children: "Preview Kalkulasi Invoice" }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400 font-medium", children: "Harga per anggota" }),
                          /* @__PURE__ */ jsxs("span", { className: "font-black text-gray-900 dark:text-white", children: [
                            "Rp ",
                            pricePerMember.toLocaleString("id-ID")
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400 font-medium", children: "Jumlah anggota" }),
                          /* @__PURE__ */ jsxs("span", { className: "font-black text-gray-900 dark:text-white", children: [
                            memberCount,
                            " orang"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "h-px bg-violet-100 dark:bg-violet-900/40 my-2" }),
                        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                          /* @__PURE__ */ jsx("span", { className: "font-black text-violet-700 dark:text-violet-300 uppercase tracking-wide text-xs", children: "Total Invoice" }),
                          /* @__PURE__ */ jsxs("span", { className: "font-black text-lg text-violet-700 dark:text-violet-300", children: [
                            "Rp ",
                            total.toLocaleString("id-ID")
                          ] })
                        ] })
                      ] })
                    ] });
                  })(),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3", children: [
                      "Metode Pembayaran ",
                      /* @__PURE__ */ jsx("span", { className: "text-rose-500", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: paymentMethods.map((method) => {
                      const isCash = method === "Cash";
                      const Icon = isCash ? Banknote : CreditCard;
                      const desc = isCash ? "Pembayaran tunai langsung di klinik." : "Transfer ke rekening klinik, bukti dikirim via WhatsApp/email.";
                      const selected = pmData.payment_method === method;
                      return /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selected ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300"}`, children: [
                        /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_method", value: method, checked: selected, onChange: () => setPmData("payment_method", method) }),
                        /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 flex-shrink-0 mt-0.5 ${selected ? "text-white" : "text-indigo-500"}` }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: `text-sm font-black uppercase tracking-widest ${selected ? "text-white" : "text-gray-800 dark:text-gray-200"}`, children: method }),
                          /* @__PURE__ */ jsx("p", { className: `text-[10px] font-medium mt-0.5 leading-relaxed ${selected ? "text-white/80" : "text-gray-400"}`, children: desc })
                        ] })
                      ] }, method);
                    }) }),
                    pmErrors.payment_method && /* @__PURE__ */ jsx("p", { className: "text-xs text-rose-500 font-bold mt-2", children: pmErrors.payment_method })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      disabled: pmProcessing || !pmData.payment_method || !pmData.package_type,
                      className: "flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed",
                      children: [
                        /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }),
                        group.payment_method || group.package_type ? "Perbarui Paket & Metode" : "Simpan Paket & Metode Pembayaran"
                      ]
                    }
                  ) })
                ] })
              ] })
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide", children: "Daftar Anggota" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium", children: [
                    memberCount,
                    " anggota terdaftar"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.group-bookings.members.add", group.id),
                  className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
                    " Tambah"
                  ]
                }
              )
            ] }),
            memberCount === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-widest text-xs", children: "Belum ada anggota" }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.group-bookings.members.add", group.id),
                  className: "inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                    " Tambah Anggota Pertama"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto md:overflow-visible pb-12", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30", children: ["#", "Nama & Email", "Kelengkapan Profil", "Status Booking", "Aksi"].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4", children: h }, h)) }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: group.members.map((member, i) => {
                member.user?.profile_completion?.percentage ?? null;
                member.user?.profile_completion?.is_complete ?? false;
                const bookingStatus = member.booking?.status ?? null;
                return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs font-black text-gray-400", children: i + 1 }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: member.user?.name ?? "-" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-0.5", children: member.user?.email ?? "-" })
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(ProfileCompletionBadge, { completion: member.user?.profile_completion }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: bookingStatus ? /* @__PURE__ */ jsx("span", { className: `inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${bookingStatus === "confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : bookingStatus === "pending_payment" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`, children: bookingStatus === "confirmed" ? "✅ Terkonfirmasi" : bookingStatus === "pending_payment" ? "⏳ Menunggu" : bookingStatus }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "Belum booking" }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("admin.users.show", member.user_id),
                        className: "p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all outline-none",
                        title: "Lihat Detail User",
                        children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route("admin.users.edit", member.user_id),
                        className: "p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all outline-none",
                        title: "Lengkapi/Edit Profil",
                        children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => handleRemoveMember(member.id),
                        disabled: group.payment_status === "paid",
                        className: `p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all outline-none ${group.payment_status === "paid" ? "opacity-30 cursor-not-allowed text-gray-300" : "text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 active:scale-95"}`,
                        title: group.payment_status === "paid" ? "Tidak bisa hapus anggota dari grup yang sudah lunas" : "Hapus dari Grup",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                      }
                    )
                  ] }) })
                ] }, member.id);
              }) }),
              memberCount > 0 && /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { className: "border-t-2 border-indigo-100 dark:border-indigo-900/40", children: [
                /* @__PURE__ */ jsx("td", { colSpan: 3, className: "px-6 py-4 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide", children: "Total Tagihan Grup" }),
                /* @__PURE__ */ jsx("td", { colSpan: 2, className: "px-6 py-4 text-sm font-black text-indigo-700 dark:text-indigo-400", children: formatCurrency(group.total_amount) })
              ] }) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  GroupBookingsShow as default
};
