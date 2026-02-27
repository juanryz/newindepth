<x-mail::message>
    # Sesi Terapi Selesai ✅

    Halo {{ $booking->patient->name }},

    Sesi terapi Anda hari ini telah selesai. Terima kasih telah mempercayakan kesehatan mental Anda kepada InDepth.

    **Apa selanjutnya?**
    Praktisi Anda mungkin telah meninggalkan catatan atau tugas (homework) untuk Anda. Anda dapat melihat rekaman sesi
    (jika tersedia) dan catatan tersebut di riwayat sesi Anda.

    <x-mail::button :url="route('bookings.history')">
        Lihat Catatan & Rekaman
    </x-mail::button>

    Semoga hari Anda menyenangkan dan penuh kedamaian.

    Salam hangat,<br>
    {{ config('app.name') }}
</x-mail::message>