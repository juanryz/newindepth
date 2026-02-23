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

    // Group permissions by category
    const groupedPermissions = useMemo(() => {
        const categories = {
            'Booking & Konsultasi': ['booking', 'schedule'],
            'Transaksi & Pembayaran': ['transaction', 'pricing', 'voucher'],
            'Manajemen Pengguna': ['user', 'role', 'permission'],
            'Konten & Blog': ['blog', 'course', 'lesson'],
            'Laporan & Statistik': ['report', 'finance', 'expense'],
            'Lainnya': []
        };

        const result = {};
        Object.keys(categories).forEach(cat => result[cat] = []);

        permissions.forEach(perm => {
            let found = false;
            for (const [cat, keywords] of Object.entries(categories)) {
                if (keywords.some(k => perm.name.toLowerCase().includes(k))) {
                    result[cat].push(perm);
                    found = true;
                    break;
                }
            }
            if (!found) result['Lainnya'].push(perm);
        });

        // Filter out empty categories
        return Object.fromEntries(Object.entries(result).filter(([_, perms]) => perms.length > 0));
    }, [permissions]);

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('permissions', [...data.permissions, value]);
        } else {
            setData('permissions', data.permissions.filter((perm) => perm !== value));
        }
    };

    const toggleGroup = (groupPerms) => {
        const allNames = groupPerms.map(p => p.name);
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
            case 'Konten & Blog': return <BookOpen className="w-4 h-4" />;
            case 'Laporan & Statistik': return <BarChart className="w-4 h-4" />;
            default: return <Settings className="w-4 h-4" />;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.users.index')}
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
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">

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
                                <p className="mt-3 text-[10px] text-gray-400 font-medium px-1">
                                    Gunakan huruf kecil dan garis bawah (underscore) untuk nama role teknis.
                                </p>
                            </div>
                        </div>

                        {/* PERMISSIONS SECTION */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Daftar Izin Akses</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(groupedPermissions).map(([category, perms]) => {
                                    const allSelected = perms.map(p => p.name).every(name => data.permissions.includes(name));

                                    return (
                                        <div key={category} className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-lg border border-white dark:border-gray-800 transition-all hover:shadow-indigo-500/5">
                                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50 dark:border-gray-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                                                        {getIconForCategory(category)}
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">{category}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleGroup(perms)}
                                                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${allSelected
                                                            ? 'bg-rose-50 text-rose-600'
                                                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                                        }`}
                                                >
                                                    {allSelected ? 'Lepas Semua' : 'Pilih Semua'}
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {perms.map((perm) => (
                                                    <label
                                                        key={perm.id}
                                                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${data.permissions.includes(perm.name)
                                                                ? 'bg-indigo-500/5 border-indigo-200 dark:border-indigo-900/50 ring-1 ring-indigo-100 dark:ring-indigo-900/20'
                                                                : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${data.permissions.includes(perm.name)
                                                                    ? 'bg-indigo-600 border-indigo-600'
                                                                    : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'
                                                                }`}>
                                                                {data.permissions.includes(perm.name) && (
                                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                                )}
                                                            </div>
                                                            <span className={`text-[11px] font-bold uppercase tracking-tight transition-colors ${data.permissions.includes(perm.name) ? 'text-indigo-700 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                                                }`}>
                                                                {perm.name.replace(/_/g, ' ')}
                                                            </span>
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            value={perm.name}
                                                            checked={data.permissions.includes(perm.name)}
                                                            onChange={handlePermissionChange}
                                                        />
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SUBMIT AREA */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8 transition-all duration-500">
                            <Link
                                href={route('admin.users.index')}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6"
                            >
                                Batal & Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {isEditing ? 'Simpan Hak Akses' : 'Buat Role Sistem'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
