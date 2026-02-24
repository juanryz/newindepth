import React from 'react';

const PRIVACY_POLICY = {
    title: "KEBIJAKAN PRIVASI & DATA",
    updated: "24 Februari 2026",
    content: `InDepth Mental Wellness menghargai dan melindungi data pribadi setiap pengguna layanan kami, termasuk klien hipnoterapi, peserta seminar, siswa LMS, dan mitra affiliate.

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

Dengan menggunakan layanan kami, melakukan booking, mengikuti pelatihan, mendaftar sebagai affiliate, atau mengakses website, Anda dianggap telah membaca, memahami, dan menyetujui Kebijakan Privasi ini.`
};

export default function PrivacyPolicyContent() {
    return (
        <div className="space-y-4">
            <p className="font-bold text-gray-900 dark:text-white mb-4 italic uppercase text-xs">Terakhir diperbarui: {PRIVACY_POLICY.updated}</p>
            <div className="whitespace-pre-wrap">
                {PRIVACY_POLICY.content}
            </div>
        </div>
    );
}

export { PRIVACY_POLICY };
