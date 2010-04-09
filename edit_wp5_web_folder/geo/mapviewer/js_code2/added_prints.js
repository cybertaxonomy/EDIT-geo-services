 var iframe=$('iframe#info2');
			var jq_print='<div class="jqmdTL" style="background-size: 0%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
		 jq_print+='<iframe id="info2" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="" frameBorder="0" width="0" height="0"></iframe>';

var bindFrameActions=function () {
		$('#ex_print').html(jq_print);
	
			$('#ex_print')
			   .jqDrag('.jqDrag')
			   .jqResize('.jqResize') ;
		};

		if (print=='keymap')
		{
					var bbox=map.getExtent().toBBOX();
					
					$.get('http://edit.africamuseum.be/edit_wp5/v1/keymap.php?bbox='+bbox,function(url_image)
										{
									
										bindFrameActions();
										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 
										$("#ex_print").hide(); 
										});
		}
		else if (print=='points_legend')
		{
		sld=edit_points.params.SLD;
		$.get('http://edit.africamuseum.be/edit_wp5/geo/points_legend.php?sld='+sld,function(url_image)
										{
									
										bindFrameActions();
										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 
										$("#ex_print").hide(); 
										});
		
		}
		else
		{
		$.get('http://edit.africamuseum.be/edit_wp5/geo/general_legend.php?data='+tot,
		function(url_image)
										{
									
										bindFrameActions();
										$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 
										$("#ex_print").hide(); 
										});
										
		}