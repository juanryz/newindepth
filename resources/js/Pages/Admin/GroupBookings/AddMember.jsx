import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Save, User, Mail, Phone, Lock, Shield, AlertCircle,
    Contact, Eye, EyeOff, ClipboardList, Wifi, WifiOff, AlertTriangle,
    CheckSquare, Camera, FileImage, Calendar, Package as PackageIcon,
    CreditCard, Upload, CheckCircle, Clock, Banknote, Trash2, Users,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

// ─── Reusable Section Card ────────────────────────────────────────────────────
function Section({ icon: Icon, iconBg, iconColor, title, children }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800 transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 ${iconBg} ${iconColor} rounded-2xl`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">{title}</h3>
            </div>
            {children}
        </div>
    );
}

// ─── File Upload Preview ──────────────────────────────────────────────────────
function FileUploadField({ label, hint, onChange, preview, onClear, error, accept = 'image/*' }) {
    const inputRef = useRef(null);
    return (
        <div className="space-y-2">
            {label && <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>}
            {preview ? (
                <div className="relative group rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
                    <img src={preview} alt="preview" className="w-full max-h-52 object-cover" />
                    <button type="button" onClick={onClear} className="absolute top-2 right-2 p-2 bg-rose-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button type="button" onClick={() => inputRef.current?.click()} className="w-full flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all">
                    <Upload className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Klik untuk Unggah</span>
                    {hint && <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">{hint}</span>}
                </button>
            )}
            <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
            <InputError message={error} className="mt-2" />
        </div>
    );
}

function scheduleLabel(s) {
    const ymd = (s.date ?? '').slice(0, 10);
    const dateStr = ymd ? new Date(ymd + 'T12:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    const avail = s.quota - (s.confirmed_count ?? 0);
    return `${dateStr} · ${s.start_time?.slice(0, 5)}–${s.end_time?.slice(0, 5)} · ${s.therapist?.name ?? '—'} (${avail} slot)`;
}

export default function AddMember({ group, roles, severityOptions, packageOptions, genderOptions, schedules, bookingPackages }) {
    const { data, setData, post, processing, errors } = useForm({
        disclaimer_confirmed: false,
        name: '', email: '', phone: '', age: '', gender: '',
        ktp_photo: null,
        emergency_contact_name: '', emergency_contact_phone: '', emergency_contact_relation: '',
        screening_type: 'online',
        severity_label: '', recommended_package: '', admin_notes: '', is_high_risk: false,
        agreement_signed_offline: false,
        schedule_id: '', package_type: '', booking_notes: '',
        password: '', password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [ktpPreview, setKtpPreview] = useState(null);

    const handleFile = (field, previewSetter) => (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData(field, file);
        previewSetter(URL.createObjectURL(file));
    };
    const clearFile = (field, previewSetter) => { setData(field, null); previewSetter(null); };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.group-bookings.members.store', group.id));
    };

    const hasSchedule = !!data.schedule_id;

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
                            Tambah Anggota Grup
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
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8">

                        {/* Mode Banner (Grup = selalu offline) */}
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-[2rem] p-5 border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-4">
                            <span className="text-2xl">🏥</span>
                            <div>
                                <p className="font-black text-emerald-900 dark:text-emerald-200 text-sm uppercase tracking-wide">Sesi Offline</p>
                                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Semua anggota grup mendapatkan sesi tatap muka di klinik. Invoice dikelola di level grup.</p>
                            </div>
                        </div>

                        {/* DISCLAIMER */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-[2.5rem] p-8 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-amber-800 dark:text-amber-300 uppercase tracking-[0.2em] mb-2">Pernyataan & Disclaimer</h3>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">Pastikan data anggota yang diinput adalah data asli dan telah mendapat persetujuan.</p>
                                </div>
                            </div>
                            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.disclaimer_confirmed ? 'bg-amber-500 border-amber-500 text-white shadow-lg' : 'bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800 hover:border-amber-400'}`}>
                                <input type="checkbox" className="hidden" checked={data.disclaimer_confirmed} onChange={(e) => setData('disclaimer_confirmed', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${data.disclaimer_confirmed ? 'border-white bg-white' : 'border-amber-300 dark:border-amber-600'}`}>
                                    {data.disclaimer_confirmed && <CheckSquare className="w-3.5 h-3.5 text-amber-500" />}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${data.disclaimer_confirmed ? 'text-white' : 'text-amber-700 dark:text-amber-400'}`}>
                                    Data anggota ini adalah data asli dan telah mendapat persetujuan
                                </span>
                            </label>
                            <InputError message={errors.disclaimer_confirmed} className="mt-3" />
                        </div>

                        {/* INFORMASI PRIBADI */}
                        <Section icon={User} iconBg="bg-indigo-50 dark:bg-indigo-900/40" iconColor="text-indigo-600 dark:text-indigo-400" title="Informasi Pribadi Anggota">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'name', label: 'Nama Lengkap *', placeholder: 'Sesuai KTP/SIM', icon: User, required: true },
                                    { id: 'email', label: 'Alamat Email *', placeholder: 'email@aktif.com', icon: Mail, type: 'email', required: true },
                                    { id: 'phone', label: 'Nomor Telepon / WhatsApp', placeholder: '081234567890', icon: Phone },
                                ].map(({ id, label, placeholder, icon: Icon, type = 'text', required }) => (
                                    <div key={id} className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                        <div className="relative">
                                            <TextInput type={type} className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data[id]} onChange={(e) => setData(id, e.target.value)} placeholder={placeholder} required={required} />
                                            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <InputError message={errors[id]} className="mt-2" />
                                    </div>
                                ))}
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Usia</InputLabel>
                                    <TextInput type="number" min="1" max="120" className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.age} onChange={(e) => setData('age', e.target.value)} placeholder="Tahun" />
                                    <InputError message={errors.age} className="mt-2" />
                                </div>
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
                                </div>
                            </div>
                        </Section>

                        {/* FOTO KTP */}
                        <Section icon={Camera} iconBg="bg-sky-50 dark:bg-sky-900/40" iconColor="text-sky-600 dark:text-sky-400" title="Foto KTP (Opsional)">
                            <FileUploadField hint="JPG / PNG · Maks 5 MB" preview={ktpPreview} onChange={handleFile('ktp_photo', setKtpPreview)} onClear={() => clearFile('ktp_photo', setKtpPreview)} error={errors.ktp_photo} />
                        </Section>

                        {/* KONTAK DARURAT */}
                        <Section icon={AlertCircle} iconBg="bg-rose-50 dark:bg-rose-900/40" iconColor="text-rose-600 dark:text-rose-400" title="Kontak Darurat (Opsional)">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Kontak</InputLabel>
                                    <div className="relative"><TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} /><Contact className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /></div>
                                </div>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon</InputLabel>
                                    <div className="relative"><TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} /><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /></div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hubungan</InputLabel>
                                    <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_relation} onChange={(e) => setData('emergency_contact_relation', e.target.value)} placeholder="Orang Tua, Saudara, dll" />
                                </div>
                            </div>
                        </Section>

                        {/* SKRINING */}
                        <Section icon={ClipboardList} iconBg="bg-teal-50 dark:bg-teal-900/40" iconColor="text-teal-600 dark:text-teal-400" title="Skrining (Screening)">
                            <div className="mb-6">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Metode Skrining</InputLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: 'online', Icon: Wifi, color: 'teal', label: 'Skrining Online', desc: 'Pasien mengisi sendiri setelah login.' },
                                        { value: 'manual', Icon: WifiOff, color: 'violet', label: 'Skrining Manual', desc: 'Admin menginput hasil diagnosa langsung.' },
                                    ].map(({ value, Icon, color, label, desc }) => (
                                        <label key={value} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.screening_type === value ? `bg-${color}-600 border-${color}-600 text-white shadow-lg` : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}>
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
                            {data.screening_type === 'manual' && (
                                <div className="space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tingkat Keparahan *</InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.severity_label} onChange={(e) => setData('severity_label', e.target.value)}>
                                                <option value="">-- Pilih Tingkat --</option>
                                                {severityOptions.map((label) => <option key={label} value={label}>{label}</option>)}
                                            </select>
                                            <InputError message={errors.severity_label} className="mt-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rekomendasi Paket *</InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.recommended_package} onChange={(e) => setData('recommended_package', e.target.value)}>
                                                <option value="">-- Pilih Paket --</option>
                                                {packageOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                            </select>
                                            <InputError message={errors.recommended_package} className="mt-2" />
                                        </div>
                                    </div>
                                    <textarea rows={3} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none" placeholder="Catatan diagnosa..." value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} />
                                </div>
                            )}
                        </Section>

                        {/* PERJANJIAN */}
                        <Section icon={FileImage} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Perjanjian (Opsional)">
                            <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300'}`}>
                                <input type="checkbox" className="hidden" checked={data.agreement_signed_offline} onChange={(e) => setData('agreement_signed_offline', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {data.agreement_signed_offline && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>Perjanjian Sudah Ditandatangani Offline</p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? 'text-white/80' : 'text-gray-400'}`}>Anggota telah membaca dan menyetujui S&K layanan secara fisik</p>
                                </div>
                            </label>
                        </Section>

                        {/* JADWAL & PAKET */}
                        <Section icon={Calendar} iconBg="bg-blue-50 dark:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" title="Jadwal & Paket Sesi (Opsional)">
                            <div className="space-y-6">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Isi jika anggota sudah memilih jadwal. Kosongkan jika belum.</p>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Jadwal</InputLabel>
                                    {schedules.length === 0 ? (
                                        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 font-medium">Tidak ada jadwal tersedia</div>
                                    ) : (
                                        <select className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.schedule_id} onChange={(e) => { setData('schedule_id', e.target.value); if (!e.target.value) setData('package_type', ''); }}>
                                            <option value="">-- Tidak Ada / Pilih Nanti --</option>
                                            {schedules.map((s) => <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>)}
                                        </select>
                                    )}
                                    <InputError message={errors.schedule_id} className="mt-2" />
                                </div>
                                {hasSchedule && (
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Paket *</InputLabel>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {bookingPackages.map((pkg) => (
                                                <label key={pkg.slug} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.package_type === pkg.slug ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300'}`}>
                                                    <input type="radio" className="hidden" name="package_type" value={pkg.slug} checked={data.package_type === pkg.slug} onChange={() => setData('package_type', pkg.slug)} />
                                                    <PackageIcon className={`w-4 h-4 flex-shrink-0 ${data.package_type === pkg.slug ? 'text-white' : 'text-blue-400'}`} />
                                                    <div className="min-w-0">
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

                        {/* AKUN */}
                        <Section icon={Shield} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Akun & Keamanan">
                            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed mb-6">
                                Buatkan password sementara dan informasikan ke anggota.
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'password', label: 'Password Sementara *', show: showPassword, toggle: () => setShowPassword(v => !v) },
                                    { id: 'password_confirmation', label: 'Konfirmasi Password', show: showPasswordConfirm, toggle: () => setShowPasswordConfirm(v => !v) },
                                ].map(({ id, label, show, toggle }) => (
                                    <div key={id} className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                        <div className="relative">
                                            <TextInput type={show ? 'text' : 'password'} className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data[id]} onChange={(e) => setData(id, e.target.value)} autoComplete="new-password" required={id === 'password'} />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none">
                                                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {id === 'password' && <InputError message={errors.password} className="mt-2" />}
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* SUBMIT */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={route('admin.group-bookings.show', group.id)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">
                                Batal & Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing || !data.disclaimer_confirmed}
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
