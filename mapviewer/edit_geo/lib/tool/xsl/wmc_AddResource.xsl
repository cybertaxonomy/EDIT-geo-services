<?xml version="1.0"?>
<xsl:stylesheet xmlns:wmc="http://www.opengis.net/context" xmlns:wms="http://www.opengis.net/wms" xmlns:wfs="http://www.opengis.net/wfs" xmlns:sld="http://www.opengis.net/sld" xmlns:owscat="http://www.ec.gc.ca/owscat" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="xml"/><xsl:strip-space elements="*"/><xsl:param name="modelId"/><xsl:param name="widgetId"/><xsl:param name="version"/><xsl:param name="serverUrl"/>

<xsl:param name="serviceName"/>
<xsl:param name="serverTitle"/>
<xsl:param name="format"/>
<xsl:param name="layerName"/>

<xsl:template match="Layer">
<wmc:Layer>
<xsl:attribute name="queryable">
<xsl:value-of select="./@queryable"/>
</xsl:attribute>

<xsl:attribute name="hidden">0</xsl:attribute>
<wmc:Server>
<xsl:attribute name="service">
<xsl:value-of select="$serviceName"/>
</xsl:attribute>

<xsl:attribute name="version"><xsl:value-of select="$version"/></xsl:attribute><xsl:attribute name="title"><xsl:value-of select="$serverTitle"/></xsl:attribute><wmc:OnlineResource xlink:type="simple" xlink:href="{$serverUrl}"/></wmc:Server><xsl:apply-templates select="child::node()"/><wmc:FormatList><wmc:Format current="1"><xsl:value-of select="$format"/></wmc:Format></wmc:FormatList></wmc:Layer>

</xsl:template><xsl:template match="Style"><wmc:StyleList><wmc:Style current="1"><xsl:apply-templates select="child::node()"/></wmc:Style></wmc:StyleList></xsl:template><xsl:template match="LegendURL"><wmc:LegendURL><xsl:apply-templates select="child::node()"/></wmc:LegendURL></xsl:template><xsl:template match="OnlineResource"><xsl:variable name="legendUrl"><xsl:value-of select="./@href"/></xsl:variable><wmc:OnlineResource xlink:type="simple" xlink:href="{$legendUrl}"/></xsl:template><xsl:template match="Layer/Title"><wmc:Title><xsl:value-of select="."/></wmc:Title></xsl:template>

<!-- THIS TOOL WILL MANIPULATE THE LAYERS WE GET FROM OUR GETCAPABILITIES EACH TIME WE CHOOSE A LAYER from EDIT mapViewer-->
<!--it assigns a new tag (<wmc:grup>) which value will be used to classify its legend (different legend.xsl file will be used depending on the Grup value) -->
<xsl:template match="Layer/Name">
<wmc:Name>
<xsl:value-of select="."/>
</wmc:Name>

<xsl:choose>
<xsl:when test="$layerName='topp:country_earth' or $layerName='topp:tdwg_level_1' or $layerName='topp:tdwg_level_2' or $layerName='topp:tdwg_level_3' or $layerName='topp:tdwg_level_4' or $layerName='topp:country_iberia' or $layerName='topp:province_europe'"> 
<wmc:Grup>Administrative</wmc:Grup>
</xsl:when>
<xsl:when test="$layerName='topp:elrs10000sqkm_iberia' or $layerName='topp:elrs1000000sqkm' or $layerName=' topp:elrs10000sqkm' or $layerName='topp:elrs10000sqkm_europe' or $layerName='topp:elrs250000sqkm' or $layerName='topp:elrs250000sqkm_europe' or $layerName='topp:itr10000sqkm_spain' 
or $layerName='topp:itr1000000sqkm_earth' or $layerName='topp:itr10000sqkm_earth' or $layerName='topp:itr10000sqkm_europe' or $layerName='topp:itr250000sqkm_earth' 
or $layerName='topp:itr250000sqkm_europe' or $layerName='topp:utm1000000sqkm_earth' or $layerName='topp:utm10000sqkm_europe' or $layerName='topp:utm250000sqkm_earth' or $layerName='topp:utm250000sqkm_europe' or $layerName='topp:utm2500sqkm_europe' or $layerName='topp:utm2500sqkm_iberia' or $layerName='topp:utm10000sqkm_iberia' ">
<wmc:Grup>utm</wmc:Grup>
</xsl:when>
<xsl:when test="$layerName='topp:coast_earth' or $layerName='topp:sea_land_300sec' or $layerName='topp:sea_land_europe_150sec' or $layerName='topp:coast_iberia' or $layerName='topp:distcoast_earth_300sec' or $layerName='topp:elevation_earth_300sec' or $layerName='topp:distcoast_iberia_150sec' or $layerName='topp:elevation_iberia_150sec' or $layerName='topp:elevation_europe_150sec'">
<wmc:Grup>topography</wmc:Grup>
</xsl:when>
<xsl:when test="$layerName='topp:bio1_earth_300sec'  or $layerName='topp:sea_land_300sec' or $layerName='topp:bio12_earth_300sec' or $layerName='topp:bio1_iberia_150sec' or $layerName='topp:bio12_iberia_150sec' or $layerName='topp:bio1_europe_150sec' or $layerName='topp:bio12_europe_150sec'">
<wmc:Grup>climate</wmc:Grup>
</xsl:when>
<xsl:when test="$layerName='topp:landcover_glcf_earth_225sec' or $layerName='topp:landcover_glcf_iberia_30sec' or $layerName='topp:landcover_glcf_europe_225sec'">
<wmc:Grup>landcover</wmc:Grup>
</xsl:when>

<xsl:when test="$layerName='topp:utm_scarab' or $layerName='topp:utm_numgenus' or $layerName='topp:scarab2500new' or $layerName='topp:userpr' or $layerName='topp:utm_incertidum'">
<wmc:Grup>utm2500analysis</wmc:Grup>
</xsl:when>
<xsl:when test="$layerName='topp:slopefin2' or $layerName='topp:taxisregis2' or $layerName='topp:nutaxis2' or $layerName='topp:nuregis2' or $layerName='topp:pointraster'">
<wmc:Grup>enviranalysis</wmc:Grup>
</xsl:when>

</xsl:choose>

</xsl:template>

<xsl:template match="Layer/Abstract">
<wmc:Abstract>
<xsl:value-of select="."/>
</wmc:Abstract>

</xsl:template>

<xsl:template match="DataURL"><wmc:DataURL><xsl:value-of select="."/></wmc:DataURL></xsl:template><xsl:template match="MetadataURL"><wmc:MetadataURL><xsl:value-of select="."/></wmc:MetadataURL></xsl:template><xsl:template match="SRS"><wmc:SRS><xsl:value-of select="."/></wmc:SRS></xsl:template><xsl:template match="owscat:service_resources"><xsl:variable name="serverUrl"><xsl:value-of select="owscat:endpoint_getresource"/></xsl:variable><wmc:Layer><xsl:attribute name="queryable"><xsl:value-of select="./@queryable"/></xsl:attribute><xsl:attribute name="hidden">0</xsl:attribute>


<wmc:Server>

<xsl:attribute name="service">
<xsl:value-of select="owscat:service_type"/>
</xsl:attribute>
<xsl:attribute name="version"><xsl:value-of select="owscat:service_version"/></xsl:attribute>
<xsl:attribute name="title">
<xsl:value-of select="owscat:organization"/></xsl:attribute><wmc:OnlineResource xlink:type="simple" xlink:href="{$serverUrl}"/>
</wmc:Server>

<xsl:apply-templates/>

</wmc:Layer></xsl:template>
<xsl:template match="text()|@*"/></xsl:stylesheet>
