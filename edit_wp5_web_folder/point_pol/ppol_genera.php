<?
$xmlstr_genera=<<<XML
<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
	        xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
	        xmlns="http://www.opengis.net/sld" 
	        xmlns:ogc="http://www.opengis.net/ogc" 
	        xmlns:xlink="http://www.w3.org/1999/xlink" 
	        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	     <NamedLayer>
		    <Name>topp:num_genus</Name>
		    <UserStyle>
	      <FeatureTypeStyle>		    
	        <Rule>
	          <Name>1</Name>
	          <ogc:Filter>		
	            <ogc:And>		
	  			      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>  
	            <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>0.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>5.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" >#FFFFFF</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#B2B2B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>2</Name>	         
	 		 <ogc:Filter>
				<ogc:And>
		     	      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>  
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>6.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>17.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	        </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" >#E3FFDB</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#A4A1B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>3</Name>
	          <ogc:Filter>		
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>				         
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>18.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>32.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	      </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" >#B3DFA7</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#968FB2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>4</Name>
	          <ogc:Filter>		    
	            <ogc:And>	
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			        
	      		<ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>33.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>	            
	  			<ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>54.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" >#579343</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#887DB2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>5</Name>
	          <ogc:Filter>
	            <ogc:And>
			      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>55.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>82.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#2F671B</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#7A6CB2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>6</Name>
		<ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>85.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>118.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill" >#005300</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#6C5BB2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>7</Name>
	          <ogc:Filter>	
	            <ogc:And>	
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>	
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>127.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>179.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>>
	    <CssParameter name="fill">#5787E7</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#5E49B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>8</Name>
	          <ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>201.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>299.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#000099</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#5038B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>9</Name>
	          <ogc:Filter>
			<ogc:And>	
			      <ogc:PropertyIsEqualTo>
		             <ogc:PropertyName>userid</ogc:PropertyName>
		             <ogc:Literal>0.0</ogc:Literal>
		           </ogc:PropertyIsEqualTo>			         
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>354.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>537.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#666666</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke" >#4226B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>10</Name>
	          <ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>0.0</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>632.0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numtax</ogc:PropertyName>
	                <ogc:Literal>798.0</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#000000</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#3415B2</CssParameter>
	    <CssParameter name="stroke-width" >1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
		<Rule>
			<ogc:Filter>		

	  			      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal></ogc:Literal>
			           </ogc:PropertyIsEqualTo>  

			</ogc:Filter>		
				<TextSymbolizer>
		        	<Label>
						<ogc:PropertyName>code</ogc:PropertyName>
					</Label>
					        <!-- this centers the label on the polygon's centroid-->
				    <LabelPlacement>
				      <PointPlacement>	
					      <AnchorPoint>
						  <AnchorPointX>0.5</AnchorPointX>
						  <AnchorPointY>0.5</AnchorPointY>
						</AnchorPoint>
				      </PointPlacement>					    
				    </LabelPlacement>	    
				     <!--  make the label easy to read-->
				    <Halo>				    
				      <Radius>
					 <ogc:Literal>2</ogc:Literal>
				      </Radius>
				      <Fill>
					<CssParameter name="fill">#FFFFFF</CssParameter>
					<CssParameter name="fill-opacity">0.7</CssParameter>				
				      </Fill>
				    </Halo>
				    <Fill>
					<CssParameter name="fill">#212426</CssParameter>
								<CssParameter name="fill-opacity">1</CssParameter>				
				    </Fill>            
					<Font>
					<CssParameter name="font-family">Verdana</CssParameter>
					<CssParameter name="font-style">Normal</CssParameter>
					<CssParameter name="font-size">20</CssParameter>
					<CssParameter name="font-weight">bold</CssParameter>
					</Font>
				</TextSymbolizer>
				</Rule>
	      </FeatureTypeStyle>
	    </UserStyle>
	  </NamedLayer>
	</StyledLayerDescriptor>
XML;
?>