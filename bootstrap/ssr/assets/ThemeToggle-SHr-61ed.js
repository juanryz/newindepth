import { jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window === "undefined") return "light";
      return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggleTheme,
      className: "p-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all duration-300 shadow-sm",
      "aria-label": "Toggle Dark Mode",
      children: theme === "light" ? (
        // Moon Icon for Light Mode
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) })
      ) : (
        // Sun Icon for Dark Mode
        /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-gold-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }) })
      )
    }
  );
}
export {
  ThemeToggle as T
};
