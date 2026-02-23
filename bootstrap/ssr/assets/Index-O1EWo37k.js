import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-BRxIpxvp.js";
import { F as Footer } from "./Footer-B9dwKp9S.js";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function BlogIndex({ posts, auth }) {
  useEffect(() => {
    const handleSmoothScroll = function(e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        try {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        } catch (err) {
          console.error("Invalid selector:", href);
        }
      }
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleSmoothScroll);
    });
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-gold-500 selection:text-white transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Blog - InDepth Mental Wellness" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Baca artikel, tips, dan wawasan seputar kesehatan mental, psikologi, dan kesejahteraan jiwa langsung dari tim profesional InDepth Mental Wellness." })
    ] }),
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsx(Navbar, { auth, active: "blog" }),
    /* @__PURE__ */ jsx("main", { className: "relative z-10 pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-block mb-4 px-4 py-1.5 rounded-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/50 shadow-sm text-sm font-medium text-gold-600 dark:text-gold-400", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-gold-500" }),
          "InDepth Journal & Insight"
        ] }) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6", children: [
          "Jelajahi ",
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600", children: "Wawasan Kami" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-light", children: "Temukan berbagai jawaban, tips, dan teknik seputar kesehatan mental dan peningkatan diri dari para ahli kami." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: !posts || !posts.data || posts.data.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "col-span-full py-20 text-center rounded-[3rem] border border-dashed border-gold-500/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gold-500/30 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-500 dark:text-gray-400 font-light", children: "Belum ada artikel web saat ini." })
      ] }) : posts.data.map((post) => /* @__PURE__ */ jsxs("article", { className: "group flex flex-col bg-white/40 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-800/60 overflow-hidden hover:shadow-[0_20px_50px_rgba(208,170,33,0.1)] transition-all duration-500 hover:-translate-y-2", children: [
        /* @__PURE__ */ jsxs(Link, { href: `/blog/${post.slug}`, className: "block relative aspect-[16/10] overflow-hidden", children: [
          post.featured_image ? /* @__PURE__ */ jsx("img", { src: `/storage/${post.featured_image}`, alt: post.title, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-gold-500/20 to-yellow-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16 text-gold-500/30", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsx("span", { className: "px-4 py-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-xs font-bold text-gold-600 dark:text-gold-400 shadow-sm border border-white/40 dark:border-gray-700/40", children: "Artikel" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest", children: [
            /* @__PURE__ */ jsx("span", { children: post.published_at ? new Date(post.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }),
            /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-gold-400" }),
            /* @__PURE__ */ jsx("span", { children: "5 Menit Baca" })
          ] }),
          /* @__PURE__ */ jsxs(Link, { href: `/blog/${post.slug}`, className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug", children: post.title }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 line-clamp-3 font-light leading-relaxed mb-6", children: post.excerpt || (post.body ? String(post.body).replace(/(<([^>]+)>)/gi, "").substring(0, 120) : "") + "..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center font-bold text-gold-600 text-xs", children: (post.author?.name || "A").charAt(0) }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: post.author?.name || "InDepth Admin" })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: `/blog/${post.slug}`, className: "text-gold-600 dark:text-gold-400 hover:translate-x-1 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 8l4 4m0 0l-4 4m4-4H3" }) }) })
          ] })
        ] })
      ] }, post.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  BlogIndex as default
};
