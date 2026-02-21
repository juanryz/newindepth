@component('mail::message')
<div style="text-align: center; margin-bottom: 2rem;">
    <img src="https://indepth.co.id/images/logo-color.png" alt="InDepth" style="height: 50px;">
</div>

# Halo!

Kamu menerima email ini karena kami menerima permintaan reset kata sandi untuk akun kamu di **InDepth Mental Wellness**.

@component('mail::button', ['url' => $url])
Reset Kata Sandi
@endcomponent

Tautan reset kata sandi ini akan kedaluwarsa dalam 60 menit.

Jika kamu tidak merasa melakukan permintaan ini, silakan abaikan email ini.

Salam hangat,<br>
**Tim InDepth Mental Wellness**
@endcomponent
