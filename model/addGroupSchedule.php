<?php
$schedule = new stdClass();
$schedule->_id = $_POST["day"]."_".$_POST["from"]."_".$_POST["to"];
$schedule->group = $_POST["group"];
$schedule->title = $_POST["title"];
$schedule->memo = $_POST["memo"];
$schedule->day = $_POST["day"];
$schedule->from = $_POST["from"];
$schedule->to = $_POST["to"];
$content = Array();
$file = fopen("../data/groupSchedule.json", "r");
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) $content[] = $temp;
}
fclose($file);
$content[] = json_encode($schedule);
$file = fopen("../data/groupSchedule.json", "w");
fwrite($file, implode("\n", $content));
echo "success";
?>
