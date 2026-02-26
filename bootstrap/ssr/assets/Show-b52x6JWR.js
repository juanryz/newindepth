import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import { Head, Link } from "@inertiajs/react";
import ErrorBoundary from "./ErrorBoundary-veTPa1Ma.js";
import { M as Modal, S as SecondaryButton } from "./SecondaryButton-B05Cq_fG.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function InnerUserShow({ userModel, bookings = [], transactions = [], schedules = [], screeningResults = [], profileCompletion }) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const isPatient = userModel.roles.some((r) => r.name === "patient");
  const isTherapist = userModel.roles.some((r) => r.name === "therapist");
  const completionRate = profileCompletion?.percentage || 0;
  const ktpDocumentPath = userModel.ktp_photo;
  const latestScreening = screeningResults[0];
  const isAgreementSigned = !!userModel.agreement_signed_at;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: [
        "Detail User: ",
        userModel.name
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `User: ${userModel.name}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl", children: userModel.name.charAt(0) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-gray-900 dark:text-white mb-2", children: userModel.name }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: userModel.roles.map((role) => /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100 dark:border-indigo-800", children: role.name }, role.id)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Email Address" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium", children: userModel.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Phone Number" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium", children: userModel.phone || "-" })
                ] }),
                userModel.referral_code && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Referral Code" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium font-mono", children: userModel.referral_code })
                ] }),
                userModel.affiliate_ref && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Affiliate Koder" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium", children: userModel.affiliate_ref })
                ] }),
                userModel.screening_answers?.usia && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Usia" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-gray-700 dark:text-gray-300 font-medium", children: [
                    userModel.screening_answers.usia,
                    " tahun"
                  ] })
                ] }),
                userModel.screening_answers?.gender && /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Jenis Kelamin" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium capitalize", children: userModel.screening_answers.gender })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest", children: "Joined Since" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-700 dark:text-gray-300 font-medium", children: new Date(userModel.created_at).toLocaleDateString("id-ID", { dateStyle: "long" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx(Link, { href: route("admin.users.index"), className: "px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm", children: "Kembali" }),
              /* @__PURE__ */ jsx(Link, { href: route("admin.users.edit", userModel.id), className: "px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm", children: "Edit Profil" })
            ] })
          ] }) }) }),
          isPatient && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-4", children: "Kelengkapan Profil" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-4", children: [
                /* @__PURE__ */ jsxs("p", { className: `text-4xl font-black ${completionRate === 100 ? "text-green-500" : "text-indigo-600 dark:text-indigo-400"}`, children: [
                  completionRate,
                  "%"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsx("div", { className: `h-full rounded-full ${completionRate === 100 ? "bg-green-500" : "bg-indigo-600"}`, style: { width: `${completionRate}%` } }) })
              ] }),
              profileCompletion?.fields && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5 mt-2 bg-gray-50/50 dark:bg-gray-900/40 p-3 rounded-2xl border border-gray-100 dark:border-gray-700/50 max-h-40 overflow-y-auto", children: Object.entries(profileCompletion.fields).map(([key, data]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsx("span", { className: `${data.filled ? "text-gray-900 dark:text-gray-200 font-medium" : "text-gray-400 italic"}`, children: data.label }),
                data.filled ? /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-green-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 text-red-400 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
              ] }, key)) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Status Skrining" }),
              /* @__PURE__ */ jsx("p", { className: `font-bold pb-4 border-b border-gray-100 dark:border-gray-700 mb-4 ${userModel.screening_completed_at ? "text-green-600" : "text-amber-600"}`, children: userModel.screening_completed_at ? "✅ Selesai" : "⏳ Belum Skrining" }),
              latestScreening ? /* @__PURE__ */ jsx("div", { className: "space-y-4 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest", children: "Hasil Diagnosa AI" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug line-clamp-3", children: [
                  '"',
                  latestScreening.ai_summary || latestScreening.severity_label || "Tidak ada ringkasan",
                  '"'
                ] })
              ] }) }) : /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-400 italic flex-1", children: "Data skrining belum tersedia." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Dokumen KTP" }),
              ktpDocumentPath ? /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs("a", { href: `/storage/${ktpDocumentPath}`, target: "_blank", rel: "noreferrer", className: "block w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden group relative border border-gray-200 dark:border-gray-700", children: [
                /* @__PURE__ */ jsx("img", { src: `/storage/${ktpDocumentPath}`, alt: "KTP Pasien", className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold px-4 py-2 bg-white/20 rounded-xl backdrop-blur-md", children: "Lihat Penuh" }) })
              ] }) }) : /* @__PURE__ */ jsx("div", { className: "mt-3 flex items-center justify-center w-full aspect-[16/9] bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400", children: "Belum diunggah" }) })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Service Agreement" }),
              isAgreementSigned ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-green-600 dark:text-green-400", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: "Ditandatangani" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500", children: [
                  "Pada: ",
                  new Date(userModel.agreement_signed_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })
                ] }),
                userModel.digital_signature && /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-gray-100 dark:border-gray-700 pt-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 uppercase tracking-widest font-bold", children: "Digital Signature Data" }),
                    /* @__PURE__ */ jsxs("a", { href: route("admin.users.agreement", userModel.id), target: "_blank", rel: "noreferrer", className: "text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors inline-flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) }),
                      "Lihat Form Legal"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("img", { src: userModel.digital_signature, alt: "Tanda Tangan", className: "h-16 object-contain bg-white rounded border border-gray-200 p-1" })
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-amber-600 dark:text-amber-500", children: "Belum disetujui" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Pasien belum menyetujui dokumen perjanjian layanan." })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/40 dark:bg-gray-800/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 flex flex-col", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest mb-1", children: "Kontak Darurat" }),
              userModel.emergency_contact_name ? /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-gray-100", children: userModel.emergency_contact_name }),
                /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-gray-500", children: userModel.emergency_contact_phone }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-2", children: [
                  "Hubungan: ",
                  userModel.emergency_contact_relation || "-"
                ] })
              ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-400 italic mt-2", children: "Belum diisi." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-black text-xl text-gray-900 dark:text-white", children: "Riwayat Sesi Konsultasi" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium", children: "Log sesi klinis" })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-800", children: [
                  bookings.length,
                  " Sesi"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-0", children: [
                /* @__PURE__ */ jsx("div", { className: "max-h-[420px] overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                  /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-20", children: /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Waktu & Kode" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Praktisi" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Status" }),
                    /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right", children: "Aksi" })
                  ] }) }),
                  /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700/50", children: bookings.map((booking) => {
                    const d = booking.schedule ? /* @__PURE__ */ new Date(`${booking.schedule.date.replace(/-/g, "/")} ${booking.schedule.start_time}`) : null;
                    const formattedDate = d && !isNaN(d.getTime()) ? d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
                    return /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/30 dark:hover:bg-gray-900/20 transition-colors", children: [
                      /* @__PURE__ */ jsxs("td", { className: "px-8 py-4", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: formattedDate }),
                        /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-indigo-600 font-bold uppercase tracking-tighter", children: [
                          "#",
                          booking.booking_code
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("td", { className: "px-8 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: isTherapist ? booking.patient?.name || "-" : booking.therapist?.name || "-" }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-8 py-4", children: /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-black uppercase ${booking.status === "confirmed" ? "bg-green-100 text-green-700" : booking.status === "completed" ? "bg-indigo-100 text-indigo-700" : booking.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`, children: booking.status }) }),
                      /* @__PURE__ */ jsx("td", { className: "px-8 py-4 text-right", children: /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setSelectedBooking(booking),
                          className: "text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 hover:underline transition-all uppercase tracking-widest",
                          children: "Lihat Detail →"
                        }
                      ) })
                    ] }, booking.id);
                  }) })
                ] }) }),
                bookings.length === 0 && /* @__PURE__ */ jsx("div", { className: "p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 italic font-medium", children: "Belum ada riwayat sesi." }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Modal, { show: !!selectedBooking, onClose: () => setSelectedBooking(null), maxWidth: "2xl", children: selectedBooking && /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-black text-gray-900 dark:text-white", children: [
                    "Detail Sesi #",
                    selectedBooking.booking_code
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 font-medium", children: [
                    selectedBooking.schedule ? (/* @__PURE__ */ new Date(`${selectedBooking.schedule.date.replace(/-/g, "/")} ${selectedBooking.schedule.start_time}`)).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-",
                    " WIB"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("button", { onClick: () => setSelectedBooking(null), className: "text-gray-400 hover:text-gray-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-6 pb-6 border-b border-gray-100 dark:border-gray-700", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: isTherapist ? "Pasien" : "Praktisi" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: isTherapist ? selectedBooking.patient?.name || "-" : selectedBooking.therapist?.name || "-" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Paket Layanan" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white capitalize", children: selectedBooking.package_type || "Hipnoterapi" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Status Sesi" }),
                  /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${selectedBooking.status === "confirmed" ? "bg-green-100 text-green-700" : selectedBooking.status === "completed" ? "bg-indigo-100 text-indigo-700" : selectedBooking.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`, children: selectedBooking.status })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Outcome Sesi" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white", children: selectedBooking.completion_outcome || "-" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                      "Catatan Internal (Diagnosa)"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 min-h-[100px]", children: selectedBooking.therapist_notes ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic", children: [
                      '"',
                      selectedBooking.therapist_notes,
                      '"'
                    ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic", children: "Belum ada catatan internal." }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
                      "Catatan Pasien (Tampil di Dashboard)"
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 min-h-[100px]", children: selectedBooking.patient_visible_notes ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic", children: [
                      '"',
                      selectedBooking.patient_visible_notes,
                      '"'
                    ] }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 italic", children: "Belum ada catatan untuk pasien." }) })
                  ] })
                ] }),
                selectedBooking.recording_link && /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-4", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
                    "Dokumentasi Rekaman"
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: selectedBooking.recording_link,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "flex items-center justify-between p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/20 group",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) }),
                          /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-tighter opacity-80", children: "Video Rekaman Sesi" }),
                            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "Watch Technical Session" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 group-hover:translate-x-1 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M13 7l5 5m0 0l-5 5m5-5H6" }) })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-6 flex justify-end", children: /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setSelectedBooking(null), children: "Tutup Detail" }) })
            ] }) }),
            isPatient ? /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-black text-xl text-gray-900 dark:text-white", children: "Riwayat Transaksi & Keuangan" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium", children: "Log pembayaran dan billing pasien" })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-800", children: [
                  transactions.length,
                  " Transaksi"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4 max-h-[600px] overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Invoice / Rekening" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Nominal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center", children: "Bukti" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right", children: "Status" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700/50", children: [
                  transactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors", children: [
                    /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-gray-100", children: tx.invoice_number }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 font-medium", children: tx.payment_method || "-" })
                    ] }),
                    /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm font-black text-gray-900 dark:text-gray-100", children: [
                      "Rp ",
                      new Intl.NumberFormat("id-ID").format(tx.amount)
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-center", children: tx.payment_proof ? /* @__PURE__ */ jsxs("a", { href: `/storage/${tx.payment_proof}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors", children: [
                      /* @__PURE__ */ jsxs("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                      ] }),
                      "Bukti Transfer"
                    ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase italic", children: "Belum Ada" }) }),
                    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 text-[10px] font-black uppercase rounded-lg ${tx.status === "paid" ? "bg-green-100 text-green-700" : tx.status === "cancelled" ? "bg-gray-100 text-gray-500" : tx.status === "rejected" ? "bg-red-100 text-red-700" : tx.status === "refunded" ? "bg-orange-100 text-orange-700" : "bg-amber-100 text-amber-700"}`, children: tx.status }) })
                  ] }, tx.id)),
                  transactions.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "4", className: "px-6 py-12 text-center text-gray-500 italic text-sm", children: "Belum ada data transaksi keuangan." }) })
                ] })
              ] }) })
            ] }) : isTherapist ? /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-sm rounded-3xl overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-black text-xl text-gray-900 dark:text-white", children: "Slot Jadwal Praktek" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 font-medium", children: "Jadwal yang telah dibuka oleh terapis" })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full", children: [
                  schedules.length,
                  " Slot"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "overflow-x-auto p-4 max-h-[600px] overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
                /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-900/30 sticky top-0 z-10", children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tanggal" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Waktu" }),
                  /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right", children: "Kapasitas" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-700/50", children: [
                  schedules.map((sch) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors", children: [
                    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase", children: new Date(sch.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short", year: "numeric" }) }),
                    /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 text-sm font-bold text-gray-600 dark:text-gray-400", children: [
                      sch.start_time.substring(0, 5),
                      " - ",
                      sch.end_time.substring(0, 5),
                      " WIB"
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("span", { className: `px-3 py-1 text-[10px] font-black uppercase rounded-lg ${sch.booked_count >= sch.quota ? "bg-red-50 text-red-700 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`, children: [
                      sch.booked_count,
                      " / ",
                      sch.quota,
                      " Terisi"
                    ] }) })
                  ] }, sch.id)),
                  schedules.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "3", className: "px-6 py-12 text-center text-gray-500 italic text-sm", children: "Belum ada slot jadwal yang dibuka." }) })
                ] })
              ] }) })
            ] }) : null
          ] })
        ] }) })
      ]
    }
  );
}
function UserShow(props) {
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsx(InnerUserShow, { ...props }) });
}
export {
  UserShow as default
};
