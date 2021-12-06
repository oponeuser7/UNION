<?php
$user = new stdClass();
$user->id = $_POST["id"];
$user->pwd = $_POST["pwd"];
$file = fopen("../data/user.json", "r");
$content = [];
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) $content[] = $temp;
}
fclose($file);
$content[] = json_encode($user);
$file = fopen("../data/user.json", "w");
fwrite($file, implode("\n", $content));
fclose($file);
?>
