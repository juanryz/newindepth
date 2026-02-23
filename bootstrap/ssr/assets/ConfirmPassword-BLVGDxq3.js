import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { G as GuestLayout } from "./GuestLayout-6VFu8n0g.js";
import { useForm, Head } from "@inertiajs/react";
import "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { title: "Konfirmasi Password", children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000", children: "Security" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80", children: "Konfirmasi identitas Anda" }),
      /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-center px-4", children: /* @__PURE__ */ jsx("p", { className: "text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed font-light", children: "Ini adalah area aman. Harap konfirmasi kata sandi Anda sebelum melanjutkan." }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000", children: [
      /* @__PURE__ */ jsxs("div", { className: "group relative transition-all duration-500 hover:-translate-y-1", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "ml-2 mb-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-focus-within:text-gold-500 transition-colors" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "block w-full px-6 py-4 rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border-white/40 dark:border-gray-800/40 focus:ring-gold-500/20 focus:border-gold-500/40 transition-all duration-500",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2 ml-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "w-full shadow-lg shadow-gold-500/10", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
export {
  ConfirmPassword as default
};
