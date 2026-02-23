import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxs("div", { style: { padding: "2rem", background: "#fee2e2", color: "#991b1b", fontFamily: "monospace" }, children: [
        /* @__PURE__ */ jsx("h2", { children: "Something went wrong in the component." }),
        /* @__PURE__ */ jsxs("details", { style: { whiteSpace: "pre-wrap" }, children: [
          /* @__PURE__ */ jsx("summary", { children: "Click for error details" }),
          this.state.error && this.state.error.toString(),
          /* @__PURE__ */ jsx("br", {}),
          this.state.errorInfo && this.state.errorInfo.componentStack
        ] })
      ] });
    }
    return this.props.children;
  }
}
export {
  ErrorBoundary as default
};
