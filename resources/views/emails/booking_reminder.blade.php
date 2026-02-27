<x-mail::message>
    # Pengingat Sesi Terapi (2 Jam Lagi) 🔔

    Halo {{ $booking->patient->name }},

    Ini adalah pengingat bahwa sesi terapi Anda akan dimulai dalam **2 jam lagi**.

    **Detail Sesi:**
    - **Waktu:** {{ substr($booking->schedule->start_time, 0, 5) }} WIB
    - **Terapis:** {{ $booking->therapist->name }}

    Mohon siapkan diri Anda dan pastikan lingkungan Anda kondusif agar sesi berjalan lancar.

    <x-mail::button :url="route('dashboard')">
        Persiapkan Sesi
    </x-mail::button>

    Sampai jumpa di sesi nanti!

    Salam,<br>
    {{ config('app.name') }}
</x-mail::message>