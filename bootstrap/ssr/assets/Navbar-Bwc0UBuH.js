import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { T as ThemeToggle } from "./ThemeToggle-SHr-61ed.js";
import { createPortal } from "react-dom";
import axios from "axios";
const SUGGESTIONS = [
  "Apa itu InDepth Trance State?",
  "Layanan apa saja yang tersedia?",
  "Di mana lokasi kliniknya?",
  "Berapa biaya sesinya?"
];
function AiChatPopup({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Halo! Saya asisten virtual InDepth. Ada yang bisa saya bantu seputar layanan kami?" }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);
  if (!isOpen || !mounted || typeof document === "undefined" || !document.body) return null;
  const handleSend = async (textToSend) => {
    const messageText = typeof textToSend === "string" ? textToSend : input;
    if (!messageText || !messageText.trim() || isThinking) return;
    const userMsg = { role: "user", content: messageText.trim() };
    setMessages((prev) => [...prev || [], userMsg]);
    setInput("");
    setIsThinking(true);
    try {
      const apiUrl = "/api/ai-chat";
      const newHistory = [...messages || [], userMsg];
      const response = await axios.post(apiUrl, {
        history: newHistory.map((m) => ({ role: m.role, content: m.content }))
      });
      if (response.data && response.data.reply) {
        setMessages((prev) => [...prev || [], {
          role: "assistant",
          content: response.data.reply,
          redirect_whatsapp: !!response.data.redirect_whatsapp
        }]);
      }
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [...prev || [], {
        role: "assistant",
        content: "Mohon maaf, terjadi gangguan koneksi. Silakan hubungi kami di WhatsApp.",
        redirect_whatsapp: true
      }]);
    } finally {
      setIsThinking(false);
    }
  };
  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    handleSend();
  };
  const chatContent = /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.5s ease",
        transformOrigin: "bottom right",
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: { pointerEvents: "auto" },
          className: `
                    bg-white dark:bg-gray-900 
                    rounded-[2.5rem] border border-gray-200 dark:border-gray-800 
                    shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] 
                    flex flex-col overflow-hidden transition-all duration-500
                    ${isMinimized ? "w-20 h-20 rounded-full cursor-pointer" : "w-[22rem] sm:w-96 h-[32rem]"}
                `,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => isMinimized && setIsMinimized(false),
                className: `p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 ${isMinimized ? "h-full justify-center p-0" : "bg-white dark:bg-gray-900"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: `rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shadow-lg ${isMinimized ? "w-12 h-12" : "w-10 h-10"}`, children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) }),
                    !isMinimized && /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 dark:text-white text-sm", children: "InDepth Assistant" }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider", children: "Online" })
                      ] })
                    ] })
                  ] }),
                  !isMinimized && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          setIsMinimized(true);
                        },
                        className: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-500",
                        type: "button",
                        children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M18 12H6" }) })
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: (e) => {
                          e.stopPropagation();
                          onClose();
                        },
                        className: "p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-xl transition-colors text-gray-500",
                        type: "button",
                        children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                      }
                    )
                  ] })
                ]
              }
            ),
            !isMinimized && /* @__PURE__ */ jsxs(
              "div",
              {
                ref: scrollRef,
                className: "flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 dark:bg-gray-950/30",
                children: [
                  (messages || []).map((msg, i) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `
                                    max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed
                                    ${msg.role === "user" ? "bg-gold-500 text-white rounded-tr-none shadow-md" : "bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm"}
                                `, children: [
                    msg.content,
                    msg.redirect_whatsapp && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "https://wa.me/6282220800034",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95",
                        children: "Chat WhatsApp"
                      }
                    ) })
                  ] }) }, i)),
                  isThinking && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 p-4 rounded-3xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" }),
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]" }),
                    /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce [animation-delay:0.4s]" })
                  ] }) }) })
                ]
              }
            ),
            !isMinimized && /* @__PURE__ */ jsxs("div", { className: "p-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900", children: [
              messages && messages.length === 1 && !isThinking && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: SUGGESTIONS.map((s, idx) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleSend(s),
                  className: "text-[11px] font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:text-gold-600 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 transition-all active:scale-95",
                  children: s
                },
                idx
              )) }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleFormSubmit, className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: input,
                    onChange: (e) => setInput(e.target.value),
                    placeholder: "Tulis pertanyaan...",
                    className: "w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-gold-500/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
                    disabled: isThinking
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isThinking || !input.trim(),
                    className: "absolute right-2 top-1.5 p-1.5 bg-gold-500 text-white rounded-xl hover:bg-gold-600 disabled:opacity-50 transition-colors",
                    children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 text-center mt-3 uppercase font-bold tracking-tighter", children: "AI Assistant powered by InDepth" })
            ] })
          ]
        }
      )
    }
  );
  try {
    return createPortal(chatContent, document.body);
  } catch (e) {
    console.error("[AiChatPopup] createPortal error:", e);
    return null;
  }
}
function Navbar({ auth, active = "home", isAuthPage = false, title = "" }) {
  const user = auth?.user ?? null;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getNavLinks = () => {
    try {
      return [
        { name: "Home", href: "/", key: "home" },
        { name: "Metode", href: "/metode", key: "methods" },
        { name: "Artikel", href: "/blog", key: "blog" },
        { name: "E-Learning", href: "/courses", key: "courses" }
      ];
    } catch (e) {
      return [
        { name: "Home", href: "/", key: "home" },
        { name: "Metode", href: "/metode", key: "methods" },
        { name: "Artikel", href: "/blog", key: "blog" },
        { name: "E-Learning", href: "/courses", key: "courses" }
      ];
    }
  };
  const navLinks = getNavLinks();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 w-full z-50 bg-white/20 dark:bg-black/20 backdrop-blur-2xl border-b border-white/20 dark:border-gray-800/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-500", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-24 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center cursor-pointer group relative z-50", onClick: () => window.scrollTo(0, 0), children: /* @__PURE__ */ jsxs(Link, { href: "/", children: [
          /* @__PURE__ */ jsx("img", { src: "/images/logo-color.png", alt: "InDepth", className: "h-20 w-auto object-contain block dark:hidden relative z-10" }),
          /* @__PURE__ */ jsx("img", { src: "/images/logo-white.png", alt: "InDepth", className: "h-20 w-auto object-contain hidden dark:block relative z-10" })
        ] }) }),
        !isAuthPage && /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-1 bg-white/10 dark:bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10", children: [
          navLinks.map((item) => /* @__PURE__ */ jsx(
            Link,
            {
              href: item.href,
              className: `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === item.key ? "bg-white dark:bg-gray-800 text-gold-600 dark:text-gold-400 shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10"}`,
              children: item.name
            },
            item.key
          )),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsChatOpen(true),
              className: "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10",
              children: "Contact Us"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 relative z-50", children: [
          /* @__PURE__ */ jsx("div", { className: "scale-90 opacity-80 hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
          !isAuthPage && /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-2", children: user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: "/dashboard",
              className: "inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-2xl text-white bg-gold-600 hover:bg-gold-500 shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.4)] transition-all",
              children: "Dashboard"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/login",
                className: "px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400 border border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-center flex-1",
                children: "Masuk"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/register",
                className: "px-5 py-2.5 text-sm font-bold text-white bg-gold-600 hover:bg-gold-500 border border-transparent rounded-2xl shadow-[0_8px_20px_rgba(208,170,33,0.3)] hover:shadow-[0_12px_25px_rgba(208,170,33,0.4)] transition-all text-center flex-1",
                children: "Daftar"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "md:hidden p-2 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-700/50 transition-all duration-300",
              "aria-label": "Toggle mobile menu",
              "aria-expanded": isMobileMenuOpen,
              children: /* @__PURE__ */ jsxs("div", { className: "w-5 h-5 flex flex-col justify-center gap-1.5 overflow-hidden", children: [
                /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}` }),
                /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}` }),
                /* @__PURE__ */ jsx("span", { className: `block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}` })
              ] })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-900/80 backdrop-blur-2xl border-t border-white/20 dark:border-gray-700/30 px-4 pb-6 pt-4 space-y-1", children: [
            navLinks.map((item) => /* @__PURE__ */ jsxs(
              Link,
              {
                href: item.href,
                onClick: () => setIsMobileMenuOpen(false),
                className: `flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${active === item.key ? "bg-gold-500/10 text-gold-600 dark:text-gold-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"}`,
                children: [
                  active === item.key && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" }),
                  item.name
                ]
              },
              item.key
            )),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setIsMobileMenuOpen(false);
                  setIsChatOpen(true);
                },
                className: "flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200",
                children: "Contact Us"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "my-3 border-t border-gray-200/60 dark:border-gray-700/40" }),
            user ? /* @__PURE__ */ jsx(
              Link,
              {
                href: "/dashboard",
                onClick: () => setIsMobileMenuOpen(false),
                className: "flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gray-900 bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_4px_12px_rgba(208,170,33,0.3)] transition-all duration-300",
                children: "Dashboard"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/login",
                  onClick: () => setIsMobileMenuOpen(false),
                  className: "flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gold-600 dark:text-gold-400 border border-gold-400/40 hover:bg-gold-500/10 transition-all duration-200",
                  children: "Masuk"
                }
              ),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "/register",
                  onClick: () => setIsMobileMenuOpen(false),
                  className: "flex items-center justify-center w-full px-5 py-3 rounded-2xl text-sm font-bold text-gray-900 bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_4px_12px_rgba(208,170,33,0.3)] transition-all duration-300",
                  children: "Daftar"
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(AiChatPopup, { isOpen: isChatOpen, onClose: () => setIsChatOpen(false) })
    ] }),
    isMobileMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden",
        onClick: () => setIsMobileMenuOpen(false)
      }
    )
  ] });
}
export {
  Navbar as N
};
