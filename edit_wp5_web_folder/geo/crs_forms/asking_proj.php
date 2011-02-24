<?php
//require_once("../../path_index.php");
$URL_SITE="http://193.190.116.6";
			$conn = pg_connect('host=localhost port=5432  password=fv30714$A  user=postgres dbname=edit_geo_mirror');
if (!isset($_GET['source']))
{
	
$proj=$_GET['proj'];
$proj=explode(':',$proj);
$proj=$proj[1];


//$conn = pg_connect(POSTGIS_CS);
	if (pg_ErrorMessage($conn)) 
	    { 
		 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
		 }
		else
		{
			$sql="select area,lat_lon,proj_bbox from edit_crs where code='$proj' and area='".$_GET['area']."'";


			$result=pg_query($sql);


				while ($row = pg_fetch_array($result, NULL, PGSQL_ASSOC)) 
				{
				
					$lat_lon=str_replace(" ","",$row['lat_lon']);
					$proj_bbox=$row['proj_bbox'];
					//echo $script;xx,x,,x
											
					
				}
					$bbox=explode(',',$lat_lon);
					$bbox2=$bbox['0']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['3']."%20".$bbox['2']."%2C".$bbox['3']."%20";
					$bbox2.=$bbox['2']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['1'];
			
$url="http://193.190.116.6:8080/geoserver/wms?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=250&WIDTH=500&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&BBOX=-180,-90,180,90&SLD_BODY=";
					$url.="%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3CStyledLayerDescriptor%20version=%221.0.0%22%20xmlns:gml=%22http://www.opengis.net/gml%22%20xmlns:ogc=%22http://www.opengis.net/ogc%22%20xmlns=%22http://www.opengis.net/sld%22%3E%3CUserLayer%3E%3CName%3Ejunk%3C/Name%3E%3CInlineFeature%3E%3CFeatureCollection%3E%3CfeatureMember%3E%3CBodyPart%3E%3CType%3EFace%3C/Type%3E%3CpolygonProperty%3E%3Cgml:Polygon%3E%3Cgml:outerBoundaryIs%3E%3Cgml:LinearRing%3E%3Cgml:coordinates%3E".$bbox2."%3C/gml:coordinates%3E%3C/gml:LinearRing%3E%3C/gml:outerBoundaryIs%3E%3C/gml:Polygon%3E%3C/polygonProperty%3E%3C/BodyPart%3E%3C/featureMember%3E%3C/FeatureCollection%3E%3C/InlineFeature%3E%3CLayerFeatureConstraints%3E%3CFeatureTypeConstraint%3E%3C/FeatureTypeConstraint%3E%3C/LayerFeatureConstraints%3E%3CUserStyle%3E%3CFeatureTypeStyle%3E%3CRule%3E%3CPolygonSymbolizer%3E%3CFill%3E%3CCssParameter%20name=%22fill%22%3E%3Cogc:Literal%3E%23F00620%3C/ogc:Literal%3E%3C/CssParameter%3E%3CCssParameter%20name=%22fill-opacity%22%3E%3Cogc:Literal%3E0.1%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Fill%3E%3CStroke%3E%3CCssParameter%20name=%22stroke%22%3E%3Cogc:Literal%3E%23FF0000%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Stroke%3E%3C/PolygonSymbolizer%3E%3C/Rule%3E%3C/FeatureTypeStyle%3E%3C/UserStyle%3E%3C/UserLayer%3E%3C/StyledLayerDescriptor%3E";
		
	
					$r=md5($_SERVER["REQUEST_URI"] ).".png";
					$c="convert '$url' 'img/keymap2.png'";

					shell_exec($c);

					
					$c="composite 'img/keymap2.png' 'img/world.png' 'img/$r'";
					
					shell_exec($c);
					$code="<div id=EPSG:".$proj.">EPSG Projection code :".$proj."<ul>";
					$code.="<li>Latitude/longitude bounding box :<b>".$lat_lon."</b></li>";
					$code.="<li>Projected bounding box :<b>".$proj_bbox."</b></li>";					
					$a="<a href='$URL_SITE/edit_wp5/geo/crs_forms/img/$r' title='$code'><img style='visibility:hidden' src='$URL_SITE/edit_wp5/geo/crs_forms/img/$r'></img></a>";
			echo $a;
			
	

			
				
		}	


/*
$url = "http://www.spatialreference.org/ref/epsg/".$proj;
//echo $url;
require_once('HttpClient.class.php');
$client = new HttpClient('www.spatialreference.org', 80);
$client->setDebug(false);
$client->get($url);
//$response = $client->currentResponse();
$data = $client->getContent();
//echo($data);
$dom = new DOMDocument();
@$dom->loadHTML($data);
$xpath = new DOMXPath($dom);

$wgs84 = $xpath->evaluate("//div[@id='content']/ul/li[1]/b")->item(0)->nodeValue;
//echo $wgs84;

$script = $xpath->evaluate("//div[@id='content']/ul/li[1]/script")->item(0)->nodeValue;
//var bounds = new OpenLayers.Bounds(-12.0, 36.149999999999999, -6.0, 60.0); 
$coords=explode('(',$script);
$coords=explode(')',$coords[1]);
$lat_lon=str_replace(" ","",$coords[0]);

//echo $script;xx,x,,x
$bbox=explode(',',$lat_lon);


$bbox2=$bbox['0']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['3']."%20".$bbox['2']."%2C".$bbox['3']."%20";
$bbox2.=$bbox['2']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['1'];
//echo $bbox2;
//$bbox2='-180,-90 180,-90 180,90 -180,90 -180,-90';
$url=URL_GEOSERVER."?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=250&WIDTH=500&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&";
$url.="BBOX=-180,-90,180,90&SLD_BODY=";				
$url.="%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3CStyledLayerDescriptor%20version=%221.0.0%22%20xmlns:gml=%22http://www.opengis.net/gml%22%20xmlns:ogc=%22http://www.opengis.net/ogc%22%20xmlns=%22http://www.opengis.net/sld%22%3E%3CUserLayer%3E%3CName%3Ejunk%3C/Name%3E%3CInlineFeature%3E%3CFeatureCollection%3E%3CfeatureMember%3E%3CBodyPart%3E%3CType%3EFace%3C/Type%3E%3CpolygonProperty%3E%3Cgml:Polygon%3E%3Cgml:outerBoundaryIs%3E%3Cgml:LinearRing%3E%3Cgml:coordinates%3E".$bbox2."%3C/gml:coordinates%3E%3C/gml:LinearRing%3E%3C/gml:outerBoundaryIs%3E%3C/gml:Polygon%3E%3C/polygonProperty%3E%3C/BodyPart%3E%3C/featureMember%3E%3C/FeatureCollection%3E%3C/InlineFeature%3E%3CLayerFeatureConstraints%3E%3CFeatureTypeConstraint%3E%3C/FeatureTypeConstraint%3E%3C/LayerFeatureConstraints%3E%3CUserStyle%3E%3CFeatureTypeStyle%3E%3CRule%3E%3CPolygonSymbolizer%3E%3CFill%3E%3CCssParameter%20name=%22fill%22%3E%3Cogc:Literal%3E%23F00620%3C/ogc:Literal%3E%3C/CssParameter%3E%3CCssParameter%20name=%22fill-opacity%22%3E%3Cogc:Literal%3E0.1%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Fill%3E%3CStroke%3E%3CCssParameter%20name=%22stroke%22%3E%3Cogc:Literal%3E%23FF0000%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Stroke%3E%3C/PolygonSymbolizer%3E%3C/Rule%3E%3C/FeatureTypeStyle%3E%3C/UserStyle%3E%3C/UserLayer%3E%3C/StyledLayerDescriptor%3E";	


$bb_lat_lon="";
foreach ($bbox as $k=>$v)
{
	$bb_lat_lon.=round($v,3);
	if ($k<3)
	{
	$bb_lat_lon.=" , ";
	}
}
$b = $xpath->evaluate("//div[@id='content']/ul/li[2]")->item(0)->nodeValue;
$b=explode(':',$b);

$bb_proj="";
$proj_bb=explode(',',$b[1]);
foreach ($proj_bb as $k=>$v)
{
	$bb_proj.=round($v,3);
	if ($k<3)
	{
	$bb_proj.=" , ";
	}
}

//$url2=URL_GEOSERVER."?LAYERS=country_earth&TRANSPARENT=true&STYLES=&FORMAT=image%2Fpng&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A4326&BBOX=-180,-90,180,90&WIDTH=500&HEIGHT=250";
//$s="composite $url $url2 'img.png'";

$c="convert '$url' 'img/keymap.png'";
shell_exec($c);

$r=md5($_SERVER["REQUEST_URI"] ).".png";
$c="composite 'img/keymap.png' 'img/world.png' 'img/$r'";
shell_exec($c);	

//readfile('img/keymap2.png');
$area = $xpath->evaluate("//div[@id='content']/ul/li[5]")->item(0)->nodeValue;
//$area2=str_replace('Ã‚Â','',$area);
//echo $area2;
$area=explode(':',$area);


//Ã‚Â
$code="<div id=".$proj.">EPSG Projection code :".$proj."<ul>";
$code.="<li>Area covering this projection :<b>".$area[1]."</b></li>";
$code.="<li>Latitude/longitude bounding box :<b>".$bb_lat_lon."</b></li>";
$code.="<li>Projected bounding box :<b>".$bb_proj."</b></li>";
//$code.="<img style='width:250;height:125' src='http://localhost:8888/img/$r'/></div>";
$array="<a href='http://161.111.16.45/crs_forms/img/$r' title='$code'><img style='visibility:hidden' src='$url2'></img></a>";
echo $array;
*/
}
else
{
	$proj=$_GET['proj'];
	$proj=explode(':',$proj);
	$proj=$proj[1];
	$conn = pg_connect(POSTGIS_CS);
		if (pg_ErrorMessage($conn)) 
		    { 
			 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
			 }
			else
			{	
			$sql="select proj4text from spatial_ref_sys where srid=".$proj;
			
		//	echo $sql;
			$result=pg_query($sql);

				while ($row = pg_fetch_array($result, NULL, PGSQL_ASSOC))
					 {
					//	Proj4js.defs["EPSG:23030"] = "+proj=utm +zone=30 +ellps=intl +units=m +no_defs";	
						echo 'Proj4js.defs["EPSG:'.$proj.'"]="'.$row['proj4text'].'"';
						}
			
			}
}

?>
