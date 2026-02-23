import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { useForm, Head, router } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function formatRp(amount) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
}
function VoucherRow({ voucher, onEdit, onDelete }) {
  const isExpired = voucher.valid_until && new Date(voucher.valid_until) < /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors", children: [
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-mono font-bold text-sm text-indigo-700 dark:text-indigo-400", children: voucher.code }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-600 dark:text-gray-300", children: voucher.description || "—" }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm font-semibold text-green-700 dark:text-green-400", children: formatRp(voucher.discount_amount) }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-sm text-gray-500 dark:text-gray-400", children: [
      voucher.user_vouchers_count,
      " ",
      voucher.max_claims ? `/ ${voucher.max_claims}` : "∞"
    ] }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-sm text-gray-500 dark:text-gray-400", children: voucher.valid_until ? new Date(voucher.valid_until).toLocaleDateString("id-ID") : "—" }),
    /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${!voucher.is_active || isExpired ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`, children: !voucher.is_active ? "Nonaktif" : isExpired ? "Kadaluarsa" : "Aktif" }) }),
    /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-right space-x-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => onEdit(voucher), className: "text-xs text-indigo-600 dark:text-indigo-400 hover:underline", children: "Edit" }),
      /* @__PURE__ */ jsx("button", { onClick: () => onDelete(voucher.id), className: "text-xs text-red-600 dark:text-red-400 hover:underline", children: "Hapus" })
    ] })
  ] });
}
function VouchersIndex({ vouchers }) {
  const [showForm, setShowForm] = useState(false);
  const [editVoucher, setEditVoucher] = useState(null);
  const { data, setData, post, patch, processing, errors, reset } = useForm({
    code: "",
    description: "",
    discount_amount: "",
    max_claims: "",
    valid_from: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    valid_until: "",
    is_active: true
  });
  const handleEdit = (v) => {
    setEditVoucher(v);
    setData({
      code: v.code,
      description: v.description || "",
      discount_amount: v.discount_amount,
      max_claims: v.max_claims || "",
      valid_from: v.valid_from ? v.valid_from.split("T")[0] : "",
      valid_until: v.valid_until ? v.valid_until.split("T")[0] : "",
      is_active: v.is_active
    });
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (confirm("Hapus voucher ini? Klaim yang sudah ada tidak terpengaruh.")) {
      router.delete(route("admin.pricing.vouchers.destroy", id));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editVoucher) {
      patch(route("admin.pricing.vouchers.update", editVoucher.id), {
        onSuccess: () => {
          setShowForm(false);
          setEditVoucher(null);
          reset();
        }
      });
    } else {
      post(route("admin.pricing.vouchers.store"), {
        onSuccess: () => {
          setShowForm(false);
          reset();
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Manajemen Harga — Kelola Voucher" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Voucher" }),
    /* @__PURE__ */ jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Kelola kode voucher promosi. Voucher VIP diterbitkan otomatis oleh sistem." }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setShowForm(true);
              setEditVoucher(null);
              reset();
            },
            className: "inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
              "Buat Voucher"
            ]
          }
        )
      ] }),
      showForm && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-4", children: editVoucher ? `Edit Voucher: ${editVoucher.code}` : "Buat Voucher Baru" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          !editVoucher && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Kode Voucher *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.code,
                onChange: (e) => setData("code", e.target.value.toUpperCase()),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white uppercase font-mono",
                placeholder: "PROMO50"
              }
            ),
            errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.code })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Nilai Diskon (IDR) *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.discount_amount,
                onChange: (e) => setData("discount_amount", e.target.value),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white",
                placeholder: "500000"
              }
            ),
            errors.discount_amount && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.discount_amount })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Deskripsi" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white",
                placeholder: "Diskon spesial..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Maks. Klaim (kosong = bebas)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: data.max_claims,
                onChange: (e) => setData("max_claims", e.target.value),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white",
                placeholder: "100"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Berlaku Mulai *" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.valid_from,
                onChange: (e) => setData("valid_from", e.target.value),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Berlaku Sampai (kosong = selamanya)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: data.valid_until,
                onChange: (e) => setData("valid_until", e.target.value),
                className: "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
              }
            )
          ] }),
          editVoucher && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "is_active",
                checked: data.is_active,
                onChange: (e) => setData("is_active", e.target.checked),
                className: "w-4 h-4 rounded"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "is_active", className: "text-sm text-gray-700 dark:text-gray-300", children: "Aktifkan voucher" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setShowForm(false);
                  reset();
                },
                className: "px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                children: "Batal"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors",
                children: processing ? "Menyimpan..." : editVoucher ? "Update" : "Simpan"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Kode" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Deskripsi" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Nilai Diskon" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Diklaim" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Berlaku s/d" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: vouchers.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500 italic", children: "Belum ada voucher. Buat voucher pertama Anda!" }) }) : vouchers.map((v) => /* @__PURE__ */ jsx(VoucherRow, { voucher: v, onEdit: handleEdit, onDelete: handleDelete }, v.id)) })
      ] }) }) })
    ] }) })
  ] });
}
export {
  VouchersIndex as default
};
