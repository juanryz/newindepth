import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Transition } from "@headlessui/react";
import { Link, usePage, router } from "@inertiajs/react";
import { useState, createContext, useContext, useRef, useEffect } from "react";
import { T as ThemeToggle } from "./ThemeToggle-SHr-61ed.js";
import { L as LiquidBackground } from "./LiquidBackground-CwZ70oWB.js";
const DropDownContext = createContext();
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40",
        onClick: () => setOpen(false)
      }
    )
  ] });
};
const Content = ({
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white dark:bg-gray-700",
  children
}) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses,
              children
            }
          )
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800 " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function ResponsiveNavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active ? "border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800 dark:border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 dark:focus:border-indigo-300 dark:focus:bg-indigo-900 dark:focus:text-indigo-200" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-gray-600 dark:focus:bg-gray-700 dark:focus:text-gray-200"} text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`,
      children
    }
  );
}
function NotificationBell() {
  const { auth } = usePage().props;
  const notifications = auth.notifications || [];
  const unreadCount = auth.unread_notifications_count || 0;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const markAsRead = (id) => {
    router.post(route("notifications.read", id), {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
      }
    });
  };
  const markAllAsRead = () => {
    router.post(route("notifications.readAll"), {}, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setIsOpen(false)
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "relative p-2 text-gray-500 hover:text-gold-600 transition-colors dark:text-gray-400 dark:hover:text-gold-400 focus:outline-none",
        children: [
          /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }),
          unreadCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900", children: unreadCount > 9 ? "9+" : unreadCount })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: "Notifikasi" }),
        unreadCount > 0 && /* @__PURE__ */ jsx("button", { onClick: markAllAsRead, className: "text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium", children: "Tandai semua dibaca" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-h-96 overflow-y-auto", children: notifications.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: notifications.map((notification) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${notification.read_at ? "opacity-70" : "bg-blue-50/50 dark:bg-blue-900/10"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-1", children: notification.data.type === "success" ? /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-green-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-green-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 13l4 4L19 7" }) }) }) : notification.data.type === "info" ? /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }) : /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }) }) }),
            /* @__PURE__ */ jsxs("div", { className: "ml-3 w-0 flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900 dark:text-gray-100", children: notification.data.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: notification.data.message }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex space-x-4", children: [
                notification.data.url && /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: notification.data.url,
                    onClick: () => markAsRead(notification.id),
                    className: "text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400",
                    children: "Lihat Detail"
                  }
                ),
                !notification.read_at && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => markAsRead(notification.id),
                    className: "text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300",
                    children: "Tandai dibaca"
                  }
                )
              ] })
            ] })
          ]
        },
        notification.id
      )) }) : /* @__PURE__ */ jsx("div", { className: "p-4 text-center text-sm text-gray-500 dark:text-gray-400 py-8", children: "Belum ada notifikasi baru." }) })
    ] })
  ] });
}
function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const roles = user?.roles?.map((r) => r.name) ?? [];
  roles.some((r) => ["admin", "super_admin", "cs"].includes(r));
  roles.includes("super_admin");
  roles.includes("therapist");
  roles.includes("patient");
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f8f9fa] dark:bg-gray-950 transition-colors duration-500 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsx(LiquidBackground, {}),
    /* @__PURE__ */ jsxs("nav", { className: "relative z-50 border-b border-white/40 dark:border-white/[0.08] bg-white/20 dark:bg-white/[0.03] backdrop-blur-[60px] backdrop-saturate-[1.8] transition-all duration-500", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex h-24 justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center", children: /* @__PURE__ */ jsxs(Link, { href: "/", className: "inline-flex items-center group relative p-1", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-white/20 dark:bg-white/5 rounded-xl blur-md group-hover:bg-white/40 transition-all duration-300" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/logo-color.png",
              alt: "InDepth Mental Wellness",
              className: "h-20 w-auto object-contain block dark:hidden relative z-10"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/logo-white.png",
              alt: "InDepth Mental Wellness",
              className: "h-20 w-auto object-contain hidden dark:block relative z-10"
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:ms-6 sm:flex sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "mr-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(NotificationBell, {}),
            /* @__PURE__ */ jsx(ThemeToggle, {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative ms-3", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
            /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                className: "inline-flex items-center rounded-md border border-transparent bg-white/50 px-3 py-2 text-sm font-medium leading-4 text-gray-700 transition duration-150 ease-in-out hover:text-gold-600 focus:outline-none dark:bg-gray-800/50 dark:text-gray-300 dark:hover:text-gold-400 backdrop-blur-md",
                children: [
                  user.name,
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "-me-0.5 ms-2 h-4 w-4",
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  )
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
              /* @__PURE__ */ jsx(
                Dropdown.Link,
                {
                  href: route("profile.edit"),
                  children: "Profile"
                }
              ),
              /* @__PURE__ */ jsx(
                Dropdown.Link,
                {
                  href: route("logout"),
                  method: "post",
                  as: "button",
                  children: "Log Out"
                }
              )
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "-me-2 flex items-center sm:hidden gap-2", children: [
          /* @__PURE__ */ jsx(NotificationBell, {}),
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowingNavigationDropdown(
                (previousState) => !previousState
              ),
              className: "inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition duration-150 ease-in-out hover:bg-gray-200/50 hover:text-gray-700 focus:bg-gray-200/50 focus:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-300 dark:focus:bg-gray-800/50 dark:focus:text-gray-300 backdrop-blur-md",
              children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  className: "h-6 w-6",
                  stroke: "currentColor",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  children: [
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M4 6h16M4 12h16M4 18h16"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        className: showingNavigationDropdown ? "inline-flex" : "hidden",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  ]
                }
              )
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden border-t border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl",
          children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-1 pb-3 pt-2", children: /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("dashboard"), active: route().current("dashboard"), children: "Dashboard" }) }),
            /* @__PURE__ */ jsxs("div", { className: "border-t border-white/40 pb-1 pt-4 dark:border-gray-700/50", children: [
              /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-base font-medium text-gray-800 dark:text-gray-200", children: user.name }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: user.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
                /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
                /* @__PURE__ */ jsx(
                  ResponsiveNavLink,
                  {
                    method: "post",
                    href: route("logout"),
                    as: "button",
                    children: "Log Out"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "relative z-40 border-b border-white/20 dark:border-gray-800/30 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: [
      !route().current("dashboard") && !route().current("admin.blog.create") && !route().current("admin.blog.edit") && !route().current("courses.index") && !route().current("courses.show") && !route().current("lessons.show") && !route().current("admin.schedules.show") && !route().current("agreement.patient") && !route().current("agreement.show") && !route().current("schedules.patient-detail") && !route().current("affiliate.agreement.show") && /* @__PURE__ */ jsxs(
        Link,
        {
          href: route().current("bookings.show") ? route("dashboard") : route().current("admin.users.show") ? route("admin.users.index") : route("dashboard"),
          className: "inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors mb-4",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) }),
            route().current("bookings.show") ? "Kembali ke Dashboard" : route().current("admin.users.show") ? "Kembali ke Manajemen User" : "Kembali ke Dashboard"
          ]
        }
      ),
      header
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "relative z-30", children })
  ] });
}
export {
  AuthenticatedLayout as A
};
