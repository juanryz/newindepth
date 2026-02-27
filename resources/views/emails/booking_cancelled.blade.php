<x-mail::message>
    # Reservasi Dibatalkan

    Halo {{ $booking->patient->name }},

    Mohon maaf, reservasi Anda dengan kode **{{ $booking->booking_code }}** telah dibatalkan.

    **Detail Sesi Sebelumnya:**
    - **Terapis:** {{ $booking->therapist->name ?? 'Akan dihubungi Admin' }}
    - **Tanggal:** {{ \Carbon\Carbon::parse($booking->schedule->date)->translatedFormat('l, d F Y') }}
    - **Waktu:** {{ substr($booking->schedule->start_time, 0, 5) }} WIB

    Jika ini adalah kesalahan atau Anda ingin menjadwalkan ulang, silakan hubungi tim CS kami atau buat janji baru
    melalui dashboard.

    <x-mail::button :url="route('dashboard')">
        Ke Dashboard
    </x-mail::button>

    Terima kasih,<br>
    {{ config('app.name') }}
</x-mail::message>