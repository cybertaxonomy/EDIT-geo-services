<?


$dir = substr(strrchr($_POST['url'], "?"), 1);
if ($dir)
{
$url = $_POST['url']."&request=GetCapabilities";
$x=file_get_contents($_POST['url']."&request=GetCapabilities");
}else 
{
$url = $_POST['url']."&request=GetCapabilities";
$x=file_get_contents($_POST['url']."request=GetCapabilities");
}
//echo $url;

$r=md5($_POST['url']).".xml";
file_put_contents("../remote_capabilities/xml/".$r,$x);
echo $r;

?>
