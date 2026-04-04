import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Save, User, Mail, Phone, Lock, Shield, AlertCircle,
    Contact, Eye, EyeOff, ClipboardList, Wifi, WifiOff, AlertTriangle,
    CheckSquare, Camera, FileImage, Upload, CheckCircle, Trash2, Users,
    Calendar, Package as PackageIcon, CreditCard, Banknote, Download, Clock, MapPin, X
} from 'lucide-react';
import { createPortal } from 'react-dom';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

// ─── Invoice Preview Modal (client-side, sebelum submit) ──────────────────────
function InvoicePreviewModal({ data, pkg, price, bankAccounts: bankAccountsProp = [], onClose }) {
    const printRef = useRef();
    const { clinicInfo } = usePage().props;
    const bankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccountsProp;
    const isOnline = data.session_type === 'online';
    const isCash   = ['Cash', 'Tunai'].includes(data.payment_method);
    const fmt = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

    const [isDownloading, setIsDownloading] = useState(false);

    const downloadPDF = () => {
        setIsDownloading(true);
        const element = printRef.current;
        
        const doDownload = () => {
            const opt = {
                margin: [10, 10, 10, 10],
                filename: `Draft_Invoice_${data.name || 'Anggota'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0, windowWidth: document.documentElement.offsetWidth },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            window.html2pdf().set(opt).from(element).save().then(() => {
                setIsDownloading(false);
            }).catch(err => {
                console.error("PDF generation failed:", err);
                setIsDownloading(false);
            });
        };

        if (window.html2pdf) {
            doDownload();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            document.body.appendChild(script);
            script.onload = doDownload;
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Preview Invoice</p>
                        <p className="text-lg font-black text-gray-900 dark:text-white">Draft — Belum Final</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={downloadPDF} disabled={isDownloading}
                            className={`flex items-center gap-2 px-5 py-2.5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 ${isDownloading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                            <Download className="w-4 h-4" /> {isDownloading ? 'Memproses PDF...' : 'Download PDF'}
                        </button>
                        <button onClick={onClose} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-rose-100 hover:text-rose-600 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div ref={printRef} className="p-8 space-y-6">
                    <div className="flex items-start justify-between pb-6 border-b-2 border-indigo-100">
                        <div>
                            <img src="/images/logo-color.png" alt="Logo" className="h-12 w-auto mb-2" />
                            <h1 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">
                                {clinicInfo?.name || 'InDepth Mental Wellness'}
                            </h1>
                            <p className="text-xs text-indigo-600/70 font-semibold mt-0.5">
                                Hipnoterapi & Kesehatan Mental Profesional
                            </p>
                            <div className="mt-2 space-y-0.5">
                                {clinicInfo?.address && (
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />{clinicInfo.address}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Invoice (Draft)</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Data Anggota</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {[
                                { label: 'Nama', value: data.name || '—' },
                                { label: 'Email', value: data.email || '—' },
                                { label: 'Telepon', value: data.phone || '—' },
                                { label: 'Tipe Sesi', value: isOnline ? '💻 Online' : '🏥 Offline' },
                            ].map(({ label, value }) => (
                                <div key={label} className="mb-2">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{label}</p>
                                    <p className="font-bold text-gray-900 dark:text-white">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Detail Layanan</p>
                        <div className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800 text-sm">
                            <span className="text-gray-500">{pkg?.name ?? data.package_type ?? '—'}</span>
                            <span className="font-black text-gray-900 dark:text-white">{fmt(price)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-indigo-600">
                            <span className="text-sm font-black uppercase tracking-wide text-indigo-600">Total</span>
                            <span className="text-2xl font-black text-indigo-600">{fmt(price)}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Informasi Pembayaran</p>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-500">Metode</span>
                            <span className="font-black text-gray-900 dark:text-white">{data.payment_method || '—'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Tutup</button>
                    <button onClick={downloadPDF}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                        <Download className="w-4 h-4" /> Download / Print Invoice
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

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

export default function AddMember({ 
    group, roles, genderOptions, severityOptions, packageOptions, 
    schedules = [], bookingPackages = [], paymentMethodsBySession = { online: ['Transfer Bank'], offline: ['Transfer Bank', 'Cash'] },
    bankAccounts = []
}) {
    const { clinicInfo } = usePage().props;
    const effectiveBankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccounts;

    const { data, setData, post, processing, errors } = useForm({
        disclaimer_confirmed: false,
        name: '', email: '', phone: '', age: '', gender: '',
        ktp_photo: null,
        emergency_contact_name: '', emergency_contact_phone: '', emergency_contact_relation: '',
        screening_type: 'online',
        severity_label: '', recommended_package: '', admin_notes: '', is_high_risk: false,
        agreement_signed_offline: false,
        session_type: 'offline', // Hardcoded as per request
        // Booking (Synchronized with group defaults)
        schedule_id: group.schedule_id || '',
        package_type: group.package_type || '',
        booking_notes: '',
        // Payment
        payment_status: 'pending',
        payment_proof: null,
        payment_method: 'Transfer Bank',
        payment_bank: '', payment_account_number: '', payment_account_name: '',
        // Akun
        password: '', password_confirmation: '', roles: ['patient'],
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [ktpPreview, setKtpPreview] = useState(null);
    const [proofPreview, setProofPreview] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleFile = (field, previewSetter) => (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData(field, file);
        previewSetter(URL.createObjectURL(file));
    };

    const clearFile = (field, previewSetter) => {
        setData(field, null);
        previewSetter(null);
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setData('roles', checked ? [...data.roles, value] : data.roles.filter(r => r !== value));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.group-bookings.members.store', group.id));
    };

    const hasSchedule = !!data.schedule_id;
    const isPaid = data.payment_status === 'paid';
    const selectedPkg = bookingPackages.find(p => p.slug === data.package_type);
    const packagePrice = selectedPkg?.price ?? 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('admin.group-bookings.show', group.id)} className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white uppercase tracking-tight">Tambah Anggota Grup</h2>
                        <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">Grup: {group.group_name} (Mode: Offline)</p>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Anggota Grup" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* ── DISCLAIMER ──────────────────────────────────── */}
                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-[2.5rem] p-8 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex-shrink-0">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-amber-800 dark:text-amber-300 uppercase tracking-[0.2em] mb-2">Pernyataan & Disclaimer</h3>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">Mendaftarkan anggota grup melalui alur offline.</p>
                                </div>
                            </div>
                            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.disclaimer_confirmed ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800 hover:border-amber-400'}`}>
                                <input type="checkbox" className="hidden" checked={data.disclaimer_confirmed} onChange={(e) => setData('disclaimer_confirmed', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${data.disclaimer_confirmed ? 'border-white bg-white' : 'border-amber-300 dark:border-amber-600'}`}>
                                    {data.disclaimer_confirmed && <CheckSquare className="w-3.5 h-3.5 text-amber-500" />}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${data.disclaimer_confirmed ? 'text-white' : 'text-amber-700 dark:text-amber-400'}`}>Data anggota asli dan telah disetujui</span>
                            </label>
                            <InputError message={errors.disclaimer_confirmed} className="mt-3" />
                        </div>

                        {/* ── INFORMASI PRIBADI ────────────────────────────── */}
                        <Section icon={User} iconBg="bg-indigo-50 dark:bg-indigo-900/40" iconColor="text-indigo-600 dark:text-indigo-400" title="Informasi Pribadi Anggota">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Lengkap *</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Sesuai KTP/SIM" required />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Email *</InputLabel>
                                    <div className="relative">
                                        <TextInput type="email" className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="email@aktif.com" required />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon / WhatsApp</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="081234567890" />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                    <InputError message={errors.phone} className="mt-2" />
                                </div>
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
                                    <InputError message={errors.gender} className="mt-2" />
                                </div>
                            </div>
                        </Section>

                        {/* ── FOTO KTP ─────────────────────────────────────── */}
                        <Section icon={Camera} iconBg="bg-sky-50 dark:bg-sky-900/40" iconColor="text-sky-600 dark:text-sky-400" title="Foto KTP / Identitas">
                            <FileUploadField hint="JPG / PNG · Maks 5 MB" preview={ktpPreview} onChange={handleFile('ktp_photo', setKtpPreview)} onClear={() => clearFile('ktp_photo', setKtpPreview)} error={errors.ktp_photo} />
                        </Section>

                        {/* ── KONTAK DARURAT ───────────────────────────────── */}
                        <Section icon={AlertCircle} iconBg="bg-rose-50 dark:bg-rose-900/40" iconColor="text-rose-600 dark:text-rose-400" title="Kontak Darurat (Opsional)">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Kontak</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_name} onChange={(e) => setData('emergency_contact_name', e.target.value)} />
                                        <Contact className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Telepon</InputLabel>
                                    <div className="relative">
                                        <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_phone} onChange={(e) => setData('emergency_contact_phone', e.target.value)} />
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hubungan</InputLabel>
                                    <TextInput className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.emergency_contact_relation} onChange={(e) => setData('emergency_contact_relation', e.target.value)} placeholder="Contoh: Orang Tua, Saudara Kandung" />
                                </div>
                            </div>
                        </Section>

                        {/* ── SKRINING ─────────────────────────────────────── */}
                        <Section icon={ClipboardList} iconBg="bg-teal-50 dark:bg-teal-900/40" iconColor="text-teal-600 dark:text-teal-400" title="Skrining (Screening)">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {[
                                    { value: 'online', Icon: Wifi, color: 'teal', label: 'Skrining Online', desc: 'Anggota mengisi skrining sendiri setelah login.' },
                                    { value: 'manual', Icon: WifiOff, color: 'violet', label: 'Skrining Manual', desc: 'Admin menginput hasil diagnosa secara langsung.' },
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
                            {data.screening_type === 'manual' && (
                                <div className="space-y-6 p-6 bg-violet-50/50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tingkat Keparahan *</InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.severity_label} onChange={(e) => setData('severity_label', e.target.value)}>
                                                <option value="">-- Pilih Tingkat --</option>
                                                {severityOptions.map(l => <option key={l} value={l}>{l}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rekomendasi Paket *</InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.recommended_package} onChange={(e) => setData('recommended_package', e.target.value)}>
                                                <option value="">-- Pilih Paket --</option>
                                                {packageOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catatan Diagnosa</InputLabel>
                                        <textarea rows={4} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none" placeholder="Tuliskan hasil skrining..." value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </Section>

                        {/* ── PERJANJIAN ───────────────────────────────────── */}
                        <Section icon={FileImage} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Perjanjian & Persetujuan">
                            <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.agreement_signed_offline ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-300'}`}>
                                <input type="checkbox" className="hidden" checked={data.agreement_signed_offline} onChange={(e) => setData('agreement_signed_offline', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.agreement_signed_offline ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {data.agreement_signed_offline && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                                </div>
                                <div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${data.agreement_signed_offline ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>Perjanjian Sudah Ditandatangani Offline</p>
                                    <p className={`text-[10px] font-medium mt-0.5 ${data.agreement_signed_offline ? 'text-white/80' : 'text-gray-400'}`}>Anggota telah membaca dan menyetujui S&K layanan</p>
                                </div>
                            </label>
                        </Section>

                        {/* ── JADWAL & PAKET (Synchronized with Group) ─────── */}
                        <Section icon={Calendar} iconBg="bg-blue-50 dark:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" title="Jadwal & Paket Sesi">
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-4">ℹ️ Default mengikuti jadwal grup. Anda dapat melakukan override jika diperlukan.</p>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Jadwal</InputLabel>
                                    <select className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.schedule_id} onChange={(e) => setData('schedule_id', e.target.value)}>
                                        <option value="">-- Pilih Jadwal --</option>
                                        {schedules.map(s => <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>)}
                                    </select>
                                    <InputError message={errors.schedule_id} className="mt-2" />
                                </div>
                                {hasSchedule && (
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Paket</InputLabel>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {bookingPackages.map(pkg => (
                                                <label key={pkg.slug} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.package_type === pkg.slug ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500'}`}>
                                                    <input type="radio" className="hidden" name="package_type" value={pkg.slug} checked={data.package_type === pkg.slug} onChange={() => setData('package_type', pkg.slug)} />
                                                    <PackageIcon className="w-4 h-4" />
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest">{pkg.name}</p>
                                                        <p className="text-[10px] font-medium">Rp {pkg.price.toLocaleString('id-ID')}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Section>

                        {/* ── INVOICE & PEMBAYARAN ─────────────────────────── */}
                        {hasSchedule && (
                            <Section icon={CreditCard} iconBg="bg-orange-50 dark:bg-orange-900/40" iconColor="text-orange-600 dark:text-orange-400" title="Invoice & Pembayaran">
                                <div className="space-y-6">
                                    <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">Ringkasan Biaya</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide text-xs">Total</span>
                                            <span className="font-black text-xl text-indigo-700 dark:text-indigo-300">Rp {packagePrice.toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Metode Pembayaran *</InputLabel>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {paymentMethodsBySession[data.session_type].map(method => (
                                                <label key={method} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_method === method ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300'}`}>
                                                    <input type="radio" className="hidden" name="payment_method" value={method} checked={data.payment_method === method} onChange={() => setData('payment_method', method)} />
                                                    <CreditCard className={`w-5 h-5 ${data.payment_method === method ? 'text-white' : 'text-indigo-500'}`} />
                                                    <p className="text-sm font-black uppercase tracking-widest">{method}</p>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Status Pembayaran *</InputLabel>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { value: 'pending', Icon: Clock, color: 'amber', label: 'Belum Dibayar' },
                                                { value: 'paid', Icon: CheckCircle, color: 'emerald', label: 'Sudah Dibayar' },
                                            ].map(({ value, Icon, color, label }) => (
                                                <label key={value} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_status === value ? `bg-${color}-600 border-${color}-600 text-white` : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                                                    <input type="radio" className="hidden" name="payment_status" value={value} checked={data.payment_status === value} onChange={() => setData('payment_status', value)} />
                                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    {data.package_type && (
                                        <button type="button" onClick={() => setShowPreview(true)} className="w-full flex items-center justify-center gap-3 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20">
                                            <Download className="w-4 h-4" /> Preview & Download Invoice
                                        </button>
                                    )}
                                </div>
                            </Section>
                        )}

                        {showPreview && (
                            <InvoicePreviewModal
                                data={data}
                                pkg={bookingPackages.find(p => p.slug === data.package_type)}
                                price={packagePrice}
                                bankAccounts={effectiveBankAccounts}
                                onClose={() => setShowPreview(false)}
                            />
                        )}

                        {/* ── AKUN & KEAMANAN ──────────────────────────────── */}
                        <Section icon={Shield} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Akun & Keamanan">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password Sementara *</InputLabel>
                                        <div className="relative">
                                            <TextInput type={showPassword ? 'text' : 'password'} className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" required />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Konfirmasi Password</InputLabel>
                                        <div className="relative">
                                            <TextInput type={showPasswordConfirm ? 'text' : 'password'} className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" />
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <button type="button" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Hak Akses (Roles)</InputLabel>
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 space-y-3">
                                        {roles.map(r => (
                                            <label key={r.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${data.roles.includes(r.name) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500'}`}>
                                                <input type="checkbox" className="hidden" value={r.name} checked={data.roles.includes(r.name)} onChange={handleRoleChange} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{r.name.replace(/_/g, ' ')}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* ── SUBMIT ───────────────────────────────────────── */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={route('admin.group-bookings.show', group.id)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">Batal</Link>
                            <button type="submit" disabled={processing || !data.disclaimer_confirmed} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40">
                                <Users className="w-4 h-4" /> Tambahkan Anggota Grup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
