<?php
//LINE type
$params=explode('/',$_GET['params']);
//line_color/line_style/update
    $up=$params[0];
    $layer='topp:'.$params[1];
    if (isset($params[2]))
    {
	$l_color="#".$params[2];
	} else { $l_color="#666699"; }


  	 if (isset($params[3]))
    {
	$s_width=$params[3];
	if ($s_width==0)
	{
	$s_opacity=0;
	}else {
	$s_opacity=1;
	}

	} else { $s_width=1;$s_opacity=1; }
	 if (isset($params[4]))
    {
	$s_style=$params[4];
	$s=explode('_',$s_style);
	if (count($s)>1)
	{
	$s_style=$s[0]." ".$s[1];
	} 
	} else { $s_style=100000; }

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
<Name>testing</Name>
<Title>Rivers</Title>
<LineSymbolizer>
  <Stroke>
    <CssParameter name="stroke" ><? echo $l_color; ?></CssParameter>
    <CssParameter name="stroke-width" ><? echo $up*$s_width; ?></CssParameter>
    <CssParameter name="stroke-dasharray"><? echo $s_style; ?></CssParameter>
     <CssParameter name="stroke-opacity"><? echo $s_opacity; ?></CssParameter>
  </Stroke>
</LineSymbolizer>
        </Rule>
  </FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>