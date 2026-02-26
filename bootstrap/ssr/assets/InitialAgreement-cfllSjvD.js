import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function InitialAgreement({ userAge }) {
  const user = usePage().props.auth.user;
  const isUnder17 = userAge !== null && userAge < 17;
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const { data, setData, post, processing, transform, errors } = useForm({
    // Document 1 (Pernyataan Awal)
    cond_data_benar: false,
    cond_bukan_pengganti_medis: false,
    cond_sadar_penuh: false,
    cond_riwayat_penyakit: false,
    status_medis: "",
    izin_wali: !isUnder17,
    nama_wali: "",
    telepon_wali: "",
    risk_hubungi_medis: false,
    risk_henti_sesi: false,
    doc_direkam: false,
    doc_hukum: false,
    konfirmasi_akhir: false,
    signature_1: "",
    // Signature for Doc 1
    // Document 2 (Surat Perjanjian)
    agree_1: false,
    agree_2: false,
    agree_3: false,
    signature: ""
    // signature for Doc 2 (main)
  });
  const canvasRef1 = useRef(null);
  const [isDrawing1, setIsDrawing1] = useState(false);
  const [hasDrawn1, setHasDrawn1] = useState(false);
  const canvasRef2 = useRef(null);
  const [isDrawing2, setIsDrawing2] = useState(false);
  const [hasDrawn2, setHasDrawn2] = useState(false);
  const startDrawing = (e, ref, setDrawing, setDrawn) => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setDrawing(true);
    setDrawn(true);
  };
  const draw = (e, ref, isDrawing) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  };
  const stopDrawing = (ref, setDrawing, hasDrawn, signatureField) => {
    setDrawing(false);
    const canvas = ref.current;
    if (canvas && hasDrawn) {
      setData(signatureField, canvas.toDataURL("image/png"));
    }
  };
  const clearCanvas = (ref, setDrawn, signatureField) => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setDrawn(false);
    setData(signatureField, "");
  };
  const [allChecked, setAllChecked] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  useEffect(() => {
    const isMedisSelected = data.status_medis !== "";
    let isWaliValid = true;
    if (isUnder17) {
      isWaliValid = data.izin_wali && data.nama_wali.trim() !== "" && data.telepon_wali.trim() !== "";
    }
    const requiredBools = [
      data.cond_data_benar,
      data.cond_bukan_pengganti_medis,
      data.cond_sadar_penuh,
      data.cond_riwayat_penyakit,
      data.risk_hubungi_medis,
      data.risk_henti_sesi,
      data.doc_direkam,
      data.doc_hukum,
      data.konfirmasi_akhir,
      data.agree_1,
      data.agree_2,
      data.agree_3
    ];
    const requiredCheckboxes = requiredBools.every(Boolean);
    const missing = [];
    if (!data.cond_data_benar) missing.push("Doc 1: Pernyataan kebenaran data");
    if (!data.cond_bukan_pengganti_medis) missing.push("Doc 1: Kondisi hipnoterapi bukan pengganti medis");
    if (!data.cond_sadar_penuh) missing.push("Doc 1: Kondisi sadar penuh");
    if (!data.cond_riwayat_penyakit) missing.push("Doc 1: Pertimbangan kondisi riwayat penyakit");
    if (!isMedisSelected) missing.push("Doc 1: Status Perawatan Medis");
    if (isUnder17) {
      if (!data.izin_wali) missing.push("Doc 1: Izin Wali");
      if (data.nama_wali.trim() === "") missing.push("Doc 1: Nama Wali");
      if (data.telepon_wali.trim() === "") missing.push("Doc 1: Telepon Wali");
    }
    if (!data.risk_hubungi_medis) missing.push("Doc 1: Risiko hubungi medis");
    if (!data.risk_henti_sesi) missing.push("Doc 1: Risiko henti sesi");
    if (!data.doc_direkam) missing.push("Doc 1: Persetujuan rekaman");
    if (!data.doc_hukum) missing.push("Doc 1: Persetujuan hukum");
    if (!data.konfirmasi_akhir) missing.push("Doc 1: Konfirmasi akhir");
    if (!hasDrawn1) missing.push("Doc 1: Tanda Tangan Pernyataan Awal");
    if (!data.agree_1) missing.push("Doc 2: Pernyataan kebenaran data (Pasal 14)");
    if (!data.agree_2) missing.push("Doc 2: Memahami isi perjanjian (Pasal 14)");
    if (!data.agree_3) missing.push("Doc 2: Menyetujui ketentuan tanpa keberatan (Pasal 14)");
    if (!hasDrawn2) missing.push("Doc 2: Tanda Tangan Surat Perjanjian");
    const isProfileComplete = user.age && user.gender && user.phone;
    setAllChecked(requiredCheckboxes && isMedisSelected && isWaliValid && hasDrawn1 && hasDrawn2 && isProfileComplete);
    setMissingFields(missing);
  }, [data, isUnder17, hasDrawn1, hasDrawn2]);
  const submit = (e) => {
    e.preventDefault();
    if (!allChecked || !hasDrawn1 || !hasDrawn2) return;
    transform((data2) => ({
      agreement_data: data2,
      signature: data2.signature
      // Use Doc2 signature as main the digital signature
    }));
    post(route("agreement.store"), {
      onError: (errs) => {
        console.error("Backend validation failed:", errs);
        if (errs && errs.agreement_data) {
          setMissingFields([errs.agreement_data]);
        }
      }
    });
  };
  const CheckboxItem = ({ id, label, checked, onChange }) => /* @__PURE__ */ jsxs("label", { className: `flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${checked ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300"}`, children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", id, checked, onChange: (e) => onChange(e.target.checked), className: "mt-1 accent-indigo-600 rounded text-indigo-600 focus:ring-indigo-500" }),
    /* @__PURE__ */ jsx("span", { className: "text-sm leading-relaxed", children: label })
  ] });
  const signDate = (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: "Dokumen Persetujuan Layanan" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Dokumen Persetujuan" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8 border-b pb-6 dark:border-gray-700 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block py-1 px-3 text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3 rounded-full", children: "DOKUMEN 1 DARI 2" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Form Pernyataan Awal & Persetujuan Layanan" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Harap baca dengan teliti dan centang seluruh pernyataan di bawah ini." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: "1" }),
              "Pernyataan Kondisi Pribadi"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pl-8", children: [
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya menyatakan bahwa data yang saya isi pada tahap screening adalah benar dan sesuai dengan kondisi saya saat ini.", checked: data.cond_data_benar, onChange: (val) => setData("cond_data_benar", val) }),
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya memahami bahwa layanan hipnoterapi ini bukan pengganti pengobatan medis/psikiatri darurat.", checked: data.cond_bukan_pengganti_medis, onChange: (val) => setData("cond_bukan_pengganti_medis", val) }),
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya mengambil sesi ini dalam kondisi sadar penuh dan tidak sedang berada di bawah pengaruh alkohol atau zat terlarang.", checked: data.cond_sadar_penuh, onChange: (val) => setData("cond_sadar_penuh", val) }),
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Telah mempertimbangkan riwayat penyakit jantung, gangguan saraf berat (termasuk epilepsi), atau kondisi medis serius lainnya (Tetap wajib dicentang sebagai bentuk kesadaran risiko).", checked: data.cond_riwayat_penyakit, onChange: (val) => setData("cond_riwayat_penyakit", val) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: "2" }),
              "Status Perawatan Medis"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pl-8", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-3 text-gray-700 dark:text-gray-300", children: "Apakah Anda masih rutin mengonsumsi obat psikiater atau menjalani perawatan medis berlanjut?" }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 p-3 rounded-lg border cursor-pointer flex-1 justify-center transition-colors ${data.status_medis === "Ya" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800" : "border-gray-200 dark:border-gray-700"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "status_medis", value: "Ya", checked: data.status_medis === "Ya", onChange: () => setData("status_medis", "Ya"), className: "accent-indigo-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Ya, masih berjalan" })
                ] }),
                /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 p-3 rounded-lg border cursor-pointer flex-1 justify-center transition-colors ${data.status_medis === "Tidak" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800" : "border-gray-200 dark:border-gray-700"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", name: "status_medis", value: "Tidak", checked: data.status_medis === "Tidak", onChange: () => setData("status_medis", "Tidak"), className: "accent-indigo-600" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Tidak" })
                ] })
              ] })
            ] })
          ] }),
          isUnder17 && /* @__PURE__ */ jsxs("section", { className: "bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-5 rounded-2xl", children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-amber-800 dark:text-amber-500 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm", children: "3" }),
              "Persetujuan Wali (Bawah Umur)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 pl-8", children: [
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya menyatakan telah memperoleh izin dari orang tua / wali yang sah untuk mengikuti sesi ini.", checked: data.izin_wali, onChange: (val) => setData("izin_wali", val) }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Nama Wali Sah" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: data.nama_wali, onChange: (e) => setData("nama_wali", e.target.value), className: "w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-amber-500 focus:border-amber-500", placeholder: "Contoh: Budi Santoso" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1", children: "Nomor Telepon Wali" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: data.telepon_wali, onChange: (e) => setData("telepon_wali", e.target.value), className: "w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-amber-500 focus:border-amber-500", placeholder: "08xxxxxxxxxx" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: isUnder17 ? "4" : "3" }),
              "Pernyataan Risiko & Darurat Layanan"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pl-8", children: [
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Jika saya mengalami kondisi darurat medis (sepsis, serangan jantung, kejang, dll) selama sesi berlangsung, saya mengizinkan tim InDepth menghubungi layanan darurat medis terdekat.", checked: data.risk_hubungi_medis, onChange: (val) => setData("risk_hubungi_medis", val) }),
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya memahami sesi dapat dihentikan sewaktu-waktu oleh terapis demi keselamatan jika indikasi medis darurat terjadi.", checked: data.risk_henti_sesi, onChange: (val) => setData("risk_henti_sesi", val) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: isUnder17 ? "5" : "4" }),
              "Persetujuan Sistem Dokumentasi InDepth"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 pl-8", children: [
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya memahami bahwa sesi akan direkam untuk tujuan dokumentasi dan perlindungan hukum, serta ditampilkan visualnya di ruang tunggu tanpa audio.", checked: data.doc_direkam, onChange: (val) => setData("doc_direkam", val) }),
              /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya memahami bahwa rekaman hanya dibuka jika diperlukan secara hukum.", checked: data.doc_hukum, onChange: (val) => setData("doc_hukum", val) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: isUnder17 ? "6" : "5" }),
              "Konfirmasi Akhir"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3 pl-8", children: /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya telah membaca dan memahami seluruh pernyataan di atas dan setuju untuk melanjutkan ke proses booking.", checked: data.konfirmasi_akhir, onChange: (val) => setData("konfirmasi_akhir", val) }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsxs("h4", { className: "text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm", children: isUnder17 ? "7" : "6" }),
              "Tanda Tangan Digital (Pernyataan Awal)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pl-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-1 bg-gray-50 dark:bg-gray-900 shadow-inner relative group mx-auto md:mx-0", style: { maxWidth: 400, height: 180 }, children: [
                /* @__PURE__ */ jsx(
                  "canvas",
                  {
                    ref: canvasRef1,
                    width: 390,
                    height: 170,
                    onMouseDown: (e) => startDrawing(e, canvasRef1, setIsDrawing1, setHasDrawn1),
                    onMouseMove: (e) => draw(e, canvasRef1, isDrawing1),
                    onMouseUp: () => stopDrawing(canvasRef1, setIsDrawing1, hasDrawn1, "signature_1"),
                    onMouseOut: () => stopDrawing(canvasRef1, setIsDrawing1, hasDrawn1, "signature_1"),
                    onTouchStart: (e) => startDrawing(e, canvasRef1, setIsDrawing1, setHasDrawn1),
                    onTouchMove: (e) => draw(e, canvasRef1, isDrawing1),
                    onTouchEnd: () => stopDrawing(canvasRef1, setIsDrawing1, hasDrawn1, "signature_1"),
                    className: "cursor-crosshair w-full h-full touch-none dark:invert"
                  }
                ),
                !hasDrawn1 && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none text-xs font-medium uppercase tracking-widest", children: "Tanda tangan di sini" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => clearCanvas(canvasRef1, setHasDrawn1, "signature_1"), className: "text-xs text-red-600 font-bold hover:text-red-800 underline transition-colors", children: "Hapus & Ulangi Tanda Tangan" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 border-b pb-6 dark:border-gray-700 text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "inline-block py-1 px-3 text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3 rounded-full", children: "DOKUMEN 2 DARI 2" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "SURAT PERJANJIAN LAYANAN HIPNOTERAPI" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-2", children: "InDepth Mental Wellness" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-6 shadow-inner relative", children: [
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 1 - IDENTITAS KLIEN" }),
          (!user.age || !user.gender || !user.phone) && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 shrink-0 mt-0.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold", children: "Profil Belum Lengkap" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 mb-3", children: "Anda harus melengkapi data profil (Usia, Jenis Kelamin, Nomor Handphone) sebelum dapat menyetujui dokumen ini." }),
              /* @__PURE__ */ jsx("a", { href: route("profile.edit"), className: "inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors", children: "Ke Halaman Edit Profil" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Saya yang bertanda tangan di bawah ini:" }),
          /* @__PURE__ */ jsx("table", { className: "w-full mb-6", children: /* @__PURE__ */ jsxs("tbody", { children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "w-1/3 py-1", children: "Nama Lengkap" }),
              /* @__PURE__ */ jsxs("td", { className: "w-2/3 py-1", children: [
                ": ",
                user.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1", children: "Usia" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                user.age || "-",
                " Tahun"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1", children: "Jenis Kelamin" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                user.gender || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1", children: "Nomor Handphone Aktif" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                user.phone || "-"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "py-1", children: "Email" }),
              /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
                ": ",
                user.email
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "mb-6", children: "Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di InDepth Mental Wellness." }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 2 - BATAS USIA DAN WALI" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Usia dewasa hukum untuk menandatangani perjanjian ini adalah 21 (dua puluh satu) tahun." }),
            /* @__PURE__ */ jsx("li", { children: "Klien di bawah 21 tahun wajib didampingi dan memperoleh persetujuan tertulis dari orang tua atau wali sah." }),
            /* @__PURE__ */ jsx("li", { children: "Jika klien menyatakan telah mendapat izin wali namun datang sendiri, maka seluruh konsekuensi hukum atas pernyataan tersebut menjadi tanggung jawab klien dan walinya." }),
            /* @__PURE__ */ jsx("li", { children: "Pendamping yang hadir bertindak sebagai saksi dan penanggung jawab selama berada di lokasi." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 3 - PERNYATAAN KESEHATAN DAN KEJUJURAN DATA" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Klien menyatakan seluruh data yang diberikan adalah benar." }),
            /* @__PURE__ */ jsx("li", { children: "Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan." }),
            /* @__PURE__ */ jsx("li", { children: "Penyembunyian informasi kesehatan yang berdampak pada sesi menjadi tanggung jawab penuh klien." }),
            /* @__PURE__ */ jsx("li", { children: "Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat." }),
            /* @__PURE__ */ jsx("li", { children: "Jika klien masih menjalani perawatan medis/psikologis, layanan ini bersifat komplementer." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 4 - SISTEM DOKUMENTASI DAN TRANSPARANSI" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Seluruh sesi direkam audio dan video secara penuh." }),
            /* @__PURE__ */ jsx("li", { children: "Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi." }),
            /* @__PURE__ */ jsx("li", { children: "Rekaman disimpan untuk perlindungan hukum kedua pihak." }),
            /* @__PURE__ */ jsx("li", { children: "Rekaman hanya dibuka atas permintaan resmi aparat penegak hukum atau pengadilan." }),
            /* @__PURE__ */ jsx("li", { children: "Setelah masa simpan tertentu, rekaman dapat dianonimkan untuk kepentingan akademik." }),
            /* @__PURE__ */ jsx("li", { children: "Klien menyetujui sistem dokumentasi ini tanpa keberatan." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 5 - KEADAAN DARURAT MEDIS" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Jika terjadi kondisi darurat medis pada klien, sesi dihentikan dan bantuan medis dipanggil." }),
            /* @__PURE__ */ jsx("li", { children: "Rekaman tidak boleh dihentikan sampai klien meninggalkan ruangan bersama fasilitas kesehatan." }),
            /* @__PURE__ */ jsx("li", { children: "Jika hipnoterapis mengalami kondisi medis mendadak, sesi dijadwalkan ulang tanpa biaya tambahan." }),
            /* @__PURE__ */ jsx("li", { children: "Jika terjadi kematian akibat kondisi medis murni tanpa unsur kelalaian atau kekerasan, kedua pihak sepakat untuk tidak saling menuntut." }),
            /* @__PURE__ */ jsx("li", { children: "Ruangan dilengkapi timer digital sebagai penanda waktu yang tidak dapat dimanipulasi." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 6 - KEWAJIBAN KLIEN" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Klien wajib mengikuti instruksi hipnoterapis selama sesi berlangsung." }),
            /* @__PURE__ */ jsx("li", { children: "Klien dilarang membawa senjata atau benda berbahaya." }),
            /* @__PURE__ */ jsx("li", { children: "Klien tidak boleh berada di bawah pengaruh alkohol atau narkotika saat sesi." }),
            /* @__PURE__ */ jsx("li", { children: "Pelanggaran ketentuan ini dapat menyebabkan sesi dihentikan tanpa pengembalian dana." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 7 - NO-SHOW DAN PEMBATALAN" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Setiap sesi berdurasi 2 jam, termasuk buffer 30 menit." }),
            /* @__PURE__ */ jsx("li", { children: "Jika klien tidak hadir dalam 30 menit sejak jadwal hipnoterapi dimulai, sesi dianggap sudah selesai dilaksanakan." }),
            /* @__PURE__ */ jsx("li", { children: "Tidak ada refund atas keterlambatan atau No-Show." }),
            /* @__PURE__ */ jsx("li", { children: "Pembatalan hanya dapat dilakukan maksimal 24 jam sebelum jadwal." }),
            /* @__PURE__ */ jsx("li", { children: "Pembatalan di luar batas waktu tidak dapat direfund." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 8 - NON-REFUND DAN HASIL TERAPI" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Hasil hipnoterapi bersifat individual dan tidak dapat dijamin secara absolut." }),
            /* @__PURE__ */ jsx("li", { children: "Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana." }),
            /* @__PURE__ */ jsx("li", { children: "Tidak ada klaim pengembalian dana setelah sesi berjalan sesuai jadwal." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 9 - FORCE MAJEURE" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "InDepth tidak bertanggung jawab atas gangguan akibat: Bencana alam, Gangguan listrik/jaringan, Kebijakan pemerintah, Kerusuhan, Kondisi darurat di luar kendali manusia." }),
            /* @__PURE__ */ jsx("li", { children: "Dalam kondisi tersebut sesi dapat dijadwalkan ulang tanpa penalti." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 10 - PEMBATASAN TANGGUNG JAWAB" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Apabila terdapat kelalaian yang terbukti secara hukum dari pihak InDepth, maka tanggung jawab maksimal tidak melebihi biaya layanan sesi tersebut." }),
            /* @__PURE__ */ jsx("li", { children: "Tidak ada tanggung jawab atas kerugian tidak langsung, immaterial, atau kerugian lanjutan." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 11 - KERAHASIAAN DAN LARANGAN PENCEMARAN NAMA BAIK" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Seluruh informasi sesi bersifat rahasia." }),
            /* @__PURE__ */ jsx("li", { children: "Klien dilarang menyebarkan informasi atau tuduhan tanpa putusan hukum tetap." }),
            /* @__PURE__ */ jsx("li", { children: "Tuduhan publik tanpa dasar hukum dapat diproses sesuai peraturan perundang-undangan yang berlaku." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 12 - PENYELESAIAN SENGKETA" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Sengketa diselesaikan melalui musyawarah terlebih dahulu." }),
            /* @__PURE__ */ jsx("li", { children: "Jika tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri Semarang." }),
            /* @__PURE__ */ jsx("li", { children: "Biaya perkara ditanggung oleh pihak yang dinyatakan kalah." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 13 - KEABSAHAN TANDA TANGAN ELEKTRONIK" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mb-6 space-y-1", children: [
            /* @__PURE__ */ jsx("li", { children: "Perjanjian ini sah baik ditandatangani secara fisik maupun elektronik." }),
            /* @__PURE__ */ jsx("li", { children: "Persetujuan elektronik tunduk pada UU ITE dan memiliki kekuatan hukum yang sama dengan tanda tangan basah." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-bold mb-4", children: "PASAL 14 - PERNYATAAN AKHIR" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
          /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya menyatakan seluruh data benar dan lengkap.", checked: data.agree_1, onChange: (e) => setData("agree_1", e) }),
          /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya telah membaca dan memahami seluruh isi perjanjian ini.", checked: data.agree_2, onChange: (e) => setData("agree_2", e) }),
          /* @__PURE__ */ jsx(CheckboxItem, { label: "Saya menyetujui seluruh ketentuan tanpa keberatan.", checked: data.agree_3, onChange: (e) => setData("agree_3", e) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 text-center mt-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
              "Tanggal: ",
              signDate
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mb-2", children: "Lokasi: InDepth Mental Wellness" }),
            /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold mt-4 border-t pt-4", children: "Tanda Tangan Klien:" }),
            /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-gray-50 dark:bg-gray-700 relative group mx-auto", style: { width: 300, height: 150 }, children: [
              /* @__PURE__ */ jsx(
                "canvas",
                {
                  ref: canvasRef2,
                  width: 290,
                  height: 140,
                  onMouseDown: (e) => startDrawing(e, canvasRef2, setIsDrawing2, setHasDrawn2),
                  onMouseMove: (e) => draw(e, canvasRef2, isDrawing2),
                  onMouseUp: () => stopDrawing(canvasRef2, setIsDrawing2, hasDrawn2, "signature"),
                  onMouseOut: () => stopDrawing(canvasRef2, setIsDrawing2, hasDrawn2, "signature"),
                  onTouchStart: (e) => startDrawing(e, canvasRef2, setIsDrawing2, setHasDrawn2),
                  onTouchMove: (e) => draw(e, canvasRef2, isDrawing2),
                  onTouchEnd: () => stopDrawing(canvasRef2, setIsDrawing2, hasDrawn2, "signature"),
                  className: "cursor-crosshair w-full h-full touch-none dark:invert"
                }
              ),
              !hasDrawn2 && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-400 pointer-events-none text-xs font-medium uppercase tracking-widest", children: "Tanda tangan di sini" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-center gap-2", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => clearCanvas(canvasRef2, setHasDrawn2, "signature"), className: "text-xs text-red-600 hover:text-red-800 underline", children: "Ulangi Tanda Tangan" }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold underline", children: user.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 invisible", children: "Spacing" }),
            /* @__PURE__ */ jsx("p", { className: "mb-2 invisible", children: "Spacing" }),
            /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold mt-4 border-t pt-4", children: "Tanda Tangan Perwakilan InDepth:" }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-[150px]", children: /* @__PURE__ */ jsx("img", { src: "/images/saiful-anam-signature.jpeg", alt: "Tanda Tangan Saiful Anam", className: "h-[120px] object-contain mix-blend-multiply dark:invert opacity-90" }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 font-semibold underline", children: "Saiful Anam" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Direktur Utama InDepth Mental Wellness" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700 mt-10", children: [
        !allChecked && missingFields.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 shadow-sm", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-bold mb-2 text-base text-red-700 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
            "Tidak dapat melanjutkan, masih ada ",
            missingFields.length,
            " bagian yang belum terisi/tercentang:"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside space-y-1 ml-2 font-medium", children: missingFields.map((field, index) => /* @__PURE__ */ jsx("li", { children: field }, index)) })
        ] }),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            type: "submit",
            className: `w-full h-14 text-lg justify-center shadow-lg transition-all ${allChecked ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 opacity-70 cursor-pointer"}`,
            disabled: processing,
            children: "Setujui Dokumen"
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  InitialAgreement as default
};
