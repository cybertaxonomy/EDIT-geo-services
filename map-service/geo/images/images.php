<?
require_once("../../path_index.php");
$srs=$_GET['proj'];
$up=$_GET['up'];
$dpi=$_GET['dpi'];
$bbox=$_GET['bbox'];
$format=$_GET['format'];
$dpi=$_GET['dpi'];
$user=$_GET['user'];
$folder=(rand()%300);
$width=round($_GET['width']);
$height=round($_GET['height']);


//mkdir("download/",0777);
//chmod("download/$user/$folder",0777);
$URL_SITE="http://193.190.223.53";
$URL_GEOSERVER="http://193.190.223.53:8080/geoserver/wms";
$path="download";
//genus sld path
if ($_GET['sld_path'])
{
$sld_path=$_GET['sld_path'];
}
if ($_GET['serialized_sld'])
{
$serialized_sld=$_GET['serialized_sld'];
}

if ($_GET['sp_sld_paths'])
{
$sp_sld_paths=$_GET['sp_sld_paths'];
}
if ($_GET['fourth_sld_paths'])
{
$fourth_sld_path=$_GET['fourth_sld_paths'];
}

if ($_GET['grids'])
{
$grids=$_GET['grids'];
}
if ($_GET['untiled_sld'])
{
$untiled_sld=$_GET['untiled_sld'];
$untiled_sld=explode('|',$untiled_sld);
}
if ($_GET['scalebar'])
{
$scalebar=$_GET['scalebar'];
}
if ($_GET['windrose'])
{
$windrose=$_GET['windrose'];
}


//	$x=$width*$up;
	$white="white_images/white".$width.".png";
//if ($_GET['untiled']){
$untiled=$_GET['untiled'];
$untiled=explode('@',$untiled);
$untiled=array_reverse($untiled);
$u=array();
$u2=array();

$count=0;
foreach ($untiled as $k3=>$v)
{
//4*topp:grid2|grids
//3*layer1,style1|layer2,style2
$untiled=explode('*',$v);
//$u[$untiled[0]]['position']=$untiled[0];
$position=$untiled[0];

$info=$untiled[1];


$info=explode('|',$info);

$count=$count+count($info);
//layer1,style1   layer2,style2
//topp:grid2,grids
	foreach ($info as $k=>$v)
	{
//geometry_type--->polygon: fill_color/stroke_color/stroke_style
//polygon/
//untiled=1|topp:UTM_Europe,UTM_Europe/faf7c6@2|topp:country_earth,world_negro

		

		//layer1,style1  layer2,style2
		$info=explode(',',$v);

//1/tdwg_level_1/e24077/2/100000
//		admin_level_1,c_america_level_1
		//var_dump($info);
		$layer=$info[0];
		$style=$info[1];

//    10*admin_level_2,c_america_level_2    
		$occurrence = explode('/',$style);	

		if (count($occurrence)>1)  //more than up (SLD)
		{

   //LAYERS=topp:admin_level_1&TRANSPARENT=true&SLD=".URL_SITE."/edit_wp5/geo/layers_sld/admin_level_1.php?params=2/admin_level_1&FORMAT=image%2Fpng&SERVICE=WMS&STYLES=c_america_level_1

       // $up=$occurrence[0]*$up;
	//geometry_type/fill_color/stroke/strokestyle/up
	    $style=((int)$occurrence[0])*$up."/";
 //echo $style;
        for ( $i = 1; $i < (count($occurrence)); $i++ )
        {
            $style.=$occurrence[$i]."/";
        }
        $style = substr($style, 0, -1);
		$s="SLD=$URL_SITE/edit_wp5/geo/layers_sld/".$layer.".php?params=".$style;
		
		}		
		else
		{ 
		   if ($up==1)
		      {
					if ($layer=='admin_level_0' || $layer=='admin_level_1' || $layer=='admin_level_2')
					{
					$s="STYLES=".$layer; 	
					}
					else
					{
					$s="STYLES=".$occurrence[0]; 
			 		}
			  }
			 else 
			 {
					if ($layer=='admin_level_0' || $layer=='admin_level_1' || $layer=='admin_level_2')
					{
						$s="SLD=$URL_SITE/edit_wp5/geo/layers_sld/".$layer.".php?params=".$up."/".$style;	
					}

					else
					{
 // $s="SLD=$URL_SITE/edit_wp5/geo/layers_sld/utm_world.php?params=".$up."/".$layer;  


  if ($layer=='utm250000sqkm_earth' || $layer=='utm1e6sqkm_earth' || $layer=='utm250000sqkm_earth' || $layer=='utm_world')
                    {
                     $s="SLD=$URL_SITE/edit_wp5/geo/layers_sld/utm_world.php?params=".$up."/".$layer;  

                    }
                    else
                    {
                    $s="SLD=$URL_SITE/edit_wp5/geo/layers_sld/".$layer.".php?params=".$up."/".$layer;
                     }

   }

   }
   }
			

				$u['layers']['layer'][]=$layer;	
				$u['layers']['layer']['position'][]=$position;	
				$u['layers']['style'][]=$style;

				if ($layer=='admin_level_0' || $layer=='admin_level_1' || $layer=='admin_level_2')
				{
						$url=$URL_GEOSERVER."?LAYERS=topp:".$style."&TRANSPARENT=true&";
						$url.=$s."&FORMAT=image%2Fpng&SERVICE=WMS";
				}
				else
				{
				$url=$URL_GEOSERVER."?LAYERS=topp:".$layer."&TRANSPARENT=true&";
				$url.=$s."&FORMAT=image%2Fpng&SERVICE=WMS";
				
					}
				$url.="&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=".$srs."&BBOX=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;	

			$u['layers']['url'][]=$url;	

							
	}

}





$u2['layers']['url'][]='new LAYERING';
$result = $u+$u2;

sort($u['layers']['layer']['position']);
$count=count($u['layers']['url']);


function to_grey($file,$new_f)
{
global $dpi,$DIR_PLATFORM;
		$c="convert  '$file' -colorspace Gray   '$file'";	
		shell_exec($c);
		
			$c="convert -density $dpi".x."$dpi -units PixelsPerInch '$file' '$file'";

		shell_exec($c);
$URL_SITE="http://193.190.223.53";
	echo $URL_SITE."/edit_wp5/geo/images/edit_images.php?format=$new_f&file=".$file;
$DIR_PLATFORM="/var/www";
	$img_dir = $DIR_PLATFORM."/edit_wp5/geo/images/download";
		$e = dir($img_dir);
		$time=time();
		while($entry = $e->read()) { 
		 if ($entry!= "." && $entry!= "..") { 

			     $f_last_modified = filemtime($img_dir."/".$entry);

		if ($time-$f_last_modified >400)
		{
		unlink($img_dir."/".$entry);
		}   

		 } 
		} 
		$e->close();
	
}

function convert_tif ($image)
{
			$bits=$_GET['bits'];
			$cmyk=$_GET['cmyk'];
			global $path,$format,$dpi;

			$t_file= $path.'/'.(rand()%3000).'.tif';

					$c2="convert -compress lzw '$image' '$t_file'";
					shell_exec($c2);
				

			
					if ($format=='tif/gray')
					{
						$new_f='tif';
						to_grey($t_file,$new_f);	
																					
					}
				
					
	                if ($bits=="8bit")
						{
							$c="convert -depth 8 '$t_file' '$t_file' ";
						
							shell_exec($c);	
						}
					if ($cmyk=="cmyk")
							{
							//	$r3= (rand()%3000).'.tif';
								$c3="convert  '$t_file' -colorspace CMYK '$t_file'";
														//	echo $c3;
								shell_exec($c3);
		
								}
$c="convert -density $dpi".x."$dpi -units PixelsPerInch '$t_file' '$t_file'";

shell_exec($c);
								
echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=tif&file=$t_file";
	$img_dir = DIR_PLATFORM."/geo/images/download";
	$e = dir($img_dir);
	$time=time();
	while($entry = $e->read()) { 
	 if ($entry!= "." && $entry!= "..") { 

		     $f_last_modified = filemtime($img_dir."/".$entry);

	if ($time-$f_last_modified >400)
	{
	unlink($img_dir."/".$entry);
	}   

	 } 
	} 
	$e->close();

}  

function print_file ($r)
{
global $format,$path,$dpi;
if ($format=='tif' || $format=='tif/gray')
		{
		//	global $r2;
				//echo "FIFFF";
			convert_tif($r);
		}
		
		else if ($format=='image/png')
		{
		$c="convert -density $dpi".x."$dpi -units PixelsPerInch '$r' '$r'";

		shell_exec($c);

		echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=png&file=$r";	
		$img_dir = DIR_PLATFORM."/geo/images/download";
		$e = dir($img_dir);
		$time=time();
		while($entry = $e->read()) { 
		 if ($entry!= "." && $entry!= "..") { 

			     $f_last_modified = filemtime($img_dir."/".$entry);

		if ($time-$f_last_modified >40)
		{
		unlink($img_dir."/".$entry);
		}   

		 } 
		} 
		$e->close();	
		}
		else
		{
			
			if ($format=='image/jpeg' || $format=='jpeg/gray') { $new_f="jpeg"; }
			if ($format=='image/gif' || $format=='gif/gray') { $new_f="gif"; }
			if ($format=='image/png' || $format=='png/gray') { $new_f="png"; }
			
			
			$f="$path"."/".(rand()%300).".".$new_f;
			$final="convert '$r' '$f'";

			shell_exec($final);
		
			 if ($format=='jpeg/gray' || $format=='gif/gray' || $format=='png/gray')
			{
			//	echo "FINAL is".$f;
				to_grey($f,$new_f);
			}
			else
			{
				if ($format=='image/jpeg60')
			{
		
			$c="convert -quality 60% $f $f";
			shell_exec($c);
			
			}
			if ($format=='image/jpeg40')
			{
			$c="convert -quality 40% $f $f";
			shell_exec($c);
			}
						if ($format=='image/jpeg20')
			{
			$c="convert -quality 20% $f $f";

			shell_exec($c);
			}
			$c="convert -density $dpi".x."$dpi -units PixelsPerInch '$f' '$f'";

			shell_exec($c);

			echo URL_SITE."/edit_wp5/geo/images/edit_images.php?format=$new_f&file=$f";
			
			
				$img_dir = DIR_PLATFORM."/geo/images/download";
				$e = dir($img_dir);
				$time=time();
				while($entry = $e->read()) { 
				 if ($entry!= "." && $entry!= "..") { 

					     $f_last_modified = filemtime($img_dir."/".$entry);

				if ($time-$f_last_modified >40)
				{
				unlink($img_dir."/".$entry);
				}   

				 } 
				} 
				$e->close();		
			}
		}

}
function add_details($r)
{
global $width,$height,$path,$bbox,$up,$srs;

if (isset($_GET['analysis_layer']))
{
	$url=URL_GEOSERVER."?bbox=".$bbox."&Format=image/png&request=GetMap&version=1.1.1&layers=".$_GET['analysis_layer']."&width=".$width."&height=".$height."&srs=".$srs."&TRANSPARENT=true";
	$url.="&SLD=".$_GET['analysis_sld'];
	$c="composite '$url' '$r' '$r'";
	shell_exec($c);
}
if ($_GET['serialized_sld'])
{
$url=URL_GEOSERVER."?bbox=".$bbox."&Format=image/png&request=GetMap&version=1.1.1&layers=serialized_pols&width=".$width."&height=".$height."&srs=".$srs."&TRANSPARENT=true";
$url.="&SLD=".$_GET['serialized_sld'];
$c="composite '$url' '$r' '$r'";
shell_exec($c);
}


	if ($_GET['windrose'])
{
$windrose=$_GET['windrose'];
	$windrose_height=round($_GET['height']/3);
	$windrose_width=round($_GET['width']/4);
	$windrose_wh=$windrose_height."x".$windrose_width;
$r2="windroses/".(rand()%300).".png";
$xy="convert -resize '$windrose_wh' 'windroses/$windrose' '$r2'";

shell_exec($xy);
$c4="composite -gravity NorthEast   '$r2' '$r' '$r'";
shell_exec($c4);
unlink($r2);
//$c4="convert -pointsize 13 -box grey -font Arial.ttf -annotate 0x0+10+30 '$escala' '$r' '$r'"; 
}
if ($_GET['scalebar'])
{
$scalebar=$_GET['scalebar'];
$percent=($up*100)."%";
$scalebar2='resized_legend.png';

$p="convert -resize '$percent' 'scalebars/$scalebar' 'scalebars/$scalebar2'";

shell_exec($p);


$c4="composite -gravity SouthWest 'scalebars/$scalebar2' '$r' '$r'"; 

shell_exec($c4);
}

  if ($_GET['grids'])
		{
		
	if ($_GET['screen_w']=='medium2')  //MACOS 
	{    

			$g_w=735*$up;
			$g_h=375*$up;
			$white='white_images/white'.$g_w.'.png';
			
	$grid_lon_style="grids_lon_".$up;
	$grid_lat_style="grids_lat_".$up;			
	}
	if ($_GET['screen_w']=='medium1')
	{
	$g_w=650*$up;
	$g_h=330*$up;
	$white='white_images/white'.$g_w.'.png';
		$grid_lon_style="grids_lon_m".$up;
		$grid_lat_style="grids_lat_m".$up;
   }  //END SCREEN SIZE
   if ($_GET['screen_w']=='big')
	{
		$g_w=round(950*$up);//?
		$g_h=round(480*$up);//?
		$white='white_images/white'.$g_w.'.png';
//		$s="convert -size ".$g_w."x".$g_h." xc:white '$white'";

	
		$grid_lat_style="grids_lat_b".$up;
			$grid_lon_style="grids_lon_b".$up;
	}

	global $grids;
	$grids=$_GET['grids'];
	$new_height=($_GET['width']/2)*$up;
	$new_width=($_GET['width'])*$up;
	$new_wh=round($new_width)."x".round($new_height);	

	$w=$_GET['width'];
    $h=$_GET['height'];
	$r_grid=$path."/grid.png";
	$r_grid2=$path."/grid2.png";
	$grid_lat=$path."/grid_lat.png";
	$grid_lon=$path."/grid_lon.png";
	$final=$path."/final.png";

$grids_lon_url=URL_GEOSERVER."?bbox=".$bbox."&styles=".$grid_lon_style."&Format=image/png&request=GetMap&version=1.1.1&layers=topp:".$grids."_line&width=".$w."&height=".$h."&srs=".$srs."&TRANSPARENT=true";


$grids_lat_url=URL_GEOSERVER."?bbox=".$bbox."&styles=".$grid_lat_style."&Format=image/png&request=GetMap&version=1.1.1&layers=topp:".$grids."_line&width=".$w."&height=".$h."&srs=".$srs."&TRANSPARENT=true";

$grids_url=URL_GEOSERVER."?bbox=".$bbox."&styles=grids&Format=image/png&request=GetMap&version=1.1.1&layers=topp:".$grids."&width=".$width."&height=".$height."&srs=".$srs."&TRANSPARENT=true";

$c="composite  '$r' '$grids_url' '$r'";

shell_exec($c);
$f="convert -resize ".$w."x".$g_h."\! '$grids_lon_url' '$grid_lon'";

shell_exec($f);


$f="convert -resize ".$g_w."x".$h."\! '$grids_lat_url' '$grid_lat'";

shell_exec($f);

$f="composite  -gravity center  '$grid_lon' '$white'  '$r_grid2'";

shell_exec($f);


$c="composite  -gravity center '$grid_lat' '$r_grid2'   '$r_grid2'";

shell_exec($c);

$frame=round($up*(2))."x".round($up*(2))."+".round($up)."+".round($up);
$f="convert '$r' -compose Copy  -frame $frame  '$r'";

	shell_exec($f);
$c="composite  -gravity center   '$r' '$r_grid2' '$r'";
//$c="composite '$r_grid2' '$r' '$r'";

shell_exec($c);


print_file($r);

unlink($r_grid);
unlink($r_grid2);
unlink($grid_lat);unlink($grid_lon);
unlink($final);

}
	else
	{
	global $white;
	$c="composite '$r' '$white' '$r'";


	shell_exec($c);
	
print_file($r);	
	}
}

function add_points ($image)
{
    global $path, $bbox,$width,$height,$bbox,$user,$srs;
	$r=$path."/mapserver.png";

/*
if ($_GET['ms_layer'])
{
$bbox2=explode(',',$bbox);
$ms_bbox=$bbox2[0]."+".$bbox2[1]."+".$bbox2[2]."+".$bbox2[3];

$mapserv_url=URL_SITE.'/cgi-bin/mapserv?map=/var/www/synthesys/www/geo/images/mapserver_maps/'.$user.'/'.$user.'.map';
$mapserv_url.='&LAYERS=shoreline&GROUP=mapserver&transparent=TRUE&format=image/png';
$mapserv_url.='&mode=map&map_imagetype=png&imgext='.$ms_bbox.'&mapext='.$ms_bbox.'&map_size='.$width.'+'.$height;

//$ms=URL_SITE.'/cgi-bin/mapserv?map=/var/www/synthesys/www/geo/images/mapserver_maps/888/888.map&LAYERS=shoreline&GROUP=mapserver&transparent=TRUE&format=image/png&mode=map&map_imagetype=png&imgext=-87.994717+7.842392+-80.304287+11.687607&imgxy=700+350';
//$c="convert '$mapserv_url' $image'";
$c="composite '$mapserv_url' '$image' '$image'";

shell_exec($c);
}
*/
global $URL_GEOSERVER;
if ($_GET['fourth_sld_paths'])
{
	$f_points_url=$URL_GEOSERVER."?LAYERS=user_points&TRANSPARENT=TRUE&";
				$f_points_url.="SLD=".$_GET['fourth_sld_paths']."&FORMAT=image%2Fpng&SERVICE=WMS";
				$f_points_url.="&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=".$srs."&BBOX=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
$final="composite '$f_points_url' '$image' '$image'";

shell_exec($final);
}

if ($_GET['sp_sld_paths'])
{
	$sp_points_url=$URL_GEOSERVER."?LAYERS=user_points&TRANSPARENT=TRUE&";
				$sp_points_url.="SLD=".$_GET['sp_sld_paths']."&FORMAT=image%2Fpng&SERVICE=WMS";
				$sp_points_url.="&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=".$srs."&BBOX=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;
$final="composite '$sp_points_url' '$image' '$image'";

shell_exec($final);
}

if ($_GET['sld_path'])
{
	$points_url=$URL_GEOSERVER."?LAYERS=user_points&TRANSPARENT=TRUE&";
				$points_url.="SLD=".$_GET['sld_path']."&FORMAT=image%2Fpng&SERVICE=WMS";
				$points_url.="&VERSION=1.1.1&REQUEST=GetMap&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=".$srs."&BBOX=".$bbox."&WIDTH=".$width."&HEIGHT=".$height;

$final="composite '$points_url' '$image' '$image'";

shell_exec($final);
}

add_details($image);
}

for ($i=0;$i<count($result['layers']['url']);$i++)
{

	$random[$i]=$path."/".(rand()%300).".png";
//echo $result['layers']['url'][$i]." with position ".$result['layers']['layer']['position'][$i]."<br>";

$this_url=$u['layers']['url'][$i];


if ($i==0) //�LTIMA (RASTER)
	{
		$c="convert '$this_url' '$random[$i]'";	
//echo $c;
	   shell_exec($c);
		if ($count==1)
		{
			add_points($random[$i]);	

		}
 		//	add_points($random[$k]);
	}
	else
	{

		if ($i==$count-1)  //PEN�LTIMA!!!
		{
		//	echo "K IS $k and count ..... $count-1";
		
				$prev=$i-1;

				$c="composite '$this_url'  '$random[$prev]' '$random[$i]'";
				shell_exec($c);
//			echo $c;
			 add_points($random[$i]);

		}
		else
		{


		$prev=$i-1;

		$c2="composite '$random[$prev]' '$this_url' '$random[$i]'";

	shell_exec($c2);
		}
		
	}

}



?>
