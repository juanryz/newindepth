import React, { useRef, useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';

export default function ServiceAgreementForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasDrawn, setHasDrawn] = useState(false);

    // Form logic
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        digital_signature: user.digital_signature || '',
        agree_1: false,
        agree_2: false,
        agree_3: false,
    });

    const isSigned = !!user.agreement_signed_at;

    useEffect(() => {
        if (!isSigned && canvasRef.current && !hasDrawn) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, [isSigned, hasDrawn]);

    // Canvas drawing logic
    const startDrawing = (e) => {
        if (isSigned) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ctx.beginPath();
        ctx.moveTo(clientX - rect.left, clientY - rect.top);
        setIsDrawing(true);
        setHasDrawn(true);
    };

    const draw = (e) => {
        if (!isDrawing || isSigned) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        ctx.lineTo(clientX - rect.left, clientY - rect.top);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isSigned) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const signatureData = canvas.toDataURL('image/png');
        setData('digital_signature', signatureData);
    };

    const clearCanvas = () => {
        if (isSigned) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
        setData('digital_signature', '');
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.agreement.update'), {
            preserveScroll: true,
        });
    };

    const isAgreementComplete = data.agree_1 && data.agree_2 && data.agree_3 && hasDrawn;
    const signDate = isSigned ? new Date(user.agreement_signed_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black tracking-tight text-gray-950 dark:text-white pb-2 mb-4">
                    Surat Perjanjian Layanan Hipnoterapi
                </h2>
                {!isSigned && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md mb-6 border border-amber-200 dark:border-amber-900/30">
                        Mohon baca dan tanda tangani surat perjanjian ini untuk dapat menggunakan layanan.
                    </p>
                )}
            </header>

            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg text-sm text-gray-800 dark:text-gray-300 max-h-[500px] overflow-y-auto font-serif leading-relaxed mb-6 shadow-inner relative">

                {isSigned && (
                    <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-300 dark:border-green-800">
                        DITANDATANGANI PADA {signDate}
                    </div>
                )}

                <h3 className="text-center font-bold text-lg mb-2">SURAT PERJANJIAN LAYANAN HIPNOTERAPI</h3>
                <h4 className="text-center font-bold mb-8">InDepth Mental Wellness</h4>

                <p className="font-bold mb-2">PASAL 1 - IDENTITAS KLIEN</p>
                <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
                <table className="w-full mb-6">
                    <tbody>
                        <tr><td className="w-1/3 py-1">Nama Lengkap</td><td className="w-2/3 py-1">: {user.name}</td></tr>
                        <tr><td className="py-1">Usia</td><td className="py-1">: {user.age || '-'} Tahun</td></tr>
                        <tr><td className="py-1">Jenis Kelamin</td><td className="py-1">: {user.gender || '-'}</td></tr>
                        <tr><td className="py-1">Nomor Handphone Aktif</td><td className="py-1">: {user.phone || '-'}</td></tr>
                        <tr><td className="py-1">Email</td><td className="py-1">: {user.email}</td></tr>
                        <tr><td className="py-1">Nama Kontak Darurat</td><td className="py-1">: {user.emergency_contact_name || '-'}</td></tr>
                        <tr><td className="py-1">Hubungan dengan Klien</td><td className="py-1">: {user.emergency_contact_relation || '-'}</td></tr>
                        <tr><td className="py-1">Nomor Kontak Darurat</td><td className="py-1">: {user.emergency_contact_phone || '-'}</td></tr>
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

            <form onSubmit={submit} className="space-y-6">

                {!isSigned ? (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                        <p className="font-bold mb-4">PASAL 14 - PERNYATAAN AKHIR</p>

                        <div className="space-y-3 mb-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={data.agree_1} onChange={e => setData('agree_1', e.target.checked)} className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span>Saya menyatakan seluruh data benar dan lengkap.</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={data.agree_2} onChange={e => setData('agree_2', e.target.checked)} className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span>Saya telah membaca dan memahami seluruh isi perjanjian ini.</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input type="checkbox" checked={data.agree_3} onChange={e => setData('agree_3', e.target.checked)} className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <span>Saya menyetujui seluruh ketentuan tanpa keberatan.</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mt-8">
                            <div>
                                <p className="mb-2">Tanggal: {signDate}</p>
                                <p className="mb-2">Lokasi: InDepth Mental Wellness</p>
                                <p className="mb-2 font-bold mt-4 border-t pt-4">Tanda Tangan Klien:</p>

                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-gray-50 dark:bg-gray-700 relative group mx-auto" style={{ width: 300, height: 150 }}>
                                    <canvas
                                        ref={canvasRef}
                                        width={290}
                                        height={140}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseOut={stopDrawing}
                                        onTouchStart={startDrawing}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDrawing}
                                        className="cursor-crosshair w-full h-full touch-none dark:invert"
                                    />
                                    {!hasDrawn && (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-400 pointer-events-none">
                                            Tanda tangan di sini
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 flex justify-center gap-2">
                                    <button type="button" onClick={clearCanvas} className="text-xs text-red-600 hover:text-red-800 underline">Ulangi Tanda Tangan</button>
                                </div>
                                <p className="mt-3 font-semibold underline">{user.name}</p>
                            </div>

                            <div>
                                <p className="mb-2 invisible">Spacing</p>
                                <p className="mb-2 invisible">Spacing</p>
                                <p className="mb-2 font-bold mt-4 border-t pt-4">Tanda Tangan Perwakilan InDepth:</p>

                                <div className="flex items-center justify-center h-[150px]">
                                    {/* Simulated digital signature stamp */}
                                    <div className="transform -rotate-6 border-4 border-indigo-200 dark:border-indigo-800 p-2 rounded-lg opacity-80 mix-blend-multiply dark:mix-blend-normal">
                                        <span className="font-['Brush_Script_MT',cursive] text-4xl text-indigo-600 dark:text-indigo-400 block">S. Anam</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-semibold underline">Saiful Anam</p>
                                <p className="text-sm">Direktur Utama InDepth Mental Wellness</p>
                            </div>
                        </div>

                        <InputError className="mt-2 text-center" message={errors.digital_signature} />

                        <div className="flex justify-center mt-10 border-t pt-6">
                            <PrimaryButton disabled={processing || !isAgreementComplete} className="!bg-blue-600 hover:!bg-blue-500 !rounded-md !px-6 !py-2.5 !text-sm !tracking-widest !font-semibold !h-auto !shadow-none !uppercase w-full sm:w-auto justify-center">
                                Setujui & Tanda Tangani
                            </PrimaryButton>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-3 text-green-700 dark:text-green-500 mb-6 font-bold pb-4 border-b dark:border-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Perjanjian Telah Ditandatangani
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-gray-800 dark:text-gray-300">
                            <div>
                                <p className="mb-2 font-bold">Tanda Tangan Klien:</p>
                                <div className="flex justify-center h-[150px] items-center">
                                    <img src={user.digital_signature} alt="Tanda Tangan Klien" className="max-h-full mix-blend-multiply dark:invert dark:mix-blend-screen" />
                                </div>
                                <p className="mt-3 font-semibold underline">{user.name}</p>
                            </div>

                            <div>
                                <p className="mb-2 font-bold">Tanda Tangan Perwakilan InDepth:</p>
                                <div className="flex items-center justify-center h-[150px]">
                                    <div className="transform -rotate-6 border-4 border-indigo-200 dark:border-indigo-800 p-2 rounded-lg opacity-80 mix-blend-multiply dark:mix-blend-normal">
                                        <span className="font-['Brush_Script_MT',cursive] text-4xl text-indigo-600 dark:text-indigo-400 block">S. Anam</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-semibold underline">Saiful Anam</p>
                                <p className="text-sm">Direktur Utama InDepth Mental Wellness</p>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}
