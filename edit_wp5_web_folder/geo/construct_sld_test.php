<?
//require_once("../path_index.php");
 //header ("content-type: text/xml"); 
$userid=$_POST['userid'];
$sld_file=md5($_SERVER["REQUEST_URI"] ).".sld";
//$data=$_POST['data'];
//$data='xxx,yyy22';x
$data=$_POST['data'];
$sld=$_POST['sld'];
$to_filter=$_POST['to_filter'];
$xml2 = str_replace("\"", "'", $sld);

$sld = str_replace("\\", "", $xml2);
//$sld = simplexml_load_string($xml3);

$data=explode(',',$data);
//$xml='';

$sld_new="<?xml version='1.0'?>
<StyledLayerDescriptor xmlns='http://www.opengis.net/sld' xmlns:ogc='http://www.opengis.net/ogc' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' version='1.0.0' xsi:schemaLocation='http://www.opengis.net/sld StyledLayerDescriptor.xsd3'>
  <NamedLayer>
    <Name>topp:user_points</Name>
    <UserStyle>
      <FeatureTypeStyle>";
$sld_new.=$sld;
foreach ($data as $k=>$v)
{
	$sld_new.="
		<Rule>
	      <Name>$v</Name>
	      <ogc:Filter>
	        <And>
	          <ogc:PropertyIsEqualTo>
	            <ogc:PropertyName>userid</ogc:PropertyName>
	            <ogc:Literal>$userid</ogc:Literal>
	          </ogc:PropertyIsEqualTo>";
	  if ($to_filter=='specie')
	{
		$sld_new.="
				<ogc:PropertyIsEqualTo>
	            <ogc:PropertyName>specie</ogc:PropertyName>
	            <ogc:Literal>$v</ogc:Literal>
	          </ogc:PropertyIsEqualTo>";
	}
	else
	{
		$sld_new.="
				<ogc:PropertyIsEqualTo>
	            <ogc:PropertyName>genus</ogc:PropertyName>
	            <ogc:Literal>$v</ogc:Literal>
	          </ogc:PropertyIsEqualTo>";
	}
	       
	       $sld_new.="</And>
	      </ogc:Filter>
	      <PointSymbolizer>
	        <Graphic>
	          <Mark>
	            <WellKnownName>star</WellKnownName>
	            <Fill>
	              <CssParameter name='fill'>
	                <ogc:Literal>#1b242c</ogc:Literal>
	              </CssParameter>
	            </Fill>
	            <Stroke>
	              <CssParameter name='stroke'>
	                <ogc:Literal>#ed9692</ogc:Literal>
	              </CssParameter>
	              <CssParameter name='stroke-width'>
	                <ogc:Literal>0.4</ogc:Literal>
	              </CssParameter>
	            </Stroke>
	          </Mark>
	          <Opacity>
	            <ogc:Literal>1</ogc:Literal>
	          </Opacity>
	          <Size>
	            <ogc:Literal>15</ogc:Literal>
	          </Size>
	        </Graphic>
	      </PointSymbolizer>
	    </Rule>";
}
$sld_new.="
 	</FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>";

$xml = str_replace("\"", "'", $sld_new);

$sld_new2 = str_replace("\\", "", $xml);
//var_dump($sld_new2);
$d=new domDocument;
$d->loadXML($sld_new2);

$d->save("sld/$sld_file");
echo "http://edit.br.fgov.be/edit_wp5/geo/sld/$sld_file";
/*
$d=new domDocument;
$d->preserveWhiteSpace = false; 
$d->loadXML($sld_new);
$s=simplexml_import_dom($d);

*/

//$xml = simplexml_load_string($xml2);
//var_dump($xml);
/*$xml=new domDocument;
$xml->loadXML($sld_new);
$path='examples/xml/new2.xml';
$xml->asXML($path);
//echo URL_SITE."/edit_wp5/geo/sld/temp/$user/120dpi/$random";
*/
?>
