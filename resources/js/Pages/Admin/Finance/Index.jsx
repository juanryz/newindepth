import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    Wallet,
    Plus,
    Trash2,
    FileText,
    Calendar,
    ChevronRight,
    Search,
    Download,
    Eye,
    Receipt
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

export default function FinanceIndex({ reports, expenses, pettyCash, filters, auth }) {
    const [activeTab, setActiveTab] = useState('reports');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isPettyCashModalOpen, setIsPettyCashModalOpen] = useState(false);

    const tabs = [
        { id: 'reports', label: 'Ringkasan Laporan', icon: LayoutDashboard },
        { id: 'expenses', label: 'Biaya Operasional', icon: ArrowDownCircle },
        { id: 'petty_cash', label: 'Kas Kecil (Petty Cash)', icon: Wallet },
    ];

    const { data: expenseData, setData: setExpenseData, post: postExpense, processing: processingExpense, reset: resetExpense, errors: expenseErrors } = useForm({
        description: '',
        category: '',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0],
        receipt: null,
    });

    const { data: pettyData, setData: setPettyData, post: postPetty, processing: processingPetty, reset: resetPetty, errors: pettyErrors } = useForm({
        transaction_date: new Date().toISOString().split('T')[0],
        amount: '',
        type: 'out',
        description: '',
        category: '',
        receipt: null,
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.finance.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    const submitExpense = (e) => {
        e.preventDefault();
        postExpense(route('admin.finance.expenses.store'), {
            onSuccess: () => {
                resetExpense();
                setIsExpenseModalOpen(false);
            },
        });
    };

    const submitPettyCash = (e) => {
        e.preventDefault();
        postPetty(route('admin.finance.petty-cash.store'), {
            onSuccess: () => {
                resetPetty();
                setIsPettyCashModalOpen(false);
            },
        });
    };

    const deleteExpense = (id) => {
        if (confirm('Hapus data pengeluaran ini?')) {
            router.delete(route('admin.finance.expenses.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const deletePettyCash = (id) => {
        if (confirm('Hapus transaksi kas kecil ini?')) {
            router.delete(route('admin.finance.petty-cash.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase">Manajemen Keuangan</h2>
                    <div className="flex gap-3">
                        <select
                            name="month"
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer"
                            value={filters.month}
                            onChange={handleFilterChange}
                        >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                <option key={m} value={m.toString().padStart(2, '0')}>
                                    Bulan {m}
                                </option>
                            ))}
                        </select>
                        <select
                            name="year"
                            className="bg-white/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer"
                            value={filters.year}
                            onChange={handleFilterChange}
                        >
                            {[2024, 2025, 2026, 2027].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <a
                            href={route('admin.reports.export-csv', filters)}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20"
                        >
                            <Download className="w-3 h-3 mr-2" />
                            Export
                        </a>
                    </div>
                </div>
            }
        >
            <Head title="Keuangan" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* SIDE NAVIGATION */}
                        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500 sticky top-24">
                                <div className="space-y-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.id
                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700'
                                                    }`}>
                                                    <tab.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                                                }`} />
                                        </button>
                                    ))}
                                </div>

                                {/* FINANCE SUMMARY CARD */}
                                <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Kas Kecil Tersedia</h4>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">
                                        Rp {pettyCash.currentBalance.toLocaleString('id-ID')}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-400">Total Pemasukan Bulan ini:</span>
                                        <span className="text-indigo-600">Rp {reports.stats.revenue.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="flex-1 min-w-0 pb-12">
                            <AnimatePresence mode="wait">
                                {activeTab === 'reports' && (
                                    <motion.div
                                        key="reports"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        {/* Status Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                            {[
                                                { label: 'Total Pemasukan', val: reports.stats.revenue, color: 'indigo' },
                                                { label: 'Biaya Operasional', val: reports.stats.expenses, color: 'rose' },
                                                { label: 'Komisi Afiliasi', val: reports.stats.commissions, color: 'amber' },
                                                { label: 'Laba Bersih', val: reports.stats.netIncome, color: 'emerald', highlight: true }
                                            ].map((stat, i) => (
                                                <div key={i} className={`p-8 rounded-[2.5rem] shadow-xl border transition-all duration-500 ${stat.highlight
                                                        ? 'bg-indigo-600 text-white border-transparent'
                                                        : 'bg-white dark:bg-gray-900 border-white dark:border-gray-800'
                                                    }`}>
                                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${stat.highlight ? 'text-white/70' : 'text-gray-400'
                                                        }`}>{stat.label}</p>
                                                    <h4 className={`text-2xl font-black ${stat.highlight ? 'text-white' : `text-${stat.color}-600 dark:text-${stat.color}-400`
                                                        }`}>Rp {stat.val.toLocaleString('id-ID')}</h4>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Charts */}
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Tren Pendapatan</h3>
                                                <div className="h-[350px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={reports.charts.revenueByMonth}>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.1)" />
                                                            <XAxis dataKey="month_year" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                                            <YAxis tickFormatter={(v) => `Rp${v / 1000000}jt`} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '1.5rem', border: 'none', background: '#111827', color: '#fff' }}
                                                                formatter={(v) => [`Rp ${v.toLocaleString('id-ID')}`, 'Pemasukan']}
                                                            />
                                                            <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">Kategori Pengeluaran</h3>
                                                <div className="h-[350px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={reports.charts.expensesByCategory}
                                                                cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5}
                                                                dataKey="total" nameKey="category"
                                                            >
                                                                {reports.charts.expensesByCategory.map((_, i) => (
                                                                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                                                ))}
                                                            </Pie>
                                                            <Tooltip formatter={(v) => `Rp ${v.toLocaleString('id-ID')}`} />
                                                            <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'expenses' && (
                                    <motion.div
                                        key="expenses"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Biaya Operasional</h3>
                                            <button
                                                onClick={() => setIsExpenseModalOpen(true)}
                                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Tambah Pengeluaran
                                            </button>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Operator</th>
                                                            <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Jumlah</th>
                                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {expenses.map((ex) => (
                                                            <tr key={ex.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                                                                <td className="px-8 py-6">
                                                                    <div className="font-bold text-gray-900 dark:text-white">{ex.description}</div>
                                                                    <div className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest leading-none">
                                                                        {new Date(ex.expense_date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                                        {ex.category}
                                                                    </span>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="text-xs font-bold text-gray-600 dark:text-gray-400">{ex.recorder?.name}</div>
                                                                </td>
                                                                <td className="px-8 py-6 text-right">
                                                                    <div className="text-sm font-black text-rose-600 dark:text-rose-400">- Rp {ex.amount.toLocaleString('id-ID')}</div>
                                                                </td>
                                                                <td className="px-8 py-6 text-center">
                                                                    <div className="flex justify-center gap-2">
                                                                        {ex.receipt && (
                                                                            <button
                                                                                onClick={() => setSelectedReceipt(`/storage/${ex.receipt}`)}
                                                                                className="p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl hover:scale-110 mb-1 transition-all"
                                                                            >
                                                                                <Receipt className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                        <button
                                                                            onClick={() => deleteExpense(ex.id)}
                                                                            className="p-2 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 rounded-xl hover:scale-110 mb-1 transition-all"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {expenses.length === 0 && (
                                                            <tr>
                                                                <td colSpan="5" className="px-8 py-16 text-center text-gray-400 italic">Belum ada catatan pengeluaran operasional.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'petty_cash' && (
                                    <motion.div
                                        key="petty_cash"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Buku Kas Kecil (Petty Cash)</h3>
                                            <button
                                                onClick={() => setIsPettyCashModalOpen(true)}
                                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Input Transaksi Kas
                                            </button>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Tgl / Deskripsi</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipe</th>
                                                            <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Nominal</th>
                                                            <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Saldo Akhir</th>
                                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {pettyCash.transactions.map((tx) => (
                                                            <tr key={tx.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                                                <td className="px-8 py-6">
                                                                    <div className="font-bold text-gray-900 dark:text-white">{tx.description}</div>
                                                                    <div className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest leading-none">
                                                                        {new Date(tx.transaction_date).toLocaleDateString('id-ID')} - {tx.category || '-'}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.type === 'in'
                                                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                                                        }`}>
                                                                        {tx.type === 'in' ? 'Isi Saldo (In)' : 'Keluar (Out)'}
                                                                    </span>
                                                                </td>
                                                                <td className={`px-8 py-6 text-right font-black text-sm ${tx.type === 'in' ? 'text-emerald-600' : 'text-rose-600'
                                                                    }`}>
                                                                    {tx.type === 'in' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                                                                </td>
                                                                <td className="px-8 py-6 text-right text-sm font-bold text-gray-900 dark:text-white">
                                                                    Rp {Number(tx.balance_after).toLocaleString('id-ID')}
                                                                </td>
                                                                <td className="px-8 py-6 text-center">
                                                                    <div className="flex justify-center gap-2">
                                                                        {tx.receipt && (
                                                                            <button onClick={() => setSelectedReceipt(`/storage/${tx.receipt}`)} className="p-2 text-indigo-600"><Receipt className="w-4 h-4" /></button>
                                                                        )}
                                                                        <button onClick={() => deletePettyCash(tx.id)} className="p-2 text-rose-600"><Trash2 className="w-4 h-4" /></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {pettyCash.transactions.length === 0 && (
                                                            <tr>
                                                                <td colSpan="5" className="px-8 py-16 text-center text-gray-400 italic">Belum ada riwayat transaksi kas kecil.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS SECTION */}

            {/* Expense Modal */}
            <Modal show={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
                <form onSubmit={submitExpense} className="p-8 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Tambah Pengeluaran Operasional</h2>
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Keperluan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={expenseData.description}
                                onChange={e => setExpenseData('description', e.target.value)}
                                placeholder="Contoh: Bayar Listrik, ATK, Kebersihan..."
                            />
                            <InputError message={expenseErrors.description} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Kategori" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    className="w-full"
                                    value={expenseData.category}
                                    onChange={e => setExpenseData('category', e.target.value)}
                                    placeholder="Listrik, Inventaris..."
                                />
                                <InputError message={expenseErrors.category} />
                            </div>
                            <div>
                                <InputLabel value="Tanggal" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    type="date"
                                    className="w-full"
                                    value={expenseData.expense_date}
                                    onChange={e => setExpenseData('expense_date', e.target.value)}
                                />
                                <InputError message={expenseErrors.expense_date} />
                            </div>
                        </div>
                        <div>
                            <InputLabel value="Nominal Pengeluaran" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                type="number"
                                className="w-full"
                                value={expenseData.amount}
                                onChange={e => setExpenseData('amount', e.target.value)}
                                placeholder="0"
                            />
                            <InputError message={expenseErrors.amount} />
                        </div>
                        <div>
                            <InputLabel value="Bukti Nota/Kwitansi (Opsional)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <input
                                type="file"
                                className="w-full text-xs font-bold text-gray-500"
                                onChange={e => setExpenseData('receipt', e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsExpenseModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingExpense}
                            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            Simpan Pengeluaran
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Petty Cash Modal */}
            <Modal show={isPettyCashModalOpen} onClose={() => setIsPettyCashModalOpen(false)}>
                <form onSubmit={submitPettyCash} className="p-8 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Input Transaksi Kas Kecil</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-6">
                            <button
                                type="button"
                                onClick={() => setPettyData('type', 'out')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === 'out' ? 'bg-rose-600 text-white shadow-lg' : 'text-gray-400'
                                    }`}
                            >
                                Pengeluaran (Out)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPettyData('type', 'in')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyData.type === 'in' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'
                                    }`}
                            >
                                Isi Saldo (In)
                            </button>
                        </div>

                        <div>
                            <InputLabel value="Keterangan Transaksi" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={pettyData.description}
                                onChange={e => setPettyData('description', e.target.value)}
                                placeholder="Sebutkan keperluan..."
                            />
                            <InputError message={pettyErrors.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Tanggal" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    type="date"
                                    className="w-full"
                                    value={pettyData.transaction_date}
                                    onChange={e => setPettyData('transaction_date', e.target.value)}
                                />
                            </div>
                            <div>
                                <InputLabel value="Nominal" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    type="number"
                                    className="w-full"
                                    value={pettyData.amount}
                                    onChange={e => setPettyData('amount', e.target.value)}
                                    placeholder="0"
                                />
                                <InputError message={pettyErrors.amount} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Kategori (Opsional)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={pettyData.category}
                                onChange={e => setPettyData('category', e.target.value)}
                                placeholder="Parkir, Bensin, Snack..."
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsPettyCashModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingPetty}
                            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            Konfirmasi Transaksi
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Receipt Viewer */}
            {selectedReceipt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedReceipt(null)}>
                    <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedReceipt(null)}
                            className="absolute top-6 right-6 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:scale-110 transition-all z-10 font-bold"
                        >
                            ✕
                        </button>
                        <div className="p-12 flex flex-col items-center">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-widest">Bukti Nota / Kwitansi</h3>
                            <img src={selectedReceipt} className="max-h-[70vh] rounded-2xl shadow-xl object-contain border border-gray-100 dark:border-gray-800" />
                            <button
                                onClick={() => setSelectedReceipt(null)}
                                className="mt-8 px-10 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                            >
                                Tutup Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
