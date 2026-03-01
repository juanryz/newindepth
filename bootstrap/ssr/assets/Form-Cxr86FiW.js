import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DxSrewPt.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function CoursesForm({ course }) {
  const isEditing = !!course.id;
  const [previewImage, setPreviewImage] = useState(course.thumbnail ? `/storage/${course.thumbnail}` : null);
  const { data, setData, post, processing, errors } = useForm({
    title: course.title || "",
    description: course.description || "",
    course_type: "offline",
    // Forced to offline
    quota: course.quota || 1,
    schedule_at: course.schedule_at ? course.schedule_at.split(" ")[0] + "T" + course.schedule_at.split(" ")[1].substring(0, 5) : "",
    location: course.location || "",
    price: course.price || 0,
    thumbnail: null,
    is_published: course.is_published || false,
    _method: isEditing ? "put" : "post"
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("thumbnail", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const submit = (e) => {
    e.preventDefault();
    post(isEditing ? route("therapist.courses.update", course.id) : route("therapist.courses.store"), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(AuthenticatedLayout, { header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: isEditing ? "Edit Kelas Saya" : "Tambah Kelas Baru" }), children: [
    /* @__PURE__ */ jsx(Head, { title: isEditing ? "Edit Kelas" : "Tambah Kelas" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "title", value: "Judul Kelas" }),
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
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "price", value: "Harga (Rp) - Isi 0 Jika Gratis" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "price",
              type: "number",
              min: "0",
              className: "mt-1 block w-full",
              value: data.price,
              onChange: (e) => setData("price", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.price, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "course_type", value: "Tipe Kelas" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              id: "course_type",
              className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm bg-gray-100 dark:bg-gray-800",
              value: data.course_type,
              disabled: true,
              children: /* @__PURE__ */ jsx("option", { value: "offline", children: "Offline (Tatap Muka)" })
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-500 mt-1", children: "Saat ini hanya pendaftaran kelas offline yang tersedia." }),
          /* @__PURE__ */ jsx(InputError, { message: errors.course_type, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "quota", value: "Jumlah Kuota Peserta" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "quota",
              type: "number",
              min: "1",
              className: "mt-1 block w-full",
              value: data.quota,
              onChange: (e) => setData("quota", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.quota, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "schedule_at", value: "Tanggal & Waktu Jadwal" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "schedule_at",
              type: "datetime-local",
              className: "mt-1 block w-full",
              value: data.schedule_at,
              onChange: (e) => setData("schedule_at", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.schedule_at, className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "location", value: "Lokasi / Alamat Pelaksanaan" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "location",
            type: "text",
            className: "mt-1 block w-full",
            value: data.location,
            onChange: (e) => setData("location", e.target.value),
            placeholder: "Contoh: Klinik InDepth, Semarang",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.location, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "description", value: "Deskripsi Lengkap" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "description",
            className: "mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm min-h-[150px]",
            value: data.description,
            onChange: (e) => setData("description", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.description, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "thumbnail", value: "Thumbnail Kelas (Opsional)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "thumbnail",
              type: "file",
              accept: "image/*",
              className: "mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300",
              onChange: handleImageChange
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.thumbnail, className: "mt-2" }),
          previewImage && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Preview:" }),
            /* @__PURE__ */ jsx("img", { src: previewImage, alt: "Preview", className: "h-32 object-cover rounded shadow-md border border-gray-200 dark:border-gray-700" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-600", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Status Publikasi" }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center mt-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 cursor-pointer h-5 w-5",
                checked: data.is_published,
                onChange: (e) => setData("is_published", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-700 dark:text-gray-300 font-medium", children: "Tampilkan kelas ini di katalog publik (Publish)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Jika tidak di centang, kelas akan disimpan sebagai Draft dan tidak bisa dibeli/dilihat user." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-6 space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(Link, { href: route("therapist.courses.index"), className: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md", children: "Batal" }),
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: isEditing ? "Simpan Perubahan" : "Buat Kelas" })
      ] })
    ] }) }) }) })
  ] });
}
export {
  CoursesForm as default
};
