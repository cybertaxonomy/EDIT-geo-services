<?php
//LINE type
//2*admin_level_1,c_america_level_1
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
	$s_opacity=0;//no border
	}else {
	$s_opacity=1;
	}

	} else { $s_width=0.6;$s_opacity=1; }

	 if (isset($params[4]))
    {
	$s_style=$params[4];
	$s=explode('_',$s_style);
	if (count($s)>1)
	{
	$s_style=$s[0]." ".$s[1];
	}  else { $s_style=1000000; }
	} else { $s_style=100000; }
		 if (isset($params[5]))
	    {
			$label_size=$params[5];
	    }
	else
	{
		$label_size=9*$up;
	}

	header("Content-type: text/xml");

	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
	?>

			<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink"
			xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:wfs="http://www.opengis.net/wfs" version="1.0.0"
			xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3">

		<NamedLayer>
		<Name><? echo $layer ?></Name>
		<UserStyle>
			<Name>UTM 50x50km</Name>
		<FeatureTypeStyle>
		   <Rule>
			<Name>UTM 50x50km</Name>

	
	<TextSymbolizer>
	<Label><ogc:PropertyName>code</ogc:PropertyName></Label><Font>
	<CssParameter name="font-style">normal</CssParameter>
	<CssParameter name="font-size"><? echo $label_size ?></CssParameter>

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
       <ogc:Literal>2</ogc:Literal>
          </Radius>
          <Fill>
      <CssParameter name="fill">#FFFFFF</CssParameter>
      <CssParameter name="fill-opacity">0.7</CssParameter>        
          </Fill>
        </Halo>

	  <Fill>
	    <CssParameter name="fill">#382b29</CssParameter>
	  </Fill>
	</TextSymbolizer>
	             <LineSymbolizer>
				<Stroke>
	   		   <CssParameter name="stroke"><? echo $l_color ?></CssParameter>
			                  <CssParameter name="stroke-width"><? echo $up*($s_width) ?></CssParameter>
			            <CssParameter name="stroke-dasharray"><? echo $s_style ?></CssParameter> 
			            <CssParameter name="stroke-opacity"><? echo $s_opacity ?></CssParameter>
				</Stroke>
	                </LineSymbolizer>
					
						    </Rule>

								

														</FeatureTypeStyle>
													</UserStyle>
													</NamedLayer>
													</StyledLayerDescriptor>