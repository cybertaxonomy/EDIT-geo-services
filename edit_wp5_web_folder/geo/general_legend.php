<?php
require_once("../path_index.php");

$data=$_GET['data'];
$s=explode('|',$data);
$legends=array();
$leg=(rand()%30000).".png";
//$leg_img="images/download/".md5($_SERVER["REQUEST_URI"] ).".png";
$leg_img=IMG_DOWNLOAD."/".$leg;
foreach ($s as $k=>$v)
{

$z=explode(',',$v);
$layer=$z[1];
$style=$z[0];
//$url=URL_GEOSERVER."/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&LAYER=topp:".$layer;
//$url.="&STYLE=".$style."&TRANSPARENT=false&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";
$url=URL_GEOSERVER."/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&LAYER=topp:".$layer;
$url.="&STYLE=".$style."&TRANSPARENT=false&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";
$legends['urls'][]=$url;
}
$i=0;
//var_dump($legends['urls'][$i]);
$count=count($legends['urls']);
//$c="convert -size '144x100' xc:white 'inicial.png'";
//CAMBIAR!!!!

for ($i=0;$i<($count-1);$i++)
{
if ($i==0)
{
$c="convert -size '144x100' -append '".$legends['urls'][0]."' '".$legends['urls'][1]."' '$leg_img'";
//echo $c;
shell_exec($c);
}
else
{

$next=$i+1;
$c="convert -size '144x100' -append '$leg_img' '".$legends['urls'][$next]."' '$leg_img'";
shell_exec($c);

}
}
$c="convert -transparent white '$leg_img' '$leg_img'";
shell_exec($c);


//echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=png&file=download/".md5($_SERVER["REQUEST_URI"] ).".png";
echo URL_IMG."/edit_images.php?format=png&file=download/$leg";

?>
