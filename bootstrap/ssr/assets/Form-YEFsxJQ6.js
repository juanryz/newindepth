import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DxSrewPt.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function LessonsForm({ course, lesson }) {
  const isEditing = !!lesson.id;
  const { data, setData, post, processing, errors } = useForm({
    title: lesson.title || "",
    video_url: lesson.video_url || "",
    content: lesson.content || "",
    attachment: null,
    is_preview: lesson.is_preview || false,
    order_column: lesson.order_column || 0
  });
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      post(route("admin.courses.lessons.update", [course.id, lesson.id]), {
        forceFormData: true,
        onSuccess: () => {
        },
        data: {
          ...data,
          _method: "PUT"
        }
      });
    } else {
      post(route("admin.courses.lessons.store", course.id));
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: isEditing ? "Edit Materi" : "Tambah Materi Baru" }),
    /* @__PURE__ */ jsx(Link, { href: route("admin.courses.lessons.index", course.id), className: "text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 mt-2 sm:mt-0", children: "← Kembali ke Daftar Materi" })
  ] }), children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Materi" : "Tambah Materi" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-100 dark:border-blue-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-blue-800 dark:text-blue-300", children: "Target Kelas:" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-blue-900 dark:text-blue-100 font-bold mt-1", children: course.title })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Materi / Sesi" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                type: "text",
                className: "mt-1 block w-full",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                required: true,
                isFocused: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "order_column", value: "Nomor Urut" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "order_column",
                type: "number",
                min: "0",
                className: "mt-1 block w-full bg-gray-50 focus:bg-white text-center",
                value: data.order_column,
                onChange: (e) => setData("order_column", e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.order_column, className: "mt-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "video_url", value: "URL Video (Opsional - YouTube Link)" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "video_url",
              type: "url",
              className: "mt-1 block w-full font-mono text-sm",
              value: data.video_url,
              placeholder: "https://www.youtube.com/watch?v=...",
              onChange: (e) => setData("video_url", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Kosongkan jika materi berupa file atau teks." }),
          /* @__PURE__ */ jsx(InputError, { message: errors.video_url, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "attachment", value: "Unggah File (PDF, Word, Gambar, dll)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "attachment",
              type: "file",
              className: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100",
              onChange: (e) => setData("attachment", e.target.files[0])
            }
          ),
          lesson.attachment && /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600 mt-1", children: [
            "File saat ini: ",
            lesson.attachment_name
          ] }),
          /* @__PURE__ */ jsx(InputError, { message: errors.attachment, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "content", value: "Konten Teks bacaan / Penjelasan (Opsional)" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "content",
              className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[300px] font-sans text-sm p-3",
              value: data.content || "",
              placeholder: "Tuliskan materi tertulis, penjelasan tambahan, atau link eksternal di sini...",
              onChange: (e) => setData("content", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Akses Materi" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center mt-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 cursor-pointer h-5 w-5",
                checked: data.is_preview,
                onChange: (e) => setData("is_preview", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium", children: "Jadikan materi ini Preview (Gratis dibuka tanpa perlu membeli kelas)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2 ml-8", children: 'Biasanya dicentang untuk video trailer atau "Introduction" di awal kelas.' })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-6 space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700", children: [
          /* @__PURE__ */ jsx(Link, { href: route("admin.courses.lessons.index", course.id), className: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md", children: "Batal" }),
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: isEditing ? "Simpan Perubahan" : "Tambahkan Materi" })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  LessonsForm as default
};
