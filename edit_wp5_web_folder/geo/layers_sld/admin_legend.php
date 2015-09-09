<?php
//LINE type
$data=explode('/',$_GET['l']);

$c=$data[1];
switch	($c)
{
	case 'c_america': $c2="Central America";break;
	case 'n_america': $c2="North America";break;
	case 's_america': $c2="South America";break;	
	case 'africa': $c2="Africa";break;
	case 'oceania': $c2="Oceania";break;	
	case 'asia': $c2="Asia";break;
	case 'antartica': $c2="Antartica";break;
	case 'europe': $c2="Europe";	break;				
}	
$layer='topp:'.$data[0];
$params=explode('_',$data[0]);
$s=count($params)-1;

$level=$params[$s];

switch	($level)
{
	case 0:$s_color="3a4a59";$s_width="2";break;
	case 1:$s_color="7271ad";$s_width="1.6";break;
	case 2:$s_color="a84505";$s_width="1";break;
}
  
header("Content-type: text/xml");

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>

<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:wfs="http://www.opengis.net/wfs" version="1.0.0"
xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3">

<!-- a named layer is the basic building block of an sld document -->
<NamedLayer>
<Name><? echo $layer ?></Name>

<!-- with in a layer you have Named Styles -->
<UserStyle>
<FeatureTypeStyle>
   <Rule>    
<Name><? echo $c2." level ".$level ?></Name>

             <LineSymbolizer>
    <Stroke>
     <CssParameter name="stroke"><? echo "#".$s_color ?></CssParameter>
                  <CssParameter name="stroke-width"><? echo $s_width ?></CssParameter>
    </Stroke>
                </LineSymbolizer>
    </Rule>

</FeatureTypeStyle></UserStyle></NamedLayer></StyledLayerDescriptor>