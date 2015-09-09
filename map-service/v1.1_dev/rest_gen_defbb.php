<?php
require_once("../path_index.php");
require_once("./function_lib_rest_dev.php");

$flagDisplayPoints=false;
//test ftheeten 14/03/2011
$path_towrite_persistent_sld="/var/www/synthesys/www/v1/sld_persistent/";
$url_persistent_sld='http://edit.br.fgov.be/synthesys/www/v1/sld_persistent';

//topp: used in the name of the SLD file to address the layer to color
$prefix_wms="topp:";

//header("Content-Type: text/xml");	  
$random=md5($_SERVER["REQUEST_URI"] ).".sld";
$leg=$_REQUEST['legend'];
//$random2=DIR_PLATFORM."/synthesys/www/v1/cr_img/".(rand()%300).".png"; 

//$random2="/var/www/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] ).".png";
//bug 16/04/2010 (pb with imagemagick package in filename?)
$image_radical=md5($_SERVER["REQUEST_URI"] );
$image_file=$image_radical."_layers.png";
$random2="/var/www/synthesys/www/v1/img/".$image_file;
$random2_www="http://edit.br.fgov.be/synthesys/www/v1/img/".$image_file;
$random2_legend="/var/www/synthesys/www/v1/img/".$image_radical."_legend.png";
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


//ftheeten 14/04/2011
//$layers=$_REQUEST['l'];
$layers_tmp=$_REQUEST['l'];
$arrayTableStyles=associate_layer_to_style($layers_tmp,',',':', TRUE);
$layers=array_keys($arrayTableStyles);
//$layers=implode(',',array_keys($arrayTableStyles));
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
//point part

$od=$_REQUEST['od'];
$points=explode('||',$od);
$geodata=array();

foreach ($points as $k=>$v)
{
	$specie=explode(":",$v);
	//id of the recordset
	$id=$specie[0];
	//geodata of each recordset
	$geo=explode('|',$specie[1]);
	foreach ($geo as $key=>$value)
	{
		$geos=explode(',',$value);
		$geodata[$id]['geodata']['lon'][]=$geos[0];
		$geodata[$id]['geodata']['lat'][]=$geos[1];
		
	}
}

//$os="1:c/f78755/10/Onthophagus semipunctatus|2:s/64cb48/15/Euoniticellus pallipes|3:sq/090b0a/30/Onthophagus joannae";

$os=$_REQUEST['os'];
$sp=explode('|',$os);
$species=array();

foreach ($sp as $k=>$v)
{
	if(strlen($v)>0)
	{
		$sym=explode(':',$v);

		$specie_id=$sym[0];	
		$symbologies=explode('/',$sym[1]);
	    	$geodata[$specie_id]['symbol']=$symbologies[0];
		$geodata[$specie_id]['color']=$symbologies[1];
		$geodata[$specie_id]['size']=$symbologies[2];
		$geodata[$specie_id]['legend']=$symbologies[3];
		
	}
}

if(count($geodata)>0)
{
	$flagDisplayPoints=true;
}
if($flagDisplayPoints===true)
{
	//print("insert");	
	$sqls=array();
	$random=md5($_SERVER["REQUEST_URI"] );
	foreach ($geodata as $key=>$val)
	{
		if(isset($geodata[$key]['geodata']['lat'] )===true)
		{
			$sqls[]="delete from rest_points where userid='".$random."' AND id=".$key.";";
			foreach ($geodata[$key]['geodata']['lat'] as $k=>$v)
			{
				$sql="insert into rest_points(userid,id,the_geom,label,timestamp_point) 	values('$random',".$key.",";
				$sql.="GeometryFromText('POINT(".$v." ";
				$sql.=$geodata[$key]['geodata']['lon'][$k];
				$sql.=")',4326),'".$geodata[$key]['legend']."',";
				$sql.=" current_timestamp);";
				$sqls[]=$sql;
			}
		}
	}

	$sql_total="";

	foreach ($sqls as $k=>$v)
	{
		//	echo $v."<br>";
		$sql_total.=$v;
	}

	//print($sql_total);
	$conn = pg_pconnect(POSTGIS_CS);
	if (pg_ErrorMessage($conn))
	{ 
		echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	}
	else
	{
		// echo $sql_total;
		pg_exec($sql_total);	
	}
	$xml="<gml>";
		$xml.="<feature>Species definition</feature>";

	foreach ($geodata as $k=>$v)
	{
		switch ($geodata[$k]['symbol'])
		{
			case('c'):$geodata[$k]['symbol']="Circle"; break; 
			case('s'):$geodata[$k]['symbol']="Star"; break;
			case('sq'):$geodata[$k]['symbol']="Square"; break;
		}
		//echo $geodata[$k]['legend']."<br>";
	 	$xml.="<specie>";
	 	$xml.="<id>".$k."</id>";
	 	$xml.="<name>".$geodata[$k]['legend']."</name>";
	 	$xml.="<style>";
		$xml.="<color>".$geodata[$k]['color']."</color>";
		$xml.="<symbol>".$geodata[$k]['symbol']."</symbol>";
	 	$xml.="<size>".$geodata[$k]['size']."</size>";
	 	$xml.="</style>";
	 	$xml.="</specie>"; 
	}
	$xml.="</gml>";
	//echo $xml;
	$dom_new = new DOMDocument();
	$xsl = new XSLTProcessor;
	$xsl->setParameter( '', 'userid', $random);
	$style = realpath('points.xsl');
	$dom_new->load($style);
	$xsl->importStyleSheet($dom_new);
	$dom_new->loadXML($xml);
	$out = $xsl->transformToXML($dom_new);

	$path_towrite="/var/www/synthesys/www/v1/sld/point_".$random.".sld";
	//print($path_towrite);
	$fp=fopen("$path_towrite","w");
	$write=fwrite($fp,$out);
}

//end point part


//ftheeten 2011/04/13
$arrayBackgroundStyle=array();

if (count($layers)>0)//(ereg(",",$layers))
{
//print("case1");
	
	//$layers=explode(",",$layers);
	$ls=array();
	$ls_styles=array();
	$ls_types=array();
	$i=0;
	//foreach ($layers as $k=>$v)
	//print($layers);
	//print_r($arrayTableStyles);
	$v2="";
	foreach($layers as $v)	
	{
		$k=$i;	
		switch ($v)
		{		
			case ('earth'): 
			$v2="country_earth";
			
				$ls[]=$v2;
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='line';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
			break;
			case ('tdwg1'): 
			$v2="topp:tdwg_level_1";
			//end loop array key in symbol$ls[]=$v2;
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='line';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
		//	array_push($ls,$v);
			break;
			case ('tdwg2'): 
			$v2="topp:tdwg_level_2";
			$ls[]=$v2;
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='line';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
//			array_push($ls,$v);
			break;
			case ('tdwg3'): 
			$v2="topp:tdwg_level_3";
			$ls[]=$v2;
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='line';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
			break;
			case ('tdwg4'): 
			$v2="topp:tdwg_level_4";
			$ls[]=$v2;
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='line';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
			break;
			default:

				$ls[]=$v;
				
				if(strlen($arrayTableStyles[$v]['value'])==0)
				{
					$ls_styles[]='';
				}
				else
				{
					$ls_styles[]=$arrayTableStyles[$v]['value'];
				}
				$ls_types[]=$arrayTableStyles[$v]['type'];
				
			break;
		}
		$i++;
//∆í $v;
	}

$styles_string="";
	//ftheeten april 2011	
	$i=0;
	foreach ($ls as $k=>$v)
	{

		$ls_string.=$v.",";
		
		//ftheeten
		//$styles_string.="line,";
		$styles_string.=$ls_styles[$i];
		$arrayBackgroundStyle[$i]['name']=$v;
		$arrayBackgroundStyle[$i]['style']=$ls_styles[$i];
		$arrayBackgroundStyle[$i]['type']=$ls_types[$i];
		$i++;
	}
		$ls_string=substr($ls_string,0,-1);
		$styles_string=substr($styles_string,0,-1);
		//	$styles_string.=$ls[count($ls)-1];
		
}
else
{
//print("case 2");
		$type_string="";
		switch ($layers[0])
		{

			case ('earth'): 
				$ls_string="topp:country_earth";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		
			break;
				case ('e_prov'): 
				$ls_string="topp:province_europe";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		
			
				break;
			case ('tdwg1'): 
				$ls_string="topp:tdwg_level_1";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		
			break;
			case ('tdwg2'): 
				$ls_string="topp:tdwg_level_2";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
			break;
			case ('tdwg3'): 
				$ls_string="topp:tdwg_level_3";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		

			break;
			case ('tdwg4'): 
				$ls_string="topp:tdwg_level_4";
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="line";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		
			break;
			default:
				$ls_string=$layers;
				//ftheeten 13/04/2011	
				if(strlen($arrayTableStyles[$layers[0]]['value'])==0)
				{
					$styles_string="";
				}
				else
				{
					$style_string=$arrayTableStyles[$layers[0]]['value'];
				}
				$type_string=$arrayTableStyles[$layers[0]]['type'];
		
			break;
			
		}

			
			//comment out ftheeten 13/04/2011
			//$styles_string="line";
			$arrayBackgroundStyle[0]['name']=$ls_string;
			$arrayBackgroundStyle[0]['style']=$styles_string;
			$arrayBackgroundStyle[0]['type']=$type_string;

}
//
/*	if(isset($arrayBackgroundStyle)===true)
	{
		if(count($arrayBackgroundStyle)>0)
		{
			//$c='';
			for ($i=0;$i<count($arrayBackgroundStyle);$i++)
			{
				//$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$arrayBackgroundStyle[$i]['name'];
			//$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
			if($arrayBackgroundStyle[$i]['type']=="sld")
			{
				//$url2.="&SLD=".$arrayBackgroundStyle[$i]['style'];
			}
			else
			{
				//$url2.="&STYLES=".$arrayBackgroundStyle[$i]['style'];
				$ad="topp:".$arrayBackgroundStyle[$i]['name'].":".$arrayBackgroundStyle[$i]['style'].":%||".$ad;			
			}
			
				//$url2_array[]=$url2;
				//print($url2);
			}
		}
	}

//
*/
//print($ad);
$ad=explode('||',$ad);

foreach ($ad as $k=>$v)
{// loop ad
	//tdwg3:a:PHI,SPA|b:ITA
	//var_dump($v);

	//$ad2=explode('|',$v);


	if ($_REQUEST['title'])
	{//if title
		$title=$_REQUEST['title'];
	}//if title
	//title=a:cultivated|b:forest
	$t=explode('|',$title);
	$title_array=array();

	foreach ($t as $k=>$v)
	{//loop t
		$title=explode(':',$v);
		$title_array[$title[0]]=$title[1];
	}//loop t

	if ($_REQUEST['label'])
	{//if label
		$label=$_REQUEST['label'];
	}// if label

	//$images=a,b:orange,green
	if ($_REQUEST['images_url'])
	{//if images_url
		$images_url=$_REQUEST['images_url'];
		//$images_url="a,b:edit.csic.es/fitxers/hatch_images|c:edit.csic.es/fitxers/hatch_images";
		$images_url=explode('|',$images_url);

	}//image_url


	$symbols=$_REQUEST['symbols'];
	//$symbols="a,b:hatch_orange.gif|c:hatch_green.gif";
	$symbols=explode('|',$symbols);
	$symbols_url=array();
	foreach ($symbols as $k=>$v)
	{//for symbols
		$symbols=explode(':',$v);
		$keys=explode(',',$symbols[0]);
		$get_v=explode(',',$symbols[1]);
	//		var_dump ($get_v);
		if ($_REQUEST['images_url'])
		{//if images urls
			foreach ($keys as $k=>$v)
			{

				$symbols_url[$v]['symbols']=$get_v[0];
				$symbols_url[$v]['size']=$get_v[1];	
				$symbols_url[$v]['format']=$get_v[2];	
			}	
		}
	}// for symbols
	if ($_REQUEST['images_url'])
	{//if images url
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
	}//end if images_url


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
	{//loop col
		//ftheeten 14/03/2011
		if(strpos($color,'http://')===false)
		{
			$color=explode(':',$color);
			$symbols_key=$color[0];
			$symbols_val=$color[1];
		}
		else
		{
			$color=explode(':',$color,2);
			$symbols_key=$color[0];
			$symbols_val=$color[1];
		}

		/*$color=explode(':',$color);
		$symbols_key=$color[0];
		$symbols_val=$color[1];
		*/
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
	}//loop col
	//var_dump($total_symbols);
	//'a'-->array 'blue'

		foreach ($total_symbols as $k=>$v)
		{//loop total symbols
	
			//foreach 	($total_symbols as $k2=>$v2)
			//echo $total_symbols[$k][0]."<br>";
				//var_dump($total_symbols[$k]);
			//$color="a:d7add2,AOOOOOF,2,dotted|b:ab8dc9F";	

			for ($i=0;$i<5;$i++)
			{// for loop
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
			
		}//for total symbols
		//var_dump($total_symbols);

		$tdwg=array();
		//ftheeten 21/02/2011
		$wms_field_array=array();
		foreach ($ad as $k=>$v)
		{//for ad
			$v=explode('|',$v);
			foreach ($v as $k=>$v)
			{//for v
				if ($k==0)
				{//if k
			  
					$first_data=explode(':',$v);
					/*$first_layer=$first_data[0];
					$first_style=$first_data[1];
					$first_pol=$first_data[2];
					*/
			    		//ftheeten 21/02/2011 (WMS field for non hardcded tdwg layers)
			    		$first_wms_field='';
					if(count($first_data)==4)
					{//loop first data
					//print("WMS field found!!!!=");    
					//print($first_data[1]);
					//print("!!!!");
						$first_layer=$first_data[0];
						$first_wms_field=$first_data[1];
						$first_style=$first_data[2];
						$first_pol=$first_data[3];
					}//loop first data
					else
					{//loop first data
						$first_layer=$first_data[0];
						$first_style=$first_data[1];
						$first_pol=$first_data[2];
	
					}//loop first data	
					//var_dump($v);

					if (!ereg(",",$first_pol))
					{//loop first pol
			
						$tdwg[$first_layer][$first_style]['zones']=$first_pol;
						//ftheeten 2010/02/21
						$wms_field_array[$first_layer]=$first_wms_field;
			
							//var_dump($tdwg[$first_layer][$first_style]['zones']);-->NCS
					
					}//loop first pol
					else
					{//loop first pol
						//ftheeten 2010/02/21
						$wms_field_array[$first_layer]=$first_wms_field;
						//tdwg4:c:Nicaragua,Chiapas,Oaxaca,Veracruz
						$l3=explode(',',$first_pol);
						foreach($l3 as $value)
						{
							$tdwg[$first_layer][$first_style]['zones'][]=$value;
							//echo $value."<br>";
					    	}
					}//loop first pol
					//var_dump($first_pol);	
				}//if k	
				else  //not the first data 
				{//if k	
					//b:Mexico
					//si no trobem cap comma, (ex: b:IRQ )d:NA o c:NA|b:PI
					// a cada estil l'hi correspon nom√©s un pa√≠s	
					//	var_dump($v);
					$data=explode(':',$v);
					//ftheeten 2010/02/21
					$wms_field_array[$first_layer]=$first_wms_field;
					if (!ereg(",",$data[1]))
					{//if data 1

						$tdwg[$first_layer][$data[0]]['zones']=$data[1];
						//	var_dump($tdwg[$first_layer]);
						//var_dump($data[1]);
						//$styles[$key]['zones'];
						//	echo $val;
					}//if data 1
					else
					{//if data 1
						//c:Nicaragua,Chiapas,Oaxaca,Veracruz
						$l3=explode(',',$data[1]);
						foreach($l3 as $value)
						{//$l3
							$tdwg[$first_layer][$data[0]]['zones'][]=$value;
							//echo $value."<br>";
						}//$l3
					}//if data 1

				}//if k


			}//for v	

		}//for ad (line 566)

}//for ad (line 360?)

//var_dump($tdwg);
$tdwg3_val=array();
$tdwg3_total=array();

$legend="<gml>";
foreach ($total_symbols as $k=>$v)
{//loop total symbols in gml
	if(strlen($title_array[$k])>0)
	{
		//var_dump($k);  //a,b
		$legend.="<style><name>".$title_array[$k]."</name>";
		//$legend.="<style><name>".$total_symbols[$k][4]."</name>";

		$legend.="<label>".$k."</label>";

		if (array_key_exists($k['url'],$symbols_url))
		{//if key in symbol

					
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
		}//end if array key in symbol
		else 
		{ // if array key in symbol
			$legend.="<hatching>NO</hatching>";
			$legend.="<color>".$total_symbols[$k][0]."</color>";
		} //end array key in symbol


		$legend.="<stroke_color>".$total_symbols[$k][1]."</stroke_color>";
		$legend.="<stroke_width>".$total_symbols[$k][2]."</stroke_width>";
		switch ($total_symbols[$k][3])
		{// switch total symbols
			case ('1_2'): 
				$total_symbols[$k][3]="1 2 1 2";
			break;
			case ('1_4'): 
				$total_symbols[$k][3]="1 4 1 4";
			break;
			case ('2_2'): 
				$total_symbols[$k][3]="2 2 2 2";
			break;
			case ('2_4'):
				$total_symbols[$k][3]="2 4 2 4";
			break;
			case ('5_7'): 
				$total_symbols[$k][3]="5 7 5 7";
			break;
			case ('10_5'): 
				$total_symbols[$k][3]="10 5 10 5";
			break;
		}//end switch
			$legend.="<stroke_style>".$total_symbols[$k][3]."</stroke_style>";
			$legend.="</style>";
	}
}//end loop symbols in gml
	
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
{//loop tdwg 1
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
	{// loop style=>value
		//print($style);
		//print_r($value);
		$xml.="<style><name>".$style."</name>";
		$xml.="<label>".$label."</label>";
	
		if (array_key_exists($style,$symbols_url))
		{//if key exists
			//var_dump($symbols_url[$style]);
			$xml.="<hatching>http://".$symbols_url[$style]['url']."/".$symbols_url[$style]['symbols'].".".$symbols_url[$style]['format']."</hatching>";
			switch ($symbols_url[$style]['format'])
			{
				case ('gif'): 
					$format='image/gif';
				break;
				case ('png'): 
					$format='image/png';
				break;
				case ('jpeg'): 
					$format='image/jpeg';
				break;
			}
			$xml.="<symbol_size>".$symbols_url[$style]['size']."</symbol_size>";
			$xml.="<symbol_format>".$format."</symbol_format>";
			//$xml.="<hatch_symbol>".."</hatch_symbol>";
			$xml.="<color>hatching</color>";
		}//if key exists
		else 
		{//if key not exists 
			$xml.="<hatching>NO</hatching>";
			$xml.="<color>".$total_symbols[$style][0]."</color>";
		}//if key not exists
		$xml.="<stroke_color>".$total_symbols[$style][1]."</stroke_color>";
		$xml.="<stroke_width>".$total_symbols[$style][2]."</stroke_width>";
		switch ($total_symbols[$style][3])
		{//loop total symbols
			case ('1_2'): 
				$total_symbols[$style][3]="1 2 1 2";
			break;
			case ('1_4'): 
				$total_symbols[$style][3]="1 4 1 4";
			break;
			case ('2_2'): 
				$total_symbols[$style][3]="2 2 2 2";
			break;
			case ('2_4'): 
				$total_symbols[$style][3]="2 4 2 4";
			break;
			case ('5_7'): 
				$total_symbols[$style][3]="5 7 5 7";
			break;
			case ('10_5'): 
				$total_symbols[$style][3]="10 5 10 5";
			break;
		}//loop total symbols
		$xml.="<stroke_style>".$total_symbols[$style][3]."</stroke_style>";
	
		foreach ($value as $key=>$country)
		{//loop key=> country
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
		}// end loop key country
	}//loop styles=>values
	$xml.="</gml>";
	//print($xml);
	$gmls[$k]=$xml;
}//end loop tdwg 1
//var_dump($gmls[$k]);

	if ($_REQUEST['bbox'])
	{
		$bbox=$_REQUEST['bbox'];
	}
	else
	{
		
			$conn = pg_pconnect(POSTGIS_CS);
				if (pg_ErrorMessage($conn)) 
				{ 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
				else
				{
					
				
	$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from tdwgs where ";				
	$c=0;
//print("before switch");
	$flagUserTable=false;
	$ibbox=0;
	foreach ($tdwg as $k=>$v)
	{
		$c=0;

			switch ($k)
			{
		
			//ftheeten 21/02/2011: $db_layers and $layer_sh seem unused
			//see also line 830
			case ('tdwg1'): $layer='topp:tdwg_level_1';$db_layer='tdwg_level_1';
			$field='code';
			//??????????????????????????????????????$label_field='zona';
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}	
			$ibbox++;			
			break;
			case ('tdwg2'): $layer='topp:tdwg_level_2';$db_layer='tdwg_level_2';
			$field='code';
			$label_field='code';
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}	
			$ibbox++;
			break;
			case ('tdwg3'): $layer='topp:tdwg_level_3'; $db_layer='tdwg_level_3';
			$field='code';$layer_sh="TDWG 3";$label_field='code';
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}				
			$ibbox++;			
			break;
			case ('tdwg4'): $layer='topp:tdwg_level_4';$db_layer='tdwg_level_4';
			$field="code";
			$label_field='code';$layer_sh="TDWG 4";
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}	
			$ibbox++;
			break;
			case ('e_w_0'): $layer='topp:europe_west_level_0';$db_layer='europe_west_level_0';
			$field="code";
			$label_field='code';$layer_sh="EURW 0";
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}	
			$ibbox++;
			break;
			case ('e_w_1'): $layer='topp:europe_west_level_1';$db_layer='europe_west_level_1';
			$field="code";
			$label_field='code';$layer_sh="EURW 1";
			if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$db_layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql.="UNION ALL select extent(the_geom) as g from ".$db_layer." where ";
					//print("toto");
				}	
			$ibbox++;
			break;
			//ftheeten 21/01/2011 (for other layers than tdwg)
			default:
				$layer=$k;
				$field=$wms_field_array[$k];
				$label_field=$wms_field_array[$k];//'?';
				//print("________________________layer=".$layer);
				//print("________________________field=".$field);
//ftheeten auto boox 24/08/2011
				if($ibbox==0)
				{
					$BBOX_sql="SELECT extent(g) FROM(select extent(the_geom) as g from ".$layer." where ";
				}
				elseif($ibbox>0)
				{
					$BBOX_sql="UNION ALL select extent(the_geom) as g from ".$layer." where ";
					print("toto");
				}	
				$flagUserTable=true;
				$ibbox++;
				//print('====>ibbox='.$ibbox);
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

     //$BBOX_sql.="code='".$val['zones']."' ";
	$BBOX_sql.=$field."='".$val['zones']."' ";

	}else
	{
	$count=count($val['zones']);
	//$BBOX_sql.="select extent(the_geom) from tdwgs where code=";


	for ($i=0;$i<($count-1);$i++)
			{
	
		if ($i==0)
		{
		//$BBOX_sql.="code='".$val['zones'][0]."'";
		$BBOX_sql.=$field."='".$val['zones'][0]."'";
		}
		else
		{
				//$BBOX_sql.=" OR code='".$val['zones'][$i]."'";
				$BBOX_sql.=" OR ".$field."='".$val['zones'][$i]."'";
		}
				
			}
		//	var_dump($tdwg2_total[1][2]);
		//QUINA CUTRADA!!!!!

			//$BBOX_sql.=" OR code='".$val['zones'][$count-1]."'";
			$BBOX_sql.=" OR ".$field."='".$val['zones'][$count-1]."'";


	}
	$c++;
	}

	}//end if bbox
	//ftheeten 24/08/2011
	$BBOX_sql.=") AS foo;";
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
	//print($BBOX_sql);
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
	//$json='({"bbox":"'.$bbox.'","legend":"'.$leg_url.'","layers":[';
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
//ftheeten 2011/05/27
$xsl->setParameter( '', 'field', $field);
//$xsl->setParameter( '', 'label_field', $label_field);
$xsl->setParameter( '', 'label_field', $field);
$style = realpath('areas_pattern.xsl');
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


//ftheeten 14/04/2011 (make SLD persistent)
$location_persistent_sld="";
$name_persistent_sld="";
/*if(isset($_REQUEST['persistent'])===true)
{
	if(strtolower($_REQUEST['persistent'])==='true')
	{
		$name_persistent_sld=$displayedLayer.'_'.$_REQUEST['as'];
		$location_persistent_sld=$path_towrite_persistent_sld.$name_persistent_sld;
		$fp=fopen("$location_persistent_sld","w");
		$write=fwrite($fp,$out);	
	}
}*/

$json.='{"tdwg": "' . $feature. '","session": "'.$sessionid.'",';

//$json.='"sld": "' . $feature."_".$random.'"}';
//correction ftheeten 09/04/2010
$nameSLDFile=$feature."_".$random;
$json.='"sld": "' . V1_SLD_URL."/".$nameSLDFile.'"';

//14/04/2011
/*if(isset($_REQUEST['persistent'])===true)
{
	if(strtolower($_REQUEST['persistent'])==='true')
	{
		$json.=', "persistent_sld": "'.$url_persistent_sld.'/'.$name_persistent_sld.'"';
	}
}*/
	//$json.=', "location_img": "'.$random2_www.'"';
$json.='}';

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
	$random4="/var/www/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] )."wms_layers.png";
//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists($random3))
	{
		unlink($random3);
	}
	if(file_exists($random4))
	{
		unlink($random4);
	}
	/*
	$url2='';	
		
	if ($ls_string)
	{//print("in ls");
		$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$ls_string;
			$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&STYLES=".$styles_string;
			//update ftheeten 25/06/2010
//$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$ls_string;
			//$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
			print($url2);			
			//print($random3);			
			$cmd="convert '$url2' '$random3'";
			//$cmd="composite  '$url2' '$random3' '$random2'";
			//$output=shell_exec($cmd);
			//print($cmd);
			//print($output);

	}	
	else
	{
		$c="convert convert -size '".$width."x".$height."' xc:transparent $random3";

		shell_exec($c);
	}
	*/
	$url2_array=array();
	$c="convert convert -size '".$width."x".$height."' xc:transparent $random3";
	if(isset($arrayBackgroundStyle)===true)
	{
		if(count($arrayBackgroundStyle)>0)
		{
			$c='';
			for ($i=0;$i<count($arrayBackgroundStyle);$i++)
			{
				$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$arrayBackgroundStyle[$i]['name'];
			$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
			/*print("type=");			
			print($arrayBackgroundStyle[$i]['type']);
			print(",name=");			
			print($arrayBackgroundStyle[$i]['name']);
			print(",style=");			
			print($arrayBackgroundStyle[$i]['style']);
			print("=><>");	*/		
			if($arrayBackgroundStyle[$i]['type']=="sld")
			{
				$url2.="&SLD=".$arrayBackgroundStyle[$i]['style'];
			}
			elseif($arrayBackgroundStyle[$i]['type']=="wms_style")
			{
				$url2.="&STYLES=".$arrayBackgroundStyle[$i]['style'];
			}
			elseif($arrayBackgroundStyle[$i]['type']=="user_sld")
			{
				//print($arrayBackgroundStyle[$i]['style']);				
				//$url2.="&STYLES=".$arrayBackgroundStyle[$i]['style'];
				//print_r($total_symbols );
				//print_r($symbols_url);

				$pos_prefix_sld = substr_count($arrayBackgroundStyle[$i]['name'],$prefix_wms);
				$displayedLayer_sld=$arrayBackgroundStyle[$i]['name'];
				//print("pos=".$pos_prefix."=");
				if($pos_prefix_sld===0) 
				{
			  		//print("prefix");
					$displayedLayer_sld=$prefix_wms.$arrayBackgroundStyle[$i]['name'];
				}
				$returnedXML=generate_xml_simple_style_no_zone($displayedLayer_sld, $arrayBackgroundStyle[$i]['style'], $arrayBackgroundStyle[$i]['style'], $total_symbols, $symbols_url);
				//print($returnedXML);
				$path_towrite="/var/www/synthesys/www/v1/sld/"."_backsld_".$displayedLayer_sld.$random;
				//print($path_towrite);
				xml_to_sld_xslt($returnedXML, $displayedLayer_sld,'areas_pattern.xsl', $path_towrite );
				$url_back_sld=V1_SLD_URL."/_backsld_".$displayedLayer_sld.$random;
				$url2.="&SLD=".$url_back_sld;
			}
			
				$url2_array[]=$url2;
				//print($url2);
			}
		}
	}
	if(strlen($c)>0)
	{
		shell_exec($c);
	}


//print(count($url_list)>1);

//print_r($url_list);
//if(isset($ls_string)===false)
//{
		$c="convert convert -size '".$width."x".$height."' xc:transparent $random3";
		shell_exec($c);
//}
//else
//{
//	print($ls_string);
//}
//$url_list=array_reverse($url_list);

if(count($url_list)>1)
{

	//$c="composite ";

	for ($i=0;$i<count($url_list);$i++)
	{

		
		if($i==0)
		{
			$c="composite '".$url_list[$i]."' '".$url_list[$i]."' '".$random4."'";
			shell_exec($c);
			//print($c);
		}
		else
		{
			$c="composite '".$url_list[$i]."' '".$random4."' '".$random4."'";
			shell_exec($c);	
			//print($c);	
		}
		//print("\n");
		
	//$c.="'".$url_list[$i]."' ";
//print($url_list[$i]);
	}
	/*if(strlen($url2)>0)
	{
		$c.=" '".$url2."' ";
	}*/
	//$c.="'$random2' ";
//print($c);
//shell_exec($c);
//print("===>");
$c="composite  '$random4' '$random3' '$random2'";
//print($c);
//readfile($random2);
shell_exec($c);
//print($url2);
}
else
{
//SLDs over normal layers
//print($url_list[0]);
	//$c="convert convert -size '".$width."x".$height."' xc:transparent $random3";
	//shell_exec($c);
	$c="composite  '$url_list[0]' '$url_list[0]' '$random4'";
//print($c);
shell_exec($c);
$c="composite  '$random4' '$random3' '$random2'";
//print($c);
//readfile($random2);
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
		if(isset($url2_array)===true)
		{
			if(count($url2_array)>0)
			{
				$cptLayers=count($url2_array);
				for($i=$cptLayers-1;$i>=0;$i--)
				{
					$c="composite '$random2' '$url2_array[$i]' '$random2'";
					//print($url2_array[$i]);
					shell_exec($c);
				}		
			
			}	
		}
/*
		if(strlen($url2)>0)
		{
			$c=" composite '$random2' '$url2' '$random2' ";
			shell_exec($c);
		}
*/


//---display points
if($flagDisplayPoints===true)
{	//print("point=true");
	$sld_url.=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&STYLES=&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=rest_points&EPSG=4326&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=".URL_SITE."/synthesys/www/v1/sld/point_".$random.".sld";
	//print($sld_url);
	//$image=imagecreatefrompng($edit_url);
	$points= (rand()%300)."_p.png";
//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists('img/'.$points))
	{
		unlink('img/'.$points);
	}
//print($sld_url);
	$c="convert '$sld_url' 'img/$points'";
	shell_exec($c) ;

	$c="composite 'img/$points' '$random2' '$random2'";
	shell_exec($c);		
}
//end display points

if ($leg=='1')
{
	$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=TRUE&WIDTH=64&HEIGHT=36&";
				$legend_url.="layer=topp:tdwg_level_3&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&SLD=".$leg_url;
$com="convert  '$legend_url' '$random2_legend'";
shell_exec($com);
	if($flagDisplayPoints===true)
	{
		$legend_url_point.=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&VERSION=1.1.1&format=image/png&WIDTH=20&HEIGHT=30&layer=rest_points&SLD=".URL_SITE."/synthesys/www/v1/sld/point_".$random.".sld";
		$com="convert -background white -append '$legend_url_point' '$random2_legend'  '$random2_legend' ";
		shell_exec($com);
	}

	
	
$mlp=$_REQUEST['mlp'];
if(strlen($mlp)==0)
{
	//print("no");	
	$mlp='3';
}
switch ($mlp)
{
case ('1'):
 	{

$com="convert -background white +append '$random2_legend' '$random2'  '$random2'"; //-->exterior ul  
break;
 	}
case ('2'):
 	{
$com="convert -background white -append '$random2_legend' '$random2'  '$random2' "; 	//2
 break;
 }
 case ('3'):
 	{
$com="convert -background white +append  '$random2' '$random2_legend'   '$random2' "; //4
break;
 	}
 	
case ('4'):
 	{
 	
$com="convert  -background white -append  '$random2' '$random2_legend'   '$random2'"; //7
break;
 	}
case ('5'):
 	{ 	
 $com="composite -gravity  SouthEast '$random2_legend'  '$random2'   '$random2'";//9
break;
}	
case ('6'):
 	{ 	
 $com="composite -gravity  SouthWest '$random2_legend'  '$random2'   '$random2'";//10
break;
}	
case ('7'):
 	{ 	
 $com="composite -gravity  NorthEast '$random2_legend'  '$random2'   '$random2'";//11
break;
}	
case ('8'):
 	{ 	
 $com="composite -gravity  NorthWest '$random2_legend'  '$random2'   '$random2'";//12
break;$c.="'".$url_list[$i]."' ";
}	
}
shell_exec($com);

//B&W mode ftheeten 2011/07/05

if (strtolower($_REQUEST['grayscale'])==='true')
{
	$com_monochrome="convert -type Grayscale '$random2' '$random2'";
	shell_exec($com_monochrome);
}
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
