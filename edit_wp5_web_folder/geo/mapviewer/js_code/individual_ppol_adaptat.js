
			 var ajax_show=true;
			if ($("#ppol_form").length > 0)
			{
				$("#ppol_form").remove();$("#sp_query_container").empty();
			}
			msie=($.browser.msie==true)?true:false; 
			if (msie)
			{
			    $('#ppol_win input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/edit_geo/prototype/JQ_win_files/close.gif) no-repeat').css('width','18px');
			}
			else {

			$('#ppol_win input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/edit_geo/prototype/JQ_win_files/close.gif) no-repeat top left');
			 }
      $('#ppol_win input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){$(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ppol_win').hide();$("#ppol_form").remove();$("#sp_query_container").empty();});
				$('#ppol_win').jqDrag('.jqDrag').jqResize('.jqResize');
				$("#ppol_win").show();
	var form='<form id="ppol_form"><p>Select the polygon you want to cross your data with <br>and click on the desired polygon on the map</p> <select>';
	
			//$("#utm_legend input,#admin_legend input").each(function(i,item)
		

			$("#layers input:checked").each(function(i,d)
		{
		
		var $this=$(this);
			//console.log($this);
     
			if (d.id !='blank' && d.id !='nasa')
		{	
		p=$("input[id='"+d.id+"']").next().get(0);
		label=p.firstChild.nodeValue;
		//console.log(label);
	
		form+="<option id='"+ d.id+"'>"+label+"</option>";
		}
		});
			form+='</select></form><div id="results"/>';

			$("#sp_query_container").append(form);
		if ($("#run_analysis").hasClass("clicked"))
			{

		extra="<option id='"+d.id+"'>"+label+"</option>";
$("#ppol_form select").append(extra);
			}

			$("#ppol_win").fadeIn();
		  
		//	x=point[0];	y=point[1];

		


