import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Plus, Users, Phone, Mail, MapPin,
    FileText, Trash2, CheckCircle, Clock,
    AlertTriangle, User, Calendar, Edit2,
    AlertCircle, ChevronRight, Eye,
    CheckCircle2, CreditCard,
} from 'lucide-react';
import { InvoiceModal } from '@/Components/InvoiceModal';

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

export default function GroupBookingsShow({ group, schedules = [], bookingPackages = [] }) {
    const { flash } = usePage().props;

    const formatDate = (d) => d
        ? new Date(d).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
        : '-';
    const formatTime = (t) => t ? String(t).substring(0, 5) : '-';

    const [selectedInvoice, setSelectedInvoice] = React.useState(null);
    const [isValidating, setIsValidating] = React.useState(null);

    const memberCount = group.members?.length ?? 0;

    // ── Remove Member ──────────────────────────────────────────────────────────
    const handleRemoveMember = (memberId) => {
        if (!confirm('Hapus anggota ini dari grup? Booking terkait juga akan dibatalkan.')) return;
        router.delete(route('admin.group-bookings.members.remove', {
            groupBooking: group.id,
            group_booking_member: memberId,
        }));
    };

    // ── Schedule for Group ─────────────────────────────────────────────────────
    const { data: schedForm, setData: setSchedForm, post: postSched, processing: schedProcessing, errors: schedErrors } = useForm({
        schedule_id:  group.schedule_id ?? '',
        package_type: group.package_type ?? '',
    });

    const scheduleLabel = (s) => {
        const ymd     = (s.date ?? '').slice(0, 10);
        const dateStr = ymd
            ? new Date(ymd + 'T12:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
            : '—';
        const avail = (s.quota ?? 0) - (s.confirmed_count ?? 0);
        return `${dateStr} · ${s.start_time?.slice(0, 5) ?? ''}–${s.end_time?.slice(0, 5) ?? ''} · ${s.therapist?.name ?? '—'} (${avail} slot)`;
    };

    const handleSaveSchedule = (e) => {
        e.preventDefault();
        postSched(route('admin.group-bookings.schedule.update', group.id));
    };

    const handleValidate = (txId) => {
        if (!confirm('Validasi pembayaran ini?')) return;
        setIsValidating(txId);
        router.post(route('admin.transactions.validate', txId), {}, {
            onFinish: () => setIsValidating(null),
        });
    };

    const handleReject = (txId) => {
        if (!confirm('Tolak pembayaran ini?')) return;
        router.post(route('admin.transactions.reject', txId));
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Anggota', value: `${memberCount} orang`, color: 'indigo' },
                            { label: 'Jadwal',        value: group.schedule ? `${formatDate(group.schedule.date)} ${formatTime(group.schedule.start_time)}` : '—', color: 'blue' },
                            { label: 'Paket',         value: group.package_type ?? '—', color: 'violet' },
                        ].map((s) => (
                            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-[1.75rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Info Grup + Konfigurasi Jadwal */}
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
                                { icon: Mail,     label: 'Email',    value: group.email },
                                { icon: Phone,    label: 'Telepon',  value: group.phone },
                                { icon: MapPin,   label: 'Alamat',   value: group.address },
                                { icon: FileText, label: 'Catatan',  value: group.notes },
                            ].filter((r) => r.value).map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</p>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{value}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Login info */}
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Login Grup</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Grup dapat login menggunakan email: <span className="font-black text-gray-700 dark:text-gray-200">{group.email}</span>
                                </p>
                            </div>
                        </div>

                        {/* Konfigurasi Jadwal */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 mb-6">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Konfirmasi Jadwal</p>
                            </div>

                            <form onSubmit={handleSaveSchedule} className="space-y-5">
                                {/* Pilih Paket */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Paket Layanan</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {bookingPackages.map((pkg) => {
                                            const sel = schedForm.package_type === pkg.slug;
                                            return (
                                                <label key={pkg.slug} className={`flex flex-col gap-1 p-3 rounded-xl border-2 cursor-pointer transition-all ${sel ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-300'}`}>
                                                    <input type="radio" className="hidden" name="package_type" value={pkg.slug} checked={sel} onChange={() => setSchedForm('package_type', pkg.slug)} />
                                                    <span className={`text-[10px] font-black uppercase tracking-wider ${sel ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{pkg.name}</span>
                                                    <span className={`text-xs font-black ${sel ? 'text-white/90' : 'text-violet-600 dark:text-violet-400'}`}>
                                                        Rp {pkg.price.toLocaleString('id-ID')}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {schedErrors.package_type && <p className="text-xs text-rose-500 font-bold mt-2">{schedErrors.package_type}</p>}
                                </div>

                                {/* Pilih Jadwal */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Pilih Jadwal</p>
                                    {schedules.length === 0 ? (
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs text-gray-400 font-medium text-center">
                                            Tidak ada jadwal tersedia saat ini
                                        </div>
                                    ) : (
                                        <select
                                            className="w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-white transition-all"
                                            value={schedForm.schedule_id}
                                            onChange={(e) => setSchedForm('schedule_id', e.target.value)}
                                        >
                                            <option value="">-- Belum Dipilih --</option>
                                            {schedules.map((s) => (
                                                <option key={s.id} value={s.id}>{scheduleLabel(s)}</option>
                                            ))}
                                        </select>
                                    )}
                                    {schedErrors.schedule_id && <p className="text-xs text-rose-500 font-bold mt-2">{schedErrors.schedule_id}</p>}
                                </div>

                                {group.schedule_id && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 font-bold">
                                        ✅ Jadwal terkonfirmasi: {formatDate(group.schedule?.date)} {formatTime(group.schedule?.start_time)} — {group.schedule?.therapist?.name ?? '—'}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={schedProcessing || !schedForm.schedule_id}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Calendar className="w-4 h-4" />
                                    {group.schedule_id ? 'Perbarui Jadwal' : 'Konfirmasi Jadwal'}
                                </button>

                                {memberCount > 0 && !group.schedule_id && (
                                    <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                        Pilih jadwal agar anggota bisa melanjutkan proses booking & pembayaran mandiri.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Daftar Anggota */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">Daftar Anggota</h3>
                                    <p className="text-[10px] text-gray-400 font-medium">{memberCount} anggota terdaftar · Setiap anggota bayar mandiri (8 langkah)</p>
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
                            <div className="w-full overflow-x-auto pb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                                            {['#', 'Nama & Email', 'Kelengkapan Profil', 'Status Booking', 'Pembayaran', 'Aksi'].map((h) => (
                                                <th key={h} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {group.members.map((member, i) => {
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
                                                                {bookingStatus === 'confirmed'      ? '✅ Terkonfirmasi'
                                                                    : bookingStatus === 'pending_payment' ? '⏳ Menunggu Bayar'
                                                                        : bookingStatus}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-400">Belum ada jadwal</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {member.booking?.transaction ? (
                                                            <div className="flex flex-col gap-2">
                                                                 <div className="flex flex-col gap-1.5">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                                                                            member.booking.transaction.status === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                                            member.booking.transaction.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                            'bg-rose-50 text-rose-600 border-rose-100'
                                                                        }`}>
                                                                            {member.booking.transaction.status === 'paid' ? 'Valid' :
                                                                             member.booking.transaction.status === 'pending' ? 'Menunggu' : 'Gagal'}
                                                                        </span>
                                                                        {member.booking.transaction.payment_proof && (
                                                                            <a href={`/storage/${member.booking.transaction.payment_proof}`} target="_blank" className="p-1 bg-gray-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors" title="Lihat Bukti">
                                                                                <FileText className="w-3 h-3" />
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                    
                                                                    {/* Bank Account Info */}
                                                                    {(member.booking.transaction.payment_account_number || member.booking.transaction.payment_agreement_data?.payment_account_number) && (
                                                                        <div className="flex flex-col text-[8px] font-bold text-gray-500 leading-tight">
                                                                            <span className="text-indigo-600 font-black">
                                                                                {member.booking.transaction.payment_account_number || member.booking.transaction.payment_agreement_data?.payment_account_number}
                                                                            </span>
                                                                            <span className="truncate max-w-[100px]">
                                                                                A.N. {member.booking.transaction.payment_account_name || member.booking.transaction.payment_agreement_data?.payment_account_name || '-'}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Validation Actions if pending */}
                                                                {member.booking.transaction.status === 'pending' && (
                                                                    <div className="flex gap-1">
                                                                        <button
                                                                            onClick={() => handleValidate(member.booking.transaction.id)}
                                                                            disabled={isValidating === member.booking.transaction.id}
                                                                            className="px-2 py-1 bg-emerald-600 text-white text-[8px] font-black uppercase rounded hover:bg-emerald-700 transition-all disabled:opacity-50"
                                                                        >
                                                                            Validasi
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleReject(member.booking.transaction.id)}
                                                                            className="px-2 py-1 bg-rose-600 text-white text-[8px] font-black uppercase rounded hover:bg-rose-700 transition-all"
                                                                        >
                                                                            Tolak
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-400">—</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <Link
                                                                href={route('admin.users.show', member.user_id)}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                title="Lihat Detail User"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                            <Link
                                                                href={route('admin.users.edit', member.user_id)}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                title="Edit Profil"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    const tx = member.booking?.transaction;
                                                                    if (!tx) return;
                                                                    setSelectedInvoice({
                                                                        ...tx,
                                                                        patient_name: member.user?.name,
                                                                        patient_email: member.user?.email,
                                                                        patient_phone: member.user?.phone,
                                                                        booking_code: member.booking?.booking_code,
                                                                        package_name: member.package_type,
                                                                        session_type: member.booking?.session_type ?? 'offline',
                                                                        schedule: member.booking?.schedule ? {
                                                                            date: member.booking.schedule.date,
                                                                            start_time: member.booking.schedule.start_time,
                                                                            therapist: member.booking.schedule.therapist?.name ?? 'InDepth'
                                                                        } : null,
                                                                        group_name: group.group_name,
                                                                    });
                                                                }}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all disabled:opacity-40"
                                                                title="Lihat Invoice"
                                                                disabled={!member.booking?.transaction}
                                                            >
                                                                <FileText className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleRemoveMember(member.id)}
                                                                className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:scale-110 active:scale-95 transition-all"
                                                                title="Hapus dari Grup"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Invoice Modal */}
            {selectedInvoice && (
                <InvoiceModal
                    invoice={selectedInvoice}
                    type="individual"
                    onClose={() => setSelectedInvoice(null)}
                    bankAccounts={usePage().props.clinicInfo?.bankAccounts ?? []}
                />
            )}
        </AuthenticatedLayout>
    );
}
