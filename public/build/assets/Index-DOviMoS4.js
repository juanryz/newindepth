import{e as f,b as o,f as m,j as e,H as w,h as k}from"./app-B-nduyTP.js";import{A as v}from"./AuthenticatedLayout-BFymMgla.js";import{F as j,i as y,a as N,b as D}from"./index-C84njCbY.js";import _ from"./Form-DL-SXevD.js";import"./transition-BAZ2_fPQ.js";import"./ThemeToggle-DVZl0Duq.js";import"./LiquidBackground-BzpPhVTZ.js";function A({schedules:i,therapists:r,filters:d}){const{auth:c}=f().props,{user:C}=c,x=t=>c.user.roles?.includes("super_admin")||c.user.permissions?.includes(t),[h,s]=o.useState(!1),[l,u]=o.useState(d.therapist_id||""),[g,p]=o.useState("timeGridWeek"),n=o.useRef(null);o.useEffect(()=>{const t=()=>{if(window.innerWidth<1024){if(p("timeGridDay"),n.current){const a=n.current.getApi();a.view.type.includes("Grid")&&a.view.type!=="timeGridDay"&&a.changeView("timeGridDay")}}else if(p("timeGridWeek"),n.current){const a=n.current.getApi();a.view.type.includes("Grid")&&a.view.type!=="dayGridMonth"&&a.view.type!=="timeGridWeek"&&a.changeView("timeGridWeek")}};return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]),o.useEffect(()=>{l!==(d.therapist_id||"")&&m.get(route("admin.orders.index"),{...d,therapist_id:l},{preserveState:!0,replace:!0})},[l]);const b=t=>{m.visit(route("admin.schedules.show",t.event.id))};return e.jsxs(v,{header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Manajemen Jadwal"}),children:[e.jsx(w,{title:"Manajemen Jadwal Terapis"}),e.jsx("style",{children:`
        .fc {
            --fc-border-color: rgba(255, 255, 255, 0.05);
            --fc-button-bg-color: transparent;
            --fc-button-border-color: rgba(255, 255, 255, 0.1);
            --fc-button-hover-bg-color: rgba(99, 102, 241, 0.1);
            --fc-button-active-bg-color: rgba(99, 102, 241, 0.2);
            --fc-today-bg-color: rgba(99, 102, 241, 0.05);
            font-family: 'Inter', sans-serif;
            border: none !important;
        }
        .dark .fc {
            --fc-border-color: rgba(255, 255, 255, 0.03);
        }
        .fc-theme-standard td, .fc-theme-standard th {
            border: 1px solid var(--fc-border-color) !important;
        }
        .fc-col-header-cell {
            padding: 20px 0 !important;
            background: rgba(255, 255, 255, 0.02);
        }
        .fc-col-header-cell-cushion {
            text-transform: uppercase;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: #6366f1;
        }
        .fc-timegrid-slot {
            height: 4em !important;
            border-bottom: 1px solid var(--fc-border-color) !important;
        }
        .fc-timegrid-slot-label-cushion {
            font-size: 10px;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
        }
        .fc-event {
            border: none !important;
            border-radius: 12px !important;
            padding: 4px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .fc-event:hover {
            transform: scale(1.02) translateY(-2px);
            z-index: 50;
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .fc-v-event {
            background: transparent !important;
        }
        .fc-event-main {
            padding: 4px !important;
        }
        .fc-timegrid-now-indicator-line {
            border-color: #6366f1 !important;
            border-width: 2px !important;
        }
        .fc-timegrid-now-indicator-arrow {
            border-color: #6366f1 !important;
            border-top-color: transparent !important;
            border-bottom-color: transparent !important;
        }
        .fc-toolbar-title {
            font-size: 1.25rem !important;
            font-weight: 900 !important;
            text-transform: uppercase;
            letter-spacing: -0.025em;
            color: #1e293b;
        }
        .dark .fc-toolbar-title {
            color: #f8fafc;
        }
        .fc-daygrid-day-number {
            font-weight: 400 !important;
            font-size: 14px !important;
            color: #475569;
        }
        .dark .fc-daygrid-day-number {
            color: #94a3b8;
        }
        .fc-daygrid-day-top {
            font-weight: 400 !important;
        }
        .fc-daygrid-event {
            font-weight: 500 !important;
        }
        .fc-button-primary {
            background-color: white !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
            color: #475569 !important;
            font-weight: 800 !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            border-radius: 12px !important;
            padding: 8px 16px !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .dark .fc-button-primary {
            background-color: #1e293b !important;
            border-color: rgba(255,255,255,0.05) !important;
            color: #cbd5e1 !important;
        }
        .fc-button-primary:hover {
            background-color: #f8fafc !important;
        }
        .dark .fc-button-primary:hover {
            background-color: #334155 !important;
        }
        .fc-button-active {
            background-color: #4f46e5 !important;
            border-color: #4f46e5 !important;
            color: white !important;
        }
        @media (max-width: 767px) {
            .fc-toolbar { flex-direction: column !important; gap: 8px !important; align-items: stretch !important; }
            .fc-toolbar-title { font-size: 0.9rem !important; text-align: center; }
            .fc-toolbar-chunk { display: flex !important; justify-content: center !important; flex-wrap: wrap !important; gap: 4px !important; }
            .fc-button-primary { font-size: 9px !important; padding: 6px 10px !important; }
            .fc .fc-col-header-cell-cushion { font-size: 9px !important; padding: 4px !important; border: none !important; }
            .fc .fc-timegrid-slot-label-cushion { font-size: 9px !important; }
            .fc-timegrid-slot { height: 3em !important; }
        }
    `}),e.jsxs("div",{className:"relative py-12 bg-slate-50 dark:bg-slate-950 min-h-screen overflow-hidden transition-colors duration-700",children:[e.jsxs("div",{className:"absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0",children:[e.jsx("div",{className:"absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-indigo-400/30 to-purple-500/30 blur-[120px] rounded-full animate-pulse",style:{animationDuration:"8s"}}),e.jsx("div",{className:"absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-cyan-400/20 to-emerald-400/20 blur-[100px] rounded-full animate-pulse",style:{animationDuration:"12s",animationDelay:"2s"}}),e.jsx("div",{className:"absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-gradient-to-r from-rose-400/10 to-orange-400/10 blur-[80px] rounded-full animate-pulse",style:{animationDuration:"10s",animationDelay:"1s"}})]}),e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8 relative z-10",children:[e.jsxs("div",{className:"bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white dark:border-slate-800 p-8 sm:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-500",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-8",children:[e.jsxs("div",{children:[e.jsxs("h1",{className:"text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight",children:["Manajemen ",e.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400",children:"Jadwal"})]}),e.jsx("p",{className:"mt-2 text-slate-500 dark:text-slate-400 font-bold italic tracking-wide",children:"Atur waktu dan sesi konsultasi tim psikolog Anda."})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4",children:[e.jsxs("button",{onClick:()=>window.print(),className:"px-6 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-white dark:border-slate-700 rounded-2xl flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-black/5 active:scale-95",children:[e.jsxs("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 00-2 2h2m2 4h10a2 2 0 012 2v1H5v-1a2 2 0 012-2z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 9V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"})]}),"Cetak Jadwal"]}),x("create schedules")&&e.jsxs("button",{onClick:()=>s(!0),className:"group relative px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest overflow-hidden shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"}),e.jsxs("span",{className:"relative flex items-center gap-3",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"3",d:"M12 4v16m8-8H4"})}),"Tambah Slot Manual"]})]})]})]}),e.jsx("div",{className:"mt-10 pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row items-center gap-6",children:e.jsxs("div",{className:"w-full md:w-auto flex-1",children:[e.jsx("label",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1",children:"Pilih Terapis"}),e.jsx("div",{className:"relative group",children:e.jsxs("select",{value:l,onChange:t=>u(t.target.value),className:"w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-6 py-4 pr-12 text-sm font-black text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat",children:[e.jsx("option",{value:"",children:"Semua Terapis"}),r.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))]})})]})})]}),e.jsx("div",{className:"bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-slate-800 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden transition-all duration-700 p-2 group",children:e.jsx("div",{className:"bg-white dark:bg-slate-900/20 rounded-[3rem] p-6 sm:p-10 transition-colors",children:e.jsx(j,{ref:n,plugins:[y,N,D],view:g,weekends:!1,headerToolbar:{left:"prev,next",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay"},titleFormat:{year:"numeric",month:"long",day:"numeric"},locale:"id",slotMinTime:"08:00:00",slotMaxTime:"22:00:00",slotDuration:"01:00:00",allDaySlot:!1,events:i,eventClick:b,editable:!1,droppable:!1,eventContent:z,height:"auto",expandRows:!0,stickyHeaderDates:!0,nowIndicator:!0})})}),e.jsxs("div",{className:"mt-12 pt-12 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8",children:[e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"}),e.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Terisi"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"}),e.jsx("span",{className:"text-[10px] font-black text-slate-400 uppercase tracking-widest",children:"Tersedia"})]})]}),e.jsxs("p",{className:"text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-widest uppercase text-center sm:text-right",children:["© ",new Date().getFullYear()," InDepth Mental Wellness. Developed for Excellence."]})]})]}),h&&typeof document<"u"&&k.createPortal(e.jsxs("div",{className:"fixed inset-0 z-[100] flex items-center justify-center p-4",children:[e.jsx("div",{className:"absolute inset-0 bg-slate-900/60 backdrop-blur-md",onClick:()=>s(!1)}),e.jsxs("div",{className:"bg-white dark:bg-slate-900 rounded-[3rem] p-10 w-full max-w-lg shadow-2xl relative border border-white dark:border-slate-800 animate-in fade-in zoom-in duration-300",children:[e.jsxs("div",{className:"flex justify-between items-center mb-8",children:[e.jsx("h1",{className:"text-2xl font-black text-slate-900 dark:text-white tracking-tight",children:"Tambah Slot Jadwal"}),e.jsx("button",{onClick:()=>s(!1),className:"text-slate-400 hover:text-slate-600 transition-colors",children:e.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsx(_,{therapists:r,onSuccess:()=>s(!1)})]})]}),document.body)]})]})}function z(i){const r=i.event.extendedProps.bookings?.length>0;return e.jsxs("div",{className:`h-full w-full p-1 sm:p-2 rounded-xl transition-all flex flex-col justify-center gap-0 sm:gap-1 group overflow-hidden ${r?"bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 shadow-inner":"bg-white dark:bg-slate-800 border-2 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm"}`,children:[e.jsxs("div",{className:"flex items-center justify-between pointer-events-none mb-0.5",children:[e.jsx("span",{className:"text-[8px] sm:text-[9px] font-black uppercase tracking-widest opacity-80 leading-tight truncate",children:i.timeText}),r&&e.jsx("div",{className:"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]"})]}),e.jsx("div",{className:`text-[10px] sm:text-xs font-black truncate leading-tight uppercase tracking-tight pointer-events-none ${r?"text-white":"text-slate-900 dark:text-white"}`,children:r?"✅ TERISI":i.event.extendedProps.therapist?.name}),!r&&e.jsx("div",{className:"text-[7.5px] sm:text-[8px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-widest pointer-events-none truncate",children:i.event.extendedProps.schedule_type==="class"?"🎓 Kelas":"👥 Konsultasi"}),r&&e.jsxs("div",{className:"text-[7.5px] sm:text-[8px] font-black text-white/70 uppercase tracking-widest pointer-events-none truncate",children:[i.event.extendedProps.bookings.length," Pasien"]})]})}export{A as default};
