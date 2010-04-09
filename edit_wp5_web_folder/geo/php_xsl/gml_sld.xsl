<?xml version="1.0" encoding="LATIN1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
     xmlns:gml="http://www.opengis.net/gml"  xmlns:wfs="http://www.opengis.net/wfs"
     xmlns:feature="http://mapserver.gis.umn.edu/mapserver"
	xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd2" 
	xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">	

<xsl:output method="xml" indent="yes"/>

<xsl:template match="wfs:FeatureCollection">		

				<StyledLayerDescriptor version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd3" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
				<NamedLayer>
					 <Name>topp:serialized_pols</Name>
				    <UserStyle>
				      <FeatureTypeStyle>
						<xsl:apply-templates select="gml:featureMember"/>
					</FeatureTypeStyle>
					</UserStyle>
				  </NamedLayer>
				</StyledLayerDescriptor>

</xsl:template>

<xsl:template match="gml:featureMember">
        <xsl:param name="stroke_width" select="feature:features/feature:stroke_width"/>
        <xsl:param name="stroke_color" select="feature:features/feature:stroke_color"/>	
        <xsl:param name="stroke_style" select="feature:features/feature:stroke_style"/>
        <xsl:param name="text_size" select="feature:features/feature:text_size"/>        
        <xsl:param name="label" select="feature:features/feature:label"/>
				<xsl:param name="id" select="feature:features/feature:id"/>
				<xsl:param name="color" select="feature:features/feature:fill_color"/>
				<xsl:param name="opacity" select="feature:features/feature:fill_opacity"/>	
				ç<xsl:param name="stroke_opacity" select="feature:features/feature:stroke_opacity"/>	
				 <Rule>
			          <Name>a</Name>
							 <ogc:Filter>		
						<ogc:And>	
								<ogc:PropertyIsEqualTo>
			                <ogc:PropertyName>userid</ogc:PropertyName>
			                <ogc:Literal><xsl:value-of select="$userid"/></ogc:Literal>
			              </ogc:PropertyIsEqualTo>		
							
					
						 <ogc:PropertyIsEqualTo>
			                <ogc:PropertyName>code</ogc:PropertyName>
			                <ogc:Literal><xsl:value-of select="$id"/></ogc:Literal>
			              </ogc:PropertyIsEqualTo>	
			         </ogc:And>
							</ogc:Filter>	
						<TextSymbolizer>
								
									    <ogc:Label><xsl:value-of select="$label"/>
									    </ogc:Label>

									    <Font>
										
										<CssParameter name="font-style">Normal</CssParameter>
										<CssParameter name="font-size"><xsl:value-of select="$text_size"/></CssParameter>
										<CssParameter name="font-weight">bold</CssParameter>
									    </Font>
							<LabelPlacement>
								<PointPlacement>	
									<AnchorPoint>
										<AnchorPointX>0.5</AnchorPointX>
										<AnchorPointY>0.5</AnchorPointY>
									</AnchorPoint>
								</PointPlacement>					    
							</LabelPlacement>

							</TextSymbolizer>

							
							<PolygonSymbolizer>
				    
									
<!--				         	 <CssParameter name="fill"><xsl:value-of select="$color"/></CssParameter>-->
								<Fill>
								<CssParameter name="fill">#<xsl:value-of select="$color"/></CssParameter>
								<CssParameter name="opacity"><xsl:value-of select="$opacity"/></CssParameter>
							</Fill>
							<Stroke>
				<CssParameter name="stroke">#<xsl:value-of select="$stroke_color"/></CssParameter>
				<CssParameter name="stroke-width"><xsl:value-of select="$stroke_width"/></CssParameter>
				<CssParameter name="stroke-opacity"><xsl:value-of select="$stroke_opacity"/></CssParameter>
				<xsl:choose>
								<xsl:when test="not($stroke_style='no_style')">
				<CssParameter name="stroke-dasharray"><xsl:value-of select="$stroke_style"/></CssParameter>
								</xsl:when>
				</xsl:choose>
				</Stroke>
									        
				      </PolygonSymbolizer>
	       </Rule>						 
</xsl:template>
</xsl:stylesheet>