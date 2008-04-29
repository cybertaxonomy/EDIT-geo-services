<?php
$xmlstr1=<<<XML
<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
<ViewContext xmlns="http://www.opengis.net/context" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" id="atlas_world" xsi:schemaLocation="http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd">
  <General>
    <Window width="638" height="363"/>
    <BoundingBox SRS="EPSG:4326" minx="-9.65" miny="35.6" maxx="4.85" maxy="43.85"/>
    <Title>Iberian Map</Title>
    <Abstract>Mapa iberico</Abstract>
  </General>
  <LayerList>

    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:landcover_glcf_iberia_30sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:landcover_glcf_iberia_30sec</Name>
      <Title>Landcover GLCF (resol.= 30 sec)</Title>
	  <Grup>landcover</Grup>
      <SRS>EPSG:4326</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit3.csic.es/geoserver/filesweb/lc.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	 <Layer queryable="1" hidden="0">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:country_iberia</Name>
      <Title>Countries</Title>
	  <Grup>Administrative</Grup>
      <Abstract>Countries of the Iberian Peninsula.</Abstract>
      <SRS>EPSG:4326</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
          <Style current="1">
            <Name>paisesrojo</Name>
            <Title>Countries</Title>
          </Style>
      </StyleList>
	 </Layer>	 
	<Layer queryable="1" hidden="0" id="scarab">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit3.csic.es/geoserver/wms"/>
      </Server>
      <Name>topp:test_csvimportgispoints2</Name>
      <Title>Sample points</Title>
      <Abstract>Scarabaeidae of the Iberian Peninsula.</Abstract>
	  <Grup>puntos</Grup>
      <SRS>EPSG:4326</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      
	  	<StyleList>

	<Style current="1" id="scarab_id">

			<SLD>
	          <OnlineResource/>

			</SLD>
</Style>
</StyleList>
    </Layer>
	
  </LayerList>
</ViewContext>
XML;
?>