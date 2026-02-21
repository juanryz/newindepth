@component('mail::message')
<div style="text-align: center; margin-bottom: 20px;">
    <img src="https://indepth.co.id/images/logo-color.png" alt="InDepth" style="height: 60px; width: auto;">
</div>

# Halo, {{ $name }}

Selamat datang di **InDepth Mental Wellness**.

Langkah pertama untuk memulai perjalanan transformasi kamu adalah dengan memverifikasi alamat email melalui tombol di bawah ini:

@component('mail::button', ['url' => $url, 'color' => 'primary'])
Verifikasi Email Saya
@end component

Jika kamu tidak melakukan pendaftaran ini, silakan abaikan email ini.

Salam hangat,<br>
**Tim InDepth Mental Wellness**
@endcomponent
