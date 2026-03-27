<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ClearDatabaseData extends Command
{
    protected $signature = 'db:clear-data {--force : Skip confirmation prompt}';

    protected $description = 'Hapus semua data transaksi & klinik, tapi pertahankan semua akun pengguna.';

    /**
     * Tabel-tabel yang akan di-TRUNCATE (dihapus datanya).
     * Urutkan dari yang paling "anak" ke "induk" agar tidak ada konflik foreign key.
     */
    protected array $tablesToClear = [
        // Klinik & Jadwal
        'bookings',
        'schedules',

        // Transaksi & Keuangan
        'transactions',
        'commissions',
        'expenses',
        'petty_cash_proofs',
        'petty_cash_proposals',
        'petty_cash_transactions',

        // Voucher
        'user_vouchers',
        'vouchers',

        // Skrining
        'screening_results',
        'screening_forms',


        // Blog
        'blog_posts',

        // Notifikasi
        'notifications',

        // Cache & Jobs
        'cache',
        'cache_locks',
        'jobs',
        'job_batches',
        'failed_jobs',
    ];

    /**
     * Tabel yang TIDAK boleh disentuh (akun user & permission).
     */
    protected array $protectedTables = [
        'users',
        'roles',
        'permissions',
        'model_has_roles',
        'model_has_permissions',
        'role_has_permissions',
        'personal_access_tokens',
        'migrations',
        'password_reset_tokens',
    ];

    public function handle(): void
    {
        $this->warn('⚠️  PERINGATAN: Tindakan ini akan menghapus SEMUA data kecuali akun pengguna!');
        $this->newLine();

        $this->table(
            ['Status', 'Tabel'],
            collect($this->tablesToClear)->map(fn($t) => ['🧹 Isi dikosongkan', $t])->toArray()
        );

        $this->newLine();
        $this->info('✅ Tabel yang AMAN (tidak disentuh): ' . implode(', ', $this->protectedTables));
        $this->newLine();

        if (!$this->option('force') && !$this->confirm('Lanjutkan penghapusan data?', false)) {
            $this->error('Dibatalkan.');
            return;
        }

        $this->info('Memulai penghapusan data...');
        $this->newLine();

        $driver = DB::getDriverName();

        // Disable foreign key checks (syntax berbeda per driver)
        if ($driver === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = OFF;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        $success = 0;
        $skipped = 0;

        foreach ($this->tablesToClear as $table) {
            try {
                if (DB::getSchemaBuilder()->hasTable($table)) {
                    if ($driver === 'sqlite') {
                        DB::table($table)->delete(); // SQLite tidak punya TRUNCATE pada beberapa versi
                    } else {
                        DB::table($table)->truncate();
                    }
                    $this->line("  ✅ <fg=green>{$table}</> — terhapus");
                    $success++;
                } else {
                    $this->line("  ⏭️  <fg=yellow>{$table}</> — tabel tidak ditemukan, dilewati");
                    $skipped++;
                }
            } catch (\Exception $e) {
                $this->line("  ❌ <fg=red>{$table}</> — error: {$e->getMessage()}");
            }
        }

        // Re-enable foreign key checks
        if ($driver === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
        } else {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

        $this->newLine();
        $this->info("✅ Selesai! {$success} tabel dihapus, {$skipped} dilewati.");
        $this->info('👤 Semua akun pengguna tetap aman.');
    }
}
