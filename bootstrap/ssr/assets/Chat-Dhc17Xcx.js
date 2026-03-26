import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DSi5ya3j.js";
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
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("div", { className: `max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm font-medium text-white shadow-md ${c.bubble}`, children: msg.content }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${c.bg} ${c.text}`, children: "🤖" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[80%] bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1", children: agentName }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap", children: msg.content })
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
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const sendMessage = async (text) => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setError(null);
    const newHistory = [...messages, { role: "user", content: msg }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const response = await axios.post(route("internal-ai.chat", agent.id), {
        history: newHistory
      });
      setMessages((prev) => [...prev, { role: "assistant", content: response.data.reply }]);
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
                  className: "w-full bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/50 rounded-2xl px-4 py-3 pr-12 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none disabled:opacity-60 transition-all",
                  style: { maxHeight: "120px" }
                }
              ) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => sendMessage(),
                  disabled: !input.trim() || loading,
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
