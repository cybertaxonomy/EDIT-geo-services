  $.get('http://edit.br.fgov.be/edit_wp5/geo/modules/print_module.php',function(data)
{

 var iframe=$('iframe#info2');
			var jq_print='<div class="jqmdTL" style="background-size: 0%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
		 jq_print+='<iframe id="info2" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="" frameBorder="0" width="0" height="0"></iframe>';

var bindFrameActions=function () {
		$('#ex_print').html(jq_print);
	
			$('#ex_print')
			   .jqDrag('.jqDrag')
			   .jqResize('.jqResize') ;
		};

$("#general_legend").click(function()
{
print_legend();
})										
$("#genus_g_legend").click(function()
{
points_legend(edit_points.params.SLD);
})
$("#4th_g_legend").click(function()
{
points_legend(edit_4th_points.params.SLD);
})
$("#sp_g_legend").click(function()
{
points_legend(edit_sp_points.params.SLD);
})

	var points_legend=function(sld)
	{
		$.get('http://edit.br.fgov.be/edit_wp5/geo/points_legend.php?sld='+sld,function(url_image)
										{
									
										bindFrameActions();
										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 
										$("#ex_print").hide(); 
										});
	}

	$("#print_data").show();
	$("#print_data").trigger('click')
	$("#print_params").append(data);
	
	
		$('#print_params li:has(ul)')
	          .click(function(event){
	            if (this == event.target) {
				if ($(this).children().is(':hidden'))
					$(this).css('list-style-image', 'url(img/minus.gif)');
	//				$(this).css('font-color', '#ad1a1c')
	//				$(this).css('font-size', '10');

				else
					$(this).css('list-style-image', 'url(img/plus.gif)');

	            $(this).children().toggle('slow');
	            }
	        //    return false;
	          })
	          .css({cursor:'pointer',
	    //     		font-color:'#ad1a1c',
	////				'font-size':'10',
	                'list-style-image':'url(img/plus.gif)'})
	          .children().hide();
	

							var create_scalebar=function()

							{

			  	var bbox=map.getExtent().toBBOX();		  

				 var l_size=$("#l_size option:selected").val();

				 var label_size=$("#l_label_size option:selected").val();	 

				 var intervals=$("#l_intervals option:selected").val();	 

				 var g_units=$("#l_units option:selected").val();

				 var width=$("#map").width();

				 var height=$("#map").height();	 

			     var proj=map.getProjection();
				 var units=map.getUnits();

				if (map.getProjection() !=='EPSG:4326')
				{
				alert("Scalebar only is avaible for latitude/longitude projection");$("img[id='scalebar']").css('visibility','hidden');return false;
				}
				else
				{ 
							$.get('http://edit.br.fgov.be/edit_wp5/geo/test_scalebar2.php',{g_units:g_units,proj:proj,bbox:bbox,w:width,h:height,units:units,label_size:label_size,l_size:l_size,intervals:intervals},function(s)

					        {

					        d='http://edit.br.fgov.be/edit_wp5/geo/images/scalebars/'+s;

							//wwhy not directly scalebar?????? (it's a local variable)

							img_scalebar=s;		

		

			$("#scalebar").css('top','-30px').css('left',-$("#map").height()/2);

							//windrose=$("#windrose_form option:selected").val();

					      if ($("#windrose").css('visibility')=="visible")
									{

			//				$("#scalebar").css('top','0px');
							$("#scalebar").css('top',-30);

							}

					        $("#scalebar").attr('src',d);



							$("#scalebar").width(l_size);

			$("#scalebar").css('visibility','visible');

					         $("#scalebar").fadeIn();



					        });

			}
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
					var windrose_path="http://edit.br.fgov.be/edit_wp5/geo/images/windroses/"+img;

					$("#windrose").attr('src',windrose_path);


					$("#windrose").css('visibility','visible').css('width','100');

			$("#windrose").css({position:'absolute'});
			
			$("#windrose").css('top',-$("#map").height());
			$("#windrose").css('left',$("#map").height()-50);

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
						if (map.getProjection() !=='EPSG:4326')
						{
						alert("This feature currently only works with latitude/longitude");return false;
						}
						else
						{
						
						
										var bbox=map.getExtent().toBBOX();
									var dpi=$("#dpi_form option:selected").val();
									var area=$("#keympap_background option:selected").val();	
								var zoom=$("#print_params input[name='radio']:checked").attr('id');
									
					
					$.get('http://edit.br.fgov.be/edit_wp5/v1/keymap.php?bbox='+bbox+"&dpi="+dpi+"&area="+area+"&zoom="+zoom+"&img=false",function(url_image)
										{
									
										bindFrameActions();
										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 
										$("#ex_print").hide(); 
										});
						}
						})
						
										$("#get_points").click(function()

					        {		
										print='points_legend';
					        			$.getScript('js_code/added_prints.js');

						})
		
				
					
				
    });
