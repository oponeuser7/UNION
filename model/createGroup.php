<?php
session_start();
$id = $_SESSION["id"]; 
$name = $_POST["name"];
$group = new stdClass();
$group->name = $name;
$group->owner = $id;
$group->members = Array($id);
$content = [];
$file = fopen("../data/group.json", "r");
while(!feof($file)) {
	$temp = trim(fgets($file));
	if($temp) $content[] = $temp;
}
fclose($file);
$content[] = json_encode($group);
$file = fopen("../data/group.json", "w");
fwrite($file, implode("\n", $content));
fclose($file);
$content = [];
$file = fopen("../data/user.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if($temp->id===$id) $temp->group[] = $name;
	$content[] = json_encode($temp);
}
fclose($file);
$file = fopen("../data/user.json", "w");
fwrite($file, implode("\n", $content));
fclose($file);
?>
