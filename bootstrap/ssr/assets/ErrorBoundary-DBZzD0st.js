import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("[ErrorBoundary] Caught error:", error);
    console.error("[ErrorBoundary] Component stack:", errorInfo?.componentStack);
  }
  render() {
    if (this.state.hasError) {
      const errMsg = this.state.error?.toString() || "Unknown error";
      const errStack = this.state.errorInfo?.componentStack || "";
      return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] dark:bg-gray-950 px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 rounded-full bg-gold-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-gold-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-2", children: "Halaman Gagal Dimuat" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-4", children: "Terjadi kesalahan saat memuat halaman ini. Silakan coba muat ulang." }),
        /* @__PURE__ */ jsxs("details", { className: "mb-6 text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4", children: [
          /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-sm font-semibold text-red-600 dark:text-red-400", children: "Detail Error (klik untuk lihat)" }),
          /* @__PURE__ */ jsxs("pre", { className: "mt-2 text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap break-all overflow-auto max-h-60", children: [
            errMsg,
            errStack
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-full transition-colors",
            children: "Muat Ulang Halaman"
          }
        )
      ] }) });
    }
    return this.props.children;
  }
}
export {
  ErrorBoundary as E
};
