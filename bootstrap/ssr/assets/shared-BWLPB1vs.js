import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React from "react";
const CRISIS_KEYWORDS = [
  "bunuh diri",
  "mau mati",
  "ingin mati",
  "tidak mau hidup",
  "mengakhiri hidup",
  "bisikan",
  "suara yang menyuruh",
  "putus asa",
  "tidak ada harapan",
  "self harm",
  "menyakiti diri"
];
const detectCrisis = (text) => {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
};
const MASALAH_OPTIONS = [
  "Pikiran (cemas, overthinking)",
  "Perasaan (sedih, marah, takut)",
  "Mental (depresi, mood disorder)",
  "Psikosomatis",
  "Halusinasi / gangguan persepsi",
  "Obesitas",
  "Pengembangan diri"
];
const MASALAH_OPTIONS_REGULER = [
  "Pikiran — sering cemas, overthinking, susah fokus",
  "Perasaan — sering sedih, mudah marah, takut berlebihan",
  "Perilaku — kebiasaan buruk yang susah dihentikan",
  "Keluhan Fisik akibat Stres — sakit kepala, nyeri lambung, sesak napas, dll yang muncul saat stres/emosi"
];
const MASALAH_OPTIONS_VIP = [
  "Sakit kepala / migrain yang muncul saat stres atau emosional",
  "Nyeri lambung / maag yang kambuh saat cemas atau tertekan",
  "Sesak napas / dada terasa berat tanpa sebab medis yang jelas",
  "Gangguan tidur — insomnia, tidur tidak nyenyak, mimpi buruk",
  "Nyeri otot / tubuh tegang yang berkaitan dengan kondisi emosional",
  "Gangguan pencernaan — mual, diare, sembelit saat stres",
  "Jantung berdebar-debar tanpa aktivitas fisik berat",
  "Kelelahan kronis — tubuh terasa lelah terus-menerus meski sudah istirahat",
  "Lainnya"
];
const USAHA_OPTIONS = [
  "Konsultasi psikolog",
  "Konsultasi psikiater",
  "Obat medis",
  "Terapi alternatif",
  "Konseling agama",
  "Diet / olahraga",
  "Self healing / motivasi",
  "Belum pernah melakukan apa pun"
];
const DURASI_OPTIONS = ["< 1 bulan", "1–6 bulan", "6–12 bulan", "1–3 tahun", "> 3 tahun"];
const TINGKAT_GANGGUAN_OPTIONS = [
  "Ringan — masih bisa menjalankan aktivitas sehari-hari",
  "Sedang — terganggu tapi masih bisa beraktivitas sebagian",
  "Berat — sangat mengganggu, sulit menjalankan aktivitas normal",
  "Sangat Berat — hampir tidak bisa beraktivitas sama sekali"
];
const DIAGNOSIS_OPTIONS = [
  "Tidak pernah didiagnosis",
  "Pernah — oleh Dokter Umum",
  "Pernah — oleh Psikolog",
  "Pernah — oleh Psikiater",
  "Pernah — oleh Spesialis Lain"
];
const PERAWATAN_OPTIONS = [
  "Ya, masih dalam perawatan",
  "Tidak, sudah tidak dalam perawatan"
];
function StepIndicator({ current, total }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2", children: Array.from({ length: total }, (_, i) => {
      const stepNum = i + 1;
      const isCompleted = stepNum < current;
      const isActive = stepNum === current;
      return /* @__PURE__ */ jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isCompleted ? "bg-green-500 text-white shadow-lg shadow-green-500/30" : isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-200 dark:ring-indigo-900" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`, children: isCompleted ? /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) : stepNum }),
        stepNum < total && /* @__PURE__ */ jsx("div", { className: `w-8 h-1 rounded-full transition-all duration-300 ${isCompleted ? "bg-green-400" : "bg-gray-200 dark:bg-gray-700"}` })
      ] }, stepNum);
    }) }),
    /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-gray-500 dark:text-gray-400 mt-3", children: [
      "Langkah ",
      current,
      " dari ",
      total
    ] })
  ] });
}
function ProgressBar({ current, total }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Langkah ",
        current,
        " dari ",
        total
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        Math.round(current / total * 100),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500",
        style: { width: `${current / total * 100}%` }
      }
    ) })
  ] });
}
function AiBubble({ text, typing = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md", children: "AI" }),
    /* @__PURE__ */ jsx("div", { className: "max-w-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-gray-800 dark:text-gray-100 text-sm leading-relaxed", children: typing ? /* @__PURE__ */ jsxs("span", { className: "flex gap-1 items-center h-4", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-indigo-400 rounded-full animate-bounce", style: { animationDelay: "0ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-indigo-400 rounded-full animate-bounce", style: { animationDelay: "150ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-indigo-400 rounded-full animate-bounce", style: { animationDelay: "300ms" } })
    ] }) : text })
  ] });
}
function UserBubble({ text }) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-xl bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-sm text-sm leading-relaxed", children: text }) });
}
function CrisisBanner() {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex gap-3 items-start", children: [
    /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "🆘" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-bold text-red-700 dark:text-red-400 text-sm", children: "Kami peduli dengan keselamatan Anda" }),
      /* @__PURE__ */ jsxs("p", { className: "text-red-600 dark:text-red-300 text-sm mt-1", children: [
        "Tim kami akan segera menghubungi Anda secara prioritas. Jika Anda membutuhkan bantuan segera, hubungi ",
        /* @__PURE__ */ jsx("strong", { children: "ke WhatsApp 0822-2080-0034" }),
        "."
      ] })
    ] })
  ] });
}
function RadioGroup({ options, value, onChange }) {
  return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: options.map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all text-base md:text-sm ${value === opt ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 shadow-sm" : "border-gray-200 dark:border-gray-600 hover:border-indigo-300 text-gray-700 dark:text-gray-300"}`, children: [
    /* @__PURE__ */ jsx("input", { type: "radio", checked: value === opt, onChange: () => onChange(opt), className: "w-5 h-5 text-indigo-600 accent-indigo-600 focus:ring-indigo-500" }),
    opt
  ] }, opt)) });
}
function CheckboxGroup({ options, values, toggle }) {
  const arr = Array.isArray(values) ? values : [];
  return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: options.map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all text-base md:text-sm ${arr.includes(opt) ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 shadow-sm" : "border-gray-200 dark:border-gray-600 hover:border-indigo-300 text-gray-700 dark:text-gray-300"}`, children: [
    /* @__PURE__ */ jsx("input", { type: "checkbox", checked: arr.includes(opt), onChange: () => toggle(opt), className: "w-5 h-5 accent-indigo-600 rounded text-indigo-600 focus:ring-indigo-500" }),
    opt
  ] }, opt)) });
}
function InputField({ label, type = "text", value, onChange, required, placeholder }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: [
      label,
      required && " *"
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        value: value || "",
        onChange: (e) => onChange(e.target.value),
        placeholder,
        className: "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      }
    )
  ] });
}
function AutofillInputField({ label, type = "text", value, onChange, required, autoFilled = false }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
      /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: [
        label,
        required && " *"
      ] }),
      autoFilled && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M5 13l4 4L19 7" }) }),
        "otomatis"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type,
        value: value || "",
        onChange: (e) => onChange(e.target.value),
        className: `w-full px-4 py-2.5 rounded-xl border text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${autoFilled ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10" : "border-gray-200 dark:border-gray-600"}`
      }
    )
  ] });
}
function SkalaStep({ data, update }) {
  const skala = data.skala ?? 5;
  const getLabel = (s) => {
    if (s <= 3) return { text: "Ringan", color: "text-green-600" };
    if (s <= 6) return { text: "Sedang", color: "text-yellow-600" };
    if (s <= 8) return { text: "Berat", color: "text-orange-600" };
    return { text: "Sangat Berat", color: "text-red-600" };
  };
  const lbl = getLabel(skala);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "1 = Sangat Ringan" }),
      /* @__PURE__ */ jsxs("span", { className: `text-2xl font-bold ${lbl.color}`, children: [
        skala,
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-base", children: [
          "— ",
          lbl.text
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: "10 = Sangat Parah" })
    ] }),
    /* @__PURE__ */ jsx("input", { type: "range", min: 1, max: 10, value: skala, onChange: (e) => update("skala", parseInt(e.target.value)), className: "w-full accent-indigo-600 cursor-pointer h-10" }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between text-xs text-gray-400", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => /* @__PURE__ */ jsx("span", { children: n }, n)) })
  ] });
}
function DiagnosisStep({ data, update }) {
  const hasDiagnosis = data.diagnosis && data.diagnosis !== "Tidak pernah didiagnosis";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(RadioGroup, { options: DIAGNOSIS_OPTIONS, value: data.diagnosis, onChange: (v) => update("diagnosis", v) }),
    hasDiagnosis && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Tuliskan hasil diagnosisnya (opsional)" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          rows: 3,
          value: data.hasil_diagnosis || "",
          onChange: (e) => update("hasil_diagnosis", e.target.value),
          placeholder: "Contoh: Gangguan kecemasan umum (GAD)...",
          className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
        }
      )
    ] })
  ] });
}
function ObesitasStep({ data, update }) {
  const mode = data.obesitas_mode || "calculate";
  const berat = parseFloat(data.berat_badan || 0);
  const tinggi = parseFloat(data.tinggi_badan || 0);
  const gender = data.gender || "Laki-laki";
  const base = tinggi - 100;
  const idealWeight = gender === "Perempuan" ? base - base * 0.15 : base - base * 0.1;
  const difference = berat - idealWeight;
  const getStatus = () => {
    if (mode === "manual") {
      if (!data.obesitas_kg) return null;
      if (data.obesitas_kg === "> 20 kg") return { text: "Kategori: VIP (Kelebihan > 20kg)", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
      if (data.obesitas_kg === "10–20 kg") return { text: "Kategori: Reguler (Kelebihan 10-20kg)", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" };
      return { text: "Kategori: Reguler (Kelebihan 0-10kg)", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" };
    }
    if (!berat || !tinggi) return null;
    if (difference > 20) return { text: "Kategori: VIP (Kelebihan > 20kg)", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" };
    if (difference > 0) return { text: "Kategori: Reguler (Kelebihan 1-20kg)", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" };
    return { text: "Berat Badan Ideal / Dibawah Ideal", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" };
  };
  const status = getStatus();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => update("obesitas_mode", "calculate"),
          className: `flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "calculate" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-gray-500"}`,
          children: "Hitung Otomatis"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => update("obesitas_mode", "manual"),
          className: `flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === "manual" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-gray-500"}`,
          children: "Pilih Langsung"
        }
      )
    ] }),
    mode === "calculate" ? /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Tinggi Badan (cm)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: data.tinggi_badan || "",
            onChange: (e) => update("tinggi_badan", e.target.value),
            placeholder: "Contoh: 170",
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Berat Badan (kg)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: data.berat_badan || "",
            onChange: (e) => update("berat_badan", e.target.value),
            placeholder: "Contoh: 85",
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Berapa estimasi kelebihan berat badan Anda?" }),
      /* @__PURE__ */ jsx(RadioGroup, { options: ["0–10 kg", "10–20 kg", "> 20 kg"], value: data.obesitas_kg, onChange: (v) => update("obesitas_kg", v) })
    ] }),
    status && /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border border-transparent ${status.bg} transition-all`, children: [
      /* @__PURE__ */ jsx("p", { className: `text-sm font-bold ${status.color} mb-1`, children: status.text }),
      mode === "calculate" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
        "Berdasarkan perhitungan Broca Index, berat badan ideal Anda adalah sekitar ",
        /* @__PURE__ */ jsxs("strong", { children: [
          Math.round(idealWeight),
          " kg"
        ] }),
        "."
      ] })
    ] })
  ] });
}
function IdentitasStep({ data, update, autofilled = {} }) {
  const under17 = data.usia && parseInt(data.usia) < 17;
  const hasAutofill = autofilled.nama || autofilled.email || autofilled.wa || autofilled.gender || autofilled.usia;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    hasAutofill && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-xs text-green-700 dark:text-green-400", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-3.5 h-3.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
      "Beberapa data telah diisi otomatis dari akun Anda. Silakan periksa dan ubah jika diperlukan."
    ] }),
    hasAutofill ? /* @__PURE__ */ jsx(AutofillInputField, { label: "Nama Lengkap", value: data.nama, onChange: (v) => update("nama", v), autoFilled: autofilled.nama, required: true }) : /* @__PURE__ */ jsx(InputField, { label: "Nama Lengkap", value: data.nama, onChange: (v) => update("nama", v), required: true }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Jenis Kelamin *" }),
        autofilled.gender && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M5 13l4 4L19 7" }) }),
          "otomatis"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: ["Laki-laki", "Perempuan"].map((g) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => update("gender", g),
          className: `flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${data.gender === g ? "border-indigo-500 bg-indigo-500 text-white" : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300"}`,
          children: g
        },
        g
      )) })
    ] }),
    hasAutofill ? /* @__PURE__ */ jsx(AutofillInputField, { label: "Usia", type: "number", value: data.usia, onChange: (v) => update("usia", v), autoFilled: autofilled.usia, required: true }) : /* @__PURE__ */ jsx(InputField, { label: "Usia", type: "number", value: data.usia, onChange: (v) => update("usia", v), required: true }),
    under17 && /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 rounded-xl text-sm text-yellow-800 dark:text-yellow-400 cursor-pointer", children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!data.izin_wali, onChange: (e) => update("izin_wali", e.target.checked), className: "mt-0.5 accent-yellow-600" }),
      "Saya mendapat izin dari orang tua / wali untuk mengikuti skrining ini *"
    ] }),
    hasAutofill ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(AutofillInputField, { label: "Nomor WhatsApp", type: "tel", value: data.wa, onChange: (v) => update("wa", v), autoFilled: autofilled.wa, required: true }),
      /* @__PURE__ */ jsx(AutofillInputField, { label: "Email", type: "email", value: data.email, onChange: (v) => update("email", v), autoFilled: autofilled.email, required: true })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(InputField, { label: "Nomor WhatsApp", type: "tel", value: data.wa, onChange: (v) => update("wa", v), required: true }),
      /* @__PURE__ */ jsx(InputField, { label: "Email", type: "email", value: data.email, onChange: (v) => update("email", v), required: true })
    ] })
  ] });
}
export {
  AiBubble as A,
  CrisisBanner as C,
  DURASI_OPTIONS as D,
  IdentitasStep as I,
  MASALAH_OPTIONS as M,
  ObesitasStep as O,
  ProgressBar as P,
  RadioGroup as R,
  SkalaStep as S,
  TINGKAT_GANGGUAN_OPTIONS as T,
  UserBubble as U,
  DiagnosisStep as a,
  PERAWATAN_OPTIONS as b,
  CheckboxGroup as c,
  USAHA_OPTIONS as d,
  detectCrisis as e,
  StepIndicator as f,
  MASALAH_OPTIONS_REGULER as g,
  MASALAH_OPTIONS_VIP as h
};
