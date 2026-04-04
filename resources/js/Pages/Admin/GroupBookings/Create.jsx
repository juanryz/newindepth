import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import {
    ChevronLeft, Save, Users, Phone, Mail, MapPin, FileText, Lock, Eye, EyeOff,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function GroupBookingsCreate({ group }) {
    const isEditing = !!group;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        group_name:            group?.group_name            || '',
        email:                 group?.email                 || '',
        phone:                 group?.phone                 || '',
        address:               group?.address               || '',
        password:              '',
        password_confirmation: '',
        notes:                 group?.notes                 || '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.post(route('admin.group-bookings.update', group.id), {
                ...data,
                _method: 'PUT',
            });
        } else {
            post(route('admin.group-bookings.store'));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.users.index', { tab: 'groups' })}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                            {isEditing ? 'Edit Data Grup' : 'Buat Grup Baru'}
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            {isEditing ? 'Perbarui informasi dasar grup' : 'Isi data grup — jadwal diatur di halaman detail'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={isEditing ? 'Edit Grup' : 'Buat Grup Baru'} />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8">

                        {/* Info Banner */}
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4">
                            <Users className="w-8 h-8 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-black text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-wide">Panduan Grup Booking</p>
                                <ol className="text-xs text-indigo-700 dark:text-indigo-400 font-medium mt-2 leading-relaxed list-decimal ml-4 space-y-1">
                                    <li>Isi data grup (nama, email, nomor telepon, alamat) → Simpan</li>
                                    <li>Di halaman detail: tambah anggota satu per satu</li>
                                    <li>Pilih jadwal sesi grup</li>
                                    <li>Setiap anggota login &amp; bayar secara mandiri (8 langkah seperti pengguna individual)</li>
                                </ol>
                            </div>
                        </div>

                        {/* Data Grup */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Informasi Grup</h3>
                                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Data identitas dan kontak grup</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Nama Grup */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Grup *</InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            type="text"
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.group_name}
                                            onChange={(e) => setData('group_name', e.target.value)}
                                            placeholder="cth: Komunitas Sehat PKBI Jakarta"
                                            required
                                        />
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.group_name} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Grup * <span className="normal-case text-gray-400 font-normal">(digunakan untuk login)</span></InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            type="email"
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="grup@email.com"
                                            required
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Nomor Telepon */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon</InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            type="text"
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="081234567890"
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                {/* Alamat */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Lengkap</InputLabel>
                                    <div className="relative">
                                        <textarea
                                            rows={3}
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all resize-none"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Alamat lengkap grup/institusi..."
                                        />
                                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.address} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Password Login Grup */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-2xl">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">
                                        {isEditing ? 'Ubah Password (Opsional)' : 'Password Login Grup *'}
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                        {isEditing ? 'Kosongkan jika tidak ingin mengubah password' : 'Grup dapat login menggunakan email & password ini'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Password */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                        Password {!isEditing && '*'}
                                    </InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            required={!isEditing}
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Konfirmasi Password */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                        Konfirmasi Password {!isEditing && '*'}
                                    </InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            type={showConfirm ? 'text' : 'password'}
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Ulangi password"
                                            required={!isEditing}
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Catatan */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Catatan (Opsional)</h3>
                            </div>
                            <textarea
                                rows={4}
                                className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none"
                                placeholder="Catatan khusus untuk grup ini..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={route('admin.users.index', { tab: 'groups' })} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                {isEditing ? 'Simpan Perubahan' : 'Buat Grup & Lanjutkan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
