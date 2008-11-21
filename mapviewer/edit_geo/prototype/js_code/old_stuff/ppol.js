$(document).ready(function() {	
	$('#run_analysis option:selected').each(function()
		{
			var polygon;
			polygon=this.value;
		//	alert(polygon);
		$.get('http://edit.csic.es/fitxers/point_pol/prueba_ppol.php',{param:polygon},	function() { 	  
			
			var analysis_sld=function(layerName)
			{
			//config.objects.mainMap.analysis_sld('topp:userpro')
			switch (layerName) {
			case 'topp:userpro':
			     alert("using userpro");
			   	var sld_path=config.doc.selectSingleNode("//mb:regs_sld").firstChild.nodeValue;
			
			//   var sld_path=this.doc.selectSingleNode("//wmc:Layer[3]//wmc:SLD/wmc:OnlineResource"))
 
			   var legend_url="http://edit.csic.es/geoserver/wms/GetLegendGraphic?version=1.0.0&Format=image/png&WIDTH=25&HEIGHT=20&LAYER=";
			    var legend=legend_url+layerName+'&SLD='+sld_path;
			//     var image2=document.getElementById("userpro_legend");
			     $("#userpro_legend").attr('src',legend);
			
			    //image2.setAttribute("src",legend);  
					config.objects.mainMap.setHidden('topp:userpro',0);
				break;
			case 'topp:user_taxa_record':
			alert("usant taxa_record");   
			var sld_path=config.doc.selectSingleNode("//mb:taxa_rec_sld").firstChild.nodeValue; 
			
			   var legend_url="http://edit.csic.es/geoserver/wms/GetLegendGraphic?version=1.0.0&Format=image/png&WIDTH=25&HEIGHT=20&LAYER=";
				var legend2=legend_url+layerName+'&SLD='+sld_path;
			
		//	var image3=document.getElementById("user_taxa_record_legend");
			$("#user_taxa_record_legend").attr("src",legend2);
		//	   image3.setAttribute("src",legend);
				config.objects.mainMap.setHidden('topp:user_taxa_record',0)
			   break;
					}
			}
			config.objects.mainMap.setParam("refresh");
//	config.loadModel('mainMap','http://edit.csic.es/fitxers/XMLs/iberia.xml');
					analysis_sld('topp:user_taxa_record');
					alert("executat taxa");
			


					analysis_sld('topp:userpro');
					analysis_sld('topp:user_taxa_record');
					//
					$("#user_analysis_legend").show();
				//		$("#user_taxa_record_legend").attr("src",legend2);
			//	    alert("serser");


		});
				 //fi de get


			});


			});