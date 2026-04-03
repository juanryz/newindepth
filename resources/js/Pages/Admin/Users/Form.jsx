import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Save, User, Mail, Phone, Lock, Shield, AlertCircle,
    Contact, Eye, EyeOff, ClipboardList, Wifi, WifiOff, AlertTriangle,
    CheckSquare, Camera, FileImage, Calendar, Package as PackageIcon,
    CheckCircle, Clock, Trash2, Upload,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

// ─── Reusable Section Card ────────────────────────────────────────────────────
function Section({ icon: Icon, iconBg, iconColor, title, subtitle, children }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 ${iconBg} ${iconColor} rounded-2xl`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">{title}</h3>
                    {subtitle && <p className="text-[10px] text-gray-400 font-medium mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

// ─── File Upload Preview ──────────────────────────────────────────────────────
function FileUploadField({ label, hint, onChange, preview, onClear, error, existingUrl }) {
    const inputRef = useRef(null);
    const hasImage = preview || existingUrl;
    return (
        <div className="space-y-2">
            {label && <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>}
            {hasImage ? (
                <div className="relative group rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
                    <img src={preview || existingUrl} alt="preview" className="w-full max-h-52 object-cover" />
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute top-2 right-2 p-2 bg-rose-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all"
                >
                    <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Klik untuk Unggah</span>
                    {hint && <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">{hint}</span>}
                </button>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
            <InputError message={error} className="mt-2" />
        </div>
    );
}

// ─── schedule label helper ────────────────────────────────────────────────────
function scheduleLabel(s) {
    const ymd = (s.date ?? '').slice(0, 10);
    const dateStr = ymd
        ? new Date(ymd + 'T12:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
        : '—';
    const avail = (s.quota ?? 0) - (s.confirmed_count ?? 0);
    return `${dateStr} · ${s.start_time?.slice(0, 5) ?? ''}–${s.end_time?.slice(0, 5) ?? ''} · ${s.therapist?.name ?? '—'} (${avail} slot)`;
}

// ─── Step indicator ───────────────────────────────────────────────────────────
const STEPS = [
    { num: 1, label: 'Identitas' },
    { num: 2, label: 'KTP' },
    { num: 3, label: 'Kontak Darurat' },
    { num: 4, label: 'Skrining' },
    { num: 5, label: 'Perjanjian' },
    { num: 6, label: 'Jadwal' },
    { num: 7, label: 'Akun & Akses' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UsersForm({
    userModel,
    roles,
    userRoles,
    severityOptions = [],
    packageOptions = [],
    genderOptions = [],
    schedules = [],
    bookingPackages = [],
    screeningResult = null,
}) {
    const isEditing = !!userModel?.id;
    const { flash } = usePage().props;

    const { data, setData, post, put, processing, errors } = useForm({
        // Identitas
        name:   userModel?.name   ?? '',
        email:  userModel?.email  ?? '',
        phone:  userModel?.phone  ?? '',
        age:    userModel?.age    ?? '',
        gender: userModel?.gender ?? '',
        // KTP
        ktp_photo: null,
        // Kontak darurat
        emergency_contact_name:     userModel?.emergency_contact_name     ?? '',
        emergency_contact_phone:    userModel?.emergency_contact_phone    ?? '',
        emergency_contact_relation: userModel?.emergency_contact_relation ?? '',
        // Skrining
        screening_type:      screeningResult ? 'manual' : 'online',
        severity_label:      screeningResult?.severity_label      ?? '',
        recommended_package: screeningResult?.recommended_package ?? '',
        admin_notes:         screeningResult?.admin_notes         ?? '',
        is_high_risk:        screeningResult?.is_high_risk        ?? false,
        // Perjanjian
        agreement_signed_offline: userModel?.agreement_signed ?? false,
        // Jadwal - edit tidak assign jadwal baru lewat sini (lihat booking)
        schedule_id:   '',
        package_type:  '',
        booking_notes: '',
        // Akun & Password
        password:              '',
        password_confirmation: '',
        roles: userRoles ?? [],
    });

    const [showPw, setShowPw]         = useState(false);
    const [showPwC, setShowPwC]       = useState(false);
    const [ktpPreview, setKtpPreview] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData('ktp_photo', file);
        setKtpPreview(URL.createObjectURL(file));
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setData('roles', checked ? [...data.roles, value] : data.roles.filter(r => r !== value));
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            post(route('admin.users.update', userModel.id), { forceFormData: true, _method: 'PUT' });
        } else {
            post(route('admin.users.store'));
        }
    };

    const hasSchedule = !!data.schedule_id;
    const ktpUrl = userModel?.ktp_photo_url ?? null;

    // Back link — if came from group booking, go back there
    const backHref = isEditing ? route('admin.users.show', userModel.id) : route('admin.users.index');

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={backHref}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight">
                            {isEditing ? 'Lengkapi / Edit Profil Pasien' : 'Tambah Pengguna Baru'}
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            {isEditing ? `Mengelola: ${userModel.name}` : 'Daftarkan pengguna baru ke sistem'}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={isEditing ? `Edit: ${userModel?.name}` : 'Tambah User'} />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    {/* Flash success */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />{flash.success}
                        </div>
                    )}

                    {/* Step progress bar */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8 overflow-x-auto">
                        <div className="flex items-center gap-1 min-w-max">
                            {STEPS.map((step, i) => (
                                <React.Fragment key={step.num}>
                                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-black">
                                            {step.num}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 text-center">{step.label}</span>
                                    </div>
                                    {i < STEPS.length - 1 && <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800 min-w-[16px]" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data" className="space-y-8">

                        {/* ── STEP 1: Identitas ──────────────────────────── */}
                        <Section icon={User} iconBg="bg-indigo-50 dark:bg-indigo-900/40" iconColor="text-indigo-600 dark:text-indigo-400" title="Identitas Pasien" subtitle="Step 1 — Data diri utama">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'name',  label: 'Nama Lengkap *',            placeholder: 'Sesuai KTP/SIM', icon: User,  type: 'text',  required: true },
                                    { id: 'email', label: 'Alamat Email *',             placeholder: 'email@aktif.com', icon: Mail, type: 'email', required: true },
                                    { id: 'phone', label: 'Nomor Telepon / WhatsApp',  placeholder: '081234567890',   icon: Phone, type: 'text' },
                                ].map(({ id, label, placeholder, icon: Icon, type, required }) => (
                                    <div key={id} className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                        <div className="relative">
                                            <TextInput
                                                type={type}
                                                className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                value={data[id]}
                                                onChange={(e) => setData(id, e.target.value)}
                                                placeholder={placeholder}
                                                required={required}
                                            />
                                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors[id]} className="mt-2" />
                                    </div>
                                ))}

                                {/* Usia */}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Usia</InputLabel>
                                    <TextInput
                                        type="number" min="1" max="120"
                                        className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        placeholder="Tahun"
                                    />
                                    <InputError message={errors.age} className="mt-2" />
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Jenis Kelamin</InputLabel>
                                    <div className="flex gap-3 flex-wrap">
                                        {genderOptions.map((opt) => (
                                            <label key={opt.value} className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 cursor-pointer transition-all text-[10px] font-black uppercase tracking-widest ${data.gender === opt.value ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-300'}`}>
                                                <input type="radio" className="hidden" name="gender" value={opt.value} checked={data.gender === opt.value} onChange={() => setData('gender', opt.value)} />
                                                {opt.label}
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>
                            </div>
                        </Section>

                        {/* ── STEP 2: Foto KTP ───────────────────────────── */}
                        <Section icon={Camera} iconBg="bg-sky-50 dark:bg-sky-900/40" iconColor="text-sky-600 dark:text-sky-400" title="Foto KTP / Identitas" subtitle="Step 2 — Dokumen resmi (opsional)">
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4">
                                Unggah foto KTP atau identitas resmi pasien. Format JPG/PNG, maks. 5 MB.
                                {isEditing && ktpUrl && ' (Foto KTP sudah ada — unggah ulang untuk mengganti)'}
                            </p>
                            <FileUploadField
                                hint="JPG / PNG · Maks 5 MB"
                                preview={ktpPreview}
                                existingUrl={ktpUrl}
                                onChange={handleFile}
                                onClear={() => { setData('ktp_photo', null); setKtpPreview(null); }}
                                error={errors.ktp_photo}
                            />
                        </Section>

                        {/* ── STEP 3: Kontak Darurat ─────────────────────── */}
                        <Section icon={AlertCircle} iconBg="bg-rose-50 dark:bg-rose-900/40" iconColor="text-rose-600 dark:text-rose-400" title="Kontak Darurat" subtitle="Step 3 — Opsional">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Kontak</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} placeholder="Nama orang terdekat" />
                                        <Contact className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} placeholder="081234567890" />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hubungan</InputLabel>
                                    <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_relation} onChange={(e) => setData('emergency_contact_relation', e.target.value)} placeholder="Contoh: Orang Tua, Saudara, Pasangan" />
                                </div>
                            </div>
                        </Section>

                        {/* ── STEP 4: Skrining ─────────────────────────────── */}
                        <Section icon={ClipboardList} iconBg="bg-teal-50 dark:bg-teal-900/40" iconColor="text-teal-600 dark:text-teal-400" title="Skrining (Screening)" subtitle="Step 4 — Hasil asesmen kesehatan mental">
                            <div className="mb-6">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Metode Skrining</InputLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: 'online', Icon: Wifi,    color: 'teal',   label: 'Skrining Online',  desc: 'Pasien mengisi sendiri setelah login.' },
                                        { value: 'manual', Icon: WifiOff, color: 'violet', label: 'Skrining Manual',  desc: 'Admin input hasil diagnosa langsung.' },
                                    ].map(({ value, Icon, color, label, desc }) => (
                                        <label key={value} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20` : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}>
                                            <input type="radio" className="hidden" name="screening_type" value={value} checked={data.screening_type === value} onChange={() => setData('screening_type', value)} />
                                            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${data.screening_type === value ? 'text-white' : `text-${color}-500`}`} />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
                                                <p className={`text-[10px] font-medium leading-relaxed ${data.screening_type === value ? 'text-white/80' : 'text-gray-400'}`}>{desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {data.screening_type === 'online' && (
                                <div className="p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-100 dark:border-teal-900/50 flex items-start gap-3">
                                    <Wifi className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-teal-700 dark:text-teal-400 font-medium leading-relaxed">
                                        Pasien perlu menyelesaikan skrining online melalui akunnya setelah login pertama kali.
                                    </p>
                                </div>
                            )}

                            {data.screening_type === 'manual' && (
                                <div className="space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tingkat Keparahan <span className="text-rose-500">*</span></InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.severity_label} onChange={(e) => setData('severity_label', e.target.value)}>
                                                <option value="">-- Pilih Tingkat --</option>
                                                {severityOptions.map((label) => <option key={label} value={label}>{label}</option>)}
                                            </select>
                                            <InputError message={errors.severity_label} className="mt-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rekomendasi Paket <span className="text-rose-500">*</span></InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.recommended_package} onChange={(e) => setData('recommended_package', e.target.value)}>
                                                <option value="">-- Pilih Paket --</option>
                                                {packageOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </select>
                                            <InputError message={errors.recommended_package} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catatan Diagnosa / Komentar Admin</InputLabel>
                                        <textarea rows={4} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none" placeholder="Tuliskan hasil skrining atau catatan diagnosa..." value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} />
                                        <InputError message={errors.admin_notes} className="mt-2" />
                                    </div>
                                    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.is_high_risk ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300'}`}>
                                        <input type="checkbox" className="hidden" checked={data.is_high_risk} onChange={(e) => setData('is_high_risk', e.target.checked)} />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.is_high_risk ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {data.is_high_risk && <div className="w-3 h-3 rounded-sm bg-rose-600" />}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>Pasien Berisiko Tinggi</p>
                                            <p className={`text-[10px] font-medium mt-0.5 ${data.is_high_risk ? 'text-white/80' : 'text-gray-400'}`}>Tandai jika memerlukan penanganan prioritas</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </Section>

                        {/* ── STEP 5: Perjanjian ─────────────────────────── */}
                        <Section icon={FileImage} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Perjanjian & Persetujuan" subtitle="Step 5 — Tandatangan S&K">
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4">
                                Jika pasien telah menandatangani perjanjian layanan secara fisik/offline, centang di bawah ini.
                            </p>
                            <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300'}`}>
                                <input type="checkbox" className="hidden" checked={data.agreement_signed_offline} onChange={(e) => setData('agreement_signed_offline', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {data.agreement_signed_offline && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>Perjanjian Sudah Ditandatangani Offline</p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? 'text-white/80' : 'text-gray-400'}`}>Pasien telah membaca dan menyetujui S&K layanan secara fisik</p>
                                </div>
                            </label>
                        </Section>

                        {/* ── STEP 6: Jadwal & Paket (hanya untuk CREATE baru atau edit tanpa booking) ── */}
                        {!isEditing && (
                            <Section icon={Calendar} iconBg="bg-blue-50 dark:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" title="Jadwal & Paket Sesi" subtitle="Step 6 — Opsional, bisa diatur nanti">
                                <div className="space-y-6">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                        Isi bagian ini jika pasien sudah memilih jadwal dan paket. Kosongkan jika belum.
                                    </p>
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Jadwal</InputLabel>
                                        {schedules.length === 0 ? (
                                            <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 font-medium">Tidak ada jadwal tersedia saat ini</div>
                                        ) : (
                                            <select className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.schedule_id} onChange={(e) => setData('schedule_id', e.target.value)}>
                                                <option value="">-- Tidak Ada / Pilih Nanti --</option>
                                                {schedules.map((s) => <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>)}
                                            </select>
                                        )}
                                        <InputError message={errors.schedule_id} className="mt-2" />
                                    </div>
                                    {hasSchedule && (
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Paket <span className="text-rose-500">*</span></InputLabel>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {bookingPackages.map((pkg) => (
                                                    <label key={pkg.slug} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.package_type === pkg.slug ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300'}`}>
                                                        <input type="radio" className="hidden" name="package_type" value={pkg.slug} checked={data.package_type === pkg.slug} onChange={() => setData('package_type', pkg.slug)} />
                                                        <PackageIcon className={`w-4 h-4 flex-shrink-0 ${data.package_type === pkg.slug ? 'text-white' : 'text-blue-400'}`} />
                                                        <div>
                                                            <p className={`text-[10px] font-black uppercase tracking-widest ${data.package_type === pkg.slug ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{pkg.name}</p>
                                                            <p className={`text-[10px] font-medium mt-0.5 ${data.package_type === pkg.slug ? 'text-white/80' : 'text-gray-400'}`}>Rp {pkg.price.toLocaleString('id-ID')}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            <InputError message={errors.package_type} className="mt-2" />
                                        </div>
                                    )}
                                </div>
                            </Section>
                        )}

                        {/* ── STEP 7: Akun & Akses ────────────────────────── */}
                        <Section icon={Shield} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Akun & Akses" subtitle="Step 7 — Keamanan dan role">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Password */}
                                <div className="space-y-6">
                                    {[
                                        { id: 'password', label: isEditing ? 'Ubah Password (kosongkan jika tidak diubah)' : 'Password *', show: showPw, setShow: setShowPw },
                                        { id: 'password_confirmation', label: 'Konfirmasi Password', show: showPwC, setShow: setShowPwC },
                                    ].map(({ id, label, show, setShow }) => (
                                        <div key={id} className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                            <div className="relative">
                                                <TextInput
                                                    type={show ? 'text' : 'password'}
                                                    className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                    value={data[id]}
                                                    onChange={(e) => setData(id, e.target.value)}
                                                    autoComplete="new-password"
                                                    required={!isEditing && id === 'password'}
                                                />
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <button type="button" onClick={() => setShow(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none">
                                                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            <InputError message={errors[id]} className="mt-2" />
                                        </div>
                                    ))}
                                </div>

                                {/* Roles */}
                                <div className="space-y-4">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hak Akses (Roles)</InputLabel>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 space-y-3">
                                        {roles.map((role) => (
                                            <label key={role.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.roles.includes(role.name) ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 hover:border-indigo-200'}`}>
                                                <input type="checkbox" className="hidden" value={role.name} checked={data.roles.includes(role.name)} onChange={handleRoleChange} />
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.roles.includes(role.name) ? 'border-white bg-white' : 'border-gray-300'}`}>
                                                    {data.roles.includes(role.name) && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{role.name.replace(/_/g, ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <InputError message={errors.roles} className="mt-2" />
                                </div>
                            </div>
                        </Section>

                        {/* ── Submit ─────────────────────────────────────── */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={backHref} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">
                                Batal &amp; Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {isEditing ? 'Simpan Perubahan' : 'Daftarkan Pengguna'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
