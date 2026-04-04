<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Identitas Klinik
    |--------------------------------------------------------------------------
    | Digunakan di invoice, halaman pendaftaran, dan semua tampilan frontend.
    | Ubah di .env tanpa menyentuh kode sama sekali.
    */
    'name'      => env('CLINIC_NAME',      'InDepth Mental Wellness'),
    'tagline'   => env('CLINIC_TAGLINE',   'Hipnoterapi & Kesehatan Mental Profesional'),
    'address'   => env('CLINIC_ADDRESS',   'Jl. Kelud Raya No. 34B, Petompon, Gajah Mungkur, Semarang, Jawa Tengah 50237'),
    'phone'     => env('CLINIC_PHONE',     '+62 822-2080-0034'),
    'whatsapp'  => env('CLINIC_WHATSAPP',  '6282220800034'),
    'email'     => env('CLINIC_EMAIL',     'admin@indepth.co.id'),
    'website'   => env('CLINIC_WEBSITE',   'clinic.indepth.co.id'),
    'maps_url'  => env('CLINIC_MAPS_URL',  'https://maps.app.goo.gl/KUmgnva1hi9vvrNP7'),

    /*
    |--------------------------------------------------------------------------
    | Metode Pembayaran yang Tersedia
    |--------------------------------------------------------------------------
    */
    'payment_methods' => [
        'Transfer Bank',
        'Tunai',
    ],

    /*
    |--------------------------------------------------------------------------
    | Rekening Bank Klinik (Transfer Destination)
    |--------------------------------------------------------------------------
    */
    'bank_accounts' => [
        [
            'bank'    => env('CLINIC_BANK_1_NAME',    'BCA'),
            'account' => env('CLINIC_BANK_1_ACCOUNT', '2520639058'),
            'holder'  => env('CLINIC_BANK_1_HOLDER',  'JULIUS BAMBANG KURNIADIS'),
        ],
    ],

];
