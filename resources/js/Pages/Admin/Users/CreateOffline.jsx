import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    User,
    Mail,
    Phone,
    Lock,
    Shield,
    AlertCircle,
    Contact,
    Eye,
    EyeOff,
    ClipboardList,
    Wifi,
    WifiOff,
    AlertTriangle,
    CheckSquare,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function CreateOffline({ roles, severityOptions, packageOptions, genderOptions }) {
    const { data, setData, post, processing, errors } = useForm({
        disclaimer_confirmed: false,
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relation: '',
        password: '',
        password_confirmation: '',
        roles: [],
        screening_type: 'online',
        severity_label: '',
        recommended_package: '',
        admin_notes: '',
        is_high_risk: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setData('roles', [...data.roles, value]);
        } else {
            setData('roles', data.roles.filter((r) => r !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store-offline'));
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
                            Tambah User Offline
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            Pendaftaran Pasien yang Datang Langsung (Walk-in)
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tambah User Offline" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8">

                        {/* DISCLAIMER CARD */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-[2.5rem] p-8 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-amber-800 dark:text-amber-300 uppercase tracking-[0.2em] mb-2">
                                        Pernyataan & Disclaimer Penting
                                    </h3>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                        Fitur ini digunakan untuk mendaftarkan pasien yang datang secara langsung (walk-in/offline).
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-900/50 rounded-[1.5rem] p-6 border border-amber-100 dark:border-amber-800/50 space-y-3 mb-6">
                                <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight mb-3">
                                    Admin wajib memastikan:
                                </p>
                                {[
                                    'Data yang dimasukkan adalah data asli pasien — bukan data fiktif, palsu, atau percobaan.',
                                    'Nama, email, dan nomor telepon sesuai identitas resmi pasien (KTP/SIM).',
                                    'Pasien telah memberikan persetujuan atas pendaftaran dan penggunaan datanya.',
                                    'Password yang dibuat harus diberitahukan kepada pasien dan segera diubah saat pertama login.',
                                    'Admin bertanggung jawab penuh atas kebenaran data yang diinput.',
                                ].map((point, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[9px] font-black">{i + 1}</span>
                                        </div>
                                        <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{point}</p>
                                    </div>
                                ))}
                            </div>

                            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                data.disclaimer_confirmed
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                                    : 'bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800 hover:border-amber-400'
                            }`}>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={data.disclaimer_confirmed}
                                    onChange={(e) => setData('disclaimer_confirmed', e.target.checked)}
                                />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    data.disclaimer_confirmed
                                        ? 'border-white bg-white'
                                        : 'border-amber-300 dark:border-amber-600'
                                }`}>
                                    {data.disclaimer_confirmed && (
                                        <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                                    )}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${
                                    data.disclaimer_confirmed ? 'text-white' : 'text-amber-700 dark:text-amber-400'
                                }`}>
                                    Saya menyatakan bahwa data yang akan dimasukkan adalah data pasien asli dan telah mendapat persetujuannya
                                </span>
                            </label>
                            <InputError message={errors.disclaimer_confirmed} className="mt-3" />
                        </div>

                        {/* PERSONAL INFORMATION CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Informasi Pribadi Pasien</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Lengkap <span className="text-rose-500">*</span></InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Sesuai KTP/SIM"
                                            required
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Email <span className="text-rose-500">*</span></InputLabel>
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

                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon / WhatsApp</InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Contoh: 081234567890"
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>

                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Usia</InputLabel>
                                    <TextInput
                                        type="number"
                                        min="1"
                                        max="120"
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        placeholder="Tahun"
                                    />
                                    <InputError message={errors.age} className="mt-2" />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Jenis Kelamin</InputLabel>
                                    <div className="flex gap-3 flex-wrap">
                                        {genderOptions.map((opt) => (
                                            <label
                                                key={opt.value}
                                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 cursor-pointer transition-all text-[10px] font-black uppercase tracking-widest ${
                                                    data.gender === opt.value
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                        : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-300'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    className="hidden"
                                                    name="gender"
                                                    value={opt.value}
                                                    checked={data.gender === opt.value}
                                                    onChange={() => setData('gender', opt.value)}
                                                />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* EMERGENCY CONTACT CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Kontak Darurat (Opsional)</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Kontak</InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.emergency_contact_name}
                                            onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                        />
                                        <Contact className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon</InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.emergency_contact_phone}
                                            onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                                        />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hubungan</InputLabel>
                                    <TextInput
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.emergency_contact_relation}
                                        onChange={(e) => setData('emergency_contact_relation', e.target.value)}
                                        placeholder="Contoh: Orang Tua, Saudara Kandung, Teman"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SCREENING CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl">
                                    <ClipboardList className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Skrining (Screening)</h3>
                            </div>

                            {/* Screening type toggle */}
                            <div className="mb-6">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Metode Skrining</InputLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                        data.screening_type === 'online'
                                            ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-600/20'
                                            : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-teal-300'
                                    }`}>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            name="screening_type"
                                            value="online"
                                            checked={data.screening_type === 'online'}
                                            onChange={() => setData('screening_type', 'online')}
                                        />
                                        <Wifi className={`w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === 'online' ? 'text-white' : 'text-teal-500'}`} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Skrining Online</p>
                                            <p className={`text-[10px] font-medium leading-relaxed ${data.screening_type === 'online' ? 'text-white/80' : 'text-gray-400'}`}>
                                                Pasien akan mengisi skrining sendiri setelah login ke akunnya.
                                            </p>
                                        </div>
                                    </label>

                                    <label className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                        data.screening_type === 'manual'
                                            ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/20'
                                            : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-300'
                                    }`}>
                                        <input
                                            type="radio"
                                            className="hidden"
                                            name="screening_type"
                                            value="manual"
                                            checked={data.screening_type === 'manual'}
                                            onChange={() => setData('screening_type', 'manual')}
                                        />
                                        <WifiOff className={`w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === 'manual' ? 'text-white' : 'text-violet-500'}`} />
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Skrining Manual</p>
                                            <p className={`text-[10px] font-medium leading-relaxed ${data.screening_type === 'manual' ? 'text-white/80' : 'text-gray-400'}`}>
                                                Skrining sudah dilakukan secara langsung. Admin menginput hasil diagnosa.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Online screening notice */}
                            {data.screening_type === 'online' && (
                                <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-100 dark:border-teal-900/50 flex items-start gap-3">
                                    <Wifi className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-teal-700 dark:text-teal-400 font-medium leading-relaxed">
                                        Pasien perlu menyelesaikan skrining online melalui akunnya setelah login pertama kali.
                                        Pastikan pasien mengetahui hal ini sebelum meninggalkan klinik.
                                    </p>
                                </div>
                            )}

                            {/* Manual screening fields */}
                            {data.screening_type === 'manual' && (
                                <div className="space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                                Tingkat Keparahan <span className="text-rose-500">*</span>
                                            </InputLabel>
                                            <select
                                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                value={data.severity_label}
                                                onChange={(e) => setData('severity_label', e.target.value)}
                                            >
                                                <option value="">-- Pilih Tingkat --</option>
                                                {severityOptions.map((label) => (
                                                    <option key={label} value={label}>{label}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.severity_label} className="mt-2" />
                                        </div>

                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                                Rekomendasi Paket <span className="text-rose-500">*</span>
                                            </InputLabel>
                                            <select
                                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                value={data.recommended_package}
                                                onChange={(e) => setData('recommended_package', e.target.value)}
                                            >
                                                <option value="">-- Pilih Paket --</option>
                                                {packageOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.recommended_package} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            Catatan Diagnosa / Komentar Admin
                                        </InputLabel>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none"
                                            placeholder="Tuliskan hasil skrining, temuan, atau catatan diagnosa yang diperoleh dari sesi tatap muka..."
                                            value={data.admin_notes}
                                            onChange={(e) => setData('admin_notes', e.target.value)}
                                        />
                                        <InputError message={errors.admin_notes} className="mt-2" />
                                    </div>

                                    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                        data.is_high_risk
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20'
                                            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300'
                                    }`}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={data.is_high_risk}
                                            onChange={(e) => setData('is_high_risk', e.target.checked)}
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                            data.is_high_risk ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'
                                        }`}>
                                            {data.is_high_risk && <div className="w-3 h-3 rounded-sm bg-rose-600" />}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                Pasien Berisiko Tinggi
                                            </p>
                                            <p className={`text-[10px] font-medium mt-0.5 ${data.is_high_risk ? 'text-white/80' : 'text-gray-400'}`}>
                                                Tandai jika pasien memerlukan penanganan prioritas atau pemantauan khusus
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* SECURITY & ROLES CARD */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Akun & Keamanan</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                        Buatkan password sementara dan informasikan kepada pasien. Pasien harus menggantinya saat pertama kali login.
                                    </div>

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
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Konfirmasi Password</InputLabel>
                                        <div className="relative">
                                            <TextInput
                                                type={showPasswordConfirm ? 'text' : 'password'}
                                                className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                autoComplete="new-password"
                                            />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none"
                                            >
                                                {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Hak Akses (Roles)</InputLabel>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 space-y-3">
                                        {roles.map((role) => (
                                            <label
                                                key={role.id}
                                                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.roles.includes(role.name)
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-200'
                                                }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    value={role.name}
                                                    checked={data.roles.includes(role.name)}
                                                    onChange={handleRoleChange}
                                                />
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                    data.roles.includes(role.name) ? 'border-white bg-white' : 'border-gray-300'
                                                }`}>
                                                    {data.roles.includes(role.name) && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{role.name.replace(/_/g, ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.roles} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link
                                href={route('admin.users.index')}
                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6"
                            >
                                Batal & Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing || !data.disclaimer_confirmed}
                                className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                Daftarkan Pasien Offline
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
