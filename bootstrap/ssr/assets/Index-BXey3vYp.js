import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { useForm, Head, router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, ArrowDownCircle, Wallet, ChevronRight, Plus, Receipt, Trash2, CheckCircle2, XCircle, Download } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4"];
function FinanceIndex({ reports, expenses, pettyCash, filters, auth, userRole }) {
  const [activeTab, setActiveTab] = useState("reports");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPettyCashModalOpen, setIsPettyCashModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const tabs = [
    { id: "reports", label: "Ringkasan Laporan", icon: LayoutDashboard },
    { id: "expenses", label: "Biaya Operasional", icon: ArrowDownCircle },
    { id: "petty_cash", label: "Kas Kecil Internal", icon: Wallet }
  ];
  const isSantaMaria = userRole.includes("santa_maria");
  const { data: expenseData, setData: setExpenseData, post: postExpense, processing: processingExpense, reset: resetExpense, errors: expenseErrors } = useForm({
    description: "",
    category: "",
    amount: "",
    expense_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    receipt: null
  });
  const { data: pettyData, setData: setPettyData, post: postPetty, processing: processingPetty, reset: resetPetty, errors: pettyErrors } = useForm({
    transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    amount: "",
    type: "out",
    description: "",
    category: "",
    receipt: null
  });
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const { data: approveData, setData: setApproveData, post: postApprove, processing: processingApprove, reset: resetApprove } = useForm({
    payment_method: "transfer",
    transfer_proof: null
  });
  const { data: rejectData, setData: setRejectData, post: postReject, processing: processingReject, reset: resetReject, errors: rejectErrors } = useForm({
    rejection_reason: ""
  });
  const { data: proposalData, setData: setProposalData, post: postProposal, processing: processingProposal, reset: resetProposal, errors: proposalErrors } = useForm({
    type: "spending",
    title: "",
    description: "",
    amount: ""
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    router.get(route("admin.finance.index"), {
      ...filters,
      [name]: value
    }, { preserveState: true });
  };
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
    postPetty(route("admin.finance.petty-cash.store"), {
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
  const handleApprove = (proposal) => {
    setSelectedProposal(proposal);
    if (proposal.type === "funding") {
      setIsApproveModalOpen(true);
    } else {
      router.post(route("admin.petty-cash.proposals.approve", proposal.id), {}, { preserveScroll: true });
    }
  };
  const submitApproveFunding = (e) => {
    e.preventDefault();
    postApprove(route("admin.petty-cash.proposals.approve", selectedProposal.id), {
      onSuccess: () => {
        setIsApproveModalOpen(false);
        resetApprove();
      },
      preserveScroll: true
    });
  };
  const handleReject = (proposal) => {
    setSelectedProposal(proposal);
    setIsRejectModalOpen(true);
  };
  const submitReject = (e) => {
    e.preventDefault();
    postReject(route("admin.petty-cash.proposals.reject", selectedProposal.id), {
      onSuccess: () => {
        setIsRejectModalOpen(false);
        resetReject();
      },
      preserveScroll: true
    });
  };
  const submitProposal = (e) => {
    e.preventDefault();
    postProposal(route("admin.petty-cash.proposals.store"), {
      onSuccess: () => {
        resetProposal();
        setIsProposalModalOpen(false);
      },
      preserveScroll: true
    });
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
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4", children: "Kas Kecil Internal" }),
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
                  /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6", children: [
                    { label: "Total Pemasukan", val: reports.stats.revenue, color: "indigo" },
                    { label: "Biaya Operasional", val: reports.stats.operational_expenses, color: "rose" },
                    { label: "Kas Kecil Internal", val: reports.stats.petty_cash_expenses, color: "orange" },
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
                      /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase", children: "Kategori Pengeluaran (Inc. Kas Internal)" }),
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
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase", children: "Buku Kas Kecil Internal" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setIsProposalModalOpen(true),
                          className: "inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-600/20 active:scale-95",
                          children: [
                            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                            "Buat Pengajuan Baru"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => setIsPettyCashModalOpen(true),
                          className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95",
                          children: [
                            /* @__PURE__ */ jsx(Receipt, { className: "w-4 h-4 mr-2" }),
                            "Catat Transaksi (Realisasi)"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
                    /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1", children: "Daftar Pengajuan & Status Approval" }),
                    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800", children: [
                      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: [
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Pengajuan" }),
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Jenis" }),
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Nominal" }),
                        /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Status" })
                      ] }) }),
                      /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
                        pettyCash.proposals.map((p) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                          /* @__PURE__ */ jsxs("td", { className: "px-8 py-6", children: [
                            /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 dark:text-white", children: p.title }),
                            /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest", children: [
                              "Oleh: ",
                              p.user?.name
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black uppercase tracking-widest ${p.type === "funding" ? "text-emerald-500" : "text-rose-500"}`, children: p.type === "funding" ? "Isi Saldo (In)" : "Belanja (Out)" }) }),
                          /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 text-right font-black text-sm text-gray-900 dark:text-white", children: [
                            "Rp ",
                            parseFloat(p.amount).toLocaleString("id-ID")
                          ] }),
                          /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                            /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === "pending" ? "bg-amber-100 text-amber-700" : p.status === "approved" ? "bg-indigo-100 text-indigo-700" : p.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`, children: p.status === "pending" ? "Menunggu" : p.status === "approved" ? "Disetujui" : p.status === "completed" ? "Selesai" : p.status === "rejected" ? "Ditolak" : p.status }),
                            isSantaMaria && p.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex gap-1 mt-1", children: [
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => handleApprove(p),
                                  className: "p-1.5 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all",
                                  title: "Setujui",
                                  children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" })
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => handleReject(p),
                                  className: "p-1.5 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all",
                                  title: "Tolak",
                                  children: /* @__PURE__ */ jsx(XCircle, { className: "w-3 h-3" })
                                }
                              )
                            ] })
                          ] }) })
                        ] }, p.id)),
                        pettyCash.proposals.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-8 py-10 text-center text-gray-400 italic text-xs", children: "Belum ada pengajuan." }) })
                      ] })
                    ] }) }) })
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1", children: "Riwayat Transaksi Realisasi" }),
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
                        /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("span", { className: `px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.type === "in" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"}`, children: tx.type === "in" ? "Isi Saldo (In)" : "Belanja (Out)" }) }),
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
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight", children: "Input Transaksi Kas Kecil" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-6", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPettyData("type", "out"),
                  className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === "out" ? "bg-rose-600 text-white shadow-lg" : "text-gray-400"}`,
                  children: "Pengeluaran (Out)"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPettyData("type", "in"),
                  className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === "in" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400"}`,
                  children: "Isi Saldo (In)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Keterangan Transaksi", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full",
                  value: pettyData.description,
                  onChange: (e) => setPettyData("description", e.target.value),
                  placeholder: "Sebutkan keperluan..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: pettyErrors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Tanggal", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "date",
                    className: "w-full",
                    value: pettyData.transaction_date,
                    onChange: (e) => setPettyData("transaction_date", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Nominal", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
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
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Kategori (Opsional)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full",
                  value: pettyData.category,
                  onChange: (e) => setPettyData("category", e.target.value),
                  placeholder: "Parkir, Bensin, Snack..."
                }
              )
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
                children: "Konfirmasi Transaksi"
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
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isApproveModalOpen, onClose: () => setIsApproveModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitApproveFunding, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight", children: "Konfirmasi Pengiriman Dana" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-8 font-serif leading-relaxed", children: [
            "Silakan unggah bukti transfer dana sebesar ",
            /* @__PURE__ */ jsxs("span", { className: "text-emerald-600 font-bold", children: [
              "Rp ",
              parseFloat(selectedProposal?.amount || 0).toLocaleString("id-ID")
            ] }),
            " untuk menyelesaikan pengisian Kas Kecil."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Metode Pengiriman Dana", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-50 dark:bg-black/20 p-2 rounded-2xl", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setApproveData("payment_method", "transfer"),
                    className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${approveData.payment_method === "transfer" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400"}`,
                    children: "Transfer Bank"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setApproveData("payment_method", "cash"),
                    className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${approveData.payment_method === "cash" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400"}`,
                    children: "Tunai / Cash"
                  }
                )
              ] })
            ] }),
            approveData.payment_method === "transfer" && /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Upload Bukti Transfer (JPG/PNG)", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "w-full p-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-sm font-bold text-gray-500 cursor-pointer hover:border-emerald-500 transition-all",
                  onChange: (e) => setApproveData("transfer_proof", e.target.files[0]),
                  required: approveData.payment_method === "transfer"
                }
              )
            ] }),
            approveData.payment_method === "cash" && /* @__PURE__ */ jsx("div", { className: "p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed", children: 'Konfirmasi penyerahan dana secara tunai. Saldo kas kecil akan langsung bertambah setelah Bapak menekan tombol "Konfirmasi" di bawah.' }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsApproveModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingApprove,
                className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                children: "Konfirmasi & Kirim"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isRejectModalOpen, onClose: () => setIsRejectModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitReject, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight", children: "Tolak Pengajuan" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-8 font-serif", children: "Berikan alasan mengapa pengajuan ini ditolak guna transparansi pelaporan." }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Alasan Penolakan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-rose-500 focus:border-rose-500 h-32",
                value: rejectData.rejection_reason,
                onChange: (e) => setRejectData("rejection_reason", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: rejectErrors.rejection_reason })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsRejectModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingReject,
                className: "flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                children: "Tolak Selamanya"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isProposalModalOpen, onClose: () => setIsProposalModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitProposal, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight", children: "Buat Pengajuan Kas Kecil" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-50 dark:bg-black/20 p-2 rounded-2xl", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setProposalData("type", "spending"),
                  className: `flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === "spending" ? "bg-indigo-600 text-white shadow-xl" : "text-gray-400"}`,
                  children: "Pengajuan Belanja"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setProposalData("type", "funding"),
                  className: `flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === "funding" ? "bg-emerald-600 text-white shadow-xl" : "text-gray-400"}`,
                  children: "Permohonan Dana"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Judul Pengajuan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full !rounded-2xl",
                  value: proposalData.title,
                  onChange: (e) => setProposalData("title", e.target.value),
                  placeholder: "Misal: Belanja ATK Kantor"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Nominal Budget Dimohon", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400", children: "Rp" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "number",
                    className: "w-full !rounded-2xl !pl-12",
                    value: proposalData.amount,
                    onChange: (e) => setProposalData("amount", e.target.value),
                    placeholder: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.amount })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Detail Keperluan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-indigo-500 focus:border-indigo-500 h-32 p-4",
                  value: proposalData.description,
                  onChange: (e) => setProposalData("description", e.target.value),
                  placeholder: "Jelaskan secara detail barang apa saja yang akan dibeli..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsProposalModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingProposal,
                className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20",
                children: "Kirim Pengajuan"
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
