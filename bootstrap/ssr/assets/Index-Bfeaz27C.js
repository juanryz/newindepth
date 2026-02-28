import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D0kAy28S.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, ArrowDownCircle, Wallet, History, ChevronRight, Plus, Receipt, Trash2, FileText, Search, Calendar, Download } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DMzg2v4j.js";
const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4"];
function FinanceIndex({ reports, expenses, pettyCash, filters, auth }) {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPettyCashModalOpen, setIsPettyCashModalOpen] = useState(false);
  const [logFilterType, setLogFilterType] = useState("");
  const [logFilterSearch, setLogFilterSearch] = useState("");
  const [logFilterDateFrom, setLogFilterDateFrom] = useState("");
  const [logFilterDateTo, setLogFilterDateTo] = useState("");
  const tabs = [
    { id: "reports", label: "Ringkasan Laporan", icon: LayoutDashboard },
    { id: "expenses", label: "Biaya Operasional", icon: ArrowDownCircle },
    { id: "petty_cash", label: "Kas Kecil (Petty Cash)", icon: Wallet },
    { id: "activity", label: "Log Kegiatan", icon: History }
  ];
  const { data: expenseData, setData: setExpenseData, post: postExpense, processing: processingExpense, reset: resetExpense, errors: expenseErrors } = useForm({
    description: "",
    category: "",
    amount: "",
    expense_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    receipt: null
  });
  const { data: pettyData, setData: setPettyData, post: postPetty, processing: processingPetty, reset: resetPetty, errors: pettyErrors } = useForm({
    type: "spending",
    title: "",
    amount: "",
    description: ""
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    router.get(route("admin.finance.index"), {
      ...filters,
      [name]: value
    }, { preserveState: true });
  };
  const activityLog = useMemo(() => {
    const logs = [];
    (expenses || []).forEach((ex) => {
      logs.push({
        id: `exp-${ex.id}`,
        type: "expense",
        icon: "💸",
        color: "rose",
        actor: ex.recorder?.name || "Staff",
        actorRole: "Operator",
        action: "mencatat pengeluaran",
        subject: ex.description,
        detail: `Kategori: ${ex.category || "-"} · Rp ${new Intl.NumberFormat("id-ID").format(ex.amount || 0)}`,
        date: ex.created_at || ex.expense_date
      });
    });
    (pettyCash?.proposals || []).forEach((prop) => {
      logs.push({
        id: `prop-create-${prop.id}`,
        type: "proposal_created",
        icon: "📝",
        color: "indigo",
        actor: prop.user?.name || "Staff",
        actorRole: "Staff",
        action: "mengajukan kas kecil",
        subject: prop.title,
        detail: `${prop.type === "funding" ? "Permohonan Dana" : "Belanja"} · Rp ${new Intl.NumberFormat("id-ID").format(prop.amount || 0)}`,
        date: prop.created_at
      });
      if (prop.status === "approved" || prop.status === "completed") {
        logs.push({
          id: `prop-approve-${prop.id}`,
          type: "proposal_approved",
          icon: "✅",
          color: "emerald",
          actor: prop.approver?.name || "Admin",
          actorRole: "Admin",
          action: "menyetujui pengajuan kas",
          subject: prop.title,
          detail: `Rp ${new Intl.NumberFormat("id-ID").format(prop.amount || 0)}`,
          date: prop.approved_at || prop.updated_at
        });
      }
      if (prop.status === "rejected") {
        logs.push({
          id: `prop-reject-${prop.id}`,
          type: "proposal_rejected",
          icon: "❌",
          color: "rose",
          actor: prop.approver?.name || "Admin",
          actorRole: "Admin",
          action: "menolak pengajuan kas",
          subject: prop.title,
          detail: `Alasan: ${prop.rejection_reason || "-"}`,
          date: prop.approved_at || prop.updated_at
        });
      }
    });
    (pettyCash?.transactions || []).forEach((tx) => {
      if (!tx.description?.includes("Replenishment") && !tx.description?.includes("Belanja:")) {
        logs.push({
          id: `pct-${tx.id}`,
          type: "petty_cash_tx",
          icon: tx.type === "in" ? "📈" : "📉",
          color: tx.type === "in" ? "emerald" : "amber",
          actor: tx.recorder?.name || "Staff",
          actorRole: "Operator",
          action: tx.type === "in" ? "mengisi kas kecil" : "mencatat pemakaian kas",
          subject: tx.description,
          detail: `Rp ${new Intl.NumberFormat("id-ID").format(tx.amount || 0)} · Saldo: Rp ${new Intl.NumberFormat("id-ID").format(tx.balance_after || 0)}`,
          date: tx.created_at || tx.transaction_date
        });
      }
    });
    return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, pettyCash]);
  const filteredLog = useMemo(() => {
    return activityLog.filter((log) => {
      if (logFilterType && log.type !== logFilterType) return false;
      if (logFilterSearch) {
        const q = logFilterSearch.toLowerCase();
        if (!log.actor?.toLowerCase().includes(q) && !log.subject?.toLowerCase().includes(q) && !log.detail?.toLowerCase().includes(q) && !log.action?.toLowerCase().includes(q)) return false;
      }
      if (logFilterDateFrom && new Date(log.date) < new Date(logFilterDateFrom)) return false;
      if (logFilterDateTo && new Date(log.date) > /* @__PURE__ */ new Date(logFilterDateTo + "T23:59:59")) return false;
      return true;
    });
  }, [activityLog, logFilterType, logFilterSearch, logFilterDateFrom, logFilterDateTo]);
  const submitExpense = (e) => {
    e.preventDefault();
    postExpense(route("admin.finance.expenses.store"), {
      onSuccess: () => {
        resetExpense();
        setIsExpenseModalOpen(false);
      }
    });
  };
  const submitPettyCash = (e) => {
    e.preventDefault();
    postPetty(route("admin.petty-cash.proposals.store"), {
      onSuccess: () => {
        resetPetty();
        setIsPettyCashModalOpen(false);
      }
    });
  };
  const deleteExpense = (id) => {
    if (confirm("Hapus data pengeluaran ini?")) {
      router.delete(route("admin.finance.expenses.destroy", id), {
        preserveScroll: true
      });
    }
  };
  const deletePettyCash = (id) => {
    if (confirm("Hapus transaksi kas kecil ini?")) {
      router.delete(route("admin.finance.petty-cash.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase", children: "Manajemen Keuangan" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1", children: "Laporan, Pengeluaran & Kas Kecil" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              name: "month",
              className: "h-10 px-4 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer",
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
              className: "h-10 px-4 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer",
              value: filters.year,
              onChange: handleFilterChange,
              children: [2024, 2025, 2026, 2027].map((y) => /* @__PURE__ */ jsx("option", { value: y, children: y }, y))
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: route("admin.reports.export-csv", filters),
              className: "inline-flex items-center h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95",
              children: [
                /* @__PURE__ */ jsx(Download, { className: "w-3 h-3 mr-2" }),
                "Export CSV"
              ]
            }
          )
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Keuangan" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-80 flex-shrink-0 space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500 sticky top-24", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setActiveTab(tab.id),
                className: `w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl transition-colors ${activeTab === tab.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700"}`, children: /* @__PURE__ */ jsx(tab.icon, { className: "w-5 h-5" }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black uppercase tracking-widest", children: tab.label })
                  ] }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}` })
                ]
              },
              tab.id
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4", children: "Kas Kecil Tersedia" }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: [
                "Rp ",
                pettyCash.currentBalance.toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-[10px] font-black uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Total Pemasukan Bulan ini:" }),
                /* @__PURE__ */ jsxs("span", { className: "text-indigo-600", children: [
                  "Rp ",
                  reports.stats.revenue.toLocaleString("id-ID")
                ] })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0 pb-12", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            activeTab === "reports" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "space-y-8",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6", children: [
                    { label: "Total Pemasukan", val: reports.stats.revenue, color: "indigo" },
                    { label: "Biaya Operasional", val: reports.stats.expenses, color: "rose" },
                    { label: "Komisi Afiliasi", val: reports.stats.commissions, color: "amber" },
                    { label: "Laba Bersih", val: reports.stats.netIncome, color: "emerald", highlight: true }
                  ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: `p-8 rounded-[2.5rem] shadow-xl border transition-all duration-500 ${stat.highlight ? "bg-indigo-600 text-white border-transparent" : "bg-white dark:bg-gray-900 border-white dark:border-gray-800"}`, children: [
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${stat.highlight ? "text-white/70" : "text-gray-400"}`, children: stat.label }),
                    /* @__PURE__ */ jsxs("h4", { className: `text-2xl font-black ${stat.highlight ? "text-white" : `text-${stat.color}-600 dark:text-${stat.color}-400`}`, children: [
                      "Rp ",
                      stat.val.toLocaleString("id-ID")
                    ] })
                  ] }, i)) }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase", children: "Tren Pendapatan" }),
                      /* @__PURE__ */ jsx("div", { className: "h-[350px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: reports.charts.revenueByMonth, children: [
                        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(156, 163, 175, 0.1)" }),
                        /* @__PURE__ */ jsx(XAxis, { dataKey: "month_year", tick: { fontSize: 10, fontWeight: "bold" } }),
                        /* @__PURE__ */ jsx(YAxis, { tickFormatter: (v) => `Rp${v / 1e6}jt`, tick: { fontSize: 10, fontWeight: "bold" } }),
                        /* @__PURE__ */ jsx(
                          Tooltip,
                          {
                            contentStyle: { borderRadius: "1.5rem", border: "none", background: "#111827", color: "#fff" },
                            formatter: (v) => [`Rp ${v.toLocaleString("id-ID")}`, "Pemasukan"]
                          }
                        ),
                        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "total", stroke: "#6366f1", strokeWidth: 4, dot: { r: 4 }, activeDot: { r: 8 } })
                      ] }) }) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase", children: "Kategori Pengeluaran" }),
                      /* @__PURE__ */ jsx("div", { className: "h-[350px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
                        /* @__PURE__ */ jsx(
                          Pie,
                          {
                            data: reports.charts.expensesByCategory,
                            cx: "50%",
                            cy: "50%",
                            innerRadius: 80,
                            outerRadius: 110,
                            paddingAngle: 5,
                            dataKey: "total",
                            nameKey: "category",
                            children: reports.charts.expensesByCategory.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i))
                          }
                        ),
                        /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => `Rp ${v.toLocaleString("id-ID")}` }),
                        /* @__PURE__ */ jsx(Legend, { wrapperStyle: { fontSize: "10px", fontWeight: "bold" } })
                      ] }) }) })
                    ] })
                  ] })
                ]
              },
              "reports"
            ),
            activeTab === "expenses" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase", children: "Biaya Operasional" }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => setIsExpenseModalOpen(true),
                        className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95",
                        children: [
                          /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                          "Tambah Pengeluaran"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Deskripsi" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Kategori" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Operator" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Jumlah" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Aksi" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
                      expenses.map((ex) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group", children: [
                        /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                          /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 dark:text-white", children: ex.description }),
                          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest leading-none", children: new Date(ex.expense_date).toLocaleDateString("id-ID", { dateStyle: "medium" }) })
                        ] }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-wider", children: ex.category }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-600 dark:text-gray-400", children: ex.recorder?.name }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-right", children: /* @__PURE__ */ jsxs("div", { className: "text-sm font-black text-rose-600 dark:text-rose-400", children: [
                          "- Rp ",
                          ex.amount.toLocaleString("id-ID")
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
                          ex.receipt && /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => setSelectedReceipt(`/storage/${ex.receipt}`),
                              className: "p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl hover:scale-110 mb-1 transition-all",
                              children: /* @__PURE__ */ jsx(Receipt, { className: "w-4 h-4" })
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => deleteExpense(ex.id),
                              className: "p-2 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-xl hover:scale-110 mb-1 transition-all",
                              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                            }
                          )
                        ] }) })
                      ] }, ex.id)),
                      expenses.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-8 py-16 text-center text-gray-400 italic", children: "Belum ada catatan pengeluaran operasional." }) })
                    ] })
                  ] }) }) })
                ]
              },
              "expenses"
            ),
            activeTab === "petty_cash" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase", children: "Buku Kas Kecil (Petty Cash)" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: route("admin.petty-cash.index"),
                          className: "inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-amber-500/20 active:scale-95",
                          children: [
                            /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
                            "Pengajuan Dana"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setIsPettyCashModalOpen(true),
                          className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95",
                          children: [
                            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                            "Buat Pengajuan Kas"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tgl / Deskripsi" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tipe" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Nominal" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Saldo Akhir" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Aksi" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
                      pettyCash.transactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                        /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                          /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 dark:text-white", children: tx.description }),
                          /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest leading-none", children: [
                            new Date(tx.transaction_date).toLocaleDateString("id-ID"),
                            " - ",
                            tx.category || "-"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`, children: tx.type === "in" ? "Isi Saldo (In)" : "Keluar (Out)" }) }),
                        /* @__PURE__ */ jsxs("td", { className: `px-8 py-6 text-right font-black text-sm ${tx.type === "in" ? "text-emerald-600" : "text-rose-600"}`, children: [
                          tx.type === "in" ? "+" : "-",
                          " Rp ",
                          tx.amount.toLocaleString("id-ID")
                        ] }),
                        /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-right text-sm font-bold text-gray-900 dark:text-white", children: [
                          "Rp ",
                          Number(tx.balance_after).toLocaleString("id-ID")
                        ] }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
                          tx.receipt && /* @__PURE__ */ jsx("button", { onClick: () => setSelectedReceipt(`/storage/${tx.receipt}`), className: "p-2 text-indigo-600", children: /* @__PURE__ */ jsx(Receipt, { className: "w-4 h-4" }) }),
                          /* @__PURE__ */ jsx("button", { onClick: () => deletePettyCash(tx.id), className: "p-2 text-rose-600", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) })
                        ] }) })
                      ] }, tx.id)),
                      pettyCash.transactions.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-8 py-16 text-center text-gray-400 italic", children: "Belum ada riwayat transaksi kas kecil." }) })
                    ] })
                  ] }) }) })
                ]
              },
              "petty_cash"
            ),
            activeTab === "activity" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase", children: "Log Kegiatan Keuangan" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Cari aktivitas...",
                            value: logFilterSearch,
                            onChange: (e) => setLogFilterSearch(e.target.value),
                            className: "pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold w-48 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-700 dark:text-gray-300 shadow-sm"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "select",
                        {
                          value: logFilterType,
                          onChange: (e) => setLogFilterType(e.target.value),
                          className: "px-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer text-gray-700 dark:text-gray-300 shadow-sm",
                          children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "Semua Tipe" }),
                            /* @__PURE__ */ jsx("option", { value: "expense", children: "Pengeluaran" }),
                            /* @__PURE__ */ jsx("option", { value: "proposal_created", children: "Pengajuan (Buat)" }),
                            /* @__PURE__ */ jsx("option", { value: "proposal_approved", children: "Pengajuan (Setuju)" }),
                            /* @__PURE__ */ jsx("option", { value: "proposal_rejected", children: "Pengajuan (Tolak)" }),
                            /* @__PURE__ */ jsx("option", { value: "petty_cash_tx", children: "Transaksi Kas" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-2 py-1 shadow-sm", children: [
                        /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-gray-400" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "date",
                            value: logFilterDateFrom,
                            onChange: (e) => setLogFilterDateFrom(e.target.value),
                            className: "px-2 py-1 bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "text-gray-400 text-xs", children: "-" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "date",
                            value: logFilterDateTo,
                            onChange: (e) => setLogFilterDateTo(e.target.value),
                            className: "px-2 py-1 bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-32", children: "Waktu" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Aktivitas" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell", children: "Pelaku" }),
                      /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Detail Informasi" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
                      filteredLog.slice(0, 50).map((log) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group", children: [
                        /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-900 dark:text-white", children: new Date(log.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) }),
                          /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest", children: new Date(log.date).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) })
                        ] }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-lg", children: log.icon }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white block mb-0.5", children: log.action }),
                            /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-${log.color}-50 text-${log.color}-600 dark:bg-${log.color}-900/20 dark:text-${log.color}-400 inline-block`, children: log.subject.length > 30 ? log.subject.substring(0, 30) + "..." : log.subject })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6 hidden sm:table-cell", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs", children: log.actor.charAt(0) }),
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-gray-900 dark:text-white leading-tight", children: log.actor }),
                            /* @__PURE__ */ jsx("div", { className: "text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5", children: log.actorRole })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400 font-bold leading-relaxed max-w-sm", children: log.detail }) })
                      ] }, log.id)),
                      filteredLog.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-8 py-16 text-center text-gray-400 italic", children: "Belum ada aktivitas terekam." }) })
                    ] })
                  ] }) }) })
                ]
              },
              "activity"
            )
          ] }) })
        ] }) }) }),
        /* @__PURE__ */ jsx(Modal, { show: isExpenseModalOpen, onClose: () => setIsExpenseModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitExpense, className: "p-8 dark:bg-gray-900 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Tambah Pengeluaran Operasional" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Keperluan", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full",
                  value: expenseData.description,
                  onChange: (e) => setExpenseData("description", e.target.value),
                  placeholder: "Contoh: Bayar Listrik, ATK, Kebersihan..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: expenseErrors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Kategori", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "w-full",
                    value: expenseData.category,
                    onChange: (e) => setExpenseData("category", e.target.value),
                    placeholder: "Listrik, Inventaris..."
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: expenseErrors.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Tanggal", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "date",
                    className: "w-full",
                    value: expenseData.expense_date,
                    onChange: (e) => setExpenseData("expense_date", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: expenseErrors.expense_date })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Nominal Pengeluaran", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  type: "number",
                  className: "w-full",
                  value: expenseData.amount,
                  onChange: (e) => setExpenseData("amount", e.target.value),
                  placeholder: "0"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: expenseErrors.amount })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Bukti Nota/Kwitansi (Opsional)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  className: "w-full text-xs font-bold text-gray-500",
                  onChange: (e) => setExpenseData("receipt", e.target.files[0])
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsExpenseModalOpen(false), children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingExpense,
                className: "inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20",
                children: "Simpan Pengeluaran"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isPettyCashModalOpen, onClose: () => setIsPettyCashModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitPettyCash, className: "p-8 dark:bg-gray-900 rounded-[2.5rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Buat Pengajuan Kas Kecil" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-6", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPettyData("type", "spending"),
                  className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === "spending" ? "bg-rose-600 text-white shadow-lg" : "text-gray-400"}`,
                  children: "Pengajuan Belanja (Out)"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPettyData("type", "funding"),
                  className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === "funding" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400"}`,
                  children: "Permohonan Dana (In)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Judul Pengajuan", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full",
                  value: pettyData.title,
                  onChange: (e) => setPettyData("title", e.target.value),
                  placeholder: "Misal: Beli Kertas, Bayar Listrik, dll"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: pettyErrors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Detail Keperluan", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full",
                  value: pettyData.description,
                  onChange: (e) => setPettyData("description", e.target.value),
                  placeholder: "Sebutkan keperluan secara detail..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: pettyErrors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Nominal Budget Dimohon", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  type: "number",
                  className: "w-full",
                  value: pettyData.amount,
                  onChange: (e) => setPettyData("amount", e.target.value),
                  placeholder: "0"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: pettyErrors.amount })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsPettyCashModalOpen(false), children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingPetty,
                className: "inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20",
                children: "Konfirmasi & Kirim ke Workflow"
              }
            )
          ] })
        ] }) }),
        selectedReceipt && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm", onClick: () => setSelectedReceipt(null), children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSelectedReceipt(null),
              className: "absolute top-6 right-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:scale-110 transition-all z-10 font-bold",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "p-12 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-widest", children: "Bukti Nota / Kwitansi" }),
            /* @__PURE__ */ jsx("img", { src: selectedReceipt, className: "max-h-[70vh] rounded-2xl shadow-xl object-contain border border-gray-100 dark:border-gray-800" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedReceipt(null),
                className: "mt-8 px-10 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all",
                children: "Tutup Preview"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  FinanceIndex as default
};
