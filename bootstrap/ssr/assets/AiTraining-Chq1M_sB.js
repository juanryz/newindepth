import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function AiTraining({ instructions }) {
  const [activeTab, setActiveTab] = useState("do");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { data, setData, post, processing, reset } = useForm({
    type: "do",
    instruction: "",
    category: "general"
  });
  const categories = [
    { value: "general", label: "📋 Umum", color: "indigo" },
    { value: "tone", label: "🎯 Gaya Bahasa", color: "purple" },
    { value: "content", label: "📝 Konten", color: "blue" },
    { value: "seo", label: "📊 SEO", color: "emerald" },
    { value: "forbidden", label: "🚫 Larangan", color: "red" }
  ];
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.ai-training.store"), {
      onSuccess: () => reset("instruction"),
      preserveScroll: true
    });
  };
  const toggleActive = (item) => {
    router.put(route("admin.ai-training.update", item.id), {
      instruction: item.instruction,
      is_active: !item.is_active,
      category: item.category
    }, { preserveScroll: true });
  };
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.instruction);
  };
  const saveEdit = (item) => {
    router.put(route("admin.ai-training.update", item.id), {
      instruction: editText,
      is_active: item.is_active,
      category: item.category
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setEditingId(null);
        setEditText("");
      }
    });
  };
  const deleteItem = (item) => {
    if (confirm("Hapus instruksi ini?")) {
      router.delete(route("admin.ai-training.destroy", item.id), { preserveScroll: true });
    }
  };
  const currentItems = activeTab === "do" ? instructions?.dos || [] : instructions?.donts || [];
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "AI Training - Do's & Don'ts" }),
    /* @__PURE__ */ jsxs("div", { className: "py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mb-2", children: /* @__PURE__ */ jsx(Link, { href: route("admin.blog.create"), className: "text-sm text-indigo-500 hover:text-indigo-700 font-medium", children: "← Kembali ke Blog Editor" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-gray-900 dark:text-white", children: "🧠 AI Training Center" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mt-2 font-medium", children: "Ajarkan AI cara menulis konten blog yang sesuai dengan standar Anda. Tanpa coding — cukup ketik instruksi." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-6 mb-8 border border-indigo-200/50 dark:border-indigo-800/30", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-2", children: "💡 Cara Kerja" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed", children: [
          "Setiap instruksi yang Anda tambahkan di sini akan ",
          /* @__PURE__ */ jsx("strong", { children: "otomatis diinjeksi ke dalam prompt AI" }),
          " saat generate artikel. Gunakan tab ",
          /* @__PURE__ */ jsx("strong", { children: '"DO"' }),
          " untuk hal yang harus dilakukan AI, dan tab ",
          /* @__PURE__ */ jsx("strong", { children: `"DON'T"` }),
          " untuk hal yang dilarang."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setActiveTab("do");
              setData("type", "do");
            },
            className: `px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === "do" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"}`,
            children: [
              "✅ DO (",
              instructions?.dos?.length || 0,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setActiveTab("dont");
              setData("type", "dont");
            },
            className: `px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === "dont" ? "bg-red-500 text-white shadow-lg shadow-red-500/30" : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/20"}`,
            children: [
              "🚫 DON'T (",
              instructions?.donts?.length || 0,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: activeTab === "do" ? "➕ Tambah Instruksi DO (AI Harus)" : "➕ Tambah Instruksi DON'T (AI Dilarang)" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: data.category,
              onChange: (e) => setData("category", e.target.value),
              className: "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium dark:text-gray-300 w-40",
              children: categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.value, children: c.label }, c.value))
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.instruction,
              onChange: (e) => setData("instruction", e.target.value),
              placeholder: activeTab === "do" ? "Contoh: Selalu sertakan data statistik dari sumber terpercaya" : "Contoh: Jangan gunakan bahasa yang terlalu teknis untuk audiens umum",
              className: "flex-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: processing || !data.instruction.trim(),
              className: `px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all disabled:opacity-50 ${activeTab === "do" ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20" : "bg-red-500 hover:bg-red-600 shadow-red-500/20"}`,
              children: "Tambah"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: currentItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx("p", { className: "text-4xl mb-3", children: activeTab === "do" ? "✅" : "🚫" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 dark:text-gray-400 font-medium", children: [
          "Belum ada instruksi ",
          activeTab === "do" ? "DO" : "DON'T",
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500 mt-1", children: "Tambahkan instruksi di atas untuk mulai melatih AI Anda." })
      ] }) : currentItems.map((item, index) => {
        const cat = categories.find((c) => c.value === item.category) || categories[0];
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `bg-white dark:bg-gray-800 rounded-2xl p-4 border transition-all ${item.is_active ? "border-gray-200/50 dark:border-gray-700/50" : "border-gray-200/30 dark:border-gray-700/30 opacity-50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${activeTab === "do" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" : "bg-red-100 dark:bg-red-900/30 text-red-600"}`, children: index + 1 }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 whitespace-nowrap", children: cat.label }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: editingId === item.id ? /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: editText,
                  onChange: (e) => setEditText(e.target.value),
                  className: "w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg text-sm dark:text-gray-300",
                  autoFocus: true,
                  onKeyDown: (e) => {
                    if (e.key === "Enter") saveEdit(item);
                    if (e.key === "Escape") setEditingId(null);
                  }
                }
              ) : /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 truncate", children: item.instruction }) }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 shrink-0", children: editingId === item.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("button", { onClick: () => saveEdit(item), className: "text-emerald-500 hover:text-emerald-700 text-xs font-bold", children: "Simpan" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setEditingId(null), className: "text-gray-400 hover:text-gray-600 text-xs font-bold", children: "Batal" })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => toggleActive(item),
                    className: `px-3 py-1 rounded-lg text-[10px] font-black uppercase ${item.is_active ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-200" : "bg-gray-100 dark:bg-gray-900 text-gray-400 hover:bg-gray-200"}`,
                    children: item.is_active ? "Aktif" : "Nonaktif"
                  }
                ),
                /* @__PURE__ */ jsx("button", { onClick: () => startEdit(item), className: "text-indigo-400 hover:text-indigo-600 p-1", title: "Edit", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) }) }),
                /* @__PURE__ */ jsx("button", { onClick: () => deleteItem(item), className: "text-red-400 hover:text-red-600 p-1", title: "Hapus", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) }) })
              ] }) })
            ] })
          },
          item.id
        );
      }) }),
      (instructions?.dos?.length > 0 || instructions?.donts?.length > 0) && /* @__PURE__ */ jsxs("div", { className: "mt-10 bg-gray-900 dark:bg-gray-950 rounded-3xl p-6 border border-gray-700/50", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4", children: "👁️ Preview Prompt yang Akan Dikirim ke AI" }),
        /* @__PURE__ */ jsxs("pre", { className: "text-xs text-green-400 font-mono leading-relaxed whitespace-pre-wrap", children: [
          instructions?.dos?.filter((d) => d.is_active).length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            "\nATURAN TAMBAHAN DARI USER (WAJIB DIIKUTI):\n",
            instructions.dos.filter((d) => d.is_active).map((d, i) => `${i + 1}. ${d.instruction}
`).join("")
          ] }),
          instructions?.donts?.filter((d) => d.is_active).length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
            "\nLARANGAN TAMBAHAN DARI USER (JANGAN DILANGGAR):\n",
            instructions.donts.filter((d) => d.is_active).map((d) => `- JANGAN: ${d.instruction}
`).join("")
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AiTraining as default
};
