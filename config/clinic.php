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

];
