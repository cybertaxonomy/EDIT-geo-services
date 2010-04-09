<?
//header('Content-type: text/xml');
//header('Content-type: text/html');
require_once("../path_index.php");
//print("maman");

$legend=$_GET['legend'];

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
//print($style);
//print($sld);
//print($r_url);
//print($sld_url);

//$od="1: 38.326, -0.822|38.328,-0.542|38.062,-0.893||2: 38.062,-0.893| 38.072,-0.883||3:40.78,-4.009|43.461,-5.412";
//$points=explode('||',$_GET['od']);

$od=$_GET['od'];
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
$os=$_GET['os'];
$sp=explode('|',$os);
$species=array();
foreach ($sp as $k=>$v)
{
	$sym=explode(':',$v);
	$specie_id=$sym[0];
	$symbologies=explode('/',$sym[1]);
    $geodata[$specie_id]['symbol']=$symbologies[0];
    $geodata[$specie_id]['color']=$symbologies[1];
    $geodata[$specie_id]['size']=$symbologies[2];
    $geodata[$specie_id]['legend']=$symbologies[3];
}
//var_dump($geodata);
//var_dump($species)
$sqls=array();
//$od="1: 38.326, -0.822|38.328,-0.542||2: 38.062,-0.893| 38.072,-0.883";

$random = (rand()%300);
foreach ($geodata as $key=>$val)
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
$sql_total="";
foreach ($sqls as $k=>$v)
{
//	echo $v."<br>";
$sql_total.=$v;
}

$conn = pg_connect(POSTGIS_CS);
if (pg_ErrorMessage($conn))
 { 
echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	}
else
 {
// echo $sql_total;
pg_exec($sql_total);	

if ($_GET['bbox'])
{
	$bbox=$_GET['bbox'];
}
else{

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

$path_towrite=DIR_PLATFORM."/synthesys/www/v1/sld/point_".$random.".sld";
//print($path_towrite);
$fp=fopen("$path_towrite","w");
$write=fwrite($fp,$out);

//$l2="r:elevation|v:provinces";
//$l2="v:tdwg3";



if ($_GET['image']=='false')
{
$img=$_GET['image'];

$time=time();
$sld_dir = DIR_PLATFORM."/synthesys/www/v1/sld"; 
$d = dir($sld_dir);

$json='foo({"bbox":"'.$bbox.'","points_sld":"point_'.$random.'.sld"})';

echo $json;

while($entry = $d->read()) { 
 if ($entry!= "." && $entry!= "..") { 

	     $f_last_modified = filemtime($sld_dir."/".$entry);

if ($time-$f_last_modified >400000)
{
//	echo $entry;

//commented by ftheeten
unlink($sld_dir."/".$entry);
}   

 } 
}
}
else
{
//header("Content-Type: image/png");	 
	$l2=$_GET['l'];
	$l2=explode('|',$l2);
	$layers=array();
	$sld_layers=array();
	//var_dump($l2);
	foreach ($l2 as $k=>$v)
	{
		
		$l2=explode(':',$v);
		$list=explode(',',$l2[1]);
//v:layer1/color/size...,layer2
	//	$data_type=$l2[0];
			foreach ($list as $k=>$v)
			{
				$v2=explode('/',$v);

				switch ($v2[0])
				{

				      case ('atbi'): $v='topp:atbi';$sld="no_sld";break;		
					case ('elevation'): $v="topp:elevation_europe_150sec";$sld="no_sld";break;
				    case ('e_w_1'): $v="europe_west_level_1"; $style="admin_level_1";
							if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}							
							break;
							case ('e_w_0'): $v="europe_west_level_0"; $style="admin_level_0";
									if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}							
									break;
						/*	  case ('e_w_2'): $v="europe_west_level_2"; $style="admin_level_2";
										if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]";} else {$sld="no_sld";}							
										break;
										*/
					case ('e_e_0'): $v="europe_east_level_0"; $style="admin_level_0";
													if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";} break;
													case ('c_america_0'): $v="c_america_level_0"; $style="admin_level_0";
																					if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";} break;
													case ('c_america_1'): $v="c_america_level_1"; $style="admin_level_1";
																													if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";} break;
												case ('antartica'): $v="antartica_level_0"; $style="admin_level_0";
																																														if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";} break;
					case ('e_e_1'): $v="europe_east_level_1"; $style="admin_level_1";
						if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}	break;
					case ('asia_1'): $v="asia_level_1"; $style="admin_level_1";
							if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";};break;
									case ('asia_0'): $v="asia_level_0"; $style="admin_level_0";
											if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
											case ('africa_0'): $v="africa_level_0"; $style="admin_level_0";
																	if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
					case ('africa_1'): $v="africa_level_1"; $style="admin_level_1";
											if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
				case ('oceania_0'): $v="oceania_level_0"; $style="admin_level_0";
																								if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
					case ('oceania_1'): $v="oceania_level_1"; $style="admin_level_1";
																		if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
					
											break;
													case ('n_america_1'): $v="n_america_level_1"; $style="admin_level_1";
																										if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;

																			break;	
																			case ('s_america_1'): $v="2_america_level_1"; $style="admin_level_1";
																																if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;

											case ('n_america_0'): $v="n_america_level_0"; $style="admin_level_0";
																																													if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;
																																														case ('s_america_0'): $v="s_america_level_0"; $style="admin_level_0";
																																																																																if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}break;

																									
									
				    case ('countries'): $v="country_earth";$style="country_earth";
				if (isset($v2[1])) { $sld=URL_SITE."/edit_wp5/geo/layers_sld/$style.php?params=1/$v/$v2[1]/$v2[2]/$v2[3]/$v2[4]";} else {$sld="no_sld";}		
					break;
					case ('europe'): $v="europe_level_0";break;
				    case ('tdwg2'): $v="topp:tdwg_level_2";break;
				    case ('tdwg3'): $v="topp:tdwg_level_3";break;
				    case ('tdwg4'): $v="topp:tdwg_level_4";break;
							}
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
print($v);
						

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

		$r= (rand()%300).".png";
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

	}else
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
		if ($_GET['raster'])
		{
		if ($_GET['raster']=='mercantour')
		{
		$raster='atbi_mercantour.png';
		}
		if ($_GET['raster']=='gemer')
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


		$c="convert '$sld_url' 'img/$points'";
		shell_exec($c) ;

		$c="composite 'img/$points' 'img/$r' 'img/$r'";
		shell_exec($c);		


	$timestamp_deletion="5 seconds";
	//$Delete_sql="SELECT * FROM edit_delete_table_timestamp('rest_points','timestamp_point','".$timestamp_deletion."');";
	//$postgis_result_Deletion=pg_query($Delete_sql);

	$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&VERSION=1.1.1&format=image/png&WIDTH=20&HEIGHT=30&layer=rest_points&SLD=".URL_SITE."/synthesys/www/v1/sld/point_".$random.".sld";


	$c2="convert +append  -background white  '$legend_url' 'img/$r' 'img/$r'";

	if ($legend=='1')
	{
	//	echo $c2;
	shell_exec($c2);	
	}

print('style=');
print($style);
print("<br/>");
print('sld=');
print($sld);
print("<br/>");
print('r_url');
print($r_url);
print("<br/>");
print('sld_url:');
print($sld_url);
print("<br/>");	 

readfile('img/'.$r);
//	unlink('img/'.$r);
//		unlink('img/'.$points);
//unlink($path_towrite);	
}




} //fi connexio bdades
?>
