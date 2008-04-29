<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd2" xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">	
	<xsl:output method="xml" indent="yes"/>
	
	<xsl:template match="featureType">
		<xsl:param name="species" select="genus/species/spname"/>
		<xsl:param name="genus" select="genus/name"/>
		<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		<NamedLayer>
			 <Name>topp:test_csvimportgispoints2</Name>
		    <UserStyle>
		      <FeatureTypeStyle>
				<xsl:apply-templates select="genus"/>
			</FeatureTypeStyle>
			</UserStyle>
		  </NamedLayer>
		</StyledLayerDescriptor>
	</xsl:template>
	<xsl:template match="genus">
		<xsl:param name="genus" select="name"/>
		 <Rule>
	          <Name><xsl:value-of select="$genus"/></Name>
	          <ogc:Filter>				
	              <ogc:PropertyIsEqualTo>
	                <ogc:PropertyName>genus</ogc:PropertyName>
	                <ogc:Literal>
	                	<xsl:value-of select="$genus"/>
	                </ogc:Literal>
	              </ogc:PropertyIsEqualTo>
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
	</xsl:template>
</xsl:stylesheet>
