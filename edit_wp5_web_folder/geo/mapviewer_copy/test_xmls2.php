<?

//header('Content-type: text/xml');

//$_SERVER['QUERY_STRING']
$xml=$_POST['data'];
$user=$_POST['user'];


$s=(rand()%300);
$sld_file=md5($s).".sld";


$xml2 = str_replace("\"", "'", $xml);

$xml3 = str_replace("\\", "", $xml2);


$xml2 = simplexml_load_string($xml3);


$xml2->asXML("../sld/$sld_file");
echo "http://taxonomicindex.africamuseum.be/edit_wp5/geo/sld/$sld_file";
//$dom->TXLifeRequest->TransRefGUID=$guid;
//echo $dom->asXML();
?>