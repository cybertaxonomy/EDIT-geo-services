//$(document).ready(function(){
//PROBLEMES AMB IEXPLORER--> ON SUBMIT, RECARREGA IFRAME, TORNANT A EXECUTAR-SE LES ACCIONS ASSOCIADES

//SLD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var d;
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

 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/img/close.gif)  no-repeat top left').css('width','15px');
}
else 
{
$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/img/close.gif) no-repeat top left');
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
	//	var genus_size=iframe.contents().find('#categorySelect option').size();
    edit_4th_points.params.SLD=initial_4th_sld;
$("iframe#info").attr('src','http://edit.africamuseum.be/edit_wp5/geo/formularis/select_by_fourth.html?userid='+userid+"&p="+third+"_"+fourth);


edit_4th_points.redraw();
var g_image=document.getElementById("4th_legend");
	g_image.setAttribute("src",legend='http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_4th_points.params.SLD)+"date="+new Date();
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
	var submit_button=iframe.contents().find("#submit");     
	submit_button.val('Add your selection');
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

//  $("#info").hide();   
// alert("clicking me");

//       console.log(genus_val); OK!!!

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
  // console.warn(add_genus);
    
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
        //  add_val.push(parseInt(this.value));
          add_name.push(this.text);
			d.push(this.text)
          genus_val.push(parseInt(this.value));
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
 	genus_name=[];
 d=[];
var iframe=$("iframe#info");    
    var submit=iframe.contents().find('#genusSelect option:selected');
        var genus_size=iframe.contents().find('#genusSelect option').size();
    	// var inputs = [];
    	var htm="<form style='width: 180px;'><span id='loadStatus'></span><div id='picker' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
    	submit.each( function() 
    	        {	  
        //        var selected_genus2=iframe.contents().find('#categorySelect option:selected').val();
                genus_val.push(parseInt(this.value)); //this.value donarà 0,1,2...o Bubas,Caccobius...????
                genus_name.push(this.text); //this.value donarà
				d.push(this.text);
                // si 2ª... submit.each( function(index,data) {selected_genus.push(index)}; -->NO NECESSARI!
            //    $.each(selected_genus,function(index,data))
    		htm+="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+escape(this.text)+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
    //		$("#symbol_form").append(option);
               });  // fi first EACH>
    	htm+="</form></table>";

    	$("#color_form").append(htm);

        htm2="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
        submit.each( function() {	  
        	htm2+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";
    	});
    	htm2+="</table></form>";
    	$("#symbol_form").append(htm2);	
    	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    	submit.each( function() {	  
        	htm+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
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
//console.info("fi on submit_button?????"); //FALS!!!
//alert("mes de 10"):alert("menor de 10")
//$("#color_form").animate({height:'190'},"slow");


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

  var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'<input type="image" class="jqmdX jqmClose"/></div></div><iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0  frameBorder=0 width=380 height=300; background-color=#D7DBDF" src="http://edit.africamuseum.be/edit_wp5/geo/formularis/select_by_fourth.html?userid='+userid+'&p='+third+'_'+fourth+'"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div>    <div id="what_todo">You have previously symbolized your data. <br>Do you want to <a href="#">continue the symbolization</a></strong>(it will keep your previous changes) or <br><br><a href="#"><strong>start again</strong></a> (previous changes will be deleted)</div><div id="color_form" style="display:block"><a style="padding-right:20px;">Start again</a>     <a style="padding-right:20px;">Edit symbol</a><a style="padding-right:20px;">      Add new to symbolize</a></div><div id="symbol_form" style="display:block"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form" style="display:block"><a>Back to edit symbol</a></div><button id="send" value="symbolize it!">Symbolize it!</button>';
if ($('#ex2').children().length!==0)
{
$('#ex2').empty();
}  
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
				url=edit_4th_points.params.SLD;
			//	console.log(d)
				Colors=[];
							$("#color_form input").each (function(index)
							{
							Colors.push(this.value);
							});
								Symbol=[];
								$("#symbol_form option:selected").each (function()
								{
								Symbol.push(this.value);

								});
								//fconsole.info(Symbol);
								Sizers=[];
								$("#size_form option:selected").each (function(index)
								{
								Sizers.push(this.value);
								});				
							
					$.get(url,{},function(xml) 
				{
 var iframe=$('iframe#info'); 
				var format = new OpenLayers.Format.XML();
			 	var root = xml.documentElement;
			 	FeatureType=root.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];
				sld_genus=[];
				$("Rule",xml).each(function(index,s) {						
					var name=$(this).find("Name").text();							
					sld_genus.push(name)
					
				})
					to_add=[];
				//	var d=[];
				//	var g=new Object();
					iframe.contents().find('#genusSelect option:selected').each(function()
					{
						//d.push(this.text);
				//		var t=this.text;
				//	g.t=new Object();
					});
					
						for (i=0;i<d.length;i++)
						{
							if ($.inArray(d[i],sld_genus)==-1)   //the selected genus are not present on the actual SLD
									{
								//	console.log("UNSELECTED FROM LIST,present on SLD"+d[i])
											to_add.push(d[i]);
										//	d.push(d[i]);
									
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
																//		console.warn(g_name)
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
																			g_image.setAttribute("src",legend='http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&SLD='+data+'?date='+new Date());
																			}});													

																	})
																	},1000);
																}
													});
											})	
							}		
							else
							{
						//	alert("nothing to add")	
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
											FeatureType=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];


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
															g_image.setAttribute("src",legend='http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:user_points&SLD='+data+'?date='+new Date());
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
		count=$('#color_form option').size();
		Symbol=[];
		$("#symbol_form option:selected").each (function()
		{
		Symbol.push(this.value);

		});
		//fconsole.info(Symbol);
		Sizers=[];
		$("#size_form option:selected").each (function(index)
		{
		Sizers.push(this.value);
		});

		Symbols=[];
		$("#symbol_form option:selected").each (function(index)
		{
		Symbols.push(this.value);
		});

		Colors=[];
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
				FeatureType=format.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];

						
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

	//$(start).bind('click',function(){$(".ex2trigger").trigger("click");});
$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
}
onLoad_events();

//	});
