<?php
session_start();
$id = $_POST["id"];
$pwd = $_POST["pwd"];
$file = fopen("../data/user.json", "r");
while(!feof($file)) {
	$user = json_decode(trim(fgets($file)));
	if($user->id===$id && $user->pwd===$pwd) {
		$_SESSION["id"] = $id;
		$_SESSION["pwd"] = $pwd;
		echo "success";
		break;
	}
}
fclose($file);
?>
