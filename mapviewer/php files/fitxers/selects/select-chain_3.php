<?php
@session_start();
$sessionid=session_id();
if (@$_REQUEST['ajax']) {

   $conn = pg_connect("host=localhost port=5432 password=Edit3.dsa user=postgres dbname=gbif3");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	 
	 else 
	{ 
	
		$postgis_result=pg_query("select distinct(genus) from scarabeidos");

        $json= array();
		//$numFilas =pg_NumRows($postgis_result);
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['genus'];
				}
		echo json_encode($json);

			die(); // filthy exit, but does fine for our example.	
	}

	}

?>
