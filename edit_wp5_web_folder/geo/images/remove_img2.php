<?
require_once("../../path_index.php");
$img=$_GET['img'];
	
function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if (!isAjax()) {echo "No vas pas bŽ, cirerer...";} 
else
{
//download/2473/120dpi/241/137.png
//$path_towrite="/var/www/synthesys/www/fitxers/images/download/".$img;
//echo $path_towrite;
//$s="var/www/synthesys/www/fitxers/images/download/no_user/120dpi/186/";
$mydir = DIR_PLATFORM."/geo/images/download/$img"; 

//echo $mydir;
$d = dir($mydir); 
while($entry = $d->read()) { 
 if ($entry!= "." && $entry!= "..") { 
	//echo $entry;
 unlink($mydir."/".$entry); 
 } 
} 
$d->close(); 
rmdir($mydir."/");
}
?>
