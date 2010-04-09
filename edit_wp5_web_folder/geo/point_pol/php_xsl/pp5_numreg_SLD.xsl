<?xml version="1.0"?>
<xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> 
<xsl:output method="xml"/>

<xsl:param name="total" select="gml/total"/>

<xsl:template match="gml">		
			<xsl:param name="polygon" select="gml/polygon"/>

				<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>topp:num_regs</Name>
				    <UserStyle>
				<!--	<total>	<xsl:value-of select="total"/></total>-->
				<!--		<xsl:choose>
							<xsl:when test="count(polygon) = total ">
								<id>number 3></id>
							</xsl:when>
						<xsl:otherwise>
								<id>NO ERROR: 'headingText' is a required parameter.</id>
						</xsl:otherwise>
					</xsl:choose>
				-->
				      <FeatureTypeStyle>
						<xsl:apply-templates select="polygon"/>
					</FeatureTypeStyle>
					</UserStyle>
				  </NamedLayer>
				</StyledLayerDescriptor>
</xsl:template>

<xsl:template match="polygon">
				<xsl:param name="numreg" select="numreg"/>
				<xsl:param name="position" select="order"/>
				 <Rule>
		          <Name><xsl:value-of select="$numreg"/></Name>
		          <ogc:Filter>		
		            <ogc:And>		
		  			      <ogc:PropertyIsEqualTo>
				             <ogc:PropertyName>userid</ogc:PropertyName>
				          <ogc:Literal><xsl:value-of select="$userid"/></ogc:Literal>
<!--				          <ogc:Literal>pere</ogc:Literal>-->
				           </ogc:PropertyIsEqualTo>  
		            
					  <ogc:PropertyIsEqualTo>
		                <ogc:PropertyName>numreg</ogc:PropertyName>
		                <ogc:Literal><xsl:value-of select="$numreg"/></ogc:Literal>
		              </ogc:PropertyIsEqualTo>
		            </ogc:And>
		          </ogc:Filter>
				<xsl:call-template name="colors">
							<xsl:with-param name="position" select="order"/>
							<xsl:with-param name="total" select="../total"/>
				</xsl:call-template>
				</Rule>
</xsl:template>						 
<xsl:template name="colors">
	<xsl:choose>

	<xsl:when test="$position = 0">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'#e7e9e7'"/>
		</xsl:call-template>
	</xsl:when>

	<xsl:when test="$position = 1">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'#c7c7c1'"/>
				<!-- el 5 de utm_regs2-->
		</xsl:call-template>
		</xsl:when>
		<xsl:when test="$position =2">
			<xsl:call-template name="symbology">
					<xsl:with-param name="color" select="'#9C6C9E'"/>
					<!-- el 5 de utm_regs2-->
			</xsl:call-template>
			</xsl:when>
			<xsl:when test="$position = 3">
				<xsl:call-template name="symbology">
						<xsl:with-param name="color" select="'#6A236E'"/>
						<!-- el 5 de utm_regs2-->
				</xsl:call-template>
			</xsl:when>
	<xsl:when test="$position = 4">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'#434343'"/>
		</xsl:call-template>
	</xsl:when>
	<xsl:otherwise></xsl:otherwise>
	</xsl:choose>
</xsl:template>

<xsl:template name="symbology">
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" ><xsl:value-of select="$color"/></CssParameter>
	<CssParameter name="fill-opacity">0.8</CssParameter>
	  </Fill>
	  <Stroke>
	 <CssParameter name="stroke" >#1b1c1d</CssParameter>
	    <CssParameter name="stroke-width" >1.5</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
</xsl:template>

</xsl:stylesheet>