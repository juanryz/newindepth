import { jsx, jsxs } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-BlRbfRCV.js";
import { F as Footer } from "./Footer-DTMNLY3p.js";
import "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function PublicBlogShow({ post, auth }) {
  if (!post) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Artikel Tidak Ditemukan" }),
      /* @__PURE__ */ jsx(Link, { href: "/blog", className: "text-gold-600 hover:underline", children: "Kembali ke Blog" })
    ] }) });
  }
  const { author, title, body, featured_image, published_at, updated_at, meta_title, meta_description, excerpt, meta_keywords, slug } = post;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta_title || title,
    "image": featured_image ? [`${typeof window !== "undefined" ? window.location.origin : ""}/storage/${featured_image}`] : [],
    "datePublished": published_at,
    "dateModified": updated_at,
    "author": [{
      "@type": "Person",
      "name": author?.name || "InDepth Admin"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "InDepth Mental Wellness",
      "logo": {
        "@type": "ImageObject",
        "url": typeof window !== "undefined" ? `${window.location.origin}/images/logo-color.png` : ""
      }
    },
    "description": meta_description || excerpt || (body ? body.replace(/(<([^>]+)>)/gi, "").substring(0, 160) : "")
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        meta_title || title,
        " | InDepth Mental Wellness"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: meta_description || excerpt || "" }),
      meta_keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: meta_keywords }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: meta_title || title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: meta_description || excerpt || "" }),
      featured_image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: `${typeof window !== "undefined" ? window.location.origin : ""}/storage/${featured_image}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Navbar, { auth }),
    /* @__PURE__ */ jsxs("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-8", children: title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center text-gray-500 gap-4 mb-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-gold-100 dark:bg-gold-900/30 rounded-full flex items-center justify-center font-bold text-gold-700 dark:text-gold-400 text-sm", children: author?.name?.charAt(0) || "A" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800 dark:text-gray-200", children: author?.name || "InDepth Admin" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-300 dark:text-gray-700", children: "|" }),
          /* @__PURE__ */ jsx("time", { dateTime: published_at, className: "font-medium", children: formatDate(published_at) })
        ] }),
        featured_image && /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800", children: /* @__PURE__ */ jsx("img", { src: `/storage/${featured_image}`, alt: title, className: "w-full h-auto" }) })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "prose prose-lg prose-indigo dark:prose-invert mx-auto prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-img:rounded-xl prose-a:text-gold-600 dark:prose-a:text-gold-400",
          dangerouslySetInnerHTML: {
            __html: body ? body.includes("<") && body.includes(">") ? body : body.split("\n").map((p) => `<p>${p}</p>`).join("") : ""
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  PublicBlogShow as default
};
