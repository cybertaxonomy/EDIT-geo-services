<?xml version="1.0"?>
<xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> 
<xsl:output method="xml"/>

<xsl:param name="total" select="gml/total"/>

<xsl:template match="gml">		
			<xsl:param name="polygon" select="gml/polygon"/>

				<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>topp:num_genus</Name>
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
				<xsl:param name="numtax" select="numtax"/>
				<xsl:param name="position" select="order"/>
				 <Rule>
		          <Name><xsl:value-of select="$numtax"/></Name>
		          <ogc:Filter>		
		            <ogc:And>		
		  			      <ogc:PropertyIsEqualTo>
				             <ogc:PropertyName>userid</ogc:PropertyName>
				          <ogc:Literal><xsl:value-of select="$userid"/></ogc:Literal>
<!--				          <ogc:Literal>pere</ogc:Literal>-->
				           </ogc:PropertyIsEqualTo>  
		            
					  <ogc:PropertyIsEqualTo>
		                <ogc:PropertyName>numtax</ogc:PropertyName>
		                <ogc:Literal><xsl:value-of select="$numtax"/></ogc:Literal>
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
	<xsl:when test="$position = $total">
	<xsl:call-template name="symbology">
			<xsl:with-param name="color" select="'#312ce8'"/>
	</xsl:call-template>
		</xsl:when>
	<xsl:when test="$position = $total -($total -1)">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'#DDEEFF'"/>
		</xsl:call-template>
	</xsl:when>

	<xsl:when test="$position = $total -1">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'#3198FF'"/>
				<!-- el 5 de utm_regs2-->
		</xsl:call-template>
		</xsl:when>
		<xsl:when test="$position = $total -2">
			<xsl:call-template name="symbology">
					<xsl:with-param name="color" select="'#BBDDFF'"/>
					<!-- el 5 de utm_regs2-->
			</xsl:call-template>
			</xsl:when>
			<xsl:when test="$position = $total -3">
				<xsl:call-template name="symbology">
						<xsl:with-param name="color" select="'#C1E0FF'"/>
						<!-- el 5 de utm_regs2-->
				</xsl:call-template>
			</xsl:when>
	<xsl:when test="$position = $total -4">
		<xsl:call-template name="symbology">
				<xsl:with-param name="color" select="'noexisteix'"/>
		</xsl:call-template>
	</xsl:when>
	</xsl:choose>
</xsl:template>

<xsl:template name="symbology">
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" ><xsl:value-of select="$color"/></CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#887DB2</CssParameter>
	    <CssParameter name="stroke-width" >1.0</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
</xsl:template>

</xsl:stylesheet>