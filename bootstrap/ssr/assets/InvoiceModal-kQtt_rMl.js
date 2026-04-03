import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import "./AuthenticatedLayout-Dh5T1J79.js";
import "@inertiajs/react";
import { CreditCard, Download } from "lucide-react";
import "./TextInput-DcEnl-Ka.js";
function InvoiceModal({ invoice, onClose, type = "individual", bankAccounts = [] }) {
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
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadPDF = () => {
    setIsDownloading(true);
    const element = document.getElementById("invoice-print-area");
    const doDownload = () => {
      const opt = {
        margin: [10, 10, 10, 10],
        // top, left, bottom, right
        filename: `Invoice_${invoice.invoice_number}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
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
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-10 pb-10 sm:pt-20 bg-black/60 backdrop-blur-sm overflow-y-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl mt-auto mb-auto bg-clip-padding relative", children: [
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
        invoice.payment_status === "pending" && (!invoice.payment_method || invoice.payment_method === "Transfer Bank") && bankAccounts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/50 rounded-2xl p-5 mb-6", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "w-4 h-4" }),
            " Tujuan Transfer Bank"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: bankAccounts.map((b, idx) => /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("span", { className: "text-white font-black text-[10px]", children: b.bank }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-gray-900", children: b.holder }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-mono font-black text-indigo-600", children: b.account })
            ] })
          ] }) }, idx)) })
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
            onClick: downloadPDF,
            disabled: isDownloading,
            className: `flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 ${isDownloading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`,
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
              isDownloading ? "Memproses PDF..." : "Download PDF"
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
                    body * { visibility: hidden; }
                    #invoice-print-area, #invoice-print-area * { visibility: visible; }
                    #invoice-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white;
                    }
                    .no-print { display: none !important; }
                    .fixed { position: static !important; background: transparent !important; }
                    .bg-black\\/60 { background: transparent !important; }
                }
            ` })
  ] });
}
export {
  InvoiceModal as I
};
