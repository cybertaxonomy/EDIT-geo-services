<?php
require_once("../path_index.php");
require_once("./function_lib_rest_dev_full.php");

$p_img="";
if($_REQUEST['img'])
{
	$p_img=$_REQUEST['img'];
}
if($_REQUEST['image'])
{
	$p_img=$_REQUEST['image'];
}
$p_layers=str_replace('v:','',$_REQUEST['l']);

fct_rest_gen($_SERVER["REQUEST_URI"], $_REQUEST['legend'], $p_layers, $_REQUEST['ad'], $_REQUEST['as'], $_REQUEST['ms'], $_REQUEST['bbox'],$_REQUEST['od'],$_REQUEST['os'], $_REQUEST['title'], $_REQUEST['label'], $_REQUEST['images_url'], $_REQUEST['symbols'], $_REQUEST['recalculate'], $_REQUEST['foo'], $_REQUEST['callback'], $p_img,
	$_REQUEST['externalwms'], $_REQUEST['externalwmslayer'], $_REQUEST['externalwmsversion'], $_REQUEST['externalwmsstyle'], $_REQUEST['mlp'], $_REQUEST['grayscale'],  $_REQUEST['createimgforjson'], $_REQUEST['raster']
	);
?>
