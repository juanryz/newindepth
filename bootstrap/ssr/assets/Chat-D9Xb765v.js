import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BEscgCHf.js";
import { usePage, Head, Link } from "@inertiajs/react";
import axios from "axios";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const COLOR_MAP = {
  indigo: {
    bg: "bg-indigo-100/50 dark:bg-indigo-900/40",
    text: "text-indigo-600 dark:text-indigo-400",
    bubble: "bg-gradient-to-br from-indigo-500/90 to-indigo-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-indigo-500/20",
    send: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30",
    blob: "bg-indigo-400/30 dark:bg-indigo-600/20"
  },
  emerald: {
    bg: "bg-emerald-100/50 dark:bg-emerald-900/40",
    text: "text-emerald-600 dark:text-emerald-400",
    bubble: "bg-gradient-to-br from-emerald-500/90 to-emerald-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-emerald-500/20",
    send: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30",
    blob: "bg-emerald-400/30 dark:bg-emerald-600/20"
  },
  rose: {
    bg: "bg-rose-100/50 dark:bg-rose-900/40",
    text: "text-rose-600 dark:text-rose-400",
    bubble: "bg-gradient-to-br from-rose-500/90 to-rose-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-rose-500/20",
    send: "bg-rose-600 hover:bg-rose-700 shadow-rose-600/30",
    blob: "bg-rose-400/30 dark:bg-rose-600/20"
  },
  amber: {
    bg: "bg-amber-100/50 dark:bg-amber-900/40",
    text: "text-amber-600 dark:text-amber-400",
    bubble: "bg-gradient-to-br from-amber-500/90 to-amber-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-amber-500/20",
    send: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30",
    blob: "bg-amber-400/30 dark:bg-amber-600/20"
  },
  violet: {
    bg: "bg-violet-100/50 dark:bg-violet-900/40",
    text: "text-violet-600 dark:text-violet-400",
    bubble: "bg-gradient-to-br from-violet-500/90 to-violet-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-violet-500/20",
    send: "bg-violet-600 hover:bg-violet-700 shadow-violet-600/30",
    blob: "bg-violet-400/30 dark:bg-violet-600/20"
  },
  sky: {
    bg: "bg-sky-100/50 dark:bg-sky-900/40",
    text: "text-sky-600 dark:text-sky-400",
    bubble: "bg-gradient-to-br from-sky-500/90 to-sky-700/90 backdrop-blur-md border border-white/20 shadow-lg shadow-sky-500/20",
    send: "bg-sky-600 hover:bg-sky-700 shadow-sky-600/30",
    blob: "bg-sky-400/30 dark:bg-sky-600/20"
  }
};
function getColor(value) {
  return COLOR_MAP[value] || COLOR_MAP.indigo;
}
function TypingIndicator({ color }) {
  const c = getColor(color);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 animate-in fade-in slide-in-from-left-4 duration-500", children: [
    /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-lg border border-white/20 animate-pulse ${c.bg} ${c.text}`, children: "🤖" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[24px] rounded-bl-none px-5 py-4 shadow-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center h-4", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce", style: { animationDelay: "0ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce", style: { animationDelay: "150ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce", style: { animationDelay: "300ms" } })
    ] }) })
  ] });
}
function Message({ msg, agentColor, agentName }) {
  const isUser = msg.role === "user";
  const c = getColor(agentColor);
  if (isUser) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end animate-in fade-in slide-in-from-right-4 duration-500", children: /* @__PURE__ */ jsxs("div", { className: `max-w-[85%] px-5 py-3.5 rounded-[24px] rounded-br-none text-sm font-medium text-white shadow-xl ${c.bubble}`, children: [
      /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: msg.content }),
      msg.attachment && /* @__PURE__ */ jsx("div", { className: "mt-3 overflow-hidden rounded-2xl border border-white/20 shadow-inner", children: msg.attachment.type === "image" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: msg.attachment.url,
          alt: msg.attachment.name,
          className: "max-w-full h-auto max-h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-500",
          onClick: () => window.open(msg.attachment.url, "_blank")
        }
      ) : /* @__PURE__ */ jsxs(
        "a",
        {
          href: msg.attachment.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-3 p-3 rounded-xl text-xs font-semibold no-underline transition-all bg-white/10 hover:bg-white/20 text-white",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-[200px]", children: msg.attachment.name }),
              /* @__PURE__ */ jsx("span", { className: "opacity-60 text-[10px]", children: "Klik untuk mengunduh" })
            ] })
          ]
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3 animate-in fade-in slide-in-from-left-4 duration-500", children: [
    /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-lg border border-white/20 ${c.bg} ${c.text}`, children: "🤖" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[85%] bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-[24px] rounded-bl-none px-5 py-3.5 shadow-xl shadow-black/5 dark:shadow-white/[0.02]", children: [
      /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest mb-1.5 ${c.text}`, children: agentName }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium whitespace-pre-wrap", children: msg.content }),
      msg.attachment && /* @__PURE__ */ jsx("div", { className: "mt-3 overflow-hidden rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-inner", children: msg.attachment.type === "image" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: msg.attachment.url,
          alt: msg.attachment.name,
          className: "max-w-full h-auto max-h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-500",
          onClick: () => window.open(msg.attachment.url, "_blank")
        }
      ) : /* @__PURE__ */ jsxs(
        "a",
        {
          href: msg.attachment.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-3 p-3 rounded-xl text-xs font-semibold no-underline transition-all bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gray-200/50 dark:bg-white/5 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate max-w-[200px]", children: msg.attachment.name }),
              /* @__PURE__ */ jsx("span", { className: "opacity-60 text-[10px]", children: "Klik untuk mengunduh" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
function InternalAiChat({ agent }) {
  const { auth } = usePage().props;
  const c = getColor(agent.avatar_color);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Halo ${auth?.user?.name?.split(" ")[0] || ""}! Saya ${agent.name}. ${agent.description ? agent.description + " " : ""}Ada yang bisa saya bantu?`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e2) => setFilePreview(e2.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const sendMessage = async (text) => {
    const msg = input.trim();
    if (!msg && !selectedFile || loading) return;
    const fileToSend = selectedFile;
    const previewToSend = filePreview;
    setInput("");
    removeFile();
    setError(null);
    const newHistory = [...messages, {
      role: "user",
      content: msg,
      attachment: fileToSend ? {
        name: fileToSend.name,
        url: previewToSend || "",
        type: fileToSend.type.startsWith("image/") ? "image" : "file"
      } : null
    }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("history", JSON.stringify(newHistory));
      if (fileToSend) {
        formData.append("file", fileToSend);
      }
      const response = await axios.post(route("internal-ai.chat", agent.id), formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessages((prev) => {
        const updated = [...prev];
        const lastUserMsgIndex = updated.length - 1;
        if (response.data.attachment) {
          updated[lastUserMsgIndex] = {
            ...updated[lastUserMsgIndex],
            attachment: response.data.attachment
          };
        }
        return [...updated, { role: "assistant", content: response.data.reply }];
      });
    } catch (err) {
      setError("Gagal menghubungi AI. Silakan coba lagi.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const clearChat = () => {
    setMessages([{
      role: "assistant",
      content: `Halo! Saya ${agent.name}. Ada yang bisa saya bantu?`
    }]);
    setError(null);
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: route("internal-ai.index"), className: "w-10 h-10 rounded-2xl flex items-center justify-center bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 text-gray-500 hover:text-indigo-500 transition-all shadow-sm", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }) }),
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/20 ${c.bg} ${c.text}`, children: "🤖" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white leading-tight", children: agent.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-500 dark:text-gray-400", children: "AI Memberikan Solusi" })
          ] })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Chat - ${agent.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col overflow-hidden bg-white/50 dark:bg-gray-950/50", style: { height: "calc(100vh - 160px)" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
            /* @__PURE__ */ jsx("div", { className: `absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-blob opacity-50 ${c.blob}` }),
            /* @__PURE__ */ jsx("div", { className: `absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-blob animation-delay-2000 opacity-50 ${c.blob}` }),
            /* @__PURE__ */ jsx("div", { className: `absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] animate-blob animation-delay-4000 opacity-30 ${c.blob}` })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 flex-1 overflow-y-auto custom-scrollbar px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
            messages.map((msg, i) => /* @__PURE__ */ jsx(Message, { msg, agentColor: agent.avatar_color, agentName: agent.name }, i)),
            loading && /* @__PURE__ */ jsx(TypingIndicator, { color: agent.avatar_color }),
            error && /* @__PURE__ */ jsx("div", { className: "flex justify-center animate-in zoom-in-95 duration-300", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl px-6 py-4 text-sm text-red-600 dark:text-red-400 font-bold shadow-xl shadow-red-500/10 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs", children: "⚠️" }),
              error
            ] }) }),
            /* @__PURE__ */ jsx("div", { ref: bottomRef, className: "h-4" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 px-4 pb-8 pt-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[32px] p-2 shadow-2xl shadow-black/5 dark:shadow-white/[0.02]", children: [
              selectedFile && /* @__PURE__ */ jsxs("div", { className: "mx-2 mb-2 flex items-center gap-4 bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 p-3 rounded-2xl animate-in fade-in slide-in-from-bottom-4", children: [
                filePreview ? /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white shadow-md", children: /* @__PURE__ */ jsx("img", { src: filePreview, alt: "Preview", className: "w-full h-full object-cover" }) }) : /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-100 truncate", children: selectedFile.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase text-gray-400", children: [
                    (selectedFile.size / 1024 / 1024).toFixed(2),
                    " MB • ",
                    selectedFile.type || "File"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: removeFile,
                    className: "w-10 h-10 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500/20 text-gray-400 transition-all flex items-center justify-center",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M6 18L18 6M6 6l12 12" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: clearChat,
                      className: "w-12 h-12 rounded-[24px] text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all flex items-center justify-center flex-shrink-0",
                      title: "Hapus riwayat chat",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }) })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      ref: fileInputRef,
                      onChange: handleFileChange,
                      className: "hidden",
                      accept: "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => fileInputRef.current?.click(),
                      disabled: loading,
                      className: "w-12 h-12 rounded-[24px] text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all flex items-center justify-center flex-shrink-0 disabled:opacity-50",
                      title: "Lampirkan file",
                      children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    ref: inputRef,
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    onKeyDown: handleKeyDown,
                    placeholder: `Ketik pesan untuk ${agent.name}...`,
                    rows: 1,
                    disabled: loading,
                    className: "w-full bg-transparent border-none px-4 py-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-0 resize-none font-medium leading-relaxed",
                    style: { maxHeight: "150px" }
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => sendMessage(),
                    disabled: !input.trim() && !selectedFile || loading,
                    className: `w-14 h-14 rounded-[26px] flex items-center justify-center text-white transition-all shadow-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:grayscale flex-shrink-0 mr-1 ${c.send}`,
                    children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 rotate-45", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between px-6 mt-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-gray-400 tracking-widest", children: "Shift+Enter untuk baris baru" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase text-gray-400 tracking-widest", children: "End-to-End Encrypted" })
            ] })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  InternalAiChat as default
};
