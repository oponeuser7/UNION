<?php
$user = $_POST["user"];
$group = $_POST["group"];
$content = [];
$file = fopen("../data/user.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if($temp->id===$user) $temp->group[] = $group;
	$content[] = json_encode($temp);
}
fclose($file);
$file = fopen("../data/user.json", "w");
fwrite($file, implode("\n", $content));
fclose($file);
$content = [];
$file = fopen("../data/group.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if($temp->name===$group) $temp->members[] = $user;
	$content[] = json_encode($temp);	
}
fclose($file);
$file = fopen("../data/group.json", "w");
fwrite($file, implode("\n", $content));
fclose($file);
echo "success";
?>
