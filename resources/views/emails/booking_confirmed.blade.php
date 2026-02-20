<!DOCTYPE html>
<html>

<head>
    <title>Pendaftaran Dikonfirmasi</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-w-xl mx-auto p-4 border rounded-lg bg-gray-50">
        <h2 style="color: #4F46E5;">Halo, {{ $booking->patient->name }}</h2>

        <p>Berita baik! Pembayaran Anda telah kami terima dan pendaftaran sesi hipnoterapi Anda telah
            <strong>dikonfirmasi</strong>.</p>

        <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
            <p><strong>Kode Booking:</strong> {{ $booking->booking_code }}</p>
            <p><strong>Terapis:</strong> {{ $booking->schedule->therapist->name }}</p>
            <p><strong>Tanggal:</strong>
                {{ \Carbon\Carbon::parse($booking->schedule->date)->translatedFormat('l, d F Y') }}</p>
            <p><strong>Waktu:</strong> {{ substr($booking->schedule->start_time, 0, 5) }} WIB</p>
        </div>

        <p>Mohon hadir tepat waktu sesuai dengan jadwal yang telah ditentukan. Jika Anda memiliki pertanyaan lebih
            lanjut, silakan hubungi tim CS kami.</p>

        <p>Terima kasih,<br>Tim Klinik Hypnotherapy</p>
    </div>
</body>

</html>