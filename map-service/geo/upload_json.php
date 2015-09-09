<?php
	require_once("../path_index.php");
	
	$error = "";
	$msg = "";
	$fileElementName = 'json_file';

	if (isset($_POST['fileframe'])) 
	{
	 $filename = $_FILES['json_file']['name'];

	
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
	}elseif(empty($_FILES['json_file']['tmp_name']) || $_FILES['file']['tmp_name'] == 'none')
	{
		$error = 'No file was uploaded..';
		
	}else 
		{
			$file=$_FILES["json_file"]["name"];
			
			$ext = substr(strrchr($file, '.'), 1);

			    if ($ext=="json")
			{

	//$upload_dir=DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json";	
	$upload_dir=PATH_JSON;
	$tf = $upload_dir.'/'.md5(rand()).".json";

        //move_uploaded_file($_FILES["json_file"]["tmp_name"],DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json/" . $_FILES["json_file"]["name"]);
	move_uploaded_file($_FILES["json_file"]["tmp_name"],PATH_JSON."/" . $_FILES["json_file"]["name"]);

			$msg .= " File Name: " . $_FILES["json_file"]["tmp_name"]. ", ";
			$msg .= " File Size: " . @filesize($_FILES['json_file']['tmp_name']);

      //$msg .= "Stored in: " . DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json/".$_FILES["json_file"]["name"];
      //$path=DIR_PLATFORM."/edit_wp5/geo/mapviewer/json_simple/user_json/".$_FILES["json_file"]["name"];
      $msg .= "Stored in: " .PATH_JSON. "/".$_FILES["json_file"]["name"];
      $path=PATH_JSON."/".$_FILES["json_file"]["name"];
$file=$_FILES["json_file"]["name"];
		}
		else
		{
			$error="You have not uploaded a JSON file produced here!";
		}

		
		}	
	

global $file;global $error;
	echo "{";
	echo				"error: '" . $error . "',\n";
	echo 				"data: '".$file. "'\n";
	echo "}";


?>
