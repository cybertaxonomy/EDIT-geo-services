<?php

   $conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	// 'POLYGON((-5.7107 41.43,-5.11 40.84,-5.7 40.8,-5.11 41.433,-5.7107 41.43))'
	//$geom="POLYGON((".$_GET['point_params[0]']."))";
	//
	
	$polygon= $_GET['param'];
		$userid= $_GET['user'];

	$query="SELECT genus,specie FROM user_points where user_points.userid='$userid' and user_points.the_geom && GeometryFromText('".$polygon."',4326)";

	// echo $query;
	//	-5.7 41.4,-5.7 40.800000000000004,-5.1000000000000005 40.800000000000004,-5.1000000000000005 41.4,-5.7 41.4
	 $query_result=pg_query($query) or die ("algun errorrrr");
	 $count=pg_numrows($query_result);
	 if ($count==0)
	 {
	 print "<div id='content'> No info avaible. 
							   Use this tool only to query the Demo point data";
	 }
	 if ($count>180)
	 {
	 print "<div id='content'> Too much info ($count records)...";
	 }
	 else
	 {
	 
	  print "<div id='content'>
	     <h2>$count records </h2>
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
     //	  <th class='sort-alpha'>Order data by Province</th></th>	
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
	//	 print "<td><a id='repaginate'>".$row['provname']."</a></td>\n";
		  print "</tr>";
		
		 }
		
        //echo $result;
		//} 
	print "</table>
       </div>
	   </tbody>";
	   }
	?>