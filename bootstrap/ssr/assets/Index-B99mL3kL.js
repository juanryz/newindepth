import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { Head, Link, router } from "@inertiajs/react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from "recharts";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
const PIE_COLORS = {
  "pending_payment": "#f59e0b",
  // amber-500
  "pending": "#f59e0b",
  // amber-500
  "confirmed": "#3b82f6",
  // blue-500
  "in_progress": "#6366f1",
  // indigo-500
  "done": "#10b981",
  // emerald-500
  "completed": "#10b981",
  // emerald-500
  "cancelled": "#ef4444"
  // red-500
};
const STATUS_LABELS = {
  "pending_payment": "Menunggu Pembayaran",
  "pending": "Menunggu Konfirmasi",
  "confirmed": "Dikonfirmasi",
  "in_progress": "Sedang Berlangsung",
  "done": "Selesai",
  "completed": "Selesai",
  "cancelled": "Dibatalkan"
};
function ReportsIndex({ stats, recentTransactions, recentExpenses, filters, charts }) {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    router.get(route("admin.reports.index"), {
      ...filters,
      [name]: value
    }, { preserveState: true });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Laporan Keuangan Klinik" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => window.print(),
              className: "inline-flex items-center px-4 py-2 border border-gray-100 dark:border-gray-800 rounded-xl font-bold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 backdrop-blur-md transition-all duration-300 bg-white/50 dark:bg-gray-900/50",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" }) }),
                "Cetak Laporan"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: route("admin.reports.export-csv", filters),
              className: "inline-flex items-center px-6 py-2 border border-transparent rounded-xl font-black text-xs text-white uppercase tracking-widest bg-gold-600 hover:bg-gold-500 shadow-xl shadow-gold-600/20 transition-all duration-300 transform active:scale-95",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                "Export CSV"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Laporan Keuangan" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 pb-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-5 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-3xl flex flex-wrap gap-6 items-center border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-gold-500 rounded-full" }),
              /* @__PURE__ */ jsx("span", { className: "font-black text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400", children: "Filter Periode" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "month",
                  className: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-gold-500/20 focus:border-gold-500 dark:text-white transition-all cursor-pointer font-bold",
                  value: filters.month,
                  onChange: handleFilterChange,
                  children: Array.from({ length: 12 }, (_, i) => i + 1).map((m) => /* @__PURE__ */ jsxs("option", { value: m.toString().padStart(2, "0"), children: [
                    "Bulan ",
                    m
                  ] }, m))
                }
              ),
              /* @__PURE__ */ jsx(
                "select",
                {
                  name: "year",
                  className: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-gold-500/20 focus:border-gold-500 dark:text-white transition-all cursor-pointer font-bold",
                  value: filters.year,
                  onChange: handleFilterChange,
                  children: [2024, 2025, 2026, 2027].map((y) => /* @__PURE__ */ jsx("option", { value: y, children: y }, y))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-indigo-500/30 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4", children: "Total Pendapatan" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-black text-indigo-600 dark:text-indigo-400", children: [
                "Rp ",
                Number(stats.revenue).toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-indigo-500 w-full opacity-50" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-red-500/30 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4", children: "Pengeluaran" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-black text-red-600 dark:text-red-400", children: [
                "Rp ",
                Number(stats.expenses).toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-red-500 w-full opacity-50" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50 group hover:border-yellow-500/30 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4", children: "Komisi Afiliasi" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-2xl font-black text-yellow-600 dark:text-yellow-400", children: [
                "Rp ",
                Number(stats.commissions).toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-yellow-500 w-full opacity-50" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gold-600 p-8 rounded-[2.5rem] shadow-2xl shadow-gold-600/20 group transition-all duration-500 relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-4 relative z-10", children: "Laba Bersih" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-3xl font-black text-white relative z-10", children: [
                "Rp ",
                Number(stats.netIncome).toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 w-full h-1 bg-white/20 rounded-full relative z-10", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-white w-full" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight", children: [
                "Tren Pendapatan ",
                /* @__PURE__ */ jsx("span", { className: "text-gold-500 font-light text-sm ml-2", children: "(12 Bulan)" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-[350px]", children: charts?.revenueByMonth?.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: charts.revenueByMonth, children: [
                /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(156, 163, 175, 0.1)" }),
                /* @__PURE__ */ jsx(
                  XAxis,
                  {
                    dataKey: "month_year",
                    tick: { fontSize: 10, fontWeight: "bold", fill: "#9ca3af" },
                    axisLine: false,
                    tickLine: false,
                    dy: 10
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    tickFormatter: (value) => `Rp ${(value / 1e6).toFixed(0)}jt`,
                    tick: { fontSize: 10, fontWeight: "bold", fill: "#9ca3af" },
                    width: 60,
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      backgroundColor: "rgba(17, 24, 39, 0.9)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "1.5rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "16px",
                      color: "#fff"
                    },
                    itemStyle: { color: "#fbbf24", fontSize: "12px", fontWeight: "bold" },
                    labelStyle: { color: "#fff", fontSize: "10px", fontWeight: "black", marginBottom: "8px", textTransform: "uppercase" },
                    formatter: (value) => [`Rp ${Number(value).toLocaleString("id-ID")}`, "Pemasukan"]
                  }
                ),
                /* @__PURE__ */ jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "total",
                    stroke: "#d4a321",
                    strokeWidth: 4,
                    dot: { r: 4, fill: "#d4a321", strokeWidth: 2, stroke: "#fff" },
                    activeDot: { r: 8, fill: "#fff", stroke: "#d4a321", strokeWidth: 4 }
                  }
                )
              ] }) }) : /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-gray-400 gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
                /* @__PURE__ */ jsx("p", { className: "font-bold text-sm", children: "Belum ada data pendapatan." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-center", children: "Status Sesi" }),
                /* @__PURE__ */ jsx("div", { className: "h-64", children: charts?.bookingsByStatus?.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsx(
                    Pie,
                    {
                      data: charts.bookingsByStatus,
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 60,
                      outerRadius: 80,
                      paddingAngle: 8,
                      dataKey: "count",
                      nameKey: "status",
                      stroke: "none",
                      children: charts.bookingsByStatus.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: PIE_COLORS[entry.status] || "#9ca3af" }, `cell-${index}`))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "none",
                        fontSize: "10px"
                      },
                      itemStyle: { color: "#fff", fontWeight: "bold" },
                      formatter: (value, name) => [value, STATUS_LABELS[name] || name]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Legend,
                    {
                      iconType: "circle",
                      wrapperStyle: { fontSize: "10px", fontWeight: "bold", paddingTop: "20px", color: "#9ca3af" },
                      formatter: (value) => STATUS_LABELS[value] || value
                    }
                  )
                ] }) }) : /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center text-gray-400 text-[10px] font-bold border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]", children: "Belum ada sesi." }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800/50", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-center", children: "Kategori Pengeluaran" }),
                /* @__PURE__ */ jsx("div", { className: "h-64", children: charts?.expensesByCategory?.length > 0 ? /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsx(
                    Pie,
                    {
                      data: charts.expensesByCategory,
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 60,
                      outerRadius: 80,
                      paddingAngle: 8,
                      dataKey: "total",
                      nameKey: "category",
                      stroke: "none",
                      children: charts.expensesByCategory.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: ["#ef4444", "#f59e0b", "#3b82f6", "#10b981", "#6366f1", "#a855f7"][index % 6] }, `cell-${index}`))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        backgroundColor: "rgba(17, 24, 39, 0.9)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "1rem",
                        border: "none",
                        fontSize: "10px"
                      },
                      itemStyle: { color: "#fff", fontWeight: "bold" },
                      formatter: (value) => `Rp ${Number(value).toLocaleString("id-ID")}`
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Legend,
                    {
                      iconType: "circle",
                      wrapperStyle: { fontSize: "10px", fontWeight: "bold", paddingTop: "20px", color: "#9ca3af" }
                    }
                  )
                ] }) }) : /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center text-gray-400 text-[10px] font-bold border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]", children: "Tidak ada pengeluaran." }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-white dark:border-gray-800 transition-all duration-500", children: [
              /* @__PURE__ */ jsx("div", { className: "p-8 border-b border-gray-50 dark:border-gray-800/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white tracking-tight", children: "Pemasukan Terakhir" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium", children: "5 transaksi terbaru." })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800/50", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/10", children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Customer" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Jenis" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Jumlah" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/30", children: recentTransactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300", children: [
                    /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 dark:text-white", children: tx.user?.name }),
                      /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-1 font-mono italic", children: [
                        "#",
                        tx.invoice_number
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gold-500/20", children: tx.transactionable_type?.split("\\")?.pop() === "Booking" ? "Terapi" : "Learning" }) }),
                    /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 whitespace-nowrap text-sm font-black text-green-600 dark:text-green-400 text-right", children: [
                      "+ Rp ",
                      Number(tx.amount).toLocaleString("id-ID")
                    ] })
                  ] }, tx.id)) })
                ] }),
                recentTransactions.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-20 text-center text-gray-400 font-bold text-sm italic", children: "Belum ada pemasukan." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900/50 backdrop-blur-xl overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-white dark:border-gray-800 transition-all duration-500", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-800/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-900 dark:text-white tracking-tight", children: "Pengeluaran Terakhir" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium", children: "5 pengeluaran terbaru." })
                ] }),
                /* @__PURE__ */ jsx(Link, { href: route("admin.expenses.index"), className: "text-[10px] font-black text-gold-600 dark:text-gold-400 uppercase tracking-widest hover:underline", children: "Kelola Semua" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
                /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800/50", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/10", children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Keperluan" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Kategori" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Jumlah" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/30", children: recentExpenses.map((ex) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300", children: [
                    /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 whitespace-nowrap", children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 dark:text-white truncate max-w-[150px]", children: ex.description }),
                      /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-1", children: new Date(ex.expense_date).toLocaleDateString("id-ID") })
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gray-200 dark:border-gray-700", children: ex.category }) }),
                    /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 whitespace-nowrap text-sm font-black text-red-600 dark:text-red-400 text-right", children: [
                      "- Rp ",
                      Number(ex.amount).toLocaleString("id-ID")
                    ] })
                  ] }, ex.id)) })
                ] }),
                recentExpenses.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-20 text-center text-gray-400 font-bold text-sm italic", children: "Belum ada pengeluaran." })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  ReportsIndex as default
};
