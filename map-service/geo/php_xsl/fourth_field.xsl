<?xml version="1.0" encoding="LATIN1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd2" xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">	
	<xsl:output method="xml" indent="yes"/>
	<xsl:param name="user" select="default"/>
	<xsl:template match="featureType">

		<xsl:param name="specie" select="specie/name"/>
		<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		<NamedLayer>
			 <Name>topp:test_csvimportgispoints2</Name>
		    <UserStyle>
		      <FeatureTypeStyle>
				<xsl:apply-templates select="specie"/>
			</FeatureTypeStyle>
			</UserStyle>
		  </NamedLayer>
		</StyledLayerDescriptor>
	</xsl:template>
	<xsl:template match="specie">
		<xsl:param name="specie" select="name"/>
		<xsl:param name="genus" select="genus/genus_name"/>
		 <Rule>
			<!--xml:space="preserve"-->
	          <Name xml:space="preserve"><xsl:value-of select="$genus"/> <xsl:value-of select="$specie"/></Name>
			  <ogc:Filter>		
				<And>
	              <ogc:PropertyIsEqualTo>
	                <ogc:PropertyName>userid</ogc:PropertyName>
	                <ogc:Literal>
	                	<xsl:value-of select="$user"/>
	                </ogc:Literal>
	              </ogc:PropertyIsEqualTo>
			
	              <ogc:PropertyIsEqualTo>
	                <ogc:PropertyName>genus</ogc:PropertyName>
	                <ogc:Literal>
	                	<xsl:value-of select="$genus"/>
	                </ogc:Literal>
	              </ogc:PropertyIsEqualTo>
				    <ogc:PropertyIsEqualTo>
		                <ogc:PropertyName>specie</ogc:PropertyName>
		                <ogc:Literal>
		                	<xsl:value-of select="$specie"/>
		                </ogc:Literal>
		              </ogc:PropertyIsEqualTo>
				</And>
	  		</ogc:Filter>
			<PointSymbolizer>
			          <Graphic>
			          <Mark>
			            <WellKnownName>star</WellKnownName>
			            <Fill>
			              <CssParameter name="fill">
			                <ogc:Literal>#1b242c</ogc:Literal>							
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
			              <ogc:Literal>15</ogc:Literal>
			            </Size>              
			          </Graphic>
			  </PointSymbolizer>
		</Rule>
	</xsl:template>
</xsl:stylesheet>
