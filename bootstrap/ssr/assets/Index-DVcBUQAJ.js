import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-D5ONeOE2.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function LessonsIndex({ course, lessons }) {
  const { flash } = usePage().props;
  const { delete: destroy } = useForm();
  const handleDelete = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin menghapus materi "${title}"?`)) {
      destroy(route("admin.courses.lessons.destroy", [course.id, id]), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: [
      /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400 font-normal", children: "Materi Kelas:" }),
      " ",
      course.title
    ] }),
    /* @__PURE__ */ jsx(Link, { href: route("admin.courses.index"), className: "text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mt-2 sm:mt-0", children: "← Kembali ke Daftar Kelas" })
  ] }), children: [
    /* @__PURE__ */ jsx(Head, { title: `Materi: ${course.title}` }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
      flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/40 dark:text-green-400", children: flash.success }),
      flash.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/40 dark:text-red-400", children: flash.error }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow sm:rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-900 dark:text-gray-100 font-medium tracking-tight", children: "Urutan dan Daftar Materi" }),
        /* @__PURE__ */ jsx(Link, { href: route("admin.courses.lessons.create", course.id), className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150", children: "+ Tambah Materi" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-16", children: "Urutan" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Judul Materi" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Tipe Konten" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Preview (Gratis)" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: [
          lessons.map((lesson) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100", children: lesson.order_column }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: lesson.title }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              lesson.video_url && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded text-xs bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", children: "Video" }),
              lesson.content && /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", children: "Teks" })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: lesson.is_preview ? /* @__PURE__ */ jsx("span", { className: "text-green-600 dark:text-green-400 font-semibold", children: "Ya (Gratis dilihat)" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Tidak (Harus beli)" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3", children: [
              /* @__PURE__ */ jsx(Link, { href: route("admin.courses.lessons.edit", [course.id, lesson.id]), className: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300", children: "Edit" }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(lesson.id, lesson.title), className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300", children: "Hapus" })
            ] })
          ] }, lesson.id)),
          lessons.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "5", className: "px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400", children: "Belum ada materi untuk kelas ini." }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  LessonsIndex as default
};
