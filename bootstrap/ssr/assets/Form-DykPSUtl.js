import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DSi5ya3j.js";
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
  const [dv, setDv] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDv(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return dv;
}
const PROGRESS_STEPS = [
  { icon: "🔍", label: "Menganalisis keyword & kompetisi...", duration: 4e3 },
  { icon: "📋", label: "Membuat outline & struktur H2/H3...", duration: 8e3 },
  { icon: "📝", label: "Generate meta title & description...", duration: 3e3 },
  { icon: "✍️", label: "Menulis konten lengkap (2000+ kata)...", duration: 4e4 },
  { icon: "🔗", label: "Menambahkan 5 internal & 2 external link...", duration: 8e3 },
  { icon: "🖼️", label: "Menyisipkan 3 gambar ke dalam konten...", duration: 5e3 },
  { icon: "📊", label: "Mengoptimasi keyword density & SEO 90+...", duration: 8e3 },
  { icon: "🛡️", label: "Memfilter kata terlarang...", duration: 3e3 },
  { icon: "❓", label: "Membuat FAQ section...", duration: 5e3 },
  { icon: "✅", label: "Finalisasi & review artikel...", duration: 3e3 }
];
function BlogForm({ post, seoRules, forbiddenWords = [] }) {
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
    featured_image: null,
    scheduled_at: post?.scheduled_at ? post.scheduled_at.slice(0, 16) : ""
  });
  const [seoAnalysis, setSeoAnalysis] = useState(post?.seo_analysis || null);
  const [seoScore, setSeoScore] = useState(post?.seo_score || 0);
  const [intent, setIntent] = useState(post?.search_intent || "Mendeteksi...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [genKeyword, setGenKeyword] = useState("");
  const [genSecondary, setGenSecondary] = useState("");
  const [genTone, setGenTone] = useState("profesional dan informatif");
  const [genAudience, setGenAudience] = useState("masyarakat umum Indonesia");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showIdeas, setShowIdeas] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [ideasKeyword, setIdeasKeyword] = useState("hipnoterapi");
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [foundForbidden, setFoundForbidden] = useState([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [imageStyle, setImageStyle] = useState("profesional");
  const [editingForbidden, setEditingForbidden] = useState(false);
  const [localForbiddenWords, setLocalForbiddenWords] = useState(forbiddenWords || []);
  const [newForbiddenWord, setNewForbiddenWord] = useState("");
  const [savingForbidden, setSavingForbidden] = useState(false);
  const [forbiddenSaved, setForbiddenSaved] = useState(false);
  const stepTimers = useRef([]);
  const debouncedData = useDebounce({ title: data.title, body: data.body, primary_keyword: data.primary_keyword, meta_description: data.meta_description }, 1500);
  useEffect(() => {
    const run = async () => {
      if (!debouncedData.title && !debouncedData.body) return;
      setIsAnalyzing(true);
      try {
        const r = await axios.post(route("admin.blog.analyze"), debouncedData);
        setSeoScore(r.data.score);
        setSeoAnalysis(r.data.checks);
        setIntent(r.data.intent);
      } catch (e) {
        console.error("Analisis SEO gagal", e);
      } finally {
        setIsAnalyzing(false);
      }
    };
    run();
  }, [debouncedData]);
  useEffect(() => {
    if (!localForbiddenWords.length) return;
    const allText = (data.title + " " + data.body + " " + data.meta_description).toLowerCase();
    setFoundForbidden(localForbiddenWords.filter((w) => allText.includes(w.toLowerCase())));
  }, [data.title, data.body, data.meta_description, localForbiddenWords]);
  const startProgressSteps = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    stepTimers.current.forEach((t) => clearTimeout(t));
    stepTimers.current = [];
    let elapsed = 0;
    PROGRESS_STEPS.forEach((step, i) => {
      if (i > 0) {
        const t = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, i - 1]);
          setCurrentStep(i);
        }, elapsed);
        stepTimers.current.push(t);
      }
      elapsed += step.duration;
    });
  };
  const stopProgressSteps = (success = true) => {
    stepTimers.current.forEach((t) => clearTimeout(t));
    if (success) {
      setCompletedSteps(PROGRESS_STEPS.map((_, i) => i));
      setCurrentStep(-1);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      transform((d) => ({ ...d, _method: "put" }));
      formPost(route("admin.blog.update", post.id), { forceFormData: true });
    } else formPost(route("admin.blog.store"));
  };
  const getScoreColor = (s) => s >= 80 ? "text-emerald-500 bg-emerald-500" : s >= 50 ? "text-amber-500 bg-amber-500" : "text-red-500 bg-red-500";
  const handleGenerate = async (type = "full") => {
    const kw = type === "ideas" ? ideasKeyword : genKeyword;
    if (!kw.trim()) {
      setGenError("Masukkan keyword utama terlebih dahulu.");
      return;
    }
    setGenError("");
    if (type === "ideas") {
      setIsLoadingIdeas(true);
      console.log("[AI Ideas] Searching for ideas with keyword:", kw);
      try {
        const r = await axios.post(route("admin.blog.generate"), { primary_keyword: kw, secondary_keywords: "", tone: genTone, audience: genAudience, type: "ideas" });
        console.log("[AI Ideas] Response:", r.data);
        if (r.data.error) {
          setGenError(r.data.error);
          setIsLoadingIdeas(false);
          return;
        }
        if (r.data.ideas) {
          setIdeas(r.data.ideas);
          setShowIdeas(true);
        }
      } catch (err) {
        console.error("[AI Ideas] Error:", err);
        setGenError("Gagal mencari ide. " + (err.response?.data?.message || err.message));
      } finally {
        setIsLoadingIdeas(false);
      }
      return;
    }
    setIsGenerating(true);
    if (type === "full") startProgressSteps();
    try {
      const r = await axios.post(route("admin.blog.generate"), { primary_keyword: kw, secondary_keywords: genSecondary, tone: genTone, audience: genAudience, type });
      if (r.data.error) {
        setGenError(r.data.error);
        stopProgressSteps(false);
        return;
      }
      if (type === "full") {
        if (r.data.h1 || r.data.seo_title) setData("title", r.data.h1 || r.data.seo_title);
        if (r.data.meta_description) setData("meta_description", r.data.meta_description);
        if (r.data.seo_title) setData("meta_title", r.data.seo_title);
        if (r.data.body) setData("body", r.data.body);
        if (r.data.primary_keyword) setData("primary_keyword", r.data.primary_keyword);
        stopProgressSteps(true);
      } else if (type === "meta") {
        if (r.data.seo_title) setData("meta_title", r.data.seo_title);
        if (r.data.meta_description) setData("meta_description", r.data.meta_description);
      }
    } catch (err) {
      setGenError("Gagal generate. " + (err.response?.data?.message || err.message));
      stopProgressSteps(false);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleGenerateImage = async () => {
    const kw = genKeyword || data.primary_keyword || "hipnoterapi";
    if (!kw.trim()) {
      setGenError("Masukkan keyword untuk generate gambar.");
      return;
    }
    setIsGeneratingImage(true);
    setGenError("");
    try {
      const r = await axios.post(route("admin.blog.generate-image"), { keyword: kw, style: imageStyle });
      if (r.data.error) {
        setGenError(r.data.error);
        return;
      }
      if (r.data.url) setGeneratedImageUrl(r.data.url);
      if (r.data.path) setData("featured_image_path", r.data.path);
    } catch (err) {
      setGenError("Gagal generate gambar. " + (err.response?.data?.message || err.message));
    } finally {
      setIsGeneratingImage(false);
    }
  };
  const useIdea = (idea) => {
    setGenKeyword(idea.keyword);
    if (idea.title) setGenSecondary(idea.keyword);
    setShowIdeas(false);
    setShowGenerator(true);
    setTimeout(() => {
      const el = document.querySelector('[placeholder="Contoh: hipnoterapi"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
    }, 100);
  };
  const getRule = (key, fb) => seoRules?.[key]?.value ?? fb;
  const getWordCount = () => data.body ? data.body.replace(/<[^>]+>/g, "").split(/\s+/).filter((w) => w.length > 0).length : 0;
  const addForbiddenWord = () => {
    const word = newForbiddenWord.trim().toLowerCase();
    if (!word) return;
    if (localForbiddenWords.some((w) => w.toLowerCase() === word)) {
      setNewForbiddenWord("");
      return;
    }
    setLocalForbiddenWords((prev) => [...prev, word]);
    setNewForbiddenWord("");
  };
  const removeForbiddenWord = (wordToRemove) => {
    setLocalForbiddenWords((prev) => prev.filter((w) => w !== wordToRemove));
  };
  const saveForbiddenWords = async () => {
    setSavingForbidden(true);
    setForbiddenSaved(false);
    try {
      const r = await axios.post(route("admin.blog.update-forbidden-words"), { words: localForbiddenWords });
      if (r.data.success) {
        setForbiddenSaved(true);
        setTimeout(() => setForbiddenSaved(false), 3e3);
      }
    } catch (err) {
      console.error("Gagal menyimpan kata terlarang", err);
    } finally {
      setSavingForbidden(false);
    }
  };
  const handleForbiddenKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addForbiddenWord();
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Link, { href: "/admin/blog", className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300", children: "← Kembali" }),
          /* @__PURE__ */ jsx("h2", { className: "font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight", children: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Link, { href: "/admin/seo-settings", className: "px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all", children: "⚙️ Pengaturan SEO" }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setShowGenerator(!showGenerator), className: `px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border ${showGenerator ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50" : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/20"}`, children: [
            "🤖 ",
            showGenerator ? "Tutup AI" : "AI Generator"
          ] })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
          foundForbidden.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🚫" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-red-700 dark:text-red-300", children: "Kata Terlarang Terdeteksi!" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 dark:text-red-400 mt-1", children: "Kata berikut harus dihindari:" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: foundForbidden.map((w, i) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-[10px] font-black uppercase rounded-lg", children: w }, i)) })
            ] })
          ] }) }),
          showGenerator && /* @__PURE__ */ jsx("div", { className: "mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-[2.5rem] border border-indigo-200/50 dark:border-indigo-800/30 shadow-2xl overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-lg shadow-lg shadow-purple-500/30", children: "🤖" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "AI Content Generator" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Generate artikel SEO-friendly otomatis berdasarkan keyword" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white/60 dark:bg-gray-800/60 rounded-2xl p-5 mb-6 border border-gray-200/50 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2", children: "💡 Cari Ide Artikel" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mb-3", children: "Belum punya ide? Masukkan topik dan AI akan menyarankan artikel yang relevan." }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(TextInput, { className: "flex-1 text-sm", value: ideasKeyword, onChange: (e) => setIdeasKeyword(e.target.value), placeholder: "Masukkan topik, misal: hipnoterapi, kecemasan..." }),
                /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleGenerate("ideas"), disabled: isLoadingIdeas, className: "px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-amber-500/20 min-w-[120px]", children: isLoadingIdeas ? "⏳ Mencari..." : "💡 Cari Ide" })
              ] }),
              genError && !isLoadingIdeas && /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 text-sm text-red-800 dark:text-red-300 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50", children: [
                "❌ ",
                genError
              ] }),
              isLoadingIdeas && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl p-4 border border-amber-200/50 dark:border-amber-800/30", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce" }),
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce", style: { animationDelay: "0.15s" } }),
                    /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-amber-500 rounded-full animate-bounce", style: { animationDelay: "0.3s" } })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-amber-700 dark:text-amber-300", children: "Sedang mencari ide artikel..." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400", children: [
                    /* @__PURE__ */ jsx("span", { children: "🔍" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      'Menganalisis topik "',
                      ideasKeyword,
                      '"...'
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-amber-600/60 dark:text-amber-400/60", children: [
                    /* @__PURE__ */ jsx("span", { children: "📊" }),
                    /* @__PURE__ */ jsx("span", { children: "Mengevaluasi potensi traffic..." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-amber-600/40 dark:text-amber-400/40", children: [
                    /* @__PURE__ */ jsx("span", { children: "💡" }),
                    /* @__PURE__ */ jsx("span", { children: "Menyusun rekomendasi artikel..." })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 h-1.5 bg-amber-200/50 dark:bg-amber-800/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-amber-500 rounded-full animate-pulse", style: { width: "70%", transition: "width 3s" } }) })
              ] }),
              showIdeas && ideas.length > 0 && !isLoadingIdeas && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3", children: [
                  "✅ ",
                  ideas.length,
                  " Ide Artikel Ditemukan — Klik salah satu untuk digunakan"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: ideas.map((idea, i) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => useIdea(idea),
                    className: "text-left bg-white dark:bg-gray-900 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]",
                    children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2", children: idea.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-1 line-clamp-2", children: idea.description }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-md", children: idea.keyword }),
                        /* @__PURE__ */ jsxs("span", { className: `px-2 py-0.5 text-[9px] font-bold uppercase rounded-md ${idea.volume === "tinggi" ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600" : idea.volume === "sedang" ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600" : "bg-gray-50 dark:bg-gray-800 text-gray-500"}`, children: [
                          "📊 ",
                          idea.volume
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 text-[9px] font-bold uppercase rounded-md", children: idea.intent })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-indigo-500 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform", children: "👉 Gunakan ide ini" })
                    ]
                  },
                  i
                )) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Keyword Utama *", className: "text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" }),
                /* @__PURE__ */ jsx(TextInput, { className: "w-full font-bold text-lg", value: genKeyword, onChange: (e) => setGenKeyword(e.target.value), placeholder: "Contoh: hipnoterapi" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Secondary / LSI Keywords", className: "text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" }),
                /* @__PURE__ */ jsx(TextInput, { className: "w-full text-sm", value: genSecondary, onChange: (e) => setGenSecondary(e.target.value), placeholder: "terapi hipnosis, terapi bawah sadar" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Gaya Bahasa", className: "text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" }),
                /* @__PURE__ */ jsxs("select", { className: "w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300", value: genTone, onChange: (e) => setGenTone(e.target.value), children: [
                  /* @__PURE__ */ jsx("option", { value: "profesional dan informatif", children: "Profesional & Informatif" }),
                  /* @__PURE__ */ jsx("option", { value: "hangat dan empatik", children: "Hangat & Empatik" }),
                  /* @__PURE__ */ jsx("option", { value: "akademis dan ilmiah", children: "Akademis & Ilmiah" }),
                  /* @__PURE__ */ jsx("option", { value: "santai dan conversational", children: "Santai & Conversational" }),
                  /* @__PURE__ */ jsx("option", { value: "persuasif dan motivasi", children: "Persuasif & Motivasi" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Target Pembaca", className: "text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2" }),
                /* @__PURE__ */ jsxs("select", { className: "w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300", value: genAudience, onChange: (e) => setGenAudience(e.target.value), children: [
                  /* @__PURE__ */ jsx("option", { value: "masyarakat umum Indonesia", children: "Masyarakat Umum" }),
                  /* @__PURE__ */ jsx("option", { value: "profesional kesehatan", children: "Profesional Kesehatan" }),
                  /* @__PURE__ */ jsx("option", { value: "mahasiswa psikologi", children: "Mahasiswa Psikologi" }),
                  /* @__PURE__ */ jsx("option", { value: "orang tua", children: "Orang Tua" }),
                  /* @__PURE__ */ jsx("option", { value: "remaja dan dewasa muda", children: "Remaja & Dewasa Muda" })
                ] })
              ] })
            ] }),
            seoRules && /* @__PURE__ */ jsxs("div", { className: "bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-200/50 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3", children: "📋 Aturan SEO Aktif" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-3 text-center", children: [{ v: getRule("article_ideal_words", 2e3), l: "kata min" }, { v: `${getRule("h2_min_count", 5)}-${getRule("h2_max_count", 8)}`, l: "heading H2" }, { v: `${getRule("keyword_density_min", 1)}-${getRule("keyword_density_max", 1.5)}%`, l: "density" }, { v: `${getRule("faq_min_questions", 4)}-${getRule("faq_ideal_questions", 5)}`, l: "FAQ" }, { v: `${getRule("internal_link_min", 3)}-${getRule("internal_link_ideal", 5)}`, l: "int. link" }, { v: `${getRule("image_min_count", 2)}-${getRule("image_ideal_count", 3)}`, l: "gambar" }].map(
                (x, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-2 border border-gray-100 dark:border-gray-700", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-indigo-600", children: x.v }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 uppercase", children: x.l })
                ] }, i)
              ) })
            ] }),
            genError && /* @__PURE__ */ jsxs("div", { className: "p-4 mb-4 text-sm text-red-800 dark:text-red-300 rounded-2xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50", children: [
              "❌ ",
              genError
            ] }),
            isGenerating && currentStep >= 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl p-5 border border-indigo-200/50 dark:border-indigo-700/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4", children: "⏳ Progres Generate Artikel" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: PROGRESS_STEPS.map((step, i) => {
                const done = completedSteps.includes(i);
                const active = currentStep === i;
                return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 transition-all duration-500 ${done ? "opacity-60" : active ? "opacity-100" : "opacity-30"}`, children: [
                  /* @__PURE__ */ jsx("div", { className: `w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 transition-all ${done ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600" : active ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 animate-pulse ring-2 ring-indigo-300" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`, children: done ? "✓" : step.icon }),
                  /* @__PURE__ */ jsx("span", { className: `text-sm font-bold ${done ? "text-emerald-600 dark:text-emerald-400 line-through" : active ? "text-indigo-700 dark:text-indigo-300" : "text-gray-400"}`, children: step.label }),
                  active && /* @__PURE__ */ jsxs("div", { className: "flex gap-1 ml-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-indigo-500 rounded-full animate-bounce" }),
                    /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-indigo-500 rounded-full animate-bounce", style: { animationDelay: "0.15s" } }),
                    /* @__PURE__ */ jsx("span", { className: "w-1 h-1 bg-indigo-500 rounded-full animate-bounce", style: { animationDelay: "0.3s" } })
                  ] })
                ] }, i);
              }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000", style: { width: `${Math.round(completedSteps.length / PROGRESS_STEPS.length * 100)}%` } }) })
            ] }),
            !isGenerating && completedSteps.length === PROGRESS_STEPS.length && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 font-bold", children: "✅ Artikel berhasil digenerate! Silakan review konten sebelum publish." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => handleGenerate("full"), disabled: isGenerating, className: "px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl transition-all disabled:opacity-50 transform hover:scale-[1.02] active:scale-95", children: isGenerating ? "⏳ Sedang Generate..." : "🚀 Generate Artikel Lengkap" }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleGenerate("meta"), disabled: isGenerating, className: "px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 transition-all disabled:opacity-50", children: "🏷️ Generate Meta Saja" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-8 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-2xl sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-700/50 p-8 md:p-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Artikel (H1)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400" }),
                    /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${data.title.length >= getRule("h1_min_length", 60) && data.title.length <= getRule("h1_max_length", 80) ? "text-emerald-500" : data.title.length > getRule("h1_max_length", 80) ? "text-red-500" : "text-gray-400"}`, children: [
                      data.title.length,
                      " / ",
                      getRule("h1_min_length", 60),
                      "-",
                      getRule("h1_max_length", 80),
                      " karakter"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("input", { id: "title", type: "text", className: "block w-full text-2xl font-black bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-white", value: data.title, onChange: (e) => setData("title", e.target.value), placeholder: "Masukkan judul yang menarik...", required: true }),
                  errors.title && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "primary_keyword", value: "Keyword Utama", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                    /* @__PURE__ */ jsx(TextInput, { id: "primary_keyword", className: "w-full font-bold", value: data.primary_keyword, onChange: (e) => setData("primary_keyword", e.target.value), placeholder: "Contoh: hipnoterapi trauma" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { htmlFor: "secondary_keywords", value: "Keyword Sekunder (Komma)", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                    /* @__PURE__ */ jsx(TextInput, { id: "secondary_keywords", className: "w-full text-xs", value: data.secondary_keywords, onChange: (e) => setData("secondary_keywords", e.target.value), placeholder: "trauma psikologis, cara kerja hipnoterapi" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(InputLabel, { value: "Intensi Pencarian", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                    /* @__PURE__ */ jsx("div", { className: "px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-black", children: intent })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "excerpt", value: "Ringkasan Singkat", className: "text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2" }),
                /* @__PURE__ */ jsx("textarea", { id: "excerpt", className: "w-full bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-sm font-medium min-h-[100px]", value: data.excerpt, onChange: (e) => setData("excerpt", e.target.value), placeholder: "Ringkasan singkat untuk tampilan kartu blog..." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsx(InputLabel, { htmlFor: "body", value: "Konten Artikel", className: "text-[10px] font-black uppercase tracking-widest text-gray-400" }),
                  /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${getWordCount() >= getRule("article_min_words", 1800) ? "text-emerald-500" : "text-gray-400"}`, children: [
                    getWordCount(),
                    " / ",
                    getRule("article_min_words", 1800),
                    "+ kata"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden pb-14 focus-within:ring-2 focus-within:ring-indigo-500/20", children: [
                  /* @__PURE__ */ jsx("style", { children: `.dark .ql-editor{color:#e2e8f0;font-size:1rem;line-height:1.7}.dark .ql-editor.ql-blank::before{color:#64748b}.dark .ql-toolbar{border-bottom:1px solid #334155!important;background:#0f172a}.dark .ql-container{border:none!important}.dark .ql-snow .ql-stroke{stroke:#94a3b8}.dark .ql-snow .ql-fill{fill:#94a3b8}.dark .ql-snow .ql-picker{color:#94a3b8}.dark .ql-snow .ql-picker-options{background-color:#1e293b;border:1px solid #334155}.ql-editor{min-height:450px;font-family:inherit}.ql-toolbar.ql-snow{border:none!important;padding:12px}.ql-editor img{max-width:100%;height:auto;border-radius:12px;margin:16px 0}.ql-editor figure{margin:24px 0;text-align:center}.ql-editor figcaption{font-size:0.85em;color:#6b7280;margin-top:8px;font-style:italic}` }),
                  /* @__PURE__ */ jsx(ReactQuill, { theme: "snow", value: data.body, onChange: (c) => setData("body", c), className: "h-[500px]", modules: { toolbar: [[{ "header": [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ "list": "ordered" }, { "list": "bullet" }], ["link", "image"], ["clean"]] } })
                ] }),
                errors.body && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 mt-2 font-bold", children: errors.body })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Gambar Utama", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" }),
                  /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/30", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3", children: "🎨 Generate Gambar AI" }),
                    /* @__PURE__ */ jsxs("select", { className: "w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium mb-3 dark:text-gray-300", value: imageStyle, onChange: (e) => setImageStyle(e.target.value), children: [
                      /* @__PURE__ */ jsx("option", { value: "profesional", children: "Profesional & Clean" }),
                      /* @__PURE__ */ jsx("option", { value: "hangat", children: "Hangat & Calming" }),
                      /* @__PURE__ */ jsx("option", { value: "minimalis", children: "Minimalis & Elegan" }),
                      /* @__PURE__ */ jsx("option", { value: "ilustrasi", children: "Ilustrasi Digital" }),
                      /* @__PURE__ */ jsx("option", { value: "fotografi", children: "Fotografi" })
                    ] }),
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: handleGenerateImage, disabled: isGeneratingImage, className: "w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl transition-all disabled:opacity-50", children: isGeneratingImage ? "⏳ Generating gambar..." : "🎨 Generate Gambar Utama" }),
                    generatedImageUrl && /* @__PURE__ */ jsx("img", { src: generatedImageUrl, alt: "Generated", className: "mt-3 rounded-xl shadow-lg w-full" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative group p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl hover:border-indigo-500/50 transition-all text-center", children: [
                    isEditing && post.featured_image && !data.featured_image && /* @__PURE__ */ jsx("img", { src: `/storage/${post.featured_image}`, alt: "Gambar saat ini", className: "h-32 mx-auto rounded-2xl mb-4 shadow-lg" }),
                    /* @__PURE__ */ jsx("input", { id: "featured_image", type: "file", accept: "image/*", className: "absolute inset-0 opacity-0 cursor-pointer", onChange: (e) => setData("featured_image", e.target.files[0]) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-gray-400 group-hover:text-indigo-500 transition-colors", children: [
                      /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 mx-auto mb-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-widest", children: data.featured_image ? data.featured_image.name : "Atau Unggah Manual" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx(InputLabel, { value: "Metadata SEO", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400", children: "Judul SEO" }),
                      /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${data.meta_title.length >= getRule("seo_title_min_length", 55) && data.meta_title.length <= getRule("seo_title_max_length", 65) ? "text-emerald-500" : "text-gray-400"}`, children: [
                        data.meta_title.length,
                        "/",
                        getRule("seo_title_min_length", 55),
                        "-",
                        getRule("seo_title_max_length", 65)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(TextInput, { className: "w-full text-xs font-bold", value: data.meta_title, onChange: (e) => setData("meta_title", e.target.value), placeholder: "Judul untuk mesin pencari..." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400", children: "Deskripsi Meta" }),
                      /* @__PURE__ */ jsxs("span", { className: `text-[10px] font-bold ${data.meta_description.length >= getRule("meta_desc_min_length", 140) && data.meta_description.length <= getRule("meta_desc_max_length", 160) ? "text-emerald-500" : "text-gray-400"}`, children: [
                        data.meta_description.length,
                        "/",
                        getRule("meta_desc_min_length", 140),
                        "-",
                        getRule("meta_desc_max_length", 160)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("textarea", { className: "w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 text-xs font-medium min-h-[100px]", value: data.meta_description, onChange: (e) => setData("meta_description", e.target.value), placeholder: "Deskripsi halaman untuk mesin pencari..." })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-gray-100 dark:border-gray-700/50", children: [
                /* @__PURE__ */ jsx(InputLabel, { value: "Pengaturan Publikasi", className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx("input", { type: "checkbox", className: "sr-only peer", checked: data.is_published, onChange: (e) => {
                        setData("is_published", e.target.checked);
                        if (e.target.checked) setData("scheduled_at", "");
                      } }),
                      /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors uppercase tracking-tight", children: "Publikasikan Sekarang" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-lg", children: "📅" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest", children: "Jadwalkan Publikasi" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "datetime-local",
                        className: `w-full bg-gray-50 dark:bg-gray-900 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 dark:text-gray-300 ${data.scheduled_at ? "border-indigo-300 dark:border-indigo-700" : "border-gray-200 dark:border-gray-700"}`,
                        value: data.scheduled_at,
                        onChange: (e) => {
                          setData("scheduled_at", e.target.value);
                          if (e.target.value) setData("is_published", false);
                        },
                        disabled: data.is_published,
                        min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16)
                      }
                    ),
                    data.scheduled_at && !data.is_published && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-indigo-500 font-bold mt-2", children: [
                      "📅 Akan dipublikasikan pada ",
                      new Date(data.scheduled_at).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
                      " pukul ",
                      new Date(data.scheduled_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                      " WIB"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end pt-6 border-t border-gray-100 dark:border-gray-700/50", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "px-10 py-4 !rounded-2xl shadow-xl shadow-indigo-500/20", disabled: processing, children: data.is_published ? isEditing ? "Simpan & Publikasikan" : "Publikasikan Sekarang" : data.scheduled_at ? "Jadwalkan Publikasi" : isEditing ? "Simpan Perubahan" : "Simpan Draf" }) })
            ] }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4 space-y-6 sticky top-24", children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg", children: "🚫" }),
                    /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-widest text-gray-400", children: "Kata Terlarang" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-bold text-gray-300 dark:text-gray-600", children: [
                      "(",
                      localForbiddenWords.length,
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setEditingForbidden(!editingForbidden),
                      className: `text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg transition-all ${editingForbidden ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" : "text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"}`,
                      children: editingForbidden ? "✕ Tutup" : "✏️ Edit"
                    }
                  )
                ] }),
                editingForbidden && /* @__PURE__ */ jsxs("div", { className: "mb-3 space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: "flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium px-3 py-2 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 dark:text-gray-300",
                        value: newForbiddenWord,
                        onChange: (e) => setNewForbiddenWord(e.target.value),
                        onKeyDown: handleForbiddenKeyDown,
                        placeholder: "Ketik kata lalu tekan Enter..."
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: addForbiddenWord,
                        className: "px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase rounded-xl transition-all shadow-sm",
                        children: "+ Tambah"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9px] text-gray-400 dark:text-gray-500", children: "Tekan Enter atau klik Tambah. Klik ✕ pada kata untuk menghapus." }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: saveForbiddenWords,
                      disabled: savingForbidden,
                      className: "w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-indigo-500/20",
                      children: savingForbidden ? "⏳ Menyimpan..." : forbiddenSaved ? "✅ Tersimpan!" : "💾 Simpan Perubahan"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: localForbiddenWords.map((w, i) => /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${foundForbidden.includes(w) ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 ring-1 ring-red-300 dark:ring-red-700" : "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400"}`, children: [
                  w,
                  editingForbidden && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeForbiddenWord(w),
                      className: "ml-0.5 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-200 dark:hover:bg-red-800 text-red-500 transition-all text-[10px] font-black",
                      children: "✕"
                    }
                  )
                ] }, i)) }),
                localForbiddenWords.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 mt-2 italic", children: "Belum ada kata terlarang. Klik Edit untuk menambahkan." }),
                foundForbidden.length > 0 && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-red-500 font-bold mt-2", children: [
                  "⚠️ ",
                  foundForbidden.length,
                  " kata terlarang terdeteksi di konten!"
                ] }),
                foundForbidden.length === 0 && localForbiddenWords.length > 0 && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-500 font-bold mt-2", children: "✅ Konten bersih dari kata terlarang" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 p-6 md:p-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400", children: "Skor SEO" }),
                  isAnalyzing && /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" }),
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce", style: { animationDelay: "100ms" } }),
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce", style: { animationDelay: "200ms" } })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between px-2", children: [
                    /* @__PURE__ */ jsx("span", { className: `text-6xl font-black ${seoScore >= 80 ? "text-emerald-500" : seoScore >= 50 ? "text-amber-500" : "text-red-500"}`, children: seoScore }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-gray-400 mb-2", children: "/ 100" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: `h-full transition-all duration-1000 ${getScoreColor(seoScore).split(" ")[1]}`, style: { width: `${seoScore}%` } }) })
                ] }),
                /* @__PURE__ */ jsx("hr", { className: "my-8 border-gray-100 dark:border-gray-700/50" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500", children: "Pemeriksaan Realtime" }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-4", children: seoAnalysis ? Object.entries(seoAnalysis).map(([key, checks]) => /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold text-gray-400 uppercase tracking-tighter", children: { title: "Judul", meta: "Meta", content: "Konten", structure: "Struktur", links: "Tautan", media: "Media" }[key] || key }),
                    /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: Array.isArray(checks) && checks.map((c, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 group", children: [
                      /* @__PURE__ */ jsx("div", { className: "shrink-0 mt-0.5", children: c.status === "success" ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-2.5 h-2.5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "4", d: "M5 13l4 4L19 7" }) }) }) : c.status === "warning" ? /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black", children: "!" }) }) : /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black", children: "i" }) }) }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors", children: c.name }),
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 leading-tight mt-0.5 line-clamp-2", children: c.message })
                      ] })
                    ] }, i)) })
                  ] }, key)) : /* @__PURE__ */ jsxs("div", { className: "py-10 text-center space-y-4 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-3xl", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center mx-auto text-gray-300", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 leading-relaxed", children: "Analisis otomatis berjalan saat Anda menulis..." })
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-10 p-5 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden", children: [
                  /* @__PURE__ */ jsx("h5", { className: "text-[10px] font-black uppercase tracking-widest opacity-70 mb-2", children: "Tips SEO" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold leading-relaxed mb-4", children: [
                    "Pastikan keyword utama muncul di ",
                    getRule("intro_keyword_within_words", 50),
                    " kata pertama artikel!"
                  ] }),
                  /* @__PURE__ */ jsx(Link, { href: "/admin/seo-settings", className: "text-[9px] font-black uppercase bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-all tracking-widest", children: "Lihat Pengaturan SEO →" })
                ] })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  BlogForm as default
};
