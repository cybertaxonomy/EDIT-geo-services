

  $.get('../modules/proj_module.php',function(data)
{

$("#area").change(function()
{

$("#crs_final").empty().hide()
})
	$("#proj_params").append(data);
cat=$("input[id='crs_name_submit']");

$(cat).click(function () { 
	var area=$("#area option:selected").attr('id');
	var type=$("#crs_type option:selected").attr('id');
	var f=$("select[id='final']");
$("#switch_4326").unbind('click')
$("#change_proj").unbind('click')
$.get('../crs_forms/select_crs_name.php',{ ajax:true,area:area,type:type } ,
   function(data)
{
$("#crs_final").show()
	$("select[id='crs_final']").empty();
	$("select[id='crs_final']").append(data)
	var bind_proj=function()
	{
$("a[id='cancel']").click(function()
{
$("#crs_final").empty().hide();
	$("#gallery").empty();
	$("#jquery-lightbox,#jquery-overlay").remove();
$("#right,#middle,#header,#escala,#area,#crs_type,#crs_final").css('visibility','visible');
				$("#right").show();
				$("#escala div").css('visibility','visible');
})
	 $("a[id='ok']").click(function()
	{

	var proj=$("#crs_final option:selected").val();
	var area=$("#area option:selected").attr('id');
	$("#right").show();
		$.get('../crs_forms/asking_proj.php?proj='+proj+'&source=own',function(t)
		{

			eval(t);
		})


     if (proj !=="EPSG:4326")
{
	$("img[id='scalebar']").css('visibility','hidden');
}
		proj=proj.split(':');
		proj=proj[1];
$("#crs_final").empty().hide();
	//s is used in getlayers2
	s=$("div[id='EPSG:"+proj+"'] ul li").eq(1).children().text();

		reprojecting=true;

		create_json(reprojecting);
if ($("#gbif").css('display')!=='none') change2($("#gbif"));$("#gbif_m").children().text('Show module');
$("#gbif_m").removeClass('visible');
if ($("#analysis").css('display')!=='none') change2($("#analysis"));$("#analysis_m").children().text('Show module');
$("#analysis_m").removeClass('visible');
if ($("#google_projections").css('display')!=='none') change2($("#google_projections"));$("#g_proj_m").children().text('Show module');
$("#g_proj_m").removeClass('visible');
if ($("#upload_projects").css('display')!=='none') change2($("#upload_projects"));$("#projects_m").children().text('Show module');
$("#projects_m").removeClass('visible');
if ($("#remote_layers").css('display')!=='none') change2($("#remote_layers"));$("#remote_m").children().text('Show module');
$("#remote_m").removeClass('visible');

	//	do_it(map,s,options,"EPSG:"+proj);

	})
	}
//we don't want to preview info, just reproject

$("#switch_4326").click(function()
{
	reprojecting=true;
	proj2="4326";
	s="-180,-90,180,90";
	create_json(reprojecting);
})
	 $("div[id='change_proj']").click(function()
	{

		if ($("#gallery a").length>0)
		{
			
		$("#gallery").empty();
	
		$("#jquery-lightbox,#jquery-overlay").remove();
		}
	var proj=$("#crs_final option:selected").val();

	if (proj=='gsat' || proj=='gmap' || proj=='ghyb' || proj=='veroad' || proj=='veaer' || proj=='vehyb' || proj=='yahoo' || proj=='yahoosat' || proj=='yahoohyb' || proj=='mapnik')
	{
		reprojecting=true;
		proj2='900913';
	//	alert("hi frank");
	create_json(reprojecting);	
	}
	else
	{
	proj2=proj.split(':');
	proj2=proj2[1];
var area=$("#area option:selected").attr('id');
	$.get('../crs_forms/asking_proj.php?proj='+proj+'&area='+area,function(data){

		if ($("#gallery a").length>0)
		{
	
		$("#gallery").empty();
	
		$("#jquery-lightbox,#jquery-overlay").remove();
		}
		$("#jquery-lightbox,#jquery-overlay").remove();
	    $("#gallery").append(data);
			$('#gallery a').eq(0).lightBox();
			$("#right,#middle,#header,#escala").css('visibility','hidden');
			$("#right").hide();
			$("#escala div").css('visibility','hidden');
			$('#gallery a').eq(0).trigger('click');
		bind_proj();


		})

	}

	})

})
})


})
