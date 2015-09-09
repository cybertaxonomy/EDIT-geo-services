//$(document).ready(function(){
//PROBLEMES AMB IEXPLORER--> ON SUBMIT, RECARREGA IFRAME, TORNANT A EXECUTAR-SE LES ACCIONS ASSOCIADES

//SLD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var d;
var bindFrameActions=function() {
	
	var to_start=$('#color_form2 a')[0];
//	$(to_start).hide();	
	var add=$('#color_form2 a')[2];
//	$(add).hide();

 $('iframe#4thinfo').fadeIn("slow");
//.not('iframe#info').hide();
$('#4th').jqm({
    overlay: 30
})
$('div[id*="_form2"]').hide();
$("#send2").hide();
$("#informacio,#what_todo").hide();
	//$("#send2").hide();
	//$("#informacio").hide();
 var iframe=$('iframe#4thinfo'); 
msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');
}
else 
{
$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
}
 

 $(iframe).bind('load', function()
{
	//alert("carregant iframe");
	//BIND EVENTS ONLOAD 
    iframe=$("iframe#4thinfo");

    submit_button=iframe.contents().find("#submit");   
//console.log(submit_button);
    $('#4th input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#4th').hide(); 
 if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));});
  //submit is the id of
//    $("#color_form2 form ,#symbol_form2 form,#size_form2 form").empty(); 
   
if (add==true)
{

var submit_button=iframe.contents().find("#submit");    


	submit_button.val('Add your selection');

	submit_button.addClass("add"); 



                 }
              
   $("#4th").animate({width:'380',height:'325'},"slow");
     var to_size=$('#symbol_form2 a')[0];
	  var back_color=$('#symbol_form2 a')[1];
	var to_start=$('#color_form2 a')[0];

	//WHEN WE FORCE STARTING THE SYMBOLIZATION AGAIN... JUST PUT THE INICIAL VALUES AGAIN AND PRINT IT
	 
	$(to_start).click(function(){
add=false;
	//	var genus_size=iframe.contents().find('#categorySelect option').size();
    edit_4th_points.params.SLD=initial_4th_sld;
$("iframe#4thinfo").attr('src','http://edit.africamuseum.be/edit_wp5/geo/formularis/select_by_fourth.html?userid='+userid+"&p="+third+"_"+fourth);


edit_4th_points.redraw();
var g_image=document.getElementById("4th_legend");
	g_image.setAttribute("src",legend='http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_4th_points.params.SLD)+"date="+new Date();
$('div[id*="_form2"]').hide();
$("#send2").hide();
$("#informacio,#what_todo").hide();
    $("#color_form2 form ,#symbol_form2 form,#size_form2 table").hide().empty(); 
    $("#picker2").remove();
$(iframe).fadeIn("slow");

    if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Symbolyze it'));

	  }); //fi $(to_start).click 
	
	var to_symbol=$('#color_form2 a')[1];

	$(to_symbol).click(function() {
		//alert("to symbol");
		$('#color_form2').slideUp("quick");
	    var form_width=$('#symbol_form2').width() ;
	    $("#4th").animate({width: form_width}, "slow");
	    $("#symbol_form2").animate({height:'190'},"slow");
	});
	var add_genus=$('#color_form2 a')[2];
	$(add_genus).click(function() { //alert("adding genus");

	var iframe=$("iframe#4thinfo");

add=true;
$("iframe#4thinfo").attr('src','http://edit.africamuseum.be/edit_wp5/geo/formularis/select_by_fourth.html?userid='+userid+"&p="+third+"_"+fourth);

$("iframe#4thinfo").fadeIn(2000)
var submit_button=iframe.contents().find("#submit");    
//console.warn(submit_button)

	submit_button.val('Add your selection');

	submit_button.addClass("add"); 


//	$('.jqmdTR *').hide(); $('.jqmdTC,.jqDrag').show();
	$("iframe#4thinfo").fadeIn("slow");
    $("#color_form2,#informacio,#send2").hide();
	})

	$(to_size).click(function(){$('#symbol_form2').slideUp("quick");
	$('#size_form2').show();
	var size_width=$('#size_form2').width();
	$('#size_form2').show();
	 $("#4th").animate({width: size_width}, "slow");});

	 $(back_color).click(function(){
	 $('#symbol_form2').slideUp("quick");
	 $('#color_form2').show();
	  $("#4th").animate({width: "365"}, "slow");
	  });
	
	 $("#size_form2 a").click(function(){$('#size_form2').slideUp("quick");$('#symbol_form2').show();
	  })
	//END OF BIND ONLOAD EVENTS 

   submit_button.click(
   function()
   {

var add_genus=[];
var add_val=[];
var add_name=[]; 
	var iframe=$("iframe#4thinfo");
	var submit_button=iframe.contents().find("#submit");  

    if(submit_button.hasClass("add"))
    {
      //  alert("adding class button");   
    var iframe=$("iframe#4thinfo");
 	var add_genus=iframe.contents().find('#genusSelect option:selected');
	$(add_genus).each( function(){  
		
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
          add_name.push(this.text);
			d.push(this.text)
          genus_val.push(parseInt(this.value));
    }

    }); //fi each
           //   console.log('genus val is'+genus_val);
           
      $.each(add_name,function(n,value)
            {
            //    console.log(value);
                htm="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+value+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
            $("#color_form2 table").append(htm);  
                htm2="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";  
            $("#symbol_form2 table").append(htm2);
        	htm3="<tr><td align='center' style='font-size:8pt'>"+value+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
            $("#size_form2 table").append(htm3);
            })

  } //fi if hasClass "add"
    else
    {
//	alert("from start");
    genus_val=[];
 	genus_name=[];
 d=[];
var iframe=$("iframe#4thinfo");    
    var submit=iframe.contents().find('#genusSelect option:selected');
        var genus_size=iframe.contents().find('#genusSelect option').size();
    	// var inputs = [];
    	var htm="<form style='width: 180px;'><span id='loadStatus'></span><div id='picker2' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
    	submit.each( function() 
    	        {	  
        //        var selected_genus2=iframe.contents().find('#categorySelect option:selected').val();
                genus_val.push(parseInt(this.value)); //this.value donarà 0,1,2...o Bubas,Caccobius...????
                genus_name.push(this.text); //this.value donarà
				d.push(this.text);
                // si 2ª... submit.each( function(index,data) {selected_genus.push(index)}; -->NO NECESSARI!
            //    $.each(selected_genus,function(index,data))
    		htm+="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+escape(this.text)+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
    //		$("#symbol_form2").append(option);
               });  // fi first EACH>
    	htm+="</form></table>";
    	$("#color_form2").append(htm);

        htm2="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
        submit.each( function() {	  
        	htm2+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";
    	});
    	htm2+="</table></form>";
    	$("#symbol_form2").append(htm2);	
    	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    	submit.each( function() {	  
        	htm+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
              }); //FI 3r EACH
             htm+="</table></form>"
            $("#size_form2").append(htm);

}

	 $('#4thinfo').fadeOut("slow");$("#info").hide(); //si no afegim hide, queda una part de l'iframe (IE, és clar!!)
 $("#send2").show();

 $("#4th").animate({width:'390',height:'235'},"slow");

	//ACTIONS INCLUDED ON SUBMIT CLICK...	

		  $("#informacio,#what_todo").hide(); 
		  $("#color_form2").fadeIn("slow");
	 
$("#informacio,.restart").click(function(){$('#informacio').hide();$('#color_form2').show(); 

var form_height=$('#color_form2').height() ;
msie=($.browser.msie==true)?true:false; 
//$("#send2").show():alert("not msie");
//TO DO !!!   var adapt=function (target,param)
//
if (msie)
{
   $("#send2").show();
//   alert("msie");
   $("#4th").animate({height:form_height},"slow");
   $("#color_form2").fadeIn("slow");
}
else {
    major235=function()
    {   $("#color_form2").fadeIn("slow");$("#color_form2").animate({height:'190'},"slow")
    }
    menor235=function()
    {
 $("#color_form2").animate({height:'190',width:"365"},"slow");$("#4th").animate({height:'240',width:"380"},"slow");      
    }
    (form_height > '235')?major235():menor235();
    $("#send2").show();   

      var genus_val=[];
       var genus_name=[];
} //fi if msie

}); //FI SUBMIT_BUTTON CLICK ACTIONS

//SEGUIM AMB ON FRAME LOAD.....
//console.info("fi on submit_button?????"); //FALS!!!
//alert("mes de 10"):alert("menor de 10")
//$("#color_form2").animate({height:'190'},"slow");


	var f = $.farbtastic('#picker2');
    var p = $('#picker2').css('opacity', 0.25);
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

     function getElementsByTagNameNS(node, uri, name) 
	{
	//alert("exec");
         var nodes = format.getElementsByTagNameNS(node, uri, name);
         var pieces = [];
         for(var i=0; i<nodes.length; ++i) {
             pieces.push(format.write(nodes[i]));
         }
         updateOutput(pieces.join(' '));
     }
    var text='Data symbolization (click here and drag me)';

  var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'<input type="image" class="jqmdX jqmClose"/></div></div><iframe id="4thinfo" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0  frameBorder=0 width=380 height=300; background-color=#D7DBDF" src="http://edit.africamuseum.be/edit_wp5/geo/formularis/select_by_fourth.html?userid='+userid+'&p='+third+'_'+fourth+'"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div>    <div id="what_todo">You have previously symbolized your data. <br>Do you want to <a href="#">continue the symbolization</a></strong>(it will keep your previous changes) or <br><br><a href="#"><strong>start again</strong></a> (previous changes will be deleted)</div><div id="color_form2" style="display:block"><a style="padding-right:20px;">Start again</a>     <a style="padding-right:20px;">Edit symbol</a><a style="padding-right:20px;">      Add new to symbolize</a></div><div id="symbol_form2" style="display:block"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form2" style="display:block"><a>Back to edit symbol</a></div><button id="send2" value="symbolize it!">Symbolize it!</button>';
if ($('#4th').children().length!==0)
{
$('#4th').empty();
}  
  $('#4th').append(jq);
    //   $("#4th").append('<div class="jqmdTC jqDrag" style="position:relative;top:50px">Data symbolization (click here and drag me)</div>');
    bindFrameActions();
	$('#4th').show();
	 $('iframe#4thinfo').show();//$("#informacio").show(); 
	repeat=$("#what_todo a")[0];
	start=$("#what_todo a")[1];
	$(repeat).hide();
		$(start).hide();
   $(repeat).bind('click',function(){
        $("#informacio, #what_todo,#send2").hide();
        $("#what_todo a,div[id*='_form2'],#send2").hide();
//        $('div[id*="_form2"]').hide();
        //$("#color_form2,#send2").show(); 
        });//END repeat.bind

	$("#send2").click(function()
			{
				url=edit_4th_points.params.SLD;
			//	console.log(d)
				Colors=[];
							$("#color_form2 input").each (function(index)
							{
							Colors.push(this.value);
							});
								Symbol=[];
								$("#symbol_form2 option:selected").each (function()
								{
								Symbol.push(this.value);

								});
								//fconsole.info(Symbol);
								Sizers=[];
								$("#size_form2 option:selected").each (function(index)
								{
								Sizers.push(this.value);
								});				
							
					$.get(url,{},function(xml) 
				{
 var iframe= $('iframe#4thinfo'); 
				var format = new OpenLayers.Format.XML();
			 	var root = xml.documentElement;
			 	FeatureType=root.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];


	
				sld_genus=[];
				$("Rule",xml).each(function(index,s) {						
	var name=$(this).find("Name").text();							
					sld_genus.push(name)
					
				})

					to_add=[];

			
						for (i=0;i<d.length;i++)
						{
	if ($.inArray(d[i],sld_genus)==-1)   //the selected genus are not present on the actual SLD
									{
								
											to_add.push(d[i]);
										//	
									
							}
						}	
												
							if (to_add.length>0)
							{
							
								$("FeatureTypeStyle",xml).each(function()
									{
										var text_to_add='';
										var format = new OpenLayers.Format.XML();
										$("Rule",xml).each(function()
										{

													text_to_add+=format.write($(this).get(0));

										})	
								//	console.log(to_add)	
								$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/construct_sld_test.php',processData:false, type:'POST',
										dataType:'text',data:'data='+to_add+'&userid='+userid+'&to_filter=genus&sld='+text_to_add,
										success:function(new_xml)
																{
																	setTimeout(function() { 	
																var url=new_xml;
															
																		$.get(new_xml,{},function(xml2) 
																	{
															    
																
																
																
																var g=[];

																	$("Rule",xml2).each(function(i,n)
																	{
																		var g_name=$(this).find("Name").text();

															
																	    g.push(g_name);

																	})
																//	console.info(g);
																	var p=[];
																			$(d).each(function(index,info)
																			{
																				
																				var position=$.inArray(info,g);
																		     //   console.log(info+"present on position"+position);
															
															var s=$(xml2).find("Rule")[position];
																		   
															var fill=$(s).find("Fill").find("CssParameter").children();													    
															$(fill).each(function()
																			{
																			fill_color=this.firstChild;
																			fill_color.nodeValue=Colors[index]
																			})
															symbol_val=$(s).find("WellKnownName");
															(symbol_val).each(function(i)
																					{
																					symbol_val=this.firstChild;
																					//console.warn(symbol_val)
																					symbol_val.nodeValue=Symbol[index];
																				})
														//	console.info(symbol_val.nodeValue)
														//	symbol_val.nodeValue="ssssss";
															var size=$(s).find("Size").children();
															$(size).each(function(i)
																					{
																					size=this.firstChild;
																					size.nodeValue=Sizers[index];
																				})	
																					/*
															var	stroke_color=$(s).find("CssParameter[name='stroke']").children();
																					$(stroke_color).each(function()
																					{
																					stroke_color=this.firstChild;
																					})							
																					*/								
																			})
																
																	//if ($.inArray(d[i],sld_genus)==-1)  
												//					console.log(g)
																
												
																//	console.log(g_name)		
																		//	console.dirxml(xml2)
																			var text = format.write(xml2);
																	$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/test_xmls2.php',
																			processData:false, type:'POST',dataType:'text',data:'data='+text+'&user='+userid+"&to_filter=fourth",success:function(data){ edit_4th_points.params.SLD=data;edit_4th_points.redraw();
																			var g_image=document.getElementById("4th_legend");
																			g_image.setAttribute("src",legend='http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&SLD='+data+'?date='+new Date());
																			}});													

																	})
																	},1000);
																}
													});
											})	
							}		
							else
							{
						
									var eval_xml=function()
									{
											var format = new OpenLayers.Format.XML();
									        var doc = null;
								        	OpenLayers.loadURL(url, null, null, loadSuccess, loadFailure);
									}
									var print_sld=function()
									{ 
										var format = new OpenLayers.Format.XML();
								        var doc = null;

										 url=edit_4th_points.params.SLD;
										 OpenLayers.loadURL(url, null, null, loadSuccess, loadFailure);
										function loadSuccess(request) {
								          //  updateStatus("");
								            if(!request.responseXML.documentElement) {
								                doc = format.read(request.responseText);
								//alert(doc);
								            } else {
								                doc = request.responseXML;
											 var root = doc.documentElement;
											var FeatureType=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];


														$.each(genus_val,function(info,n)
														{		
															Rule=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','Rule')[n];	

 														size=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','Size')[n];

														symbol_tag=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','WellKnownName')[n];	

									//STUPID IE!!!		
if ($.browser.msie==true) { s=0; } else {s=1;};				
														if (n==0)
														{

														fill_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[0];				

														stroke_color=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','CssParameter')[1];					
														stroke_width=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','CssParameter')[2];

														color=fill_color.childNodes[s].firstChild;

														color.nodeValue=Colors[n];

														size=size.childNodes[s].firstChild;

														size.nodeValue=Sizers[n];


														symbol=symbol_tag.firstChild;


														symbol.nodeValue=Symbols[n];


		}
													else
														{					
																var	fill_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[0];
														var	stroke_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[1];

																var	stroke_width=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[2];

														 size=size.childNodes[s].firstChild;	


														   size.nodeValue=Sizers[info];							
															color=fill_color.childNodes[s].firstChild;

															color.nodeValue=Colors[info];	

															symbol=symbol_tag.firstChild;

															symbol.nodeValue=Symbols[info];

														}
														});
							
														    var text = format.write(doc);
												$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/test_xmls2.php',
															processData:false, type:'POST',dataType:'text',data:'data='+text+'&user='+userid+"&to_filter=fourth",success:function(data){ edit_4th_points.params.SLD=data;edit_4th_points.redraw();
															var g_image=document.getElementById("4th_legend");
															g_image.setAttribute("src",legend='http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&SLD='+data+'?date='+new Date());
															}});
														
									}
								}
							}
							   function loadFailure(request) {
							        //updateStatus("failed to load");
							    }
									print_sld();
						
							}		
						
				
			}) //end get
		Size=[];
		count=$('#color_form2 option').size();
		Symbol=[];
		$("#symbol_form2 option:selected").each (function()
		{
		Symbol.push(this.value);

		});
		//fconsole.info(Symbol);
		Sizers=[];
		$("#size_form2 option:selected").each (function(index)
		{
		Sizers.push(this.value);
		});

		Symbols=[];
		$("#symbol_form2 option:selected").each (function(index)
		{
		Symbols.push(this.value);
		});

		Colors=[];
		$("#color_form2 input").each (function(index)
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
		var print_sld=function()
		{ 
			var format = new OpenLayers.Format.XML();
	        var doc = null;
	
			 url=edit_4th_points.params.SLD;
			 OpenLayers.loadURL(url, null, null, loadSuccess, loadFailure);
			function loadSuccess(request) {
							            if(!request.responseXML.documentElement) {
								                doc = format.read(request.responseText);

								            } else {
								                doc = request.responseXML;
											 var root = doc.documentElement;	FeatureType=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];

						
							$.each(genus_val,function(info,n)
							{		
								Rule=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','Rule')[n];	

							size=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','Size')[n];

							symbol_tag=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','WellKnownName')[n];	
	
		//STUPID IE!!!		
	if ($.browser.msie==true) { s=0; } else {s=1;};				
							if (n==0)
							{

							fill_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[0];				

							stroke_color=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','CssParameter')[1];					
							stroke_width=format.getElementsByTagNameNS(FeatureType,'http://www.opengis.net/sld','CssParameter')[2];

							color=fill_color.childNodes[s].firstChild;

							color.nodeValue=Colors[n];
						
							size=size.childNodes[s].firstChild;
				
							size.nodeValue=Sizers[n];
				
	
							symbol=symbol_tag.firstChild;

				
							symbol.nodeValue=Symbols[n];
							
							
							}
						else
							{					
									var	fill_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[0];
									var	stroke_color=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[1];

									var	stroke_width=format.getElementsByTagNameNS(Rule,'http://www.opengis.net/sld','CssParameter')[2];

							 size=size.childNodes[s].firstChild;	


							   size.nodeValue=Sizers[info];							
								color=fill_color.childNodes[s].firstChild;
						
								color.nodeValue=Colors[info];	
						
								symbol=symbol_tag.firstChild;
						
								symbol.nodeValue=Symbols[info];
						
							}
							});
								
		}
	}
}
   function loadFailure(request) {
        //updateStatus("failed to load");
    }
		print_sld();
		});

	//$(start).bind('click',function(){$(".4thtrigger").trigger("click");});
$('#4th')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
}
onLoad_events();

//	});
