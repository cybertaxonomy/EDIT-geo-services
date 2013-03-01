<?
//require_once("../path_index.php");
//header('Content-type: text/xml');

//$_SERVER['QUERY_STRING']
$xml=$_POST['data'];
$user=$_POST['user'];

switch ($_POST['to_filter'])
{
case 'genus':
{
$s=(rand()%300);
$sld_file=md5($s).".sld";
break;
}
case '3_4':
{
	$s=(rand()%300);
	$sld_file=md5($s)."_sp.sld";	
	break;
//$sld_file=md5($s)."_sp.sld";	
}
case 'fourth':
{
	$s=(rand()%300);
	$sld_file=md5($s)."_fourth.sld";	
	break;
//$sld_file=md5($s)."_sp.sld";	
}
}
//$dpi=$_POST['dpi'];
//echo htmlentities($xml);
//$xml="<gml:prova xmlns:gml=\"http://www.opengis.net/gml\"><gml:gml>xxx</gml:gml></gml:prova>";

//var_dump($xml);
//$xml.='_XML_';



$xml2 = str_replace("\"", "'", $xml);

$xml3 = str_replace("\\", "", $xml2);


//$xmle='<g>xx</g>';
//var_dump($xml);
//$dom = new DOMDocument;
//$dom->loadXML('xml.xml');
/*
if (!$dom) {
    echo 'Error while parsing the document';
    exit;
}
*/

/*
$dom_sxe = dom_import_simplexml($xml);
if (!$dom_sxe) {
    echo 'Error while converting XML';
    exit;
}

$dom = new DOMDocument('1.0');
$dom_sxe = $dom->importNode($dom_sxe, true);
$dom_sxe = $dom->appendChild($dom_sxe);

echo $dom->saveXML();
*/
//$s = simplexml_import_dom($xml);
//$xml = file_get_contents('xml.xml');
//echo $xml;
//$dom = simplexml_load_file($xml);

$xml2 = simplexml_load_string($xml3);


$xml2->asXML("sld/$sld_file");
echo "http://edit.africamuseum.be/edit_wp5/geo/sld/$sld_file";
//$dom->TXLifeRequest->TransRefGUID=$guid;
//echo $dom->asXML();
?>
