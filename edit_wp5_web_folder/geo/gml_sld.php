<?php
require_once("../path_index.php");
//THIS SCRIPT CREATES THE SLD FOR SYMBOLIZING THE POLYGON JUST INSERTED ON DBASE BY data_insert.php
//IT CREATES THE FILTER BASED ON USERID
function isAjax() {
return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
    ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'));
}
if (!isAjax()) {echo "This is an incorrect way...";} 
else
{

$xml=$_POST['data'];

$userid=$_POST['user'];
//echo $userid;

$xml2 = str_replace("\"", "'", $xml);

$xml3 = str_replace("\\", "", $xml2);

$xml = simplexml_load_string($xml3);

$dom_new = new DOMDocument();
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'userid', $userid);
//$style = realpath('php_xsl/gml_sld.xsl');
$style=realpath("php_xsl/gml_sld.xsl");
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);


$dom_new->loadXML($xml3);
$out = $xsl->transformToXML($dom_new);

$random=(rand()%300).'_serialized.sld';

//$dom_new->asXML('../sld/'.$random);


$sld_path_towrite=DIR_PLATFORM."/geo/sld/temp";
//$sld_path_to_write=SLD_DIR2;


 $fp=fopen("$sld_path_towrite/$random","w");
 $write=fwrite($fp,$out);

 
	//commented by ftheeten
	echo URL_SITE."/edit_wp5/geo/sld/temp/$random";
	
}

?>
