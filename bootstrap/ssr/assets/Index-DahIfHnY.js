import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function BookingIndex({ bookings, profileProgress }) {
  const isProfileComplete = profileProgress ? profileProgress.percentage === 100 : true;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Hasil Sesi Terapis & Riwayat" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Hasil Sesi & Riwayat" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          bookings.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Belum ada riwayat sesi" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Anda belum pernah melakukan sesi konsultasi sebelumnya." }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: isProfileComplete ? /* @__PURE__ */ jsx(
              Link,
              {
                href: route("bookings.create"),
                className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150",
                children: "Buat Reservasi Baru"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: true,
                  className: "inline-flex items-center px-4 py-2 bg-gray-400 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest cursor-not-allowed opacity-75",
                  children: "Buat Reservasi Baru"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-md mt-1 text-center", children: "Anda harus melengkapi profil hingga 100% sebelum membuat janji temu" })
            ] }) })
          ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Invoice / Booking Code" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Paket Layanan" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Terapis & Jadwal" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Total Transaksi" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-right", children: "Aksi" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: bookings.data.map((booking) => {
              const isPendingPayment = booking.status === "pending_payment";
              const isPendingValidation = booking.status === "pending_validation";
              const isPendingScreening = booking.status === "pending_screening";
              const isConfirmed = booking.status === "confirmed";
              const isCancelled = booking.status === "cancelled";
              const amount = booking.transaction?.amount ? new Intl.NumberFormat("id-ID").format(booking.transaction.amount) : "-";
              return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", children: [
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top", children: [
                  /* @__PURE__ */ jsxs("div", { className: "font-semibold text-indigo-600 dark:text-indigo-400", children: [
                    "#",
                    booking.booking_code
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-1", children: booking.transaction?.invoice_number || "-" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: new Date(booking.created_at).toLocaleDateString("id-ID") })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 align-top", children: /* @__PURE__ */ jsx("div", { className: "font-medium whitespace-nowrap", children: booking.package_type === "vip" ? "Paket VIP" : booking.package_type === "upgrade" ? "Paket Upgrade" : "Paket Hipnoterapi" }) }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top min-w-[200px]", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium", children: booking.therapist?.name || booking.schedule?.therapist?.name || "-" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: booking.schedule ? new Date(booking.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 shrink-0", children: booking.schedule ? `${booking.schedule.start_time?.substring(0, 5) || "--:--"} - ${booking.schedule.end_time?.substring(0, 5) || "--:--"} WIB` : "-" })
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top font-semibold text-gray-700 dark:text-gray-300", children: [
                  "Rp ",
                  amount
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top", children: [
                  isConfirmed && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", children: "Dikonfirmasi" }),
                  isPendingPayment && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", children: "Menunggu Pembayaran" }),
                  isPendingValidation && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", children: "Validasi Admin" }),
                  isPendingScreening && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300", children: "Skrining" }),
                  isCancelled && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", children: "Dibatalkan" })
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top text-right space-y-2", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("bookings.show", booking.id),
                      className: "block text-sm font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors",
                      children: "Lihat Detail →"
                    }
                  ),
                  isPendingPayment && /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("bookings.cancel", booking.id),
                      method: "post",
                      as: "button",
                      onClick: (e) => {
                        if (!confirm("Batalkan booking ini untuk memilih jadwal baru?")) e.preventDefault();
                      },
                      className: "block text-[10px] font-black uppercase text-red-500 hover:text-red-700 transition-colors text-right w-full",
                      children: "Ganti Jadwal"
                    }
                  )
                ] })
              ] }, booking.id);
            }) })
          ] }) }),
          bookings.links && bookings.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-1", children: bookings.links.map((link, i) => /* @__PURE__ */ jsx("div", { children: link.url === null ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "mb-1 mr-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded",
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) : /* @__PURE__ */ jsx(
            Link,
            {
              href: link.url,
              className: `mb-1 mr-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-gray-50 focus:border-indigo-500 focus:text-indigo-500 ${link.active ? "bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"}`,
              dangerouslySetInnerHTML: { __html: link.label }
            }
          ) }, i)) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  BookingIndex as default
};
