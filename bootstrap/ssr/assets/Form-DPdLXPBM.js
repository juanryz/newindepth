import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-S4MLfnZq.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import ReactQuill from "react-quill";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function BlogForm({ post }) {
  const isEditing = !!post;
  const { data, setData, post: formPost, put: formPut, processing, errors, transform } = useForm({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    body: post?.body || "",
    meta_title: post?.meta_title || "",
    meta_description: post?.meta_description || "",
    meta_keywords: post?.meta_keywords || "",
    is_published: post?.is_published || false,
    featured_image: null
  });
  const submit = (e) => {
    e.preventDefault();
    if (isEditing) {
      transform((data2) => ({
        ...data2,
        _method: "put"
      }));
      formPost(`/admin/blog/${post.id}`, {
        forceFormData: true
      });
    } else {
      formPost("/admin/blog");
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/admin/blog", className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300", children: "← Batal" }),
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-white leading-tight", children: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Artikel" : "Tulis Artikel Baru" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Artikel" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "title",
                type: "text",
                className: "mt-1 block w-full text-lg font-semibold",
                value: data.title,
                onChange: (e) => setData("title", e.target.value),
                required: true
              }
            ),
            errors.title && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "excerpt", value: "Excerpt (Ringkasan Singkat Singkat)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "excerpt",
                className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-20",
                value: data.excerpt,
                onChange: (e) => setData("excerpt", e.target.value)
              }
            ),
            errors.excerpt && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.excerpt })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "body", value: "Konten Artikel" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden pb-12", children: /* @__PURE__ */ jsx(
              ReactQuill,
              {
                theme: "snow",
                value: data.body,
                onChange: (content) => setData("body", content),
                className: "h-96",
                modules: {
                  toolbar: [
                    [{ "header": [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ "list": "ordered" }, { "list": "bullet" }],
                    ["link", "image"],
                    ["clean"]
                  ]
                }
              }
            ) }),
            errors.body && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.body })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "featured_image", value: "Gambar Utama (Featured Image)" }),
            isEditing && post.featured_image && /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("img", { src: `/storage/${post.featured_image}`, alt: "Current", className: "h-32 rounded border" }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "featured_image",
                type: "file",
                accept: "image/*",
                className: "mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100",
                onChange: (e) => setData("featured_image", e.target.files[0])
              }
            ),
            errors.featured_image && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.featured_image })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "my-6 border-gray-200" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 dark:text-white", children: "SEO Meta Data (Opsional)" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_title", value: "Meta Title" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "meta_title",
                type: "text",
                className: "mt-1 block w-full",
                value: data.meta_title,
                placeholder: "Opsional, akan menggunakan judul artikel jika kosong",
                onChange: (e) => setData("meta_title", e.target.value)
              }
            ),
            errors.meta_title && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.meta_title })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_description", value: "Meta Description" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "meta_description",
                className: "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full h-20",
                value: data.meta_description,
                onChange: (e) => setData("meta_description", e.target.value)
              }
            ),
            errors.meta_description && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.meta_description })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(InputLabel, { htmlFor: "meta_keywords", value: "Meta Keywords (pisahkan dengan koma)" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "meta_keywords",
                type: "text",
                className: "mt-1 block w-full",
                value: data.meta_keywords,
                onChange: (e) => setData("meta_keywords", e.target.value)
              }
            ),
            errors.meta_keywords && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 mt-2", children: errors.meta_keywords })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "block mt-6", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-indigo-600 shadow-sm focus:ring-indigo-500",
                checked: data.is_published,
                onChange: (e) => setData("is_published", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600 dark:text-gray-300 font-bold", children: "Publikasikan Artikel Ini (Terlihat oleh Publik)" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-8", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: isEditing ? "Simpan Perubahan" : "Simpan Artikel" }) })
        ] }) }) }) })
      ]
    }
  );
}
export {
  BlogForm as default
};
