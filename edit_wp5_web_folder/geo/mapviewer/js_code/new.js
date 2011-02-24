	    var third,fourth;

	    function osm_getTileURL(bounds) {

	            var res = this.map.getResolution();

	            var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));

	            var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));

	            var z = this.map.getZoom();

	            var limit = Math.pow(2, z);



	            if (y < 0 || y >= limit) {

	                return OpenLayers.Util.getImagesLocation() + "404.png";

	            } else {

	                x = ((x % limit) + limit) % limit;

	                return this.url + z + "/" + x + "/" + y + "." + this.type;

	            }

	        }





var initial_g_sld,initial_sp_sld,initial_4th_sld;	    

var reprojecting=false;

var create_json=function(reprojecting)

{



var array=Array();



for (i=0;i<map.layers.length;i++)

{





//if(map.layers[i].params.GROUP !='remote' || map.layers[i].options.GROUP=='remote')

if(map.layers[i].GROUP !='commercial' && map.layers[i].options.GROUP !=='remote' && map.layers[i].params.GROUP !='remote' && map.layers[i].params.GROUP !='points'  && map.layers[i].params.GROUP !='analysis')

{

if (map.layers[i].getVisibility())

{



var g=map.layers[i].params.GROUP;

var l=map.layers[i].params.LAYERS.split(',');





var labels=Array();

labels[g]=Array();

var layers=Array();

layers[g]=Array();



$(l).each(function(i,data)

{





if (data!=='blank')

{



p=$("#layers input[id='"+data+"']").next().get(0);



if (g=='quadricules')

{

	switch (data)

	{

		case 'grid2_pol': label="2 degrees grid";

		 	  labels[g].push("negro");

			layers[g].push(data);

		      break;

		default: break;

		

	}



}

else

{

	l=p.firstChild;



	label=l.nodeValue;

	labels[g].push(label);	

	layers[g].push(data);

}



}

})





array[g]=layers[g]+"|"+map.layers[i].params.STYLES+"|"+labels[g];





}

}

}

x=array.join(',');

//array['grup']=x;



//console.info(array['remote'])

vals="";

for (key in array)

{

//console.log("for key "+key+"values  "+array[key])

vals+=key+">"+array[key]+"/";

}

//console.warn(vals);

//removing last '/'

var bbox=map.getExtent().toBBOX();

vals=vals.substring(0,vals.length-1);

zoom=map.getZoomForExtent(bounds2);

$.get('http://edit.br.fgov.be/edit_wp5/geo/c_json.php?data='+vals+'&bbox='+bbox+'&zoom='+zoom,function(d)

{



if (reprojecting==false)

{



	  var iframe=$('iframe#info2');



	 jq_print='<iframe id="info2" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="" frameBorder=0 width=0 height=0></iframe>';



		$('#ex_print').html(jq_print);

			$('#ex_print').jqDrag('.jqDrag').jqResize('.jqResize') ;



		$("iframe#info2").attr("src","http://edit.br.fgov.be/edit_wp5/geo/json_show.php?file="+d);

		$("#ex_print").show();

		$("#ex_print").hide();

}

else

{





getlayers2(d,"EPSG:"+proj2);



}

											

});



}





var print;



function print_legend ()

{

var tot="";

x=new Array();

i_count=$("#images img").size();



$("#images img").each(function(i,d)

{

var height=$(d).css('height');



if (height!=='0px' && height!=='0pt' )

{

if (d.id !=='num_regs' && d.id !=='num_genus' && d.id !=='taxa_record')

{

var style=d.getAttribute("s");

total=style+","+d.id+"|";

tot+=total;

}

}

})





 var iframe=$('iframe#info2');

			var jq_print="<div class='jqmdTL' style='background-size: 0%; z-index: 300;'><div class='jqmdTR><div class='jqmdTC jqDrag'>PRINT IT</div><inputsrc='JQ_win_files/close.gif' class='jqmdX jqmClose' ></div></div>"; 

		 jq_print+="<iframe id='info2' class='jqDrag' marginWidth=0 marginHeight=0 src='' frameBorder='0' width='0' height='0'></iframe>";



var bindFrameActions=function () {

		$('#ex_print').html(jq_print);

	

			$('#ex_print')

			   .jqDrag('.jqDrag')

			   .jqResize('.jqResize') ;

		};

$.get('http://edit.br.fgov.be/edit_wp5/geo/general_legend.php?data='+tot,

		function(url_image)

										{

									

										bindFrameActions();

										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 

										$("#ex_print").hide(); 

										});



}

function c_legend(data)

{

//console.log(data);

var style=data.getAttribute("stylez");

var grup=data.getAttribute("grup");



if (data.checked)

{

if (grup=="tdwg" || grup=="quadricules" || grup=="utm")

		{		

if (grup=="utm"){h='40px'}else{h='20px'}

		$("#layers li[id='"+grup+"'] input").each(function(i,d)

		{

		if ($("#images img[id='"+d.id+"']").length)

		{

		$("#images img[id='"+d.id+"']").height(0).hide();

		}

		if ($("#images img[id='"+data.id+"']").length)

		{

		$("#images img[id='"+data.id+"']").height(h).show();

		}else {

		if (grup=="quadricules") { 

		style=style+"_2";

		}



		path="http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png";

		path+="&LAYER="+data.id+"&STYLE="+style+"&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";

		html='<ul><img s="'+style+'" style="height:'+h+';position: relative; left: 0px;" id="'+data.id+'" src="'+path+'"></ul>';

		$("#images").append(html);

		}

		})

		}

else

{

if (grup=='admin')

{

	var array=new Array();

	$("#images img").each(function()

	{

	array.push($(this).attr('s'))

	})



	if ($.inArray(style,array)==-1)  //not present

	{

		 if (style !=='countries')

		{

		path="http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png";

		path+="&LAYER="+data.id+"&STYLE="+style+"&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";

		html='<ul><img s="'+style+'" style="height:20px; position: relative; left: 0px;" id="'+data.id+'" src="'+path+'"></ul>';

		$("#images").append(html);return false;

		}

	}

	else

	{

	 if (style =='countries' )

		{var h='40px'} else{h='20px'  }



	//	console.warn($("#images img[s='"+style+"']"));

	$("#images img[s='"+style+"']").height()

	if ($("#images img[s='"+style+"']").height() !=='0px')	

	{

		$("#images img[s='"+style+"']").height(h);$("#images img[s='"+style+"']").show();return false;

	}

	else

	{

	return false;		

	}



	}

}

if (grup=='analysis')

{

var w=$("img[id='"+data.id+"']").width();

var h=$("img[id='"+data.id+"']").height();

if($("#images img[id='"+data.id+"']").length)

{

$("#images img[id='"+data.id+"']").height(h);

$("#images img[id='"+data.id+"']").width(w).show();

}else {





path="http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png";

path+="&LAYER="+data.id+"&SLD="+eval("edit_"+data.id+".params.SLD");

html='<ul><img s="'+style+'" id="'+data.id+'" style="height:'+h+';position: relative; left: 0px;" src="'+path+'"></ul>';

$("#images").append(html);

}

}

else

{

if($("#images img[id='"+data.id+"']").length)

{

$("#images img[id='"+data.id+"']").height('20px').show();

}else {

if (grup=='utm')

{h='40px';}else{h='20px'}

path="http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png";

path+="&LAYER="+data.id+"&STYLE="+style+"&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";

html='<ul><img s="'+style+'" style="height:"'+h+'"; position: relative; left: 0px;" id="'+data.id+'" src="'+path+'"></ul>';

$("#images").append(html);

}

}

}

}

else {   //we are unchecking



$("#images img[id='"+data.id+"']").height('0').hide();



}

}

userid=Math.floor(Math.random()*1000);

	    bind=function()

		{



t=$("#map").position().top+$("#map").height();

l=$("#map").position().left;

$("#escala,#escala2").css({position:'absolute'});
$("#escala").css('top',t).css('left',l);
$("#escala2").css('top',t).css('left',l+250);
$("#coords").css('top','10px').css('left',$("#map").width()/2-100);

ajax_show=false;

$("#user_dates").hide();

$("#gbif").hide();

 change2=function(d)

{

	

if (d.css('display')=='none')

{

d.animate({opacity:1,"height":"+=50px"}, 'slow',function()

{

d.css({color:'blue'});

})

d.animate({"height":"-=50px"},2000,function()

{

d.css({color:'black'});

})

}else {

i=d.get(0);

//console.log(i);

id=i.getAttribute('id');



if (id !=="download_data" && id !=="user_dates")

{

if (id=='analysis')

{

$("interactive_analysis").fadeOut('slow');

}

d.fadeOut('slow');



}



}

}

change=function(i)

{



if ($(i).hasClass('visible'))

{

$(i).children().text('Hide module');

$(i).removeClass('visible');

}

else

{

$(i).children().text('Show');

$(i).addClass('visible');

}

//console.log($(i.target));

i=$(i).get(0);

//alert($(i.target).id);

id=i.getAttribute('id');

if (id=='analysis_m')

{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');

	}

	else

	{

if ($("#user_dates").css('display')=='none')

{

alert("you must first upload point data");

$(i).children().text('Show');

}

else {

change2($("#analysis"));



}

}

}

if (id=='remote_m')

{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');return false()

	}

}



if (id=='query_m')

{

	if ($("#user_dates").css('display')=='none')

	{

	alert("you must first upload point data");

	$(i).children().text('Show');

	}

	else

	{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');

	}

	else

	{

if ($(".olControlEditingToolbar").css('visibility')=='visible')

{

//alert("hide it");

$(".olControlEditingToolbar").css({visibility:'hidden'});

$(".olControlEditingToolbar div").css({visibility:'hidden'});

$(".olControlFeatureInfoItemActiveItemInactive").width('0').height('0').css({visibility:'hidden'});

$(".olControlFeatureInfo2ItemInactive").width('0').height('0').css({visibility:'hidden'});

}

else

{



$(".olControlEditingToolbar").css({visibility:'visible'});



$(".olControlEditingToolbar div").css({visibility:'visible'});



$(".olControlFeatureInfoItemActiveItemInactive").width('30').height('30').css({visibility:'visible'});

$(".olControlFeatureInfo2ItemInactive").width('30').height('30').css({visibility:'visible'});

}

}

}

}

if (id=='proj_m')

{



	if ($("#user_dates").css('display')=='none')

	{

	alert("you must first upload point data");

	$(i).children().text('Show');

	}

	else

	{

change2($("#projections"));

}

}

if (id=='g_proj_m')

{

change2($("#google_projections"));

}

if (id=='remote_m')

{

change2($("#remote_layers"));

}

if (id=='gbif_m')

{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');

	}

	else

	{

change2($("#gbif"));

    }



}



if (id=='projects_m')

{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');

	}

	else

	{

change2($("#upload_projects"));

    }

}

if (id=='others_m')

{

if (edit_points.map==null && edit_sp_points.map==null && edit_4th_points.map==null)	

{

alert("you need to upload point data to use these tools");$(i).children().text('Show');

}

else

{

	if (map.getProjection() !='EPSG:4326')

	{

		alert("This tool only can be used in latitude/longitude"); $(i).children().text('Show');

	}

	else

	{

change2($("#others"));

	}

}



}



}		

$('#overlays_div input').click(function(){



$("input[name='Polygon to query']").hide().next().hide();

})

//$("input[id='OpenLayers.Control.LayerSwitcher_114_input_serialized_polygons']").hide().next().hide();



$("input[name='Polygon to query']").hide().next().hide();

$("input[name='Your symbolized polygons']").hide().next().hide();

$("input[name='Polygon layer']").hide().next().hide();



 $(".olControlEditingToolbar div").bind('click',function(event){



x=function() {v_select.deactivate();$("#interactive_analysis input").attr('checked',false); vectors.setVisibility(false);}



y=function () {}

$("#polygon_info_input").is(':checked')?x():y();

	if ($(event.target).attr('class')=='olControlDrawFeaturePolygonItemActive')

						{

				

						if (polygonLayer.map=='null')

						{

							

						map.addLayer(polygonLayer);

						}

		//	console.log("the tool for polygon symbolizing");

					polygonLayerControl.activate();

					} else 

					

					{

					

							if ($(event.target).attr('class')=='olControlNavigationItemActive')

							{

					

					

							pan.deactivate();

						

							  

							//feature_select.map=map;

							feature_select.activate();

						//	draw_to_query.activate();

							}

									if (polygonLayerControl.activate)

									{

									polygonLayerControl.deactivate();

									}

					



		}

})





			$("div[id='panel'] > div").bind('click',function(event){

			//console.log($(event.target).attr('class'));



x=function() {v_select.deactivate();$("#interactive_analysis input").attr('checked',false); vectors.setVisibility(false);}



y=function () {}

$("#polygon_info_input").is(':checked')?x():y();



draw_symbolize.deactivate();draw_to_query.deactivate();

						if ($(event.target).attr('class')=='olControlFeatureInfo2ItemActive')

						{

							

							$.getScript('js_code/individual_ppol_adaptat.js');

						}

						

						if ($(event.target).attr('class')=='olControlPanZoomBarItemActive')

						{

						//console.log("panning");

						 if (vlayer.features.length >1) {vlayer.destroyFeatures(vlayer.features[0])};

						draw_symbolize.deactivate();draw_to_query.deactivate();

pan.activate();

						}



if (polygonLayerControl.activate)

					{

					polygonLayerControl.deactivate();

					}

/*if (drawControls['polygon'].activate)					{

					drawControls['polygon'].deactivate();

					} */



						});

						$(".olControlEditingToolbar div").click(function(){

				

						map.addLayer(vlayer);

				

						});

		

//	user="no_user";

}  //end bind

	

function ajaxFileUpload2(type)

	{

	my_json="true";

	}



function ajaxFileUpload(type)

	{

	ajax_show=true;

		$("#loading")

		.ajaxStart(function(){

			$(this).show();

		})

		.ajaxComplete(function(){

			$(this).hide();

		});





//alert(type);-->correcte

if (type=='points')

{

datatype='points';

id='file';



if ($("input[name='dataset']:checked").attr('id')=='new_data')

{

userid=Math.floor(Math.random()*1000);

var new_data='yes';

}

else

{

	var new_data='no';

}

lat=$("#lat").val();

lon=$("#lon").val();

fields=$("#fields").val();



$("#3th_name input:textarea").val() !== "" ? third=$("#3th_name input:textarea").val() : third="Genus";

$("#4th_name input:textarea").val() !== "" ? fourth=$("#4th_name input:textarea").val() : fourth="Species";



var u;

if ($("#upload_content #fields").val() >2)

{

u="&s=";

$(".y input:checked").each(function()

{

if ($(this).attr('id')!=="symb_no")

{

u+=$(this).attr('id');



}

})



}

if (map.getProjection() !=='EPSG:4326')

{

	alert("You only can upload data using latitude/longitude (unprojected)");

	return false;

}

url='http://edit.br.fgov.be/edit_wp5/geo/upload_points.php?userid='+userid+'&new_data='+new_data+'&lon='+lon+'&lat='+lat+'&fields='+fields+u;



}

else  //uploading json

{

datatype='json';

id='json_file';

url='http://edit.br.fgov.be/edit_wp5/geo/upload_json.php';

my_json="true";

}





	$.ajaxFileUpload

		(

			{

				url:url,

				secureuri:false,

				fileElementId:id,

				dataType: 'json',

				success: function (data, status)

				{

				//	console.warn(data);

					if(typeof(data.error) != 'undefined')

					{

						if(data.error != '')

						{

							alert(data.error);

						}else

						{

									

			if (datatype=='points')

			{		

			x=new Date();



			if (data.genus_sld)

			{



				initial_g_sld=data.genus_sld;

				edit_points.params.SLD=data.genus_sld;				

				if (edit_points.map==null)

				{

				map.addLayer(edit_points);

				}

				var g_legend=document.getElementById("genera_legend");

				g_legend.setAttribute("src",legend='http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+x);

//							$("#g_data div:first").text('Your '+third+' data').css('display','inline');

						$("#g_data").get(0).firstChild.nodeValue='Your '+third+' data';

							   $("#u_points input[id='edit_points']").bind('click',function() { set_Visible(this); });  

							$("#g_data").show();



			}

			

						if (data.fourth_sld)

						{

							

					initial_4th_sld=data.fourth_sld;					

					edit_4th_points.params.SLD=data.fourth_sld;

								if (edit_4th_points.map==null)

								{

								map.addLayer(edit_4th_points);

								}

								var g_sp_legend=document.getElementById("4th_legend");

								g_sp_legend.setAttribute("src",legend='http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_4th_points.params.SLD+'?date='+x);

					//			$("#4th_data div:first").text('Your '+fourth+' data').css('display','inline');

											$("#4th_data").get(0).firstChild.nodeValue='Your '+fourth+' data';

								 $("#u_points input[id='edit_4th_points']").bind('click',function() { set_Visible(this); });  

								$("#4th_data").show();

						}

							if (data.sp_sld)

							{

							

						initial_sp_sld=data.sp_sld;

						edit_sp_points.params.SLD=data.sp_sld;

									if (edit_sp_points.map==null)

									{

									map.addLayer(edit_sp_points);

									}

										var sp_legend=document.getElementById("species_legend");

										sp_legend.setAttribute("src",legend='http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_sp_points.params.SLD+'?date='+x);

								//		$("#sp_data div:first").text('Your '+third+'&'+fourth+' data').css('display','inline');

								$("#sp_data").get(0).firstChild.nodeValue='Your '+third+'&'+fourth+' data';

										$("#u_points input[id='edit_sp_points']").bind('click',function() { set_Visible(this); });  

										$("#sp_data").show();

							}





		u_bbox=data.bbox;

//		console.log(edit_points.params.SLD);

 var bounds=new OpenLayers.Bounds.fromString(u_bbox);	



	center=bounds.getCenterLonLat();



	 map.setCenter(center,map.getZoomForExtent(bounds));

	//ftheeten 15/02/2011
/*
	$('#sel_click').empty();
	for(i=0;i<map.layers.length;i++)
	{
		$('#sel_click').append($("<option></option>").attr("value",i).text(map.layers[i].name)); 	

	}
*/	



/*	 

$("#user_dates").click(function()

{x=new Date();

		var image=document.getElementById("legend");

			g_legend.setAttribute("src",'http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+x);



});

*/

//map.setCenter(bounds.getCenterLonLat(),map.getZoomForExtent(bounds));

map.zoomToExtent(bounds);



		 change2($("#user_dates"));

		 change2($("#download_data"));



   if ($("#print_params").children().size()<1)

		{



			$.getScript('js_code/print_module.js');

		}

	  if ($("#proj_params").children().size()<1)

			{



				$.getScript('js_code/proj_module.js');

			}

		  $("#upload_data").trigger("click");

		   $("#user_dates").trigger("click");



		  $.get('http://edit.br.fgov.be/edit_wp5/geo/check2.php?userid='+userid);

						}

				else

				{

			

			//	console.warn("set up myjson to"+my_json)

				getlayers('user_json/'+data.data);

				

				}

		

				}

					}

		ajax_show=false;

$("#image").hide();

							

				} //end success for points

			,

				error: function (data, status, e)

				{

				//console.log(data);

					alert(e);

				}

			}

		)

		

		return false;



	} //end ajaxfile upload??

//user_info="true";  // em sembla falta }





	 new_user=Math.floor(Math.random()*1111)    

	user_info="false";

	

toogle_wms=function(d)

{



if (d.checked)

{



$("#wms_checkbox input").attr('checked',false);

$(d).attr('checked',true);

		  eval("map.setBaseLayer("+d.id+")");

       eval(d.id+".redraw()");

        eval(d.id+".setVisibility(true)");

}

else

{

 eval(d.id+".setVisibility(false)");

}

}	

	toogle_mode=function(mode)

{

if (mode=='print')

{

edit_admin.tileSize.w=map.size.w;

edit_admin.tileSize.h=map.size.h;

edit_admin.ratio=1;

edit_admin.singleTile= true;



edit_tdwg.tileSize.w=map.size.w;

edit_tdwg.tileSize.h=map.size.h;

edit_tdwg.ratio=1;

edit_tdwg.singleTile= true;

}else {

edit_tdwg.tileSize.w=1050;

edit_tdwg.tileSize.h=525;

edit_tdwg.ratio=1.5;

edit_tdwg.singleTile= false;



edit_admin.tileSize.w=1050;

edit_admin.tileSize.h=525;

edit_admin.ratio=1.5;

edit_admin.singleTile= false;

}

edit_admin.redraw()

}



 var set_Visible=function (data)

	 {

	 	if (data.checked==true)

		{

	//	console.log("edit_"+data.id+".setVisibility(true)")

	eval(data.id+".setVisibility(true)");

//		wms_ms.setVisibility(true);

		//console.log("wms_ms.setVisibility(true)");

		}

		else

		{

		eval(data.id+".setVisibility(false)");

		//wms_ms.setVisibility(false);

		}

	 }



		toogle_gbif=function(data)

	{

	if (data.checked==true) {

	edit_gbif.setVisibility(true);

	}

	else

	{



		edit_gbif.setVisibility(false);

	}

	}	

	

	 toogle_simple=function(data,grup)

		{

	

	ajax_show=true;		

	    var layer="edit_"+data.id;

		var style=data.getAttribute("stylez");

		var grup=data.getAttribute("grup");

	

		if (data.checked==true)

		{

	//console.log(data.id+"checked")

		//"symbolize this layer"

		var nexts=$(this).next().nextAll();

		$(nexts).css('visibility','hidden');



		$("#layers input[id='"+data.id+"']").next().next().css('visibility','visible');

		var ul=$(data).parent(); 

		$(ul).css('height','40');

		

		

		if ($("#ppol_form").length)

		{

		//console.log("yes");

		p=$("input[id='"+data.id+"']").next().get(0);

		label=p.firstChild.nodeValue;

		extra="<option id='"+data.id+"'>"+label+"</option>";

		$("#ppol_form select").append(extra);

		}

		

		if (grup!=="admin" && grup!=="nature")

		{

	//HIDDING OTHERS	

	//console.log("we hide");

$("#layers input:checked[grup='"+grup+"']").each(function()

{

var checked=$(this).attr('checked');

var s_layer=$(this).attr('id');



if ($(this).hasClass('symbolized'))

{

eval("edit_"+s_layer+".setVisibility(false)")
$("#images img[id='"+s_layer+"']").hide();

}

else

{

$("#layers input[id='"+s_layer+"']").trigger('click');

//$("#layers input[id='"+s_layer+"']").trigger('click');

}

})

//eval("edit_"+layer+".setVisibility(true)")



		$("#layers input:checkbox[grup="+grup+"]").attr('checked',false);		

		data.checked=true;

		$("#layers li[id='"+grup+"'] input:not(:checked)").each(function()

		{

//		console.log("unchecking others");

var nexts=$(this).next().nextAll();

var ul=$(this).parent(); 



if (nexts.length > 0)

{

//console.log(nexts.length)

$(nexts).css('visibility','hidden')

$(ul).css('height','20');

		}

		})



		}

//		console.log("visualize it"+layer);

		eval(layer+".setVisibility(true)");
$("#images img[id='"+s_layer+"']").show();

		}else

		{

			//console.warn("hiddin")

		$("#layers input[id='"+data.id+"']").next().next().css('visibility','hidden');

		var ul=$(data).parent(); 

		$(ul).css('height','20');

		eval(layer+".setVisibility(false)");
$("#images img[id='"+s_layer+"']").hide();

		if ($("#ppol_form").length)

		{

		

		$("#ppol_form option[id='"+data.id+"']").remove()

		} 

		}

		}

		

 toogle=function(data)

		{



//    console.log("toogling");

	ajax_show=true;

		var grup=data.getAttribute("grup");

	    var layer="edit_"+grup;

		var style=data.getAttribute("stylez");

		var array=eval("edit_"+grup+".params.LAYERS");

		var styles_array=eval("edit_"+grup+".params.STYLES");



	

	function isArray(variable) {

if (variable.constructor == Array)

return true;

else

return false;

}

if (!isArray(array))

{



//alert("not array");

array=array.split(',');



}

if (!isArray(styles_array))

{

styles_array=styles_array.split(',');

}

//console.warn(array);



var update=function(val,style)

	{



x=$.grep(array,function (v)

{

if (v==val)

{

//alert("to remove"+v);

index=$.inArray(v,array);

return index;

}

else

{

return val;

}

});



x2=$.grep(styles_array,function (s)

{

if (s==style)

{

//alert("to remove"+v);

index2=$.inArray(s,styles_array);

return index2;

}

else

{

return style;

}

});



//console.warn(typeof(index));



if(typeof(index) !== 'undefined')  

{

array.splice(index,1);

styles_array.splice(index,1);

//console.log("lenght is"+array.length);

if (array.length > 0)

{



//	console.warn(styles_array);

eval("edit_"+grup+".mergeNewParams({layers:'"+array+"',styles:'"+styles_array+"'})");

//eval("edit_"+grup+".mergeNewParams({styles:'"+styles_array+"'})");

//if ("edit_"+grup+".params.length" > 0)

} else { 

  		eval("map.removeLayer(edit_"+grup+")");

//eval("edit_"+grup+".setVisibility(false)");

			eval("edit_"+grup+".params.LAYERS=[]");

			eval("edit_"+grup+".params.STYLES=[]");

			}



	



}

else

{

//		console.log(array)

array.push(val);

styles_array.push(style);

//TAMBÉ STYLE HAURIA DE SER PUSHAT

eval("edit_"+grup+".mergeNewParams({layers:'"+array+"',styles:'"+styles_array+"'})");

eval("edit_"+grup+".mergeNewParams({styles:'"+styles_array+"'})");



}

var index=undefined;

		}//fi funcio



	if (data.checked==true)  //volem visualitzar

		{

		count=array.length;

        

/*

if ($("#layers [id='"+data.id+"']").next().next().attr('id')=='symbolize')

{

$("#layers [id='"+data.id+"']").next().next().css('visibility','visible')

}

*/



		if ($("#ppol_form").length)

		{

		//console.log("yes");

		p=$("input[id='"+data.id+"']").next().get(0);

		label=p.firstChild.nodeValue;

		extra="<option id='"+data.id+"'>"+label+"</option>";

		$("#ppol_form select").append(extra);

		}

									

		if (layer.map==null)

			{



		eval("map.addLayer("+layer+")");



			}

		if (! eval("edit_"+grup+".getVisibility()"))

	{

	eval("edit_"+grup+".setVisibility(true)");

	}		

		

		if (grup!=="admin" && grup!=="nature")

		{

		//ONLY A LAYER CAN BE SELECTED; WE HAVE TO HIDE LABEL AND SYMBOLOGY OPTIONS WHEN NOT SELECTED



$("#layers input:checked[grup='"+grup+"']").each(function()

{

var checked=$(this).attr('checked');

var layer=$(this).attr('id');

if ($(this).hasClass('symbolized'))

{

c="edit_"+layer+".setVisibility(false)";



eval(c)

}



})

		$("#layers input:checkbox[grup="+grup+"]").attr('checked',false);

				



		data.checked=true;		       

		$("#layers li[id='"+grup+"'] input:not(:checked)").each(function()

		{

var nexts=$(this).next().nextAll();

var ul=$(this).parent(); 



if (nexts.length > 0)

{



$(nexts).css('visibility','hidden')

$(ul).css('height','20');

		}

		})

	eval(layer+".mergeNewParams({layers:'"+data.id+"',styles:'"+style+"'})");

	//eval(layer+".mergeNewParams({styles:'"+style+"'})");

		if (grup=="quadricules")

			{

	

			//so we avoid to create different grids styles (SLD) when they use the same symbology

			//we keep grid1, grid2, grid5 stylez in order to get the legend 

			switch (screen_w)

			{

				case 'medium1': style="grids_m";break;

				case 'medium2':	style="grids_label_m2";break;

				case 'big':	style="grids_b";break;

				

			}



		

				eval("edit_quadricules.mergeNewParams({layers:'"+data.id+","+data.id+"_line',styles:'nl_grids,"+style+"'})");

						

				edit_quadricules.setVisibility(true);

			}





		}

		else

			{

			update(data.id,style);

			}



	}

	else

	{  



		if ($("#ppol_form").length)

		{

		

		$("#ppol_form option[id='"+data.id+"']").remove()

		} 

			if (grup=="quadricules")

				{

					edit_quadricules.mergeNewParams({styles:'',layers:''});

					

					edit_quadricules.setVisibility(false);				

				}

				else

				{

	update(""+data.id,style);

			}



	}

		}

		

	

	        //var map;



        

		 if ($.browser.version=='6.0')

{

t_img_format='image/png8';

} else { t_img_format='image/png'; }



		

			var edit_nasa = new OpenLayers.Layer.WMS( "NASA Global Mosaic",

				                "http://wms.jpl.nasa.gov/wms.cgi?", 

				                {layers: "global_mosaic",transparent:"FALSE",GROUP:"remote"},{'displayInLayerSwitcher':true,isBaseLayer: true});

		

		

		



		

			



			taxa_id=13212109;

			gbif_filter=function(taxa_id)

			{ return "(<Filter><And><PropertyIsEqualTo><PropertyName>type</PropertyName><Literal>1</Literal></PropertyIsEqualTo><PropertyIsEqualTo><PropertyName>concept</PropertyName><Literal>"+taxa_id+"</Literal></PropertyIsEqualTo></And></Filter>)";

			}

				var edit_gbif = new OpenLayers.Layer.WMS( "GBIF",

                "http://geoserver.gbif.org/wms?", {group:"remote",layers: "gbif:gbifDensityLayer",version: "1.0.0", transparent: "true", 

                format:t_img_format, filter: gbif_filter(taxa_id),opacity:0.5} );	

             edit_gbif.setOpacity (0.5) 

             

				

var toogle_background=function(d)

	{



	if (d.map==null)

	{

	map.addLayer(d);

map.setBaseLayer(d)

d.redraw();

	}

else 

{



        map.setBaseLayer(d)

        d.redraw();

}

	

	}

	var g,drawControls; 

	   function v_toggle(element) {

	   }

	

	   function v_toggle(element) {



                if(element.checked==true) {

vectors.params.filter="<Filter><And><PropertyIsEqualTo><PropertyName>userid</PropertyName><Literal>"+userid+"</Literal></PropertyIsEqualTo></And></Filter>";

//					  v_select.activate();

					 if  ($("#interactive_analysis_input").hasClass("first"))



	             {



	            	             map.addLayer(vectors);

	            a

	              

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

    "http://193.190.116.6:8080/geoserver/wfs",

    {typeName: "point_pol",version:"1.1.0",

    FILTER:"<And><PropertyIsEqualTo><PropertyName>userid</PropertyName><Literal>"+userid+"</Literal></PropertyIsEqualTo></And>"},

    {isBaseLayer: false, extractAttributes: true, styleMap: myStyles2}

    

);

  



var options,map;

var controls,gsat,gmap,ghyb,veroad,edit_blank,edit_admin,edit_utm,edit_tdwg,edit_quadricules,edit_points,edit_sp_points,edit_4th_points,edit_nature,edit_taxa_record,edit_num_regs,edit_num_genus,edit_gbif;

  create_layers=function(proj_code)

       {

		

		

		if ($("#google_projections").css('display') !=='none')

		{		

var p=$("#google_form option:selected").val();

        switch (p)

		{



			case 'gsat':

			{



	    gsat = new OpenLayers.Layer.Google(

                "Google Satellite",

                {type: G_SATELLITE_MAP, 'sphericalMercator': true, numZoomLevels: 22,GROUP:'commercial'},{isBaseLayer: true});

proj_code='EPSG:900913';

					break;

				}

			case 'gmap': 

			{

			 gmap = new OpenLayers.Layer.Google(

			                "Google Streets",

			                {'sphericalMercator': true,GROUP:'commercial'}

			            ); 

			proj_code='EPSG:900913';

			break;

			}

			case 'ghyb':

			{

			ghyb = new OpenLayers.Layer.Google(

                "Google Hybrid",

                {type: G_HYBRID_MAP, 'sphericalMercator': true,GROUP:'commercial'}

            );

proj_code='EPSG:900913';

break;

	

		}

		case 'veroad':

		{

		

		veroad = new OpenLayers.Layer.VirtualEarth(

		 	                "Virtual Earth Raods",

		 	                {'type': VEMapStyle.Road, 'sphericalMercator': true,GROUP:'commercial'}

		 	            );

		proj_code='EPSG:900913';

				break;

		}

		

			case 'veaer':

			{

			veaer = new OpenLayers.Layer.VirtualEarth(

			 	                "Virtual Earth Aerial",

			 	                {'type': VEMapStyle.Aerial, 'sphericalMercator': true,GROUP:'commercial'}

			 	            );

								proj_code='EPSG:900913';

										break;

			}

			case 'vehyb':

			{

			 	            vehyb = new OpenLayers.Layer.VirtualEarth(

			 	                "Virtual Earth Hybrid",

			 	                {'type': VEMapStyle.Hybrid, 'sphericalMercator': true,GROUP:'commercial'}

			 	            );

							proj_code='EPSG:900913';

									break;

			}

			case 'yahoo':

			{

			 	            // create Yahoo layer

			 	            yahoo = new OpenLayers.Layer.Yahoo(

			 	                "Yahoo Street",

			 	                {'sphericalMercator': true,GROUP:'commercial'}

			 	            );

								proj_code='EPSG:900913';

										break;

			}

			case 'yahoosat':

			{

			 	            yahoosat = new OpenLayers.Layer.Yahoo(

			 	                "Yahoo Sattelite",

			 	                {'type': YAHOO_MAP_SAT, 'sphericalMercator': true,GROUP:'commercial'}

			 	            );

							proj_code='EPSG:900913';

									break;

			}

			case 'yahoohyb':

			{

				            yahoohyb = new OpenLayers.Layer.Yahoo(

			 	                "Yahoo Hybrid",

			 	                {'type': YAHOO_MAP_HYB, 'sphericalMercator': true,GROUP:'commercial'}

			 	            );

							proj_code='EPSG:900913';

									break;

			}

			case 'mapnik':

			{

				//	bounds="-20037508.34,-20037508.34,20037508.34,20037508.34";

				

			 	            // create OSM layer

			 	            mapnik = new OpenLayers.Layer.TMS(

						                "OpenStreetMap (Mapnik)",

						                "http://tile.openstreetmap.org/",

						                {

						                    type: 'png', getURL: osm_getTileURL,

						                    displayOutsideMaxExtent: true,

						                    attribution: '<a href="http://www.openstreetmap.org/">OpenStreetMap</a>',

											GROUP:'commercial'

						                }

						            );

						 

							proj_code='EPSG:900913';

						

									break;

			}

		

			}

		}

		else

		{

			var p=$("form[id='crs_final'] option:selected").val();

		}





	edit_points = new OpenLayers.Layer.WMS.Untiled( "third field points","http://193.190.116.6:8080/geoserver/wms", {GROUP:'points',layers:'user_points',sld:'',format:t_img_format,transparent:"true"});

	edit_sp_points = new OpenLayers.Layer.WMS.Untiled( "third&fourth field points","http://193.190.116.6:8080/geoserver/wms", {GROUP:'points',layers:'user_points',sld:'',format:t_img_format,transparent:"true"});



	edit_4th_points = new OpenLayers.Layer.WMS.Untiled( "fourth field points","http://193.190.116.6:8080/geoserver/wms", {GROUP:'points',layers:'user_points',sld:'',format:t_img_format,transparent:"true"});

	 edit_blank = new OpenLayers.Layer.WMS.Untiled( "EDIT WMS transparent",

			"http://193.190.116.6:8080/geoserver/wms",

			                {layers:"blank",projection:proj_code,transparent:"false",format: t_img_format,styles:"transparent",group:"remote"},

						{isBaseLayer: true},{singleTile: true, ratio: 1});

	

	edit_quadricules = new OpenLayers.Layer.WMS.Untiled( "Quadricules",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:[],width:'700',height:'350',transparent:"true",styles:[],format:t_img_format,GROUP:'quadricules'}

						, {group:"vectorial"},{'displayInLayerSwitcher':true},{gutter: 1} );

	edit_nature = new OpenLayers.Layer.WMS.Untiled( "Natural features",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:[],GROUP:"nature",transparent:"true",styles:[],format:t_img_format}

						,{'displayInLayerSwitcher':true} );



	edit_utm = new OpenLayers.Layer.WMS.Untiled( "UTM layer",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:[],transparent:"true",styles:[],group:"utm",format:t_img_format}

						, {group:"vectorial"},{'displayInLayerSwitcher':true} );

						

	edit_admin  = new OpenLayers.Layer.WMS.Untiled( "Administrative Layers",

                "http://193.190.116.6:8080/geoserver/wms",

                {layers: [],group:"admin",transparent:"true",format:t_img_format,styles:[]},{'displayInLayerSwitcher':true} );

             //   console.warn(edit_admin);



	  edit_tdwg = new OpenLayers.Layer.WMS.Untiled( "TDWG layer",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:[],group:"tdwg",transparent:"true",styles:[],format:t_img_format},{'displayInLayerSwitcher':true} );

 



		edit_num_regs = new OpenLayers.Layer.WMS.Untiled( "Number of Records",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:'num_regs',transparent:"true",styles:[],format: t_img_format,group:'analysis'}

						, {group:"vectorial"});

				

		edit_taxa_record = new OpenLayers.Layer.WMS.Untiled( "Taxa/Record",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:'taxa_record',transparent:"true",styles:[],format:t_img_format,group:'analysis'}

						, {group:"vectorial"});

						

		edit_num_genus = new OpenLayers.Layer.WMS.Untiled( "Number of Genera",

		"http://193.190.116.6:8080/geoserver/wms",

		                {layers:'num_genus',transparent:"true",styles:[],format:t_img_format,group:'analysis'}

						, {group:"vectorial"});

		edit_gbif = new OpenLayers.Layer.WMS( "GBIF",

                "http://geoserver.gbif.org/wms?", {group:"remote",layers: "gbif:gbifDensityLayer",version: "1.0.0", transparent: "true", 

                format:t_img_format, filter: gbif_filter(taxa_id),opacity:0.5} );	



        



           

           }   //END CREATE LAYERS FUNCTION

var bounds2,map;

	     function init()

	     {

		

				

//     add_controls('EPSG:4326',"-180.0000,-90.0000,180.0000,90.0000");

//Proj4js.defs["EPSG:54004"] ="+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";

       add_controls=function(proj,bounds)

       {

	   boxes  = new OpenLayers.Layer.Boxes( "Boxes" );

	    vlayer = new OpenLayers.Layer.Vector( "Polygon to query",{GROUP:"remote"});

	     draw= new OpenLayers.Control.EditingToolbar(vlayer);

		

	     			options={	controls: [

 					new OpenLayers.Control.LayerSwitcher({'ascending':false}),				

 				//	new OpenLayers.Control.OverviewMap(),

 					draw

 					

//navigationControl

	

 				//	new OpenLayers.Control.KeyboardDefaults()

 				],    

              

                   maxResolution: "auto",

					 tileSize:new OpenLayers.Size(500, 500),projection: proj

				};

//console.log(options);

options.projection=proj;

if (proj!=='EPSG:4326')

{

//	alert(proj)

options.units='m';

//options.maxResolution=156543;

if (proj=="EPSG:900913")

{



		options.maxResolution=5643.0339;

	 	options.maxExtent=new OpenLayers.Bounds(-12037508.34,-12037508.34,12037508.34,12037508.34);

		options.projection=new OpenLayers.Projection("EPSG:900913");

		bounds="-12037508.34,-12037508.34,12037508.34,12037508.34";



}



}

else//proj=4326

{


numZoomLevels: 25,

bounds="-180.0000,-90.0000,180.0000,90.0000";

options.maxResolution="auto";



//					options.maxExtent=bounds2;

options.units='dd';

}



eval("bounds2=new OpenLayers.Bounds("+bounds+")");	



options.maxExtent=bounds2;



	         map = new OpenLayers.Map('map',options);

	





			var controls2 = map.getControlsByClass('OpenLayers.Control.Navigation');



			for(var i = 0; i <controls2.length; ++i)

			{

				controls2[i].disableZoomWheel(); 

			}



 //OpenLayers.ProxyHost="/edit_wp5/geo/mapviewer/proxy?url=";

//REMOVED part  

 pan=new OpenLayers.Control.DragPan({displayClass:'olControlPanMap'});

		//var history = new OpenLayers.Control.NavigationHistory();

		panel_controls=[

		 

		    new OpenLayers.Control.ZoomBox(),

		    new OpenLayers.Control.PanZoomBar(),

		    pan,

		    new OpenLayers.Control.ZoomToMaxExtent({title:"Zoom to the max extent"}),
/*	history,

				history.next,

				history.previous,
*/
		   	  featureInfo = new OpenLayers.Control({

				    displayClass: "olControlFeatureInfoItemActive",

				    title: "Query map features"

				    }),



				featureInfo2 = new OpenLayers.Control({

					    displayClass: "olControlFeatureInfo2",

					    title: "Query map features by polygon"

					    })

			

			]



					featureInfo.events.register("activate", featureInfo, function() {



						ppol_query="false";

					    toggleQueryMode(); });                

					featureInfo.events.register("deactivate", featureInfo, function() {

					    toggleQueryMode(); });



								featureInfo2.events.register("activate", featureInfo2, function() {



								    toggleQueryMode2(); ppol_query="true"; });                

								featureInfo2.events.register("deactivate", featureInfo2, function() {

									ppol_query="false";

								    toggleQueryMode2(); });

            		   

		   var overview_map = new OpenLayers.Layer.WMS( "EDIT WMS",

                "http://193.190.116.6:8080/geoserver/wms",

                {layers: "country_earth",group:"admin",transparent:"true",format:"image/png",styles:[]});



		



	//var o_options = {layers: [edit_blank]};

 var edit_blank2 = new OpenLayers.Layer.WMS( "EDIT WMS transparent",

			"http://193.190.116.6:8080/geoserver/wms",

			                {layers:"blank",transparent:"false",format: t_img_format,styles:"transparent",group:"remote"},

						{isBaseLayer: true});

 var o_options = {

//            maxExtent: bounds, 

            projection: proj,

           layers:[edit_blank2,overview_map]            

        };

        

var overview=new OpenLayers.Control.OverviewMap(o_options);

 map.addControl(overview);



   map.addControl( new OpenLayers.Control.LoadingPanel());  

 //  overview.maximizeControl();

							var panel = new OpenLayers.Control.Panel({

							    div: document.getElementById("panel")

							});

							map.addControl(panel);

							

			 map.addControl(new OpenLayers.Control.ScaleLine({'div':OpenLayers.Util.getElement('escala')},{theme: null}));



	var box ;//= new OpenLayers.Feature.Vector(boxes_bounds.toGeometry());				 

			 

			          var control = new OpenLayers.Control.Scale(); 

					control.div = document.getElementById("escala2"); 

					map.addControl(control); 

			 map.addControl(new OpenLayers.Control.MousePosition({'div':OpenLayers.Util.getElement('coords')},{theme: null}));

					//	var pan=new OpenLayers.Control.PanZoomBar();

							

						//	map.addControl(history);



							//panel.addControls([new OpenLayers.Control.ZoomBox(),pan,

			for (key in panel_controls)

			{

			panel.addControls(panel_controls[key])
//console.warn(panel_controls[key])

			}

			//	map.addControl(history);



	     map.addControl(new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement('layerswitcher')}));



if (proj=="EPSG:4326")

{

$.getScript('js_code/4326_specific.js')

}


 // support GetFeatureInfo
                map.events.register('click', map, function (e) {

                   document.getElementById('nodelist').innerHTML = "Loading... please wait...";
var idxLayer=$("#sel_click option:selected").val();;
var urlLayer= map.layers[idxLayer].getURL(map.getExtent());
//alert(urlLayer);
var splitURL=urlLayer.split("?")[0];
//alert(splitURL);
var baseUrl="";                    
			var params = {
			url:splitURL, 
			resthelperformat : "raw", 
                        REQUEST: "GetFeatureInfo",
                        EXCEPTIONS: "text/html",
                        BBOX: map.getExtent().toBBOX(),
                        X: e.xy.x,
                        Y: e.xy.y,
                        INFO_FORMAT: 'text/html',
                        QUERY_LAYERS: map.layers[idxLayer].params.LAYERS,
                        FEATURE_COUNT: 50,
                        Layers: map.layers[idxLayer].params.LAYERS,
                        Styles: '',
                        Srs: map.getProjection(),
                        WIDTH: map.size.w,
                        HEIGHT: map.size.h,
                        format: "image/png"};
                    OpenLayers.loadURL("restHelper.php", params, this, setHTML, setHTML);




                    OpenLayers.Event.stop(e);
                });
         
            
            // sets the HTML provided into the nodelist element
            function setHTML(response){
                document.getElementById('nodelist').innerHTML = response.responseText;

            };

	

  

  

     }//end add_controls

     create_layers('EPSG:4326');   

     add_controls('EPSG:4326',"-180.0000,-90.0000,180.0000,90.0000");

       map.addLayers([edit_blank,edit_admin,edit_gbif]);

//	shoreline.setVisibility(false);

	//s_america1.setVisibility(false);s_america2.setVisibility(false);oceania1.setVisibility(false);oceania2.setVisibility(false);

	  map.setBaseLayer(edit_blank);

	  edit_gbif.setVisibility(false);



	       	edit_admin.mergeNewParams({layers:'country_earth',styles:'countries'});

			//edit_admin.mergeNewParams({styles:''});      

	        edit_admin.setVisibility(true);

			map.zoomToMaxExtent(bounds2);



$('#sel_click').empty();
for(i=0;i<map.layers.length;i++)
{
	$('#sel_click').append($("<option></option>").attr("value",i).text(map.layers[i].name)); 	

}



	        } 

               

