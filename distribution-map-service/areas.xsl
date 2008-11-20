<?xml version="1.0"?> <xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> <xsl:output method="xml"/>

<xsl:template match="gml">		
			<xsl:param name="style" select="gml/style"/>
			<xsl:param name="label" select="label"/>
			<xsl:param name="country" select="gml/style/country"/>
				<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>	<xsl:value-of select="$layer"/></Name>
				    <UserStyle>
				      <FeatureTypeStyle>
						<xsl:apply-templates select="style"/>
					</FeatureTypeStyle>
					</UserStyle>
				  </NamedLayer>
				</StyledLayerDescriptor>
</xsl:template>
<xsl:template match="style">
				<xsl:param name="style_name" select="name"/>
				<xsl:param name="country" select="country"/>
				<xsl:param name="fill_color" select="color"/>
								<xsl:param name="label" select="label"/>
				<xsl:param name="symbol" select="hatching"/>								
				<xsl:param name="symbol_size" select="symbol_size"/>
				<xsl:param name="symbol_format" select="symbol_format"/>
				<xsl:param name="stroke_color" select="stroke_color"/>
				<xsl:param name="stroke_width" select="stroke_width"/>
				<xsl:param name="stroke_style" select="stroke_style"/>
				 <Rule>
			          <Name><!--<xsl:value-of select="$country"/>--><xsl:value-of select="$style_name"/> style <!--is <xsl:value-of select="$layer_sh"/>--> </Name>
					
					
							 <ogc:Filter>		
								<Or>
           <xsl:apply-templates  select="country"/>
							 </Or>
							</ogc:Filter>
								<xsl:choose>
								<xsl:when test="$label='1'">
							 <TextSymbolizer>
								
									    <Label>
											    <ogc:PropertyName><xsl:value-of select="$label_field"/></ogc:PropertyName>
									    </Label>

									    <Font>
										<CssParameter name="font-family">Times New Roman</CssParameter>
										<CssParameter name="font-style">Normal</CssParameter>
										<CssParameter name="font-size">30</CssParameter>
										<CssParameter name="font-weight">bold</CssParameter>
									    </Font>
							</TextSymbolizer>
								</xsl:when>
								<xsl:otherwise>
							
									</xsl:otherwise>
								</xsl:choose>
							<PolygonSymbolizer>

				          <Fill>
                   		<xsl:choose>
								<xsl:when test="$fill_color='hatching'">
										<GraphicFill>
						              <Graphic>
						                <ExternalGraphic>
						                  <OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple">
															<xsl:attribute name="xlink:href">
															<xsl:value-of select="$symbol"/>
															</xsl:attribute>
													</OnlineResource>
						                  <Format><xsl:value-of select="$symbol_format"/></Format>
						                </ExternalGraphic>
						                <Opacity>1.0</Opacity>
						                <Size><xsl:value-of select="$symbol_size"/></Size>
						              </Graphic>

													</GraphicFill>
									</xsl:when>
								<xsl:otherwise>
									
						<CssParameter name="fill">#<xsl:value-of select="$fill_color"/></CssParameter>   
						      </xsl:otherwise>
						
					</xsl:choose>
	<!--
							<GraphicFill> 
								 <Graphic> 
									<Mark> 
										<WellKnownName>hatch</WellKnownName>
									 <Fill>
								 <CssParameter name="fill">#00FF00</CssParameter>
								 </Fill>
								 </Mark> 
								</Graphic> 
							</GraphicFill> 								
-->

					</Fill>

									<Stroke>
						<CssParameter name="stroke">#<xsl:value-of select="$stroke_color"/></CssParameter>
				<CssParameter name="stroke-width"><xsl:value-of select="$stroke_width"/></CssParameter>
<!--			<CssParameter name="stroke-dasharray">2 1 1 2</CssParameter>-->
<xsl:choose>
<xsl:when test="not($stroke_style='no_style')">
		<CssParameter name="stroke-dasharray"><xsl:value-of select="$stroke_style"/></CssParameter> 			
</xsl:when>
</xsl:choose>
					</Stroke>
				     </PolygonSymbolizer>
	       </Rule>
	
					 <Rule>
				          <Name>Others</Name>
				    			<PolygonSymbolizer>
									<Stroke>
						<CssParameter name="stroke">#401256</CssParameter>
    				<CssParameter name="stroke-width">1</CssParameter>
								</Stroke>
				    			</PolygonSymbolizer>
	       </Rule>
</xsl:template>						 
<xsl:template match="country">
		<xsl:param name="country" select="."/>

			              <ogc:PropertyIsEqualTo>
			                <ogc:PropertyName><xsl:value-of select="$field"/></ogc:PropertyName>
			                <ogc:Literal>
			                	<xsl:value-of select="$country"/>
			                </ogc:Literal>
			              </ogc:PropertyIsEqualTo>		
											
</xsl:template>
</xsl:stylesheet>