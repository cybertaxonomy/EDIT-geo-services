<?php
require_once("../path_index.php");

//header("Content-Type: text/xml");	  
$random=md5($_SERVER["REQUEST_URI"] ).".sld";
$leg=$_GET['legend'];
//$random2=DIR_PLATFORM."/synthesys/www/v1/cr_img/".(rand()%300).".png"; 
$random2=DIR_PLATFORM."/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] ).".png";

$sld_dir = DIR_PLATFORM."/synthesys/www/v1/sld"; 
$img_dir = DIR_PLATFORM."/synthesys/www/v1/img";

$d = dir($sld_dir);
$e = dir($img_dir);


$ad=$_GET['ad'];
$ad=explode('||',$ad);


$layers=$_GET['l'];

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

//ƒ $v;
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
			
		}


			$styles_string="line";

}


foreach ($ad as $k=>$v)
{
//tdwg3:a:PHI,SPA|b:ITA
//var_dump($v);

//$ad2=explode('|',$v);


if ($_GET['title'])
{
$title=$_GET['title'];
}
//title=a:cultivated|b:forest
$t=explode('|',$title);
$title_array=array();

foreach ($t as $k=>$v)
{
$title=explode(':',$v);
$title_array[$title[0]]=$title[1];
}

if ($_GET['label'])
{
$label=$_GET['label'];
}
//$images=a,b:orange,green
if ($_GET['images_url'])
{
$images_url=$_GET['images_url'];
//$images_url="a,b:edit.csic.es/fitxers/hatch_images|c:edit.csic.es/fitxers/hatch_images";
$images_url=explode('|',$images_url);

}


$symbols=$_GET['symbols'];
//$symbols="a,b:hatch_orange.gif|c:hatch_green.gif";
$symbols=explode('|',$symbols);
$symbols_url=array();
foreach ($symbols as $k=>$v)
{
	$symbols=explode(':',$v);
	$keys=explode(',',$symbols[0]);
	$get_v=explode(',',$symbols[1]);
//		var_dump ($get_v);
	if ($_GET['images_url'])
{
	foreach ($keys as $k=>$v)
	{

		$symbols_url[$v]['symbols']=$get_v[0];
		$symbols_url[$v]['size']=$get_v[1];	
		$symbols_url[$v]['format']=$get_v[2];	
	}	
	}
}
if ($_GET['images_url'])
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
		

//var_dump($ls_string);

$col=explode('|',$color);
//no dóna error al haver-n'hi només un!
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
foreach ($ad as $k=>$v)
{
$v=explode('|',$v);

foreach ($v as $k=>$v)
{
if ($k==0)
{
  
	$first_data=explode(':',$v);
	$first_layer=$first_data[0];
	$first_style=$first_data[1];
	$first_pol=$first_data[2];

//var_dump($v);
	if (!ereg(",",$first_pol))
			{
			
	$tdwg[$first_layer][$first_style]['zones']=$first_pol;
				
//					var_dump($tdwg[$first_layer][$first_style]['zones']);-->NCS
					
				}
					else
				{
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
		// a cada estil l'hi correspon només un país	
//	var_dump($v);
	$data=explode(':',$v);
	

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
$leg_path_towrite=DIR_PLATFORM."/synthesys/www/v1/sld/$random";
$fp=fopen("$leg_path_towrite","w");
$write=fwrite($fp,$out);
$leg_url=URL_SITE."/synthesys/www/v1/sld/$random";


$legs=array();
foreach ($tdwg as $k=>$v)
{

foreach ($tdwg[$k] as $k2=>$v2)
{
//echo $k; -->tdwg3
//echo $k2; --->a
$legs[$k2]=$k;
//legs--->array(2) { ["b"]=>  string(5) "tdwg1" ["a"]=>  string(5) "tdwg3" } 
//LEGENDS!!!

}


$xml="<gml>";
$xml.="<feature>".$k."</feature>";

foreach ($v as $style=>$value)
{

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
else { 
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

$gmls[$k]=$xml;
}
//var_dump($gmls[$k]);

if ($_GET['bbox'])
	{
		$bbox=$_GET['bbox'];
	}
	else{
			$conn = pg_connect(POSTGIS_CS);
				if (pg_ErrorMessage($conn)) { 
					 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
					 }
					else
					{
					
				
	$BBOX_sql="select extent(the_geom) from tdwgs where ";				
	$c=0;
	foreach ($tdwg as $k=>$v)
	{


	switch ($k)
	{


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
if ($_GET['recalculate'])
{
if ($_GET['recalculate']=='false')
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
if (isset($_GET['foo']))
{
		$json='foo({"bbox":"'.$bbox.'","legend":"'.$leg_url.'","layers":[';		
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
//$random = (rand()%300).".sld";
$path_towrite=DIR_PLATFORM."/synthesys/www/v1/sld/".$feature."_".$random;
//echo $path_towrite;
$fp=fopen("$path_towrite","w");
$write=fwrite($fp,$out);
array_push($files_list,$path_towrite);
//echo $out;



$json.='{"tdwg": "' . $feature. '","session": "'.$sessionid.'",';

//$json.='"sld": "' . $feature."_".$random.'"}';
//correction ftheeten 09/04/2010
$json.='"sld": "' . V1_SLD_URL."/".$feature."_".$random.'"}';


if ($i < $c)
{
$json.=',';
}

$url=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=";
$url.=$layer."&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&SLD=".URL_SITE."/synthesys/www/v1/sld/".$feature."_".$random;

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
if (isset($_GET['foo']))
{
$json.=")";	
}
else
{
$json.="]";	
}




$img=$_GET['img'];

if ($img=='false')
{
//RMCA 09/04/2010

if ($img=='false')
{
   $headerText="Content-Type: application/json";

}

header($headerText);
echo $json;
}
else
{
	$random3=DIR_PLATFORM."/synthesys/www/v1/img/".md5($_SERVER["REQUEST_URI"] )."_layers.png";

		
	if ($ls_string)
	{
		$url2=URL_GEOSERVER."?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&TRANSPARENT=TRUE&SERVICE=WMS&EPSG=4326&layers=".$ls_string;
			$url2.="&format=image/png&bbox=".$bbox."&WIDTH=".$width."&HEIGHT=".$height."&STYLES=".$styles_string;
			$c="convert '$url2' '$random3'";
			shell_exec($c);

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

}
else
{
//SLDs over normal layers
$c="composite  '$url_list[0]' '$random3' '$random2'";

shell_exec($c);


}


//print($c);
//print("----------------");

if ($leg=='1')
{
	$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=TRUE&WIDTH=64&HEIGHT=36&";
			$legend_url.="layer=topp:tdwg_level_3&LEGEND_OPTIONS=forceLabels:on;fontStyle:italic;fontSize:12&SLD=".$leg_url;
	
$mlp=$_GET['mlp'];
switch ($mlp)
{
case ('1'):
 	{

$com="convert +append '$legend_url' '$random2'  '$random2'"; //-->exterior ul  
break;
 	}
case ('2'):
 	{
$com="convert -append '$legend_url' '$random2'  '$random2'"; 	//2
 break;
 }
 case ('3'):
 	{
$com="convert +append  '$random2' '$legend_url'   '$random2'"; //4
break;
 	}
 	
case ('4'):
 	{
 	
$com="convert  -append  '$random2' '$legend_url'   '$random2'"; //7
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

$headerText="Content-Type: image/png";


//RMCA 09/04/2010
header($headerText);



	
readfile($random2);
unlink($random2);

}
clearstatcache();
$time=time();


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
$d->close(); 
$e->close();


?>
