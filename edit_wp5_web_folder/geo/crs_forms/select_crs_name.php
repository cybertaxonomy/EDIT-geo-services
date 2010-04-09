<?php
require_once("../../path_index.php");
if (@$_REQUEST['ajax']) 
{

   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) 
    { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	
	else 
 { 

	
	$q="select name,code from edit_crs where area='".$_REQUEST['area']."' and crs_type='".$_REQUEST['type']."'";


     $postgis_result=pg_query($q);
	 
	 //"select extent(astext(the_geom)) from scarabeidos where species='".pg_escape_string(strip_tags($_REQUEST['species']))."'");
        $json = array();
		//echo '[' . implode(',', $json) . ']';
		$s='';
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC)) {
       //$json[] = $row['astext'];
	  // $json[] = $row[$field];
	   
	  $s.="<option value='EPSG:".$row['code']."'>".$row['name']."</option>";
	//  $json[] = $row['name'];
//	   $json[] = $row['code'];
	   
	   //$json[] = $row['family'];

}
echo $s;
        		
		//	die(); // filthy exit, but does fine for our example.
	}
}

?>
