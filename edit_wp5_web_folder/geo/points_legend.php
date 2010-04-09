<?
require_once("../path_index.php");
$leg=md5($_SERVER["REQUEST_URI"] ).'.png';
$legend=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=FALSE&WIDTH=32&HEIGHT=28&layer=topp:user_points&SLD=".$_GET['sld'];	
$c="convert '$legend' 'images/download/legends/$leg'";
//echo $c;
shell_exec($c);

echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=png&file=download/legends/$leg";
?>