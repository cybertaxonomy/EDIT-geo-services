//NOOOO SLD MAIN
//NOVES LLEGENDES!!!

 $(document).ready(function() {

	
	$("div[id='show_csv']").children().hide().eq(0).show()

	$("div[id='show_csv']").click(function()
	{
	if ($(this).hasClass('show_it'))  //it's hidden
	{
	$(this).children().eq(0).text('Hide data format and CSV example')
	$(this).removeClass('show_it');
	$("div[id='message']").fadeIn('slow')
	}
	else {                    //is visible
	$(this).children().eq(0).text('Show data format and CSV example')  

	$(this).addClass('show_it');
	$("div[id='message']").fadeOut('slow')

	}
	})
 if($.browser.mozilla) 
         $("form").attr("autocomplete", "off");
         $("input").attr("autocomplete", "off");

$("input[id='edit_points']").click(function()
{
this.checked==true?edit_points.setVisibility(true):edit_points.setVisibility(false)
})
var up=1;
ajax_top=($("#map").height()/2)-20;
ajax_left=($("#map").width()/2)-20;
$("img[id='ajax_image']").css('top',ajax_top);
$("img[id='ajax_image']").css('left',ajax_left);

$(".olControlLoadingPanel").css('top',ajax_top);
$(".olControlLoadingPanel").css('left',ajax_left);

$("form[id='img_size_form'] option:first").css('visibility','hidden');
$("li[id='resolution']").click(function()
{
$("form[id='dpi_form'] option:selected").val()==120?$("form[id='img_size_form'] option:first").css('visibility','hidden'):$("form[id='img_size_form'] option:first").css('visibility','visible')
})

$("#get_image").hide();

$(".olControlEditingToolbar").css({visibility:'hidden'});
$("#interactive_analysis").hide();
$("#analysis").css({display: 'none'});
$("#gbif").css({display: 'none'});
$("#download_data").css({display: 'none'});
$("#download_data").click(function()
{
$("#get_image").show();
});


$(".message3").hover(
function() {

$(this).css({'background':'#70ef61'})
},
function()
{
 $(this).css({'background':'#ebdac2'})
}

)

$("#user_dates").css({display: 'none'});

 $("#object").animate({ 

	        top: "150px"

	      }, 1000).fadeIn("slow");

	  $("#close_message").click(function()

		  {

		     $("#object").fadeOut("slow");

		  });

$('#overlays_div input').click(function(){


})	

	$('#gbif_trigger').click(function()

{
	var ajax_show=true;
	$.getScript('js_code/gbif.js');

	});
	
	$("#run_analysis a").click(function()
				{
								$.getScript('js_code/ppol_adaptat.js');
				});
 

 remove="false";

 contains = function (input, arrayData) {

									for (i=0; i<arrayData.length; i++) {

									if (arrayData[i] == input) {

									return 1;

									} // fi If

									} //fi For

									return -1;

									}; //fi contains


my_json="false";


getlayers=function(json) {

$.ajax({
  url: 'json_simple/'+json,
  cache: false,
  dataType: "json",error:function (xhr){alert("some error"+xhr.status+"and "+xhr.statusText)},success:function(data)

	 {
		lays=new Array();
		$("#layers input:checkbox:checked").each(function()	
		{
			lays.push(this.id);
    	});

	$.each(data, function(entryIndex, entry) 
	{ 

	$.each(entry.layers, function(lineIndex, info) 
	{  
	if (my_json=='false')  //first loading or loading user project (json)
	{

	//if (info.grup=="utm")	
	wrap=$("#layers li[id='"+info.grup+"']"); 

	layer_name='edit_'+info.id;
    eval(layer_name+"=new OpenLayers.Layer.WMS.Untiled( 'name','http://193.190.223.53:8080/geoserver/wms',{layers:'"+info.id+"',sld:'sld',transparent:'true'})");
    if (info.grup=='s_america' || info.grup=='africa' || info.grup=='asia' || 
        info.grup=='oceania' || info.grup=='n_america' || info.grup=='antartica'
		|| info.grup=='c_america' || info.grup=='europe'  || info.grup=='west_europe' || info.grup=='east_europe')
		
	{ var grup='admin'} else { var grup=info.grup;}
    html='<ul><input type="checkbox"  grup="'+grup+'" id="'+info.id+'" stylez="'+info.styles+'" checked="true" ><label>'+info.nom+'</label>';
    if (info.geom)      html+='<div id="symbolize" class="extras">Symbolize this layer</div>';
    if (info.label=="true")  html+='<div class="label" id="label_div">Hide label</div>';
	//html='<tr><td><input type='+type+' id='+info.id+' grup='+info.grup+' checked="true" onclick="toogle(this)" checked/><label style="font-size:11">'+info.nom+'  ['+extent+' extent]</label></td></tr>';
	if (info.msg)	html+='<div class="extras">This layer is only visible at scale larger than '+info.msg+'</div>';

    wrap.append(html);
      
    $("#layers input[id='"+info.id+"']").bind('click',function() { toogle(this);c_legend(this) });
	}

	else  //my_json=true
	{

			if(contains(lays,this.id)==-1)	//not repeated
		    {

		if ($("#layers input[id='"+this.id+"']").attr('checked')==false)
			{
			
			$("#layers input:checkbox[id='"+this.id+"']").attr('checked',true);
			$("#layers input[id='"+this.id+"']").trigger('click');
			$("#layers input:checkbox[id='"+this.id+"']").attr('checked',true);
			}

		 //	$("#layers input[id='"+info.id+"']").bind('click',function() { toogle(this);c_legend(this) });
		   }
   
      }  //end my_json=true
         


    }) //fi each layer  
 	//continuem a each JSON file
 	if (my_json=="true")
	{
//console.log(my_json);
//entry est formada per bbox objecte i layers objecte!
	bbox=entry.bbox;	
    bbox2=bbox[0].bbox;
	zoom=bbox[0].zoom;
	
     }
	}) //fi each data in json
					
    //SETTING UP AFTER FIRST LOAD
    if (my_json=="false")  //only first load
	{	  
 // console.log("false");
    	$("div[id='symbolize']").click(function()
			{
	//$("p[id='symbolize']").parent().children().attr('grup')
				s_group=$(this).parent().parent().attr('id');
				s_layer=$(this).parent().children().attr('id');
				s_title=$(this).parent().children().next().html();
				$("#picker").parent().attr('id',s_layer)
				if ($("div#picker").length > 0)
					{
						$("#picker").parent().prev().html('Choose the symbology for layer <b>'+s_title+'</b><br><br>');
						$(this).fadeIn();
					}
				else
				{
					var up=1;
				//$("#picker").parent().prev().html('<div>Choose the symbology for layer <b>'+s_title+'</b></div>');
				x='<div id="polygon_sld" class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">LAYER SYMBOLIZATION TOOL</div><input type="image" class="jqmdX jqmClose"/>';
				x+='<div id="title" style="padding-bottom: 10px; margin-top: 10px;"></div><form id="layerid2" action="" style="width: 530px;">';
				//x+='<div class="form-item"><label for="color1">Polygon fill color:</label><input type="text" id="p_color" name="color1" class="colorwell" value="#123456" /></div>';
				x+='<div class="form-item"><label for="color2">Stroke color:     </label><input type="text" id="stroke_color" name="stroke color" class="colorwell" value="#123456" /></div>';
				x+='<div id="picker" style="position:absolute;left:195px;top:100"></div>';
				x+='</form>';
				x+='<form id="width_form"><label>Stroke width:  </label><select><option value="0">No border</option><option value="0.5">0.5</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></form><br>';
				x+='<form id="style_form"><label>Stroke style: <select style="margin-left:20px;"><option value="1000000">solid</option><option value="2_3">dotted</option><option value="2_7">long dotted</option><option value="4_2">short dash</option><option value="5_7">dashed</option><option value="10_5">long dashed</option><option value="10_30">Very long dashed</option></select></form>';
				x+='<div><button id="pol_symbolize" style="z-index:3000" value="symbolize it!">Symbolize it!</button></div>';
				//<button id="pol_symbolize" value="symbolize it!">Symbolize it!</button>';
				//console.log(x);
				$("div#layer_symbol").append(x);
				$("div#layer_symbol").show();
				$("#picker").parent().prev().html('Choose the symbology for layer <b>'+s_title+'</b><br>');
					$("#polygon_sld :button").click(function()
					{
				//eval('var edit_'+s_layer);
					layer_name='edit_'+s_layer;
					s_width=$("#width_form option:selected").val();
					s_style=$("#style_form option:selected").val();
				//console.log(p_color);
					s_color=$("input[id='stroke_color']").val();
					s_color=s_color.substring(1);
					l_name=s_layer; //utm_europe
					sld='http://taxonomicindex.africamuseum.be/edit_wp5/geo/layers_sld/'+l_name+'.php?params='+up+'/'+l_name+'/'+s_color+'/'+s_width+'/'+s_style;
				   if (typeof(eval('edit_'+s_layer))=='object')  //edit_group still not defined object (first time symbolization)
				   {
				//alert(layer_name);
				//layer_name"=new OpenLayers.Layer.WMS.Untiled( l_name,'http://193.190.223.53:8080/geoserver/wms',{layers:''+l_name,sld:sld,transparent:'true'});
				//eval(layer_name+"=new OpenLayers.Layer.WMS.Untiled( "+l_name+",'http://193.190.223.53:8080/geoserver/wms',{layers:''"+l_name+"',sld:'"+sld+"',transparent:'true'});
				//console.log(s_layer+"has been created already before");
				//eval(layer_name+".params.SLD="+sld);
				  input=$("#layers input[id='"+s_layer+"']");
				 if (input.hasClass('symbolized'))
				 {
				$("#layers input[id='"+s_layer+"']").next().next().css('visibility','visible');
				 }
				else
				{

				grup=$("#layers input[id='"+s_layer+"']").attr('grup');
				if (grup=='tdwg' || grup=='quadricules')  //STUPID SOLUTION!!! to remove layer from edit_tdwg and edit_quadricules
				{
				$("#layers input[id='"+s_layer+"']").trigger('click');
				$("#layers input[id='"+s_layer+"']").trigger('click');
				$("#layers input[id='"+s_layer+"']").attr('checked',true);//abans era fallssse???


				}
				else 
				{
				$("input[id='"+s_layer+"']").trigger('click');//remove layer from edit_nature or edit_admin
				}
				input.addClass('symbolized');
				$("#layers input[id='"+s_layer+"']").next().next().css('visibility','visible');
				var ul=$(input).parent(); 
				$(ul).css('height','40');
				input.unbind('click');
				$("input[id='"+s_layer+"']").attr('checked','true');

				input.bind('click',function(){
				toogle_simple($(this).get(0),s_group);


				})
				}
				s=layer_name+".params.SLD='"+sld+"'";
				eval(s);
				//console.log(s);


				if (eval(layer_name+".map")==null)
				{
				eval("map.addLayer("+layer_name+")");
				}
				else
				{
				eval(layer_name+".redraw()");
				}
				}
				else
				{
				c=layer_name+"=new OpenLayers.Layer.WMS.Untiled( '"+s_layer+"','http://193.190.223.53:8080/geoserver/wms',{layers:'"+s_layer+"',sld:'"+sld+"',transparent:'true'})";
				eval(c)
				//console.log(c);
				map.addLayer(layer_name);

				}


				})

					$('input.jqmdX').hover(function(){
					         $(this).addClass('jqmdXFocus')},function(){  $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#layer_symbol').empty().hide();
							});
				 msie=($.browser.msie==true)?true:false; 
					if (msie)
					{

						$('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/edit_geo/prototype/JQ_win_files/close.gif)  no-repeat top left').css('width','15px');
						}else 
						{
							$('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/edit_geo/prototype/JQ_win_files/close.gif) no-repeat top left');
						}
				$('input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){ $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#layer_symbol').hide(); 
				 });
				   $("div#layer_symbol") .jqDrag('.jqDrag').jqResize('.jqResize') ;
					$("#picker").parent().attr('id',s_layer)
				$('div#layer_symbol').jqm({    overlay: 30 })  
				var f = $.farbtastic('#picker'); //he Farbtastic object is returned instead of the jQuery object. This allows you to use the Farbtastic methods and properties below.
				   				//Note that there is only one Farbtastic object per placeholder.
				  // console.log(f); //Žs el div=wheel
				//   console.info($('#picker').farbtastic()); //retorna div id=picker
				   var p = $('#picker').css('opacity', 0.25);
				   var selected;
				   selected
				  // console.log(selected);
				   $('.colorwell')  // a on hi hagi colorwell (input class=colorwell)
				     .each(function () { f.linkTo(this); //associa el valor seleccionat a this (a on i hagi class=colorwell)
				    			 $(this).css('opacity', 0.75); })
				     .focus(function() { //quan fem focus sobre .colorwell
				       if (selected) {
				      //  console.log(selected);
					$(selected).css('opacity', 0.75).removeClass('colorwell-selected');  //el que estiguŽs selected, el deseleccionem
				       }
				       f.linkTo(this); //afegeix valor del wheel al value del input
				       p.css('opacity', 1);
				       $(selected = this).css('opacity', 1).addClass('colorwell-selected'); //variables selected Žs ara a on hi hem fet el focus. Afegim class:colorwell-selected
				     });
				  }
				})  //end if symbolized class clicked
 //HEM MOGUT FUNCIO ON SYMBOLIZE CLICK

   $("#layers input[id='shoreline']").unbind('click');
   $("#layers input[id='shoreline']").bind('click',function() { set_Visible(this); });  

	$('#layers li:has(ul) input:not(.symbolized)').click(function(event)
	{   //click on 'hide/show layers'
		var input=event.target;
		var nexts=$(input).next().nextAll();  //symbolize and label

		if (nexts.length >0)
		{
			var ul=$(input).parent();
			if (input.checked==true)
			{
			var size=nexts.length*40;

			$(nexts).css('visibility','visible')

			$(ul).css('height',size)
			}
			else
			{
				$(nexts).css('visibility','hidden')
				$(ul).css('height','20');
			}
		}
	})
	$('#layers li:has(ul) div[id="label_div"]').click(function(event)
	{   //click on 'hide/show layers'
		var label=event.target;
		var input=$(label).parent().children().get(0);
		grup=input.getAttribute('grup');
		style=input.getAttribute('stylez');

		if ($(label).hasClass('label'))  //by default hasClas 'label'
		{
		$(label).text('Show label').removeClass('label').addClass('label2').css('background','#b68ff0');
		style2="nl_"+style;
		$(input).attr('stylez',style2);
		$(input).trigger('click');
		$(input).attr('checked',true)
		}
		else  //adding lables
		{
		$(label).text('Hide label').addClass('label').removeClass('label2').css('background','#ebdac2');
		style2=style.substr(3);
		$(input).attr('stylez',style2);
		$(input).trigger('click');
		$(input).attr('checked',true)
		}
	})
 	$("#layers input:checkbox").attr('checked',false);    
      edit_admin.mergeNewParams({layers:'country_earth'});
      edit_admin.mergeNewParams({styles:'countries'});      
      edit_admin.setVisibility(true);
 	  $("#layers input:checkbox[id='country_earth']").attr('checked',true);
 		path="http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&LAYER=country_earth&STYLE=countries&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12";
		html='<ul><img s="countries" style="height:20px" id="country_earth" src="'+path+'"/></ul>';
		$("#images").append(html);
	$('#layers li:has(ul),#print_params li:has(ul)')
          .click(function(event){
            if (this == event.target) 
			{
				if ($(this).children().is(':hidden'))
					$(this).css('list-style-image', 'url(img/minus.gif)');
				else
					$(this).css('list-style-image', 'url(img/plus.gif)');
	            	$(this).children().toggle('slow');
            }
        //    return false;
          })
          .css({cursor:'pointer','list-style-image':'url(img/plus.gif)'})
          .children().hide();

        $('#layers li:not(:has(ul))').css({
          cursor: 'default', 'list-style-image':'none'
		});

      }  //ENR SETTING FIRST LOAD 

	 else  //my_json=="true"
    {  
//console.log(my_json);

 		$("#ex_print").hide();
 		var bounds=new OpenLayers.Bounds.fromString(bbox2);

		var center=bounds.getCenterLonLat();
		edit_blank.isBaseLayer?map.setBaseLayer(edit_blank):map.setBaseLayer(edit_nasa);
        var zoom=map.getZoomForExtent(bounds);

		map.setCenter(center,zoom);
		my_json="false";

     }

			remove="true";
	} //END AJAX SUCCESS FUNTION 
 });//END AJAX FUNCTION
  
}//fi getlayers

getlayers('world_s3.json');	

w=parseInt(screen.width);
if (w <1024)
{
screen_w='little';
}

if (w >=1024 && w<1280)
{
$("#map").width('600');
$("#map").height('300');
$("#images").css({'left':'640'});
$("#edit_logo").css({'left':$("#map").width()+50});
screen_w='medium1';
}
if (w >=1280 && w<1600)
{
//Meu MACOS
screen_w='medium2';
$("#images").css({'left':'740'});
}
if (w >=1600)
{
screen_w='big';
$("#map").width('900');
$("#map").height('450');
$("#images").css({'left':'950'});
}

 		var $loading=$('#image');
		$loading.ajaxStart(function() { 

 

			if (ajax_show==true)

			{	

 

				$(this).css('visibility','visible').css('width','150')

			 	}

			})

			$("#status").ajaxError(function(info,xhr) {

			if (ajax_show=true)

			{

				$(info.target).append('error is.... '+xhr.status);

			}

			})

 

			$loading.ajaxStop(function() {

			if (ajax_show=true)

			{

				$(this).css('visibility','visible').css('width','0');

				var ajax_show=false;

			}

				});

				$("#map_legend").hide();

				var create_scalebar=function()

				{

  	var bbox=map.getExtent().toBBOX();		  

	 var l_size=$("#l_size option:selected").val();

	 var label_size=$("#l_label_size option:selected").val();	 

	 var intervals=$("#l_intervals option:selected").val();	 

	 var units=$("#l_units option:selected").val();

	 var width=$("#map").width();

	 var height=$("#map").height();	 

	 

			$.get('http://taxonomicindex.africamuseum.be/edit_wp5/geo/test_scalebar.php',{bbox:bbox,w:width,h:height,units:units,label_size:label_size,l_size:l_size,intervals:intervals},function(s)

		        {

		        d='http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/scalebars/'+s;

				//wwhy not directly scalebar?????? (it's a local variable)

				img_scalebar=s;		
				
				t=$("#map").position().top+$("#map").height()-30;
 l=$("#map").position().left;

$("#scalebar").css('top',t).css('left',l+50);

				//windrose=$("#windrose_form option:selected").val();

		      if ($("#windrose").css('visibility')=="visible")
						{

//				$("#scalebar").css('top','0px');
				$("#scalebar").css('top',height-30);

				}

		        $("#scalebar").attr('src',d);

	

				$("#scalebar").width(l_size);

$("#scalebar").css('visibility','visible');

		         $("#scalebar").fadeIn();

		        

		        });

}

				$("#scalebar_form").bind(($.browser.msie ? "click" : "change"),function()

				{

						selected=$("#scalebar_form option:selected").val();

						

						if (selected=="yes") {

						map.events.register("zoomend", map, create_scalebar);

						$("#scalebar_form").next().slideDown();$("#scalebar_form").next().addClass('show_legend');

						create_scalebar();

						}

						else { 
							map.events.unregister("zoomend", map, create_scalebar);
						$("#scalebar_form").next().slideUp();

						$("#scalebar").hide();

						$("#scalebar_form").next().removeClass('show_legend'); 

						}

				})

		$("#get_scalebar").click(function() { create_scalebar() });		

	$("#format_form").bind(($.browser.msie ? "click" : "change"),function()

			{

		selected="png";

		selected=$("#format_form option:selected").val();

			if (selected=="tif")

				{
				    $("#tif_form,#bits_form").css('height',20).css('visibility','visible').parent().css('height',100)

					

					}

			else {

$("#tif_form,#bits_form ").css('height',0).css('visibility','hidden').parent().css('height',20)

//				$("#tif_form,#bits_form").slideUp()

			}

			})

	$("#choose_windrose_form").hide();

	$("#windrose_form").bind(($.browser.msie ? "click" : "change"), function()

			{

 
        var scalebar=$("#scalebar_form option:selected").val();
	var selected=$("#windrose_form option:selected").val();	

		if (selected=="yes") {

		$("#choose_windrose_form").slideDown(); 

		$("#choose_windrose_form").bind(($.browser.msie ? "click" : "change"),function()

		{

		
	var img=$("#choose_windrose_form option:selected").val();
		var windrose_path="http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/windroses/"+img;

		$("#windrose").attr('src',windrose_path);


		$("#windrose").css('visibility','visible').css('width','100');

$("#windrose").css({position:'absolute'});
//$("img[id='windrose']").position().top 
t=$("#map").position().top;
l=$("#map").position().left+$("#map").width()-100;
$("#windrose").css('top',t);
$("#windrose").css('left',l);

		});

		}

		else

		{

		$("#choose_windrose_form").slideUp(); $("#windrose").css('visibility','hidden');

		}

		})



		

		$("#scalebar_form").next().hide();

		$("#get_image").click(function()

		        {	
							$("img[id='ajax_image']").css('visibility','visible');
		        			$.getScript('js_code/print_s2.js')

			})
				$("#get_keymap").click(function()

		        {		
							print='keymap';
		        			$.getScript('js_code2/added_prints.js');

			})
							$("#get_points").click(function()

		        {		
							print='points_legend';
		        			$.getScript('js_code2/added_prints.js');

			})

$('#ex2,dd').hide();

		$("dt").click(function(){

		$(this).next("dd").slideToggle("slow")
		.siblings("dd:visible").slideUp("slow");
		$(this).toggleClass("active");
		$(this).siblings("dd").removeClass("active");

	});

 

	

	$('#id').click(function()

{   

   selected=($("#id").hasClass("selected")==true)?true:false;

   if(selected) {

		$("iframe#info,div[id*='_form']").hide();

     $("#ex2,#color_form").fadeIn();

  

       }

       else

       {

//       alert(" first use");  

           //PRIMER S DE L'EINA. CARREGUEM SCRIPT.

				$("#id").addClass("selected");

			       $.getScript('js_code2/symbology_simple.js');      

			       $("#what_todo,#informacio").hide();

				$("iframe#info").fadeIn();

		};

});

 

 

 

	});

 

(function($){$.fn.jqDrag=function(h){return i(this,h,'d')};$.fn.jqResize=function(h){return i(this,h,'r')};$.jqDnR={dnr:{},e:0,drag:function(v){if(M.k=='d')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});return false},stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop)}};var J=$.jqDnR,M=J.dnr,E=J.e,i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;if(E.css('position')!='relative'){try{E.position(p)}catch(e){}}M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};E.css({opacity:0.8});$().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);return false})})},f=function(k){return parseInt(E.css(k))||false}})(jQuery);

/*

(function($){

 

$.fn.jqm=function(o){

var _o={zIndex:3000,overlay:50,overlayClass:'jqmOverlay',closeClass:'jqmClose',trigger:'.jqModal',ajax:false,target:false,modal:false,toTop:true,onShow:false,onHide:false,onLoad:false};return this.each(function(){if(this._jqm)return;s++;this._jqm=s;H[s]={c:$.extend(_o,o),a:false,w:$(this).addClass('jqmID'+s),s:s};if(_o.trigger)$(this).jqmAddTrigger(_o.trigger)})};$.fn.jqmAddClose=function(e){hs(this,e,'jqmHide');return this};$.fn.jqmAddTrigger=function(e){hs(this,e,'jqmShow');return this};$.fn.jqmShow=function(t){return this.each(function(){if(!H[this._jqm].a)$.jqm.open(this._jqm,t)})};$.fn.jqmHide=function(t){return this.each(function(){if(H[this._jqm].a)$.jqm.close(this._jqm,t)})};$.jqm={hash:{},open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(/^\d+$/.test(h.w.css('z-index')))?h.w.css('z-index'):c.zIndex,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});h.t=t;h.a=true;h.w.css('z-index',z);if(c.modal){if(!A[0])F('bind');A.push(s);o.css('cursor','wait')}else if(c.overlay>0)h.w.jqmAddClose(o);else o=false;h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):false;if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in{Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'")}}if(c.ajax){var r=c.target||h.w,u=c.ajax,r=(typeof r=='string')?$(r,h.w):$(r),u=(u.substr(0,1)=='')?$(t).attr(u.substring(1)):u;r.load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h)})}else if(cc)h.w.jqmAddClose($(cc,h.w));if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);(c.onShow)?c.onShow(h):h.w.show();e(h);return false},close:function(s){var h=H[s];h.a=false;if(A[0]){A.pop();if(!A[0])F('unbind')}if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove()}return false}};var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version=="6.0"),i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i);f(h)},f=function(h){try{$(':input:visible',h.w)[0].focus()}catch(e){}},F=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m)},m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return!r},hs=function(w,e,y){var s=[];w.each(function(){s.push(this._jqm)});$(e).each(function(){if(this[y])$.extend(this[y],s);else{this[y]=s;$(this).click(function(){for(var i in{jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return false})}})}})

 

(jQuery);(function($){

var height=$.fn.height,width=$.fn.width;$.fn.extend({height:function(){if(!this[0])error();if(this[0]==window)if($.browser.opera||($.browser.safari&&parseInt($.browser.version)>520))return self.innerHeight-(($(document).height()>self.innerHeight)?getScrollbarWidth():0);else if($.browser.safari)return self.innerHeight;else return $.boxModel&&document.documentElement.clientHeight||document.body.clientHeight;if(this[0]==document)return Math.max(($.boxModel&&document.documentElement.scrollHeight||document.body.scrollHeight),document.body.offsetHeight);return height.apply(this,arguments)},width:function(){if(!this[0])error();if(this[0]==window)if($.browser.opera||($.browser.safari&&parseInt($.browser.version)>520))return self.innerWidth-(($(document).width()>self.innerWidth)?getScrollbarWidth():0);else if($.browser.safari)return self.innerWidth;else return $.boxModel&&document.documentElement.clientWidth||document.body.clientWidth;if(this[0]==document)if($.browser.mozilla){var scrollLeft=self.pageXOffset;self.scrollTo(99999999,self.pageYOffset);var scrollWidth=self.pageXOffset;self.scrollTo(scrollLeft,self.pageYOffset);return document.body.offsetWidth+scrollWidth}else return Math.max((($.boxModel&&!$.browser.safari)&&document.documentElement.scrollWidth||document.body.scrollWidth),document.body.offsetWidth);return width.apply(this,arguments)},innerHeight:function(){if(!this[0])error();return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight-num(this,'borderTopWidth')-num(this,'borderBottomWidth'):this.height()+num(this,'paddingTop')+num(this,'paddingBottom')},innerWidth:function(){if(!this[0])error();return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth-num(this,'borderLeftWidth')-num(this,'borderRightWidth'):this.width()+num(this,'paddingLeft')+num(this,'paddingRight')},outerHeight:function(options){if(!this[0])error();options=$.extend({margin:false},options||{});return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight+(options.margin?(num(this,'marginTop')+num(this,'marginBottom')):0):this.height()+num(this,'borderTopWidth')+num(this,'borderBottomWidth')+num(this,'paddingTop')+num(this,'paddingBottom')+(options.margin?(num(this,'marginTop')+num(this,'marginBottom')):0)},outerWidth:function(options){if(!this[0])error();options=$.extend({margin:false},options||{});return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth+(options.margin?(num(this,'marginLeft')+num(this,'marginRight')):0):this.width()+num(this,'borderLeftWidth')+num(this,'borderRightWidth')+num(this,'paddingLeft')+num(this,'paddingRight')+(options.margin?(num(this,'marginLeft')+num(this,'marginRight')):0)},scrollLeft:function(val){if(!this[0])error();if(val!=undefined)return this.each(function(){if(this==window||this==document)window.scrollTo(val,$(window).scrollTop());else this.scrollLeft=val});if(this[0]==window||this[0]==document)return self.pageXOffset||$.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft;return this[0].scrollLeft},scrollTop:function(val){if(!this[0])error();if(val!=undefined)return this.each(function(){if(this==window||this==document)window.scrollTo($(window).scrollLeft(),val);else this.scrollTop=val});if(this[0]==window||this[0]==document)return self.pageYOffset||$.boxModel&&document.documentElement.scrollTop||document.body.scrollTop;return this[0].scrollTop},position:function(returnObject){return this.offset({margin:false,scroll:false,relativeTo:this.offsetParent()},returnObject)},offset:function(options,returnObject){if(!this[0])error();var x=0,y=0,sl=0,st=0,elem=this[0],parent=this[0],op,parPos,elemPos=$.css(elem,'position'),mo=$.browser.mozilla,ie=$.browser.msie,oa=$.browser.opera,sf=$.browser.safari,sf3=$.browser.safari&&parseInt($.browser.version)>520,absparent=false,relparent=false,options=$.extend({margin:true,border:false,padding:false,scroll:true,lite:false,relativeTo:document.body},options||{});if(options.lite)return this.offsetLite(options,returnObject);if(options.relativeTo.jquery)options.relativeTo=options.relativeTo[0];if(elem.tagName=='BODY'){x=elem.offsetLeft;y=elem.offsetTop;if(mo){x+=num(elem,'marginLeft')+(num(elem,'borderLeftWidth')*2);y+=num(elem,'marginTop')+(num(elem,'borderTopWidth')*2)}else if(oa){x+=num(elem,'marginLeft');y+=num(elem,'marginTop')}else if((ie&&jQuery.boxModel)){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth')}else if(sf3){x+=num(elem,'marginLeft')+num(elem,'borderLeftWidth');y+=num(elem,'marginTop')+num(elem,'borderTopWidth')}}else{do{parPos=$.css(parent,'position');x+=parent.offsetLeft;y+=parent.offsetTop;if((mo&&!parent.tagName.match(/^t[d|h]$/i))||ie||sf3){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth');if(mo&&parPos=='absolute')absparent=true;if(ie&&parPos=='relative')relparent=true}op=parent.offsetParent||document.body;if(options.scroll||mo){do{if(options.scroll){sl+=parent.scrollLeft;st+=parent.scrollTop}if(oa&&($.css(parent,'display')||'').match(/table-row|inline/)){sl=sl-((parent.scrollLeft==parent.offsetLeft)?parent.scrollLeft:0);st=st-((parent.scrollTop==parent.offsetTop)?parent.scrollTop:0)}if(mo&&parent!=elem&&$.css(parent,'overflow')!='visible'){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}parent=parent.parentNode}while(parent!=op)}parent=op;if(parent==options.relativeTo&&!(parent.tagName=='BODY'||parent.tagName=='HTML')){if(mo&&parent!=elem&&$.css(parent,'overflow')!='visible'){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}if(((sf&&!sf3)||oa)&&parPos!='static'){x-=num(op,'borderLeftWidth');y-=num(op,'borderTopWidth')}break}if(parent.tagName=='BODY'||parent.tagName=='HTML'){if(((sf&&!sf3)||(ie&&$.boxModel))&&elemPos!='absolute'&&elemPos!='fixed'){x+=num(parent,'marginLeft');y+=num(parent,'marginTop')}if(sf3||(mo&&!absparent&&elemPos!='fixed')||(ie&&elemPos=='static'&&!relparent)){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}break}}while(parent)}var returnValue=handleOffsetReturn(elem,options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this}else{return returnValue}},offsetLite:function(options,returnObject){if(!this[0])error();var x=0,y=0,sl=0,st=0,parent=this[0],offsetParent,options=$.extend({margin:true,border:false,padding:false,scroll:true,relativeTo:document.body},options||{});if(options.relativeTo.jquery)options.relativeTo=options.relativeTo[0];do{x+=parent.offsetLeft;y+=parent.offsetTop;offsetParent=parent.offsetParent||document.body;if(options.scroll){do{sl+=parent.scrollLeft;st+=parent.scrollTop;parent=parent.parentNode}while(parent!=offsetParent)}parent=offsetParent}while(parent&&parent.tagName!='BODY'&&parent.tagName!='HTML'&&parent!=options.relativeTo);var returnValue=handleOffsetReturn(this[0],options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this}else{return returnValue}},offsetParent:function(){if(!this[0])error();var offsetParent=this[0].offsetParent;while(offsetParent&&(offsetParent.tagName!='BODY'&&$.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return $(offsetParent)}});var error=function(){throw"Dimensions: jQuery collection is empty";};var num=function(el,prop){return parseInt($.css(el.jquery?el[0]:el,prop))||0};var handleOffsetReturn=function(elem,options,x,y,sl,st){if(!options.margin){x-=num(elem,'marginLeft');y-=num(elem,'marginTop')}if(options.border&&(($.browser.safari&&parseInt($.browser.version)<520)||$.browser.opera)){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth')}else if(!options.border&&!(($.browser.safari&&parseInt($.browser.version)<520)||$.browser.opera)){x-=num(elem,'borderLeftWidth');y-=num(elem,'borderTopWidth')}if(options.padding){x+=num(elem,'paddingLeft');y+=num(elem,'paddingTop')}if(options.scroll&&(!$.browser.opera||elem.offsetLeft!=elem.scrollLeft&&elem.offsetTop!=elem.scrollLeft)){sl-=elem.scrollLeft;st-=elem.scrollTop}return options.scroll?{top:y-st,left:x-sl,scrollTop:st,scrollLeft:sl}:{top:y,left:x}};var scrollbarWidth=0;var getScrollbarWidth=function(){if(!scrollbarWidth){var testEl=$('<div>').css({width:100,height:100,overflow:'auto',position:'absolute',top:-1000,left:-1000}).appendTo('body');scrollbarWidth=100-testEl.append('<div>').find('div').css({width:'100%',height:200}).width();testEl.remove()}return scrollbarWidth}})(jQuery);

*/

/*

 * jqModal - Minimalist Modaling with jQuery

 *   (http://dev.iceburg.net/jquery/jqModal/)

 *

 * Copyright (c) 2007,2008 Brice Burgess <bhbiceburg.net>

 * Dual licensed under the MIT and GPL licenses:

 *   http://www.opensource.org/licenses/mit-license.php

 *   http://www.gnu.org/licenses/gpl.html

 * 

 * $Version: 03/01/2009 +r14

 */

(function($) {

$.fn.jqm=function(o){

var p={

overlay: 50,

overlayClass: 'jqmOverlay',

closeClass: 'jqmClose',

trigger: '.jqModal',

ajax: F,

ajaxText: '',

target: F,

modal: F,

toTop: F,

onShow: F,

onHide: F,

onLoad: F

};

return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;

H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};

if(p.trigger)$(this).jqmAddTrigger(p.trigger);

});};

 

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};

$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};

$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};

$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

 

$.jqm = {

hash:{},

open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);

 if(c.modal) {if(!A[0])L('bind');A.push(s);}

 else if(c.overlay > 0)h.w.jqmAddClose(o);

 else o=F;

 

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;

 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '')?$(t).attr(u.substring(1)):u;

  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}

 else if(cc)h.w.jqmAddClose($(cc,h.w));

 

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	

 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;

},

close:function(s){var h=H[s];if(!h.a)return F;h.a=F;

 if(A[0]){A.pop();if(!A[0])L('unbind');}

 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();

 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;

},

params:{}};

var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,

i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),

e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},

f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},

L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},

m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},

hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {

 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};

})(jQuery);

 

 

jQuery.fn.farbtastic=function(callback){$.farbtastic(this,callback);return this};jQuery.farbtastic=function(container,callback){var container=$(container).get(0);return container.farbtastic||(container.farbtastic=new 

jQuery._farbtastic(container,callback))};jQuery._farbtastic=function(container,callback){var fb=this;$(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var e=$('.farbtastic',container);fb.wheel=$('.wheel',container).get(0);fb.radius=84;fb.square=100;fb.width=194;if(navigator.appVersion.match(/MSIE [0-6]\./)){$('*',e).each(function(){if(this.currentStyle.backgroundImage!='none'){var image=this.currentStyle.backgroundImage;image=this.currentStyle.backgroundImage.substring(5,image.length-2);$(this).css({'backgroundImage':'none','filter':

"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+image+"')"})}})};fb.linkTo=function(callback){if(typeof fb.callback=='object'){$(fb.callback).unbind('keyup',fb.updateValue)} fb.color=null;if(typeof callback=='function'){fb.callback=callback} else if(typeof callback=='object'||typeof callback=='string'){fb.callback=$(callback);fb.callback.bind('keyup',fb.updateValue);if(fb.callback.get(0).value){fb.setColor(fb.callback.get(0).value)}};return this};

fb.updateValue=function(event){if(this.value&&this.value!=fb.color){fb.setColor(this.value)}};fb.setColor=function(color){var unpack=fb.unpack(color);if(fb.color!=color&&unpack){fb.color=color;fb.rgb=unpack;fb.hsl=fb.RGBToHSL(fb.rgb);fb.updateDisplay()};return this};fb.setHSL=function(hsl){fb.hsl=hsl;fb.rgb=fb.HSLToRGB(hsl);fb.color=fb.pack(fb.rgb);fb.updateDisplay();return this};fb.widgetCoords=function(event){var x,y;var el=event.target||event.srcElement;var reference=fb.wheel;

if(typeof event.offsetX!='undefined'){var pos={x:event.offsetX,y:event.offsetY};var e=el;while(e){e.mouseX=pos.x;e.mouseY=pos.y;pos.x+=e.offsetLeft;pos.y+=e.offsetTop;e=e.offsetParent};var e=reference;var offset={x:0,y:0};

while(e){if(typeof e.mouseX!='undefined'){x=e.mouseX-offset.x;y=e.mouseY-offset.y;break};offset.x+=e.offsetLeft;offset.y+=e.offsetTop;e=e.offsetParent;};

e=el;

while(e){e.mouseX=undefined;e.mouseY=undefined;e=e.offsetParent}}

else{var pos=fb.absolutePosition(reference);

x=(event.pageX||0*(event.clientX+$('html').get(0).scrollLeft))-pos.x;y=(event.pageY||0*(event.clientY+$('html').get(0).scrollTop))-pos.y};return{x:x-fb.width/2,y:y-fb.width/2}};

fb.mousedown=function(event){if(!document.dragging){$(document).bind('mousemove',fb.mousemove).bind('mouseup',fb.mouseup);document.dragging=true};var pos=fb.widgetCoords(event);fb.circleDrag=Math.max(Math.abs(pos.x),Math.abs(pos.y))*2>fb.square;fb.mousemove(event);return false};

fb.mousemove=function(event){var pos=fb.widgetCoords(event);if(fb.circleDrag){var hue=Math.atan2(pos.x,-pos.y)/6.28;if(hue<0)hue+=1;fb.setHSL([hue,fb.hsl[1],fb.hsl[2]])}else{var sat=Math.max(0,Math.min(1,-(pos.x/fb.square)+.5));var lum=Math.max(0,Math.min(1,-(pos.y/fb.square)+.5));fb.setHSL([fb.hsl[0],sat,lum])};return false};fb.mouseup=function(){$(document).unbind('mousemove',fb.mousemove);$(document).unbind('mouseup',fb.mouseup);document.dragging=false};

fb.updateDisplay=function(){var angle=fb.hsl[0]*6.28;$('.h-marker',e).css({left:Math.round(Math.sin(angle)*fb.radius+fb.width/2)+'px',top:Math.round(-Math.cos(angle)*fb.radius+fb.width/2)+'px'});$('.sl-marker',e).css({left:Math.round(fb.square*(.5-fb.hsl[1])+fb.width/2)+'px',top:Math.round(fb.square*(.5-fb.hsl[2])+fb.width/2)+'px'});$('.color',e).css('backgroundColor',fb.pack(fb.HSLToRGB([fb.hsl[0],1,0.5])));

if(typeof fb.callback=='object'){$(fb.callback).css({backgroundColor:fb.color,color:fb.hsl[2]>0.5?'#000':'#fff'});$(fb.callback).each(function(){if(this.value&&this.value!=fb.color){this.value=fb.color}})}

else if(typeof fb.callback=='function'){fb.callback.call(fb,fb.color)};};fb.absolutePosition=function(el){var r={x:el.offsetLeft,y:el.offsetTop};if(el.offsetParent){var tmp=fb.absolutePosition(el.offsetParent);r.x+=tmp.x;r.y+=tmp.y};return r};fb.pack=function(rgb){var r=Math.round(rgb[0]*255);var g=Math.round(rgb[1]*255);

var b=Math.round(rgb[2]*255);return'#'+(r<16?'0':'')+r.toString(16)+(g<16?'0':'')+g.toString(16)+(b<16?'0':'')+b.toString(16)};fb.unpack=function(color){if(color.length==7){return[parseInt('0x'+color.substring(1,3))/255,parseInt('0x'+color.substring(3,5))/255,parseInt('0x'+color.substring(5,7))/255]}else if(color.length==4){return[parseInt('0x'+color.substring(1,2))/15,parseInt('0x'+color.substring(2,3))/15,parseInt('0x'+color.substring(3,4))/15]}};fb.HSLToRGB=function(hsl){var m1,m2,r,g,b;var h=hsl[0],s=hsl[1],l=hsl[2];m2=(l<=0.5)?l*(s+1):l+s-l*s;m1=l*2-m2;return[this.hueToRGB(m1,m2,h+0.33333),this.hueToRGB(m1,m2,h),this.hueToRGB(m1,m2,h-0.33333)]};fb.hueToRGB=function(m1,m2,h){h=(h<0)?h+1:((h>1)?h-1:h);if(h*6<1)return m1+(m2-m1)*h*6;if(h*2<1)return m2;if(h*3<2)return m1+(m2-m1)*(0.66666-h)*6;return m1};fb.RGBToHSL=function(rgb){var min,max,delta,h,s,l;var r=rgb[0],g=rgb[1],b=rgb[2];min=Math.min(r,Math.min(g,b));max=Math.max(r,Math.max(g,b));delta=max-min;l=(min+max)/2;s=0;if(l>0&&l<1){s=delta/(l<0.5?(2*l):(2-2*l))};h=0;if(delta>0){if(max==r&&max!=g)h+=(g-b)/delta;if(max==g&&max!=b)h+=(2+(b-r)/delta);if(max==b&&max!=r)h+=(4+(r-g)/delta);h/=6};return[h,s,l]};$('*',e).mousedown(fb.mousedown);fb.setColor('#000000');if(callback){fb.linkTo(callback)}};
