<?php
$id = $_GET["id"];
$result = Array();
$file = fopen("../data/user.json", "r");
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) {
		$temp = json_decode($temp);
		if(strpos($temp->id, $id)!==false) {
			$result[] = $temp;
		}
	}
}
fclose($file);
echo json_encode($result);
