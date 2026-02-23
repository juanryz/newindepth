import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AgreementDetail({ userModel }) {
    // Determine if we need to parse string JSON (just in case) or fallback to true if already signed
    let agreementData = null;
    if (typeof userModel.agreement_data === 'string') {
        try { agreementData = JSON.parse(userModel.agreement_data); } catch (e) { }
    } else if (userModel.agreement_data) {
        agreementData = userModel.agreement_data;
    }

    // Default data for legacy users
    if (!agreementData && userModel.agreement_signed_at) {
        agreementData = {
            cond_data_benar: true,
            cond_bukan_pengganti_medis: true,
            cond_sadar_penuh: true,
            cond_riwayat_penyakit: true,
            status_medis: 'Tidak (Data Legacy)',
            risk_hubungi_medis: true,
            risk_henti_sesi: true,
            doc_direkam: true,
            doc_hukum: true,
            konfirmasi_akhir: true,
            agree_1: true,
            agree_2: true,
            agree_3: true,
        };
    }

    const signedAt = userModel.agreement_signed_at
        ? new Date(userModel.agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
        : null;

    const signDateOnly = userModel.agreement_signed_at
        ? new Date(userModel.agreement_signed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '-';

    const CheckRow = ({ label, checked }) => (
        <div className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${checked ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'}`}>
            <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${checked ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                {checked ? '✓' : '×'}
            </span>
            <span className={checked ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-400 line-through'}>{label}</span>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-bold text-xl text-gray-800 dark:text-white leading-tight">Dokumen Persetujuan — {userModel.name}</h2>
            }
        >
            <Head title={`Dokumen Persetujuan — ${userModel.name}`} />

            <div className="py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* --- DOKUMEN 1: PERNYATAAN AWAL --- */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800">
                        <div className="bg-indigo-700 text-white p-6 text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Dokumen 1 dari 2</span>
                            <h1 className="text-xl font-black tracking-tight mt-1">Form Pernyataan Awal & Persetujuan Layanan</h1>
                        </div>

                        <div className="p-8 sm:p-10 space-y-8">
                            {/* Patient Info Summary */}
                            <div className="flex flex-wrap gap-8 text-sm pb-6 border-b border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nama Klien</p>
                                    <p className="font-bold text-gray-900 dark:text-white uppercase">{userModel.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waktu Penandatanganan</p>
                                    <p className="font-bold text-gray-900 dark:text-white">{signedAt || '-'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <section>
                                        <h3 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">1</span>
                                            Kondisi Pribadi
                                        </h3>
                                        <div className="space-y-2">
                                            <CheckRow label="Data screening benar" checked={agreementData?.cond_data_benar} />
                                            <CheckRow label="Bukan pengganti medis darurat" checked={agreementData?.cond_bukan_pengganti_medis} />
                                            <CheckRow label="Sadar penuh & bebas zat" checked={agreementData?.cond_sadar_penuh} />
                                            <CheckRow label="Kesadaran risiko riwayat penyakit" checked={agreementData?.cond_riwayat_penyakit} />
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">2</span>
                                            Status Perawatan Medis
                                        </h3>
                                        <div className={`p-4 rounded-xl border text-sm font-bold ${agreementData?.status_medis === 'Ya' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' : 'border-green-200 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'}`}>
                                            Sedang dalam perawatan: {agreementData?.status_medis || '-'}
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <section>
                                        <h3 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">3</span>
                                            Risiko & Dokumentasi
                                        </h3>
                                        <div className="space-y-2">
                                            <CheckRow label="Izin hubungi medis darurat" checked={agreementData?.risk_hubungi_medis} />
                                            <CheckRow label="Sesi dapat dihentikan demi keselamatan" checked={agreementData?.risk_henti_sesi} />
                                            <CheckRow label="Sesi direkam (Dokumentasi Hukum)" checked={agreementData?.doc_direkam} />
                                            <CheckRow label="Kerahasiaan rekaman terjamin" checked={agreementData?.doc_hukum} />
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">4</span>
                                            Konfirmasi Akhir
                                        </h3>
                                        <CheckRow label="Telah memahami seluruh pernyataan" checked={agreementData?.konfirmasi_akhir} />
                                    </section>
                                </div>
                            </div>

                            {/* Signature for Doc 1 */}
                            <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tanda Tangan Digital Klien (1)</p>
                                    <div className="h-24 w-48 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 mb-2 flex items-center justify-center">
                                        {agreementData?.signature_1 ? (
                                            <img src={agreementData.signature_1} alt="Signature 1" className="h-full object-contain dark:invert" />
                                        ) : userModel.digital_signature ? (
                                            <img src={userModel.digital_signature} alt="Signature" className="h-full object-contain dark:invert" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 tracking-tighter italic">Digitally Signed via InDepth Auth</span>
                                        )}
                                    </div>
                                    <p className="text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest">{userModel.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page Break for Printing */}
                    <div className="print:page-break-after-always"></div>

                    {/* --- DOKUMEN 2: SURAT PERJANJIAN LAYANAN --- */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800">
                        <div className="bg-gray-800 text-white p-6 text-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Dokumen 2 dari 2</span>
                            <h1 className="text-xl font-black tracking-tight mt-1 uppercase">Surat Perjanjian Layanan Hipnoterapi</h1>
                        </div>

                        <div className="p-8 sm:p-10 font-serif text-sm leading-relaxed text-gray-800 dark:text-gray-300 space-y-6">
                            <div className="text-center mb-8 not-serif">
                                <p className="font-bold text-gray-900 dark:text-white underline">SURAT PERJANJIAN LAYANAN</p>
                                <p className="text-xs text-gray-500">Nomor: ID/{userModel.id}/{new Date(userModel.agreement_signed_at).getTime()}</p>
                            </div>

                            <p>Saya yang bertanda tangan di bawah ini:</p>
                            <table className="w-full max-w-md ml-4 text-xs">
                                <tbody>
                                    <tr><td className="py-1 w-32 font-bold uppercase">Nama Lengkap</td><td className="py-1">: {userModel.name}</td></tr>
                                    <tr><td className="py-1 font-bold uppercase">Email</td><td className="py-1">: {userModel.email}</td></tr>
                                    <tr><td className="py-1 font-bold uppercase">Telepon</td><td className="py-1">: {userModel.phone || '-'}</td></tr>
                                </tbody>
                            </table>

                            <p>Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di <strong>InDepth Mental Wellness</strong> dengan ketentuan sebagai berikut:</p>

                            <div className="space-y-4">
                                <div>
                                    <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2">PASAL 1 - PERNYATAAN KESEHATAN</p>
                                    <p className="text-xs">Klien menyatakan seluruh data yang diberikan adalah benar. Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan. Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat.</p>
                                </div>

                                <div>
                                    <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2">PASAL 2 - DOKUMENTASI & TRANSPARANSI</p>
                                    <p className="text-xs">Seluruh sesi direkam audio dan video secara penuh untuk perlindungan hukum kedua pihak. Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi.</p>
                                </div>

                                <div>
                                    <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2">PASAL 3 - PEMBATALAN & NO-SHOW</p>
                                    <p className="text-xs">Setiap sesi berdurasi 2 jam. Keterlambatan maksimal 60 menit; Jika melewati batas tersebut, sesi dianggap hangus (No-Show) tanpa pengembalian dana.</p>
                                </div>

                                <div>
                                    <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2">PASAL 4 - KERAHASIAAN</p>
                                    <p className="text-xs">Seluruh informasi sesi bersifat rahasia tingkat tinggi. Klien dilarang menyebarkan informasi atau tuduhan publik tanpa putusan hukum tetap.</p>
                                </div>

                                <div>
                                    <p className="font-bold border-b border-gray-100 dark:border-gray-800 pb-1 mb-2">PASAL 5 - PENYELESAIAN SENGKETA</p>
                                    <p className="text-xs">Sengketa diselesaikan melalui musyawarah. Jika tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri setempat.</p>
                                </div>
                            </div>

                            <div className="pt-6 not-serif">
                                <section>
                                    <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Pernyataan Akhir Klien:</h3>
                                    <div className="space-y-2">
                                        <CheckRow label="Seluruh data benar dan lengkap" checked={agreementData?.agree_1} />
                                        <CheckRow label="Telah membaca dan memahami seluruh pasal" checked={agreementData?.agree_2} />
                                        <CheckRow label="Menyetujui seluruh ketentuan tanpa keberatan" checked={agreementData?.agree_3} />
                                    </div>
                                </section>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-12 not-serif">
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 mb-2">Semarang, {signDateOnly}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tanda Tangan Klien (2)</p>
                                    <div className="h-32 w-full bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 mb-2 flex items-center justify-center">
                                        {userModel.digital_signature ? (
                                            <img src={userModel.digital_signature} alt="Signature Main" className="h-full object-contain dark:invert" />
                                        ) : (
                                            <span className="text-[10px] text-gray-400 italic">Digitally Signed</span>
                                        )}
                                    </div>
                                    <p className="text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest">{userModel.name}</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500 mb-2">InDepth Mental Wellness</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Perwakilan Resmi</p>
                                    <div className="h-32 w-full flex items-center justify-center p-2 mb-2">
                                        <img src="/images/saiful-anam-signature.jpeg" alt="Signature Saiful Anam" className="h-full object-contain dark:invert opacity-80" />
                                    </div>
                                    <p className="text-xs font-black text-gray-900 dark:text-white underline uppercase tracking-widest">Saiful Anam</p>
                                    <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Direktur Utama</p>
                                </div>
                            </div>

                            <div className="pt-8 text-center opacity-30 text-[9px] uppercase font-black tracking-[0.3em]">
                                Validated via InDepth Mental Wellness Digital Authentication System
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center pt-4 print:hidden">
                        <button onClick={() => window.print()} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-xl shadow-gray-200/20 dark:shadow-none uppercase tracking-widest">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" /></svg>
                            Cetak PDF
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
