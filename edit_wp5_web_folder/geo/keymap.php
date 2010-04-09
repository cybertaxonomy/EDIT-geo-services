<?
require_once("../path_index.php");
//header("Content-Type: image/png");
//$o_bbox='-47.80546760559085,9.714588165283203,57.66328239440915,69.0407600402832';
$o_bbox=$_GET['bbox'];
$up=$_GET['up'];
$bbox=explode(',',$o_bbox);

//$keymap=DIR_PLATFORM."/edit_wp5/geo/images/download/keymaps/".md5($_SERVER["REQUEST_URI"] ).".png";

$keymap=KEYMAP_DIR."/".md5($_SERVER["REQUEST_URI"] ).".png";

$bbox2=$bbox['0']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['3']."%20".$bbox['2']."%2C".$bbox['3']."%20";
$bbox2.=$bbox['2']."%2C".$bbox['1']."%20".$bbox['0']."%2C".$bbox['1'];

//$url=URL_GEOSERVER."?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=350&WIDTH=700&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&";
$url=URL_GEOSERVER."?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=350&WIDTH=700&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&";
$url.="BBOX=-180,-90,180,90&SLD_BODY=";
$url.="%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3CStyledLayerDescriptor%20version=%221.0.0%22%20xmlns:gml=%22http://www.opengis.net/gml%22%20xmlns:ogc=%22http://www.opengis.net/ogc%22%20xmlns=%22http://www.opengis.net/sld%22%3E%3CUserLayer%3E%3CName%3Ejunk%3C/Name%3E%3CInlineFeature%3E%3CFeatureCollection%3E%3CfeatureMember%3E%3CBodyPart%3E%3CType%3EFace%3C/Type%3E%3CpolygonProperty%3E%3Cgml:Polygon%3E%3Cgml:outerBoundaryIs%3E%3Cgml:LinearRing%3E%3Cgml:coordinates%3E".$bbox2."%3C/gml:coordinates%3E%3C/gml:LinearRing%3E%3C/gml:outerBoundaryIs%3E%3C/gml:Polygon%3E%3C/polygonProperty%3E%3C/BodyPart%3E%3C/featureMember%3E%3C/FeatureCollection%3E%3C/InlineFeature%3E%3CLayerFeatureConstraints%3E%3CFeatureTypeConstraint%3E%3C/FeatureTypeConstraint%3E%3C/LayerFeatureConstraints%3E%3CUserStyle%3E%3CFeatureTypeStyle%3E%3CRule%3E%3CPolygonSymbolizer%3E%3CFill%3E%3CCssParameter%20name=%22fill%22%3E%3Cogc:Literal%3E%23F00620%3C/ogc:Literal%3E%3C/CssParameter%3E%3CCssParameter%20name=%22fill-opacity%22%3E%3Cogc:Literal%3E0.1%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Fill%3E%3CStroke%3E%3CCssParameter%20name=%22stroke%22%3E%3Cogc:Literal%3E%23FF0000%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Stroke%3E%3C/PolygonSymbolizer%3E%3C/Rule%3E%3C/FeatureTypeStyle%3E%3C/UserStyle%3E%3C/UserLayer%3E%3C/StyledLayerDescriptor%3E";

//$u=URL_GEOSERVER."?validateSchema=true&FORMAT=image/png&TRANSPARENT=TRUE&HEIGHT=350&WIDTH=700&REQUEST=GetMap&SRS=EPSG:4326&VERSION=1.1.1&BBOX=-180,-90,180,90&SLD_BODY=%3C?xml%20version=%221.0%22%20encoding=%22UTF-8%22?%3E%3CStyledLayerDescriptor%20version=%221.0.0%22%20xmlns:gml=%22http://www.opengis.net/gml%22%20xmlns:ogc=%22http://www.opengis.net/ogc%22%20xmlns=%22http://www.opengis.net/sld%22%3E%3CUserLayer%3E%3CName%3Ejunk%3C/Name%3E%3CInlineFeature%3E%3CFeatureCollection%3E%3CfeatureMember%3E%3CBodyPart%3E%3CType%3EFace%3C/Type%3E%3CpolygonProperty%3E%3Cgml:Polygon%3E%3Cgml:outerBoundaryIs%3E%3Cgml:LinearRing%3E%3Cgml:coordinates%3E-47.80546760559085,9.714588165283203 -47.80546760559085,69.0407600402832 57.66328239440915,69.0407600402832 57.66328239440915%2C9.714588165283203%20-47.80546760559085%2C9.714588165283203%3C/gml:coordinates%3E%3C/gml:LinearRing%3E%3C/gml:outerBoundaryIs%3E%3C/gml:Polygon%3E%3C/polygonProperty%3E%3C/BodyPart%3E%3C/featureMember%3E%3C/FeatureCollection%3E%3C/InlineFeature%3E%3CLayerFeatureConstraints%3E%3CFeatureTypeConstraint%3E%3C/FeatureTypeConstraint%3E%3C/LayerFeatureConstraints%3E%3CUserStyle%3E%3CFeatureTypeStyle%3E%3CRule%3E%3CPolygonSymbolizer%3E%3CFill%3E%3CCssParameter%20name=%22fill%22%3E%3Cogc:Literal%3E%23F00620%3C/ogc:Literal%3E%3C/CssParameter%3E%3CCssParameter%20name=%22fill-opacity%22%3E%3Cogc:Literal%3E1.0%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Fill%3E%3CStroke%3E%3CCssParameter%20name=%22stroke%22%3E%3Cogc:Literal%3E%23FF0000%3C/ogc:Literal%3E%3C/CssParameter%3E%3C/Stroke%3E%3C/PolygonSymbolizer%3E%3C/Rule%3E%3C/FeatureTypeStyle%3E%3C/UserStyle%3E%3C/UserLayer%3E%3C/StyledLayerDescriptor%3E";



$c="convert '$url' '$keymap'";

shell_exec($c);
$c="composite  'world_700.png' '$keymap'  '$keymap'";
shell_exec($c);

//$c="convert -border 4 '$keymap'";shell_exec($c);
//readfile($keymap);
echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=png&file=download/keymaps/".md5($_SERVER["REQUEST_URI"] ).".png";

?>
