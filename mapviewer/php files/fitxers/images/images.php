<?
//THIS IS A LITTLE CHAOS, SOME GENERAL FUNCTIONS SHOULD BE DEFINED!!
$bbox= $_GET['bbox'];
$legend= $_GET['legend'];
$edit_raster= $_GET['edit_raster'];
$edit_vectorial= $_GET['edit_vectorial'];
$edit_sld= $_GET['edit_sld'];

$format=$_GET['format'];
$remote_layers=$_GET['remote_layers'];
$vectorial_array=explode('/',$edit_vectorial);
$raster_array=explode('/',$edit_raster);

switch ($format)
{
case "png/gray":
{

function to_gray()
{
$not_gray="download/no_gray.png";
// Get the dimensions
list($width, $height) = getimagesize($not_gray);

// Define our source image
$source = imagecreatefrompng($not_gray);

// Creating the Canvas
$bwimage= imagecreate($width, $height);

//Creates the 256 color palette
for ($c=0;$c<256;$c++)
{
$palette[$c] = imagecolorallocate($bwimage,$c,$c,$c);
}

//Creates yiq function
function yiq($r,$g,$b)
{
return (($r*0.299)+($g*0.587)+($b*0.114));
}

for ($y=0;$y<$height;$y++)
{
for ($x=0;$x<$width;$x++)
{
$rgb = imagecolorat($source,$x,$y);
$r = ($rgb >> 16) & 0xFF;
$g = ($rgb >> 8) & 0xFF;
$b = $rgb & 0xFF;

//This is where we actually use yiq to modify our rbg values, and then convert them to our grayscale palette
$gs = yiq($r,$g,$b);
imagesetpixel($bwimage,$x,$y,$palette[$gs]);
}
}

// Outputs a jpg image, but you can change this to png or gif if that is what you are working with
imagepng($bwimage,"download/SLD_gray.png"); 
}
 //FI TO_GREY FUNCTION


if (!empty($edit_raster)) //there is some raster layer... must be the first in the GetMap URL
{
$array_total=array_merge($raster_array,$vectorial_array);
$edit_layers="LAYERS=";
$total=count($array_total);
for ($i=0;$i<($total-1);$i++)
{
	$edit_layers.=$array_total[$i].",";
}
$edit_layers.=$array_total[$total -1];

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/png";
$image_nova=imagecreatefrompng($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/png";
$sld_image=imagecreatefrompng($sld_url);
imagecopymergegray($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/png"."&SLD=".$edit_sld;
$image_nova=imagecreatefrompng($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{
$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{
$image=imagecreatefrompng($remote_layers[$i]);
imagecopymergegray($image_nova,$image,0, 0, 0, 0, 638, 363,30);
imagedestroy($image);
}
imagepng ($image_nova,"download/no_gray.png");
to_gray();
} // fi if
else
{
$remote_layers=urldecode($remote_layers);
$remote=imagecreatefrompng($remote_layers);
imagecopymergegray($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagepng($image_nova,"download/no_gray.png");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=png_gray";
} 
}
else  //remote_layers param is empty
{

imagepng ($image_nova,"download/no_gray.png");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=png_gray";
}
break;
}

case "gif/gray":
{

function to_gray()
{
$not_gray="download/no_gray.gif";
// Get the dimensions
list($width, $height) = getimagesize($not_gray);

// Define our source image
$source = imagecreatefromgif($not_gray);

// Creating the Canvas
$bwimage= imagecreate($width, $height);

//Creates the 256 color palette
for ($c=0;$c<256;$c++)
{
$palette[$c] = imagecolorallocate($bwimage,$c,$c,$c);
}

//Creates yiq function
function yiq($r,$g,$b)
{
return (($r*0.299)+($g*0.587)+($b*0.114));
}

for ($y=0;$y<$height;$y++)
{
for ($x=0;$x<$width;$x++)
{
$rgb = imagecolorat($source,$x,$y);
$r = ($rgb >> 16) & 0xFF;
$g = ($rgb >> 8) & 0xFF;
$b = $rgb & 0xFF;

//This is where we actually use yiq to modify our rbg values, and then convert them to our grayscale palette
$gs = yiq($r,$g,$b);
imagesetpixel($bwimage,$x,$y,$palette[$gs]);
}
}

// Outputs a jpg image, but you can change this to png or gif if that is what you are working with
imagegif($bwimage,"download/SLD_gray.gif"); 
} //FI TO_GREY FUNCTION


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

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/gif";
$image_nova=imagecreatefromgif($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/gif";
$sld_image=imagecreatefromgif($sld_url);
imagecopymergegray($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/gif"."&SLD=".$edit_sld;
$image_nova=imagecreatefromgif($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{

$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{

$image=imagecreatefromgif($remote_layers[$i]);
imagecopymergegray($image_nova,$image,0, 0, 0, 0, 638, 363,30);
imagedestroy($image);

}
imagegif ($image_nova,"download/no_gray.gif");
to_gray();
} // fi if
else
{

$remote_layers=urldecode($remote_layers);
$remote=imagecreatefromgif($remote_layers);

imagecopymergegray($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagegif($image_nova,"download/no_gray.gif");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=gif_gray";
} 
}
else  //remote_layers param està buit
{
imagegif ($image_nova,"download/no_gray.gif");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=gif_gray";
}
break;
}

case "jpeg/gray":
{

function to_gray()
{
$not_gray="download/no_gray.jpeg";
// Get the dimensions
list($width, $height) = getimagesize($not_gray);

// Define our source image
$source = imagecreatefromjpeg($not_gray);

// Creating the Canvas
$bwimage= imagecreate($width, $height);

//Creates the 256 color palette
for ($c=0;$c<256;$c++)
{
$palette[$c] = imagecolorallocate($bwimage,$c,$c,$c);
}

//Creates yiq function
function yiq($r,$g,$b)
{
return (($r*0.299)+($g*0.587)+($b*0.114));
}

for ($y=0;$y<$height;$y++)
{
for ($x=0;$x<$width;$x++)
{
$rgb = imagecolorat($source,$x,$y);
$r = ($rgb >> 16) & 0xFF;
$g = ($rgb >> 8) & 0xFF;
$b = $rgb & 0xFF;

//This is where we actually use yiq to modify our rbg values, and then convert them to our grayscale palette
$gs = yiq($r,$g,$b);
imagesetpixel($bwimage,$x,$y,$palette[$gs]);
}
}

// Outputs a jpg image, but you can change this to png or gif if that is what you are working with
imagejpeg($bwimage,"download/SLD_gray.jpeg"); 
} //FI TO_GREY FUNCTION


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

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/jpeg";
$image_nova=imagecreatefromjpeg($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/jpeg";
$sld_image=imagecreatefromjpeg($sld_url);
imagecopymergegray($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=image/jpeg"."&SLD=".$edit_sld;
$image_nova=imagecreatefromjpeg($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{

$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{

$image=imagecreatefromjpeg($remote_layers[$i]);
imagecopymergegray($image_nova,$image,0, 0, 0, 0, 638, 363,30);
imagedestroy($image);

}
imagejpeg ($image_nova,"download/no_gray.jpeg");
to_gray();
} // fi if
else
{

$remote_layers=urldecode($remote_layers);
$remote=imagecreatefromjpeg($remote_layers);

imagecopymergegray($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagejpeg($image_nova,"download/no_gray.jpeg");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=jpeg_gray";
} 
}
else  //remote_layers param is empty
{

imagejpeg ($image_nova,"download/no_gray.jpeg");
to_gray();
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=jpeg_gray";
}
break;
}
//fi jpeg/gray
case "image/jpeg":
{

if (!empty($edit_raster)) 
{
$array_total=array_merge($raster_array,$vectorial_array);
$edit_layers="LAYERS=";

$total=count($array_total);
for ($i=0;$i<($total-1);$i++)
{
	$edit_layers.=$array_total[$i].",";
}
$edit_layers.=$array_total[$total -1];

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$image_nova=imagecreatefromjpeg($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$sld_image=imagecreatefromjpeg($sld_url);
imagecopymerge($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format."&SLD=".$edit_sld;
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

$image=imagecreatefromjpeg($remote_layers[$i]);
imagecopymerge($image_nova,$image,0, 0, 0, 0, 638, 363,30);
imagedestroy($image);

}
imagejpeg ($image_nova,"download/SLD.jpeg");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=jpeg";
} // fi if
else
{
//only one remote layer
$remote_layers=urldecode($remote_layers);
$remote=imagecreatefromjpeg($remote_layers);
imagecopymerge($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagejpeg($image_nova,"download/SLD.jpeg");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=jpeg";
} 
}
else  //remote_layers param està buit
{

imagejpeg ($image_nova,"download/SLD.jpeg");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=jpeg";

}
breaK;
}
case 'image/png':
{

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

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$image_nova=imagecreatefrompng($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$sld_image=imagecreatefrompng($sld_url);
imagecopymerge($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format."&SLD=".$edit_sld;
$image_nova=imagecreatefrompng($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{

$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{

$image=imagecreatefrompng($remote_layers[$i]);
imagecopymerge($image_nova,$image,0, 0, 0, 0, 638, 363,30);
imagedestroy($image);

}
imagepng ($image_nova,"download/SLD.png");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=png";
imagedestroy($image_nova);
} // fi if
else
{
//echo "nommés una";

$remote_layers=urldecode($remote_layers);
$remote=imagecreatefrompng($remote_layers);

imagecopymerge($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagepng($image_nova,"download/SLD.png");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=png";
imagedestroy($image_nova);
} 
}
else  //remote_layers param està buit
{

imagepng ($image_nova,"download/SLD.png");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=png";

imagedestroy($image_nova);
}
break;
}
case 'image/gif':
{

if (!empty($edit_raster)) //hi ha algun raster..
{
$array_total=array_merge($raster_array,$vectorial_array);
$edit_layers="LAYERS=";

$total=count($array_total);
for ($i=0;$i<($total-1);$i++)
{
	$edit_layers.=$array_total[$i].",";
}
$edit_layers.=$array_total[$total -1];

$amb_raster_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&".$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$image_nova=imagecreatefromgif($amb_raster_url);

$sld_url="http://edit.csic.es/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=topp:test_csvimportgispoints2&SRS=EPSG:4326&SLD=".$edit_sld."&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format;
$sld_image=imagecreatefromgif($sld_url);
imagecopymerge($image_nova,$sld_image,0 ,0 ,0 ,0 ,638,363,60);

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
$no_raster_url.=$edit_layers."&STYLES=&SRS=EPSG:4326&BBOX=".$bbox."&WIDTH=638&HEIGHT=363&FORMAT=".$format."&SLD=".$edit_sld;
$image_nova=imagecreatefromgif($no_raster_url);
}
if (!empty($remote_layers))  
{
if (count(urldecode(explode('|',$remote_layers)))>1)
{

$remote_array=explode('|',$remote_layers);
$remote_count=count($remote_array);
for ($i=0;$i<$remote_count;$i++)
{

$image=imagecreatefromgif($remote_layers[$i]);
imagecopymerge($image_nova,$image,0, 0, 0, 0, 638, 363,40);
imagedestroy($image);

}
imagegif ($image_nova,"download/SLD.gif");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=gif";
} // fi if
else
{
//echo urldecode($remote_layers);
$remote_layers=urldecode($remote_layers);
$remote=imagecreatefrompng($remote_layers);

imagecopymerge($image_nova,$remote,0, 0, 0, 0, 638, 363,20);
imagegif($image_nova,"download/SLD.gif");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=gif";
} 
}
else  //remote_layers param està buit
{

imagegif ($image_nova,"download/SLD.gif");
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=gif";

}
break;
}
}

?>