import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { Transition } from "@headlessui/react";
import { usePage, useForm } from "@inertiajs/react";
import imageCompression from "browser-image-compression";
function UpdatePatientDocumentsForm({ className = "" }) {
  const { auth, status } = usePage().props;
  const user = auth.user;
  const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
    ktp_photo: null,
    emergency_contact_name: user.emergency_contact_name || "",
    emergency_contact_phone: user.emergency_contact_phone || "",
    emergency_contact_relation: user.emergency_contact_relation || ""
  });
  const [previewKtp, setPreviewKtp] = useState(user.ktp_photo ? `/storage/${user.ktp_photo}` : null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileWarning, setFileWarning] = useState("");
  const fileInputRef = useRef(null);
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    setFileWarning("");
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileWarning("Ukuran file KTP terlalu besar. Sistem sedang mengompres otomatis agar kualitas tetap terjaga...");
        setIsCompressing(true);
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          const compressedFile = await imageCompression(file, options);
          const newFile = new File([compressedFile], file.name, {
            type: compressedFile.type || "image/jpeg",
            lastModified: Date.now()
          });
          setData("ktp_photo", newFile);
          setPreviewKtp(URL.createObjectURL(newFile));
          setFileWarning("Kompresi berhasil. Ukuran foto sekarang optimal.");
          setTimeout(() => {
            setFileWarning("");
          }, 5e3);
        } catch (error) {
          console.error("Error compressing image:", error);
          setFileWarning("Gagal mengompres gambar. Silakan unggah file dengan ukuran lebih kecil (maks. 2MB).");
          if (fileInputRef.current) fileInputRef.current.value = "";
          setData("ktp_photo", null);
          setPreviewKtp(null);
        } finally {
          setIsCompressing(false);
        }
      } else {
        setData("ktp_photo", file);
        setPreviewKtp(URL.createObjectURL(file));
      }
    } else {
      setData("ktp_photo", null);
      setPreviewKtp(null);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (isCompressing) return;
    post(route("profile.documents.update"), {
      preserveScroll: true,
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black tracking-tight text-gray-950 dark:text-white", children: "Dokumen & Kontak Darurat" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Lengkapi identitas KTP dan data kontak darurat Anda yang bisa dihubungi dalam kondisi mendesak." }),
      status === "profile-updated-continue-docs" && /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Profil dasar berhasil diperbarui. Silakan lengkapi Foto KTP dan Kontak Darurat di bawah ini." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "ktp_photo", value: "Foto KTP" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "Format didukung: JPG, PNG. Rekomendasi maksimal 10MB (akan dikompres otomatis jika lebih dari 2MB)." }),
        previewKtp && /* @__PURE__ */ jsx("div", { className: "mt-2 mb-4", children: /* @__PURE__ */ jsx("img", { src: previewKtp, alt: "KTP Preview", className: `max-w-xs rounded-lg border border-gray-300 shadow-sm transition-opacity duration-300 ${isCompressing ? "opacity-50" : "opacity-100"}` }) }),
        fileWarning && /* @__PURE__ */ jsxs("div", { className: `mt-2 mb-4 text-sm px-4 py-3 rounded-xl flex items-start gap-3 border shadow-sm ${fileWarning.includes("Gagal") ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30" : fileWarning.includes("berhasil") ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30" : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30"}`, children: [
          isCompressing ? /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-current shrink-0 mt-0.5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
            /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }) : fileWarning.includes("berhasil") ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 shrink-0 mt-0.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-medium leading-relaxed", children: fileWarning })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            id: "ktp_photo",
            ref: fileInputRef,
            onChange: handlePhotoChange,
            accept: "image/*",
            disabled: isCompressing,
            className: `mt-1 block w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-500 rounded-xl bg-white/50 dark:bg-gray-900/50 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300 transition-all duration-300 ${isCompressing ? "opacity-50 cursor-not-allowed" : ""}`
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.ktp_photo })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_name", value: "Nama Kontak Darurat" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "emergency_contact_name",
            className: "mt-1 block w-full",
            value: data.emergency_contact_name,
            onChange: (e) => setData("emergency_contact_name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.emergency_contact_name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_phone", value: "No. Telepon Kontak Darurat" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "emergency_contact_phone",
              className: "mt-1 block w-full",
              value: data.emergency_contact_phone,
              onChange: (e) => setData("emergency_contact_phone", e.target.value),
              required: true
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.emergency_contact_phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "emergency_contact_relation", value: "Hubungan Keluarga" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "emergency_contact_relation",
              className: "mt-1 block w-full",
              value: data.emergency_contact_relation,
              onChange: (e) => setData("emergency_contact_relation", e.target.value),
              required: true,
              placeholder: "Contoh: Suami/Istri, Orang Tua, Saudara"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.emergency_contact_relation })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing || isCompressing, className: "!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase", children: isCompressing ? "Menyimpan..." : "Simpan Dokumen" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out duration-300 transform",
            enterFrom: "opacity-0 translate-y-2",
            enterTo: "opacity-100 translate-y-0",
            leave: "transition ease-in-out duration-300",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800", children: [
              /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Data berhasil disimpan." })
            ] })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdatePatientDocumentsForm as default
};
