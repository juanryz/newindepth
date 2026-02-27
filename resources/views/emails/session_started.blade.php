<x-mail::message>
    # Sesi Terapi Dimulai 🔴

    Halo {{ $booking->patient->name }},

    Sesi terapi Anda dengan **{{ $booking->therapist->name }}** telah dimulai oleh praktisi.

    Silakan segera masuk ke ruang sesi melalui dashboard Anda untuk memulai konsultasi.

    <x-mail::button :url="route('bookings.show', $booking->id)">
        Masuk ke Ruang Sesi
    </x-mail::button>

    Pastikan koneksi internet Anda stabil dan Anda berada di tempat yang tenang.

    Salam hangat,<br>
    {{ config('app.name') }}
</x-mail::message>