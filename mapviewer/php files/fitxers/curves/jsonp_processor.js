/**
 * JSON Processor
 * Processes information returned from JSON web services.
 * 
 * @version 	v1.0  22 February 2008
 * @author 		Tobin Bradley
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 */

/*	Map Functions	*/
function ws_identify(data) {
	if (data.total_rows > 0 ) { 
		$.each(data.rows, function(i, item){
			url = wsbase + "v1/ws_mat_pidgeocode.php?format=json&callback=ws_identify_pid_geocode&jsonp=?";
			args = "&pid=" + urlencode(item.row.pid);
			url = url + args;
			$.getJSON(url);
			  
		}); 
	}
}



	function curves(data)
			{
				//alert();
//				$("#pere").append(data);
			//	console.log(data);
				if (data.total_rows > 0 ) {
					var to_print="[";
			//	alert(data.total_rows);
					//29SMA3:{ data[[0,0]]},29S
//					"usa": {
//					            data: [[1988, 483994],
			
					$.each(data.polygon, function(i, item)
					{
//console.warn(data.polygon.length); //3

					var polygon_rows=item.row.polygon_rows;
					//	console.warn("NUMER OF ROWS  "+polygon_rows);
//console.log(item.row.label);
//console.log(item.row.data);

					if ( i !== (data.polygon.length -1))
					{
					//	console.info("i  :"+i);
		to_print+="{\""+item.row.label+"\":{label:\""+item.row.label+"\", data:["+item.row.data+"]}},";
//			console.log(i);
//			console.log(data.polygon.length);
					}
					else {
	to_print+="{\""+item.row.label+"\":{label:\""+item.row.label+"\", data:["+item.row.data+"]}}";

						}
				
				
					}); //fi each
				
			to_print+="]";
		}
//console.log(to_print);

//$("#pere").append(to_print);
 //    var d=eval("("+to_print+")");
//var array=d[]
var d=eval(to_print);
					//d.push(to_print);
		eval(d);
//		var array=d.label;
//		console.log(array);
//			console.info(d);
//			$.getJSON(d, function() {alert("adfa")});
//		console.info(d);
//			console.warn(d['29SMA3']['label']);
//			console.warn(d.29SMA3);
			data=[];
	  $.each(d, function(key, val) {		
			//		console.info(key);
//			console.log(val);  
			

		  $.each(val, function(key, val) {
			 $.each(val, function(key, val) {
			 var i = 0;
			 val.color = i;
//			console.log("color is "+key);  
			 ++i;
			});
//console.log(val);
		data.push(val);
		});	
		
		});
//			console.info(data);	
				
			var options = {
		        legend: { show: true },
		        yaxis: { ticks: 10 },
		        bars: { show: false },			
			        lines: { show: true, lineWidth: 2 },
		        selection: { mode: "xy" }
		    };

		$.plot($("#placeholder"), data, options);		  
/*
		var placeholder=$("#placeholder");
		placeholder.bind("selected", function (event, area) 
		{
		        $("#selection").text(area.x1.toFixed(1) + " to " + area.x2.toFixed(1));

		
		     var zoom = $("#zoom").attr("checked");
		        if (zoom)
		            plot = $.plot(placeholder, data,
		                          $.extend(true, {}, options, {
		                              xaxis: { min: area.x1, max: area.x2 }
		                          }));
		    }); //fi placeholder binc
		  var plot = $.plot(placeholder, data, options);
		$("#setSelection").click(function ()
		 {
	        plot.setSelection({ x1: 20, x2: 40 });
	    });
*/
var placeholder=$("#placeholder");
 var plot = $.plot(placeholder, data, options);
		var overview = $.plot($("#overview"), data, 
		{
		        legend: { show: false, container: $("#overviewLegend") },
	        lines: { show: true, lineWidth: 1 },
			//	bars: {show:true},
		        shadowSize: 0,	
				xaxis: { ticks: 4 },
		        yaxis: { ticks: 3, min: 0 },
		        grid: { color: "#999" },
		        selection: { mode: "xy" }
		    });

		    // now connect the two
		    var internalSelection = false;
//ZOOMING DES DE L'INTERIOR DE LA APLICACIÓ PRINCIPAL
		    $("#placeholder").bind("selected", function (event, area) {
		        // clamp the zooming to prevent eternal zoom
		        if (area.x2 - area.x1 < 0.00001)
		            area.x2 = area.x1 + 0.00001;
		        if (area.y2 - area.y1 < 0.00001)
		            area.y2 = area.y1 + 0.00001;
		        // do the zooming
	//	var data=[];
			        plot = $.plot($("#placeholder"), data,
			                      $.extend(true, {}, options, {
			                          xaxis: { min: area.x1, max: area.x2 },
			                          yaxis: { min: area.y1, max: area.y2 }
			                      }));
								//		console.log(d2);
								
		        if (internalSelection)
		            return; // prevent eternal loop
		        internalSelection = true;
		        overview.setSelection(area);
		        internalSelection = false;
		//només s'executa... si preguntem al principal (no a l'overview)
		  //  console.warn("data is...."+data);
		});
//		

	
//ZOOMING DES DE L'INTERIOR DE LA APLICACIÓ SECUNDÀRIA (OVERVIEW)
		    $("#overview").bind("selected", function (event, area) {
		        if (internalSelection)
		            return;
		        internalSelection = true;
		     //  console.warn("area is..."+area);
		        plot.setSelection(area);
		        internalSelection = false;
//		    });
		
		
			    });
		
				}
			

//$sql="select cgrsname,numregs,numgenero from ".$geotable." LIMIT 10000";
//$sql="select nobszon,spzon,slopend from ".$geotable." LIMIT 10000";
//serà el callback
			function pere_json2(data)
			{
				if (data.total_rows > 0 ) {
					var to_print="[{";
					$.each(data.rows, function(i, item)
					{

			
						if ( i !== (data.total_rows-1))
											{
								to_print+="\""+item.row.zones+"\":{label:\""+item.row.zones+"\", data:[["+item.row.nobszon+","+item.row.spzon+"]]},";
											}
											else {
							to_print+="\""+item.row.zones+"\":{label:\""+item.row.zones+"\", data:[["+item.row.nobszon+","+item.row.spzon+"]]}}];";	
										}
/*					if ( i !== (data.total_rows-1))
					{
		to_print+="\""+item.row.cgrsname+"\":{label:\""+item.row.cgrsname+"\", data:[["+item.row.numregs+","+item.row.numgenero+"]]},";
					}
					else {
	to_print+="\""+item.row.cgrsname+"\":{label:\""+item.row.cgrsname+"\", data:[["+item.row.numregs+","+item.row.numgenero+"]]}}];";	
				}
*/
					});


			

//$("#pere").append(to_print);
 //    var d=eval("("+to_print+")");
//var array=d[]
var d=eval(to_print);
					//d.push(to_print);
		eval(d);
//		var array=d.label;
//		console.log(array);
//			console.info(d);
//			$.getJSON(d, function() {alert("adfa")});
//		console.info(d);
//			console.warn(d['29SMA3']['label']);
//			console.warn(d.29SMA3);
			    $.each(d, function(key, val) {		
//					console.info(key);
//			console.log(val);  
			 var i = 0;
			data=[];
		    $.each(val, function(key, val) {
			 val.color = i;
		//	console.log(val);  
			 ++i;
			data.push(val);
			})	
//			console.info(data);	
			


/*		function getData(x1, x2) {
		        var d2 = [];
			        for (var i = x1; i < x2; i += (x2 - x1) / 10)
			            d2.push([x1+i, x2+i]);
			console.info(d2);
			        return [
			            { label: d2.x1, data: d2,color:d2.color }
			        ];
			    };
*/
		//fi getData
							
			var options = {
		        legend: { show: true },
		        yaxis: { ticks: 10 },
		        bars: { show: true },	
		 		grid: { clickable: true },
			//			xaxis: { ticks: [[4, "4 record"], [10, "10 recor"],
		        selection: { mode: "xy" }
		    };
		    $.plot($("#placeholder"), [ data ], { grid: { clickable: true } });
		$("#placeholder").bind("plotclick", function (e, pos) {
			        // the values are in pos.x and pos.y
			        $("#result").text('You clicked on (' + pos.x.toFixed(2) +  ', ' + pos.y.toFixed(2) + ')');
			    });
		$.plot($("#placeholder"), data, options);		  

		var overview = $.plot($("#overview"), data, {
		        legend: { show: false, container: $("#overviewLegend") },
//		        lines: { show: true, lineWidth: 1 },
			bars: {show:true},
			// lines: { show: false, fill: true },
		        shadowSize: 0,	
		//		xaxis: {
//				ticks: [[1, "J"], [2, "F"],
			//	xaxis: { ticks: [[4, "4 record"], [10, "10 recor"],
				xaxis:  { ticks: 15, min: 0 },
		        yaxis: { ticks: 3, min: 0 },
		        grid: { color: "#999", clickable: true },				
		        selection: { mode: "xy" }
		    });
		
		    // now connect the two
		    var internalSelection = false;
//ZOOMING DES DE L'INTERIOR DE LA APLICACIÓ PRINCIPAL
		    $("#placeholder").bind("selected", function (event, area) {
		        // clamp the zooming to prevent eternal zoom
		        if (area.x2 - area.x1 < 0.00001)
		            area.x2 = area.x1 + 0.00001;
		        if (area.y2 - area.y1 < 0.00001)
		            area.y2 = area.y1 + 0.00001;
		        // do the zooming
	//	var data=[];
		        plot = $.plot($("#placeholder"), data,
	//	console.log(area);	
	//OPTIONS
		                      $.extend(true, {}, options, {
		                          xaxis: { min: area.x1, max: area.x2 },
		                          yaxis: { min: area.y1, max: area.y2 }
		                      }));
								//		console.log(d2);
							//				console.log(area.x1);
							//		console.log(area.x2);
							//					console.log(area);

		        if (internalSelection)
		            return; // prevent eternal loop
		        internalSelection = true;
		        overview.setSelection(area);
		        internalSelection = false;
		//només s'executa... si preguntem al principal (no a l'overview)
		  //  console.warn("data is...."+data);
		});
		
//ZOOMING DES DE L'INTERIOR DE LA APLICACIÓ SECUNDÀRIA (OVERVIEW)
		    $("#overview").bind("selected", function (event, area) {
		        if (internalSelection)
		            return;
		        internalSelection = true;
		    //   console.warn("area is..."+area);
		        plot.setSelection(area);
		        internalSelection = false;
		    });
			/*
			{
		              //  yaxis: { min: 0 },
		              //  xaxis: { tickDecimals: 0 
						 data: data,
						 bars: { show: true }
*/
		          //  });
			    });


			//	console.info(d);
					/*	$.each(d.rows, function(i, item)
						{alert();
				//	console.warn(item.label);
				    });
				*/
				
				}
			}

	function pere_json(data)
	{
		if (data.total_rows > 0 ) {

			    var to_append="<table><tbody>";
			$.each(data.rows, function(i, item)
			{
				to_append+="<tr><td>"+item.row.cgrsname+"</td>";
					to_append+="<td>"+item.row.numregs+"</td></tr>";
			});
			    to_append+="</tbody></table>";
				$("#pere").append(to_append);
			};

	}
function ws_identify_pid_geocode(data){
	if (data.total_rows > 0 ) {
	  $.each(data.rows, function(i, item){
	    address = item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;			    		   
		setIdentify(item.row.objectid , item.row.x_coordinate , item.row.y_coordinate , item.row.parcel_id , item.row.parcel_id , address ,item.row.postal_city, item.row.longitude , item.row.latitude);		
	  });
	}
}
function ws_facility_info(data) {
	$.each(data.rows, function(i, item){
	     setFacility (item.row.long, item.row.lat, item.row.label);
	  });	
}

/*	Facility Drop Down List Functions	*/
function ws_ddl_libraries(data) {
	$.each(data.rows, function(i, item){
	 	$('#facilityinfo').append('<option>' + item.row.name + '</option>');
	});
	$('#facilityinfo option:first').attr('selected', 'selected');
}
function ws_ddl_schools(data) {
	$.each(data.rows, function(i, item){
	 	$('#facilityinfo').append('<option>' + item.row.schlname + '</option>');
	});
	$('#facilityinfo option:first').attr('selected', 'selected');
}
function ws_ddl_parks(data) {
	$.each(data.rows, function(i, item){
	 	$('#facilityinfo').append('<option>' + item.row.prkname + '</option>');
	});
	$('#facilityinfo option:first').attr('selected', 'selected');
}

/*	Search Functions	*/
function ws_geocode(data) {
	if (data.total_rows > 0 ) {
	  html = '<table class="datatable" id="page"><thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>SEARCH RESULTS</th></tr><thead><tbody>';
	  $.each(data.rows, function(i, item){
	    if (item.row.x_coordinate > 0) {
	    if (i == 0) map.setCenter(new OpenLayers.LonLat(' + item.row.longitude + ',' + item.row.latitude + '), 7);
		    address = item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;			    		   
			clickaddress =  item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name.replace(/'/, "\\'") + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;
			selectclick = item.row.objectid + "," + item.row.x_coordinate + "," + item.row.y_coordinate + ",'" + item.row.parcel_id + "','" + item.row.parcel_id + "','" + clickaddress + "','" + item.row.postal_city + "'," + item.row.longitude + "," + item.row.latitude; 
			radio = '<input type="radio" name="selectresult" value="' + item.row.objectid + '" onClick="setSelected(' + selectclick + ');" />';
		    html += '<tr><td width="10px">' + radio + '</td><td width="16px"><img src="image/find.gif" style="margin: 0px" onclick="map.setCenter(new OpenLayers.LonLat(' + item.row.longitude + ',' + item.row.latitude + '), 7);" /></td><td>' + address + '</td></tr>';
	    }
	  });
	  html += '<tfoot><td colspan="3"><a href="#" onclick="page(\'previous\'); return false;">&lt;&lt; Previous</a> <a href="#" onclick="page(\'next\'); return false;">Next &gt;&gt;</a></td></tfoot></tbody></table>';
	  $('#searchresults').html(html);
	  $('#page > tbody > tr:gt(4)').hide();
	  pager_max = Math.ceil(data.total_rows / 5);
	  pager_index = 1;
	  $('#page > tbody > tr:eq(0) > td:eq(0) > input:eq(0)').click();
	}
	else if (data.total_rows == 0 ) {
			$('#searchresults').html("<p>No records found.</p>");
	}
	else {
			$('#searchresults').html("<p>The search returned an error.</p>");
	}
}
function ws_addressnum(data) {
	if (data.total_rows > 0) {
		$.each(data.rows, function(i, item){
			if (i > 0) return false;
			clickaddress =  item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name.replace(/'/, "\\'") + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;
			map.setCenter(new OpenLayers.LonLat(' + item.row.longitude + ',' + item.row.latitude + '), 7);
			setSelected(item.row.objectid, item.row.x_coordinate, item.row.y_coordinate, item.row.parcel_id , item.row.parcel_id , clickaddress, item.row.postal_city , item.row.longitude , + item.row.latitude); 
			jQuery.each($('div.accordion > h3'), function(i, val) {
      			if ($('div.accordion > h3:eq(' + i + ')').html() == $(document).getUrlParam("category")) {
					$('div.accordion > h3:eq(' + i + ')').click();
					$('div.accordion > h3:eq(' + i + ')').next('div').slideDown('fast');
				}
    		});
		});	
	}
}
function ws_pid_geocode(data) {
	if (data.total_rows > 0 ) {
	  html = '<table class="datatable" id="page"><thead><tr><th>&nbsp;</th><th>&nbsp;</th><th>SEARCH RESULTS</th></tr></thead><tbody>';
	  $.each(data.rows, function(i, item){
	    if (item.row.x_coordinate > 0) {
	    if (i == 0) map.setCenter(new OpenLayers.LonLat(' + item.row.longitude + ',' + item.row.latitude + '), 7);
	    address = item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;
		clickaddress =  item.row.house_number + ' ' + item.row.prefix + ' ' + item.row.street_name.replace(/'/, "\\'") + ' ' + item.row.road_type + ' ' + item.row.suffix + ' ' + item.row.unit + ', ' + item.row.postal_city;
		selectclick = item.row.objectid + "," + item.row.x_coordinate + "," + item.row.y_coordinate + ",'" + item.row.parcel_id + "','" + item.row.parcel_id + "','" + clickaddress + "','" + item.row.postal_city + "'," + item.row.longitude + "," + item.row.latitude;
		radio = '<input type="radio" name="selectresult" value="' + item.row.objectid + '" onClick="setSelected(' + selectclick + ');" />';
	    html += '<tr><td width="10px">' + radio + '</td><td width="16px"><img src="image/find.gif" style="margin: 0px" onclick="map.setCenter(new OpenLayers.LonLat(' + item.row.longitude + ',' + item.row.latitude + '), 7);" /></td><td>PID: ' + item.row.parcel_id + '<br />' + address + '</td></tr>';
	 	}
	  });
	  html += '<tfoot><td colspan="3"><a href="#" onclick="page(\'previous\'); return false;">&lt;&lt; Previous</a> <a href="#" onclick="page(\'next\'); return false;">Next &gt;&gt;</a></td></tfoot></tbody></table>';
	  $('#searchresults').html(html);
	  $('#page > tbody > tr:gt(4)').hide();
	  pager_max = Math.ceil(data.total_rows / 5);
	  pager_index = 1;
	  $('#page > tbody > tr:eq(0) > td:eq(0) > input:eq(0)').click();
	}
	else if (data.total_rows == 0 ) {
			$('#searchresults').html("<p>No records found.</p>");
	}
	else {
			$('#searchresults').html("<p>The search returned an error.</p>");
	}
}

/*	Accordion Data Retrieval	*/
/*	Environment	*/
function ws_floodplain(data) {
	writebuffer = 'This property <b>is in a regulated floodplain</b>. <a target="_blank" href="http://maps.co.mecklenburg.nc.us/website/floodzone/?objectid=' + selectedArray[0] + '">Special restrictions may apply</a>. For more information, please call 704.336.3728.';
	if (data.total_rows > 0 ) { $('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>'); }
	else { $('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>This property <b>is not in a regulated floodplain</b>.</td></tr>'); }
}
function ws_water_quality(data) {
	if (data.total_rows > 0 ) { 
		$.each(data.rows, function(i, item){
			writebuffer = 'This property <b>includes water quality buffers (' + item.row.buff_id + ' ' + item.row.buff_type +  ')</b>. <a target="_blank" href="http://maps.co.mecklenburg.nc.us/website/floodzone/?objectid=' + selectedArray[0] + '&layer=PCB">Special restrictions may apply</a>. For more information, please call 704.336.5500.';
		});
		$('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>'); 
	}
	else { 
		$('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>This property <b>does not include water quality buffers</b>.</td></tr>'); 
	}
}
function ws_contamination_sites(data) {
	if (data.total_rows > 0 ) { 						
		writebuffer = 'This property <b>is within 1500 feet of a contamination site</b>. <a target="_blank" href="http://maps.co.mecklenburg.nc.us/website/wellinformationsystem/wis.aspx?pid=' + selectedArray[4] + '&action=buffer">Special restrictions may apply</a>. For more information, please call 704.336.5103.';
		$('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>'); 
	}
	else { 
		$('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>This property <b>is not within 1500 feet of a contamination site</b>.</td></tr>'); 
	}
}
function ws_thoroughfare(data) {
	if (data.total_rows > 0 ) { 						
		writebuffer = 'This property <b>is within 100 feet of an existing or proposed thoroughfare</b>. Special restrictions may apply. For more information, please call 704.336.4695.';
		$('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>'); 
	}
	else { 
		$('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>This property <b>is not within 100 feet of an existing or proposed thoroughfare</b>.</td></tr>'); 
	}
}
function ws_air_pollution(data){
	if (data.total_rows > 0 ) { 						
		writebuffer = 'This property <b>is within 1500 feet of an Air Pollution Facility</b>. <a target="_blank" href="http://maps.co.mecklenburg.nc.us/website/airpollution/defaultpidentry.asp?PID=' + selectedArray[4] + '">Special restrictions may apply</a>. For more information, please call 704.336.5500.';
		$('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>'); 
	}
	else { 
		$('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>This property <b>is not within 1500 feet of an Air Pollution Facility</b>.</td></tr>'); 
	}
}
function ws_watershed(data){
	if (data.total_rows > 0 ) { 
		$.each(data.rows, function(i, item){
			writebuffer = "This property is in the " + item.row.name + " watershed. ";
			if (item.row.subarea.length > 0) {
				writebuffer += '<b>It is a water supply watershed (' + item.row.subarea + ')</b>. <a target="_blank" href="http://www.charmeck.org/NR/rdonlyres/e6l5esghcvzib2spbkahcizqbzqkbycjpatrbxdgy6tn5iobuiynbyb5apqn4norcdtkambrvq7ud2jvhyk3vb4obdg/WatershedRulesSummary.pdf">Special restrictions may apply</a>. For more information, please call 704.336.5500.';
				$('#environment_table').append('<tr><td><img src="image/check_no.png" /></td><td>' + writebuffer + '</td></tr>');
			}
			else {
				writebuffer += '<b> It is not a water supply watershed</b>.';
				$('#environment_table').append('<tr><td><img src="image/check_yes.png" /></td><td>' + writebuffer + '</td></tr>');
			}
		}); 
	}
}

/*	Community	*/
function ws_crime(data) {
	writebuffer2 ="<h5>CRIME STATISTICS</h5>";
	if (data.total_rows > 0 ) {						  
	  $.each(data.rows, function(i, item){
			writebuffer2 += '<table class="datatable"><tbody>';
			writebuffer2 += '<tr><th>CMPD ' + item.row.div_name + '</th><th>2007</th><th style="text-align: right;">CHANGE FROM 2006</th></tr>';
			writebuffer2 += "<tr><td>MURDER AND NON-NEGLIGENT MANSLAUGHTER</td><td>" + parseInt(item.row.murder_and_non_negligent_manslaughter) + "</td><td style='text-align: right;'>" + item.row.murder_and_non_negligent_manslaughter_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>RAPE</td><td>" + parseInt(item.row.rape) + "</td><td style='text-align: right;'>" + item.row.rape_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>ROBBERY</td><td>" + parseInt(item.row.robbery) + "</td><td style='text-align: right;'>" + item.row.robbery_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>AGGRAVATED ASSAULT</td><td>" + parseInt(item.row.aggravated_assault) + "</td><td style='text-align: right;'>" + item.row.aggravated_assault_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>BURGLARY</td><td>" + parseInt(item.row.burglary) + "</td><td style='text-align: right;'>" + item.row.burglary_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>LARCENY</td><td>" + parseInt(item.row.larceny) + "</td><td style='text-align: right;'>" + item.row.larceny_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>VEHICLE THEFT</td><td>" + parseInt(item.row.vehicle_theft) + "</td><td style='text-align: right;'>" + item.row.vehicle_theft_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>ARSON</td><td>" + parseInt(item.row.arson) + "</td><td style='text-align: right;'>" + item.row.arson_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>TOTAL INCIDENTS</td><td>" + parseInt(item.row.total_incidents) + "</td><td style='text-align: right;'>" + item.row.total_incidents_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>VIOLENT INCIDENTS</td><td>" + parseInt(item.row.violent_incidents) + "</td><td style='text-align: right;'>" + item.row.violent_incidents_change + "%</td></tr>";
	  		writebuffer2 += "<tr><td>PROPERTY INCIDENTS</td><td>" + parseInt(item.row.property_incidents) + "</td><td style='text-align: right;'>" + item.row.property_incidents_change + "%</td></tr>";						 
	  });
	  writebuffer2 += '</tbody></table>';
	}
	else {
			writebuffer2 += "<p>No records found.</p>";
	}
	$('#crime').append(writebuffer2);
}
function ws_demographics(data) {
	writebuffer ="<h5>DEMOGRAPHICS</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th></th><th>2005</th><th style="text-align: right;">2010 PROJECTION</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>POPULATION</td><td>" + parseInt(item.row.popcy) + "</td><td style='text-align: right;'>" + parseInt(item.row.poppy) + "</td></tr>";
	  		writebuffer += "<tr><td>IN FAMILY HOUSEHOLDS</td><td>" + parseInt(item.row.popcyfam) + "</td><td style='text-align: right;'>" + parseInt(item.row.poppyfam) + "</td></tr>";
	  		writebuffer += "<tr><td>IN NON-FAMILY HOUSEHOLDS</td><td>" + parseInt(item.row.popcynfm) + "</td><td style='text-align: right;'>" + parseInt(item.row.poppynfm) + "</td></tr>";
	  		writebuffer += "<tr><td>MEDIAN AGE</td><td>" + parseInt(item.row.agecymed) + "</td><td style='text-align: right;'>" + parseInt(item.row.agepymed) + "</td></tr>";
	  		writebuffer += "<tr><td>WHITE</td><td>" + parseInt(item.row.raccywhite) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpywhite) + "</td></tr>";
	  		writebuffer += "<tr><td>BLACK</td><td>" + parseInt(item.row.raccyblack) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpyblack) + "</td></tr>";
	  		writebuffer += "<tr><td>AMERICAN INDIAN</td><td>" + parseInt(item.row.raccyamind) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpyamind) + "</td></tr>";
	  		writebuffer += "<tr><td>ASIAN OR PACIFIC ISLANDER</td><td>" + parseInt(item.row.raccyasian) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpyasian) + "</td></tr>";
	  		writebuffer += "<tr><td>MULTI-RACE</td><td>" + parseInt(item.row.raccymult) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpymult) + "</td></tr>";
	  		writebuffer += "<tr><td>HISPANIC</td><td>" + parseInt(item.row.raccymult) + "</td><td style='text-align: right;'>" + parseInt(item.row.racpymult) + "</td></tr>";
	  		writebuffer += "<tr><td>AGE 15+</td><td>" + parseInt(item.row.agecygt15) + "</td><td style='text-align: right;'>" + parseInt(item.row.agepygt15) + "</td></tr>";
	  		writebuffer += "<tr><td>AGE 25+</td><td>" + parseInt(item.row.agecygt25) + "</td><td style='text-align: right;'>" + parseInt(item.row.agepygt25) + "</td></tr>";
	  		writebuffer += "<tr><td>HOUSEHOLDS</td><td>" + parseInt(item.row.hhdcy) + "</td><td style='text-align: right;'>" + parseInt(item.row.hhdpy) + "</td></tr>";
	  		writebuffer += "<tr><td>HOUSING UNITS</td><td>" + parseInt(item.row.dwlcy) + "</td><td style='text-align: right;'>" + parseInt(item.row.hhdpy) + "</td></tr>";
	  		writebuffer += "<tr><td>PER CAPITA INCOME</td><td>" + parseInt(item.row.inccypcap) + "</td><td style='text-align: right;'>" + parseInt(item.row.inccypcap) + "</td></tr>";
	  		writebuffer += "<tr><td>MEDIAN HOUSEHOLD INCOME</td><td>" + parseInt(item.row.inccymedhh) + "</td><td style='text-align: right;'>" + parseInt(item.row.incpymedhh) + "</td></tr>";
	  		writebuffer += "<tr><td>AVERAGE DISPOSABLE INCOME</td><td>" + parseInt(item.row.inccyavedd) + "</td><td style='text-align: right;'>" + parseInt(item.row.incpyavedd) + "</td></tr>";
	  		writebuffer += "<tr><td>UNEMPLOYMENT RATE</td><td>" + parseInt(item.row.unecyrate) + "</td><td style='text-align: right;'>" + parseInt(item.row.unepyrate) + "</td></tr>"; 		
	  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#demographics').append(writebuffer);
}

/*	Services	*/
function ws_solid_waste(data) {
	writebuffer ="<h5>SOLID WASTE COLLECTION DAYS</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>SERVICE TYPE</th><th>COLLECTION DAY</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.type + "</td><td>" + item.row.day + "</td></tr>"
	  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#solid_waste').append(writebuffer);
}
function ws_parks(data) {
	writebuffer = "<h5>PARKS WITHIN 1.5 MILES</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th></th><th></th><th>PARK</th><th>ADDRESS</th></tr>';
	  $.each(data.rows, function(i, item){
	  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.prkname + '</b><br />' + item.row.prktype + '<br />' + item.row.prkaddr + '\')"';
	  		routeurl = googleRoute(selectedArray[5] + ' NC', item.row.prkaddr + ', ' + item.row.city + ' NC');
	  		writebuffer += "<tr><td><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td>" + item.row.prkname + "</td><td>" + item.row.prkaddr + "</td></tr>"
	  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#parks').append(writebuffer);
}
function ws_libraries(data) {
	writebuffer = "<h5>LIBRARIES WITHIN 3 MILES</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th></th><th></th><th>LIBRARY</th><th>ADDRESS</th></tr>';
	  $.each(data.rows, function(i, item){
	  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.name + '</b><br />' + item.row.address + '\')"';
	  		routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
	  		writebuffer += "<tr><td><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td>" + item.row.name + "</td><td>" + item.row.address + "</td></tr>"
	  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p>";
	}
	$('#libraries').append(writebuffer);
}

/*	Voting	*/
function ws_national_senate(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>NATIONAL SENATE</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#national_senate').html(writebuffer);
}
function ws_national_congressional(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>NATIONAL CONGRESSIONAL</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#national_congressional').html(writebuffer);
}
function ws_state_senate(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>STATE SENATE</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#state_senate').html(writebuffer);
}
function ws_state_house(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>STATE HOUSE</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#state_house').html(writebuffer);
}
function ws_charlotte_city_council(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>CHARLOTTE CITY COUNCIL</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
		$('#city_council').html(writebuffer);
	}
}
function ws_polling_location(data) {
	if (data.total_rows > 0 ) {
		$.each(data.rows, function(i, item){
		  	// Polling Location Info
		  	writebuffer = "<h5>PRECINCT " + item.row.precno + " POLLING LOCATION</h5>";
			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
			clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.name + '</b><br />' + item.row.address + '\')"';
			writebuffer +="<p style='text-align: center'><a href='#' " + clickevent1 + ">" + item.row.name + "</a><br />" + item.row.address + "<br />";
			writebuffer +="<a href='" + routeurl + "' target='_blank'>Get Directions</a></p>";
			$('#polling_location').html(writebuffer);
			//County Commissioner Info							
			url = wsbase + "v1/ws_boe_officials.php?format=json&district_type=county_commissioners&district=" + item.row.cc + "&callback=ws_county_commissioner&jsonp=?";
			$.getJSON(url);
			// School Board Info							
			url = wsbase + "v1/ws_boe_officials.php?format=json&district_type=board_of_education&district=" + item.row.school + "&callback=ws_school_board&jsonp=?";
			$.getJSON(url);
		});
	}
}
function ws_county_commissioner(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>MECKLENBURG COUNTY COMMISSIONERS</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#county_commission').html(writebuffer);
}
function ws_school_board(data) {
	if (data.total_rows > 0 ) {
		writebuffer = '<h5>MECKLENBURG COUNTY SCHOOL BOARD</h5>';
		writebuffer += '<table class="datatable"><tbody><tr><th>DISTRICT</th><th>REPRESENTATIVE</th></tr>';
		$.each(data.rows, function(i, item){
			writebuffer += "<tr><td>" + item.row.district + "</td><td>" + item.row.representative + "</td></tr>"
		});
		writebuffer += '</tbody></table>';
	}
	$('#school_board').html(writebuffer);
}

/*	Schools	*/
function ws_high_school_current(data) {
	writebuffer ="<h5>2007-2008 SCHOOL ASSIGNMENTS</h5><h5>HIGH SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility'/></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#high_school').append(writebuffer);
}
function ws_middle_school_current(data) {
	writebuffer ="<h5>MIDDLE SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#middle_school').append(writebuffer);
}
function ws_elementary_school_current(data) {
	writebuffer ="<h5>ELEMENTARY SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#elementary_school').append(writebuffer);
}
function ws_high_school_future(data) {
	writebuffer ="<br /><h5>2008-2009 SCHOOL ASSIGNMENTS</h5><h5>HIGH SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility'/></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#high_school_n').append(writebuffer);
}
function ws_middle_school_future(data) {
	writebuffer ="<h5>MIDDLE SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#middle_school_n').append(writebuffer);
}
function ws_elementary_school_future(data) {
	writebuffer ="<h5>ELEMENTARY SCHOOL</h5>";
	if (data.total_rows > 0 ) {
		  writebuffer += '<table class="datatable"><tbody>';
		  $.each(data.rows, function(i, item){
		  		clickevent1 = 'onclick="setFacility(' + item.row.long + ',' + item.row.lat + ', \'<b>' + item.row.schlname + '</b><br />' + item.row.type + '<br />' + item.row.address + '\')"';
	  			routeurl = googleRoute(selectedArray[5] + ' NC', item.row.address + ', ' + item.row.city + ' NC');
		  		writebuffer += "<tr><td width='10px'><img src='image/find.gif' style='margin: 0px' " + clickevent1 + " title='Locate Facility' /></td><td width='10px'><a href='" + routeurl + "' target='_blank' title='Driving Directions'><img src='image/car.png' style='margin: 0px' /></a></td><td><a href='http://www.cms.k12.nc.us/allschools/allschools.asp' target='_blank' >" + item.row.schlname + "</a></td><td>" + item.row.address + "</td></tr>"
		  });
		  writebuffer += '</tbody></table>';
	}
	else {
		writebuffer += "<p>No records found.</p><br />";
	}
	$('#elementary_school_n').append(writebuffer);
}

/*	Property	*/
function ws_house_photo(data) {
	writebuffer = "";
	if (data.total_rows > 0 ) {
	  $.each(data.rows, function(i, item){
	  		if (i == 0 && item.row.house_photo.length > 0) {
	  		 	writebuffer = '<center><a href="' + item.row.house_photo + '" title="House photo." id="housephoto"><img src="' + item.row.house_photo + '" width="100px" style="margin: 0px; padding: 0px"/></a><br />Click Image for Large View</center>'; 		
		        	$('#housephoto').append(writebuffer);
		        }
		  });
		  $('#housephoto').lightBox({
		imageLoading: 'image/lightbox-ico-loading.gif',
			imageBtnClose: 'image/lightbox-btn-close.gif'
		   });  
		  
		  $('#housephoto a').lightBox({
		imageLoading: 'image/lightbox-ico-loading.gif',
			imageBtnClose: 'image/lightbox-btn-close.gif'
		   });  
	}
}
function ws_ownership(data) {
	writebuffer ="<h5>OWNERSHIP</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>OWNER</th><th>ADDRESS</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.first_name + " " + item.row.last_name + "</td><td>" + item.row.address_1 + " " + item.row.address_2 + "<br />" + item.row.city + ", " + item.row.state + " " + item.row.zipcode + "</td></tr>"; 		
		  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#ownership').append(writebuffer);
}
function ws_appraisal(data) {
	writebuffer ="<h5>APPRAISAL</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>YEAR</th><th>BUILDING</th><th>EXTRA FEATURES</th><th>LAND</th><th>TOTAL</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.tax_year + "</td><td>$" + Math.round(item.row.building_value) + "</td><td>$" + Math.round(item.row.extra_features_value) + "</td><td>$" + Math.round(item.row.land_value) + "</td><td>$" + Math.round(item.row.total_value) + "</td></tr>"; 		
		  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#appraisal').append(writebuffer);
}
function ws_sales_history(data) {
	writebuffer ="<h5>SALES HISTORY</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>DATE</th><th>PRICE</th><th>DEED BOOK</th><th>LEGAL REF</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.sale_date + "</td><td>$" + item.row.sale_price + "</td><td>" + item.row.deed_book + "</td><td>" + item.row.legal_reference + "</td></tr>"; 		
		  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#sales_history').append(writebuffer);
}
function ws_land_use(data) {
	writebuffer ="<h5>LAND USE</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>USE</th><th>UNITS</th><th>NEIGHBORHOOD</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.land_use + "</td><td>" + parseInt(item.row.units) + "</td><td>" + item.row.neighborhood + "</td></tr>"; 		
		  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#land_use').append(writebuffer);
}
function ws_legal(data) {
	writebuffer ="<h5>LEGAL INFORMATION</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>DESC</th><th>ACCOUNT TYPE</th><th>FIRE DISTRICT</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.legal_description + "</td><td>" + item.row.account_type + "</td><td>" + item.row.fire_district + "</td></tr>"; 		
		  });
	  writebuffer += '</tbody></table>';
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#legal_information').append(writebuffer);
}
function ws_building(data) {
	writebuffer ="<h5>BUILDING INFORMATION</h5>";
	if (data.total_rows > 0 ) {
	  writebuffer += '<table class="datatable"><tbody><tr><th>BUILDING</th><th>YEAR BUILT</th><th>TOTAL SQ FT</th><th>HEATED SQ FT</th></tr>';
	  writebuffer2 = '<table class="datatable"><tbody><tr><th>BUILDING</th><th>EXTERIOR WALL</th><th>BEDS</th><th>BATHS</th></tr>';
	  $.each(data.rows, function(i, item){
	  		writebuffer += "<tr><td>" + item.row.property_use_description + "(" + item.row.card_number + ")" + "</td><td>" + item.row.year_built + "</td><td>" + Math.round(item.row.total_square_feet) + "</td><td>" + Math.round(item.row.heated_square_feet) + "</td></tr>"; 		
	  		baths = parseInt(item.row.full_baths) + parseInt(item.row.half_baths);
	  		writebuffer2 += "<tr><td>" + item.row.property_use_description + "(" + item.row.card_number + ")" + "</td><td>" + item.row.exterior_wall_description + "</td><td>" + item.row.bedrooms + "</td><td>" + baths + "</td></tr>";
		  });
	  writebuffer += '</tbody></table>';
	  writebuffer2 += '</tbody></table>';
	  writebuffer += writebuffer2;
	}
	else {
			writebuffer += "<p>No records found.</p><br />";
	}
	$('#building_information').append(writebuffer);
}

/*	Facility Search Change Event */
