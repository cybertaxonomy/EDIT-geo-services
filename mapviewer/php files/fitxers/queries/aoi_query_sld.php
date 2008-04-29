<?php
@session_start();
$sessionid=session_id();
//if (@$_REQUEST['ajax']) {

   $conn = pg_connect("host=localhost port=5432 password=Edit3.dsa user=postgres dbname=gbif3");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
    $usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='$sessionid'");
	$data = pg_fetch_array ($usuario_result, 0, PGSQL_NUM);
	$usuario=$data[0];
	
	$params= $_GET['param'];
	$array=str_replace("&"," ",$params);
	$array=split(" ",$array);
    $count=count($array);

	$geom="select astext(SetSRID(";
	$geom.="'BOX(".$array[0]." ".$array[1].",".$array[2]."	".$array[3].")'::box2d,-1))";
  //  echo $geom;
//	-5.7107,41.443878042328045&-5.7107,40.84387804232805&-5.1107000000000005,41.443878042328045&-5.1107000000000005,40.84387804232805
	$geom_result=pg_query($geom) or die ("algun errorrrr");
	while ($row = pg_fetch_array($geom_result, NULL, PGSQL_ASSOC)) {
	$polygon=$row['astext'];
	 $query="SELECT  genus,specie FROM test_csvimportgispoints2 where test_csvimportgispoints2.userid='$usuario' and test_csvimportgispoints2.the_geom && GeometryFromText('".$polygon."',4326)";
	   
	}
	
     $query_result=pg_query($query) or die ("algun errorrrr");
	 $count=pg_numrows($query_result);
	 
	  print "<div id='content'>
	     <h2>$count records by $usuario </h2>
		<table border='0' class='sortable paginated'>
			 
<thead>

          </thead>
		  <tbody>
			  ";
      if ($count>=180)
	  {
		print "<td>You have selected too much data ($count records)
		           Please set a smaller Area of Interest</td>";
	  }
	  else
	  {
	  print "            <tr>
              
                            <th class='sort-alpha'>Order data by Genus</th>
           
			       </th>
			  <th class='sort-alpha'>Order data by Species</th>
           
			  </th>
           
			       </tr>";
	 while ($row = pg_fetch_array($query_result, NULL, PGSQL_ASSOC)) {

		 print "<tr class='even' style='display: table-row;'>";

		 print "<td><a id='repaginate'>".$row['genus']."</a></td>\n";
		 print "<td><a id='repaginate'>".$row['specie']."</a></td>\n";
		 print "</tr>";
        //echo $result;
		} 
		}
	print "</table>
       </div>
	   </tbody>";
//}
	?>