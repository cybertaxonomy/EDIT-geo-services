<?php

if ($_REQUEST['page']!="") {
    $page = $_REQUEST['page'];
} else {
    $page = 0;
}

if (strlen($_REQUEST["speciesName"])<1) {
    echo("<h2>You must enter at least one character.</h2>");
	die();
}
$url = "http://data.gbif.org/species/nameSearch?maxResults=26&returnType=nameId&startIndex=$page&view=json&query=".urlencode($_REQUEST["speciesName"]);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

ob_start();
curl_exec ($ch);
curl_close ($ch);
$data = ob_get_contents();
ob_end_clean();
$json = json_decode($data,true); 
if(!$json) {
	echo("<h2>There is a problem with the json_decode function in PHP</h2>");
	die();
}


if ($page==0) {
    echo("<ul title=\"Search Results\">");
}

$count=0;
foreach($json['Resultset']['Result'] as $taxon) {
    $count++;
    if ($count<26) {
        echo("<li>");
        echo("<a class=\"detail\" href=\"td.php?id=".$taxon['id']."&taxonName=".urlencode($taxon['scientificName'])."\">+</a>");
    	echo("<a href=\"tq.php?t=".urlencode($taxon['scientificName'])."\">".$taxon['scientificName']."</a>");
    	echo("</li>");
    } else {
        echo("<li><a href=\"ts.php?page=".($page+1)."&speciesName=".urlencode($_REQUEST["speciesName"])."\" target=\"_replace\">Get 25 More Names...</a></li>");
    }
}

if ($page==0) {
    echo("</ul>");
}
?>

