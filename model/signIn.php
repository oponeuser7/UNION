<?php
session_start();
$id = $_POST["id"];
$password = $_POST["pwd"];
$file = fopen("data/user.json", "r");
while(!feof($file)) {
	$person = json_decode(trim(fgets($file)));
	if($person->id===$id && $person->password===$password) {
		$_SESSION["id"] = $id;
		$_SESSION["pwd"] = $password;
		echo "success";
		break;
	}
}
fclose($file);
?>
