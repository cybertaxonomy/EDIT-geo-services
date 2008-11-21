
$(document).ready(function(){
//var iframe=$('iframe#gbif');
$('#gbif_win').jqm({
    overlay: 30
})
    var text='GBIF data browser (click here and drag me)';

    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="gbif" name="gbif_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/fitxers/gbifs/index.html" frameBorder=0 width=380 height=300; background-color=#D7DBDF"></iframe></div></div>';
	msie=($.browser.msie==true)?true:false; 
	if (msie)
	{
	    $('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/images/close_icon.png) no-repeat').css('width','15px')
	}
	else 
	{
	$('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/JQ_win_files/close.gif) no-repeat top left;');
	}

    $('#gbif_win').append(jq);

	$('input.jqmdX').hover(function(){
         $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#gbif_win').empty().hide();
		});
	var iframe=$('iframe#gbif'); 
/* 
  //  bindFrameActions();
	li.click(function() {
		alert("clicking each time"); //config.objects.mainMap.doc.selectSingleNode("//wmc:Rule/wmc:Filter/wmc:And/wmc:PropertyIsEqualTo[2]/wmc:Literal").firstChild.nodeValue="13534258";
	 });
*/
	$(iframe).one('load', function()
	{
//		 alert("loading iframe");
		var iframe=$('iframe#gbif'); 
	  body=iframe.contents().find("body"); 
//	  console.log(body);   
	body.click(function(event)
		{
	//	console.log(event.target.id);
		//console.log(event.target.className);
		if(event.target.id=='map_it')
		{
	var map_it=iframe.contents().find("#map_it"); 
	var taxa_id=map_it.parent().prev().text();
	taxa_id=parseInt(taxa_id);
//	console.warn(taxa_id);
//	console.info(taxa_id);	
	//console.log(taxa_id);
	var to=config.objects.mainMap.doc.selectSingleNode('//wmc:Rule/wmc:Filter/wmc:And/wmc:PropertyIsEqualTo[2]/wmc:Literal').firstChild;
	to.nodeValue=taxa_id;
		config.objects.mainMap.setHidden('gbif:gbifDensityLayer',false);
		config.objects.mainMap.setParam("refresh");

		$("#altres_lay").slideDown('slow');
		}
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
//				config.objects.mainMap.setParam("refresh");		
		}
		});  //end of body.click

		});  //end iframe load
//		console.warn(li);
		   
  //  bindFrameActions();
/*
	li.click(function() {
		config.objects.mainMap.doc.selectSingleNode('//wmc:Rule/wmc:Filter/wmc:And/wmc:PropertyIsEqualTo[2]/wmc:Literal').firstChild.nodeValue='13534258';
			config.objects.mainMap.setParam("refresh")
			$("iframe#gbif").contents().find("ul#__1__");
//			console.log($("ul#__3__ li a"));
//		alert("clicking i config"); 
	 });
	});
	*/
msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/JQ_win_files/close.gif)  no-repeat top left').css('width','14px');
}
else 
{
$('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/JQ_win_files/close.gif) no-repeat top left');
}
	$('#gbif_win').show();
	$('iframe#gbif').show();
	$('#gbif_win')
	   .jqDrag('.jqDrag')
	   .jqResize('.jqResize') ;

});