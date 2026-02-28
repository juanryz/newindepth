<?php
// Script ini langsung DELETE data di SQLite tanpa framework
// Jalankan dari root project: php clear_data.php

$dbPath = __DIR__ . '/database/database.sqlite';

if (!file_exists($dbPath)) {
    echo "File database tidak ditemukan: {$dbPath}\n";
    exit(1);
}

$db = new PDO('sqlite:' . $dbPath);
$db->exec('PRAGMA foreign_keys = OFF;');

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
    'finance_logs',
    'order_logs',
    'activity_log',
];

foreach ($tables as $table) {
    $stmt = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='{$table}'");
    if (!$stmt || !$stmt->fetch()) {
        echo "⏭  Tabel tidak ada: {$table}\n";
        continue;
    }

    $rows = $db->exec("DELETE FROM \"{$table}\"");
    echo "✅ Cleared: {$table} ({$rows} rows)\n";
}

$db->exec('PRAGMA foreign_keys = ON;');

echo "\n✓ Selesai! Semua data transaksi sudah dihapus (user & paket tetap ada).\n";
