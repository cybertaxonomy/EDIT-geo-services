<?php

   $conn = pg_connect("host=localhost port=5432 password= user=postgres dbname=");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 } 
	 

	$postgis_result=pg_query("select distinct(species) from scarabeidos where genus='".pg_escape_string(strip_tags($_REQUEST['genus']))."'");

        $json = array();
		
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['species'];

}
echo json_encode($json);
        	die(); // filthy exit, but does fine for our example.
   
?>
