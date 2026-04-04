import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    MapPin, Phone, Mail, Globe,
    ChevronLeft, Users, Building2, User,
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
export function InvoiceModal({ invoice, onClose, type = 'individual', bankAccounts: bankAccountsProp = [] }) {
    if (!invoice) return null;

    const { clinicInfo } = usePage().props;
    const bankAccounts = clinicInfo?.bankAccounts?.length ? clinicInfo.bankAccounts : bankAccountsProp;

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

    const [isDownloading, setIsDownloading] = useState(false);

    const downloadPDF = () => {
        setIsDownloading(true);
        const element = document.getElementById('invoice-print-area');
        
        const doDownload = () => {
            const opt = {
                margin: [10, 10, 10, 10], // top, left, bottom, right
                filename: `Invoice_${invoice.invoice_number}.pdf`,
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
        <div className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-10 pb-10 sm:pt-20 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl mt-auto mb-auto bg-clip-padding relative">
                {/* Print-friendly area */}
                <div id="invoice-print-area" className="p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-indigo-100">
                        <div>
                            <img src="/images/logo-color.png" alt="InDepth Logo" className="h-12 w-auto mb-2" />
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
                                    {clinicInfo?.phone && (
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Phone className="w-3 h-3 flex-shrink-0" />{clinicInfo.phone}
                                        </p>
                                    )}
                                    {clinicInfo?.email && (
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Mail className="w-3 h-3 flex-shrink-0" />{clinicInfo.email}
                                        </p>
                                    )}
                                    {clinicInfo?.website && (
                                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                            <Globe className="w-3 h-3 flex-shrink-0" />{clinicInfo.website}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">No. Invoice</p>
                            <p className="text-lg font-black text-indigo-700">{invoice.invoice_number}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{formatDate(invoice.created_at)}</p>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border mt-3 ${
                                invoice.payment_status === 'paid'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-amber-50 border-amber-200 text-amber-700'
                            }`}>
                                {statusLabel}
                            </div>
                        </div>
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
                                {invoice.group_name && (
                                    <div className="col-span-2 mt-1">
                                        <span className="text-gray-400 text-[10px] uppercase block">Grup</span>
                                        <div className="flex items-center gap-2 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                                            <Users className="w-3 h-3 text-indigo-600" />
                                            <p className="text-xs font-black text-indigo-800">{invoice.group_name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Data Grup</p>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div><span className="text-gray-400 text-[10px] uppercase">Nama Grup</span><p className="font-bold text-gray-900">{invoice.group_name}</p></div>
                                {invoice.email && <div><span className="text-gray-400 text-[10px] uppercase">Email</span><p className="font-bold text-gray-900">{invoice.email}</p></div>}
                                {invoice.phone && <div><span className="text-gray-400 text-[10px] uppercase">Telepon</span><p className="font-bold text-gray-900">{invoice.phone}</p></div>}
                                {invoice.invoice_number && <div><span className="text-gray-400 text-[10px] uppercase">No. Grup</span><p className="font-bold text-indigo-700">{invoice.invoice_number}</p></div>}
                            </div>
                            {invoice.address && <p className="text-xs text-gray-500 mt-3 flex items-start gap-1"><MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />{invoice.address}</p>}
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
                                    <>
                                        {invoice.schedule && (
                                            <tr className="border-b border-gray-100 bg-indigo-50/20">
                                                <td className="py-4 px-2" colSpan="2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-3 h-3 text-indigo-600" />
                                                        <p className="text-[10px] font-black uppercase text-indigo-800">Jadwal Grup Terkonfirmasi:</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 mt-1 ml-5">
                                                        {formatDate(invoice.schedule.date)} · {formatTime(invoice.schedule.start_time)} WIB · {invoice.schedule.therapist}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                        {(invoice.members || []).map((m, i) => (
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
                                        ))}
                                    </>
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

                    {invoice.payment_status === 'pending' && (!invoice.payment_method || invoice.payment_method === 'Transfer Bank') && !['Cash', 'Tunai', 'cash', 'tunai'].includes(invoice.payment_method) && bankAccounts.length > 0 && (
                        <div className="bg-blue-50/50 rounded-2xl p-5 mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Tujuan Transfer Bank
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {bankAccounts.map((b, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-black text-[10px]">{b.bank}</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-900">{b.holder}</p>
                                                <p className="text-sm font-mono font-black text-indigo-600">{b.account}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-[9px] text-gray-400 leading-relaxed">
                            Invoice ini diterbitkan secara elektronik oleh{' '}
                            <span className="font-bold text-indigo-600">{clinicInfo?.name || 'InDepth Mental Wellness'}</span>.
                            {invoice.created_by && ` Diinput oleh: ${invoice.created_by}.`}
                        </p>
                        {(clinicInfo?.phone || clinicInfo?.email) && (
                            <p className="text-[9px] text-gray-400 mt-1">
                                Hubungi kami: {[clinicInfo?.phone, clinicInfo?.email].filter(Boolean).join(' · ')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 p-6 border-t border-gray-100 no-print">
                    <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 ${isDownloading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                        <Download className="w-4 h-4" />
                        {isDownloading ? 'Memproses PDF...' : 'Download PDF'}
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
                    body * { visibility: hidden; }
                    #invoice-print-area, #invoice-print-area * { visibility: visible; }
                    #invoice-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white;
                    }
                    .no-print { display: none !important; }
                    .fixed { position: static !important; background: transparent !important; }
                    .bg-black\\/60 { background: transparent !important; }
                }
            `}</style>
        </div>,
        document.body
    );
}

export default InvoiceModal;
