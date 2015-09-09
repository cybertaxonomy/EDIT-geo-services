//$(document).ready(function(){
//PROBLEMES AMB IEXPLORER--> ON SUBMIT, RECARREGA IFRAME, TORNANT A EXECUTAR-SE LES ACCIONS ASSOCIADES

//SLD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	if ($('#ex2').children().length!==0)
	{
	$('#ex2').empty();
	}
var bindFrameActions=function() {

	var to_start=$('#color_form a')[0];
//	$(to_start).hide();	
	var add=$('#color_form a')[2];
//	$(add).hide();

 $('iframe#info').fadeIn("slow");
//.not('iframe#info').hide();
$('#ex2').jqm({
    overlay: 30
})
$('div[id*="_form"]').hide();
$("#send").hide();
$("#informacio,#what_todo").hide();
	//$("#send").hide();
	//$("#informacio").hide();
 var iframe=$('iframe#info'); 
msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/geo/img/close.gif)  no-repeat top left').css('width','15px');
}
else 
{
$('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/geo/img/close.gif) no-repeat top left');
}
 

 $(iframe).bind('load', function()
{
	//alert("carregant iframe");
	//BIND EVENTS ONLOAD 
    iframe=$("iframe#info");

    submit_button=iframe.contents().find("#submit");   
//console.log(submit_button);
    $('input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide(); 
 if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));});
  //submit is the id of
//    $("#color_form form ,#symbol_form form,#size_form form").empty(); 
                 
   $("#ex2").animate({width:'380',height:'325'},"slow");
     var to_size=$('#symbol_form a')[0];
	  var back_color=$('#symbol_form a')[1];
	var to_start=$('#color_form a')[0];

	//WHEN WE FORCE STARTING THE SYMBOLIZATION AGAIN... JUST PUT THE INICIAL VALUES AGAIN AND PRINT IT
	 
	$(to_start).click(function(){
	//	var genus_size=iframe.contents().find('#genusSelect option').size();
    edit_sp_points.params.SLD=initial_sp_sld,
    edit_sp_points.redraw();
$("iframe#info").attr('src','http://taxonomicindex.africamuseum.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+'p='+third+"_"+fourth);



var image=document.getElementById("species_legend");
	image.setAttribute("src",'http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&sld='+edit_sp_points.params.SLD);
$('div[id*="_form"]').hide();
$("#send").hide();
$("#informacio,#what_todo").hide();
    $("#color_form form ,#symbol_form form,#size_form table").hide().empty(); 
    $("#picker").remove();
$(iframe).fadeIn("slow");

    if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));

	  }); //fi $(to_start).click 
	
	var to_symbol=$('#color_form a')[1];

	$(to_symbol).click(function() {
		//alert("to symbol");
		$('#color_form').slideUp("quick");
	    var form_width=$('#symbol_form').width() ;
	    $("#ex2").animate({width: form_width}, "slow");
	    $("#symbol_form").animate({height:'190'},"slow");
	});
	var add_genus=$('#color_form a')[2];
	$(add_genus).click(function() { //alert("adding genus");
	var iframe=	$("iframe#info");
	var submit_button=iframe.contents().find("#submit");     //"addd these genus"
	submit_button.val('Add it');
	submit_button.addClass("add"); 

//	$('.jqmdTR *').hide(); $('.jqmdTC,.jqDrag').show();
	$("iframe#info").fadeIn("slow");
    $("#color_form,#informacio,#send").hide();
	})

	$(to_size).click(function(){$('#symbol_form').slideUp("quick");
	$('#size_form').show();
	var size_width=$('#size_form').width();
	$('#size_form').show();
	 $("#ex2").animate({width: size_width}, "slow");});

	 $(back_color).click(function(){
	 $('#symbol_form').slideUp("quick");
	 $('#color_form').show();
	  $("#ex2").animate({width: "365"}, "slow");
	  });
	
	 $("#size_form a").click(function(){$('#size_form').slideUp("quick");$('#symbol_form').show();
	  })
	//END OF BIND ONLOAD EVENTS 

   submit_button.click(
   function()
   {

var add_genus=[];
var add_val=[];
var add_name=[];
 //alert(submit_button.hasClass("add"));  
	var iframe=	$("iframe#info");
	var submit_button=iframe.contents().find("#submit");  
//alert(submit_button.hasClass("add"));	
    if(submit_button.hasClass("add"))
    {
      //  alert("adding class button");
    
    var iframe=$("iframe#info");
 	var add_genus=iframe.contents().find('#genusSelect option:selected');
	var add_specie=iframe.contents().find('#specieSelect option:selected');
//	var to_add=add_genus+" "+add_specie;
  // console.warn(add_genus);
    
 	$(add_specie).each( function(){  	
			contains = function (input, arrayData) {
			for (i=0; i<arrayData.length; i++) {
			if (arrayData[i] == input) {
			return 1;
			} // fi If
			} //fi For
			return -1;
			}; //fi contains

   value=parseInt(this.value); 
   if(contains(value,genus_val)==1)
    {
//       console.warn(value+" is already on list");
    }
    else {
       //   console.info(this.value+"   is still not selected??");
        //  add_val.push(parseInt(this.value));
          add_name.push($(add_genus).text()+" "+this.text);
          genus_val.push(parseInt(this.value));
 		  genus_sp.push($(add_genus).text()+" "+this.text); //this.value donarà

    }

    }); //fi each
         //   console.log(add_val);
           
      $.each(add_name,function(n,value)
            {
            //    console.log(value);
                htm="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+value+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
            $("#color_form table").append(htm);  
                htm2="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";  
            $("#symbol_form table").append(htm2);
        	htm3="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
            $("#size_form table").append(htm3);
            })

  } //fi if hasClass "add"
    else
    {
//	alert("from start");
    genus_val=[];
 	genus_sp=[];
var iframe=$("iframe#info");    
    var genus=iframe.contents().find('#genusSelect option:selected');
    var specie=iframe.contents().find('#specieSelect option:selected');
   // var genus_specie=genus+" "+specie;

        var genus_size=iframe.contents().find('#specieSelect option').size();
    	// var inputs = [];
    	var htm="<form style='width: 180px;'><span id='loadStatus'></span><div id='picker' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
    	specie.each( function() 
    	        {	  
	
        //        var selected_genus2=iframe.contents().find('#genusSelect option:selected').val();
                genus_val.push(parseInt(this.value)); //this.value donarà 0,1,2...o Bubas,Caccobius...????
                genus_sp.push($(genus).text()+" "+this.text); //this.value donarà
  
                // si 2ª... submit.each( function(index,data) {selected_genus.push(index)}; -->NO NECESSARI!
            //    $.each(selected_genus,function(index,data))
    		htm+="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td style='width: 78px;'>";
            htm+="<input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
    //		$("#symbol_form").append(option);
               });  // fi first EACH>

    	htm+="</form></table>";

    	$("#color_form").append(htm);

        htm2="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
        specie.each( function() {	  
        	htm2+="<tr><td align='center' style='font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";
    	});
    	htm2+="</table></form>";
    	$("#symbol_form").append(htm2);	
    	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    	specie.each( function() {	  
        	htm+="<tr><td align='center' style='font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td><select id='size' class='size'><option value='hidden'>Not visible</option><option value='7'>7</option><option selected value='15'>15</option><option value='20'>20</option></select></td></tr>";
              }); //FI 3r EACH
             htm+="</table></form>"
            $("#size_form").append(htm);
    //        $("#ex2").animate({width:'390',height:'235'},"slow");
    
}

	 $('#info').fadeOut("slow");$("#info").hide(); //si no afegim hide, queda una part de l'iframe (IE, és clar!!)
 $("#send").show();

 $("#ex2").animate({width:'390',height:'235'},"slow");

	//ACTIONS INCLUDED ON SUBMIT CLICK...	

//		  $("#informacio,#restart").show();
		  $("#informacio,#what_todo").hide(); 
		  $("#color_form").fadeIn("slow");
//		  var home=$('#symbol_form a')[0];
		  //home.click(function(){})
		 
$("#informacio,.restart").click(function(){$('#informacio').hide();$('#color_form').show(); 

var form_height=$('#color_form').height() ;
msie=($.browser.msie==true)?true:false; 
//$("#send").show():alert("not msie");
//TO DO !!!   var adapt=function (target,param)
//
if (msie)
{
   $("#send").show();
//   alert("msie");
   $("#ex2").animate({height:form_height},"slow");
   $("#color_form").fadeIn("slow");
}
else {
    major235=function()
    {   $("#color_form").fadeIn("slow");$("#color_form").animate({height:'190'},"slow")
    }
    menor235=function()
    {
 $("#color_form").animate({height:'190',width:"365"},"slow");$("#ex2").animate({height:'240',width:"380"},"slow");      
    }
    (form_height > '235')?major235():menor235();
    $("#send").show();   

      var genus_val=[];
       var genus_name=[];
} //fi if msie

}); //FI SUBMIT_BUTTON CLICK ACTIONS

//SEGUIM AMB ON FRAME LOAD.....
	var f = $.farbtastic('#picker');
    var p = $('#picker').css('opacity', 0.25);
    var selected;
    $('.colorwell')
      .each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
      .focus(function() {
        if (selected) {
          $(selected).css('opacity', 0.75).removeClass('colorwell-selected');
        }
        f.linkTo(this);
        p.css('opacity', 1);
        $(selected = this).css('opacity', 1).addClass('colorwell-selected');
      }); //FI ONFOCUS
	});	  
    }); 

//console.info("fi on submit_button3333?????"); //SÍ
	};

var onLoad_events=function() {
		function SelectSingleNode(xmlDoc, elementPath)
	    {
	        if(window.ActiveXObject)
	        {
	            return xmlDoc.selectSingleNode(elementPath);
	        }
	        else
	        {
	           var xpe = new XPathEvaluator();
	           var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
	           var results = xpe.evaluate(elementPath,xmlDoc,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	           return results.singleNodeValue; 
	        }
	    }
	function updateStatus(msg) {
         document.getElementById("loadStatus").firstChild.nodeValue = msg;
     }

     function getElementsByTagNameNS(node, uri, name) {
	//alert("exec");
         var nodes = format.getElementsByTagNameNS(node, uri, name);
         var pieces = [];
         for(var i=0; i<nodes.length; ++i) {
             pieces.push(format.write(nodes[i]));
         }
         updateOutput(pieces.join(' '));
     }
    var text='Data symbolization (click here and drag me)';

//    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://taxonomicindex.africamuseum.be/edit_wp5/edit_geo/prototype/formularis/select_formulari_sld.html" frameBorder=0 width=380 height=300; background-color=#D7DBDF"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div>    <div id="what_todo">You have previously symbolized your data. <br>Do you want to <a href="#">continue the symbolization</a></strong>(it will keep your previous changes) or <br><br><a href="#"><strong>start again</strong></a> (previous changes will be deleted)</div><div id="color_form"><a style="padding-right:20px;">Start again</a>     <a style="padding-right:20px;">Edit symbol</a><a style="padding-right:20px;">      Add new genus to symbolize</a></div><div id="symbol_form"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form"><a>Back to edit symbol</a></div><button id="send" value="symbolize it!">Symbolize it!</button>';
  var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'<input type="image" class="jqmdX jqmClose"/></div></div><iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0  frameBorder=0 width=380 height=300; background-color=#D7DBDF" src="http://taxonomicindex.africamuseum.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+'&p='+third+'_'+fourth+'"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div>    <div id="what_todo">You have previously symbolized your data. <br>Do you want to <a href="#">continue the symbolization</a></strong>(it will keep your previous changes) or <br><br><a href="#"><strong>start again</strong></a> (previous changes will be deleted)</div><div id="color_form" style="display:block"><a style="padding-right:20px;">Start again</a>     <a style="padding-right:20px;">Edit symbol</a><a style="padding-right:20px;">      Add new to symbolize</a></div><div id="symbol_form" style="display:block"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form" style="display:block"><a>Back to edit symbol</a></div><button id="send" value="symbolize it!">Symbolize it!</button>';
    $('#ex2').append(jq);
    //   $("#ex2").append('<div class="jqmdTC jqDrag" style="position:relative;top:50px">Data symbolization (click here and drag me)</div>');
    bindFrameActions();
	$('#ex2').show();
	$('iframe#info').show();//$("#informacio").show(); 
	repeat=$("#what_todo a")[0];
	start=$("#what_todo a")[1];
	$(repeat).hide();
		$(start).hide();
   $(repeat).bind('click',function(){
        $("#informacio, #what_todo,#send").hide();
        $("#what_todo a,div[id*='_form'],#send").hide();
//        $('div[id*="_form"]').hide();
        //$("#color_form,#send").show(); 
        });//END repeat.bind

	$("#send").click(function()
			{
		Size=[];
		count=$('#color_form option').size();
		Symbol=[];

		//fconsole.info(Symbol);
		Sizers=[];
		Colors=[];
		Opacities=[];
		stroke_widths=[];stroke_colors=[];
		$("#size_form option:selected").each (function(index)
		{
		if (this.value=='hidden')
		{
		Opacities.push(0.0001);
		stroke_widths.push(0.0001);
		stroke_colors.push("#f5f5f5");
		Sizers.push(0.001);	
//		Colors.push("#f5f5f5")		
		}else
		{
			Opacities.push(1);
			stroke_widths.push(0.4);
		Sizers.push(this.value);
		stroke_colors.push("#ed9692");
		}
		});

		Symbols=[];
		$("#symbol_form option:selected").each (function(index)
		{
		Symbols.push(this.value);
		});

		
		$("#color_form input").each (function(index)
		{
		Colors.push(this.value);
		});
		//console.warn("genus values are   :"+genus_val);
		var eval_xml=function()
		{
				var format = new OpenLayers.Format.XML();
		        var doc = null;
	        	OpenLayers.loadURL(url, null, null, loadSuccess, loadFailure);
		}


			 url=edit_sp_points.params.SLD;
			 OpenLayers.loadURL(url, null, null, loadSuccess, loadFailure);
			function loadSuccess(request) {
	          //  updateStatus("");
	            if(!request.responseXML.documentElement) {
	                doc = format.read(request.responseText);
	//alert(doc);
	            } 
				else 
				{


						$.get(url,{},function(xml)
						{
							var format = new OpenLayers.Format.XML();
							 var root = xml.documentElement;

							 FeatureType=root.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];
						
								$("Rule",xml).each(function(index,s) 
								  {
									
         							/*
										if (index==0)
										{
											console.warn("index is"+index);
											$(this).remove();
										}*/
														var name=$(this).find("Name").text();
														name_val=$(this).find("Name").get(0);

														symbol_val=$(this).find("WellKnownName").get(0);
														symbol_val=symbol_val.firstChild;
														var size=$(this).find("Size").children();
														$(size).each(function(i)
															{
															size=this.firstChild
															})
														
													 	var opacity=$(this).find("CssParameter[name='fill-opacity']").get(0);
												        opacity=opacity.firstChild;
														var fill_color=$(this).find("Fill").find("CssParameter").children();
														$(fill_color).each(function()
														{
														fill_color=this.firstChild;
														//console.warn(fill_color)
														})
														var	stroke_color=$(this).find("CssParameter[name='stroke']").children();
														$(stroke_color).each(function()
														{
														stroke_color=this.firstChild;
														})
														
														var	stroke_width=$(this).find("CssParameter[name='stroke-width']").children();
															$(stroke_width).each(function()
															{
															stroke_width=this.firstChild;
															})

														$.each(genus_sp,function(n,info)
														{
																
														if (name==info)
														{	
//																console.warn("name is"+name);
//																console.warn("info is"+info);																	
														name2=name_val.firstChild;
														name2.nodeValue=name;
														size.nodeValue=Sizers[n];
														opacity.nodeValue=Opacities[n];
														stroke_width.nodeValue=stroke_widths[n];
														stroke_color.nodeValue=stroke_colors[n];
														//console.info(fill_color)
														fill_color.nodeValue=Colors[n];
														symbol_val.nodeValue=Symbols[n];
													//		console.log("yyes for"+n)
														}
													//	console.info(size)

														})
										})
											    var text = format.write(xml);
									
								
										$.ajax({url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/test_xmls2.php',
														processData:false, type:'POST',dataType:'text',data:'data='+text+'&user='+userid+'&to_filter=3_4',
														success:function(data)
														{
															 edit_sp_points.params.SLD=data;
															 edit_sp_points.redraw();
														var sp_legend=document.getElementById("species_legend");
														sp_legend.setAttribute("src",legend='http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&SLD='+data);
														}
														});
														
														
														
									
										})
					

						
/*
				
								*/
		}
	
}
   function loadFailure(request) {
        //updateStatus("failed to load");
    }
	//	print_sld();
		});

	//$(start).bind('click',function(){$(".ex2trigger").trigger("click");});
$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
}
onLoad_events();

//	});
