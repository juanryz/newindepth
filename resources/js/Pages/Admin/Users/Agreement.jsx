import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Agreement({ userModel }) {
    // Determine if we need to parse string JSON (just in case) or fallback to true if already signed
    let agreementData = null;
    if (typeof userModel.agreement_data === 'string') {
        try { agreementData = JSON.parse(userModel.agreement_data); } catch (e) { }
    } else if (userModel.agreement_data) {
        agreementData = userModel.agreement_data;
    }

    // If no data saved but already signed, we assume everything was checked (legacy data migration)
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
        };
    }
    const signedAt = userModel.agreement_signed_at
        ? new Date(userModel.agreement_signed_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
        : null;

    const CheckRow = ({ label, checked }) => (
        <div className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${checked ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'}`}>
            <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${checked ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                {checked ? '✓' : '×'}
            </span>
            <span className={checked ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 line-through'}>{label}</span>
        </div>
    );

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Detail Dokumen Persetujuan</h2>}>
            <Head title={`Dokumen Persetujuan — ${userModel.name}`} />
            <div className="py-12 bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* DOKUMEN 1: PERNYATAAN AWAL */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800">
                        <div className="bg-indigo-700 text-white p-8 text-center">
                            <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">DOKUMEN 1 DARI 3</p>
                            <h1 className="text-2xl font-black tracking-tight">Form Pernyataan Awal & Persetujuan Layanan</h1>
                        </div>

                        <div className="p-8 sm:p-10 space-y-8">
                            {/* Patient bio snippet */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pb-6 border-b border-gray-100 dark:border-gray-700">
                                {[['Nama', userModel.name], ['Email', userModel.email], ['Telepon', userModel.phone || '-'], ['Tgl TTD', signedAt || '-']].map(([l, v]) => (
                                    <div key={l}><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{l}</p><p className="font-semibold text-gray-900 dark:text-white">{v}</p></div>
                                ))}
                            </div>

                            <section>
                                <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">1</span>
                                    Pernyataan Kondisi
                                </h3>
                                <div className="space-y-2">
                                    <CheckRow label="Data yang diisi pada tahap screening adalah benar dan sesuai kondisi saat ini." checked={agreementData?.cond_data_benar} />
                                    <CheckRow label="Layanan hipnoterapi bukan pengganti pengobatan medis/psikiatri darurat." checked={agreementData?.cond_bukan_pengganti_medis} />
                                    <CheckRow label="Dalam kondisi sadar penuh dan tidak di bawah pengaruh alkohol/zat terlarang." checked={agreementData?.cond_sadar_penuh} />
                                    <CheckRow label="Riwayat penyakit jantung/saraf berat telah dipertimbangkan." checked={agreementData?.cond_riwayat_penyakit} />
                                </div>
                            </section>

                            <section>
                                <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center text-[10px]">2</span>
                                    Risiko & Dokumentasi
                                </h3>
                                <div className="space-y-2">
                                    <CheckRow label="Izin menghubungi layanan medis darurat jika diperlukan." checked={agreementData?.risk_hubungi_medis} />
                                    <CheckRow label="Persetujuan penghentian sesi demi keselamatan." checked={agreementData?.risk_henti_sesi} />
                                    <CheckRow label="Persetujuan sistem dokumentasi rekaman audio-visual InDepth." checked={agreementData?.doc_direkam} />
                                    <CheckRow label="Persetujuan pembukaan rekaman hanya untuk keperluan hukum." checked={agreementData?.doc_hukum} />
                                </div>
                            </section>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-8 flex flex-col items-end">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tanda Tangan Pernyataan Awal</p>
                                {agreementData?.signature_1 ? (
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3">
                                        <img src={agreementData.signature_1} alt="Signature 1" className="h-20 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" />
                                    </div>
                                ) : userModel.digital_signature ? (
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3">
                                        <img src={userModel.digital_signature} alt="Legacy Signature" className="h-20 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" />
                                    </div>
                                ) : <div className="h-20 w-48 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-[10px] text-gray-400 uppercase italic">Belum TTD</div>}
                                <p className="font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900">{userModel.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* DOKUMEN 2: SURAT PERJANJIAN LAYANAN */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none border border-gray-100 dark:border-gray-800">
                        <div className="bg-emerald-700 text-white p-8 text-center">
                            <p className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">DOKUMEN 2 DARI 3</p>
                            <h1 className="text-2xl font-black tracking-tight">Surat Perjanjian Layanan Hipnoterapi</h1>
                        </div>

                        <div className="p-8 sm:p-10 space-y-8 font-serif text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            <div className="text-center mb-8 not-serif">
                                <p className="font-bold text-gray-900 dark:text-white underline">SURAT PERJANJIAN LAYANAN</p>
                                <p className="text-xs text-gray-500">Nomor: ID/{userModel.id}/{userModel.agreement_signed_at ? new Date(userModel.agreement_signed_at).getTime() : 'N/A'}</p>
                            </div>

                            <p className="mb-4 font-bold">PASAL 1 - IDENTITAS KLIEN</p>
                            <table className="w-full mb-6 text-xs">
                                <tbody>
                                    <tr><td className="w-1/3 py-1 font-bold">Nama Lengkap</td><td className="w-2/3 py-1">: {userModel.name}</td></tr>
                                    <tr><td className="py-1 font-bold">Usia</td><td className="py-1">: {userModel.age || '-'} Tahun</td></tr>
                                    <tr><td className="py-1 font-bold">Jenis Kelamin</td><td className="py-1">: {userModel.gender || '-'}</td></tr>
                                    <tr><td className="py-1 font-bold">Nomor Handphone</td><td className="py-1">: {userModel.phone || '-'}</td></tr>
                                    <tr><td className="py-1 font-bold">Email</td><td className="py-1">: {userModel.email}</td></tr>
                                </tbody>
                            </table>
                            <p className="mb-6">Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di InDepth Mental Wellness.</p>

                            <div className="space-y-6">
                                <div>
                                    <p className="font-bold mb-1">PASAL 2 - BATAS USIA DAN WALI</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Usia dewasa hukum untuk menandatangani perjanjian ini adalah 21 (dua puluh satu) tahun.</li>
                                        <li>Klien di bawah 21 tahun wajib didampingi dan memperoleh persetujuan tertulis dari orang tua atau wali sah.</li>
                                        <li>Jika klien menyatakan telah mendapat izin wali namun datang sendiri, maka seluruh konsekuensi hukum atas pernyataan tersebut menjadi tanggung jawab klien dan walinya.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 3 - PERNYATAAN KESEHATAN DAN KEJUJURAN DATA</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Klien menyatakan seluruh data yang diberikan adalah benar.</li>
                                        <li>Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan.</li>
                                        <li>Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 4 - SISTEM DOKUMENTASI DAN TRANSPARANSI</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Seluruh sesi direkam audio dan video secara penuh.</li>
                                        <li>Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi.</li>
                                        <li>Rekaman hanya dibuka atas permintaan resmi aparat penegak hukum atau pengadilan.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 5 - KEADAAN DARURAT MEDIS</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Jika terjadi kondisi darurat medis pada klien, sesi dihentikan dan bantuan medis dipanggil.</li>
                                        <li>Rekaman tidak boleh dihentikan sampai klien meninggalkan ruangan bersama fasilitas kesehatan.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 7 - NO-SHOW DAN PEMBATALAN</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Setiap sesi berdurasi 2 jam, termasuk buffer 30 menit.</li>
                                        <li>Jika klien tidak hadir dalam 30 menit sejak jadwal dimulai, sesi dianggap sudah selesai dilaksanakan.</li>
                                        <li>Tidak ada refund atas keterlambatan atau No-Show.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 8 - NON-REFUND DAN HASIL TERAPI</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Hasil hipnoterapi bersifat individual dan tidak dapat dijamin secara absolut.</li>
                                        <li>Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1">PASAL 11 - KERAHASIAAN DAN LARANGAN PENCEMARAN NAMA BAIK</p>
                                    <ul className="list-disc pl-5 space-y-1 text-xs">
                                        <li>Seluruh informasi sesi bersifat rahasia.</li>
                                        <li>Klien dilarang menyebarkan informasi atau tuduhan tanpa putusan hukum tetap.</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-bold mb-1 uppercase">PASAL 14 - PERSETUJUAN AKHIR</p>
                                    <div className="space-y-2 not-serif">
                                        <CheckRow label="Klien menyatakan seluruh data benar dan lengkap." checked={agreementData?.agree_1} />
                                        <CheckRow label="Klien telah membaca dan memahami seluruh isi perjanjian (Pasal 1-13)." checked={agreementData?.agree_2} />
                                        <CheckRow label="Klien menyetujui seluruh ketentuan tanpa keberatan." checked={agreementData?.agree_3} />
                                    </div>
                                </div>
                            </div>

                            <p className="italic text-[10px] opacity-70 mt-4">
                                *Isi lengkap dokumen ini mencakup 13 Pasal lainnya termasuk Force Majeure, Pembatasan Tanggung Jawab, dan Penyelesaian Sengketa yang telah disetujui secara elektronik.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex flex-col items-center md:items-start">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pihak Pertama (Klien)</p>
                                    {userModel.digital_signature ? (
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-white/5 mb-3">
                                            <img src={userModel.digital_signature} alt="Main Signature" className="h-24 object-contain mix-blend-multiply dark:mix-blend-normal dark:invert" />
                                        </div>
                                    ) : <div className="h-24 w-48 border border-dashed border-gray-300 rounded-xl mb-3"></div>}
                                    <p className="font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900">{userModel.name}</p>
                                </div>
                                <div className="flex flex-col items-center md:items-end">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pihak Kedua (InDepth)</p>
                                    <div className="mb-3">
                                        <img src="/images/saiful-anam-signature.jpeg" alt="Saiful Anam" className="h-24 object-contain mix-blend-multiply dark:invert" />
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white tracking-widest text-[10px] uppercase border-b border-gray-900">Saiful Anam</p>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Direktur Utama InDepth</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DOKUMEN 3: KEBIJAKAN & PERJANJIAN TAMBAHAN */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="bg-amber-600 text-white p-8 text-center">
                            <p className="text-amber-200 text-[10px] font-black uppercase tracking-[0.2em] mb-2">DOKUMEN 3 DARI 3</p>
                            <h1 className="text-2xl font-black tracking-tight">Kebijakan & Perjanjian Tambahan</h1>
                        </div>

                        <div className="p-8 sm:p-10 space-y-6">
                            <CheckRow label="Kebijakan Privasi (Persetujuan pengelolaan data pribadi)" checked={agreementData?.privacy_policy || (!!agreementData && !agreementData.hasOwnProperty('privacy_policy'))} />
                            <CheckRow label="Kebijakan Non-Refund (Seluruh pembayaran bersifat final)" checked={agreementData?.refund_policy || (!!agreementData && !agreementData.hasOwnProperty('refund_policy'))} />
                            <CheckRow label="Perjanjian Afiliasi (Syarat komisi dan rujukan)" checked={agreementData?.affiliate_agreement || (!!agreementData && !agreementData.hasOwnProperty('affiliate_agreement'))} />
                            <CheckRow label="Perjanjian Produk Digital & Kelas (Hak akses e-learning)" checked={agreementData?.course_agreement || (!!agreementData && !agreementData.hasOwnProperty('course_agreement'))} />

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex flex-col sm:flex-row justify-between gap-2">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Status: Disetujui secara elektronik
                                </span>
                                <span>Waktu Persetujuan: {signedAt || 'Belum Disetujui'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Print Button */}
                    <div className="text-center pt-4 print:hidden">
                        <button onClick={() => window.print()} className="inline-flex items-center gap-3 px-10 py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-600 dark:hover:bg-gold-500 transition-all shadow-xl active:scale-95">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" /></svg>
                            Cetak Semua Dokumen
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
