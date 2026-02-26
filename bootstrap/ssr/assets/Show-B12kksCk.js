import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { N as Navbar } from "./Navbar-C7jbj_uy.js";
import { F as Footer } from "./Footer-DPk9gTe0.js";
import "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
import "axios";
function PublicBlogShow({ post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.meta_title || post.title,
    "image": post.featured_image ? [`${window.location.origin}/storage/${post.featured_image}`] : [],
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "author": [{
      "@type": "Person",
      "name": post.author?.name
    }],
    "publisher": {
      "@type": "Organization",
      "name": "InDepth Mental Wellness"
    },
    "description": post.meta_description || post.excerpt
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        post.meta_title || post.title,
        " | InDepth Mental Wellness"
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: post.meta_description || post.excerpt || "" }),
      post.meta_keywords && /* @__PURE__ */ jsx("meta", { name: "keywords", content: post.meta_keywords }),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: post.meta_title || post.title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: post.meta_description || post.excerpt || "" }),
      post.featured_image && /* @__PURE__ */ jsx("meta", { property: "og:image", content: `${window.location.origin}/storage/${post.featured_image}` }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
    ] }),
    /* @__PURE__ */ jsx(Navbar, { auth: null }),
    /* @__PURE__ */ jsxs("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-8", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center text-gray-500 gap-4 mb-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 text-sm", children: post.author?.name?.charAt(0) }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800", children: post.author?.name })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-300", children: "|" }),
          /* @__PURE__ */ jsx("time", { dateTime: post.published_at, className: "font-medium", children: new Date(post.published_at).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" }) })
        ] }),
        post.featured_image && /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: `/storage/${post.featured_image}`, alt: post.title, className: "w-full h-auto" }) })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "prose prose-lg prose-indigo mx-auto prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-img:rounded-xl prose-a:text-indigo-600",
          dangerouslySetInnerHTML: { __html: post.body }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  PublicBlogShow as default
};
