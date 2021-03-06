<?xml version="1.0"?>
<xsl:stylesheet xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"> 
<xsl:output method="xml"/>
<xsl:template match="gml">		
			<xsl:param name="polygon" select="gml/polygon"/>
				<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>topp:num_genus</Name>
				    <UserStyle>
				      <FeatureTypeStyle>
						<xsl:apply-templates select="polygon"/>
					</FeatureTypeStyle>
					</UserStyle>
				  </NamedLayer>
				</StyledLayerDescriptor>
</xsl:template>
<xsl:template match="polygon">
				<xsl:param name="numtax" select="numtax"/>
				 <Rule>
		          <Name><xsl:value-of select="$numtax"/></Name>
		          <ogc:Filter>		
		            <ogc:And>		
		  			      <ogc:PropertyIsEqualTo>
				             <ogc:PropertyName>userid</ogc:PropertyName>
				             <ogc:Literal><xsl:value-of select="$userid"/></ogc:Literal>
				           </ogc:PropertyIsEqualTo>  
		            
					  <ogc:PropertyIsEqualTo>
		                <ogc:PropertyName>numtax</ogc:PropertyName>
		                <ogc:Literal><xsl:value-of select="$numtax"/></ogc:Literal>
		              </ogc:PropertyIsEqualTo>
		            </ogc:And>
		          </ogc:Filter>
				<PolygonSymbolizer>
				  <Fill>
				    <CssParameter name="fill" >#FFFFFF</CssParameter>
		<CssParameter name="fill-opacity">0.8</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#1b1c1d</CssParameter>
	    <CssParameter name="stroke-width" >1.5</CssParameter>
				</PolygonSymbolizer>
				</Rule>
</xsl:template>						 

</xsl:stylesheet>