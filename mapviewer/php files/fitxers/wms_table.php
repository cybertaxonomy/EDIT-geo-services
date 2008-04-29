<?php
//we pass the SEARCH PARAMETER  and get a RSS file with the title and the URL to the GetCapabilities!!! (that's all we need)
$wms="http://wms-sites.com/search_rss?SearchableText=".$_GET['term'];

$xml=simplexml_load_file($wms);

//THE DATA "PRINTED" HERE WILL BE THE ANSWER TO THE AJAX REQUEST; WILL BE PRINTED IN A NEWLY CREATED <DIV>
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

 //WHEN WE CLICK THIS LINK WE WILL GET THE LAYERS OF THIS WMS SERVICE (this last action is done by mapbuilder)
//then, user click on any result and get the layer 
 $show_link="javascript:config.loadModel('wmsCapTemplate2','$link')";
 

 print "<tr class='even' style='display: table-row;'>";

 print "<td><a id='repaginate' href=".$show_link.">$title</a></td>\n";
 print "</tr>";
 }
print "</table>
       </div>
	   </tbody>";

 
?>
