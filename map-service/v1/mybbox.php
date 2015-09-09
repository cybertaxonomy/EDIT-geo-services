<?

			$conn = pg_connect(POSTGIS_CS);
				if (pg_ErrorMessage($conn)) { 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
					else
					{
					
				
	$BBOX_sql="select extent(the_geom) from tdwgs where code='".$_GET['code']."'";				


				$postgis_result=pg_query($BBOX_sql);

				while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC))
					 {

			$b=substr($row['extent'],4);
		//	echo $height;
			$cadena=substr($b,0,-1); 
			$bbox=str_replace(' ',',',$cadena);
		//	echo "this is bbox".$bbox;
			echo $bbox;
			}
}
?>