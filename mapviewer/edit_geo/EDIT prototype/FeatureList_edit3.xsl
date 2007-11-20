<?xml version="1.0"?>
<xsl:stylesheet xmlns:wfs="http://www.opengis.net/wfs" xmlns:topp="http://www.openplans.org/topp" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:gml="http://www.opengis.net/gml" >
<xsl:param name="modelId"/>
<xsl:param name="widgetId"/>
<xsl:template match="/">
  <div>
  <xsl:apply-templates/>
  </div>
</xsl:template>

  <xsl:template match="gml:boundedBy"/>
 
  <xsl:template match="topp:the_geom"/>

  <xsl:template match="gml:featureMember">

  <table class="resultat" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" colspan="4"><strong>Results</strong></td></tr><tr>
  <xsl:apply-templates/></tr></table>

  </xsl:template>
  <xsl:template match="topp:numgenero">
      
        <td><br>
            Number of Genera</br>
                <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
            </td>
  </xsl:template>
  <xsl:template match="topp:numregs">
       <td> <br>
			Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
       </td>
  </xsl:template>
  

  
  <xsl:template match="topp:incertidum">
  <td><br>
			Uncertainty</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  
  </xsl:template>
  
    <xsl:template match="topp:species">
  <td><br>
			Species</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  
  </xsl:template>
  
   <xsl:template match="topp:genus">
  <td><br>
			Genera</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  
  </xsl:template>
        
 <xsl:template match="topp:cgrsname">
  <td><br>
			UTM square</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  
  </xsl:template>
  
   <xsl:template match="topp:name">
  <td><br>
			Name of country</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  
  </xsl:template>


  <xsl:template name="getXpath">
  <xsl:param name="node"/>
  <xsl:if test="name($node/..)">
  <xsl:call-template name="getXpath">
  <xsl:with-param name="node" select="$node/.." />
  </xsl:call-template>
  </xsl:if><xsl:text>/</xsl:text>
  <xsl:value-of select="name($node)"/></xsl:template>

  <xsl:template match="comment()|text()|processing-instruction()"/></xsl:stylesheet>