<?php
require_once('../../path_index.php');
require 'jsonwrapper.php';
//this require is needed for PHP versions < 5.2
function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if(!isAjax()) {echo "no ajax call";} 
else
{


   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 } 
else 
{
    //$usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='$sessionid'");
	
	//$data = pg_fetch_array ($usuario_result, 0, PGSQL_NUM);
//	$usuario=$data[0];
	$userid=$_GET['userid'];
	$postgis_result=pg_query("select distinct(specie) from user_points where genus='".pg_escape_string(strip_tags($_REQUEST['genus']))."' and userid='".$userid."' order by specie");
	
        $json = array();
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['specie'];
	
    }
echo json_encode($json);
        	die(); // filthy exit, but does fine for our example.
    }
}


?>
