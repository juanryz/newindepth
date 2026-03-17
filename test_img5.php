<?php
$url = "https://image.pollinations.ai/prompt/mental%20health";
$options = [
    'http' => [
        'method' => 'GET',
        'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/110.0.0.0 Safari/537.36\r\n"
    ]
];
$context = stream_context_create($options);
$res = file_get_contents($url, false, $context);
echo strlen($res);
