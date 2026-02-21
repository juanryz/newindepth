@component('mail::message')
# ![InDepth](https://indepth.co.id/images/logo-color.png)

# Halo!

Kamu menerima email ini karena kami menerima permintaan reset kata sandi untuk akun kamu di **InDepth Mental Wellness**.

@component('mail::button', ['url' => $url])
Reset Kata Sandi
@end component

Tautan reset kata sandi ini akan kedaluwarsa dalam 60 menit.

Jika kamu tidak merasa melakukan permintaan ini, silakan abaikan email ini.

Salam hangat,<br>
**Tim InDepth Mental Wellness**
@endcomponent
