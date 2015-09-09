<?
//THIS SCRIPT GENERATES THE BBOX THAT CONTAINS THE GENUS/SPECIES SELECTED BY USER
//THIS BBOX WILL BE USED TO DRAW A BOX ON MAPVIEWER
require_once("../../path_index.php");

$userid=$_GET['userid'];
$info=$_GET['info'];
$BBOX_sql="select extent(the_geom) from user_points where userid='$userid' AND $info=";
//$d=$_GET['']


$d=explode(',',$_GET['data']);

	foreach($d as $key=>$val)
	{

	if ($key==0)
	{
	$BBOX_sql.="'".$val."' ";	
	}
    if ($key>0)
    {
     $BBOX_sql.="OR $info='".$val."' ";
    }

	}


			$conn = pg_connect(POSTGIS_CS);
				if (pg_ErrorMessage($conn)) { 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
					else
					{


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
