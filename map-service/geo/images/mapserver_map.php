<?

//md5($_REQUEST['URI']);
$userid=$_GET['userid'];
$map=$userid.".map";
$maps_dir=DIR_PLATFORM."/edit_wp5/geo/images/mapserver_maps/$userid";
$d = dir($maps_dir);
if (file_exists($maps_dir)) {

while($entry = $d->read()) { 
unlink("$maps_dir/".$entry);

}
}
else
{

mkdir("$maps_dir",0777);
chmod("$maps_dir",0777); 
}



$bbox=$_GET['bbox'];
$width=$_GET['w'];
$height=$_GET['h'];
//$layer=$_GET['ms_layer'].".shp";
$bbox=explode(',',$bbox);
$extent=$bbox[0].' '.$bbox[1].' '.$bbox[2].' '.$bbox[3];


$txt="MAP NAME ITASCA STATUS ON
  SIZE $width $height
  EXTENT $extent
  TRANSPARENT TRUE
  UNITS dd
  IMAGETYPE PNG
  SHAPEPATH '../../../shp_data'
  
  WEB
  IMAGEPATH '/var/www/synthesys/www/geo/mapserver_data/'
  IMAGEURL '/var/www/synthesys/www/geo/mapserver_data/img/'
  ERROR '../synthesys/www/geo/mapserver_data/error.log'
  END
 
  LAYER
  NAME 'shoreline'
  TYPE LINE
  STATUS ON
  DATA gshhs_land.shp
  CLASS
    NAME 'UTMS'
    STYLE
    	OUTLINECOLOR 255 0 0
    END
  END
  END  #END LAYER
 
  
END";
//echo $txt;


$fp=fopen("$maps_dir/$map","w");
$write=fwrite($fp,$txt);
echo "$maps_dir/$map";
//$c="/usr/local/bin/scalebar $path_towrite/$legend.map /var/www/synthesys/www/geo/images/scalebars/$img";

?>