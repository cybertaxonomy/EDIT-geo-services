<?php
require_once("../path_index.php");


//topp: used in the name of the SLD file to address the layer to color
$prefix_wms="topp:";

//header("Content-Type: text/xml");	  
$random=md5($_SERVER["REQUEST_URI"] ).".sld";
$leg=$_REQUEST['legend'];
//$random2=DIR_PLATFORM."/synthesys/www/v1/cr_img/".(rand()%300).".png"; 

//$random2="/var/www/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] ).".png";
//bug 16/04/2010 (pb with imagemagick package in filename?)
$random2="/var/www/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] )."_layers.png";
//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists($random2))
	{
		unlink($random2);
	}


//print($random2);

$sld_dir = "/var/www/synthesys/www/v1/sld"; 
$img_dir = "/var/www/synthesys/www/v1/img";

$d = dir($sld_dir);
$e = dir($img_dir);


$ad=$_REQUEST['ad'];
$ad=explode('||',$ad);


$layers=$_REQUEST['l'];
if ( $_REQUEST['ad'] ==null or $_REQUEST['as'] == null or $_REQUEST['ms'] == null)
{
	print("<br>");
	print("<br>");
	print("<b>The URL must be missing some values, or they have been wrongly defined.</b><br>");
	print("<br>");
	print("<b>Make sure you use the following syntax when adding the variables</b><br>");
	print("Eg. http://edit.br.fgov.be/edit_wp5/v1/areas.php<b>?</b>*Layers<b>&</b>Area Data<b>&</b>Area Style<b>&</b>*Bounding Box<b>&</b>Map Size<br>");
	if ($layers==null)
	{
		print("<br>");
		print("<b>*Layers (l=) has not been defined</b><br>");
		print("This defines the background layer.<br>");
		print("Eg. l=earth will give your map a backgound of the full earth map with only country data.<br>");
		print("where l=tdwg4 will make the earth your background as well but with the tdwg layer 4 areas defined.<br>");
		print("The only options are earth, tdwg1, tdwg2, tdwg3, tdwg4.<br>");
	}
	if ($_REQUEST['ad']==null)
	{
		print("<br>");
		print("<b>Area Data (ad=) has not been defined</b><br>");
		print("This is to determin which areas will be symbolized specifically on the map in the format ad=layer name:a:area code1|b:area code2 etc<br>");
		print("You can have information form more then one layer defined by using || as a seperator<br>");
		print("Eg ad=layer1 name:a:area code1|b:area code2||layer2 name:c:area code1|d:area code2<br>");
		print("The layers can only be earth, <a href=\"tdwgLevel1.html\">tdwg1</a>, <a href=\"tdwgLevel2.html\">tdwg2</a>, <a href=\"tdwgLevel3.html\">tdwg3</a> or <a href=\"tdwgLevel4.html\">tdwg4</a>. Click on the name to see a list of the area codes.<br>");
	}
	if ($_REQUEST['bbox']==null)
	{
		print("<br>");
		print("<b>*Bounding Box (bbox=) has not been defined</b><br>");
print("Bounding box defines the viewing area within the map.<br>");
print("The numbers are based on Long/Lat coordinates <br>bbox=minX(minimum point Longtitude),minY(minimum point Latitude),maxX,maxY<br> Eg. bbox=13,-13,31,5 will give you a map showing the Democratic Republic of Congo.<br>");
		print("bbox=-180,-90,180,90 is the full world view<br>");
		print("If Bounding box is not defined the map will default to the  extent of the area data being requested (ad=)<br>");
	}
	if ($_REQUEST['ms']==null)
	{
		print("<br>");
		print("<b>Map Size (ms=) has not been defined</b></br>");
		print("This defines the size of the map that will be displayed.<br>It can be only a single number representing the width of the image. The height is that number divided by 2.<br>eg. ms=1000 will give you a width of 1000 and a height of 500.<br>");
		print("Or it can be ms=width,height where you assign both values.<br>");
	}
	if ($_REQUEST['as']==null)
	{
		print("<br>");
		print("<b>Area Style (as=) has not been defined</b><br>");
		print("This defines the Area Data called earlier and fills in the color and optionally the border size and color<br>");		
		print("Eg as=a:00ff00 will make the ad (area data) defined by a: the color green<br>");
		print("If you wish to do more then just color:<br>");
		print("Eg as=b:ff0000,0000ff,2 will make the ad (area data) defined by b: the color red (ff0000) and draw am outline with the width of 2 around its borders in the color blue (0000ff).<br>");
		print("If you want to assign only a value (without changing the color) for border you must still format it like this<br>");
		print("as=c:ffffff,0,4 This will make the ad (area data) defined by c: the white (ffffff) and draw am outline with the width of 4 around it.<br>");
	}
print("<br><br>");
print("<b>*</b> Items are optional<br>");
print("<b>Please refer to the wiki for how to setup the service:</b><br>");
print("<b><a href=\"http://dev.e-taxonomy.eu/trac/wiki/MapRestServiceApi#Areas\">Wiki</a></b><br>");
}
else
{
if (ereg(",",$layers))
{
	
	$layers=explode(",",$layers);
	$ls=array();
	$ls_styles=array();
	foreach ($layers as $k=>$v)
	{
		switch ($v)
		{		
			case ('earth'): 
			$v="country_earth";
			
				$ls[]=$v;
			break;
			case ('tdwg1'): 
			$v="topp:tdwg_level_1";
			$ls[]=$v;
		
		//	array_push($ls,$v);
			break;
			case ('tdwg2'): 
			$v="topp:tdwg_level_2";
	$ls[]=$v;
				
//			array_push($ls,$v);
			break;
			case ('tdwg3'): 
			$v="topp:tdwg_level_3";
		$ls[]=$v;
			break;
			case ('tdwg4'): 
			$v="topp:tdwg_level_4";
			$ls[]=$v;
			break;
		}

//∆í $v;
	}

$styles_string="";

foreach ($ls as $k=>$v)
{

	$ls_string.=$v.",";
	$styles_string.="line,";
	}
		$ls_string=substr($ls_string,0,-1);
		$styles_string=substr($styles_string,0,-1);
		//	$styles_string.=$ls[count($ls)-1];
		
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
			default:
				$ls_string=$layers;
			break;
			
		}


			$styles_string="line";

}


foreach ($ad as $k=>$v)
{
//tdwg3:a:PHI,SPA|b:ITA
//var_dump($v);

//$ad2=explode('|',$v);


if ($_REQUEST['title'])
{
$title=$_REQUEST['title'];
}
//title=a:cultivated|b:forest
$t=explode('|',$title);
$title_array=array();

foreach ($t as $k=>$v)
{
$title=explode(':',$v);
$title_array[$title[0]]=$title[1];
}

if ($_REQUEST['label'])
{
$label=$_REQUEST['label'];
}
//$images=a,b:orange,green
if ($_REQUEST['images_url'])
{
$images_url=$_REQUEST['images_url'];
//$images_url="a,b:edit.csic.es/fitxers/hatch_images|c:edit.csic.es/fitxers/hatch_images";
$images_url=explode('|',$images_url);

}


$symbols=$_REQUEST['symbols'];
//$symbols="a,b:hatch_orange.gif|c:hatch_green.gif";
$symbols=explode('|',$symbols);
$symbols_url=array();
foreach ($symbols as $k=>$v)
{
	$symbols=explode(':',$v);
	$keys=explode(',',$symbols[0]);
	$get_v=explode(',',$symbols[1]);
//		var_dump ($get_v);
	if ($_REQUEST['images_url'])
{
	foreach ($keys as $k=>$v)
	{

		$symbols_url[$v]['symbols']=$get_v[0];
		$symbols_url[$v]['size']=$get_v[1];	
		$symbols_url[$v]['format']=$get_v[2];	
	}	
	}
}
if ($_REQUEST['images_url'])
{
foreach ($images_url as $k=>$v)
{
$images=explode(':',$v);
//echo $images[0];
$keys=explode(',',$images[0]);
//var_dump($keys);
foreach ($keys as $k=>$v)
{
$symbols_url[$v]['url']=$images[1];	
}
}
}


//$ad="tdwg2/d:Mexico,Caribbean||tdwg4/b:Chiapas,Oaxaca,Veracruz||tdwg3/a:MXC|b:MXE,MXG|c:MXS,MXT";

$color=$_REQUEST['as'];

		$ms=$_REQUEST['ms'];
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
		

//var_dump($ls_string);

$col=explode('|',$color);
//no d√≥na error al haver-n'hi nom√©s un!
$total_symbols=array();
//$color="a:d7add2,AOOOOOF,2,dotted,cultivated|b:ab8dc9F";
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
//var_dump($total_symbols);
//'a'-->array 'blue'
foreach ($total_symbols as $k=>$v)
{
	
//foreach 	($total_symbols as $k2=>$v2)
//echo $total_symbols[$k][0]."<br>";
	//var_dump($total_symbols[$k]);
//$color="a:d7add2,AOOOOOF,2,dotted|b:ab8dc9F";	

	for ($i=0;$i<5;$i++)
		{
		//echo $total_symbols[$k][$i]."<br>";
		switch ($i)
		{
		case 0:

//   if (array_key_exists($i,$total_symbols[$k])){ 
    if($total_symbols[$k][$i]=="")
				{
   $total_symbols[$k][$i]="c5bec0";
				}
//}

		case 1:
		 if($total_symbols[$k][$i]=="")
			{
		$total_symbols[$k][$i]="10090b";				
			}
		case 2:
			 if($total_symbols[$k][$i]=="")
				{
			$total_symbols[$k][$i]="0.5";				
				}
	/*	case 3:
			 if($total_symbols[$k][$i]=="")
				{
			$total_symbols[$k][$i]="";				
				}*/
	/*	case 4:
			if($total_symbols[$k][$i]=="")
			{
					$total_symbols[$k][$i]="no_style";
			}*/
		case 3:
			if($total_symbols[$k][$i]=="")
			{
					$total_symbols[$k][$i]="no_style";
			}
		case 4:
			if($total_symbols[$k][$i]=="")
			{
					$total_symbols[$k][$i]="no_label";
			}
	  	  }//fi switch
		}		//fi for
	if (array_key_exists($k,$symbols_url))
			{
				$total_symbols[$k]['5']=$symbols_url[$k]['url'];
				$total_symbols[$k]['6']=$symbols_url[$k]['symbols'];
				$total_symbols[$k]['7']=$symbols_url[$k]['size'];
				$total_symbols[$k]['8']=$symbols_url[$k]['format'];

			}
			
}//fir for each
//var_dump($total_symbols);

$tdwg=array();
//ftheeten 21/02/2011
$wms_field_array=array();
foreach ($ad as $k=>$v)
{
$v=explode('|',$v);

foreach ($v as $k=>$v)
{
if ($k==0)
{
  
	$first_data=explode(':',$v);
	/*$first_layer=$first_data[0];
	$first_style=$first_data[1];
	$first_pol=$first_data[2];
	*/
    //ftheeten 21/02/2011 (WMS field for non hardcded tdwg layers)
    $first_wms_field='';
    if(count($first_data)==4)
    {
		//print("WMS field found!!!!=");    
		//print($first_data[1]);
		//print("!!!!");
		$first_layer=$first_data[0];
		$first_wms_field=$first_data[1];
		$first_style=$first_data[2];
		$first_pol=$first_data[3];
	}
	else
	{
		$first_layer=$first_data[0];
		$first_style=$first_data[1];
		$first_pol=$first_data[2];
	
	}	
//var_dump($v);
	if (!ereg(",",$first_pol))
			{
			
	$tdwg[$first_layer][$first_style]['zones']=$first_pol;
	//ftheeten 2010/02/21
	$wms_field_array[$first_layer]=$first_wms_field;
				
//					var_dump($tdwg[$first_layer][$first_style]['zones']);-->NCS
					
				}
					else
				{
					
						//ftheeten 2010/02/21
						$wms_field_array[$first_layer]=$first_wms_field;
				//tdwg4:c:Nicaragua,Chiapas,Oaxaca,Veracruz
						$l3=explode(',',$first_pol);
						foreach($l3 as $value)
						{

						$tdwg[$first_layer][$first_style]['zones'][]=$value;
				      //echo $value."<br>";
				    	}
				}
//	var_dump($first_pol);	
}	
else  //not the first data 
		{	

		//b:Mexico
		//si no trobem cap comma, (ex: b:IRQ )d:NA o c:NA|b:PI
		// a cada estil l'hi correspon nom√©s un pa√≠s	
//	var_dump($v);
	$data=explode(':',$v);
	
				//ftheeten 2010/02/21
				$wms_field_array[$first_layer]=$first_wms_field;
				if (!ereg(",",$data[1]))
				{

						$tdwg[$first_layer][$data[0]]['zones']=$data[1];
				//	var_dump($tdwg[$first_layer]);
//var_dump($data[1]);
						//$styles[$key]['zones'];
					//	echo $val;
					}
						else
						{
					//c:Nicaragua,Chiapas,Oaxaca,Veracruz
							$l3=explode(',',$data[1]);
							foreach($l3 as $value)
							{
							$tdwg[$first_layer][$data[0]]['zones'][]=$value;
					      //echo $value."<br>";
							}
						}

}


}	

}

}

//var_dump($tdwg);
$tdwg3_val=array();
$tdwg3_total=array();

$legend="<gml>";
foreach ($total_symbols as $k=>$v)
{
//var_dump($k);  //a,b
$legend.="<style><name>".$title_array[$k]."</name>";
//$legend.="<style><name>".$total_symbols[$k][4]."</name>";

$legend.="<label>".$k."</label>";

if (array_key_exists($k['url'],$symbols_url))
{

					
$legend.="<hatching>http://".$symbols_url[$k]['url']."/".$symbols_url[$k]['symbols'].".".$symbols_url[$k]['format']."</hatching>";
switch ($symbols_url[$k]['format'])
{
	case ('gif'): $format='image/gif';break;
	case ('png'): $format='image/png';break;
	case ('jpeg'): $format='image/jpeg';break;
}

$legend.="<symbol_size>".$symbols_url[$k]['size']."</symbol_size>";
$legend.="<symbol_format>".$format."</symbol_format>";
//$xml.="<hatch_symbol>".."</hatch_symbol>";
$legend.="<color>hatching</color>";
}
else { 
$legend.="<hatching>NO</hatching>";
$legend.="<color>".$total_symbols[$k][0]."</color>";
}


$legend.="<stroke_color>".$total_symbols[$k][1]."</stroke_color>";
$legend.="<stroke_width>".$total_symbols[$k][2]."</stroke_width>";
switch ($total_symbols[$k][3])
{
	case ('1_2'): $total_symbols[$k][3]="1 2 1 2";break;
		case ('1_4'): $total_symbols[$k][3]="1 4 1 4";break;
			case ('2_2'): $total_symbols[$k][3]="2 2 2 2";break;
				case ('2_4'): $total_symbols[$k][3]="2 4 2 4";break;
					case ('5_7'): $total_symbols[$k][3]="5 7 5 7";break;
			case ('10_5'): $total_symbols[$k][3]="10 5 10 5";break;
}
$legend.="<stroke_style>".$total_symbols[$k][3]."</stroke_style>";
$legend.="</style>";
}
$legend.="</gml>";
$legend_xml[]=$legend;
//var_dump($legend_xml);
//echo $legend;
 $p=simplexml_load_string($legend_xml[0]);
$hatching=$p->style->hatching;
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'symbol', $hatching);
$xsl->setParameter( '', 'layer', $layer);
$xsl->setParameter( '', 'field', $field);
$xsl->setParameter( '', 'label_field', $label_field);
$style = realpath('areas_legend_no.xsl');
$dom_new = new DOMDocument();
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($legend_xml[0]);
$out = $xsl->transformToXML($dom_new);

//$random = (rand()%300).".sld";
//$leg_path_towrite=DIR_PLATFORM."/edit_wp5/fitxers/sld/$random";
$leg_path_towrite="/var/www/synthesys/www/v1/sld/$random";
$fp=fopen("$leg_path_towrite","w");
$write=fwrite($fp,$out);
//$leg_url="/var/www/synthesys/www/v1/sld/$random";
$leg_url=LEGEND_URL."/".$random;

$legs=array();
foreach ($tdwg as $k=>$v)
{

	$tmp_wms_field="default";
		foreach ($tdwg[$k] as $k2=>$v2)
		{

				//print("<=======WMS field=====>".$wms_field_array[$k]);
				//$tmp_wms_field=$wms_field_array[$k];
					//print("<=======other field=====>");
				$legs[$k2]=$k;
				//legs--->array(2) { ["b"]=>  string(5) "tdwg1" ["a"]=>  string(5) "tdwg3" } 
			//LEGENDS!!!
			
		}

	
		$xml="<gml>";
		$pos_prefix = substr_count($k,$prefix_wms);
		$displayedLayer=$k;
		//print("pos=".$pos_prefix."=");
		if($pos_prefix===0) 
		{
  			//print("prefix");
			$displayedLayer=$prefix_wms.$k;
		}
		
		
		$xml.="<feature>".$displayedLayer."</feature>";
	
		foreach ($v as $style=>$value)
		{
		//print($style);
		//print_r($value);
		$xml.="<style><name>".$style."</name>";
		$xml.="<label>".$label."</label>";
		
			if (array_key_exists($style,$symbols_url))
			{
			//var_dump($symbols_url[$style]);
								
			$xml.="<hatching>http://".$symbols_url[$style]['url']."/".$symbols_url[$style]['symbols'].".".$symbols_url[$style]['format']."</hatching>";
				switch ($symbols_url[$style]['format'])
				{
					case ('gif'): $format='image/gif';break;
					case ('png'): $format='image/png';break;
					case ('jpeg'): $format='image/jpeg';break;
				}
			
			$xml.="<symbol_size>".$symbols_url[$style]['size']."</symbol_size>";
			$xml.="<symbol_format>".$format."</symbol_format>";
			//$xml.="<hatch_symbol>".."</hatch_symbol>";
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
			//$tdwg[$k][count]
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
		}
	}
$xml.="</gml>";
//print($xml);
$gmls[$k]=$xml;
}
//var_dump($gmls[$k]);

if ($_REQUEST['bbox'])
	{
		$bbox=$_REQUEST['bbox'];
	}
	else
	{
		
			$conn = pg_connect(POSTGIS_CS);
				if (pg_ErrorMessage($conn)) 
				{ 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
				else
				{
					
				
	$BBOX_sql="select extent(the_geom) from tdwgs where ";				
	$c=0;
//print("before switch");
	foreach ($tdwg as $k=>$v)
	{


			switch ($k)
			{
		
			//ftheeten 21/02/2011: $db_layers and $layer_sh seem unused
			//see also line 830
			case ('tdwg1'): $layer='topp:tdwg_level_1';$db_layer='tdwg_level_1';
			$field='code';
			//??????????????????????????????????????$label_field='zona';
			
			break;
			case ('tdwg2'): $layer='topp:tdwg_level_2';$db_layer='tdwg_level_2';
			$field='code';
			$label_field='code';
			break;
			case ('tdwg3'): $layer='topp:tdwg_level_3'; $db_layer='tdwg_level_3';
			$field='code';$layer_sh="TDWG 3";$label_field='code';
			break;
			case ('tdwg4'): $layer='topp:tdwg_level_4';$db_layer='tdwg_level_4';
			$field="code";
			$label_field='code';$layer_sh="TDWG 4";
			break;
			case ('e_w_0'): $layer='topp:europe_west_level_0';$db_layer='europe_west_level_0';
			$field="code";
			$label_field='code';$layer_sh="EURW 0";
			break;
			case ('e_w_1'): $layer='topp:europe_west_level_1';$db_layer='europe_west_level_1';
			$field="code";
			$label_field='code';$layer_sh="EURW 1";
			break;
			//ftheeten 21/01/2011 (for other layers than tdwg)
			default:
				$layer=$k;
				$label_field=$wms_field_array[$k];//'?';
				//print("layer=".$layer);
				break;
			}


	foreach($v as $key=>$val)
	{
//	var_dump($val);
    if ($c>0)
    {
     $BBOX_sql.="OR ";
    }
	if (count($val['zones'])==1)
	{

     $BBOX_sql.="code='".$val['zones']."' ";

	}else
	{
	$count=count($val['zones']);
	//$BBOX_sql.="select extent(the_geom) from tdwgs where code=";


	for ($i=0;$i<($count-1);$i++)
			{
	
			if ($i==0)
		{
		$BBOX_sql.="code='".$val['zones'][0]."'";
		}
		else
		{
				$BBOX_sql.=" OR code='".$val['zones'][$i]."'";
				}
				
			}
		//	var_dump($tdwg2_total[1][2]);
		//QUINA CUTRADA!!!!!

			$BBOX_sql.=" OR code='".$val['zones'][$count-1]."'";

	}
	$c++;
	}

	}//end if bbox
	//echo $BBOX_sql;

				$postgis_result=pg_query($BBOX_sql);

				while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC))
					 {

			$b=substr($row['extent'],4);
		//	echo $height;
			$cadena=substr($b,0,-1); 
			$bbox=str_replace(' ',',',$cadena);
	//		echo "this is bbox".$bbox;
					}
				}
				
	}
	
$recalculate="true";
if ($_REQUEST['recalculate'])
{
if ($_REQUEST['recalculate']=='false')
{
$recalculate='false';
}
};


			if ($recalculate=="true")
			{
				       $bbox2=explode(',',$bbox);		

			$ratio_x=$bbox2[2]-$bbox2[0];
			$ratio_y=abs($bbox2[1]-$bbox2[3]);
					if (((($ratio_x)/$ratio_y))<2)
			{
				$to_change='x';
		//	echo "yesss XXXX";
			//echo "ratio is   ".(($ratio_x*2)/$ratio_y)."<br>";
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
			//echo "bbox_1 negativa";
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
				//test added by ftheeten 2010/04/09 to avoid error message
				if($ratio_y!=0)
				{
					$ratio=$ratio_x/$ratio_y;
				}
				//echo $ratio;
//				$height = (int)($width / $ratio);
	
	}
			
//echo $height;
$url_list=array();
$legend_list=array();
$files_list=array();

$c=count($gmls);

global $bbox;
if (isset($_REQUEST['foo']))
{
	$json='foo({"bbox":"'.$bbox.'","legend":"'.$leg_url.'","layers":[';		
}
elseif (isset($_REQUEST['callback'])) //addition ftheeten 16/06/2010
{
	$json=$_REQUEST['callback'].'({"bbox":"'.$bbox.'","legend":"'.$leg_url.'","layers":[';
}
else
{
$json='[{"bbox":"'.$bbox.'","legend":"'.$leg_url.'","layers":[';
}




$i=0;
foreach ($gmls as $feature=>$v)
{
$i++;
$dom_new = new DOMDocument();
//print("-----------------------");
//print_r($v);
switch ($feature)
{


	case ('tdwg1'): $layer='topp:tdwg_level_1';$db_layer='tdwg_level_1';
	$field='code';
	$label_field='zona';
	break;
	case ('tdwg2'): $layer='topp:tdwg_level_2';$db_layer='tdwg_level_2';
	$field='code';
	$label_field='code';
	break;
	case ('tdwg3'): $layer='topp:tdwg_level_3'; $db_layer='tdwg_level_3';
	$field='code';$layer_sh="TDWG 3";$label_field='code';
	break;
	case ('tdwg4'): $layer='topp:tdwg_level_4';$db_layer='tdwg_level_4';
	$field="code";
	$label_field='code';$layer_sh="TDWG 4";
	break;
	case ('e_w_0'): $layer='topp:europe_west_level_0';$db_layer='europe_west_level_0';
	$field="code";
	$label_field='code';$layer_sh="EURW 0";
	break;
	case ('e_w_1'): $layer='topp:europe_west_level_1';$db_layer='europe_west_level_1';
	$field="code";
	$label_field='code';$layer_sh="EURW 1";
	break;
		//ftheeten 21/02/2011
		default:
		$layer=$feature;
		$field=$wms_field_array[$feature];
		$label_field=$tmp_wms_field;
		//print("================================".$feature);
		//print("∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞".$label_field);
		break;
}

$p=simplexml_load_string($gmls[$feature]);
$hatching=$p->style->hatching;
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'symbol', $hatching);
	$pos_prefix = substr_count($layer,$prefix_wms);
		$displayedLayer=$layer;
		//print("pos=".$pos_prefix."=");
		if($pos_prefix===0) 
		{
  			//print("prefix");
			$displayedLayer=$prefix_wms.$layer;
		}
$xsl->setParameter( '', 'layer', $displayedLayer);
$xsl->setParameter( '', 'field', $field);
$xsl->setParameter( '', 'label_field', $label_field);
$style = realpath('areas.xsl');
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gmls[$feature]);
$out = $xsl->transformToXML($dom_new);
srand(time());
//$random = (rand()%300).".sld";
$path_towrite="/var/www/synthesys/www/v1/sld/".$feature."_".$random;
//echo $path_towrite;
$fp=fopen("$path_towrite","w");
$write=fwrite($fp,$out);
array_push($files_list,$path_towrite);
//echo $out;



$json.='{"tdwg": "' . $feature. '","session": "'.$sessionid.'",';

//$json.='"sld": "' . $feature."_".$random.'"}';
//correction ftheeten 09/04/2010
$nameSLDFile=$feature."_".$random;
$json.='"sld": "' . V1_SLD_URL."/".$nameSLDFile.'"}';


if ($i < $c)
{
$json.=',';
}
//print("build URL");
//print($layer);
$url=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=";
$url.=$layer."&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=".V1_SLD_URL."/".$nameSLDFile;

//print($url);

//provinces,world




global $height;




$url_list[]=$url;
$legend_list[]=$legend_url;
}
//correction ftheeten 09/04/2010
$json.="]";


$json.=",\"geoserver\": \"".URL_GEOSERVER."\"";
$json.="}";
if (isset($_REQUEST['foo']))
{
$json.=")";	
}
elseif(isset($_REQUEST['callback']))////addition ftheeten 16/06/2010
{
$json.=");";	
}
else
{
$json.="]";	
}




$img=$_REQUEST['img'];

if ($img=='false')
{
//RMCA 09/04/2010

//if ($img=='false')
//{
   $headerText="Content-Type: application/json";

//}

header($headerText);
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date dans le passÈ
echo $json;
}
else
{
	//print("else");	
	$random3="/var/www/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] )."bckgrd_layers.png";
//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists($random3))
	{
		unlink($random3);
	}

		
	if ($ls_string)
	{//print("in ls");
		$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$ls_string;
			$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&STYLES=".$styles_string;
			//update ftheeten 25/06/2010
//$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$ls_string;
			//$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
			//print($url2);			
			//print($random3);			
			$cmd="convert '$url2' '$random3'";
			$output=shell_exec($cmd);
			//print($cmd);
			//print($output);

	}	
	else
	{
		$c="convert convert -size '".$width."x".$height."' xc:transparent $random3";

		shell_exec($c);
	}

//print(count($url_list)>1);



if(count($url_list)>1)
{

	$c="composite ";
	for ($i=0;$i<count($url_list);$i++)
	{
	$c.="'".$url_list[$i]."' ";
	}
	$c.="'$random2' ";

shell_exec($c);
$c="composite  '$random3' '$random2' '$random2'";

shell_exec($c);
//print($c);
}
else
{
//SLDs over normal layers
$c="composite  '$url_list[0]' '$random3' '$random2'";
//print("3");
shell_exec($c);


}


//print($c);
//print("----------------");


$headerText="Content-Type: image/png";


//part ftheeten 12/08/2010 external WMS
		//print("dev");
		$flagExternalWMS=false;
		$extWFURLArray=array();
		$extWFSURL="";
		
		if(isset($_REQUEST['externalwms'])===true&&isset($_REQUEST['externalwmslayer'])===true)
		{
			$flagExternalWMS=true;
			$versionWFS=NULL;
			if(isset($_REQUEST['externalwmsversion'])===true)
			{
				$versionWFS=$_REQUEST['externalwmsversion'];
			}
			$externalWMSStyle="";
			if(isset($_REQUEST['externalwmsstyle'])===true)
			{
				$externalWMSStyle=$_REQUEST['externalwmsstyle'];
			}
			if(strlen($_REQUEST['externalwms'])>0&&strlen($_REQUEST['externalwmslayer'])>0)
			{
								$versionWFS=NULL;
						if(isset($_REQUEST['externalwmsversion'])===true)
						{
							$versionWFS=$_REQUEST['externalwmsversion'];
						}
						$externalWMSStyle=NULL;
						if(isset($_REQUEST['externalwmsstyle'])===true)
						{
							$externalWMSStyle=$_REQUEST['externalwmsstyle'];
						}
				if(strpos($_REQUEST['externalwms'],"|")>0)
				{
						$arrayWFS=array();
		
						$arrayWFS=f_checkWMSParams($arrayWFS,$_REQUEST['externalwms'],"URL","[\|]","[:]");
						$arrayWFS=f_checkWMSParams($arrayWFS,$versionWFS,"VERSION","[\|]","[:]");
						$arrayWFS=f_checkWMSParams($arrayWFS,$_REQUEST['externalwmslayer'],"LAYERS","[\|]","[:]");
						$arrayWFS=f_checkWMSParams($arrayWFS,$externalWMSStyle,"STYLES","[\|]","[:]");
						//print("!!!arrayWFS=>");
						//print_r($arrayWFS);
						foreach($arrayWFS as $key=>$arrayWFSitem)
						{
							$extWFSURLArray[]=f_writeKeyWFSURL($arrayWFS,$key,$bbox,$width,$height);
						}
						
				}
				else
				{
					$externalWMS=$_REQUEST['externalwms'];
					$externalWMSLayer=$_REQUEST['externalwmslayer'];
					

					$extWFSURL=f_autoFillWMSURL($externalWMS,$externalWMSVersion,$externalWMSLayer,$externalWMSStyle,$bbox,$width,$height);
					$extWFSURLArray[]=$extWFSURL;
				}
			}

		}
		if($flagExternalWMS===true)
		{
			$cptLayers=count($extWFSURLArray);
			for($i=$cptLayers-1;$i>=0;$i--)
			{
				$c="composite '$random2' '$extWFSURLArray[$i]' '$random2'";
				shell_exec($c);
			}		
			
		}


if ($leg=='1')
{
	$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=TRUE&WIDTH=64&HEIGHT=36&";
			$legend_url.="layer=topp:tdwg_level_3&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&SLD=".$leg_url;
	
$mlp=$_REQUEST['mlp'];
switch ($mlp)
{
case ('1'):
 	{

$com="convert +append '$legend_url' '$random2'  '$random2'"; //-->exterior ul  
break;
 	}
case ('2'):
 	{
$com="convert -background white -append '$legend_url' '$random2'  '$random2' "; 	//2
 break;
 }
 case ('3'):
 	{
$com="convert -background white +append  '$random2' '$legend_url'   '$random2' "; //4
break;
 	}
 	
case ('4'):
 	{
 	
$com="convert  -background white -append  '$random2' '$legend_url'   '$random2'"; //7
break;
 	}
case ('5'):
 	{ 	
 $com="composite -gravity  SouthEast '$legend_url'  '$random2'   '$random2'";//9
break;
}	
case ('6'):
 	{ 	
 $com="composite -gravity  SouthWest '$legend_url'  '$random2'   '$random2'";//10
break;
}	
case ('7'):
 	{ 	
 $com="composite -gravity  NorthEast '$legend_url'  '$random2'   '$random2'";//11
break;
}	
case ('8'):
 	{ 	
 $com="composite -gravity  NorthWest '$legend_url'  '$random2'   '$random2'";//12
break;
}	
}
shell_exec($com);
}


//RMCA 09/04/2010
header($headerText);

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date dans le passÈ

	
readfile($random2);
unlink($random2);

}
clearstatcache();
$time=time();


/* commented by ftheeten 2010/04/13 (to have sld still available) -> should be repalced by a Cron job*/
while($entry = $d->read()) { 
 if ($entry!= "." && $entry!= "..") { 

	     $f_last_modified = filemtime($sld_dir."/".$entry);

if ($time-$f_last_modified >400)
{
unlink($sld_dir."/".$entry);
}   

 } 
} 


while($entry = $e->read()) { 
 if ($entry!= "." && $entry!= "..") { 

	     $f_last_modified = filemtime($img_dir."/".$entry);

if ($time-$f_last_modified >400000)
{
unlink($img_dir."/".$entry);
}   

 } 
} 



//$d->close(); 
$e->close();
}
function f_autoFillWMSURL($p_externalWMS, $p_externalWMSVersion, $p_externalWMSLayers, $p_externalWMSStyles, $p_bbox, $p_width, $p_height)
{
	//print("functionCalled");
		if(isset($p_externalWMSVersion)===false)
		{
					$p_externalWMSVersion='1.1.1';
		}
		if(isset($p_externalWMSStyles)===false)
		{
					$p_externalWMSStyles='';
		}
		$extWFSURL=$p_externalWMS."?REQUEST=GetMap";
						$extWFSURL.="&TRANSPARENT=TRUE";
						$extWFSURL.="&SERVICE=WMS";
						$extWFSURL.="&VERSION=".$p_externalWMSVersion;
						$extWFSURL.="&SRS=EPSG:4326";
						$extWFSURL.="&LAYERS=".$p_externalWMSLayers;
						$extWFSURL.="&STYLES=".$p_externalWMSStyles;
						$extWFSURL.="&FORMAT=image/png";
						$extWFSURL.="&bbox=".$p_bbox."&WIDTH=".$p_width."&HEIGHT=".$p_height;
						$extWFURLArray[]=$extWFSURL;	
	return $extWFSURL;
}


function f_checkWMSParams($p_arrayWMS, $p_param,  $p_nameParam, $p_delimiter1, $p_delimiter2)
{
	if(isset($p_param)===true)
	{	
		$splitParam=preg_split($p_delimiter1,$p_param);
		if(isset($splitParam)===true)
		{
			if(count($splitParam)>0)
			{
				foreach($splitParam as $paramItem)
				{
					if(isset($paramItem)===true)
					{
						$splitParam2=preg_split($p_delimiter2,$paramItem);
						if(count($splitParam2)==2)
						{
							$p_arrayWMS[$splitParam2[0]][$p_nameParam]=$splitParam2[1];
						}
						else if(count($splitParam2)==3&&($p_delimiter2==":"||$p_delimiter2=="[:]"))
						{
							$p_arrayWMS[$splitParam2[0]][$p_nameParam]=$splitParam2[1].':'.$splitParam2[2];
						}
					}
				}	
			}	
		}
	}
	return $p_arrayWMS;
}

function f_writeKeyWFSURL($p_arrayWMS, $p_key, $p_bbox, $p_width, $p_height)
{
	return f_autoFillWMSURL($p_arrayWMS[$p_key]["URL"],$p_arrayWMS[$p_key]["VERSION"],$p_arrayWMS[$p_key]["LAYERS"],$p_arrayWMS[$p_key]["STYLES"] ,$p_bbox, $p_width, $p_height);
}

?>
