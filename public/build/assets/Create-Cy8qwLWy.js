import{j as e,e as v,b as S,u as K,H as C,L as I}from"./app-C6maEWwM.js";import{A as U}from"./AuthenticatedLayout-D8cxBfwI.js";import{R as E}from"./RefundPolicyContent-CZ4lKajS.js";import"./transition-DT5kDcHh.js";import"./ThemeToggle-DkSCqzLI.js";import"./LiquidBackground-DP4jAjmh.js";function L({schedules:b=[],selectedScheduleId:s,onSelect:x}){if(b.length===0)return e.jsx("div",{className:"p-4 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400 text-sm italic text-center",children:"Belum ada jadwal yang tersedia untuk saat ini."});const[k,g]=v.useState("week"),r=b.filter(i=>{const l=(i.date||"").substring(0,10),t=new Date(`${l}T00:00:00Z`),d=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Jakarta"}).format(new Date),n=new Date(`${d}T00:00:00Z`);switch(k){case"day":return t.getTime()===n.getTime();case"week":const o=new Date(n);return o.setDate(n.getDate()+7),t.getTime()>=n.getTime()&&t.getTime()<=o.getTime();case"month":return t.getUTCMonth()===n.getUTCMonth()&&t.getUTCFullYear()===n.getUTCFullYear();case"year":return t.getUTCFullYear()===n.getUTCFullYear();default:return!0}}).reduce((i,l)=>{const t=(l.date||"").substring(0,10);return i[t]||(i[t]=[]),i[t].push(l),i},{});return e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex flex-wrap gap-2 mb-4",children:[{id:"day",label:"Hari Ini"},{id:"week",label:"Minggu Ini"},{id:"month",label:"Bulan Ini"},{id:"year",label:"Tahun Ini"},{id:"all",label:"Semua Jadwal"}].map(i=>e.jsx("button",{type:"button",onClick:()=>g(i.id),className:`px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 border ${k===i.id?"bg-indigo-600 text-white border-indigo-600 shadow-md transform -translate-y-0.5":"bg-white/40 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/60"}`,children:i.label},i.id))}),Object.keys(r).length===0?e.jsx("div",{className:"p-6 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700/50 rounded-2xl text-gray-500 dark:text-gray-400 text-sm text-center italic",children:"Tidak ada jadwal yang sesuai dengan filter ini."}):Object.entries(r).map(([i,l])=>e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 px-2",children:new Date(i).toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:l.map(t=>{const d=s===t.id,n=t.bookings_count??0,o=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jakarta",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o).reduce((w,j)=>(w[j.type]=j.value,w),{}),m=new Date(Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second)),A=new Date(m.getTime()+3600*1e3),[D,P,_]=t.start_time.split(":"),p=new Date(t.date),T=new Date(Date.UTC(p.getUTCFullYear(),p.getUTCMonth(),p.getUTCDate(),D,P,_)),y=t.status==="full"||n>=t.quota,f=T<A,u=y||f;return e.jsxs("button",{type:"button",onClick:()=>!u&&x(t.id),disabled:u,className:`
                                        flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                                        ${u?"bg-gray-100/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed":""}
                                        ${!u&&d?"bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-700 dark:text-indigo-400 shadow-md transform -translate-y-1":""}
                                        ${!u&&!d?"bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm":""}
                                    `,children:[e.jsxs("span",{className:"font-bold text-sm text-center",children:[t.start_time?.substring(0,5)||"--:--"," - ",t.end_time?.substring(0,5)||"--:--"]}),e.jsx("span",{className:"text-xs mt-1",children:y?"Penuh":f?"Lewat":`${t.quota-n} slot sisa`})]},t.id)})})]},i))]})}const N={updated:"24 Februari 2026",content:`InDepth Mental Wellness menghargai dan melindungi data pribadi setiap pengguna layanan kami, termasuk klien hipnoterapi, peserta seminar, siswa LMS, dan mitra affiliate.

Dengan menggunakan layanan kami, Anda menyetujui kebijakan privasi ini.

---

1. PENGUMPULAN DATA PRIBADI

Kami dapat mengumpulkan data berikut:

A. Data Identitas
- Nama lengkap
- Nomor KTP atau identitas resmi
- Tanggal lahir
- Jenis kelamin
- Alamat
- Nomor telepon
- Email

B. Data Kontak Darurat
- Nama kontak darurat
- Hubungan dengan klien
- Nomor telepon kontak darurat

C. Data Kesehatan dan Psikologis (Khusus Klien)
- Riwayat kesehatan
- Riwayat diagnosa
- Riwayat terapi sebelumnya
- Hasil screening awal
- Catatan sesi hipnoterapi

D. Data Akademik (Siswa LMS & Pelatihan)
- Riwayat kursus
- Hasil kuis dan ujian
- Sertifikat
- Status kelulusan
- Catatan evaluasi

E. Data Affiliate
- Data identitas
- Data rekening atau metode payout
- Data performa referral
- Data transaksi komisi

F. Data Teknis Website
- Alamat IP
- Browser
- Cookies
- Riwayat aktivitas di website
- Data transaksi WooCommerce

---

2. TUJUAN PENGGUNAAN DATA

Data digunakan untuk:
- Proses booking dan administrasi layanan
- Dokumentasi terapi
- Pelaksanaan pelatihan dan sertifikasi
- Proses pembayaran dan komisi affiliate
- Verifikasi identitas
- Pengiriman notifikasi
- Peningkatan kualitas layanan
- Kepentingan hukum dan perlindungan usaha

---

3. SISTEM DOKUMENTASI SESI

Seluruh sesi hipnoterapi direkam audio dan video untuk:
- Transparansi
- Perlindungan hukum
- Evaluasi profesional

Rekaman:
- Disimpan dalam sistem internal
- Tidak dipublikasikan
- Hanya dibuka jika diminta secara resmi oleh pihak berwenang

Setelah periode tertentu, rekaman dapat dianonimkan untuk keperluan akademik.

---

4. DASAR HUKUM PENGOLAHAN DATA

Pengolahan data dilakukan berdasarkan:
- Persetujuan pengguna
- Kewajiban kontraktual
- Kepentingan hukum yang sah
- Ketentuan Undang-Undang Perlindungan Data Pribadi Indonesia

---

5. PENYIMPANAN DAN KEAMANAN DATA

Kami menerapkan:
- Sistem akses berbasis role
- Enkripsi pada server
- Pembatasan akses internal
- Backup berkala
- Firewall dan proteksi keamanan

Data hanya dapat diakses oleh personel yang berwenang sesuai peran masing-masing.

---

6. PEMBAGIAN DATA KEPADA PIHAK KETIGA

Data dapat dibagikan kepada:
- Penyedia layanan pembayaran (misalnya payment gateway)
- Penyedia hosting dan infrastruktur teknologi
- Pihak berwenang berdasarkan permintaan resmi

Kami tidak menjual data pribadi kepada pihak lain.

---

7. HAK SUBJEK DATA

Pengguna memiliki hak untuk:
- Mengakses data pribadi
- Memperbaiki data yang tidak akurat
- Meminta penghapusan data (kecuali yang diwajibkan oleh hukum untuk disimpan)
- Menarik persetujuan pengolahan data

Permintaan dapat diajukan melalui email resmi kami.

---

8. COOKIES DAN TEKNOLOGI PELACAKAN

Website kami menggunakan cookies untuk:
- Autentikasi login
- Keamanan
- Analisis performa website
- Optimasi pengalaman pengguna

Pengguna dapat mengatur preferensi cookies melalui browser masing-masing.

---

9. DATA ANAK DI BAWAH UMUR

Untuk pengguna di bawah 21 tahun:
- Diperlukan persetujuan orang tua atau wali
- Data diproses dengan perlindungan tambahan

---

10. PERUBAHAN KEBIJAKAN

Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu.
Versi terbaru akan selalu tersedia di website resmi.

---

11. KONTAK RESMI

Untuk pertanyaan terkait privasi dan data pribadi, hubungi:
Email: admin@indepth.co.id
Website: indepth.co.id

---

12. PERSETUJUAN

Dengan menggunakan layanan kami, melakukan booking, mengikuti pelatihan, mendaftar sebagai affiliate, atau mengakses website, Anda dianggap telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.`};function M(){return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("p",{className:"font-bold text-gray-900 dark:text-white mb-4 italic uppercase text-xs",children:["Terakhir diperbarui: ",N.updated]}),e.jsx("div",{className:"whitespace-pre-wrap",children:N.content})]})}function O({schedules:b,packageOptions:s,screeningResult:x}){const{errors:k}=S().props,[g,c]=v.useState(1),{data:r,setData:i,post:l,processing:t,errors:d}=K({schedule_id:"",package_type:s.recommended,agree_privacy:!1,agree_refund:!1,agree_final:!1,agree_access:!1,agree_chargeback:!1}),n=()=>{if(!r.agree_privacy){alert("Silakan setujui Kebijakan Privasi terlebih dahulu.");return}window.scrollTo({top:0,behavior:"smooth"}),c(2)},o=()=>{if(!r.schedule_id){alert("Silakan pilih jadwal terlebih dahulu.");return}window.scrollTo({top:0,behavior:"smooth"}),c(3)},h=a=>{if(a&&a.preventDefault(),!(r.agree_refund&&r.agree_final&&r.agree_access&&r.agree_chargeback)){alert("Silakan setujui seluruh poin Kebijakan Non-Refund untuk melanjutkan.");return}l(route("bookings.store"))};return e.jsxs(U,{header:e.jsx("h2",{className:"font-bold text-xl text-gray-900 dark:text-white leading-tight",children:"Buat Janji Temu Hipnoterapi"}),children:[e.jsx(C,{title:"Booking Hipnoterapi"}),e.jsx("div",{className:"py-12",children:e.jsxs("div",{className:"max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("details",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-emerald-100 dark:border-emerald-900/30 group mb-4 lg:mb-0 transition-all duration-300",children:[e.jsxs("summary",{className:"p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden",children:[e.jsxs("h3",{className:"text-lg font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2",children:[e.jsx("svg",{className:"w-5 h-5 text-emerald-600 dark:text-emerald-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),"Keamanan Data"]}),e.jsx("svg",{className:"w-5 h-5 text-emerald-600 dark:text-emerald-400 group-open:rotate-180 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{className:"px-6 pb-6 text-sm text-emerald-700 dark:text-emerald-400 font-medium leading-relaxed border-t border-emerald-100 dark:border-emerald-900/30 pt-4 animate-fade-in-up",children:"Data Anda dilindungi dengan enkripsi end-to-end dan hanya dapat diakses oleh praktisi yang menangani Anda."})]}),e.jsxs("details",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm rounded-2xl border border-indigo-100 dark:border-indigo-900/30 group transition-all duration-300",children:[e.jsxs("summary",{className:"p-6 cursor-pointer list-none flex items-center justify-between outline-none [&::-webkit-details-marker]:hidden",children:[e.jsxs("h3",{className:"text-lg font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2",children:[e.jsx("svg",{className:"w-5 h-5 text-indigo-600 dark:text-indigo-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})}),"Standar Layanan"]}),e.jsx("svg",{className:"w-5 h-5 text-indigo-600 dark:text-indigo-400 group-open:rotate-180 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 9l-7 7-7-7"})})]}),e.jsx("div",{className:"px-6 pb-6 border-t border-indigo-100 dark:border-indigo-900/30 pt-4 animate-fade-in-up",children:e.jsx(I,{href:route("agreement.show"),className:"text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline",children:"Lihat Standar Perjanjian Layanan (PDF)"})})]})]}),g===1&&e.jsxs("div",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden animate-fade-in-up",children:[e.jsx("div",{className:"bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white",children:e.jsx("h3",{className:"text-lg font-black uppercase tracking-tighter",children:"1. Kebijakan Privasi & Data"})}),e.jsxs("div",{className:"p-6 space-y-4",children:[e.jsx("div",{className:"bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-100 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative",children:e.jsx(M,{})}),e.jsxs("label",{className:`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer border-2 ${r.agree_privacy?"bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800":"bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800"}`,children:[e.jsx("input",{type:"checkbox",checked:r.agree_privacy,onChange:a=>i("agree_privacy",a.target.checked),className:"w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"}),e.jsx("span",{className:`text-xs font-bold ${r.agree_privacy?"text-indigo-900 dark:text-indigo-200":"text-gray-600 dark:text-gray-400"}`,children:"Saya telah membaca dan menyetujui pengolahan data sesuai Kebijakan Privasi InDepth."})]})]}),e.jsx("div",{className:"p-6 bg-white dark:bg-gray-800 flex justify-end items-center border-t border-gray-100 dark:border-gray-800",children:e.jsx("button",{onClick:n,disabled:!r.agree_privacy,className:`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${r.agree_privacy?"bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg":"bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"}`,children:"Centang & Simpan"})})]}),g===2&&e.jsxs("div",{className:"space-y-8 animate-fade-in-up",children:[e.jsxs("div",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white",children:e.jsx("h3",{className:"text-lg font-black uppercase tracking-tighter",children:"2. Pilih Program Terapi"})}),e.jsxs("div",{className:"p-6",children:[s.is_vip_only?e.jsx("p",{className:"text-sm text-amber-600 dark:text-amber-400 font-bold mb-6",children:"⚠️ Berdasarkan hasil skrining, kondisi Anda memerlukan penanganan intensif (Paket VIP)."}):e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400 mb-6",children:["Kami merekomendasikan ",s.recommended==="hipnoterapi"?"Paket Hipnoterapi":"Paket Upgrade"," berdasarkan hasil skrining Anda."]}),e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:Object.values(s.packages).map(a=>e.jsxs("div",{className:`relative rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer flex flex-col ${r.package_type===a.id?"border-gold-500 bg-gold-50/50 dark:bg-gold-900/30 shadow-lg":s.is_vip_only&&a.id!=="vip"?"opacity-40 grayscale cursor-not-allowed":"border-gray-100 dark:border-gray-800 bg-white/40 dark:bg-gray-800/40 hover:border-gold-300"}`,onClick:()=>(!s.is_vip_only||a.id==="vip")&&i("package_type",a.id),children:[e.jsxs("div",{className:"flex justify-between items-start mb-4",children:[e.jsx("h4",{className:"font-black text-sm uppercase tracking-widest",children:a.name}),e.jsx("div",{className:`w-5 h-5 rounded-full border-2 flex items-center justify-center ${r.package_type===a.id?"border-gold-500 bg-gold-500":"border-gray-300"}`,children:r.package_type===a.id&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-white"})})]}),e.jsxs("div",{className:"mb-4",children:[a.original_price&&e.jsxs("div",{className:"text-[10px] text-gray-400 line-through",children:["Rp ",new Intl.NumberFormat("id-ID").format(a.original_price)]}),e.jsxs("p",{className:"text-xl font-black text-gold-600",children:["Rp ",new Intl.NumberFormat("id-ID").format(a.price)]}),e.jsx("p",{className:"text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest",children:"*Harga belum termasuk PPN 11%"})]}),e.jsx("p",{className:"text-[11px] font-medium text-gray-500 leading-relaxed",children:a.description})]},a.id))}),d.package_type&&e.jsx("p",{className:"text-xs font-bold text-red-600 mt-4 uppercase tracking-widest",children:d.package_type})]})]}),e.jsxs("div",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-gray-900 to-indigo-950 p-6 text-white",children:e.jsx("h3",{className:"text-lg font-black uppercase tracking-tighter",children:"3. Pilih Waktu Konsultasi"})}),e.jsxs("div",{className:"p-6",children:[e.jsx(L,{schedules:b,selectedScheduleId:r.schedule_id,onSelect:a=>i("schedule_id",a)}),d.schedule_id&&e.jsx("p",{className:"text-xs font-bold text-red-600 mt-4 uppercase tracking-widest",children:d.schedule_id})]}),e.jsxs("div",{className:"p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800",children:[e.jsx("button",{onClick:a=>{a.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),c(1)},className:"px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors",children:"Kembali"}),e.jsx("button",{onClick:o,disabled:!r.schedule_id,className:`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md ${r.schedule_id?"bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg":"bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"}`,children:"Simpan & Lanjut Pembayaran"})]})]})]}),g===3&&e.jsxs("div",{className:"space-y-8 animate-fade-in-up",children:[e.jsxs("div",{className:"bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm sm:rounded-2xl border border-red-100 dark:border-red-900/30 overflow-hidden",children:[e.jsx("div",{className:"bg-gradient-to-r from-red-700 to-rose-900 p-6 text-white",children:e.jsx("h3",{className:"text-lg font-black uppercase tracking-tighter",children:"4. Kebijakan Final & Non-Refund"})}),e.jsxs("div",{className:"p-6 space-y-6",children:[e.jsx("div",{className:"bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 h-[300px] md:h-[500px] overflow-y-auto custom-scrollbar font-serif leading-relaxed mb-6 shadow-inner relative",children:e.jsx(E,{})}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[{id:"agree_refund",label:"Setuju Kebijakan Non-Refund."},{id:"agree_final",label:"Pembayaran ini bersifat FINAL."},{id:"agree_access",label:"Layanan dimulai saat jadwal dikonfirmasi."},{id:"agree_chargeback",label:"Tidak akan mengajukan sengketa/chargeback."}].map(a=>e.jsxs("label",{className:`flex items-center gap-3 p-4 rounded-2xl transition-all cursor-pointer border-2 ${r[a.id]?"bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/40":"bg-gray-50 dark:bg-gray-800/30 border-gray-100 dark:border-gray-800"}`,children:[e.jsx("input",{type:"checkbox",checked:r[a.id],onChange:m=>i(a.id,m.target.checked),className:"w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"}),e.jsx("span",{className:`text-[11px] font-black uppercase tracking-tight ${r[a.id]?"text-red-900 dark:text-red-200":"text-gray-600 dark:text-gray-400"}`,children:a.label})]},a.id))})]}),e.jsx("div",{className:"p-6 bg-white dark:bg-gray-800 flex justify-between items-center border-t border-gray-100 dark:border-gray-800",children:e.jsx("button",{onClick:a=>{a.preventDefault(),window.scrollTo({top:0,behavior:"smooth"}),c(2)},className:"px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors",children:"Kembali"})})]}),e.jsxs("div",{className:"p-8 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/[0.08] shadow-2xl flex flex-col items-center gap-6",children:[(k.error||Object.keys(d).length>0)&&e.jsxs("div",{className:"w-full p-6 bg-red-500/10 border border-red-500/20 rounded-3xl",children:[e.jsx("p",{className:"text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-[0.2em] mb-2 text-center",children:"Terjadi Kesalahan"}),e.jsx("ul",{className:"text-[10px] font-bold text-red-500/80 list-disc list-inside space-y-1 text-center",children:Object.values(d).map((a,m)=>e.jsx("li",{children:a},m))})]}),e.jsx("button",{onClick:h,disabled:!r.schedule_id||!r.agree_privacy||!(r.agree_refund&&r.agree_final&&r.agree_access&&r.agree_chargeback)||t,className:`w-full max-w-md py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] text-sm transition-all shadow-2xl ${r.schedule_id&&r.agree_privacy&&r.agree_refund&&r.agree_final&&r.agree_access&&r.agree_chargeback?"bg-gradient-to-r from-red-600 via-rose-700 to-red-800 text-white hover:scale-[1.02] active:scale-[0.98] shadow-red-500/20":"bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed grayscale"}`,children:"KONFIRMASI & LANJUT PEMBAYARAN"}),e.jsx("p",{className:"text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-10 leading-relaxed",children:"Dengan menekan tombol di atas, Anda menyatakan persetujuan mutlak terhadap seluruh syarat dan ketentuan platform."})]})]})]})})]})}export{O as default};
