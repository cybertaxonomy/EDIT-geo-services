<?php

require_once("../path_index.php");
	
$userid=$_GET['userid'];
$lon=$_GET['lon'];
$lat=$_GET['lat'];
$fields=$_GET['fields'];

if (!is_numeric($lat) || !is_numeric($lon) || !is_numeric($fields))
	{
	die ("You are using letters instead of numbers!");
	}



$new_data=$_GET['new_data'];
if ($new_data=="yes")
{
/*
mkdir ("sld/temp/$userid",0777);chmod("sld/temp/$userid",0777); 
mkdir ("sld/temp/$userid/120dpi",0777);chmod("sld/temp/$userid/120dpi",0777); 
mkdir ("sld/temp/$userid/240dpi",0777);chmod("sld/temp/$userid/240dpi",0777);
mkdir ("sld/temp/$userid/480dpi",0777);chmod("sld/temp/$userid/480dpi",0777);
mkdir ("sld/temp/$userid/600dpi",0777);chmod("sld/temp/$userid/600dpi",0777);
mkdir ("sld/temp/$userid/analysis",0777);chmod ("sld/temp/$userid/analysis",0777);
mkdir("images/download/$userid",0777);chmod("images/download/$userid",0777); 
mkdir ("images/download/$userid/120dpi",0777);chmod("images/download/$userid/120dpi",0777); 
mkdir ("images/download/$userid/240dpi",0777);chmod("images/download/$userid/240dpi",0777); 
mkdir ("images/download/$userid/480dpi",0777);chmod("images/download/$userid/480dpi",0777); 
mkdir ("images/download/$userid/600dpi",0777);chmod("images/download/$userid/600dpi",0777); 
*/
}

	$error = "";
	$msg = "";
	$fileElementName = 'file';
	if (isset($_POST['fileframe'])) 
	{
	 $filename = $_FILES['file']['name'];
	 
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
			$filename=$_FILES['file']['name'];
			
			$ext = substr(strrchr($filename, '.'), 1);

			    if ($ext=="csv")
			{
	//$upload_dir=DIR_PLATFORM."/edit_wp5/geo/loaded_CSVs/";
	$upload_dir=DATA_UPLOAD_DIR;
	$tf = $upload_dir.'/'.md5(rand()).".test";

        move_uploaded_file($_FILES["file"]["tmp_name"], $upload_dir. "/" . $_FILES["file"]["name"]);

			$msg .= " File Name: " . $_FILES["file"]["tmp_name"]. ", ";
			$msg .= " File Size: " . @filesize($_FILES['file']['tmp_name']);

      $msg .= "Stored in: " . $upload_dir."/".$_FILES["file"]["name"];
      $path=$upload_dir."/".$_FILES["file"]["name"];
	//chmod added by ftheeten 25/02/2009
	chmod($path,0755);
	$sld_file=$userid.".sld";	
	

			$conn = pg_connect(POSTGIS_CS);
			if (pg_ErrorMessage($conn)) 
			{ 
			echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
			}
			else 
			{


		$time=time();
		//3 hores?
		$maxtime=time()+3600;
		//$total=$upload_dir.'/'.$filename;
		//$inserta="SET CLIENT_ENCODING TO 'LATIN1';select * from edit_import_csv ('$path','$fields','$lon','$lat',4326,',','$userid',current_date::timestamp);insert into user_table values ('$userid','$sessionid',current_date::timestamp,'$maxtime','$time');";
$inserta="select * from edit_import_csv ('$path','$fields','$lon','$lat',4326,',','$userid',current_date::timestamp);insert into user_table values ('$userid','$sessionid',current_date::timestamp,'$maxtime','$time');";
		//vacuum analyze test_csvimportgispoints2;vacuum analyze test_csvimportpk;";
			pg_exec($inserta) or die ("Some error occurred; is your data format right? Did you fill all the parameters correctly? Does your data have some 'strange' (non LATIN1 encoding) character ??");

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
	
			
			$misql="select distinct(genus) from user_points where userid='$userid'";
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
/*
$sql2="select distinct(specie) from user_points where genus='".$result_matriz[0]."' and userid='$userid'";

$postgis_result2=pg_exec($sql2) or die;

//quantes especies hem trobat per cada gnere?
$numFilas2 =pg_NumRows($postgis_result2);
//posem les especies per genere dins d'un array
$gml .="<species>";
for($z=0;$z<$numFilas2;$z++)
{
$result_matriz2 = pg_Fetch_Array($postgis_result2,$z);
$gml .="<spname>".$result_matriz2[0]."</spname>";
}
$gml .="</species>";
*/
$gml .="</genus>";
}
$gml .="</featureType>";
pg_close($conn);
$dom_new = new DOMDocument();
$xsl = new XSLTProcessor;
$xsl->setParameter( '', 'user', "$userid");
$style = realpath('php_xsl/SLD_php.xsl');
$dom_new->load($style);
$xsl->importStyleSheet($dom_new);
$dom_new->loadXML($gml);
$out = $xsl->transformToXML($dom_new);


	
	//$sld=URL_SITE."/edit_wp5/geo/sld/$sld_file";
	//$sld_path_towrite="/var/edit/edit_wp5/geo/sld/$sld_file";
	$sld=SLD_URL1."/$sld_file";
	$sld_path_towrite=SLD_URL1."/$sld_file";
$fp=fopen("$sld_path_towrite","w");
$write=fwrite($fp,$out);
		
		}
	}	
	else
	{
		$error="You have not uploaded a CSV file!";
	}
	}
	global $sld; global $bbox;global $userid;global $error;
	echo "{";
	echo				"error: '" . $error . "',\n";
	echo				"bbox: '" . $bbox. "',\n";
	echo				"userid: '" . $userid. "',\n";
	echo 				"data: '".$sld. "'\n";
	echo "}";

?>
