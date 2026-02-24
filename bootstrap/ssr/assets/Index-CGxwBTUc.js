import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function AdminBookingsIndex({ bookings, therapists, availableSchedules = [] }) {
  const { data, setData, patch, processing } = useForm({
    therapist_id: ""
  });
  const [editingBooking, setEditingBooking] = useState(null);
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [noShowBooking, setNoShowBooking] = useState(null);
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({
    new_schedule_id: "",
    reschedule_reason: ""
  });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({
    no_show_party: "therapist",
    // Default to therapist for admin since they are often fixing therapist absences
    no_show_reason: ""
  });
  const handleAssign = (bookingId) => {
    patch(route("admin.bookings.assign-therapist", bookingId), {
      onSuccess: () => setEditingBooking(null)
    });
  };
  const handleReschedule = (e) => {
    e.preventDefault();
    postReschedule(route("admin.bookings.reschedule", reschedulingBooking.id), {
      onSuccess: () => {
        setReschedulingBooking(null);
        resetReschedule();
      }
    });
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    postNoShow(route("admin.bookings.no-show", noShowBooking.id), {
      onSuccess: () => {
        setNoShowBooking(null);
        resetNoShow();
      }
    });
  };
  const getStatusBadge = (status) => {
    const statuses = {
      pending_screening: "bg-yellow-100 text-yellow-800",
      pending_payment: "bg-blue-100 text-blue-800",
      pending_validation: "bg-indigo-100 text-indigo-800",
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800"
    };
    const labels = {
      pending_screening: "Menunggu Skrining",
      pending_payment: "Menunggu Pembayaran",
      pending_validation: "Menunggu Validasi",
      confirmed: "Dikonfirmasi",
      completed: "Selesai",
      cancelled: "Dibatalkan"
    };
    return /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statuses[status] || statuses.pending_payment}`, children: labels[status] || status });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen Booking Pasien" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Booking Pasien" }),
        /* @__PURE__ */ jsxs("div", { className: "relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse", style: { animationDuration: "10s" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] rounded-full animate-pulse", style: { animationDuration: "15s", animationDelay: "2s" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-8", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h1", { className: "text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight", children: [
                "Booking ",
                /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400", children: "Pasien" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-slate-500 dark:text-slate-400 font-bold italic tracking-wide", children: "Pantau skrining, pembayaran, dan penugasan terapis." })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-slate-100/50 dark:bg-slate-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-slate-700/30", children: [
                /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Info Booking" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Pasien & Screening" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Jadwal Sesi" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-5 text-center", children: "Status" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-5", children: "Terapis & Aksi" })
              ] }) }),
              /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800/50", children: [
                bookings.map((booking) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all", children: [
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 dark:text-white mb-1", children: booking.booking_code }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit", children: booking.package_type?.toUpperCase() || "KONSULTASI" })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-slate-900 dark:text-white", children: booking.patient?.name }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: booking.patient?.email })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1 my-1", children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `h-1 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? "bg-emerald-500" : "bg-amber-500"}`,
                            style: { width: `${booking.patient_profile_stats?.percentage || 0}%` }
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-tighter", children: [
                          booking.patient_profile_stats?.percentage || 0,
                          "% Profil"
                        ] })
                      ] }),
                      booking.patient?.screening_completed_at ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col border-l border-slate-200 dark:border-slate-700 pl-4", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-emerald-500 uppercase tracking-tighter", children: "Skrining OK" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-400 truncate max-w-[120px]", children: booking.patient.recommended_package || "No Rec" })
                      ] }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-500 uppercase border-l border-slate-200 dark:border-slate-700 pl-4", children: "Belum Skrining" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: booking.schedule ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700 dark:text-slate-300", children: new Date(booking.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) }),
                    /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-500", children: [
                      booking.schedule.start_time?.substring(0, 5),
                      " WIB"
                    ] })
                  ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-400 italic", children: "No Slot" }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                    getStatusBadge(booking.status),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity", children: [
                      booking.recording_link && /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-500", title: "Ada Rekaman", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }) }),
                      booking.therapist_notes && /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-lg bg-slate-50 dark:bg-slate-900/40 flex items-center justify-center text-slate-500", title: "Ada Catatan Klinis", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-8 py-6", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: editingBooking === booking.id ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur p-4 rounded-2xl border border-white dark:border-slate-700 shadow-xl", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: "Assign Terapis" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        className: "text-xs bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20",
                        value: data.therapist_id,
                        onChange: (e) => setData("therapist_id", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Terapis" }),
                          therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-2", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => handleAssign(booking.id),
                          className: "flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-700 transition-all",
                          disabled: processing || !data.therapist_id,
                          children: "Simpan"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setEditingBooking(null),
                          className: "flex-1 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase rounded-lg",
                          children: "Batal"
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between group/tp", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5", children: "Penanggung Jawab" }),
                        booking.therapist ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-900 dark:text-white", children: booking.therapist.name }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-amber-500 dark:text-amber-400", children: ["pending_payment", "pending_validation"].includes(booking.status) ? "⏳ Otomatis setelah bayar" : "BELUM DITUNJUK" })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            setEditingBooking(booking.id);
                            setData("therapist_id", booking.therapist_id || "");
                          },
                          className: "p-2 text-indigo-500 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl opacity-0 group-hover:opacity-100 group-hover/tp:opacity-100 transition-all",
                          title: "Ganti Terapis",
                          children: /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/50", children: [
                      booking.schedule_id && /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: route("admin.schedules.show", booking.schedule_id),
                          className: "flex-1 text-center py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:text-indigo-500 transition-all",
                          children: "Detail Sesi"
                        }
                      ),
                      ["confirmed", "in_progress"].includes(booking.status) && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setReschedulingBooking(booking),
                            className: "px-2 py-2 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20",
                            children: "Reschedule"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setNoShowBooking(booking),
                            className: "px-2 py-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20",
                            children: "No-Show"
                          }
                        )
                      ] })
                    ] })
                  ] }) }) })
                ] }, booking.id)),
                bookings.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-8 py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-slate-500 dark:text-slate-600 font-bold italic", children: "Belum ada booking pasien yang terdaftar." }) }) })
              ] })
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Modal, { show: reschedulingBooking !== null, onClose: () => setReschedulingBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-1", children: "Reschedule Sesi" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-6", children: [
            "Pasien: ",
            /* @__PURE__ */ jsx("strong", { children: reschedulingBooking?.patient?.name }),
            /* @__PURE__ */ jsx("br", {}),
            "Jadwal saat ini: ",
            reschedulingBooking?.schedule?.date,
            " pukul ",
            reschedulingBooking?.schedule?.start_time?.substring(0, 5)
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "new_schedule_id", value: "Pilih Jadwal Baru" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "new_schedule_id",
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                value: rescheduleData.new_schedule_id,
                onChange: (e) => setRescheduleData("new_schedule_id", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Slot Tersedia --" }),
                  availableSchedules.filter((s) => s.id !== reschedulingBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                    s.therapist?.name,
                    " — ",
                    new Date(s.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
                    " — ",
                    s.start_time?.substring(0, 5)
                  ] }, s.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "reschedule_reason", value: "Alasan Reschedule" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "reschedule_reason",
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm",
                rows: "2",
                placeholder: "Tuliskan alasan perubahan jadwal...",
                value: rescheduleData.reschedule_reason,
                onChange: (e) => setRescheduleData("reschedule_reason", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1", children: "* Pesan ini akan diinformasikan ke pelanggan." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setReschedulingBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: rescheduling || !rescheduleData.new_schedule_id,
                className: "inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 disabled:opacity-25 transition",
                children: "Update Jadwal"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: noShowBooking !== null, onClose: () => setNoShowBooking(null), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-gray-900 mb-1", children: "Tandai Tidak Hadir" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-6", children: [
            " Booking Code: ",
            noShowBooking?.booking_code,
            " "
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_party", value: "Pihak yang Tidak Hadir" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "no_show_party",
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm",
                value: noShowData.no_show_party,
                onChange: (e) => setNoShowData("no_show_party", e.target.value),
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi (Tidak Hadir)" }),
                  /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien (Tidak Hadir)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "no_show_reason", value: "Keterangan Admin" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "no_show_reason",
                className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500 text-sm",
                rows: "2",
                placeholder: "Alasan ketidakhadiran...",
                value: noShowData.no_show_reason,
                onChange: (e) => setNoShowData("no_show_reason", e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setNoShowBooking(null), children: "Batal" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: markingNoShow,
                className: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 disabled:opacity-25 transition",
                children: "Tandai No-Show"
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  AdminBookingsIndex as default
};
