$(document).ready(function(){
var bindBehaviors=function(){
	
$('input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){$(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex3').hide()});




}; //fi de funcion BindBehaviours

$('#sp_query_container table').remove();
polygon=$("#ppol_form option:selected").attr('id');

var ajax_show=true;

 $.ajax({url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/queries/spatial_query_adaptat.php',type: 'GET',data: {x:x, y:y,userid:userid,polygon:polygon},dataType:'html',success:function(data) {$("#sp_query_container").append(data); bindBehaviors(data);}});	




});