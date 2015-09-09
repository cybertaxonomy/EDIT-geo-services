ajax_show=true;
$("img[id='ajax_image']").css('visibility','visible');
polygon=$('#run_analysis option:selected').val();
$("#run_analysis").addClass('clicked');
			
function toogle_ppol(data)
{
if (data.checked)
{
eval("edit_"+data.id+".setVisibility(true)");
}else
{
eval("edit_"+data.id+".setVisibility(false)");
}
}
	ajax_show=true;					
	$.ajax({url:'http://edit.africamuseum.be/edit_wp5/geo/point_pol/ppol_adaptat.php?polygon='+polygon+'&user='+userid+'&sld='+user_info,type:'get',user:userid,polygon:polygon,dataType:'json',timeout:120000,
error: function() {alert("some error; possibly no selected polygon crosses any point")} ,success:function(j)
						{						
	bbox=j['bbox'];
					sld_num_regs="http://edit.africamuseum.be/edit_wp5/geo/sld/"+j['sld_num_regs'];	
					num_regs_legend="http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?version=1.0.0&Format=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:num_regs&SLD="+sld_num_regs;												
//alert(sld_num_regs);												
					sld_num_genus="http://edit.africamuseum.be/edit_wp5/geo/sld/"+j['sld_genera'];	
					num_genus_legend="http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?version=1.0.0&Format=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:num_regs&SLD="+sld_num_genus;													
					sld_taxa_record="http://edit.africamuseum.be/edit_wp5/geo/sld/"+j['sld_taxa_rec'];							
					taxa_rec_legend="http://193.190.223.53:8080/geoserver/wms/GetLegendGraphic?version=1.0.0&Format=image/png&WIDTH=25&HEIGHT=20&LAYER=topp:taxa_record&SLD="+sld_taxa_record;	
	
var fill_it=function(layerName)
{
			switch (layerName) {
					case 'num_regs':
					{	

						if ($("#analysis_lay table img[id='num_regs']").length>0)
						{
					
						$("img[id='num_regs']").attr('src',num_regs_legend);
							$("table[id='num_regs'] a:last").attr('href',"http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=numregs&user="+userid+"&bbox="+bbox+"&layer2=topp:"+polygon+"&sld="+sld_num_regs);
							
					
					edit_num_regs.params.SLD=sld_num_regs;
						edit_num_regs.redraw();
							}
						else {
							
						extra='<table id="num_regs"><tr><td><input id="num_regs" grup="analysis" type="checkbox" visibility="visible" onclick="toogle_ppol(this);c_legend(this)"/><label style="font-size:11">Number of Records</label></td>';
	extra+='</tr><tr><td><a style="text-decoration: underline" class="visible">Hide legend</a></td></tr><tr><td><img id="num_regs" src='+num_regs_legend+' /></td></tr>';
	extra+='<br><a href="http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=numregs&user='+userid+'&bbox='+bbox+'&layer2=topp:'+polygon+'&sld='+sld_num_regs+'"  target="blank">Show Number of Records graphic on new window</a>';
		$("#analysis_lay").append(extra);
			$("table[id='num_regs'] a:first").click(function()
		{		if ($(this).hasClass('visible')){ $("table[id='num_regs'] img").fadeOut("slow"); 
$(this).removeClass('visible');$(this).text('Show legend');
}		else { $("table[id='num_regs'] img").fadeIn("slow");
$(this).addClass('visible')
$("table[id='num_regs'] img").fadeIn("slow"); $(this).text('Hide legend');
}
});
		edit_num_regs.params.SLD=sld_num_regs;
		map.addLayer(edit_num_regs);
		edit_num_regs.setVisibility(false);
		
							}
							break;
					}
					case 'num_genus':
					{

					if ($("#analysis_lay table img[id='num_genus']").length>0)
						{
							$("img[id='num_genus']").attr('src',num_genus_legend);
							$("table[id='num_genus'] a:last").attr('href',"http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=numregs&user="+userid+"&bbox="+bbox+"&layer2=topp:"+polygon+"&sld="+sld_num_genus);
						edit_num_genus.params.SLD=sld_num_genus;
						edit_num_genus.redraw();
							}
						else { 
													
extra='<table  id="num_genus"><tr><td><input id="num_genus"  grup="analysis" type="checkbox" visibility="visible" onclick="toogle_ppol(this);c_legend(this)"/><label style="font-size:11">Number of Genus</label></td>';
	extra+='</tr><tr><td><a style="text-decoration: underline" class="visible">Hide legend</a></td></tr><tr><td><img id="num_genus" src='+num_genus_legend+' /></td></tr>';
	extra+='<br><a href="http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=numgenus&user='+userid+'&bbox='+bbox+'&layer2=topp:'+polygon+'&sld='+sld_num_genus+'"  target="blank">Show Number of Genus graphic on new window</a>';
		$("#analysis_lay").append(extra);

		$("table[id='num_genus'] a:first").click(function()
		{		if ($(this).hasClass('visible')){ $("table[id='num_genus'] img").fadeOut("slow"); 
$(this).removeClass('visible');$(this).text('Show legend');
}		else { $("table[id='num_genus'] img").fadeIn("slow");
$(this).addClass('visible')
$("table[id='num_genus'] img").fadeIn("slow"); $(this).text('Hide legend');
}
});
							edit_num_genus.params.SLD=sld_num_genus;
							map.addLayer(edit_num_genus);
							edit_num_genus.setVisibility(false);
							}
							break;

					}
						case 'taxa_record':
						{
							
						if ($("#analysis_lay table img[id='taxa_rec']").length>0)
							{
								$("img[id='taxa_rec']").attr('src',taxa_rec_legend);
								$("table[id='taxa_rec'] a:last").attr('href',"http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=tax/reg&user="+userid+"&bbox="+bbox+"&layer2=topp:"+polygon+"&sld="+sld_taxa_record);
							edit_taxa_record.params.SLD=sld_taxa_record;
								edit_taxa_record.redraw();
								}
							else {
							

	extra='<table id="taxa_rec"><tr><td><input id="taxa_record"  grup="analysis" type="checkbox" visibility="visible" onclick="toogle_ppol(this);c_legend(this)"/><label style="font-size:11">Taxa/records</label></td>';
	extra+='</tr><tr><td><a style="text-decoration: underline" class="visible">Hide legend</a></td></tr><tr><td><img id="taxa_rec" src='+taxa_rec_legend+' /></td></tr>';
	extra+='<br><a href="http://edit.africamuseum.be/edit_wp5/geo/curves/edit_user_curves.php?layer=tax/reg&user='+userid+'&bbox='+bbox+'&layer2=topp:'+polygon+'&sld='+sld_taxa_record+'"  target="blank">Show Number of Records graphic on new window</a>';
		$("#analysis_lay").append(extra);
	
	$("table[id='taxa_rec'] a:first").click(function()
		{		if ($(this).hasClass('visible')){ $("table[id='taxa_rec'] img").fadeOut("slow"); 
$(this).removeClass('visible');$(this).text('Show legend');
}		else { $("table[id='taxa_rec'] img").fadeIn("slow");
$(this).addClass('visible')
$("table[id='taxa_rec'] img").fadeIn("slow"); $(this).text('Hide legend');
}
});
						    edit_taxa_record.params.SLD=sld_taxa_record;
							map.addLayer(edit_taxa_record);
							edit_taxa_record.setVisibility(false);
							}
								break;

						}
			}//end switch
			$("#analysis_lay").slideDown();
			//$("#analysis_lay a").css({'target':blank});
}//end of fill_it fx
	fill_it('num_regs');		fill_it('num_genus');		fill_it('taxa_record');
	map.setLayerIndex(edit_points,map.layers.length);
//change2($("#interactive_analysis"));
$("img[id='ajax_image']").css('visibility','hidden');
//$("#interactive_analysis").show();
}});//end of ajax callback
