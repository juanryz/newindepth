import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useMemo, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D0kAy28S.js";
import { usePage, useForm, router, Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Users, CreditCard, Activity, ChevronRight, FileText, Eye, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createPortal } from "react-dom";
import { M as Modal } from "./Modal-BSrLMD0w.js";
import { S as SecondaryButton } from "./SecondaryButton-D0HLp6wy.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DMzg2v4j.js";
function renderEventContent(eventInfo) {
  const isBooked = eventInfo.event.extendedProps.bookings?.length > 0;
  const therapistName = eventInfo.event.extendedProps.therapist?.name || "Terapis";
  const isPast = eventInfo.event.start < /* @__PURE__ */ new Date();
  if (isPast && !isBooked) {
    return /* @__PURE__ */ jsxs("div", { className: "h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-500 shadow-sm cursor-not-allowed", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-tight truncate", children: eventInfo.timeText }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight text-slate-600 dark:text-slate-400", children: "⚫ KADALUARSA" }),
      /* @__PURE__ */ jsxs("div", { className: "text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate", children: [
        "Ditutup • ",
        therapistName
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: `h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 overflow-hidden ${isBooked ? "bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/20" : "bg-white dark:bg-slate-800 border-2 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 shadow-sm"}`, children: [
    /* @__PURE__ */ jsx("span", { className: "text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight truncate", children: eventInfo.timeText }),
    /* @__PURE__ */ jsx("div", { className: `text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight ${isBooked ? "text-white" : "text-slate-900 dark:text-white"}`, children: isBooked ? "🔴 PENUH" : `🟢 ${therapistName}` }),
    /* @__PURE__ */ jsx("div", { className: "text-[8px] font-bold opacity-70 uppercase tracking-widest truncate", children: isBooked ? `${eventInfo.event.extendedProps.bookings.length} Pasien • Slot Terisi` : "Tersedia • 1 Pasien" })
  ] });
}
const calendarStyles = `
    .fc { --fc-border-color: rgba(255,255,255,0.05); --fc-button-bg-color: transparent; --fc-button-border-color: rgba(255,255,255,0.1); --fc-button-hover-bg-color: rgba(99,102,241,0.1); --fc-button-active-bg-color: rgba(99,102,241,0.2); --fc-today-bg-color: rgba(99,102,241,0.05); font-family: 'Inter', sans-serif; border: none !important; }
    .dark .fc { --fc-border-color: rgba(255,255,255,0.03); }
    .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color) !important; }
    .fc-col-header-cell { padding: 20px 0 !important; background: rgba(255,255,255,0.02); }
    .fc-col-header-cell-cushion { text-transform: uppercase; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; color: #6366f1; }
    .fc-timegrid-slot { height: 4em !important; border-bottom: 1px solid var(--fc-border-color) !important; }
    .fc-timegrid-slot-label-cushion { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
    .fc-event { border: none !important; border-radius: 12px !important; padding: 4px !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
    .fc-event:hover { transform: scale(1.02) translateY(-2px); z-index: 50; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    .fc-v-event { background: transparent !important; }
    .fc-event-main { padding: 4px !important; }
    .fc-timegrid-now-indicator-line { border-color: #6366f1 !important; border-width: 2px !important; }
    .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: -0.025em; color: #1e293b; }
    .dark .fc-toolbar-title { color: #f8fafc; }
    .fc-button-primary { background-color: white !important; border: 1px solid rgba(0,0,0,0.05) !important; color: #475569 !important; font-weight: 800 !important; font-size: 11px !important; text-transform: uppercase !important; border-radius: 12px !important; padding: 8px 16px !important; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important; }
    .dark .fc-button-primary { background-color: #1e293b !important; border-color: rgba(255,255,255,0.05) !important; color: #cbd5e1 !important; }
    .fc-button-primary:hover { background-color: #f8fafc !important; }
    .dark .fc-button-primary:hover { background-color: #334155 !important; }
    .fc-button-active { background-color: #4f46e5 !important; border-color: #4f46e5 !important; color: white !important; }
    @media (max-width: 767px) {
        .fc-toolbar { flex-direction: column !important; gap: 8px !important; align-items: stretch !important; }
        .fc-toolbar-title { font-size: 0.9rem !important; text-align: center; }
        .fc-toolbar-chunk { display: flex !important; justify-content: center !important; flex-wrap: wrap !important; gap: 4px !important; }
        .fc-button-primary { font-size: 9px !important; padding: 6px 10px !important; }
        .fc .fc-col-header-cell-cushion { font-size: 9px !important; padding: 4px !important; }
        .fc .fc-timegrid-slot-label-cushion { font-size: 9px !important; }
        .fc-timegrid-slot { height: 3em !important; }
    }
`;
function OrderManagementIndex({ schedules = [], bookings = [], transactions = [], therapists = [], availableSchedules = [], filters = {} }) {
  const [activeTab, setActiveTab] = useState("schedules");
  const { flash, errors: pageErrors, auth } = usePage().props;
  const [isDisabling, setIsDisabling] = useState(false);
  const { data: disableData, setData: setDisableData, post: postDisable, processing: disabling, reset: resetDisable } = useForm({
    date_from: "",
    date_to: "",
    start_time: "08:00",
    end_time: "20:00",
    therapist_id: filters.therapist_id || ""
  });
  const [therapistId, setTherapistId] = useState(filters.therapist_id || "");
  const [calendarView, setCalendarView] = useState("timeGridWeek");
  const calendarRef = useRef(null);
  const { data: assignData, setData: setAssignData, patch, processing: assigning } = useForm({ therapist_id: "" });
  const [editingBooking, setEditingBooking] = useState(null);
  const [reschedulingBooking, setReschedulingBooking] = useState(null);
  const [noShowBooking, setNoShowBooking] = useState(null);
  const { data: rescheduleData, setData: setRescheduleData, post: postReschedule, processing: rescheduling, reset: resetReschedule } = useForm({ new_schedule_id: "", reschedule_reason: "" });
  const { data: noShowData, setData: setNoShowData, post: postNoShow, processing: markingNoShow, reset: resetNoShow } = useForm({ no_show_party: "therapist", no_show_reason: "" });
  const [selectedReject, setSelectedReject] = useState(null);
  const { data: rejectData, setData: setRejectData, post: rejectPost, reset: resetReject, processing: rejecting } = useForm({ rejection_reason: "" });
  const [validatingTx, setValidatingTx] = useState(null);
  const [validationChoiceTx, setValidationChoiceTx] = useState(null);
  const [validateReschedTx, setValidateReschedTx] = useState(null);
  const [voucherTxId, setVoucherTxId] = useState(null);
  const [adminVoucherCode, setAdminVoucherCode] = useState("");
  const [applyingVoucher, setApplyingVoucher] = useState(false);
  const { post: postVoucher, errors: voucherErrors } = useForm();
  const handleAdminApplyVoucher = (tx) => {
    if (!adminVoucherCode.trim()) return;
    setApplyingVoucher(true);
    router.post(route("vouchers.apply-by-code"), {
      code: adminVoucherCode,
      transaction_id: tx.id
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setVoucherTxId(null);
        setAdminVoucherCode("");
      },
      onFinish: () => setApplyingVoucher(false)
    });
  };
  const [txFilterStatus, setTxFilterStatus] = useState("");
  const [txFilterSearch, setTxFilterSearch] = useState("");
  const [txFilterDateFrom, setTxFilterDateFrom] = useState("");
  const [txFilterDateTo, setTxFilterDateTo] = useState("");
  const filteredTransactions = (transactions || []).filter((tx) => {
    if (!tx.payment_proof && tx.status === "pending") return false;
    if (txFilterStatus && tx.status !== txFilterStatus) return false;
    if (txFilterSearch) {
      const q = txFilterSearch.toLowerCase();
      if (!tx.invoice_number?.toLowerCase().includes(q) && !tx.user?.name?.toLowerCase().includes(q) && !tx.user?.email?.toLowerCase().includes(q)) return false;
    }
    if (txFilterDateFrom && new Date(tx.created_at) < new Date(txFilterDateFrom)) return false;
    if (txFilterDateTo && new Date(tx.created_at) > /* @__PURE__ */ new Date(txFilterDateTo + "T23:59:59")) return false;
    return true;
  });
  const [bkFilterStatus, setBkFilterStatus] = useState("");
  const [bkFilterSearch, setBkFilterSearch] = useState("");
  const [bkFilterDateFrom, setBkFilterDateFrom] = useState("");
  const [bkFilterDateTo, setBkFilterDateTo] = useState("");
  const filteredBookings = (bookings || []).filter((bk) => {
    if (bkFilterStatus && bk.status !== bkFilterStatus) return false;
    if (bkFilterSearch) {
      const q = bkFilterSearch.toLowerCase();
      if (!bk.booking_code?.toLowerCase().includes(q) && !bk.patient?.name?.toLowerCase().includes(q) && !bk.patient?.email?.toLowerCase().includes(q) && !bk.therapist?.name?.toLowerCase().includes(q)) return false;
    }
    if (bkFilterDateFrom && bk.schedule?.date && new Date(bk.schedule.date) < new Date(bkFilterDateFrom)) return false;
    if (bkFilterDateTo && bk.schedule?.date && new Date(bk.schedule.date) > /* @__PURE__ */ new Date(bkFilterDateTo + "T23:59:59")) return false;
    return true;
  });
  const [scFilterSearch, setScFilterSearch] = useState("");
  const [scFilterDateFrom, setScFilterDateFrom] = useState("");
  const [scFilterDateTo, setScFilterDateTo] = useState("");
  const [scFilterTherapist, setScFilterTherapist] = useState("");
  const filteredSchedules = (schedules || []).filter((sc) => {
    if (scFilterTherapist && String(sc.therapist?.id) !== String(scFilterTherapist) && String(sc.extendedProps?.therapist?.id) !== String(scFilterTherapist)) return false;
    if (scFilterSearch) {
      const q = scFilterSearch.toLowerCase();
      const th = (sc.extendedProps?.therapist?.name || sc.title || "").toLowerCase();
      if (!th.includes(q)) return false;
    }
    const dateVal = sc.start || sc.date;
    if (scFilterDateFrom && dateVal && new Date(dateVal) < new Date(scFilterDateFrom)) return false;
    if (scFilterDateTo && dateVal && new Date(dateVal) > /* @__PURE__ */ new Date(scFilterDateTo + "T23:59:59")) return false;
    return true;
  });
  const activityLog = useMemo(() => {
    const logs = [];
    (transactions || []).forEach((tx) => {
      logs.push({
        id: `tx-submit-${tx.id}`,
        type: "payment_submitted",
        icon: "💸",
        color: "amber",
        actor: tx.user?.name || "Pasien",
        actorRole: "Pasien",
        action: "mengajukan pembayaran",
        subject: tx.invoice_number,
        detail: `Rp ${new Intl.NumberFormat("id-ID").format(tx.amount || 0)} · ${tx.payment_bank || "-"}`,
        date: tx.created_at
      });
      if (tx.status === "paid" && tx.validated_at) {
        const validator = tx.validated_by_user?.name || tx.validated_by?.name || "Admin";
        logs.push({ id: `tx-valid-${tx.id}`, type: "payment_validated", icon: "✅", color: "emerald", actor: validator, actorRole: "Admin", action: "memvalidasi pembayaran", subject: tx.invoice_number, detail: `Pasien: ${tx.user?.name || "-"} · Rp ${new Intl.NumberFormat("id-ID").format(tx.amount || 0)}`, date: tx.validated_at });
      }
      if (tx.status === "rejected") {
        const validator = tx.validated_by_user?.name || tx.validated_by?.name || "Admin";
        logs.push({ id: `tx-reject-${tx.id}`, type: "payment_rejected", icon: "❌", color: "rose", actor: validator, actorRole: "Admin", action: "menolak pembayaran", subject: tx.invoice_number, detail: `Pasien: ${tx.user?.name || "-"} · Alasan: ${tx.rejection_reason || "-"}`, date: tx.updated_at || tx.created_at });
      }
    });
    (bookings || []).forEach((booking) => {
      logs.push({ id: `booking-created-${booking.id}`, type: "booking_created", icon: "📋", color: "indigo", actor: booking.patient?.name || "Pasien", actorRole: "Pasien", action: "membuat booking", subject: booking.booking_code, detail: `Paket ${booking.package_type || "-"} · ${booking.schedule?.date ? new Date(booking.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}`, date: booking.created_at });
      if (booking.status === "no_show") {
        logs.push({ id: `booking-noshow-${booking.id}`, type: "no_show", icon: "⚠️", color: "rose", actor: "Admin", actorRole: "Admin", action: "menandai no-show", subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || "-"} · Pihak: ${booking.no_show_party || "pasien"}`, date: booking.updated_at || booking.created_at });
      }
      if (booking.status === "completed") {
        logs.push({ id: `booking-done-${booking.id}`, type: "session_completed", icon: "🎯", color: "emerald", actor: booking.therapist?.name || "Terapis", actorRole: "Terapis", action: "menyelesaikan sesi", subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || "-"} · Outcome: ${booking.completion_outcome || "Normal"}`, date: booking.updated_at || booking.created_at });
      }
      if (booking.status === "cancelled") {
        logs.push({ id: `booking-cancel-${booking.id}`, type: "booking_cancelled", icon: "🚫", color: "gray", actor: "Admin", actorRole: "Admin", action: "membatalkan booking", subject: booking.booking_code, detail: `Pasien: ${booking.patient?.name || "-"}`, date: booking.updated_at || booking.created_at });
      }
    });
    return logs.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, bookings]);
  const [logFilterType, setLogFilterType] = useState("");
  const [logFilterSearch, setLogFilterSearch] = useState("");
  const [logFilterDateFrom, setLogFilterDateFrom] = useState("");
  const [logFilterDateTo, setLogFilterDateTo] = useState("");
  const filteredLog = useMemo(() => {
    return activityLog.filter((log) => {
      if (logFilterType && log.type !== logFilterType) return false;
      if (logFilterSearch) {
        const q = logFilterSearch.toLowerCase();
        if (!log.actor?.toLowerCase().includes(q) && !log.subject?.toLowerCase().includes(q) && !log.detail?.toLowerCase().includes(q) && !log.action?.toLowerCase().includes(q)) return false;
      }
      if (logFilterDateFrom && new Date(log.date) < new Date(logFilterDateFrom)) return false;
      if (logFilterDateTo && new Date(log.date) > /* @__PURE__ */ new Date(logFilterDateTo + "T23:59:59")) return false;
      return true;
    });
  }, [activityLog, logFilterType, logFilterSearch, logFilterDateFrom, logFilterDateTo]);
  const [txPage, setTxPage] = useState(1);
  const [bookPage, setBookPage] = useState(1);
  const [logPage, setLogPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    setTxPage(1);
  }, [txFilterSearch, txFilterStatus, txFilterDateFrom, txFilterDateTo]);
  useEffect(() => {
    setBookPage(1);
  }, [bkFilterSearch, bkFilterStatus, bkFilterDateFrom, bkFilterDateTo]);
  useEffect(() => {
    setLogPage(1);
  }, [logFilterType, logFilterSearch, logFilterDateFrom, logFilterDateTo]);
  const txCurrent = filteredTransactions.slice((txPage - 1) * itemsPerPage, txPage * itemsPerPage);
  const txTotalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const bookCurrent = filteredBookings.slice((bookPage - 1) * itemsPerPage, bookPage * itemsPerPage);
  const bookTotalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const logCurrent = filteredLog.slice((logPage - 1) * itemsPerPage, logPage * itemsPerPage);
  const logTotalPages = Math.ceil(filteredLog.length / itemsPerPage);
  const downloadCSVBookings = () => {
    const headers = ["Kode Booking", "Paket", "Pasien", "Email Pasien", "Terapis", "Tanggal Sesi", "Jam", "Status", "Tanggal Dibuat"];
    const rows = filteredBookings.map((bk) => [
      bk.booking_code || "",
      bk.package_type?.toUpperCase() || "",
      bk.patient?.name || "",
      bk.patient?.email || "",
      bk.therapist?.name || bk.schedule?.therapist?.name || "-",
      bk.schedule?.date ? new Date(bk.schedule.date).toLocaleDateString("id-ID") : "-",
      bk.schedule?.start_time?.substring(0, 5) || "-",
      bk.status || "",
      bk.created_at ? new Date(bk.created_at).toLocaleDateString("id-ID") : ""
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking_indepth_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadCSVSchedules = () => {
    const headers = ["Terapis", "Tanggal", "Jam Mulai", "Jam Selesai", "Status"];
    const rows = filteredSchedules.map((sc) => [
      sc.extendedProps?.therapist?.name || sc.title || "-",
      sc.start ? new Date(sc.start).toLocaleDateString("id-ID") : sc.date ? new Date(sc.date).toLocaleDateString("id-ID") : "-",
      sc.extendedProps?.start_time || sc.start_time || "-",
      sc.extendedProps?.end_time || sc.end_time || "-",
      sc.extendedProps?.bookings?.length > 0 ? "Terisi" : "Tersedia"
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jadwal_indepth_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadCSVLog = () => {
    const headers = ["Tanggal", "Jam", "Pelaku", "Role", "Aksi", "Subjek", "Detail"];
    const rows = filteredLog.map((log) => {
      const d = new Date(log.date);
      return [
        d.toLocaleDateString("id-ID"),
        d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        log.actor,
        log.actorRole,
        log.action,
        log.subject,
        log.detail
      ];
    });
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `log_kegiatan_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const downloadCSV = () => {
    const headers = ["Invoice", "Bank", "Nama", "Email", "Layanan", "Nominal (Rp)", "Status", "Tanggal", "Divalidasi Oleh", "Tanggal Validasi"];
    const rows = filteredTransactions.map((tx) => [
      tx.invoice_number || "",
      tx.payment_bank || "-",
      tx.user?.name || "",
      tx.user?.email || "",
      tx.transactionable_type?.includes("Booking") ? `Booking - ${tx.transactionable?.package_type || ""}` : tx.transactionable_type?.split("\\").pop() || "",
      tx.amount || 0,
      tx.status === "paid" ? "Valid" : tx.status === "rejected" ? "Ditolak" : tx.status === "pending" ? "Menunggu" : tx.status,
      tx.created_at ? new Date(tx.created_at).toLocaleDateString("id-ID") : "",
      tx.validated_by_user?.name || tx.validated_by?.name || "",
      tx.validated_at ? new Date(tx.validated_at).toLocaleDateString("id-ID") : ""
    ]);
    const csvContent = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaksi_indepth_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const tabs = [
    { id: "schedules", label: "Jadwal", icon: Calendar, count: filteredSchedules.length, total: schedules?.length || 0 },
    { id: "bookings", label: "Booking", icon: Users, count: filteredBookings.length, total: bookings?.length || 0 },
    { id: "transactions", label: "Pembayaran", icon: CreditCard, count: filteredTransactions.length, total: transactions?.length || 0 },
    { id: "activity", label: "Log Kegiatan", icon: Activity, count: filteredLog.length, total: activityLog.length }
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCalendarView("timeGridDay");
        if (calendarRef.current) {
          const api = calendarRef.current.getApi();
          if (api.view.type.includes("Grid") && api.view.type !== "timeGridDay") {
            api.changeView("timeGridDay");
          }
        }
      } else {
        setCalendarView("timeGridWeek");
        if (calendarRef.current) {
          const api = calendarRef.current.getApi();
          if (api.view.type.includes("Grid") && api.view.type !== "dayGridMonth" && api.view.type !== "timeGridWeek") {
            api.changeView("timeGridWeek");
          }
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (therapistId !== (filters.therapist_id || "")) {
      router.get(route("admin.orders.index"), { ...filters, therapist_id: therapistId }, { preserveState: true, replace: true });
    }
  }, [therapistId]);
  const handleEventClick = (info) => router.visit(route("admin.schedules.show", info.event.id));
  const handleAssign = (bookingId) => patch(route("admin.bookings.assign-therapist", bookingId), { onSuccess: () => setEditingBooking(null) });
  const handleReschedule = (e) => {
    e.preventDefault();
    if (validateReschedTx) {
      router.post(route("admin.transactions.validate", validateReschedTx.id), {
        new_schedule_id: rescheduleData.new_schedule_id,
        reschedule_reason: rescheduleData.reschedule_reason
      }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setReschedulingBooking(null);
          setValidateReschedTx(null);
          resetReschedule();
        }
      });
    } else {
      postReschedule(route("admin.bookings.reschedule", reschedulingBooking.id), { onSuccess: () => {
        setReschedulingBooking(null);
        resetReschedule();
      } });
    }
  };
  const handleNoShow = (e) => {
    e.preventDefault();
    postNoShow(route("admin.bookings.no-show", noShowBooking.id), { onSuccess: () => {
      setNoShowBooking(null);
      resetNoShow();
    } });
  };
  const handleValidate = (tx) => {
    setValidatingTx(tx.id);
    router.post(route("admin.transactions.validate", tx.id), {}, {
      preserveScroll: true,
      preserveState: true,
      onFinish: () => setValidatingTx(null)
    });
  };
  const submitReject = (e) => {
    e.preventDefault();
    rejectPost(route("admin.transactions.reject", selectedReject.id), { onSuccess: () => {
      setSelectedReject(null);
      resetReject();
    } });
  };
  const getStatusBadge = (status) => {
    const s = { pending_screening: "bg-yellow-100 text-yellow-800", pending_payment: "bg-blue-100 text-blue-800", pending_validation: "bg-indigo-100 text-indigo-800", confirmed: "bg-green-100 text-green-800", completed: "bg-gray-100 text-gray-800", cancelled: "bg-red-100 text-red-800" };
    const l = { pending_screening: "Menunggu Skrining", pending_payment: "Menunggu Bayar", pending_validation: "Menunggu Validasi", confirmed: "Dikonfirmasi", completed: "Selesai", cancelled: "Dibatalkan" };
    return /* @__PURE__ */ jsx("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s[status] || s.pending_payment}`, children: l[status] || status });
  };
  const formatSchedule = (tx) => {
    const booking = tx.transactionable;
    if (!booking?.schedule) return null;
    const schedule = booking.schedule;
    try {
      return { dateStr: new Date(schedule.date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" }), startTime: schedule.start_time?.substring(0, 5) || "--:--", endTime: schedule.end_time?.substring(0, 5) || "--:--" };
    } catch {
      return null;
    }
  };
  const pendingTxCount = transactions?.filter((t) => t.status === "pending")?.length || 0;
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Manajemen Order" }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1", children: "Mengelola Jadwal, Pasien dan Pembayaran" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Manajemen Order" }),
        /* @__PURE__ */ jsx("style", { children: calendarStyles }),
        /* @__PURE__ */ jsx("div", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
          usePage().props.flash?.success && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50", children: usePage().props.flash.success }),
          (usePage().props.flash?.error || usePage().props.errors?.error) && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50", children: usePage().props.flash?.error || usePage().props.errors?.error }),
          flash?.success && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 mb-4", children: flash.success }),
          (flash?.error || pageErrors?.error) && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 mb-4", children: flash?.error || pageErrors?.error }),
          pageErrors?.error && /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50/80 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 backdrop-blur-xl", children: pageErrors.error }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:w-72 flex-shrink-0 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-white/50 dark:bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setActiveTab(tab.id),
                  className: `w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 translate-x-1" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`,
                  children: [
                    /* @__PURE__ */ jsx(tab.icon, { className: `w-5 h-5 ${activeTab === tab.id ? "text-white" : "text-indigo-500"}` }),
                    /* @__PURE__ */ jsx("span", { className: "flex-1 text-left", children: tab.label }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      tab.id === "transactions" && pendingTxCount > 0 && /* @__PURE__ */ jsx("span", { className: `w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-amber-500 text-white animate-pulse"}`, children: pendingTxCount }),
                      activeTab === tab.id && /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 opacity-50" })
                    ] })
                  ]
                },
                tab.id
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50/50 dark:bg-indigo-950/10 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/30 p-6", children: [
                /* @__PURE__ */ jsxs("h4", { className: "flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-500 uppercase mb-4", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
                  " Ringkasan"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Total Slot Jadwal" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: schedules?.length || 0 })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Total Booking" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: bookings?.length || 0 })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase", children: "Transaksi Pending" }),
                    /* @__PURE__ */ jsx("p", { className: `text-xl font-black ${pendingTxCount > 0 ? "text-amber-600" : "text-emerald-600"}`, children: pendingTxCount })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
              activeTab === "schedules" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
                  /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-teal-500 rounded-full" }),
                    "Kelola Jadwal Praktek"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-teal-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                      filteredSchedules.length,
                      " / ",
                      schedules?.length || 0,
                      " Jadwal"
                    ] }),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: downloadCSVSchedules,
                        className: "flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800/50 text-teal-700 dark:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all shadow-sm",
                        children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                          "Unduh CSV"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("button", { onClick: () => setIsDisabling(true), className: "px-5 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 whitespace-nowrap", children: "Liburkan Jadwal" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700/50 items-end", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Pilih Terapis" }),
                    /* @__PURE__ */ jsxs("select", { value: therapistId, onChange: (e) => setTherapistId(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all", children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Semua Terapis" }),
                      therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Dari Tanggal" }),
                    /* @__PURE__ */ jsx("input", { type: "date", value: scFilterDateFrom, onChange: (e) => setScFilterDateFrom(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all", title: "Dari tanggal" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 lg:col-span-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Sampai Tanggal" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap sm:flex-nowrap", children: [
                      /* @__PURE__ */ jsx("input", { type: "date", value: scFilterDateTo, onChange: (e) => setScFilterDateTo(e.target.value), className: "w-[140px] px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all shrink-0", title: "Sampai tanggal" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shrink-0 h-[42px]", children: [
                        /* @__PURE__ */ jsx("button", { onClick: () => {
                          const d = /* @__PURE__ */ new Date();
                          const day = d.getDay();
                          const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                          setScFilterDateFrom(new Date(d.setDate(diff)).toISOString().split("T")[0]);
                          setScFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split("T")[0]);
                        }, className: `px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === (function() {
                          const d = /* @__PURE__ */ new Date();
                          const day = d.getDay();
                          return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split("T")[0];
                        })() && scFilterDateTo === (function() {
                          const d = /* @__PURE__ */ new Date();
                          const day = d.getDay();
                          return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split("T")[0];
                        })() ? "bg-teal-500 text-white shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400"}`, children: "Minggu" }),
                        /* @__PURE__ */ jsx("button", { onClick: () => {
                          const d = /* @__PURE__ */ new Date();
                          setScFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0]);
                          setScFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0]);
                        }, className: `px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString().split("T")[0] && scFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).toISOString().split("T")[0] ? "bg-teal-500 text-white shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400"}`, children: "Bulan" }),
                        /* @__PURE__ */ jsx("button", { onClick: () => {
                          const d = /* @__PURE__ */ new Date();
                          setScFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split("T")[0]);
                          setScFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split("T")[0]);
                        }, className: `px-3 h-full rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${scFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1).toISOString().split("T")[0] && scFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31).toISOString().split("T")[0] ? "bg-teal-500 text-white shadow-md" : "hover:bg-teal-50 dark:hover:bg-teal-900/40 text-gray-500 dark:text-gray-400"}`, children: "Tahun" })
                      ] }),
                      (therapistId || scFilterSearch || scFilterDateFrom || scFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                        setTherapistId("");
                        setScFilterSearch("");
                        setScFilterDateFrom("");
                        setScFilterDateTo("");
                        if (calendarRef.current) {
                          const api = calendarRef.current.getApi();
                          api.today();
                        }
                      }, className: "shrink-0 px-3 h-[42px] bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all flex items-center justify-center", title: "Reset filter", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-900/20 rounded-[2rem] transition-colors overflow-hidden", children: /* @__PURE__ */ jsx(
                  FullCalendar,
                  {
                    ref: calendarRef,
                    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialView: calendarView,
                    initialDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"),
                    headerToolbar: {
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay"
                    },
                    views: {
                      timeGridWeek: {
                        duration: { days: 7 },
                        buttonText: "7 Hari Rolling"
                      }
                    },
                    locale: "id",
                    slotMinTime: "08:00:00",
                    slotMaxTime: "22:00:00",
                    slotDuration: "01:00:00",
                    allDaySlot: false,
                    weekends: true,
                    events: schedules,
                    eventClick: handleEventClick,
                    editable: false,
                    droppable: false,
                    eventContent: renderEventContent,
                    height: "auto",
                    expandRows: true,
                    stickyHeaderDates: true,
                    nowIndicator: true
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/50 flex-wrap", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Penuh (Terisi)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tersedia (1 Slot / Terapis)" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-gray-400" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Tertutup (Kadaluarsa)" })
                  ] })
                ] })
              ] }) }, "schedules"),
              activeTab === "bookings" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 bg-indigo-50/30 dark:bg-indigo-950/20", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-600 rounded-full" }),
                      "Booking Pasien"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                        setBkFilterDateFrom(new Date(d.setDate(diff)).toISOString().split("T")[0]);
                        setBkFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split("T")[0];
                      })() && bkFilterDateTo === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split("T")[0];
                      })() ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Minggu Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setBkFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0]);
                        setBkFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString().split("T")[0] && bkFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).toISOString().split("T")[0] ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Bulan Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setBkFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split("T")[0]);
                        setBkFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${bkFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1).toISOString().split("T")[0] && bkFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31).toISOString().split("T")[0] ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Tahun Ini" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                        filteredBookings.length,
                        " / ",
                        bookings?.length || 0,
                        " Booking"
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: downloadCSVBookings,
                          className: "flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm",
                          children: [
                            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                            "Unduh CSV"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 text-left", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Cari Booking" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Kode/pasien/terapis...",
                            value: bkFilterSearch,
                            onChange: (e) => setBkFilterSearch(e.target.value),
                            className: "w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left", children: "Internal Status" }),
                      /* @__PURE__ */ jsxs("select", { value: bkFilterStatus, onChange: (e) => setBkFilterStatus(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Semua Status" }),
                        /* @__PURE__ */ jsx("option", { value: "pending_payment", children: "Menunggu Bayar" }),
                        /* @__PURE__ */ jsx("option", { value: "pending_validation", children: "Menunggu Validasi" }),
                        /* @__PURE__ */ jsx("option", { value: "confirmed", children: "Dikonfirmasi" }),
                        /* @__PURE__ */ jsx("option", { value: "in_progress", children: "Berlangsung" }),
                        /* @__PURE__ */ jsx("option", { value: "completed", children: "Selesai" }),
                        /* @__PURE__ */ jsx("option", { value: "cancelled", children: "Dibatalkan" }),
                        /* @__PURE__ */ jsx("option", { value: "no_show", children: "No-Show" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left", children: "Dari Tanggal" }),
                      /* @__PURE__ */ jsx("input", { type: "date", value: bkFilterDateFrom, onChange: (e) => setBkFilterDateFrom(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", title: "Dari tanggal sesi" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left", children: "Sampai Tanggal" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx("input", { type: "date", value: bkFilterDateTo, onChange: (e) => setBkFilterDateTo(e.target.value), className: "flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", title: "Sampai tanggal sesi" }),
                        (bkFilterStatus || bkFilterSearch || bkFilterDateFrom || bkFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                          setBkFilterStatus("");
                          setBkFilterSearch("");
                          setBkFilterDateFrom("");
                          setBkFilterDateTo("");
                        }, className: "px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all", title: "Reset filter", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30", children: [
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Info Booking" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Pasien & Screening" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Jadwal" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Status" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Terapis & Aksi" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800/50", children: [
                      bookCurrent.map((booking) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                        /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-900 dark:text-white mb-1", children: booking.booking_code }),
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md w-fit", children: booking.package_type?.toUpperCase() || "KONSULTASI" })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxs("div", { children: [
                            /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-gray-900 dark:text-white", children: booking.patient?.name }),
                            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: booking.patient?.email }),
                            booking.patient?.phone && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 mt-0.5", children: booking.patient.phone }),
                            booking.patient?.id && /* @__PURE__ */ jsxs(Link, { href: route("admin.users.show", { id: booking.patient.id }), className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 mt-2 flex items-center gap-1 w-fit group/link", children: [
                              "Lihat Pasien",
                              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 group-hover/link:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 5l7 7-7 7" }) })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                              /* @__PURE__ */ jsx("div", { className: "w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1 my-1", children: /* @__PURE__ */ jsx("div", { className: `h-1 rounded-full ${booking.patient_profile_stats?.percentage === 100 ? "bg-emerald-500" : "bg-amber-500"}`, style: { width: `${booking.patient_profile_stats?.percentage || 0}%` } }) }),
                              /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-gray-400 uppercase", children: [
                                booking.patient_profile_stats?.percentage || 0,
                                "%"
                              ] })
                            ] }),
                            booking.patient?.screening_completed_at ? /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-emerald-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3", children: "OK" }) : /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-500 uppercase border-l border-gray-200 dark:border-gray-700 pl-3", children: "No" })
                          ] })
                        ] }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: booking.schedule ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: new Date(booking.schedule.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) }),
                          /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-500", children: [
                            booking.schedule.start_time?.substring(0, 5),
                            " - ",
                            booking.schedule.end_time?.substring(0, 5),
                            " WIB"
                          ] })
                        ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 italic", children: "No Slot" }) }),
                        /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: getStatusBadge(booking.status) }),
                        /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: editingBooking === booking.id ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-3 rounded-xl border border-white dark:border-gray-700 shadow-lg", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest", children: "Assign Terapis" }),
                          /* @__PURE__ */ jsxs("select", { className: "text-xs bg-gray-50 dark:bg-gray-900 border-none rounded-lg focus:ring-2 focus:ring-indigo-500/20", value: assignData.therapist_id, onChange: (e) => setAssignData("therapist_id", e.target.value), children: [
                            /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Terapis" }),
                            therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-1", children: [
                            /* @__PURE__ */ jsx("button", { onClick: () => handleAssign(booking.id), className: "flex-1 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase rounded-lg disabled:opacity-50", disabled: assigning || !assignData.therapist_id, children: "Simpan" }),
                            /* @__PURE__ */ jsx("button", { onClick: () => setEditingBooking(null), className: "flex-1 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-black uppercase rounded-lg", children: "Batal" })
                          ] })
                        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between group/tp", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5", children: "PJ" }),
                              booking.therapist ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-900 dark:text-white", children: booking.therapist.name }) : /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-amber-500", children: ["pending_payment", "pending_validation"].includes(booking.status) ? "⏳ Otomatis" : "BELUM" })
                            ] }),
                            /* @__PURE__ */ jsx("button", { onClick: () => {
                              setEditingBooking(booking.id);
                              setAssignData("therapist_id", booking.therapist_id || "");
                            }, className: "p-1.5 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg opacity-0 group-hover:opacity-100 group-hover/tp:opacity-100 transition-all", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" }) }) })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800/50", children: [
                            booking.schedule_id && /* @__PURE__ */ jsx(Link, { href: route("admin.schedules.show", booking.schedule_id), className: "px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500/50 hover:text-indigo-500 transition-all", children: "Detail" }),
                            ["confirmed", "in_progress"].includes(booking.status) && /* @__PURE__ */ jsxs(Fragment, { children: [
                              /* @__PURE__ */ jsx("button", { onClick: () => setReschedulingBooking(booking), className: "px-2 py-1.5 bg-amber-500 text-white text-[9px] font-black uppercase rounded-lg", children: "Reschedule" }),
                              /* @__PURE__ */ jsx("button", { onClick: () => setNoShowBooking(booking), className: "px-2 py-1.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-lg", children: "No-Show" })
                            ] })
                          ] })
                        ] }) }) })
                      ] }, booking.id)),
                      bookCurrent.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: "5", className: "px-8 py-20 text-center", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-[0.2em] text-xs", children: "Tidak ada booking yang cocok." }),
                        (bkFilterStatus || bkFilterSearch || bkFilterDateFrom || bkFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                          setBkFilterStatus("");
                          setBkFilterSearch("");
                          setBkFilterDateFrom("");
                          setBkFilterDateTo("");
                        }, className: "mt-4 text-[10px] font-black text-indigo-600 uppercase underline", children: "Reset Filter" })
                      ] }) })
                    ] })
                  ] }),
                  filteredBookings.length > 0 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between bg-white dark:bg-gray-800/50", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-gray-500", children: [
                      "Menampilkan ",
                      (bookPage - 1) * itemsPerPage + 1,
                      " sampai ",
                      Math.min(bookPage * itemsPerPage, filteredBookings.length),
                      " dari ",
                      filteredBookings.length
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setBookPage((p) => Math.max(1, p - 1)),
                          disabled: bookPage === 1,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Prev"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setBookPage((p) => Math.min(bookTotalPages, p + 1)),
                          disabled: bookPage === bookTotalPages,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Next"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) }, "bookings"),
              activeTab === "transactions" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 bg-emerald-50/30 dark:bg-emerald-950/20", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
                    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-emerald-500 rounded-full" }),
                      "Validasi Pembayaran"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                        setTxFilterDateFrom(new Date(d.setDate(diff)).toISOString().split("T")[0]);
                        setTxFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split("T")[0];
                      })() && txFilterDateTo === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split("T")[0];
                      })() ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400"}`, children: "Minggu Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setTxFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0]);
                        setTxFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString().split("T")[0] && txFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).toISOString().split("T")[0] ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400"}`, children: "Bulan Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setTxFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split("T")[0]);
                        setTxFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${txFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1).toISOString().split("T")[0] && txFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31).toISOString().split("T")[0] ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 text-gray-500 dark:text-gray-400"}`, children: "Tahun Ini" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                        filteredTransactions.length,
                        " / ",
                        transactions?.length || 0,
                        " Transaksi"
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: downloadCSV,
                          className: "flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all shadow-sm",
                          children: [
                            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                            "Unduh CSV"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Cari Transaksi" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Invoice / nama...",
                            value: txFilterSearch,
                            onChange: (e) => setTxFilterSearch(e.target.value),
                            className: "w-full pl-9 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Status Bayar" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            value: txFilterStatus,
                            onChange: (e) => setTxFilterStatus(e.target.value),
                            className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white appearance-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all",
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "", children: "Semua Status" }),
                              /* @__PURE__ */ jsx("option", { value: "pending", children: "⏳ Menunggu" }),
                              /* @__PURE__ */ jsx("option", { value: "paid", children: "✅ Valid / Lunas" }),
                              /* @__PURE__ */ jsx("option", { value: "rejected", children: "❌ Ditolak" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M19 9l-7 7-7-7" }) }) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Dari Tanggal" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "date",
                          value: txFilterDateFrom,
                          onChange: (e) => setTxFilterDateFrom(e.target.value),
                          className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all",
                          title: "Dari tanggal"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Sampai Tanggal" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "date",
                            value: txFilterDateTo,
                            onChange: (e) => setTxFilterDateTo(e.target.value),
                            className: "flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all",
                            title: "Sampai tanggal"
                          }
                        ),
                        (txFilterStatus || txFilterSearch || txFilterDateFrom || txFilterDateTo) && /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => {
                              setTxFilterStatus("");
                              setTxFilterSearch("");
                              setTxFilterDateFrom("");
                              setTxFilterDateTo("");
                            },
                            className: "px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all",
                            title: "Reset filter",
                            children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) })
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
                    /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/50", children: /* @__PURE__ */ jsxs("tr", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-white/40 dark:border-gray-700/30", children: [
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Invoice" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Pengguna" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Layanan" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Nominal" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Bukti" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5", children: "Status" }),
                      /* @__PURE__ */ jsx("th", { className: "px-6 py-5 text-center", children: "Aksi" })
                    ] }) }),
                    /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800/50", children: [
                      txCurrent.map((tx) => {
                        const scheduleInfo = formatSchedule(tx);
                        const isBooking = tx.transactionable_type?.includes("Booking");
                        const hasDiscount = tx.transactionable?.user_voucher?.voucher;
                        const booking = tx.transactionable;
                        const user = usePage().props.auth.user;
                        const isAdminOrSuperAdmin = user.roles.some((r) => ["admin", "super_admin"].includes(r.name));
                        const isAssignedTherapist = booking?.therapist_id === user.id;
                        return /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all", children: [
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 items-start", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-900 dark:text-white mb-1", children: tx.invoice_number }),
                            /* @__PURE__ */ jsx("span", { className: "text-[9px] text-gray-400", children: tx.created_at ? new Date(tx.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "" }),
                            tx.payment_proof && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-left bg-gray-50 dark:bg-gray-800/50 p-2 border border-gray-100 dark:border-gray-700/50 rounded-lg", children: [
                              /* @__PURE__ */ jsx("div", { className: "text-[9px] font-black text-gray-500 uppercase tracking-widest", children: tx.payment_bank }),
                              tx.payment_agreement_data?.payment_account_number && /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-800 dark:text-gray-300 font-bold", children: tx.payment_agreement_data.payment_account_number }),
                              tx.payment_agreement_data?.payment_account_name && /* @__PURE__ */ jsx("div", { className: "text-[9px] text-gray-400 capitalize", children: tx.payment_agreement_data.payment_account_name })
                            ] })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: tx.user?.name }),
                            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500", children: tx.user?.email }),
                            tx.user?.phone && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 mt-0.5", children: tx.user.phone }),
                            tx.user?.id && /* @__PURE__ */ jsxs(Link, { href: route("admin.users.show", { id: tx.user.id }), className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 mt-2 flex items-center gap-1 w-fit group/link", children: [
                              "Lihat Pasien",
                              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 group-hover/link:translate-x-0.5 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 5l7 7-7 7" }) })
                            ] })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-500/20 w-fit uppercase tracking-widest", children: isBooking ? "Booking" : tx.transactionable_type?.split("\\").pop() }),
                            isBooking && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-indigo-500 uppercase", children: tx.transactionable?.package_type || "Package" }),
                            scheduleInfo && /* @__PURE__ */ jsxs("div", { className: "flex flex-col mt-1", children: [
                              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-gray-600 dark:text-gray-400", children: [
                                "📅 ",
                                scheduleInfo.dateStr
                              ] }),
                              /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-gray-600 dark:text-gray-400", children: [
                                "🕐 ",
                                scheduleInfo.startTime,
                                " – ",
                                scheduleInfo.endTime
                              ] })
                            ] }),
                            isBooking && booking && booking.status === "confirmed" && (isAssignedTherapist || isAdminOrSuperAdmin) && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => setReschedulingBooking(booking),
                                  className: "px-3 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-900/30 transition-all hover:bg-amber-100",
                                  children: "Reschedule"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  onClick: () => setNoShowBooking(booking),
                                  className: "px-3 py-1 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100 dark:border-red-900/30 transition-all hover:bg-red-100",
                                  children: "No-Show / Batal"
                                }
                              )
                            ] })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsxs("span", { className: "text-sm font-black text-gray-900 dark:text-white", children: [
                              "Rp ",
                              new Intl.NumberFormat("id-ID").format(tx.amount || 0)
                            ] }),
                            hasDiscount ? /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-col", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-rose-500 uppercase", children: "🏷️ DISKON" }),
                              /* @__PURE__ */ jsxs("span", { className: "px-2 py-0.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 text-[10px] font-black rounded-md border border-rose-100 dark:border-rose-800 line-through w-fit", children: [
                                "Rp ",
                                new Intl.NumberFormat("id-ID").format((tx.amount || 0) + (tx.transactionable.user_voucher.voucher.discount_amount || 0))
                              ] })
                            ] }) : /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold text-gray-400 uppercase mt-1", children: "Normal" })
                          ] }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: tx.payment_proof ? /* @__PURE__ */ jsxs("a", { href: `/storage/${tx.payment_proof}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 group/proof", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover/proof:bg-indigo-500 group-hover/proof:text-white transition-all", children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }) }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-500 group-hover/proof:text-indigo-600 uppercase", children: "Lihat" })
                          ] }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-rose-500 uppercase italic", children: "Belum Upload" }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsx("span", { className: `px-3 py-1 inline-flex text-[10px] font-black uppercase tracking-widest rounded-full border ${tx.status === "paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : tx.status === "rejected" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : tx.status === "pending" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"}`, children: tx.status === "paid" ? "Valid" : tx.status === "rejected" ? "Ditolak" : tx.status === "pending" ? "Menunggu" : tx.status }) }),
                          /* @__PURE__ */ jsx("td", { className: "px-6 py-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                            tx.status === "pending" && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
                              tx.payment_proof ? /* @__PURE__ */ jsx("button", { disabled: validatingTx === tx.id, onClick: () => setValidationChoiceTx(tx), className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50", children: validatingTx === tx.id ? "..." : "Validasi" }) : /* @__PURE__ */ jsx("span", { className: "px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-400 text-[9px] font-black uppercase rounded-xl border border-gray-200 dark:border-gray-700 cursor-not-allowed", children: "Bukti Belum Ada" }),
                              /* @__PURE__ */ jsx("button", { onClick: () => setSelectedReject(tx), className: "px-4 py-2 bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-rose-600/20 transition-all", children: "Tolak" })
                            ] }),
                            tx.status === "paid" && tx.validated_at && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                              /* @__PURE__ */ jsxs("span", { className: "text-[9px] text-gray-400 font-bold", children: [
                                "✓ ",
                                new Date(tx.validated_at).toLocaleDateString("id-ID")
                              ] }),
                              tx.validated_by && /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-indigo-500 uppercase flex items-center gap-1", children: [
                                /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3 h-3" }),
                                tx.validated_by_user?.name || tx.validated_by?.name || "Admin"
                              ] })
                            ] }),
                            tx.status === "pending" && !tx.payment_agreement_data?.applied_voucher_id && /* @__PURE__ */ jsx(Fragment, { children: voucherTxId === tx.id ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 w-full mt-1", children: [
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  autoFocus: true,
                                  className: "w-full px-3 py-1.5 text-[10px] font-bold bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none uppercase tracking-wider",
                                  placeholder: "Kode voucher...",
                                  value: adminVoucherCode,
                                  onChange: (e) => setAdminVoucherCode(e.target.value.toUpperCase()),
                                  onKeyDown: (e) => e.key === "Escape" && setVoucherTxId(null)
                                }
                              ),
                              /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                                /* @__PURE__ */ jsx(
                                  "button",
                                  {
                                    disabled: !adminVoucherCode || applyingVoucher,
                                    onClick: () => handleAdminApplyVoucher(tx),
                                    className: "flex-1 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-lg disabled:opacity-50",
                                    children: applyingVoucher ? "..." : "Terapkan"
                                  }
                                ),
                                /* @__PURE__ */ jsx("button", { onClick: () => {
                                  setVoucherTxId(null);
                                  setAdminVoucherCode("");
                                }, className: "flex-1 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-[9px] font-black uppercase rounded-lg", children: "Batal" })
                              ] })
                            ] }) : /* @__PURE__ */ jsx(
                              "button",
                              {
                                onClick: () => {
                                  setVoucherTxId(tx.id);
                                  setAdminVoucherCode("");
                                },
                                className: "px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 transition-all",
                                children: "🏷️ Diskon"
                              }
                            ) }),
                            tx.payment_agreement_data?.applied_voucher_code && /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-emerald-500 uppercase mt-1", children: [
                              "✓ ",
                              tx.payment_agreement_data.applied_voucher_code
                            ] })
                          ] }) })
                        ] }, tx.id);
                      }),
                      txCurrent.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: "7", className: "px-8 py-20 text-center", children: [
                        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-10 h-10 text-gray-200 mx-auto mb-3" }),
                        /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-[0.2em] text-xs", children: "Tidak ada transaksi yang cocok." }),
                        (txFilterStatus || txFilterSearch || txFilterDateFrom || txFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                          setTxFilterStatus("");
                          setTxFilterSearch("");
                          setTxFilterDateFrom("");
                          setTxFilterDateTo("");
                        }, className: "mt-4 text-[10px] font-black text-emerald-600 uppercase underline", children: "Reset Filter" })
                      ] }) })
                    ] })
                  ] }),
                  filteredTransactions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between bg-white dark:bg-gray-800/50", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-gray-500", children: [
                      "Menampilkan ",
                      (txPage - 1) * itemsPerPage + 1,
                      " sampai ",
                      Math.min(txPage * itemsPerPage, filteredTransactions.length),
                      " dari ",
                      filteredTransactions.length
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setTxPage((p) => Math.max(1, p - 1)),
                          disabled: txPage === 1,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Prev"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setTxPage((p) => Math.min(txTotalPages, p + 1)),
                          disabled: txPage === txTotalPages,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Next"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) }, "transactions"),
              activeTab === "activity" && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/80 rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 overflow-hidden shadow-sm", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-8 border-b border-gray-50 dark:border-gray-700/50 bg-indigo-50/30 dark:bg-indigo-950/20", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-indigo-500 rounded-full" }),
                        "Log Kegiatan"
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1", children: "Riwayat aktivitas sistem · terbaru di atas" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
                        setLogFilterDateFrom(new Date(d.setDate(diff)).toISOString().split("T")[0]);
                        setLogFilterDateTo(new Date(d.setDate(diff + 6)).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))).toISOString().split("T")[0];
                      })() && logFilterDateTo === (function() {
                        const d = /* @__PURE__ */ new Date();
                        const day = d.getDay();
                        return new Date(d.setDate(d.getDate() - day + (day === 0 ? -6 : 1) + 6)).toISOString().split("T")[0];
                      })() ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Minggu Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setLogFilterDateFrom(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0]);
                        setLogFilterDateTo(new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString().split("T")[0] && logFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).toISOString().split("T")[0] ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Bulan Ini" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        const d = /* @__PURE__ */ new Date();
                        setLogFilterDateFrom(new Date(d.getFullYear(), 0, 1).toISOString().split("T")[0]);
                        setLogFilterDateTo(new Date(d.getFullYear(), 11, 31).toISOString().split("T")[0]);
                      }, className: `px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors border ${logFilterDateFrom === new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1).toISOString().split("T")[0] && logFilterDateTo === new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31).toISOString().split("T")[0] ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-gray-500 dark:text-gray-400"}`, children: "Tahun Ini" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs("span", { className: "px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest", children: [
                        filteredLog.length,
                        " / ",
                        activityLog.length,
                        " Aktivitas"
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: downloadCSVLog,
                          className: "flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all shadow-sm",
                          children: [
                            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                            "Unduh CSV"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left", children: "Cari Log" }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            placeholder: "Nama / kode / aksi...",
                            value: logFilterSearch,
                            onChange: (e) => setLogFilterSearch(e.target.value),
                            className: "w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left", children: "Tipe Log" }),
                      /* @__PURE__ */ jsxs("select", { value: logFilterType, onChange: (e) => setLogFilterType(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Semua Tipe" }),
                        /* @__PURE__ */ jsx("option", { value: "payment_submitted", children: "💸 Pembayaran Diajukan" }),
                        /* @__PURE__ */ jsx("option", { value: "payment_validated", children: "✅ Pembayaran Divalidasi" }),
                        /* @__PURE__ */ jsx("option", { value: "payment_rejected", children: "❌ Pembayaran Ditolak" }),
                        /* @__PURE__ */ jsx("option", { value: "booking_created", children: "📋 Booking Dibuat" }),
                        /* @__PURE__ */ jsx("option", { value: "no_show", children: "⚠️ No-Show" }),
                        /* @__PURE__ */ jsx("option", { value: "session_completed", children: "🎯 Sesi Selesai" }),
                        /* @__PURE__ */ jsx("option", { value: "booking_cancelled", children: "🚫 Booking Dibatalkan" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 text-left", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Dari Tanggal" }),
                      /* @__PURE__ */ jsx("input", { type: "date", value: logFilterDateFrom, onChange: (e) => setLogFilterDateFrom(e.target.value), className: "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", title: "Dari tanggal" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 text-left", children: [
                      /* @__PURE__ */ jsx("label", { className: "text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1", children: "Sampai Tanggal" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsx("input", { type: "date", value: logFilterDateTo, onChange: (e) => setLogFilterDateTo(e.target.value), className: "flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all", title: "Sampai tanggal" }),
                        (logFilterType || logFilterSearch || logFilterDateFrom || logFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                          setLogFilterType("");
                          setLogFilterSearch("");
                          setLogFilterDateFrom("");
                          setLogFilterDateTo("");
                        }, className: "px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-xl text-xs font-black hover:bg-rose-100 hover:text-rose-500 transition-all", title: "Reset filter", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) }) })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "px-8 py-6 pb-20", children: [
                  logCurrent.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
                    /* @__PURE__ */ jsx(Activity, { className: "w-12 h-12 text-gray-200 mx-auto mb-4" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-400 font-black uppercase tracking-widest text-xs", children: "Tidak ada aktivitas yang cocok." }),
                    (logFilterType || logFilterSearch || logFilterDateFrom || logFilterDateTo) && /* @__PURE__ */ jsx("button", { onClick: () => {
                      setLogFilterType("");
                      setLogFilterSearch("");
                      setLogFilterDateFrom("");
                      setLogFilterDateTo("");
                    }, className: "mt-4 text-[10px] font-black text-indigo-600 uppercase underline", children: "Reset Filter" })
                  ] }) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute left-[27px] top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-800 rounded-full" }),
                    /* @__PURE__ */ jsx("div", { className: "space-y-1", children: logCurrent.map((log) => {
                      const colorMap = {
                        emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
                        amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
                        rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50",
                        indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50",
                        gray: "bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                      };
                      const dotColorMap = {
                        emerald: "bg-emerald-500",
                        amber: "bg-amber-500",
                        rose: "bg-rose-500",
                        indigo: "bg-indigo-500",
                        gray: "bg-gray-400"
                      };
                      const isAdmin = log.actorRole === "Admin";
                      const d = new Date(log.date);
                      const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
                      const timeStr = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
                      return /* @__PURE__ */ jsxs("div", { className: "flex gap-5 items-start py-4 group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 rounded-2xl px-2 transition-all", children: [
                        /* @__PURE__ */ jsx("div", { className: "relative flex-shrink-0", style: { width: 56 }, children: /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl border-2 border-white dark:border-gray-900 shadow-md flex items-center justify-center text-base z-10 relative ${dotColorMap[log.color]}`, children: /* @__PURE__ */ jsx("span", { children: log.icon }) }) }),
                        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${colorMap[log.color]}`, children: [
                              isAdmin ? "👤" : "🧑",
                              " ",
                              log.actor,
                              " · ",
                              log.actorRole
                            ] }),
                            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-gray-700 dark:text-gray-300", children: log.action }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg", children: log.subject })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-0.5 truncate", children: log.detail }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
                            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-gray-300" }),
                            /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest", children: [
                              dateStr,
                              " · ",
                              timeStr,
                              " WIB"
                            ] })
                          ] })
                        ] })
                      ] }, log.id);
                    }) })
                  ] }),
                  activityLog.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-4 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-gray-500", children: [
                      "Menampilkan ",
                      (logPage - 1) * itemsPerPage + 1,
                      " sampai ",
                      Math.min(logPage * itemsPerPage, filteredLog.length),
                      " dari ",
                      filteredLog.length
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setLogPage((p) => Math.max(1, p - 1)),
                          disabled: logPage === 1,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Prev"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setLogPage((p) => Math.min(logTotalPages, p + 1)),
                          disabled: logPage === logTotalPages,
                          className: "px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition",
                          children: "Next"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }) }, "activity")
            ] }) })
          ] })
        ] }) }),
        reschedulingBooking !== null && typeof document !== "undefined" && createPortal(
          /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[200] flex items-center justify-center p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/70 backdrop-blur-md", onClick: () => setReschedulingBooking(null) }),
            /* @__PURE__ */ jsxs("div", { className: "relative bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-white/50 dark:border-gray-800 overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-amber-500 to-orange-500 px-10 pt-10 pb-8 relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-white uppercase tracking-tight", children: "Reschedule Sesi" }),
                      /* @__PURE__ */ jsx("p", { className: "text-amber-100 text-[10px] font-black uppercase tracking-widest", children: "Pindah Jadwal Pasien" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 mt-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-white/30 rounded-lg flex items-center justify-center text-xs font-black text-white", children: reschedulingBooking?.patient?.name?.charAt(0) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-white uppercase tracking-widest", children: reschedulingBooking?.patient?.name })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleReschedule, className: "px-10 py-8 space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "Pilih Jadwal Baru" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "new_schedule_id",
                        className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 transition-all appearance-none",
                        value: rescheduleData.new_schedule_id,
                        onChange: (e) => setRescheduleData("new_schedule_id", e.target.value),
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", children: "-- Pilih Slot Tersedia --" }),
                          availableSchedules.filter((s) => s.id !== reschedulingBooking?.schedule_id).map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                            s.therapist?.name,
                            " — ",
                            new Date(s.date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" }),
                            " — ",
                            s.start_time?.substring(0, 5),
                            " WIB"
                          ] }, s.id))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M19 9l-7 7-7-7" }) }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "Alasan Reschedule" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "reschedule_reason",
                      rows: "3",
                      className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-400 transition-all resize-none",
                      placeholder: "Tuliskan alasan perubahan jadwal...",
                      value: rescheduleData.reschedule_reason,
                      onChange: (e) => setRescheduleData("reschedule_reason", e.target.value),
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setReschedulingBooking(null);
                        setValidateReschedTx(null);
                      },
                      className: "flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all",
                      children: "Batal"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: rescheduling || !rescheduleData.new_schedule_id,
                      className: "flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/30 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95",
                      children: rescheduling ? "Memproses..." : "✓ Update Jadwal"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          document.body
        ),
        noShowBooking !== null && typeof document !== "undefined" && createPortal(
          /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[200] flex items-center justify-center p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/70 backdrop-blur-md", onClick: () => setNoShowBooking(null) }),
            /* @__PURE__ */ jsxs("div", { className: "relative bg-white dark:bg-gray-900 rounded-[3rem] w-full max-w-lg shadow-2xl border border-white/50 dark:border-gray-800 overflow-hidden", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-rose-500 to-rose-700 px-10 pt-10 pb-8 relative overflow-hidden", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-6 h-6 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-white uppercase tracking-tight", children: "Tandai Tidak Hadir" }),
                      /* @__PURE__ */ jsx("p", { className: "text-rose-100 text-[10px] font-black uppercase tracking-widest", children: "No-Show / Pembatalan" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 mt-1", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 text-white opacity-70" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-white uppercase tracking-widest font-mono", children: noShowBooking?.booking_code })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleNoShow, className: "px-10 py-8 space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: "Pihak yang Tidak Hadir" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "no_show_party",
                        className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all appearance-none",
                        value: noShowData.no_show_party,
                        onChange: (e) => setNoShowData("no_show_party", e.target.value),
                        required: true,
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "therapist", children: "Praktisi / Terapis (Tidak Hadir)" }),
                          /* @__PURE__ */ jsx("option", { value: "patient", children: "Pasien (Tidak Hadir)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M19 9l-7 7-7-7" }) }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1", children: [
                    "Keterangan Admin ",
                    /* @__PURE__ */ jsx("span", { className: "text-gray-300 normal-case font-bold", children: "(opsional)" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "no_show_reason",
                      rows: "3",
                      className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 transition-all resize-none",
                      placeholder: "Catatan tambahan untuk admin...",
                      value: noShowData.no_show_reason,
                      onChange: (e) => setNoShowData("no_show_reason", e.target.value)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setNoShowBooking(null),
                      className: "flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 transition-all",
                      children: "Batal"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: markingNoShow,
                      className: "flex-1 py-4 bg-gradient-to-r from-rose-500 to-rose-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:from-rose-600 hover:to-rose-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95",
                      children: markingNoShow ? "Memproses..." : "⚠ Tandai No-Show"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          document.body
        ),
        selectedReject && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-gray-100 dark:border-gray-800 shadow-2xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold dark:text-white mb-2", children: "Tolak Pembayaran" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              "Invoice: ",
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: selectedReject.invoice_number })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submitReject, children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3", children: "Alasan Penolakan" }),
              /* @__PURE__ */ jsx("textarea", { className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all min-h-[100px]", value: rejectData.rejection_reason, onChange: (e) => setRejectData("rejection_reason", e.target.value), required: true })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: rejecting, className: "!bg-red-600 hover:!bg-red-500 !rounded-2xl !px-6 !py-4 !text-xs !tracking-widest !font-black !h-auto !shadow-xl !shadow-red-600/20 !uppercase !w-full !justify-center", children: rejecting ? "Memproses..." : "Konfirmasi Penolakan" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSelectedReject(null), className: "text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors py-2", children: "Batal" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: !!validationChoiceTx, onClose: () => setValidationChoiceTx(null), maxWidth: "md", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2", children: "Pilih Opsi Validasi" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-8 font-medium", children: [
            "Anda akan memvalidasi pembayaran untuk ",
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-900 dark:text-white", children: [
              "#",
              validationChoiceTx?.invoice_number
            ] }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  handleValidate(validationChoiceTx);
                  setValidationChoiceTx(null);
                },
                className: "group flex items-center justify-between p-6 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-100 dark:border-emerald-800 rounded-2xl hover:border-emerald-500 transition-all text-left",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-black text-emerald-800 dark:text-emerald-400 uppercase text-xs mb-1", children: "Validasi Langsung" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest", children: "Sesuai jadwal pilihan pasien" })
                  ] }),
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setValidateReschedTx(validationChoiceTx);
                  if (validationChoiceTx?.transactionable) {
                    setReschedulingBooking(validationChoiceTx.transactionable);
                  }
                  setValidationChoiceTx(null);
                },
                className: "group flex items-center justify-between p-6 bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-100 dark:border-indigo-800 rounded-2xl hover:border-indigo-500 transition-all text-left",
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-black text-indigo-800 dark:text-indigo-400 uppercase text-xs mb-1", children: "Validasi & Reschedule" }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-indigo-600/70 font-bold uppercase tracking-widest", children: "Pindahkan ke slot lain" })
                  ] }),
                  /* @__PURE__ */ jsx(Calendar, { className: "w-6 h-6 text-indigo-500 group-hover:scale-110 transition-transform" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx(SecondaryButton, { className: "w-full justify-center py-4 rounded-xl font-black uppercase text-[10px] tracking-widest", onClick: () => setValidationChoiceTx(null), children: "Batal" }) })
        ] }) }),
        /* @__PURE__ */ jsx(Modal, { show: isDisabling, onClose: () => {
          setIsDisabling(false);
          resetDisable();
        }, children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2", children: "Liburkan Jadwal" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-6 font-medium", children: [
            "Ini akan menghapus semua slot jadwal yang ",
            /* @__PURE__ */ jsx("span", { className: "text-rose-500 font-bold", children: "belum dipesan" }),
            " pada rentang waktu yang dipilih."
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            postDisable(route("admin.schedules.bulk-delete"), {
              onSuccess: () => {
                setIsDisabling(false);
                resetDisable();
              }
            });
          }, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Terapis (Kosongkan jika semua)", className: "text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1" }),
                /* @__PURE__ */ jsxs("select", { value: disableData.therapist_id, onChange: (e) => setDisableData("therapist_id", e.target.value), className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all", children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Semua Terapis" }),
                  therapists.map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.name }, t.id))
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Dari Tanggal *", className: "text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1" }),
                  /* @__PURE__ */ jsx("input", { type: "date", required: true, value: disableData.date_from, onChange: (e) => setDisableData("date_from", e.target.value), className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Sampai Tanggal *", className: "text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1" }),
                  /* @__PURE__ */ jsx("input", { type: "date", required: true, value: disableData.date_to, onChange: (e) => setDisableData("date_to", e.target.value), className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Dari Jam *", className: "text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1" }),
                  /* @__PURE__ */ jsx("input", { type: "time", required: true, value: disableData.start_time, onChange: (e) => setDisableData("start_time", e.target.value), className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Sampai Jam *", className: "text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1" }),
                  /* @__PURE__ */ jsx("input", { type: "time", required: true, value: disableData.end_time, onChange: (e) => setDisableData("end_time", e.target.value), className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 mt-8", children: [
              /* @__PURE__ */ jsx(SecondaryButton, { onClick: () => setIsDisabling(false), className: "rounded-xl px-6 py-3 border-gray-200 dark:border-gray-700 font-black uppercase tracking-widest text-[10px] hover:bg-gray-50 dark:hover:bg-gray-800", children: "Batal" }),
              /* @__PURE__ */ jsx(PrimaryButton, { type: "submit", disabled: disabling, className: "!bg-rose-600 hover:!bg-rose-500 rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-rose-500/20 transition-all", children: disabling ? "Memproses..." : "Terapkan (Hapus)" })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  OrderManagementIndex as default
};
