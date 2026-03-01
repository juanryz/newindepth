import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-Cjm5hTBB.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import AffiliateAgreementContent from "./AffiliateAgreementContent-BWGUMIZF.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function AffiliateDashboard({ commissions, totalEarned, pendingAmount, referralLink, hasSignedAgreement }) {
  const user = usePage().props.auth.user;
  const [copied, setCopied] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
    signature: "",
    name: user.name || "",
    age: user.age || "",
    gender: user.gender || "",
    phone: user.phone || ""
  });
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
    setHasDrawn(true);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) {
      setData("signature", canvas.toDataURL("image/png"));
    }
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setData("signature", "");
  };
  const submitAgreement = (e) => {
    e.preventDefault();
    if (!hasDrawn || !data.agree1 || !data.agree2 || !data.agree3 || !data.agree4 || !data.name || !data.age || !data.gender || !data.phone) return;
    post(route("affiliate.agreement.store"));
  };
  const allChecked = data.agree1 && data.agree2 && data.agree3 && data.agree4 && hasDrawn && data.name && data.age && data.gender && data.phone;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  if (!hasSignedAgreement) {
    return /* @__PURE__ */ jsxs(
      AuthenticatedLayout,
      {
        header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Persetujuan Kemitraan Affiliate" }),
        children: [
          /* @__PURE__ */ jsx(Head, { title: "Persetujuan Affiliate" }),
          /* @__PURE__ */ jsx("div", { className: "py-12 px-4 sm:px-0", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-3xl shadow-2xl p-6 sm:p-12 transition-all duration-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block py-1.5 px-4 text-[10px] font-black tracking-[0.2em] uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full mb-4", children: "LEGAL DOCUMENT" }),
              /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-gray-950 dark:text-white leading-tight", children: "PERJANJIAN MITRA AFFILIATE" }),
              /* @__PURE__ */ jsx("p", { className: "text-indigo-600 dark:text-indigo-400 font-bold mt-2", children: "InDepth Mental Wellness" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium", children: [
                "Terakhir diperbarui: ",
                (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-2xl text-sm text-slate-700 dark:text-slate-300 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-10 shadow-inner custom-scrollbar relative", children: /* @__PURE__ */ jsx(AffiliateAgreementContent, {}) }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submitAgreement, className: "space-y-10", children: [
              /* @__PURE__ */ jsxs("section", { className: "p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800", children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]", children: "01" }),
                  "Data Identitas Mitra"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2", children: "Nama Lengkap (Sesuai KTP)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.name,
                        onChange: (e) => setData("name", e.target.value),
                        className: "w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white",
                        placeholder: "Contoh: Budi Santoso",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2", children: "Nomor WhatsApp Aktif" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        value: data.phone,
                        onChange: (e) => setData("phone", e.target.value),
                        className: "w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white",
                        placeholder: "Contoh: 081234567890",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2", children: "Usia Saat Ini" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        value: data.age,
                        onChange: (e) => setData("age", e.target.value),
                        className: "w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white",
                        placeholder: "Contoh: 25",
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2", children: "Jenis Kelamin" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        value: data.gender,
                        onChange: (e) => setData("gender", e.target.value),
                        className: "w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium text-slate-900 dark:text-white",
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Jenis Kelamin" }),
                          /* @__PURE__ */ jsx("option", { value: "Laki-laki", children: "Laki-laki" }),
                          /* @__PURE__ */ jsx("option", { value: "Perempuan", children: "Perempuan" })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 text-[10px] text-slate-400 italic", children: "* Data ini akan digunakan untuk keperluan administrasi dan pencairan komisi." })
              ] }),
              /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsxs("h4", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]", children: "02" }),
                  "Konfirmasi Persetujuan"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree1 ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree1, onChange: (e) => setData("agree1", e.target.checked), className: "mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Saya memahami seluruh ketentuan yang berlaku." })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree2 ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree2, onChange: (e) => setData("agree2", e.target.checked), className: "mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Saya tidak akan menyalahgunakan sistem affiliate." })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree3 ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree3, onChange: (e) => setData("agree3", e.target.checked), className: "mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Saya menyetujui sistem sanksi bertingkat yang ditetapkan." })
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${data.agree4 ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20" : "border-slate-200 dark:border-slate-800"}`, children: [
                    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree4, onChange: (e) => setData("agree4", e.target.checked), className: "mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "Saya bertanggung jawab penuh atas seluruh promosi yang dilakukan." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("section", { className: "pt-8 border-t border-slate-100 dark:border-slate-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-10 items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-widest text-slate-400 mb-4", children: "Tanda Tangan Digital Kemitraan" }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-1 relative shadow-inner overflow-hidden", style: { height: 160 }, children: [
                    /* @__PURE__ */ jsx(
                      "canvas",
                      {
                        ref: canvasRef,
                        width: 400,
                        height: 150,
                        onMouseDown: startDrawing,
                        onMouseMove: draw,
                        onMouseUp: stopDrawing,
                        onMouseOut: stopDrawing,
                        onTouchStart: startDrawing,
                        onTouchMove: draw,
                        onTouchEnd: stopDrawing,
                        className: "cursor-crosshair w-full h-full touch-none dark:invert"
                      }
                    ),
                    !hasDrawn && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 pointer-events-none text-[10px] font-black uppercase tracking-[0.2em]", children: "Gambarlah tanda tangan di sini" })
                  ] }),
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: clearCanvas, className: "mt-3 text-[10px] font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors", children: "Hapus & Ulangi" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center md:items-end gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-center md:text-right", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider underline", children: user.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-slate-500 mt-1 uppercase", children: "Bermitra sebagai Affiliate InDepth" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    PrimaryButton,
                    {
                      type: "submit",
                      disabled: !allChecked || processing,
                      className: `h-14 px-10 rounded-2xl justify-center text-xs font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95 ${allChecked ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20" : "bg-slate-300 dark:bg-slate-700 grayscale cursor-not-allowed text-slate-500 opacity-50"}`,
                      children: processing ? "Memproses..." : "Aktifkan Akun Affiliate Saya"
                    }
                  )
                ] })
              ] }) })
            ] })
          ] }) }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-black text-xl text-slate-900 dark:text-white tracking-tight", children: "Dashboard Affiliate" }),
        /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("affiliate.agreement.show"),
            className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm active:scale-95 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Lihat Dokumen Perjanjian Saya" }),
              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14 5l7 7m0 0l-7 7m7-7H3" }) })
            ]
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Affiliate Program" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 relative z-10 px-4 sm:px-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-indigo-500/90 to-purple-600/90 dark:from-indigo-600/80 dark:to-purple-700/80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl border border-white/20", children: /* @__PURE__ */ jsx("div", { className: "p-8 flex flex-col md:flex-row items-center justify-between text-white", children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-2", children: "Program Afiliasi InDepth Mental Wellness" }),
            /* @__PURE__ */ jsxs("p", { className: "opacity-90 max-w-xl text-indigo-50", children: [
              "Bagikan link referral Anda kepada teman atau kerabat. Dapatkan komisi sebesar ",
              /* @__PURE__ */ jsx("span", { className: "font-bold underline decoration-indigo-200", children: "5%" }),
              " dari setiap pendaftaran kelas atau sesi terapi yang berhasil."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center bg-white/10 dark:bg-black/20 p-2 rounded-xl backdrop-blur-md border border-white/20 max-w-lg", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  readOnly: true,
                  value: referralLink,
                  className: "bg-transparent border-none text-white w-full focus:ring-0 placeholder-white/50 text-sm font-mono"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: copyToClipboard,
                  className: "ml-2 bg-white text-indigo-600 px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap shadow-lg active:scale-95 transition-all",
                  children: copied ? "Disalin ✓" : "Salin Link"
                }
              )
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2", children: "Total Komisi Dibayarkan" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-3xl font-black text-green-600 dark:text-green-400", children: [
                "Rp ",
                Number(totalEarned).toLocaleString("id-ID")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl p-6 rounded-2xl shadow-sm border border-white/80 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2", children: "Komisi Menunggu Pencairan" }),
              /* @__PURE__ */ jsxs("h4", { className: "text-3xl font-black text-amber-500 dark:text-amber-400", children: [
                "Rp ",
                Number(pendingAmount).toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500 mt-3 italic", children: "* Komisi akan dicairkan ke rekening Anda setiap tanggal 1 bulan berikutnya." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl overflow-hidden shadow-xl sm:rounded-2xl border border-white/80 dark:border-gray-700/50", children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 border-b border-gray-100 dark:border-gray-700/50", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "Riwayat Komisi" }) }),
            /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
              /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700/50", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-900/50", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Tanggal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Referred User" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Item / Status" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Harga Transaksi" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Komisi Anda" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Status Pembayaran" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700/50", children: commissions.data.map((comm) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-white/40 dark:hover:bg-gray-700/30 transition-colors", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400", children: new Date(comm.created_at).toLocaleDateString("id-ID") }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white", children: comm.referred_user?.name || "User Tersembunyi" }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700 dark:text-gray-300", children: comm.transaction?.transactionable_type?.includes("Booking") ? "Sesi Terapi" : "Kelas Online" }),
                    /* @__PURE__ */ jsxs("span", { className: `text-[10px] uppercase font-bold mt-1 ${comm.transaction?.transactionable?.status === "completed" || comm.transaction?.transactionable?.status === "confirmed" ? "text-green-600" : "text-amber-500"}`, children: [
                      "• ",
                      comm.transaction?.transactionable?.status || "Active"
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
                    "Rp ",
                    Number(comm.transaction_amount).toLocaleString("id-ID")
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-600 dark:text-green-400", children: [
                    "Rp ",
                    Number(comm.commission_amount).toLocaleString("id-ID")
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                                    ${comm.status === "paid" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800" : comm.status === "rejected" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"}`, children: comm.status === "paid" ? "Telah Dibayar" : comm.status === "rejected" ? "Dibatalkan" : "Menunggu" }) })
                ] }, comm.id)) })
              ] }),
              commissions.data.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center p-12 text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-300 dark:text-gray-700 mb-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                "Belum ada history komisi. Mulai bagikan link Anda sekarang!"
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AffiliateDashboard as default
};
