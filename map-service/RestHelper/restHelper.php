<?php
require_once("restLibrary.php");

//header("Content-Type: application/text");

print(
rest_helper(

	$_REQUEST['url']
,
    $_REQUEST
    , 'POST',$_REQUEST['resthelperformat']
  )
 )
;


?>