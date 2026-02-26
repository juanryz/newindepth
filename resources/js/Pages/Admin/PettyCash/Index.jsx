import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    ArrowUpCircle,
    ArrowDownCircle,
    CheckCircle2,
    XCircle,
    History,
    Plus,
    FileText,
    Image as ImageIcon,
    AlertCircle,
    ChevronRight,
    Zap,
    Scale
} from 'lucide-react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

export default function PettyCashIndex({ proposals, currentBalance, userRole, auth }) {
    const [activeTab, setActiveTab] = useState('all');
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isProofModalOpen, setIsProofModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [selectedProof, setSelectedProof] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const isSantaMaria = userRole.includes('santa_maria') || userRole.includes('super_admin');

    const { data: proposalData, setData: setProposalData, post: postProposal, processing: processingProposal, reset: resetProposal, errors: proposalErrors } = useForm({
        type: 'spending',
        title: '',
        description: '',
        amount: '',
    });

    const { data: approveData, setData: setApproveData, post: postApprove, processing: processingApprove, reset: resetApprove } = useForm({
        transfer_proof: null,
    });

    const { data: rejectData, setData: setRejectData, post: postReject, processing: processingReject, reset: resetReject, errors: rejectErrors } = useForm({
        rejection_reason: '',
    });

    const { data: proofData, setData: setProofData, post: postProof, processing: processingProof, reset: resetProof, errors: proofErrors } = useForm({
        amount_spent: '',
        description: '',
        receipt: null,
    });

    const submitProposal = (e) => {
        e.preventDefault();
        postProposal(route('admin.petty-cash.proposals.store'), {
            onSuccess: () => {
                resetProposal();
                setIsProposalModalOpen(false);
            }
        });
    };

    const handleApprove = (proposal) => {
        setSelectedProposal(proposal);
        if (proposal.type === 'funding') {
            setIsApproveModalOpen(true);
        } else {
            router.post(route('admin.petty-cash.proposals.approve', proposal.id));
        }
    };

    const submitApproveFunding = (e) => {
        e.preventDefault();
        postApprove(route('admin.petty-cash.proposals.approve', selectedProposal.id), {
            onSuccess: () => {
                setIsApproveModalOpen(false);
                resetApprove();
            }
        });
    };

    const handleReject = (proposal) => {
        setSelectedProposal(proposal);
        setIsRejectModalOpen(true);
    };

    const submitReject = (e) => {
        e.preventDefault();
        postReject(route('admin.petty-cash.proposals.reject', selectedProposal.id), {
            onSuccess: () => {
                setIsRejectModalOpen(false);
                resetReject();
            }
        });
    };

    const handleOpenProofModal = (proposal) => {
        setSelectedProposal(proposal);
        setIsProofModalOpen(true);
    };

    const submitProof = (e) => {
        e.preventDefault();
        postProof(route('admin.petty-cash.proofs.store', selectedProposal.id), {
            onSuccess: () => {
                setIsProofModalOpen(false);
                resetProof();
            }
        });
    };

    const approveProof = (proofId) => {
        router.post(route('admin.petty-cash.proofs.approve', proofId));
    };

    const rejectProof = (proofId) => {
        router.post(route('admin.petty-cash.proofs.reject', proofId));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'approved': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400';
            case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'rejected': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-2xl text-gray-800 dark:text-white leading-tight uppercase tracking-tight">Workflow Kas Kecil</h2>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Approval & Monitoring System</p>
                    </div>
                </div>
            }
        >
            <Head title="Petty Cash Workflow" />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 flex items-center justify-between overflow-hidden relative group">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Saldo Kas Kecil Saat Ini</p>
                                <h3 className="text-3xl font-black text-indigo-600 dark:text-indigo-400">Rp {currentBalance.toLocaleString('id-ID')}</h3>
                            </div>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl">
                                <Wallet className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-xl text-white flex items-center justify-between">
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight">Sistem Kas Terintegrasi</h4>
                                <p className="text-indigo-100/70 text-[11px] font-bold uppercase tracking-widest mt-1">Gunakan formulir ini untuk permohonan dana dan pengajuan belanja operasional.</p>
                            </div>
                            {!isSantaMaria && (
                                <button
                                    onClick={() => setIsProposalModalOpen(true)}
                                    className="px-8 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                                >
                                    Buat Pengajuan Baru
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filters & Tabs */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex bg-white dark:bg-gray-950 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
                            {[
                                { id: 'all', label: 'Semua Status' },
                                { id: 'pending', label: 'Menunggu' },
                                { id: 'approved', label: 'Disetujui' },
                                { id: 'completed', label: 'Selesai' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Proposals List */}
                    <div className="space-y-6">
                        {proposals.data.length === 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-dashed border-gray-200 dark:border-gray-800">
                                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                    <FileText className="w-10 h-10 text-gray-300" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-400 uppercase tracking-widest leading-none">Belum ada pengajuan kas kecil</h4>
                                <p className="text-xs text-gray-500 mt-2">Seluruh permohonan dana dan belanja akan tampil di sini.</p>
                            </div>
                        )}

                        {proposals.data.map((proposal) => (
                            <motion.div
                                layout
                                key={proposal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-900 rounded-[2.8rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="p-10">
                                    <div className="flex flex-col xl:flex-row justify-between gap-10">

                                        {/* Left Side: Info */}
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-4 rounded-3xl ${proposal.type === 'funding' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20'}`}>
                                                    {proposal.type === 'funding' ? <ArrowUpCircle className="w-8 h-8" /> : <ArrowDownCircle className="w-8 h-8" />}
                                                </div>
                                                <div>
                                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${proposal.type === 'funding' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {proposal.type === 'funding' ? 'Replenishment / Isi Saldo' : 'Spending / Belanja Operasional'}
                                                    </span>
                                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{proposal.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1 font-bold">Oleh: {proposal.user?.name} • {new Date(proposal.created_at).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 dark:bg-black/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-serif">
                                                    {proposal.description || "Tidak ada deskripsi tambahan."}
                                                </p>
                                            </div>

                                            {proposal.status === 'rejected' && (
                                                <div className="p-6 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl">
                                                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-2">
                                                        <AlertCircle className="w-4 h-4" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Alasan Penolakan:</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-rose-800 dark:text-rose-500">{proposal.rejection_reason}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side: Status & Actions */}
                                        <div className="xl:w-80 flex flex-col justify-between items-center xl:items-end gap-10">
                                            <div className="text-center xl:text-right">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nominal Dimohon</p>
                                                <h3 className={`text-4xl font-black ${proposal.type === 'funding' ? 'text-emerald-600' : 'text-rose-600'} dark:text-white`}>
                                                    Rp {parseFloat(proposal.amount).toLocaleString('id-ID')}
                                                </h3>
                                                <div className="mt-4 flex justify-center xl:justify-end">
                                                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(proposal.status)}`}>
                                                        {proposal.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-full space-y-3">
                                                {/* Requester Actions */}
                                                {!isSantaMaria && proposal.status === 'approved' && proposal.type === 'spending' && (
                                                    <button
                                                        onClick={() => handleOpenProofModal(proposal)}
                                                        className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Upload Bukti Belanja
                                                    </button>
                                                )}

                                                {/* Santa Maria Actions */}
                                                {isSantaMaria && proposal.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleApprove(proposal)}
                                                            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
                                                        >
                                                            Setujui
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(proposal)}
                                                            className="flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
                                                        >
                                                            Tolak
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Funding Transfer Proof View */}
                                                {proposal.type === 'funding' && proposal.transfer_proof && (
                                                    <button
                                                        onClick={() => setPreviewImage(`/storage/${proposal.transfer_proof}`)}
                                                        className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                                    >
                                                        <ImageIcon className="w-4 h-4" />
                                                        Lihat Bukti Transfer
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Proofs Section for Spending */}
                                    {proposal.type === 'spending' && proposal.proofs.length > 0 && (
                                        <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800">
                                            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Scale className="w-3 h-3 text-indigo-500" />
                                                Lampiran Bukti Penggunaan Dana ({proposal.proofs.length})
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {proposal.proofs.map((proof) => (
                                                    <div key={proof.id} className="bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 relative group overflow-hidden">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Nominal Nota</p>
                                                                <h6 className="text-xl font-black text-gray-900 dark:text-white">Rp {parseFloat(proof.amount_spent).toLocaleString('id-ID')}</h6>
                                                            </div>
                                                            <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusColor(proof.status)}`}>
                                                                {proof.status}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs font-bold text-gray-500 mb-4 line-clamp-2">{proof.description}</p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setPreviewImage(`/storage/${proof.receipt_path}`)}
                                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all"
                                                            >
                                                                <Eye className="w-3 h-3" /> Preview Nota
                                                            </button>
                                                            {isSantaMaria && proof.status === 'pending' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => approveProof(proof.id)}
                                                                        className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all"
                                                                        title="Setujui"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => rejectProof(proof.id)}
                                                                        className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
                                                                        title="Tolak"
                                                                    >
                                                                        <XCircle className="w-4 h-4" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Create Proposal Modal */}
            <Modal show={isProposalModalOpen} onClose={() => setIsProposalModalOpen(false)}>
                <form onSubmit={submitProposal} className="p-10 dark:bg-gray-900 rounded-[3rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight">Buat Pengajuan Kas Kecil</h2>

                    <div className="space-y-6">
                        <div className="flex bg-gray-50 dark:bg-black/20 p-2 rounded-2xl">
                            <button
                                type="button"
                                onClick={() => setProposalData('type', 'spending')}
                                className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === 'spending' ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-400'}`}
                            >
                                Pengajuan Belanja
                            </button>
                            <button
                                type="button"
                                onClick={() => setProposalData('type', 'funding')}
                                className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === 'funding' ? 'bg-emerald-600 text-white shadow-xl' : 'text-gray-400'}`}
                            >
                                Permohonan Dana (Replenishment)
                            </button>
                        </div>

                        <div>
                            <InputLabel value="Judul Pengajuan" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full !rounded-2xl"
                                value={proposalData.title}
                                onChange={e => setProposalData('title', e.target.value)}
                                placeholder="Misal: Belanja ATK Kantor Bulan Maret"
                            />
                            <InputError message={proposalErrors.title} />
                        </div>

                        <div>
                            <InputLabel value="Nominal Budget Dimohon" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400">Rp</span>
                                <TextInput
                                    type="number"
                                    className="w-full !rounded-2xl !pl-12"
                                    value={proposalData.amount}
                                    onChange={e => setProposalData('amount', e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <InputError message={proposalErrors.amount} />
                        </div>

                        <div>
                            <InputLabel value="Detail Keperluan" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <textarea
                                className="w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-indigo-500 focus:border-indigo-500 h-32"
                                value={proposalData.description}
                                onChange={e => setProposalData('description', e.target.value)}
                                placeholder="Jelaskan secara detail barang apa saja yang akan dibeli atau alasan pengisian dana..."
                            />
                            <InputError message={proposalErrors.description} />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <SecondaryButton onClick={() => setIsProposalModalOpen(false)} className="flex-1 justify-center !rounded-2xl !py-4 uppercase tracking-widest font-black text-[10px]">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingProposal}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Kirim Pengajuan
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Approve Funding Modal (Santa Maria only) */}
            <Modal show={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)}>
                <form onSubmit={submitApproveFunding} className="p-10 dark:bg-gray-900 rounded-[3rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Konfirmasi Pengiriman Dana</h2>
                    <p className="text-sm text-gray-500 mb-8 font-serif leading-relaxed">
                        Silakan unggah bukti transfer dana sebesar <span className="text-emerald-600 font-bold">Rp {parseFloat(selectedProposal?.amount || 0).toLocaleString('id-ID')}</span> untuk menyelesaikan pengisian Kas Kecil.
                    </p>

                    <div className="space-y-6">
                        <div className="relative group">
                            <InputLabel value="Upload Bukti Transfer (JPG/PNG)" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-sm font-bold text-gray-500 cursor-pointer hover:border-emerald-500 transition-all"
                                onChange={e => setApproveData('transfer_proof', e.target.files[0])}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <SecondaryButton onClick={() => setIsApproveModalOpen(false)} className="flex-1 justify-center !rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingApprove}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
                        >
                            Konfirmasi & Kirim
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Reject Modal */}
            <Modal show={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
                <form onSubmit={submitReject} className="p-10 dark:bg-gray-900 rounded-[3rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Tolak Pengajuan</h2>
                    <p className="text-sm text-gray-500 mb-8 font-serif">Berikan alasan mengapa pengajuan ini ditolak guna transparansi pelaporan.</p>

                    <div>
                        <InputLabel value="Alasan Penolakan" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                        <textarea
                            className="w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-rose-500 focus:border-rose-500 h-32"
                            value={rejectData.rejection_reason}
                            onChange={e => setRejectData('rejection_reason', e.target.value)}
                            required
                        />
                        <InputError message={rejectErrors.rejection_reason} />
                    </div>

                    <div className="mt-10 flex gap-4">
                        <SecondaryButton onClick={() => setIsRejectModalOpen(false)} className="flex-1 justify-center !rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingReject}
                            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
                        >
                            Tolak Selamanya
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Upload Proof Modal */}
            <Modal show={isProofModalOpen} onClose={() => setIsProofModalOpen(false)}>
                <form onSubmit={submitProof} className="p-10 dark:bg-gray-900 rounded-[3rem]">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight">Ketik & Upload Bukti Belanja</h2>

                    <div className="space-y-6">
                        <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-3xl mb-6">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Referensi Pengajuan:</p>
                            <h4 className="text-base font-bold text-gray-900 dark:text-white uppercase">{selectedProposal?.title}</h4>
                        </div>

                        <div>
                            <InputLabel value="Jumlah Sesuai Nota" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400">Rp</span>
                                <TextInput
                                    type="number"
                                    className="w-full !rounded-2xl !pl-12"
                                    value={proofData.amount_spent}
                                    onChange={e => setProofData('amount_spent', e.target.value)}
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <InputError message={proofErrors.amount_spent} />
                        </div>

                        <div>
                            <InputLabel value="Deskripsi Pembelian" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <TextInput
                                className="w-full !rounded-2xl"
                                value={proofData.description}
                                onChange={e => setProofData('description', e.target.value)}
                                placeholder="Misal: Beli Kertas A4 2 Rim & Tinta Printer"
                                required
                            />
                            <InputError message={proofErrors.description} />
                        </div>

                        <div>
                            <InputLabel value="Foto Nota / Kwitansi" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" />
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-4 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-bold text-gray-500"
                                onChange={e => setProofData('receipt', e.target.files[0])}
                                required
                            />
                            <InputError message={proofErrors.receipt} />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <SecondaryButton onClick={() => setIsProofModalOpen(false)} className="flex-1 justify-center !rounded-2xl">Batal</SecondaryButton>
                        <button
                            type="submit"
                            disabled={processingProof}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
                        >
                            Simpan & Kirim
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Image Preview Overlay */}
            <AnimatePresence>
                {previewImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-10 cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={previewImage}
                            className="max-h-full max-w-full rounded-2xl shadow-2xl object-contain shadow-white/5"
                            onClick={e => e.stopPropagation()}
                        />
                        <button className="absolute top-10 right-10 text-white hover:scale-125 transition-all">
                            <XCircle className="w-12 h-12" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}

const Eye = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
