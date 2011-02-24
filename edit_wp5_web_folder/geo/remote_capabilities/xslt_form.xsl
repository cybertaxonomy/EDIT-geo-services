<?xml version="1.0"?> <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
version="1.0" xmlns:wms="http://www.opengis.net/wms"
xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink"> <!--
sobrava el type xml!!!--> <xsl:template match="/WMT_MS_Capabilities |
/wms:WMS_Capabilities"> <!--  <table border='1' class='sortable paginated'> <tr><th
class='sort-alpha clickable' colspan="2" align="center"> Map Layers from
</th></tr><xsl:apply-templates/> </table>-->
<div id="getmap_url" style="visibility:hidden"><xsl:value-of select="Capability/Request/GetMap/DCPType/HTTP/Get/OnlineResource/@xlink:href"/></div>
Map Layers<form><select
id="wms_form" width="200px"><xsl:apply-templates/></select><input type='button' value='OK'/></form>

</xsl:template>

<xsl:template match="Layer[Name]"> <xsl:variable name="name"> <xsl:value-of
select="Name"/> </xsl:variable>
<option><xsl:value-of select="$name"/></option>
</xsl:template><xsl:template match="wms:Layer[wms:Name and
wms:Dimension/@name='time']"><xsl:variable name="name"><xsl:value-of
select="wms:Name"/></xsl:variable><tr><td><xsl:value-of select="wms:Title"/></td><td><a
href="javascript:config.objects.setParam('mapLayer','')">show
map</a></td></tr><xsl:apply-templates/></xsl:template><xsl:template
match="text()|@*"/></xsl:stylesheet>
