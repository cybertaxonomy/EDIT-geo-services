<?xml version="1.0"?> <xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> <xsl:output method="xml"/>

<xsl:template match="gml">			
			<xsl:param name="style" select="gml/specie/style"/>			
			<xsl:param name="specie" select="gml/specie"/>
			
			<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>topp:rest_points</Name>
				    <UserStyle>
				      <FeatureTypeStyle>
					<xsl:apply-templates select="specie"/>
									</FeatureTypeStyle>
									</UserStyle>
								  </NamedLayer>
			</StyledLayerDescriptor>
</xsl:template>
<xsl:template match="specie">
			<xsl:param name="id" select="id"/>
			<xsl:param name="name" select="name"/>
			<xsl:param name="color" select="style/color"/>
			<xsl:param name="symbol" select="style/symbol"/>
			<xsl:param name="size" select="style/size"/>
			<xsl:param name="outlinecolor" select="style/outlinecolor"/>
			<xsl:param name="linewidth" select="style/linewidth"/>
			<xsl:param name="opacity" select="style/opacity"/>
						  <Rule>
				          <Name><xsl:value-of select="$name"/></Name>
				          <ogc:Filter>
					<And>
						     <ogc:PropertyIsEqualTo>
			                <ogc:PropertyName>id</ogc:PropertyName>
			                <ogc:Literal><xsl:value-of select="$id"/></ogc:Literal>
			              </ogc:PropertyIsEqualTo>						
	              		<ogc:PropertyIsEqualTo>
	                		<ogc:PropertyName>userid</ogc:PropertyName>
	                		<ogc:Literal><xsl:value-of select="$userid"/></ogc:Literal>
	              		</ogc:PropertyIsEqualTo>
					</And>
				</ogc:Filter>
							       <PointSymbolizer>
						            <Graphic>
						              <Mark>
						                <WellKnownName><xsl:value-of select="$symbol"/></WellKnownName>
						                <Fill>
						                  <CssParameter name="fill">
						                    <ogc:Literal>#<xsl:value-of select="$color"/></ogc:Literal>
						                  </CssParameter>
						                  <CssParameter name="fill-opacity">
						                    <ogc:Literal><xsl:value-of select="$opacity"/></ogc:Literal>
						                  </CssParameter>
						                </Fill>
								<Stroke>
									<CssParameter name="stroke">#<xsl:value-of select="$outlinecolor"/></CssParameter>
									<CssParameter name="stroke-width"><xsl:value-of select="$linewidth"/></CssParameter>
								</Stroke>
										</Mark>
						              <Size>
						                <ogc:Literal><xsl:value-of select="$size"/></ogc:Literal>
						              </Size>
						            </Graphic>
						          </PointSymbolizer>
							</Rule>
</xsl:template>

</xsl:stylesheet>
