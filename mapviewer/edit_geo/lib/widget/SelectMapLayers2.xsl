<?xml version="1.0"?>
<xsl:stylesheet xmlns:wms="http://www.opengis.net/wms" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"><xsl:output method="xml" omit-xml-declaration="no" encoding="utf-8" indent="yes"/><xsl:param name="modelId"/><xsl:param name="widgetId"/><xsl:template match="/WMT_MS_Capabilities | /wms:WMS_Capabilities">
    <table border='1' class='sortable paginated'>
	   <tr><th class='sort-alpha clickable' colspan="2" align="center">
          Map Layers from  <xsl:value-of select="wms:Service/wms:Title"/>	  
		  <xsl:value-of select="Service/Title"/></th></tr><xsl:apply-templates/>
		  </table>
		  </xsl:template>
		  <xsl:template match="Layer[Name]">
		  <xsl:variable name="name">
		  <xsl:value-of select="Name"/>
		  </xsl:variable>
		  <tr class='even' style='display: table-row;'>
		  <td>
		  <xsl:value-of select="Title"/>
		  </td>
		  <td width="100px" nowrap="true">
		  <a style="color: #17212c;" href="javascript:config.objects.editContext2.addNodeToModel('{$name}')">add to map</a></td></tr><xsl:apply-templates/></xsl:template><xsl:template match="wms:Layer[wms:Name and wms:Dimension/@name='time']"><xsl:variable name="name"><xsl:value-of select="wms:Name"/></xsl:variable><tr><td><xsl:value-of select="wms:Title"/></td><td><a href="javascript:config.objects.{$modelId}.setParam('mapLayer','{$name}')">show map</a></td></tr><xsl:apply-templates/></xsl:template><xsl:template match="text()|@*"/></xsl:stylesheet>
