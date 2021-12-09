<?php
session_start();
$id = isset($_SESSION["id"]) ? $_SESSION["id"] : "";
$result = new stdClass();
$result->group = Array();
$file = fopen("../data/user.json", "r");
while(!feof($file)) {
	$user = json_decode(trim(fgets($file)));
	if($user->id===$id) {
		$target = $user->group;
		foreach($target as $value) {
			$result->group[] = $value;
		}
		break;
	}
}
fclose($file);
echo json_encode($result);
