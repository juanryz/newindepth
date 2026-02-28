<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ClearData extends Command
{
    protected $signature = 'data:clear';
    protected $description = 'Hapus semua data transaksi (kecuali user dan paket)';

    public function handle()
    {
        Schema::disableForeignKeyConstraints();

        $tables = [
            'patient_vouchers',
            'documents',
            'patient_histories',
            'bookings',
            'schedules',
            'transactions',
            'screening_results',
            'petty_cash',
            'vouchers',
        ];

        foreach ($tables as $table) {
            try {
                DB::table($table)->delete();
                $this->line("✅ Cleared: {$table}");
            } catch (\Exception $e) {
                $this->warn("⚠️  Skip {$table}: " . $e->getMessage());
            }
        }

        Schema::enableForeignKeyConstraints();

        $this->info('Selesai! Semua data transaksi sudah dihapus.');
    }
}
