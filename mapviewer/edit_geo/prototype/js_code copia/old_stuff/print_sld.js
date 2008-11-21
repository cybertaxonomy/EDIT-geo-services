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
								var edit_no_raster_layers= [];
								var edit_raster_styles= [];
								var edit_no_raster_styles= [];
								var edit_sld=[];
								var legend=$("#llegenda").attr('src').split('&');
								legend=legend['5'].substring(4);
							    var bbox=config.objects.mainMap.getBoundingBox();
							              bbox=bbox.join(",");
						 $("#mainMapContainer div div ").find("img").each( function()
												{				
													visibility=$(this).css("visibility");
														if (visibility=='visible')
														{
														var src=$(this).attr('src'); 
														src2=src.split("&");
														base_src=src2[0];			            

														if (base_src=="http://edit.csic.es:8080/geoserver/wms?VERSION=1.1.1" || base_src=="http://edit.csic.es/geoserver/wms?SERVICE=WMS" || base_src=="http://edit3.csic.es/geoserver/wms?VERSION=1.1.1")

														{						

											src=src.replace("image/png",new_format);  
										//	console.log(src);                                  					 				
											edit_lay=src2[3].substring(7);
										//	console.info(edit_lay);
											edit_style=src2[9].substring(7);
															     																		rasterValues=['topp:elevation_earth_300sec','topp:bio1_earth_300sec','topp:distcoast_earth_300sec','topp:landcover_glcf_earth_225sec'];

																				if(contains(edit_lay, rasterValues)==1)
																				 {
																//				alert("raster");
			//																	console.info(edit_lay);
																				edit_raster_layers.push(edit_lay);
																				edit_raster_styles.push(edit_style);
																				} else 
																				{
																				if (edit_lay=='topp:test_csvimportgispoints2')
																				{
																					edit_sld=src2[9].substring(4);
																					//console.info("ruta a SLD es..."+edit_sld);
																				}
																				else {
																	//			alert("no raster");
																				edit_no_raster_layers.push(edit_lay);	
																				edit_no_raster_styles.push(edit_style);
																			  }
																				}; // fi else de contains
																	//	console.info(edit_raster_layers);					
																														  edit_layers=edit_raster_layers.concat(edit_no_raster_layers);

																//				console.warn("edit layers son.."+edit_layers);
																				edit_styles=edit_raster_styles.concat(edit_no_raster_styles);
																//				console.warn("edit styles son.."+edit_styles);
													     } //fi if
									       else  
													{ //NON EDIT layers
															//				alert("remote layers");

														 src=src.replace("image/png",new_format);    
													//	console.info(src);                                
																    	//console.log(this.src);

														remote_layers.push(src);
									}//fi Else (NON EDIT layers)
							//php png each visibility							                                                               		     	

							

							    };//	 fi visibility
							   });// fi each
			    //we have already changed parameters (format, bbox...) and so on for hte GetMap requests	
			    if (format=='PDF') 
								{
								//we pass the src array to make_pdf.php which calls to getImage.php (will create the image and incrustate it into the PDF)	
			//					$.get('http://edit.csic.es/fitxers/images/makepdf.php', {params: images.join('|'),format: format,bbox=bbox});	

									$.get('http://edit.csic.es/fitxers/images/makepdf.php', { legend: legend, edit_layers: edit_layers.join('/'),edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox,remote_layers:remote_layers.join('|')});

								} 
					else {

					$.get('http://edit.csic.es/fitxers/images/images_creation_sld.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld, edit_styles: edit_styles.join('/'),format: new_format ,bbox: bbox,remote_layers:remote_layers.join('|')});
			;		
			  }
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