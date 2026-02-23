<?php
$html = file_get_contents('https://indepth.co.id/courses');
if (preg_match('/data-page="(.*?)"/', $html, $matches)) {
    $json = html_entity_decode($matches[1]);
    $data = json_decode($json, true);
    echo "Component: " . ($data['component'] ?? 'N/A') . "\n";
} else {
    echo "No data-page found.\n";
}
