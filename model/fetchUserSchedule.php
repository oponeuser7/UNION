<?php
$user = $_GET["user"];
$result = Array();
$file = fopen("../data/userSchedule.json", "r");
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) {
		$schedule = json_decode($temp);
		if($schedule->user===$user) {
			$result[] = $schedule;
		}
	}
}
fclose($file);
echo json_encode($result);
?>
