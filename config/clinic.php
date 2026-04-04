<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Identitas Klinik
    |--------------------------------------------------------------------------
    | Digunakan di invoice, halaman pendaftaran, dan semua tampilan frontend.
    | Ubah di .env tanpa menyentuh kode sama sekali.
    */
    'name'    => env('CLINIC_NAME',    'InDepth Mental Wellness'),
    'tagline' => env('CLINIC_TAGLINE', 'Hipnoterapi & Kesehatan Mental Profesional'),
    'address' => env('CLINIC_ADDRESS', 'Jl. Raya Kesehatan No. 1, Jakarta Selatan'),
    'phone'   => env('CLINIC_PHONE',   '+62 812-3456-7890'),
    'email'   => env('CLINIC_EMAIL',   'hello@indepth.co.id'),
    'website' => env('CLINIC_WEBSITE', 'clinic.indepth.co.id'),

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
            'account' => env('CLINIC_BANK_1_ACCOUNT', '1234567890'),
            'holder'  => env('CLINIC_BANK_1_HOLDER',  'InDepth Clinic'),
        ],
        [
            'bank'    => env('CLINIC_BANK_2_NAME',    'Mandiri'),
            'account' => env('CLINIC_BANK_2_ACCOUNT', '9876543210'),
            'holder'  => env('CLINIC_BANK_2_HOLDER',  'InDepth Clinic'),
        ],
    ],

];
