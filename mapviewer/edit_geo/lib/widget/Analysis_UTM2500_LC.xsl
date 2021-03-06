<?xml version="1.0"?>
<xsl:stylesheet xmlns:wmc="http://www.opengis.net/context" xmlns:gml="http://www.opengis.net/gml" xmlns:wfs="http://www.opengis.net/wfs" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="xml" encoding="utf-8"/>

<xsl:param name="lang">en</xsl:param>

<xsl:param name="modelId"/><xsl:param name="widgetId"/><xsl:param name="skinDir"/><xsl:param name="moveUpImage"/><xsl:param name="moveDownImage"/><xsl:param name="deleteImage"/>
<xsl:param name="title"/>
<xsl:param name="Grup"/>
<xsl:param name="toggleVisTip"/><xsl:param name="moveLayerUpTip"/>
<xsl:param name="moveLayerDownTip"/><xsl:param name="deleteLayerTip"/>
<xsl:param name="featureName"/><xsl:param name="hidden"/>

<xsl:param name="context">config.objects.<xsl:value-of select="$modelId"/></xsl:param>

<xsl:template match="/wmc:ViewContext">
<div>
<table class="layerControl" cellspacing="0" width="340px">
<xsl:apply-templates select="wmc:LayerList/wmc:Layer">
<xsl:sort select="position()" order="descending" data-type="number"/>
</xsl:apply-templates>
</table>
</div>
</xsl:template>

<xsl:template match="wmc:Layer">
<xsl:variable name="layerName" select="wmc:Name"/>
<xsl:variable name="grup" select="wmc:Grup"/>

<xsl:if test="$grup='utm2500analysis'">
<xsl:variable name="rowClass">altRow_<xsl:value-of select="position() mod 2"/></xsl:variable>
<tr class="{$rowClass}" onmouseover="config.objects.{$widgetId}.highlightLayer('{$layerName}')">
<td><input type="checkbox" id="vis_{$layerName}" title="{$toggleVisTip}" onclick="{$context}.setHidden('{$layerName}',!document.getElementById('vis_{$layerName}').checked)">
<xsl:if test="@hidden='0'">
<xsl:attribute name="checked"/>
</xsl:if>
</input>
</td>

<td><a href="javascript:{$context}.setParam('moveLayerUp','{$layerName}')" class="mbButton"><img title="{$moveLayerUpTip}" src="{$skinDir}{$moveUpImage}"/></a></td><td><a href="javascript:{$context}.setParam('moveLayerDown','{$layerName}')" class="mbButton"><img title="{$moveLayerDownTip}" src="{$skinDir}{$moveDownImage}"/></a>
</td>

<td><a href="javascript:{$context}.setParam('deleteLayer','{$layerName}')" class="mbButton">
<img title="{$deleteLayerTip}" src="{$skinDir}{$deleteImage}"/></a>
</td>

<td onclick="config.objects.{$widgetId}.showLayerMetadata('{$layerName}')"><xsl:choose><xsl:when test="wmc:Title/@xml:lang"><xsl:value-of select="wmc:Title[@xml:lang=$lang]"/></xsl:when><xsl:otherwise><xsl:value-of select="wmc:Title"/></xsl:otherwise></xsl:choose></td>



</tr>
<tr class="{$rowClass}" onmouseover="config.objects.{$widgetId}.highlightLayer('{$layerName}')"><td colspan="5">
<xsl:choose>
<xsl:when test="$layerName='topp:utm_incertidum'">
<img src="http://edit.csic.es:8080/geoserver/filesweb/leyrojo2.jpg"/>
</xsl:when>
<xsl:when test="$layerName='topp:scarab2500new'">
<img src="http://edit3.csic.es:80/geoserver/wms/GetLegendGraphic?VERSION=1.1.1&amp;FORMAT=image/png&amp;LAYER=topp:scarab2500new"/>
</xsl:when>
<xsl:when test="$layerName='topp:utm_scarab'">
<img src="http://edit3.csic.es:80/geoserver/wms/GetLegendGraphic?VERSION=1.1.1&amp;FORMAT=image/png&amp;LAYER=topp:utm_scarab"/>
</xsl:when>
<xsl:when test="$layerName='topp:utm_numgenus'">
<img src="http://edit3.csic.es:80/geoserver/wms/GetLegendGraphic?VERSION=1.1.1&amp;FORMAT=image/png&amp;LAYER=topp:utm_numgenus"/>
</xsl:when>
</xsl:choose>
</td></tr>

</xsl:if>
</xsl:template><xsl:template match="text()|@*"/></xsl:stylesheet>
