import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D5ONeOE2.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import ReactQuill from "react-quill";
import axios from "axios";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
function BlogForm({ post }) {
  const isEditing = !!post;
  const { data, setData, post: formPost, processing, errors, transform } = useForm({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    primary_keyword: post?.primary_keyword || "",
    secondary_keywords: post?.secondary_keywords || "",
    meta_title: post?.meta_title || "",
    meta_description: post?.meta_description || "",
    meta_keywords: post?.meta_keywords || "",
    is_published: post?.is_published || false,
    featured_image: null
  });
  const [seoAnalysis, setSeoAnalysis] = useState(post?.seo_analysis || null);
  const [seoScore, setSeoScore] = useState(post?.seo_score || 0);
  const [intent, setIntent] = useState(post?.search_intent || "Detecting...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const debouncedData = useDebounce({
    title: data.title,
    body: data.body,
    primary_keyword: data.primary_keyword,
    meta_description: data.meta_description
  }, 1e3);
  useEffect(() => {
    const runAnalysis = async () => {
      if (!debouncedData.title && !debouncedData.body) return;
      setIsAnalyzing(true);
      try {
        const response = await axios.post(route("admin.blog.analyze"), debouncedData);
        setSeoScore(response.data.score);
        setSeoAnalysis(response.data.checks);
        setIntent(response.data.intent);
      } catch (err) {
        console.error("SEO Analysis failed", err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    runAnalysis();
  }, [debouncedData]);
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      transform((data2) => ({
        ...data2,
        _method: "put"
      }));
      formPost(route("admin.blog.update", post.id), {
        forceFormData: true
      });
    } else {
      formPost(route("admin.blog.store"));
    }
  };
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500 bg-emerald-500";
    if (score >= 50) return "text-amber-500 bg-amber-500";
    return "text-red-500 bg-red-500";
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/blog", className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300", children: "← Batal" }),
        /* @__PURE__ */ jsx("h2", { className: "font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight", children: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 md:p-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Artikel", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "title",
                    type: "text",
                    className: "block w-full text-2xl font-black bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all",
                    value: data.title,
                    onChange: (e) => setData("title", e.target.value),
                    placeholder: "Masukkan judul yang menarik...",
                    required: true
                  }
                ),
                errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.title })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "primary_keyword", value: "Primary Keyword", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "primary_keyword",
                      className: "w-full font-bold",
                      value: data.primary_keyword,
                      onChange: (e) => setData("primary_keyword", e.target.value),
                      placeholder: "Contoh: hipnoterapi trauma"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "secondary_keywords", value: "Secondary Keywords (Komma)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "secondary_keywords",
                      className: "w-full text-xs",
                      value: data.secondary_keywords,
                      onChange: (e) => setData("secondary_keywords", e.target.value),
                      placeholder: "Contoh: trauma psikologis, cara kerja hipnoterapi"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Search Intent", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                  /* @__PURE__ */ jsx("div", { className: "px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-black inline-block min-w-full md:min-w-0", children: intent })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "excerpt", value: "Excerpt (Ringkasan Singkat)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "excerpt",
                  className: "w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-sm font-medium transition-all min-h-[100px]",
                  value: data.excerpt,
                  onChange: (e) => setData("excerpt", e.target.value),
                  placeholder: "Ringkasan singkat untuk tampilan kartu blog..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "body", value: "Konten Artikel", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden pb-14", children: /* @__PURE__ */ jsx(
                ReactQuill,
                {
                  theme: "snow",
                  value: data.body,
                  onChange: (content) => setData("body", content),
                  className: "h-[500px]",
                  modules: {
                    toolbar: [
                      [{ "header": [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ "list": "ordered" }, { "list": "bullet" }],
                      ["link", "image"],
                      ["clean"]
                    ]
                  }
                }
              ) }),
              errors.body && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.body })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Media Settings", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" }),
                /* @__PURE__ */ jsxs("div", { className: "relative group p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl hover:border-indigo-500/50 transition-all text-center", children: [
                  isEditing && post.featured_image && !data.featured_image && /* @__PURE__ */ jsx("img", { src: `/storage/${post.featured_image}`, alt: "Current", className: "h-32 mx-auto rounded-2xl mb-4 shadow-lg" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "featured_image",
                      type: "file",
                      accept: "image/*",
                      className: "absolute inset-0 opacity-0 cursor-pointer",
                      onChange: (e) => setData("featured_image", e.target.files[0])
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "text-gray-400 group-hover:text-indigo-500 transition-colors", children: [
                    /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-widest", children: data.featured_image ? data.featured_image.name : "Upload Featured Image" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Metadata", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    className: "w-full text-xs font-bold",
                    value: data.meta_title,
                    onChange: (e) => setData("meta_title", e.target.value),
                    placeholder: "SEO Title (Meta Title)"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: "w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-xs font-medium min-h-[100px]",
                    value: data.meta_description,
                    onChange: (e) => setData("meta_description", e.target.value),
                    placeholder: "Meta Description..."
                  }
                ) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-10 border-t border-gray-100 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "sr-only peer",
                      checked: data.is_published,
                      onChange: (e) => setData("is_published", e.target.checked)
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-y-[-50%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-tight", children: "Publikasikan" })
              ] }),
              /* @__PURE__ */ jsx(PrimaryButton, { className: "px-10 py-4 !rounded-2xl shadow-xl shadow-indigo-500/20", disabled: processing, children: isEditing ? "Simpan Perubahan" : "Publish Sekarang" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 space-y-6 sticky top-24", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400", children: "SEO Score" }),
              isAnalyzing && /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" }),
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100" }),
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between px-2", children: [
                /* @__PURE__ */ jsx("span", { className: `text-6xl font-black ${seoScore >= 80 ? "text-emerald-500" : seoScore >= 50 ? "text-amber-500" : "text-red-500"}`, children: seoScore }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 mb-2", children: "/ 100" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: `h-full transition-all duration-1000 ${getScoreColor(seoScore).split(" ")[1]}`,
                  style: { width: `${seoScore}%` }
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "my-8 border-gray-100 dark:border-gray-700/50" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500", children: "Real-time Checkup" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: seoAnalysis ? Object.entries(seoAnalysis).map(([key, groupChecks]) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 uppercase tracking-tighter", children: key.replace("_", " ") }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: Array.isArray(groupChecks) && groupChecks.map((check, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 group", children: [
                  /* @__PURE__ */ jsx("div", { className: "shrink-0 mt-0.5", children: check.status === "success" ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4", d: "M5 13l4 4L19 7" }) }) }) : check.status === "warning" ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black", children: "!" }) }) : /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black", children: "?" }) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors", children: check.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 leading-tight mt-0.5 line-clamp-2", children: check.message })
                  ] })
                ] }, i)) })
              ] }, key)) : /* @__PURE__ */ jsxs("div", { className: "py-10 text-center space-y-4 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed", children: "Analisis Otomatis Akan Berjalan Saat Anda Menulis..." })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-10 p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-2 opacity-10", children: /* @__PURE__ */ jsx("svg", { className: "w-16 h-16", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v7h-2z" }) }) }),
              /* @__PURE__ */ jsx("h5", { className: "text-[10px] font-black uppercase tracking-widest opacity-70 mb-2", children: "Pro-Tip" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold leading-relaxed mb-4", children: "Pastikan keyword utama Anda muncul di 100 kata pertama artikel!" }),
              /* @__PURE__ */ jsx("button", { type: "button", className: "text-[9px] font-black uppercase bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all tracking-widest", children: "Lihat Strategi EEAT" })
            ] })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  BlogForm as default
};
