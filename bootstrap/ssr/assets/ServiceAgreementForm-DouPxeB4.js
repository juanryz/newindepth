import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { usePage, useForm } from "@inertiajs/react";
function ServiceAgreementForm({ className = "" }) {
  const user = usePage().props.auth.user;
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    digital_signature: user.digital_signature || "",
    agree_1: false,
    agree_2: false,
    agree_3: false
  });
  const isSigned = !!user.agreement_signed_at;
  useEffect(() => {
    if (!isSigned && canvasRef.current && !hasDrawn) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [isSigned, hasDrawn]);
  const startDrawing = (e) => {
    if (isSigned) return;
    const canvas = canvasRef.current;
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
    if (!isDrawing || isSigned) return;
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
    if (isSigned) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL("image/png");
    setData("digital_signature", signatureData);
  };
  const clearCanvas = () => {
    if (isSigned) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setData("digital_signature", "");
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("profile.agreement.update"), {
      preserveScroll: true
    });
  };
  const isAgreementComplete = data.agree_1 && data.agree_2 && data.agree_3 && hasDrawn;
  const signDate = isSigned ? new Date(user.agreement_signed_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black tracking-tight text-gray-950 dark:text-white pb-2 mb-4", children: "Surat Perjanjian Layanan Hipnoterapi" }),
      !isSigned && /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md mb-6 border border-amber-200 dark:border-amber-900/30", children: "Mohon baca dan tanda tangani surat perjanjian ini untuk dapat menggunakan layanan." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-6 shadow-inner relative", children: [
      isSigned && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-300 dark:border-green-800", children: [
        "DITANDATANGANI PADA ",
        signDate
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-center font-bold text-lg mb-2", children: "SURAT PERJANJIAN LAYANAN HIPNOTERAPI" }),
      /* @__PURE__ */ jsx("h4", { className: "text-center font-bold mb-8", children: "InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-2", children: "PASAL 1 - IDENTITAS KLIEN" }),
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
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-1", children: "Nama Kontak Darurat" }),
          /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
            ": ",
            user.emergency_contact_name || "-"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-1", children: "Hubungan dengan Klien" }),
          /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
            ": ",
            user.emergency_contact_relation || "-"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "py-1", children: "Nomor Kontak Darurat" }),
          /* @__PURE__ */ jsxs("td", { className: "py-1", children: [
            ": ",
            user.emergency_contact_phone || "-"
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
    /* @__PURE__ */ jsx("form", { onSubmit: submit, className: "space-y-6", children: !isSigned ? /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold mb-4", children: "PASAL 14 - PERNYATAAN AKHIR" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 mb-6", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree_1, onChange: (e) => setData("agree_1", e.target.checked), className: "mt-1 rounded text-indigo-600 focus:ring-indigo-500" }),
          /* @__PURE__ */ jsx("span", { children: "Saya menyatakan seluruh data benar dan lengkap." })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree_2, onChange: (e) => setData("agree_2", e.target.checked), className: "mt-1 rounded text-indigo-600 focus:ring-indigo-500" }),
          /* @__PURE__ */ jsx("span", { children: "Saya telah membaca dan memahami seluruh isi perjanjian ini." })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: data.agree_3, onChange: (e) => setData("agree_3", e.target.checked), className: "mt-1 rounded text-indigo-600 focus:ring-indigo-500" }),
          /* @__PURE__ */ jsx("span", { children: "Saya menyetujui seluruh ketentuan tanpa keberatan." })
        ] })
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
                ref: canvasRef,
                width: 290,
                height: 140,
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
            !hasDrawn && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-400 pointer-events-none", children: "Tanda tangan di sini" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-center gap-2", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: clearCanvas, className: "text-xs text-red-600 hover:text-red-800 underline", children: "Ulangi Tanda Tangan" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold underline", children: user.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 invisible", children: "Spacing" }),
          /* @__PURE__ */ jsx("p", { className: "mb-2 invisible", children: "Spacing" }),
          /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold mt-4 border-t pt-4", children: "Tanda Tangan Perwakilan InDepth:" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-[150px]", children: /* @__PURE__ */ jsx("div", { className: "transform -rotate-6 border-4 border-indigo-200 dark:border-indigo-800 p-2 rounded-lg opacity-80 mix-blend-multiply dark:mix-blend-normal", children: /* @__PURE__ */ jsx("span", { className: "font-['Brush_Script_MT',cursive] text-4xl text-indigo-600 dark:text-indigo-400 block", children: "S. Anam" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 font-semibold underline", children: "Saiful Anam" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Direktur Utama InDepth Mental Wellness" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(InputError, { className: "mt-2 text-center", message: errors.digital_signature }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-10 border-t pt-6", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing || !isAgreementComplete, className: "!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-2.5 !text-sm !tracking-widest !font-semibold !h-auto !shadow-none !uppercase w-full sm:w-auto justify-center", children: "Setujui & Tanda Tangani" }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-gray-900 dark:text-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-green-700 dark:text-green-500 mb-6 font-bold pb-4 border-b dark:border-gray-700", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        "Perjanjian Telah Ditandatangani"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-gray-800 dark:text-gray-300", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold", children: "Tanda Tangan Klien:" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center h-[150px] items-center", children: /* @__PURE__ */ jsx("img", { src: user.digital_signature, alt: "Tanda Tangan Klien", className: "max-h-full mix-blend-multiply dark:invert dark:mix-blend-screen" }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 font-semibold underline", children: user.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 font-bold", children: "Tanda Tangan Perwakilan InDepth:" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-[150px]", children: /* @__PURE__ */ jsx("div", { className: "transform -rotate-6 border-4 border-indigo-200 dark:border-indigo-800 p-2 rounded-lg opacity-80 mix-blend-multiply dark:mix-blend-normal", children: /* @__PURE__ */ jsx("span", { className: "font-['Brush_Script_MT',cursive] text-4xl text-indigo-600 dark:text-indigo-400 block", children: "S. Anam" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 font-semibold underline", children: "Saiful Anam" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Direktur Utama InDepth Mental Wellness" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ServiceAgreementForm as default
};
