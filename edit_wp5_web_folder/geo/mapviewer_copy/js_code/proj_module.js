

  $.get('http://edit.africamuseum.be/edit_wp5/geo/modules/proj_module.php',function(data)
{
	$("#projections").show();
	$("#projections").trigger('click')

	$("#proj_params").append(data);
cat=$("input[id='crs_name_submit']");

$(cat).click(function () { 
	var area=$("#area option:selected").attr('id');
	var type=$("#crs_type option:selected").attr('id');
	var f=$("select[id='final']");
$.get('http://edit.africamuseum.be/edit_wp5/geo/crs_forms/select_crs_name.php',{ ajax:true,area:area,type:type } ,
   function(data)
{
	$("select[id='crs_final']").empty();
	$("select[id='crs_final']").append(data)
	var bind_proj=function()
	{

	 $("a[id='ok']").click(function()
	{
	var proj=$("#crs_final option:selected").val();
	var area=$("#area option:selected").attr('id');

		$.get('http://edit.africamuseum.be/edit_wp5/geo/crs_forms/asking_proj.php?proj='+proj+'&source=own',function(t)
		{

			eval(t);
		})


		proj=proj.split(':');
		proj=proj[1];

	//s is used in getlayers2
	s=$("div[id='EPSG:"+proj+"'] ul li").eq(1).children().text();
console.info(s)
		reprojecting=true;
		create_json(reprojecting);

	//	do_it(map,s,options,"EPSG:"+proj);

	})
	}
//we don't want to preview info, just reproject
	 $("a[id='change_proj_now']").click(function()
	{
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
	$.get('http://edit.africamuseum.be/edit_wp5/geo/crs_forms/asking_proj.php?proj='+proj+'&area='+area,function(data){
		
		
	})
}

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
	$.get('http://edit.africamuseum.be/edit_wp5/geo/crs_forms/asking_proj.php?proj='+proj+'&area='+area,function(data){

		if ($("#gallery a").length>0)
		{
			console.warn("some galleyr");
		$("#gallery").empty();
	
		$("#jquery-lightbox,#jquery-overlay").remove();
		}
		$("#jquery-lightbox,#jquery-overlay").remove();
	    $("#gallery").append(data);
			$('#gallery a').eq(0).lightBox();
			$("#right,#middle,#header,#escala").css('visibility','hidden');
			$("#escala div").css('visibility','hidden');
			$('#gallery a').eq(0).trigger('click');
		bind_proj();


		})

	}

	})
})
})


})
