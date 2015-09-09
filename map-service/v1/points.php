<?php
require_once("../path_index.php");

$timestamp_deletion="5 Minutes";

//ftheeten 24/03/2011
$r=md5($_SERVER["REQUEST_URI"] ).".png";

//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists('img/'.$r))
	{
		unlink('img/'.$r);
	}


$legend=$_REQUEST['legend'];

$ms=$_REQUEST['ms'];

$imgpathforjsonurl="http://edit.br.fgov.be/edit_wp5/v1/img";

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

//var_dump($geodata);
//var_dump($species)
$sqls=array();
//$od="1: 38.326, -0.822|38.328,-0.542||2: 38.062,-0.893| 38.072,-0.883";


$random=md5($_SERVER["REQUEST_URI"] );
foreach ($geodata as $key=>$val)
{
	if(isset($geodata[$key]['geodata']['lat'] )===true)
	{
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

//New Blank Value Code 
if ( $_REQUEST['od'] ==null or $_REQUEST['os'] == null or ($_REQUEST['ms'] == null && $_REQUEST['image']!="false" )or ($_REQUEST['l'] == null  && $_REQUEST['image']!="false"))
{
	print("<br>");
	print("<br>");
	print("<b>The URL must be missing some values, or they have been wrongly defined.</b><br>");
	print("<br>");
	print("<b>Make sure you use the following syntax when adding the variables</b><br>");
	print("Eg. http://edit.br.fgov.be/edit_wp5/v1/points.php<b>?</b>Layers<b>&</b>Object Data<b>&</b>Object Style<b>&</b>*Bounding Box<b>&</b>Map Size<br>");
	if ($layers==null)
	{
		print("<br>");
		print("<b>Layers (l=) has not been defined</b><br>");
		print("This defines the background layer.<br>");
		print("Eg. l=earth will give your map a backgound of the full earth map with only country data.<br>");
		print("where l=tdwg4 will make the earth your background as well but with the tdwg layer 4 areas defined.<br>");
		print("The layers can only be earth, <a href=\"tdwgLevel1.html\">tdwg1</a>, <a href=\"tdwgLevel2.html\">tdwg2</a>, <a href=\"tdwgLevel3.html\">tdwg3</a> or <a href=\"tdwgLevel4.html\">tdwg4</a>. Click on the name to see a list of the area codes.<br>");
	}
	if ($_REQUEST['od']==null)
	{
		print("<br>");
		print("<b>Object Data (od=) has not been defined</b><br>");
		print("This is to determin which points will be symbolized specifically on the map in the format od=1:lat,long|lat,long|lat,long etc<br>");
		print("You can have information form more then one set of points defined by using || as a seperator<br>");
		print("Eg od=1:lat,long|lat,long|lat,long||2:lat,long|lat,long|lat,long<br>");
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
		print("This defines the size of the map that will be displayed.<br>It is only a single number representing the width of the image. The height is that number divided by 2.<br>eg. ms=1000 will give you a width of 1000 and a height of 500.<br>");
	}
	if ($_REQUEST['os']==null)
	{
		print("<br>");
		print("<b>Object Style (os=) has not been defined</b><br>");
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
//

$conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn))
{ 
	echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
}
else
{
	// echo $sql_total;
	pg_exec($sql_total);	

	if ($_REQUEST['bbox'])
	{
		$bbox=$_REQUEST['bbox'];
	}
	else
	{
		$BBOX_sql="select extent(the_geom) from rest_points where rest_points.userid='$random'"; 
		//	echo $BBOX_sql;
		$postgis_result=pg_query($BBOX_sql);
		while ($row = pg_fetch_array($postgis_result, NULL, PGSQL_ASSOC))
		{
			$b=substr($row['extent'],4);
			$c=substr($b,0,-1); 
			$bbox=str_replace(' ',',',$c);
		}
	 	$bbox2=explode(',',$bbox);
		$x1=$bbox2[0];		
		$y1=$bbox2[1];		
		$x2=$bbox2[2];		
		$y2=$bbox2[3];
		//	$bbox=$x1.",".$y1.",".$x2.",".$y2;
		$ratio_x=$bbox2[2]-$bbox2[0];
		$ratio_y=abs($bbox2[1]-$bbox2[3]);
		if ($_REQUEST['recalculate']=='true')
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
			$ratio=$ratio_x/$ratio_y;
			$height = (int)($width / $ratio);
		}
	} //fi ELSE

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

//$l2="r:elevation|v:provinces";
//$l2="v:tdwg3";



$flagCreateImage=true;

if ($_REQUEST['image']=='false')
{
	$img=$_REQUEST['image'];
	$time=time();
	$sld_dir ="/var/www/synthesys/www/v1/sld"; 
	$d = dir($sld_dir);

	if($_REQUEST['createimgforjson']==='true')
	{
		
		if (isset($_REQUEST['callback']))
		{
				$json=$_REQUEST['callback'].'({"bbox":"'.$bbox.'","points_sld":"point'.$random.'.sld","img":"'.$imgpathforjsonurl.'/'.$r.'"})';
	 	}
	 	else
	 	{
		 	$json='{"bbox":"'.$bbox.'","points_sld":"point_'.$random.'.sld","img":"'.$imgpathforjsonurl.'/'.$r.'"}';
		}
	}
	else
	{
	
		if (isset($_REQUEST['callback']))
		{
				$json=$_REQUEST['callback'].'({"bbox":"'.$bbox.'","points_sld":"point_'.$random.'.sld"})';
	 	}
	 	else
	 	{
		 	$json='{"bbox":"'.$bbox.'","points_sld":"point_'.$random.'.sld"}';
		}
		$flagCreateImage=false;
	}
	echo $json;

	while($entry = $d->read()) 
	{ 
 		if ($entry!= "." && $entry!= "..") 
		{ 
			$f_last_modified = filemtime($sld_dir."/".$entry);
			if ($time-$f_last_modified >1440000000)
			{
				//	echo $entry;
				//commented by ftheeten
				unlink($sld_dir."/".$entry);
			}   
		} 
	}
}
if($flagCreateImage===true)
{
	if ($_REQUEST['image']!='false')
	{	
		header("Content-Type: image/png");	 
	}
	$l2=$_REQUEST['l'];
	$l2=explode('|',$l2);
	$layers=array();
	$sld_layers=array();
	//var_dump($l2);
	foreach ($l2 as $k=>$v)
	{
		
		$l2=explode(':',$v);
		$list=explode(',',$l2[1]);
		//v:layer1/color/size...,layer2
		//$data_type=$l2[0];
		foreach ($list as $k=>$v)
		{
			$v2=explode('/',$v);

			switch ($v2[0])
			{
				case ('atbi'): 
				$v='topp:atbi';
				$sld="no_sld";
				break;		
				case ('elevation'): 
				$v="topp:elevation_europe_150sec";
				$sld="no_sld";
				break;
				case ('e_w_1'): 
				$v="europe_west_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else
				{
					$sld="no_sld";
				}
				break;
				case ('e_w_0'): 
				$v="europe_west_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				/*
				case ('e_w_2'): 
				$v="europe_west_level_2"; 
				$style="admin_level_2";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]";
				} 
				else
				{
					$sld="no_sld";
				}
				break;
				*/
				case ('e_e_0'): 
				$v="europe_east_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				} 
				break;
				case ('c_america_0'): 
				$v="c_america_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				} 
				break;
				case ('c_america_1'): 
				$v="c_america_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				} 
				break;
				case ('antartica'):
				$v="antartica_level_0";
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				}
				else
				{
					$sld="no_sld";
				}
				break;
				case ('e_e_1'):
				$v="europe_east_level_1";
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('asia_1'): 
				$v="asia_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('asia_0'): 
				$v="asia_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('africa_0'): 
				$v="africa_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('africa_1'): 
				$v="africa_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} else 
				{
					$sld="no_sld";
				}
				break;
				case ('oceania_0'): 
				$v="oceania_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('oceania_1'): 
				$v="oceania_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('n_america_1'): 
				$v="n_america_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('s_america_1'):
				$v="2_america_level_1"; 
				$style="admin_level_1";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('n_america_0'): 
				$v="n_america_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('s_america_0'): 
				$v="s_america_level_0"; 
				$style="admin_level_0";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				case ('countries'): 
				$v="country_earth";
				$style="country_earth";
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}		
				break;
				case ('europe'): 
				$v="europe_level_0";
				//added by James Davy on Jan 26 2011
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				//end of new additions by James Davy Jan 26 2011
				break;
				case ('tdwg2'): 
				$v="topp:tdwg_level_2";
				//added by James Davy on Jan 26 2011
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				//end of new additions by James Davy Jan 26 2011
				case ('tdwg3'): 
				$v="topp:tdwg_level_3";
				//added by James Davy on Jan 26 2011
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				break;
				//end of new additions by James Davy Jan 26 2011
				case ('tdwg4'): 
				$v="topp:tdwg_level_4";
				//added by James Davy on Jan 26 2011
				if (isset($v2[1])) 
				{ 
					$sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";
				} 
				else 
				{
					$sld="no_sld";
				}
				//end of new additions by James Davy Jan 26 2011
				break;
			}//End Switch

			if ($l2[0]=='r')
			{
				$layers['r'][]=$v;
			}
			else
			{
				$layers['v'][]=$v;
				$sld_layers[]=$sld;
			}		
		}
	}

	$c['v']=array();
	foreach ($layers as $k=>$v)
	{
		if ($k=='r')
		{
			//only ONE RASTER is accepted
			$c['r']=array();
			foreach ($layers[$k] as $k=>$v)
			{
				$r_url=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=";			
				$r_url.=$v;
			$r_url.="&EPSG=4326&format=image/png&bbox=".$bbox."&STYLES=&WIDTH=".$width."&HEIGHT=".$height;
				$c['r'][]=$r_url;
			}

		}
		else
		{
			//$v i s array  (layers[v]='mylayer')
			foreach ($layers['v'] as $k=>$v)
			{
				$edit_url=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true";					
				$edit_url.="&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=";
				//print($v);
				$edit_url.=$v;
				$edit_url.="&EPSG=4326&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
				if ($sld_layers[$k]=='no_sld')
				{
					$edit_url.="&STYLE=";	
				}
				else
				{
					$edit_url.="&SLD=".$sld_layers[$k];
				}
				$c['v'][]=$edit_url;
			}	
		}
		//."&SLD=".URL_SITE."/synthesys/www/fitxers/sld/point_".$random.".sld";
	}

	
	if (isset($c['r']))
	{
		$raster=$c['r'][0];
		$c2="convert '$raster' 'img/$r'";
		shell_exec($c2);
		if (isset($c['v']))
		{
			foreach ($c['v'] as $k=>$v)
			{
				$c="composite  '$v' 'img/$r' 'img/$r'";
				shell_exec($c);	
			}
		}
	}
	else
	{
		if (isset($c['v']))
		{
			foreach ($c['v'] as $k=>$v)
			{
				if ($k==0)
				{
					$c2="convert '$v' 'img/$r'";
					shell_exec($c2);
				}
				else
				{
					$c="composite  '$v' 'img/$r' 'img/$r'";
					shell_exec($c);						
				}
			}
		}	
	}
	if ($_REQUEST['raster'])
	{
		if ($_REQUEST['raster']=='mercantour')
		{
			$raster='atbi_mercantour.png';
		}
		if ($_REQUEST['raster']=='gemer')
		{
			$raster='atbi_gemer.png';
			//$raster='gemer2.jpg';
		}
		$c="composite 'img/$r' '$raster' 'img/$r'";
		shell_exec($c);
	}
	$sld_url.=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&STYLES=&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=rest_points&EPSG=4326&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=".URL_SITE."/synthesys/www/v1/sld/point_".$random.".sld";

	//$image=imagecreatefrompng($edit_url);
	$points= (rand()%300)."_p.png";
//ftheeten 22/02/2011 (sometimes bug if image previously exists)
	if(file_exists('img/'.$points))
	{
		unlink('img/'.$points);
	}

	$c="convert '$sld_url' 'img/$points'";
	shell_exec($c) ;

	$c="composite 'img/$points' 'img/$r' 'img/$r'";
	shell_exec($c);		

	$timestamp_deletion="5 seconds";
	//$Delete_sql="SELECT * FROM edit_delete_table_timestamp('rest_points','timestamp_point','".$timestamp_deletion."');";
	//$postgis_result_Deletion=pg_query($Delete_sql);

	

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
				$c="composite 'img/$r' '$extWFSURLArray[$i]' 'img/$r'";
				shell_exec($c);
			}		
			
		}

//print('style=');
//print($style);
//print("<br/>");
//print('sld=');
//print($sld);
//print("<br/>");
//print('r_url');
//print($r_url);
//print("<br/>");
//print('sld_url:');
//print($sld_url);
//print("<br/>");	 

$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&VERSION=1.1.1&format=image/png&WIDTH=20&HEIGHT=30&layer=rest_points&SLD=".URL_SITE."/synthesys/www/v1/sld/point_".$random.".sld";

	$c2="convert +append  -background white  '$legend_url' 'img/$r' 'img/$r'";

	if ($legend=='1')
	{
		//	echo $c2;
		shell_exec($c2);	
	}

if ($_REQUEST['image']!='false')
{	
	readfile('img/'.$r);
}



	//	unlink('img/'.$r);
//		unlink('img/'.$points);
//unlink($path_towrite);	
}

//code to delete points (ftheeten 12/2/2010) --synchronised with 'edit_delete_table_timestamp' function
$Delete_sql="SELECT * FROM edit_delete_table_timestamp('rest_points','timestamp_point','".$timestamp_deletion."');";
try
{
  //$postgis_result_Deletion=pg_query($Delete_sql);
}
catch(Exception $e)
{
	echo("Error in connection deleting points");
}

} //fi connexio bdades

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
