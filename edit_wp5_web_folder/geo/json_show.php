<?
require_once("../path_index.php");
$file=$_GET['file'];
//$h =fopen(DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json/$file", "r");
$h=fopen( PATH_JSON."/".$file,"r");
		header("Content-Type: json");
		header("Content-Disposition: attachment; filename=\"EDIT.json\"");
		fpassthru($h);
		fclose($h);
   
?>
