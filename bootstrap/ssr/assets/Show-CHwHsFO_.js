import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { T as ThemeToggle } from "./ThemeToggle-SHr-61ed.js";
import { AnimatePresence, motion } from "framer-motion";
function LessonShow({ course, lesson, isEnrolled, auth }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const lessons = course.lessons || [];
  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/embed/")) return url;
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      videoId = url.split("youtube.com/embed/")[1].split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : url;
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsxs("title", { children: [
      lesson.title,
      " - ",
      course.title
    ] }) }),
    /* @__PURE__ */ jsxs("nav", { className: "h-16 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl flex items-center justify-between px-6 z-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: route("courses.index"), className: "text-gray-400 hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-gray-200 dark:bg-gray-700 mx-2" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-indigo-500 leading-none mb-1", children: "Learning Player" }),
          /* @__PURE__ */ jsx("h1", { className: "text-sm font-black uppercase text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md leading-none", children: course.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSidebarOpen(!sidebarOpen),
            className: "p-2 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all sm:flex hidden",
            children: /* @__PURE__ */ jsx("svg", { className: `w-5 h-5 transition-transform ${sidebarOpen ? "" : "rotate-180"}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 19l-7-7m0 0l7-7m-7 7h18" }) })
          }
        ),
        /* @__PURE__ */ jsx(Link, { href: route("courses.show", course.slug), className: "px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all", children: "Daftar Modul" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: sidebarOpen && /* @__PURE__ */ jsxs(
        motion.aside,
        {
          initial: { width: 0, opacity: 0 },
          animate: { width: 320, opacity: 1 },
          exit: { width: 0, opacity: 0 },
          className: "bg-gray-50 dark:bg-gray-900/50 border-r border-gray-100 dark:border-gray-800 flex flex-col hidden sm:flex shrink-0",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 dark:border-gray-800", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-gray-400", children: "Kurikulum Kelas" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [
                lessons.length,
                " Materi Pembelajaran"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1", children: lessons.map((item, idx) => {
              const isActive = item.id === lesson.id;
              const isLocked = !isEnrolled && !item.is_preview;
              return /* @__PURE__ */ jsxs(
                Link,
                {
                  href: isLocked ? "#" : route("lessons.show", [course.slug, item.id]),
                  className: `
                                                w-full flex items-start gap-4 p-4 rounded-2xl transition-all group
                                                ${isActive ? "bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none ring-1 ring-gray-100 dark:ring-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800/50"}
                                                ${isLocked ? "opacity-50 cursor-not-allowed" : ""}
                                            `,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `
                                                shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs border
                                                ${isActive ? "bg-indigo-600 border-indigo-500 text-white" : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400"}
                                            `, children: idx + 1 }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: `text-xs font-black uppercase truncate ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"}`, children: item.title }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1", children: [
                          item.type === "video" ? /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }),
                          item.type === "video" ? "Video" : "Reading"
                        ] }),
                        item.is_preview && /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase", children: "Free" }),
                        isLocked && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) })
                      ] })
                    ] })
                  ]
                },
                item.id
              );
            }) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-white dark:bg-gray-950", children: [
        lesson.type === "video" ? /* @__PURE__ */ jsx("div", { className: "aspect-w-16 aspect-h-9 bg-black w-full relative", children: lesson.video_url ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: getEmbedUrl(lesson.video_url),
            className: "w-full h-full aspect-video",
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-gray-900", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-20 h-20 mb-4 animate-pulse", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-black uppercase tracking-widest text-xs", children: "Video Content Empty" })
        ] }) }) : lesson.type === "document" && lesson.attachment ? /* @__PURE__ */ jsxs("div", { className: "bg-indigo-900/10 py-20 px-6 sm:px-12 flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl shadow-xl flex items-center justify-center mb-6 border border-indigo-100 dark:border-gray-700", children: lesson.attachment.match(/\.(jpg|jpeg|png|gif)$/i) ? /* @__PURE__ */ jsx("img", { src: `/storage/${lesson.attachment}`, className: "w-full h-full object-cover rounded-2xl", alt: "Preview" }) : /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2", children: lesson.attachment_name || "Materi Dokumen" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/storage/${lesson.attachment}`,
              target: "_blank",
              download: true,
              className: "mt-4 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20",
              children: "Download / Buka File"
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "h-40 bg-gradient-to-br from-indigo-600 to-indigo-900 flex items-center px-12 relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsx("h2", { className: "text-white text-3xl font-black uppercase tracking-tight relative z-10", children: lesson.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto w-full px-6 sm:px-12 py-12", children: [
          lesson.type !== "document" && lesson.attachment && /* @__PURE__ */ jsxs("div", { className: "mb-10 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1", children: "Lampiran Materi" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px]", children: lesson.attachment_name })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `/storage/${lesson.attachment}`,
                download: true,
                className: "px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all",
                children: "Download"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-8", children: [
            lesson.is_preview && /* @__PURE__ */ jsx("span", { className: "bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20", children: "Preview Gratis" }),
            /* @__PURE__ */ jsxs("span", { className: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-gray-200 dark:border-gray-700", children: [
              "MODUL ",
              currentIndex + 1
            ] })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black text-gray-900 dark:text-white uppercase leading-tight mb-8", children: lesson.title }),
          lesson.content ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-medium selection:bg-indigo-500 selection:text-white",
              dangerouslySetInnerHTML: { __html: lesson.content }
            }
          ) : /* @__PURE__ */ jsxs("div", { className: "py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem]", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-gray-200 dark:text-gray-700 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-600 italic", children: "Tidak ada deskripsi teks untuk materi ini." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex border-t border-gray-100 dark:border-gray-800 mt-20 pt-10 gap-4 mb-20", children: [
            prevLesson && /* @__PURE__ */ jsx(
              Link,
              {
                href: route("lessons.show", [course.slug, prevLesson.id]),
                className: "flex-1 flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-indigo-500 transition-all group",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M15 19l-7-7 7-7" }) }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1", children: "Sebelumnya" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-gray-900 dark:text-white uppercase truncate max-w-[120px] sm:max-w-none", children: prevLesson.title })
                  ] })
                ] })
              }
            ),
            nextLesson && /* @__PURE__ */ jsxs(
              Link,
              {
                href: !isEnrolled && !nextLesson.is_preview ? "#" : route("lessons.show", [course.slug, nextLesson.id]),
                className: `
                                        flex-1 flex items-center justify-between p-6 rounded-[2rem] transition-all group text-right
                                        ${!isEnrolled && !nextLesson.is_preview ? "bg-gray-100 dark:bg-gray-900/50 opacity-50 cursor-not-allowed border border-gray-100 dark:border-gray-800" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20"}
                                    `,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx("p", { className: `text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${!isEnrolled && !nextLesson.is_preview ? "text-gray-400" : "text-white/60"}`, children: "Berikutnya" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase truncate max-w-[120px] sm:max-w-none", children: !isEnrolled && !nextLesson.is_preview ? "Modul Terkunci" : nextLesson.title })
                  ] }),
                  !isEnrolled && !nextLesson.is_preview ? /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 ml-4", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white ml-4 group-hover:translate-x-1 transition-transform", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M9 5l7 7-7 7" }) }) })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  LessonShow as default
};
