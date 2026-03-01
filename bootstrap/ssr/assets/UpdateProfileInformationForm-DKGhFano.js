import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { Transition } from "@headlessui/react";
import { usePage, useForm, Link } from "@inertiajs/react";
import "react";
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const isPatient = user.roles?.includes("patient");
  const isTherapist = user.roles?.includes("therapist");
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    age: user.age || "",
    gender: user.gender || ""
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-black tracking-tight text-gray-950 dark:text-white", children: "Informasi Profil" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Perbarui informasi profil akun dan alamat email Anda." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      (isPatient || isTherapist) && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "phone", value: "Nomor HP" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "phone",
              type: "text",
              className: "mt-1 block w-full",
              value: data.phone,
              onChange: (e) => setData("phone", e.target.value),
              placeholder: "Contoh: 0812...",
              required: isPatient
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "age", value: "Usia" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "age",
              type: "number",
              className: "mt-1 block w-full",
              value: data.age,
              onChange: (e) => setData("age", e.target.value),
              min: "0",
              max: "150",
              required: isPatient
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.age })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "gender", value: "Jenis Kelamin" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "gender",
              className: "mt-1 block w-full border border-gray-400 rounded-xl bg-white/50 shadow-sm backdrop-blur-md focus:border-gold-500 focus:ring-gold-500 focus:bg-white/80 dark:border-gray-500 dark:bg-gray-900/50 dark:text-gray-300 dark:focus:border-gold-500 dark:focus:ring-gold-500 dark:focus:bg-gray-900/80 transition-all duration-300",
              value: data.gender,
              onChange: (e) => setData("gender", e.target.value),
              required: isPatient,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Pilih Jenis Kelamin" }),
                /* @__PURE__ */ jsx("option", { value: "Laki-laki", children: "Laki-laki" }),
                /* @__PURE__ */ jsx("option", { value: "Perempuan", children: "Perempuan" }),
                /* @__PURE__ */ jsx("option", { value: "Lainnya", children: "Lainnya" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.gender })
        ] })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-gray-800 dark:text-gray-200", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600 dark:text-green-400", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-4 !py-2 !text-xs !tracking-widest !font-semibold !h-auto !shadow-none !uppercase", children: isPatient ? "SIMPAN & LANJUT KE DOKUMEN" : "SIMPAN" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful || status === "profile-updated-continue-docs",
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Profil tersimpan." })
          }
        )
      ] })
    ] })
  ] });
}
export {
  UpdateProfileInformation as default
};
