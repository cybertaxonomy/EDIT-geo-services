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
$userid=$_GET['userid'];

 //  $conn = pg_connect(POSTGIS_CS);
			$conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	 
	 else 
	{ 

global $userid;	
//echo "select distinct(genus) from test_csvimportgispoints2 where userid='$usuario' order by genus";
$s="select distinct(genus) from user_points where userid='$userid' order by genus";

		$postgis_result=pg_query("select distinct(genus) from user_points where userid='$userid' order by genus");

        $json= array();
		//$numFilas =pg_NumRows($postgis_result);
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       $json[] = $row['genus'];
				}
       //$info = $json->encode($data);
		//echo $info;
		echo json_encode($json);
			die(); // filthy exit, but does fine for our example.	
	}


}
?>
