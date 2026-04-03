import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DLGa0CGh.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { Users, Building2, Phone, Mail, MapPin, CreditCard, Banknote, FileText, Save, ChevronLeft } from "lucide-react";
import { I as InputError } from "./InputError-2JjWc6nJ.js";
import { I as InputLabel } from "./InputLabel-CnBOqvzp.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-DsMP_cZ6.js";
function GroupBookingsCreate({ paymentMethods }) {
  const { data, setData, post, processing, errors } = useForm({
    group_name: "",
    institution_name: "",
    address: "",
    pic_name: "",
    pic_phone: "",
    pic_email: "",
    payment_method: paymentMethods?.[0] ?? "Transfer Bank",
    notes: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.group-bookings.store"));
  };
  const fields = [
    { id: "group_name", label: "Nama Grup *", placeholder: "cth: Komunitas Sehat PKBI Jakarta", icon: Users, required: true },
    { id: "institution_name", label: "Nama Institusi / Perusahaan", placeholder: "cth: PT. Sejahtera Indonesia", icon: Building2 },
    { id: "pic_name", label: "Nama PIC (Person in Charge) *", placeholder: "Nama penanggung jawab grup", icon: Users, required: true },
    { id: "pic_phone", label: "Nomor Telepon PIC", placeholder: "081234567890", icon: Phone },
    { id: "pic_email", label: "Email PIC", placeholder: "pic@email.com", icon: Mail, type: "email" }
  ];
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("admin.group-bookings.index"),
            className: "p-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-indigo-600 transition-colors shadow-sm",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Buat Grup Baru" }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1", children: "Isi data grup/institusi terlebih dahulu" })
        ] })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Buat Grup Baru" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)]", children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-indigo-50 dark:bg-indigo-950/30 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-4", children: [
            /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 text-indigo-500 flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-wide", children: "Panduan Grup Booking" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-indigo-700 dark:text-indigo-400 font-medium mt-1 leading-relaxed", children: [
                "Setelah membuat grup, Anda bisa menambahkan anggota satu per satu. Invoice grup akan tersedia di halaman detail setelah ada anggota. Semua anggota grup mendapatkan sesi ",
                /* @__PURE__ */ jsx("strong", { children: "offline" }),
                " di klinik."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl", children: /* @__PURE__ */ jsx(Building2, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Data Grup & PIC" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
              fields.map(({ id, label, placeholder, icon: Icon, type = "text", required }) => /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: label }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      type,
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all",
                      value: data[id],
                      onChange: (e) => setData(id, e.target.value),
                      placeholder,
                      required
                    }
                  ),
                  /* @__PURE__ */ jsx(Icon, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors[id], className: "mt-2" })
              ] }, id)),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(InputLabel, { className: "text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1", children: "Alamat Lengkap" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 3,
                      className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white transition-all resize-none",
                      value: data.address,
                      onChange: (e) => setData("address", e.target.value),
                      placeholder: "Alamat lengkap institusi/grup..."
                    }
                  ),
                  /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-4 w-4 h-4 text-gray-400" })
                ] }),
                /* @__PURE__ */ jsx(InputError, { message: errors.address, className: "mt-2" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded-2xl", children: /* @__PURE__ */ jsx(CreditCard, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Metode Pembayaran Grup" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              (paymentMethods || []).map((method) => {
                const Icon = method === "Cash" ? Banknote : CreditCard;
                const isSelected = data.payment_method === method;
                return /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-indigo-300"}`, children: [
                  /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", name: "payment_method", value: method, checked: isSelected, onChange: () => setData("payment_method", method) }),
                  /* @__PURE__ */ jsx(Icon, { className: `w-5 h-5 flex-shrink-0 ${isSelected ? "text-white" : "text-indigo-500"}` }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-black uppercase tracking-widest", children: method })
                ] }, method);
              }),
              /* @__PURE__ */ jsx(InputError, { message: errors.payment_method, className: "mt-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-white dark:border-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-2xl", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]", children: "Catatan (Opsional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                className: "w-full bg-gray-50 dark:bg-gray-950 border-transparent focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 rounded-2xl px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-all resize-none",
                placeholder: "Catatan khusus untuk grup ini...",
                value: data.notes,
                onChange: (e) => setData("notes", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.notes, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-white dark:border-gray-800 sticky bottom-8", children: [
            /* @__PURE__ */ jsx(Link, { href: route("admin.group-bookings.index"), className: "text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors px-6", children: "Batal" }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  "Buat Grup & Lanjut"
                ]
              }
            )
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  GroupBookingsCreate as default
};
