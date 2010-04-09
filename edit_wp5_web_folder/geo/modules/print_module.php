<?
$code='	<li>Image format
			<ul style="height:20px">
					 <form id="format_form" >
						<select>
						<option value="png/gray">PNG gray</option>	
						<option value="jpeg/gray">JPEG gray</option>	
						<option value="gif/gray">GIF gray</option>	
						<option value="tif/gray">TIF gray</option>					
						<option value="image/png">PNG</option>

						<option value="image/jpeg">JPEG</option>
							<option value="tif">TIF</option>
						<option value="image/gif">GIF</option>

						</select>

					</form>

		
					<form id="tif_form" style="visibility:hidden;" >
						<label>Do you want TIFF in CMYK?</label>
						<select>
<option value="no_cmyk">no CMYK</option>
							<option value="cmyk">CMYK</option>

						</select>
					</form>	<br>
					<form id="bits_form" style="visibility:hidden;">
						<label>Do you want 8bit or 16bit?</label><br>
						<select>
							<option value="8bit">8bit</option>
							<option value="16bit">16bit</option>
						</select>
					</form>	
		 </ul>
		 </li>
		<li>Keymap parameters
					<ul style="height:20px;display: block;height:auto">
							 <form id="keympap_background" style="margin-top: 10px;" >
							<label>Choose layer used as background</label><br>
								<select>
								<option selected value="world">World</option>
								<option value="africa">Africa</option>
								<option value="asia">Asia</option>
								<option value="europe_west">West Europe</option>
								<option value="europe_east">East Europe</option>
								<option value="oceania">Oceania</option>
								<option value="n_america">North America</option>
								<option value="s_america">South America</option>
								<option value="c_america">Central America</option>
								</select>
							</form><br>
						<input type="radio"  id="world_zoom" checked="checked" name="keymap">World zoom</input><br>
						<input type="radio"  id="selected_zoom" name="keymap">Selected background zoom</input>
							<div class="message3" id="get_keymap">GET the keymap</div><br>
					</ul>
		</li>			
		<li id="resolution">Resolution data
			<ul>
					 <form id="dpi_form">
						<select>
						<option value="120">120 dpi</option>
						<option value="240">240 dpi</option>
						<option value="480">480 dpi</option>	
		
					</select>
					</form><br>
					 <form id="img_size_form">
						<select>
						<option value="medium">7.5x3.75 cm</option>
						<option selected="selected" value="big">15x7.5 cm</option>			
					</select>

				</form>
			</ul>
		</li>
		<li>Windrose
		<ul>
				<form id="windrose_form">
							<label>Do you want a windrose?</label><br>
							<select>
								<option selected="selected" value="no">NO</option>
								<option value="yes">YES</option>

							</select>
						</form>
				<form id="choose_windrose_form">
							<label>Choose a windrose</label><br>
							<select>
								<option selected="selected" value="no_windrose"></option>
								<option value="windrose1.png">windrose 1</option>
								<option value="windrose2.png">windrose 2</option>
								<option value="windrose3.png">windrose 3</option>
								<option value="windrose4.png">windrose 4</option>
								<option value="windrose5.png">windrose 5</option>
							</select>
						</form>

		</ul>
		</li>
		
		<li>Scalebar options
		<ul>
		     <form id="scalebar_form">
							<label>Do you want a scalebar?</label><br>
							<select>
							    <option selected="selected" value="no">NO</option>
								<option value="yes">YES</option>
								
							</select>
			</form>
			<div>
			<form id="l_size"><label>Scalebar size</label><br>
			<select>
			 <option selected="selected" value="200">Medium</option>
			 <option value="400">Large</option>				
			</select>
			 </form>
			 <form id="l_label_size"><label>Scalebar label size</label><br>
			<select>
			 <option value="tiny">tiny</option>
			 <option value="small">small</option>	
			 <option selected="selected" value="medium">medium</option>
			 <option value="large">large</option>
			 <option value="giant">giant</option>
			</select>				 
			</form>
			<form id="l_intervals"><label>Scalebar intervals</label><br>
			<select>				 
			 <option value="2">2</option>
			 <option selected="selected" value="4">4</option>	
			 <option value="6">6</option>	
			</select>
			</form>
			<form id="l_units"><label>Scalebar units</label><br>
			<select>
			 <option value="METERS">meters</option>
			 <option  value="KILOMETERS" selected="selected">kilometers</option>	
			 <option value="MILES">miles</option>	
			</select>			
		</form>			
		    

		<div class="message3" id="get_scalebar">UPDATE the scalebar</div>

			</div>

		</ul>
		</li>

			
	<li>Print your map & map legend
    <ul>
  

	<div class="message3" onClick="print_legend()" id="general_legend">GET the legend</div><br>
	<div class="message3" id="get_image">GET this image </div>

    </ul>
	</li>';
echo $code;
?>