import { jsx, jsxs } from "react/jsx-runtime";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import { G as GuestLayout } from "./GuestLayout-6VFu8n0g.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 " + className
    }
  );
}
function Login({ status, canResetPassword, packages = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const getPackage = (slug) => {
    return packages.find((p) => p.slug === slug) || {
      name: slug.toUpperCase(),
      base_price: 0,
      current_price: 0,
      discount_percentage: 0
    };
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace("IDR", "Rp");
  };
  const regulerPkg = getPackage("hipnoterapi");
  const premiumPkg = getPackage("premium");
  const vipPkg = getPackage("vip");
  const [showPassword, setShowPassword] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password")
    });
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { title: "Sign In", children: [
    /* @__PURE__ */ jsx(Head, { title: "Sign In" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 text-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black text-gray-950 dark:text-white tracking-[-0.01em] leading-tight transition-colors duration-1000", children: "Sign In" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[10px] text-gray-700 dark:text-gray-300 font-black tracking-[0.2em] uppercase opacity-90", children: "Lanjutkan perjalanan batin Anda" }),
      /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-6" })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-6 p-4 rounded-2xl bg-green-50/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 text-sm font-semibold text-green-600 dark:text-green-400 text-center animate-fade-in", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "group", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email", className: "ml-1 mb-1 transition-colors group-focus-within:text-gold-600 dark:group-focus-within:text-gold-400" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full px-4 py-3.5",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 ml-1" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "group", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center ml-1 mb-1", children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "transition-colors group-focus-within:text-gold-600 dark:group-focus-within:text-gold-400" }),
          canResetPassword && /* @__PURE__ */ jsx(
            Link,
            {
              href: route("password.request"),
              className: "text-xs font-bold text-gray-500 hover:text-gold-600 dark:text-gray-400 dark:hover:text-gold-400 transition-colors",
              children: "Lupa password?"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              type: showPassword ? "text" : "password",
              name: "password",
              value: data.password,
              className: "block w-full px-4 py-3.5 pr-12",
              autoComplete: "current-password",
              onChange: (e) => setData("password", e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gold-500 transition-colors",
              onClick: () => setShowPassword(!showPassword),
              children: showPassword ? /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "h-5 w-5", fill: "none", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", stroke: "currentColor", children: [
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2 ml-1" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer group", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors", children: "Ingat saya" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "w-full", disabled: processing, children: "Sign In" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center py-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-200 dark:border-gray-800" }),
        /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 mx-4 text-xs font-bold uppercase tracking-widest text-gray-400", children: "Atau" }),
        /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-200 dark:border-gray-800" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: route("auth.google"),
            className: "w-full inline-flex justify-center items-center px-4 py-3.5 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 group",
            children: [
              /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 mr-3 group-hover:scale-110 transition-transform", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: [
                /* @__PURE__ */ jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                /* @__PURE__ */ jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                /* @__PURE__ */ jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                /* @__PURE__ */ jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
              ] }),
              "Sign in with Google"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-sm font-medium text-gray-500 dark:text-gray-400", children: [
          "Belum punya akun?",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("register"),
              className: "text-gold-600 dark:text-gold-400 font-bold hover:underline underline-offset-4 decoration-2",
              children: "Buat Akun Baru"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 pt-8 border-t border-gray-100 dark:border-gray-800", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-center text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 mb-6", children: "Pilihan Layanan" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4", children: [
          { name: "REGULER", pkg: regulerPkg, color: "text-gray-950 dark:text-white" },
          { name: "PREMIUM", pkg: premiumPkg, color: "text-gold-600 dark:text-gold-400" },
          { name: "VIP", pkg: vipPkg, color: "text-rose-600 dark:text-rose-400" }
        ].map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700/50 group hover:border-gold-500/30 transition-all", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: `text-[10px] font-black tracking-widest ${item.color}`, children: item.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-bold dark:text-gray-200", children: formatPrice(item.pkg.current_price) }),
              item.pkg.discount_percentage > 0 && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400 line-through opacity-60", children: formatPrice(item.pkg.base_price) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-bold text-gray-400 uppercase tracking-tighter", children: "Per Sesi" }) })
        ] }, idx)) })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
