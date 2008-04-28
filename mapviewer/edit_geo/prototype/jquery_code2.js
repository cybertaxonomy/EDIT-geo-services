	$(document).ready(function(){
	 //$("#admin_lay").hide();
	 $("#utm_lay").hide();
	 $("#remote_lay").hide();
	 $("#UTM2500_lay").hide();
	 //$("#esquerra").hide();
	//dt és el superior. El segueixen les opcions dd
		$("dd:not(:first)").hide();
		//$("#help").slideUp("slow");
		$("#help").hide();
		//tags dd, que no estàn a dalt (per sobre dt?), s'amaguen
		$("dt a").click(function(){
		//al clickar sobre a dt , fem el dd visible i que es mogui lent
			$("dd:visible").slideUp("slow");
			$(this).parent().next().slideDown("slow");
			return false;
		});
		
		$("a[@id='admin_data']").click(function(){
		$("#admin_data").append("<div id='utm_legend'>legend</div>");
		});
		$("a[@id='utm_data']").click(function(){
		$("#utm_lay").toggle("quick");
		});
		$("a[@id='remote_data']").click(function(){
		$("#remote_lay").toggle("quick");
		});
		$("a[@id='puntos_data']").click(function(){
		$("#puntos_lay").toggle("quick");
		});
		$("a[@id='utm_scarab_data']").click(function(){
		$("#UTM2500_lay").toggle("quick");
		});

	});