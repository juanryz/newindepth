@component('mail::message')
# ![InDepth](https://indepth.co.id/images/logo-color.png)

# Halo, {{ $name }}

Selamat datang di **InDepth Mental Wellness**.

Langkah pertama untuk memulai perjalanan transformasi kamu adalah dengan memverifikasi alamat email melalui tombol di bawah ini:

@component('mail::button', ['url' => $url])
Verifikasi Email Saya
@end component

Jika kamu tidak melakukan pendaftaran ini, silakan abaikan email ini.

Salam hangat,<br>
**Tim InDepth Mental Wellness**
@endcomponent
