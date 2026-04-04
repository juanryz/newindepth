import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Plus, Users, Building2, Phone, Mail, MapPin,
    CreditCard, FileText, Trash2, CheckCircle, Clock, Banknote,
    Printer, Eye, AlertTriangle, User, Calendar, Edit2,
    UserCheck, AlertCircle, ChevronRight,
} from 'lucide-react';
import { InvoiceModal } from '@/Components/InvoiceModal';

const statusConfig = {
    paid:    { label: 'Lunas',       icon: CheckCircle, cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', dot: 'bg-emerald-500' },
    pending: { label: 'Belum Lunas', icon: Clock,       cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',         dot: 'bg-amber-500' },
};

function ProfileCompletionBadge({ completion }) {
    if (!completion) return <span className="text-[10px] text-gray-400">—</span>;

    const { percentage, is_complete, fields } = completion;

    const missingFields = Object.values(fields || {})
        .filter(f => !f.filled)
        .map(f => f.label);

    const colorClass = is_complete
        ? 'text-emerald-600 dark:text-emerald-400'
        : percentage >= 60
            ? 'text-amber-600 dark:text-amber-400'
            : 'text-rose-600 dark:text-rose-400';

    const barColor = is_complete
        ? 'bg-emerald-500'
        : percentage >= 60
            ? 'bg-amber-500'
            : 'bg-rose-500';

    return (
        <div className="flex flex-col items-center gap-1.5 group relative min-w-[60px]">
            <span className={`text-sm font-black tabular-nums ${colorClass}`}>
                {percentage}%
            </span>
            <div className="w-14 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {!is_complete && missingFields.length > 0 && (
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10 w-48 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-xl p-3 shadow-xl pointer-events-none left-1/2 -translate-x-1/2">
                    <p className="font-black uppercase tracking-widest mb-2 text-gray-300">Belum diisi:</p>
                    <ul className="space-y-0.5">
                        {missingFields.map((label, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function GroupBookingsShow({ group, invoiceData, schedules = [], bookingPackages = [], paymentMethods = ['Transfer Bank', 'Cash'], bankAccounts = [] }) {
    const { flash } = usePage().props;
    const [showInvoice, setShowInvoice] = useState(false);

    const formatDate     = (d) => d ? new Date(d).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) : '-';
    const formatTime     = (t) => t ? String(t).substring(0, 5) : '-';
    const formatCurrency = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

    const st = statusConfig[group.payment_status] ?? statusConfig.pending;
    const StatusIcon = st.icon;
    const memberCount = group.members?.length ?? 0;

    // ── Mark Paid ───────────────────────────────────────────────
    const handleMarkPaid = () => {
        if (!group.payment_method) {
            alert('Pilih metode pembayaran terlebih dahulu sebelum menandai lunas.');
            return;
        }
        if (!confirm('Tandai grup ini sebagai LUNAS? Semua booking anggota yang pending akan dikonfirmasi.')) return;
        router.post(route('admin.group-bookings.payment.update', group.id), {
            payment_status: 'paid',
            payment_method: group.payment_method,
        });
    };

    // ── Update Payment Method ────────────────────────────────────
    const { data: pmData, setData: setPmData, post: postPm, processing: pmProcessing, errors: pmErrors } = useForm({
        payment_method: group.payment_method ?? '',
        package_type:   group.package_type   ?? '',
    });
    const handleSavePaymentMethod = (e) => {
        e.preventDefault();
        postPm(route('admin.group-bookings.payment-method.update', group.id));
    };

    // ─── Remove Member ─────────────────────────────────────────────────────────
    const handleRemoveMember = (memberId) => {
        if (!confirm('Hapus anggota ini dari grup? Booking terkait juga akan dibatalkan.')) return;
        router.delete(route('admin.group-bookings.members.remove', { 
            groupBooking: group.id, 
            group_booking_member: memberId 
        }));
    };

    // ─── Schedule for Group ───────────────────────────────────────────────────
    const { data: schedForm, setData: setSchedForm, post: postSched, processing: schedProcessing, errors: schedErrors } = useForm({
        schedule_id:  group.schedule_id ?? '',
        package_type: group.package_type ?? '',
    });

    const scheduleLabel = (s) => {
        const ymd = (s.date ?? '').slice(0, 10);
        const dateStr = ymd ? new Date(ymd + 'T12:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '—';
        const avail = (s.quota ?? 0) - (s.confirmed_count ?? 0);
        return `${dateStr} · ${s.start_time?.slice(0, 5) ?? ''}–${s.end_time?.slice(0, 5) ?? ''} · ${s.therapist?.name ?? '—'} (${avail} slot)`;
    };

    const handleSaveSchedule = (e) => {
        e.preventDefault();
        postSched(route('admin.group-bookings.schedule.update', group.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.users.index', { tab: 'groups' })}
                            className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                {group.group_name}
                            </h2>
                            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-1">
                                {group.invoice_number}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('admin.group-bookings.members.add', group.id)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Anggota
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Grup: ${group.group_name}`} />

            {showInvoice && (
                <InvoiceModal
                    invoice={{ ...invoiceData, members: invoiceData?.members || [] }}
                    type="group"
                    onClose={() => setShowInvoice(false)}
                    bankAccounts={bankAccounts}
                />
            )}

            <div className="py-8 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    {/* Flash */}
                    {flash?.success && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />{flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />{flash.error}
                        </div>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Anggota', value: `${memberCount} orang`,           color: 'indigo' },
                            { label: 'Total Tagihan', value: formatCurrency(group.total_amount), color: 'blue'   },
                            { label: 'Metode Bayar',  value: group.payment_method ?? '—',       color: 'violet' },
                            { label: 'Status',        value: st.label,                          color: group.payment_status === 'paid' ? 'emerald' : 'amber' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-[1.75rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Info Grup + Status Bayar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Info Grup */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Informasi Grup</p>
                                <Link
                                    href={route('admin.group-bookings.edit', group.id)}
                                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                                    title="Edit grup"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Link>
                            </div>
                            {[
                                { icon: Building2, label: 'Institusi', value: group.institution_name },
                                { icon: MapPin,    label: 'Alamat',    value: group.address },
                                { icon: User,      label: 'PIC',       value: group.pic_name },
                                { icon: Phone,     label: 'Telepon',   value: group.pic_phone },
                                { icon: Mail,      label: 'Email',     value: group.pic_email },
                                { icon: FileText,  label: 'Catatan',   value: group.notes },
                            ].filter((r) => r.value).map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</p>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Pembayaran */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3 mb-6">
                                Status Pembayaran
                            </p>
                            <div className={`flex items-center gap-3 p-5 rounded-2xl mb-6 ${st.cls}`}>
                                <StatusIcon className="w-5 h-5" />
                                <div>
                                    <p className="text-xs font-black uppercase">{st.label}</p>
                                    <p className="text-[10px] font-medium">{formatCurrency(group.total_amount)}</p>
                                </div>
                            </div>
                            {group.payment_status === 'pending' && memberCount > 0 && group.payment_method === 'Transfer Bank' && bankAccounts.length > 0 && (
                                <div className="mb-6 space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Rekening Tujuan Transfer</p>
                                    {bankAccounts.map((b) => (
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
                            )}

                            {group.payment_status === 'pending' && memberCount > 0 && group.payment_method && group.schedule_id && (
                                <button
                                    onClick={handleMarkPaid}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 mb-3"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Tandai Lunas &amp; Konfirmasi Semua Booking
                                </button>
                            )}

                            {invoiceData && group.payment_method && group.package_type && group.schedule_id && (
                                <button
                                    onClick={() => setShowInvoice(true)}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-white dark:bg-gray-800 border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-all"
                                >
                                    <Printer className="w-4 h-4" />
                                    Lihat / Cetak Invoice
                                </button>
                            )}

                            {group.payment_status === 'pending' && memberCount > 0 && (!group.payment_method || !group.schedule_id) && (
                                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                    Pilih jadwal dan metode pembayaran di bawah sebelum menandai lunas.
                                </div>
                            )}
                            {group.payment_status === 'paid' && group.paid_at && (
                                <p className="text-xs text-emerald-600 font-bold text-center">
                                    ✅ Dibayar pada {formatDate(group.paid_at)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ─── Konfigurasi Layanan & Pembayaran ───────────────────────── */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-xl">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">Konfigurasi Layanan &amp; Pembayaran</h3>
                                <p className="text-[10px] text-gray-400 font-medium">
                                    {group.payment_status === 'paid'
                                        ? `${group.package_type ?? '—'} · ${group.payment_method ?? '—'} · Sudah dikonfirmasi`
                                        : 'Atur jadwal, paket, dan metode pembayaran di sini'}
                                </p>
                            </div>
                        </div>

                        {group.payment_status === 'paid' ? (
                            /* ── READ ONLY setelah lunas ── */
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                {[
                                    { label: 'Jadwal',       value: group.schedule ? `${formatDate(group.schedule.date)} ${formatTime(group.schedule.start_time)}` : '—' },
                                    { label: 'Paket',        value: group.package_type ?? '—' },
                                    { label: 'Metode Bayar', value: group.payment_method ?? '—' },
                                    { label: 'Total Invoice', value: formatCurrency(group.total_amount) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-1">{label}</p>
                                        <p className="text-sm font-black text-emerald-900 dark:text-emerald-200">{value}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* ── FORM pilih jadwal + paket + metode ── */
                            <div className="space-y-8">
                                {/* Jadwal */}
                                <form onSubmit={handleSaveSchedule}>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pilih Jadwal</label>
                                        <div className="flex items-center gap-3">
                                            {schedules.length === 0 ? (
                                                <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs text-gray-400 font-medium text-center">
                                                    Tidak ada jadwal tersedia saat ini
                                                </div>
                                            ) : (
                                                <select
                                                    className="flex-1 bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                                    value={schedForm.schedule_id}
                                                    onChange={(e) => setSchedForm('schedule_id', e.target.value)}
                                                >
                                                    <option value="">-- Belum Dipilih --</option>
                                                    {schedules.map((s) => (
                                                        <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>
                                                    ))}
                                                </select>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={schedProcessing || !schedForm.schedule_id}
                                                className="px-6 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Simpan Jadwal
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Paket dan Metode form */}
                                <form onSubmit={handleSavePaymentMethod} className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">

                                {/* Pilih Paket */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">
                                        Pilih Paket <span className="text-rose-500">*</span>
                                    </p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {bookingPackages.map((pkg) => {
                                            const sel = pmData.package_type === pkg.slug;
                                            return (
                                                <label key={pkg.slug} className={`flex flex-col gap-1.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${sel ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-300'}`}>
                                                    <input type="radio" className="hidden" name="package_type" value={pkg.slug} checked={sel} onChange={() => setPmData('package_type', pkg.slug)} />
                                                    <span className={`text-[10px] font-black uppercase tracking-wider ${sel ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{pkg.name}</span>
                                                    <span className={`text-sm font-black ${sel ? 'text-white' : 'text-violet-600 dark:text-violet-400'}`}>
                                                        Rp {pkg.price.toLocaleString('id-ID')}
                                                    </span>
                                                    {sel && memberCount > 0 && (
                                                        <span className="text-[9px] font-medium text-white/80">
                                                            × {memberCount} orang
                                                        </span>
                                                    )}
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {pmErrors.package_type && <p className="text-xs text-rose-500 font-bold mt-2">{pmErrors.package_type}</p>}
                                </div>

                                {/* Preview Kalkulasi Invoice */}
                                {pmData.package_type && memberCount > 0 && (() => {
                                    const pkg = bookingPackages.find(p => p.slug === pmData.package_type);
                                    const pricePerMember = pkg?.price ?? 0;
                                    const total = pricePerMember * memberCount;
                                    return (
                                        <div className="bg-violet-50 dark:bg-violet-950/20 rounded-2xl border border-violet-100 dark:border-violet-900/40 p-5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-3">Preview Kalkulasi Invoice</p>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Harga per anggota</span>
                                                    <span className="font-black text-gray-900 dark:text-white">Rp {pricePerMember.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Jumlah anggota</span>
                                                    <span className="font-black text-gray-900 dark:text-white">{memberCount} orang</span>
                                                </div>
                                                <div className="h-px bg-violet-100 dark:bg-violet-900/40 my-2" />
                                                <div className="flex justify-between items-center">
                                                    <span className="font-black text-violet-700 dark:text-violet-300 uppercase tracking-wide text-xs">Total Invoice</span>
                                                    <span className="font-black text-lg text-violet-700 dark:text-violet-300">Rp {total.toLocaleString('id-ID')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Pilih Metode Pembayaran */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 mb-3">
                                        Metode Pembayaran <span className="text-rose-500">*</span>
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {paymentMethods.map((method) => {
                                            const isCash = method === 'Cash';
                                            const Icon   = isCash ? Banknote : CreditCard;
                                            const desc   = isCash
                                                ? 'Pembayaran tunai langsung di klinik.'
                                                : 'Transfer ke rekening klinik, bukti dikirim via WhatsApp/email.';
                                            const selected = pmData.payment_method === method;
                                            return (
                                                <label key={method} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selected ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300'}`}>
                                                    <input type="radio" className="hidden" name="payment_method" value={method} checked={selected} onChange={() => setPmData('payment_method', method)} />
                                                    <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selected ? 'text-white' : 'text-indigo-500'}`} />
                                                    <div>
                                                        <p className={`text-sm font-black uppercase tracking-widest ${selected ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>{method}</p>
                                                        <p className={`text-[10px] font-medium mt-0.5 leading-relaxed ${selected ? 'text-white/80' : 'text-gray-400'}`}>{desc}</p>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {pmErrors.payment_method && <p className="text-xs text-rose-500 font-bold mt-2">{pmErrors.payment_method}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={pmProcessing || !pmData.payment_method || !pmData.package_type}
                                        className="flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        {(group.payment_method || group.package_type) ? 'Perbarui Paket & Metode' : 'Simpan Paket & Metode Pembayaran'}
                                    </button>
                                </div>
                            </form>
                            </div>
                        )}
                    </div>


                    {/* ─── Daftar Anggota (CRUD) ────────────────────────── */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">Daftar Anggota</h3>
                                    <p className="text-[10px] text-gray-400 font-medium">{memberCount} anggota terdaftar</p>
                                </div>
                            </div>
                            <Link
                                href={route('admin.group-bookings.members.add', group.id)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Tambah
                            </Link>
                        </div>

                        {memberCount === 0 ? (
                            <div className="text-center py-16">
                                <Users className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Belum ada anggota</p>
                                <Link
                                    href={route('admin.group-bookings.members.add', group.id)}
                                    className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Tambah Anggota Pertama
                                </Link>
                            </div>
                        ) : (
                            <div className="w-full overflow-x-auto md:overflow-visible pb-12">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                                            {['#', 'Nama & Email', 'Kelengkapan Profil', 'Status Booking', 'Aksi'].map((h) => (
                                                <th key={h} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {group.members.map((member, i) => {
                                            const pct = member.user?.profile_completion?.percentage ?? null;
                                            const complete = member.user?.profile_completion?.is_complete ?? false;
                                            const bookingStatus = member.booking?.status ?? null;
                                            return (
                                                <tr key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors group">
                                                    <td className="px-6 py-4 text-xs font-black text-gray-400">{i + 1}</td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                            {member.user?.name ?? '-'}
                                                        </p>
                                                        <p className="text-[10px] text-gray-400 mt-0.5">{member.user?.email ?? '-'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <ProfileCompletionBadge completion={member.user?.profile_completion} />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {bookingStatus ? (
                                                            <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                                bookingStatus === 'confirmed'
                                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                                    : bookingStatus === 'pending_payment'
                                                                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                                                            }`}>
                                                                {bookingStatus === 'confirmed' ? '✅ Terkonfirmasi'
                                                                    : bookingStatus === 'pending_payment' ? '⏳ Menunggu'
                                                                        : bookingStatus}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-400">Belum booking</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1.5">
                                                            {/* Lihat detail user */}
                                                            <Link
                                                                href={route('admin.users.show', member.user_id)}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all outline-none"
                                                                title="Lihat Detail User"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                            
                                                            {/* Edit profil */}
                                                            <Link
                                                                href={route('admin.users.edit', member.user_id)}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all outline-none"
                                                                title="Lengkapi/Edit Profil"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Link>

                                                            {/* Hapus dari grup */}
                                                            <button
                                                                onClick={() => handleRemoveMember(member.id)}
                                                                disabled={group.payment_status === 'paid'}
                                                                className={`p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all outline-none ${
                                                                    group.payment_status === 'paid'
                                                                        ? 'opacity-30 cursor-not-allowed text-gray-300'
                                                                        : 'text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:scale-110 active:scale-95'
                                                                }`}
                                                                title={group.payment_status === 'paid' ? 'Tidak bisa hapus anggota dari grup yang sudah lunas' : 'Hapus dari Grup'}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    {memberCount > 0 && (
                                        <tfoot>
                                            <tr className="border-t-2 border-indigo-100 dark:border-indigo-900/40">
                                                <td colSpan={3} className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">
                                                    Total Tagihan Grup
                                                </td>
                                                <td colSpan={2} className="px-6 py-4 text-sm font-black text-indigo-700 dark:text-indigo-400">
                                                    {formatCurrency(group.total_amount)}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
