<?php
$db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
$rows = $db->query('SELECT id, therapist_id, date, start_time, end_time, status FROM schedules')->fetchAll(PDO::FETCH_ASSOC);
echo "Current schedules:\n";
foreach ($rows as $r) {
    echo "ID: {$r['id']} | TID: {$r['therapist_id']} | Date: {$r['date']} | Time: {$r['start_time']} - {$r['end_time']} | Status: {$r['status']}\n";
}
