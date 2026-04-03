import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import "./AuthenticatedLayout-DLGa0CGh.js";
import "@inertiajs/react";
import { Printer } from "lucide-react";
import "./TextInput-DcEnl-Ka.js";
function InvoiceModal({ invoice, onClose, type = "individual" }) {
  if (!invoice) return null;
  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    } catch {
      return d;
    }
  };
  const formatTime = (t) => t ? String(t).substring(0, 5) : "-";
  const formatCurrency = (n) => "Rp " + Number(n || 0).toLocaleString("id-ID");
  const statusLabel = invoice.payment_status === "paid" ? "✅ LUNAS" : "⏳ MENUNGGU PEMBAYARAN";
  const statusColor = invoice.payment_status === "paid" ? "text-emerald-600" : "text-amber-600";
  const printInvoice = () => window.print();
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs("div", { id: "invoice-print-area", className: "p-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-8 pb-6 border-b-2 border-indigo-100", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-indigo-900 uppercase tracking-tight", children: "InDepth Clinic" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium mt-1", children: "Hipnoterapi & Kesehatan Mental Profesional" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "No. Invoice" }),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-indigo-700", children: invoice.invoice_number }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1", children: formatDate(invoice.created_at) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border mb-6 ${invoice.payment_status === "paid" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`, children: statusLabel }),
        type === "individual" ? /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-5 mb-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "Data Pasien" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Nama" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.patient_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Email" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.patient_email })
            ] }),
            invoice.patient_phone && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Telepon" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.patient_phone })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Kode Booking" }),
              /* @__PURE__ */ jsxs("p", { className: "font-bold text-indigo-700", children: [
                "#",
                invoice.booking_code
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-2xl p-5 mb-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "Data Grup / Institusi" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Nama Grup" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.group_name })
            ] }),
            invoice.institution_name && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Institusi" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.institution_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "PIC" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.pic_name })
            ] }),
            invoice.pic_phone && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-[10px] uppercase", children: "Telepon PIC" }),
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: invoice.pic_phone })
            ] })
          ] }),
          invoice.address && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: invoice.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "Detail Layanan" }),
          /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200", children: [
              /* @__PURE__ */ jsx("th", { className: "text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-2", children: "Deskripsi" }),
              /* @__PURE__ */ jsx("th", { className: "text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-2", children: "Jumlah" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: type === "individual" ? /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-50 py-2", children: [
              /* @__PURE__ */ jsxs("td", { className: "py-3", children: [
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900", children: [
                  "Sesi ",
                  invoice.session_type === "online" ? "💻 Online" : "🏥 Offline",
                  " — Paket ",
                  invoice.package_name
                ] }),
                invoice.schedule && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400 mt-1", children: [
                  "📅 ",
                  formatDate(invoice.schedule.date),
                  " · 🕐 ",
                  formatTime(invoice.schedule.start_time),
                  " WIB · Terapis: ",
                  invoice.schedule.therapist
                ] })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-right font-bold text-gray-900", children: formatCurrency(invoice.amount) })
            ] }) : (invoice.members || []).map((m, i) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-50", children: [
              /* @__PURE__ */ jsxs("td", { className: "py-3", children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900", children: m.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400", children: [
                  "Paket ",
                  m.package_type || "-"
                ] }),
                m.schedule && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-400", children: [
                  "📅 ",
                  formatDate(m.schedule.date),
                  " · ",
                  formatTime(m.schedule.start_time),
                  " WIB · ",
                  m.schedule.therapist
                ] })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-right font-bold text-gray-900", children: formatCurrency(m.price) })
            ] }, i)) }),
            /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { className: "border-t-2 border-indigo-100", children: [
              /* @__PURE__ */ jsx("td", { className: "pt-4 font-black text-gray-900 uppercase tracking-wider text-sm", children: "Total" }),
              /* @__PURE__ */ jsx("td", { className: "pt-4 text-right font-black text-xl text-indigo-700", children: type === "individual" ? formatCurrency(invoice.amount) : formatCurrency(invoice.total_amount) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 rounded-2xl p-5 mb-6 flex flex-wrap gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-400", children: "Metode Bayar" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-indigo-900", children: invoice.payment_method || "-" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-400", children: "Status" }),
            /* @__PURE__ */ jsx("p", { className: `font-black ${statusColor}`, children: statusLabel })
          ] }),
          invoice.paid_at && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-400", children: "Tanggal Bayar" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-indigo-900", children: formatDate(invoice.paid_at) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[9px] text-gray-400 text-center leading-relaxed", children: [
          "Invoice ini diterbitkan secara elektronik oleh InDepth Clinic. Diinput oleh: ",
          invoice.created_by,
          ". Hubungi kami jika ada pertanyaan."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 p-6 border-t border-gray-100 no-print", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: printInvoice,
            className: "flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20",
            children: [
              /* @__PURE__ */ jsx(Printer, { className: "w-4 h-4" }),
              "Download / Print PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all",
            children: "Tutup"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                @media print {
                    body > * { display: none !important; }
                    .no-print { display: none !important; }
                    #invoice-print-area { display: block !important; }
                    .fixed { position: relative !important; background: white !important; }
                    .bg-black\\/60 { background: white !important; }
                }
            ` })
  ] });
}
export {
  InvoiceModal as I
};
