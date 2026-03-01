import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DqAHi6I1.js";
import { useForm, Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, FileText, ArrowUpCircle, ArrowDownCircle, AlertCircle, CheckCircle2, Image, Scale, XCircle } from "lucide-react";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function PettyCashIndex({ proposals, currentBalance, userRole, auth, filters }) {
  const { user } = auth;
  const hasPermission = (permissionName) => {
    return user.roles?.some((r) => r.name === "super_admin") || user.permissions?.includes(permissionName);
  };
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [selectedProof, setSelectedProof] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const isSantaMaria = userRole.some(
    (role) => role.toLowerCase().replace(/_/g, " ") === "santa maria" || role.toLowerCase() === "santa_maria"
  );
  const { data: proposalData, setData: setProposalData, post: postProposal, processing: processingProposal, reset: resetProposal, errors: proposalErrors } = useForm({
    type: "spending",
    title: "",
    description: "",
    amount: ""
  });
  const { data: approveData, setData: setApproveData, post: postApprove, processing: processingApprove, reset: resetApprove, errors: approveErrors } = useForm({
    payment_method: "transfer",
    transfer_proof: null
  });
  const { data: rejectData, setData: setRejectData, post: postReject, processing: processingReject, reset: resetReject, errors: rejectErrors } = useForm({
    rejection_reason: ""
  });
  const { data: proofData, setData: setProofData, post: postProof, processing: processingProof, reset: resetProof, errors: proofErrors } = useForm({
    amount_spent: "",
    description: "",
    receipt: null
  });
  const submitProposal = (e) => {
    e.preventDefault();
    postProposal(route("admin.petty-cash.proposals.store"), {
      onSuccess: () => {
        resetProposal();
        setIsProposalModalOpen(false);
      }
    });
  };
  const handleApprove = (proposal) => {
    setSelectedProposal(proposal);
    if (proposal.type === "funding") {
      setIsApproveModalOpen(true);
    } else {
      router.post(route("admin.petty-cash.proposals.approve", proposal.id), {}, {
        preserveScroll: true
      });
    }
  };
  const submitApproveFunding = (e) => {
    e.preventDefault();
    postApprove(route("admin.petty-cash.proposals.approve", selectedProposal.id), {
      onSuccess: () => {
        setIsApproveModalOpen(false);
        resetApprove();
      },
      forceFormData: true,
      preserveScroll: true
    });
  };
  const handleReject = (proposal) => {
    setSelectedProposal(proposal);
    setIsRejectModalOpen(true);
  };
  const submitReject = (e) => {
    e.preventDefault();
    postReject(route("admin.petty-cash.proposals.reject", selectedProposal.id), {
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
    postProof(route("admin.petty-cash.proofs.store", selectedProposal.id), {
      onSuccess: () => {
        setIsProofModalOpen(false);
        resetProof();
      }
    });
  };
  const approveProof = (proofId) => {
    router.post(route("admin.petty-cash.proofs.approve", proofId));
  };
  const rejectProof = (proofId) => {
    router.post(route("admin.petty-cash.proofs.reject", proofId));
  };
  const activeTab = filters.status || "all";
  const handleTabChange = (status) => {
    router.get(route("admin.petty-cash.index"), { status }, {
      preserveState: true,
      preserveScroll: true
    });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "approved":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "rejected":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-2xl text-gray-800 dark:text-white leading-tight uppercase tracking-tight", children: isSantaMaria ? "Kas kecil eksternal" : "Kas kecil internal" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1", children: "Approval & Monitoring System" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Petty Cash Workflow" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl border border-white dark:border-gray-800 flex items-center justify-between overflow-hidden relative group", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -right-8 -top-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2", children: [
                  "Saldo ",
                  isSantaMaria ? "Kas kecil eksternal" : "Kas kecil internal"
                ] }),
                /* @__PURE__ */ jsxs("h3", { className: "text-3xl font-black text-indigo-600 dark:text-indigo-400", children: [
                  "Rp ",
                  currentBalance.toLocaleString("id-ID")
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl", children: /* @__PURE__ */ jsx(Wallet, { className: "w-8 h-8 text-indigo-600 dark:text-indigo-400" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-xl text-white flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h4", { className: "text-xl font-black uppercase tracking-tight", children: "Sistem Kas Terintegrasi" }),
                /* @__PURE__ */ jsx("p", { className: "text-indigo-100/70 text-[11px] font-bold uppercase tracking-widest mt-1", children: "Gunakan formulir ini untuk permohonan dana dan pengajuan belanja operasional." })
              ] }),
              hasPermission("create petty_cash") && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsProposalModalOpen(true),
                  className: "px-8 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all",
                  children: "Buat Pengajuan Baru"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "flex bg-white dark:bg-gray-950 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800", children: [
            { id: "all", label: "Semua Status" },
            { id: "pending", label: "Menunggu" },
            { id: "approved", label: "Disetujui" },
            { id: "completed", label: "Selesai" },
            { id: "rejected", label: "Ditolak" }
          ].map((tab) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTabChange(tab.id),
              className: `px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`,
              children: tab.label
            },
            tab.id
          )) }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            proposals.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-20 text-center border border-dashed border-gray-200 dark:border-gray-800", children: [
              /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-50 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-gray-300" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-gray-400 uppercase tracking-widest leading-none", children: "Belum ada pengajuan kas kecil" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Seluruh permohonan dana dan belanja akan tampil di sini." })
            ] }),
            proposals.data.map((proposal) => /* @__PURE__ */ jsx(
              motion.div,
              {
                layout: true,
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                className: "bg-white dark:bg-gray-900 rounded-[2.8rem] shadow-xl border border-white dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500",
                children: /* @__PURE__ */ jsxs("div", { className: "p-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col xl:flex-row justify-between gap-10", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-6", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx("div", { className: `p-4 rounded-3xl ${proposal.type === "funding" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" : "bg-rose-50 text-rose-600 dark:bg-rose-900/20"}`, children: proposal.type === "funding" ? /* @__PURE__ */ jsx(ArrowUpCircle, { className: "w-8 h-8" }) : /* @__PURE__ */ jsx(ArrowDownCircle, { className: "w-8 h-8" }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black uppercase tracking-[0.2em] ${proposal.type === "funding" ? "text-emerald-500" : "text-rose-500"}`, children: proposal.type === "funding" ? "Isi Saldo (In)" : "Belanja Operasional (Out)" }),
                          /* @__PURE__ */ jsx("h4", { className: "text-2xl font-black text-gray-900 dark:text-white tracking-tight", children: proposal.title }),
                          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1 font-bold flex items-center flex-wrap gap-y-1", children: [
                            /* @__PURE__ */ jsxs("span", { children: [
                              "Oleh: ",
                              proposal.user?.name
                            ] }),
                            proposal.approver && /* @__PURE__ */ jsxs("span", { className: `ml-2 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${proposal.status === "rejected" ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"}`, children: [
                              proposal.status === "rejected" ? "Ditolak" : "Disetujui",
                              ": ",
                              proposal.approver.name
                            ] }),
                            /* @__PURE__ */ jsxs("span", { className: "ml-2", children: [
                              "• ",
                              new Date(proposal.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })
                            ] })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-black/20 p-6 rounded-3xl border border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-serif", children: proposal.description || "Tidak ada deskripsi tambahan." }) }),
                      proposal.status === "rejected" && /* @__PURE__ */ jsxs("div", { className: "p-6 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-2", children: [
                          /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "Alasan Penolakan:" })
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-rose-800 dark:text-rose-500", children: proposal.rejection_reason })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "xl:w-80 flex flex-col justify-between items-center xl:items-end gap-10", children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-center xl:text-right", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1", children: "Nominal Dimohon" }),
                        /* @__PURE__ */ jsxs("h3", { className: `text-4xl font-black ${proposal.type === "funding" ? "text-emerald-600" : "text-rose-600"} dark:text-white`, children: [
                          "Rp ",
                          parseFloat(proposal.amount).toLocaleString("id-ID")
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center xl:justify-end", children: /* @__PURE__ */ jsx("span", { className: `px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(proposal.status)}`, children: proposal.status === "pending" ? "Menunggu" : proposal.status === "approved" ? "Disetujui" : proposal.status === "completed" ? "Selesai" : proposal.status === "rejected" ? "Ditolak" : proposal.status }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-3", children: [
                        !isSantaMaria && proposal.status === "approved" && proposal.type === "spending" && /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => handleOpenProofModal(proposal),
                            className: "w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95",
                            children: [
                              /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
                              "Upload Bukti Belanja"
                            ]
                          }
                        ),
                        isSantaMaria && proposal.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => handleApprove(proposal),
                              className: "flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                              children: "Setujui"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => handleReject(proposal),
                              className: "flex-1 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                              children: "Tolak"
                            }
                          )
                        ] }),
                        proposal.type === "funding" && proposal.transfer_proof && /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => setPreviewImage(`/storage/${proposal.transfer_proof}`),
                            className: "w-full flex items-center justify-center gap-2 py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            children: [
                              /* @__PURE__ */ jsx(Image, { className: "w-4 h-4" }),
                              "Lihat Bukti Transfer"
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  proposal.type === "spending" && proposal.proofs.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10 pt-10 border-t border-gray-100 dark:border-gray-800", children: [
                    /* @__PURE__ */ jsxs("h5", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Scale, { className: "w-3 h-3 text-indigo-500" }),
                      "Lampiran Bukti Penggunaan Dana (",
                      proposal.proofs.length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: proposal.proofs.map((proof) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 relative group overflow-hidden", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1", children: "Nominal Nota" }),
                          /* @__PURE__ */ jsxs("h6", { className: "text-xl font-black text-gray-900 dark:text-white", children: [
                            "Rp ",
                            parseFloat(proof.amount_spent).toLocaleString("id-ID")
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: `px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusColor(proof.status)}`, children: [
                          proof.status === "pending" ? "Menunggu" : proof.status === "approved" ? "Disetujui" : proof.status === "rejected" ? "Ditolak" : proof.status,
                          proof.approver && /* @__PURE__ */ jsxs("div", { className: "text-[7px] mt-1 opacity-70 text-right", children: [
                            "By: ",
                            proof.approver.name
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 mb-4 line-clamp-2", children: proof.description }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => setPreviewImage(`/storage/${proof.receipt_path}`),
                            className: "flex-1 flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-gray-800 rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all",
                            children: [
                              /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3" }),
                              " Preview Nota"
                            ]
                          }
                        ),
                        isSantaMaria && proof.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => approveProof(proof.id),
                              className: "p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all",
                              title: "Setujui",
                              children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" })
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => rejectProof(proof.id),
                              className: "p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all",
                              title: "Tolak",
                              children: /* @__PURE__ */ jsx(XCircle, { className: "w-4 h-4" })
                            }
                          )
                        ] })
                      ] })
                    ] }, proof.id)) })
                  ] })
                ] })
              },
              proposal.id
            ))
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isProposalModalOpen, onClose: () => setIsProposalModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitProposal, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight", children: "Buat Pengajuan Kas Kecil" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-50 dark:bg-black/20 p-2 rounded-2xl", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setProposalData("type", "spending"),
                  className: `flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === "spending" ? "bg-indigo-600 text-white shadow-xl" : "text-gray-400"}`,
                  children: "Pengajuan Belanja"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setProposalData("type", "funding"),
                  className: `flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${proposalData.type === "funding" ? "bg-emerald-600 text-white shadow-xl" : "text-gray-400"}`,
                  children: "Permohonan Dana (Replenishment)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Judul Pengajuan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full !rounded-2xl",
                  value: proposalData.title,
                  onChange: (e) => setProposalData("title", e.target.value),
                  placeholder: "Misal: Belanja ATK Kantor Bulan Maret"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Nominal Budget Dimohon", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400", children: "Rp" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "number",
                    className: "w-full !rounded-2xl !pl-12",
                    value: proposalData.amount,
                    onChange: (e) => setProposalData("amount", e.target.value),
                    placeholder: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.amount })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Detail Keperluan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  className: "w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-indigo-500 focus:border-indigo-500 h-32",
                  value: proposalData.description,
                  onChange: (e) => setProposalData("description", e.target.value),
                  placeholder: "Jelaskan secara detail barang apa saja yang akan dibeli atau alasan pengisian dana..."
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proposalErrors.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsProposalModalOpen(false), className: "flex-1 justify-center !rounded-2xl !py-4 uppercase tracking-widest font-black text-[10px]", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingProposal,
                className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20",
                children: "Kirim Pengajuan"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isApproveModalOpen, onClose: () => setIsApproveModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitApproveFunding, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight", children: "Konfirmasi Pengiriman Dana" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-8 font-serif leading-relaxed", children: [
            "Silakan unggah bukti transfer dana sebesar ",
            /* @__PURE__ */ jsxs("span", { className: "text-emerald-600 font-bold", children: [
              "Rp ",
              parseFloat(selectedProposal?.amount || 0).toLocaleString("id-ID")
            ] }),
            " untuk menyelesaikan pengisian Kas Kecil."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Metode Pengiriman Dana", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-50 dark:bg-black/20 p-2 rounded-2xl", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setApproveData("payment_method", "transfer"),
                    className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${approveData.payment_method === "transfer" ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400"}`,
                    children: "Transfer Bank"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setApproveData("payment_method", "cash"),
                    className: `flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${approveData.payment_method === "cash" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400"}`,
                    children: "Tunai / Cash"
                  }
                )
              ] })
            ] }),
            approveData.payment_method === "transfer" && /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Upload Bukti Transfer (JPG/PNG)", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "w-full p-6 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl text-sm font-bold text-gray-500 cursor-pointer hover:border-emerald-500 transition-all",
                  onChange: (e) => setApproveData("transfer_proof", e.target.files[0]),
                  required: approveData.payment_method === "transfer"
                }
              )
            ] }),
            approveData.payment_method === "cash" && /* @__PURE__ */ jsx("div", { className: "p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-emerald-800 dark:text-emerald-400 leading-relaxed", children: 'Konfirmasi penyerahan dana secara tunai. Saldo kas kecil akan langsung bertambah setelah Bapak menekan tombol "Konfirmasi" di bawah.' }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsApproveModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingApprove,
                className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                children: "Konfirmasi & Kirim"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isRejectModalOpen, onClose: () => setIsRejectModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitReject, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight", children: "Tolak Pengajuan" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-8 font-serif", children: "Berikan alasan mengapa pengajuan ini ditolak guna transparansi pelaporan." }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Alasan Penolakan", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full !rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-white/[0.02] dark:text-white focus:ring-rose-500 focus:border-rose-500 h-32",
                value: rejectData.rejection_reason,
                onChange: (e) => setRejectData("rejection_reason", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: rejectErrors.rejection_reason })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsRejectModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingReject,
                className: "flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                children: "Konfirmasi Penolakan"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isProofModalOpen, onClose: () => setIsProofModalOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: submitProof, className: "p-10 dark:bg-gray-900 rounded-[3rem]", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tight", children: "Ketik & Upload Bukti Belanja" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-5 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-3xl mb-6", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1", children: "Referensi Pengajuan:" }),
              /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-gray-900 dark:text-white uppercase", children: selectedProposal?.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Jumlah Sesuai Nota", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400", children: "Rp" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "number",
                    className: "w-full !rounded-2xl !pl-12",
                    value: proofData.amount_spent,
                    onChange: (e) => setProofData("amount_spent", e.target.value),
                    placeholder: "0",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: proofErrors.amount_spent })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Deskripsi Pembelian", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  className: "w-full !rounded-2xl",
                  value: proofData.description,
                  onChange: (e) => setProofData("description", e.target.value),
                  placeholder: "Misal: Beli Kertas A4 2 Rim & Tinta Printer",
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proofErrors.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { value: "Foto Nota / Kwitansi", className: "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "w-full p-4 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-bold text-gray-500",
                  onChange: (e) => setProofData("receipt", e.target.files[0]),
                  required: true
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: proofErrors.receipt })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-4", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsProofModalOpen(false), className: "flex-1 justify-center !rounded-2xl", children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processingProof,
                className: "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all",
                children: "Simpan & Kirim"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: previewImage && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            onClick: () => setPreviewImage(null),
            className: "fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-10 cursor-zoom-out",
            children: [
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  initial: { scale: 0.9, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  src: previewImage,
                  className: "max-h-full max-w-full rounded-2xl shadow-2xl object-contain shadow-white/5",
                  onClick: (e) => e.stopPropagation()
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "absolute top-10 right-10 text-white hover:scale-125 transition-all", children: /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12" }) })
            ]
          }
        ) })
      ]
    }
  );
}
const Eye = ({ className }) => /* @__PURE__ */ jsxs("svg", { className, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
] });
export {
  PettyCashIndex as default
};
