<?
header("Content-Type: image/png");	  
$color=$_GET['as'];

 if ($_GET['title'])
{
$title=$_GET['title'];
}
//title=a:cultivated|b:forest
$t=explode('|',$title);
$title_array=array();

foreach ($t as $k=>$v)
{
//echo $v."<br>";
$title=explode(':',$v);

$title_array[$title[0]]=$title[1];
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
		$w_h="WIDTH=$width&HEIGHT=$height";
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
	

//$color="a:d7add2,AOOOOOF,2,dotted|b:ab8dc9F";	

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
//var_dump($total_symbols);


$layers=array();
$legend="<gml>";
foreach ($total_symbols as $k=>$v)
{

//$legend.="<style><name>".$title_array[$k]."</name>";
$legend.="<style><name>".$title_array[$k]."</name>";

$legend.="<label>".$k."</label>";
$legend.="<hatching>NO</hatching>";
$legend.="<color>".$total_symbols[$k][0]."</color>";
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

$p=simplexml_load_string($legend_xml[0]);

$xsl = new XSLTProcessor;

$style = realpath('areas_legend_no.xsl');
$dom_new = new DOMDocument();
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($legend_xml[0]);
$out = $xsl->transformToXML($dom_new);

$random = (rand()%300).".sld";
$leg_path_towrite=DIR_PLATFORM."/synthesys/www/v1/sld/$random";
$fp=fopen("$leg_path_towrite","w");
$write=fwrite($fp,$out);
$leg_url=URL_SITE."/synthesys/www/v1/sld/$random";
$legend_url=URL_GEOSERVER."/GetLegendGraphic?SERVICE=WMS&VERSION=1.1.1&format=image/png&TRANSPARENT=TRUE&$w_h";
$legend_url.="&layer=tdwg_level_3&SLD=$leg_url";

readfile($legend_url);
?>