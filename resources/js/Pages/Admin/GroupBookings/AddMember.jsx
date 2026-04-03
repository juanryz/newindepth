import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, User, Mail, Lock, Eye, EyeOff, Users,
    Info, CheckCircle,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function AddMember({ group }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword]            = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.group-bookings.members.store', group.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.group-bookings.show', group.id)}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight">
                            Tambah Anggota
                        </h2>
                        <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">
                            Grup: {group.group_name}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Anggota Grup" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-lg mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Info Banner */}
                    <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4">
                        <Info className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-indigo-700 dark:text-indigo-400 font-medium leading-relaxed">
                            <p className="font-black text-indigo-900 dark:text-indigo-200 uppercase tracking-wide mb-1">Alur Pendaftaran Anggota</p>
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>Isi nama & email anggota → akun dibuat otomatis</li>
                                <li>Admin klik <strong>"Lengkapi Profil"</strong> untuk mengisi data kesehatan (8 step)</li>
                                <li>Jadwal sesi diatur di level grup melalui halaman detail grup</li>
                            </ol>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit}>
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Data Dasar Anggota</h3>
                                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Informasi utama untuk membuat akun</p>
                                </div>
                            </div>

                            {/* Nama */}
                            <div className="space-y-2">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Nama Lengkap <span className="text-rose-500">*</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        type="text"
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Sesuai KTP / Dokumen Resmi"
                                        required
                                        autoFocus
                                    />
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Alamat Email <span className="text-rose-500">*</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        type="email"
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@aktif.com"
                                        required
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Password Sementara <span className="text-rose-500">*</span>
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Konfirmasi Password */}
                            <div className="space-y-2">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                    Konfirmasi Password
                                </InputLabel>
                                <div className="relative">
                                    <TextInput
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        autoComplete="new-password"
                                    />
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <button type="button" onClick={() => setShowPasswordConfirm(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                                        {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Info kelengkapan */}
                        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/30 text-xs text-amber-700 dark:text-amber-400 font-medium flex items-start gap-3 mt-4">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                            Setelah ditambahkan, lengkapi profil kesehatan anggota melalui tombol <strong>"Lengkapi Profil"</strong> di tabel anggota.
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 mt-4">
                            <Link
                                href={route('admin.group-bookings.show', group.id)}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Users className="w-4 h-4" />
                                Tambahkan ke Grup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
