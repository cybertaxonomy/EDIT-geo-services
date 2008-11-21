<?
require_once("inc/error.inc.php");
require_once("inc/database.inc.php");
require_once("inc/security.inc.php");

try {
	$geotable = $_REQUEST['geotable'];

if ($geotable='userre')
{

$sql="select distinct zonereg from userre limit 22";	
//$sql="select distinct zonereg from userre where zonereg='29SQA4'";	
}
else
{

$sql="select zones,nobszon,spzon,slopend from ".$geotable." where slopend > 0.2";

}
$sql = sanitizeSQL($sql);
$pgconn = pgConnection();
$recordSet = $pgconn->Execute($sql);
$totalRows = $recordSet->numrows();
//$sql="select zonereg,nreg,spreg from userre ORDER BY zonereg LIMIT 5 ";

	
		require_once("inc/json.inc.php");
		header("Content-Type: application/json");
		if ($geotable='userre')
		{
		echo rs2json_p($recordSet);
		}
		else
		{
		echo rs2json($recordSet);
	   }
	
}

catch (Exception $e) {
	
	trigger_error("Caught Exception: " . $e->getMessage(), E_USER_ERROR);
}
?>