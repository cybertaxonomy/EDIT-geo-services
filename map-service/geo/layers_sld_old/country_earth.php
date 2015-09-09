<?php
//LINE type
$params=explode('/',$_GET['params']);
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
	}  else { $s_style='3 3'; }
	} else { $s_style='3 3'; }

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
    <!-- again they have names, titles and abstracts -->
  <Name>population</Name>
  <Title>Population in the United States</Title>
  <Abstract>A sample filter that filters the United States into three categories of population, drawn in different colors</Abstract>
    <FeatureTypeStyle>
     <Rule>
        <LineSymbolizer>

           <Stroke>
           <CssParameter name="stroke"><? echo $l_color; ?></CssParameter>
           <CssParameter name="stroke-width"><? echo $up*($s_width); ?></CssParameter>
            <CssParameter name="stroke-dasharray"><? echo $s_style; ?></CssParameter> 
            <CssParameter name="stroke-opacity"><? echo $s_opacity; ?></CssParameter>
            </Stroke>
        </LineSymbolizer>
        
               <TextSymbolizer>
          
           <Geometry><ogc:PropertyName>the_geom</ogc:PropertyName></Geometry>
           <Label><ogc:PropertyName>code</ogc:PropertyName>
           </Label>
           <Font><CssParameter name="font-style">normal</CssParameter><CssParameter name="font-size"><? echo 13*$up ?></CssParameter>
           <CssParameter name="font-color">#990033</CssParameter>
           </Font>
           
           <Halo><Radius><? echo 2*$up ?></Radius><Fill>
           <CssParameter name="fill">#e6e6e6</CssParameter></Fill>
           </Halo>
      
           </TextSymbolizer>
      </Rule>

    </FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>