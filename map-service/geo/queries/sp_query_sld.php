<?php
//THIS SCRIPT CREATES HTML TO BE APPENDED ON EDIT MAPVIEWER; THIS HTML IS RESULT OF QUERYING WHAT USER INFO THERE IS ON USER SELECTED COORDINATES (BY CLICKING ON EDIT MAPVIEWER MAP)
require_once("../../path_index.php");
//FROM A POINT COORDINATES WE CREATED A BBOX (+- 1 DEGREE) in function doGetFeatureInfo (4326_specific.js)
@session_start();
$sessionid=session_id();
//if (@$_REQUEST['ajax']) {

//	$conn = pg_connect('host=localhost port=5432  password=fv30714$A  user=postgres dbname=edit_geo_mirror');
   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
 //   $usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='$sessionid'");
	//$data = pg_fetch_array ($usuario_result, 0, PGSQL_NUM);
	//$usuario=$data[0];
	
	$usuario=$_GET['user'];
	$params= $_GET['param'];
	$array=str_replace("&"," ",$params);
	$array=split(" ",$array);
    $count=count($array);
	
	$geom='POLYGON((';
    //foreach ($array as $key=>$value)
	for ($i=0;$i<($count -1);$i++)
	{	
	$array[$i]=str_replace(","," ",$array[$i]);
	$geom.=$array[$i].",";
	}
	$array[$count-1]=str_replace(","," ",$array[$count-1]);
	$geom.=$array[$count-1]."))";
	$query="SELECT  genus,specie FROM user_points where user_points.userid='$usuario' and user_points.the_geom && GeometryFromText('".$geom."',4326)";

	 $query_result=pg_query($query) or die ("algun errorrrr");
	 $count=pg_numrows($query_result);
	 if ($count==0)
	 {
	 print "<div id='content'> No information (Genus, Species) avaible. 
							   Use this tool only to query your own data";
	 }

	 else
	 {
	 if ($count>160)
	 {
	 print "too much records (".$count.") to be visualized here"; 
	 }else
	 {
	  print "<div id='content'>
	     <h2>$count records</h2>
		<table border='0' class='sortable paginated'>
			 
<thead>
            <tr>
              
              <th class='sort-alpha'>Order data by Genus</th>
           
			       </th>
			  <th class='sort-alpha'>Order data by Species</th>
			  </th>
          </thead>
		  <tbody>
			  ";
     	
	 while ($row = pg_fetch_array($query_result, NULL, PGSQL_ASSOC)) {

		 print "<tr class='even' style='display: table-row;'>";
		 /*
        $numero=1; 	
		while ($numero<=$count)
		 {
		 print "<td><a id='repaginate'>".$numero."</a></td>\n";	
		$numero++;		 
		}
		*/
		 print "<td><a id='repaginate'>".$row['genus']."</a></td>\n";
		 print "<td><a id='repaginate'>".$row['specie']."</a></td>\n";
		  print "</tr>";
		
		 }
		
        //echo $result;
		//} 
	print "</table>
       </div>
	   </tbody>";
	   }
	   }
//	   }
	?>
