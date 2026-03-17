<?php
$url = "https://image.pollinations.ai/prompt/mental%20health%20illustration";
$res = file_get_contents($url);
echo strlen($res);
