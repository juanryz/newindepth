import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DLGa0CGh.js";
import { usePage, useForm, Head, Link, router } from "@inertiajs/react";
import { Clock, CheckCircle, AlertTriangle, Building2, MapPin, User, Phone, Mail, FileText, Users, Plus, Trash2, ChevronLeft, Printer } from "lucide-react";
import { I as InvoiceModal } from "./InvoiceModal-SFrZCPfS.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
import "./TextInput-DcEnl-Ka.js";
const statusConfig = {
  paid: { label: "Lunas", icon: CheckCircle, cls: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  pending: { label: "Belum Lunas", icon: Clock, cls: "bg-amber-100 text-amber-700", dot: "bg-amber-500" }
};
function GroupBookingsShow({ group, invoiceData }) {
  const { flash } = usePage().props;
  const [showInvoice, setShowInvoice] = useState(false);
  const [payingUp, setPayingUp] = useState(false);
  const { data, setData, post, processing } = useForm({
    payment_status: group.payment_status,
    payment_method: group.payment_method
  });
  const st = statusConfig[group.payment_status] ?? statusConfig.pending;
  const StatusIcon = st.icon;
  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
  };
  const formatTime = (t) => t ? String(t).substring(0, 5) : "-";
  const formatCurrency = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
  const handleMarkPaid = () => {
    setPayingUp(false);
    router.post(route("admin.group-bookings.payment.update", group.id), {
      payment_status: "paid",
      payment_method: group.payment_method
    });
  };
  const handleRemoveMember = (memberId) => {
    if (!confirm("Hapus anggota ini dari grup? Booking yang terkait juga akan dibatalkan.")) return;
    router.delete(route("admin.group-bookings.members.remove", { groupBooking: group.id, member: memberId }));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("admin.group-bookings.index"),
              className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: group.group_name }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1", children: group.invoice_number })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          invoiceData && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setShowInvoice(true),
              className: "inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all",
              children: [
                /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4" }),
                "Invoice Grup"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("admin.group-bookings.members.add", group.id),
              className: "inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                "Tambah Anggota"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Grup: ${group.group_name}` }),
        showInvoice && /* @__PURE__ */ jsx(
          InvoiceModal,
          {
            invoice: { ...invoiceData, members: invoiceData?.members || [] },
            type: "group",
            onClose: () => setShowInvoice(false)
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
            { label: "Total Anggota", value: group.members?.length ?? 0, suffix: "orang", color: "indigo" },
            { label: "Total Tagihan", value: formatCurrency(group.total_amount), color: "blue" },
            { label: "Metode Bayar", value: group.payment_method, color: "violet" },
            { label: "Status", value: st.label, color: group.payment_status === "paid" ? "emerald" : "amber" }
          ].map((s) => /* @__PURE__ */ jsxs("div", { className: `bg-white dark:bg-gray-900 rounded-[1.75rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm`, children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1", children: s.label }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white", children: s.value })
          ] }, s.label)) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4", children: "Informasi Grup" }),
              [
                { icon: Building2, label: "Institusi", value: group.institution_name },
                { icon: MapPin, label: "Alamat", value: group.address },
                { icon: User, label: "PIC", value: group.pic_name },
                { icon: Phone, label: "Telepon PIC", value: group.pic_phone },
                { icon: Mail, label: "Email PIC", value: group.pic_email },
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
              group.payment_status === "pending" && (group.members?.length ?? 0) > 0 && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleMarkPaid,
                  disabled: processing,
                  className: "w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-40",
                  children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }),
                    "Tandai Lunas & Konfirmasi Semua Booking"
                  ]
                }
              ),
              group.payment_status === "paid" && group.paid_at && /* @__PURE__ */ jsxs("p", { className: "text-xs text-emerald-600 font-bold text-center", children: [
                "✅ Dibayar pada ",
                formatDate(group.paid_at)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl", children: /* @__PURE__ */ jsx(Users, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide", children: "Daftar Anggota" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 font-medium", children: [
                    group.members?.length ?? 0,
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
            (group.members?.length ?? 0) === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
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
            ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-gray-100 dark:border-gray-800", children: ["#", "Nama & Email", "Paket", "Jadwal Sesi", "Harga", "Aksi"].map((h) => /* @__PURE__ */ jsx("th", { className: "text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4", children: h }, h)) }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/50", children: group.members.map((member, i) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors", children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs font-black text-gray-400", children: i + 1 }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: member.user?.name ?? "-" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400", children: member.user?.email ?? "-" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase rounded-full", children: member.package_type ?? "-" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: member.booking?.schedule ? /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300", children: formatDate(member.booking.schedule.date) }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400", children: [
                    formatTime(member.booking.schedule.start_time),
                    " WIB · ",
                    member.booking.schedule.therapist?.name ?? "TBD"
                  ] })
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "Belum dijadwalkan" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: formatCurrency(member.price) }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: group.payment_status === "pending" && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleRemoveMember(member.id),
                    className: "p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                ) })
              ] }, member.id)) }),
              /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { className: "border-t-2 border-indigo-100 dark:border-indigo-900/40", children: [
                /* @__PURE__ */ jsx("td", { colSpan: 4, className: "px-6 py-4 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide", children: "Total" }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-black text-indigo-700 dark:text-indigo-400", children: formatCurrency(group.total_amount) }),
                /* @__PURE__ */ jsx("td", {})
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
