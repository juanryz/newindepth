import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { Transition } from "@headlessui/react";
import { usePage, useForm } from "@inertiajs/react";
function UpdateTherapistProfileForm({ className = "" }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    specialization: user.specialization || "",
    bio: user.bio || ""
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black tracking-tight text-gray-950 dark:text-white", children: "Pengaturan Terapi & Keahlian" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Informasi ini akan ditampilkan pada profil publik Anda agar calon pasien mengenal keahlian Anda." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "specialization", value: "Spesialisasi / Keahlian" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "specialization",
            className: "mt-1 block w-full",
            value: data.specialization,
            onChange: (e) => setData("specialization", e.target.value),
            placeholder: "Contoh: Kecemasan, Depresi, Trauma, dll",
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.specialization })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "bio", value: "Bio Singkat / Deskripsi Diri" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "bio",
            className: "mt-1 block w-full border border-gray-400 rounded-xl bg-white/50 shadow-sm backdrop-blur-md focus:border-gold-500 focus:ring-gold-500 dark:border-gray-500 dark:bg-gray-900/50 dark:text-gray-300 transition-all duration-300 min-h-[120px]",
            value: data.bio,
            onChange: (e) => setData("bio", e.target.value),
            placeholder: "Ceritakan sedikit tentang pengalaman dan pendekatan terapi Anda..."
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.bio })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase", children: "SIMPAN PENGATURAN" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Tersimpan." })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdateTherapistProfileForm as default
};
