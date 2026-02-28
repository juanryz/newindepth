<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ClearAllDataSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        DB::table('bookings')->truncate();
        DB::table('schedules')->truncate();
        // DB::table('transactions')->truncate(); // Keeping this commented out just in case, or if transactions are needed for vouchers
        DB::table('transactions')->truncate();
        DB::table('screening_results')->truncate();
        DB::table('patient_histories')->truncate();
        DB::table('vouchers')->truncate();
        DB::table('petty_cash')->truncate();
        // optionally keep documents if needed or clear them too
        DB::table('documents')->truncate();
        DB::table('patient_vouchers')->truncate();

        Schema::enableForeignKeyConstraints();

        $this->command->info('Data berhasil dihapus (kecuali user dan paket).');
    }
}
