import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
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
function PackageCard({ pkg, onEdit }) {
  const hasDiscount = pkg.discount_percentage > 0;
  const isDiscountActive = !pkg.discount_ends_at || new Date(pkg.discount_ends_at) > /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-5 flex-1 space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: pkg.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2", children: pkg.description })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${pkg.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`, children: pkg.is_active ? "Aktif" : "Draft" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-900 dark:text-white", children: formatRp(pkg.current_price) }),
          hasDiscount && isDiscountActive && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 line-through", children: formatRp(pkg.base_price) })
        ] }),
        hasDiscount && isDiscountActive && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxs("span", { className: "px-1.5 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold rounded", children: [
            "DISKON ",
            pkg.discount_percentage,
            "%"
          ] }),
          pkg.discount_ends_at && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-500 italic", children: [
            "s/d ",
            new Date(pkg.discount_ends_at).toLocaleDateString("id-ID")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1 mt-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: "Fitur Utama" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: Array.isArray(pkg.features) && pkg.features.slice(0, 3).map((f, i) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-emerald-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M5 13l4 4L19 7" }) }),
          f
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onEdit(pkg),
        className: "w-full py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase tracking-wider",
        children: "Edit Paket & Diskon"
      }
    )
  ] });
}
function PricingIndex({ vouchers = [], packages = [] }) {
  const [activeTab, setActiveTab] = useState(window.location.pathname.endsWith("/vouchers") ? "vouchers" : "packages");
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const [editVoucher, setEditVoucher] = useState(null);
  const [editPackage, setEditPackage] = useState(null);
  const voucherForm = useForm({
    code: "",
    description: "",
    discount_amount: "",
    max_claims: "",
    valid_from: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    valid_until: "",
    is_active: true
  });
  const packageForm = useForm({
    name: "",
    description: "",
    base_price: "",
    discount_percentage: 0,
    discount_ends_at: "",
    is_active: true,
    features: []
  });
  const handleEditVoucher = (v) => {
    setEditVoucher(v);
    voucherForm.setData({
      code: v.code,
      description: v.description || "",
      discount_amount: v.discount_amount,
      max_claims: v.max_claims || "",
      valid_from: v.valid_from ? v.valid_from.split("T")[0] : "",
      valid_until: v.valid_until ? v.valid_until.split("T")[0] : "",
      is_active: !!v.is_active
    });
    setShowVoucherForm(true);
  };
  const handleEditPackage = (p) => {
    setEditPackage(p);
    packageForm.setData({
      name: p.name,
      description: p.description || "",
      base_price: p.base_price,
      discount_percentage: p.discount_percentage,
      discount_ends_at: p.discount_ends_at ? p.discount_ends_at.split("T")[0] : "",
      is_active: !!p.is_active,
      features: p.features || []
    });
  };
  const handleVoucherSubmit = (e) => {
    e.preventDefault();
    if (editVoucher) {
      voucherForm.patch(route("admin.pricing.vouchers.update", editVoucher.id), {
        onSuccess: () => {
          setShowVoucherForm(false);
          setEditVoucher(null);
          voucherForm.reset();
        }
      });
    } else {
      voucherForm.post(route("admin.pricing.vouchers.store"), {
        onSuccess: () => {
          setShowVoucherForm(false);
          voucherForm.reset();
        }
      });
    }
  };
  const handlePackageSubmit = (e) => {
    e.preventDefault();
    packageForm.patch(route("admin.pricing.packages.update", editPackage.id), {
      onSuccess: () => {
        setEditPackage(null);
      }
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Manajemen Harga" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Kelola Harga & Voucher" }),
    /* @__PURE__ */ jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab("packages"),
            className: `px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "packages" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: "Paket Layanan"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab("vouchers"),
            className: `px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === "vouchers" ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`,
            children: "Voucher Promo"
          }
        )
      ] }),
      activeTab === "packages" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: packages.map((p) => /* @__PURE__ */ jsx(PackageCard, { pkg: p, onEdit: handleEditPackage }, p.id)) }),
        editPackage && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-indigo-200 dark:border-indigo-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-600 px-6 py-4 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-white font-bold", children: [
              "Edit Paket: ",
              editPackage.name
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setEditPackage(null), className: "text-white hover:bg-white/10 rounded-full p-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handlePackageSubmit, className: "p-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Nama Paket" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: packageForm.data.name, onChange: (e) => packageForm.setData("name", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Deskripsi Pendek" }),
                /* @__PURE__ */ jsx("textarea", { rows: "2", value: packageForm.data.description, onChange: (e) => packageForm.setData("description", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Harga Dasar (Rp)" }),
                  /* @__PURE__ */ jsx("input", { type: "number", value: packageForm.data.base_price, onChange: (e) => packageForm.setData("base_price", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-end pb-3", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: packageForm.data.is_active, onChange: (e) => packageForm.setData("is_active", e.target.checked), className: "w-5 h-5 rounded text-indigo-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold dark:text-gray-300", children: "Tampilkan di public" })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl space-y-4 border border-gray-100 dark:border-gray-700", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Pengaturan Diskon" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "Persen Diskon (0-100)" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("input", { type: "number", min: "0", max: "100", value: packageForm.data.discount_percentage, onChange: (e) => packageForm.setData("discount_percentage", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pr-10" }),
                  /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold", children: "%" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-500 mb-1", children: "Berlaku Sampai" }),
                /* @__PURE__ */ jsx("input", { type: "date", value: packageForm.data.discount_ends_at, onChange: (e) => packageForm.setData("discount_ends_at", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl text-sm" }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1 italic", children: "Kosongkan jika tidak ada batas waktu diskon." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: packageForm.processing, className: "w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-50", children: packageForm.processing ? "Menyimpan..." : "Update Tarif" }) })
            ] })
          ] })
        ] })
      ] }),
      activeTab === "vouchers" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
            "Total: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: vouchers.length }),
            " voucher terdaftar."
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setShowVoucherForm(true);
                setEditVoucher(null);
                voucherForm.reset();
              },
              className: "px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }),
                "Tambah Voucher"
              ]
            }
          )
        ] }),
        showVoucherForm && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 overflow-hidden animate-in fade-in slide-in-from-top-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg text-gray-900 dark:text-white", children: editVoucher ? `Edit Voucher: ${editVoucher.code}` : "Buat Voucher Baru" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowVoucherForm(false), className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleVoucherSubmit, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
            !editVoucher && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Kode Voucher *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: voucherForm.data.code,
                  onChange: (e) => voucherForm.setData("code", e.target.value.toUpperCase()),
                  className: "w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white uppercase font-mono font-bold",
                  placeholder: "PROMO2024"
                }
              ),
              voucherForm.errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1", children: voucherForm.errors.code })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Potongan Harga (Rp) *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: voucherForm.data.discount_amount,
                  onChange: (e) => voucherForm.setData("discount_amount", e.target.value),
                  className: "w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white font-bold text-green-600",
                  placeholder: "50000"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Keterangan" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: voucherForm.data.description,
                  onChange: (e) => voucherForm.setData("description", e.target.value),
                  className: "w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white",
                  placeholder: "Khusus pengguna baru..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Kapasitas (kosong = ∞)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: voucherForm.data.max_claims,
                  onChange: (e) => voucherForm.setData("max_claims", e.target.value),
                  className: "w-full border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 dark:bg-gray-700 dark:text-white",
                  placeholder: "100"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Mulai" }),
                /* @__PURE__ */ jsx("input", { type: "date", value: voucherForm.data.valid_from, onChange: (e) => voucherForm.setData("valid_from", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 rounded-xl text-xs dark:bg-gray-700 dark:text-white" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Berakhir" }),
                /* @__PURE__ */ jsx("input", { type: "date", value: voucherForm.data.valid_until, onChange: (e) => voucherForm.setData("valid_until", e.target.value), className: "w-full border-gray-300 dark:border-gray-600 rounded-xl text-xs dark:bg-gray-700 dark:text-white" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer mt-6", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", checked: voucherForm.data.is_active, onChange: (e) => voucherForm.setData("is_active", e.target.checked), className: "w-5 h-5 rounded text-indigo-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold dark:text-gray-300", children: "Voucher Aktif" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4", children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShowVoucherForm(false), className: "px-6 py-2 border-gray-300 text-gray-500 font-bold hover:text-gray-700", children: "Batal" }),
              /* @__PURE__ */ jsx("button", { type: "submit", disabled: voucherForm.processing, className: "px-8 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 disabled:opacity-50", children: voucherForm.processing ? "Menyimpan..." : editVoucher ? "Update Voucher" : "Simpan Voucher" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Kode" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Deskripsi" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Potongan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Penggunaan" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Berlaku s/d" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: vouchers.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500 italic", children: "Belum ada voucher yang tersedia." }) }) : vouchers.map((v) => /* @__PURE__ */ jsx(VoucherRow, { voucher: v, onEdit: handleEditVoucher, onDelete: (id) => {
            if (confirm("Hapus voucher?")) router.delete(route("admin.pricing.vouchers.destroy", id));
          } }, v.id)) })
        ] }) }) })
      ] })
    ] }) })
  ] });
}
export {
  PricingIndex as default
};
