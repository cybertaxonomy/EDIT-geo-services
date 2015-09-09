<?xml version="1.0" ?>
<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>euromed_2013</Name>
    <UserStyle>
      <Title>Default polygon style</Title>
      <Abstract>A sample style that just draws out a solid gray interior with a black 1px outline</Abstract>

      <FeatureTypeStyle>
        
		<Rule>
          <Title>Polygon</Title>

           
		   <MinScaleDenominator>36000000</MinScaleDenominator>
		   <ogc:Filter>
				   <ogc:PropertyIsGreaterThan>
				  <ogc:Function name="Area">
					 <ogc:PropertyName>geom</ogc:PropertyName>
				  </ogc:Function>
				  <ogc:Literal>26</ogc:Literal>
			   </ogc:PropertyIsGreaterThan>
		   </ogc:Filter>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#0000FF</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
		
		<Rule>
          <Title>Polygon</Title>
		   
           <MaxScaleDenominator>36000000</MaxScaleDenominator>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#00FF00</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
		<Rule>
          <Title>Polygon</Title>

          
		   <MinScaleDenominator>36000000</MinScaleDenominator>
		   <ogc:Filter>
				   <ogc:PropertyIsLessThanOrEqualTo>
				  <ogc:Function name="Area">
					 <ogc:PropertyName>geom</ogc:PropertyName>
				  </ogc:Function>
				  <ogc:Literal>26</ogc:Literal>
			   </ogc:PropertyIsLessThanOrEqualTo>
		   </ogc:Filter>
          <PointSymbolizer>
				<Graphic>
			   <Mark>
				 <WellKnownName>circle</WellKnownName>
				 <Fill>
				   <CssParameter name="fill">#FF0000</CssParameter>
				 </Fill>
			   </Mark>
			   <Size>6</Size>
			 </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>

    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>