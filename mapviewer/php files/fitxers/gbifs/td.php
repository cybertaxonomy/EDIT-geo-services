
<?php

include('getGbifStats.php');
if ($taxonId < 1) {
    $taxonId = $_REQUEST['id'];
}
if (strlen($taxonName) < 1) {
    $taxonName = $_REQUEST['taxonName'];
}

//echo "<script type='text/javascript' src='../jquery/jquery.js'></script><script>$(document).ready(function(){console.log('hello td.php');});</script>";
//Get classification data
$url = "http://data.gbif.org/species/classificationSearch?view=json&retrieveChildren=false&providerId=1&query=".$taxonId;
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
	echo("<h2>There is a problem with the json_decode function in PHP. <a href=\"$url\">$url</a></h2>");
	die();
}

$class="";
$counter=0;
$spaces="";
foreach($json['classificationSearch']['classification'] as $taxon) {
    
    for ($i=0;$i<$counter;$i++) {
        $spaces.="&nbsp;";
    }
    if ($taxon['id']!=$taxonId) {  
    	$class.=$spaces."<span class=\"style1\"><em>".ucwords($taxon['rank']).":</em> <b><a href=\"tq.php?t=".$taxon['scientificName']."\">".$taxon['scientificName']."</a></b> (<a href=\"td.php?id=".$taxon['id']."&taxonName=".$taxon['scientificName']."\">+</a>) <br />";
    } else {
    	$class.=$spaces."<span class=\"style1\"><em>".ucwords($taxon['rank']).":</em> <b>".$taxon['scientificName']."</a></b><br />";
        
    }
    $counter++;
}


function dump_child_nodes($node){
    $owner_document = $node->owner_document();
    $children = $node->child_nodes();
    $total_children = count($children);
    for ($i = 0; $i < $total_children; $i++){
        $cur_child_node = $children[$i];
        $output .= $owner_document->dump_node($cur_child_node);
    }
    return $output;
}

//Scrap the GBIF website to get some data
$url = "http://data.gbif.org/species/".$taxonId;
require_once('HttpClient.class.php');
$client = new HttpClient('data.gbif.org', 80);
$client->setDebug(false);
$client->post('/terms.htm', array (
	'acceptedTerms' =>"Accept terms",
	'forwardUrl' =>$url
));
$data = $client->getContent();

//echo($data);
//die();

$dom = new DOMDocument();
@$dom->loadHTML($data);
$xpath = new DOMXPath($dom);


$OccGeoref = $xpath->evaluate("//div[@id='globalOverviewLinks' or @id='globalOverviewContainer']/p/span[1]")->item(0)->nodeValue;

$totalOcc = $xpath->evaluate("//div[@id='globalOverviewLinks' or @id='globalOverviewContainer']/p/span[2]")->item(0)->nodeValue;

$nameStatus = $xpath->evaluate("/html/body/div[2]/div/div[3]/table/tr[4]/td[2]")->item(0)->nodeValue;
//*[@id="markerPosition"]
if (strlen($UL_x)<0)
{
	"echo no coord";
} 
$UL_x= 
$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[1]/td[2]")->item(0)->nodeValue; //upper left (x)

$UL_y=$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[2]/td[1]")->item(0)->nodeValue; //upper left (y)

$BR_y=$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[4]/td[2]")->item(0)->nodeValue; //below left (x)

$BR_x=$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[5]/td[4]")->item(0)->nodeValue; //below right (x)

if ($UL_x)
$ul="[".$UL_x.",".$UL_y."]";
$br="[".$BR_x.",".$BR_y."]";
$array=$ul.",".$br;
$zoom_to="config.objects.mainMap.extent.zoomToBox(".$array.")";
$BBOX="(".$UL_x.","."$UL_y".")"."(".$BR_x.","."$BR_y".")";

$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[3]/td[3]/ul/li[3]")->item(0)->nodeValue; //east
$xpath->evaluate("/html/body/div[2]/div/div[3]/div[4]/table/tr[3]/td[3]/ul/li[4]")->item(0)->nodeValue; //sout
//nord, oeas,est,sud
//$xpath->evaluate("//div[@id='content']/div[3]/table/tr[2]/td[2]/ul/li[0]")->item(0)->nodeValue; 

//=$xpath->evaluate("//div[@class='subcontainer']/table/tr[2]/td[2]/ul[0]/li[0]")->item(0)->nodeValue; 

//html/body/div[3]/table[0]/tbody/tr[2]/td[2]/ul[0]/li[0]")->item(0)->nodeValue; 
//$xpath->evaluate("*[@id='northCoordinate']")->item(0)->nodeValue;
//$reviewDate = $xpath->evaluate("/html/body/div[2]/div/div[3]/table/tr[9]/td[2]")->item(0)->nodeValue;

if ($xpath->evaluate("//div[@class='taxonImage']/a/img")->length >0) {
    $imageSrc = $xpath->evaluate("//div[@class='taxonImage']/a/img")->item(0)->getAttribute('src');
}

?>
<div id="taxonDetail" class="panel" title="<?php echo($taxonName) ?>">
    <h2><?php echo($taxonName) ?> (<?php echo($taxonId) ?>)</h2>
    <fieldset>
      	<div class="textRow">
            <p><?php echo($class) ?></p>
          </div>
    	<div class="row"><label>Name status: <span class="notbold"><?php echo($nameStatus) ?></span></label></div>
    <?php if (strlen($reviewDate)>0){ ?>
    	<div class="row"><label>Review date: <span class="notbold"><?php echo($reviewDate) ?></span></label></div>
    <?php } ?>    
    </fieldset>
  <h2>Ocurrences</h2>
    <fieldset>
    <?php
    if (strlen($totalOcc)>0){
	?>
	  	<div class="row">
            <label>Occurrences: <span class="notbold"><?php echo($totalOcc) ?> records</span></label>
          </div>
<?php } else { ?>
	 <div class="textRow"><p>No occurrences for this taxon</p></div> 
	
	<?php }
	if (strlen($OccGeoref)>0){
	?>
	  	<div class="row">
              <label>Georeferenced: <span class="notbold"><?php echo($OccGeoref) ?> records <? //echo($BBOX); ?></span></label>
            </div>
        <?php } else { ?>
	 <div class="textRow"><p>No georeferenced occurrence for this taxon</p></div> 
	<?php } ?>
	
    </fieldset>  
<?php 
if (strlen($OccGeoref)>0){
	?>
  <h2>Density map</h2>    
      <fieldset>
      	<div class="textRow">
            <p><a href="http://geoserver.gbif.org/wms?bbox=-180,-90,180,90&styles=,&Format=image/png&request=GetMap&layers=gbif:countries,gbif:gbifDensityLayer&width=1500&height=800&srs=EPSG:4326&FILTER=(%20)(%3CFilter%3E%3CAnd%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Etype%3C/PropertyName%3E%3CLiteral%3E1%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Econcept%3C/PropertyName%3E%3CLiteral%3E<?php echo($taxonId)  ?>%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/And%3E%3C/Filter%3E)&bgcolor=0x7391AD" target="_blank">
			
	    <a style="visibility:hidden"> <?php echo($taxonId) ?></a>
	  <p>
        <a id="map_it">Visualize it on mapViewer</a> 
	     <?php /*
//	if($xpath->evaluate("/html/body/div[2]/div/div[3]/table/tr[4]/td[2]")->item(0)->length==0) {
		if (!strlen($UL_x)==0) {
			echo "<a style='visibility:hidden'>".$zoom_to."</a><br><a id='zoom_it'>Visualize and zoom on mapViewer</a>";
	}*/
//	else {echo "you cannot zoom";}
	?> 
            <img src="http://geoserver.gbif.org/wms?bbox=-180,-90,180,90&styles=,&Format=image/png&request=GetMap&layers=gbif:countries,gbif:gbifDensityLayer&width=1500&height=800&srs=EPSG:4326&FILTER=(%20)(%3CFilter%3E%3CAnd%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Etype%3C/PropertyName%3E%3CLiteral%3E1%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Econcept%3C/PropertyName%3E%3CLiteral%3E<?php echo($taxonId) ?>%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/And%3E%3C/Filter%3E)&bgcolor=0x7391AD" alt="Map of occurrences for <?php echo($taxonName) ?>" width="300" height="163" /></p>
            </a>
            <!--p><iframe src="http://data.gbif.org/species/<?php echo($taxonId) ?>/mapWidget?size=xsmall" frameborder="0" hspace="1" vspace="1" scrolling="no" width="310px" height="220px"></iframe></p -->
      </div>
    </fieldset>
<?php } ?>

<?php
if (strlen($totalOcc)>0){
?>    
  <h2>Datasets</h2>
<div class="browseBox">
  <ul class="browsableList">
    <li><a href="#" target="_self">This is not ready</a></li>
  </ul>
 </div>
<?php } ?>
    
  <h2>Stats</h2>
    <fieldset>
    <?php if (strlen($OccGeoref)>0){ ?>
      	<div class="textRow">
      	    <p>Occurrences per country</p>
            <p><img src="<?php echo(countryOcurrencesMapByTaxon($taxonName)); ?>" /></p>
        </div>
    <?php } else { ?>
          	<div class="textRow">Sorry, no stats available</div>    
    <?php } ?>
    </fieldset>
    
  <h2>Images</h2>
  <?php if(strlen($imageSrc)>0) { ?>
      <fieldset>
        	<div class="textRow"><p><a href="<?php echo($imageSrc) ?>" target="_blank"><img src="<?php echo($imageSrc) ?>" align="left" border="0" width="282" /></a></p></div>
        </fieldset>   
  <?php } else { ?>
      <fieldset>
        	<div class="textRow">Sorry, no images available</div>
        </fieldset>      
  <?php } ?>
    
</div>