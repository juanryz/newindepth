import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Plus, Users, Building2, Phone, Mail,
    Search, Eye, Trash2, CheckCircle, Clock, FileText, ShieldCheck, ChevronRight
} from 'lucide-react';

const statusConfig = {
    paid:    { label: 'Lunas', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
    pending: { label: 'Menunggu', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
};

export default function GroupBookingsIndex({ groups, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.group-bookings.index'), { search }, { preserveState: true, replace: true });
    };

    const formatDate = (d) => {
        if (!d) return '-';
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };
    const formatCurrency = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

    const tabs = [
        { id: 'users', label: 'Daftar Pengguna Individu', icon: Users, href: route('admin.users.index', { tab: 'users' }) },
        { id: 'roles', label: 'Akses & Role', icon: ShieldCheck, href: route('admin.users.index', { tab: 'roles' }) },
        { id: 'groups', label: 'Daftar Grup', icon: Building2, count: groups.total, active: true },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase">Manajemen Pengguna</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Kelola Akun, Terapis, dan Hak Akses Sistem</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('admin.group-bookings.create')}
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Buat Grup Baru
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Daftar Pengguna Grup" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* SIDEBAR NAVIGATION */}
                        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500 sticky top-24">
                                <div className="space-y-2">
                                    {tabs.map((tab) => (
                                        tab.href ? (
                                            <Link
                                                key={tab.id}
                                                href={tab.href}
                                                className="w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 rounded-xl transition-colors bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30">
                                                        <tab.icon className="w-5 h-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                                                    </div>
                                                    <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" />
                                            </Link>
                                        ) : (
                                            <div
                                                key={tab.id}
                                                className="w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 rounded-xl transition-colors bg-white/20">
                                                        <tab.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-white/20">
                                                        {tab.count}
                                                    </span>
                                                    <ChevronRight className="w-4 h-4 translate-x-0 opacity-100 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>

                                {/* QUICK INFO CARD */}
                                <div className="mt-8 p-6 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-900/30">
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Informasi Keamanan</h4>
                                    <p className="text-xs text-indigo-900/70 dark:text-indigo-300/70 leading-relaxed font-medium">
                                        Pastikan untuk memberikan akses role sesuai dengan fungsinya. Gunakan role <span className="text-indigo-600 font-bold">Super Admin</span> hanya untuk personil yang berwenang mengatur sistem.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="flex-1 min-w-0 pb-12 space-y-6">

                    {/* Flash */}
                    {flash?.success && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            {flash.success}
                        </div>
                    )}

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama grup, institusi, atau PIC..."
                                className="w-full pl-12 pr-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                        </div>
                        <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">
                            Cari
                        </button>
                    </form>

                    {/* Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        {groups.data.length === 0 ? (
                            <div className="text-center py-20">
                                <Users className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Belum ada grup</p>
                                <Link
                                    href={route('admin.group-bookings.create')}
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Buat Grup Pertama
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            {['Grup / Institusi', 'PIC', 'Anggota', 'Total', 'Metode Bayar', 'Status', 'Dibuat', 'Aksi'].map((h) => (
                                                <th key={h} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {groups.data.map((g) => {
                                            const st = statusConfig[g.payment_status] ?? statusConfig.pending;
                                            return (
                                                <tr key={g.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-gray-900 dark:text-white">{g.group_name}</p>
                                                        {g.institution_name && <p className="text-[10px] text-gray-400">{g.institution_name}</p>}
                                                        <p className="text-[10px] font-bold text-indigo-500 mt-1">{g.invoice_number}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{g.pic_name}</p>
                                                        {g.pic_phone && <p className="text-[10px] text-gray-400">{g.pic_phone}</p>}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-full">
                                                            <Users className="w-3 h-3" />
                                                            {g.members_count ?? 0} orang
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-black text-gray-900 dark:text-white">{formatCurrency(g.total_amount)}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{g.payment_method}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${st.cls}`}>{st.label}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-xs text-gray-400">{formatDate(g.created_at)}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link
                                                            href={route('admin.group-bookings.show', g.id)}
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors"
                                                        >
                                                            <Eye className="w-3 h-3" /> Detail
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {groups.last_page > 1 && (
                            <div className="flex justify-center gap-2 p-6 border-t border-gray-100 dark:border-gray-800">
                                {groups.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : link.url
                                                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50'
                                                    : 'opacity-30 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
