<?php
$table = Array();
for($i=0; $i<175; $i++) {
	$table[] = true;
}
$dayTable = Array(
	"Sun"=>0,"Mon"=>1,"Tue"=>2,"Wed"=>3,"Thu"=>4,"Fri"=>5,"Sat"=>6
); 
$group = $_GET["group"];
$file = fopen("../data/user.json", "r");
$users = Array();
$result = Array();
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	foreach($temp->group as $target) {
		if($target===$group) $users[] = $temp->id;
	}
}
fclose($file);
$file = fopen("../data/userSchedule.json", "r");
while(!feof($file)) {
	$temp = json_decode(trim(fgets($file)));
	if(in_array($temp->user, $users)) {
		$adder = $dayTable[$temp->day];
		for($i=(int)$temp->from; $i<(int)$temp->to; $i++) {
			$table[7*$i+$adder] = false;
		}
	}
}
fclose($file);
echo json_encode($table);
?>
