<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <!-- a named layer is the basic building block of an sld document -->

  <NamedLayer>
    <Name>Default Line</Name>
    <UserStyle>
        <!-- they have names, titles and abstracts -->
      
      <Title>A boring default style</Title>
      <Abstract>A sample style that just prints out a green line</Abstract>
      <!-- FeatureTypeStyles describe how to render different features -->
      <!-- a feature type for lines -->

      <FeatureTypeStyle>
        <!--FeatureTypeName>Feature</FeatureTypeName-->

        <Rule>


<ogc:Filter xmlns:gml="http://www.opengis.net/gml">
<ogc:PropertyIsEqualTo>
     <ogc:Function name="isNull">
       <ogc:PropertyName>latitude</ogc:PropertyName>
     </ogc:Function>
     <ogc:Literal>true</ogc:Literal>
  </ogc:PropertyIsEqualTo>

</ogc:Filter>



<TextSymbolizer>

<Label>

<ogc:PropertyName>longitude</ogc:PropertyName>
</Label>
    
<Font>
<CssParameter name="font-family">Dialog</CssParameter>
<CssParameter name="font-style">normal</CssParameter><CssParameter name="font-size">30.0</CssParameter>
<CssParameter name="fill">#202427</CssParameter></Font>
<LabelPlacement>
<PointPlacement>
                   <Displacement>

                    <DisplacementX>-14</DisplacementX>

                    <DisplacementY>-680</DisplacementY>

                  </Displacement>

              </PointPlacement>             
  </LabelPlacement>

</TextSymbolizer>

<TextSymbolizer>

<Label>

<ogc:PropertyName>longitude</ogc:PropertyName>
</Label>
    
<Font>
<CssParameter name="font-family">Dialog</CssParameter>
<CssParameter name="font-style">normal</CssParameter><CssParameter name="font-size">30.0</CssParameter>
<CssParameter name="fill">#202427</CssParameter></Font>
<LabelPlacement>
<PointPlacement>
                   <Displacement>

                    <DisplacementX>-14</DisplacementX>

                    <DisplacementY>680</DisplacementY>

                  </Displacement>

              </PointPlacement>             
  </LabelPlacement>

</TextSymbolizer>


</Rule>
 </FeatureTypeStyle>
 </UserStyle>

</NamedLayer>
</StyledLayerDescriptor>