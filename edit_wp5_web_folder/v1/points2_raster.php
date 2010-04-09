<?
//code Pere Roca Ristol - CSIC
//RMCA mirror version 12-02-2010


//header("Content-Type: image/png");	  
$legend=$_GET['legend'];
$q_layer=$_GET['q_layer'];

$URL_WMS="http://193.190.223.46:8080/geoserver/wms";
$URL_SLD="http://edit.africamuseum.be/synthesys/www/fitxers/sld";
$path_to_write="/var/www/edit/synthesys/www/fitxers/sld";
$connection_string='host=localhost port=5432 user=postgres password=fv30714$A dbname=edit_geo_mirror';
$timestamp_deletion="5 Hours";

switch ($q_layer)
{

    case ('tdwg2'): $q_layer="tdwg_level_2";break;
    case ('tdwg3'): $q_layer="tdwg_level_3";break;
    case ('tdwg4'): $q_layer="tdwg_level_4";break;
}

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

$sqls=array();
//$od="1: 38.326, -0.822|38.328,-0.542||2: 38.062,-0.893| 38.072,-0.883";

$random = (rand()%300);
foreach ($geodata as $key=>$val)
{
	foreach ($geodata[$key]['geodata']['lat'] as $k=>$v)
	{
		//updated ftheeten timestamp column
		$sql="insert into rest_points(userid,id,the_geom,label, timestamp_point) 	values(".$random.",".$key.",";
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
//echo $sql_total;
$conn = pg_connect($connection_string);
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

$BBOX_sql="select extent(".$q_layer.".the_geom) from ".$q_layer.",rest_points where rest_points.userid='$random' and $q_layer.the_geom&&rest_points.the_geom and contains(".$q_layer.".the_geom,rest_points.the_geom)"; 
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
		//$bbox="-180,-90,180,90"; 
		//echo $ratio_x."<br>";
		//echo $ratio_y."<br>";
		$diff_x=abs((($ratio_x)/2 -$ratio_y)/2);	
		$bbox2[0]=$bbox2[0]-$diff_x;	
		$bbox2[2]=$bbox2[2]+$diff_x;	
		$bbox=$bbox2[0].",".$bbox2[1].",".$bbox2[2].",".$bbox2[3];
		$ratio=$ratio_x/$ratio_y;
		//echo $ratio."<br>";
		//echo $height."<br>";
		$width = (int)($height+($ratio*30));
		//echo $height;
		//echo $width;
		break;	


		case 'y':

		//echo "yyyy";
		//$diff_x=(($ratio_x)/2)/2;	
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
			//echo $ratio;
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



$file_to_write="point_".$random.".sld";
$fp=fopen($path_to_write."/".$file_to_write,"w");
$write=fwrite($fp,$out);

//$l2="r:elevation|v:provinces";
//$l2="v:tdwg3";
$l2=$_GET['l'];
$l2=explode('|',$l2);
$layers=array();
//var_dump($l2);
foreach ($l2 as $k=>$v)
{
	$l2=explode(':',$v);
	$list=explode(',',$l2[1]);
//	$data_type=$l2[0];
		foreach ($list as $k=>$v)
		{
			switch ($v)
			{
			     case ('mercantour'): $v='topp:atbi';break;
			      case ('gemer'): $v='topp:atbi';break;
				case ('alpi_acqua'):$v="topp:AlpMar_Acqua";break;
				case ('elevation'): $v="topp:elevation_europe_150sec";break;
			    case ('e_provinces'): $v="topp:province_europe";break;
			    case ('sp_provinces'): $v="topp:province_iberia";break;
				case ('tdwg1'): $v="topp:tdwg_level_1";break;
			    case ('tdwg2'): $v="topp:tdwg_level_2";break;
			    case ('tdwg3'): $v="topp:tdwg_level_3";break;
			    case ('tdwg4'): $v="topp:tdwg_level_4";break;
			}
			if ($l2[0]=='r')//r stands for raster: r:elevation|v:provinces
			{
				
			$layers['r'][]=$v;
			}
			else 
			{
				$layers['v'][]=$v;
			}
		}

}

	/*
	foreach ($l2 as $k=>$v)
	{
		
	}

	*/
//}
//	var_dump($layers);


//var_dump($layers);
$edit_url=$URL_WMS."?SERVICE=WMS&VERSION=1.1.1&TRANSPARENT=true&REQUEST=GetMap&SERVICE=WMS&EPSG=4326&layers=";
foreach ($layers as $k=>$v)
{
//	var_dump($v);
	if ($k=='r')
	{
		$count=count($layers[$k]);
		if (count($layers[$k])<1)
		{
		$edit_url.=$layers[$k][0];
		}
		else
		{
		//	echo count($layers[$k]);
			foreach ($layers[$k] as $k=>$v)
			{
			//	var_dump($v);
				$edit_url.=$v;
				if ($k<($count-1))
				{
					$edit_url.=",";									
				}
			}
		}
		if ($layers['r'])
		{
			$edit_url.=",";
		}
	}
		else
		{
			$count=count($layers[$k]);

			if (count($layers['r'])>1)
			{
			$edit_url.=",";
			}
			if (count($layers[$k])<1)
				{
			$edit_url.=$layers[$k][0];
				}			
			else
			{
			//	echo count($layers[$k]);
				foreach ($layers[$k] as $k=>$v)
				{
					$edit_url.=$v;
					if ($k<($count-1))
					{
						$edit_url.=",";									
					}
				}
			}
	}
}



$edit_url.=",topp:rest_points&EPSG=4326&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=".$URL_SLD."/".$file_to_write;

//echo $edit_url;
//$image=imagecreatefrompng($edit_url);
print $edit_url;
$r= "/var/www/edit/edit_wp5/".(rand()%300).".png";
$c="convert '$edit_url' '$r'";
//print($c);
shell_exec($c) ;

$legend_url=$URL_WMS."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&WIDTH=20&HEIGHT=30&layer=topp:rest_points&SLD=".$URL_SLD."/".$file_to_write;
$c2="convert +append  -background white 'image.png'  '$legend_url' '$r'";
if ($legend=='1')
{
//	echo $c2;
shell_exec($c2);	
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
$c="composite '$r' '$raster' '$r'";
shell_exec($c);

}
//$delete="delete from rest_points where userid='$random'";
//print("\nr=");
//print($r);
//pg_exec($delete) or die();
readfile($r);


unlink($r);
//var_dump($geodata);
//echo count($geodata);
//$count=count($geodata);

//echo $count;
/*
$wd=22;//*$count;
$h=10;//*$count;
$legend_url="http://edit.csic.es/geoserver/wms/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&WIDTH=$wd&HEIGHT=$h&layer=topp:rest_points&SLD=http://edit.csic.es/fitxers/sld/point_".$random.".sld";
//echo $legend_url;
$l_image=imagecreatefrompng($legend_url);
imagecopymerge($image,$l_image,0,($height/2),0,0,$wd*8,$h*($count*1.3),100);

imagepng($image);
//imagedestroy($image);
//imagedestroy($l_image);
*/
//unlink($path_towrite);	

//code to delete points (ftheeten 12/2/2010) --synchronised with 'edit_delete_table_timestamp' function
$Delete_sql="SELECT * FROM edit_delete_table_timestamp('rest_points','timestamp_point','".$timestamp_deletion."');";
$postgis_result_Deletion=pg_query($Delete_sql);


} //fi connexio bdades
?>
