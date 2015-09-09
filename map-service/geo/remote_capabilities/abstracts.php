<?php


$layer=intval($_GET['layer']);
//$i=intval($_GET['layer']);
$xml=simplexml_load_file('xml/'.$_GET['capabilities']);
//var_dump($xml);

 // foreach ($xml->item as $item)
 foreach ($xml->Capability->Layer as $total)

 {
//	var_dump($total);
$particular=$total->Layer[$layer]->Abstract;
echo $particular;
$style=$total->Layer[$layer]->Style;
//echo $style;
if ($style)
{
$data="<br><b>Avaible styles for this layer<b><br>";
	$data.="<form id='style' style='margin-left: 2px;'><select>";
	$style_abstract;
	foreach ($style as $k=>$v)
	{
	$plus=$v->Name;
	$data.="<option value='$k'>$plus</option>";
	$style_abstract=$v->Abstract;
	
	}
	
	$data.="</select></form>";
	$data.="<div>
 ".$style_abstract."</div>";
	
	echo $data;
}
else
{
	echo "<b>No style associated to this layer<b>";
}

}
 
?>
