import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function TransactionHistory({ transactions, profileProgress }) {
  const isProfileComplete = profileProgress ? profileProgress.percentage === 100 : true;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Riwayat Transaksi" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Riwayat Transaksi" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
          !transactions || transactions.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gray-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Belum ada riwayat transaksi" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: "Anda belum pernah melakukan reservasi atau transaksi sebelumnya." }),
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
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Invoice / Kode Transaksi" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Paket / Layanan" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Terapis & Jadwal" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Total Transaksi" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-right", children: "Aksi" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: transactions.data.map((tx) => {
              const isCourse = tx.transactionable_type?.includes("Course");
              const isBooking = tx.transactionable_type?.includes("Booking");
              const amount = tx.amount ? new Intl.NumberFormat("id-ID").format(tx.amount) : "-";
              const status = tx.status || "";
              let isPending = status === "pending";
              let isCompleted = status === "completed" || status === "paid";
              let isDeclined = status === "declined" || status === "rejected";
              let isCancelled = status === "cancelled";
              let isExpired = status === "expired";
              if (isBooking && tx.transactionable?.status === "cancelled") {
                isCancelled = true;
                isPending = false;
              }
              return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors", children: [
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top", children: [
                  /* @__PURE__ */ jsxs("div", { className: "font-semibold text-indigo-600 dark:text-indigo-400", children: [
                    "#",
                    tx.invoice_number || "-"
                  ] }),
                  isBooking && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
                    "Booking: ",
                    tx.transactionable?.booking_code || "-"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-1", children: new Date(tx.created_at).toLocaleDateString("id-ID") })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 align-top", children: /* @__PURE__ */ jsx("div", { className: "font-medium whitespace-nowrap", children: isCourse ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-indigo-500", children: "Kelas E-Learning" }),
                  /* @__PURE__ */ jsx("span", { children: tx.transactionable?.title || "-" })
                ] }) : isBooking ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-emerald-500", children: "Sesi Terapi" }),
                  /* @__PURE__ */ jsx("span", { children: tx.transactionable?.package_type === "vip" ? "Paket VIP" : tx.transactionable?.package_type === "upgrade" ? "Paket Upgrade" : "Paket Hipnoterapi" })
                ] }) : "-" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 align-top min-w-[200px]", children: isBooking && tx.transactionable ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium", children: tx.transactionable?.therapist?.name || tx.transactionable?.schedule?.therapist?.name || "-" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: tx.transactionable?.schedule ? new Date(tx.transactionable.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 shrink-0", children: tx.transactionable?.schedule ? `${tx.transactionable.schedule.start_time?.substring(0, 5) || "--:--"} - ${tx.transactionable.schedule.end_time?.substring(0, 5) || "--:--"} WIB` : "-" })
                ] }) : isCourse ? /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 italic mt-2", children: "Akses Selamanya" }) : "-" }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top font-semibold text-gray-700 dark:text-gray-300", children: [
                  "Rp ",
                  amount
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-4 px-4 align-top", children: [
                  isCompleted && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", children: "Pembayaran Lunas" }),
                  isPending && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", children: "Menunggu Pembayaran" }),
                  isDeclined && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", children: "Ditolak" }),
                  isCancelled && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300", children: "Dibatalkan" }),
                  isExpired && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400", children: "Kadaluarsa" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-4 px-4 align-top text-right whitespace-nowrap", children: isBooking ? /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("bookings.show", tx.transactionable_id),
                    className: "text-sm font-semibold text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors",
                    children: "Lihat Detail Booking →"
                  }
                ) : isCourse && isCompleted ? /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("courses.show", tx.transactionable_id),
                    className: "text-sm font-semibold text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors",
                    children: "Mulai Belajar →"
                  }
                ) : null })
              ] }, tx.id);
            }) })
          ] }) }),
          transactions?.links && transactions.data.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-1", children: transactions.links.map((link, i) => /* @__PURE__ */ jsx("div", { children: link.url === null ? /* @__PURE__ */ jsx(
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
  TransactionHistory as default
};
