<?php
$group = $_GET["group"];
$result = Array();
$file = fopen("../data/groupSchedule.json", "r");
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) {
		$schedule = json_decode($temp);
		if($schedule->group===$group) {
			$result[] = $schedule;
		}
	}
}
fclose($file);
echo json_encode($result);
?>
