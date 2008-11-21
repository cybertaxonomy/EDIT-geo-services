<?

$bbox= $_GET['bbox'];
$legend= $_GET['legend'];
$edit_raster= $_GET['edit_raster'];
$edit_vectorial= $_GET['edit_vectorial'];
$edit_sld= $_GET['edit_sld'];

$format=$_GET['format'];
$remote_layers=$_GET['remote_layers'];
//echo $remote_layers;
$vectorial_array=explode('/',$edit_vectorial);
$raster_array=explode('/',$edit_raster);

switch ($format)
{

case "image/jpeg":
{
header("Content-Type: image/jpeg");
if (!empty($edit_raster)) //hi ha algun raster..
{
$array_total=array_merge($raster_array,$vectorial_array);
$edit_layers="LAYERS=";
//echo $total."<br>";
$total=count($array_total);
for ($i=0;$i<($total-1);$i++)
{
	$edit_layers.=$array_total[$i].",";
}
$edit_layers.=$array_total[$total -1];

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format;
$image_nova=imagecreatefromjpeg($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format;
$sld_image=imagecreatefromjpeg($sld_url);
imagecopymerge($image_nova,$sld_image,0 ,0 ,0 ,0 ,780,390,60);
//imagecopymerge($edit_image,$image,0, 0, 0, 0, 760, 380,10);
//imagejpeg($image_nova);
//echo $amb_raster_url;
}
else
{ // NO RASTER
$total=count($vectorial_array);
$no_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&";
$edit_layers="LAYERS=topp:test_csvimportgispoints2,";
for ($i=0;$i<($total-1);$i++)
{
$edit_layers.=$vectorial_array[$i].",";
}
$edit_layers.=$vectorial_array[$total -1];
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format."&SLD=".$edit_sld;
$image_nova=imagecreatefromjpeg($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{
//global $image_nova2;
$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{
//echo $remote_lay[$i];
$image=imagecreatefromjpeg($remote_layers[$i]);
imagecopymerge($image_nova,$image,0, 0, 0, 0, 780, 390,70);
//amb 20, surt raster (image0) que cobreix però deixa veure el vectorial (image); --> menys visibilitat a imatge (vectorial)
}
imagejpeg ($image_nova);
} // fi if
else
{
//echo "nommés una";

//echo urldecode($remote_layers);
$remote_layers=urldecode($remote_layers);
$remote=imagecreatefromjpeg($remote_layers);
//imagejpeg($remote);
imagecopymerge($image_nova,$remote,0, 0, 0, 0, 780, 390,40);
imagejpeg($image_nova);
} 
}
else  //remote_layers param està buit
{

imagejpeg ($image_nova);
//echo "afds";
}
breaK;
}
case 'image/png':
{
header("Content-Type: image/png");
if (!empty($edit_raster)) //hi ha algun raster..
{
$array_total=array_merge($raster_array,$vectorial_array);
$edit_layers="LAYERS=";
//echo $total."<br>";
$total=count($array_total);
for ($i=0;$i<($total-1);$i++)
{
	$edit_layers.=$array_total[$i].",";
}
$edit_layers.=$array_total[$total -1];

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format;
$image_nova=imagecreatefrompng($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format;
$sld_image=imagecreatefrompng($sld_url);
imagecopymerge($image_nova,$sld_image,0 ,0 ,0 ,0 ,780,390,60);

}
else
{ // NO RASTER
$total=count($vectorial_array);
$no_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&";
$edit_layers="LAYERS=topp:test_csvimportgispoints2,";
for ($i=0;$i<($total-1);$i++)
{
$edit_layers.=$vectorial_array[$i].",";
}
$edit_layers.=$vectorial_array[$total -1];
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=780&HEIGHT=390&FORMAT=".$format."&SLD=".$edit_sld;
$image_nova=imagecreatefrompng($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{
//global $image_nova2;
$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{
//echo $remote_lay[$i];
$image=imagecreatefrompng($remote_layers[$i]);
imagecopymerge($image_nova,$image,0, 0, 0, 0, 780, 390,70);
//amb 20, surt raster (image0) que cobreix però deixa veure el vectorial (image); --> menys visibilitat a imatge (vectorial)
}
imagepng ($image_nova);
} // fi if
else
{
//echo "nommés una";

//echo urldecode($remote_layers);
$remote_layers=urldecode($remote_layers);
$remote=imagecreatefrompng($remote_layers);
//imagepng($remote);
imagecopymerge($image_nova,$remote,0, 0, 0, 0, 780, 390,40);
imagepng($image_nova);
} 
}
else  //remote_layers param està buit
{

imagepng ($image_nova);
//echo "afds";
}
break;
}

}

?>