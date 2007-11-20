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

  <div id="europe"><table class="resultat" border="1" cellpadding="0" cellspacing="0"><th>Results</th>
  <xsl:apply-templates/></table><br/>
  </div>
  </xsl:template>
  <xsl:template match="topp:numgenero">
      
        <tr><td background-color="green"><b>
            Numero de generos</b>
                <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="20" value="{node()}" />
            </td></tr>
  </xsl:template>
  <xsl:template match="topp:numregs">
       <tr><td background-color="blue"> <b>
  Numero de registros</b>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="20" value="{node()}" />
       </td></tr>
  </xsl:template>
  
  <xsl:template match="topp:incertidum">
  <tr><td background-color="red"><b>
  Incertidumbre</b>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="20" value="{node()}" />
  </td></tr>
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