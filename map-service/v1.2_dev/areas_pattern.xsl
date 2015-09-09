<?xml version="1.0"?> <xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> <xsl:output method="xml"/>
<!--<xsl:include href="hexatodeci.xsl"/>-->
<xsl:template match="gml">		
			<xsl:param name="style" select="gml/style"/>
			<xsl:param name="label" select="gml/style/label"/>
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
					
					<xsl:if test="$country">
							 <ogc:Filter>		
								<Or>
           <xsl:apply-templates  select="country"/>
							 </Or>
							</ogc:Filter>
					</xsl:if>
								<xsl:choose>
								<xsl:when test="$label='1'">
							 <TextSymbolizer>
								
									    <Label>
											    <ogc:PropertyName><xsl:value-of select="$label_field"/></ogc:PropertyName>
									    </Label>

									    <Font>
										<CssParameter name="font-family">Times New Roman</CssParameter>
										<CssParameter name="font-style">Normal</CssParameter>
										<CssParameter name="font-size">12</CssParameter>
										<CssParameter name="font-weight">Normal</CssParameter>
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
									<!--ftheeten 18/05/2013 (8 chars=>transparent)-->
									<xsl:choose>
										<xsl:when test="string-length($fill_color) = 8">	
						<CssParameter name="fill">#<xsl:value-of disable-output-escaping="yes" select="substring($fill_color,2)"/></CssParameter> 
						
						<CssParameter name="fill-opacity"><xsl:call-template name="HexToOpacity"><xsl:with-param name="hexNumber" select="substring($fill_color,0,2)"/></xsl:call-template></CssParameter>  							
										</xsl:when>

										<xsl:otherwise>
											<CssParameter name="fill">#<xsl:value-of select="$fill_color"/></CssParameter>
										</xsl:otherwise>

									</xsl:choose>
						      </xsl:otherwise>
						
					</xsl:choose>

					</Fill>

									<Stroke>
						<CssParameter name="stroke">#<xsl:value-of select="$stroke_color"/></CssParameter>
				<CssParameter name="stroke-width"><xsl:value-of select="$stroke_width"/></CssParameter>
<!--		<CssParameter name="stroke-dasharray">2 1 1 2</CssParameter>-->
<xsl:choose>
<xsl:when test="not($stroke_style='no_style')">
		<CssParameter name="stroke-dasharray"><xsl:value-of select="$stroke_style"/></CssParameter> 			
</xsl:when>
</xsl:choose>
					</Stroke>
				     </PolygonSymbolizer>
	       </Rule>
<!--	
					 <Rule>
				          <Name>Others</Name>
				    			<PolygonSymbolizer>
									<Stroke>
						<CssParameter name="stroke">#401256</CssParameter>
    				<CssParameter name="stroke-width">1</CssParameter>
								</Stroke>
				    			</PolygonSymbolizer>
	       </Rule>
-->
</xsl:template>						 
<xsl:template match="country">
		<xsl:param name="country" select="."/>
			<xsl:if test="contains($country, '%')">
					<ogc:PropertyIsLike wildCard="%" singleChar="#" escapeChar="!">
						<ogc:PropertyName><xsl:value-of select="$field"/></ogc:PropertyName>
					        <ogc:Literal>
					        	<xsl:value-of select="$country"/>
					        </ogc:Literal>
					</ogc:PropertyIsLike>
				</xsl:if>
				<xsl:if test="not(contains($country, '%'))">
					<ogc:PropertyIsEqualTo>
						<ogc:PropertyName><xsl:value-of select="$field"/></ogc:PropertyName>
					        <ogc:Literal>
					        	<xsl:value-of select="$country"/>
					        </ogc:Literal>
					</ogc:PropertyIsEqualTo>
				</xsl:if>			          											
</xsl:template>

  <xsl:template name="HexToDecimal"><xsl:param name="hexNumber" />
    <xsl:param name="decimalNumber" >0</xsl:param>
    <!-- If there is zero hex digits left, output -->
    <xsl:choose>
      <xsl:when test="$hexNumber">
        <xsl:call-template name="HexToDecimal">
          <xsl:with-param name="decimalNumber" select="($decimalNumber*16)+number(substring-before(substring-after('00/11/22/33/44/55/66/77/88/99/A10/B11/C12/D13/E14/F15/a10/b11/c12/d13/e14/f15/',substring($hexNumber,1,1)),'/'))" />
          <xsl:with-param name="hexNumber" select="substring($hexNumber,2)" />
        </xsl:call-template>
      </xsl:when>
      <!-- otherwise multiply, and add the next digit, and recurse -->
      <xsl:otherwise>
        <xsl:value-of select="$decimalNumber"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <!-- If it begins with 0x then parse it for sure, else return it -->
  <xsl:template name="asDecimal">
    <xsl:param name="number" />
    <xsl:choose>
      <xsl:when test="substring($number,1,2)='0x'">
        <xsl:call-template name="HexToDecimal">
          <xsl:with-param name="hexNumber" select="substring($number,3)"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$number"/>
      </xsl:otherwise>
    </xsl:choose></xsl:template>
<!--to calculate for the SLD-->
 <xsl:template name="HexToOpacity"><xsl:param name="hexNumber" />
	<xsl:variable name="resultConversion">
		<xsl:call-template name="HexToDecimal">
		  <xsl:with-param name="hexNumber" select="$hexNumber" />
		</xsl:call-template>
	</xsl:variable>
	<xsl:value-of select="1-(number($resultConversion) div 15)"/>
</xsl:template>

</xsl:stylesheet>
