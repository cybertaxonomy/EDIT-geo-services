<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" 
  xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<NamedLayer> 
	<Name>densityLayer</Name>
    <UserStyle>
        
        
        <FeatureTypeStyle>
            <FeatureTypeName>gbif:DensityLayer</FeatureTypeName>
<!-- If it is a point data, render as such -->
<Rule>  
	<Name>Point</Name>
  <ogc:Filter>
    <ogc:PropertyIsEqualTo>
      <ogc:Function name="geometryType">
        <ogc:PropertyName>geom</ogc:PropertyName>
      </ogc:Function>
      <ogc:Literal>Point</ogc:Literal>
    </ogc:PropertyIsEqualTo>
  </ogc:Filter>
  <PointSymbolizer>
    <Graphic>
      <Mark>
        <WellKnownName>circle</WellKnownName>
        <Fill>
          <CssParameter name="fill">#cc0000</CssParameter>
          <CssParameter name="fill-opacity">1.0</CssParameter>
        </Fill>
      </Mark>
      <Size>6</Size>
    </Graphic>
  </PointSymbolizer>
</Rule>           
            
<!-- 1-9 -->
<Rule>  
		<Name>1-9 records</Name>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>1</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>10</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#ffff00</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>
<!-- 10-99 -->
<Rule>  
			<Name>10-99 records</Name>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>10</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>100</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#ffcc00</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>
<!-- 100-999 -->
<Rule>  
			<Name>100-999 records</Name>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>100</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>1000</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#ff9900</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>
<!-- 1000-9999 -->
<Rule>  
				<Name>1,000-9999 records</Name>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>1000</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>10000</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#ff6600</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>
<!-- 10000-99999 -->
<Rule>  
					<Name>10,000-99,999 records</Name>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>10000</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>count</ogc:PropertyName>
        <ogc:Literal>100000</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#ff3300</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>
<!-- 100000+ -->
<Rule>  
						<Name>more than 100,000 records</Name>
  <ogc:Filter>
    <ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyName>count</ogc:PropertyName>
      <ogc:Literal>100000</ogc:Literal>
    </ogc:PropertyIsGreaterThanOrEqualTo>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        <ogc:Literal>#cc0000</ogc:Literal>
      </CssParameter>
      <CssParameter name="fill-opacity">
        <ogc:Literal>1</ogc:Literal>
      </CssParameter>
    </Fill>
  </PolygonSymbolizer>
</Rule>

        </FeatureTypeStyle>
    </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>
