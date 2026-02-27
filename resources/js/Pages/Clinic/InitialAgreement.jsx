import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

const severityColors = {
    'Ringan': 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    'Sedang': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'Berat Akut': 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    'Berat Kronis': 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    'High Risk': 'bg-red-200 text-red-900 dark:bg-red-900/60 dark:text-red-200',
};

export default function InitialAgreement({ userAge }) {
    const user = usePage().props.auth.user;
    const isUnder17 = userAge !== null && userAge < 17;
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

    const { data, setData, post, processing, transform, errors } = useForm({
        // Document 1 (Pernyataan Awal)
        cond_data_benar: false,
        cond_bukan_pengganti_medis: false,
        cond_sadar_penuh: false,
        cond_riwayat_penyakit: false,
        status_medis: '',
        izin_wali: !isUnder17,
        nama_wali: '',
        telepon_wali: '',
        risk_hubungi_medis: false,
        risk_henti_sesi: false,
        doc_direkam: false,
        doc_hukum: false,
        konfirmasi_akhir: false,
        signature_1: '', // Signature for Doc 1

        // Document 2 (Surat Perjanjian)
        agree_1: false,
        agree_2: false,
        agree_3: false,
        signature: '', // signature for Doc 2 (main)

        // Document 3 (Additional Policies)
        privacy_policy: false,
        refund_policy: false,
        affiliate_agreement: false,
        course_agreement: false,
    });

    const canvasRef1 = useRef(null);
    const [isDrawing1, setIsDrawing1] = useState(false);
    const [hasDrawn1, setHasDrawn1] = useState(false);

    const canvasRef2 = useRef(null);
    const [isDrawing2, setIsDrawing2] = useState(false);
    const [hasDrawn2, setHasDrawn2] = useState(false);

    // Canvas logic based on generalized refs
    const startDrawing = (e, ref, setDrawing, setDrawn) => {
        if (e.type === 'touchstart') {
            e.preventDefault();
        }
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Handle touch vs mouse coordinates
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setDrawing(true);
        setDrawn(true);
    };

    const draw = (e, ref, isDrawing) => {
        if (!isDrawing) return;
        e.preventDefault();
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = (e, ref, setDrawing, hasDrawn, signatureField) => {
        if (e && e.type === 'touchend') {
            // Optional: e.preventDefault() here might break link clicks or other interactions
        }
        setDrawing(false);
        const canvas = ref.current;
        if (canvas && hasDrawn) {
            setData(signatureField, canvas.toDataURL('image/png'));
        }
    };

    const clearCanvas = (ref, setDrawn, signatureField) => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setDrawn(false);
        setData(signatureField, '');
    };

    const [allChecked, setAllChecked] = useState(false);
    const [missingFields, setMissingFields] = useState([]);

    useEffect(() => {
        const isMedisSelected = data.status_medis !== '';
        let isWaliValid = true;
        if (isUnder17) {
            isWaliValid = data.izin_wali && data.nama_wali.trim() !== '' && data.telepon_wali.trim() !== '';
        }

        const requiredBools = [
            data.cond_data_benar, data.cond_bukan_pengganti_medis, data.cond_sadar_penuh, data.cond_riwayat_penyakit,
            data.risk_hubungi_medis, data.risk_henti_sesi, data.doc_direkam, data.doc_hukum, data.konfirmasi_akhir,
            data.agree_1, data.agree_2, data.agree_3,
            data.privacy_policy, data.refund_policy, data.affiliate_agreement, data.course_agreement
        ];
        const requiredCheckboxes = requiredBools.every(Boolean);

        const missing = [];
        // Doc 1
        if (!data.cond_data_benar) missing.push("Doc 1: Pernyataan kebenaran data");
        if (!data.cond_bukan_pengganti_medis) missing.push("Doc 1: Kondisi hipnoterapi bukan pengganti medis");
        if (!data.cond_sadar_penuh) missing.push("Doc 1: Kondisi sadar penuh");
        if (!data.cond_riwayat_penyakit) missing.push("Doc 1: Pertimbangan kondisi riwayat penyakit");
        if (!isMedisSelected) missing.push("Doc 1: Status Perawatan Medis");
        if (isUnder17) {
            if (!data.izin_wali) missing.push("Doc 1: Izin Wali");
            if (data.nama_wali.trim() === '') missing.push("Doc 1: Nama Wali");
            if (data.telepon_wali.trim() === '') missing.push("Doc 1: Telepon Wali");
        }
        if (!data.risk_hubungi_medis) missing.push("Doc 1: Risiko hubungi medis");
        if (!data.risk_henti_sesi) missing.push("Doc 1: Risiko henti sesi");
        if (!data.doc_direkam) missing.push("Doc 1: Persetujuan rekaman");
        if (!data.doc_hukum) missing.push("Doc 1: Persetujuan hukum");
        if (!data.konfirmasi_akhir) missing.push("Doc 1: Konfirmasi akhir");
        if (!hasDrawn1) missing.push("Doc 1: Tanda Tangan Pernyataan Awal");

        // Doc 2
        if (!data.agree_1) missing.push("Doc 2: Pernyataan kebenaran data (Pasal 14)");
        if (!data.agree_2) missing.push("Doc 2: Memahami isi perjanjian (Pasal 14)");
        if (!data.agree_3) missing.push("Doc 2: Menyetujui ketentuan tanpa keberatan (Pasal 14)");
        if (!hasDrawn2) missing.push("Doc 2: Tanda Tangan Surat Perjanjian");

        // Doc 3
        if (!data.privacy_policy) missing.push("Persetujuan Kebijakan Privasi");
        if (!data.refund_policy) missing.push("Persetujuan Kebijakan Non-Refund");
        if (!data.affiliate_agreement) missing.push("Persetujuan Perjanjian Afiliasi");
        if (!data.course_agreement) missing.push("Persetujuan Perjanjian Kelas/Produk Digital");

        const isProfileComplete = user?.age && user?.gender && user?.phone;
        setAllChecked(requiredCheckboxes && isMedisSelected && isWaliValid && hasDrawn1 && hasDrawn2 && isProfileComplete);
        setMissingFields(missing);
    }, [data, isUnder17, hasDrawn1, hasDrawn2]);

    const submit = (e) => {
        e.preventDefault();
        if (!allChecked || !hasDrawn1 || !hasDrawn2) return;

        transform((data) => ({
            agreement_data: data,
            signature: data.signature, // Use Doc2 signature as main the digital signature
        }));

        post(route('agreement.store'), {
            onError: (errs) => {
                console.error("Backend validation failed:", errs);
                if (errs && errs.agreement_data) {
                    setMissingFields([errs.agreement_data]);
                }
            }
        });
    };

    const CheckboxItem = ({ id, label, checked, onChange }) => (
        <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all ${checked ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 shadow-sm' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-indigo-300 dark:hover:border-indigo-600'}`}>
            <div className="pt-0.5">
                <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-indigo-600 rounded text-indigo-600 focus:ring-indigo-500" />
            </div>
            <span className={`text-base md:text-sm leading-relaxed ${checked ? 'font-bold' : 'text-gray-700 dark:text-gray-300'}`}>{label}</span>
        </label>
    );

    const signDate = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('dashboard')} className="p-2 -ml-2 text-gray-500 hover:text-gold-600 dark:text-gray-400 dark:hover:text-gold-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Dokumen Persetujuan Layanan</h2>
                </div>
            }
        >
            <Head title="Dokumen Persetujuan" />

            <div className="py-6 md:py-12 min-h-[calc(100dvh-64px)] bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">



                    <form onSubmit={submit} className="space-y-10">

                        {/* --- DOKUMEN 1: PERNYATAAN AWAL --- */}
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10">
                            <div className="mb-8 border-b pb-6 dark:border-gray-700 text-center">
                                <span className="inline-block py-1 px-3 text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3 rounded-full">DOKUMEN 1 DARI 2</span>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Form Pernyataan Awal & Persetujuan Layanan</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Harap baca dengan teliti dan centang seluruh pernyataan di bawah ini.</p>
                            </div>

                            <div className="space-y-10">
                                {/* Bagian 1 */}
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">1</span>
                                        Pernyataan Kondisi Pribadi
                                    </h4>
                                    <div className="space-y-3 pl-8">
                                        <CheckboxItem label="Saya menyatakan bahwa data yang saya isi pada tahap screening adalah benar dan sesuai dengan kondisi saya saat ini." checked={data.cond_data_benar} onChange={(val) => setData('cond_data_benar', val)} />
                                        <CheckboxItem label="Saya memahami bahwa layanan hipnoterapi ini bukan pengganti pengobatan medis/psikiatri darurat." checked={data.cond_bukan_pengganti_medis} onChange={(val) => setData('cond_bukan_pengganti_medis', val)} />
                                        <CheckboxItem label="Saya mengambil sesi ini dalam kondisi sadar penuh dan tidak sedang berada di bawah pengaruh alkohol atau zat terlarang." checked={data.cond_sadar_penuh} onChange={(val) => setData('cond_sadar_penuh', val)} />
                                        <CheckboxItem label="Telah mempertimbangkan riwayat penyakit jantung, gangguan saraf berat (termasuk epilepsi), atau kondisi medis serius lainnya (Tetap wajib dicentang sebagai bentuk kesadaran risiko)." checked={data.cond_riwayat_penyakit} onChange={(val) => setData('cond_riwayat_penyakit', val)} />
                                    </div>
                                </section>

                                {/* Bagian 2 */}
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">2</span>
                                        Status Perawatan Medis
                                    </h4>
                                    <div className="pl-8">
                                        <p className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Apakah Anda masih rutin mengonsumsi obat psikiater atau menjalani perawatan medis berlanjut?</p>
                                        <div className="flex gap-4">
                                            <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer flex-1 justify-center transition-colors ${data.status_medis === 'Ya' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}>
                                                <input type="radio" name="status_medis" value="Ya" checked={data.status_medis === 'Ya'} onChange={() => setData('status_medis', 'Ya')} className="accent-indigo-600" />
                                                <span className="text-sm font-medium">Ya, masih berjalan</span>
                                            </label>
                                            <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer flex-1 justify-center transition-colors ${data.status_medis === 'Tidak' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}>
                                                <input type="radio" name="status_medis" value="Tidak" checked={data.status_medis === 'Tidak'} onChange={() => setData('status_medis', 'Tidak')} className="accent-indigo-600" />
                                                <span className="text-sm font-medium">Tidak</span>
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                {/* Bagian 3: Wali (Only if under 17) */}
                                {isUnder17 && (
                                    <section className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-5 rounded-2xl">
                                        <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-500 mb-4 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-sm">3</span>
                                            Persetujuan Wali (Bawah Umur)
                                        </h4>
                                        <div className="space-y-4 pl-8">
                                            <CheckboxItem label="Saya menyatakan telah memperoleh izin dari orang tua / wali yang sah untuk mengikuti sesi ini." checked={data.izin_wali} onChange={(val) => setData('izin_wali', val)} />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Wali Sah</label>
                                                    <input type="text" value={data.nama_wali} onChange={e => setData('nama_wali', e.target.value)} className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-base md:text-sm focus:ring-amber-500 focus:border-amber-500" placeholder="Contoh: Budi Santoso" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nomor Telepon Wali</label>
                                                    <input type="text" value={data.telepon_wali} onChange={e => setData('telepon_wali', e.target.value)} className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-base md:text-sm focus:ring-amber-500 focus:border-amber-500" placeholder="08xxxxxxxxxx" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Bagian 4 / 3 */}
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '4' : '3'}</span>
                                        Pernyataan Risiko & Darurat Layanan
                                    </h4>
                                    <div className="space-y-3 pl-8">
                                        <CheckboxItem label="Jika saya mengalami kondisi darurat medis (sepsis, serangan jantung, kejang, dll) selama sesi berlangsung, saya mengizinkan tim InDepth menghubungi layanan darurat medis terdekat." checked={data.risk_hubungi_medis} onChange={(val) => setData('risk_hubungi_medis', val)} />
                                        <CheckboxItem label="Saya memahami sesi dapat dihentikan sewaktu-waktu oleh terapis demi keselamatan jika indikasi medis darurat terjadi." checked={data.risk_henti_sesi} onChange={(val) => setData('risk_henti_sesi', val)} />
                                    </div>
                                </section>

                                {/* Bagian 5 / 4 */}
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '5' : '4'}</span>
                                        Persetujuan Sistem Dokumentasi InDepth
                                    </h4>
                                    <div className="space-y-3 pl-8">
                                        <CheckboxItem label="Saya memahami bahwa sesi akan direkam untuk tujuan dokumentasi dan perlindungan hukum, serta ditampilkan visualnya di ruang tunggu tanpa audio." checked={data.doc_direkam} onChange={(val) => setData('doc_direkam', val)} />
                                        <CheckboxItem label="Saya memahami bahwa rekaman hanya dibuka jika diperlukan secara hukum." checked={data.doc_hukum} onChange={(val) => setData('doc_hukum', val)} />
                                    </div>
                                </section>

                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '6' : '5'}</span>
                                        Konfirmasi Akhir
                                    </h4>
                                    <div className="space-y-3 pl-8">
                                        <CheckboxItem label="Saya telah membaca dan memahami seluruh pernyataan di atas dan setuju untuk melanjutkan ke proses booking." checked={data.konfirmasi_akhir} onChange={(val) => setData('konfirmasi_akhir', val)} />
                                    </div>
                                </section>

                                {/* Signature 1 */}
                                <section>
                                    <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center text-sm">{isUnder17 ? '7' : '6'}</span>
                                        Tanda Tangan Digital (Pernyataan Awal)
                                    </h4>
                                    <div className="pl-8">
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-1 bg-gray-50 dark:bg-gray-900 shadow-inner relative group mx-auto md:mx-0" style={{ maxWidth: 400, height: 180 }}>
                                            <canvas
                                                ref={canvasRef1}
                                                width={390}
                                                height={170}
                                                onMouseDown={(e) => startDrawing(e, canvasRef1, setIsDrawing1, setHasDrawn1)}
                                                onMouseMove={(e) => draw(e, canvasRef1, isDrawing1)}
                                                onMouseUp={(e) => stopDrawing(e, canvasRef1, setIsDrawing1, hasDrawn1, 'signature_1')}
                                                onMouseOut={(e) => stopDrawing(e, canvasRef1, setIsDrawing1, hasDrawn1, 'signature_1')}
                                                onTouchStart={(e) => startDrawing(e, canvasRef1, setIsDrawing1, setHasDrawn1)}
                                                onTouchMove={(e) => draw(e, canvasRef1, isDrawing1)}
                                                onTouchEnd={(e) => stopDrawing(e, canvasRef1, setIsDrawing1, hasDrawn1, 'signature_1')}
                                                className="cursor-crosshair w-full h-full touch-none dark:invert"
                                            />
                                            {!hasDrawn1 && (
                                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 pointer-events-none text-xs font-medium uppercase tracking-widest">
                                                    Tanda tangan di sini
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <button type="button" onClick={() => clearCanvas(canvasRef1, setHasDrawn1, 'signature_1')} className="text-xs text-red-600 font-bold hover:text-red-800 underline transition-colors">
                                                Hapus & Ulangi Tanda Tangan
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* --- DOKUMEN 2: SURAT PERJANJIAN LAYANAN --- */}
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10">
                            <div className="mb-4 border-b pb-6 dark:border-gray-700 text-center">
                                <span className="inline-block py-1 px-3 text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 mb-3 rounded-full">DOKUMEN 2 DARI 2</span>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">SURAT PERJANJIAN LAYANAN HIPNOTERAPI</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">InDepth Mental Wellness</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-100 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-6 shadow-inner relative">
                                <p className="font-bold mb-2">PASAL 1 - IDENTITAS KLIEN</p>
                                {(!user.age || !user.gender || !user.phone) && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            <div>
                                                <p className="font-bold">Profil Belum Lengkap</p>
                                                <p className="text-sm mt-1 mb-3">Anda harus melengkapi data profil (Usia, Jenis Kelamin, Nomor Handphone) sebelum dapat menyetujui dokumen ini.</p>
                                                <a href={route('profile.edit')} className="inline-flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors">
                                                    Ke Halaman Edit Profil
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
                                <table className="w-full mb-6">
                                    <tbody>
                                        <tr><td className="w-1/3 py-1">Nama Lengkap</td><td className="w-2/3 py-1">: {user.name}</td></tr>
                                        <tr><td className="py-1">Usia</td><td className="py-1">: {user.age || '-'} Tahun</td></tr>
                                        <tr><td className="py-1">Jenis Kelamin</td><td className="py-1">: {user.gender || '-'}</td></tr>
                                        <tr><td className="py-1">Nomor Handphone Aktif</td><td className="py-1">: {user.phone || '-'}</td></tr>
                                        <tr><td className="py-1">Email</td><td className="py-1">: {user.email}</td></tr>
                                    </tbody>
                                </table>
                                <p className="mb-6">Dengan ini menyatakan secara sadar, tanpa tekanan, tanpa paksaan, dan dalam kondisi mental stabil menyetujui mengikuti layanan hipnoterapi di InDepth Mental Wellness.</p>

                                <p className="font-bold mb-2">PASAL 2 - BATAS USIA DAN WALI</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Usia dewasa hukum untuk menandatangani perjanjian ini adalah 21 (dua puluh satu) tahun.</li>
                                    <li>Klien di bawah 21 tahun wajib didampingi dan memperoleh persetujuan tertulis dari orang tua atau wali sah.</li>
                                    <li>Jika klien menyatakan telah mendapat izin wali namun datang sendiri, maka seluruh konsekuensi hukum atas pernyataan tersebut menjadi tanggung jawab klien dan walinya.</li>
                                    <li>Pendamping yang hadir bertindak sebagai saksi dan penanggung jawab selama berada di lokasi.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 3 - PERNYATAAN KESEHATAN DAN KEJUJURAN DATA</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Klien menyatakan seluruh data yang diberikan adalah benar.</li>
                                    <li>Klien wajib mengungkapkan kondisi medis, psikiatri, dan riwayat kesehatan yang relevan.</li>
                                    <li>Penyembunyian informasi kesehatan yang berdampak pada sesi menjadi tanggung jawab penuh klien.</li>
                                    <li>Layanan hipnoterapi bukan tindakan medis dan bukan pengganti penanganan medis darurat.</li>
                                    <li>Jika klien masih menjalani perawatan medis/psikologis, layanan ini bersifat komplementer.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 4 - SISTEM DOKUMENTASI DAN TRANSPARANSI</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Seluruh sesi direkam audio dan video secara penuh.</li>
                                    <li>Visual sesi dapat ditampilkan di ruang tunggu tanpa audio sebagai bentuk transparansi.</li>
                                    <li>Rekaman disimpan untuk perlindungan hukum kedua pihak.</li>
                                    <li>Rekaman hanya dibuka atas permintaan resmi aparat penegak hukum atau pengadilan.</li>
                                    <li>Setelah masa simpan tertentu, rekaman dapat dianonimkan untuk kepentingan akademik.</li>
                                    <li>Klien menyetujui sistem dokumentasi ini tanpa keberatan.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 5 - KEADAAN DARURAT MEDIS</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Jika terjadi kondisi darurat medis pada klien, sesi dihentikan dan bantuan medis dipanggil.</li>
                                    <li>Rekaman tidak boleh dihentikan sampai klien meninggalkan ruangan bersama fasilitas kesehatan.</li>
                                    <li>Jika hipnoterapis mengalami kondisi medis mendadak, sesi dijadwalkan ulang tanpa biaya tambahan.</li>
                                    <li>Jika terjadi kematian akibat kondisi medis murni tanpa unsur kelalaian atau kekerasan, kedua pihak sepakat untuk tidak saling menuntut.</li>
                                    <li>Ruangan dilengkapi timer digital sebagai penanda waktu yang tidak dapat dimanipulasi.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 6 - KEWAJIBAN KLIEN</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Klien wajib mengikuti instruksi hipnoterapis selama sesi berlangsung.</li>
                                    <li>Klien dilarang membawa senjata atau benda berbahaya.</li>
                                    <li>Klien tidak boleh berada di bawah pengaruh alkohol atau narkotika saat sesi.</li>
                                    <li>Pelanggaran ketentuan ini dapat menyebabkan sesi dihentikan tanpa pengembalian dana.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 7 - NO-SHOW DAN PEMBATALAN</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Setiap sesi berdurasi 2 jam, termasuk buffer 30 menit.</li>
                                    <li>Jika klien tidak hadir dalam 30 menit sejak jadwal hipnoterapi dimulai, sesi dianggap sudah selesai dilaksanakan.</li>
                                    <li>Tidak ada refund atas keterlambatan atau No-Show.</li>
                                    <li>Pembatalan hanya dapat dilakukan maksimal 24 jam sebelum jadwal.</li>
                                    <li>Pembatalan di luar batas waktu tidak dapat direfund.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 8 - NON-REFUND DAN HASIL TERAPI</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Hasil hipnoterapi bersifat individual dan tidak dapat dijamin secara absolut.</li>
                                    <li>Ketidakpuasan subjektif tidak menjadi dasar pengembalian dana.</li>
                                    <li>Tidak ada klaim pengembalian dana setelah sesi berjalan sesuai jadwal.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 9 - FORCE MAJEURE</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>InDepth tidak bertanggung jawab atas gangguan akibat: Bencana alam, Gangguan listrik/jaringan, Kebijakan pemerintah, Kerusuhan, Kondisi darurat di luar kendali manusia.</li>
                                    <li>Dalam kondisi tersebut sesi dapat dijadwalkan ulang tanpa penalti.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 10 - PEMBATASAN TANGGUNG JAWAB</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Apabila terdapat kelalaian yang terbukti secara hukum dari pihak InDepth, maka tanggung jawab maksimal tidak melebihi biaya layanan sesi tersebut.</li>
                                    <li>Tidak ada tanggung jawab atas kerugian tidak langsung, immaterial, atau kerugian lanjutan.</li>
                                    <li>Jika akun dihapus dengan alasan apa pun, akun yang sudah terhapus tidak dapat melakukan klaim apa pun atau tuntutan ke InDepth.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 11 - KERAHASIAAN DAN LARANGAN PENCEMARAN NAMA BAIK</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Seluruh informasi sesi bersifat rahasia.</li>
                                    <li>Klien dilarang menyebarkan informasi atau tuduhan tanpa putusan hukum tetap.</li>
                                    <li>Tuduhan publik tanpa dasar hukum dapat diproses sesuai peraturan perundang-undangan yang berlaku.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 12 - PENYELESAIAN SENGKETA</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Sengketa diselesaikan melalui musyawarah terlebih dahulu.</li>
                                    <li>Jika tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri Semarang.</li>
                                    <li>Biaya perkara ditanggung oleh pihak yang dinyatakan kalah.</li>
                                </ul>

                                <p className="font-bold mb-2">PASAL 13 - KEABSAHAN TANDA TANGAN ELEKTRONIK</p>
                                <ul className="list-disc pl-5 mb-6 space-y-1">
                                    <li>Perjanjian ini sah baik ditandatangani secara fisik maupun elektronik.</li>
                                    <li>Persetujuan elektronik tunduk pada UU ITE dan memiliki kekuatan hukum yang sama dengan tanda tangan basah.</li>
                                </ul>
                            </div>

                            <p className="font-bold mb-4 text-gray-900 dark:text-gray-100">PASAL 14 - PERNYATAAN AKHIR</p>
                            <div className="space-y-3 mb-6">
                                <CheckboxItem label="Saya menyatakan seluruh data benar dan lengkap." checked={data.agree_1} onChange={e => setData('agree_1', e)} />
                                <CheckboxItem label="Saya telah membaca dan memahami seluruh isi perjanjian ini." checked={data.agree_2} onChange={e => setData('agree_2', e)} />
                                <CheckboxItem label="Saya menyetujui seluruh ketentuan tanpa keberatan." checked={data.agree_3} onChange={e => setData('agree_3', e)} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mt-8 text-gray-900 dark:text-gray-200">
                                <div>
                                    <p className="mb-2">Tanggal: {signDate}</p>
                                    <p className="mb-2">Lokasi: InDepth Mental Wellness</p>
                                    <p className="mb-2 font-bold mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">Tanda Tangan Klien:</p>

                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-gray-50 dark:bg-gray-700 relative group mx-auto" style={{ width: 300, height: 150 }}>
                                        <canvas
                                            ref={canvasRef2}
                                            width={290}
                                            height={140}
                                            onMouseDown={(e) => startDrawing(e, canvasRef2, setIsDrawing2, setHasDrawn2)}
                                            onMouseMove={(e) => draw(e, canvasRef2, isDrawing2)}
                                            onMouseUp={(e) => stopDrawing(e, canvasRef2, setIsDrawing2, hasDrawn2, 'signature')}
                                            onMouseOut={(e) => stopDrawing(e, canvasRef2, setIsDrawing2, hasDrawn2, 'signature')}
                                            onTouchStart={(e) => startDrawing(e, canvasRef2, setIsDrawing2, setHasDrawn2)}
                                            onTouchMove={(e) => draw(e, canvasRef2, isDrawing2)}
                                            onTouchEnd={(e) => stopDrawing(e, canvasRef2, setIsDrawing2, hasDrawn2, 'signature')}
                                            className="cursor-crosshair w-full h-full touch-none dark:invert"
                                        />
                                        {!hasDrawn2 && (
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-400 pointer-events-none text-xs font-medium uppercase tracking-widest">
                                                Tanda tangan di sini
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 flex justify-center gap-2">
                                        <button type="button" onClick={() => clearCanvas(canvasRef2, setHasDrawn2, 'signature')} className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline">Ulangi Tanda Tangan</button>
                                    </div>
                                    <p className="mt-3 font-semibold underline">{user.name}</p>
                                </div>

                                <div>
                                    <p className="mb-2 invisible">Spacing</p>
                                    <p className="mb-2 invisible">Spacing</p>
                                    <p className="mb-2 font-bold mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">Tanda Tangan Perwakilan InDepth:</p>

                                    <div className="flex items-center justify-center h-[150px]">
                                        <img src="/images/saiful-anam-signature.jpeg" alt="Tanda Tangan Saiful Anam" className="h-[120px] object-contain mix-blend-multiply dark:mix-blend-normal dark:invert opacity-90" />
                                    </div>
                                    <p className="mt-4 font-semibold underline">Saiful Anam</p>
                                    <p className="text-sm dark:text-gray-300">Direktur Utama InDepth Mental Wellness</p>
                                </div>
                            </div>

                        </div>

                        {/* --- DOKUMEN 3: KEBIJAKAN & PERJANJIAN TAMBAHAN --- */}
                        <div className="bg-white dark:bg-gray-800/60 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 rounded-2xl shadow-lg p-6 sm:p-10">
                            <div className="mb-8 border-b pb-6 dark:border-gray-700 text-center">
                                <span className="inline-block py-1 px-3 text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 mb-3 rounded-full">DOKUMEN 3 DARI 3</span>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Kebijakan & Perjanjian Tambahan</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Persetujuan untuk operasional, layanan afiliasi, dan produk digital.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-sm">
                                    <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">1. Kebijakan Privasi</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">Saya menyetujui InDepth mengelola data pribadi saya sesuai kebijakan privasi untuk kepentingan layanan, riset internal, dan dokumentasi hukum.</p>
                                    <CheckboxItem label="Saya menyetujui Kebijakan Privasi." checked={data.privacy_policy} onChange={e => setData('privacy_policy', e)} />
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-sm">
                                    <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">2. Kebijakan Non-Refund</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">Sesuai Pasal 8, saya memahami bahwa seluruh pembayaran yang telah dilakukan bersifat final dan tidak dapat dikembalikan (non-refundable) apapun alasannya.</p>
                                    <CheckboxItem label="Saya menyetujui Kebijakan Non-Refund." checked={data.refund_policy} onChange={e => setData('refund_policy', e)} />
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-sm">
                                    <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">3. Perjanjian Afiliasi</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">Jika saya merujuk orang lain ke InDepth, saya menyetujui syarat & ketentuan komisi afiliasi yang berlaku di platform ini.</p>
                                    <CheckboxItem label="Saya menyetujui Syarat & Ketentuan Afiliasi." checked={data.affiliate_agreement} onChange={e => setData('affiliate_agreement', e)} />
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 text-sm">
                                    <h4 className="font-bold mb-2 text-gray-900 dark:text-gray-100">4. Perjanjian Produk Digital & Kelas</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">Akses ke materi e-learning dan kelas digital bersifat personal dan tidak boleh disebarluaskan atau digandakan tanpa izin tertulis.</p>
                                    <CheckboxItem label="Saya menyetujui Ketentuan Produk Digital & Kelas." checked={data.course_agreement} onChange={e => setData('course_agreement', e)} />
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 mt-10">
                            {!allChecked && missingFields.length > 0 && (
                                <div className="mb-6 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 shadow-sm">
                                    <p className="font-bold mb-2 text-base text-red-700 flex items-center gap-2">
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        Tidak dapat melanjutkan, masih ada {missingFields.length} bagian yang belum terisi/tercentang:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-2 font-medium">
                                        {missingFields.map((field, index) => (
                                            <li key={index}>{field}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <PrimaryButton
                                type="submit"
                                className={`w-full h-14 text-lg justify-center shadow-lg transition-all ${allChecked ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 opacity-70 cursor-pointer'}`}
                                disabled={processing}
                            >
                                Setujui Dokumen
                            </PrimaryButton>
                        </div>
                    </form>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
