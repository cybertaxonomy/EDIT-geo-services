<?php
header("Content-Type: image/png");	  
$label=$_GET['label'];
$images_url=$_GET['images_url'];
//$images_url="a,b:edit.csic.es/fitxers/hatch_images|c:edit.csic.es/fitxers/hatch_images";
$images_url=explode('|',$images_url);
$symbols=$_GET['symbols'];
//$symbols="a,b:hatch_orange.gif|c:hatch_green.gif";
$symbols=explode('|',$symbols);
$symbols_url=array();
foreach ($symbols as $k=>$v)
{
	$symbols=explode(':',$v);
	$keys=explode(',',$symbols[0]);
	$get_v=explode(',',$symbols[1]);
	foreach ($keys as $k=>$v)
	{
		$symbols_url[$v]['symbols']=$get_v[0];
		$symbols_url[$v]['size']=$get_v[1];	
				$symbols_url[$v]['format']=$get_v[2];	
	}	
}

foreach ($images_url as $k=>$v)
{
$images=explode(':',$v);
$keys=explode(',',$images[0]);

foreach ($keys as $k=>$v)
{
$symbols_url[$v]['url']=$images[1];	
}
}
//$ad="tdwg2:d:Mexico,Caribbean||tdwg4:b:Chiapas,Oaxaca,Veracruz||tdwg3:a:MXC|b:MXE,MXG|c:MXS,MXT";
$ad=$_GET['ad'];
$color=$_GET['as'];

		$ms=$_GET['ms'];
		if (ereg(",",$ms))
		{
		$ms=explode(',',$ms);
		$width=$ms[0];
		$height=$ms[1];
		}
		else 
		{
		$width=$ms;	
		$height=$width/2;

		};

$layers=$_GET['l'];

if (ereg(",",$layers))
{
	
	$layers=explode(",",$layers);
	$ls=array();
	foreach ($layers as $k=>$v)
	{
		switch ($v)
		{
			case ('earth'): 
			$v="topp:country_earth";
		array_push($ls,$v);
			break;
			case ('e_prov'): 
			$v="topp:province_europe";
			array_push($ls,$v);
			break;
			case ('tdwg1'): 
			$v="topp:tdwg_level_1";
			array_push($ls,$v);
			break;
			case ('tdwg2'): 
			$v="topp:tdwg_level_2";
			array_push($ls,$v);
			break;
			case ('tdwg3'): 
			$v="topp:tdwg_level_3";
			array_push($ls,$v);
			break;
			case ('tdwg4'): 
			$v="topp:tdwg_level_4";
			array_push($ls,$v);
			break;
		}
	}	
	$ls_string=$ls[0].",";
//echo count($ls);

	for ($i=1;$i<count($ls)-1;$i++)
	{
	$ls_string.=$ls[$i].",";
	}
			$ls_string.=$ls[count($ls)-1];
}
else
{
		switch ($layers)
		{
			case ('earth'): 
				$ls_string="topp:country_earth";
			break;
				case ('e_prov'): 
				$ls_string="topp:province_europe";			
				break;
			case ('tdwg1'): 
				$ls_string="topp:tdwg_level_1";
			break;
			case ('tdwg2'): 
				$ls_string="topp:tdwg_level_2";
			break;
			case ('tdwg3'): 
				$ls_string="topp:tdwg_level_3";
			break;
			case ('tdwg4'): 
				$ls_string="topp:tdwg_level_4";
			break;
			
		}

}

$col=explode('|',$color);
$total_symbols=array();
//$color="a:d7add2,AOOOOOF,2,dotted|b:ab8dc9F";
foreach ($col as $color)
{
	$color=explode(':',$color);
	$symbols_key=$color[0];
	$symbols_val=$color[1];
	if (!ereg(",",$symbols_val))
	{
		//only fill area; others are default
			$total_symbols[$symbols_key][]=$symbols_val;	
	}	
	else 
	{
		$s=explode(',',$symbols_val);
		foreach ($s as $k=>$v)
		{
			$total_symbols[$symbols_key][]=$v;	
		}
	}
//	$total_symbols[$symbols_key]=$col_val;
}

foreach ($total_symbols as $k=>$v)
{
   for ($i=0;$i<4;$i++)
		{
		//echo $total_symbols[$k][$i]."<br>";
		switch ($i)
		{
		case 0:
			 if($total_symbols[$k][$i]=="")
				{
			$total_symbols[$k][$i]="c5bec0";				
				}
		case 1:
		 if($total_symbols[$k][$i]=="")
			{
		$total_symbols[$k][$i]="10090b";				
			}
		case 2:
			 if($total_symbols[$k][$i]=="")
				{
			$total_symbols[$k][$i]="2";				
				}
		case 3:
			 if($total_symbols[$k][$i]=="")
				{
			$total_symbols[$k][$i]="";				
				}
		case 4:
			if($total_symbols[$k][$i]=="")
			{
					$total_symbols[$k][$i]="no_style";
			}
	  	  }//fi switch
		}		//fi for
}//fir for each

$ad=explode('||',$ad);
$tdwg=array();

foreach ($ad as $k=>$v)
{
//	tdwg3:a:ITA,SPA|b:CHI
$ad2=explode('|',$v);
	foreach ($ad2 as $k=>$v)
	{
	//the first has two ":"  e.g tdwg3:a:ITA,SPA
	if ($k==0)
	{
	$first_data=explode(':',$v);
	$first_layer=$first_data[0];
	$first_style=$first_data[1];
	$first_pol=$first_data[2];
	if (!ereg(",",$first_pol))
			{
					$tdwg[$first_layer][$first_style]['zones']=$first_pol;
				}
					else
					{
				//tdwg4:c:Nicaragua,Chiapas,Oaxaca,Veracruz
						$l3=explode(',',$first_pol);
						foreach($l3 as $value)
						{
						$tdwg[$first_layer][$first_style]['zones'][]=$value;
						}
					}
				}	
	else  //not the first style... b:POL,MOR
			{
	
		//tdwg2/b:Mexico
		//if no comma, (ex: b:IRQ )d:NA o c:NA|b:PI  -->one style=one country (polygon)		
	$data=explode(':',$v);
	if (!ereg(",",$data[1]))
				  {
						$tdwg[$first_layer][$data[0]]['zones']=$l[1];
					}
						else
						{
					//tdwg4:c:Nicaragua,Chiapas,Oaxaca,Veracruz
							$l3=explode(',',$data[1]);
							foreach($l3 as $value)
							{
							$tdwg[$first_layer][$data[0]]['zones'][]=$value;
							}
						}

				}
			}	
}  //end foreach $ad
$tdwg3_val=array();
$tdwg3_total=array();
foreach ($tdwg['tdwg3'] as $k=>$v)
{
	foreach($v as $key=>$val)
	{
		if(!is_array($val))
			{
//		$tdwg2_total[]=$val;
	//	var_dump($val);
array_push($tdwg3_total,$val);								
			}
		else
	 	{
			foreach($val as $k=>$v)
			{
				array_push($tdwg3_total,$v);				
			}
		}
	}
}
//var_dump($tdwg3_total);
$layers=array();
//for each layer (Tdwg level 1, tdwg level 2...), a xml file; this xml will be transformed (XSLT) to XML again (SLD) to style this layer.
foreach ($tdwg3_total as $k=>$v)
{
	array_push($layers,$v);
}

foreach ($tdwg as $k=>$v)
{
//var_dump($k); -->tdwg4 tdwg3 ...
$xml="<gml>";
$xml.="<feature>".$k."</feature>";

foreach ($v as $style=>$value)
{

$xml.="<style><name>".$style."</name>";
$xml.="<label>".$label."</label>";

//if one style is already on the array...don't define it again! we will append here all the list of countries with this style
if (array_key_exists($style,$symbols_url))
	{					
$xml.="<hatching>http://".$symbols_url[$style]['url']."/".$symbols_url[$style]['symbols'].".".$symbols_url[$style]['format']."</hatching>";
switch ($symbols_url[$style]['format'])
{
	case ('gif'): $format='image/gif';
	case ('png'): $format='image/png';
	case ('jpeg'): $format='image/jpeg';
}
$xml.="<symbol_size>".$symbols_url[$style]['size']."</symbol_size>";
$xml.="<symbol_format>".$format."</symbol_format>";
$xml.="<color>hatching</color>";
	}
else 
	{ 
	$xml.="<hatching>NO</hatching>";
$xml.="<color>".$total_symbols[$style][0]."</color>";
	}
$xml.="<stroke_color>".$total_symbols[$style][1]."</stroke_color>";
$xml.="<stroke_width>".$total_symbols[$style][2]."</stroke_width>";
switch ($total_symbols[$style][3])
{
	case ('1_2'): $total_symbols[$style][3]="1 2 1 2";break;
		case ('1_4'): $total_symbols[$style][3]="1 4 1 4";break;
			case ('2_2'): $total_symbols[$style][3]="2 2 2 2";break;
				case ('2_4'): $total_symbols[$style][3]="2 4 2 4";break;
					case ('5_7'): $total_symbols[$style][3]="5 7 5 7";break;
			case ('10_5'): $total_symbols[$style][3]="10 5 10 5";break;
}
$xml.="<stroke_style>".$total_symbols[$style][3]."</stroke_style>";

foreach ($value as $key=>$country)
 {
	if(!is_array($country))
	{
$xml.="<country>".$country."</country>";

$xml.="</style>";
	}
	else 
	{
		foreach ($tdwg[$k][$style]['zones'] as $zones)
			{
				$xml.="<country>".$zones."</country>";
			}
				$xml.="</style>";
	} //fi foreach country
 } //end of adding countries
} //we stop constructing the <gml>
$xml.="</gml>";
//echo $xml;
$gmls[$k]=$xml;
}

$tdwg3_count=count($tdwg3_total);
	if ($_GET['bbox'])
	{
		$bbox=$_GET['bbox'];
	}
	else
	//calculate bbox depending on TDWG level 3 data
	{
			if ($tdwg3_count<1)
			{
				$BBOX_sql="select extent(the_geom) from tdwg_level_3 where level_3_co=".$tdwg3_total;
			}
			else
			{
			$BBOX_sql="select extent(the_geom) from tdwg_level_3 where level_3_co=";

			for ($i=0;$i<($tdwg3_count-1);$i++)
			{

				$BBOX_sql.="'".$tdwg3_total[$i]."' OR level_3_co=";

			}
			$BBOX_sql.="'".$tdwg3_total[$tdwg3_count-1]."'";

	} //fi ELSE
			$conn = pg_connect("host=localhost port=5432 password=**** user=*** dbname=****");
				if (pg_ErrorMessage($conn)) { 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
					else
					{
				$postgis_result=pg_query($BBOX_sql);
				while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC))
					 {
			$b=substr($row['extent'],4);
			$c=substr($b,0,-1); 
			$bbox=str_replace(' ',',',$c);
					}
				}
	}
	        $bbox2=explode(',',$bbox);		
			$ratio_x=$bbox2[2]-$bbox2[0];
			$ratio_y=abs($bbox2[1]-$bbox2[3]);

			if ($_GET['recalculate']=='true')
			{
					if (((($ratio_x)/$ratio_y))<2)
			{
				$to_change='x';
			}
			else 
			{	
				$to_change='y';
			}
			switch ($to_change)
			{

			case 'x':
			$diff_x=abs((($ratio_x)/2 -$ratio_y)/2);	
			$bbox2[0]=$bbox2[0]-$diff_x;	
			$bbox2[2]=$bbox2[2]+$diff_x;	
			$bbox=$bbox2[0].",".$bbox2[1].",".$bbox2[2].",".$bbox2[3];
			$ratio=$ratio_x/$ratio_y;
			$width = (int)($height+($ratio*30));
			break;	

			case 'y':
			$diff_x=abs((($ratio_x -$ratio_y)/2)/2);	
			if ($bbox2[1]<0)
			{
			//echo "bbox_1 negative";
				$bbox2[1]=$bbox2[1]-$diff_x;
			    if (abs($bbox2[1])>90)
				{
				$bbox2[1]=-90;
				 }
			}
			else 
			{
			 $bbox2[1]=$bbox2[1]-$diff_x;	
			 if (abs($bbox2[1])>90)
			{
				$bbox2[1]=90; 
				}
			};
			if ($bbox2[3]<0 )
			{
			$bbox2[3]=$bbox2[3]+$diff_x;	
			 if (abs($bbox2[3])>90)
			  {
				$bbox2[3]=-90; 
				}
			}
			else
			{
			$bbox2[3]=$bbox2[3]+$diff_x;
			if (abs($bbox2[3])>90)
			{
				$bbox2[3]=90; 
			}
			}
			$bbox=$bbox2[0].",".$bbox2[1].",".$bbox2[2].",".$bbox2[3];
			break;
			}//fi switch
		}//fi recalculate=true
			else
			{
				//Recalculate =false (we try to put everything)
				$ratio=$ratio_x/$ratio_y;
				$height = (int)($width / $ratio);
			}

$url_list=array();
$legend_list=array();
$files_list=array();

//for each layer--->an image
foreach ($gmls as $feature=>$v)
{
$dom_new = new DOMDocument();
switch ($feature)
{
	case ('tdwg1'): $layer='topp:tdwg_level_1';$db_layer='tdwg_level_1';
	$field='level_1_co';$layer_sh="TDWG 1";
	$label_field='continent';
	break;
	case ('tdwg2'): $layer='topp:tdwg_level_2';$db_layer='tdwg_level_2';
	$field='tdwg_code';$layer_sh="TDWG 2";
	$label_field='region_nam';
	break;
	case ('tdwg3'): $layer='topp:tdwg_level_3'; $db_layer='tdwg_level_3';
	$field='level_3_co';$layer_sh="TDWG 3";$label_field='level_3_co';
	break;
	case ('tdwg4'): $layer='topp:tdwg_level_4';$db_layer='tdwg_level_4';
	$field="code";
	$label_field='code';$layer_sh="TDWG 4";
	break;
}

$p=simplexml_load_string($gmls[$feature]);
$hatching=$p->style->hatching;
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'symbol', $hatching);
$xsl->setParameter( '', 'layer', $layer);
$xsl->setParameter( '', 'field', $field);
$xsl->setParameter( '', 'label_field', $label_field);
$style = realpath('areas.xsl');
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gmls[$feature]);
$out = $xsl->transformToXML($dom_new);

srand(time());
$random = (rand()%300).".sld";
$path_towrite="/var/www/synthesys/www/fitxers/sld/".$feature."_".$random;
$fp=fopen("$path_towrite","w");
$write=fwrite($fp,$out);
array_push($files_list,$path_towrite);
//URL to get the image
$url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=";
if (!$ls_string)
{
$url.=$layer;
}
else
{
$url.=$ls_string.",".$layer;	
}
$url.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=http://edit.csic.es/fitxers/sld/".$feature."_".$random;

//not currently implemented
//$legend_url="http://edit.csic.es/geoserver/wms/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=FALSE&WIDTH=32&HEIGHT=18&layer=topp:tdwg_level_3&SLD=http://edit.csic.es/fitxers/sld/".$feature."_".$random;
//we put all the urls in an array
$url_list[]=$url;
$legend_list[]=$legend_url;
}
//first image (first layer)
$image1=imagecreatefrompng($url_list[0]);
//if more than one layer to overlay...
if(count($url_list)>1)
{
for ($i=1;$i<count($url_list);$i++)
{
$image=imagecreatefrompng($url_list[$i]);
imagecopymerge($image1,$image,0, 0, 0, 0, $width, $height,70);
imagedestroy($image);
}
}

//$legend_img=imagecreatefrompng($legend_url);

imagepng ($image1);
imagedestroy($image1);
//imagedestroy($legend_img);

//removing SLDs
foreach ($files_list as $k=>$v)
{
unlink($v);	
//var_dump($v);
}


?>