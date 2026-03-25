import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 90) {
        current = 90;
        clearInterval(interval);
      }
      setProgress(Math.min(current, 90));
    }, 120);
    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 500);
      }, 300);
    };
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const safety = setTimeout(finish, 4e3);
    return () => {
      clearInterval(interval);
      clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);
  if (!visible) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
      style: {
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1206 50%, #0d0d0d 100%)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-in-out"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(ellipse, rgba(208,170,33,0.12) 0%, transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col items-center gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-20 h-20 flex items-center justify-center", children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                viewBox: "0 0 80 80",
                className: "absolute inset-0 w-full h-full",
                style: { animation: "spin 2s linear infinite" },
                children: [
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: "40",
                      cy: "40",
                      r: "36",
                      fill: "none",
                      stroke: "rgba(208,170,33,0.15)",
                      strokeWidth: "2"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "circle",
                    {
                      cx: "40",
                      cy: "40",
                      r: "36",
                      fill: "none",
                      stroke: "url(#goldGrad)",
                      strokeWidth: "2.5",
                      strokeLinecap: "round",
                      strokeDasharray: "60 170",
                      style: { animation: "dash-spin 1.8s ease-in-out infinite" }
                    }
                  ),
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "goldGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                    /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#d4aa21" }),
                    /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#f5d96b" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "w-9 h-9 relative z-10",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "url(#iconGold)",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "iconGold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                    /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#d4aa21" }),
                    /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#f5d96b" })
                  ] }) }),
                  /* @__PURE__ */ jsx("path", { d: "M12 2C9.243 2 7 4.243 7 7v1H6a3 3 0 000 6v1a5 5 0 0010 0v-1a3 3 0 000-6h-1V7c0-2.757-2.243-5-5-5z" }),
                  /* @__PURE__ */ jsx("path", { d: "M12 8v4M10 12h4" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-3xl font-black tracking-[0.25em] uppercase",
                style: {
                  background: "linear-gradient(90deg, #b8860b, #d4aa21, #f5d96b, #d4aa21, #b8860b)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 2.5s linear infinite"
                },
                children: "InDepth"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.4em] uppercase text-yellow-600/60 font-medium mt-1", children: "Mental Wellness" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-48 flex flex-col items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-full h-[2px] rounded-full overflow-hidden",
                style: { background: "rgba(208,170,33,0.15)" },
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "h-full rounded-full",
                    style: {
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #b8860b, #f5d96b)",
                      transition: "width 0.2s ease-out",
                      boxShadow: "0 0 8px rgba(208,170,33,0.6)"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                className: "text-[9px] tracking-[0.3em] uppercase font-bold tabular-nums",
                style: { color: "rgba(208,170,33,0.45)" },
                children: [
                  Math.round(progress),
                  "%"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "absolute bottom-12 text-[10px] tracking-[0.3em] uppercase font-medium",
            style: { color: "rgba(208,170,33,0.25)" },
            children: "Sesi Privat · Profesional · Berdampak"
          }
        ),
        /* @__PURE__ */ jsx("style", { children: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes dash-spin {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -230; }
                }
                @keyframes shimmer {
                    0%   { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            ` })
      ]
    }
  );
}
export {
  PageLoader as P
};
