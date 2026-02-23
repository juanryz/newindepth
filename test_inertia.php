<?php
$options = array(
    'http' => array(
        'method' => "GET",
        'header' => "X-Inertia: true\r\n" .
            "X-Inertia-Version: ...\r\n"
    )
);
$context = stream_context_create($options);
$response = file_get_contents('https://indepth.co.id/courses', false, $context);
echo "Length: " . strlen($response) . "\n";
