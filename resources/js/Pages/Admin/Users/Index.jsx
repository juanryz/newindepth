import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    Search,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    ChevronRight,
    UserPlus,
    ShieldAlert,
    CheckCircle,
    UserCircle,
    Key,
    AlertCircle,
    Building2,
    ChevronLeft,
    FileText,
} from 'lucide-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

function ProfileCompletionBadge({ completion }) {
    if (!completion) return <span className="text-[10px] text-gray-400">—</span>;

    const { percentage, is_complete, fields } = completion;

    const missingFields = Object.values(fields || {})
        .filter(f => !f.filled)
        .map(f => f.label);

    const colorClass = is_complete
        ? 'text-emerald-600 dark:text-emerald-400'
        : percentage >= 60
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-rose-600 dark:text-rose-400';

    const barColor = is_complete
        ? 'bg-emerald-500'
        : percentage >= 60
            ? 'bg-amber-500'
            : 'bg-rose-500';

    return (
        <div className="flex flex-col items-center gap-1.5 group relative">
            <span className={`text-sm font-black tabular-nums ${colorClass}`}>
                {percentage}%
            </span>
            <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {!is_complete && missingFields.length > 0 && (
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 w-48 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-xl p-3 shadow-xl pointer-events-none left-1/2 -translate-x-1/2">
                    <p className="font-black uppercase tracking-widest mb-2 text-gray-300">Belum diisi:</p>
                    <ul className="space-y-0.5">
                        {missingFields.map((label, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const statusConfig = {
    paid:    { label: 'Lunas', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
    pending: { label: 'Menunggu', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
};

export default function UsersIndex({ users, roles, permissions, groups, filters }) {
    const { auth, flash } = usePage().props;
    const { user } = auth;

    // Permission checks
    const hasPermission = (permissionName) => {
        return user.roles?.includes('super_admin') || user.permissions?.includes(permissionName);
    };
    const queryParams = new URLSearchParams(window.location.search);
    const initialTab = queryParams.get('tab') || 'users';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [groupSearchQuery, setGroupSearchQuery] = useState(filters.group_search || '');

    const formatCurrency = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');
    const formatDate = (d) => {
        if (!d) return '-';
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set('tab', tabId);
        window.history.replaceState({}, '', url);
    };

    const tabs = [
        { id: 'users', label: 'Daftar Pengguna Individu', icon: Users, count: users.total },
        { id: 'roles', label: 'Akses & Role', icon: ShieldCheck, count: roles.length },
        { id: 'groups', label: 'Daftar Grup', icon: Building2, count: groups?.total || 0 },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search: searchQuery, group_search: groupSearchQuery, tab: activeTab }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleDeleteUser = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait akan ikut terhapus.')) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const handleDeleteRole = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus role ini?')) {
            router.delete(route('admin.roles.destroy', id));
        }
    };

    const [newPermission, setNewPermission] = useState('');
    const [editingPermission, setEditingPermission] = useState(null);

    const handleCreatePermission = (e) => {
        e.preventDefault();
        router.post(route('admin.permissions.store'), { name: newPermission }, {
            onSuccess: () => {
                setNewPermission('');
            }
        });
    };

    const handleDeletePermission = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus izin akses ini?')) {
            router.delete(route('admin.permissions.destroy', id));
        }
    };

    const handleGroupDelete = (id) => {
        if (confirm('Hapus grup ini? Seluruh data anggota dan booking di dalamnya akan dihapus.')) {
            router.delete(route('admin.group-bookings.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase">Manajemen Pengguna</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Kelola Akun, Terapis, dan Hak Akses Sistem</p>
                    </div>
                    <div className="flex gap-3">
                        {activeTab === 'users' && hasPermission('create users') ? (
                            <>
                                <Link
                                    href={route('admin.users.create-offline')}
                                    className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Tambah User Offline
                                </Link>
                                <Link
                                    href={route('admin.users.create')}
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Tambah Pengguna
                                </Link>
                            </>
                        ) : activeTab === 'roles' && hasPermission('create roles') ? (
                            <Link
                                href={route('admin.roles.create')}
                                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                            >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Tambah Role Baru
                            </Link>
                        ) : activeTab === 'groups' ? (
                            <Link
                                href={route('admin.group-bookings.create')}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Buat Grup
                            </Link>
                        ) : null}
                    </div>
                </div>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Flash Message */}
                    <AnimatePresence>
                        {flash.success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-8 p-4 bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 rounded-3xl text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-3 shadow-sm"
                            >
                                <CheckCircle className="w-5 h-5" />
                                {flash.success}
                            </motion.div>
                        )}
                        {flash.error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-8 p-4 bg-rose-50 border border-rose-100 dark:bg-rose-900/20 dark:border-rose-800 rounded-3xl text-rose-600 dark:text-rose-400 text-sm font-bold flex items-center gap-3 shadow-sm"
                            >
                                <ShieldAlert className="w-5 h-5" />
                                {flash.error}
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                                                    <div className="p-2 rounded-xl transition-colors bg-gray-100 dark:bg-gray-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30">
                                                        <tab.icon className="w-5 h-5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                                    </div>
                                                    <span className="text-sm font-black uppercase tracking-widest text-left text-wrap leading-tight max-w-[120px] sm:max-w-none">{tab.label}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" />
                                            </Link>
                                        ) : (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabChange(tab.id)}
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
                                                    <span className="text-sm font-black uppercase tracking-widest text-left text-wrap leading-tight max-w-[120px] sm:max-w-none">{tab.label}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800'
                                                        }`}>
                                                        {tab.count}
                                                    </span>
                                                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                                                        }`} />
                                                </div>
                                            </button>
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
                        <div className="flex-1 min-w-0 pb-12">
                            <AnimatePresence mode="wait">
                                {activeTab === 'users' && (
                                    <motion.div
                                        key="users"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* Search Filter */}
                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                                                <div className="flex-1 relative">
                                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari user berdasarkan nama atau email..."
                                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                                    Cari User
                                                </button>
                                            </form>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 transition-all duration-500 flex flex-col min-w-0">
                                            <div className="w-full overflow-x-auto pb-6 rounded-t-[2.5rem]">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Pengguna</th>
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Hak Akses (Role)</th>
                                                            <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Kelengkapan Profil</th>
                                                            <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Verifikasi</th>
                                                            <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Tindakan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {users.data.map((user) => (
                                                            <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                                                                <td className="px-8 py-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                                                            {user.profile_photo_url ? (
                                                                                <img src={user.profile_photo_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                                                                            ) : (
                                                                                <UserCircle className="w-6 h-6" />
                                                                            )}
                                                                        </div>
                                                                        <div className="min-w-[150px]">
                                                                            <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user.name}</div>
                                                                            <div className="text-[10px] text-gray-400 font-bold tracking-widest">{user.email}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="flex flex-wrap gap-2 min-w-[150px]">
                                                                        {user.roles.map((role, i) => {
                                                                            const roleName = typeof role === 'string' ? role : role.name;
                                                                            const roleId = typeof role === 'string' ? `${role}-${i}` : role.id;
                                                                            return (
                                                                                <span key={roleId} className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${roleName === 'super_admin'
                                                                                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                                                                    : roleName === 'therapist'
                                                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                                        : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                                                                    }`}>
                                                                                    {roleName}
                                                                                </span>
                                                                            );
                                                                        })}
                                                                        {user.roles.length === 0 && <span className="text-[10px] text-gray-400 italic font-medium px-2 py-1">Belum ada role</span>}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-center min-w-[120px]">
                                                                    <ProfileCompletionBadge completion={user.profile_completion} />
                                                                </td>
                                                                <td className="px-8 py-6 text-center min-w-[120px]">
                                                                    {user.email_verified_at ? (
                                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
                                                                            <CheckCircle className="w-3 h-3" />
                                                                            Terverifikasi
                                                                        </div>
                                                                    ) : (
                                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800">
                                                                            Menunggu
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="px-8 py-6 text-right whitespace-nowrap min-w-[150px]">
                                                                    <div className="flex justify-end gap-2 transition-all">
                                                                        <Link
                                                                            href={route('admin.users.show', user.id)}
                                                                            className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                            title="Detail"
                                                                        >
                                                                            <Eye className="w-4 h-4" />
                                                                        </Link>
                                                                        {hasPermission('edit users') && (
                                                                            <Link
                                                                                href={route('admin.users.edit', user.id)}
                                                                                className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                title="Edit"
                                                                            >
                                                                                <Edit className="w-4 h-4" />
                                                                            </Link>
                                                                        )}
                                                                        {hasPermission('delete users') && (
                                                                            <button
                                                                                onClick={() => handleDeleteUser(user.id)}
                                                                                className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                title="Hapus"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Pagination */}
                                            <div className="px-4 sm:px-8 py-6 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col xl:flex-row justify-between items-center gap-6 rounded-b-[2.5rem] w-full overflow-x-auto">
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center xl:text-left whitespace-nowrap">
                                                    Menampilkan {users.from || 0} sampai {users.to || 0} dari {users.total} pengguna
                                                </div>
                                                <div className="flex flex-wrap justify-center gap-2 max-w-full">
                                                    {users.links.map((link, i) => (
                                                        <Link
                                                            key={i}
                                                            href={link.url || '#'}
                                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${link.active
                                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                                : 'bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'roles' && (
                                    <motion.div
                                        key="roles"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Manajemen Hak Akses</h3>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Konfigurasi Role dan Izin Akses (Permissions)</p>
                                                </div>
                                                <ShieldCheck className="w-10 h-10 text-indigo-500/20" />
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-1/4">Nama Role</th>
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Izin Akses (Permissions)</th>
                                                            <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-40">Tindakan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {roles.map((role) => (
                                                            <tr key={role.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                                                                <td className="px-8 py-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600">
                                                                            <ShieldCheck className="w-5 h-5" />
                                                                        </div>
                                                                        <div className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">{role.name}</div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {(role.permissions || []).slice(0, 10).map(perm => (
                                                                            <span key={perm.id} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30 rounded text-[9px] font-black uppercase tracking-tighter shadow-sm">
                                                                                {perm.name.replace(/[\._]/g, ' ')}
                                                                            </span>
                                                                        ))}
                                                                        {(role.permissions || []).length > 10 && (
                                                                            <span className="text-[9px] font-black text-indigo-500 px-2 uppercase my-auto">+{(role.permissions || []).length - 10} lainnya</span>
                                                                        )}
                                                                        {(!role.permissions || role.permissions.length === 0) && (
                                                                            <span className="text-[10px] text-gray-400 italic font-medium px-2 py-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg">Belum ada izin akses yang diatur</span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        {hasPermission('edit roles') && (
                                                                            <Link
                                                                                href={route('admin.roles.edit', role.id)}
                                                                                className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                title="Atur Hak Akses"
                                                                            >
                                                                                <Key className="w-4 h-4" />
                                                                            </Link>
                                                                        )}
                                                                        {role.name !== 'super_admin' && hasPermission('delete roles') && (
                                                                            <button
                                                                                onClick={() => handleDeleteRole(role.id)}
                                                                                className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                title="Hapus Role"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'groups' && (
                                    <motion.div
                                        key="groups"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* Search Filter for Groups */}
                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                                                <div className="flex-1 relative">
                                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari nama grup, institusi, atau PIC..."
                                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                        value={groupSearchQuery}
                                                        onChange={(e) => setGroupSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                                    Cari Grup
                                                </button>
                                            </form>
                                        </div>

                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                                            {groups?.data?.length === 0 ? (
                                                <div className="text-center py-20">
                                                    <Users className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
                                                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Belum ada grup</p>
                                                </div>
                                            ) : (
                                                <div className="w-full overflow-x-auto md:overflow-visible pb-12">
                                                    <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                        <thead>
                                                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                                {['Grup / Institusi', 'Anggota', 'Status', 'Aksi'].map((h) => (
                                                                    <th key={h} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">{h}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                            {groups?.data?.map((g) => {
                                                                const st = statusConfig[g.payment_status] ?? statusConfig.pending;
                                                                return (
                                                                    <tr key={g.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                                                        <td className="px-6 py-4">
                                                                            <p className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{g.group_name}</p>
                                                                            {g.institution_name && <p className="text-[10px] font-bold tracking-widest text-gray-400">{g.institution_name}</p>}
                                                                            <p className="text-[10px] font-black tracking-widest text-indigo-500 mt-1">{g.invoice_number}</p>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-xs font-black rounded-full">
                                                                                <Users className="w-3 h-3" />
                                                                                {g.members_count ?? 0}
                                                                            </span>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            {(() => {
                                                                                // Calculate synchronized status based on members' transactions
                                                                                const members = g.members || [];
                                                                                const hasMembers = members.length > 0;
                                                                                const allPaid = hasMembers && members.every(m => m.booking?.transaction?.status === 'paid');
                                                                                const anyPaidOrPending = hasMembers && members.some(m => ['paid', 'pending'].includes(m.booking?.transaction?.status));

                                                                                let statusData = { label: 'Belum Bayar', cls: 'bg-rose-50 text-rose-700 border border-rose-100' };
                                                                                if (allPaid) statusData = { label: '✓ Lunas Semua', cls: 'bg-emerald-50 text-emerald-700 border border-emerald-100' };
                                                                                else if (anyPaidOrPending) statusData = { label: '⏳ Sebagian / Proses', cls: 'bg-amber-50 text-amber-700 border border-amber-100' };
                                                                                
                                                                                return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusData.cls}`}>{statusData.label}</span>;
                                                                            })()}
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <Link
                                                                                    href={route('admin.group-bookings.show', g.id)}
                                                                                    className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                    title="Detail"
                                                                                >
                                                                                    <Eye className="w-4 h-4" />
                                                                                </Link>
                                                                                <Link
                                                                                    href={route('admin.group-bookings.edit', g.id)}
                                                                                    className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                    title="Edit"
                                                                                >
                                                                                    <FileText className="w-4 h-4" />
                                                                                </Link>
                                                                                <button
                                                                                    onClick={() => handleGroupDelete(g.id)}
                                                                                    className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                                    title="Hapus"
                                                                                >
                                                                                    <Trash2 className="w-4 h-4" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            {/* Pagination for Groups */}
                                            {groups?.last_page > 1 && (
                                                <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        Menampilkan {groups.from || 0} sampai {groups.to || 0} dari {groups.total} grup
                                                    </div>
                                                    <div className="flex justify-center gap-2">
                                                        {groups.links.map((link, i) => (
                                                            <Link
                                                                key={i}
                                                                href={link.url || '#'}
                                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                                    link.active
                                                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                                        : link.url
                                                                            ? 'bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                                            : 'opacity-30 cursor-not-allowed'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
