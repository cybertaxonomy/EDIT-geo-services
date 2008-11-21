		$(document).ready(function() {
			$("#get_image").click( function()
				{

					function bindFrameActions(data_format) {
						  var iframe=$('iframe#info');

						   iframe.load(function()
						{
							 //  alert("se suposa estem carregant iframe");

						});
							var jq_print='<div class="jqmdTL" style="background-size: 0%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
						 jq_print='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="" frameBorder=0 width=0 height=0></iframe>';

						$('#ex_print').html(jq_print);
						//bindFrameActions();
							//$('#ex2').show();
							$('#ex_print')
							   .jqDrag('.jqDrag')
							   .jqResize('.jqResize') ;
						};


									var to_php=function(new_format,format)
									{

										contains = function (input, arrayData) {
										for (i=0; i<arrayData.length; i++) {
										if (arrayData[i] == input) {
										return 1;
										} // fi If
										} //fi For
										return -1;
										}; //fi contains

									var split_src=function(new_format)
											{
								        //arrays declarats al principi de la funció! borra array i el defineix 
												var bbox=[];
													var remote_layers=[];
													var edit_styles= [];
													var edit_layers= [];
													var edit_raster_layers= [];
													var edit_raster= [];
													var edit_vectorial= [];
													var edit_raster_styles= [];
													var edit_no_raster_styles= [];
													var edit_sld=[];
													var 	  legend=$("#llegenda").attr('src').split('&');
													legend=legend['5'].substring(4);
											var bbox=config.objects.mainMap.getBoundingBox();
										    bbox=bbox.join(",");
											 $("#mainMapContainer div div ").find("img").each( function()
																	{				
																		visibility=$(this).css("visibility");
												if (visibility=='visible')
																{
																var src=$(this).attr('src'); 
			/*										if (src=="../lib/skin/default/images/Spacer.gif") {																					} */
																			src2=src.split("&");
																			base_src=src2[0];			            
																if (base_src=="http://edit.csic.es:8080/geoserver/wms?VERSION=1.1.1" ||																	 base_src=="http://edit.csic.es/geoserver/wms?SERVICE=WMS" || base_src=="http://edit3.csic.es/geoserver/wms?VERSION=1.1.1" || base_src=="http://edit.csic.es/geoserver/wms?VERSION=1.1.1")															
																{						
															src=src.replace("image/png",new_format);                             					 				
												edit_lay=src2[3].substring(7);
												//				console.info("edit layer is:  "+edit_lay);
				 							    edit_style=src2[9].substring(7);
																				     																		rasterValues=['topp:elevation_earth_300sec','topp:bio1_earth_300sec','topp:distcoast_earth_300sec','topp:landcover_glcf_earth_225sec','topp:bio12_earth_300sec','topp:landcover_glcf_earth_225sec','topp:elevation_europe_150sec','topp:sea_land_europe_150sec','topp:distcoast_europe_150sec','topp:bio12_europe_150sec','topp:bio1_europe_150sec','topp:landcover_glcf_europe_225sec','topp:elevation_iberia_150sec','topp:distcoast_iberia_150sec','topp:sea_land_europe_150sec','topp:bio12_iberia_150sec','topp:bio1_iberia_150sec','topp:landcover_glcf_iberia_30sec','topp:utm_numgenus','topp:utm_incertidum','topp:scarab2500new','topp:utm_scarab','topp:slopefin2','topp:taxisregis2','topp:nutaxis2'];
																							if(contains(edit_lay, rasterValues)==1)																							 {
					edit_raster_styles.push(edit_style);																					
					edit_raster.push(edit_lay);		
						} else 																							{																							if (edit_lay=='topp:test_csvimportgispoints2')																							{																								edit_sld=src2[9].substring(4);																			//console.info("ruta a SLD es..."+edit_sld);																																											
					}
																									else {
		edit_vectorial.push(edit_lay);	

															  }
															}; // fi else de contains	

																		     } //fi if
														       else  
																		{ //NON EDIT layers
																			 	src=src.replace("image/png",new_format);    															remote_layers.push(src);
														}//fi Else (NON EDIT layers)
												    };//	 fi visibility
												   });// fi each
								    //we have already changed parameters (format, bbox...) and so on for hte GetMap requests	
								   switch (format)
								{

							      case 'PDF/jpeg':
													{
													new_format="image/jpeg";					                        	$.get('http://edit.csic.es/fitxers/images/makepdf2.php', { edit_raster: edit_raster.join('/'),edit_vectorial:edit_vectorial,edit_sld:edit_sld,remote_layers:remote_layers,legend:legend,format: new_format,bbox: bbox},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  
													}
													break;

								   case 'PDF/png': 					
								{
									new_format="image/png";							
					$.get('http://edit.csic.es/fitxers/images/makepdf2.php', { edit_raster: edit_raster.join('/'),edit_sld:edit_sld,edit_vectorial:edit_vectorial,legend:legend,format: new_format,bbox:bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  
									}
													break;
								case 'png/gray': 					
													{
														new_format="image/png";

									$.get('http://edit.csic.es/fitxers/images/images.php', {
		edit_raster:edit_raster.join('/'),edit_sld:edit_sld,edit_vectorial:edit_vectorial,legend:legend,format:"png/gray",bbox:bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  
														}
																		break;
									case 'jpeg/gray': 					
									{
																							new_format="image/jpeg";
																				$.get('http://edit.csic.es/fitxers/images/images.php', {											edit_raster:edit_raster.join('/'),edit_sld:edit_sld,edit_vectorial:edit_vectorial,legend:legend,format:"jpeg/gray",bbox:bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  																								}																												break;																													  case 'gif/gray': 					
																													{
																																												new_format="image/gif";
																																								$.get('http://edit.csic.es/fitxers/images/images.php', {											edit_raster:edit_raster.join('/'),edit_sld:edit_sld,edit_vectorial:edit_vectorial,legend:legend,format:"gif/gray",bbox:bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  																																												}																																															break;
												//we pass the src array to make_pdf.php which calls to getImage.php (will create the image and incrustate it into the PDF)			
													default:
													//		else { //NO PDF
													{

													$.get('http://edit.csic.es/fitxers/images/images.php', { edit_raster: edit_raster.join('/'),edit_sld:edit_sld,edit_vectorial:edit_vectorial,legend:legend,format: new_format,bbox:bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex_print").show();});  
												}
	break;
	} //FI switch
	//
	}; //fi split_src function

	split_src(new_format);
	//when user asks for PNG we shouldnot apply split_src(new_format) because GetMap by default in our case uses png...

	}// fi de to_php()

			$("#format_form option:selected ").each (function()
			{
			format=this.value;
			switch (format)
			{

			case 'png/gray':
			// alert("PNGGGGG seleccionat");
			to_php("image/png",format);
			break;
			case 'jpeg/gray':

			to_php("image/jpeg",format);
			break;
			case 'gif/gray':
			// alert("PNGGGGG seleccionat");
			to_php("image/gif",format);
			break;
			case 'image/png':
			// alert("PNGGGGG seleccionat");
			to_php("image/png",format);
			break;
			case 'image/jpeg':
			to_php("image/jpeg",format);
			break;
			case 'image/gif':
			to_php("image/gif",format);
			break;
			case 'PDF/jpeg':
			//does FPDF only support JPEG ?
																					 				to_php("image/jpeg",format);
														                            					break;
				case 'PDF/png':
				to_php("image/png",format);
				break;

				case 'PDF/gif':
				to_php("image/gif",format);
				break;
				}
				}); //fi each;

				});
			});