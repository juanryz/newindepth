<?php
$options = array(
    'http' => array(
        'method' => "GET",
        'header' => "X-Inertia: true\r\n",
        'ignore_errors' => true
    )
);
$context = stream_context_create($options);
$response = file_get_contents('https://indepth.co.id/courses', false, $context);
echo "Status: " . $http_response_header[0] . "\n";
echo "Response: " . substr($response, 0, 500) . "\n";
