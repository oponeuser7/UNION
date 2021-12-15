<?php
$schedule = new stdClass();
$schedule->_id = $_POST["_id"];
$content = Array();
$file = fopen("../data/userSchedule.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if($temp&&$temp->_id!==$schedule->_id) $content[] = json_encode($temp);
}
fclose($file);
$file = fopen("../data/userSchedule.json", "w");
fwrite($file, implode("\n", $content));
echo "success";
?>
