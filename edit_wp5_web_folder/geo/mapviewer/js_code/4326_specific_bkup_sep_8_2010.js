

    serialized = new OpenLayers.Layer.WMS.Untiled( "Your symbolized polygons",
		        "http://193.190.223.53:8080/geoserver/wms", {layers:'topp:serialized_pols',GROUP:'remote',sld: '../../stable_sld/permanent_sld/transparent_pols.sld',transparent:"true",format:t_img_format},{opacity:1},{'reproject': false});

	queryEventHandler = new OpenLayers.Handler.Click({ 'map': map }, {  ondblclick: function() {alert("double click")}, 
	'click': function(e) { doGetFeatureInfo(e); }});	


    		 myStyles = new OpenLayers.StyleMap({
			          "first": new OpenLayers.Style({
	                  //  pointRadius: "20", // sized according to type attribute
	                    fillColor: "#bcf099",
	                    strokeColor: "#3399ff",
	                    strokeWidth: "2",
	                     fillOpacity: "0.5"

	                }),
	                "default": new OpenLayers.Style({
	                    pointRadius: "20", // sized according to type attribute
	                    fillColor: "${color}",
	                    fillOpacity: "${fillOpacity}",
	                    strokeColor: "${strokeColor}",
	                    strokeWidth: "${strokeWidth}",
	                    strokeDashstyle: "${strokeDashstyle}"
	                }),
	                "select": new OpenLayers.Style({
	                    fillColor: "##baa2e2",
	                    strokeColor: "#3399ff",
	                    fillOpacity: "0.5"
	                })
	                })

	           pointLayer = new OpenLayers.Layer.Vector("Point Layer",{styleMap: myStyles,GROUP:"remote"});
	           polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer",{GROUP:"remote",styleMap: myStyles["first"]});
	
	polygonLayerControl=new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.Polygon);
    map.addControl(polygonLayerControl);
    
	
	// toggle the queryEventHandler active state
	function toggleQueryMode()
	{            

	    if(featureInfo.active) {
	        queryEventHandler.activate();
	    }
	    else {
	        queryEventHandler.deactivate();
	    }
	}

  



function doGetFeatureInfo(evt) { 
	
	  var lonlat = map.getLonLatFromViewPortPx(evt.xy);
	  //console.info(lonlat);
/*        alert("You clicked near " + lonlat.lat + " N, " +
                                  + lonlat.lon + " E");
*/
								    x = parseFloat(lonlat.lon);	// make into floats
									y = parseFloat(lonlat.lat);
     						if (ppol_query=="false")
									{									
									var ul = new Array();// x, y
									var ur = new Array();
									var bl = new Array();
									var br = new Array();// x, y	
									ul[0] = x-0.1;
									ul[1] = y+0.1;
									bl[0]= x-0.1;
									bl[1]= y-0.1;
									ur[0]= x+0.1;
									ur[1]= y +0.1;
									br[0] = x+0.1;
									br[1] = y-0.1;
								    bbox=[];
									bbox.push(ul,bl,ur,br,ul);	
								
//console.log("ppol_query false");
								$.getScript('js_code/bind_results_sld.js');
							}
						  else
						{
//console.log("ppol_query true");			
								$.getScript('js_code/bind_results_ppol_adaptat.js');			
						}
							}

/*
map.addLayers([vlayer,edit_blank,edit_admin,shoreline,s_america1,s_america2,oceania1,oceania2]);
shoreline.setVisibility(false);
s_america1.setVisibility(false);s_america2.setVisibility(false);oceania1.setVisibility(false);oceania2.setVisibility(false);
  map.setBaseLayer(edit_blank);
  map.addLayer(edit_gbif);
  edit_gbif.setVisibility(false);

map.setCenter(bounds.getCenterLonLat(),map.getZoomForExtent(bounds));
*/

queryEventHandler2 = new OpenLayers.Handler.Click({ 'map': map }, {  ondblclick: 
	function() {alert("dounle lick")}, 'click': function(e) {//
	
	doGetFeatureInfo(e); 
	}});	

queryEventHandler2 = new OpenLayers.Handler.Click({ 'map': map }, {  ondblclick: 
	function() {alert("dounle lick")}, 'click': function(e) {//
	//alert("dogetfeature"); 
	doGetFeatureInfo(e); 
	}});
	
// toggle the queryEventHandler active state
	function toggleQueryMode()
	{            

	    if(featureInfo.active) {
	        queryEventHandler.activate();
	    } 
	    else {
	        queryEventHandler.deactivate();
	    }
	}
	function toggleQueryMode2()
	{            

	    if(featureInfo2.active) {
	        queryEventHandler.activate();
	    }
	    else {
	        queryEventHandler.deactivate();
	    }
	}
//	map.zoomToMaxExtent(bounds);

	//l'ordre influeeeix!
function serialize(feature) 
   {

   queryEventHandler.deactivate();
//function(evt) {alert ('You clicked on marker m1'); OpenLayers.Event.stop (evt); }
	
	var wkt= new OpenLayers.Format.WKT(map.baseLayer.projection);
	polygon = wkt.write(feature);
    $.getScript('js_code/polygon_q_adaptat.js');

	}	

	 var f_options = {
                hover: false,
//                highlightOnly: true,
				click:true,
				clickout: true,
                 onSelect: serialize
  
  };
  
          feature_select = new OpenLayers.Control.SelectFeature(vlayer, f_options);
  //vlayer.events.register ('mouseout', vlayer, function() {alert("out")});
  //  feature_select
         //   OpenLayers.Feature.Vector.style['default']['strokeWidth'] = '2';
             function show_mouseover_text(evt)
        {
            textContent =
                "The mouse is over" +
                " feature '" + evt.feature.id + "'" +
                " of group '" + evt.name + "'.";
              //  console.warn(textContent);
        }


       map.addControl(feature_select);
          
		        var id=0;
		        var gml_serialize=function (feature)
		        {
		//        alert("sfd");

		polygonLayer.setVisibility(true);



		if (polygonLayer.features.length == 0) {id=0; } else { id=(polygonLayer.features.length -1);}
		polygonLayer.features[id].fid=id;

		  html='<div id="polygon_symbolize" class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">POLYGON SYMBOLIZER TOOL</div><input type="image" class="jqmdX jqmClose"/>';
		  html+='<form id="fill_form"><label>Polygon fill color<select style="margin-left:20px;"><option value="e4381b">red</option><option value="252ab6">blue</option><option value="617589">grey</option><option value="6ef028">green</option></select></form>';
		 html+='<form id="opacity_form"><label>Polygon opacity<select style="margin-left:20px;"><option value="1">100%</option><option value="0.5">50%</option><option value="0.3">30%</option><option value="0.1">10%</option><option value="0.01">0%</option></select></form>';
		  html+='<form id="stroke_width_form"><label>Stroke width<select style="margin-left:20px;"><option value="1">1</option><option value="2">2</option><option value="5">5</option></select></form>';
		  html+='<form id="stroke_color_form"><label>Polygon stroke color<select style="margin-left:20px;"><option value="e4381b">red</option><option value="252ab6">blue</option><option value="617589">grey</option><option value="6ef028">green</option></select></form>';
		    html+='<form id="stroke_opacity_form"><label>Stroke opacity<select style="margin-left:20px;"><option value="1">100%</option><option value="0.5">50%</option><option value="0">0%</option></select></form>';
		  html+='<form id="stroke_style_form"><label>Stroke style<select style="margin-left:20px;"><option value="solid">solid</option><option value="2_3">dotted</option><option value="2_7">long dotted</option><option value="4_2">short dash</option><option value="5_7">dashed</option><option value="10_5">long dashed</option><option value="10_30">Very long dashed</option></select></form>';
		  html+='<br><br><p>If desired, add a text to your polygon</p><br><TEXTAREA id="label" COLS=40 ROWS=3></TEXTAREA>';
		  html+='<form id="text_size_form"><label>Select the text size <select style="margin-left:20px;"><option value="5">5</option><option value="10">10</option><option value="30">30</option><option value="40">40</option></select></form>';
		  html+='</div><br> <input type="button" value="print it" id="serialize"/><div class="jqmdTC jqDrag">POLYGON SYMBOLIZER TOOL</div>';

		  if ($('#fill_form').length > 0)
		        {
		  $('#ex4').empty();        
		  $('#ex4').append(html);
		  }
		  else {  $('#ex4').append(html);}
		 	$('input.jqmdX').hover(function(){
		         $(this).addClass('jqmdXFocus')},function(){  $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex4').empty().hide();
				});
		 msie=($.browser.msie==true)?true:false; 
		if (msie)
		{

		 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');
		}
		else 
		{
		$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
		}
		$('input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){ $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide(); 
		 });
		   $("#ex4") .jqDrag('.jqDrag')
			   .jqResize('.jqResize') ;

		$("#ex4").animate({width:'420',height:'415'},"slow");

		            feature.attributes = {};

		$("#ex4 input:button").click(function()
		{

		//defining the Feature in GML
		       feature.attributes['fill_color'] = $("#fill_form option:selected").val();  
		       feature.attributes['fill_opacity'] = $("#opacity_form option:selected").val(); 
		       feature.attributes['stroke_color'] = $("#stroke_color_form option:selected").val();
		               feature.attributes['stroke_opacity'] =  $("#stroke_opacity_form option:selected").val();
		       feature.attributes['stroke_width'] = $("#stroke_width_form option:selected").val();
		       feature.attributes['text_size'] = $("#text_size_form option:selected").val();
		   


		      // = $("#stroke_style_form option:selected").val();
		     switch ($("#stroke_style_form option:selected").val())
		     {
		    case 'solid': { feature.attributes['stroke_style']='no_style';break}
		     	case '2_3':{ feature.attributes['stroke_style']="2 3 2 3";break;}  //short dotted 
				case '2_7':{ feature.attributes['stroke_style']="2 7 2 7";break;} //long dotted
					case '4_2':{ feature.attributes['stroke_style']="4 2 4 2";break;}
						case '5_7':{feature.attributes['stroke_style']="5 7 5 7";break;}
						case '10_5':{ feature.attributes['stroke_style']="10 5 10 5";break;}
							case '10_30':{ feature.attributes['stroke_style']="10 30 10 30";break;} //very long dash
		     }
		       feature.attributes['label'] = $("#label").val();
		       feature.attributes['id'] = id;

		//definint polygonLayer
		    polygonLayer.features[id].attributes.color=$("#fill_form option:selected").val();    
		    polygonLayer.features[id].attributes.fillOpacity=$("#opacity_form option:selected").val();
		 polygonLayer.features[id].attributes.strokeColor=$("#stroke_color_form option:selected").val();
		 polygonLayer.features[id].attributes.strokeWidth=$("#stroke_width_form option:selected").val();
		  polygonLayer.features[id].attributes.strokeDashstyle=$("#stroke_style_form option:selected").val();

		           polygonLayer.redraw();
		         //g variable is... new OpenLayers.Format.GML(); 
		   var data = g.write(feature.layer.features);  //ALL THE FEATURES will be written in g (& data) variable-->GML-->SLD
		            //OpenLayers.Util.getElement("gml").value = data;
		   var wkt= new OpenLayers.Format.WKT(map.baseLayer.projection);
			to_insert = wkt.write(feature);

			$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/queries/data_insert.php',
								processData:false, type:'GET',dataType:'text',data:'data='+to_insert+'&gid='+id+'&user='+userid,success:function()
								{
							//	alert("polygon inserted on dbase");
								//let's create SLD
		        $.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/gml_sld.php',
								processData:false, type:'POST',dataType:'text',data:'data='+data+'&user='+userid,
								success:function(url)
								{
								serialized.params.SLD=url;
								if (serialized.map==null)
								{
								map.addLayer(serialized);
								}
								else{						
								serialized.redraw();
								}
								polygonLayer.setVisibility(false);
								}
								})
								}
								});

		$("input[name='Your symbolized polygons']").show().next().show();
		             //var text = format.write(doc);
		  })

		        } //end serialize function
		   vlayer.onFeatureInsert =function(){
		      $("input[name='Polygon to query']").show().next().show();
		   if (vlayer.features.length >1) {vlayer.destroyFeatures(vlayer.features[0])};
		   ppol_query="false";						

		//user='no_user';		

		 feature_select.activate();
		  draw_to_query.deactivate();


		   };
		  polygonLayer.onFeatureInsert = gml_serialize;
   	      var select_options = {
               onClick: true,
               multiple:false,
               onUnselect:function(feature) {feature.selected=false;},
               onSelect: function(feature) { 
                
				polygonLayer.setVisibility(true);
                feature.selected=true;               
                html='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">HOLA</div><input type="image" class="jqmdX jqmClose"/>';
				html+='<b><div id="remove_div">Do you want to delete some polygon? if yes, you can select more than one (just click over it). Then, if really want to delete, just click';
				html+='<button id="delete" onclick="remove()" value="Delete them!">Delete them!</button></div>';
		
			if ($('#remove_div').length == 0)
        {
  $('#ex5').empty();        
  $('#ex5').append(html);

msie=($.browser.msie==true)?true:false; 
if (msie)
{$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');}
else {$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');}
$('input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide();  });
$("#ex5").animate({width:'280',height:'105'},"slow");
			}
               }
            }; //END OnSelect de select_options         
    var select = new OpenLayers.Control.SelectFeature(polygonLayer, select_options);
        map.addControl(select);
     //       select.activate();    



	       v_options = {
	               hover: true,
	               onSelect: function(feature) { 
	//             console.warn(feature.attributes.code);
	  if ($("#polygon_info").length)
	         {
	         $("#polygon_info tr").each(function(i)
	{
	$(this).remove();


	})

	  			$("#polygon_info tbody").append('<tr><td>Polygon code: </td><td>'+feature.attributes.code+'</td></tr><tr><td>Number of genus: </td><td>'+feature.attributes.numtax+'</td></tr><tr><td>Number of records: </td><td>'+feature.attributes.numreg+'</td></tr><tr><td>Taxa/record: </td><td>'+feature.attributes.taxa_record+'</td></tr>'); 


	               }

	}
	            };
					   function v_toggle(element) {

				                if(element.checked==true) {
				vectors.params.filter="<Filter><And><PropertyIsEqualTo><PropertyName>userid</PropertyName><Literal>"+userid+"</Literal></PropertyIsEqualTo></And></Filter>";
				//					  v_select.activate();
									 if  ($("#interactive_analysis_input").hasClass("first"))

					             {

					            	             map.addLayer(vectors);


					              $("#interactive_analysis_input").removeClass('first');
					             }
				                   else {  

				                   vectors.setVisibility(true);

				                   } 
				                  v_select.activate();

				                } 
				                else 
				                {              
				                vectors.setVisibility(false);

				                    v_select.deactivate();
				            }
				        }
				        myStyles2 = new OpenLayers.StyleMap({
				                "default": new OpenLayers.Style({                   
				                    fillColor: "#ebbc1e",
									fillOpacity:0.25,
									strokeColor: "#242b32",
				                    strokeWidth: 1.5
				                }),
				                "select": new OpenLayers.Style({
				                    fillColor: "#ee3e3a", //vermell
				                    fillOpacity:0.5,
				                    strokeWidth: 2,
				                    strokeColor: "#3399ff"
				                })

				            });


				            	   vectors = new OpenLayers.Layer.WFS(
				    "My polygons to hover",
				    "http://193.190.223.53:8080/geoserver/wfs",
				    {typename: "topp:point_pol",
				    filter:"<Filter><And><PropertyIsEqualTo><PropertyName>userid</PropertyName><Literal>"+userid+"</Literal></PropertyIsEqualTo></And></Filter>"},
				    {isBaseLayer: false, extractAttributes: true, styleMap: myStyles2}
				);
	            v_select = new OpenLayers.Control.SelectFeature(vectors, v_options);
	            map.addControl(v_select);
	            v_select.handlers.feature.stopDown = false;

	            v_select.handlers.feature.stopUp = false;

		    			 g = new OpenLayers.Format.GML();



			//polygonLayer.features.attributes.color='#f9cac3';
