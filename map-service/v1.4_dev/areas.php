<?php
require_once("./path_index.php");
require_once("./function_lib_rest_dev_full.php");
error_reporting(0);

$autoCompletedData=autocompleteAreaData($_REQUEST["ad"]);
//print($autoCompletedData);
$tmpStyleInfo=rewrite_styles_aliases($_REQUEST["as"], $autoCompletedData);

fct_rest_gen(
//1
$_SERVER["REQUEST_URI"], 
//2
$_REQUEST['legend'], 
//3
$_REQUEST['l'], 
//4
$tmpStyleInfo["layers"],
//5
$tmpStyleInfo["styles"],
//6
$_REQUEST['ms'], 
//7
$_REQUEST['bbox'], 
//8
$_REQUEST['od'], 
//9
$_REQUEST['os'], 
//10
$_REQUEST['title'], 
//11
$_REQUEST['label'], 
//12
$_REQUEST['images_url'], 
//13
$_REQUEST['symbols'], 
//14
$_REQUEST['recalculate'], 
//15
$_REQUEST['foo'], 
//16
$_REQUEST['callback'], 
//17
$_REQUEST['img'],
//18
$_REQUEST['externalwms'], 
//19
$_REQUEST['externalwmslayer'], 
//20
$_REQUEST['externalwmsversion'], 
//21
$_REQUEST['externalwmsstyle'], 
//22
$_REQUEST['externalwmsfilter'],
//23
$_REQUEST['mlp'], 
//24
$_REQUEST['grayscale'], 
//25
$_REQUEST['createimgforjson'], 
//26
$_REQUEST['raster'], 
//27
$_REQUEST['wmsforeground'],

//28
$_REQUEST['dest_projection_epsg']
	);
?>