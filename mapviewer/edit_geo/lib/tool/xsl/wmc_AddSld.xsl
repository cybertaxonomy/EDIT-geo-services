<?xml version="1.0"?>
<xsl:stylesheet xmlns:wmc="http://www.opengis.net/context" xmlns:wms="http://www.opengis.net/wms" xmlns:wfs="http://www.opengis.net/wfs" xmlns:sld="http://www.opengis.net/sld" xmlns:owscat="http://www.ec.gc.ca/owscat" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="xml"/>
<xsl:strip-space elements="*"/>
<xsl:param name="modelId"/>
<xsl:param name="widgetId"/>
<xsl:template match="StyledLayerDescriptor">
<wmc:StyleList>
<wmc:Style current="1">
<wmc:SLD>
<wmc:StyledLayerDescriptor>
<xsl:attribute name="version">1.0.0</xsl:attribute>
<xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()"/>
</wmc:StyledLayerDescriptor>
</wmc:SLD>
</wmc:Style>
</wmc:StyleList>
</xsl:template>
<xsl:template match="*|@*|comment()|processing-instruction()|text()">
<xsl:copy>
<xsl:apply-templates select="*|@*|comment()|processing-instruction()|text()"/></xsl:copy>
</xsl:template>
</xsl:stylesheet>
