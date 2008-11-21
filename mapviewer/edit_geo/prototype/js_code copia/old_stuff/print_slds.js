$(document).ready(function(){   
	alert("sdf");
var bindFrameActions=function(data_format) {
  var iframe=$('iframe#info');
console.log(iframe);
   iframe.load(function()
{
	   alert("se suposa estem carregant iframe");

});
};
	var jq_print='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
 jq_print='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=330 marginHeight=330 src="http://edit.csic.es/fitxers/images/edit_images.php?format=pngs" frameBorder=0 width=200 height=200></iframe>';

$('#ex2').html(jq_print);
//bindFrameActions();
	$('#ex2').show();


$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;

});