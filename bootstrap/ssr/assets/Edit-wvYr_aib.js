import { jsxs, jsx } from "react/jsx-runtime";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DxSrewPt.js";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./DeleteUserForm-O0MgLm3F.js";
import UpdatePasswordForm from "./UpdatePasswordForm-D7wLRZo6.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-DKGhFano.js";
import UpdateTherapistProfileForm from "./UpdateTherapistProfileForm-z-gJtDOo.js";
import { P as ProfileProgressCard } from "./ProfileProgressCard-ICeDvvkZ.js";
import "@headlessui/react";
import "react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
import "./InputError-2JjWc6nJ.js";
import "./InputLabel-CnBOqvzp.js";
import "./Modal-BSrLMD0w.js";
import "./SecondaryButton-D0HLp6wy.js";
import "./TextInput-DcEnl-Ka.js";
import "./PrimaryButton-DsRkdqwY.js";
import "lucide-react";
function Edit({ mustVerifyEmail, status, profileProgress, auth }) {
  const user = auth.user;
  const isPatient = (user.roles || []).includes("patient");
  const isTherapist = (user.roles || []).includes("therapist");
  const isSuperAdmin = (user.roles || []).includes("super_admin");
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: "Informasi Profil" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profil" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 relative z-10", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700", children: /* @__PURE__ */ jsx(
              UpdateProfileInformation,
              {
                mustVerifyEmail,
                status,
                className: "max-w-xl"
              }
            ) }),
            isTherapist && /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700", children: /* @__PURE__ */ jsx(UpdateTherapistProfileForm, { className: "max-w-2xl" }) }),
            /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
            !isSuperAdmin && /* @__PURE__ */ jsx("div", { className: "bg-white/20 backdrop-blur-[60px] backdrop-saturate-[1.8] border border-white/40 dark:bg-white/[0.03] dark:border-white/[0.08] sm:rounded-[2.5rem] sm:p-10 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
          ] }),
          isPatient && /* @__PURE__ */ jsx("div", { className: "lg:w-80 space-y-6", children: /* @__PURE__ */ jsx("div", { className: "sticky top-24", children: /* @__PURE__ */ jsx(ProfileProgressCard, { profileProgress, showLink: false }) }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Edit as default
};
