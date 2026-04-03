import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DLGa0CGh.js";
import { usePage, Head, Link } from "@inertiajs/react";
import axios from "axios";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
const COLOR_MAP = {
  indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/40", text: "text-indigo-600 dark:text-indigo-400", bubble: "bg-indigo-600", send: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30" },
  emerald: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-600 dark:text-emerald-400", bubble: "bg-emerald-600", send: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30" },
  rose: { bg: "bg-rose-100 dark:bg-rose-900/40", text: "text-rose-600 dark:text-rose-400", bubble: "bg-rose-600", send: "bg-rose-600 hover:bg-rose-700 shadow-rose-600/30" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-600 dark:text-amber-400", bubble: "bg-amber-600", send: "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-600 dark:text-violet-400", bubble: "bg-violet-600", send: "bg-violet-600 hover:bg-violet-700 shadow-violet-600/30" },
  sky: { bg: "bg-sky-100 dark:bg-sky-900/40", text: "text-sky-600 dark:text-sky-400", bubble: "bg-sky-600", send: "bg-sky-600 hover:bg-sky-700 shadow-sky-600/30" }
};
function getColor(value) {
  return COLOR_MAP[value] || COLOR_MAP.indigo;
}
function TypingIndicator({ color }) {
  const c = getColor(color);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${c.bg} ${c.text}`, children: "🤖" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 items-center h-4", children: [
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gray-400 animate-bounce", style: { animationDelay: "0ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gray-400 animate-bounce", style: { animationDelay: "150ms" } }),
      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gray-400 animate-bounce", style: { animationDelay: "300ms" } })
    ] }) })
  ] });
}
function Message({ msg, agentColor, agentName }) {
  const isUser = msg.role === "user";
  const c = getColor(agentColor);
  if (isUser) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: `max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium text-white shadow-md ${c.bubble}`, children: [
      msg.content,
      msg.attachment && /* @__PURE__ */ jsx("div", { className: "mt-3 overflow-hidden rounded-lg", children: msg.attachment.type === "image" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: msg.attachment.url,
          alt: msg.attachment.name,
          className: "max-w-full h-auto max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity",
          onClick: () => window.open(msg.attachment.url, "_blank")
        }
      ) : /* @__PURE__ */ jsxs(
        "a",
        {
          href: msg.attachment.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-2 p-2 rounded-xl text-xs font-semibold no-underline transition-all bg-white/20 hover:bg-white/30 text-white",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
            /* @__PURE__ */ jsx("span", { className: "truncate max-w-[200px]", children: msg.attachment.name })
          ]
        }
      ) })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${c.bg} ${c.text}`, children: "🤖" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[80%] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1", children: agentName }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap", children: msg.content }),
      msg.attachment && /* @__PURE__ */ jsx("div", { className: "mt-3 overflow-hidden rounded-lg", children: msg.attachment.type === "image" ? /* @__PURE__ */ jsx(
        "img",
        {
          src: msg.attachment.url,
          alt: msg.attachment.name,
          className: "max-w-full h-auto max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity",
          onClick: () => window.open(msg.attachment.url, "_blank")
        }
      ) : /* @__PURE__ */ jsxs(
        "a",
        {
          href: msg.attachment.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center gap-2 p-2 rounded-xl text-xs font-semibold no-underline transition-all bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
            /* @__PURE__ */ jsx("span", { className: "truncate max-w-[200px]", children: msg.attachment.name })
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
        /* @__PURE__ */ jsxs(Link, { href: route("internal-ai.index"), className: "text-sm text-indigo-500 hover:text-indigo-700 font-bold inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }),
          "Semua Agent"
        ] }),
        /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.bg} ${c.text}`, children: "🤖" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black text-gray-900 dark:text-white leading-tight", children: agent.name }),
          agent.description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: agent.description })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `Chat - ${agent.name}` }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", style: { height: "calc(100vh - 160px)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-4 py-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto space-y-4", children: [
            messages.map((msg, i) => /* @__PURE__ */ jsx(Message, { msg, agentColor: agent.avatar_color, agentName: agent.name }, i)),
            loading && /* @__PURE__ */ jsx(TypingIndicator, { color: agent.avatar_color }),
            error && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium", children: [
              "⚠️ ",
              error
            ] }) }),
            /* @__PURE__ */ jsx("div", { ref: bottomRef })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-white/40 dark:border-white/[0.08] bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
            selectedFile && /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/50 p-2 rounded-2xl animate-in fade-in slide-in-from-bottom-2", children: [
              filePreview ? /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("img", { src: filePreview, alt: "Preview", className: "w-full h-full object-cover" }) }) : /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-200 truncate", children: selectedFile.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500", children: [
                  (selectedFile.size / 1024 / 1024).toFixed(2),
                  " MB"
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: removeFile,
                  className: "p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: clearChat,
                  className: "p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0",
                  title: "Mulai chat baru",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
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
                  className: "p-2.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0 disabled:opacity-50",
                  title: "Lampirkan file atau gambar",
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" }) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  ref: inputRef,
                  value: input,
                  onChange: (e) => setInput(e.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder: `Tanya ${agent.name}...`,
                  rows: 1,
                  disabled: loading,
                  className: "w-full bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/50 rounded-2xl px-4 py-3 pr-12 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none disabled:opacity-60 transition-all font-medium",
                  style: { maxHeight: "120px" }
                }
              ) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => sendMessage(),
                  disabled: !input.trim() && !selectedFile || loading,
                  className: `w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg disabled:opacity-40 disabled:scale-95 active:scale-95 flex-shrink-0 ${c.send}`,
                  children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 rotate-90", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 text-center mt-2", children: "Enter untuk kirim · Shift+Enter untuk baris baru" })
          ] }) })
        ] })
      ]
    }
  );
}
export {
  InternalAiChat as default
};
