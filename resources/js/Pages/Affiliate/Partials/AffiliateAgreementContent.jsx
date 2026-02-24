import React from 'react';

export default function AffiliateAgreementContent() {
    return (
        <div className="space-y-8 text-slate-800 dark:text-slate-300">
            <p className="italic underline underline-offset-4 decoration-indigo-200 dark:decoration-indigo-800/50 text-slate-700 dark:text-slate-300 font-medium">Perjanjian ini mengikat secara hukum antara InDepth Mental Wellness (“Perusahaan”) dan Mitra Affiliate (“Affiliate”). Dengan mendaftar dan mengaktifkan akun affiliate, Affiliate menyatakan telah membaca, memahami, dan menyetujui seluruh ketentuan di bawah ini tanpa keberatan.</p>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 1 – STATUS DAN RUANG LINGKUP</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <li>Affiliate adalah mitra promosi independen dan bukan: Karyawan, Agen resmi, Perwakilan hukum, Cabang resmi.</li>
                    <li>Affiliate tidak memiliki kewenangan membuat pernyataan yang mengikat atas nama Perusahaan.</li>
                </ol>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 2 – STRUKTUR KOMISI</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <li>Komisi ditetapkan sebesar <span className="font-black text-indigo-600">5%</span> dari nilai transaksi bersih (setelah diskon/pajak).</li>
                    <li>Komisi hanya berlaku untuk transaksi: Valid, Tidak direfund, Tidak dibatalkan, Tidak terindikasi fraud.</li>
                    <li>Perusahaan berhak melakukan audit transaksi kapan saja.</li>
                </ol>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3 text-red-600 dark:text-red-400">PASAL 3 – LARANGAN KERAS</h4>
                <p className="font-bold mb-2 uppercase tracking-wide text-[10px] text-slate-400">Affiliate dilarang keras:</p>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <li>Melakukan self-referral dalam bentuk apa pun.</li>
                    <li>Membuat akun palsu untuk menghasilkan komisi.</li>
                    <li>Menggunakan metode spam (email, WhatsApp, DM massal).</li>
                    <li>Menggunakan iklan berbayar dengan kata kunci merek resmi tanpa izin.</li>
                    <li>Mengaku sebagai terapis resmi atau staf InDepth.</li>
                    <li>Memberikan klaim kesembuhan medis.</li>
                    <li>Menjanjikan hasil terapi absolut.</li>
                    <li>Menyebarkan potongan video tanpa izin.</li>
                    <li>Melakukan black-hat SEO atau manipulasi tracking.</li>
                    <li>Menggunakan cookie stuffing atau teknik manipulatif lainnya.</li>
                </ol>
                <p className="mt-3 font-black text-red-600 dark:text-red-400 text-sm">Pelanggaran terhadap pasal ini dianggap pelanggaran berat.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 4 – AUDIT DAN PENANGGUHAN</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <li>Perusahaan berhak menahan komisi untuk proses verifikasi keaslian transaksi.</li>
                    <li>Perusahaan berhak meminta bukti metode promosi yang digunakan Affiliate.</li>
                    <li>Komisi dapat dibekukan hingga investigasi selesai dilakukan.</li>
                </ol>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 5 – SISTEM SANKSI BERTINGKAT</h4>
                <div className="space-y-4">
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <p className="font-black text-indigo-600 mb-1 flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            Tingkat 1 – Pelanggaran Ringan
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Contoh: Kesalahan klaim minor, tidak mencantumkan disclaimer. Sanksi: Peringatan tertulis, koreksi wajib dalam 3 hari.</p>
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <p className="font-black text-amber-600 mb-1 flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Tingkat 2 – Pelanggaran Sedang
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Contoh: Klaim berlebihan, promosi tidak etis, penyalahgunaan materi. Sanksi: Pembekuan komisi sementara, suspensi akun 7–30 hari, penghapusan komisi terkait.</p>
                    </div>
                    <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-red-100/30 dark:border-red-900/30 shadow-sm transition-all hover:shadow-md text-red-600">
                        <p className="font-black mb-1 flex items-center gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Tingkat 3 – Pelanggaran Berat
                        </p>
                        <p className="text-xs opacity-80">Contoh: Self-referral, fraud transaksi, spam massal, penyalahgunaan merek. Sanksi: Penonaktifan permanen, pembatalan seluruh komisi, blacklist, potensi tuntutan hukum.</p>
                    </div>
                </div>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 6 – PEMBATASAN TANGGUNG JAWAB</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 font-medium">
                    <li>Perusahaan tidak menjamin jumlah komisi, volume transaksi, atau stabilitas sistem tanpa gangguan teknis.</li>
                    <li>Tanggung jawab maksimal Perusahaan terbatas pada komisi yang belum dibayarkan secara sah.</li>
                </ol>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 7 – PEMUTUSAN SEPIHAK</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Perusahaan berhak menghentikan program affiliate atau akun affiliate kapan saja tanpa kewajiban memberikan alasan, terutama jika dianggap berisiko terhadap reputasi atau keamanan bisnis.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 8 – KLAUSUL GANTI RUGI (INDEMNITY)</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Affiliate setuju untuk membebaskan dan mengganti kerugian Perusahaan atas klaim akibat promosi affiliate, tuntutan klaim berlebihan, atau kerugian reputasi akibat tindakan affiliate.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 9 – LARANGAN PENCEMARAN NAMA BAIK</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Affiliate dilarang menyebarkan tuduhan tanpa putusan hukum tetap atau mengancam reputasi bisnis untuk menekan payout. Pelanggaran dapat diproses sesuai hukum yang berlaku.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 10 – FORCE MAJEURE</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Perusahaan tidak bertanggung jawab atas gangguan akibat bencana alam, gangguan server, kebijakan pemerintah, atau keadaan darurat lainnya.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 11 – PERUBAHAN PROGRAM</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Perusahaan berhak mengubah besaran komisi, struktur sistem, atau menghentikan program affiliate kapan pun. Perubahan berlaku sejak diumumkan.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 12 – DOMISILI HUKUM</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Sengketa diselesaikan melalui musyawarah. Jika tidak tercapai kesepakatan, para pihak sepakat memilih domisili hukum di Pengadilan Negeri Semarang.</p>
            </section>

            <section>
                <h4 className="font-black text-slate-950 dark:text-white border-b-2 border-indigo-100 dark:border-indigo-900/30 pb-2 mb-3">PASAL 13 – KEABSAHAN PERSETUJUAN ELEKTRONIK</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Dengan mencentang persetujuan digital: Affiliate menyetujui seluruh isi perjanjian, tunduk pada UU ITE, dan mengikat secara hukum seperti tanda tangan fisik.</p>
            </section>
        </div>
    );
}
