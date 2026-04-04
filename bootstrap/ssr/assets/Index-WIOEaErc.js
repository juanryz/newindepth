import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { Head, Link, router, useForm } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const COLORS = [
  { value: "indigo", label: "Indigo", bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-400" },
  { value: "emerald", label: "Hijau", bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-400" },
  { value: "rose", label: "Merah", bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-600 dark:text-rose-400", ring: "ring-rose-400" },
  { value: "amber", label: "Kuning", bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600 dark:text-amber-400", ring: "ring-amber-400" },
  { value: "violet", label: "Ungu", bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-600 dark:text-violet-400", ring: "ring-violet-400" },
  { value: "sky", label: "Biru", bg: "bg-sky-100 dark:bg-sky-900/40", text: "text-sky-600 dark:text-sky-400", ring: "ring-sky-400" }
];
function getColor(value) {
  return COLORS.find((c) => c.value === value) || COLORS[0];
}
function AgentIcon({ color, size = "lg" }) {
  const c = getColor(color);
  const sz = size === "lg" ? "w-14 h-14 text-2xl" : "w-10 h-10 text-lg";
  return /* @__PURE__ */ jsx("div", { className: `${sz} rounded-2xl flex items-center justify-center flex-shrink-0 ${c.bg} ${c.text} font-black`, children: "🤖" });
}
function CreateAgentModal({ onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    system_prompt: "",
    avatar_color: "indigo"
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.internal-ai.store"), {
      onSuccess: () => {
        reset();
        onClose();
      },
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 z-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white mb-5", children: "Buat Agent Baru" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "Nama Agent *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              placeholder: "Contoh: HR Assistant, IT Support",
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20",
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-500 mt-1", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "Deskripsi" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              placeholder: "Singkat tentang fungsi agent ini",
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "System Prompt" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.system_prompt,
              onChange: (e) => setData("system_prompt", e.target.value),
              rows: 4,
              placeholder: "Deskripsikan kepribadian dan tugas utama agent ini. Contoh: Kamu adalah asisten HR Indepth yang membantu karyawan soal kebijakan perusahaan, cuti, dan prosedur kerja.",
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20 resize-none"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1", children: "Kosongkan untuk menggunakan prompt default." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-2", children: "Warna Avatar" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: COLORS.map((c) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setData("avatar_color", c.value),
              className: `w-8 h-8 rounded-full ${c.bg} ${c.text} text-xs font-black transition-all ${data.avatar_color === c.value ? `ring-2 ring-offset-2 ${c.ring} scale-110` : "opacity-60 hover:opacity-100"}`,
              children: c.label.charAt(0)
            },
            c.value
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors", children: "Batal" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing || !data.name.trim(), className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20", children: processing ? "Membuat..." : "Buat Agent" })
        ] })
      ] })
    ] })
  ] });
}
function EditAgentModal({ agent, onClose }) {
  const { data, setData, put, processing, errors } = useForm({
    name: agent.name,
    description: agent.description || "",
    system_prompt: agent.system_prompt || "",
    avatar_color: agent.avatar_color || "indigo",
    is_active: agent.is_active
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("admin.internal-ai.update", agent.id), {
      onSuccess: onClose,
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white mb-5", children: "Edit Agent" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "Nama Agent *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "Deskripsi" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.description,
              onChange: (e) => setData("description", e.target.value),
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-1", children: "System Prompt" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: data.system_prompt,
              onChange: (e) => setData("system_prompt", e.target.value),
              rows: 4,
              className: "w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm dark:text-gray-300 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-black uppercase tracking-widest text-gray-400 mb-2", children: "Warna Avatar" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: COLORS.map((c) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setData("avatar_color", c.value),
              className: `w-8 h-8 rounded-full ${c.bg} ${c.text} text-xs font-black transition-all ${data.avatar_color === c.value ? `ring-2 ring-offset-2 ${c.ring} scale-110` : "opacity-60 hover:opacity-100"}`,
              children: c.label.charAt(0)
            },
            c.value
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setData("is_active", !data.is_active),
              className: `relative w-11 h-6 rounded-full transition-colors ${data.is_active ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`,
              children: /* @__PURE__ */ jsx("span", { className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${data.is_active ? "translate-x-5" : ""}` })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-700 dark:text-gray-300", children: data.is_active ? "Aktif" : "Nonaktif" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors", children: "Batal" }),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: processing, className: "flex-1 px-4 py-2.5 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20", children: processing ? "Menyimpan..." : "Simpan" })
        ] })
      ] })
    ] })
  ] });
}
function InternalAiIndex({ agents }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const deleteAgent = (agent) => {
    if (!confirm(`Hapus agent "${agent.name}"? Semua instruksi training juga akan dihapus.`)) return;
    router.delete(route("admin.internal-ai.destroy", agent.id), { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-gray-900 dark:text-white", children: "🤖 Manajemen AI Internal" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "AI Internal - Manajemen Agent" }),
        /* @__PURE__ */ jsxs("div", { className: "py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8", children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 font-medium mt-1", children: "Buat dan kelola agent AI yang bisa ditraining khusus untuk kebutuhan internal Indepth." }) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowCreate(true),
                className: "inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95",
                children: [
                  /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 4v16m8-8H4" }) }),
                  "Buat Agent Baru"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl p-6 mb-8 border border-indigo-200/50 dark:border-indigo-800/30", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-1", children: "💡 Cara Kerja" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400 leading-relaxed", children: [
              "Setiap ",
              /* @__PURE__ */ jsx("strong", { children: "Agent" }),
              " adalah asisten AI independen dengan kepribadian dan pengetahuan tersendiri. Buat agent sesuai divisi (HR, IT, Keuangan, dll), lalu ",
              /* @__PURE__ */ jsx("strong", { children: "training" }),
              " dengan instruksi DO & DON'T. Karyawan dapat langsung bertanya ke agent yang sesuai dari menu ",
              /* @__PURE__ */ jsx("strong", { children: "AI Internal" }),
              "."
            ] })
          ] }),
          agents.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700", children: [
            /* @__PURE__ */ jsx("div", { className: "text-6xl mb-4", children: "🤖" }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-700 dark:text-gray-300 mb-2", children: "Belum Ada Agent" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-500 text-sm mb-6", children: 'Klik tombol "Buat Agent Baru" untuk memulai.' }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowCreate(true), className: "inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors", children: "+ Buat Agent Pertama" })
          ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: agents.map((agent) => {
            const c = getColor(agent.avatar_color);
            return /* @__PURE__ */ jsxs("div", { className: `bg-white dark:bg-gray-800 rounded-3xl border border-gray-200/60 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${!agent.is_active ? "opacity-60" : ""}`, children: [
              /* @__PURE__ */ jsx("div", { className: `h-1.5 w-full ${c.bg}` }),
              /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 mb-4", children: [
                  /* @__PURE__ */ jsx(AgentIcon, { color: agent.avatar_color }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-black text-gray-900 dark:text-white text-base leading-tight truncate", children: agent.name }),
                      !agent.is_active && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400", children: "Nonaktif" })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2", children: agent.description || "Tidak ada deskripsi." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${c.bg} ${c.text}`, children: [
                  "📋 ",
                  agent.instructions_count,
                  " Instruksi"
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("admin.internal-ai.train", agent.id),
                      className: "flex-1 text-center px-3 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/20",
                      children: "🧠 Training"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setEditingAgent(agent),
                      className: "px-3 py-2.5 rounded-xl text-xs font-black text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
                      title: "Edit",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => deleteAgent(agent),
                      className: "px-3 py-2.5 rounded-xl text-xs font-black text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors",
                      title: "Hapus",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                    }
                  )
                ] })
              ] })
            ] }, agent.id);
          }) })
        ] }),
        showCreate && /* @__PURE__ */ jsx(CreateAgentModal, { onClose: () => setShowCreate(false) }),
        editingAgent && /* @__PURE__ */ jsx(EditAgentModal, { agent: editingAgent, onClose: () => setEditingAgent(null) })
      ]
    }
  );
}
export {
  InternalAiIndex as default
};
