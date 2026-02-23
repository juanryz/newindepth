<!DOCTYPE html>
<html>

<head>
    <title>Pendaftaran Dikonfirmasi</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-w-xl mx-auto p-4 border rounded-lg bg-gray-50">
        <h2 style="color: #4F46E5;">Halo, {{ $booking->patient->name }}</h2>

        <p>Pembayaran Anda telah diterima dan bersifat <strong>FINAL</strong> sesuai kebijakan InDepth Mental Wellness.</p>
        
        <p>Transaksi ini tidak dapat dibatalkan dan tidak dapat direfund kecuali dalam kondisi <em>Force Majeure</em> yang ditentukan oleh penyelenggara.</p>

        <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
            <p style="margin-top: 0; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 8px;">Detail Reservasi:</p>
            <p><strong>Kode Booking:</strong> {{ $booking->booking_code }}</p>
            <p><strong>Terapis:</strong> {{ $booking->schedule->therapist->name }}</p>
            <p><strong>Tanggal:</strong>
                {{ \Carbon\Carbon::parse($booking->schedule->date)->translatedFormat('l, d F Y') }}</p>
            <p><strong>Waktu:</strong> {{ substr($booking->schedule->start_time, 0, 5) }} WIB</p>
        </div>

        <p>Dengan melakukan pembayaran, Anda telah:</p>
        <ul style="padding-left: 20px;">
            <li>Menyetujui Kebijakan Non-Refund</li>
            <li>Menyetujui Persetujuan Elektronik (UU ITE)</li>
            <li>Mengunci slot waktu / akses sistem / materi digital</li>
        </ul>

        <p>Mohon hadir tepat waktu sesuai dengan jadwal yang telah ditentukan. Simpan email ini sebagai bukti transaksi sah.</p>

        <p>Terima kasih,<br><strong>Team InDepth Mental Wellness</strong></p>
    </div>
</body>

</html>