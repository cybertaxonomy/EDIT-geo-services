<?php
@session_start();
$sessionid=session_id();
if (@$_REQUEST['ajax']) {

   $conn = pg_connect("host=localhost port=5432 password= user= dbname=gbif3");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 } 
else 
{
    $usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='$sessionid'");
	//$usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='l59r32286o4vcughufkb8hnm96'");
	$data = pg_fetch_array ($usuario_result, 0, PGSQL_NUM);
	$usuario=$data[0];
	
	$postgis_result=pg_query("select distinct(specie) from test_csvimportgispoints2 where genus='".pg_escape_string(strip_tags($_REQUEST['genus']))."' and userid='".$usuario."' order by specie");
	
        $json = array();
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['specie'];
	
    }
echo json_encode($json);
        	die(); // filthy exit, but does fine for our example.
    }
	}

?>
