<?php
session_start();
if(isset($_SESSION["id"]) && isset($_SESSION["pwd"])) {
	echo "success";
}
?>
