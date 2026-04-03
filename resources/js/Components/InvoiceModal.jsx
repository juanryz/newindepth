import React, { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ChevronLeft, Users, Building2, Phone, Mail, MapPin, User,
    FileText, CreditCard, Check, ArrowRight, Trash2, Eye, Download,
    Plus, Printer, AlertTriangle, CheckCircle, Clock,
} from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

// ─── Shared: Section Card ─────────────────────────────────────────────────────
function Section({ icon: Icon, iconBg, iconColor, title, children }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800">
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

// ─── Invoice Modal ─────────────────────────────────────────────────────────────
export function InvoiceModal({ invoice, onClose, type = 'individual' }) {
    if (!invoice) return null;

    const formatDate = (d) => {
        if (!d) return '-';
        try {
            return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch { return d; }
    };
    const formatTime = (t) => t ? String(t).substring(0, 5) : '-';
    const formatCurrency = (n) => 'Rp ' + Number(n || 0).toLocaleString('id-ID');
    const statusLabel = invoice.payment_status === 'paid' ? '✅ LUNAS' : '⏳ MENUNGGU PEMBAYARAN';
    const statusColor = invoice.payment_status === 'paid' ? 'text-emerald-600' : 'text-amber-600';

    const printInvoice = () => window.print();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Print-friendly area */}
                <div id="invoice-print-area" className="p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-indigo-100">
                        <div>
                            <h1 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">InDepth Clinic</h1>
                            <p className="text-xs text-gray-500 font-medium mt-1">Hipnoterapi & Kesehatan Mental Profesional</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No. Invoice</p>
                            <p className="text-lg font-black text-indigo-700">{invoice.invoice_number}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{formatDate(invoice.created_at)}</p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border mb-6 ${
                        invoice.payment_status === 'paid'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                        {statusLabel}
                    </div>

                    {/* Patient/Group Info */}
                    {type === 'individual' ? (
                        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Data Pasien</p>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div><span className="text-gray-400 text-[10px] uppercase">Nama</span><p className="font-bold text-gray-900">{invoice.patient_name}</p></div>
                                <div><span className="text-gray-400 text-[10px] uppercase">Email</span><p className="font-bold text-gray-900">{invoice.patient_email}</p></div>
                                {invoice.patient_phone && <div><span className="text-gray-400 text-[10px] uppercase">Telepon</span><p className="font-bold text-gray-900">{invoice.patient_phone}</p></div>}
                                <div><span className="text-gray-400 text-[10px] uppercase">Kode Booking</span><p className="font-bold text-indigo-700">#{invoice.booking_code}</p></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Data Grup / Institusi</p>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div><span className="text-gray-400 text-[10px] uppercase">Nama Grup</span><p className="font-bold text-gray-900">{invoice.group_name}</p></div>
                                {invoice.institution_name && <div><span className="text-gray-400 text-[10px] uppercase">Institusi</span><p className="font-bold text-gray-900">{invoice.institution_name}</p></div>}
                                <div><span className="text-gray-400 text-[10px] uppercase">PIC</span><p className="font-bold text-gray-900">{invoice.pic_name}</p></div>
                                {invoice.pic_phone && <div><span className="text-gray-400 text-[10px] uppercase">Telepon PIC</span><p className="font-bold text-gray-900">{invoice.pic_phone}</p></div>}
                            </div>
                            {invoice.address && <p className="text-xs text-gray-500 mt-2">{invoice.address}</p>}
                        </div>
                    )}

                    {/* Services Table */}
                    <div className="mb-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Detail Layanan</p>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-2">Deskripsi</th>
                                    <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-2">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                {type === 'individual' ? (
                                    <tr className="border-b border-gray-50 py-2">
                                        <td className="py-3">
                                            <p className="font-bold text-gray-900">
                                                Sesi {invoice.session_type === 'online' ? '💻 Online' : '🏥 Offline'} — Paket {invoice.package_name}
                                            </p>
                                            {invoice.schedule && (
                                                <p className="text-[10px] text-gray-400 mt-1">
                                                    📅 {formatDate(invoice.schedule.date)} · 🕐 {formatTime(invoice.schedule.start_time)} WIB · Terapis: {invoice.schedule.therapist}
                                                </p>
                                            )}
                                        </td>
                                        <td className="py-3 text-right font-bold text-gray-900">{formatCurrency(invoice.amount)}</td>
                                    </tr>
                                ) : (
                                    (invoice.members || []).map((m, i) => (
                                        <tr key={i} className="border-b border-gray-50">
                                            <td className="py-3">
                                                <p className="font-bold text-gray-900">{m.name}</p>
                                                <p className="text-[10px] text-gray-400">Paket {m.package_type || '-'}</p>
                                                {m.schedule && (
                                                    <p className="text-[10px] text-gray-400">
                                                        📅 {formatDate(m.schedule.date)} · {formatTime(m.schedule.start_time)} WIB · {m.schedule.therapist}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="py-3 text-right font-bold text-gray-900">{formatCurrency(m.price)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-indigo-100">
                                    <td className="pt-4 font-black text-gray-900 uppercase tracking-wider text-sm">Total</td>
                                    <td className="pt-4 text-right font-black text-xl text-indigo-700">
                                        {type === 'individual' ? formatCurrency(invoice.amount) : formatCurrency(invoice.total_amount)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-indigo-50 rounded-2xl p-5 mb-6 flex flex-wrap gap-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Metode Bayar</p>
                            <p className="font-bold text-indigo-900">{invoice.payment_method || '-'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Status</p>
                            <p className={`font-black ${statusColor}`}>{statusLabel}</p>
                        </div>
                        {invoice.paid_at && (
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Tanggal Bayar</p>
                                <p className="font-bold text-indigo-900">{formatDate(invoice.paid_at)}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <p className="text-[9px] text-gray-400 text-center leading-relaxed">
                        Invoice ini diterbitkan secara elektronik oleh InDepth Clinic. Diinput oleh: {invoice.created_by}.
                        Hubungi kami jika ada pertanyaan.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-6 border-t border-gray-100 no-print">
                    <button
                        onClick={printInvoice}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                    >
                        <Printer className="w-4 h-4" />
                        Download / Print PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        Tutup
                    </button>
                </div>
            </div>

            {/* Print CSS */}
            <style>{`
                @media print {
                    body > * { display: none !important; }
                    .no-print { display: none !important; }
                    #invoice-print-area { display: block !important; }
                    .fixed { position: relative !important; background: white !important; }
                    .bg-black\\/60 { background: white !important; }
                }
            `}</style>
        </div>
    );
}

export default InvoiceModal;
