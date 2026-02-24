<?php
$str = file_get_contents('test_roles_output.json');
$str = mb_convert_encoding($str, 'UTF-8', 'UTF-16LE');
echo mb_substr($str, 0, 500);
