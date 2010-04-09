<?

@session_start();
$sessionid=session_id();
require_once("inc/error.inc.php");
require_once("inc/database.inc.php");
require_once("inc/security.inc.php");
require_once("../../path_index.php");

//if (@$_REQUEST['ajax']) {
$conn = pg_connect(POSTGIS_CS);
	if (pg_ErrorMessage($conn)) 
	{ 
		 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
		 }
		else 
		{

	
try {
	$geotable = $_REQUEST['geotable'];     
    $user=$_REQUEST['user'];
	$layer=$_REQUEST['layer'];

if ($geotable='point_pol')
{
//only 25, otherwise we get too much info to visualize on HTML
$sql="select distinct code from point_pol where userid='$user' limit 25";	
}
else
{
$sql="select code,numreg,numtax,slopend from ".$geotable." where slopend > 0.2";
}
$sql = sanitizeSQL($sql);
$pgconn = pgConnection();
$recordSet = $pgconn->Execute($sql);
$totalRows = $recordSet->numrows();
	
		require_once("inc/json_user.inc.php");
		header("Content-Type: application/json");
		if ($geotable='point_pol')
		{
		$columns="false3";
	echo rs2json_p($recordSet,$columns,$layer,$user);
		}
		else
		{
		echo rs2json($recordSet);
	   }
	
}
catch (Exception $e) {
	
	trigger_error("Caught Exception: " . $e->getMessage(), E_USER_ERROR);
}
}
?>