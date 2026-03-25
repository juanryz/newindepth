<x-mail::message>
# Halo {{ $user->name }}, Profil Anda Belum Lengkap 📋

Kami perhatikan bahwa profil akun Anda di **{{ config('app.name') }}** baru terisi **{{ $profileCompletion['percentage'] }}%**.

Melengkapi profil Anda penting agar layanan yang kami berikan dapat lebih optimal dan personal.

**Data yang belum dilengkapi:**
@foreach($profileCompletion['fields'] as $field)
@if(!$field['filled'])
- {{ $field['label'] }}
@endif
@endforeach

<x-mail::button :url="route('profile.edit')">
    Lengkapi Profil Sekarang
</x-mail::button>

Terima kasih atas kepercayaan Anda menggunakan layanan kami.

Salam,<br>
{{ config('app.name') }}
</x-mail::message>
