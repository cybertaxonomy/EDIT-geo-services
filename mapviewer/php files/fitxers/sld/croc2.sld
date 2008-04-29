<?xml version="1.0"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3">
  <NamedLayer>
    <Name>topp:test_csvimportgispoints2</Name>
    <UserStyle>
      <FeatureTypeStyle>
        <Rule>
          <Name>crocuta</Name>
          <ogc:Filter>
            <And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>userid</ogc:PropertyName>
                <ogc:Literal>croc2</ogc:Literal>
              </ogc:PropertyIsEqualTo>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>genus</ogc:PropertyName>
                <ogc:Literal>crocuta</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </And>
          </ogc:Filter>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>square</WellKnownName>
                <Fill>
                  <CssParameter name="fill">
                    <ogc:Literal>#ed9692</ogc:Literal>
                  </CssParameter>
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
              <Opacity>
                <ogc:Literal>1</ogc:Literal>
              </Opacity>
              <Size>
                <ogc:Literal>3</ogc:Literal>
              </Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
