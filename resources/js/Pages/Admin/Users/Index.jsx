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
    Key
} from 'lucide-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function UsersIndex({ users, roles, permissions, filters }) {
    const { flash } = usePage().props;
    const queryParams = new URLSearchParams(window.location.search);
    const initialTab = queryParams.get('tab') || 'users';
    const [activeTab, setActiveTab] = useState(initialTab);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        const url = new URL(window.location);
        url.searchParams.set('tab', tabId);
        window.history.replaceState({}, '', url);
    };

    const tabs = [
        { id: 'users', label: 'Daftar Pengguna', icon: Users, count: users.total },
        { id: 'roles', label: 'Akses & Role', icon: ShieldCheck, count: roles.length },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search: searchQuery }, {
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight tracking-tight uppercase">Manajemen Pengguna</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Kelola Akun, Terapis, dan Hak Akses Sistem</p>
                    </div>
                    <div className="flex gap-3">
                        {activeTab === 'users' ? (
                            <Link
                                href={route('admin.users.create')}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Tambah Pengguna
                            </Link>
                        ) : (
                            <Link
                                href={route('admin.roles.create')}
                                className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                            >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Tambah Role Baru
                            </Link>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500">
                <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8">

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
                                                <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
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

                                        {/* Users Table */}
                                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                                                    <thead>
                                                        <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi Pengguna</th>
                                                            <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Hak Akses (Role)</th>
                                                            <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Verifikasi</th>
                                                            <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Tindakan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                        {users.data.map((user) => (
                                                            <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group">
                                                                <td className="px-8 py-6">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                                            {user.profile_photo_url ? (
                                                                                <img src={user.profile_photo_url} alt="" className="w-full h-full rounded-2xl object-cover" />
                                                                            ) : (
                                                                                <UserCircle className="w-6 h-6" />
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user.name}</div>
                                                                            <div className="text-[10px] text-gray-400 font-bold tracking-widest">{user.email}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {user.roles.map(role => (
                                                                            <span key={role.id} className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${role.name === 'super_admin'
                                                                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                                                                                : role.name === 'therapist'
                                                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                                    : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                                                                                }`}>
                                                                                {role.name}
                                                                            </span>
                                                                        ))}
                                                                        {user.roles.length === 0 && <span className="text-[10px] text-gray-400 italic font-medium px-2 py-1">Belum ada role</span>}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-center">
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
                                                                <td className="px-8 py-6 text-right">
                                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                                        <Link
                                                                            href={route('admin.users.show', user.id)}
                                                                            className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                            title="Detail"
                                                                        >
                                                                            <Eye className="w-4 h-4" />
                                                                        </Link>
                                                                        <Link
                                                                            href={route('admin.users.edit', user.id)}
                                                                            className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                            title="Edit"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handleDeleteUser(user.id)}
                                                                            className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                            title="Hapus"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Pagination */}
                                            <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                    Menampilkan {users.from || 0} sampai {users.to || 0} dari {users.total} pengguna
                                                </div>
                                                <div className="flex gap-2">
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
                                                            <th className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-40">Aksi</th>
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
                                                                        {role.permissions.slice(0, 10).map(perm => (
                                                                            <span key={perm.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded text-[8px] font-bold uppercase tracking-tighter">
                                                                                {perm.name.replace(/\./g, ' ')}
                                                                            </span>
                                                                        ))}
                                                                        {role.permissions.length > 10 && (
                                                                            <span className="text-[8px] font-black text-indigo-500 px-2 uppercase">+{role.permissions.length - 10} lainnya</span>
                                                                        )}
                                                                        {role.permissions.length === 0 && (
                                                                            <span className="text-[9px] text-gray-400 italic font-medium">Full Access (Super Admin) atau belum diatur</span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        <Link
                                                                            href={route('admin.roles.edit', role.id)}
                                                                            className="p-3 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                            title="Atur Hak Akses"
                                                                        >
                                                                            <Key className="w-4 h-4" />
                                                                        </Link>
                                                                        {role.name !== 'super_admin' && (
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
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
