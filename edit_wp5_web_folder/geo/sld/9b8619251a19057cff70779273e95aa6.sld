<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3">
  <NamedLayer>
    <Name>topp:user_points</Name>
    <UserStyle>
      <FeatureTypeStyle>
        <Rule>
          <Name>Triglochin</Name>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>userid</ogc:PropertyName>
                <ogc:Literal>968</ogc:Literal>
              </ogc:PropertyIsEqualTo>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>genus</ogc:PropertyName>
                <ogc:Literal>Triglochin</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </And>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Literal>#151619</ogc:Literal>
                  </CssParameter>
                  <CssParameter name="fill-opacity">0.9</CssParameter>
                </Fill>
                <Stroke>
                  <CssParameter name="stroke">
                    <ogc:Literal>#ed9692</ogc:Literal>
                  </CssParameter>
                  <CssParameter name="stroke-width">
                    <ogc:Literal>0.4</ogc:Literal>
                  </CssParameter>
                </Stroke>
              </Mark>
              <Size>
                <ogc:Literal>5</ogc:Literal>
              </Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
