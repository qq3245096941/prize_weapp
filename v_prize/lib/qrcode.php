<?php

require_once '../phpqrcode.php';

$level = "L";
$size = 6;
ob_start();

$QRcode = new QRcode();
$QRcode->png($_GET['url'], false, $level, $size, 2);
$imageString = base64_encode(ob_get_contents());

ob_end_clean();
header("content-type:application/json; charset=utf-8");

echo json_encode(['qrcode'=>$imageString]);
