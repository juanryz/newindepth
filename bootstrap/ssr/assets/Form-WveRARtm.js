import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-CyyYerVG.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { motion } from "framer-motion";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
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
      post(route("therapist.courses.lessons.update", [course.id, lesson.id]), {
        forceFormData: true,
        onSuccess: () => {
        },
        data: {
          ...data,
          _method: "PUT"
        }
      });
    } else {
      post(route("therapist.courses.lessons.store", course.id));
    }
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1", children: "Editor Kurikulum" }),
      /* @__PURE__ */ jsx("h2", { className: "font-black text-2xl text-gray-900 dark:text-white leading-tight uppercase", children: isEditing ? "Ubah Materi" : "Buat Materi Baru" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { href: route("therapist.courses.lessons.index", course.id), className: "text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mt-2 sm:mt-0 flex items-center gap-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2.5", d: "M10 19l-7-7m0 0l7-7m-7 7h18" }) }),
      "Batal & Kembali"
    ] })
  ] }), children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Materi" : "Tambah Materi" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        className: "bg-white dark:bg-gray-800 overflow-hidden shadow-2xl rounded-[3rem] border border-gray-100 dark:border-gray-700 p-8 md:p-12 relative",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20", children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xs font-black text-gray-400 uppercase tracking-widest mb-1", children: "Target Kelas" }),
              /* @__PURE__ */ jsx("p", { className: "text-lg font-black text-gray-900 dark:text-white uppercase leading-tight", children: course.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "JUDUL MATERI / SESI", className: "text-[10px] font-black tracking-widest text-gray-400" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "title",
                    type: "text",
                    className: "mt-2 block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 px-6 text-lg font-bold",
                    value: data.title,
                    onChange: (e) => setData("title", e.target.value),
                    placeholder: "Contoh: Pengantar Somatic Awareness",
                    required: true,
                    isFocused: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.title, className: "mt-2" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-1", children: [
                /* @__PURE__ */ jsx(InputLabel, { htmlFor: "order_column", value: "NO. URUT", className: "text-[10px] font-black tracking-widest text-gray-400" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "order_column",
                    type: "number",
                    min: "0",
                    className: "mt-2 block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 text-center font-black text-xl text-indigo-600",
                    value: data.order_column,
                    onChange: (e) => setData("order_column", e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(InputError, { message: errors.order_column, className: "mt-2" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "video_url", value: "URL VIDEO (YOUTUBE / EMBED LINK)", className: "text-[10px] font-black tracking-widest text-gray-400" }),
              /* @__PURE__ */ jsxs("div", { className: "relative mt-2", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm10 2a1 1 0 100 2 1 1 0 000-2zm-2 1a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" }) }) }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "video_url",
                    type: "url",
                    className: "block w-full border-2 border-gray-100 focus:border-indigo-500 rounded-2xl h-14 pl-14 text-sm font-mono text-gray-600",
                    value: data.video_url,
                    placeholder: "https://www.youtube.com/embed/...",
                    onChange: (e) => setData("video_url", e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-gray-400 mt-2 ml-2", children: "Kosongkan jika materi berupa file atau teks." }),
              /* @__PURE__ */ jsx(InputError, { message: errors.video_url, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "attachment", value: "UNGGAH FILE (PDF, WORD, GAMBAR, DLL)", className: "text-[10px] font-black tracking-widest text-gray-400" }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 flex items-center gap-4", children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "attachment",
                  type: "file",
                  className: "block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all border-2 border-dashed border-gray-200 rounded-2xl p-2",
                  onChange: (e) => setData("attachment", e.target.files[0])
                }
              ) }),
              lesson.attachment && /* @__PURE__ */ jsxs("p", { className: "text-[10px] font-bold text-emerald-600 mt-2 ml-2 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }),
                "File saat ini: ",
                lesson.attachment_name
              ] }),
              /* @__PURE__ */ jsx(InputError, { message: errors.attachment, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "content", value: "ISI MATERI / ARTIKEL (OPSIONAL)", className: "text-[10px] font-black tracking-widest text-gray-400" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "content",
                  className: "mt-2 block w-full border-2 border-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 rounded-[2rem] min-h-[400px] font-sans text-base p-8 shadow-inner",
                  value: data.content || "",
                  placeholder: "Tuliskan materi tertulis, jurnal refleksi, atau penjelasan mendalam di sini...",
                  onChange: (e) => setData("content", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.content, className: "mt-2" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-indigo-900 dark:text-indigo-300 uppercase underline decoration-indigo-500/30", children: "Privasi Materi" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-700/60 dark:text-indigo-400/60 mt-1", children: "Jadikan materi ini Preview untuk menarik minat calon siswa (bisa ditonton gratis)." })
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: data.is_preview,
                    onChange: (e) => setData("is_preview", e.target.checked),
                    className: "sr-only peer"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600" }),
                /* @__PURE__ */ jsx("span", { className: "ml-3 text-xs font-black text-indigo-900 dark:text-indigo-300 uppercase", children: "PREVIEW" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-12 space-x-6 pt-8 border-t border-gray-100 dark:border-gray-700", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("therapist.courses.lessons.index", course.id),
                  className: "text-xs font-black text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors",
                  children: "Batal"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: processing,
                  className: "px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-xl shadow-gray-900/10 active:scale-95 disabled:opacity-50",
                  children: isEditing ? "Simpan Perubahan" : "Terbitkan Materi"
                }
              )
            ] })
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  LessonsForm as default
};
