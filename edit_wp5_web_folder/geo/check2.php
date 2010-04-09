<?
require_once("../path_index.php");

$userid=$_GET['userid'];
session_start();

$sessionid=session_id();


$conn = pg_connect(POSTGIS_CS);
			if (pg_ErrorMessage($conn)) { 
			echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
			}
			else 
			{
			 //$conn = pg_connect(POSTGIS_CS);
			$conn=pg_connect(POSTGIS_CS);
$t=time();

				$s="select usuario,maxtime from user_table where not usuario='$userid'";	
			$r=pg_query($conn,$s);

				$q="";
				 while ($row = pg_fetch_array($r, NULL, PGSQL_ASSOC)) 
				 {
					$s="select usuario,maxtime from user_table where not userid='$userid'";
							 $userid=$row['usuario'];

							 $max_t=$row['maxtime'];
		//			echo $userid." time".$t." and maxtime  ".$max_t;
					if ($t<$row['maxtime'])				
					{
					 $q.="delete from user_table where  usuario=$userid;";
					 $q.="delete from user_points where userid=$userid;";
					 $q.="delete from test_csvimportpk where userid=$userid;";	
					
				}
						
				 }
					$r=pg_exec($conn,$q);				
			
	
		}


?>
