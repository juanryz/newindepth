import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function formatRp(amount) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
}
function VoucherCard({ uv }) {
  const statusColor = uv.is_used ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30" : uv.is_expired ? "border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-900/10" : "border-green-200 bg-green-50 dark:border-green-700/50 dark:bg-green-900/15";
  const badgeColor = uv.is_used ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400" : uv.is_expired ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
  const badgeLabel = uv.is_used ? "Sudah Dipakai" : uv.is_expired ? "Kadaluarsa" : "Aktif";
  return /* @__PURE__ */ jsxs("div", { className: `rounded-2xl border p-5 ${statusColor}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono font-extrabold text-xl tracking-widest text-indigo-700 dark:text-indigo-400", children: uv.code }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-0.5", children: uv.description || "—" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: `text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`, children: badgeLabel })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-green-700 dark:text-green-400", children: formatRp(uv.discount_amount) }),
      /* @__PURE__ */ jsxs("div", { className: "text-right text-xs text-gray-400 dark:text-gray-500", children: [
        uv.expired_at && /* @__PURE__ */ jsxs("p", { children: [
          "Berlaku s/d ",
          new Date(uv.expired_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "capitalize", children: uv.type === "vip_reward" ? "🎁 Reward VIP" : "🏷️ Kode Promo" })
      ] })
    ] })
  ] });
}
function VouchersPatientIndex({ userVouchers }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({ code: "" });
  const handleClaim = (e) => {
    e.preventDefault();
    post(route("vouchers.claim"), { onSuccess: () => reset() });
  };
  const activeVouchers = userVouchers.filter((v) => v.is_active);
  const inactiveVouchers = userVouchers.filter((v) => !v.is_active);
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Voucher Saya" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Voucher Saya" }),
    /* @__PURE__ */ jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
      flash?.success && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-sm text-green-800 dark:text-green-300 font-medium", children: [
        "✅ ",
        flash.success
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white mb-1", children: "Punya Kode Voucher?" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: "Masukkan kode promo untuk mendapatkan diskon. Setiap kode hanya bisa diklaim 1x." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleClaim, className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.code,
              onChange: (e) => setData("code", e.target.value.toUpperCase()),
              placeholder: "Contoh: PROMO50",
              className: "flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 font-mono uppercase text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing || !data.code,
              className: "px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors",
              children: "Klaim"
            }
          )
        ] }),
        errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-2", children: errors.code })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3", children: [
          "Voucher Aktif (",
          activeVouchers.length,
          ")"
        ] }),
        activeVouchers.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500 italic", children: "Anda belum memiliki voucher aktif." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: activeVouchers.map((uv) => /* @__PURE__ */ jsx(VoucherCard, { uv }, uv.id)) })
      ] }),
      inactiveVouchers.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3", children: "Riwayat Voucher" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: inactiveVouchers.map((uv) => /* @__PURE__ */ jsx(VoucherCard, { uv }, uv.id)) })
      ] })
    ] }) })
  ] });
}
export {
  VouchersPatientIndex as default
};
