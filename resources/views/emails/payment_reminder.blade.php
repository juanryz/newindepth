<x-mail::message>
    # Segera Selesaikan Pembayaran ⏳

    Halo {{ $booking->patient->name }},

    Kami memperhatikan bahwa Anda masih memiliki reservasi yang **menunggu pembayaran**.

    Untuk memastikan jadwal Anda tidak dibatalkan otomatis oleh sistem, mohon segera lakukan pembayaran dan upload bukti
    transfer.

    **Detail Reservasi:**
    - **Kode Booking:** {{ $booking->booking_code }}
    - **Jadwal:** {{ \Carbon\Carbon::parse($booking->schedule->date)->format('d F Y') }} pukul
    {{ substr($booking->schedule->start_time, 0, 5) }} WIB

    <x-mail::button :url="route('payments.create', $booking->id)">
        Upload Bukti Pembayaran
    </x-mail::button>

    Jika Anda sudah melakukan pembayaran, mohon abaikan email ini.

    Terima kasih,<br>
    {{ config('app.name') }}
</x-mail::message>