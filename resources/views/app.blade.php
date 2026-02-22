<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Primary Meta Tags -->
    <meta name="title" content="InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional">
    <meta name="description"
        content="Klinik Hipnoterapi & Psikoterapi Premium di Semarang. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional.">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional">
    <meta property="og:description"
        content="Klinik Hipnoterapi & Psikoterapi Premium di Semarang. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional.">
    <meta property="og:image" content="{{ asset('images/logo-color.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url()->current() }}">
    <meta property="twitter:title" content="InDepth Mental Wellness | Kesehatan Mental Terpadu & Profesional">
    <meta property="twitter:description"
        content="Klinik Hipnoterapi & Psikoterapi Premium di Semarang. Menyediakan layanan kesehatan mental terpadu dengan pendekatan personal dan profesional.">
    <meta property="twitter:image" content="{{ asset('images/logo-color.png') }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" type="image/png" href="{{ asset('images/logo-color.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>