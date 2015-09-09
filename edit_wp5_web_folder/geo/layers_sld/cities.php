<?
$params=explode('/',$_GET['params']);
    $up=$params[0];
   
header("Content-type: text/xml");

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>

		<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:wfs="http://www.opengis.net/wfs" version="1.0.0"
		xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3">

	<NamedLayer>
	<Name>topp:cities</Name>
	<UserStyle>
		<Name>Cities</Name>
	<FeatureTypeStyle>
	   <Rule> 
<Name>Cities</Name>

          <Title>Cities</Title>
          <Abstract>A green line with a 2 pixel width</Abstract>
        <PointSymbolizer>
          <Graphic>
          <Mark>
            <WellKnownName>circle</WellKnownName>
            <Fill>
              <CssParameter name="fill">
                <ogc:Literal>#c73d79</ogc:Literal>
              </CssParameter>
            </Fill>
            </Mark>
            <Size>
              <ogc:Literal><? echo 3*$up ?></ogc:Literal>
            </Size>
              
          </Graphic>
        </PointSymbolizer>
       
    
    
    
          <TextSymbolizer>
          <Label>
        <ogc:PropertyName>city_name</ogc:PropertyName>
      </Label>
      <Font> 
   <CssParameter name="font-family">/var/www/synthesys/Data_Directory/Fonts/Verdana.ttf</CssParameter> 
   <CssParameter name="font-style">Normal</CssParameter> 
   <CssParameter name="font-size">13</CssParameter> 
</Font>
              <!-- this centers the label on the polygon's centroid-->
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
            </TextSymbolizer>
        </Rule>
  
			</FeatureTypeStyle>
		</UserStyle>
		</NamedLayer>
		</StyledLayerDescriptor>