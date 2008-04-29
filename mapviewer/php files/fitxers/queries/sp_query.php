<?php


   $conn = pg_connect("host=localhost port=5432 password=Edit3.dsa user=postgres dbname=gbif3");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	// 'POLYGON((-5.7107 41.43,-5.11 40.84,-5.7 40.8,-5.11 41.433,-5.7107 41.43))'
	//$geom="POLYGON((".$_GET['point_params[0]']."))";
	//
	
	$params= $_GET['param'];
	$array=str_replace("&"," ",$params);
	$array=split(" ",$array);
    $count=count($array);
	
	//echo $count;
	$geom='POLYGON((';
    //foreach ($array as $key=>$value)
	for ($i=0;$i<($count -1);$i++)
	{	
	$array[$i]=str_replace(","," ",$array[$i]);
	//echo $array[$key]."<br>";	
	$geom.=$array[$i].",";
	}
	$array[$count-1]=str_replace(","," ",$array[$count-1]);
	$geom.=$array[$count-1]."))";
	$query="SELECT genus,species,provname FROM scarabenlace where scarabenlace.the_geom && GeometryFromText('".$geom."',4326)";
	// echo $query;
	//	-5.7 41.4,-5.7 40.800000000000004,-5.1000000000000005 40.800000000000004,-5.1000000000000005 41.4,-5.7 41.4
	 $query_result=pg_query($query) or die ("algun errorrrr");
	 $count=pg_numrows($query_result);
	 if ($count==0)
	 {
	 print "<div id='content'> No info avaible. 
							   Use this tool only to query the Demo point data";
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
			  <th class='sort-alpha'>Order data by Province</th>
           
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
		 print "<td><a id='repaginate'>".$row['species']."</a></td>\n";
		 print "<td><a id='repaginate'>".$row['provname']."</a></td>\n";
		  print "</tr>";
		
		 }
		
        //echo $result;
		//} 
	print "</table>
       </div>
	   </tbody>";
	   }
	?>