<?php

require_once("../path_index.php");
require_once("./function_lib_rest_dev_full.php");

fct_rest_gen($_SERVER["REQUEST_URI"], $_REQUEST['legend'], $_REQUEST['l'], $_REQUEST['ad'], $_REQUEST['as'], $_REQUEST['ms'], $_REQUEST['bbox'], $_REQUEST['od'], $_REQUEST['os'], $_REQUEST['title'], $_REQUEST['label'], $_REQUEST['images_url'], $_REQUEST['symbols'], $_REQUEST['recalculate'], $_REQUEST['foo'], $_REQUEST['callback'], $_REQUEST['img'],
	$_REQUEST['externalwms'], $_REQUEST['externalwmslayer'], $_REQUEST['externalwmsversion'], $_REQUEST['externalwmsstyle'], $_REQUEST['mlp'], $_REQUEST['grayscale'], $_REQUEST['createimgforjson'], $_REQUEST['raster']
	);

?>
