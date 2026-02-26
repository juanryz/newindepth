import { jsxs, jsx } from "react/jsx-runtime";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { G as GuestLayout } from "./GuestLayout-6VFu8n0g.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import "./ThemeToggle-SHr-61ed.js";
import "react-dom";
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const COOLDOWN_TIME = 300;
  const MAX_ATTEMPTS = 3;
  const [timeLeft, setTimeLeft] = useState(0);
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem("verify_email_attempts");
    return saved ? parseInt(saved) : 0;
  });
  useEffect(() => {
    const lastSent = localStorage.getItem("verify_email_last_sent");
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent)) / 1e3);
      if (elapsed < COOLDOWN_TIME) {
        setTimeLeft(COOLDOWN_TIME - elapsed);
      }
    }
  }, []);
  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1e3);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);
  useEffect(() => {
    localStorage.setItem("verify_email_attempts", attempts.toString());
  }, [attempts]);
  const submit = (e) => {
    e.preventDefault();
    if (attempts >= MAX_ATTEMPTS) return;
    post(route("verification.send"), {
      onSuccess: () => {
        setTimeLeft(COOLDOWN_TIME);
        setAttempts((prev) => prev + 1);
        localStorage.setItem("verify_email_last_sent", Date.now().toString());
      }
    });
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return /* @__PURE__ */ jsxs(GuestLayout, { title: "Verifikasi Email", children: [
    /* @__PURE__ */ jsx(Head, { title: "Verifikasi Email" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsx("h2", { className: "text-[2.75rem] font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-tight transition-colors duration-1000", children: "Verify" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[11px] text-gray-400 dark:text-gray-500 font-black tracking-[0.2em] uppercase opacity-80", children: "Satu langkah terakhir" }),
      /* @__PURE__ */ jsx("div", { className: "h-0.5 w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto mt-8" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-10 text-center px-4 animate-in fade-in duration-1000", children: /* @__PURE__ */ jsx("p", { className: "text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed font-light", children: "Terima kasih telah bergabung! Silakan verifikasi alamat email Anda melalui tautan yang baru saja kami kirimkan untuk mengaktifkan akun Anda." }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200", children: [
      status === "verification-link-sent" && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-sm font-bold text-green-600 dark:text-green-400 text-center flex items-center justify-center gap-2 animate-pulse", children: [
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 transition-transform group-hover:scale-110", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }),
        "Tautan verifikasi baru telah dikirim!"
      ] }),
      attempts >= MAX_ATTEMPTS && /* @__PURE__ */ jsx("div", { className: "p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-sm font-bold text-red-600 dark:text-red-400 text-center", children: "Batas percobaan tercapai. Silakan coba lagi nanti." }),
      /* @__PURE__ */ jsx("div", { className: "relative group transition-all duration-500 hover:-translate-y-1", children: /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          className: "w-full shadow-lg shadow-gold-500/10 py-4",
          disabled: processing || timeLeft > 0 || attempts >= MAX_ATTEMPTS,
          children: timeLeft > 0 ? `Tunggu ${formatTime(timeLeft)}` : attempts >= MAX_ATTEMPTS ? "Batas Tercapai" : "Kirim Ulang Email Verifikasi"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 w-full", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-100 dark:border-gray-800" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400", children: [
            "Percobaan: ",
            attempts,
            " / ",
            MAX_ATTEMPTS
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-grow border-t border-gray-100 dark:border-gray-800" })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("logout"),
            method: "post",
            as: "button",
            className: "text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-[0.1em] underline underline-offset-8 decoration-gray-200 dark:decoration-gray-800",
            children: "Keluar dari Sesi"
          }
        )
      ] })
    ] })
  ] });
}
export {
  VerifyEmail as default
};
