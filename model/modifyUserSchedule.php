<?php
$schedule = new stdClass();
$schedule->_id = $_POST["_id"];
$schedule->user = $_POST["user"];
$schedule->title = $_POST["title"];
$schedule->memo = $_POST["memo"];
$schedule->day = $_POST["day"];
$schedule->from = $_POST["from"];
$schedule->to = $_POST["to"];
$content = Array();
$file = fopen("../data/UserSchedule.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if($temp&&$temp->_id===$schedule->_id) {
		$temp = $schedule;
	}
	$content[] = json_encode($temp);
}
fclose($file);
$file = fopen("../data/UserSchedule.json", "w");
fwrite($file, implode("\n", $content));
echo "success";
?>
