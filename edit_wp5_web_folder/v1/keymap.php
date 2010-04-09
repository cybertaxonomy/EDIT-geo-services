<?
//".URL_SITE."/edit_wp5/v1/keymap.php?bbox=-87.205002,6.7925,-75.955002,12.4175&dpi=120&area=&zoom=undefined


$o_bbox=$_GET['bbox'];
$bbox=explode(',',$o_bbox);
$area=$_GET['area'];
$dpi=$_GET['dpi'];


	switch ($area)
	{
		case 'world': $area_bbox='-180,-90,180,90';$width='700';$white='white_700.png';
			$height='350';break;
		case 'africa': $area_bbox='-25.361,-46.982,63.503,37.559';$width='500';$white='white_500.png';
			$height='500';break;
		case 'asia': $area_bbox='25.666,-12.209,153.987,55.432';$width='700';$white='white_700.png';
			$height='350';break;
		case 'europe_west': $area_bbox='-19.8,26.678571,70.2,71.678571';$width='700';$white='white_700.png';
			$height='350';break;
		case 'europe_east': $area_bbox='-2.057143,1.092857,182.057143,91.092857';	$width='700';$white='white_700.png';
			$height='350';break;
		case 'oceania': $area_bbox='46.542857,-63.45,226.542857,26.55';$width='700';$white='white_700.png';
		$height='350';break;
		case 'n_america': $area_bbox='-196.971429,-3.6,-16.971429,86.4';$white='white_700.png';
			$width='700';
			$height='350';break;
	
		case 's_america': $area_bbox='-109.454,-55.984,-28.849,15.865';$white='white_500.png';
						$width='500';
						$height='500';break;		
		case 'c_america': $area_bbox='-107.742857,5.785714,-62.742857,28.285714';$white='white_700.png';					$width='700';
							$height='350';break;				
												
	}
	if ($area=='world')
	{
		$layer='country_earth';
	}
	else
	{
		$layer=$area."_level_0";
	}
	
if ($_GET['zoom']=='world_zoom')
{
$area_bbox='-180,-90,180,90';	
}

$keymap=DIR_PLATFORM."/edit_wp5/geo/images/download/keymaps/".md5($_SERVER["REQUEST_URI"] ).".png";


$bbox2=$bbox['0']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['3']."%20".$bbox['2']."%2C".$bbox['3']."%20";
$bbox2.=$bbox['2']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['1'];

$url=URL_GEOSERVER."?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=350&WIDTH=700&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&";
$url.="BBOX=".$area_bbox."&SLD_BODY=";
$url.="%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3CStyledLayerDescriptor%20version=%221.0.0%22%20xmlns:gml=%22http://www.opengis.net/gml%22%20xmlns:ogc=%22http://www.opengis.net/ogc%22%20xmlns=%22http://www.opengis.net/sld%22%3E%3CUserLayer%3E%3CName%3Ejunk%3C/Name%3E%3CInlineFeature%3E%3CFeatureCollection%3E%3CfeatureMember%3E%3CBodyPart%3E%3CType%3EFace%3C/Type%3E%3CpolygonProperty%3E%3Cgml:Polygon%3E%3Cgml:outerBoundaryIs%3E%3Cgml:LinearRing%3E%3Cgml:coordinates%3E".$bbox2."%3C/gml:coordinates%3E%3C/gml:LinearRing%3E%3C/gml:outerBoundaryIs%3E%3C/gml:Polygon%3E%3C/polygonProperty%3E%3C/BodyPart%3E%3C/featureMember%3E%3C/FeatureCollection%3E%3C/InlineFeature%3E%3CLayerFeatureConstraints%3E%3CFeatureTypeConstraint%3E%3C/FeatureTypeConstraint%3E%3C/LayerFeatureConstraints%3E%3CUserStyle%3E%3CFeatureTypeStyle%3E%3CRule%3E%3CPolygonSymbolizer%3E%3CFill%3E%3CCssParameter%20name=%22fill%22%3E%3Cogc:Literal%3E%23F00620%3C/ogc:Literal%3E%3C/CssParameter%3E%3CCssParameter%20name=%22fill-opacity%22%3E%3Cogc:Literal%3E0.1%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Fill%3E%3CStroke%3E%3CCssParameter%20name=%22stroke%22%3E%3Cogc:Literal%3E%23FF0000%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Stroke%3E%3C/PolygonSymbolizer%3E%3C/Rule%3E%3C/FeatureTypeStyle%3E%3C/UserStyle%3E%3C/UserLayer%3E%3C/StyledLayerDescriptor%3E";


$world_url=URL_GEOSERVER."?LAYERS=".$layer."&GROUP=admin&TRANSPARENT=true&FORMAT=image%2Fpng&STYLES=line&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG%3A4326&BBOX=".$area_bbox."&WIDTH=".$width."&HEIGHT=".$height;

$c="convert '$url' '$keymap'";

shell_exec($c);
$random =(rand()%300).".png";
$c="composite  '$world_url' '$keymap'.DIR_PLATFORM."/edit_wp5/geo/images/download/keymaps/".$random."'";

shell_exec($c);
$c="composite DIR_PLATFORM.'/edit_wp5/geo/images/download/keymaps/".$random."' '$white' DIR_PLATFORM.'/edit_wp5/geo/images/download/keymaps/".$random."'";
shell_exec($c);


if ($_GET['img']=="true")
{
header("Content-Type: image/png");		
readfile(DIR_PLATFORM.'/edit_wp5/geo/images/download/keymaps/'.$random);
}
else
{
echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=png&file=download/keymaps/".$random;
}

$img_dir = DIR_PLATFORM."/edit_wp5/geo/images/download/keymaps";
$e = dir($img_dir);
$time=time();
while($entry = $e->read()) { 
 if ($entry!= "." && $entry!= "..") { 

	     $f_last_modified = filemtime($img_dir."/".$entry);

if ($time-$f_last_modified >1000)
{
unlink($img_dir."/".$entry);
}   

 } 
} 
$e->close();
?>