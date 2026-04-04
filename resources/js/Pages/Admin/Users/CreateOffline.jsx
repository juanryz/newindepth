import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Save, User, Mail, Phone, Lock, Shield, AlertCircle,
    Contact, Eye, EyeOff, ClipboardList, Wifi, WifiOff, AlertTriangle,
    CheckSquare, Camera, FileImage, Calendar, Package as PackageIcon,
    CreditCard, Upload, CheckCircle, Clock, Banknote, Trash2, Users,
    Monitor, MapPin, ArrowRight, Printer, Download, X,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { InvoiceModal } from '@/Components/InvoiceModal';

// ─── Invoice Preview Modal (client-side, sebelum submit) ──────────────────────
function InvoicePreviewModal({ data, pkg, price, bankAccounts: bankAccountsProp = [], onClose }) {
    const printRef = useRef();
    const { clinicInfo } = usePage().props;
    const bankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccountsProp;
    const isOnline = data.session_type === 'online';
    const isCash   = data.payment_method === 'Cash';
    const fmt = (n) => `Rp ${Number(n || 0).toLocaleString('id-ID')}`;

    const [isDownloading, setIsDownloading] = useState(false);

    const downloadPDF = () => {
        setIsDownloading(true);
        const element = printRef.current;
        
        const doDownload = () => {
            const opt = {
                margin: [10, 10, 10, 10],
                filename: `Draft_Invoice_${data.name || 'Pasien'}.pdf`,
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
                {/* Tombol tutup + print */}
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

                {/* Print area */}
                <div ref={printRef} className="p-8 space-y-6">
                    {/* Header klinik */}
                    <div className="flex items-start justify-between pb-6 border-b-2 border-indigo-100">
                        <div>
                            <img src="/images/logo-color.png" alt="Logo" className="h-12 w-auto mb-2" />
                            <h1 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">
                                {clinicInfo?.name || 'InDepth Mental Wellness'}
                            </h1>
                            <p className="text-xs text-indigo-600/70 font-semibold mt-0.5">
                                {clinicInfo?.tagline || 'Hipnoterapi & Kesehatan Mental Profesional'}
                            </p>
                            <div className="mt-2 space-y-0.5">
                                {clinicInfo?.address && (
                                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />{clinicInfo.address}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-x-4">
                                    {clinicInfo?.phone && <p className="text-[10px] text-gray-400">{clinicInfo.phone}</p>}
                                    {clinicInfo?.email && <p className="text-[10px] text-gray-400">{clinicInfo.email}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Invoice (Draft)</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border mt-2 ${
                                data.payment_status === 'paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}>
                                {data.payment_status === 'paid' ? '✓ Lunas' : '⏳ Belum Dibayar'}
                            </span>
                        </div>
                    </div>

                    {/* Data pasien */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Data Pasien</p>
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

                    {/* Detail layanan */}
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

                    {/* Info pembayaran + rekening tujuan */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-3">Informasi Pembayaran</p>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-500">Metode</span>
                            <span className="font-black text-gray-900 dark:text-white">{data.payment_method || '—'}</span>
                        </div>

                        {/* Rekening tujuan — hanya jika Transfer Bank */}
                        {!isCash && bankAccounts.length > 0 && (
                            <>
                                <p className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-2">Rekening Tujuan Transfer</p>
                                {bankAccounts.map((b) => (
                                    <div key={b.bank} className="mb-2 flex items-center justify-between bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-black text-[10px]">{b.bank}</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-900 uppercase">{b.holder}</p>
                                                <p className="text-sm font-mono font-black text-indigo-600 tracking-wider">{b.account}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => navigator.clipboard?.writeText(b.account)}
                                            className="text-[9px] font-black uppercase text-blue-600 bg-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-200 transition-colors">
                                            Salin
                                        </button>
                                    </div>
                                ))}
                                <p className="text-[9px] text-amber-600 font-bold mt-2">
                                    ⚠️ Harap transfer tepat sesuai nominal. Pembayaran akan dikonfirmasi oleh admin.
                                </p>
                            </>
                        )}
                        {!isCash && bankAccounts.length === 0 && (
                            <p className="text-xs text-blue-600 font-medium">Silakan transfer ke rekening resmi {clinicInfo?.name || 'InDepth Mental Wellness'}.</p>
                        )}
                        {isCash && (
                            <p className="text-xs text-emerald-600 font-bold">✅ Bayar tunai langsung di klinik saat sesi berlangsung.</p>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 text-center">
                        <p className="text-[9px] text-gray-400 leading-relaxed">
                            Invoice ini merupakan draft yang dibuat oleh admin.
                            Nomor invoice final akan diterbitkan setelah booking dikonfirmasi.
                        </p>
                        {(clinicInfo?.phone || clinicInfo?.email) && (
                            <p className="text-[9px] text-gray-400 mt-1">
                                {clinicInfo?.name || 'InDepth Mental Wellness'} · {[clinicInfo?.phone, clinicInfo?.email].filter(Boolean).join(' · ')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer actions */}
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

// ─── Formatted schedule label ─────────────────────────────────────────────────
function scheduleLabel(s) {
    // s.date may be a full ISO string ("2026-03-26T00:00:00.000000Z") or plain "2026-03-26"
    // Slice to YYYY-MM-DD then use noon to avoid DST/timezone boundary issues
    const ymd = (s.date ?? '').slice(0, 10);
    const dateStr = ymd
        ? new Date(ymd + 'T12:00:00').toLocaleDateString('id-ID', {
              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
          })
        : '—';
    const avail = s.quota - (s.confirmed_count ?? 0);
    return `${dateStr} · ${s.start_time?.slice(0, 5)}–${s.end_time?.slice(0, 5)} · ${s.therapist?.name ?? '—'} (${avail} slot)`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateOffline({
    roles, severityOptions, packageOptions, genderOptions, schedules, bookingPackages,
    paymentMethodsBySession = { online: ['Transfer Bank'], offline: ['Transfer Bank', 'Cash'] },
    sessionTypeOptions = [],
    bankAccounts = [],
}) {
    // Invoice modal state setelah submit individu berhasil
    const [invoiceData, setInvoiceData] = useState(null);
    const { flash, clinicInfo } = usePage().props;

    // Gunakan bankAccounts dari clinicInfo (shared props) jika tersedia, fallback ke prop
    const effectiveBankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccounts;

    // Tampilkan invoice dari flash session jika ada
    React.useEffect(() => {
        if (flash?.invoiceData) setInvoiceData(flash.invoiceData);
    }, [flash]);

    const { data, setData, post, processing, errors } = useForm({
        disclaimer_confirmed: false,
        // Identitas
        name: '', email: '', phone: '', age: '', gender: '',
        // KTP
        ktp_photo: null,
        // Kontak darurat
        emergency_contact_name: '', emergency_contact_phone: '', emergency_contact_relation: '',
        // Skrining
        screening_type: 'online',
        severity_label: '', recommended_package: '', admin_notes: '', is_high_risk: false,
        // Perjanjian
        agreement_signed_offline: false,
        // Mode Sesi
        session_type: 'offline',
        // Booking
        schedule_id: '', package_type: '', booking_notes: '',
        // Pembayaran
        payment_status: '',
        payment_proof: null,
        payment_method: 'Transfer Bank',
        payment_bank: '', payment_account_number: '', payment_account_name: '',
        // Akun
        password: '', password_confirmation: '', roles: [],
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

    // Payment methods filtered by session type
    const availablePaymentMethods = paymentMethodsBySession[data.session_type] ?? ['Transfer Bank'];

    // When session_type changes, reset payment_method to first allowed
    const handleSessionTypeChange = (val) => {
        setData(prev => ({
            ...prev,
            session_type: val,
            payment_method: (paymentMethodsBySession[val] ?? ['Transfer Bank'])[0],
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store-offline'));
    };

    const hasSchedule = !!data.schedule_id;
    const isPaid      = data.payment_status === 'paid';
    const isOnline    = data.session_type === 'online';

    // Kalkulasi harga paket terpilih
    const selectedPkg = bookingPackages.find(p => p.slug === data.package_type);
    const packagePrice = isOnline
        ? (selectedPkg?.online_price ?? selectedPkg?.price ?? 0)
        : (selectedPkg?.price ?? 0);

    // ── Form Individual ────────────────────────────────────────────────────────
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
                            Tambah User Individual
                        </h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            Pendaftaran Pasien (Walk-in / Individual)
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tambah User Individual" />

            {/* Invoice Modal */}
            {invoiceData && (
                <InvoiceModal
                    invoice={invoiceData}
                    type="individual"
                    onClose={() => setInvoiceData(null)}
                    bankAccounts={effectiveBankAccounts}
                />
)}

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
                                    <h3 className="text-sm font-black text-amber-800 dark:text-amber-300 uppercase tracking-[0.2em] mb-2">
                                        Pernyataan & Disclaimer Penting
                                    </h3>
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                        Fitur ini digunakan untuk mendaftarkan pasien yang datang secara langsung (walk-in/offline).
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900/50 rounded-[1.5rem] p-6 border border-amber-100 dark:border-amber-800/50 space-y-3 mb-6">
                                <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight mb-3">Admin wajib memastikan:</p>
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
                            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.disclaimer_confirmed ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-gray-900 border-amber-200 dark:border-amber-800 hover:border-amber-400'}`}>
                                <input type="checkbox" className="hidden" checked={data.disclaimer_confirmed} onChange={(e) => setData('disclaimer_confirmed', e.target.checked)} />
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${data.disclaimer_confirmed ? 'border-white bg-white' : 'border-amber-300 dark:border-amber-600'}`}>
                                    {data.disclaimer_confirmed && <CheckSquare className="w-3.5 h-3.5 text-amber-500" />}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-widest ${data.disclaimer_confirmed ? 'text-white' : 'text-amber-700 dark:text-amber-400'}`}>
                                    Saya menyatakan bahwa data yang akan dimasukkan adalah data pasien asli dan telah mendapat persetujuannya
                                </span>
                            </label>
                            <InputError message={errors.disclaimer_confirmed} className="mt-3" />
                        </div>

                        {/* ── INFORMASI PRIBADI ────────────────────────────── */}
                        <Section icon={User} iconBg="bg-indigo-50 dark:bg-indigo-900/40" iconColor="text-indigo-600 dark:text-indigo-400" title="Informasi Pribadi Pasien">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'name', label: 'Nama Lengkap *', placeholder: 'Sesuai KTP/SIM', icon: User, required: true },
                                    { id: 'email', label: 'Alamat Email *', placeholder: 'email@aktif.com', icon: Mail, type: 'email', required: true },
                                    { id: 'phone', label: 'Nomor Telepon / WhatsApp', placeholder: '081234567890', icon: Phone },
                                ].map(({ id, label, placeholder, icon: Icon, type = 'text', required }) => (
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
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    Unggah foto KTP atau identitas resmi pasien (opsional). Format JPG/PNG, maksimal 5 MB.
                                </p>
                                <FileUploadField
                                    hint="JPG / PNG · Maks 5 MB"
                                    preview={ktpPreview}
                                    onChange={handleFile('ktp_photo', setKtpPreview)}
                                    onClear={() => clearFile('ktp_photo', setKtpPreview)}
                                    error={errors.ktp_photo}
                                />
                            </div>
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
                            <div className="mb-6">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Metode Skrining</InputLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: 'online', Icon: Wifi, color: 'teal', label: 'Skrining Online', desc: 'Pasien akan mengisi skrining sendiri setelah login ke akunnya.' },
                                        { value: 'manual', Icon: WifiOff, color: 'violet', label: 'Skrining Manual', desc: 'Skrining sudah dilakukan secara langsung. Admin menginput hasil diagnosa.' },
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
                                        Pasien perlu menyelesaikan skrining online melalui akunnya setelah login pertama kali. Pastikan pasien mengetahui hal ini sebelum meninggalkan klinik.
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
                                                {severityOptions.map((label) => (
                                                    <option key={label} value={label}>{label}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.severity_label} className="mt-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rekomendasi Paket <span className="text-rose-500">*</span></InputLabel>
                                            <select className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.recommended_package} onChange={(e) => setData('recommended_package', e.target.value)}>
                                                <option value="">-- Pilih Paket --</option>
                                                {packageOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <InputError message={errors.recommended_package} className="mt-2" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catatan Diagnosa / Komentar Admin</InputLabel>
                                        <textarea rows={4} className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none" placeholder="Tuliskan hasil skrining, temuan, atau catatan diagnosa yang diperoleh dari sesi tatap muka..." value={data.admin_notes} onChange={(e) => setData('admin_notes', e.target.value)} />
                                        <InputError message={errors.admin_notes} className="mt-2" />
                                    </div>
                                    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${data.is_high_risk ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-rose-300'}`}>
                                        <input type="checkbox" className="hidden" checked={data.is_high_risk} onChange={(e) => setData('is_high_risk', e.target.checked)} />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${data.is_high_risk ? 'border-white bg-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                            {data.is_high_risk && <div className="w-3 h-3 rounded-sm bg-rose-600" />}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest ${data.is_high_risk ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>Pasien Berisiko Tinggi</p>
                                            <p className={`text-[10px] font-medium mt-0.5 ${data.is_high_risk ? 'text-white/80' : 'text-gray-400'}`}>Tandai jika pasien memerlukan penanganan prioritas atau pemantauan khusus</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </Section>

                        {/* ── PERJANJIAN ───────────────────────────────────── */}
                        <Section icon={FileImage} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Perjanjian & Persetujuan">
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    Jika pasien telah menandatangani perjanjian layanan secara fisik/offline, centang di bawah ini. Data ini akan dicatat beserta nama admin yang menginput.
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
                            </div>
                        </Section>

                        <Section icon={Calendar} iconBg="bg-blue-50 dark:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" title="Mode Sesi">
                            <div className="mb-2">
                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Pilih Mode Sesi *</InputLabel>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sessionTypeOptions.map(({ value, label, desc }) => {
                                        const isOnline = value === 'online';
                                        const color = isOnline ? 'blue' : 'emerald';
                                        const emoji = isOnline ? '💻' : '🏥';
                                        return (
                                            <label key={value} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                                data.session_type === value
                                                    ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20`
                                                    : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'
                                            }`}>
                                                <input type="radio" className="hidden" name="session_type" value={value} checked={data.session_type === value} onChange={() => handleSessionTypeChange(value)} />
                                                <span className="text-2xl flex-shrink-0">{emoji}</span>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
                                                    <p className={`text-[10px] font-medium leading-relaxed ${data.session_type === value ? 'text-white/80' : 'text-gray-400'}`}>{desc}</p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.session_type} className="mt-3" />
                            </div>
                        </Section>

                        {/* ── JADWAL & PAKET ───────────────────────────────── */}
                        <Section icon={Calendar} iconBg="bg-blue-50 dark:bg-blue-900/40" iconColor="text-blue-600 dark:text-blue-400" title="Jadwal & Paket Sesi (Opsional)">
                            <div className="space-y-6">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    Isi bagian ini jika pasien sudah memilih jadwal dan paket saat pendaftaran. Kosongkan jika belum.
                                </p>

                                <div className="space-y-2">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Jadwal</InputLabel>
                                    {schedules.length === 0 ? (
                                        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 font-medium">
                                            Tidak ada jadwal tersedia saat ini
                                        </div>
                                    ) : (
                                        <select
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={data.schedule_id}
                                            onChange={(e) => {
                                                setData('schedule_id', e.target.value);
                                                if (!e.target.value) {
                                                    setData('payment_status', '');
                                                }
                                            }}
                                        >
                                            <option value="">-- Tidak Ada / Pilih Nanti --</option>
                                            {schedules.map((s) => (
                                                <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>
                                            ))}
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
                                                    <div className="min-w-0">
                                                        <p className={`text-[10px] font-black uppercase tracking-widest truncate ${data.package_type === pkg.slug ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{pkg.name}</p>
                                                        <p className={`text-[10px] font-medium mt-0.5 ${data.package_type === pkg.slug ? 'text-white/80' : 'text-gray-400'}`}>
                                                            Rp {pkg.price.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <InputError message={errors.package_type} className="mt-2" />
                                    </div>
                                )}

                                {hasSchedule && (
                                    <div className="space-y-2">
                                        <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catatan Booking (Opsional)</InputLabel>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none"
                                            placeholder="Catatan khusus untuk terapis atau tim..."
                                            value={data.booking_notes}
                                            onChange={(e) => setData('booking_notes', e.target.value)}
                                        />
                                        <InputError message={errors.booking_notes} className="mt-2" />
                                    </div>
                                )}
                            </div>
                        </Section>

                        {/* ── INVOICE & PEMBAYARAN ─────────────────────────── */}
                        {hasSchedule && (
                            <>
                                <Section icon={CreditCard} iconBg="bg-orange-50 dark:bg-orange-900/40" iconColor="text-orange-600 dark:text-orange-400" title="Invoice & Pembayaran">
                                    <div className="space-y-6">

                                        {/* Preview Invoice */}
                                        {data.package_type && (
                                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/10 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">Preview Invoice</p>
                                                <div className="space-y-2 text-sm">
                                                    {[
                                                        { label: 'Paket', value: selectedPkg?.name ?? data.package_type },
                                                        { label: 'Tipe Sesi', value: isOnline ? '💻 Online' : '🏥 Offline' },
                                                    ].map(({ label, value }) => (
                                                        <div key={label} className="flex justify-between">
                                                            <span className="text-gray-500 font-medium">{label}</span>
                                                            <span className="font-black text-gray-900 dark:text-white">{value}</span>
                                                        </div>
                                                    ))}
                                                    <div className="h-px bg-indigo-200 dark:bg-indigo-800 my-1" />
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide text-xs">Total</span>
                                                        <span className="font-black text-xl text-indigo-700 dark:text-indigo-300">
                                                            Rp {packagePrice.toLocaleString('id-ID')}

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pilih Metode Pembayaran */}
                                        <div>
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">
                                                Metode Pembayaran <span className="text-rose-500">*</span>
                                            </InputLabel>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {availablePaymentMethods.map((method) => {
                                                    const isCash = method === 'Cash';
                                                    const Icon = isCash ? Banknote : CreditCard;
                                                    const sel = data.payment_method === method;
                                                    return (
                                                        <label key={method} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                                            sel ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                                                : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300'
                                                        }`}>
                                                            <input type="radio" className="hidden" name="payment_method" value={method}
                                                                checked={sel} onChange={() => setData('payment_method', method)} />
                                                            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${sel ? 'text-white' : 'text-indigo-500'}`} />
                                                            <div>
                                                                <p className={`text-sm font-black uppercase tracking-widest ${sel ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{method}</p>
                                                                <p className={`text-[10px] font-medium mt-0.5 ${sel ? 'text-white/80' : 'text-gray-400'}`}>
                                                                    {isCash ? 'Bayar tunai langsung di klinik.' : 'Transfer ke rekening klinik.'}
                                                                </p>
                                                            </div>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                            {isOnline && (
                                                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold ml-1 mt-2">💻 Sesi online hanya mendukung Transfer Bank</p>
                                            )}
                                            <InputError message={errors.payment_method} className="mt-2" />
                                        </div>

                                        {/* Info Transfer */}
                                        {data.payment_method === 'Transfer Bank' && (
                                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-5">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Rekening Tujuan Transfer</p>
                                                {effectiveBankAccounts.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {effectiveBankAccounts.map((b) => (
                                                            <div key={b.bank} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                        <span className="text-white font-black text-[10px]">{b.bank}</span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-black text-gray-900 dark:text-white">{b.holder}</p>
                                                                        <p className="text-sm font-mono font-black text-indigo-600 dark:text-indigo-400 tracking-wider">{b.account}</p>
                                                                    </div>
                                                                </div>
                                                                <button type="button" onClick={() => navigator.clipboard?.writeText(b.account)}
                                                                    className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg transition-colors flex-shrink-0">
                                                                    Salin
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Silakan transfer ke rekening resmi {clinicInfo?.name || 'InDepth Mental Wellness'}.</p>
                                                )}
                                                <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold mt-2">
                                                    ⚠️ Harap transfer tepat sesuai nominal. Pembayaran akan dikonfirmasi oleh admin.
                                                </p>
                                            </div>
                                        )}

                                        {/* Status Pembayaran */}
                                        <div>
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">Status Pembayaran <span className="text-rose-500">*</span></InputLabel>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {[
                                                    { value: 'pending', Icon: Clock, color: 'amber', label: 'Belum Dibayar', desc: 'Menunggu konfirmasi transfer atau akan dibayar nanti.' },
                                                    { value: 'paid', Icon: CheckCircle, color: 'emerald', label: 'Sudah Dibayar', desc: 'Pembayaran sudah diterima. Booking langsung dikonfirmasi.' },
                                                ].map(({ value, Icon: StatusIcon, color, label, desc }) => (
                                                    <label key={value} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                                        data.payment_status === value
                                                            ? `bg-${color}-600 border-${color}-600 text-white shadow-lg shadow-${color}-600/20`
                                                            : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-gray-300'
                                                    }`}>
                                                        <input type="radio" className="hidden" name="payment_status" value={value}
                                                            checked={data.payment_status === value} onChange={() => setData('payment_status', value)} />
                                                        <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                                            data.payment_status === value ? 'text-white' : `text-${color}-500`
                                                        }`} />
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
                                                            <p className={`text-[10px] font-medium leading-relaxed ${
                                                                data.payment_status === value ? 'text-white/80' : 'text-gray-400'
                                                            }`}>{desc}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            <InputError message={errors.payment_status} className="mt-3" />
                                        </div>

                                        {/* Detail bukti — hanya jika sudah bayar */}
                                        {isPaid && (
                                            <div className="space-y-6 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {data.payment_method !== 'Cash' && (
                                                        <>
                                                            <div className="space-y-2">
                                                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Bank / Dompet Digital</InputLabel>
                                                                <div className="relative">
                                                                    <TextInput className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.payment_bank} onChange={(e) => setData('payment_bank', e.target.value)} placeholder="Contoh: BCA / Mandiri / OVO" />
                                                                    <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                                </div>
                                                                <InputError message={errors.payment_bank} className="mt-2" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor Rekening Pengirim (Opsional)</InputLabel>
                                                                <TextInput className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.payment_account_number} onChange={(e) => setData('payment_account_number', e.target.value)} />
                                                                <InputError message={errors.payment_account_number} className="mt-2" />
                                                            </div>
                                                            <div className="space-y-2 lg:col-span-2">
                                                                <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Pemilik Rekening</InputLabel>
                                                                <TextInput className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all" value={data.payment_account_name} onChange={(e) => setData('payment_account_name', e.target.value)} />
                                                                <InputError message={errors.payment_account_name} className="mt-2" />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Bukti Transfer (Opsional)</InputLabel>
                                                    <FileUploadField
                                                        hint="Foto struk transfer · JPG/PNG · Maks 5 MB"
                                                        preview={proofPreview}
                                                        onChange={handleFile('payment_proof', setProofPreview)}
                                                        onClear={() => clearFile('payment_proof', setProofPreview)}
                                                        error={errors.payment_proof}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Tombol Preview & Download Invoice */}
                                        {data.package_type && data.payment_method && (
                                            <div className="pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPreview(true)}
                                                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Preview &amp; Download Invoice
                                                </button>
                                                <p className="text-[9px] text-gray-400 text-center mt-2">
                                                    Invoice draft berisi rekening tujuan transfer dan ringkasan layanan
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Section>

                                {/* Invoice Preview Modal — sibling dari Section */}
                                {showPreview && (
                                    <InvoicePreviewModal
                                        data={data}
                                        pkg={bookingPackages.find(p => p.slug === data.package_type)}
                                        price={(() => {
                                            const pkg2 = bookingPackages.find(p => p.slug === data.package_type);
                                            return isOnline
                                                ? (pkg2?.online_price ?? pkg2?.price ?? 0)
                                                : (pkg2?.price ?? 0);
                                        })()}
                                        bankAccounts={effectiveBankAccounts}
                                        onClose={() => setShowPreview(false)}
                                    />
                                )}
                            </>
                        )}

                        {/* ── AKUN & KEAMANAN ──────────────────────────────── */}
                        <Section icon={Shield} iconBg="bg-emerald-50 dark:bg-emerald-900/40" iconColor="text-emerald-600 dark:text-emerald-400" title="Akun & Keamanan">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                                        Buatkan password sementara dan informasikan kepada pasien. Pasien harus menggantinya saat pertama kali login.
                                    </div>
                                    {[
                                        { id: 'password', label: 'Password Sementara *', show: showPassword, toggle: () => setShowPassword(v => !v) },
                                        { id: 'password_confirmation', label: 'Konfirmasi Password', show: showPasswordConfirm, toggle: () => setShowPasswordConfirm(v => !v) },
                                    ].map(({ id, label, show, toggle }) => (
                                        <div key={id} className="space-y-2">
                                            <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</InputLabel>
                                            <div className="relative">
                                                <TextInput
                                                    type={show ? 'text' : 'password'}
                                                    className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-12 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                    value={data[id]}
                                                    onChange={(e) => setData(id, e.target.value)}
                                                    autoComplete="new-password"
                                                    required={id === 'password'}
                                                />
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none">
                                                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {id === 'password' && <InputError message={errors.password} className="mt-2" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <InputLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Hak Akses (Roles)</InputLabel>
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

                        {/* ── SUBMIT ───────────────────────────────────────── */}
                        <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8">
                            <Link href={route('admin.users.index')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6">
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
