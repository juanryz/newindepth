<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Metode Pembayaran yang Tersedia
    |--------------------------------------------------------------------------
    | Daftar ini digunakan di seluruh sistem (admin create-offline, halaman
    | upload pembayaran pasien, dll). Cukup ubah di sini untuk menambah
    | atau menghapus metode tanpa menyentuh controller / komponen lain.
    */
    'payment_methods' => [
        'Transfer Bank',
        'Tunai',
    ],

    /*
    |--------------------------------------------------------------------------
    | Rekening Bank Klinik (Transfer Destination)
    |--------------------------------------------------------------------------
    | Digunakan di invoice & form pendaftaran offline. Ubah data di sini —
    | tidak perlu menyentuh controller atau komponen JSX sama sekali.
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
