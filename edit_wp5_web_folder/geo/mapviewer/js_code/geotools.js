$(document).ready(function(){

var bindFrameActions=function() {
$('#gbif_win').jqm({
    overlay: 30
})
    var text='Geographic Tools';


	msie=($.browser.msie==true)?true:false; 
	if (msie)
	{

	 $('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','15px');
	}
	else 
	{
	$('input.jqmdX').css('background','url(http://edit.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
	}
    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="geo_frame" name="geo_frame" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.africamuseum.be/edit_wp5/geo/formularis/boxes_form.html?userid='+userid+'&p='+third+'_'+fourth+'" frameBorder=0 width=420 height=300; background-color=#D7DBDF"></iframe></div></div><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div>';

if ($("#geo_win").length>0)
{
$("#geo_win").empty().hide()
}

$('#geo_win').append(jq);

var iframe=$('iframe#geo_frame'); 

 $(iframe).bind('load', function()
{
    iframe=$("iframe#geo_frame");
    submit_button=iframe.contents().find("#doc").find("input[id='submit'],input[id='submit_zoom']");  
submit_button.click(function(event)
{
var info;	
//div .genus_div
iframe=$("iframe#geo_frame");
var d=[];
if ($(this).parents().eq(3).attr('id')=="genus_div") 
{
//	alert($(event).parents().eq(3).attr('id'))
	 info="genus";
	iframe.contents().find('#genusSelect option:selected').each(function()
	{
		d.push(this.text);
	});
	}
else
	{
	  info="specie";	

	iframe.contents().find('#specieSelect option:selected').each(function()
	{
		d.push(this.text);
	});
	}  

$.get('http://edit.africamuseum.be/edit_wp5/geo/queries/marker_bbox.php?userid='+userid+"&data="+d+"&info="+info,function(coords)
{

		var ext=coords.split(",");
	    var boxes_bounds=new OpenLayers.Bounds(ext[0], ext[1], ext[2], ext[3]);


	       				if (boxes.map==null)
						{	
//						box = new OpenLayers.Feature.Vector(boxes_bounds.toGeometry());	
												box = new OpenLayers.Marker.Box(boxes_bounds);			
		                 boxes.addMarker(box);
						map.addLayer(boxes);
						iframe.contents().find("#remove_mark").show(); 
						
						}
						else
						{
						//boxes.removeFeatures(boxes.features[0])	
						boxes.removeMarker(boxes.markers[0]);
//					boxes.markers[0].destroy()
						//box = new OpenLayers.Feature.Vector(boxes_bounds.toGeometry());		
						box = new OpenLayers.Marker.Box(boxes_bounds);						
		                 boxes.addMarker(box);						
					
						}
					if ($(event.target).attr('id')=="submit_zoom")
					{
						var center=box.bounds.getCenterLonLat();
						map.setCenter(center,map.getZoomForExtent(box.bounds));	
					}
					iframe=$("iframe#geo_frame");
					iframe.contents().find("#remove_mark").show(); 
					iframe.contents().find("input[id='remove_mark']").click(function()
					{
						
						boxes.removeMarker(boxes.markers[0]);
						map.removeLayer(boxes);
						$(this).hide();
						return false;	
					})
	                  		box.events.register("click", box, function (e) {
		                        this.setBorder("yellow");					
								var center=this.bounds.getCenterLonLat();
								 map.setCenter(center,map.getZoomForExtent(this.bounds));
								})


})
return false;
})

    $('input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#geo_win').hide(); 
 if(submit_button.hasClass("add"))(submit_button.removeClass("add").val('Make bbox2'));
		});
	

})
$('#geo_win').show();
$('iframe#geo_frame').show();
$('#geo_win')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize');
}
bindFrameActions();

})