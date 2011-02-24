<?
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
$style = realpath('../php_xsl/gml_sld.xsl');
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($xml3);
$out = $xsl->transformToXML($dom_new);

$random=(rand()%300).'.sld';

//$dom_new->asXML('../sld/'.$random);

$DIR_PLATFORM="var/www/";
$sld_path_towrite=DIR_PLATFORM."/geo/sld/$userid";
// $fp=fopen($sld_path_towrite,"w");
 //$write=fwrite($fp,$out);
if (file_exists("$sld_path_towrite"))
{

$d = dir($sld_path_towrite); 
while($entry = $d->read()) { 
 if ($entry!= "." && $entry!= "..") { 
	//echo $entry;
 unlink($sld_path_towrite."/".$entry); 
 
 } 
 
} 
 $fp=fopen("$sld_path_towrite/$random","w");
 $write=fwrite($fp,$out);
$URL_SITE="http://193.190.116.6";
 echo $URL_SITE."/edit_wp5/geo/sld/$userid/$random";
$d->close(); 
}
else
{
mkdir ($sld_path_towrite,0777);chmod($sld_path_towrite,0777); 

 $fp=fopen("$sld_path_towrite/$random","w");
 $write=fwrite($fp,$out);
 
 echo $URL_SITE."/edit_wp5/geo/sld/$userid/$random";
}
}

?>
