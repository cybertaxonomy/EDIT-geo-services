//$(document).ready(function(){
//PROBLEMES AMB IEXPLORER--> ON SUBMIT, RECARREGA IFRAME, TORNANT A EXECUTAR-SE LES ACCIONS ASSOCIADES

//SLD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	if ($('#3_4th').children().length!==0)
	{
	$('#3_4th').empty();
	}
var bindFrameActions=function() {

	var to_start=$('#color_form3 a')[0];
//	$(to_start).hide();	
	var add=$('#color_form3 a')[2];
//	$(add).hide();
$('#3_4th').show()
 $('iframe#3_4thinfo').fadeIn("slow");
//.not('iframe#info').hide();
$('#3_4th').jqm({
    overlay: 30
})
$('div[id*="_form3"]').hide();
$("#send3").hide();
$("#informacio,#what_todo").hide();
	//$("#send3").hide();
	//$("#informacio").hide();
 var iframe=$('iframe#3_4thinfo'); 
msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://edit.br.fgov.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');
}
else 
{
$('input.jqmdX').css('background','url(http://edit.br.fgov.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
}
 

 $(iframe).bind('load', function()
{
	//alert("carregant iframe");
	//BIND EVENTS ONLOAD 
    iframe=$("iframe#3_4thinfo");

    submit_button=iframe.contents().find("#submit");   
//console.log(submit_button);
   $('#3_4th input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')})

$('#3_4th input.jqmdX').click(function(){$('#3_4th').hide(); 
 if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));});
 
if (add==true)
{

var submit_button=iframe.contents().find("#submit");    


	submit_button.val('Add your selection');

	submit_button.addClass("add"); 



                 }
                 
   $("#3_4th").animate({width:'380',height:'325'},"slow");
     var to_size=$('#symbol_form3 a')[0];
	  var back_color=$('#symbol_form3 a')[1];
	var to_start=$('#color_form3 a')[0];

	//WHEN WE FORCE STARTING THE SYMBOLIZATION AGAIN... JUST PUT THE INICIAL VALUES AGAIN AND PRINT IT
	 
	$(to_start).click(function(){
add=false;
	//	var genus_size=iframe.contents().find('#genusSelect option').size();
    edit_sp_points.params.SLD=initial_sp_sld,
    edit_sp_points.redraw();
$("iframe#3_4thinfo").attr('src','http://edit.br.fgov.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+'&p='+third+"_"+fourth);



var image=document.getElementById("species_legend");
	image.setAttribute("src",'http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&sld='+edit_sp_points.params.SLD);
$('div[id*="_form3"]').hide();
$("#send3").hide();
$("#informacio,#what_todo").hide();
    $("#color_form3 form ,#symbol_form3 form,#size_form3 table").hide().empty(); 
    $("#picker3").remove();
$("iframe#3_4thinfo").fadeIn("slow");
$("#3_4th").animate({width:'380',height:'325'},"slow");

    if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));
$("iframe#3_4thinfo").attr('src','http://edit.br.fgov.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+'&p='+third+"_"+fourth);
return false;
	  }); //fi $(to_start).click 
	
	var to_symbol=$('#color_form3 a')[1];

	$(to_symbol).click(function() {
		//alert("to symbol");
		$('#color_form3').slideUp("quick");
	    var form_width=$('#symbol_form3').width() ;
	    $("#3_4th").animate({width: form_width}, "slow");
	    $("#symbol_form3").animate({height:'190'},"slow");
	});
	var add_genus=$('#color_form3 a')[2];
	$(add_genus).click(function() { //alert("adding genus");
	var iframe=	$("iframe#3_4thinfo");

add=true;
$("iframe#3_4thinfo").attr('src','http://edit.br.fgov.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+"&p="+third+"_"+fourth);

$("iframe#3_4thinfo").fadeIn(2000)
	var submit_button=iframe.contents().find("#submit");     //"addd these genus"

    $("#color_form3,#informacio,#send3").hide();
	})

	$(to_size).click(function(){$('#symbol_form3').slideUp("quick");
	$('#size_form3').show();
	var size_width=$('#size_form3').width();
	$('#size_form3').show();
	 $("#3_4th").animate({width: size_width}, "slow");});

	 $(back_color).click(function(){
	 $('#symbol_form3').slideUp("quick");
	 $('#color_form3').show();
	  $("#3_4th").animate({width: "365"}, "slow");
	  });
	
	 $("#size_form3 a").click(function(){$('#size_form3').slideUp("quick");$('#symbol_form3').show();
	  })
	//END OF BIND ONLOAD EVENTS 

   submit_button.click(
   function()
   {

var add_genus=[];
var add_val=[];
var add_name=[];
 //alert(submit_button.hasClass("add"));  
	var iframe=	$("iframe#3_4thinfo");
	var submit_button=iframe.contents().find("#submit");  
//alert(submit_button.hasClass("add"));	
    if(submit_button.hasClass("add"))
    {
      //  alert("adding class button");
    
    var iframe=$("iframe#3_4thinfo");
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
            $("#color_form3 table").append(htm);  
                htm2="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";  
            $("#symbol_form3 table").append(htm2);
        	htm3="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
            $("#size_form3 table").append(htm3);
            })

  } //fi if hasClass "add"
    else
    {
//	alert("from start");
    genus_val=[];
 	genus_sp=[];
var iframe=$("iframe#3_4thinfo");    
    var genus=iframe.contents().find('#genusSelect option:selected');
    var specie=iframe.contents().find('#specieSelect option:selected');
   // var genus_specie=genus+" "+specie;

        var genus_size=iframe.contents().find('#specieSelect option').size();
    	// var inputs = [];
    	var htm="<form style='width: 180px;'><span id='loadStatus'></span><div id='picker3' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
    	specie.each( function() 
    	        {	  
	
        //        var selected_genus2=iframe.contents().find('#genusSelect option:selected').val();
                genus_val.push(parseInt(this.value)); //this.value donarà 0,1,2...o Bubas,Caccobius...????
                genus_sp.push($(genus).text()+" "+this.text); //this.value donarà
  
                // si 2ª... submit.each( function(index,data) {selected_genus.push(index)}; -->NO NECESSARI!
            //    $.each(selected_genus,function(index,data))
    		htm+="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td style='width: 78px;'>";
            htm+="<input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
    //		$("#symbol_form3").append(option);
               });  // fi first EACH>

    	htm+="</form></table>";


    	$("#color_form3").append(htm);

        htm2="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
        specie.each( function() {	  
        	htm2+="<tr><td align='center' style='font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";
    	});
    	htm2+="</table></form>";
    	$("#symbol_form3").append(htm2);	
    	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    	specie.each( function() {	  
        	htm+="<tr><td align='center' style='font-size:8pt'>"+$(genus).text()+" "+this.text+"</td><td><select id='size' class='size'><option selected value='15'>15</option><option value='hidden'>Not visible</option><option value='7'>7</option><option value='20'>20</option></select></td></tr>";
              }); //FI 3r EACH
             htm+="</table></form>"
            $("#size_form3").append(htm);
    //        $("#3_4th").animate({width:'390',height:'235'},"slow");
    
}

	  $('iframe#3_4thinfo').fadeOut("slow");$("#info").hide(); //si no afegim hide, queda una part de l'iframe (IE, és clar!!)
 $("#send3").show();

 $("#3_4th").animate({width:'390',height:'235'},"slow");

	//ACTIONS INCLUDED ON SUBMIT CLICK...	

//		  $("#informacio,#restart").show();
		  $("#informacio,#what_todo").hide(); 
		  $("#color_form3").fadeIn("slow");
//		  var home=$('#symbol_form3 a')[0];
		  //home.click(function(){})
		 
$("#informacio,.restart").click(function(){$('#informacio').hide();$('#color_form3').show(); 

var form_height=$('#color_form3').height() ;
msie=($.browser.msie==true)?true:false; 
//$("#send3").show():alert("not msie");
//TO DO !!!   var adapt=function (target,param)
//
if (msie)
{
   $("#send3").show();
//   alert("msie");
   $("#3_4th").animate({height:form_height},"slow");
   $("#color_form3").fadeIn("slow");
}
else {
    major235=function()
    {   $("#color_form3").fadeIn("slow");$("#color_form3").animate({height:'190'},"slow")
    }
    menor235=function()
    {
 $("#color_form3").animate({height:'190',width:"365"},"slow");$("#3_4th").animate({height:'240',width:"380"},"slow");      
    }
    (form_height > '235')?major235():menor235();
    $("#send3").show();   

      var genus_val=[];
       var genus_name=[];
} //fi if msie

}); //FI SUBMIT_BUTTON CLICK ACTIONS

//SEGUIM AMB ON FRAME LOAD.....
	var f = $.farbtastic('#picker3');
    var p = $('#picker3').css('opacity', 0.25);
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

  var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'<input type="image" class="jqmdX jqmClose"/></div></div><iframe id="3_4thinfo" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0  frameBorder=0 width=380 height=300; background-color=#D7DBDF" src="http://edit.br.fgov.be/edit_wp5/geo/formularis/select_by_specie.html?userid='+userid+'&p='+third+'_'+fourth+'"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div>    <div id="what_todo">You have previously symbolized your data. <br>Do you want to <a href="#">continue the symbolization</a></strong>(it will keep your previous changes) or <br><br><a href="#"><strong>start again</strong></a> (previous changes will be deleted)</div><div id="color_form3" style="display:block"><a style="padding-right:20px;">Start again</a>     <a style="padding-right:20px;">Edit symbol</a><a style="padding-right:20px;">      Add new to symbolize</a></div><div id="symbol_form3" style="display:block"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form3" style="display:block"><a>Back to edit symbol</a></div><button id="send3" value="symbolize it!">Symbolize it!</button>';
    $('#3_4th').append(jq);

    bindFrameActions();
	$('#3_4th').show();
	 $('iframe#3_4thinfo').show();//$("#informacio").show(); 
	repeat=$("#what_todo a")[0];
	start=$("#what_todo a")[1];
	$(repeat).hide();
		$(start).hide();
   $(repeat).bind('click',function(){
        $("#informacio, #what_todo,#send3").hide();
        $("#what_todo a,div[id*='_form3'],#send3").hide();
//        $('div[id*="_form3"]').hide();
        //$("#color_form3,#send3").show(); 
        });//END repeat.bind

	$("#send3").click(function()
			{
		Size=[];
		count=$('#color_form3 option').size();
		Symbol=[];

		//fconsole.info(Symbol);
		Sizers=[];
		Colors=[];
		Opacities=[];
		stroke_widths=[];stroke_colors=[];
		$("#size_form3 option:selected").each (function(index)
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
		$("#symbol_form3 option:selected").each (function(index)
		{
		Symbols.push(this.value);
		});

		
		$("#color_form3 input").each (function(index)
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
var format = new OpenLayers.Format.XML();
	                doc = format.read(request.responseText);
//console.warn(doc)
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
									
								
										$.ajax({url:'http://edit.br.fgov.be/edit_wp5/geo/test_xmls2.php',
														processData:false, type:'POST',dataType:'text',data:'data='+text+'&user='+userid+'&to_filter=3_4',
														success:function(data)
														{
															 edit_sp_points.params.SLD=data;
															 edit_sp_points.redraw();
														var sp_legend=document.getElementById("species_legend");
														sp_legend.setAttribute("src",legend='http://193.190.116.6:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&SLD='+data);
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

	//$(start).bind('click',function(){$(".3_4thtrigger").trigger("click");});
$('#3_4th')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
}
onLoad_events();

//	});
