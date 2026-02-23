import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-BovlPpo-.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function CoursesIndex({ courses }) {
  const { flash } = usePage().props;
  const { delete: destroy } = useForm();
  const handleDelete = (id, title) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kelas "${title}" beserta semua materinya?`)) {
      destroy(route("admin.courses.destroy", id), {
        preserveScroll: true
      });
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen E-Learning (LMS)" }), children: [
    /* @__PURE__ */ jsx(Head, { title: "Manajemen E-Learning" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
      flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/40 dark:text-green-400", children: flash.success }),
      flash.error && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/40 dark:text-red-400", children: flash.error }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow sm:rounded-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-900 dark:text-gray-100 font-medium tracking-tight h-[38px] flex items-center", children: "Daftar Kelas (Course Catalog)" }),
        /* @__PURE__ */ jsx(Link, { href: route("admin.courses.create"), className: "px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:bg-indigo-500 active:bg-indigo-700 transition ease-in-out duration-150", children: "+ Buat Kelas Baru" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900 dark:text-gray-100 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Thumbnail" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Instruktur" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Judul Kelas" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Tipe" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Harga" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Jumlah Materi" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Status Publish" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: [
          courses.map((course) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: course.thumbnail ? /* @__PURE__ */ jsx("img", { src: `/storage/${course.thumbnail}`, alt: course.title, className: "h-10 w-16 object-cover rounded" }) : /* @__PURE__ */ jsx("div", { className: "h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500", children: "No Image" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: course.instructor ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-700 dark:text-gray-300", children: course.instructor.name }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: course.instructor.email })
            ] }) : /* @__PURE__ */ jsx("span", { className: "italic text-gray-400", children: "Administrator" }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100", children: /* @__PURE__ */ jsx("a", { href: route("courses.show", course.slug), target: "_blank", rel: "noreferrer", className: "hover:underline hover:text-indigo-600", children: course.title }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase ${course.course_type === "online" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`, children: course.course_type }),
              course.course_type === "online" ? /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-0.5", children: course.online_platform }) : /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gray-400 mt-0.5 truncate max-w-[100px]", children: course.location })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400", children: course.price > 0 ? `Rp ${parseInt(course.price).toLocaleString("id-ID")}` : /* @__PURE__ */ jsx("span", { className: "text-green-600 font-semibold bg-green-100 px-2 py-0.5 rounded-full text-xs", children: "GRATIS" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center", children: [
              course.lessons_count,
              /* @__PURE__ */ jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsx(Link, { href: route("admin.courses.lessons.index", course.id), className: "text-xs text-blue-600 hover:underline", children: "Kelola Materi" }) })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm", children: course.is_published ? /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", children: "Published" }) : /* @__PURE__ */ jsx("span", { className: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300", children: "Draft" }) }),
            /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3", children: [
              /* @__PURE__ */ jsx(Link, { href: route("admin.courses.edit", course.id), className: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300", children: "Edit" }),
              /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(course.id, course.title), className: "text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300", children: "Hapus" })
            ] })
          ] }, course.id)),
          courses.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "8", className: "px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400", children: "Belum ada kelas E-Learning. Silakan buat baru." }) })
        ] })
      ] }) }) })
    ] }) })
  ] });
}
export {
  CoursesIndex as default
};
