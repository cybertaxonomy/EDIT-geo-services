<?
$mydir = "/var/www/synthesys/www/v1/sld"; 
//echo $mydir;
$d = dir($mydir); 
clearstatcache();
		$time=time();
		
		//3 hores?
		//$maxtime=time()+3600;
while($entry = $d->read()) { 
 if ($entry!= "." && $entry!= "..") { 
	echo $entry."-->";
	//echo "CURRENT TIME ".$time."<br>";
//	echo "$entry was last modified: " . filemtime($entry);
	 
	     $f_last_modified = filemtime($mydir."/".$entry);
	//echo $f_last_modified;     
echo $time."----".$f_last_modified."<br>";
    

 } 
} 
$d->close(); 

?>