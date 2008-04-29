<?php


//header("Content-type: text/xml; charset=UTF-8");
 

 
 
//header('Content-Type: text/xml');
//BOOOO  $wms="http://wms-sites.com/search_rss?SearchableText=".$_GET['term'];
//$wms="http://wms-sites.com/search_rss?SearchableText=spain";

// print "<h1>$wms</h1>\n";
$wms="http://wms-sites.com/search_rss?SearchableText=".$_GET['term'];
//$wms="spain_rss.xml";
$xml=simplexml_load_file($wms);
//print file_get_contents($wms);
 
 print "<div id='content'>
		<table border='0' class='sortable paginated'>
			 
<thead>
            <tr>
              
              <th class='sort-alpha'>WMS Service</th>
           
			       </tr>
          </thead>
		  <tbody>
			  ";
  foreach ($xml->item as $item)

 {
 
 $title=$item->title;
 $link=$item->link;

 $show_link="javascript:config.loadModel('wmsCapTemplate2','$link')";
 

 print "<tr class='even' style='display: table-row;'>";

 print "<td><a id='repaginate' href=".$show_link.">$title</a></td>\n";
 print "</tr>";
 }
print "</table>
       </div>
	   </tbody>";

 
?>
