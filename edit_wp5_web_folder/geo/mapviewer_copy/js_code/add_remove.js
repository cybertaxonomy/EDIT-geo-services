$(document).ready(function(){

var bindFrameActions=function() 
{
$('#gbif_win').jqm({
    overlay: 30
})
    var text='Data manipulation';
	msie=($.browser.msie==true)?true:false; 
	if (msie)
	{

	 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');
	}
	else 
	{
	$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
	}
    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="geo_frame" name="geo_frame" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.africamuseum.be/edit_wp5/geo/formularis/manipulation_form.html?userid='+userid+'" frameBorder=0 width=420 height=300; background-color=#D7DBDF"></iframe></div></div><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div>';

if ($('#ex2').children().length!==0)
{
$('#ex2').empty();
}

$('#ex2').append(jq);
var iframe=$('iframe#geo_frame');

 $(iframe).bind('load', function()
{
	$("#ex2").animate({width:'380',height:'325'},"slow");

 $('input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        
	     $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){
		 $(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide(); 
	});
	
    iframe=$("iframe#geo_frame");
    submit_button=iframe.contents().find("#doc").find("input[type='submit']");  
submit_button.click(function(event)
{

var info;	
//div .genus_div
iframe=$("iframe#geo_frame");
var d=[];
d_not_selected=[];
var action=$(this).attr('id');
var to_filter;
if ($(this).parents().eq(3).attr('id')=="genus_div") 
{
//	alert($(event).parents().eq(3).attr('id'))
	 to_filter="genus";
	iframe.contents().find('#genusSelect option:selected').each(function()
	{
		d.push(this.text);
	});
	iframe.contents().find('#genusSelect :not(option:selected)').each(function()
	{
		d_not_selected.push(this.text);
	});
	}
else
	{
	  to_filter="specie";	
	var genus;
	iframe.contents().find('#genusSelect option:selected').each(function()
	{
		genus=this.text;
	});
	iframe.contents().find('#specieSelect option:selected').each(function()
	{
		d.push(genus+this.text);
	});

	iframe.contents().find('#specieSelect :not(option:selected)').each(function()
	{
		d_not_selected.push(this.text);
	});
	
	}  
//	console.warn(d);

	var url;
	to_filter=='genus'?url=edit_points.params.SLD:url=edit_sp_points.params.SLD;
    
//	url="http://edit.africamuseum.be/edit_wp5/geo/sld2/testing.sld";
		$.get(url,{},function(xml) 
	{

	var format = new OpenLayers.Format.XML();
 	var root = xml.documentElement;
 	FeatureType=root.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];
	sld_genus=[];
	//ONLY IF WE REMOVED DATA FROM SLD BEFORE
						$("Rule",xml).each(function(index,s) {						
							var name=$(this).find("Name").text();							
							sld_genus.push(name)
						})

						to_add=[];
						to_remove=[];
						to_hide=[];
						to_show=[];
		
						for (i=0;i<d_not_selected.length;i++)
						{
							if ($.inArray(d_not_selected[i],sld_genus)!==-1)   //the selected genus are not present on the actual SLD
									{
								//			console.log("UNSELECTED FROM LIST,present on SLD"+d_not_selected[i])
											to_remove.push(d_not_selected[i]);
							}
						}
					//	console.info(sld_genus);
						for (i=0;i<d.length;i++)
						{
							
						if ($.inArray(d[i],sld_genus)==-1)   //the selected genus are not present on the actual SLD
								{
							//		console.log("nooot present"+d[i])
						to_add.push(d[i]);
								}	
								else
								{
								//console.log("present"+d[i])	
						    	to_hide.push(d[i]);  //we send all the data g1,g3
							    to_show.push(d[i]); 
								}
							
						}
								if (action=='submit_hide')
								{
								//	alert(action);

										if (to_hide.length > 0)
										{
												var g=[];
										   $("Rule",xml).each(function(index,s) 
													{
														var name=$(this).find("Name").text();
				//										console.info($(this).find("Filter"))
															//$("And",xml).each(function(n,info)
															/*
														 $(this).find("And").each(function(index,s) 
																	{
																			var genus=$(this).children().eq(1).children().eq(1).text();
																			var specie=$(this).children().eq(2).children().eq(1).text();
																		//	console.warn(genus+specie)
																})
																*/

													//	var this2=$(this);
														g.push(name);
													})

													$.each(to_hide,function(index,info)
														{								
															var position=$.inArray(info,g);
														    //  console.log(info+"present on position"+position);
															
											        var s=$(xml).find("Rule")[position];
													var opacity=$(s).find("Fill").find("CssParameter[name='fill-opacity']");													    
													$(opacity).each(function()
																	{
																	opacity=this.firstChild;
																	opacity.nodeValue=0.00001;
																	})
													var s_width=$(s).find("Stroke").find("CssParameter[name='stroke-width']").children();
													$(s_width).each(function()
													{
														s_width=this.firstChild;
														s_width.nodeValue=0.00001;														
													})
													var s_color=$(s).find("Stroke").find("CssParameter[name='stroke']").children();
													$(s_color).each(function()
													{
														s_color=this.firstChild;
														s_color.nodeValue="#eff0f0";														
													})

													})
														var format = new OpenLayers.Format.XML();
														var sld=format.write(xml);	
													//	console.warn(sld)							
																$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/test_xmls2.php',
																				processData:false, type:'POST',
																	dataType:'text',data:'data='+sld+'&user='+userid+'&to_filter='+to_filter,
																	success:function(new_xml)
																				{

															if (to_filter=='genus')
															{
																var g_legend=document.getElementById("genera_legend");
																	edit_points.params.SLD=new_xml;
																	edit_points.redraw();
															g_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+new Date());

															}else
															{
																	var sp_legend=document.getElementById("species_legend");
																	edit_sp_points.params.SLD=new_xml;
																	edit_sp_points.redraw();
															sp_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_sp_points.params.SLD+'?date='+new Date());		

															}
														}
															})	
													
												
											}
										 else { alert("nothing to hide!")}

								}
									if (action=='submit_show')
									{
									//	alert(action);
										//console.warn(to_show.length)
											if (to_show.length > 0)
											{
													var g=[];
											   $("Rule",xml).each(function(index,s) 
														{
															var name=$(this).find("Name").text();
					//									
															g.push(name);
														})

														$.each(to_show,function(index,info)
															{								
																var position=$.inArray(info,g);
															    //  console.log(info+"present on position"+position);

												        var s=$(xml).find("Rule")[position];
											//	console.dirxml(s)
														var opacity=$(s).find("Fill").find("CssParameter[name='fill-opacity']");													    
														$(opacity).each(function()
																		{
																		opacity=this.firstChild;
																		opacity.nodeValue=0.9;
																		})
														var s_width=$(s).find("Stroke").find("CssParameter[name='stroke-width']").children();
														$(s_width).each(function()
														{
															s_width=this.firstChild;
															s_width.nodeValue=0.4;														
														})
														var s_color=$(s).find("Stroke").find("CssParameter[name='stroke']").children();
														$(s_color).each(function()
														{
															s_color=this.firstChild;
															s_color.nodeValue="#ed9692";														
														})

														})
															var format = new OpenLayers.Format.XML();
															var sld=format.write(xml);	
																					
																	$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/test_xmls2.php',
																					processData:false, type:'POST',
																		dataType:'text',data:'data='+sld+'&user='+userid+'&to_filter='+to_filter,
																		success:function(new_xml)
																					{
																		
																	//	var url=new_xml;
//																		setTimeOut(function(){
																if (to_filter=='genus')
																{																																														
																	var g_legend=document.getElementById("genera_legend");
																	edit_points.params.SLD=new_xml;
																	edit_points.redraw();

																g_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+new Date());																																						
																					
																}else
																{
																		var sp_legend=document.getElementById("species_legend");
																		edit_sp_points.params.SLD=new_xml;
																		edit_sp_points.redraw();
																sp_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_sp_points.params.SLD+'?date='+new Date());		

																}
													
															}
														   
																})	


												}
											 else { alert("nothing to show!")}

									}			
					if (action=='submit_remove')
					{		
						//alert(action)	
							if (d.length>0)
							{
						   $("Rule",xml).each(function(index,s) 
									{
										var name=$(this).find("Name").text();
//										console.info($(this).find("Filter"))
											//$("And",xml).each(function(n,info)
											/*
										 $(this).find("And").each(function(index,s) 
													{
															var genus=$(this).children().eq(1).children().eq(1).text();
															var specie=$(this).children().eq(2).children().eq(1).text();
														//	console.warn(genus+specie)
												})
												*/
										var this2=$(this);
								//s		console.dirxml(this)
								//	$.each(to_remove,function(n,info)
									$.each(d,function(n,info)
										{								
										if (info==name)
										{	
								
										this2.remove();	
										}		

									})
									
								})
								var format = new OpenLayers.Format.XML();
								var sld=format.write(xml);	
							//	console.warn(sld)							
										$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/test_xmls2.php',
														processData:false, type:'POST',
											dataType:'text',data:'data='+sld+'&user='+userid+'&to_filter='+to_filter,success:function(new_xml)
														{
								
									if (to_filter=='genus')
									{
										var g_legend=document.getElementById("genera_legend");
											edit_points.params.SLD=new_xml;
											edit_points.redraw();
									g_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+new Date());
								
									}else
									{
											var sp_legend=document.getElementById("species_legend");
											edit_sp_points.params.SLD=new_xml;
											edit_sp_points.redraw();
									sp_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_sp_points.params.SLD+'?date='+new Date());		
								
									}
									
								}
								
									});
														return false;	
						}
						else { alert("nothing to delete");return false;}
					}
					if (action=='submit_add')
					{
						if (to_add.length>0)
						{
							var text_to_add;	
							var sld;
							$("FeatureTypeStyle",xml).each(function()
								{
									var text_to_add='';
									var format = new OpenLayers.Format.XML();
									$("Rule",xml).each(function()
									{

												text_to_add+=format.write($(this).get(0));

									})	
							$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/construct_sld_test.php',processData:false, type:'POST',
									dataType:'text',data:'data='+to_add+'&userid='+userid+'&to_filter='+to_filter+'&sld='+text_to_add,
									success:function(new_xml)
																	{
																		if (to_filter=='genus')
																		{
																			var g_legend=document.getElementById("genera_legend");
																				edit_points.params.SLD=new_xml;
																				edit_points.redraw();
																		g_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_points.params.SLD+'?date='+new Date());
																		}else
																		{
																			var sp_legend=document.getElementById("species_legend");
																				edit_sp_points.params.SLD=new_xml;
																				edit_sp_points.redraw();
																		sp_legend.setAttribute("src",'http://193.190.223.46:8080/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/png&WIDTH=25&HEIGHT=20&LAYER=user_points&sld='+edit_sp_points.params.SLD+'?date='+new Date());		
																		}
											}
											
												});
										

										})	
							return false;

					} else { alert("selected data is already there");}
						
					}	
						
						
})


})

})

$('#ex2').show();
$('iframe#ex2').show();
$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize');
}
bindFrameActions();

})