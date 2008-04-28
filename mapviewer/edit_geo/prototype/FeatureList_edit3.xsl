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

  <table class="resultat" border="0" cellpadding="0" cellspacing="0"><tr><td align="center" colspan="6"><strong>Results</strong></td></tr><tr>
  <xsl:apply-templates/></tr></table>
  </xsl:template>
  
    
  <xsl:template match="topp:ppp">
  <td><br>Annual Precipitation (mm)</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="20" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:nure">
  <td><br>Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:nuta">
  <td><br>Number of Taxa</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:slofi">
  <td><br>Slope at the end of collector's curve</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="30" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:numgenero">
        <td><br>Number of Genera</br>
        <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
        </td>
  </xsl:template>
  
  <xsl:template match="topp:numregs">
       <td><br>Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
       </td>
  </xsl:template>
  
  <xsl:template match="topp:numtaxa">
       <td><br>Number of Taxa</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
       </td>
  </xsl:template>
  
  <xsl:template match="topp:numreg">
       <td><br>Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
       </td>
  </xsl:template>
  
  <xsl:template match="topp:numtax">
       <td><br>Number of Taxa</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="8" value="{node()}" />
       </td>
  </xsl:template>
 
  <xsl:template match="topp:incertidum">
       <td><br>Num.Taxa / Num.Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="20" value="{node()}" />
       </td>
  </xsl:template>
  
    <xsl:template match="topp:species">
  <td><br>Species</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:genus">
  <td><br>Genera</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
 <xsl:template match="topp:cgrsname">
  <td><br>UTM Square</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:name">
  <td><br>Country Name</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
      
   <xsl:template match="topp:cntryname">
  <td><br>Country Name</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:provname">
  <td><br>Province Name</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:unitname">
  <td><br>Surface Unit Name</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:continent">
  <td><br>Level 1 unit</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:region_nam">
  <td><br>Level 2 unit</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:level_name">
  <td><br>Level 3 unit</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
    
   <xsl:template match="topp:level_4_na">
  <td><br>Level 4 unit</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:zones">
  <td><br>Surface Unit Name</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:nobszon">
  <td><br>Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:spzon">
  <td><br>Number of Taxa</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:slopend">
  <td><br>Slope at the end of collector's curve</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="25" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:precent">
  <td><br>Annual Precipitation (mm)</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:nuregis">
  <td><br>Number of Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:nutaxis">
  <td><br>Number of Taxa</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="7" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:taxisregis">
  <td><br>Num.Taxa / Num.Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:taxaperrecord">
  <td><br>Num.Taxa / Num.Records</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:slopefin">
  <td><br>Slope at the end of collector's curve</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:numpix">
  <td><br>Num.Pixels Interval</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
  <xsl:template match="topp:ns1">
  <td><br>Slope at the end of collector's curve</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="10" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:codigo">
  <td><br>UTM Square</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
  
   <xsl:template match="topp:utm_id">
  <td><br>UTM Square Id</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
    
  <xsl:template match="topp:elrs_id">
  <td><br>Latitud. Square Id</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>

  <xsl:template match="topp:id500_1000">
  <td><br>Icos. Triangle Id</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
    
   <xsl:template match="topp:id2000_500">
  <td><br>Icos. Triangle Id</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
  </td>
  </xsl:template>
    
   <xsl:template match="topp:id50000_10">
  <td><br>Icos. Triangle Id</br>
  <input type="text" readonly="readonly" id="{$widgetId}{generate-id()}" size="15" value="{node()}" />
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