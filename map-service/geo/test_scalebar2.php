<?
require_once("../path_index.php");
$legend=(rand()%300);
//md5($_REQUEST['URI']);


$bbox=$_GET['bbox'];
$width=$_GET['w'];
$height=$_GET['h'];
$proj=$_GET['proj'];
$p=explode(':',$proj);
//$projection='"init=epsg:'.$p[1].'"';

$g_units=$_GET['g_units'];

$units=$_GET['units'];
if ($units='degrees')
{
	$units='dd';
}

$intervals=$_GET['intervals'];

$bbox=explode(',',$bbox);
$extent=$bbox[0].' '.$bbox[1].' '.$bbox[2].' '.$bbox[3];
//$units='MILES/METERS/KILOMETERS';

//$size='SIZE [integer]|[tiny|small|medium|large|giant]';
/*
  
  PROJECTION
   $projection
  END
*/

$label_size=$_GET['label_size'];
$l_size=$_GET['l_size'];
$txt="MAP NAME ITASCA STATUS ON
  SIZE $width $height
  EXTENT $extent
  UNITS $units
  IMAGETYPE PNG


  SCALEBAR
    IMAGECOLOR 200 110 0
    BACKGROUNDCOLOR 200 110 0
    OUTLINECOLOR 200 110 100
    LABEL
       COLOR  0 0 0
      SIZE $label_size
    END
    STYLE 0
    SIZE $l_size 5
    COLOR 0 0 0
    BACKGROUNDCOLOR 255 255 255
    UNITS $g_units
    INTERVALS $intervals
    TRANSPARENT TRUE
    STATUS ON
  END
  
END";
//echo $txt;
$path_towrite=DIR_PLATFORM."/geo/images/scalebars";
$img=$legend.".png";
$fp=fopen("$path_towrite/$legend.map","w");
$write=fwrite($fp,$txt);
$c="/usr/bin/scalebar $path_towrite/$legend.map ".DIR_PLATFORM."/geo/images/scalebars/$img";

shell_exec($c);
echo "$img";
?>
