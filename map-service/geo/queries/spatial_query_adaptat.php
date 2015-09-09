<?php
//THIS SCRIPT CHECKS HOW MANY GENUS/SPECIES ARE PRESENT ON THE POLYGONAL LAYER SELECTED BY USER ON EDIT MAPVIEWER INTERFACE (YOU HAVE TO ACTIVATE "QUERY AND DRAW" MODULE)
//EX: USER CHECKS "10 DEGREES QUADRICULES" AND CLICKS OVER A QUADRICULE. IT WILL RESULT THE COUNT OF GENUS/SPECIES IN THIS QUADRICULE

require_once("../../path_index.php");
   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	// 'POLYGON((-5.7107 41.43,-5.11 40.84,-5.7 40.8,-5.11 41.433,-5.7107 41.43))'
	//$geom="POLYGON((".$_GET['point_params[0]']."))";
	//
	$user=$_GET['userid'];
	$x=$_GET['x'];
	$y=$_GET['y'];

	$polygon=$_GET['polygon'];

//	echo "point is".$x.",".$y;
	$query="select code from $polygon where CONTAINS(the_geom,GeomFromText('POINT($x $y)',4326))";

	//the_geom && GeomFromText('POINT($x $y)',4326)";
	 $query_result=pg_query($query) or die ("algun errorrrr");
		 $count=pg_numrows($query_result);

	 if ($count==0)
	 {
	 print "<div id='content'> HERE THERE IS NO POLYGON!";
	 }
	 else
	 {
	 
	  print "<div id='content'>

		<table border='0' class='sortable paginated'>			 
		<thead>
            <tr>";
      while ($row = pg_fetch_array($query_result, NULL, PGSQL_ASSOC)) 
				{   
	
					

							$sql2="select  COUNT(p.pk) as records,count(distinct(p.genus)) as genus from user_points p INNER JOIN $polygon poly ON p.userid='$user' and p.the_geom && poly.the_geom and poly.code='".$row['code']."' and CONTAINS(poly.the_geom,p.the_geom) group by p.userid,poly.code,poly.the_geom";
	
              print "<th class='sort-alpha'>$polygon  code: ".$row['code']."</th>";     
 			    }
			print "</thead><tbody> ";

	
     $query_result2=pg_query($sql2) or die ("algun error2");
	 while ($row2 = pg_fetch_array($query_result2, NULL, PGSQL_ASSOC)) {

		 print "<tr class='even' style='display: table-row;'>";

		 print "<td><a id='repaginate'>Number of records ".$row2['records']."</a></td></tr>";
			 print "<tr class='even' style='display: table-row;'>";
		print "<td><a id='repaginate'>Number of genus ".$row2['genus']."</a></td></tr>";

		
		 }
		
        //echo $result;
		//} 
	print "</table>
       </div>
	   </tbody>";
	   }

	?>
