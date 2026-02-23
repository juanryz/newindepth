import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ErrorBoundary from './ErrorBoundary';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, ShieldCheck, Heart, Activity, Clock, CreditCard,
    ChevronRight, AlertTriangle, FileText, Calendar,
    Phone, Mail, CheckCircle2, ChevronLeft, ExternalLink,
    Fingerprint, MapPin, Clipboard
} from 'lucide-react';

function InnerUserShow({ userModel, bookings = [], transactions = [], schedules = [], screeningResults = [], profileCompletion, courseTransactions = [] }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedCourseAgreement, setSelectedCourseAgreement] = useState(null);

    const isPatient = userModel.roles.some(r => r.name === 'patient');
    const isTherapist = userModel.roles.some(r => r.name === 'therapist');

    const completionRate = profileCompletion?.percentage || 0;
    const ktpDocumentPath = userModel.ktp_photo;
    const latestScreening = screeningResults[0];
    const isAgreementSigned = !!userModel.agreement_signed_at;
    const isAffiliateSigned = !!userModel.affiliate_agreement_signed_at;

    const tabs = [
        { id: 'summary', label: 'Ringkasan', icon: Activity },
        { id: 'legal', label: 'S&K', icon: ShieldCheck },
        { id: 'screening', label: 'Skrining', icon: Heart },
        { id: 'sessions', label: 'Sesi', icon: Clock },
        { id: 'financial', label: 'Transaksi', icon: CreditCard },
    ];

    if (isTherapist) {
        tabs.push({ id: 'schedules', label: 'Jadwal Praktek', icon: Calendar });
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.users.index')}
                        className="p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white leading-tight">Detail User</h2>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">Manajemen Pengguna</p>
                    </div>
                </div>
            }
        >
            <Head title={`User: ${userModel.name}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                    {/* Header Section */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="md:flex">
                            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/30 text-4xl font-black uppercase">
                                        {userModel.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 border-indigo-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-black text-center leading-tight">{userModel.name}</h1>
                                <p className="text-indigo-100 text-sm font-medium mt-1">{userModel.email}</p>
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                    {userModel.roles.map(role => (
                                        <span key={role.id} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10">
                                            {role.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Kontak & Info</p>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span className="text-sm font-bold">{userModel.phone || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 py-1">
                                        <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span className="text-sm font-bold">{userModel.screening_answers?.usia || userModel.age || '-'} Tahun</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Fingerprint className="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span className="text-sm font-bold capitalize">{userModel.screening_answers?.gender || userModel.gender || '-'}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Progrest Profil</p>
                                    <div className="flex items-end gap-2 mb-1">
                                        <span className={`text-3xl font-black ${completionRate === 100 ? 'text-emerald-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                                            {completionRate}%
                                        </span>
                                        <span className="text-[10px] font-black text-gray-400 mb-1.5 uppercase">Kelengkapan</span>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${completionRate}%` }}
                                            className={`h-full ${completionRate === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Referral & Afiliasi</p>
                                    <div className="space-y-2 pt-1">
                                        {userModel.referral_code && (
                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">CODE: <span className="text-indigo-600 font-mono tracking-wider">{userModel.referral_code}</span></p>
                                        )}
                                        {userModel.affiliate_ref && (
                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">REF: <span className="text-emerald-600">{userModel.affiliate_ref}</span></p>
                                        )}
                                        <p className="text-[10px] font-bold text-gray-400">JOIN: {new Date(userModel.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content with Tabs */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Tab Navigation */}
                        <div className="lg:w-72 flex-shrink-0 space-y-4">
                            <div className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1'
                                            : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                            }`}
                                    >
                                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-indigo-500'}`} />
                                        {tab.label}
                                        {activeTab === tab.id && <ChevronRight className="w-5 h-5 ml-auto opacity-50" />}
                                    </button>
                                ))}
                            </div>

                            {/* Emergency Contact Sidebar */}
                            <div className="bg-rose-50/50 dark:bg-rose-950/10 rounded-[2rem] border border-rose-100 dark:border-rose-900/30 p-6">
                                <h4 className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-rose-600 dark:text-rose-500 uppercase mb-4">
                                    <AlertTriangle className="w-4 h-4" /> Kontak Darurat
                                </h4>
                                {userModel.emergency_contact_name ? (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap</p>
                                            <p className="text-sm font-black text-gray-900 dark:text-white uppercase">{userModel.emergency_contact_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Hubungan</p>
                                            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{userModel.emergency_contact_relation || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Nomor HP</p>
                                            <a href={`tel:${userModel.emergency_contact_phone}`} className="text-sm font-black text-rose-600 dark:text-rose-400 hover:underline">
                                                {userModel.emergency_contact_phone}
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-xs font-bold text-gray-400 italic">Belum tersedia.</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-2">
                                <Link href={route('admin.users.edit', userModel.id)} className="w-full py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 transition-all text-[10px] shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" /> Edit Profil
                                </Link>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 min-w-0">
                            <AnimatePresence mode="wait">
                                {activeTab === 'summary' && (
                                    <motion.div
                                        key="summary"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                Ringkasan Profil & Bio
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Biodata Pribadi</p>
                                                        <div className="space-y-3">
                                                            {Object.entries(profileCompletion?.fields || {}).map(([key, data]) => (
                                                                <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100/50 dark:border-gray-700/30">
                                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{data.label}</span>
                                                                    {data.filled ? (
                                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                                    ) : (
                                                                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Biografi / Catatan</p>
                                                        <div className="p-5 rounded-[2rem] bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-800/20 min-h-[160px]">
                                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                                {userModel.bio ? `"${userModel.bio}"` : "Tidak ada biografi yang tersedia."}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {isTherapist && (
                                                        <div>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Spesialisasi</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(userModel.specialization || '').split(',').map((spec, i) => spec && (
                                                                    <span key={i} className="px-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 shadow-sm">
                                                                        {spec.trim()}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-6">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Dokumen Identitas (KTP)</p>
                                                    {ktpDocumentPath ? (
                                                        <div className="relative group rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                                            <img src={`/storage/${ktpDocumentPath}`} alt="KTP" className="w-full max-h-[200px] object-contain" />
                                                            <a href={`/storage/${ktpDocumentPath}`} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                                <span className="px-4 py-2 bg-white text-gray-900 rounded-full font-black text-[10px] uppercase tracking-widest">Detail</span>
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="h-[200px] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-900/30 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">
                                                            <FileText className="w-8 h-8 text-gray-200 mb-2" />
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Belum ada KTP</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'legal' && (
                                    <motion.div
                                        key="legal"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                                Persetujuan Layanan & Dokumen Hukum
                                            </h3>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 ml-4">Seluruh dokumen yang telah disetujui/ttd oleh pasien</p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Clinical Service Agreement */}
                                                <div className={`p-6 rounded-[2rem] border ${isAgreementSigned ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-800/50' : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700'}`}>
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div>
                                                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Perjanjian Klinis Utama</p>
                                                            <h4 className="font-black text-gray-900 dark:text-white uppercase leading-tight">Form Pernyataan Awal & Persetujuan Layanan</h4>
                                                            <p className="text-[9px] font-bold text-gray-400 mt-1">Termasuk: Surat Perjanjian Layanan Hipnoterapi & Kebijakan Non-Refund</p>
                                                        </div>
                                                        <ShieldCheck className={`w-8 h-8 ${isAgreementSigned ? 'text-emerald-500' : 'text-gray-200'}`} />
                                                    </div>

                                                    {isAgreementSigned ? (
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Dua Dokumen Disetujui</p>
                                                                    <p className="text-xs font-bold text-gray-500 font-mono italic">
                                                                        {new Date(userModel.agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {userModel.agreement_data?.signature_1 && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Doc 1: Pernyataan</p>
                                                                        <img src={userModel.agreement_data.signature_1} alt="Signature 1" className="h-10 w-full object-contain invert dark:invert-0" />
                                                                    </div>
                                                                )}
                                                                {userModel.digital_signature && (
                                                                    <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-100/50 dark:border-emerald-800/50">
                                                                        <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Doc 2: Perjanjian</p>
                                                                        <img src={userModel.digital_signature} alt="Signature 2" className="h-10 w-full object-contain invert dark:invert-0" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <a href={route('admin.users.agreement', userModel.id)} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                                                                Lihat Kedua Dokumen <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase">
                                                            <AlertTriangle className="w-4 h-4" /> Belum Disetujui
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Affiliate Agreement */}
                                                {(isAffiliateSigned || userModel.affiliate_ref) && (
                                                    <div className={`p-6 rounded-[2rem] border ${isAffiliateSigned ? 'bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-800/50' : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-700'}`}>
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Kemitraan</p>
                                                                <h4 className="font-black text-gray-900 dark:text-white uppercase leading-tight">PERJANJIAN MITRA AFFILIATE</h4>
                                                            </div>
                                                            <Fingerprint className={`w-8 h-8 ${isAffiliateSigned ? 'text-indigo-500' : 'text-gray-200'}`} />
                                                        </div>
                                                        {isAffiliateSigned ? (
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 bg-indigo-500 rounded-lg text-white">
                                                                        <CheckCircle2 className="w-4 h-4" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">Telah Disetujui Secara Digital</p>
                                                                        <p className="text-xs font-bold text-gray-500 font-mono italic">
                                                                            {new Date(userModel.affiliate_agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {userModel.affiliate_signature && (
                                                                    <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-indigo-100/50 dark:border-indigo-800/50">
                                                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Tanda Tangan Afiliasi</p>
                                                                        <img src={userModel.affiliate_signature} alt="Signature" className="h-16 object-contain invert dark:invert-0" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase">
                                                                <AlertTriangle className="w-4 h-4" /> Belum Disetujui
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Course Agreements */}
                                                {courseTransactions && courseTransactions.length > 0 && courseTransactions.map((tx) => tx.payment_agreement_data && (
                                                    <div key={`course-legal-${tx.id}`} className="p-6 rounded-[2rem] border bg-gray-50/30 dark:bg-gray-800/30 border-gray-100 dark:border-gray-700">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div>
                                                                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">E-Learning / Kelas</p>
                                                                <h4 className="font-black text-gray-900 dark:text-white uppercase leading-tight line-clamp-1">Agreement & Ketentuan Peserta Kelas: {tx.transactionable?.title || 'Course'}</h4>
                                                                <p className="text-[9px] font-bold text-gray-400 mt-1">Invoice: {tx.invoice_number}</p>
                                                            </div>
                                                            <Clipboard className="w-8 h-8 text-gray-200" />
                                                        </div>
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-emerald-500 rounded-lg text-white">
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Persetujuan Terdaftar</p>
                                                                <p className="text-[10px] font-bold text-gray-400 font-mono italic">{new Date(tx.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => setSelectedCourseAgreement({ tx, data: tx.payment_agreement_data })} className="w-full py-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 rounded-xl hover:shadow-md transition-all">
                                                            Lihat Detail S&K
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Disclaimer Non-Refund if no other specific agreement exists but we want to show it */}
                                            <div className="mt-8 p-6 rounded-[2rem] bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-100/50 dark:border-indigo-800/30">
                                                <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Informasi Tambahan</h4>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-1">KEBIJAKAN NON-REFUND</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                                    Seluruh transaksi di InDepth bersifat final dan tidak dapat dikembalikan sesuai kesepakatan pada Terms of Service yang disetujui pengguna saat akses pertama kali.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'screening' && (
                                    <motion.div
                                        key="screening"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8 flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
                                                Hasil Skrining Psikologis
                                            </h3>

                                            {latestScreening ? (
                                                <div className="space-y-8">
                                                    <div className="p-8 rounded-[2rem] bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/50 relative overflow-hidden">
                                                        <div className="relative z-10">
                                                            <h4 className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] mb-4">Analisis Diagnosa AI</h4>
                                                            <p className="text-xl font-black text-gray-900 dark:text-white leading-relaxed mb-6">
                                                                "{latestScreening.ai_summary || latestScreening.severity_label || 'Tidak ada ringkasan'}"
                                                            </p>
                                                            <div className="flex items-center gap-4">
                                                                <span className="px-4 py-1.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                                                                    {latestScreening.severity_label || 'Analyzed'}
                                                                </span>
                                                                <span className="text-xs font-bold text-gray-400">
                                                                    DIKIRIM: {new Date(latestScreening.completed_at || userModel.screening_completed_at).toLocaleString('id-ID', { dateStyle: 'long' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Activity className="absolute -right-8 -bottom-8 w-40 h-40 text-rose-500/5" />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* Detailed AI Analysis Fields */}
                                                        {latestScreening.step_data && (
                                                            <div className="p-6 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 space-y-4">
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2">
                                                                    <Clipboard className="w-3 h-3" /> Rekomendasi Paket & Treatment
                                                                </p>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <p className="text-[10px] font-black text-rose-500 uppercase">Paket yang Direkomendasikan</p>
                                                                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase mt-1">{latestScreening.recommended_package || userModel.recommended_package || '-'}</p>
                                                                    </div>
                                                                    {latestScreening.step_data.analysis && (
                                                                        <div>
                                                                            <p className="text-[10px] font-black text-indigo-500 uppercase mb-2">Analisis Mendalam</p>
                                                                            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-relaxed bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                                                                {latestScreening.step_data.analysis}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="p-6 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Metadata Skrining</p>
                                                            <div className="space-y-3">
                                                                <div className="flex justify-between text-xs font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
                                                                    <span className="text-gray-500 uppercase">Durasi Pengerjaan</span>
                                                                    <span className="text-gray-900 dark:text-white">~5-10 Menit</span>
                                                                </div>
                                                                <div className="flex justify-between text-xs font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
                                                                    <span className="text-gray-500 uppercase">Metode Analisis</span>
                                                                    <span className="text-gray-900 dark:text-white">InDepth AI v2.1</span>
                                                                </div>
                                                                <div className="flex justify-between text-xs font-bold">
                                                                    <span className="text-gray-500 uppercase">Tingkat Risiko</span>
                                                                    <span className={`font-black uppercase ${latestScreening.is_high_risk ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                                        {latestScreening.is_high_risk ? 'Tinggi' : 'Normal/Rendah'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {latestScreening.admin_notes && (
                                                                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                                                                    <p className="text-[10px] font-black text-rose-500 uppercase mb-2">Catatan Admin</p>
                                                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{latestScreening.admin_notes}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Full Chat History Preview if available */}
                                                    {latestScreening.chat_history && (
                                                        <div className="p-8 bg-gray-50/30 dark:bg-gray-900/40 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                                                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Log Percakapan Skrining</h4>
                                                            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                                                {latestScreening.chat_history.map((msg, i) => (
                                                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700'}`}>
                                                                            {msg.content}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">
                                                    <Heart className="w-12 h-12 text-gray-200 mb-4" />
                                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Belum ada data skrining yang tersedia</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'sessions' && (
                                    <motion.div
                                        key="sessions"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        {/* Riwayat Sesi */}
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                    Riwayat Sesi Klinis
                                                </h3>
                                                <span className="px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{bookings.length} Sesi</span>
                                            </div>
                                            <div className="max-h-[600px] overflow-y-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
                                                        <tr>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu & Sesi</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Praktisi/Pasien</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                        {bookings.map((booking) => {
                                                            const d = booking.schedule ? new Date(`${booking.schedule.date.replace(/-/g, '/')} ${booking.schedule.start_time}`) : null;
                                                            return (
                                                                <tr key={booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                                                    <td className="px-8 py-6">
                                                                        <p className="text-sm font-black text-gray-900 dark:text-white">
                                                                            {d && !isNaN(d.getTime()) ? d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                                                                        </p>
                                                                        <p className="text-[10px] text-indigo-600 font-black uppercase mt-0.5">#{booking.booking_code}</p>
                                                                    </td>
                                                                    <td className="px-8 py-6">
                                                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                                                            {isPatient ? (booking.therapist?.name || '-') : (booking.patient?.name || '-')}
                                                                        </p>
                                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${booking.status === 'completed' ? 'text-emerald-600 bg-emerald-50' : 'text-indigo-600 bg-indigo-50'}`}>
                                                                            {booking.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-8 py-6 text-right">
                                                                        <button onClick={() => setSelectedBooking(booking)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all group">
                                                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                {bookings.length === 0 && <div className="p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic">Belum ada riwayat sesi.</div>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'financial' && (
                                    <motion.div
                                        key="financial"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        {/* Transaksi & Keuangan */}
                                        <div className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm">
                                            <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-emerald-50/30 dark:bg-emerald-950/20">
                                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                                                    Log Transaksi Keuangan
                                                </h3>
                                                <span className="px-4 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{transactions.length} Transaksi</span>
                                            </div>
                                            <div className="max-h-[600px] overflow-y-auto">
                                                <table className="w-full text-left">
                                                    <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
                                                        <tr>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nominal & Invoice</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Metadata</th>
                                                            <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                        {transactions.map(tx => (
                                                            <tr key={tx.id} className="hover:bg-emerald-50/20 dark:hover:bg-emerald-900/10 transition-colors">
                                                                <td className="px-8 py-6">
                                                                    <p className="text-sm font-black text-gray-900 dark:text-white">
                                                                        Rp {new Intl.NumberFormat('id-ID').format(tx.amount)}
                                                                    </p>
                                                                    <p className="text-[10px] text-gray-500 uppercase font-black">{tx.invoice_number}</p>
                                                                </td>
                                                                <td className="px-8 py-6">
                                                                    <div className="text-[10px] font-bold text-gray-500 space-y-1">
                                                                        <p className="uppercase">{tx.payment_method || 'MANUAL'}</p>
                                                                        <p className="font-mono">{new Date(tx.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-8 py-6 text-right">
                                                                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-600' :
                                                                        tx.status === 'rejected' ? 'bg-rose-500/10 text-rose-600' : 'bg-amber-500/10 text-amber-600'
                                                                        }`}>
                                                                        {tx.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {transactions.length === 0 && <div className="p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic">Belum ada catatan transaksi.</div>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'schedules' && isTherapist && (
                                    <motion.div
                                        key="schedules"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm"
                                    >
                                        <div className="p-8 border-b border-gray-50 dark:border-gray-700/50 flex justify-between items-center bg-gray-50/30 dark:bg-gray-900/20">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                Slot Jadwal Terbuka
                                            </h3>
                                        </div>
                                        <div className="max-h-[600px] overflow-y-auto">
                                            <table className="w-full text-left">
                                                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10">
                                                    <tr>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tanggal</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu (WIB)</th>
                                                        <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Utilisasi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                                    {schedules.map(sch => (
                                                        <tr key={sch.id} className="hover:bg-indigo-50/10 transition-colors">
                                                            <td className="px-8 py-6 text-sm font-black text-gray-900 dark:text-white uppercase">
                                                                {new Date(sch.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' })}
                                                            </td>
                                                            <td className="px-8 py-6 text-sm font-bold text-gray-500">
                                                                {sch.start_time.substring(0, 5)} - {sch.end_time.substring(0, 5)}
                                                            </td>
                                                            <td className="px-8 py-6 text-right">
                                                                <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg border ${sch.booked_count >= sch.quota ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                                                                    {sch.booked_count} / {sch.quota}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {schedules.length === 0 && <div className="p-12 text-center text-gray-400 font-bold uppercase text-xs tracking-widest italic">Belum ada slot jadwal.</div>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Booking Detail Modal */}
                    <Modal show={!!selectedBooking} onClose={() => setSelectedBooking(null)} maxWidth="2xl">
                        {selectedBooking && (
                            <div className="p-8 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase leading-tight">Detail Sesi #{selectedBooking.booking_code}</h3>
                                        <p className="text-sm font-bold text-indigo-600 mt-1 uppercase tracking-widest">Informasi Sesi Klinis</p>
                                    </div>
                                    <button onClick={() => setSelectedBooking(null)} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl hover:text-rose-500 transition-colors">
                                        <ShieldCheck className="w-6 h-6 rotate-45" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-gray-100 dark:border-gray-700/50">
                                    {[
                                        { label: isTherapist ? 'Pasien' : 'Praktisi', value: isTherapist ? selectedBooking.patient?.name : selectedBooking.therapist?.name },
                                        { label: 'Paket Layanan', value: selectedBooking.package_type || 'Hipnoterapi', capitalize: true },
                                        { label: 'Status Sesi', value: selectedBooking.status, badge: true },
                                        { label: 'Waktu Sesi', value: selectedBooking.schedule ? `${new Date(selectedBooking.schedule.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })} ${selectedBooking.schedule.start_time.substring(0, 5)} WIB` : '-' }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                                            {item.badge ? (
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase inline-block ${item.value === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-indigo-500/10 text-indigo-600'}`}>
                                                    {item.value}
                                                </span>
                                            ) : (
                                                <p className={`text-sm font-black text-gray-900 dark:text-white ${item.capitalize ? 'capitalize' : ''}`}>{item.value || '-'}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                                <Clipboard className="w-4 h-4" /> Catatan Internal
                                            </p>
                                            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-5 min-h-[120px]">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                    {selectedBooking.therapist_notes ? `"${selectedBooking.therapist_notes}"` : "Belum ada catatan."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                                <User className="w-4 h-4" /> Catatan Pasien
                                            </p>
                                            <div className="bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-800/30 rounded-2xl p-5 min-h-[120px]">
                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                                    {selectedBooking.patient_visible_notes ? `"${selectedBooking.patient_visible_notes}"` : "Belum ada catatan terlihat."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedBooking.recording_link && (
                                        <div className="pt-4">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-3">Rekaman Dokumentasi</p>
                                            <a href={selectedBooking.recording_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-[2rem] shadow-xl shadow-indigo-600/20 group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                                        <Activity className="w-6 h-6 animate-pulse" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black uppercase tracking-tighter opacity-80">Video Rekaman Sesi</p>
                                                        <p className="text-sm font-black whitespace-nowrap">Play Session Documentation</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <SecondaryButton onClick={() => setSelectedBooking(null)} className="!rounded-xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest">Tutup</SecondaryButton>
                                </div>
                            </div>
                        )}
                    </Modal>

                    {/* Course Agreement Modal */}
                    <Modal show={selectedCourseAgreement !== null} onClose={() => setSelectedCourseAgreement(null)} maxWidth="lg">
                        <div className="p-8">
                            <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Persetujuan Course</h2>
                            <p className="text-xs text-indigo-600 font-black uppercase mb-8">{selectedCourseAgreement?.tx?.transactionable?.title}</p>

                            <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {selectedCourseAgreement?.data && Object.entries(selectedCourseAgreement.data).map(([key, value]) => {
                                    if (key === 'signature') return null;
                                    return (
                                        <div key={key} className="p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 flex items-start gap-4">
                                            <div className="mt-0.5 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{value === true ? 'Setuju' : (value || '-')}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700/50">
                                <SecondaryButton onClick={() => setSelectedCourseAgreement(null)} className="!rounded-xl !px-6 !py-3 !text-[10px] !font-black !uppercase !tracking-widest">Tutup</SecondaryButton>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default function UserShow(props) {
    return (
        <ErrorBoundary>
            <InnerUserShow {...props} />
        </ErrorBoundary>
    );
}

