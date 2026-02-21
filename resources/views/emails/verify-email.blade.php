@component('mail::message')
<div style="text-align: center; margin-bottom: 2rem;">
    <img src="https://indepth.co.id/images/logo-color.png" alt="InDepth" style="height: 50px;">
</div>

# Halo, {{ $name }}

Selamat datang di **InDepth Mental Wellness**.

Langkah pertama untuk memulai perjalanan transformasi kamu adalah dengan memverifikasi alamat email melalui tombol di bawah ini:

@component('mail::button', ['url' => $url])
Verifikasi Email Saya
@endcomponent

Jika kamu tidak melakukan pendaftaran ini, silakan abaikan email ini.

Salam hangat,<br>
**Tim InDepth Mental Wellness**
@endcomponent
