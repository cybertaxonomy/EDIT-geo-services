<?php
include('JSON/JSON.php');
if ($_REQUEST["t"]=="") {
	$title = "Species";
} else {
	$title = $_REQUEST["t"];
}

$url = "http://data.gbif.org/species/classificationSearch?view=json&allowUnconfirmed=false&providerId=2&query=".($_REQUEST["t"]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

ob_start();
curl_exec ($ch);
curl_close ($ch);
$data = ob_get_contents();
var_dump($data);
ob_end_clean();
$json = json_decode($data,true); 

if(!$json) {
	echo("<h2>There is a problem with the json_decode function in PHP</h2>");
	die();
}
//echo($url);
//echo "<script type='text/javascript' src='../jquery/jquery.js'></script><script>$(document).ready(function(){console.log('hello td.php');});</script>";
$prev = "";
$realTaxonStart=false;
$count=0;
//$output="<div id='data'>";
$output="<script type='text/javascript' src=URL_SITE.'/edit_wp5/geo/mapviewer/jquery-1.3.2.js'></script><script></script>";
$currentLevel="";
$taxonTree="";
foreach($json['classificationSearch']['classification'] as $taxon) {
	if ($_REQUEST["t"]=="" && !$realTaxonStart) {
		$realTaxonStart = true;
	} 
	if ($realTaxonStart) {
	    $count++;
	    	
	    //Hack due problems with GBIF taxonomy
	    //Check if what we are going to include is below our current taxonomic level
	    if ($count==1) {
	        $currentLevel=$taxon['rank'];
	    }
	    
	    if ($taxon['rank'] == $currentLevel) {
	    
			if (substr($taxon['scientificName'],0,1) !=  $prev) {
			    $output.="<li class=\"group\">".substr($taxon['scientificName'],0,1)."</li>";	
			}
			$output.="<li>";
			$output.="<a class=\"detail\" href=\"td.php?id=".$taxon['partnerId']."&taxonName=".urlencode($taxon['scientificName'])."\">+</a>";
			$output.="<a href=\"tq.php?t=".$taxon['scientificName']."\">".$taxon['scientificName']."</a>";
			$output.="</li>";
			$prev = substr($taxon['scientificName'],0,1);
		}
	} else {
	    //We are higher on the taxonomy
	    $taxonTree .=$taxon['scientificName']."&raquo; ";
	    
		if ($taxon['scientificName'] == $_REQUEST["t"]) {
			$realTaxonStart=true;
			$actualTaxon = $taxon;
		}
	}
}

if ($count==0) {
    //We are on a lead node so show the detailed page
    $taxonId= $actualTaxon['partnerId'];
    $taxonName= $actualTaxon['scientificName'];
    include 'td.php';
} else {
    if (strlen($taxonTree)>1) {
         $output = "<li class=\"style2\">".$taxonTree."</li>".$output;   
    }
    $output = "<ul title=\"$title\">".$output."</ul>";
}

echo($output);

?>

