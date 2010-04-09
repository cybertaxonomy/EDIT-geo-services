<?


 $add='<div>
        <h4>Area to reproject</h4>
		<form>
        <select id="area">
            <option id="Africa">Africa</option>
            <option id="Asia">Asia</option>
            <option id="Europe">Europe</option>
            <option id="North America">North America</option>
            <option id="South America">South America</option>
			<option id="Oceania">Oceania</option>
        </select>
		</form>			
    </div>	
	 <div>
        
        <select id="crs_type" scrollable="true">
            <option id="utm">UTM projections</option>
            <option id="leq_area">Equal-Area</option>           
        </select>		
		<input id="crs_name_submit" type="submit" value="Get list of avaible CRS" /><br>
        <select id="crs_final" scrollable="true">
            <option></option>
        </select>
		 <div class="message3" id="change_proj" style="width: 170px;">Get Info about this projection</div><br>
		 <div class="message3" id="switch_4326" style="width: 170px;">Switch to latitude/longitude</div><br>
    </div>';
echo $add;
?>