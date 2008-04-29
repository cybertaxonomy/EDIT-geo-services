<?php
   $conn = pg_connect("host=localhost port=5432 password= user= dbname=");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }

	$params= $_GET['param'];
	$array=str_replace("&"," ",$params);
	$array=split(" ",$array);
    $count=count($array);

	$geom="select astext(SetSRID(";
	$geom.="'BOX(".$array[0]." ".$array[1].",".$array[2]."	".$array[3].")'::box2d,-1))";

	$geom_result=pg_query($geom) or die ("algun errorrrr");
	while ($row = pg_fetch_array($geom_result, NULL, PGSQL_ASSOC)) {
	$polygon=$row['astext'];
	 $query="SELECT genus,species,family,provname FROM scarabenlace where scarabenlace.the_geom && GeometryFromText('".$polygon."',4326)";	   
	}
	
     $query_result=pg_query($query) or die ("algun errorrrr");
	 $count=pg_numrows($query_result);
	  print "<div id='content'>
	     <h2>$count records </h2>
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
			  <th class='sort-alpha'>Order data by Province</th>
           
			  </th>
           
			       </tr>";
	 while ($row = pg_fetch_array($query_result, NULL, PGSQL_ASSOC)) {

		 print "<tr class='even' style='display: table-row;'>";
		 print "<td><a id='repaginate'>".$row['genus']."</a></td>\n";
		 print "<td><a id='repaginate'>".$row['species']."</a></td>\n";
		 print "<td><a id='repaginate'>".$row['provname']."</a></td>\n";
		 print "</tr>";

		} 
		}
	print "</table>
       </div>
	   </tbody>";

	?>