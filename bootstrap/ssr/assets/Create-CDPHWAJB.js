import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-A9zMGcDB.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { R as RefundPolicyContent } from "./RefundPolicyContent-ReYH2tDD.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function TimeSlotPicker({ schedules = [], selectedScheduleId, onSelect, activeBooking }) {
  if (schedules.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400 text-sm italic text-center", children: "Belum ada jadwal yang tersedia untuk saat ini." });
  }
  const [filter, setFilter] = useState("week");
  const hasActiveBooking = !!activeBooking;
  const filteredSchedules = schedules.filter((curr) => {
    const safeDateStr = (curr.date || "").substring(0, 10);
    const dbDate = /* @__PURE__ */ new Date(`${safeDateStr}T00:00:00Z`);
    const idnFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(/* @__PURE__ */ new Date());
    const todayDate = /* @__PURE__ */ new Date(`${idnFormat}T00:00:00Z`);
    switch (filter) {
      case "day":
        return dbDate.getTime() === todayDate.getTime();
      case "week":
        const endOfWeek = new Date(todayDate);
        endOfWeek.setDate(todayDate.getDate() + 7);
        return dbDate.getTime() >= todayDate.getTime() && dbDate.getTime() <= endOfWeek.getTime();
      case "month":
        return dbDate.getUTCMonth() === todayDate.getUTCMonth() && dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
      case "year":
        return dbDate.getUTCFullYear() === todayDate.getUTCFullYear();
      default:
        return true;
    }
  });
  const grouped = filteredSchedules.reduce((acc, curr) => {
    const safeDateStr = (curr.date || "").substring(0, 10);
    if (!acc[safeDateStr]) acc[safeDateStr] = [];
    acc[safeDateStr].push(curr);
    return acc;
  }, {});
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    hasActiveBooking && /* @__PURE__ */ jsxs("div", { className: "p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-amber-800 dark:text-amber-300", children: "Anda memiliki sesi aktif. Selesaikan sesi tersebut untuk dapat memilih jadwal baru." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: [
      { id: "day", label: "Hari Ini" },
      { id: "week", label: "Minggu Ini" },
      { id: "month", label: "Bulan Ini" },
      { id: "year", label: "Tahun Ini" },
      { id: "all", label: "Semua Jadwal" }
    ].map((tab) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setFilter(tab.id),
        className: `px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 border ${filter === tab.id ? "bg-indigo-600 text-white border-indigo-600 shadow-md transform -translate-y-0.5" : "bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/60"}`,
        children: tab.label
      },
      tab.id
    )) }),
    Object.keys(grouped).length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-2xl text-gray-500 dark:text-gray-400 text-sm text-center italic", children: "Tidak ada jadwal yang sesuai dengan filter ini." }) : Object.entries(grouped).map(([date, slots]) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-2", children: new Date(date).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: slots.map((slot) => {
        const isSelected = selectedScheduleId === slot.id;
        const count = slot.bookings_count ?? 0;
        const now = /* @__PURE__ */ new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
        const parts = formatter.formatToParts(now).reduce((acc, part) => {
          acc[part.type] = part.value;
          return acc;
        }, {});
        const idnNow = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
        const bufferTime = new Date(idnNow.getTime() + 60 * 60 * 1e3);
        const [sh, sm, ss] = slot.start_time.split(":");
        const sd = new Date(slot.date);
        const slotStart = new Date(Date.UTC(sd.getUTCFullYear(), sd.getUTCMonth(), sd.getUTCDate(), sh, sm, ss));
        const isFull = slot.status === "full" || count >= slot.quota;
        const isPast = slotStart < bufferTime;
        const isDisabled = isFull || isPast || hasActiveBooking;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => !isDisabled && onSelect(slot.id),
            disabled: isDisabled,
            className: `
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                        ${isDisabled ? "bg-gray-100/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed" : ""}
                                        ${!isDisabled && isSelected ? "bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-md transform -translate-y-1" : ""}
                                        ${!isDisabled && !isSelected ? "bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm" : ""}
                                    `,
            children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-sm text-center", children: [
                slot.start_time?.substring(0, 5) || "--:--",
                " - ",
                slot.end_time?.substring(0, 5) || "--:--"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs mt-1", children: isFull ? "Penuh" : isPast ? "Lewat" : hasActiveBooking ? "Blokade" : `${slot.quota - count} slot sisa` })
            ]
          },
          slot.id
        );
      }) })
    ] }, date))
  ] });
}
const PRIVACY_POLICY = {
  updated: "24 Februari 2026",
  content: `InDepth Mental Wellness menghargai dan melindungi data pribadi setiap pengguna layanan kami, termasuk klien hipnoterapi, peserta seminar, siswa LMS, dan mitra affiliate.

Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi ini.

---

1. PENGUMPULAN DATA PRIBADI

Kami dapat mengumpulkan data berikut:

A. Data Identitas
- Nama lengkap
- Nomor KTP atau identitas resmi
- Tanggal lahir
- Jenis kelamin
- Alamat
- Nomor telepon
- Email

B. Data Kontak Darurat
- Nama kontak darurat
- Hubungan dengan klien
- Nomor telepon kontak darurat

C. Data Kesehatan dan Psikologis (Khusus Klien)
- Riwayat kesehatan
- Riwayat diagnosa
- Riwayat terapi sebelumnya
- Hasil screening awal
- Catatan sesi hipnoterapi

D. Data Akademik (Siswa LMS & Pelatihan)
- Riwayat kursus
- Hasil kuis dan ujian
- Sertifikat
- Status kelulusan
- Catatan evaluasi

E. Data Affiliate
- Data identitas
- Data rekening atau metode payout
- Data performa referral
- Data transaksi komisi

F. Data Teknis Website
- Alamat IP
- Browser
- Cookies
- Riwayat aktivitas di website
- Data transaksi WooCommerce

---

2. TUJUAN PENGGUNAAN DATA

Data digunakan untuk:
- Proses booking dan administrasi layanan
- Dokumentasi terapi
- Pelaksanaan pelatihan dan sertifikasi
- Proses pembayaran dan komisi affiliate
- Verifikasi identitas
- Pengiriman notifikasi
- Peningkatan kualitas layanan
- Kepentingan hukum dan perlindungan usaha

---

3. SISTEM DOKUMENTASI SESI

Seluruh sesi hipnoterapi direkam audio dan video untuk:
- Transparansi
- Perlindungan hukum
- Evaluasi profesional

Rekaman:
- Disimpan dalam sistem internal
- Tidak dipublikasikan
- Hanya dibuka jika diminta secara resmi oleh pihak berwenang

Setelah periode tertentu, rekaman dapat dianonimkan untuk keperluan akademik.

---

4. DASAR HUKUM PENGOLAHAN DATA

Pengolahan data dilakukan berdasarkan:
- Persetujuan pengguna
- Kewajiban kontraktual
- Kepentingan hukum yang sah
- Ketentuan Undang-Undang Perlindungan Data Pribadi Indonesia

---

5. PENYIMPANAN DAN KEAMANAN DATA

Kami menerapkan:
- Sistem akses berbasis role
- Enkripsi pada server
- Pembatasan akses internal
- Backup berkala
- Firewall dan proteksi keamanan

Data hanya dapat diakses oleh personel yang berwenang sesuai peran masing-masing.

---

6. PEMBAGIAN DATA KEPADA PIHAK KETIGA

Data dapat dibagikan kepada:
- Penyedia layanan pembayaran (misalnya payment gateway)
- Penyedia hosting dan infrastruktur teknologi
- Pihak berwenang berdasarkan permintaan resmi

Kami tidak menjual data pribadi kepada pihak lain.

---

7. HAK SUBJEK DATA

Pengguna memiliki hak untuk:
- Mengakses data pribadi
- Memperbaiki data yang tidak akurat
- Meminta penghapusan data (kecuali yang diwajibkan oleh hukum untuk disimpan)
- Menarik persetujuan pengolahan data

Permintaan dapat diajukan melalui email resmi kami.

---

8. COOKIES DAN TEKNOLOGI PELACAKAN

Website kami menggunakan cookies untuk:
- Autentikasi login
- Keamanan
- Analisis performa website
- Optimasi pengalaman pengguna

Pengguna dapat mengatur preferensi cookies melalui browser masing-masing.

---

9. DATA ANAK DI BAWAH UMUR

Untuk pengguna di bawah 21 tahun:
- Diperlukan persetujuan orang tua atau wali
- Data diproses dengan perlindungan tambahan

---

10. PERUBAHAN KEBIJAKAN

Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu.
Versi terbaru akan selalu tersedia di website resmi.

---

11. KONTAK RESMI

Untuk pertanyaan terkait privasi dan data pribadi, hubungi:
Email: admin@indepth.co.id
Website: indepth.co.id

---

12. PERSETUJUAN

Dengan menggunakan layanan kami, melakukan booking, mengikuti pelatihan, mendaftar sebagai affiliate, atau mengakses website, Anda dianggap telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.`
};
function PrivacyPolicyContent() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900 dark:text-white mb-4 italic uppercase text-xs", children: [
      "Terakhir diperbarui: ",
      PRIVACY_POLICY.updated
    ] }),
    /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: PRIVACY_POLICY.content })
  ] });
}
function BookingCreate({ schedules, packageOptions, screeningResult, activeBooking }) {
  const { errors: pageErrors } = usePage().props;
  const [step, setStep] = useState(1);
  const { data, setData, post, processing, errors } = useForm({
    schedule_id: "",
    package_type: packageOptions.recommended,
    agree_privacy: false,
    agree_refund: false,
    agree_final: false,
    agree_access: false,
    agree_chargeback: false
  });
  const goToStep2 = () => {
    if (!data.agree_privacy) {
      alert("Silakan setujui Kebijakan Privasi terlebih dahulu.");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(2);
  };
  const goToStep3 = () => {
    if (!data.schedule_id) {
      alert("Silakan pilih jadwal terlebih dahulu.");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(3);
  };
  const submit = (e) => {
    if (e) e.preventDefault();
    if (!(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback)) {
      alert("Silakan setujui seluruh poin Kebijakan Non-Refund untuk melanjutkan.");
      return;
    }
    post(route("bookings.store"));
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl text-gray-900 dark:text-white leading-tight", children: "Buat Janji Temu Hipnoterapi" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Booking Hipnoterapi" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxs("details", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-emerald-100 dark:border-emerald-900/30 group mb-4 lg:mb-0 transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("summary", { className: "p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
                  "Keamanan Data"
                ] }),
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-emerald-600 dark:text-emerald-400 group-open:rotate-180 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-sm text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed border-t border-emerald-100 dark:border-emerald-900/30 pt-4 animate-fade-in-up", children: "Data Anda dilindungi dengan enkripsi end-to-end dan hanya dapat diakses oleh praktisi yang menangani Anda." })
            ] }),
            /* @__PURE__ */ jsxs("details", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-indigo-100 dark:border-indigo-900/30 group transition-all duration-300", children: [
              /* @__PURE__ */ jsxs("summary", { className: "p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                  "Standar Layanan"
                ] }),
                /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 border-t border-indigo-100 dark:border-indigo-900/30 pt-4 animate-fade-in-up", children: /* @__PURE__ */ jsx(Link, { href: route("agreement.show"), className: "text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline", children: "Lihat Standar Perjanjian Layanan (PDF)" }) })
            ] })
          ] }),
          step === 1 && /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden animate-fade-in-up", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-black uppercase tracking-tighter", children: "1. Kebijakan Privasi & Data" }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-100 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative", children: /* @__PURE__ */ jsx(PrivacyPolicyContent, {}) }),
              /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data.agree_privacy ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800" : "bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800"}`, children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree_privacy, onChange: (e) => setData("agree_privacy", e.target.checked), className: "w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" }),
                /* @__PURE__ */ jsx("span", { className: `text-xs font-bold ${data.agree_privacy ? "text-indigo-900 dark:text-indigo-200" : "text-gray-600 dark:text-gray-400"}`, children: "Saya telah membaca dan menyetujui pengolahan data sesuai Kebijakan Privasi InDepth." })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "p-6 bg-white dark:bg-gray-800 flex justify-end items-center border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goToStep2,
                disabled: !data.agree_privacy,
                className: `px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${data.agree_privacy ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg" : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"}`,
                children: "Centang & Simpan"
              }
            ) })
          ] }),
          step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fade-in-up", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-black uppercase tracking-tighter", children: "2. Pilih Program Terapi" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                packageOptions.is_vip_only ? /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-600 dark:text-amber-400 font-bold mb-6", children: "⚠️ Berdasarkan hasil skrining, kondisi Anda memerlukan penanganan intensif (Paket VIP)." }) : /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-6", children: [
                  "Kami merekomendasikan ",
                  packageOptions.recommended === "hipnoterapi" ? "Paket Hipnoterapi" : "Paket Upgrade",
                  " berdasarkan hasil skrining Anda."
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: Object.values(packageOptions.packages).map((pkg) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: `relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer flex flex-col ${data.package_type === pkg.id ? "border-gold-500 bg-gold-50/50 dark:bg-gold-900/30 shadow-lg" : packageOptions.is_vip_only && pkg.id !== "vip" ? "opacity-40 grayscale cursor-not-allowed" : "border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-gray-800/40 hover:border-gold-300"}`,
                    onClick: () => (!packageOptions.is_vip_only || pkg.id === "vip") && setData("package_type", pkg.id),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-4", children: [
                        /* @__PURE__ */ jsx("h4", { className: "font-black text-sm uppercase tracking-widest", children: pkg.name }),
                        /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.package_type === pkg.id ? "border-gold-500 bg-gold-500" : "border-gray-300"}`, children: data.package_type === pkg.id && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                        pkg.original_price && /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-gray-400 line-through", children: [
                          "Rp ",
                          new Intl.NumberFormat("id-ID").format(pkg.original_price)
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "text-xl font-black text-gold-600", children: [
                          "Rp ",
                          new Intl.NumberFormat("id-ID").format(pkg.price)
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest", children: "*Harga belum termasuk PPN 11%" })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium text-gray-500 leading-relaxed", children: pkg.description })
                    ]
                  },
                  pkg.id
                )) }),
                errors.package_type && /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-red-600 mt-4 uppercase tracking-widest", children: errors.package_type })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-black uppercase tracking-tighter", children: "3. Pilih Waktu Konsultasi" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                /* @__PURE__ */ jsx(TimeSlotPicker, { schedules, selectedScheduleId: data.schedule_id, onSelect: (id) => setData("schedule_id", id), activeBooking }),
                errors.schedule_id && /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-red-600 mt-4 uppercase tracking-widest", children: errors.schedule_id })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setStep(1);
                    },
                    className: "px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors",
                    children: "Kembali"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: goToStep3,
                    disabled: !data.schedule_id,
                    className: `px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${data.schedule_id ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg" : "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"}`,
                    children: "Simpan & Lanjut Pembayaran"
                  }
                )
              ] })
            ] })
          ] }),
          step === 3 && /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-fade-in-up", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-red-100 dark:border-red-900/30 overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-r from-red-700 to-rose-900 p-6 text-white", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-black uppercase tracking-tighter", children: "4. Kebijakan Final & Non-Refund" }) }),
              /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative", children: /* @__PURE__ */ jsx(RefundPolicyContent, {}) }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                  { id: "agree_refund", label: "Setuju Kebijakan Non-Refund." },
                  { id: "agree_final", label: "Pembayaran ini bersifat FINAL." },
                  { id: "agree_access", label: "Layanan dimulai saat jadwal dikonfirmasi." },
                  { id: "agree_chargeback", label: "Tidak akan mengajukan sengketa/chargeback." }
                ].map((item) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer border-2 ${data[item.id] ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/40" : "bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data[item.id], onChange: (e) => setData(item.id, e.target.checked), className: "w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500" }),
                  /* @__PURE__ */ jsx("span", { className: `text-[11px] font-black uppercase tracking-tight ${data[item.id] ? "text-red-900 dark:text-red-200" : "text-gray-600 dark:text-gray-400"}`, children: item.label })
                ] }, item.id)) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setStep(2);
                  },
                  className: "px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors",
                  children: "Kembali"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-8 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/[0.08] shadow-2xl flex flex-col items-center gap-6", children: [
              (pageErrors.error || Object.keys(errors).length > 0) && /* @__PURE__ */ jsxs("div", { className: "w-full p-6 bg-red-500/10 border border-red-500/20 rounded-3xl", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] mb-2 text-center", children: "Terjadi Kesalahan" }),
                /* @__PURE__ */ jsx("ul", { className: "text-[10px] font-bold text-red-500/80 list-disc list-inside space-y-1 text-center", children: Object.values(errors).map((err, i) => /* @__PURE__ */ jsx("li", { children: err }, i)) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: submit,
                  disabled: !data.schedule_id || !data.agree_privacy || !(data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback) || processing,
                  className: `w-full max-w-md py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-sm transition-all shadow-2xl ${data.schedule_id && data.agree_privacy && data.agree_refund && data.agree_final && data.agree_access && data.agree_chargeback ? "bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white hover:scale-[1.02] active:scale-[0.98] shadow-red-500/20" : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed grayscale"}`,
                  children: "KONFIRMASI & LANJUT PEMBAYARAN"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-10 leading-relaxed", children: "Dengan menekan tombol di atas, Anda menyatakan persetujuan mutlak terhadap seluruh syarat dan ketentuan platform." })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  BookingCreate as default
};
