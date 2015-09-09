<?

$file=$_GET['file'];
$dir=$_GET['dir'];
switch ($_GET['format'])
{
	case 'tif':
	{
	$h =fopen("$file", "r");
		header("Content-Type: image/tif");
	//	header("Content-Length: ".filesize($image0)");
		//header("Expires: " . date( "D, d M Y H:i:s GMT", time() + 31536000 ));
	//	header("Cache-Control: max-age=31536000, must-revalidate" );
		header("Content-Disposition: attachment; filename=\"EDIT.tif\"");
		fpassthru($h);
		fclose($h);
	break;

	}
case 'png':
{
$h =fopen("$file", "r");
	header("Content-Type: image/png");
//	header("Content-Length: ".filesize($image0)");
	//header("Expires: " . date( "D, d M Y H:i:s GMT", time() + 31536000 ));
//	header("Cache-Control: max-age=31536000, must-revalidate" );
	header("Content-Disposition: attachment; filename=\"EDIT.png\"");
	fpassthru($h);
	fclose($h);
break;

}
case 'gif':
{
$h = fopen("$file", "r");
	header("Content-Type: image/gif");
	header("Content-Disposition: attachment; filename=\"EDIT.gif\"");
	fpassthru($h);
	fclose($h);
break;
}
case 'jpeg':
{
$h = fopen("$file", "r");
	header("Content-Type: image/jpeg");
	header("Content-Disposition: attachment; filename=\"EDIT.jpeg\"");
	fpassthru($h);
	fclose($h);
break;
}	
case 'jpeg_gray':
{
$h = fopen("download/SLD_gray.jpeg", "r");
	header("Content-Type: image/jpeg");
	header("Content-Disposition: attachment; filename=\"SLD_gray.jpeg\"");
	fpassthru($h);
	fclose($h);
break;

}
case 'png_gray':
{
$h = fopen("download/SLD_gray.png", "r");
	header("Content-Type: image/png");
	header("Content-Disposition: attachment; filename=\"SLD_gray.png\"");
	fpassthru($h);
	fclose($h);
break;

}
case 'gif_gray':
{
$h = fopen("download/SLD_gray.gif", "r");
	header("Content-Type: image/gif");
	header("Content-Disposition: attachment; filename=\"SLD_gray.gif\"");
	fpassthru($h);
	fclose($h);
break;

}
case 'pdf':
{
	
$h = fopen("$dir/$file", "r");
	header("Content-Type: application/pdf");
	header("Content-Disposition: attachment; filename=\"$file\"");
	fpassthru($h);
	fclose($h);

break;

}	
}



?>
