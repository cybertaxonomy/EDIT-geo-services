<?php
$xmlstr4=<<<XML
<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>
<ViewContext xmlns="http://www.opengis.net/context" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" id="atlas_world" xsi:schemaLocation="http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd">
  <General>
    <Window width="595" height="363"/>
    <BoundingBox SRS="EPSG:32630" minx="-150500" miny="3970000" maxx="1200739.66942149" maxy="4870000"/>
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
      <SRS>EPSG:32630</SRS>
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
      <Server service="OGC:WMS" version="1.1.1" title="topp:bio12_iberia_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:bio12_iberia_150sec</Name>
      <Title>Annual Precipitation (resol.= 150 sec)</Title>
	  <Grup>climate</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/preciberia.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:bio1_iberia_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:bio1_iberia_150sec</Name>
      <Title>Mean Temperature (resol.= 150 sec)</Title>
	  <Grup>climate</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/mitempiberia.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>
	
    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:elevation_iberia_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:elevation_iberia_150sec</Name>
      <Title>Elevation a.s.l. (resol.= 150 sec)</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/mimispain.jpg"/>
		</LegendURL>
				</Style>
			</StyleList>
    </Layer>


    <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="topp:distcoast_iberia_150sec">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:distcoast_iberia_150sec</Name>
      <Title>Distance coast (km) (resol.= 150 sec)</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList><Format current="1">image/png</Format></FormatList>
	  	<StyleList>
				<Style current="1">
					<Name>raster</Name>
					<Title>default</Title>
		<LegendURL format="image/jpg">
			<OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/filesweb/distcoastiberia.jpg"/>
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
      <SRS>EPSG:32630</SRS>
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
      <Server service="OGC:WMS" version="1.1.1" title="topp:coast_earth">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:coast_earth</Name>
      <Title>Coast line</Title>
	  <Grup>topography</Grup>
      <SRS>EPSG:32630</SRS>
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
	 
	 <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:province_europe</Name>
      <Title>Provinces</Title>
	  <Grup>Administrative</Grup>
      <Abstract>Provinces of Europe.</Abstract>
      <SRS>EPSG:32630</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>paisesrojo</Name>
          <Title>Provinces</Title>
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
      <SRS>EPSG:32630</SRS>
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
      <Name>topp:test_csvimportgispoints</Name>
      <Title>Sample points</Title>
      <Abstract>Scarabaeidae of the Iberian Peninsula.</Abstract>
	  <Grup>puntos</Grup>
      <SRS>EPSG:32630</SRS>
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
      <Name>topp:itr10000sqkm_spain</Name>
      <Title>Icos. Triangles 10000 sq km</Title>
      <Abstract>Icosaedric Triangles 10000 sq km.</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>population</Title>
        </Style>
      </StyleList>
    </Layer>
			
	<Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:elrs10000sqkm_iberia</Name>
      <Title>Latitudinal squares 10000 sq km</Title>
      <Abstract>Latitudinal squares 10000 sq km.</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>population</Title>
        </Style>
      </StyleList>
    </Layer>
	
 <Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:utm2500sqkm_iberia</Name>
      <Title>UTM squares 2500 sqkm</Title>
      <Abstract>utm 2500 sq km</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>population</Title>
        </Style>
      </StyleList>
    </Layer>
	
	<Layer queryable="1" hidden="1">
      <Server service="OGC:WMS" version="1.1.1" title="Local">
        <OnlineResource xlink:type="simple" xlink:href="http://edit.csic.es:8080/geoserver/wms"/>
      </Server>
      <Name>topp:utm10000sqkm_iberia</Name>
      <Title>UTM squares 10000 sqkm</Title>
      <Abstract>utm 10000 sq km.</Abstract>
	  <Grup>utm</Grup>
      <SRS>EPSG:32630</SRS>
      <FormatList>
        <Format current="1">image/png</Format>
      </FormatList>
      <StyleList>
        <Style current="1">
          <Name>utm</Name>
          <Title>population</Title>
        </Style>
      </StyleList>
    </Layer>



  </LayerList>
</ViewContext>
XML;
?>