var bindFrameActions=function (data_format) {
		  var iframe=$('iframe#info2');
			var jq_print='<div class="jqmdTL" style="background-size: 0%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">PRINT IT</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>'; 
		 jq_print+='<iframe id="info2" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="" frameBorder="0" width="0" height="0"></iframe>';


		$('#ex_print').html(jq_print);
		//bindFrameActions();
			//$('#ex2').show();
			$('#ex_print')
			   .jqDrag('.jqDrag')
			   .jqResize('.jqResize') ;
		};
	ajax_show=true;
var up=1;
var d={};
var size=$("#img_size_form option:selected ").val();
var dpi=$("#dpi_form option:selected").val();


				
				switch (dpi)
				{
					case ('120'): 
					
					 if (screen_w !=='big')
					 {

				    // if (size=='medium'){ up=0.5} 
				     if (size=='big') { up=1 }
				 	 }
					else  //dealing with 900x450 pixels!
					{
						 						
					 //	if (size=='medium'){ up=2.5} 
					    if (size=='big') { up=0.8 }	
					}
				     
				break;
				case ('240'): 
				  	if (screen_w !=='big')
					 {
				     if (size=='medium'){ up=1} //correcte
				     if (size=='big') { up=2 }
				 	 }
				    else
				    {

					 	if (size=='medium'){ up=0.8} //correcte
					    if (size=='big') { up=1.6 }    
				}
				     
				break;
				case ('480'): 
				 	if (screen_w !=='big')
					 {
				     if (size=='medium'){ up=2} 
				     if (size=='big') { up=4 }
					}
					else
					{
						 if (size=='medium'){ up=1.6} 
					     if (size=='big') { up=3.2 }	
					}
				break;
				case ('600'): 
					if (screen_w !=='big')
					 {
				 if (size=='medium'){ up=3} 
				  if (size=='big') { up=6 }//4200x2100 (4400x2300 amb grids)
					}
					else
					{
						if (size=='medium'){ up=2.4} 
						if (size=='big') { up=4.8 }	
					}
				break;
				}
var mapserv;			
var fourth_path,sld_path,sp_sld_path;	
d.up=up;
d.dpi=dpi;
//console.log(edit_points.params.SLD);
d.screen_w=screen_w;
d.proj=map.getProjection();

 var width=(map.size.w)*up;            
            d.width=width;
            var height=(map.size.h)*up;
            d.height=height;
			var data_format=$("#format_form option:selected ").val();
			d.format=data_format;
			var bbox=map.getExtent().toBBOX();
			
			
		//	 var p =map.getExtent();
	
		//	 p2=p.transform(p_4326,p_3034);
		//	bbox=p2.left+","+p2.bottom+","+p2.right+","+p2.top;
			d.bbox=bbox;

			d.user=userid;
				if (data_format=='tif' || data_format=='tif/gray')
				{
				var cmyk=$("#tif_form option:selected ").val();	
				d.cmyk=cmyk;
				var bits=$("#bits_form option:selected").val();
				d.bits=bits;				
				}


			if ($("img[id='scalebar']").css('visibility')!=='hidden')
			{
			d.scalebar=img_scalebar;
			//var img_scalebar='';
			}
			if ($("img[id='windrose']").css('visibility')!=='hidden')
			{
			d.windrose=$("#choose_windrose_form option:selected")[0].value;
			}


var array=new Array();	
array['untiled_style']='';	
d.point_position='';		
for (i=0;i<map.layers.length;i++)
				{
				
		if (map.layers[i].getVisibility())
				{
				if (map.layers[i].name !=='My polygons to hover' && 
				
				map.layers[i].name !=='Polygon to query' && 
				map.layers[i].name !=='Polygon Layer' && 
				map.layers[i].name !=='OpenLayers.Handler.Polygon' &&
				map.layers[i].name !=='OpenLayers.Handler.Point' && map.layers[i].name !=='EDIT WMS transparent') 
				
				{


//console.log(map.layers[i].params.LAYERS);
		if (map.layers[i].CLASS_NAME=='OpenLayers.Layer.WMS.Untiled')
{
											
//console.log("untiled is..."+map.layers[i].params.LAYERS);
if (map.layers[i].params.SLD)
{

if (map.layers[i].params.LAYERS=='user_points')
//LAYERS=='topp:user_points')
{
console.log(map.layers[i].name);

			if (map.layers[i].name=='third field points')
			{
						sld_path=map.layers[i].params.SLD;	
						d.sld_path=sld_path;	
						d.point_position+="genus_"+i+",";
			}	

			if (map.layers[i].name=='fourth field points')
			{
				fourth_path=map.layers[i].params.SLD;	
				d.fourth_sld_path=fourth_path;
				d.point_position+="fourth_"+i+",";
			}
			if (map.layers[i].name=='third&fourth field points')
			{
				sld_path=map.layers[i].params.SLD;	
				d.sp_sld_path=sld_path;
				d.point_position+="3_4_"+i+",";
			}
		
}
				
else
{
	
//console.log(map.layers[i].params.SLD+"for layer"+ map.layers[i].params.LAYERS);
//NOT ANY CASE FOR THE MOMENT (EXCEPT POINTS)
var sld=map.layers[i].params.SLD;
if (map.layers[i].name !=='Your symbolized polygons')
{
sld=sld.split("?");
sld=sld[1];
sld=sld.split("=");
sld=sld[1];

sld=sld.substring(0,sld.length-1);
var l=map.layers[i].params.LAYERS;
array['untiled_style']+=i+"*"+l+","+sld+"@";
}
else
{
d.serialized_sld=sld;
}


console.log(sld);


}
}  //END params.SLD
else { 
if (map.layers[i].params.GROUP=='quadricules')
{

grids=map.layers[i].params.LAYERS;
//we allways have two layers on grids (one for polygon and another one for lines (used for correct
//labeling on screen)
grids=grids.split(',');
//we just take 1 of grids
d.grids=grids[0];
}
else
{
var c=map.layers[i].params.LAYERS.split(',');
var s=map.layers[i].params.STYLES.split(',');

//console.warn(c);
if (c.length >1)
{
console.log(c)
for (x=0;x< c.length;x++)
{
var l=c[x];

var style=s[x];

//array['untiled_style']+=i+"*"+l+","+s[x]+"@";
//admin_c_america,admin_level_1

if(style.search("admin_level_")==0)
{ 

array['untiled_style']+=i+"*"+s[x]+","+l+"@";

} 
else 
{ //yes
	array['untiled_style']+=i+"*"+l+","+s[x]+"@";
}


}
}
else
{
l=c[0];

//	9*admin_level_0,
//array['untiled_style']+=i+"*"+l+","+s[0]+"@";

if(s[0].search("admin_level_")==0)
{ //NO ADMIN LEVE

array['untiled_style']+=i+"*"+s[0]+","+l+"@";

} 
else 
{ //yes, "admin_level_" is present on the style

//	l=c[0].substring(5);

	array['untiled_style']+=i+"*"+l+","+s[0]+"@";
}

}
}
}
}

else
{


//NORMAL WMS
//console.warn(map.layers[i].CLASS_NAME);
if (map.layers[i].CLASS_NAME=="OpenLayers.Layer.MapServer")
{

x={};
x.userid=userid;
//x.ms_layer=map.layers[i].params.LAYERS;
x.ms_layer='shoreline';
x.bbox=map.getExtent().toBBOX();
x.w=width;x.h=height;

$.ajax({type:'GET',url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/mapserver_map.php',data:x				
})//end ajax	

//d.ms_layer=map.layers[i].params.LAYERS;
d.ms_layer='shoreline';
}
else
{
c=map.layers[i].params.LAYERS.split(',');
s=map.layers[i].params.STYLES.split(',');
//console.warn(c);
if (c.length >1)
{
for (x=0;x< c.length;x++)
{
var l=c[x];
//l=l.substring(5);
var style=s[x];
//console.warn(style)

//admin_c_america,admin_level_1
if(style.search("admin_level_")==-1)
{ 

array['untiled_style']+=i+"*"+l+","+s[x]+"@";

} 
else 
{ //yes
	array['untiled_style']+=i+"*"+s[x]+","+l+"@";
}

}
}
else //more than one lyaer
{
	l=c[0];
	//console.warn(s);
	//	9*admin_level_0,
	if(s[0].search("admin_level_")==-1)
	{ //NO ADMIN LEVE
//	l=l.substring(5);
	array['untiled_style']+=i+"*"+l+","+s[0]+"@";

	} 
	else 
	{ //yes
	//	l=c[0].substring(5);

		array['untiled_style']+=i+"*"+s[0]+","+c[0]+"@";
	}	
}
}
}
}

}
}
//x=array.join('|');
var untiled_style;
var untiled_style=array['untiled_style'].substring(0,array['untiled_style'].length-1);
//console.warn(array['untiled_style'])


d.untiled=untiled_style;

if (up!==1)
{
		var serialize_xml=function(url,taxa)
		{
	    	$.get(url,{},function(xml) 
		{

		var format = new OpenLayers.Format.XML();
	 	var root = xml.documentElement;
	 	FeatureType=root.getElementsByTagNameNS(root,'http://www.opengis.net/sld','FeatureTypeStyle')[0];
		 $("Rule",xml).each(function(index,s) 
					{
						var size=$(this).find("Size").children();
						$(size).each(function(i)
							{

							size_val=this.firstChild.nodeValue;
						//	console.log(size_val)
							size=this.firstChild;
							})
						size.nodeValue=size_val*up;	
						//	console.log(size.nodeValue)
						var s_width=$(this).find("Stroke").find("CssParameter[name='stroke-width']").children();
						$(s_width).each(function()
						{
							s_width=this.firstChild;
							s_width.nodeValue=(this.firstChild.nodeValue)*up;														
						})	
					})

					 var text = format.write(xml)+"&user="+userid+"&to_filter="+taxa;
		//	console.log(text);
		$.ajax({url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/test_xmls2.php',processData:false, type:'POST',
		dataType:'text/xml',data:'data='+text,success:function(new_sld)
		{
			switch (taxa)
			{
				
				case 'genus': d.sld_path=new_sld;break;
				case 'fourth': d.fourth_sld_path=new_sld;break;
				case '3_4': d.sp_sld_path=new_sld;break;
			}
		}
	})

		 })
		}//end function serialize_xml

	if(d.sld_path)
	{
	//	var url=edit_points.params.SLD;	
		serialize_xml(d.sld_path,"genus");
		
	}

	if(d.sp_sld_path)
	{
	//	var url=edit_sp_points.params.SLD;	
		serialize_xml(d.sp_sld_path,"3_4");
	
	}
	if (d.fourth_sld_path)
	{
		serialize_xml(d.sp_sld_path,"fourth");
	}
	 var exec=function()
	{
		$.ajax({url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/images.php',type:'GET',data:d,success: function(url_image){

												bindFrameActions();$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 	
																t=url_image.split('/');									

											img=t[6];		
											$("img[id='ajax_image']").css('visibility','hidden');
											$("#ex_print").hide(); 
													remove=function()
													{

														ajax_show=false;
													$.ajax({type:'GET',url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/remove_img2.php',
															data:{img:img},
															success:function(){ //alert("sdfsdf")
															}
															});									
													}
												//	setTimeout("remove()",10000);
											}
					});
	}
setTimeout("exec()",1000);	



}
else //up=1
{
if(typeof(sld_path) !== 'undefined')  
{
//d.sld_path=sld_path;
}

$.ajax({url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/images.php',type:'GET',data:d,success: function(url_image){
									
										bindFrameActions();$("iframe#info2").attr("src",url_image);$("#ex_print").show(); 	
														t=url_image.split('/');									
								
									img=t[6];		
									$("img[id='ajax_image']").css('visibility','hidden');
									$("#ex_print").hide(); 
											remove=function()
											{
												
												ajax_show=false;
											$.ajax({type:'GET',url:'http://taxonomicindex.africamuseum.be/edit_wp5/geo/images/remove_img2.php',
													data:{img:img},
													success:function(){ //alert("sdfsdf")
													}
													});									
											}
										//	setTimeout("remove()",10000);
									}
			});
			
}