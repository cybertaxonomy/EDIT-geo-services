<?php
//THIS SCRIPT INSERTS INTO A POSTGIS TABLE THE POLYGON DRAWN BY USER ON MAPVIEWER
function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if (!isAjax()) {echo "No vas pas bŽ, cirerer...";} 
else
{


$conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	 else
	 {

	$polygon= $_GET['data'];
		$userid= $_GET['user'];
				$id= $_GET['gid'];
$q2="select code from serialized_pols where userid='$userid' and code='$id'";

 $q = pg_exec ($conn, $q2);

 $data = pg_fetch_array ($q, 0, PGSQL_NUM);

$count=count($data[0]);
 if ($count > 0) 
 {
$query="update serialized_pols set the_geom=GeomFromText('".$polygon."',4326) where userid='$userid' and code='$id'" ;
 } else {
 $query="insert into serialized_pols (code,userid,the_geom) values (".$id.",'$userid',GeomFromText('".$polygon."',4326))";
 };
//insert into serialized_pols (the_geom) values (GeomFromText('POLYGON((-4.32197265625 41.17216796875,-2.9376953125 42.22685546875,-2.01484375 41.897265625,-1.5314453124999998 41.63359375,-2.56416015625  40.77666015625,-4.32197265625 41.17216796875))',4326))

//echo $query;

	
	 $query_result=pg_query($query) or die ("algun errorrrr");

	   }
}	   
	?>