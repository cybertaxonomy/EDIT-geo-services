﻿<?php
$config_xmlstr=<<<XML
<?xml version="1.0" encoding="utf-8" standalone="no"?>
<MapbuilderConfig version="0.2.1" id="referenceTemplate"
  xmlns="http://mapbuilder.sourceforge.net/mapbuilder"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://mapbuilder.sourceforge.net/mapbuilder ../../mapbuilder/lib/schemas/config.xsd">

  <models>
    <StyledLayerDescriptor id="mySLD">  
  		<defaultModelUrl></defaultModelUrl>
		<tools>
	    	<EditSLD id="editSLD">
	    		<targetModel>mainMap</targetModel>				
	    	</EditSLD>
	    </tools> 
    </StyledLayerDescriptor>
	
    <Context id="mainMap">  
	  <nodeSelectXpath>/wmc:ViewContext/wmc:LayerList/wmc:Layer</nodeSelectXpath>
      <widgets>
        <MapPane id="mainMapWidget">
          <htmlTagId>mainMapPane</htmlTagId>
          <mapContainerId>mainMapContainer</mapContainerId>
        </MapPane>
	    <Loading2 id="loading">
		<mapContainerId>mainMapContainer</mapContainerId>
		</Loading2>
        <AoiBoxWZ id="aoiBox2">
          <htmlTagId>mainMapPane</htmlTagId>
          <stylesheet>../lib/widget/GmlRenderer.xsl</stylesheet>
          <lineColor>#FF0000</lineColor>
          <lineWidth>1</lineWidth>
          <crossSize>15</crossSize>
          <mapContainerId>mainMapContainer</mapContainerId>
        </AoiBoxWZ>
        <CursorTrack id="cursorTrack">
          <mouseHandler>mainMap</mouseHandler>
		  <showLatLong>false</showLatLong>
		  <showXY>true</showXY>
        </CursorTrack>
        <Legend id="Legend"> </Legend>
		<LayerControl id="altresLegend">
		  <htmlTagId>altres_legend</htmlTagId>
		  <stylesheet>../lib/widget/altres_LC.xsl</stylesheet>
		   <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>
        </LayerControl>	
		<LayerControl id="contextLegend">
		  <htmlTagId>admin_legend</htmlTagId>
		  <stylesheet>../lib/widget/admin_LC.xsl</stylesheet>
		  <outputNodeId>admin_legendCanvas</outputNodeId>
		  <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>
        </LayerControl>	
		<LayerControl id="contextLegend2">  
		  <htmlTagId>utm_legend</htmlTagId>
		  <stylesheet>../lib/widget/utm_LC.xsl</stylesheet>
		  <outputNodeId>utm_legendCanvas</outputNodeId>
		   <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>
        </LayerControl>		
		<LayerControl id="contextLegend3">  
		  <htmlTagId>topography_legend</htmlTagId>
		  <stylesheet>../lib/widget/topography_LC.xsl</stylesheet>
		  <outputNodeId>topography_legendCanvas</outputNodeId>
		  <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>
        </LayerControl>
		<LayerControl id="contextLegend3">  
		  <htmlTagId>climate_legend</htmlTagId>
		  <stylesheet>../lib/widget/climate_LC.xsl</stylesheet>
		  <outputNodeId>climate_legendCanvas</outputNodeId>
		  <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>
        </LayerControl>
		<LayerControl id="contextLegend3">  
		  <htmlTagId>landcover_legend</htmlTagId>
		  <stylesheet>../lib/widget/landcover_LC.xsl</stylesheet>
		  <outputNodeId>landcover_legendCanvas</outputNodeId>
        </LayerControl>
		<LayerControl id="contextLegend4">  
		  <htmlTagId>puntos_legend</htmlTagId>
		  <stylesheet>../lib/widget/puntos_LC.xsl</stylesheet>
		  <outputNodeId>puntos_legendCanvas</outputNodeId>
		  <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
        </LayerControl>
		<LayerControl id="contextLegend4">  
		  <htmlTagId>UTM2500_legend</htmlTagId>
		  <stylesheet>../lib/widget/Analysis_UTM2500_LC.xsl</stylesheet>
		  <outputNodeId>UTM2500_legendCanvas</outputNodeId>
		  <moveUpImage>/images/LayerMoveUpDisable.png</moveUpImage>
          <moveDownImage>/images/LayerMoveDownDisable.png</moveDownImage>
          <deleteImage>/images/LayerRemoveDisable.png</deleteImage>

        </LayerControl>
		<LayerControl id="contextLegend5">  
		  <htmlTagId>environ_legend</htmlTagId>
		  <stylesheet>../lib/widget/environ_LC.xsl</stylesheet>
		  <outputNodeId>environ_legendCanvas</outputNodeId>
        </LayerControl>
		
      </widgets>
      <tools>
        <AoiMouseHandler id="mainAoi"/>
        <DragPanHandler id="mainDragPan">
          <enabled>false</enabled>
        </DragPanHandler>
        <MouseClickHandler id="mainMouseClick"/>
        <History id="extentHistory">
          <targetModel>mainMap</targetModel>
        </History>
		<WebServiceRequest id="featureInfoController">
					<targetModel>featureInfoResponse</targetModel>
					<requestName>wms:GetFeatureInfo</requestName>
          <infoFormat>application/vnd.ogc.gml</infoFormat>
          <featureCount>3</featureCount>
		</WebServiceRequest>
		</tools>
	</Context>
	<WmsCapabilities id="wmsCapTemplate">
			<defaultModelUrl>http://synthesys.csic.es:8080/geoserver/wms?request=GetCapabilities</defaultModelUrl>
			<title>OGC Web Map Server (WMS)</title>
			<widgets>		
				<Loading2 id="loading3">
					<htmlTagId>workspace</htmlTagId>
					<outputNodeId>workspaceCanvas</outputNodeId>
				</Loading2>
			</widgets>
			<tools>
				<EditContext id="editContext">
					<targetModel>mainMap</targetModel>
				</EditContext>
			</tools>
			<nodeSelectXpath>//Layer</nodeSelectXpath>
		</WmsCapabilities>
	<WmsCapabilities id="wmsCapTemplate2">		
			<widgets>  
			        <Widget id="layerList">
					<stylesheet>../lib/widget/SelectMapLayers2.xsl</stylesheet>
					<htmlTagId>workspace2</htmlTagId>
					<outputNodeId>workspace2Canvas</outputNodeId>
			       </Widget>  
					<Loading2 id="loading3">
						<htmlTagId>workspace2</htmlTagId>
						<outputNodeId>workspace2Canvas</outputNodeId>
					</Loading2>
			</widgets>
			<tools>
				<EditContext id="editContext2">
					<targetModel>mainMap</targetModel>
				</EditContext>
			</tools>
			<nodeSelectXpath>//Layer</nodeSelectXpath>
	</WmsCapabilities>
    <Context id="locator">
      <defaultModelUrl>topp_worlds.xml</defaultModelUrl>
      <widgets>
        <MapPane id="locatorWidget">
          <htmlTagId>locatorMap</htmlTagId>
          <targetModel>mainMap</targetModel>
          <mapContainerId>locatorContainer</mapContainerId>
          <fixedWidth>230</fixedWidth>
        </MapPane>
        <AoiBoxDHTML id="aoiBox2">
          <htmlTagId>locatorMap</htmlTagId>
          <stylesheet>../lib/widget/GmlRenderer.xsl</stylesheet>
          <lineColor>#FF0000</lineColor>
          <lineWidth>1</lineWidth>
          <crossSize>15</crossSize>
          <mapContainerId>locatorContainer</mapContainerId>
        </AoiBoxDHTML>
      </widgets>
      <tools>
        <AoiMouseHandler id="locatorAoi"/>
        <ZoomToAoi id="locatorZoomToAoi">
          <targetModel>mainMap</targetModel>
        </ZoomToAoi>
      </tools>
    </Context>   
	<Model id="featureInfoResponse" template="true">
      <namespace>xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:topp='http://www.openplans.org/topp'</namespace>
      <widgets>
        <FeatureInfo id="FeatureInfo">
		  <htmlTagId>left</htmlTagId>
		  <outputNodeId>leftCanvas</outputNodeId>
		  <stylesheet>FeatureList_edit3.xsl</stylesheet>
		  <autoRefresh>false</autoRefresh>
		</FeatureInfo>
      </widgets>
     </Model>
  </models>
  <widgets>
    <ZoomIn id="zoomIn">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <mouseHandler>mainAoi</mouseHandler>
      <class>RadioButton</class>
      <selected>true</selected>
      <enabledSrc>/images/ZoomInEnable.gif</enabledSrc>
      <disabledSrc>/images/ZoomInDisable.gif</disabledSrc>
      <tooltip xml:lang="en">click and drag to zoom in</tooltip> 
    </ZoomIn>
    <ZoomOut id="zoomOut">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <mouseHandler>mainAoi</mouseHandler>
      <class>RadioButton</class>
      <enabledSrc>/images/ZoomOutEnable.gif</enabledSrc>
      <disabledSrc>/images/ZoomOutDisable.gif</disabledSrc>
      <tooltip xml:lang="en">click to zoom out</tooltip>
    </ZoomOut>
    <DragPan id="dragPan">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <mouseHandler>mainDragPan</mouseHandler>
      <class>RadioButton</class>
      <enabledSrc>/images/PanEnable.gif</enabledSrc>
      <disabledSrc>/images/PanDisable.gif</disabledSrc>
      <tooltip xml:lang="en">click and drag to pan</tooltip>  
    </DragPan>
    <Reset id="reset">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <class>Button</class>
      <disabledSrc>/images/ResetExtentDisable.gif</disabledSrc>
      <tooltip xml:lang="en">reset the map to full extent</tooltip>  
    </Reset>	
	<SetAoi id="setAoi">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <mouseHandler>mainAoi</mouseHandler>
      <class>RadioButton</class>
      <enabledSrc>/images/SetAoiEnable.png</enabledSrc>
      <disabledSrc>/images/SetAoiDisable.png</disabledSrc>
	  <tooltip xml:lang="en">Set an area of interest to query (only point data in the Demo)</tooltip>  
    </SetAoi>
	 <GetFeatureInfo id="GetFeatureInfo">
      <scriptFile>js_code/GetFeatureInfo_sld.js</scriptFile>
      <buttonBar>mainButtonBar</buttonBar>
	  <tooltip>Query tool</tooltip>
      <targetModel>mainMap</targetModel>
      <mouseHandler>mainAoi</mouseHandler>
      <class>RadioButton</class>
      <enabledSrc>/images/QueryEnable.gif</enabledSrc>
      <disabledSrc>/images/QueryDisable.gif</disabledSrc>
	  <tooltip xml:lang="en">Query tool (point data in the Demo)</tooltip>
    </GetFeatureInfo>
    <Back id="back">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <class>Button</class>
      <disabledSrc>/images/StepBack.gif</disabledSrc>
    </Back>
    <Forward id="forward">
      <buttonBar>mainButtonBar</buttonBar>
      <targetModel>mainMap</targetModel>
      <class>Button</class>
      <disabledSrc>/images/StepForward.gif</disabledSrc>
    </Forward>
  </widgets>
  <skinDir>../lib/skin/default</skinDir>
</MapbuilderConfig>
XML;
?>