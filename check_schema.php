<?php
$db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
$cols = $db->query('PRAGMA table_info(schedules)')->fetchAll(PDO::FETCH_ASSOC);
echo "Columns in schedules table:\n";
foreach ($cols as $c) {
    echo "  - " . $c['name'] . " (" . $c['type'] . ")\n";
}
