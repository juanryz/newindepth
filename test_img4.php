<?php
$url = "https://lexica.art/api/v1/search?q=mental%20health%20illustration";
$res = file_get_contents($url);
$data = json_decode($res, true);
echo isset($data['images'][0]['src']) ? $data['images'][0]['src'] : 'Failed';
