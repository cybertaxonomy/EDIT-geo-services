
$(document).ready(function(){

$('#gbif_win').jqm({
    overlay: 30
})
    var text='GBIF data browser (click here and drag me)';

    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/></div><iframe id="gbif" name="gbif_iframe" marginWidth=0 marginHeight=0 src="http://edit.africamuseum.be/edit_wp5/geo/gbifs/index.html" frameBorder=0 width=380 height=300; background-color=#D7DBDF"></iframe></div>';
	

    $('#gbif_win').append(jq);

	$('input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#gbif_win').empty().hide();
		});
	gbif_iframe=$('iframe[id="gbif"]'); 

	$(gbif_iframe).one('load', function()
	{

	  body=gbif_iframe.contents().find("body"); 
	
	body.click(function(event)
		{
	
		if(event.target.id=='map_it')
		{
		
	var map_it=gbif_iframe.contents().find("#map_it"); 
	taxa_name=gbif_iframe.contents().find("#taxonDetail");
	taxa_name=$(taxa_name).attr('title');
	//console.warn(taxa_name);
	$("#gbif_table label").html('GBIF data for taxa <b>'+taxa_name+'</b>');
	//$("#gbif_table label").css({'font-style':'bold'});	
	var taxa_id=map_it.parent().prev().text();
	taxa_id=parseInt(taxa_id);
edit_gbif.params.FILTER=gbif_filter(taxa_id);
if ($("input[id='gbif']").attr('checked')==false)
{
$("input[id='gbif']").trigger('click')
}
edit_gbif.redraw();

		}
		/*
		if(event.target.id=='zoom_it')
		{

				var map_it=iframe.contents().find("#map_it"); 
				var taxa_id=map_it.parent().prev().text();
				
				taxa_id=parseInt(taxa_id);	
				var to=config.objects.mainMap.doc.selectSingleNode('//wmc:Rule/wmc:Filter/wmc:And/wmc:PropertyIsEqualTo[2]/wmc:Literal').firstChild;
				to.nodeValue=taxa_id;
				
				var zoom_link=iframe.contents().find("#zoom_it"); 
				var zoom=zoom_link.prev().text();
			   	eval(zoom);
						config.objects.mainMap.setHidden('gbif:gbifDensityLayer',false);
				$("#altres_lay").slideDown('slow');	
		}
		*/
		});  //end of body.click

		});  //end iframe load


msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','14px');
}
else 
{
$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
}
	$('#gbif_win').show();
	$('iframe#gbif').show();
	$('#gbif_win')
	   .jqDrag('.jqDrag')
	   .jqResize('.jqResize') ;

});
