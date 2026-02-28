import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BhWsY9sM.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-BfaDD_kK.js";
import "framer-motion";
function formatRp(amount) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(amount);
}
function PackageCard({ pkg }) {
  const hasDiscount = pkg.discount_percentage > 0;
  const isDiscountActive = !pkg.discount_ends_at || new Date(pkg.discount_ends_at) > /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex-1 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-extrabold text-gray-900 dark:text-white text-lg group-hover:text-indigo-600 transition-colors", children: pkg.name }),
          hasDiscount && isDiscountActive && /* @__PURE__ */ jsxs("span", { className: "bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter", children: [
            "HEMAT ",
            pkg.discount_percentage,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4 h-10 overflow-hidden line-clamp-2 italic leading-relaxed", children: [
          '"',
          pkg.description,
          '"'
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2 mt-4", children: pkg.features?.slice(0, 4).map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400", children: [
          /* @__PURE__ */ jsx("span", { className: "text-indigo-500 font-bold", children: "•" }),
          f
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-6 border-t border-gray-50 dark:border-gray-700/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-gray-900 dark:text-white", children: formatRp(pkg.current_price) }),
          hasDiscount && isDiscountActive && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 line-through", children: formatRp(pkg.base_price) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1", children: "Estimasi per sesi" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("bookings.create"),
        className: "w-full py-4 text-center bg-gray-900 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 font-bold text-xs uppercase tracking-widest transition-all",
        children: "Pilih Jadwal"
      }
    )
  ] });
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
function VouchersPatientIndex({ userVouchers, packages }) {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, reset } = useForm({ code: "" });
  const handleClaim = (e) => {
    e.preventDefault();
    post(route("vouchers.claim"), { onSuccess: () => reset() });
  };
  const activeVouchers = userVouchers.filter((v) => v.is_active);
  const inactiveVouchers = userVouchers.filter((v) => !v.is_active);
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Paket & Voucher" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Pilihan Paket & Voucher Saya" }),
    /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50/50 dark:bg-gray-950/20 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
      /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-2 mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black text-gray-900 dark:text-white tracking-tight", children: "Pilihan Paket Terapi" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 max-w-lg", children: "Pilih paket yang paling sesuai dengan kebutuhan wellness Anda. Dapatkan diskon otomatis pada paket yang sedang promo." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: packages.map((p) => /* @__PURE__ */ jsx(PackageCard, { pkg: p }, p.id)) })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "border-gray-200 dark:border-gray-800" }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-10", children: [
        flash?.success && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-sm text-green-800 dark:text-green-300 font-medium animate-bounce", children: [
          "✅ ",
          flash.success
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-indigo-500/5 p-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-1", children: "Klaim Voucher Promo" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-6", children: "Punya kode promo dari admin atau event? Masukkan kodenya di sini untuk mendapatkan keuntungan ekstra." }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleClaim, className: "flex flex-col sm:flex-row gap-4", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: data.code,
                onChange: (e) => setData("code", e.target.value.toUpperCase()),
                placeholder: "MASUKKAN KODE DISINI",
                className: "flex-1 border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-3 font-mono font-black uppercase text-base dark:bg-gray-700 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing || !data.code,
                className: "px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all active:scale-95",
                children: "Tukarkan"
              }
            )
          ] }),
          errors.code && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-3 font-medium", children: errors.code })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500", children: [
              "Voucher Saya (",
              activeVouchers.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gray-100 dark:bg-gray-800" })
          ] }),
          activeVouchers.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-10 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500", children: "Belum ada voucher aktif yang siap digunakan." }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: activeVouchers.map((uv) => /* @__PURE__ */ jsx(VoucherCard, { uv }, uv.id)) })
        ] }),
        inactiveVouchers.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-8 space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 opacity-50", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500", children: "Riwayat Penggunaan" }),
            /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gray-100 dark:bg-gray-800" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60", children: inactiveVouchers.map((uv) => /* @__PURE__ */ jsx(VoucherCard, { uv }, uv.id)) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  VouchersPatientIndex as default
};
