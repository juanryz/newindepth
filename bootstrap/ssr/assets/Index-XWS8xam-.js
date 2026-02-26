import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function LessonsIndex({ course, lessons }) {
  const { flash } = usePage().props;
  const { delete: destroy } = useForm();
  const handleDelete = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
      destroy(route("therapist.courses.lessons.destroy", [course.id, id]), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400 font-normal underline decoration-indigo-500/30 underline-offset-4", children: "Kurikulum Kelas:" }),
      " ",
      course.title
    ] }),
    /* @__PURE__ */ jsxs(Link, { href: route("therapist.courses.index"), className: "text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 transition-colors mt-2 sm:mt-0 flex items-center gap-1", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
      "Kembali ke Daftar Kelas"
    ] })
  ] }), children: [
    /* @__PURE__ */ jsx(Head, { title: `Kurikulum: ${course.title}` }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
      flash.success && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "p-4 mb-4 text-sm text-green-800 rounded-2xl bg-green-50 dark:bg-green-900/40 dark:text-green-400 border border-green-100 dark:border-green-800",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-bold", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M5 13l4 4L19 7" }) }),
              "Berhasil!"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1", children: flash.success })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-full bg-indigo-500" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-gray-900 dark:text-white", children: "Kelola Modul Pembelajaran" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Atur urutan dan isi materi kelas Anda" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("therapist.courses.lessons.create", course.id),
            className: "inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95",
            children: "+ Tambah Modul"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 w-16", children: "No" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Materi / Sesi" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Tipe & Status" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-center", children: "Preview" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800", children: [
          lessons.map((lesson, index) => /* @__PURE__ */ jsxs(
            motion.tr,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: index * 0.05 },
              className: "hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group",
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-black text-gray-500 dark:text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all", children: lesson.order_column }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase", children: lesson.title }),
                  lesson.video_url ? /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-mono mt-0.5 truncate max-w-[200px]", children: lesson.video_url }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 mt-0.5", children: "Konten Teks/Artikel" })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: lesson.video_url ? /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800", children: "Video" }) : /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800", children: "Teks" }) }) }),
                /* @__PURE__ */ jsx("td", { className: "px-6 py-5 whitespace-nowrap text-center", children: lesson.is_preview ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-md text-[9px] font-black uppercase tracking-widest animate-pulse", children: "FREE PREVIEW" }) : /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold", children: "LOCKED" }) }),
                /* @__PURE__ */ jsxs("td", { className: "px-6 py-5 whitespace-nowrap text-right text-xs font-bold space-x-4", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      href: route("therapist.courses.lessons.edit", [course.id, lesson.id]),
                      className: "text-indigo-600 dark:text-indigo-400 hover:underline decoration-2",
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleDelete(lesson.id, lesson.title),
                      className: "text-red-600 dark:text-red-400 hover:underline decoration-2",
                      children: "Hapus"
                    }
                  )
                ] })
              ]
            },
            lesson.id
          )),
          lessons.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-16 text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4 border border-dashed border-gray-300 dark:border-gray-600", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-500 italic", children: "Kurikulum masih kosong. Ayo buat materi pertama Anda!" })
          ] }) }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  LessonsIndex as default
};
