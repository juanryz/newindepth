<!DOCTYPE html>
<html>

<head>
    <title>Pembayaran Ditolak</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-w-xl mx-auto p-4 border rounded-lg bg-gray-50">
        <h2 style="color: #DC2626;">Halo, {{ $transaction->user->name }}</h2>

        <p>Mohon maaf, bukti pembayaran yang Anda unggah untuk Invoice
            <strong>{{ $transaction->invoice_number }}</strong> telah kami tolak.</p>

        <div
            style="background-color: #FEF2F2; color: #991B1B; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #FCA5A5;">
            <p><strong>Alasan Penolakan:</strong><br>{{ $transaction->rejection_reason }}</p>
        </div>

        <p>Status booking Anda saat ini dikembalikan menjadi "Menunggu Pembayaran". Silakan periksa kembali bukti
            transfer Anda dan unggah ulang melalui dashboard akun Anda.</p>

        <p>Jika Anda merasa ini adalah sebuah kesalahan, silakan balas email ini atau hubungi tim CS kami.</p>

        <p>Terima kasih,<br>Tim Klinik Hypnotherapy</p>
    </div>
</body>

</html>