<?
//require_once("../path_index.php");
//$x="admin>topp:country_earth,topp:cities|world_negro,cities/remote>topp:coast_earth|transparent";

//admin>topp:country_earth|world_negro/vectorial>topp:coast_earth|transparent/tdwg>topp:tdwg_level_2|world_negro
///
$data=$_GET['data'];
$bbox=$_GET['bbox'];
$zoom=$_GET['zoom'];

$s=explode('/',$data);
//var_dump($s);
$array=array();
foreach ($s as $k=>$v)
{

$z=explode('>',$v);
$grup=$z[0];
$data=$z[1];

$data=explode('|',$data);
$l=$data[0];
$layer=explode(',',$l);

$s=$data[1];
$styles=explode(',',$s);

$n=$data[2];
$names=explode(',',$n);

foreach ($layer as $k=>$v)
{
$array[$grup]['layers'][]=$v;
}
foreach ($styles as $k=>$v)
{
$array[$grup]['styles'][]=$v;
}
foreach ($names as $k=>$v)
{
$array[$grup]['name'][]=$v;
}
}
//var_dump($array);
$json='[{"bbox":[{"bbox":"'.$bbox.'","zoom":"'.$zoom.'"}],"layers":[';


foreach ($array as $k=>$v)
{

$count=count($array[$k]['layers']);


	for ($i=0;$i<$count;$i++)
{
//echo $array[$k]['layers'][$i];
//$layers=substr($array[$k]['layers'][$i],5,strlen($array[$k]['layers'][$i]));
//echo $layers;
$json.='{"grup":"'.$k.'",';
$json.='"id":"'.$array[$k]['layers'][$i].'",';
$json.='"nom":"'.$array[$k]['name'][$i].'",';
$json.='"styles":"'.$array[$k]['styles'][$i].'"}';
$json.=",";

}

}
//removing the last comma
$json=substr($json,0,strlen($json)-1);

$json.="]}]";

$r=md5($_REQUEST['URI']).".json";
//$path_towrite=DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json/$r";
$path_towrite="/var/www/edit_wp5/geo/mapviewer/json_simple/user_json/$r";
//$path_towrite=$PATH_JSON."/".$r;


$fp=fopen("$path_towrite","w");
$write=fwrite($fp,$json);

echo $r;



?>
