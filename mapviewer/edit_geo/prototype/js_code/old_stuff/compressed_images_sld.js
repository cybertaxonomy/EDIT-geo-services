$(document).ready(function(){
	
   
	 $("#iframe2").hide();
	function getContext(){
cadena1=document.location.search;llargada=cadena1.length;cadena2=cadena1.substring(9,llargada);
context=cadena2+".xml";var path="http://edit.csic.es/fitxers/XMLs/"+context;mainMap=path}getContext();$('#query_AOI').click(function(){$.getScript('js_code/bind_it_sld.js');$('#content').remove();

var aoiBox=config.objects.mainMap.getParam("aoi");var x_ul=aoiBox[0][0];var y_ul=aoiBox[0][1];var x_br=aoiBox[1][0];var y_br=aoiBox[1][1];bbox=[];bbox.push(x_ul,y_ul,x_br,y_br)});var extent=cadena2;$(".tabs").hide();$('#workspace').hide();$('#query_result,#ex2,#ex3,#ex_info,.tabs,div[@id*="_lay"],#help,dd:not(:first),#workspace,#user_analysis_legend').hide();if(extent=='iberia'){$('#demo2_data, #demo3_data').show()}else{
$(' #demo2_data, #demo3_data').hide()};$("dt a").click(function(){$("dd:visible").slideUp("slow");$(this).parent().next().slideDown("slow");return false});
//open #user_dates <div> on EDIT mapViewer, showing the link to click on to get data from BBox (AOI)
	
		$("#get_image").click( function()
			{
		
				function bindFrameActions(data_format) {
					  var iframe=$('iframe#info');

					   iframe.load(function()
					{
						   alert("se suposa estem carregant iframe");

					});
						var jq_print='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
					 jq_print='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=330 marginHeight=330 src="" frameBorder=0 width=0 height=0></iframe>';

					$('#ex2').html(jq_print);
					//bindFrameActions();
						//$('#ex2').show();
						$('#ex2')
						   .jqDrag('.jqDrag')
						   .jqResize('.jqResize') ;
					};

   //bindFrameActions();

		
			
				//				$.getScript('js_code/print_sld.js');
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
											var edit_no_raster_layers= [];
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
																		     																		rasterValues=['topp:elevation_earth_300sec','topp:bio1_earth_300sec','topp:distcoast_earth_300sec','topp:landcover_glcf_earth_225sec'];
																					if(contains(edit_lay, rasterValues)==1)																							 {
			edit_raster_styles.push(edit_style);																					
			edit_raster.push(edit_lay);		
			console.warn(edit_raster);																			
			alert("raster");
				} else 																							{																							if (edit_lay=='topp:test_csvimportgispoints2')																							{																								edit_sld=src2[9].substring(4);																			//console.info("ruta a SLD es..."+edit_sld);																																											
			}
																							else {
edit_no_raster_layers.push(edit_lay);	
																					edit_no_raster_styles.push(edit_style);
													  }
													}; // fi else de contains	
																																																	  edit_layers=edit_raster_layers.concat(edit_no_raster_layers);																																														edit_styles=edit_raster_styles.concat(edit_no_raster_styles);																						
																     } //fi if
												       else  
																{ //NON EDIT layers
																	 	src=src.replace("image/png",new_format);    

																	remote_layers.push(src);
												}//fi Else (NON EDIT layers)
										    };//	 fi visibility
										   });// fi each
						    //we have already changed parameters (format, bbox...) and so on for hte GetMap requests	
						   switch (format)
						{
					      case 'PDF/jpeg':
											{
											new_format="image/jpeg";
										    if (remote_layers=='')
					                         {
					                        	$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex2").show();});  

					                         }	
					                         else
					                        {													$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex2").show();});  
																}
											break;
											}
						   case 'PDF/png': 					
						{
											new_format="image/png";							
											if (remote_layers=='')
					                         {
					                        	$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex2").show();});  

					                         }	
					                         else
					                        {													$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox,remote_layers:remote_layers.join('|')},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex2").show();});  
																}
											break;
						}							
						    case 'PDF/gif': 					
						{
											new_format="image/gif";							
										 if (remote_layers=='')
					                         {
					                        	$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox});

					                         }	
					                         else
					                        {													$.get('http://edit.csic.es/fitxers/images/makepdf.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld,legend:legend,edit_styles: edit_styles.join('/'),format: new_format,bbox: bbox,remote_layers:remote_layers.join('|')});
																}
											break;
						}	
						//}//fi switch	
											//we pass the src array to make_pdf.php which calls to getImage.php (will create the image and incrustate it into the PDF)			
						default://		else { //NO PDF
                         if (remote_layers=='' && edit_raster=='')
						{	
							console.info("ni remote ni raster layers  "+edit_raster);
						 	$.get('http://edit.csic.es/fitxers/images/images_creation_sld.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld, edit_styles: edit_styles.join('/'),format: new_format ,bbox: bbox},function(url_image){bindFrameActions();$("iframe#info").attr("src",url_image);$("#ex2").show();});  
						//	alert(new_format);
						//	bindFrameActions(new_format);
						//fi get
						
 //$("#iframe").attr("src","http://edit.csic.es/fitxers/images/edit_images.php?format="+format);$("#iframe").show();

					}
					else {
$.get('http://edit.csic.es/fitxers/images/images_creation_sld.php', { edit_layers: edit_layers.join('/'),edit_sld:edit_sld, edit_styles: edit_styles.join('/'),format: new_format ,bbox: bbox,remote_layers:remote_layers.join('|')},function(url_image){ $("iframe#info").attr("src",url_image);$("#ex2").show();});						
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
										case 'image/png':   
			//							            alert("PNGGGGG seleccionat"); 
			                                        to_php("image/png",format);
			                                    break;
										case 'image/jpeg':
				                                                alert("JPEG seleccionat"); 
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

$("#setAoi_image").click( function() { 	$('#user_dates').next().slideDown("slow"); $("#aoi_info").addClass("sld_info");});
$("#user_dates a").click(function(){ 
	
	if ($(this).attr("class") !=='sld_modified')
   { 
	//alert("encara no mod");
   	var readySLD=config.doc.selectSingleNode("//mb:defaultModelUrl").firstChild.nodeValue;
    //point SLD path as parameter to get legend
    config.objects.mainMap.setSLD(readySLD);
    //$(this).addClass("selected");   
   }
   else 
   {//we don't do anything (changes in legend will be done by SaveModel in ModelBase.js)	
   //alert("llegenda hauria de no ser modificada");
   }
});
$('#id,#id2').click(function(){$.getScript('js_code/symbology_sld.js')});

$('#letter-f form').submit(function(){$.getScript('js_code/remote_wms.js');return false});
var getlayers=function(extent){
	$('#climate_layers,#topo_layers,#admin_layers,#utm_layers,#analysis_layers').empty();
	$.getJSON('json/edit_layers.json',function(data){$.each(data,function(entryIndex,entry){if(entry['extent']==extent){
		html='<ul class="Layers">';if(entry['theme']=='administrative'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';bindFirstEvents();$('#admin_layers').append(html)}
if(entry['theme']=='analysis'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';bindFirstEvents();$('#analysis_layers').append(html)}if(entry['theme']=='enviranalysis'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';bindFirstEvents();$('#enviranalysis_layers').append(html)}if(entry['theme']=='utm'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';bindFirstEvents();$('#utm_layers').append(html)}if(entry['theme']=='climate'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';bindFirstEvents();$('#climate_layers').append(html)}if(entry['theme']=='topography'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>'});html+='</ul>';$('#topo_layers').append(html);bindFirstEvents()};if(entry['theme']=='landcover'){$.each(entry['layers'],function(lineIndex,info){html+=' <li><a href="#" id='+info['id']+'>'+info['nom']+'</a></li>';$('#landcover_layers').append(html);$("#landcover_lay").toggle("slow")});html+='</ul>';bindFirstEvents()}}})})};getlayers(extent);$('#iberian_context').click(function(){$('#demo2_data, #demo3_data,a[id="tab1"],a[id="tab2"],a[id="tab3"]').show();var extent='iberia';getlayers(extent)});$('#europe_context').click(function(){$('#demo2_data,#demo3_data').hide();$('a[id="tab2"],a[id="tab1"],a[id="tab3"]').show();var extent='europe';getlayers(extent)});$('#europe_conic_context').click(function(){$('#demo2_data,#demo3_data,.layers, .metadata, a[id="tab2"],a[id="tab1"]').hide();$("div[@id*='layers']").empty();$("div[@id*='legend']").show();var extent='edit_europe_conic';getContext()});$('#iberian_30_context').click(function(){var extent='edit_iberia_utm30';$('#demo2_data,#demo3_data,.layers, .metadata, a[id="tab2"],a[id="tab1"]').hide();$("div[@id*='layers']").empty();$("div[@id*='legend']").show();getContext()});$('#world_context').click(function(){$('#demo2_data,#demo3_data').hide();var extent='world';getlayers(extent)});var tabContainers=$('div.tabs > div');tabContainers.hide().filter(':first').show();$('div.tabs ul.tabNavigation a').click(function(){tabContainers.hide();tabContainers.filter(this.hash).show();$('div.tabs ul.tabNavigation a').removeClass('selected');$(this).addClass('selected');return false}).filter(':first').click();var bindSecondEvents=function(){};$("#puntos_info").click(function(){$("#puntos_lay").slideDown("slow")});$("li a[@id*='_dates2']").click(function(){$(this).next().toggle("slow")});$("li a[@id*='_dates']").click(function(){$(this).parent().next().toggle("slow").children('.layers').slideDown("slow").end().children('.metadata').hide();$(".tabNavigation li a[@href*='_layers']").addClass('selected');$(".tabNavigation li a[@href*='_metadata']").removeClass('selected')});var bindFirstEvents=function(){$('ul.Layers a').click(function(){var layerid=this.id;$.getJSON('json/edit_layers.json',function(data){$.each(data,function(entryIndex,entry){$.each(entry['layers'],function(lineIndex,info){if(layerid==info['id']){if(entry['theme']=='climate'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';html+='<a href='+info['link3']+'>Download (idrisi)';tabContainers.hide();var metadata=$("#climate_metadata");metadata.empty().html(html).show();$('a[@href=#climate_metadata]').addClass('selected').prev().removeClass('selected')}if(entry['theme']=='topography'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';html+='<a href='+info['link3']+'>Download (idrisi)';tabContainers.hide();$("#topo_metadata").empty().html(html).show();$('a[@href=#climate_metadata]').addClass('selected').prev().removeClass('selected')}if(entry['theme']=='analysis'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';tabContainers.hide();$("#analysis_metadata").empty().html(html).show();$('a[@href=#analysis_metadata]').addClass('selected')}if(entry['theme']=='landcover'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';html+='<a href='+info['link3']+'>Download (idrisi)';$("#landcover_metadata").empty().html(html).show();$('a[@href=#landcover_metadata]').addClass('selected');$('a[@href=#landcover_layers]').removeClass('selected')}if(entry['theme']=='enviranalysis'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';tabContainers.hide();$("#enviranalysis_metadata").empty().html(html).show();$('a[@href=#enviranalysis_metadata]').addClass('selected')}if(entry['theme']=='utm'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';html+='<a href='+info['link2']+'>Download (shapefile)<br>';html+='<a href='+info['link3']+'>Download (idrisi)';tabContainers.hide();$("#utm_metadata").empty().html(html).show();$('a[@href=#utm_metadata]').addClass('selected');$('a[@href=#utm_layers]').removeClass('selected')}if(entry['theme']=='administrative'){html='<h5>'+info['Abstract']+'</h5>';html+='<a href='+info['link']+'>Add this layer<br>';html+='<a href='+info['link2']+'>Download (shapefile)<br>';html+='<a href='+info['link3']+'>Download (idrisi)';tabContainers.hide();$("#admin_metadata").empty().html(html).show();$('a[@href=#admin_metadata]').addClass('selected');$('a[@href=#admin_layers]').removeClass('selected')}}})})})})}});
//jqDnr.js

(function($){$.fn.jqDrag=function(h){return i(this,h,'d')};$.fn.jqResize=function(h){return i(this,h,'r')};$.jqDnR={dnr:{},e:0,drag:function(v){if(M.k=='d')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});return false},stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop)}};var J=$.jqDnR,M=J.dnr,E=J.e,i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;if(E.css('position')!='relative'){try{E.position(p)}catch(e){}}M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};E.css({opacity:0.8});$().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);return false})})},f=function(k){return parseInt(E.css(k))||false}})(jQuery);
//jqModal.js

(function($){$.fn.jqm=function(o){var _o={zIndex:3000,overlay:50,overlayClass:'jqmOverlay',closeClass:'jqmClose',trigger:'.jqModal',ajax:false,target:false,modal:false,toTop:true,onShow:false,onHide:false,onLoad:false};return this.each(function(){if(this._jqm)return;s++;this._jqm=s;H[s]={c:$.extend(_o,o),a:false,w:$(this).addClass('jqmID'+s),s:s};if(_o.trigger)$(this).jqmAddTrigger(_o.trigger)})};$.fn.jqmAddClose=function(e){hs(this,e,'jqmHide');return this};$.fn.jqmAddTrigger=function(e){hs(this,e,'jqmShow');return this};$.fn.jqmShow=function(t){return this.each(function(){if(!H[this._jqm].a)$.jqm.open(this._jqm,t)})};$.fn.jqmHide=function(t){return this.each(function(){if(H[this._jqm].a)$.jqm.close(this._jqm,t)})};$.jqm={hash:{},open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(/^\d+$/.test(h.w.css('z-index')))?h.w.css('z-index'):c.zIndex,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});h.t=t;h.a=true;h.w.css('z-index',z);if(c.modal){if(!A[0])F('bind');A.push(s);o.css('cursor','wait')}else if(c.overlay>0)h.w.jqmAddClose(o);else o=false;h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):false;if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in{Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'")}}if(c.ajax){var r=c.target||h.w,u=c.ajax,r=(typeof r=='string')?$(r,h.w):$(r),u=(u.substr(0,1)=='@')?$(t).attr(u.substring(1)):u;r.load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h)})}else if(cc)h.w.jqmAddClose($(cc,h.w));if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);(c.onShow)?c.onShow(h):h.w.show();e(h);return false},close:function(s){var h=H[s];h.a=false;if(A[0]){A.pop();if(!A[0])F('unbind')}if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove()}return false}};var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version=="6.0"),i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i);f(h)},f=function(h){try{$(':input:visible',h.w)[0].focus()}catch(e){}},F=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m)},m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return!r},hs=function(w,e,y){var s=[];w.each(function(){s.push(this._jqm)});$(e).each(function(){if(this[y])$.extend(this[y],s);else{this[y]=s;$(this).click(function(){for(var i in{jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return false})}})}})(jQuery);

//dimensions.js
(function($){var height=$.fn.height,width=$.fn.width;$.fn.extend({height:function(){if(!this[0])error();if(this[0]==window)if($.browser.opera||($.browser.safari&&parseInt($.browser.version)>520))return self.innerHeight-(($(document).height()>self.innerHeight)?getScrollbarWidth():0);else if($.browser.safari)return self.innerHeight;else return $.boxModel&&document.documentElement.clientHeight||document.body.clientHeight;if(this[0]==document)return Math.max(($.boxModel&&document.documentElement.scrollHeight||document.body.scrollHeight),document.body.offsetHeight);return height.apply(this,arguments)},width:function(){if(!this[0])error();if(this[0]==window)if($.browser.opera||($.browser.safari&&parseInt($.browser.version)>520))return self.innerWidth-(($(document).width()>self.innerWidth)?getScrollbarWidth():0);else if($.browser.safari)return self.innerWidth;else return $.boxModel&&document.documentElement.clientWidth||document.body.clientWidth;if(this[0]==document)if($.browser.mozilla){var scrollLeft=self.pageXOffset;self.scrollTo(99999999,self.pageYOffset);var scrollWidth=self.pageXOffset;self.scrollTo(scrollLeft,self.pageYOffset);return document.body.offsetWidth+scrollWidth}else return Math.max((($.boxModel&&!$.browser.safari)&&document.documentElement.scrollWidth||document.body.scrollWidth),document.body.offsetWidth);return width.apply(this,arguments)},innerHeight:function(){if(!this[0])error();return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight-num(this,'borderTopWidth')-num(this,'borderBottomWidth'):this.height()+num(this,'paddingTop')+num(this,'paddingBottom')},innerWidth:function(){if(!this[0])error();return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth-num(this,'borderLeftWidth')-num(this,'borderRightWidth'):this.width()+num(this,'paddingLeft')+num(this,'paddingRight')},outerHeight:function(options){if(!this[0])error();options=$.extend({margin:false},options||{});return this[0]==window||this[0]==document?this.height():this.is(':visible')?this[0].offsetHeight+(options.margin?(num(this,'marginTop')+num(this,'marginBottom')):0):this.height()+num(this,'borderTopWidth')+num(this,'borderBottomWidth')+num(this,'paddingTop')+num(this,'paddingBottom')+(options.margin?(num(this,'marginTop')+num(this,'marginBottom')):0)},outerWidth:function(options){if(!this[0])error();options=$.extend({margin:false},options||{});return this[0]==window||this[0]==document?this.width():this.is(':visible')?this[0].offsetWidth+(options.margin?(num(this,'marginLeft')+num(this,'marginRight')):0):this.width()+num(this,'borderLeftWidth')+num(this,'borderRightWidth')+num(this,'paddingLeft')+num(this,'paddingRight')+(options.margin?(num(this,'marginLeft')+num(this,'marginRight')):0)},scrollLeft:function(val){if(!this[0])error();if(val!=undefined)return this.each(function(){if(this==window||this==document)window.scrollTo(val,$(window).scrollTop());else this.scrollLeft=val});if(this[0]==window||this[0]==document)return self.pageXOffset||$.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft;return this[0].scrollLeft},scrollTop:function(val){if(!this[0])error();if(val!=undefined)return this.each(function(){if(this==window||this==document)window.scrollTo($(window).scrollLeft(),val);else this.scrollTop=val});if(this[0]==window||this[0]==document)return self.pageYOffset||$.boxModel&&document.documentElement.scrollTop||document.body.scrollTop;return this[0].scrollTop},position:function(returnObject){return this.offset({margin:false,scroll:false,relativeTo:this.offsetParent()},returnObject)},offset:function(options,returnObject){if(!this[0])error();var x=0,y=0,sl=0,st=0,elem=this[0],parent=this[0],op,parPos,elemPos=$.css(elem,'position'),mo=$.browser.mozilla,ie=$.browser.msie,oa=$.browser.opera,sf=$.browser.safari,sf3=$.browser.safari&&parseInt($.browser.version)>520,absparent=false,relparent=false,options=$.extend({margin:true,border:false,padding:false,scroll:true,lite:false,relativeTo:document.body},options||{});if(options.lite)return this.offsetLite(options,returnObject);if(options.relativeTo.jquery)options.relativeTo=options.relativeTo[0];if(elem.tagName=='BODY'){x=elem.offsetLeft;y=elem.offsetTop;if(mo){x+=num(elem,'marginLeft')+(num(elem,'borderLeftWidth')*2);y+=num(elem,'marginTop')+(num(elem,'borderTopWidth')*2)}else if(oa){x+=num(elem,'marginLeft');y+=num(elem,'marginTop')}else if((ie&&jQuery.boxModel)){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth')}else if(sf3){x+=num(elem,'marginLeft')+num(elem,'borderLeftWidth');y+=num(elem,'marginTop')+num(elem,'borderTopWidth')}}else{do{parPos=$.css(parent,'position');x+=parent.offsetLeft;y+=parent.offsetTop;if((mo&&!parent.tagName.match(/^t[d|h]$/i))||ie||sf3){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth');if(mo&&parPos=='absolute')absparent=true;if(ie&&parPos=='relative')relparent=true}op=parent.offsetParent||document.body;if(options.scroll||mo){do{if(options.scroll){sl+=parent.scrollLeft;st+=parent.scrollTop}if(oa&&($.css(parent,'display')||'').match(/table-row|inline/)){sl=sl-((parent.scrollLeft==parent.offsetLeft)?parent.scrollLeft:0);st=st-((parent.scrollTop==parent.offsetTop)?parent.scrollTop:0)}if(mo&&parent!=elem&&$.css(parent,'overflow')!='visible'){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}parent=parent.parentNode}while(parent!=op)}parent=op;if(parent==options.relativeTo&&!(parent.tagName=='BODY'||parent.tagName=='HTML')){if(mo&&parent!=elem&&$.css(parent,'overflow')!='visible'){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}if(((sf&&!sf3)||oa)&&parPos!='static'){x-=num(op,'borderLeftWidth');y-=num(op,'borderTopWidth')}break}if(parent.tagName=='BODY'||parent.tagName=='HTML'){if(((sf&&!sf3)||(ie&&$.boxModel))&&elemPos!='absolute'&&elemPos!='fixed'){x+=num(parent,'marginLeft');y+=num(parent,'marginTop')}if(sf3||(mo&&!absparent&&elemPos!='fixed')||(ie&&elemPos=='static'&&!relparent)){x+=num(parent,'borderLeftWidth');y+=num(parent,'borderTopWidth')}break}}while(parent)}var returnValue=handleOffsetReturn(elem,options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this}else{return returnValue}},offsetLite:function(options,returnObject){if(!this[0])error();var x=0,y=0,sl=0,st=0,parent=this[0],offsetParent,options=$.extend({margin:true,border:false,padding:false,scroll:true,relativeTo:document.body},options||{});if(options.relativeTo.jquery)options.relativeTo=options.relativeTo[0];do{x+=parent.offsetLeft;y+=parent.offsetTop;offsetParent=parent.offsetParent||document.body;if(options.scroll){do{sl+=parent.scrollLeft;st+=parent.scrollTop;parent=parent.parentNode}while(parent!=offsetParent)}parent=offsetParent}while(parent&&parent.tagName!='BODY'&&parent.tagName!='HTML'&&parent!=options.relativeTo);var returnValue=handleOffsetReturn(this[0],options,x,y,sl,st);if(returnObject){$.extend(returnObject,returnValue);return this}else{return returnValue}},offsetParent:function(){if(!this[0])error();var offsetParent=this[0].offsetParent;while(offsetParent&&(offsetParent.tagName!='BODY'&&$.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return $(offsetParent)}});var error=function(){throw"Dimensions: jQuery collection is empty";};var num=function(el,prop){return parseInt($.css(el.jquery?el[0]:el,prop))||0};var handleOffsetReturn=function(elem,options,x,y,sl,st){if(!options.margin){x-=num(elem,'marginLeft');y-=num(elem,'marginTop')}if(options.border&&(($.browser.safari&&parseInt($.browser.version)<520)||$.browser.opera)){x+=num(elem,'borderLeftWidth');y+=num(elem,'borderTopWidth')}else if(!options.border&&!(($.browser.safari&&parseInt($.browser.version)<520)||$.browser.opera)){x-=num(elem,'borderLeftWidth');y-=num(elem,'borderTopWidth')}if(options.padding){x+=num(elem,'paddingLeft');y+=num(elem,'paddingTop')}if(options.scroll&&(!$.browser.opera||elem.offsetLeft!=elem.scrollLeft&&elem.offsetTop!=elem.scrollLeft)){sl-=elem.scrollLeft;st-=elem.scrollTop}return options.scroll?{top:y-st,left:x-sl,scrollTop:st,scrollLeft:sl}:{top:y,left:x}};var scrollbarWidth=0;var getScrollbarWidth=function(){if(!scrollbarWidth){var testEl=$('<div>').css({width:100,height:100,overflow:'auto',position:'absolute',top:-1000,left:-1000}).appendTo('body');scrollbarWidth=100-testEl.append('<div>').find('div').css({width:'100%',height:200}).width();testEl.remove()}return scrollbarWidth}})(jQuery);

//farbtastic.js
jQuery.fn.farbtastic=function(callback){$.farbtastic(this,callback);return this};jQuery.farbtastic=function(container,callback){var container=$(container).get(0);return container.farbtastic||(container.farbtastic=new jQuery._farbtastic(container,callback))};jQuery._farbtastic=function(container,callback){var fb=this;$(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');var e=$('.farbtastic',container);fb.wheel=$('.wheel',container).get(0);fb.radius=84;fb.square=100;fb.width=194;if(navigator.appVersion.match(/MSIE [0-6]\./)){$('*',e).each(function(){if(this.currentStyle.backgroundImage!='none'){var image=this.currentStyle.backgroundImage;image=this.currentStyle.backgroundImage.substring(5,image.length-2);$(this).css({'backgroundImage':'none','filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='"+image+"')"})}})};fb.linkTo=function(callback){if(typeof fb.callback=='object'){$(fb.callback).unbind('keyup',fb.updateValue)}fb.color=null;if(typeof callback=='function'){fb.callback=callback}else if(typeof callback=='object'||typeof callback=='string'){fb.callback=$(callback);fb.callback.bind('keyup',fb.updateValue);if(fb.callback.get(0).value){fb.setColor(fb.callback.get(0).value)}};return this};fb.updateValue=function(event){if(this.value&&this.value!=fb.color){fb.setColor(this.value)}};fb.setColor=function(color){var unpack=fb.unpack(color);if(fb.color!=color&&unpack){fb.color=color;fb.rgb=unpack;fb.hsl=fb.RGBToHSL(fb.rgb);fb.updateDisplay()};return this};fb.setHSL=function(hsl){fb.hsl=hsl;fb.rgb=fb.HSLToRGB(hsl);fb.color=fb.pack(fb.rgb);fb.updateDisplay();return this};fb.widgetCoords=function(event){var x,y;var el=event.target||event.srcElement;var reference=fb.wheel;if(typeof event.offsetX!='undefined'){var pos={x:event.offsetX,y:event.offsetY};var e=el;while(e){e.mouseX=pos.x;e.mouseY=pos.y;pos.x+=e.offsetLeft;pos.y+=e.offsetTop;e=e.offsetParent};var e=reference;var offset={x:0,y:0};while(e){if(typeof e.mouseX!='undefined'){x=e.mouseX-offset.x;y=e.mouseY-offset.y;break};offset.x+=e.offsetLeft;offset.y+=e.offsetTop;e=e.offsetParent};e=el;while(e){e.mouseX=undefined;e.mouseY=undefined;e=e.offsetParent}}else{var pos=fb.absolutePosition(reference);x=(event.pageX||0*(event.clientX+$('html').get(0).scrollLeft))-pos.x;y=(event.pageY||0*(event.clientY+$('html').get(0).scrollTop))-pos.y};return{x:x-fb.width/2,y:y-fb.width/2}};fb.mousedown=function(event){if(!document.dragging){$(document).bind('mousemove',fb.mousemove).bind('mouseup',fb.mouseup);document.dragging=true};var pos=fb.widgetCoords(event);fb.circleDrag=Math.max(Math.abs(pos.x),Math.abs(pos.y))*2>fb.square;fb.mousemove(event);return false};fb.mousemove=function(event){var pos=fb.widgetCoords(event);if(fb.circleDrag){var hue=Math.atan2(pos.x,-pos.y)/6.28;if(hue<0)hue+=1;fb.setHSL([hue,fb.hsl[1],fb.hsl[2]])}else{var sat=Math.max(0,Math.min(1,-(pos.x/fb.square)+.5));var lum=Math.max(0,Math.min(1,-(pos.y/fb.square)+.5));fb.setHSL([fb.hsl[0],sat,lum])};return false};fb.mouseup=function(){$(document).unbind('mousemove',fb.mousemove);$(document).unbind('mouseup',fb.mouseup);document.dragging=false};fb.updateDisplay=function(){var angle=fb.hsl[0]*6.28;$('.h-marker',e).css({left:Math.round(Math.sin(angle)*fb.radius+fb.width/2)+'px',top:Math.round(-Math.cos(angle)*fb.radius+fb.width/2)+'px'});$('.sl-marker',e).css({left:Math.round(fb.square*(.5-fb.hsl[1])+fb.width/2)+'px',top:Math.round(fb.square*(.5-fb.hsl[2])+fb.width/2)+'px'});$('.color',e).css('backgroundColor',fb.pack(fb.HSLToRGB([fb.hsl[0],1,0.5])));if(typeof fb.callback=='object'){$(fb.callback).css({backgroundColor:fb.color,color:fb.hsl[2]>0.5?'#000':'#fff'});$(fb.callback).each(function(){if(this.value&&this.value!=fb.color){this.value=fb.color}})}else if(typeof fb.callback=='function'){fb.callback.call(fb,fb.color)}};fb.absolutePosition=function(el){var r={x:el.offsetLeft,y:el.offsetTop};if(el.offsetParent){var tmp=fb.absolutePosition(el.offsetParent);r.x+=tmp.x;r.y+=tmp.y};return r};fb.pack=function(rgb){var r=Math.round(rgb[0]*255);var g=Math.round(rgb[1]*255);var b=Math.round(rgb[2]*255);return'#'+(r<16?'0':'')+r.toString(16)+(g<16?'0':'')+g.toString(16)+(b<16?'0':'')+b.toString(16)};fb.unpack=function(color){if(color.length==7){return[parseInt('0x'+color.substring(1,3))/255,parseInt('0x'+color.substring(3,5))/255,parseInt('0x'+color.substring(5,7))/255]}else if(color.length==4){return[parseInt('0x'+color.substring(1,2))/15,parseInt('0x'+color.substring(2,3))/15,parseInt('0x'+color.substring(3,4))/15]}};fb.HSLToRGB=function(hsl){var m1,m2,r,g,b;var h=hsl[0],s=hsl[1],l=hsl[2];m2=(l<=0.5)?l*(s+1):l+s-l*s;m1=l*2-m2;return[this.hueToRGB(m1,m2,h+0.33333),this.hueToRGB(m1,m2,h),this.hueToRGB(m1,m2,h-0.33333)]};fb.hueToRGB=function(m1,m2,h){h=(h<0)?h+1:((h>1)?h-1:h);if(h*6<1)return m1+(m2-m1)*h*6;if(h*2<1)return m2;if(h*3<2)return m1+(m2-m1)*(0.66666-h)*6;return m1};fb.RGBToHSL=function(rgb){var min,max,delta,h,s,l;var r=rgb[0],g=rgb[1],b=rgb[2];min=Math.min(r,Math.min(g,b));max=Math.max(r,Math.max(g,b));delta=max-min;l=(min+max)/2;s=0;if(l>0&&l<1){s=delta/(l<0.5?(2*l):(2-2*l))};h=0;if(delta>0){if(max==r&&max!=g)h+=(g-b)/delta;if(max==g&&max!=b)h+=(2+(b-r)/delta);if(max==b&&max!=r)h+=(4+(r-g)/delta);h/=6};return[h,s,l]};$('*',e).mousedown(fb.mousedown);fb.setColor('#000000');if(callback){fb.linkTo(callback)}};
