import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { R as RefundPolicyContent } from "./RefundPolicyContent-MhQdzGec.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function TimeSlotPicker({ schedules = [], selectedScheduleId, onSelect }) {
  if (schedules.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400 text-sm italic text-center", children: "Belum ada jadwal yang tersedia untuk saat ini." });
  }
  const [filter, setFilter] = useState("week");
  const filteredSchedules = schedules.filter((curr) => {
    const safeDateStr = (curr.date || "").substring(0, 10);
    const dbDate = /* @__PURE__ */ new Date(`${safeDateStr}T00:00:00Z`);
    const idnFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(/* @__PURE__ */ new Date());
    const todayDate = /* @__PURE__ */ new Date(`${idnFormat}T00:00:00Z`);
    switch (filter) {
      case "day":
        return dbDate.getTime() === todayDate.getTime();
      case "week":
        const endOfWeek = new Date(todayDate);
        endOfWeek.setDate(todayDate.getDate() + 7);
        return dbDate.getTime() >= todayDate.getTime() && dbDate.getTime() <= endOfWeek.getTime();
      case "month":
        return dbDate.getUTCMonth() === todayDate.getUTCMonth() && dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
      case "year":
        return dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
      default:
        return true;
    }
  });
  const grouped = filteredSchedules.reduce((acc, curr) => {
    const safeDateStr = (curr.date || "").substring(0, 10);
    if (!acc[safeDateStr]) acc[safeDateStr] = [];
    acc[safeDateStr].push(curr);
    return acc;
  }, {});
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      { id: "day", label: "Hari Ini" },
      { id: "week", label: "Minggu Ini" },
      { id: "month", label: "Bulan Ini" },
      { id: "year", label: "Tahun Ini" },
      { id: "all", label: "Semua Jadwal" }
    ].map((tab) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(tab.id),
        className: `px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 border ${filter === tab.id ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform -translate-y-0.5" : "bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/60"}`,
        children: tab.label
      },
      tab.id
    )) }),
    Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-2xl text-gray-500 dark:text-gray-400 text-sm text-center italic", children: "Tidak ada jadwal yang sesuai dengan filter ini." }) : Object.entries(grouped).map(([date, slots]) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-2", children: new Date(date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: slots.map((slot) => {
        const isSelected = selectedScheduleId === slot.id;
        const count = slot.bookings_count ?? 0;
        const now = /* @__PURE__ */ new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        const parts = formatter.formatToParts(now).reduce((acc, part) => {
          acc[part.type] = part.value;
          return acc;
        }, {});
        const idnNow = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
        const bufferTime = new Date(idnNow.getTime() + 60 * 60 * 1e3);
        const [sh, sm, ss] = slot.start_time.split(":");
        const sd = new Date(slot.date);
        const slotStart = new Date(Date.UTC(sd.getUTCFullYear(), sd.getUTCMonth(), sd.getUTCDate(), sh, sm, ss));
        const isFull = slot.status === "full" || count >= slot.quota;
        const isPast = slotStart < bufferTime;
        const isDisabled = isFull || isPast;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => !isDisabled && onSelect(slot.id),
            disabled: isDisabled,
            className: `
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                        ${isDisabled ? "bg-gray-100/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed" : ""}
                                        ${!isDisabled && isSelected ? "bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-md transform -translate-y-1" : ""}
                                        ${!isDisabled && !isSelected ? "bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm" : ""}
                                    `,
            children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-sm text-center", children: [
                slot.start_time?.substring(0, 5) || "--:--",
                " - ",
                slot.end_time?.substring(0, 5) || "--:--"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: isFull ? "Penuh" : isPast ? "Lewat" : `${slot.quota - count} slot sisa` })
            ]
          },
          slot.id
        );
      }) })
    ] }, date))
  ] });
}
const POLICIES = {
  privacy: {
    title: "KEBIJAKAN PRIVASI",
    content: `InDepth Mental Wellness berkomitmen melindungi privasi data pribadi Anda sesuai standar perlindungan data yang berlaku di Indonesia.`
  }
};
function BookingCreate({ schedules, packageOptions, screeningResult }) {
  const { errors: pageErrors } = usePage().props;
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [privacyAgreements, setPrivacyAgreements] = useState({
    read: false,
    consent: false
  });
  const { data, setData, post, processing, errors } = useForm({
    schedule_id: "",
    package_type: packageOptions.recommended,
    agree_refund: false,
    agree_final: false,
    agree_access: false,
    agree_chargeback: false
  });
  const submit = (e) => {
    if (e) e.preventDefault();
    post(route("bookings.store"));
  };
  const handlePrivacyAccept = () => {
    if (privacyAgreements.read && privacyAgreements.consent) {
      setPrivacyAccepted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  if (!privacyAccepted) {
    return /* @__PURE__ */ jsxs(
      AuthenticatedLayout,
      {
        header: /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Kebijakan Privasi" }),
        children: [
          /* @__PURE__ */ jsx(Head, { title: "Persetujuan Privasi - InDepth" }),
          /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] border border-white/20 dark:border-gray-700/30 overflow-hidden animate-in fade-in zoom-in duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 text-center relative overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 opacity-20 pointer-events-none", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-48 h-48 bg-purple-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center border border-white/30 shadow-xl", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0014 2.054V1c0 .552.448 1 1 1s1-.448 1-1V.054a10.003 10.003 0 00-6.712 18.477l.054.09A10.003 10.003 0 0112 11z" }) }) }),
                /* @__PURE__ */ jsx("h1", { className: "text-xl font-black text-white uppercase tracking-tighter", children: POLICIES.privacy.title }),
                /* @__PURE__ */ jsx("p", { className: "text-indigo-100 text-xs font-medium", children: "Langkah 1: Persetujuan Pengolahan Data" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 h-[400px] overflow-y-auto custom-scrollbar text-xs leading-relaxed text-gray-600 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900 dark:text-white mb-4 italic", children: [
                  "Terakhir diperbarui: ",
                  POLICIES.privacy.updated
                ] }),
                /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: POLICIES.privacy.content })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
                { id: "read", label: "Saya telah membaca dan memahami kebijakan privasi ini." },
                { id: "consent", label: "Saya setuju data saya diolah sesuai dengan ketentuan di atas." }
              ].map((item) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${privacyAgreements[item.id] ? "bg-indigo-50/50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800" : "bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 hover:border-indigo-100"}`, children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: privacyAgreements[item.id],
                    onChange: (e) => setPrivacyAgreements({ ...privacyAgreements, [item.id]: e.target.checked }),
                    className: "mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: `text-sm font-bold ${privacyAgreements[item.id] ? "text-indigo-900 dark:text-indigo-200" : "text-gray-600 dark:text-gray-400"}`, children: item.label })
              ] }, item.id)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handlePrivacyAccept,
                  disabled: !(privacyAgreements.read && privacyAgreements.consent),
                  className: `w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${privacyAgreements.read && privacyAgreements.consent ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]" : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"}`,
                  children: "Lanjut Pilih Jadwal & Paket"
                }
              )
            ] })
          ] }) }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Buat Janji Temu Hipnoterapi" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Booking Hipnoterapi" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setPrivacyAccepted(false),
              className: "flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors group",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
                "Kembali ke Kebijakan Privasi"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => setPrivacyAccepted(false),
                className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-900/30 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group",
                children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
                    "Status Persetujuan Privasi"
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-emerald-700 dark:text-emerald-400 font-bold", children: "✓ Kebijakan Privasi telah disetujui. Klik untuk baca ulang." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl overflow-hidden border border-indigo-100 dark:border-indigo-900/30", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                "Dokumen Perjanjian"
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("agreement.show"),
                  className: "text-xs font-bold text-indigo-600 hover:underline",
                  children: "Lihat Standar Perjanjian Layanan (PDF)"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-2", children: "Pilih Program Terapi" }),
              packageOptions.is_vip_only ? /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-600 dark:text-amber-400 font-medium", children: "⚠️ Berdasarkan hasil skrining, kondisi Anda memerlukan penanganan intensif dan prioritas penjadwalan. Anda hanya dapat memilih Paket VIP." }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Silakan pilih paket terapi yang sesuai dengan kebutuhan Anda. Kami merekomendasikan Paket Reguler berdasarkan hasil skrining Anda." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/30 leading-relaxed", children: [
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: Object.values(packageOptions.packages).map((pkg) => {
                const isRecommended = packageOptions.recommended === pkg.id;
                const isDisabled = packageOptions.is_vip_only && pkg.id !== "vip";
                const isSelected = data.package_type === pkg.id;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer flex flex-col ${isSelected ? "border-gold-500 bg-gold-50/50 dark:bg-gold-900/30 shadow-lg transform -translate-y-1" : isDisabled ? "border-gray-200 dark:border-gray-700/50 bg-gray-100/50 dark:bg-gray-800/30 opacity-60 cursor-not-allowed" : "border-gray-200 dark:border-gray-700/50 bg-white/40 dark:bg-gray-800/40 hover:border-gold-300 dark:hover:border-gold-600 hover:shadow-md hover:-translate-y-0.5"}`,
                    onClick: () => !isDisabled && setData("package_type", pkg.id),
                    children: [
                      packageOptions.is_vip_only && pkg.id === "vip" && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse", children: "Wajib Dipilih" }),
                      !packageOptions.is_vip_only && isRecommended && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-4 bg-gradient-to-r from-gold-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm", children: "Rekomendasi Utama" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                        /* @__PURE__ */ jsx("h4", { className: `font-bold text-lg leading-tight ${isSelected ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-200"}`, children: pkg.name }),
                        /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-gold-500 bg-white dark:bg-gray-800" : "border-gray-300 dark:border-gray-600"}`, children: isSelected && /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-gold-500" }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
                        pkg.original_price && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400 line-through decoration-red-500/50 decoration-2 mb-1", children: [
                          "Rp ",
                          new Intl.NumberFormat("id-ID").format(pkg.original_price)
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-yellow-600 select-none", children: [
                          "Rp ",
                          new Intl.NumberFormat("id-ID").format(pkg.price)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: `text-sm flex-grow font-medium ${isSelected ? "text-gray-700 dark:text-gray-300" : "text-gray-600 dark:text-gray-400"}`, children: pkg.description })
                    ]
                  },
                  pkg.id
                );
              }) }),
              errors.package_type && /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-red-600 mt-4 px-2", children: errors.package_type })
            ] })
          ] }),
          pageErrors.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50", children: pageErrors.error }),
          /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
            e.preventDefault();
            setShowRefundModal(true);
          }, children: /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white mb-6", children: "Pilih Waktu Konsultasi" }),
            /* @__PURE__ */ jsx(
              TimeSlotPicker,
              {
                schedules,
                selectedScheduleId: data.schedule_id,
                onSelect: (id) => setData("schedule_id", id)
              }
            ),
            errors.schedule_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.schedule_id }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                type: "submit",
                disabled: !data.schedule_id || processing,
                className: "!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-3 !text-xs !tracking-widest !font-black !h-auto !shadow-none !uppercase",
                children: "Konfirmasi Booking & Lanjut Pembayaran"
              }
            ) })
          ] }) })
        ] }) }),
        showRefundModal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-300", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-red-600 to-rose-700 p-8 text-white relative flex-shrink-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black uppercase tracking-tighter", children: POLICIES.refund.title }),
            /* @__PURE__ */ jsx("p", { className: "text-red-100 text-sm font-bold opacity-80 uppercase tracking-widest mt-1", children: "Langkah Terakhir: Konfirmasi Transaksi Final" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowRefundModal(false), className: "absolute top-8 right-8 text-white/50 hover:text-white transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10 overflow-y-auto custom-scrollbar space-y-8 flex-grow", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-black/20 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 text-xs leading-relaxed text-gray-600 dark:text-gray-400 shadow-inner", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 dark:text-white mb-4", children: "PENTING: Mohon baca kebijakan non-refund kami secara seksama sebelum membayar." }),
              /* @__PURE__ */ jsx(RefundPolicyContent, {})
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [
              { id: "agree_refund", label: "Saya menyatakan telah membaca dan menyetujui Kebijakan Non-Refund." },
              { id: "agree_final", label: "Saya memahami bahwa pembayaran ini bersifat FINAL dan TIDAK DAPAT DIREFUND." },
              { id: "agree_access", label: "Saya menyetujui bahwa layanan dianggap telah diberikan sejak jadwal dikonfirmasi." },
              { id: "agree_chargeback", label: "Saya tidak akan mengajukan chargeback/sengketa tanpa dasar hukum (UU ITE)." }
            ].map((item) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data[item.id] ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/40" : "bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800"}`, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: data[item.id],
                  onChange: (e) => setData(item.id, e.target.checked),
                  className: "mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: `text-xs font-bold leading-tight ${data[item.id] ? "text-red-900 dark:text-red-200" : "text-gray-600 dark:text-gray-400"}`, children: item.label })
            ] }, item.id)) }),
            /* @__PURE__ */ jsx("div", { className: "p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] text-amber-800 dark:text-amber-400 font-bold leading-relaxed", children: "DENGAN MENEKAN TOMBOL DI BAWAH, ANDA MENYATAKAN TRANSAKSI INI SAH SECARA HUKUM DAN BERSETUJU UNTUK TIDAK MELAKUKAN PEMBATALAN SEPIHAK." }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-4 flex-shrink-0", children: [
            Object.keys(errors).length > 0 && /* @__PURE__ */ jsxs("div", { className: "w-full p-4 mb-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl font-bold", children: [
              /* @__PURE__ */ jsx("p", { className: "mb-1 uppercase tracking-widest", children: "Maaf, terjadi kesalahan:" }),
              /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside", children: Object.values(errors).map((err, i) => /* @__PURE__ */ jsx("li", { children: err }, i)) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: submit,
                disabled: !(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback) || processing,
                className: `w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all shadow-2xl ${data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback ? "bg-gradient-to-r from-red-600 to-rose-700 text-white hover:scale-[1.02] active:scale-[0.98] shadow-red-500/20" : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed"}`,
                children: "SAYA SETUJU & LANJUT PEMBAYARAN"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowRefundModal(false),
                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors",
                children: "Kembali ke form booking"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  BookingCreate as default
};
