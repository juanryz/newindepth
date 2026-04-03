import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Plus, Users, Building2, Phone, Mail, MapPin,
    CreditCard, FileText, Trash2, CheckCircle, Clock, Banknote,
    Printer, Eye, AlertTriangle, User, Calendar,
} from 'lucide-react';
import { InvoiceModal } from '@/Components/InvoiceModal';

const statusConfig = {
    paid:    { label: 'Lunas', icon: CheckCircle, cls: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    pending: { label: 'Belum Lunas', icon: Clock, cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
};

export default function GroupBookingsShow({ group, invoiceData }) {
    const { flash } = usePage().props;
    const [showInvoice, setShowInvoice] = useState(false);
    const [payingUp, setPayingUp] = useState(false);

    const { data, setData, post, processing } = useForm({
        payment_status: group.payment_status,
        payment_method: group.payment_method,
    });

    const st = statusConfig[group.payment_status] ?? statusConfig.pending;
    const StatusIcon = st.icon;

    const formatDate = (d) => {
        if (!d) return '-';
        return new Date(d).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    };
    const formatTime = (t) => t ? String(t).substring(0, 5) : '-';
    const formatCurrency = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');

    const handleMarkPaid = () => {
        setPayingUp(false);
        router.post(route('admin.group-bookings.payment.update', group.id), {
            payment_status: 'paid',
            payment_method: group.payment_method,
        });
    };

    const handleRemoveMember = (memberId) => {
        if (!confirm('Hapus anggota ini dari grup? Booking yang terkait juga akan dibatalkan.')) return;
        router.delete(route('admin.group-bookings.members.remove', { groupBooking: group.id, member: memberId }));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.group-bookings.index')}
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
                        {invoiceData && (
                            <button
                                onClick={() => setShowInvoice(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all"
                            >
                                <Printer className="w-4 h-4" />
                                Invoice Grup
                            </button>
                        )}
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
                />
            )}

            <div className="py-8 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                    {flash?.success && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            {flash.error}
                        </div>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Anggota', value: group.members?.length ?? 0, suffix: 'orang', color: 'indigo' },
                            { label: 'Total Tagihan', value: formatCurrency(group.total_amount), color: 'blue' },
                            { label: 'Metode Bayar', value: group.payment_method, color: 'violet' },
                            { label: 'Status', value: st.label, color: group.payment_status === 'paid' ? 'emerald' : 'amber' },
                        ].map((s) => (
                            <div key={s.label} className={`bg-white dark:bg-gray-900 rounded-[1.75rem] p-5 border border-gray-100 dark:border-gray-800 shadow-sm`}>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                                <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Detail + Bayar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Info Grup */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">Informasi Grup</p>
                            {[
                                { icon: Building2, label: 'Institusi', value: group.institution_name },
                                { icon: MapPin, label: 'Alamat', value: group.address },
                                { icon: User, label: 'PIC', value: group.pic_name },
                                { icon: Phone, label: 'Telepon PIC', value: group.pic_phone },
                                { icon: Mail, label: 'Email PIC', value: group.pic_email },
                                { icon: FileText, label: 'Catatan', value: group.notes },
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
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-3 mb-6">Status Pembayaran</p>
                            <div className={`flex items-center gap-3 p-5 rounded-2xl mb-6 ${st.cls}`}>
                                <StatusIcon className="w-5 h-5" />
                                <div>
                                    <p className="text-xs font-black uppercase">{st.label}</p>
                                    <p className="text-[10px] font-medium">{formatCurrency(group.total_amount)}</p>
                                </div>
                            </div>

                            {group.payment_status === 'pending' && (group.members?.length ?? 0) > 0 && (
                                <button
                                    onClick={handleMarkPaid}
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-40"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Tandai Lunas & Konfirmasi Semua Booking
                                </button>
                            )}

                            {group.payment_status === 'paid' && group.paid_at && (
                                <p className="text-xs text-emerald-600 font-bold text-center">
                                    ✅ Dibayar pada {formatDate(group.paid_at)}
                                </p>
                            )}
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
                                    <p className="text-[10px] text-gray-400 font-medium">{group.members?.length ?? 0} anggota terdaftar</p>
                                </div>
                            </div>
                            <Link
                                href={route('admin.group-bookings.members.add', group.id)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Tambah
                            </Link>
                        </div>

                        {(group.members?.length ?? 0) === 0 ? (
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
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            {['#', 'Nama & Email', 'Paket', 'Jadwal Sesi', 'Harga', 'Aksi'].map((h) => (
                                                <th key={h} className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {group.members.map((member, i) => (
                                            <tr key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                                <td className="px-6 py-4 text-xs font-black text-gray-400">{i + 1}</td>
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-gray-900 dark:text-white">{member.user?.name ?? '-'}</p>
                                                    <p className="text-[10px] text-gray-400">{member.user?.email ?? '-'}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase rounded-full">
                                                        {member.package_type ?? '-'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {member.booking?.schedule ? (
                                                        <div>
                                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                                {formatDate(member.booking.schedule.date)}
                                                            </p>
                                                            <p className="text-[10px] text-gray-400">
                                                                {formatTime(member.booking.schedule.start_time)} WIB · {member.booking.schedule.therapist?.name ?? 'TBD'}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-400">Belum dijadwalkan</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                        {formatCurrency(member.price)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {group.payment_status === 'pending' && (
                                                        <button
                                                            onClick={() => handleRemoveMember(member.id)}
                                                            className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-indigo-100 dark:border-indigo-900/40">
                                            <td colSpan={4} className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wide">Total</td>
                                            <td className="px-6 py-4 text-sm font-black text-indigo-700 dark:text-indigo-400">{formatCurrency(group.total_amount)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
