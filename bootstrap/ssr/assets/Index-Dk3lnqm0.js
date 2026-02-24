import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-S4MLfnZq.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import { P as PrimaryButton } from "./PrimaryButton-DsRkdqwY.js";
import { T as TextInput } from "./TextInput-DcEnl-Ka.js";
import "@headlessui/react";
import "./ThemeToggle-SHr-61ed.js";
import "./LiquidBackground-CwZ70oWB.js";
function ExpensesIndex({ expenses }) {
  const { flash } = usePage().props;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    description: "",
    category: "Operasional",
    amount: "",
    expense_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    receipt: null
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("admin.expenses.store"), {
      onSuccess: () => {
        setIsFormOpen(false);
        reset();
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthenticatedLayout,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: "Manajemen Pengeluaran" }),
        /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            onClick: () => setIsFormOpen(!isFormOpen),
            className: `!rounded-2xl !px-6 !py-3 !text-[10px] !tracking-widest !font-black !h-auto !shadow-xl !uppercase transition-all duration-300 transform active:scale-95 ${isFormOpen ? "!bg-gray-200 !text-gray-800 hover:!bg-gray-300" : "!bg-gold-600 hover:!bg-gold-500 !shadow-gold-600/20"}`,
            children: isFormOpen ? "Tutup Form" : "Catat Pengeluaran Baru"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Manajemen Pengeluaran" }),
        /* @__PURE__ */ jsx("div", { className: "py-12 bg-gray-50 dark:bg-gray-950 min-h-[calc(100vh-64px)] transition-colors duration-500", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          flash.success && /* @__PURE__ */ jsx("div", { className: "p-4 mb-4 text-sm text-green-800 dark:text-green-300 rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 backdrop-blur-sm animate-pulse", children: flash.success }),
          isFormOpen && /* @__PURE__ */ jsxs("div", { className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2.5rem] p-8 border border-white dark:border-gray-800 animate-in slide-in-from-top duration-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-gold-500 rounded-full" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Catat Pengeluaran" })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1", children: "Deskripsi / Keperluan" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "description",
                    type: "text",
                    className: "mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5",
                    value: data.description,
                    onChange: (e) => setData("description", e.target.value),
                    placeholder: "Contoh: Pembelian tisu toilet...",
                    required: true
                  }
                ),
                errors.description && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-600 font-bold ml-1", children: errors.description })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1", children: "Jumlah (Rp)" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "amount",
                    type: "number",
                    className: "mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5",
                    value: data.amount,
                    onChange: (e) => setData("amount", e.target.value),
                    placeholder: "Contoh: 50000",
                    required: true
                  }
                ),
                errors.amount && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-600 font-bold ml-1", children: errors.amount })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1", children: "Kategori" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "category",
                    className: "w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all font-bold appearance-none cursor-pointer",
                    value: data.category,
                    onChange: (e) => setData("category", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "Operasional", children: "Operasional Harian" }),
                      /* @__PURE__ */ jsx("option", { value: "Sewa Tempat", children: "Sewa Tempat" }),
                      /* @__PURE__ */ jsx("option", { value: "Gaji Pegawai", children: "Gaji Pegawai / Terapis" }),
                      /* @__PURE__ */ jsx("option", { value: "Marketing", children: "Marketing & Ads" }),
                      /* @__PURE__ */ jsx("option", { value: "Peralatan", children: "Peralatan Klinik" }),
                      /* @__PURE__ */ jsx("option", { value: "Lainnya", children: "Lainnya" })
                    ]
                  }
                ),
                errors.category && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-600 font-bold ml-1", children: errors.category })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1", children: "Tanggal" }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    id: "expense_date",
                    type: "date",
                    className: "mt-1 block w-full !bg-gray-50 dark:!bg-gray-800/50 !border-gray-200 dark:!border-gray-700 !rounded-2xl !px-5",
                    value: data.expense_date,
                    onChange: (e) => setData("expense_date", e.target.value),
                    required: true
                  }
                ),
                errors.expense_date && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-600 font-bold ml-1", children: errors.expense_date })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1", children: "Foto Nota / Struk (Opsional)" }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2rem] bg-gray-50/50 dark:bg-gray-800/20 hover:border-gold-500/50 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-center", children: [
                  /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", stroke: "currentColor", fill: "none", viewBox: "0 0 48 48", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex text-sm text-gray-600 dark:text-gray-400", children: [
                    /* @__PURE__ */ jsxs("label", { htmlFor: "receipt", className: "relative cursor-pointer bg-transparent rounded-md font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 focus-within:outline-none", children: [
                      /* @__PURE__ */ jsx("span", { children: "Upload file" }),
                      /* @__PURE__ */ jsx("input", { id: "receipt", type: "file", className: "sr-only", onChange: (e) => setData("receipt", e.target.files[0]) })
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "pl-1", children: "atau drag and drop" })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 uppercase font-black tracking-widest", children: "PNG, JPG up to 10MB" })
                ] }) }),
                data.receipt && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gold-600 dark:text-gold-400 font-bold mt-2", children: [
                  "File dipilih: ",
                  data.receipt.name
                ] }),
                errors.receipt && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-600 font-bold ml-1", children: errors.receipt })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "md:col-span-2 flex justify-end", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, className: "!bg-gold-600 hover:!bg-gold-500 !rounded-2xl !px-10 !py-4 !text-xs !tracking-widest !font-black !shadow-xl !shadow-gold-600/20 !uppercase !w-full sm:!w-auto", children: processing ? "Menyimpan..." : "Simpan Data" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-gray-200/50 dark:shadow-black/50 sm:rounded-[2.5rem] border border-white dark:border-gray-800 transition-all duration-500", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-6 bg-gold-500 rounded-full" }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight", children: "Riwayat Pengeluaran" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "overflow-x-auto -mx-8", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-100 dark:divide-gray-800/50", children: [
              /* @__PURE__ */ jsx("thead", { className: "bg-gray-50/50 dark:bg-gray-800/10", children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Tanggal" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Kategori" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Deskripsi" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Jumlah" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-left text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Nota" }),
                /* @__PURE__ */ jsx("th", { className: "px-8 py-4 text-right text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest", children: "Aksi" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50 dark:divide-gray-800/30", children: expenses.data.map((expense) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all duration-300", children: [
                /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white", children: new Date(expense.expense_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gray-200 dark:border-gray-700", children: expense.category }) }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-6 text-sm font-medium text-gray-600 dark:text-gray-400 max-w-xs truncate", children: expense.description }),
                /* @__PURE__ */ jsxs("td", { className: "px-8 py-6 whitespace-nowrap text-sm font-black text-red-600 dark:text-red-400", children: [
                  "Rp ",
                  Number(expense.amount).toLocaleString("id-ID")
                ] }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap text-sm", children: expense.receipt ? /* @__PURE__ */ jsxs("a", { href: `/storage/${expense.receipt}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 text-gold-600 dark:text-gold-400 hover:text-gold-500 font-bold decoration-2 hover:underline transition-all", children: [
                  /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                    /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                  ] }),
                  "Lihat"
                ] }) : /* @__PURE__ */ jsx("span", { className: "text-gray-300 dark:text-gray-700 italic text-xs", children: "—" }) }),
                /* @__PURE__ */ jsx("td", { className: "px-8 py-6 whitespace-nowrap text-right text-sm font-medium", children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("admin.expenses.destroy", expense.id),
                    method: "delete",
                    as: "button",
                    onBefore: () => confirm("Hapus detail pengeluaran ini?"),
                    className: "px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-red-600/20 transition-all active:scale-95",
                    children: "Hapus"
                  }
                ) })
              ] }, expense.id)) })
            ] }) }),
            expenses.data.length === 0 && /* @__PURE__ */ jsx("div", { className: "py-20 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-600 text-sm font-bold italic tracking-tight", children: "Belum ada data pengeluaran." }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  ExpensesIndex as default
};
