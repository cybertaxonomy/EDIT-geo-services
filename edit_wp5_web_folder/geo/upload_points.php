<?php
//echo("called");
$s=$_GET['s'];
$userid=$_GET['userid'];
$lon=$_GET['lon'];
$lat=$_GET['lat'];
$fields=$_GET['fields'];
//$current_sld=$_GET['sld'];
//$sld_dir = "/var/www/edit_wp5/geo/sld"; 
//updated by ftheeten 26/02/2010 -> corrected by ftheeten 03/03/2010 ('$sld_file' shouldn't appear in the path)
//$sld_dir="/var/www/edit/synthesys/www/fitxers/sld_mapviewer/$sld_file";
//$sld_dir="/var/www/synthesys/www/fitxers/sld_mapviewer";
$sld_dir="/var/www/edit_wp5/geo/sld";

$sld_file=md5($_SERVER["REQUEST_URI"] ).".sld";
$sld_sp_file=md5($_SERVER["REQUEST_URI"] )."_sp.sld";
$sld_fourth_file=md5($_SERVER["REQUEST_URI"] )."_fourth.sld";

$e = dir($sld_dir);
$time=time();
while($entry = $e->read()) { 
 if ($entry!= "." && $entry!= "..") { 

	     $f_last_modified = filemtime($sld_dir."/".$entry);

if ($time-$f_last_modified >400000)
{
unlink($sld_dir."/".$entry);
}   

 } 
} 
$e->close();

if (!is_numeric($lat) || !is_numeric($lon) || !is_numeric($fields))
	{
	die ("You are using letters instead of numbers!");
	}
      $new_data=$_GET['new_data'];

//	$sld_file=$current_sld;


	$error = "";
	$msg = "";
	$fileElementName = 'file';
	if (isset($_POST['fileframe'])) 
	{
	 $filename = $_FILES['file']['name'];
//	 echo $filename;
	}
	if(!empty($_FILES[$fileElementName]['error']))
	{
		switch($_FILES[$fileElementName]['error'])
		{

			case '1':
				$error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
				break;
			case '2':
				$error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
				break;
			case '3':
				$error = 'The uploaded file was only partially uploaded';
				break;
			case '4':
				$error = 'No file was uploaded.';
				break;

			case '6':
				$error = 'Missing a temporary folder';
				break;
			case '7':
				$error = 'Failed to write file to disk';
				break;
			case '8':
				$error = 'File upload stopped by extension';
				break;
			case '999':
			default:
				$error = 'No error code avaiable';
		}
	}elseif(empty($_FILES['file']['tmp_name']) || $_FILES['file']['tmp_name'] == 'none')
	{
		$error = 'No file was uploaded..';
	}else 
	{

	$upload_dir="/var/www/edit_wp5/geo/loaded_CSVs/";
	$tf = $upload_dir.'/'.md5(rand()).".test";

        move_uploaded_file($_FILES["file"]["tmp_name"],"/var/www/edit_wp5/geo/loaded_CSVs/" . $_FILES["file"]["name"]);

			$msg .= " File Name: " . $_FILES["file"]["tmp_name"]. ", ";
			$msg .= " File Size: " . @filesize($_FILES['file']['tmp_name']);

      $msg .= "Stored in: " . "/var/www/edit_wp5/geo/loaded_CSVs/".$_FILES["file"]["name"];
      $path="/var/www/edit_wp5/geo/loaded_CSVs/".$_FILES["file"]["name"];
		//chmod added by ftheeten 25/02/2009
	chmod($path,0755);
	

//	$sld_file=$userid.".sld";	
	

			//$conn = pg_connect("host=localhost port=5432 password=postgres user=postgres dbname=geoest");
			$conn = pg_connect('host=localhost port=5432  password=fv30714$A  user=postgres dbname=edit_geo_mirror');
			if (pg_ErrorMessage($conn)) { 
			echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
			}
			else {

		global $sld_file,$sld_sp_file,$sld_fourth_file,$conn;
		$time=time();
		//3 hores?
		$maxtime=time()+3600;
		//$total=$upload_dir.'/'.$filename;
$sessionid=NULL;
$inserta="SET CLIENT_ENCODING TO 'LATIN1';select * from edit_import_csv ('$path','$fields','$lon','$lat',4326,',','$userid',current_date::timestamp);insert into user_table values ('$userid','$sessionid',current_date::timestamp,'$maxtime','$time');";
		//vacuum analyze user_points;vacuum analyze test_csvimportpk;";
//print($inserta);
			pg_exec($inserta) or die ("Some error occurred; is your data forsld_mapviewer/mat right? Did you fill all the parameters correctly? Does your data have some 'strange' (non LATIN1 encoding) character ??");

			$BBOX_sql="select extent(user_points.the_geom) from user_points where user_points.userid='$userid' "; 

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
			$bbox=$x1.",".$y1.",".$x2.",".$y2;	
function third($userid,$sld_file)
{
	//$conn = pg_connect("host=localhost port=5432 password=postgres user=postgres dbname=geoest");
	$conn = pg_connect('host=localhost port=5432 user=postgres password=fv30714$A dbname=edit_geo_mirror');
		$misql="select distinct(genus) from user_points where userid='$userid' order by genus";
		$postgis_result=pg_exec($misql) or die;
		$numFilas =pg_NumRows($postgis_result);

	$gml = new DOMDocument;
	$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
	$gml.="<featureType>";
	//per cada gnere....
	for($i=0;$i<$numFilas;$i++)
	{
	//ponga cada fila de la resulta en una matriz
	$result_matriz = pg_Fetch_Array($postgis_result,$i);
	$gml .="<genus>";
	$gml .="<name>".$result_matriz[0]."</name>";
	$gml .="</genus>";
	}
	$gml .="</featureType>";
	pg_close($conn);
	$dom_new = new DOMDocument();
	$xsl = new XSLTProcessor;
	$xsl->setParameter( '', 'user', $userid);
	$xslt='php_xsl/SLD_php.xsl';
	$style = realpath($xslt);
	$dom_new->load($style);
	$xsl->importStyleSheet($dom_new);
	$dom_new->loadXML($gml);

	$out = $xsl->transformToXML($dom_new);
	//$sld="http://edit.africamuseum.be/edit_wp5/geo/sld/$sld_file";
	//$sld_path_towrite="/var/edit/edit_wp5/geo/sld/$sld_file";

	$sld="http://edit.br.fgov.be/edit_wp5/geo/sld/$sld_file";
	$sld_path_towrite="/var/www/edit_wp5/geo/sld/$sld_file";

	$fp=fopen($sld_path_towrite,"w");
	$write=fwrite($fp,$out);
//	create_sld('php_xsl/SLD_php.xsl',$sld_file,$gml);

}	

function third_fourth($userid,$sld_sp_file)
{	
		//third&fourth fields symbolization
		global $userid,$sld_sp_file;
	//$conn = pg_connect("host=localhost port=5432 password=postgres user=postgres dbname=geoest");
	$conn = pg_connect('host=localhost port=5432 user=postgres password=fv30714$A dbname=edit_geo_mirror');
	$misql="select distinct(specie),genus from user_points where userid='$userid' order by genus";

				$postgis_result=pg_exec($misql) or die;
				$numFilas =pg_NumRows($postgis_result);
	$gml = new DOMDocument;
	$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
	$gml.="<featureType>";
	//per cada gnere....
	for($i=0;$i<$numFilas;$i++)
	{
	//ponga cada fila de la resulta en una matriz
	$result_matriz = pg_Fetch_Array($postgis_result,$i);
	$gml .="<specie>";
	$gml .="<name>".$result_matriz[0]."</name>";
	$gml .="<genus>";
	$gml .="<genus_name>".$result_matriz[1]."</genus_name>";
	$gml .="</genus>";
	$gml .="</specie>";
	}
	$gml .="</featureType>";
	pg_close($conn);
	$dom_new = new DOMDocument();
	$xsl = new XSLTProcessor;
	$xsl->setParameter( '', 'user', $userid);
$xslt='php_xsl/SLD_php2.xsl';//,$sld_sp_file);

$style = realpath($xslt);
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gml);
$out = $xsl->transformToXML($dom_new);
	//$sld="http://edit.africamuseum.be/edit_wp5/geo/sld/$sld_file";
	//$sld_path_towrite="/var/edit/edit_wp5/geo/sld/$sld_file";
	$sld="http://edit.br.fgov.be/edit_wp5/geo/sld/$sld_sp_file";
	$sld_path_towrite="/var/www/edit_wp5/geo/sld/$sld_sp_file";
$fp=fopen($sld_path_towrite,"w");
$write=fwrite($fp,$out);
}
function fourth($userid,$sld_fourth_file)
{	global $userid,$sld_fourth_file;
	//$conn = pg_connect("host=localhost port=5432 password=postgres user=postgres dbname=geoest");
		$conn = pg_connect('host=localhost port=5432 user=postgres password=fv30714$A dbname=edit_geo_mirror');
		$misql2="select distinct(specie) from user_points where userid='$userid' order by specie";
		$postgis_result=pg_exec($misql2) or die;
		$numFilas =pg_NumRows($postgis_result);

	$gml = new DOMDocument;
	$gml ="<?xml version=\"1.0\" encoding=\"LATIN1\"?>";
	$gml.="<featureType>";
	//per cada gnere....
	for($i=0;$i<$numFilas;$i++)
	{
	//ponga cada fila de la resulta en una matriz
	$result_matriz = pg_Fetch_Array($postgis_result,$i);
	$gml .="<sp>";
	$gml .="<name>".$result_matriz[0]."</name>";
	$gml .="</sp>";
	}
	$gml .="</featureType>";
	pg_close($conn);
	$dom_new = new DOMDocument();
	$xsl = new XSLTProcessor;
	$xsl->setParameter( '', 'user', $userid);
	$xslt='php_xsl/SLD_fourth.xsl';
	
	$style = realpath($xslt);
	$dom_new->load($style);
	$xsl->importStyleSheet($dom_new);
	$dom_new->loadXML($gml);
	$out = $xsl->transformToXML($dom_new);
	//$sld="http://edit.africamuseum.be/edit_wp5/geo/sld/$sld_file";
	//$sld_path_towrite="/var/edit/edit_wp5/geo/sld/$sld_file";
	$sld="http://edit.br.fgov.be/edit_wp5/geo/sld/$sld_fourth_file";
	$sld_path_towrite="/var/www/edit_wp5/geo/sld/$sld_fourth_file";

$fp=fopen($sld_path_towrite,"w");
$write=fwrite($fp,$out);
	
//	create_sld('php_xsl/SLD_fourth.xsl',$sld_fourth_file);
}

$j="{error: '" . $error . "',bbox: '" . $bbox. "',userid: '" . $userid. "'";
/*
switch ($s)
{
  case  3: third($userid,$sld_file);
		   $j.=",genus_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_file. "'}";
			break;
  case  4: fourth($userid,$sld_fourth_file);
		$j.=",fourth_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_fourth_file. "'}";

			break;

  case  5: third_fourth($userid,$sld_sp_file);
			$j.=",sp_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";			
			break;
  case  34: third($userid,$sld_file);fourth($userid,$sld_fourth_file);
			 $j.=",genus_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",fourth_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_fourth_file. "'}";
			
  			break;

  case  35: third($userid,$sld_file);third_fourth($userid,$sld_sp_file);
			$j.=",genus_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",sp_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";	
			
		break;

  case  45: fourth($userid,$sld_fourth_file);third_fourth($userid,$sld_sp_file);
			$j.=",fourth_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_fourth_file. "'";
			$j.=",sp_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";
			break;
  case  345: third($userid,$sld_file);fourth($userid,$sld_fourth_file);third_fourth($userid,$sld_sp_file);
			$j.=",genus_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",fourth_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_fourth_file. "'";
			$j.=",sp_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";
			break;

}	
*/

switch ($s)
{
  case  3: third($userid,$sld_file);
		   $j.=",genus_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_file. "'}";
			break;
  case  4: fourth($userid,$sld_fourth_file);
		$j.=",fourth_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_fourth_file. "'}";

			break;

  case  5: third_fourth($userid,$sld_sp_file);
			$j.=",sp_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";			
			break;
  case  34: third($userid,$sld_file);fourth($userid,$sld_fourth_file);
			 $j.=",genus_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",fourth_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_fourth_file. "'}";
			
  			break;

  case  35: third($userid,$sld_file);third_fourth($userid,$sld_sp_file);
			$j.=",genus_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",sp_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";	
			
		break;

  case  45: fourth($userid,$sld_fourth_file);third_fourth($userid,$sld_sp_file);
			$j.=",fourth_sld: 'hhttp://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_fourth_file. "'";
			$j.=",sp_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";
			break;
  case  345: third($userid,$sld_file);fourth($userid,$sld_fourth_file);third_fourth($userid,$sld_sp_file);
			$j.=",genus_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_file. "'";
			$j.=",fourth_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_fourth_file. "'";
			$j.=",sp_sld: 'http://edit.br.fgov.be/edit_wp5/geo/sld/".$sld_sp_file. "'}";
			break;

}	

}

	}
	
echo $j;
/*

	global $sld_file,$sld_sp_file,$sld_fourth_file; global $bbox;global $userid;
	echo "{";
	echo				"error: '" . $error . "',\n";
	echo				"bbox: '" . $bbox. "',\n";
	echo				"userid: '" . $userid. "',\n";
	echo 				"genus_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_file. "',\n";
	echo     			"sp_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_sp_file. "',\n";
	echo     			"fourth_sld: 'http://edit.africamuseum.be/edit_wp5/geo/sld/".$sld_fourth_file. "'\n";
	echo "}";
	*/

?>

