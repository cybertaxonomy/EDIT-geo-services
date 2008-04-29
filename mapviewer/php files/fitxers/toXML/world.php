<?php
$xmlstr2=<<<XML
<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
<ViewContext version="1.0.0" id="atlas_world" xmlns="http://www.opengis.net/context" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd">
  <General>
    <Window width="760" height="380"/>
   <BoundingBox SRS="EPSG:4326" minx="-180" miny="-90.0" maxx="180.0" maxy="90"/>
    <Title>Earth Map</Title>
    <Abstract>Map of the Earth</Abstract>
  </General>
  
  <LayerList>
		
     
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:landcover_glcf_earth_225sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:landcover_glcf_earth_225sec</Name>
      <Title>Landcover GLCF (resol.= 225 sec)</Title>
	  <Grup>landcover</Grup>
      <SRS>EPSG:4326</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/lc.jpg"/>
		</LegendURL>
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

    <Layer queryable="1" hidden="0">
      <Server service="OGC:WMS" version="1.1.1" title="topp:country_earth">
        <OnlineResource xlink:type="simple" xlink:href="http://edit3.csic.es/geoserver/wms"/>
      </Server>
      <Name>topp:country_earth</Name>
      <Title>Countries</Title>
	  <Grup>Administrative</Grup>
      <SRS>EPSG:4326</SRS>
	  <StyleList>
	      <Style current="1">
          <Name>paisesrojo</Name>
          <Title>paises</Title>
        </Style>
      </StyleList>
      <FormatList><Format current="1">image/png</Format></FormatList>
    </Layer>
  </LayerList>
</ViewContext>
XML;
?>