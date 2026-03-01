import React, { useState, useEffect, useMemo } from 'react';
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
    Receipt,
    History,
    Activity,
    CheckCircle2,
    XCircle,
    Zap,
    Scale,
    AlertCircle,
    Image as ImageIcon
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

const getStatusColor = (status) => {
    switch (status) {
        case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
        case 'approved': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
        case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
        case 'rejected': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
        default: return 'bg-gray-100 text-gray-700';
    }
};

export default function FinanceIndex({ reports, pettyCash, filters, auth, userRole }) {
    const [activeTab, setActiveTab] = useState(filters.active_tab || 'reports');
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [isPettyCashModalOpen, setIsPettyCashModalOpen] = useState(false);

    // Activity Log Filters
    const [logFilterType, setLogFilterType] = useState('');
    const [logFilterSearch, setLogFilterSearch] = useState('');
    const [logFilterDateFrom, setLogFilterDateFrom] = useState('');
    const [logFilterDateTo, setLogFilterDateTo] = useState('');

    // Search States for Petty Cash
    const [internalSearch, setInternalSearch] = useState('');
    const [externalSearch, setExternalSearch] = useState('');

    const hasPermission = (permissionName) => {
        return auth.user?.roles?.includes('super_admin') || auth.user?.permissions?.includes(permissionName);
    };

    // Petty Cash External (Workflow) States
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [selectedProof, setSelectedProof] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const canApprove = hasPermission('approve petty_cash');
    const canReject = hasPermission('reject petty_cash');
    const isSantaMaria = canApprove || canReject; // Keep variable name for minimal impact if used elsewhere, but logic is permission-based now

    const tabs = [
        { id: 'reports', label: 'Ringkasan Laporan', icon: LayoutDashboard },
        { id: 'petty_cash', label: 'Kas Kecil Internal', icon: Wallet },
        { id: 'petty_cash_external', label: 'Kas Kecil Eksternal', icon: Zap },
        { id: 'activity', label: 'Log Kegiatan', icon: History },
    ];


    const { data: pettyInternalData, setData: setPettyInternalData, post: postPettyInternal, processing: processingPettyInternal, reset: resetPettyInternal, errors: pettyInternalErrors } = useForm({
        transaction_date: new Date().toISOString().split('T')[0],
        amount: '',
        type: 'out',
        description: '',
        category: '',
        receipt: null,
    });

    const { data: proposalData, setData: setProposalData, post: postProposal, processing: processingProposal, reset: resetProposal, errors: proposalErrors } = useForm({
        type: 'funding',
        title: '',
        description: '',
        amount: '',
    });

    const { data: approveData, setData: setApproveData, post: postApprove, processing: processingApprove, reset: resetApprove, errors: approveErrors } = useForm({
        payment_method: 'transfer',
        transfer_proof: null,
    });

    const { data: rejectData, setData: setRejectData, post: postReject, processing: processingReject, reset: resetReject, errors: rejectErrors } = useForm({
        rejection_reason: '',
    });

    const { data: proofData, setData: setProofData, post: postProof, processing: processingProof, reset: resetProof, errors: proofErrors } = useForm({
        amount_spent: '',
        description: '',
        receipt: null,
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        router.get(route('admin.finance.index'), {
            ...filters,
            [name]: value
        }, { preserveState: true });
    };

    const handleProposalFilterChange = (status) => {
        router.get(route('admin.finance.index'), {
            ...filters,
            proposal_status: status,
            active_tab: 'petty_cash_external'
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const submitProposal = (e) => {
        e.preventDefault();
        postProposal(route('admin.petty-cash.proposals.store'), {
            onSuccess: () => {
                resetProposal();
                setIsProposalModalOpen(false);
            }
        });
    };

    const handleApproveProposal = (proposal) => {
        setSelectedProposal(proposal);
        if (proposal.type === 'funding') {
            setIsApproveModalOpen(true);
        } else {
            router.post(route('admin.petty-cash.proposals.approve', proposal.id), {}, {
                preserveScroll: true
            });
        }
    };

    const submitApproveFunding = (e) => {
        e.preventDefault();
        postApprove(route('admin.petty-cash.proposals.approve', selectedProposal.id), {
            onSuccess: () => {
                setIsApproveModalOpen(false);
                resetApprove();
            },
            forceFormData: true,
            preserveScroll: true
        });
    };

    const handleRejectProposal = (proposal) => {
        setSelectedProposal(proposal);
        setIsRejectModalOpen(true);
    };

    const submitRejectProposal = (e) => {
        e.preventDefault();
        postReject(route('admin.petty-cash.proposals.reject', selectedProposal.id), {
            onSuccess: () => {
                setIsRejectModalOpen(false);
                resetReject();
            }
        });
    };

    const handleOpenProofModal = (proposal) => {
        setSelectedProposal(proposal);
        setIsProofModalOpen(true);
    };

    const submitProof = (e) => {
        e.preventDefault();
        postProof(route('admin.petty-cash.proofs.store', selectedProposal.id), {
            onSuccess: () => {
                setIsProofModalOpen(false);
                resetProof();
            }
        });
    };

    const approveProof = (proofId) => {
        router.post(route('admin.petty-cash.proofs.approve', proofId), {}, { preserveScroll: true });
    };

    const rejectProof = (proofId) => {
        router.post(route('admin.petty-cash.proofs.reject', proofId), {}, { preserveScroll: true });
    };

    const activityLog = useMemo(() => {
        const logs = [];


        // Petty Cash Proposals
        (pettyCash?.proposals || []).forEach(prop => {
            logs.push({
                id: `prop-create-${prop.id}`,
                type: 'proposal_created',
                icon: '📝',
                color: 'indigo',
                actor: prop.user?.name || 'Staff',
                actorRole: 'Staff',
                action: 'mengajukan kas kecil',
                subject: prop.title,
                detail: `${prop.type === 'funding' ? 'Permohonan Dana' : 'Belanja'} · Rp ${new Intl.NumberFormat('id-ID').format(prop.amount || 0)}`,
                date: prop.created_at,
            });

            if (prop.status === 'approved' || prop.status === 'completed') {
                logs.push({
                    id: `prop-approve-${prop.id}`,
                    type: 'proposal_approved',
                    icon: '✅',
                    color: 'emerald',
                    actor: prop.approver?.name || 'Admin',
                    actorRole: 'Admin',
                    action: 'menyetujui pengajuan kas',
                    subject: prop.title,
                    detail: `Rp ${new Intl.NumberFormat('id-ID').format(prop.amount || 0)}`,
                    date: prop.approved_at || prop.updated_at,
                });
            }

            if (prop.status === 'rejected') {
                logs.push({
                    id: `prop-reject-${prop.id}`,
                    type: 'proposal_rejected',
                    icon: '❌',
                    color: 'rose',
                    actor: prop.approver?.name || 'Admin',
                    actorRole: 'Admin',
                    action: 'menolak pengajuan kas',
                    subject: prop.title,
                    detail: `Alasan: ${prop.rejection_reason || '-'}`,
                    date: prop.approved_at || prop.updated_at,
                });
            }
        });

        // Petty Cash Transactions
        (pettyCash?.transactions || []).forEach(tx => {
            if (!tx.description?.includes('Replenishment') && !tx.description?.includes('Belanja:')) {
                logs.push({
                    id: `pct-${tx.id}`,
                    type: 'petty_cash_tx',
                    icon: tx.type === 'in' ? '📈' : '📉',
                    color: tx.type === 'in' ? 'emerald' : 'amber',
                    actor: tx.recorder?.name || 'Staff',
                    actorRole: 'Operator',
                    action: tx.type === 'in' ? 'mengisi kas kecil' : 'mencatat pemakaian kas',
                    subject: tx.description,
                    detail: `Rp ${new Intl.NumberFormat('id-ID').format(tx.amount || 0)} · Saldo: Rp ${new Intl.NumberFormat('id-ID').format(tx.balance_after || 0)}`,
                    date: tx.created_at || tx.transaction_date,
                });
            }
        });

        return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [pettyCash]);

    const filteredLog = useMemo(() => {
        return activityLog.filter(log => {
            if (logFilterType && log.type !== logFilterType) return false;
            if (logFilterSearch) {
                const q = logFilterSearch.toLowerCase();
                if (!log.actor?.toLowerCase().includes(q) &&
                    !log.subject?.toLowerCase().includes(q) &&
                    !log.detail?.toLowerCase().includes(q) &&
                    !log.action?.toLowerCase().includes(q)) return false;
            }
            if (logFilterDateFrom && new Date(log.date) < new Date(logFilterDateFrom)) return false;
            if (logFilterDateTo && new Date(log.date) > new Date(logFilterDateTo + 'T23:59:59')) return false;
            return true;
        });
    }, [activityLog, logFilterType, logFilterSearch, logFilterDateFrom, logFilterDateTo]);


    const submitPettyInternal = (e) => {
        e.preventDefault();
        postPettyInternal(route('admin.finance.petty-cash.store'), {
            onSuccess: () => {
                resetPettyInternal();
                setIsPettyCashModalOpen(false);
            },
            preserveScroll: true,
            forceFormData: true,
        });
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
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase">Manajemen Keuangan</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Laporan, Pengeluaran &amp; Kas Kecil</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            name="month"
                            className="h-10 px-4 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer"
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
                            className="h-10 px-4 bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all cursor-pointer"
                            value={filters.year}
                            onChange={handleFilterChange}
                        >
                            {[2024, 2025, 2026, 2027].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <a
                            href={route('admin.finance.export-csv', filters)}
                            className="inline-flex items-center h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            <Download className="w-3 h-3 mr-2" />
                            Export CSV
                        </a>
                    </div>
                </div>
            }
        >
            <Head title="Keuangan" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                        Rp {(pettyCash?.currentBalance ?? 0).toLocaleString('id-ID')}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-400">Total Pemasukan Bulan ini:</span>
                                        <span className="text-indigo-600">Rp {(reports?.stats?.revenue ?? 0).toLocaleString('id-ID')}</span>
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
                                                { label: 'Total Pemasukan', val: reports?.stats?.revenue ?? 0, color: 'indigo' },
                                                { label: 'Saldo Kas Kecil', val: pettyCash?.currentBalance ?? 0, color: 'emerald' },
                                                { label: 'Komisi Afiliasi', val: reports?.stats?.commissions ?? 0, color: 'amber' },
                                                { label: 'Laba Bersih', val: reports?.stats?.netIncome ?? 0, color: 'emerald', highlight: true }
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


                                {activeTab === 'petty_cash' && (
                                    <motion.div
                                        key="petty_cash"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Kas Kecil Internal</h3>
                                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                                <div className="relative w-full sm:w-64 group">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari transaksi..."
                                                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                                        value={internalSearch}
                                                        onChange={(e) => setInternalSearch(e.target.value)}
                                                    />
                                                </div>
                                                {hasPermission('create petty_cash') && (
                                                    <button
                                                        onClick={() => setIsPettyCashModalOpen(true)}
                                                        className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95 w-full sm:w-auto"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Catat Kas Masuk/Keluar
                                                    </button>
                                                )}
                                            </div>
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
                                                        {pettyCash.transactions.filter(tx =>
                                                            tx.description.toLowerCase().includes(internalSearch.toLowerCase()) ||
                                                            tx.category?.toLowerCase().includes(internalSearch.toLowerCase())
                                                        ).map((tx) => (
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
                                                                        {hasPermission('delete petty_cash') && (
                                                                            <button onClick={() => deletePettyCash(tx.id)} className="p-2 text-rose-600"><Trash2 className="w-4 h-4" /></button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {pettyCash.transactions.filter(tx =>
                                                            tx.description.toLowerCase().includes(internalSearch.toLowerCase()) ||
                                                            tx.category?.toLowerCase().includes(internalSearch.toLowerCase())
                                                        ).length === 0 && (
                                                                <tr>
                                                                    <td colSpan="5" className="px-8 py-16 text-center text-gray-400 italic font-medium">Data transaksi tidak ditemukan.</td>
                                                                </tr>
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'petty_cash_external' && (
                                    <motion.div
                                        key="petty_cash_external"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Kas Kecil Eksternal</h3>
                                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                                <div className="relative w-full sm:w-64 group">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari pengajuan..."
                                                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                                                        value={externalSearch}
                                                        onChange={(e) => setExternalSearch(e.target.value)}
                                                    />
                                                </div>
                                                {hasPermission('create petty_cash') && (
                                                    <button
                                                        onClick={() => setIsProposalModalOpen(true)}
                                                        className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95 w-full sm:w-auto"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Buat Pengajuan Baru
                                                    </button>
                                                )}
                                            </div>
                                        </div>


                                        {/* Status Filter */}
                                        <div className="flex bg-white dark:bg-gray-950 p-1 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-fit">
                                            {[
                                                { id: 'all', label: 'Semua' },
                                                { id: 'pending', label: 'Menunggu' },
                                                { id: 'approved', label: 'Disetujui' },
                                                { id: 'completed', label: 'Selesai' },
                                                { id: 'rejected', label: 'Ditolak' },
                                            ].map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => handleProposalFilterChange(tab.id)}
                                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filters.proposal_status === tab.id || (!filters.proposal_status && tab.id === 'all')
                                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                                        }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-6">
                                            {pettyCash.proposals.filter(p =>
                                                p.title.toLowerCase().includes(externalSearch.toLowerCase()) ||
                                                p.description?.toLowerCase().includes(externalSearch.toLowerCase()) ||
                                                p.user?.name.toLowerCase().includes(externalSearch.toLowerCase())
                                            ).length === 0 && (
                                                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-16 text-center border border-dashed border-gray-200 dark:border-gray-800">
                                                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Pengajuan tidak ditemukan</h4>
                                                        <p className="text-[10px] text-gray-500 mt-2">Coba gunakan kata kunci pencarian lain.</p>
                                                    </div>
                                                )}

                                            {pettyCash.proposals.filter(p =>
                                                p.title.toLowerCase().includes(externalSearch.toLowerCase()) ||
                                                p.description?.toLowerCase().includes(externalSearch.toLowerCase()) ||
                                                p.user?.name.toLowerCase().includes(externalSearch.toLowerCase())
                                            ).map((proposal) => (
                                                <motion.div
                                                    layout
                                                    key={proposal.id}
                                                    className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden group"
                                                >
                                                    <div className="p-8">
                                                        <div className="flex flex-col xl:flex-row justify-between gap-8">
                                                            <div className="flex-1 space-y-4">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-3 rounded-2xl ${proposal.type === 'funding' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20'}`}>
                                                                        {proposal.type === 'funding' ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                                                                    </div>
                                                                    <div>
                                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${proposal.type === 'funding' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                                            {proposal.type === 'funding' ? 'Isi Saldo' : 'Belanja Operasional'}
                                                                        </span>
                                                                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{proposal.title}</h4>
                                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                                            Oleh: {proposal.user?.name} • {new Date(proposal.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-50 dark:border-gray-800">
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-serif">
                                                                        {proposal.description || "Tanpa deskripsi."}
                                                                    </p>
                                                                </div>
                                                                {proposal.status === 'rejected' && (
                                                                    <div className="flex items-start gap-3 p-4 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-2xl">
                                                                        <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5" />
                                                                        <div>
                                                                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Alasan Penolakan:</span>
                                                                            <p className="text-xs font-bold text-rose-800 dark:text-rose-400 mt-1">{proposal.rejection_reason}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="xl:w-72 flex flex-col justify-between items-center xl:items-end gap-6">
                                                                <div className="text-center xl:text-right">
                                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nominal</p>
                                                                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Rp {parseFloat(proposal.amount).toLocaleString('id-ID')}</h3>
                                                                    <div className="mt-2">
                                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(proposal.status)}`}>
                                                                            {proposal.status === 'pending' ? 'Menunggu' :
                                                                                proposal.status === 'approved' ? 'Disetujui' :
                                                                                    proposal.status === 'completed' ? 'Selesai' :
                                                                                        proposal.status === 'rejected' ? 'Ditolak' : proposal.status}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full space-y-2">
                                                                    {isSantaMaria && proposal.status === 'pending' && (
                                                                        <div className="flex gap-2">
                                                                            <button onClick={() => handleApproveProposal(proposal)} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg transition-all">Setuju</button>
                                                                            <button onClick={() => handleRejectProposal(proposal)} className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg transition-all">Tolak</button>
                                                                        </div>
                                                                    )}
                                                                    {!isSantaMaria && proposal.status === 'approved' && proposal.type === 'spending' && (
                                                                        <button onClick={() => handleOpenProofModal(proposal)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg transition-all">Upload Bukti</button>
                                                                    )}
                                                                    {proposal.transfer_proof && (
                                                                        <button onClick={() => setPreviewImage(`/storage/${proposal.transfer_proof}`)} className="w-full py-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Lihat Bukti Transfer</button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {proposal.proofs && proposal.proofs.length > 0 && (
                                                            <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800">
                                                                <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                                    <Scale className="w-3 h-3" /> Bukti Belanja ({proposal.proofs.length})
                                                                </h5>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                    {proposal.proofs.map((proof) => (
                                                                        <div key={proof.id} className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-50 dark:border-gray-800 relative">
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <h6 className="text-sm font-black text-gray-900 dark:text-white">Rp {parseFloat(proof.amount_spent).toLocaleString('id-ID')}</h6>
                                                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getStatusColor(proof.status)}`}>{proof.status}</span>
                                                                            </div>
                                                                            <p className="text-[10px] font-bold text-gray-500 mb-4 line-clamp-1">{proof.description}</p>
                                                                            <div className="flex gap-2">
                                                                                <button onClick={() => setPreviewImage(`/storage/${proof.receipt_path}`)} className="flex-1 py-2 bg-white dark:bg-gray-800 rounded-lg text-[8px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-700">Preview</button>
                                                                                {isSantaMaria && proof.status === 'pending' && (
                                                                                    <>
                                                                                        <button onClick={() => approveProof(proof.id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"><CheckCircle2 className="w-3 h-3" /></button>
                                                                                        <button onClick={() => rejectProof(proof.id)} className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"><XCircle className="w-3 h-3" /></button>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'activity' && (
                                    <motion.div
                                        key="activity"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Log Kegiatan Keuangan</h3>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="relative">
                                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari aktivitas..."
                                                        value={logFilterSearch}
                                                        onChange={e => setLogFilterSearch(e.target.value)}
                                                        className="pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold w-48 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-700 dark:text-gray-300 shadow-sm"
                                                    />
                                                </div>
                                                <select
                                                    value={logFilterType}
                                                    onChange={e => setLogFilterType(e.target.value)}
                                                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 cursor-pointer text-gray-700 dark:text-gray-300 shadow-sm"
                                                >
                                                    <option value="">Semua Tipe</option>
                                                    <option value="expense">Pengeluaran</option>
                                                    <option value="proposal_created">Pengajuan (Buat)</option>
                                                    <option value="proposal_approved">Pengajuan (Setuju)</option>
                                                    <option value="proposal_rejected">Pengajuan (Tolak)</option>
                                                    <option value="petty_cash_tx">Transaksi Kas</option>
                                                </select>
                                                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-2 py-1 shadow-sm">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="date"
                                                        value={logFilterDateFrom}
                                                        onChange={e => setLogFilterDateFrom(e.target.value)}
                                                        className="px-2 py-1 bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
                                                    />
                                                    <span className="text-gray-400 text-xs">-</span>
                                                    <input
                                                        type="date"
                                                        value={logFilterDateTo}
                                                        onChange={e => setLogFilterDateTo(e.target.value)}
                                                        className="px-2 py-1 bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer text-gray-700 dark:text-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">Waktu</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Aktivitas</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">Pelaku</th>
                                                            <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail Informasi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {filteredLog.slice(0, 50).map((log) => (
                                                            <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                                                                <td className="px-8 py-6">
                                                                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                                                                        {new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-400 mt-1 font-black uppercase tracking-widest">
                                                                        {new Date(log.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="flex items-start gap-3">
                                                                        <span className="text-lg">{log.icon}</span>
                                                                        <div>
                                                                            <span className="text-sm font-bold text-gray-900 dark:text-white block mb-0.5">
                                                                                {log.action}
                                                                            </span>
                                                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-${log.color}-50 text-${log.color}-600 dark:bg-${log.color}-900/20 dark:text-${log.color}-400 inline-block`}>
                                                                                {log.subject.length > 30 ? log.subject.substring(0, 30) + '...' : log.subject}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 hidden sm:table-cell">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs">
                                                                            {log.actor.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{log.actor}</div>
                                                                            <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{log.actorRole}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-bold leading-relaxed max-w-sm">
                                                                        {log.detail}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {filteredLog.length === 0 && (
                                                            <tr>
                                                                <td colSpan="4" className="px-8 py-16 text-center text-gray-400 italic">
                                                                    Belum ada aktivitas terekam.
                                                                </td>
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



            {/* Petty Cash Internal Modal */}
            <Modal show={isPettyCashModalOpen} onClose={() => setIsPettyCashModalOpen(false)}>
                <form onSubmit={submitPettyInternal} className="p-8 dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Catat Kas Internal</h2>
                        <button type="button" onClick={() => setIsPettyCashModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400">✕</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-2">
                            <button
                                type="button"
                                onClick={() => setPettyInternalData('type', 'out')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyInternalData.type === 'out' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-gray-400'}`}
                            >
                                Kas Keluar (Out)
                            </button>
                            <button
                                type="button"
                                onClick={() => setPettyInternalData('type', 'in')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${pettyInternalData.type === 'in' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-gray-400'}`}
                            >
                                Kas Masuk (In)
                            </button>
                        </div>

                        <div>
                            <InputLabel value="Keterangan / Deskripsi" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={pettyInternalData.description}
                                onChange={e => setPettyInternalData('description', e.target.value)}
                                placeholder="Contoh: Beli Kertas, Setor Tunai..."
                            />
                            <InputError message={pettyInternalErrors.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Nominal" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    type="number"
                                    className="w-full"
                                    value={pettyInternalData.amount}
                                    onChange={e => setPettyInternalData('amount', e.target.value)}
                                    placeholder="0"
                                />
                                <InputError message={pettyInternalErrors.amount} />
                            </div>
                            <div>
                                <InputLabel value="Kategori" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    className="w-full"
                                    value={pettyInternalData.category}
                                    onChange={e => setPettyInternalData('category', e.target.value)}
                                    placeholder="ATK, Transport..."
                                />
                                <InputError message={pettyInternalErrors.category} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Bukti Nota (Opsional)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <input
                                type="file"
                                className="w-full text-xs font-bold text-gray-500 mt-1"
                                onChange={e => setPettyInternalData('receipt', e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsPettyCashModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingPettyInternal}
                            className={`inline-flex items-center px-10 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${pettyInternalData.type === 'in' ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-rose-600 text-white shadow-rose-600/20'
                                } shadow-lg`}
                        >
                            Simpan Transaksi
                        </button>
                    </div>
                </form>
            </Modal>

            {/* External: Create Proposal Modal */}
            <Modal show={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)}>
                <form onSubmit={submitProposal} className="p-8 dark:bg-gray-900">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Buat Pengajuan Kas Kecil</h2>
                        <button type="button" onClick={() => setIsProposalModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400">✕</button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Judul Pengajuan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={proposalData.title}
                                onChange={e => setProposalData('title', e.target.value)}
                                placeholder="Contoh: Belanja ATK Bulanan..."
                                required
                            />
                            <InputError message={proposalErrors.title} />
                        </div>

                        <div>
                            <InputLabel value="Detail Deskripsi & Keperluan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <textarea
                                className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold placeholder-gray-300 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                                value={proposalData.description}
                                onChange={e => setProposalData('description', e.target.value)}
                                placeholder="Jelaskan rincian keperluan dana ini secara mendetail..."
                            />
                            <InputError message={proposalErrors.description} />
                        </div>

                        <div>
                            <InputLabel value="Nominal Pengajuan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                type="number"
                                className="w-full"
                                value={proposalData.amount}
                                onChange={e => setProposalData('amount', e.target.value)}
                                placeholder="0"
                                required
                            />
                            <InputError message={proposalErrors.amount} />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsProposalModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingProposal}
                            className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            Kirim Pengajuan
                        </button>
                    </div>
                </form>
            </Modal>

            {/* External: Approve Funding Modal */}
            <Modal show={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)}>
                <form onSubmit={submitApproveFunding} className="p-8 dark:bg-gray-900">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Persetujuan Pengisian Saldo</h2>

                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-2xl mb-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">Nominal yang akan ditransfer</p>
                        <h3 className="text-3xl font-black text-emerald-700 dark:text-emerald-300">Rp {parseFloat(selectedProposal?.amount || 0).toLocaleString('id-ID')}</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Metode Pembayaran / Pengiriman" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <select
                                className="w-full bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold focus:ring-indigo-500 focus:border-indigo-500"
                                value={approveData.payment_method}
                                onChange={e => setApproveData('payment_method', e.target.value)}
                            >
                                <option value="transfer">Bank Transfer / Digital Wallet</option>
                                <option value="cash">Tunai (Cash)</option>
                                <option value="other">Lainnya</option>
                            </select>
                            <InputError message={approveErrors.payment_method} />
                        </div>

                        <div>
                            <InputLabel value="Unggah Bukti Transfer / Penyerahan (Wajib)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <input
                                type="file"
                                className="w-full text-xs font-bold text-gray-500"
                                onChange={e => setApproveData('transfer_proof', e.target.files[0])}
                                required
                            />
                            <InputError message={approveErrors.transfer_proof} />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsApproveModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingApprove}
                            className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            Konfirmasi & Posting
                        </button>
                    </div>
                </form>
            </Modal>

            {/* External: Reject Proposal Modal */}
            <Modal show={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
                <form onSubmit={submitRejectProposal} className="p-8 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400 mb-4 uppercase tracking-tight">Tolak Pengajuan?</h2>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-6 font-serif leading-relaxed">Harap sertakan alasan penolakan agar pengirim dapat merevisi atau memahami kendalanya.</p>

                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Alasan Penolakan" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <textarea
                                className="w-full bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold placeholder-gray-300 focus:ring-red-500 focus:border-red-500 min-h-[120px]"
                                value={rejectData.rejection_reason}
                                onChange={e => setRejectData('rejection_reason', e.target.value)}
                                placeholder="Tulis alasan di sini..."
                                required
                            />
                            <InputError message={rejectErrors.rejection_reason} />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsRejectModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingReject}
                            className="inline-flex items-center px-10 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20"
                        >
                            Konfirmasi Tolak
                        </button>
                    </div>
                </form>
            </Modal>

            {/* External: Upload Proof Modal */}
            <Modal show={isProofModalOpen} onClose={() => setIsProofModalOpen(false)}>
                <form onSubmit={submitProof} className="p-8 dark:bg-gray-900 rounded-[2.5rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Unggah Bukti Belanja</h2>

                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 rounded-2xl mb-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Pengajuan</p>
                        <h4 className="text-lg font-black text-indigo-900 dark:text-indigo-300">{selectedProposal?.title}</h4>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Nominal pada Kwitansi" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <TextInput
                                    type="number"
                                    className="w-full"
                                    value={proofData.amount_spent}
                                    onChange={e => setProofData('amount_spent', e.target.value)}
                                    placeholder="0"
                                    required
                                />
                                <InputError message={proofErrors.amount_spent} />
                            </div>
                            <div>
                                <InputLabel value="Unggah Foto Nota / Kwitansi" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                                <input
                                    type="file"
                                    className="w-full text-xs font-bold text-gray-500 mt-1"
                                    onChange={e => setProofData('receipt_path', e.target.files[0])}
                                    required
                                />
                                <InputError message={proofErrors.receipt_path} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Detail Belanja (Opsional)" className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full"
                                value={proofData.description}
                                onChange={e => setProofData('description', e.target.value)}
                                placeholder="Sebutkan rincian jika diperlukan..."
                            />
                            <InputError message={proofErrors.description} />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsProofModalOpen(false)}>Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingProof}
                            className="inline-flex items-center px-10 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                        >
                            Simpan Bukti
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Global Contextual Image Preview */}
            <AnimatePresence>
                {(previewImage || selectedReceipt) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => { setPreviewImage(null); setSelectedReceipt(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-5xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl">
                                <div className="p-8 sm:p-12">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                                            <ImageIcon className="w-6 h-6 text-indigo-600" /> Bukti Lampiran
                                        </h3>
                                        <button
                                            onClick={() => { setPreviewImage(null); setSelectedReceipt(null); }}
                                            className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full hover:scale-110 transition-all font-black text-sm"
                                        >
                                            TUTUP (ESC)
                                        </button>
                                    </div>
                                    <div className="flex justify-center bg-gray-50 dark:bg-black/40 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-800">
                                        <img
                                            src={previewImage || selectedReceipt}
                                            className="max-h-[70vh] w-auto rounded-xl object-contain shadow-2xl"
                                            alt="Preview"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout >
    );
}
