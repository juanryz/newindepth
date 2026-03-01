import React, { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ShieldCheck,
    ChevronLeft,
    Save,
    Key,
    LayoutDashboard,
    Users,
    CreditCard,
    Calendar,
    BarChart,
    FileText,
    BookOpen,
    Settings,
    Shield
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function RolesForm({ roleModel, permissions, rolePermissions }) {
    const isEditing = !!roleModel.id;

    const { data, setData, post, put, processing, errors } = useForm({
        name: roleModel.name || '',
        permissions: rolePermissions || [],
    });

    // Map resources to categories
    const categoryMapping = {
        'Booking & Konsultasi': ['bookings', 'schedules', 'own_schedule'],
        'Transaksi & Pembayaran': ['transactions', 'all_transactions', 'packages', 'vouchers'],
        'Manajemen Pengguna': ['users', 'roles', 'permissions'],
        'Konten Akses Publik': ['blog_posts', 'courses', 'lessons'],
        'Laporan & Keuangan': ['reports', 'finance', 'expenses', 'petty_cash'],
    };

    // Descriptions per resource
    const resourceDescriptions = {
        'bookings': 'Akses mengelola pesanan (booking) layanan.',
        'schedules': 'Mengatur keseluruhan jadwal praktek terapis.',
        'own_schedule': 'Akses khusus terapis melihat jadwal prakteknya sendiri.',
        'transactions': 'Memvalidasi atau menolak pembayaran dari pesanan baru.',
        'all_transactions': 'Akses melihat seluruh history transaksi pengguna.',
        'users': 'Manajemen daftar pengguna dan pemberian hak akses.',
        'blog_posts': 'Mengelola informasi artikel blog publik.',
        'courses': 'Mengelola paket dan konten kursus edukasi.',
        'reports': 'Export dan view laporan statistik bulanan.',
        'finance': 'Melihat arus kas utama & dashboard finance.',
        'petty_cash': 'Mengelola pengajuan dan saldo kas kecil.',
        'packages': 'Mengelola daftar jenis paket dan layanan terapi.',
        'vouchers': 'Membuat dan mengelola kupon diskon atau promo.',
    };

    // Parse permission name into { action, resource }
    const parsePermission = (name) => {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            const action = parts[0];
            const resource = parts.slice(1).join('_');
            return { action, resource };
        }
        return { action: name, resource: 'general' };
    };

    // Group permissions by category and then by resource
    const permissionStructure = useMemo(() => {
        const structure = {};
        Object.keys(categoryMapping).forEach(cat => structure[cat] = {});

        permissions.forEach(perm => {
            const { action, resource } = parsePermission(perm.name);
            let category = 'Lainnya';

            for (const [cat, resources] of Object.entries(categoryMapping)) {
                if (resources.includes(resource)) {
                    category = cat;
                    break;
                }
            }

            if (!structure[category]) structure[category] = {};
            if (!structure[category][resource]) structure[category][resource] = [];

            structure[category][resource].push({
                id: perm.id,
                name: perm.name,
                action: action,
                resource: resource
            });
        });

        // Filter out empty categories
        return Object.fromEntries(Object.entries(structure).filter(([_, resources]) => Object.keys(resources).length > 0));
    }, [permissions]);

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('permissions', [...data.permissions, value]);
        } else {
            setData('permissions', data.permissions.filter((perm) => perm !== value));
        }
    };

    const toggleResource = (resourcePerms) => {
        const allNames = resourcePerms.map(p => p.name);
        const allSelected = allNames.every(name => data.permissions.includes(name));

        if (allSelected) {
            setData('permissions', data.permissions.filter(p => !allNames.includes(p)));
        } else {
            const newPerms = [...new Set([...data.permissions, ...allNames])];
            setData('permissions', newPerms);
        }
    };

    const toggleCategory = (resources) => {
        const allNames = Object.values(resources).flat().map(p => p.name);
        const allSelected = allNames.every(name => data.permissions.includes(name));

        if (allSelected) {
            setData('permissions', data.permissions.filter(p => !allNames.includes(p)));
        } else {
            const newPerms = [...new Set([...data.permissions, ...allNames])];
            setData('permissions', newPerms);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.roles.update', roleModel.id));
        } else {
            post(route('admin.roles.store'));
        }
    };

    const getIconForCategory = (cat) => {
        switch (cat) {
            case 'Booking & Konsultasi': return <Calendar className="w-4 h-4" />;
            case 'Transaksi & Pembayaran': return <CreditCard className="w-4 h-4" />;
            case 'Manajemen Pengguna': return <Users className="w-4 h-4" />;
            case 'Konten Akses Publik': return <BookOpen className="w-4 h-4" />;
            case 'Laporan & Keuangan': return <BarChart className="w-4 h-4" />;
            default: return <Settings className="w-4 h-4" />;
        }
    };

    const formatResourceName = (name) => {
        const mapping = {
            'bookings': 'Data Booking Pasien',
            'schedules': 'Jadwal Reguler Terapis',
            'own_schedule': 'Jadwal Personal (Terapis)',
            'transactions': 'Validasi Transaksi Masuk',
            'all_transactions': 'Seluruh Riwayat Transaksi',
            'users': 'Manajemen Pengguna & Admin',
            'blog_posts': 'Artikel Blog Publik',
            'courses': 'Layanan Kursus Edukasi',
            'reports': 'Laporan Sistem Utama',
            'finance': 'Dashboard Keuangan (Finance)',
            'petty_cash': 'Kas Kecil Internal/Eksternal',
            'packages': 'Manajemen Layanan & Paket',
            'vouchers': 'Manajemen Kode Voucher'
        };
        return mapping[name] || name.replace(/_/g, ' ').toUpperCase();
    };

    const formatActionName = (name) => {
        const mapping = {
            'view': 'VIEW',
            'create': 'CREATE',
            'edit': 'EDIT',
            'delete': 'DELETE',
            'cancel': 'CANCEL',
            'validate': 'VALIDATE',
            'reject': 'REJECT',
            'publish': 'PUBLISH',
            'approve': 'APPROVE',
            'export': 'EXPORT',
            'analyze': 'ANALYZE',
            'bulk_delete': 'BULK DEL',
            'assign': 'ASSIGN',
            'view_agreement': 'AGREEMENT'
        };
        return mapping[name] || name.toUpperCase();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.users.index', { tab: 'roles' })}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight">
                            {isEditing ? 'Konfigurasi Hak Akses' : 'Tambah Role Baru'}
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            {isEditing ? `Mengatur Izin Untuk Role: ${roleModel.name}` : 'Mendefinisikan Peran Baru Dalam Sistem'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={isEditing ? 'Atur Hak Akses' : 'Tambah Role'} />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">

                    <form onSubmit={submit} className="space-y-8">

                        {/* ROLE INFO CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Shield className="w-32 h-32" />
                            </div>

                            <div className="max-w-xl">
                                <InputLabel htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3 ml-1">Nama Role</InputLabel>
                                <div className="relative">
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-6 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        onChange={(e) => setData('name', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                                        placeholder="Contoh: manager_klinik, asisten_admin"
                                        required
                                        disabled={roleModel.name === 'super_admin'}
                                    />
                                    {roleModel.name === 'super_admin' && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-100">
                                            <Shield className="w-3 h-3" />
                                            System Role
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.name} className="mt-2 ml-1" />
                            </div>
                        </div>

                        {/* PERMISSIONS SECTION */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Daftar Izin Akses</h3>
                            </div>

                            {Object.entries(permissionStructure).map(([category, resources]) => {
                                const allInCat = Object.values(resources).flat().map(p => p.name);
                                const allSelected = allInCat.every(name => data.permissions.includes(name));

                                return (
                                    <div key={category} className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden">
                                        <div className="px-8 py-5 bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-2xl bg-white dark:bg-gray-900 shadow-sm text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-gray-800">
                                                    {getIconForCategory(category)}
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-[0.1em] text-gray-900 dark:text-white">{category}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(resources)}
                                                className={`text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-xl transition-all border ${allSelected
                                                    ? 'bg-rose-50 border-rose-100 text-rose-600'
                                                    : 'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600'
                                                    }`}
                                            >
                                                {allSelected ? 'Lepas Semua Kategori' : 'Pilih Semua Kategori'}
                                            </button>
                                        </div>

                                        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                            {Object.entries(resources).map(([resource, perms]) => {
                                                const allResSelected = perms.map(p => p.name).every(name => data.permissions.includes(name));

                                                // Split into common CRUD and specialized actions
                                                const commonActions = ['view', 'create', 'edit', 'delete'];
                                                const commonPerms = perms.filter(p => commonActions.includes(p.action));
                                                const specialPerms = perms.filter(p => !commonActions.includes(p.action));

                                                return (
                                                    <div key={resource} className="p-8 hover:bg-gray-50/30 dark:hover:bg-gray-800/10 transition-colors">
                                                        <div className="flex flex-col xl:flex-row xl:items-start gap-8">
                                                            <div className="xl:w-1/4">
                                                                <div className="flex items-start gap-3 mb-2">
                                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                                                                    <div>
                                                                        <span className="text-[12px] font-black tracking-widest text-gray-900 dark:text-white block mb-0.5">
                                                                            {formatResourceName(resource)}
                                                                        </span>
                                                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                                                            {resourceDescriptions[resource] || 'Hak akses untuk mengelola modul ini.'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleResource(perms)}
                                                                    className="text-[9px] font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-tighter transition-colors mt-2 ml-5"
                                                                >
                                                                    {allResSelected ? 'Hapus Semua Centang' : 'Pilih Semua (Penuh)'}
                                                                </button>
                                                            </div>

                                                            <div className="xl:w-3/4">
                                                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                                    {/* Render Common CRUD in order */}
                                                                    {commonActions.map(action => {
                                                                        const perm = commonPerms.find(p => p.action === action);
                                                                        if (!perm) return <div key={action} className="hidden sm:block"></div>;

                                                                        return (
                                                                            <label
                                                                                key={perm.id}
                                                                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name)
                                                                                    ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-600/20'
                                                                                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800'
                                                                                    }`}
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="hidden"
                                                                                    value={perm.name}
                                                                                    checked={data.permissions.includes(perm.name)}
                                                                                    onChange={handlePermissionChange}
                                                                                />
                                                                                <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name)
                                                                                    ? 'bg-white border-white'
                                                                                    : 'border-gray-200 dark:border-gray-700 group-hover:border-indigo-400'
                                                                                    }`}>
                                                                                    {data.permissions.includes(perm.name) && (
                                                                                        <svg className="w-2.5 h-2.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                                                    )}
                                                                                </div>
                                                                                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${data.permissions.includes(perm.name) ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                                                                                    }`}>
                                                                                    {formatActionName(action)}
                                                                                </span>
                                                                            </label>
                                                                        );
                                                                    })}

                                                                    {/* Render Specialized actions */}
                                                                    {specialPerms.map((perm) => (
                                                                        <label
                                                                            key={perm.id}
                                                                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name)
                                                                                ? 'bg-emerald-600 border-emerald-600 shadow-lg shadow-emerald-600/20'
                                                                                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800'
                                                                                }`}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                className="hidden"
                                                                                value={perm.name}
                                                                                checked={data.permissions.includes(perm.name)}
                                                                                onChange={handlePermissionChange}
                                                                            />
                                                                            <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name)
                                                                                ? 'bg-white border-white'
                                                                                : 'border-gray-200 dark:border-gray-700 group-hover:border-emerald-400'
                                                                                }`}>
                                                                                {data.permissions.includes(perm.name) && (
                                                                                    <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                                                )}
                                                                            </div>
                                                                            <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${data.permissions.includes(perm.name) ? 'text-white' : 'text-emerald-500/80 dark:text-emerald-400/80'
                                                                                }`}>
                                                                                {formatActionName(perm.action)}
                                                                            </span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SUBMIT AREA */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl border border-white dark:border-gray-800 sticky bottom-8 transition-all duration-500 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
                            <Link
                                href={route('admin.users.index', { tab: 'roles' })}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-rose-500 transition-colors px-6"
                            >
                                Batal & Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {isEditing ? 'Simpan Perubahan' : 'Buat Role Baru'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
