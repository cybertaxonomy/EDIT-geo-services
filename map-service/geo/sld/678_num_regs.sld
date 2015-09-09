<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd">
	     <NamedLayer>
		    <Name>topp:num_regs</Name>
		    <UserStyle>
	      <FeatureTypeStyle>		    
	        <Rule>
	          <Name>0-52</Name>
	          <ogc:Filter>		
	            <ogc:And>		
	  			      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>  
	            <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>0</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>52</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#FFFFFF</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#B2B2B2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>53-104</Name>	         
	 		 <ogc:Filter>
				<ogc:And>
		     	      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>  
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>53</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>104</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	        </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#EBE2EC</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#A4A1B2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>105-156</Name>
	          <ogc:Filter>		
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>				         
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>105</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>156</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	      </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#C4A7C5</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#968FB2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>157-208</Name>
	          <ogc:Filter>		    
	            <ogc:And>	
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			        
	      		<ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>157</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>	            
	  			<ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>208</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#9C6C9E</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#887DB2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>209-260</Name>
	          <ogc:Filter>
	            <ogc:And>
			      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>209</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>260</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#7E4081</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#7A6CB2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>261-312</Name>
	          <ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>261</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>312</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#6A236E</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#6C5BB2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>313-364</Name>
	          <ogc:Filter>	
	            <ogc:And>	
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>	
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>313</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>364</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#611565</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#5E49B2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>365-416</Name>
	          <ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>365</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>416</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#A7A7A7</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#5038B2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>417-468</Name>
	          <ogc:Filter>
			<ogc:And>	
			      <ogc:PropertyIsEqualTo>
		             <ogc:PropertyName>userid</ogc:PropertyName>
		             <ogc:Literal>926</ogc:Literal>
		           </ogc:PropertyIsEqualTo>			         
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>417</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>468</ogc:Literal>
	              </ogc:PropertyIsLessThanOrEqualTo>
	            </ogc:And>
	          </ogc:Filter>
	<PolygonSymbolizer>
	  <Fill>
	    <CssParameter name="fill">#434343</CssParameter>
	<CssParameter name="fill-opacity">0.7</CssParameter>
	  </Fill>
	  <Stroke>
	    <CssParameter name="stroke">#4226B2</CssParameter>
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	        <Rule>
	          <Name>469-520</Name>
	          <ogc:Filter>
	            <ogc:And>
				      <ogc:PropertyIsEqualTo>
			             <ogc:PropertyName>userid</ogc:PropertyName>
			             <ogc:Literal>926</ogc:Literal>
			           </ogc:PropertyIsEqualTo>			
	              <ogc:PropertyIsGreaterThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>469</ogc:Literal>
	              </ogc:PropertyIsGreaterThanOrEqualTo>
	              <ogc:PropertyIsLessThanOrEqualTo>
	                <ogc:PropertyName>numreg</ogc:PropertyName>
	                <ogc:Literal>520</ogc:Literal>
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
	    <CssParameter name="stroke-width">1.6</CssParameter>
	  </Stroke>
	</PolygonSymbolizer>
	        </Rule>
	<Rule>
		<ogc:Filter>		
            		
  			      <ogc:PropertyIsEqualTo>
		             <ogc:PropertyName>userid</ogc:PropertyName>
		             <ogc:Literal>926</ogc:Literal>
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
