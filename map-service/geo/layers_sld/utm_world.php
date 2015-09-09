<?php
//LINE type
$params=explode('/',$_GET['params']);
    $up=$params[0];
    $layer='topp:'.$params[1];
    if (isset($params[2]))
    {
	$l_color="#".$params[2];
	} else { $l_color="#2a3037"; }

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

<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    
<Name><? echo $layer ?></Name>
    
    <UserStyle>
        <!-- they have names, titles and abstracts -->
      
      <Title>UTM World</Title>
      <Abstract>A sample style that just prints out a green line</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->
        <Rule>
          <Name>Rule 1</Name>
          <Title>UTM World</Title>
          <Abstract>A green line with a 2 pixel width</Abstract>
     
               <PolygonSymbolizer>
           <Stroke>
     <CssParameter name="stroke"><? echo $l_color ?></CssParameter>
     <CssParameter name="stroke-width"><? echo ($s_width*$up) ?></CssParameter>
         <CssParameter name="stroke-dasharray"><? echo $s_style; ?></CssParameter>
                     <CssParameter name="stroke-opacity"><? echo $s_opacity; ?></CssParameter>
   </Stroke>
</PolygonSymbolizer>
</Rule>
<Rule>
<MaxScaleDenominator><? echo ($up*29000000) ?></MaxScaleDenominator>
<TextSymbolizer>
<Label>
<ogc:PropertyName>code</ogc:PropertyName>
</Label>
<Font>
<CssParameter name="font-size"><? echo ($up*9) ?></CssParameter>
</Font>
     <LabelPlacement>
          <PointPlacement>  
            <AnchorPoint>
          <AnchorPointX>0.5</AnchorPointX>
          <AnchorPointY>0.5</AnchorPointY>
        </AnchorPoint>
          </PointPlacement>              
        </LabelPlacement>      
         <!--  make the label easy to read-->
        <Halo>            
          <Radius>
       <ogc:Literal><? echo (2*$up) ?></ogc:Literal>
          </Radius>
          <Fill>
      <CssParameter name="fill">#FFFFFF</CssParameter>
      <CssParameter name="fill-opacity">0.8</CssParameter>        
          </Fill>
        </Halo>
            </TextSymbolizer>
        </Rule>
       </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
