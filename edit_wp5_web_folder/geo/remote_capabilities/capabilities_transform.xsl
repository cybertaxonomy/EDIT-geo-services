<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"  version="1.0" xmlns:wms="http://www.opengis.net/wms" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink">
<!-- sobrava el type xml!!!-->
<xsl:template match="/WMT_MS_Capabilities | /wms:WMS_Capabilities">
    <table border='1' class='sortable paginated'>
	   <tr><th class='sort-alpha clickable' colspan="2" align="center">
          Map Layers from  	  
		 </th></tr><xsl:apply-templates/>
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
			
		
		  <a class="add_map" style="color: #17212c;" href="javascript:config.objects.editContext2.addNodeToModel('{$name}')" onclick="var src=$(this).parent().parent().next().next().find('img').attr('src');$('#altres_lay').slideDown('slow');">add to map <xsl:value-of select="$name"/></a></td></tr>
		     <tr>
			<td><a class="link_metadata" style="float:left;" onclick="$(this).parent().parent().next().fadeIn('slow').css('background-color','#a9f297');$(this).next().show();">show metadata</a><a class="hide_metadata" style="display:none;float:right;" onclick="$(this).parent().parent().next().fadeOut('slow');$(this).hide()">hide metadata</a></td>
			</tr>
			<tr class="wms_abstract" style="display:none;">  
			  <td>
				 <xsl:if test="not(Abstract)">Not avaible abstract for this layer</xsl:if>
				<xsl:if test="Abstract">
			  <xsl:value-of select="Abstract"/>
				</xsl:if>
			  </td>
			<td>    
<!--			<xsl:if test="not(Service/Title)='EDIT Geoplatform WMS'"> -->
			 <xsl:if test="Style/LegendURL">
				
				<xsl:element name="IMG">
					<xsl:attribute name="SRC">						
						<xsl:value-of select="Style/LegendURL/OnlineResource/@xlink:href"/>
				    </xsl:attribute>
				</xsl:element>
				
				</xsl:if>
<!--				 <xsl:if test="not(Style/LegendURL)">Not avaible legend</xsl:if>-->
<!--          </xsl:if> -->
  		<xsl:if test="Service/Title='EDIT Geoplatform WMS'">Not avaible for EDIT</xsl:if>
	    

          </td>
             </tr>
<!--			 <td>
			  <img><xsl:value-of select="Style/LegendURL/OnlineResource/@xlink:href"/>
			  </td> -->

		<xsl:apply-templates/></xsl:template><xsl:template match="wms:Layer[wms:Name and wms:Dimension/@name='time']"><xsl:variable name="name"><xsl:value-of select="wms:Name"/></xsl:variable><tr><td><xsl:value-of select="wms:Title"/></td><td><a href="javascript:config.objects.setParam('mapLayer','')">show map</a></td></tr><xsl:apply-templates/></xsl:template><xsl:template match="text()|@*"/></xsl:stylesheet>
