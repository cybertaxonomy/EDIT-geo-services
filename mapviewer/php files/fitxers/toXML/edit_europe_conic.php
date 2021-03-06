<?php
$xmlstr5=<<<XML
<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
<ViewContext version="1.0.0" id="atlas_world" xmlns="http://www.opengis.net/context" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd">
  <General>
    <Window width="530" height="425"/>
    <BoundingBox SRS="epsg:3034" minx="1700000" miny="800000" maxx="7000000" maxy="5100000"/>
    <Title>European Map</Title>
    <Abstract>Mapa europeu</Abstract>
  </General>
  <LayerList>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:landcover_glcf_europe_225sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:landcover_glcf_europe_225sec</Name>
      <Title>Landcover GLCF (resol.= 225 sec)</Title>
	  <Grup>landcover</Grup>
      <SRS>EPSG:3034</SRS>
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
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:bio12_europe_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:bio12_europe_150sec</Name>
      <Title>Annual Precipitation (resol.= 150 sec)</Title>
	  <Grup>climate</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/preceuro.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
		 			
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:bio1_europe_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:bio1_europe_150sec</Name>
      <Title>Mean Temperature (resol.= 150 sec)</Title>
	  <Grup>climate</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/mitempeuro.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:elevation_europe_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:elevation_europe_150sec</Name>
      <Title>Elevation a.s.l. (resol.= 150 sec)</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/mimieuro.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>

    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:distcoast_europe_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:distcoast_europe_150sec</Name>
      <Title>Distance coast (km) (resol.= 150 sec)</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/distcoasteuro.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:sea_land_europe_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:sea_land_europe_150sec</Name>
      <Title>Sea / Land (resol.= 150 sec)</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/sea_land.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	
      <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:coast_europe">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:coast_europe</Name>
      <Title>Coast line</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:3034</SRS>
	  <StyleList>
	      <Style current="1">
          <Name>coast</Name>
          <Title>coast</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/coastline.jpg"/>
		</LegendURL>
        </Style>
      </StyleList>
      <FormatList><Format current="1">image/png</Format></FormatList>
    </Layer>
	
		<Layer queryable="1" hidden="0" id="scarab">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit3.csic.es/geoserver/wms"/>
      </Server>
      <Name>topp:test_csvimportgispoints</Name>
      <Title>Sample points</Title>
      <Abstract>Scarabaeidae of the Iberian Peninsula.</Abstract>
	  <Grup>puntos</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      
	  	<StyleList>

	<Style current="1" id="scarab_id">

	<SLD>

	<StyledLayerDescriptor version="1.0.0" id="sld vide">

	<NamedLayer>
<Name>topp:test_csvimportgispoints</Name>

	<UserStyle>
<Title>werwer</Title>
<Abstract/>

	<FeatureTypeStyle>

    <Rule>
	<Filter>
     
	   <And>
	    
                    <PropertyIsEqualTo>
                          <PropertyName>userid</PropertyName>
                          <Literal></Literal>
                    </PropertyIsEqualTo>

		</And>
			
						  
     </Filter>

	 <PointSymbolizer>
							                  <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                        		<Fill>
                        			<CssParameter name="fill">
                        				<Literal>#FF0000</Literal>
                        			</CssParameter>
                        			<CssParameter name="fill-opacity">
                        				<Literal>0.1</Literal>
                        			</CssParameter>
                        		</Fill>
                                   <Stroke> 
                                     <CssParameter name="stroke">#FF0000</CssParameter> 
                                     <CssParameter name="stroke-width">1</CssParameter>
                                     <CssParameter name="stroke-opacity">0.5</CssParameter> 
                                   </Stroke>
                            </Mark>
                            <Size>2</Size>
                        </Graphic>
                    </PointSymbolizer>
</Rule>
</FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>
</SLD>
</Style>
</StyleList>
    </Layer>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:province_europe</Name>
      <Title>Provinces</Title>
	  <Grup>Administrative</Grup>
      <Abstract>Provinces of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>paisesrojo</Name>
          <Title>prov_europe</Title>
        </Style>
      </StyleList>
	 </Layer>
	
    <Layer queryable="1" hidden="0">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:country_earth_europe</Name>
      <Title>Countries</Title>
	  <Grup>Administrative</Grup>
      <Abstract>Countries of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>paisesrojo</Name>
          <Title>countries_europe</Title>
        </Style>
      </StyleList>
	 </Layer>
	 	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:itr10000sqkm_europe</Name>
      <Title>Icos. Triangles 10000 sqkm</Title>
      <Abstract>10000 sq km Icosaedric Triangles of Europe.</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:itr250000sqkm_europe</Name>
      <Title>Icos. Triangles 250000 sqkm</Title>
	  <Grup>utm</Grup>
      <Abstract>250000 sq km Icosaedric Triangles of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>

	 	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:elrs10000sqkm_europe</Name>
      <Title>Latitudinal squares 10000 sqkm</Title>
      <Abstract>Latitudinal squares 10000 sqkm of Europe.</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:elrs250000sqkm_europe</Name>
      <Title>Latitudinal squares 250000 sqkm</Title>
	  <Grup>utm</Grup>
      <Abstract>Latitudinal squares 250000 sqkm of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:utm2500sqkm_europe</Name>
      <Title>UTM 2500 sqkm</Title>
	  <Grup>utm</Grup>
      <Abstract>2500 sq km UTM squares of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:utm10000sqkm_europe</Name>
      <Title>UTM 10000 sqkm</Title>
	  <Grup>utm</Grup>
      <Abstract>10000 sq km UTM squares of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	 
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:utm250000sqkm_europe</Name>
      <Title>UTM 250000 sqkm</Title>
	  <Grup>utm</Grup>
      <Abstract>250000 sq km UTM squares of Europe.</Abstract>
      <SRS>EPSG:3034</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>utms</Title>
        </Style>
      </StyleList>
	 </Layer>
	
	 	
  </LayerList>
</ViewContext>
XML;
?>