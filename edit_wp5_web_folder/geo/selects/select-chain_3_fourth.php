<?php

require 'jsonwrapper.php';
//this require is needed for PHP versions < 5.2
function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if(!isAjax()) {echo "no ajax call";} 
else
{
//@session_start();
//$sessionid=session_id();
   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	 
	 else 
	{ 
	
//		$postgis_result=pg_query("select distinct(genus) from scarabeidos");
		$userid=$_GET['userid'];
				$postgis_result=pg_query("select distinct(specie) from user_points where userid='$userid' order by specie");

        $json= array();
		//$numFilas =pg_NumRows($postgis_result);
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['specie'];
				}
		echo json_encode($json);

			die(); // filthy exit...	
	}

	}

?>
